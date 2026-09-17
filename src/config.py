"""
PDS-v1 Configuration: Frozen Parameters, Fee Schedules, Network Setup
"""
import os

# Network & API Configuration
BITGET_HOST = 'api.bitget.com'
BITGET_IP = '104.18.15.166' # DNS bypass for regions with ISP DNS block
BASE_URL = 'https://api.bitget.com'

# Supported Instrument Pairs
PAIRS = {
    'SPY': {
        'spot_symbol': 'RSPYUSDT',
        'perp_symbol': 'SPYUSDT',
        'name': 'S&P 500 ETF'
    },
    'QQQ': {
        'spot_symbol': 'RQQQUSDT',
        'perp_symbol': 'QQQUSDT',
        'name': 'Nasdaq 100 ETF'
    },
    'NVDA': {
        'spot_symbol': 'RNVDAUSDT',
        'perp_symbol': 'NVDAUSDT',
        'name': 'NVIDIA Corp'
    },
    'TSLA': {
        'spot_symbol': 'RTSLAUSDT',
        'perp_symbol': 'TSLAUSDT',
        'name': 'Tesla Inc'
    }
}

# Primary Strategy Instrument
DEFAULT_ASSET = 'SPY'

# Frozen Strategy Parameters (Strictly Half 1 In-Sample Derived)
FROZEN_THRESHOLDS = {
    'SPY': {
        'trigger_bps': 10.82,     # 90th percentile in-sample dislocation
        'target_bps': 4.96,       # 50th percentile (median) equilibrium
        'hard_stop_bps': 15.0,    # Max adverse excursion ceiling
        'max_hold_hrs': 8         # 8-hour timeout (funding settlement cycle)
    },
    'QQQ': {
        'trigger_bps': 20.60,
        'target_bps': 9.26,
        'hard_stop_bps': 15.0,
        'max_hold_hrs': 8
    },
    'NVDA': {
        'trigger_bps': 13.32,
        'target_bps': 6.82,
        'hard_stop_bps': 15.0,
        'max_hold_hrs': 8
    },
    'TSLA': {
        'trigger_bps': 33.57,
        'target_bps': 10.77,
        'hard_stop_bps': 15.0,
        'max_hold_hrs': 8
    }
}

# Bitget VIP0 Fee Schedule
FEE_SCHEDULE = {
    'maker_fee_bps': 2.0,       # 0.02%
    'taker_fee_bps': 6.0,       # 0.06%
    'maker_slippage_bps': 0.5,  # Conservative passive execution slippage
    'taker_slippage_bps': 1.0,  # Aggressive market execution slippage
    'half_spread_rth_bps': 1.0, # Average RTH half-spread
    'half_spread_off_bps': 7.5  # Average off-hours half-spread
}

# Execution Models Cost Hurdles (Round-trip total in bps)
EXECUTION_COSTS = {
    'maker_only': 5.0,          # 2.0 maker in + 2.0 maker out + 1.0 slip
    'mixed_execution': 10.5,    # 6.0 taker in + 1.0 spread + 1.0 slip + 2.0 maker out + 0.5 slip
    'taker_only': 16.0          # 6.0 taker in + 6.0 taker out + 2.0 spread + 2.0 slip
}

# Data Storage
DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data')
os.makedirs(DATA_DIR, exist_ok=True)
