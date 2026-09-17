import React from "react";

export function MarketTickerStrip() {
  const tickers = [
    { label: "SPY/RSPY BASIS", value: "+12.5 bps", badge: "PDS-01 TRIGGERED", color: "text-[#F43F5E]", badgeColor: "bg-[#F43F5E]/15 text-[#F43F5E] border-[#F43F5E]/30" },
    { label: "BTC/USDT", value: "$64,250.0", badge: "OB SKEW 2.67x", color: "text-[#10B981]", badgeColor: "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30" },
    { label: "ETH/USDT", value: "$3,480.2", badge: "FUNDING +0.008%", color: "text-[#9CA3AF]", badgeColor: "bg-[#232730] text-[#9CA3AF] border-[#374151]" },
    { label: "SOL/USDT", value: "$142.50", badge: "FUND SQUEEZE -0.022%", color: "text-[#10B981]", badgeColor: "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30" },
    { label: "QQQ/RQQQ BASIS", value: "+4.1 bps", badge: "EQUILIBRIUM", color: "text-[#9CA3AF]", badgeColor: "bg-[#232730] text-[#9CA3AF] border-[#374151]" }
  ];

  return (
    <div className="w-full bg-[#0E1013] border-b border-[#1E2229] py-2 px-6 overflow-x-auto">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-6 text-[11px] font-mono whitespace-nowrap">
        <div className="flex items-center gap-1.5 text-[#6B7280]">
          <span className="uppercase tracking-widest text-[10px]">RADAR TELEMETRY</span>
          <span>→</span>
        </div>

        <div className="flex items-center gap-7 overflow-x-auto">
          {tickers.map((t, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-[#9CA3AF] font-medium">{t.label}:</span>
              <span className={`font-semibold ${t.color}`}>{t.value}</span>
              <span className={`px-1.5 py-0.5 rounded-[4px] border text-[9.5px] font-bold ${t.badgeColor}`}>
                {t.badge}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden xl:flex items-center gap-2 text-[#6B7280] text-[10.5px]">
          <span>BITGET API:</span>
          <span className="text-[#10B981]">14ms</span>
        </div>
      </div>
    </div>
  );
}
