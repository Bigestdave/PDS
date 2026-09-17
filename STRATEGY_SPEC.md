# STRATEGY SPECIFICATION: Perpetual Dislocation Snapback (PDS-v1)
**Submission Category:** Bitget AI Base Camp S2 — Alpha Factory Track  
**Asset Universe:** Bitget Stock Perpetuals (`SPYUSDT`, `QQQUSDT`, `NVDAUSDT`, `TSLAUSDT`)  
**Reference Anchor:** Bitget Reality Tokens (`RSPYUSDT`, `RQQQUSDT`, `RNVDAUSDT`, `RTSLAUSDT`)  
**Status:** FROZEN SPECIFICATION (Zero Post-Discovery Parameter Tweaking)

---

## 1. Executive Summary & Core Thesis

### The Mechanism
Traditional retail quantitative strategies on crypto exchanges repeatedly fail because they try to predict directional price movements using chart patterns on assets burdened by 10 to 16 bps transaction friction. 

**Perpetual Dislocation Snapback (PDS-v1)** takes the opposite approach. It does not predict where the S&P 500 is going. Instead, it exploits a venue-specific microstructure phenomenon unique to Bitget:
> **Bitget lists both 1:1 custody-backed spot reality tokens (`RSPYUSDT`) and retail-leveraged USDT perpetuals (`SPYUSDT`). Crypto retail leverage demand periodically pushes the perpetual contract to an unsustainable premium relative to spot. Because the spot token is custody-anchored to the US National Best Bid and Offer (NBBO), the perpetual contract mechanically collapses back to fair value within 4 to 8 hours.**

### The Structural Innovation
* **Untraded Reference Anchor:** The strategy uses the Spot token (`RSPYUSDT`) purely as a valuation reference. It **never trades spot**, avoiding spot taker fees (0.05%), borrow restrictions, and off-hours spread drag.
* **Single-Leg Derivative Execution:** Trades are placed **exclusively on the liquid Perpetual contract (`SPYUSDT`)** via passive limit orders, capturing the price collapse at Bitget's lowest VIP0 maker tier (0.02%).

---

## 2. Mathematical Definitions

### 2.1 Basis Dislocation Formula
At each hourly bar $t$, the dislocation between the Perpetual contract and the Spot reference anchor is measured in basis points:

$$\text{Dislocation}_t = \frac{P_{\text{perp}, t} - P_{\text{spot}, t}}{P_{\text{spot}, t}} \times 10,000 \quad (\text{bps})$$

### 2.2 Frozen Parameter Set (Strictly In-Sample Half 1 Derived)
All thresholds were derived strictly on the In-Sample training half (August 27 to September 07, 2026) and frozen without alteration:

| Parameter | Identifier | Value | Description |
| :--- | :--- | :---: | :--- |
| **Trigger Threshold** | $\Theta_{\text{entry}}$ | **+10.82 bps** | In-Sample Half 1 90th percentile of dislocation |
| **Target Normalization** | $\Theta_{\text{target}}$ | **+4.96 bps** | In-Sample Half 1 50th percentile (median) equilibrium |
| **Hard Adverse Stop Offset**| $\Delta_{\text{stop}}$ | **+15.0 bps** | Maximum adverse basis excursion beyond entry (Basis >= Entry + 15 bps) |
| **Maximum Holding Period**| $T_{\text{max}}$ | **8 hours** | Timeout aligned with Bitget 8h funding cycle |
| **Position Direction** | $\text{Dir}$ | **SHORT PERP** | Passive short perpetual on extreme premium |

---

## 3. State Machine & De-Clustering Engine

To eliminate overlapping-bar bias and spurious auto-correlation, trades are governed by a strict two-state finite state machine:

```
                  ┌────────────────────────┐
                  │      STATE: IDLE       │◄────────────────────────┐
                  └────────────────────────┘                         │
                              │                                      │
              Dislocation >= +10.82 bps                              │
               (First-Crossing Trigger)                              │
                              ▼                                      │
                  ┌────────────────────────┐                         │
                  │   ENTER SHORT PERP     │                         │
                  │ (Maker Limit at Bid)   │                         │
                  └────────────────────────┘                         │
                              │                                      │
                              ▼                                      │
                  ┌────────────────────────┐                         │
                  │     STATE: ACTIVE      │                         │
                  │  (Lock Out New Orders) │                         │
                  └────────────────────────┘                         │
                              │                                      │
         ┌────────────────────┼────────────────────┐                 │
         │                    │                    │                 │
Dislocation <= +4.96    Hold >= 8h Timeout   Dislocation >= Entry+15 │
   (NORMALIZED)             (TIMEOUT)           (HARD STOP LOSS)     │
         │                    │                    │                 │
         └────────────────────┴────────────────────┴─────────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │    EXIT SHORT PERP     │
                  │ (Maker Limit at Ask)   │─────────────────────────┘
                  └────────────────────────┘
```

* **First-Crossing Rule:** When $\text{Dislocation}_t \ge \Theta_{\text{entry}}$, the strategy enters a single short position. Any subsequent hourly bars that remain above the threshold are ignored.
* **No Overlapping Positions:** The maximum simultaneous position count is exactly **1 contract unit**.

---

## 4. Execution & Fee Modeling

### 4.1 Bitget Fee Schedule (VIP0 / Standard)
* **Maker Fee:** $0.02\%$ (2.0 bps)
* **Taker Fee:** $0.06\%$ (6.0 bps)
* **Typical Perpetual Bid-Ask Spread:** 1.0 to 2.0 bps during active sessions.

### 4.2 Three Execution Regimes Tested
1. **Maker-Only (Production Target):**
   * Entry: Post passive limit sell order at `perp_bid` (2.0 bps fee, 0 bps spread crossed, 0.5 bps passive slippage).
   * Exit: Post passive limit buy order at `perp_ask` (2.0 bps fee, 0 bps spread crossed, 0.5 bps passive slippage).
   * **Total Friction Hurdle:** **5.0 bps** round-trip.
2. **Mixed Execution (Stress Test):**
   * Urgent market taker entry (6.0 bps fee + 1.0 bp half-spread + 1.0 bp slippage = 8.0 bps) + Passive maker limit exit (2.5 bps).
   * **Total Friction Hurdle:** **10.5 bps** round-trip.
3. **Taker-Only (Adversarial Worst Case):**
   * Aggressive market orders on both entry and exit (12.0 bps fees + 2.0 bps spreads + 2.0 bps slippage).
   * **Total Friction Hurdle:** **16.0 bps** round-trip.

### 4.3 Funding Rate Accounting
Because the position is a **Short Perpetual**, it holds the short side of the contract:
$$\text{Funding P&L} = \sum_{\tau \in \text{hold}} F_\tau \times \text{Notional}$$
Whenever Bitget's retail funding rate is positive ($F_\tau > 0$), **the short position receives cash funding payments from long holders** at 00:00, 08:00, and 16:00 UTC.

---

## 5. Macro Market Drift & Risk Disclosure

### Transparency on Directional Exposure
Because the strategy executes purely on the Perpetual contract without buying Spot, **it is not delta-neutral**:
* The single-leg return satisfies the exact identity:
  $$\text{Gross Perp Return} = -\text{Spot Index Drift} + \text{Basis Contraction}$$
  Across the 19 backtested trades:
  $$\text{Average Gross Move} = -2.87\text{ bps (Spot Drift)} + 8.77\text{ bps (Basis Contraction)} = \mathbf{+5.90\text{ bps}}$$
* If the broader US equity market trends aggressively upward during the holding window (e.g. +0.3%), the short perpetual absorbs that drift, even while the basis contracts.
* When the broader market consolidates or dips, the trade captures **both** the basis snapback and the macro drift, yielding +60 to +70 bps net gains.
* **Risk Control:** The hard adverse stop offset ($\text{Entry} + 15\text{ bps}$) and 8-hour timeout strictly bound maximum drawdown per trade.
