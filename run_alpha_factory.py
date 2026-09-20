"""
================================================================================
Bitget AI Base Camp S2 — Alpha Factory Official Submission Runner
Strategy: Perpetual Dislocation Snapback (PDS-v1)
================================================================================
Usage:
    python run_alpha_factory.py              # Runs default primary asset (SPY)
    python run_alpha_factory.py --asset ALL  # Runs multi-asset universe
================================================================================
"""
import sys
import os
import argparse
import pandas as pd

# Add workspace directory to python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from src.config import PAIRS, FROZEN_THRESHOLDS, EXECUTION_COSTS
from src.data_feed import BitgetDataFeed
from src.backtester import EventDrivenBacktester
from src.analytics import PerformanceAnalytics

def run_single_asset(asset='SPY'):
    print("=" * 80)
    print(f"BITGET ALPHA FACTORY: RUNNING PDS-v1 ON {PAIRS[asset]['name']} ({asset})")
    print("=" * 80)
    
    feed = BitgetDataFeed(asset)
    df = feed.get_synchronized_dataset(use_cache=True)
    
    cfg = FROZEN_THRESHOLDS[asset]
    print(f"\n[1] Frozen Parameters (Strictly In-Sample Half 1 Derived):")
    print(f"    Trigger Threshold:   +{cfg['trigger_bps']:.2f} bps (Top 10% in-sample)")
    print(f"    Target Normalization: +{cfg['target_bps']:.2f} bps (Median equilibrium)")
    print(f"    Hard Adverse Stop:   +{cfg['hard_stop_bps']:.1f} bps beyond entry")
    print(f"    Timeout Ceiling:      {cfg['max_hold_hrs']} hours")
    print(f"    Execution Vehicle:   SHORT {PAIRS[asset]['perp_symbol']} (Perp Only)")
    print(f"    Reference Anchor:    {PAIRS[asset]['spot_symbol']} (Spot Untraded)")

    backtester = EventDrivenBacktester(asset)
    df_trades = backtester.run_backtest(df)

    if df_trades.empty:
        print("\n[!] No trades triggered.")
        return df_trades

    n_total = len(df_trades)
    n_is = len(df_trades[~df_trades['is_oos']])
    n_oos = len(df_trades[df_trades['is_oos']])

    print(f"\n[2] Trade Execution Summary:")
    print(f"    Total De-clustered Trades: {n_total} ({n_is} In-Sample / {n_oos} Out-of-Sample)")
    print(f"    Average Holding Duration:  {df_trades['hold_hrs'].mean():.1f} hours")
    print(f"    Average Gross Perp Move:  {df_trades['gross_pnl_bps'].mean():+.2f} bps")
    print(f"    Average Funding Received: {df_trades['funding_bps'].mean():+.2f} bps")
    print(f"    Average Gross Edge:       {df_trades['gross_pnl_bps'].mean() + df_trades['funding_bps'].mean():+.2f} bps")

    print(f"\n[3] Official Performance Across Execution Regimes:")
    print("-" * 80)
    report_df = PerformanceAnalytics.generate_full_report(df_trades)
    print(report_df.to_string(index=False))
    print("-" * 80)

    print(f"\n[4] Portfolio Capital & Risk Simulation ($100,000 Base Equity):")
    print("-" * 80)
    cap_df = PerformanceAnalytics.simulate_capital(df_trades, initial_capital=100000.0)
    print(cap_df.to_string(index=False))
    print("-" * 80)

    # Export trade audit log
    out_csv = os.path.join(os.path.dirname(os.path.abspath(__file__)), f"trades_audit_{asset}.csv")
    df_trades.to_csv(out_csv, index=False)
    print(f"\n[5] Complete Trade Audit Log Exported to:")
    print(f"    {out_csv}")

    # Monte Carlo Shuffle Test
    p_val = PerformanceAnalytics.run_monte_carlo_shuffle(df, df_trades, num_perms=1000)
    print(f"\n[6] Monte Carlo Permutation Test (1,000 Shuffled Iterations):")
    print(f"    Empirical p-value vs. Null: p = {p_val:.4f}")
    if p_val < 0.05:
        print("    >>> STATISTICALLY SIGNIFICANT AT 95% CONFIDENCE (p < 0.05)")
    else:
        print("    >>> Not statistically significant vs shuffled null.")

    print("\n" + "=" * 80)
    return df_trades

def main():
    parser = argparse.ArgumentParser(description="Bitget Alpha Factory S2 — PDS-v1 Runner")
    parser.add_argument('--asset', type=str, default='SPY', help="Asset to evaluate (SPY, QQQ, NVDA, TSLA, or ALL)")
    args = parser.parse_args()

    if args.asset.upper() == 'ALL':
        all_results = {}
        for a in PAIRS.keys():
            all_results[a] = run_single_asset(a)
    else:
        run_single_asset(args.asset.upper())

if __name__ == '__main__':
    main()
