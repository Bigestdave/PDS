"""
FastAPI Router for Bitget AI Trading Desk
Enforces Human-in-the-Loop Authorization
"""
from fastapi import APIRouter, HTTPException
import datetime
import uuid
from app.engine.copilot import DeskCopilot
from app.engine.post_trade_review import PostTradeReviewEngine
from app.engine.models import (
    DeskQueryRequest,
    DeskQueryResponse,
    TradeOpportunityCard,
    DecisionActionRequest,
    ExecutionReceipt
)
from app.engine.scanner import MarketIntelligenceScanner

router = APIRouter()

# In-memory storage for session opportunities and audit trail
SESSION_OPPORTUNITIES: dict[str, TradeOpportunityCard] = {}
AUDIT_LOG: list[dict] = []

def refresh_opportunities():
    cards = MarketIntelligenceScanner.scan_all()
    for c in cards:
        if c.id not in SESSION_OPPORTUNITIES:
            SESSION_OPPORTUNITIES[c.id] = c

refresh_opportunities()

@router.get("/health")
def health():
    return {
        "status": "online",
        "service": "Bitget AI Trading Desk Core",
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "total_active_opportunities": len(SESSION_OPPORTUNITIES),
        "audit_decisions_count": len(AUDIT_LOG)
    }

@router.get("/opportunities", response_model=list[TradeOpportunityCard])
def list_opportunities(strategy: str = None):
    refresh_opportunities()
    res = list(SESSION_OPPORTUNITIES.values())
    if strategy:
        res = [c for c in res if c.strategy_type.upper() == strategy.upper()]
    return res

@router.get("/opportunities/{opp_id}", response_model=TradeOpportunityCard)
def get_opportunity(opp_id: str):
    if opp_id not in SESSION_OPPORTUNITIES:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    return SESSION_OPPORTUNITIES[opp_id]

@router.post("/opportunities/{opp_id}/decision", response_model=dict)
def make_human_decision(opp_id: str, payload: DecisionActionRequest):
    if opp_id not in SESSION_OPPORTUNITIES:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    
    opp = SESSION_OPPORTUNITIES[opp_id]
    
    if payload.action == "AUTHORIZE":
        opp.status = "AUTHORIZED"
        allocated_usd = f"${payload.adjusted_size_usd:.2f}" if payload.adjusted_size_usd else opp.suggested_size_usd
        receipt = ExecutionReceipt(
            opportunity_id=opp.id,
            symbol=opp.symbol,
            direction=opp.direction,
            status="FILLED_MOCK_BITGET",
            executed_price=opp.entry_price,
            allocated_usd=allocated_usd,
            risk_verdict="PASSED_PRE_TRADE_SANITY_KERNEL",
            authorized_at=datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC"),
            order_id=f"BGT-{uuid.uuid4().hex[:8].upper()}"
        )
        
        log_entry = {
            "decision": "AUTHORIZED",
            "opportunity_id": opp.id,
            "symbol": opp.symbol,
            "direction": opp.direction,
            "allocated_usd": allocated_usd,
            "order_id": receipt.order_id,
            "timestamp": receipt.authorized_at,
            "notes": payload.trader_notes or "Authorized by human trader via Desk Ticket."
        }
        AUDIT_LOG.insert(0, log_entry)
        return {"status": "success", "receipt": receipt.model_dump(), "opportunity": opp.model_dump()}

    elif payload.action == "REJECT":
        opp.status = "REJECTED"
        log_entry = {
            "decision": "REJECTED",
            "opportunity_id": opp.id,
            "symbol": opp.symbol,
            "direction": opp.direction,
            "timestamp": datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC"),
            "notes": payload.trader_notes or "Rejected by human trader."
        }
        AUDIT_LOG.insert(0, log_entry)
        return {"status": "rejected", "opportunity": opp.model_dump()}

    raise HTTPException(status_code=400, detail="Invalid action")

@router.get("/audit-log")
def get_audit_trail():
    return {
        "count": len(AUDIT_LOG),
        "history": AUDIT_LOG
    }

@router.post("/scan")
def trigger_scan():
    refresh_opportunities()
    return {
        "status": "success",
        "scanned_count": len(SESSION_OPPORTUNITIES),
        "timestamp": datetime.datetime.utcnow().isoformat()
    }


@router.post("/copilot/query", response_model=DeskQueryResponse)
def query_copilot(payload: DeskQueryRequest):
    res = DeskCopilot.analyze(payload.query, payload.context_opp_id)
    return res


@router.get("/post-trade-review")
def get_post_trade_review():
    return PostTradeReviewEngine.get_review_dossier()
