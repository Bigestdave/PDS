"""
PDS-v1 Risk Manager: Position Sizing, Hard Stop Monitoring, and Funding Accounting
"""
import numpy as np
import pandas as pd

class RiskManager:
    def __init__(self, hard_stop_bps=15.0, max_hold_hrs=8):
        self.hard_stop_bps = hard_stop_bps
        self.max_hold_hrs = max_hold_hrs

    def calculate_position_size(self, capital=10000.0, target_risk_bps=50.0):
        """
        Returns fixed 1.0 unit or volatility-normalized unit.
        Standard Alpha Factory baseline is 1.0 normalized contract unit.
        """
        return 1.0

    def compute_trade_pnl(self, entry_price, exit_price, funding_acc, cost_hurdle_bps):
        """
        Computes Gross Return, Fees, Funding Accrual, and Net Return for Short Perpetual.
        Short Perp gross return = ln(entry_price / exit_price) * 10,000 bps
        """
        gross_ret_bps = np.log(entry_price / exit_price) * 10000.0
        net_ret_bps = gross_ret_bps + funding_acc - cost_hurdle_bps
        return {
            'gross_ret_bps': gross_ret_bps,
            'funding_acc_bps': funding_acc,
            'fee_drag_bps': cost_hurdle_bps,
            'net_ret_bps': net_ret_bps
        }
