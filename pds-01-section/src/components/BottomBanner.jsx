import React from "react";
import { AccentDash } from "./primitives";

export function BottomBanner() {
  return (
    <footer className="border-t border-[#EAEAE5] py-10 mt-8 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Left text with green dash */}
        <div className="flex items-center gap-3.5">
          <AccentDash />
          <p className="text-[14px] font-medium text-[#111111] leading-relaxed">
            Built from Bitget market data. Audited execution logic. Out-of-sample validation.
          </p>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#strategy"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-[#F7F7F4] text-[13px] font-medium hover:bg-[#252525] transition-colors shadow-sm"
          >
            <span>Explore the strategy</span>
            <span className="text-xs">→</span>
          </a>

          <a
            href="https://github.com/Bigestdave/PDS"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E5E5DE] bg-[#FDFDFB] text-[#111111] text-[13px] font-medium hover:bg-[#F2F2EE] transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>PDS Repository</span>
          </a>

          <a
            href="https://github.com/Bigestdave/Reopen"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E5E5DE] bg-[#FDFDFB] text-[#111111] text-[13px] font-medium hover:bg-[#F2F2EE] transition-colors"
          >
            <span>REOPEN Risk Desk</span>
            <span className="text-xs">↗</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
