import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Shield,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Ban,
} from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";
import { AssetIcon } from "../../components/ui/icons";
import { PositionChart } from "../../components/ui/charts";

export function PositionsView({ onNavigate }) {
  const [timeframe, setTimeframe] = useState("1H");
  const [closed, setClosed] = useState(false);

  return (
    <div className="animate-fade-up space-y-6">
      {/* Breadcrumb */}
      <button
        onClick={() => onNavigate?.("scanner")}
        className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#5B6474] hover:text-[#0B1524] transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span>Back to positions</span>
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 bg-[#FDECEA] text-[#D92D20] text-[12px] font-bold px-2.5 py-0.5 rounded-full">
              SHORT <ChevronDown size={13} />
            </span>
            <AssetIcon symbol="BTC" size={32} />
            <h1 className="text-[26px] font-bold text-[#0B1524] tracking-tight">BTCUSDT</h1>
          </div>
          <p className="text-[13.5px] text-[#5B6474] mt-0.5">
            Perpetual · Isolated · 20x
          </p>
        </div>

        <div className="text-right text-[12.5px] font-mono text-[#5B6474]">
          <div>Opened Apr 24, 2025 14:32</div>
          <div className="text-[#8B93A1]">Position ID #POS-7842</div>
        </div>
      </div>

      {/* 6 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="p-3.5">
          <div className="text-[11.5px] text-[#5B6474]">ENTRY</div>
          <div className="text-[18px] font-bold text-[#0B1524] font-mono mt-0.5">$108,320</div>
        </Card>

        <Card className="p-3.5">
          <div className="text-[11.5px] text-[#5B6474]">CURRENT</div>
          <div className="text-[18px] font-bold text-[#00A3FF] font-mono mt-0.5">$107,240</div>
          <div className="text-[11px] text-[#067647]">(-1.00%)</div>
        </Card>

        <Card className="p-3.5">
          <div className="text-[11.5px] text-[#5B6474]">UNREALIZED P&L</div>
          <div className="text-[18px] font-bold text-[#067647] font-mono mt-0.5">+$810</div>
          <div className="text-[11px] text-[#067647]">(+0.75%)</div>
        </Card>

        <Card className="p-3.5">
          <div className="text-[11.5px] text-[#5B6474]">RISK REMAINING</div>
          <div className="text-[18px] font-bold text-[#0B1524] font-mono mt-0.5">$440</div>
          <div className="text-[11px] text-[#8B93A1]">(35%)</div>
        </Card>

        <Card className="p-3.5">
          <div className="text-[11.5px] text-[#5B6474]">TIME IN TRADE</div>
          <div className="text-[18px] font-bold text-[#0B1524] font-mono mt-0.5">31m</div>
        </Card>

        <Card className="p-3.5">
          <div className="text-[11.5px] text-[#5B6474]">POSITION SIZE</div>
          <div className="text-[18px] font-bold text-[#0B1524] font-mono mt-0.5">0.75 BTC</div>
          <div className="text-[11px] text-[#8B93A1]">(≈ $80,430)</div>
        </Card>
      </div>

      {/* Main Grid: 70% Chart & Details + 30% Health & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-5">
            <PositionChart
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
            />
          </Card>

          {/* Sub-cards: Position Details & Recent Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5">
              <div className="text-[12px] font-bold tracking-wider text-[#5B6474] uppercase mb-3">
                POSITION DETAILS
              </div>
              <div className="space-y-2.5 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-[#5B6474]">Position size</span>
                  <span className="font-bold text-[#0B1524] font-mono">0.75 BTC (≈ $80,430)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B6474]">Unrealized P&L</span>
                  <span className="font-bold text-[#067647] font-mono">+$810 (+0.75%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B6474]">Leverage</span>
                  <span className="font-bold text-[#0B1524]">20x (Isolated)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B6474]">Risk remaining</span>
                  <span className="font-bold text-[#0B1524] font-mono">$440 (35%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B6474]">Margin</span>
                  <span className="font-mono text-[#0B1524]">$4,021 (5.0% of position)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B6474]">Liquidation price</span>
                  <span className="font-bold text-[#D92D20] font-mono">$112,340</span>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between pb-2 border-b border-[#EEF1F6] mb-3">
                <span className="text-[12px] font-bold tracking-wider text-[#5B6474] uppercase">
                  RECENT ACTIVITY
                </span>
                <button className="text-[12px] font-semibold text-[#0052FF] hover:underline">
                  View all →
                </button>
              </div>
              <div className="space-y-3 text-[12.5px]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-[#0B1524]">Basis contraction detected</div>
                    <div className="text-[11.5px] text-[#5B6474]">+12.4 bps → +6.2 bps</div>
                  </div>
                  <span className="font-mono text-[11px] text-[#8B93A1]">14:41</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-[#0B1524]">Funding normalized</div>
                    <div className="text-[11.5px] text-[#5B6474]">+0.0213% → +0.0098%</div>
                  </div>
                  <span className="font-mono text-[11px] text-[#8B93A1]">14:48</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-[#0B1524]">Market volatility elevated</div>
                    <div className="text-[11.5px] text-[#5B6474]">68.4% (7d avg 42.1%)</div>
                  </div>
                  <span className="font-mono text-[11px] text-[#8B93A1]">15:03</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column: Health & Timeline */}
        <div className="lg:col-span-4 space-y-4">
          {/* Position Health */}
          <Card className="p-5">
            <div className="text-[12px] font-bold tracking-wider text-[#5B6474] uppercase mb-3">
              POSITION HEALTH
            </div>
            <div className="space-y-2.5 text-[13px]">
              <div className="flex items-center justify-between py-1 border-b border-[#EEF1F6]">
                <span className="text-[#5B6474]">Thesis status</span>
                <span className="flex items-center gap-1 bg-[#DCFAE6] text-[#067647] font-semibold text-[11.5px] px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17B26A]" /> INTACT <ChevronRight size={13} />
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#EEF1F6]">
                <span className="text-[#5B6474]">Funding</span>
                <span className="flex items-center gap-1 bg-[#DCFAE6] text-[#067647] font-semibold text-[11.5px] px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17B26A]" /> Supportive <ChevronRight size={13} />
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#EEF1F6]">
                <span className="text-[#5B6474]">Basis</span>
                <span className="flex items-center gap-1 bg-[#DCFAE6] text-[#067647] font-semibold text-[11.5px] px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17B26A]" /> Converging <ChevronRight size={13} />
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#EEF1F6]">
                <span className="text-[#5B6474]">Order book</span>
                <span className="flex items-center gap-1 bg-[#F4F6FA] text-[#5B6474] font-semibold text-[11.5px] px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#98A2B3]" /> Neutral <ChevronRight size={13} />
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#EEF1F6]">
                <span className="text-[#5B6474]">Volatility</span>
                <span className="flex items-center gap-1 bg-[#FEF3E0] text-[#B54708] font-semibold text-[11.5px] px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" /> Elevated <ChevronRight size={13} />
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-[#5B6474]">AI status</span>
                <span className="flex items-center gap-1 bg-[#EAF1FF] text-[#0052FF] font-semibold text-[11.5px] px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]" /> Monitoring <ChevronRight size={13} />
                </span>
              </div>
            </div>
          </Card>

          {/* Event Timeline */}
          <Card className="p-5">
            <div className="text-[12px] font-bold tracking-wider text-[#5B6474] uppercase mb-4">
              EVENT TIMELINE
            </div>
            <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#EEF1F6]">
              <div className="relative">
                <span className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-[#0052FF]" />
                <div className="font-bold text-[12.5px] text-[#0B1524]">14:32 · Position opened</div>
                <div className="text-[11.5px] text-[#5B6474]">0.75 BTC @ $108,320</div>
              </div>

              <div className="relative">
                <span className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-[#17B26A]" />
                <div className="font-bold text-[12.5px] text-[#0B1524]">14:41 · Basis contraction detected</div>
                <div className="text-[11.5px] text-[#5B6474]">+12.4 bps → +6.2 bps</div>
              </div>

              <div className="relative">
                <span className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-[#17B26A]" />
                <div className="font-bold text-[12.5px] text-[#0B1524]">14:48 · Funding normalized</div>
                <div className="text-[11.5px] text-[#5B6474]">+0.0213% → +0.0098%</div>
              </div>

              <div className="relative">
                <span className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-[#17B26A]" />
                <div className="font-bold text-[12.5px] text-[#0B1524]">15:03 · Thesis remains intact</div>
                <div className="text-[11.5px] text-[#5B6474]">All key conditions healthy</div>
              </div>
            </div>

            <Button
              variant="outline"
              full
              className="mt-6 text-[#D92D20] border-[#FECDCA] hover:bg-[#FDECEA]"
              onClick={() => {
                setClosed(true);
                alert("Position #POS-7842 closed successfully. Realized PnL: +$810.");
              }}
            >
              <Ban size={15} />
              <span>{closed ? "POSITION CLOSED" : "CLOSE POSITION"}</span>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
