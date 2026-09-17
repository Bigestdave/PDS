"""
PDS-v1 Signal Engine: De-clustered State Machine for Basis Dislocation Signals
"""
import pandas as pd
import numpy as np
from src.config import FROZEN_THRESHOLDS

class DislocationSignalEngine:
    def __init__(self, asset='SPY'):
        self.asset = asset
        cfg = FROZEN_THRESHOLDS[asset]
        self.trigger_bps = cfg['trigger_bps']
        self.target_bps = cfg['target_bps']
        self.hard_stop_bps = cfg['hard_stop_bps']
        self.max_hold_hrs = cfg['max_hold_hrs']

    def generate_signals(self, df):
        """
        Executes de-clustered state machine across the time series.
        State: IDLE -> ACTIVE (Short Perp) -> IDLE
        """
        signals = []
        state = 'IDLE'
        entry_idx = None
        entry_basis = None
        stop_basis = None

        for i in range(len(df)):
            b = df.loc[i, 'basis_bps']

            if state == 'IDLE':
                if b >= self.trigger_bps:
                    state = 'ACTIVE'
                    entry_idx = i
                    entry_basis = b
                    stop_basis = entry_basis + self.hard_stop_bps
                    signals.append({
                        'bar_idx': i,
                        'dt_et': df.loc[i, 'dt_et'],
                        'action': 'ENTER_SHORT',
                        'price': df.loc[i, 'perp_close'],
                        'basis_bps': b,
                        'stop_basis': stop_basis,
                        'reason': 'FIRST_CROSSING_PREMIUM'
                    })
            elif state == 'ACTIVE':
                hold_hrs = i - entry_idx
                exit_signal = False
                exit_reason = None

                # 1. Hard Adverse Stop Loss
                if b >= stop_basis:
                    exit_signal = True
                    exit_reason = 'STOP_LOSS'
                # 2. Target Normalization
                elif b <= self.target_bps:
                    exit_signal = True
                    exit_reason = 'NORMALIZED'
                # 3. Maximum Holding Timeout
                elif hold_hrs >= self.max_hold_hrs:
                    exit_signal = True
                    exit_reason = f'TIMEOUT_{self.max_hold_hrs}H'

                if exit_signal:
                    signals.append({
                        'bar_idx': i,
                        'dt_et': df.loc[i, 'dt_et'],
                        'action': 'EXIT_SHORT',
                        'price': df.loc[i, 'perp_close'],
                        'basis_bps': b,
                        'hold_hrs': hold_hrs,
                        'reason': exit_reason
                    })
                    state = 'IDLE'
                    entry_idx = None
                    entry_basis = None
                    stop_basis = None

        return pd.DataFrame(signals)
