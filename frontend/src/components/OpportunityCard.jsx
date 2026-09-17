import React from "react";

export function OpportunityCard({ card, onReview }) {
  const isShort = card.direction === "SHORT";
  const isPDS = card.strategy_type === "PDS_DISLOCATION";

  return (
    <div className="rounded-[14px] border border-[#1E2229] bg-[#12151B] p-6 lg:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:border-[#2E3440] transition-all flex flex-col justify-between relative overflow-hidden group">
      {/* Top Accent Stripe */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] ${
          isShort ? "bg-[#F43F5E]" : "bg-[#10B981]"
        }`}
      />

      <div>
        {/* Header: Symbol, Direction, Category Badge, Conviction Gauge */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-[22px] font-bold text-white tracking-tight font-mono">
                {card.symbol}
              </h3>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-[4px] font-mono text-[11px] font-bold tracking-wide ${
                  isShort
                    ? "bg-[#F43F5E]/15 text-[#F43F5E] border border-[#F43F5E]/30"
                    : "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30"
                }`}
              >
                {card.direction}
              </span>
              {isPDS && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] bg-[#7F8F63]/20 text-[#A3B880] border border-[#7F8F63]/40 font-mono text-[10px] font-semibold">
                  PRIMITIVE 01
                </span>
              )}
            </div>
            <p className="text-[12px] font-mono text-[#8E96A5] mt-1">
              {card.strategy_label}
            </p>
          </div>

          {/* Conviction Score Pill */}
          <div className="text-right">
            <div className="text-[9.5px] font-mono uppercase tracking-widest text-[#6B7280]">
              CONVICTION
            </div>
            <div className="flex items-baseline justify-end gap-1 font-mono mt-0.5">
              <span className="text-[22px] font-bold text-white leading-none">
                {card.conviction}
              </span>
              <span className="text-[12px] text-[#6B7280]">/ 100</span>
            </div>
          </div>
        </div>

        {/* Conviction Progress Bar */}
        <div className="w-full h-1.5 bg-[#1B1F27] rounded-full overflow-hidden mb-5">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              card.conviction >= 80
                ? "bg-[#10B981]"
                : card.conviction >= 70
                ? "bg-[#3B82F6]"
                : "bg-[#F59E0B]"
            }`}
            style={{ width: `${card.conviction}%` }}
          />
        </div>

        {/* Analytical Thesis */}
        <div className="mb-6">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] mb-1.5 font-semibold">
            THESIS
          </div>
          <p className="text-[13.5px] text-[#C5CAD3] leading-[1.6]">
            {card.thesis}
          </p>
        </div>

        {/* Key Trade Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-[10px] bg-[#0E1014] border border-[#1A1D24] mb-6 font-mono text-[12px]">
          <div>
            <div className="text-[9.5px] text-[#6B7280] uppercase tracking-wider">ENTRY</div>
            <div className="text-white font-semibold mt-1">{card.entry_price}</div>
          </div>
          <div>
            <div className="text-[9.5px] text-[#6B7280] uppercase tracking-wider">TARGET</div>
            <div className="text-[#10B981] font-semibold mt-1">{card.target_price}</div>
          </div>
          <div>
            <div className="text-[9.5px] text-[#6B7280] uppercase tracking-wider">INVALIDATION</div>
            <div className="text-[#F43F5E] font-semibold mt-1">{card.invalidation_price}</div>
          </div>
          <div>
            <div className="text-[9.5px] text-[#6B7280] uppercase tracking-wider">R : R / SIZE</div>
            <div className="text-white font-semibold mt-1">
              {card.risk_reward} <span className="text-[#6B7280] font-normal">({card.suggested_size_usd})</span>
            </div>
          </div>
        </div>

        {/* Why Now: Drivers Checklist */}
        <div className="mb-6 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] font-semibold">
            WHY NOW
          </div>
          {card.why_now.map((driver, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[12.5px] text-[#9CA3AF]">
              <span className="text-[#10B981] text-[11px] font-mono select-none">✓</span>
              <span>{driver}</span>
            </div>
          ))}
        </div>

        {/* What Would Change My Mind (Pre-Mortem Invalidation) */}
        <div className="p-3.5 rounded-[8px] bg-[#161313] border border-[#3A1B1F] mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#F43F5E] text-xs">⚠</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F87171] font-bold">
              WHAT WOULD CHANGE MY MIND
            </span>
          </div>
          <p className="text-[12px] text-[#E5A7A7] leading-relaxed">
            {card.what_changes_mind}
          </p>
        </div>
      </div>

      {/* Action Footer: Review Trade Button */}
      <div className="pt-2 border-t border-[#1C2027] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          <span className="text-[11px] font-mono text-[#8E96A5]">
            {card.status === "AUTHORIZED" ? (
              <span className="text-[#10B981] font-bold">✓ AUTHORIZED & EXECUTED</span>
            ) : card.status === "REJECTED" ? (
              <span className="text-[#9CA3AF] font-bold">✕ REJECTED BY TRADER</span>
            ) : (
              "Awaiting Human Review"
            )}
          </span>
        </div>

        <button
          onClick={() => onReview(card)}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-[8px] bg-white hover:bg-[#E5E7EB] text-[#0B0C0E] text-[13px] font-bold font-mono tracking-tight transition-all cursor-pointer shadow-md hover:scale-[1.02]"
        >
          <span>REVIEW TRADE</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
