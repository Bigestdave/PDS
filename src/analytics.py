"""
PDS-v1 Analytics: Official Performance Metrics, Out-of-Sample Decay, and Monte Carlo Testing
"""
import numpy as np
import pandas as pd
from scipy import stats

class PerformanceAnalytics:
    @staticmethod
    def compute_metrics(series_bps, hold_hrs_mean=4.8):
        """
        Computes Sharpe, Sortino, Max Drawdown, Win Rate, and Total Return from PnL series in bps.
        """
        if len(series_bps) == 0:
            return {}

        n = len(series_bps)
        mean_b = series_bps.mean()
        std_b = series_bps.std()
        win_rate = (series_bps > 0).mean() * 100.0

        # Annualization factor based on average trade duration
        ann_factor = np.sqrt(252 * 24 / max(1.0, hold_hrs_mean))
        sharpe = (mean_b / std_b) * ann_factor if std_b > 0 else 0.0

        neg_series = series_bps[series_bps < 0]
        neg_std = neg_series.std() if len(neg_series) > 1 else 1.0
        sortino = (mean_b / neg_std) * ann_factor if neg_std > 0 else 0.0

        cum = series_bps.cumsum()
        drawdown_bps = (cum - cum.cummax()).min()

        return {
            'trades': n,
            'mean_bps': mean_b,
            'std_bps': std_b,
            'win_rate_pct': win_rate,
            'cum_pnl_bps': series_bps.sum(),
            'sharpe': sharpe,
            'sortino': sortino,
            'max_drawdown_bps': drawdown_bps
        }

    @staticmethod
    def generate_full_report(df_trades):
        """
        Generates comprehensive comparative performance report across execution models and IS/OOS.
        """
        if df_trades.empty:
            return "No trades recorded."

        hold_mean = df_trades['hold_hrs'].mean()
        is_trades = df_trades[~df_trades['is_oos']]
        oos_trades = df_trades[df_trades['is_oos']]

        models = [
            ('Maker-Only Execution (5.0 bp hurdle)', 'net_maker_bps'),
            ('Mixed Execution (10.5 bp hurdle)', 'net_mixed_bps'),
            ('Taker-Only Execution (16.0 bp hurdle)', 'net_taker_bps')
        ]

        summary_rows = []
        for m_name, col in models:
            m_all = PerformanceAnalytics.compute_metrics(df_trades[col], hold_mean)
            m_is = PerformanceAnalytics.compute_metrics(is_trades[col], hold_mean)
            m_oos = PerformanceAnalytics.compute_metrics(oos_trades[col], hold_mean)

            decay = (m_oos['sharpe'] / m_is['sharpe']) if m_is.get('sharpe', 0) != 0 else 0.0

            summary_rows.append({
                'Execution Model': m_name,
                'All Mean': f"{m_all['mean_bps']:+.2f} bps",
                'IS Mean': f"{m_is.get('mean_bps', 0):+.2f} bps",
                'OOS Mean': f"{m_oos.get('mean_bps', 0):+.2f} bps",
                'All WR': f"{m_all['win_rate_pct']:.1f}%",
                'Ann. Sharpe': f"{m_all['sharpe']:+.2f}",
                'IS Sharpe': f"{m_is.get('sharpe', 0):+.2f}",
                'OOS Sharpe': f"{m_oos.get('sharpe', 0):+.2f}",
                'OOS Decay': f"{decay:.2f}x",
                'Max DD': f"{m_all['max_drawdown_bps']:.1f} bps"
            })

        return pd.DataFrame(summary_rows)

    @staticmethod
    def run_monte_carlo_shuffle(df, df_trades, num_perms=1000):
        """
        Runs Monte Carlo permutation test comparing observed basis reversion against random entries.
        """
        if df_trades.empty:
            return 1.0

        obs_rev = -df_trades['delta_basis_bps'].mean()
        n_ev = len(df_trades)
        valid_indices = range(len(df) - 8)
        
        np.random.seed(42)
        shuffled_means = []
        for _ in range(num_perms):
            rand_idx = np.random.choice(valid_indices, size=n_ev, replace=False)
            shuff_diffs = [-(df.loc[r + 8, 'basis_bps'] - df.loc[r, 'basis_bps']) for r in rand_idx]
            shuffled_means.append(np.mean(shuff_diffs))

        p_value = (np.array(shuffled_means) >= obs_rev).mean()
        return p_value
