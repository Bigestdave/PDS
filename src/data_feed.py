"""
PDS-v1 Data Feed: Bitget API Data Connector, Timestamp Alignment, and Caching
"""
import socket
import urllib.request
import json
import time
import os
import datetime
import pandas as pd
import numpy as np
from src.config import BITGET_HOST, BITGET_IP, BASE_URL, PAIRS, DATA_DIR

# Monkey-patch socket.getaddrinfo for reliable DNS resolution
orig_getaddrinfo = socket.getaddrinfo
def custom_getaddrinfo(host, port, family=0, type=0, proto=0, flags=0):
    if host == BITGET_HOST:
        return orig_getaddrinfo(BITGET_IP, port, family, type, proto, flags)
    return orig_getaddrinfo(host, port, family, type, proto, flags)
socket.getaddrinfo = custom_getaddrinfo

class BitgetDataFeed:
    def __init__(self, asset='SPY'):
        if asset not in PAIRS:
            raise ValueError(f"Unknown asset: {asset}. Available: {list(PAIRS.keys())}")
        self.asset = asset
        self.spot_symbol = PAIRS[asset]['spot_symbol']
        self.perp_symbol = PAIRS[asset]['perp_symbol']
        self.cache_file = os.path.join(DATA_DIR, f"{asset}_synchronized_1h.csv")

    def fetch_spot_candles(self, limit=1000):
        url = f"{BASE_URL}/api/v2/spot/market/candles?symbol={self.spot_symbol}&granularity=1h&limit={limit}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            rows = data.get('data', [])
        
        df = pd.DataFrame(rows)
        df['ts_hr'] = (pd.to_numeric(df[0]) // 1000 // 3600) * 3600
        df['spot_close'] = pd.to_numeric(df[4])
        df['spot_vol'] = pd.to_numeric(df[5])
        df = df.drop_duplicates(subset=['ts_hr']).sort_values('ts_hr').reset_index(drop=True)
        return df[['ts_hr', 'spot_close', 'spot_vol']]

    def fetch_perp_candles(self, pages=5):
        all_rows = []
        curr_end = None
        for p in range(pages):
            url = f"{BASE_URL}/api/v2/mix/market/candles?symbol={self.perp_symbol}&granularity=1H&productType=USDT-FUTURES&limit=500"
            if curr_end:
                url = f"{BASE_URL}/api/v2/mix/market/history-candles?symbol={self.perp_symbol}&granularity=1H&productType=USDT-FUTURES&limit=100&endTime={curr_end}"
            try:
                req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=10) as resp:
                    data = json.loads(resp.read().decode())
                    rows = data.get('data', [])
                    if not rows:
                        break
                    all_rows.extend(rows)
                    curr_end = int(rows[-1][0]) - 1
                    if len(rows) < 100 and curr_end:
                        break
                time.sleep(0.05)
            except Exception:
                break

        df = pd.DataFrame(all_rows)
        df['ts_hr'] = (pd.to_numeric(df[0]) // 1000 // 3600) * 3600
        df['perp_close'] = pd.to_numeric(df[4])
        df['perp_vol'] = pd.to_numeric(df[5])
        df = df.drop_duplicates(subset=['ts_hr']).sort_values('ts_hr').reset_index(drop=True)
        return df[['ts_hr', 'perp_close', 'perp_vol']]

    def fetch_funding_history(self, pages=5):
        all_funding = []
        for page in range(1, pages + 1):
            url = f"{BASE_URL}/api/v2/mix/market/history-fund-rate?symbol={self.perp_symbol}&productType=USDT-FUTURES&pageSize=100&pageNo={page}"
            try:
                req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=10) as resp:
                    data = json.loads(resp.read().decode())
                    rows = data.get('data', [])
                    if not rows:
                        break
                    all_funding.extend(rows)
                time.sleep(0.05)
            except Exception:
                break

        df = pd.DataFrame(all_funding)
        if not df.empty:
            df['ts_hr'] = (pd.to_numeric(df['fundingTime']) // 1000 // 3600) * 3600
            df['funding_rate'] = pd.to_numeric(df['fundingRate'])
            df = df.drop_duplicates(subset=['ts_hr']).sort_values('ts_hr').reset_index(drop=True)
            return df[['ts_hr', 'funding_rate']]
        return pd.DataFrame(columns=['ts_hr', 'funding_rate'])

    def get_synchronized_dataset(self, use_cache=True):
        if use_cache and os.path.exists(self.cache_file):
            df = pd.read_csv(self.cache_file)
            df['dt_utc'] = pd.to_datetime(df['dt_utc'])
            df['dt_et'] = pd.to_datetime(df['dt_et'])
            return df

        print(f"Downloading live synchronized market data for {self.asset}...")
        df_spot = self.fetch_spot_candles()
        df_perp = self.fetch_perp_candles()
        df_fund = self.fetch_funding_history()

        # Merge on hourly timestamps
        merged = pd.merge(df_spot, df_perp, on='ts_hr', how='inner')
        merged = pd.merge(merged, df_fund, on='ts_hr', how='left')
        merged['funding_rate'] = merged['funding_rate'].ffill().fillna(0.0)

        # Datetime & Session tagging
        merged['dt_utc'] = pd.to_datetime(merged['ts_hr'], unit='s', utc=True)
        merged['dt_et'] = merged['dt_utc'].dt.tz_convert('America/New_York')
        merged['hour_et'] = merged['dt_et'].dt.hour
        merged['dow'] = merged['dt_et'].dt.weekday

        def assign_session(r):
            dow, h = r['dow'], r['hour_et']
            if dow in [5, 6] or (dow == 4 and h >= 20):
                return 'WEEKEND'
            if dow == 0 and h < 4:
                return 'ON'
            if 4 <= h < 9 or (h == 9 and r['dt_et'].minute < 30):
                return 'PRE'
            if 9 <= h < 16:
                return 'RTH'
            if 16 <= h < 20:
                return 'AH'
            return 'ON'

        merged['session'] = merged.apply(assign_session, axis=1)
        merged['is_weekend'] = merged['session'] == 'WEEKEND'
        merged['is_weekday'] = ~merged['is_weekend']
        merged['is_rth'] = merged['session'] == 'RTH'

        # Basis Dislocation formula: ln(P_perp / P_spot) * 10,000 bps
        merged['basis_bps'] = (merged['perp_close'] - merged['spot_close']) / merged['spot_close'] * 10000.0

        # Cache to disk
        merged.to_csv(self.cache_file, index=False)
        print(f"Synchronized {len(merged)} 1H bars for {self.asset} saved to {self.cache_file}")
        return merged
