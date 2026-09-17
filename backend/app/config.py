"""
AI Trading Desk Configuration
"""
import os

BITGET_HOST = 'api.bitget.com'
BITGET_IP = '104.18.15.166'
BASE_URL = 'https://api.bitget.com'

PORTFOLIO_NAV_USD = 100000.0   # $100k test account
MAX_RISK_PER_TRADE_PCT = 0.05  # 5% max risk
DEFAULT_LEVERAGE = 3

MONITORED_ASSETS = [
    {"symbol": "SPYUSDT", "spot_symbol": "RSPYUSDT", "type": "PDS_DISLOCATION", "name": "S&P 500 ETF"},
    {"symbol": "QQQUSDT", "spot_symbol": "RQQQUSDT", "type": "PDS_DISLOCATION", "name": "Nasdaq 100 ETF"},
    {"symbol": "BTCUSDT", "spot_symbol": None, "type": "CRYPTO_PERP", "name": "Bitcoin"},
    {"symbol": "ETHUSDT", "spot_symbol": None, "type": "CRYPTO_PERP", "name": "Ethereum"},
    {"symbol": "SOLUSDT", "spot_symbol": None, "type": "CRYPTO_PERP", "name": "Solana"},
]
