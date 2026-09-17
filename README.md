# Bitget AI Trading Desk (Track 3: Human-in-the-Loop Intelligence Desk)

> **Official Submission for Bitget AI × Crypto Hackathon S2 — AI Trading Desk Track**  
> *"AI processes telemetry and structures institutional trade decisions; the human trader retains 100% execution authority."*

---

## 1. Overview & Vision

Most retail AI trading tools fail by attempting to turn LLMs into unconstrained execution bots. In real-world institutional hedge funds and proprietary trading desks, traders **never** give an autonomous model unsupervised custody over execution.

The **Bitget AI Trading Desk** delivers an institutional **Human-in-the-Loop (HITL) Research & Decision Engine**:
1. **Continuous Telemetry Radar**: Scans Bitget markets in real-time for structural basis dislocations, funding rate compression, and L2 order book bid/ask wall imbalances.
2. **First Research Primitive (PDS-01)**: Natively integrates the audited **Perpetual Dislocation Snapback (PDS-01)** quantitative strategy to detect when equity perpetuals (`SPYUSDT`, `QQQUSDT`) dislocate from 1:1 custody-backed spot reality tokens (`RSPYUSDT`).
3. **Structured Trade Opportunity Cards**: Generates high-conviction decision cards complete with analytical thesis, precise entry/target/invalidation levels, risk/reward metrics, position sizing limits, and pre-mortem failure criteria.
4. **4-Stage Decision Dossier (`Signal → Evidence → Risk → Decision`)**: Trader inspects deep microstructural evidence before making any commitment.
5. **Execution Gate & Immutable Audit Ledger**: The AI **cannot** place orders autonomously. Every execution requires explicit human authorization, logging every approval or rejection with timestamps, size, and rationale.

---

## 2. System Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                     1. MARKET RADAR & TELEMETRY                        │
│  • Bitget REST/WS Feeds: L2 Depth, Tickers, 8h Funding Rate            │
│  • Microstructure Anomaly Detectors & Basis Spread Engine              │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Live Telemetry Stream
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   2. AI DECISION ENGINE & PRIMITIVES                   │
│  • Primitive 1: PDS-01 Basis Dislocation (SPY/RSPY & QQQ/RQQQ)         │
│  • Primitive 2: L2 Order Book Depth Imbalance (BTC/USDT)               │
│  • Primitive 3: Funding Rate Inversion / Short Squeeze (SOL/USDT)      │
│  • Generates Structured TradeOpportunityCard Models (Pydantic)         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Formatted Opportunity Cards
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 3. TRADER WORKSTATION (REACT FRONTEND)                 │
│  • Bloomberg/Terminal Dark Aesthetics with Live Telemetry Strip        │
│  • Conviction Gauges (0 - 100), Why Now Drivers, Pre-Mortem Warnings   │
│  • [ REVIEW TRADE ] Action opens progressive Evidence Modal            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Trader Reviews Dossier
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 4. HUMAN-IN-THE-LOOP EXECUTION GATE                    │
│  • Trader adjusts USD allocation (capped at $5,000 / 5% NAV)           │
│  • Action: [ AUTHORIZE & EXECUTE ]  or  [ REJECT OPPORTUNITY ]         │
│  • Bitget API Mock/Paper Execution Receipt Issued (e.g. BGT-5CD2D8B5)  │
│  • Immutable Decision Audit Ledger with Full Audit Trail               │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Quick Start

### Backend (FastAPI + Bitget Connector)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

### Frontend (React 19 + Tailwind CSS + Vite)
```bash
cd frontend
npm install
npm run dev
# Open http://127.0.0.1:5174/
```
