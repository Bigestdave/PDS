"""
Pydantic Data Models for Trade Opportunity Cards and Decision Dossiers
"""
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class EvidenceDossier(BaseModel):
    signal_summary: str = Field(..., description="Summary of the microstructural trigger")
    telemetry_metrics: Dict[str, Any] = Field(default_factory=dict)
    chart_series: List[Dict[str, Any]] = Field(default_factory=list)
    risk_assessment: str = Field(..., description="Hard evaluation of downside failure modes")
    decision_checklist: List[str] = Field(default_factory=list)

class TradeOpportunityCard(BaseModel):
    id: str = Field(..., description="Unique opportunity identifier")
    symbol: str = Field(..., description="Bitget contract symbol")
    direction: str = Field(..., description="LONG or SHORT")
    strategy_type: str = Field(..., description="Strategy archetype, e.g. PDS_DISLOCATION, ORDERBOOK_IMBALANCE")
    strategy_label: str = Field(..., description="Human-readable category badge")
    conviction: int = Field(..., ge=0, le=100, description="Confidence score out of 100")
    thesis: str = Field(..., description="Analytical trade rationale")
    entry_price: str = Field(..., description="Formatted recommended entry price")
    target_price: str = Field(..., description="Target take-profit price")
    invalidation_price: str = Field(..., description="Hard stop invalidation price")
    risk_reward: str = Field(..., description="Risk to reward ratio, e.g. 1 : 2.8")
    suggested_size_usd: str = Field(..., description="Recommended dollar allocation")
    why_now: List[str] = Field(..., description="Core drivers triggering the decision")
    what_changes_mind: str = Field(..., description="Pre-mortem invalidation condition")
    evidence: EvidenceDossier = Field(..., description="Deep evidence dossier for the Review step")
    status: str = Field("PENDING_REVIEW", description="PENDING_REVIEW | AUTHORIZED | REJECTED")
    timestamp: str = Field(..., description="Generated timestamp")

class DecisionActionRequest(BaseModel):
    opportunity_id: str
    action: str = Field(..., description="AUTHORIZE or REJECT")
    adjusted_size_usd: Optional[float] = None
    trader_notes: Optional[str] = None

class ExecutionReceipt(BaseModel):
    opportunity_id: str
    symbol: str
    direction: str
    status: str
    executed_price: str
    allocated_usd: str
    risk_verdict: str
    authorized_at: str
    order_id: str
