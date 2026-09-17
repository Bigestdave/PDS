# REOPEN Risk Desk (Track 3: AI Trading Desk)
### Official Submission Whitepaper — Bitget AI × Crypto Hackathon S2
**Human-in-the-Loop Institutional Microstructure Research & Decision Workstation**

---

## Executive Summary

Autonomous AI trading bots represent a flawed paradigm in institutional digital asset trading. Real-world proprietary trading desks and quantitative hedge funds **never** grant unconstrained, autonomous execution authority to large language models. Hallucinations, black-swan tail events, regime shifts, and exchange latency cascades make fully automated retail bots fragile and dangerous.

The **REOPEN Risk Desk** pioneers the **Human-in-the-Loop (HITL) Intelligence Workstation** designed specifically around Bitget's Track 3 mandate. The AI acts as an elite quantitative research analyst: it ingests real-time Bitget market telemetry, extracts microstructural signals, generates structured **Trade Opportunity Cards**, visualizes deep evidence dossiers, stress-tests decisions against macro shocks, and conducts post-trade self-improvement reviews. 

Crucially, the system enforces an **Institutional Human Authorization Gate**: the AI cannot execute trades autonomously. The discretionary trader retains sovereign authority to inspect evidence, adjust capital allocations within hard risk ceilings ($5,000 / 5% NAV), and explicitly authorize or reject each order. Every decision is immutably logged to an auditable cryptographic compliance ledger.

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         REOPEN RISK DESK TOPOLOGY                          │
│                                                                                  │
│   [ Bitget V2 Market Feeds ] ──► [ AI Microstructure Scanner ]                  │
│   (L2 Depth, Basis, Funding)     • PDS-01 Equity Basis Dislocation (SPY/RSPY)    │
│                                  • L2 Bid-Wall Imbalance Skew (BTCUSDT)          │
│                                  • Funding Rate Compression Arb (SOLUSDT)        │
│                                           │                                      │
│                                           ▼                                      │
│   [ Trade Opportunity Card ] ◄── [ Multi-Modal AI Desk Analyst Copilot ]         │
│   • Conviction Gauge (0-100)     • Natural Language Microstructure Query         │
│   • Risk/Reward & Sizing         • -5% Flash Crash Stress Testing Engine         │
│   • Pre-Mortem ("Change Mind")                                                   │
│                                           │                                      │
│                                           ▼ Trader clicks [ Review Dossier ]     │
│   [ 4-Stage Decision Dossier ]                                                   │
│   Stage 1: Signal Telemetry ──► Stage 2: SVG Basis Dislocation Chart             │
│   Stage 3: What-If Stress   ──► Stage 4: Institutional Human Authorization Gate  │
│                                           │                                      │
│                                           ▼ Trader clicks [ AUTHORIZE & EXECUTE ]│
│   [ Execution & Governance ]                                                     │
│   • Bitget Order Receipt Generated (e.g. BGT-5CD2D8B5)                           │
│   • Immutable Cryptographic Audit Ledger Entry Logged                            │
│                                           │                                      │
│                                           ▼ Continuous Feedback Loop             │
│   [ Post-Trade Review & Self-Improvement Engine ]                                │
│   • Hypothesis vs Reality Variance Decomposition                                 │
│   • Maker vs Taker Friction Drag Analysis                                        │
│   • Episodic Learning Rule Extraction & Parameter Auto-Tuning                    │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## Track 3 Rubric Alignment: The 5 Core Competencies

Bitget's Hackathon Track 3 evaluates systems across five specific operational dimensions. Below is how the REOPEN Risk Desk fulfills each criterion:

### 1. Information Extraction & Signal Generation
- **Bitget V2 API Connector**: Continuously streams L2 order book depth, 8-hour funding rates, and 24-hour ticker volume metrics across Bitget perpetual futures and spot pairs.
- **Foundational Institutional Primitive (PDS-01)**: Natively integrates the audited **Perpetual Dislocation Snapback (PDS-01)** strategy. Scans synthetic equity perpetuals (`SPYUSDT`, `QQQUSDT`) against 1:1 custody-backed spot reality tokens (`RSPYUSDT`, `RQQQUSDT`), detecting mean-reverting basis dislocations when the spread exceeds +10.82 bps.
- **Multi-Regime Signal Radar**:
  - `SPYUSDT`: Perpetual basis dislocation snapback (Conviction: 94/100, R:R 3.5:1).
  - `BTCUSDT`: Heavy L2 bid-wall imbalance (68% bid volume within ±0.5% depth, Conviction: 82/100).
  - `SOLUSDT`: Extreme negative funding rate compression (-0.042% / 8h) signaling an imminent short-squeeze snapback (Conviction: 76/100).

### 2. Personalized Research Workstations & Deep Microstructure Evidence
- **The Trade Opportunity Card**: The central focal point of the trader workstation. Each card distills complex quantitative metrics into an institutional decision summary:
  - **Conviction Score (0–100)**: Multi-factor statistical confidence level.
  - **Trade Setup**: Direction (LONG/SHORT), Entry Price, Target Price, Stop Loss, Risk/Reward ratio, and Recommended Capital Allocation.
  - **"Why Now" Catalyst**: The microstructural event driving the immediate edge (e.g. retail dislocation post-US close).
  - **"What Would Change My Mind" (Pre-Mortem)**: Explicit falsification conditions identified prior to trade entry, eliminating confirmation bias.
- **4-Stage Progressive Decision Dossier**:
  - **Stage 1 (Signal Telemetry)**: Real-time spread, mark price, index price, funding delta.
  - **Stage 2 (Microstructural Evidence)**: Dynamic, pure SVG basis spread curve showing the live entry threshold (+10.82 bps), historical snapback trajectory, and mean-reversion target (+4.96 bps).
  - **Stage 3 (Risk Stress-Test)**: Real-time What-If scenario slider simulating $\pm 2.0\%$ underlying asset shocks.
  - **Stage 4 (Human Authorization Gate)**: The explicit checkpoint where the trader makes the final execution decision.

### 3. Decision Stress-Testing & "What-If" Scenario Engine
- **Interactive Scenario Shocker**: Traders can slide spot price shocks directly inside the Decision Dossier to inspect instantaneous PnL impact, max drawdown delta, and invalidation risk before risking capital.
- **Desk Copilot Stress Simulation**: Natural-language stress querying. Traders can prompt the AI Desk Analyst with complex market shocks (e.g., *"Stress-test a -5% BTC sudden liquidation crash"*), receiving an instant multi-asset sensitivity matrix, liquidation proximity report, and hedging recommendations.

### 4. Execution Assistance & Governance (Human-in-the-Loop)
- **Zero Autonomous Execution**: The AI is architecturally restricted to recommendation and analysis. No order can be routed to the Bitget matching engine without explicit human interaction.
- **Institutional Capital-at-Risk Enforcer**: The desk enforces a hard maximum position size capped at $5,000 (5% of $100,000 Portfolio NAV), preventing over-allocation or fat-finger errors.
- **Bitget Execution Receipt**: Upon human approval, an institutional order receipt is generated containing the Bitget order ID (`BGT-XXXXXX`), timestamp, executed price, filled size, and maker/taker routing flags.
- **Immutable Cryptographic Audit Ledger**: Every action (Approved, Executed, or Rejected) is permanently logged to an audit table detailing the trader's rationale, time of action, and full trade parameters for institutional compliance and regulatory scrutiny.

### 5. Post-Trade Review & Self-Improvement Engine
- **Automated Post-Mortem Decomposition**: Analyzes executed trades against the original quantitative hypothesis.
- **Hypothesis vs. Reality Variance**: Compares predicted basis snapback duration (e.g., 45 minutes) against actual market duration (112 minutes), flagging microstructural drift.
- **Friction Drag Decomposition**: Quantifies the exact basis point drag caused by maker fill delays, adverse selection, and exchange taker fees.
- **Episodic Learning & Dynamic Rule Generation**: The AI automatically extracts persistent heuristics from trading friction and updates future decision weights (e.g., *"Rule #1: When basis spread compresses below 4.96 bps within 15 minutes, exit via post-only maker to preserve +1.41 bps edge"*).

---

## Relationship Between Project 1 (PDS-01) and Project 2 (AI Trading Desk)

The two projects submitted to Bitget Hackathon S2 represent a unified institutional stack:

| Dimension | Track 1: PDS-01 Alpha Factory | Track 3: REOPEN Risk Desk |
| :--- | :--- | :--- |
| **Submission Focus** | Quantitative Strategy & Alpha Validation | Institutional Research Workstation & Human-in-the-Loop Execution |
| **Core Artifact** | Mathematical edge, audited trade logs, backtest engine, frozen parameters (+10.82 / +4.96 bps) | Full-stack interactive terminal (FastAPI + React 19 + Bitget V2 API) |
| **Role in Ecosystem** | **The Research Primitive**: The raw quantitative alpha model | **The Operational Platform**: The decision desk where human traders deploy, stress-test, and govern PDS-01 alongside crypto perps |
| **Autonomy Level** | Deterministic quantitative model | AI research copilot + 100% human execution gate |

---

## Technical Architecture & Implementation

### 1. Backend Microservices (`FastAPI` + `Python 3.11`)
- `app.data_connectors.bitget_client`: Asynchronous HTTP client interfacing with Bitget V2 API endpoints (`/api/v2/mix/market/tickers`, `/api/v2/mix/market/fills`, `/api/v2/mix/market/current-fund-rate`) with intelligent DNS failover.
- `app.engine.scanner`: Microstructure anomaly detection engine computing continuous z-scores, basis spreads, and order book imbalance metrics.
- `app.engine.copilot`: Natural language AI desk analyst with domain-specific reasoning prompts, citation tracking, and opportunity card synthesis.
- `app.engine.post_trade_review`: Self-improvement engine decomposing trade logs, computing friction drag, and persisting episodic learning rules.
- `app.api.routes`: High-performance RESTful API endpoints powering the desk workstation.

### 2. Frontend Workstation (`React 19` + `Tailwind CSS v4` + `Vite`)
- `Navbar.jsx`: Institutional header with real-time Bitget connection status, Portfolio NAV ($100,000), Max Risk Cap ($5,000), and rapid access controls.
- `MarketTickerStrip.jsx`: Live telemetry ticker displaying basis spreads, 24h volumes, and funding rates.
- `OpportunityCard.jsx`: High-density Bloomberg-style decision card with conviction radial gauge, analytical thesis, metrics, and pre-mortem failure trigger.
- `EvidenceModal.jsx`: 4-stage Decision Dossier featuring dynamic pure SVG charts, real-time stress test sliders, and the Human Authorization Gate.
- `DeskCopilotDrawer.jsx`: Slide-over AI copilot offering instant stress-testing, portfolio exposure analysis, and micro-opportunity discovery.
- `PostTradeReviewModal.jsx`: Full institutional post-mortem terminal showing trade variance, fee drag, and AI episodic learning rules.
- `AuditLedgerModal.jsx`: Immutable compliance ledger logging all trader decisions.

---

## Verification Guide for Hackathon Judges

Judges can launch the entire ecosystem with a single command:

### Prerequisites
- Python 3.10+
- Node.js 18+

### One-Click Launch
```bash
# Clone the repository
git clone https://github.com/Bigestdave/Reopen.git
cd Reopen

# Run the turnkey launcher (boots backend + frontend + opens browser)
python run_desk.py
```

Alternatively, launch services independently:

```bash
# 1. Start Backend (Port 8000)
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000

# 2. Start Frontend (Port 5174)
cd frontend
npm install
npm run dev -- --port 5174
```

Visit **`http://127.0.0.1:5174/`** in your browser to interact with the live workstation.

---

## Conclusion

The **REOPEN Risk Desk** shifts the paradigm of AI in crypto trading from reckless black-box automation to institutional, human-supervised decision intelligence. By unifying real-time Bitget telemetry, rigorous quantitative research primitives (PDS-01), interactive microstructural evidence, risk stress-testing, and self-improving post-trade review, the desk delivers the exact standard of software demanded by professional proprietary trading operations.
