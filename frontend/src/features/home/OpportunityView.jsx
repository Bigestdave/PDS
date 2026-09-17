import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Shield,
  AlertTriangle,
  ExternalLink,
  Check,
  CheckCircle2,
  XCircle,
  Zap,
} from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";
import { AssetIcon } from "../../components/ui/icons";
import { OpportunityChart } from "../../components/ui/charts";

export function OpportunityView({ onNavigate, onAuthorize, onReject }) {
  const [timeframe, setTimeframe] = useState("1H");
  const [authorized, setAuthorized] = useState(false);

  const handleAuth = () => {
    setAuthorized(true);
    onAuthorize?.("OPP-BTC-001");
  };

  return (
    <div className="animate-fade-up space-y-6">
      {/* Breadcrumb */}
      <button
        onClick={() => onNavigate?.("scanner")}
        className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#5B6474] hover:text-[#0B1524] transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span>Back to scanner</span>
      </button>

      {/* Main Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#0052FF] bg-[#EAF1FF] px-2 py-0.5 rounded">
              <Zap size={12} /> NEW OPPORTUNITY
            </span>
          </div>
          <div className="flex items-center gap-3">
            <AssetIcon symbol="BTC" size={34} />
            <div className="flex items-center gap-2">
              <h1 className="text-[26px] font-bold text-[#0B1524] tracking-tight">BTCUSDT</h1>
              <span className="inline-flex items-center gap-1 bg-[#FDECEA] text-[#D92D20] text-[12px] font-bold px-2 py-0.5 rounded-full">
                SHORT <ChevronDown size={13} />
              </span>
            </div>
          </div>
          <p className="text-[13.5px] text-[#5B6474] mt-1">
            Perpetual dislocation / momentum exhaustion
          </p>
        </div>

        {/* Right Status */}
        <div className="flex sm:flex-col items-start sm:items-end gap-1 text-[12.5px] font-mono text-[#5B6474]">
          <div className="flex items-center gap-1.5 text-[#17B26A] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#17B26A]" />
            <span>RESEARCH QUEUED</span>
          </div>
          <div className="text-[#8B93A1] text-[11.5px]">
            Detected 14:26 · Bitget · RE-2025-0417
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column Content (70%) + Right Column Trade Structure (30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Opportunity Detected Card */}
          <Card className="p-6">
            <div className="flex items-center gap-2 text-[12px] font-bold tracking-wider text-[#5B6474] uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
              <span>OPPORTUNITY DETECTED</span>
            </div>
            <h2 className="text-[18px] font-bold text-[#0B1524] leading-snug tracking-tight">
              Perpetual premium has stretched beyond its distribution while order-book pressure turns negative.
            </h2>
            <p className="text-[14px] text-[#5B6474] mt-1.5 leading-relaxed">
              This suggests leveraged longs are chasing the move while spot demand is weakening, increasing the probability of a short-term correction.
            </p>

            {/* 4 Metric Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              <div className="p-3 rounded-[10px] bg-[#F8FAFD] border border-[#E6EAF0]">
                <div className="text-[12px] text-[#5B6474]">Funding anomaly</div>
                <div className="text-[19px] font-bold text-[#0B1524] mt-0.5 tnum">+2.8σ</div>
                <div className="text-[11px] text-[#8B93A1] mt-0.5">(vs. 7d avg)</div>
              </div>

              <div className="p-3 rounded-[10px] bg-[#F8FAFD] border border-[#E6EAF0]">
                <div className="text-[12px] text-[#5B6474]">Basis deviation</div>
                <div className="text-[19px] font-bold text-[#0B1524] mt-0.5 tnum">+1.9σ</div>
                <div className="text-[11px] text-[#8B93A1] mt-0.5">(vs. 7d avg)</div>
              </div>

              <div className="p-3 rounded-[10px] bg-[#F8FAFD] border border-[#E6EAF0]">
                <div className="text-[12px] text-[#5B6474]">Order-book imbalance</div>
                <div className="text-[19px] font-bold text-[#D92D20] mt-0.5 tnum">-18%</div>
                <div className="text-[11px] text-[#8B93A1] mt-0.5">(sell pressure)</div>
              </div>

              <div className="p-3 rounded-[10px] bg-[#F8FAFD] border border-[#E6EAF0]">
                <div className="text-[12px] text-[#5B6474]">Volatility regime</div>
                <div className="text-[19px] font-bold text-[#B54708] mt-0.5">Elevated</div>
                <div className="text-[11px] text-[#8B93A1] mt-0.5">(72h realized)</div>
              </div>
            </div>
          </Card>

          {/* Market Context Chart Card */}
          <Card className="p-6">
            <div className="flex items-center gap-2 text-[12px] font-bold tracking-wider text-[#5B6474] uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#17B26A]" />
              <span>MARKET CONTEXT</span>
            </div>
            <OpportunityChart
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
            />
          </Card>

          {/* Supports vs Break It Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5">
              <div className="flex items-center gap-2 text-[13px] font-bold text-[#0B1524] mb-3">
                <CheckCircle2 size={16} className="text-[#067647]" />
                <span>What supports the trade</span>
              </div>
              <ul className="space-y-2.5 text-[13px] text-[#1B2637]">
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#067647] mt-0.5 shrink-0" />
                  <span>Perpetual premium remains elevated, favoring short liquidations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#067647] mt-0.5 shrink-0" />
                  <span>Order-book imbalance shows increasing sell-side pressure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[#067647] mt-0.5 shrink-0" />
                  <span>Overall market structure is still bearish on higher timeframes.</span>
                </li>
              </ul>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-2 text-[13px] font-bold text-[#0B1524] mb-3">
                <AlertTriangle size={16} className="text-[#B54708]" />
                <span>What could break it</span>
              </div>
              <ul className="space-y-2.5 text-[13px] text-[#1B2637]">
                <li className="flex items-start gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FEF3E0] text-[#B54708] grid place-items-center text-[10px] font-bold mt-0.5 shrink-0">!</span>
                  <span>Perpetual premium falls below +6 bps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FEF3E0] text-[#B54708] grid place-items-center text-[10px] font-bold mt-0.5 shrink-0">!</span>
                  <span>Order-book imbalance flips positive.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FDECEA] text-[#D92D20] grid place-items-center text-[10px] font-bold mt-0.5 shrink-0">✕</span>
                  <span>BTC closes above $110,420.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Right Sticky Column: Trade Structure */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEF1F6] mb-4">
              <span className="text-[13px] font-bold tracking-wider text-[#5B6474] uppercase">TRADE STRUCTURE</span>
              <button
                onClick={() => onNavigate?.("trade-decision")}
                className="text-[12px] font-semibold text-[#0052FF] hover:underline"
              >
                View details →
              </button>
            </div>

            {/* Asset header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <AssetIcon symbol="BTC" size={28} />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[15px] text-[#0B1524]">BTCUSDT</span>
                    <span className="bg-[#FDECEA] text-[#D92D20] text-[10.5px] font-bold px-1.5 py-0.2 rounded">SHORT</span>
                  </div>
                  <div className="text-[11.5px] text-[#5B6474]">Perpetual vs. Spot</div>
                </div>
              </div>
            </div>

            {/* Metrics List */}
            <div className="space-y-3.5 text-[13px]">
              <div className="flex items-center justify-between">
                <span className="text-[#5B6474]">Entry</span>
                <div className="text-right">
                  <div className="font-bold text-[#0B1524] font-mono">$108,320</div>
                  <div className="text-[10.5px] text-[#8B93A1]">Range: 108,200 - 108,500</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#5B6474]">Target 1</span>
                <div className="text-right">
                  <div className="font-bold text-[#067647] font-mono">$106,540</div>
                  <div className="text-[10.5px] text-[#17B26A]">(-1.63%) · TP1 - 50%</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#5B6474]">Target 2</span>
                <div className="text-right">
                  <div className="font-bold text-[#067647] font-mono">$104,980</div>
                  <div className="text-[10.5px] text-[#17B26A]">(-3.09%) · TP2 - 50%</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#5B6474]">Hard stop</span>
                <div className="text-right">
                  <div className="font-bold text-[#D92D20] font-mono">$110,420</div>
                  <div className="text-[10.5px] text-[#D92D20]">(+1.96%) · Invalidation</div>
                </div>
              </div>

              <div className="border-t border-[#EEF1F6] pt-3 flex items-center justify-between">
                <span className="text-[#5B6474]">Risk / reward</span>
                <span className="font-bold text-[#0B1524] font-mono">1 : 2.8 <span className="text-[11px] text-[#8B93A1] font-normal">(to target 2)</span></span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#5B6474]">Suggested size</span>
                <div className="text-right">
                  <span className="font-bold text-[#0B1524] font-mono">0.75 BTC</span>
                  <div className="text-[10.5px] text-[#8B93A1]">(2.1% of account)</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-2">
              <Button
                variant="primary"
                full
                size="lg"
                onClick={handleAuth}
                className="font-semibold"
              >
                {authorized ? "TRADE AUTHORIZED ✓" : "AUTHORIZE TRADE →"}
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => onNavigate?.("trade-decision")}>
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

          {/* Research Details Card */}
          <Card className="p-5">
            <div className="text-[12px] font-bold tracking-wider text-[#5B6474] uppercase mb-3">RESEARCH DETAILS</div>
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-[#5B6474]">Source</span>
                <span className="font-medium text-[#0B1524]">Bitget</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B6474]">Detected</span>
                <span className="font-mono text-[#0B1524]">Apr 24, 2025 14:26</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B6474]">Research ID</span>
                <span className="font-mono text-[#0B1524]">RE-2025-0417</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate?.("research-progress")}
              className="mt-4 w-full text-center text-[13px] font-semibold text-[#0052FF] hover:underline"
            >
              View full research →
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
