import React, { useState } from "react";
import { AccentDash, IndexPill } from "./primitives";
import { useInView } from "../hooks/useInView";

const CAPITAL_OPTIONS = [25000, 50000, 100000, 250000, 500000];

const RISK_TIERS = [
  {
    name: "Conservative",
    leverage: 1,
    desc: "1:1 cash-collateralized, zero liquidation risk",
    netBps: 26.76,
    maxDdBps: 140.2,
    badge: "Lowest Risk",
    badgeColor: "bg-[#EAEAE5] text-[#555555]",
  },
  {
    name: "Moderate",
    leverage: 2,
    desc: "2x position sizing, balanced return profile",
    netBps: 26.76,
    maxDdBps: 140.2,
    badge: "Balanced",
    badgeColor: "bg-[#E6EFE6] text-[#3B663B]",
  },
  {
    name: "Active Alpha",
    leverage: 5,
    desc: "Targeted institutional deployment",
    netBps: 26.76,
    maxDdBps: 140.2,
    badge: "Recommended",
    badgeColor: "bg-[#7F8F63] text-white",
  },
  {
    name: "High Conviction",
    leverage: 10,
    desc: "Maximum capital efficiency with hard stop",
    netBps: 26.76,
    maxDdBps: 140.2,
    badge: "Maximum Yield",
    badgeColor: "bg-[#111111] text-white",
  },
];

export function PortfolioSection() {
  const [capital, setCapital] = useState(100000);
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const days = 20;
  const annualFactor = 365.25 / days;

  return (
    <section
      id="portfolio"
      ref={ref}
      className={`py-16 lg:py-24 border-t border-[#EAEAE5] transition-all duration-800 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 mb-4">
            <AccentDash />
            <span className="font-mono text-[11px] tracking-[0.2em] text-[#747474] uppercase font-semibold">
              CAPITAL & RISK SIMULATION
            </span>
          </div>
          <h2 className="text-[36px] sm:text-[42px] font-bold text-[#111111] leading-[1.08] tracking-[-0.03em] mb-4">
            Translating edge into dollar returns.
          </h2>
          <p className="text-[14.5px] leading-relaxed text-[#747474] mb-6">
            PDS-01’s statistical edge of <span className="font-mono text-[#111111] font-semibold">+1.41 bps net</span> per trade translates directly into predictable, market-neutral dollar profits. Select a portfolio base to model projected yield and downside risk.
          </p>

          {/* Interactive Capital Selector */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#999999] font-medium">
              Select Starting Portfolio (USD)
            </div>
            <div className="flex flex-wrap gap-2">
              {CAPITAL_OPTIONS.map((val) => (
                <button
                  key={val}
                  onClick={() => setCapital(val)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-mono font-medium transition-all ${
                    capital === val
                      ? "bg-[#111111] text-white shadow-sm"
                      : "bg-[#FDFDFB] border border-[#E5E5DE] text-[#666666] hover:border-[#7F8F63] hover:text-[#111111]"
                  }`}
                >
                  ${val >= 1000 ? `${val / 1000}k` : val}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 rounded-[12px] border border-[#E5E5DE] bg-[#FDFDFB]">
            <div className="text-[11px] font-mono text-[#747474] uppercase tracking-wider mb-1">
              Active Trade Guardrail
            </div>
            <div className="text-[13px] text-[#333333] leading-snug">
              Every position has a mandatory <strong className="text-[#111111]">+15 bps hard stop</strong> and an <strong className="text-[#111111]">8-hour timeout</strong>. Maximum loss is strictly capped regardless of market conditions.
            </div>
          </div>
        </div>

        {/* Right Column: Table / Cards */}
        <div className="lg:col-span-8">
          <div className="rounded-[16px] border border-[#E5E5DE] bg-[#FDFDFB] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
            <div className="p-6 border-b border-[#EAEAE5] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#747474]">Portfolio Base</span>
                <div className="text-[28px] font-mono font-bold text-[#111111] leading-tight">
                  ${capital.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IndexPill>19 AUDITED TRADES</IndexPill>
                <IndexPill>SPYUSDT PERPETUAL</IndexPill>
              </div>
            </div>

            <div className="divide-y divide-[#EAEAE5]">
              {RISK_TIERS.map((tier) => {
                const notional = capital * tier.leverage;
                const netProfit = (tier.netBps / 10000.0) * notional;
                const periodRoi = (netProfit / capital) * 100.0;
                const annRoi = periodRoi * annualFactor;
                const maxDdDollars = (tier.maxDdBps / 10000.0) * notional;
                const maxDdPct = (maxDdDollars / capital) * 100.0;

                return (
                  <div
                    key={tier.name}
                    className="p-5 sm:p-6 hover:bg-[#FAF9F5] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 md:w-1/3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[15px] text-[#111111]">{tier.name}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-medium ${tier.badgeColor}`}>
                          {tier.leverage}x
                        </span>
                      </div>
                      <p className="text-[12px] text-[#747474]">{tier.desc}</p>
                      <div className="text-[11px] font-mono text-[#999999]">
                        Notional: ${notional.toLocaleString()}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 md:w-2/3">
                      <div>
                        <div className="text-[11px] font-mono text-[#747474] uppercase">Net Profit (20d)</div>
                        <div className="text-[16px] font-mono font-bold text-[#3B663B] mt-0.5">
                          +${netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div className="text-[11px] font-mono text-[#747474]">+{periodRoi.toFixed(2)}%</div>
                      </div>

                      <div>
                        <div className="text-[11px] font-mono text-[#747474] uppercase">Projected Ann.</div>
                        <div className="text-[16px] font-mono font-bold text-[#111111] mt-0.5">
                          +{annRoi.toFixed(1)}%
                        </div>
                        <div className="text-[11px] font-mono text-[#747474]">Annualized ROI</div>
                      </div>

                      <div>
                        <div className="text-[11px] font-mono text-[#747474] uppercase">Max Drawdown</div>
                        <div className="text-[16px] font-mono font-semibold text-[#D92D20] mt-0.5">
                          -${maxDdDollars.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div className="text-[11px] font-mono text-[#747474]">-{maxDdPct.toFixed(2)}% of capital</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
