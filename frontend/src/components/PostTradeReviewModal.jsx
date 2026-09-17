import React, { useState, useEffect } from "react";

export function PostTradeReviewModal({ isOpen, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetch("http://127.0.0.1:8000/api/post-trade-review")
        .then((r) => r.json())
        .then((d) => {
          setData(d);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-[960px] bg-[#12151B] border border-[#232832] rounded-[16px] shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-[#0E1014] border-b border-[#1E2229] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
            <div>
              <h3 className="text-[19px] font-mono font-bold text-white tracking-tight">
                POST-TRADE REVIEW & REOPEN RISK ENGINE
              </h3>
              <p className="text-[12px] font-mono text-[#6B7280] mt-0.5">
                Bitget Track 3 Rubric: Continuous trade post-mortems and episodic memory calibration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full border border-[#232730] flex items-center justify-center text-[#8E96A5] hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-7 max-h-[72vh] overflow-y-auto">
          {loading || !data ? (
            <div className="py-12 text-center text-[#6B7280] font-mono animate-pulse">
              Aggregating trade settlement logs & calibrating heuristics...
            </div>
          ) : (
            <>
              {/* Summary Performance Metric Cards */}
              <div>
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#6B7280] font-bold mb-3">
                  HISTORICAL REVERSION AUDIT SUMMARY (19 TRADES)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 font-mono text-[12px]">
                  {Object.entries(data.summary_metrics).map(([k, v]) => (
                    <div key={k} className="p-3 rounded-[8px] bg-[#0E1014] border border-[#1A1E26]">
                      <div className="text-[9.5px] text-[#6B7280] uppercase truncate">
                        {k.replace(/_/g, " ")}
                      </div>
                      <div className="text-white font-bold text-[13px] mt-1 truncate">
                        {v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Episodic Memory & Learned Heuristics */}
              <div>
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#10B981] font-bold mb-3">
                  EPISODIC HEURISTICS & SELF-IMPROVEMENT RULES
                </h4>
                <div className="space-y-3">
                  {data.episodic_heuristics.map((h) => (
                    <div
                      key={h.id}
                      className="p-4 rounded-[10px] bg-[#0E1014] border border-[#1F2633] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] text-[10px] font-mono font-bold">
                            {h.id}
                          </span>
                          <span className="text-white font-bold font-mono text-[13px]">
                            {h.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[#8E96A5]">
                          Confidence: {h.confidence}
                        </span>
                      </div>
                      <p className="text-[12.5px] text-[#C5CAD3] leading-relaxed">
                        {h.insight}
                      </p>
                      <div className="p-2.5 rounded-[6px] bg-[#141820] border border-[#242C3B] font-mono text-[11.5px] text-[#A3B880] flex items-center gap-2">
                        <span className="font-bold text-[#10B981]">RULE:</span>
                        <span>{h.actionable_rule}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Trade Post-Mortems */}
              <div>
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#6B7280] font-bold mb-3">
                  INDIVIDUAL TRADE POST-MORTEMS (ACTUAL VS HYPOTHESIS)
                </h4>
                <div className="space-y-3 font-mono text-[12px]">
                  {data.recent_post_mortems.map((pm) => (
                    <div
                      key={pm.trade_id}
                      className="p-4 rounded-[10px] bg-[#0E1014] border border-[#1A1E26] space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-white font-bold text-[13px]">
                            {pm.trade_id} — {pm.symbol} ({pm.direction})
                          </span>
                          <span className="text-[#6B7280] text-[11px]">
                            Held: {pm.hold_duration}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10.5px] font-bold ${
                            pm.verdict.startsWith("WIN")
                              ? "bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40"
                              : "bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40"
                          }`}
                        >
                          {pm.verdict} ({pm.net_pnl_bps})
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11.5px] text-[#8E96A5]">
                        <div className="p-2 rounded bg-[#13161C]">
                          <span className="text-[#555C6B] block text-[10px] uppercase">Entry Hypothesis:</span>
                          <span className="text-[#D1D5DB]">{pm.entry_thesis}</span>
                        </div>
                        <div className="p-2 rounded bg-[#13161C]">
                          <span className="text-[#555C6B] block text-[10px] uppercase">Actual Outcome:</span>
                          <span className="text-[#D1D5DB]">{pm.actual_outcome}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-[#A1A7B5] bg-[#161920] p-2 rounded border border-[#202530]">
                        <span className="text-[#10B981] font-bold mr-1.5">Episodic Learning:</span>
                        {pm.learning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0A0C0E] border-t border-[#1E2229] flex items-center justify-between font-mono text-[11px] text-[#6B7280]">
          <span>Heuristic engine continuously updates upon order fill / settlement</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-[6px] bg-[#232832] text-white text-[12px] hover:bg-[#2D3340] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
