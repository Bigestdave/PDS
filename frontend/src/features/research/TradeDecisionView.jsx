import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Shield,
  Ticket,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Info,
  Check,
} from "lucide-react";
import { Card, Button } from "../../components/ui";
import { AssetIcon } from "../../components/ui/icons";

export function TradeDecisionView({ onNavigate, onAuthorize, onReject }) {
  const [orderType, setOrderType] = useState("Limit");
  const [authorized, setAuthorized] = useState(false);

  const handleAuth = () => {
    setAuthorized(true);
    onAuthorize?.("OPP-BTC-001");
  };

  return (
    <div className="animate-fade-up space-y-6">
      {/* Breadcrumb */}
      <button
        onClick={() => onNavigate?.("research-progress")}
        className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#5B6474] hover:text-[#0B1524] transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span>Back to research</span>
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <AssetIcon symbol="BTC" size={34} />
            <div className="flex items-center gap-2">
              <h1 className="text-[26px] font-bold text-[#0B1524] tracking-tight">BTCUSDT</h1>
              <span className="inline-flex items-center gap-1 bg-[#FDECEA] text-[#D92D20] text-[12px] font-bold px-2 py-0.5 rounded-full">
                SHORT <ChevronDown size={13} />
              </span>
            </div>
          </div>
          <div className="text-[17px] font-semibold text-[#0B1524] mt-1">
            Trade Decision
          </div>
          <p className="text-[13.5px] text-[#5B6474]">
            Perpetual dislocation / momentum exhaustion
          </p>
        </div>

        <div className="flex sm:flex-col items-start sm:items-end gap-1 text-[12px] font-mono text-[#5B6474]">
          <span className="inline-flex items-center gap-1.5 bg-[#DCFAE6] text-[#067647] font-bold px-2.5 py-0.5 rounded-full text-[11.5px]">
            ✓ RESEARCH COMPLETE
          </span>
          <div className="text-[#8B93A1]">Research ID: RE-2025-0417</div>
          <div className="text-[#8B93A1]">Detected: Apr 24, 2025 14:26</div>
        </div>
      </div>

      {/* REOPEN RECOMMENDATION Hero Banner */}
      <div className="rounded-[14px] bg-[#F0F5FF] border border-[#C8DAFF] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-[10px] bg-[#0052FF] grid place-items-center text-white shrink-0 font-bold text-[15px]">
            AI
          </div>
          <div>
            <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#0052FF]">
              REOPEN RECOMMENDATION
            </div>
            <div className="text-[22px] font-bold text-[#0B1524] tracking-tight">
              SHORT BTCUSDT
            </div>
            <div className="text-[13px] text-[#5B6474] mt-0.5">
              Based on RE-2025-0417 research. Human authorization required.
            </div>
          </div>
        </div>
        <div className="max-w-xs text-[12.5px] text-[#5B6474] leading-relaxed">
          The AI has completed its analysis and identified a high-probability setup based on multiple independent signals.
        </div>
      </div>

      {/* Main Grid: 70% Left + 30% Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Trade Ticket & Execution Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Trade Ticket */}
            <Card className="p-5">
              <div className="flex items-center gap-2 text-[12px] font-bold tracking-wider text-[#5B6474] uppercase mb-4">
                <Ticket size={16} className="text-[#0052FF]" />
                <span>TRADE TICKET</span>
              </div>
              <div className="grid grid-cols-2 gap-y-3.5 text-[13px]">
                <div>
                  <div className="text-[#5B6474]">ENTRY</div>
                  <div className="font-bold text-[16px] text-[#0B1524] font-mono">$108,320</div>
                  <div className="text-[10.5px] text-[#8B93A1]">Range: 108,200 - 108,500</div>
                </div>

                <div>
                  <div className="text-[#5B6474]">TARGET 1</div>
                  <div className="font-bold text-[16px] text-[#067647] font-mono">$106,540</div>
                  <div className="text-[10.5px] text-[#17B26A]">(-1.63%)</div>
                </div>

                <div>
                  <div className="text-[#5B6474]">TARGET 2</div>
                  <div className="font-bold text-[16px] text-[#067647] font-mono">$104,980</div>
                  <div className="text-[10.5px] text-[#17B26A]">(-3.09%)</div>
                </div>

                <div>
                  <div className="text-[#5B6474]">HARD STOP</div>
                  <div className="font-bold text-[16px] text-[#D92D20] font-mono">$110,420</div>
                  <div className="text-[10.5px] text-[#D92D20]">(+1.96%)</div>
                </div>
              </div>

              <div className="border-t border-[#EEF1F6] mt-4 pt-3 grid grid-cols-3 gap-2 text-[12px]">
                <div>
                  <div className="text-[#5B6474]">RISK / REWARD</div>
                  <div className="font-bold text-[#0B1524] font-mono mt-0.5">1 : 2.8</div>
                </div>
                <div>
                  <div className="text-[#5B6474]">POSITION SIZE</div>
                  <div className="font-bold text-[#0B1524] font-mono mt-0.5">0.75 BTC</div>
                </div>
                <div>
                  <div className="text-[#5B6474]">MAX LOSS</div>
                  <div className="font-bold text-[#D92D20] font-mono mt-0.5">$1,250</div>
                </div>
              </div>
            </Card>

            {/* Execution Card */}
            <Card className="p-5">
              <div className="flex items-center gap-2 text-[12px] font-bold tracking-wider text-[#5B6474] uppercase mb-4">
                <Zap size={16} className="text-[#0052FF]" />
                <span>EXECUTION</span>
              </div>

              <div className="space-y-3.5 text-[13px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#5B6474]">Order type</span>
                  <div className="flex items-center bg-[#F4F6FA] p-0.5 rounded-[6px]">
                    <button
                      onClick={() => setOrderType("Limit")}
                      className={`px-3 py-1 rounded-[5px] text-[12px] font-semibold transition-all ${
                        orderType === "Limit" ? "bg-[#0052FF] text-white shadow-xs" : "text-[#5B6474]"
                      }`}
                    >
                      Limit
                    </button>
                    <button
                      onClick={() => setOrderType("Market")}
                      className={`px-3 py-1 rounded-[5px] text-[12px] font-semibold transition-all ${
                        orderType === "Market" ? "bg-[#0052FF] text-white shadow-xs" : "text-[#5B6474]"
                      }`}
                    >
                      Market
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#5B6474]">Estimated fill</span>
                  <span className="font-bold text-[#0B1524] font-mono">$108,300 - 108,500</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#5B6474]">Fees</span>
                  <span className="text-[#0B1524]">Maker (0.02%) ~$16.25</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#5B6474]">Data</span>
                  <span className="font-mono text-[#8B93A1]">14:32:24 · 24ms</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Why This Trade vs What Would Change */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5">
              <div className="flex items-center gap-2 text-[13px] font-bold text-[#0B1524] mb-3">
                <Zap size={16} className="text-[#0052FF]" />
                <span>WHY THIS TRADE</span>
              </div>
              <ul className="space-y-2 text-[13px] text-[#1B2637]">
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#067647] mt-0.5 shrink-0" />
                  <span>Funding rate is +2.8σ above its 30-day mean.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#067647] mt-0.5 shrink-0" />
                  <span>Perpetual premium is trending higher than historical range while basis remains elevated.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#067647] mt-0.5 shrink-0" />
                  <span>Order-book imbalance shows increasing sell-side pressure.</span>
                </li>
              </ul>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-2 text-[13px] font-bold text-[#0B1524] mb-3">
                <AlertTriangle size={16} className="text-[#D92D20]" />
                <span>WHAT WOULD CHANGE THE DECISION</span>
              </div>
              <ul className="space-y-2 text-[13px] text-[#1B2637]">
                <li className="flex items-start gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FEF3E0] text-[#B54708] grid place-items-center text-[10px] font-bold mt-0.5 shrink-0">!</span>
                  <span>Basis &lt; +6 bps (back within normal range).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FEF3E0] text-[#B54708] grid place-items-center text-[10px] font-bold mt-0.5 shrink-0">!</span>
                  <span>Order-book imbalance flips positive (&gt; +20%).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FDECEA] text-[#D92D20] grid place-items-center text-[10px] font-bold mt-0.5 shrink-0">✕</span>
                  <span>BTC closes above $110,420.</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Market Context Chips */}
          <Card className="p-4 bg-[#F8FAFD] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[12.5px] font-semibold text-[#0B1524]">
              <Info size={16} className="text-[#0052FF]" />
              <span>MARKET CONTEXT (VIEW RESEARCH →)</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[12px] font-mono">
              <span className="bg-white border border-[#E6EAF0] px-2.5 py-1 rounded-[6px] font-medium text-[#0B1524]">BTCUSDT · 1H</span>
              <span className="bg-[#EAF1FF] border border-[#C8DAFF] px-2.5 py-1 rounded-[6px] font-semibold text-[#0052FF]">⚡ Perpetual premium +2.8σ</span>
              <span className="bg-white border border-[#E6EAF0] px-2.5 py-1 rounded-[6px] text-[#5B6474]">Basis expanding</span>
              <span className="bg-white border border-[#E6EAF0] px-2.5 py-1 rounded-[6px] text-[#5B6474]">Order-book pressure negative</span>
            </div>
          </Card>
        </div>

        {/* Right Rail: Trade Structure with Authorize */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEF1F6] mb-4">
              <span className="text-[13px] font-bold tracking-wider text-[#5B6474] uppercase">TRADE STRUCTURE</span>
            </div>

            <div className="flex items-center gap-2.5 mb-5">
              <AssetIcon symbol="BTC" size={28} />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[15px] text-[#0B1524]">BTCUSDT</span>
                  <span className="bg-[#FDECEA] text-[#D92D20] text-[10.5px] font-bold px-1.5 py-0.2 rounded">SHORT</span>
                </div>
                <div className="text-[11.5px] text-[#5B6474]">Perpetual vs. Spot</div>
              </div>
            </div>

            <div className="space-y-3 text-[13px]">
              <div className="flex justify-between">
                <span className="text-[#5B6474]">Entry</span>
                <span className="font-bold text-[#0B1524] font-mono">$108,320</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B6474]">Target 1</span>
                <span className="font-bold text-[#067647] font-mono">$106,540</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B6474]">Target 2</span>
                <span className="font-bold text-[#067647] font-mono">$104,980</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B6474]">Hard stop</span>
                <span className="font-bold text-[#D92D20] font-mono">$110,420</span>
              </div>
              <div className="border-t border-[#EEF1F6] pt-2.5 flex justify-between">
                <span className="text-[#5B6474]">Risk / reward</span>
                <span className="font-bold text-[#0B1524] font-mono">1 : 2.8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B6474]">Suggested size</span>
                <span className="font-bold text-[#0B1524] font-mono">0.75 BTC</span>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              <Button
                variant="primary"
                full
                size="lg"
                onClick={handleAuth}
                className="font-semibold text-[15px]"
              >
                {authorized ? "TRADE AUTHORIZED ✓" : "AUTHORIZE TRADE →"}
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => alert("Position size adjustment opened")}>
                  ADJUST
                </Button>
                <Button variant="ghost" size="sm" onClick={onReject} className="text-[#D92D20] hover:bg-[#FDECEA]">
                  REJECT
                </Button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11.5px] text-[#5B6474] pt-2">
                <Shield size={13} className="text-[#0052FF]" />
                <span>Human authorization required</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
