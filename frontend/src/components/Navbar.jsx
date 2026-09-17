import React from "react";

export function Navbar({ onRescan, onOpenAudit, auditCount, scanning }) {
  return (
    <header className="sticky top-0 z-40 bg-[#0E1013]/90 backdrop-blur-md border-b border-[#1E2229]">
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand & Track Badge */}
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-mono text-[14px] font-bold tracking-[0.14em] uppercase text-white">
              BITGET AI DESK
            </span>
          </div>
          <span className="text-[#3A3F4C] text-sm">/</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] border border-[#232730] bg-[#14171D] text-[#8E96A5] font-mono text-[10.5px] uppercase tracking-wider font-medium">
            Track 3: Human-in-the-Loop
          </span>
        </div>

        {/* Center: System Status & Risk Kernel */}
        <div className="hidden lg:flex items-center gap-6 text-[12px] font-mono text-[#8E96A5]">
          <div className="flex items-center gap-2">
            <span className="text-[#555C6B]">NAV:</span>
            <span className="text-white font-medium">$100,000.00</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#555C6B]">Risk Cap / Trade:</span>
            <span className="text-[#10B981] font-medium">$5,000 (5%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#555C6B]">Execution Gate:</span>
            <span className="text-[#F59E0B] font-medium">Trader Authorization Required</span>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAudit}
            className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] border border-[#232730] bg-[#14171D] hover:bg-[#1C2028] text-[#D1D5DB] text-[12px] font-mono transition-colors cursor-pointer"
          >
            <span>Decision Audit</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#2A303C] text-[10px] text-[#A1A7B5] font-bold">
              {auditCount}
            </span>
          </button>

          <button
            onClick={onRescan}
            disabled={scanning}
            className="flex items-center gap-2 px-4 py-1.5 rounded-[6px] bg-[#10B981] hover:bg-[#0EA271] text-[#0B0C0E] text-[12.5px] font-semibold font-mono tracking-tight transition-all cursor-pointer disabled:opacity-50"
          >
            <span className={scanning ? "animate-spin" : ""}>⚡</span>
            <span>{scanning ? "SCANNING..." : "RESCAN MARKETS"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
