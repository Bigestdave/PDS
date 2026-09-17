import React, { useState } from "react";

export function EvidenceModal({ card, onClose, onAuthorize, onReject }) {
  const [adjustedSize, setAdjustedSize] = useState(
    parseFloat(card.suggested_size_usd.replace(/[^0-9.]/g, "")) || 4500
  );
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  if (!card) return null;

  const isShort = card.direction === "SHORT";
  const evidence = card.evidence;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-[960px] bg-[#12151B] border border-[#232832] rounded-[16px] shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-6 bg-[#0E1014] border-b border-[#1E2229] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isShort ? "bg-[#F43F5E]" : "bg-[#10B981]"
              }`}
            />
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-[20px] font-mono font-bold text-white tracking-tight">
                  {card.symbol} — {card.direction}
                </h2>
                <span className="px-2 py-0.5 rounded-[4px] bg-[#1C2028] text-[#8E96A5] font-mono text-[11px]">
                  {card.strategy_label}
                </span>
              </div>
              <p className="text-[12px] font-mono text-[#6B7280] mt-0.5">
                Decision Dossier ID: {card.id} • Generated at {card.timestamp}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#232730] flex items-center justify-center text-[#8E96A5] hover:text-white hover:border-[#374151] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* 4-Step Progressive Evidence Pipeline Bar */}
        <div className="grid grid-cols-4 border-b border-[#1E2229] font-mono text-[11px] bg-[#0A0C0E]">
          <div className="p-3 text-center border-r border-[#1E2229] text-[#10B981] font-semibold bg-[#10B981]/5">
            01 SIGNAL
          </div>
          <div className="p-3 text-center border-r border-[#1E2229] text-[#3B82F6] font-semibold bg-[#3B82F6]/5">
            02 EVIDENCE
          </div>
          <div className="p-3 text-center border-r border-[#1E2229] text-[#F59E0B] font-semibold bg-[#F59E0B]/5">
            03 RISK AUDIT
          </div>
          <div className="p-3 text-center text-white font-bold bg-[#14171D]">
            04 TRADER DECISION
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-7 max-h-[70vh] overflow-y-auto">
          {/* 1. Microstructural Signal Telemetry */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#6B7280] font-bold mb-3">
              STEP 01: MICROSTRUCTURAL SIGNAL DETECTION
            </h4>
            <div className="p-4 rounded-[10px] bg-[#0E1014] border border-[#1A1E26] space-y-3">
              <p className="text-[13.5px] text-[#D1D5DB] font-medium">
                {evidence.signal_summary}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 font-mono text-[12px]">
                {Object.entries(evidence.telemetry_metrics).map(([key, val]) => (
                  <div key={key} className="p-2.5 rounded-[6px] bg-[#14171D] border border-[#1F242E]">
                    <div className="text-[9.5px] text-[#6B7280] uppercase truncate">{key}</div>
                    <div className="text-white font-bold mt-0.5 truncate">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Visual Evidence & Time-Series History */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#6B7280] font-bold mb-3">
              STEP 02: TELEMETRY & HISTORICAL CONTEXT
            </h4>
            <div className="p-5 rounded-[10px] bg-[#0E1014] border border-[#1A1E26]">
              <div className="text-[12px] font-mono text-[#8E96A5] mb-4 flex items-center justify-between">
                <span>RECENT SPREAD / DISLOCATION TRAJECTORY</span>
                <span className="text-[11px] text-[#10B981]">Bitget Synchronized Clock</span>
              </div>
              <div className="space-y-2 font-mono text-[12px]">
                {evidence.chart_series.map((pt, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-[#13161C] border border-[#1E232D]">
                    <span className="text-[#6B7280] font-medium">{pt.time}</span>
                    {pt.basis !== undefined && (
                      <span className="text-[#F43F5E] font-semibold">Basis Dislocation: +{pt.basis} bps</span>
                    )}
                    {pt.bid_skew !== undefined && (
                      <span className="text-[#10B981] font-semibold">Bid Imbalance: {pt.bid_skew}x</span>
                    )}
                    {pt.funding !== undefined && (
                      <span className="text-[#3B82F6] font-semibold">Funding Rate: {pt.funding}%</span>
                    )}
                    <span className="text-white">Price: ${pt.price || pt.perp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Risk Assessment & Invalidation Checklist */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#6B7280] font-bold mb-3">
              STEP 03: DOWNSIDE RISK & STRESS TEST
            </h4>
            <div className="p-4 rounded-[10px] bg-[#161313] border border-[#3A1B1F] space-y-3 mb-4">
              <div className="flex items-center gap-2 text-[#F87171] font-mono text-[11px] font-bold">
                <span>⚠ PRE-TRADE FAILURE MODE ANALYSIS</span>
              </div>
              <p className="text-[13px] text-[#E5A7A7] leading-relaxed">
                {evidence.risk_assessment}
              </p>
            </div>

            <div className="p-4 rounded-[10px] bg-[#0E1014] border border-[#1A1E26]">
              <div className="text-[11px] font-mono uppercase text-[#6B7280] font-bold mb-3">
                PRE-EXECUTION SANITY CHECKLIST
              </div>
              <div className="space-y-2">
                {evidence.decision_checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 font-mono text-[12px] text-[#D1D5DB]">
                    <span className="w-4 h-4 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Human Authorization & Parameter Adjustment */}
          <div className="pt-4 border-t border-[#1E2229]">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#10B981] font-bold mb-3">
              STEP 04: TRADER EXECUTION CONTROL (HUMAN SIGN-OFF REQUIRED)
            </h4>

            <div className="p-5 rounded-[12px] bg-[#0A0C0E] border border-[#232832] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#8E96A5] mb-1.5">
                    Position Size (USD Allocation)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-[#6B7280] font-mono">$</span>
                    <input
                      type="number"
                      value={adjustedSize}
                      onChange={(e) => setAdjustedSize(parseFloat(e.target.value) || 0)}
                      className="w-full pl-7 pr-3 py-2 rounded-[6px] bg-[#14171D] border border-[#2A303C] text-white font-mono text-[13px] focus:outline-none focus:border-[#10B981]"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#6B7280] mt-1 block">
                    Max allowed risk budget: $5,000 (5% NAV)
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#8E96A5] mb-1.5">
                    Trader Decision Notes / Rationale
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Approved based on basis convergence history"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-[6px] bg-[#14171D] border border-[#2A303C] text-white font-mono text-[13px] focus:outline-none focus:border-[#10B981]"
                  />
                  <span className="text-[10px] font-mono text-[#6B7280] mt-1 block">
                    Logged to immutable audit ledger
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3.5">
                <button
                  onClick={() => onReject(card.id, notes)}
                  className="px-5 py-2.5 rounded-[8px] border border-[#3A1B1F] bg-[#1A1214] hover:bg-[#25181B] text-[#F87171] text-[13px] font-mono font-semibold transition-colors cursor-pointer"
                >
                  ✕ REJECT OPPORTUNITY
                </button>

                <button
                  onClick={() => onAuthorize(card.id, adjustedSize, notes)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-[8px] bg-[#10B981] hover:bg-[#0EA271] text-[#0B0C0E] text-[13px] font-mono font-bold tracking-tight transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
                >
                  <span>✓ AUTHORIZE & EXECUTE</span>
                  <span>(BITGET)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
