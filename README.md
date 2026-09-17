# Bitget AI Trading Desk (Track 3: Human-in-the-Loop Intelligence Desk)

> **Official Submission for Bitget AI × Crypto Hackathon S2 — Track 3: AI Trading Desk**  
> *"AI extracts market telemetry, structures deep microstructure evidence, and stress-tests decisions; the human trader retains 100% execution authority."*

[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19.0+-61DAFB.svg?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com)
[![Bitget V2 API](https://img.shields.io/badge/Bitget_API-V2_Ready-00F0FF.svg)](https://www.bitget.com)

---

## 1. Executive Overview

Most retail AI trading tools fail by attempting to turn LLMs into unconstrained, autonomous execution bots. In institutional proprietary trading desks and quantitative hedge funds, traders **never** give an autonomous model unsupervised custody over order routing. Hallucinations, black-swan liquidation cascades, and regime shifts make autonomous bots hazardous.

The **Bitget AI Trading Desk** delivers an institutional **Human-in-the-Loop (HITL) Research & Decision Workstation** built strictly according to Bitget's Track 3 mandate:

1. **Information Extraction & Signal Radar**: Real-time Bitget V2 API telemetry ingestion across synthetic equity perps (`SPYUSDT`), major crypto perps (`BTCUSDT`), and altcoin perps (`SOLUSDT`).
2. **First Research Primitive (PDS-01)**: Natively integrates the audited **Perpetual Dislocation Snapback (PDS-01)** strategy detecting equity-perpetual basis divergence from spot reality tokens (`RSPYUSDT`).
3. **The Star: Trade Opportunity Cards**: Instant distillation of complex quantitative telemetry into actionable decision cards with conviction scores, entry/target/invalidation levels, risk/reward metrics, and pre-mortem failure criteria ("What Would Change My Mind").
4. **4-Stage Decision Dossier (`Signal → Evidence → Risk → Decision`)**: Interactive SVG basis dislocation charts, dynamic order book depth metrics, and real-time What-If scenario stress sliders.
5. **Execution Assistance & Human Authorization Gate**: The AI cannot place orders autonomously. Capital allocation is strictly capped at $5,000 (5% NAV), requiring explicit human authorization that issues Bitget order receipts and logs every action to an immutable compliance ledger.
6. **Post-Trade Review & Self-Improvement**: Automated trade post-mortems, hypothesis vs. reality variance decomposition, maker vs. taker fee drag analysis, and episodic learning rule generation.
7. **AI Desk Analyst Copilot**: Natural-language conversational assistant answering complex market questions, stress-testing liquidation cascades (-5% BTC shock), and synthesizing micro-opportunity cards on demand.

---

## 2. System Architecture

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              1. MARKET RADAR & TELEMETRY                               │
│  • Bitget REST/WS Feeds: L2 Depth, 24h Tickers, 8h Funding Rates                       │
│  • Microstructure Anomaly Detectors & Basis Spread Engine                              │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ Live Telemetry Stream
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                           2. AI DECISION ENGINE & PRIMITIVES                           │
│  • Primitive 1: PDS-01 Basis Dislocation (SPY/RSPY & QQQ/RQQQ)                         │
│  • Primitive 2: L2 Order Book Depth Imbalance (BTC/USDT)                               │
│  • Primitive 3: Funding Rate Inversion / Short Squeeze (SOL/USDT)                      │
│  • Generates Structured TradeOpportunityCard Models (Pydantic v2)                      │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ Formatted Opportunity Cards
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                         3. TRADER WORKSTATION (REACT FRONTEND)                         │
│  • Bloomberg/Terminal Dark Aesthetics with Live Telemetry Strip                        │
│  • Conviction Gauges (0 - 100), Why Now Drivers, Pre-Mortem Warnings                   │
│  • [ REVIEW DOSSIER ] Action opens progressive 4-Stage Evidence Modal                  │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ Trader Reviews Dossier
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                         4. HUMAN-IN-THE-LOOP EXECUTION GATE                            │
│  • Trader adjusts USD allocation (capped at $5,000 / 5% NAV)                           │
│  • Action: [ AUTHORIZE & EXECUTE ]  or  [ REJECT OPPORTUNITY ]                         │
│  • Bitget API Execution Receipt Issued (e.g. BGT-5CD2D8B5)                             │
│  • Immutable Decision Audit Ledger with Full Cryptographic Audit Trail                 │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ Feedback & Execution History
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                   5. POST-TRADE REVIEW & SELF-IMPROVEMENT ENGINE                       │
│  • Variance Analysis (Predicted vs Actual Snapback Time & PnL)                         │
│  • Friction Drag Decomposition (Maker Fee +0.5 bps vs Taker Penalty -2.0 bps)          │
│  • Episodic Heuristic Rules Synthesized & Fed Back to Scanner                          │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Quick Start (Turnkey Launcher)

Launch both the backend and frontend simultaneously with a single command:

```bash
# Clone the repository
git clone https://github.com/Bigestdave/AI-Trading-Desk.git
cd AI-Trading-Desk

# Run turnkey launcher
python run_desk.py
```

The launcher will boot the FastAPI backend (`http://127.0.0.1:8000`), the React frontend (`http://127.0.0.1:5174`), and automatically launch your default browser.

### Manual Service Start

#### Backend (`FastAPI`)
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

#### Frontend (`React 19 + Vite`)
```bash
cd frontend
npm install
npm run dev -- --port 5174
```

---

## 4. Key Documentation & Submission Artifacts

- **[SUBMISSION.md](SUBMISSION.md)**: The comprehensive Hackathon Track 3 whitepaper detailing rubric alignment, technical architecture, and theoretical foundation.
- **[DEMO_SCRIPT.md](DEMO_SCRIPT.md)**: The official 2-minute video presentation script with click-by-click narration.
- **[run_desk.py](run_desk.py)**: Single-command turnkey launcher for judges.

---

## 5. Technology Stack

- **Backend**: Python 3.11, FastAPI, Pydantic v2, Uvicorn, HTTPX Async Client.
- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React, Dynamic SVG Canvas.
- **Data Connectors**: Bitget V2 Mix Market REST endpoints with fallback DNS failover.
- **Compliance**: Cryptographic Audit Ledger logging every human trader authorization.
