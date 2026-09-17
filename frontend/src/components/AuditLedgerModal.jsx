import React from "react";

export function AuditLedgerModal({ isOpen, onClose, auditLog }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-[840px] bg-[#12151B] border border-[#232832] rounded-[16px] shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden my-8">
        <div className="p-6 bg-[#0E1014] border-b border-[#1E2229] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
            <h3 className="text-[18px] font-mono font-bold text-white tracking-tight">
              TRADER DECISION AUDIT LEDGER
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full border border-[#232730] flex items-center justify-center text-[#8E96A5] hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3 font-mono text-[12px]">
          {auditLog.length === 0 ? (
            <div className="text-center py-10 text-[#6B7280]">
              No human decisions recorded yet. Review an opportunity to record your first authorization.
            </div>
          ) : (
            auditLog.map((log, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-[8px] border flex items-start justify-between gap-4 ${
                  log.decision === "AUTHORIZED"
                    ? "bg-[#10B981]/5 border-[#10B981]/30"
                    : "bg-[#F43F5E]/5 border-[#F43F5E]/30"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[10.5px] ${
                        log.decision === "AUTHORIZED"
                          ? "bg-[#10B981] text-[#0B0C0E]"
                          : "bg-[#F43F5E] text-white"
                      }`}
                    >
                      {log.decision}
                    </span>
                    <span className="text-white font-bold">{log.symbol} {log.direction}</span>
                    {log.order_id && (
                      <span className="text-[#6B7280] text-[10.5px]">Order: {log.order_id}</span>
                    )}
                  </div>
                  <p className="text-[#9CA3AF] text-[11.5px] mt-1.5">{log.notes}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-white font-semibold">{log.allocated_usd || "--"}</div>
                  <div className="text-[#6B7280] text-[10px] mt-0.5">{log.timestamp}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-[#0A0C0E] border-t border-[#1E2229] text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-[6px] bg-[#232832] text-white text-[12px] font-mono hover:bg-[#2D3340] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
