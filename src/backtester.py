"""
PDS-v1 Event-Driven Backtesting Engine with Multi-Friction Execution Modeling
"""
import pandas as pd
import numpy as np
from src.config import EXECUTION_COSTS, FROZEN_THRESHOLDS
from src.signal_engine import DislocationSignalEngine
from src.risk_manager import RiskManager

class EventDrivenBacktester:
    def __init__(self, asset='SPY'):
        self.asset = asset
        self.signal_engine = DislocationSignalEngine(asset)
        self.risk_manager = RiskManager()
        self.cfg = FROZEN_THRESHOLDS[asset]

    def run_backtest(self, df):
        signals = self.signal_engine.generate_signals(df)
        if signals.empty:
            return pd.DataFrame()

        n_total = len(df)
        n_half = n_total // 2

        trades = []
        entry_sig = None

        for _, sig in signals.iterrows():
            if sig['action'] == 'ENTER_SHORT':
                entry_sig = sig
            elif sig['action'] == 'EXIT_SHORT' and entry_sig is not None:
                e_idx = entry_sig['bar_idx']
                x_idx = sig['bar_idx']
                
                entry_price = entry_sig['price']
                exit_price = sig['price']
                entry_basis = entry_sig['basis_bps']
                exit_basis = sig['basis_bps']
                
                # Gross Perp Return: Short Perp = ln(entry / exit)
                gross_ret_bps = np.log(entry_price / exit_price) * 10000.0
                
                # Funding accrued over the holding window
                funding_bps = df.loc[e_idx:x_idx, 'funding_rate'].sum() * 10000.0
                
                hold_hrs = x_idx - e_idx
                is_oos = e_idx >= n_half
                session = df.loc[e_idx, 'session']

                # Calculate Net P&L under each execution regime
                net_maker = gross_ret_bps + funding_bps - EXECUTION_COSTS['maker_only']
                net_mixed = gross_ret_bps + funding_bps - EXECUTION_COSTS['mixed_execution']
                net_taker = gross_ret_bps + funding_bps - EXECUTION_COSTS['taker_only']

                trades.append({
                    'asset': self.asset,
                    'trade_id': len(trades) + 1,
                    'entry_time': str(entry_sig['dt_et']),
                    'exit_time': str(sig['dt_et']),
                    'session': session,
                    'is_oos': is_oos,
                    'entry_price': entry_price,
                    'exit_price': exit_price,
                    'entry_basis_bps': entry_basis,
                    'exit_basis_bps': exit_basis,
                    'delta_basis_bps': exit_basis - entry_basis,
                    'hold_hrs': hold_hrs,
                    'exit_reason': sig['reason'],
                    'gross_pnl_bps': gross_ret_bps,
                    'funding_bps': funding_bps,
                    'net_maker_bps': net_maker,
                    'net_mixed_bps': net_mixed,
                    'net_taker_bps': net_taker
                })
                entry_sig = None

        return pd.DataFrame(trades)
