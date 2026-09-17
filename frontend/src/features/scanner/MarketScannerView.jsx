import React, { useState } from "react";
import {
  Database,
  AlertTriangle,
  Target,
  Clock,
  Wifi,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Card, Badge } from "../../components/ui";
import { AssetIcon } from "../../components/ui/icons";

const OBSERVATION_DATA = [
  {
    symbol: "BTCUSDT",
    name: "Perpetual · 20x",
    price: "$108,320",
    delta: "-0.42%",
    positive: false,
    keySignal: "Funding elevated",
    signalDetail: "+0.0213% (2.8σ above baseline)",
    dotColor: "bg-[#D92D20]",
    status: "Below threshold",
    statusTone: "negative",
    routeId: "home",
  },
  {
    symbol: "ETHUSDT",
    name: "Perpetual · 20x",
    price: "$2,613.7",
    delta: "+0.36%",
    positive: true,
    keySignal: "Volatility expanding",
    signalDetail: "68% (vs. 42% baseline)",
    dotColor: "bg-[#F5A623]",
    status: "Awaiting confirmation",
    statusTone: "warning",
    routeId: "home",
  },
  {
    symbol: "SOLUSDT",
    name: "Perpetual · 20x",
    price: "$168.42",
    delta: "+0.84%",
    positive: true,
    keySignal: "Order-book imbalance",
    signalDetail: "-14% (vs. -8% baseline)",
    dotColor: "bg-[#F5A623]",
    status: "Research pending",
    statusTone: "warning",
    routeId: "home",
  },
  {
    symbol: "BNBUSDT",
    name: "Perpetual · 20x",
    price: "$672.15",
    delta: "+0.28%",
    positive: true,
    keySignal: "Basis elevated",
    signalDetail: "+9.2 bps (vs. +4.1 bps)",
    dotColor: "bg-[#00F0FF]",
    status: "Monitoring",
    statusTone: "brand",
    routeId: "home",
  },
  {
    symbol: "XRPUSDT",
    name: "Perpetual · 20x",
    price: "$2.34",
    delta: "-0.52%",
    positive: false,
    keySignal: "Liquidity shift",
    signalDetail: "Large orders detected",
    dotColor: "bg-[#F5A623]",
    status: "Observing",
    statusTone: "neutral",
    routeId: "home",
  },
  {
    symbol: "DOGEUSDT",
    name: "Perpetual · 20x",
    price: "$0.2214",
    delta: "+1.12%",
    positive: true,
    keySignal: "Momentum building",
    signalDetail: "+2.4σ price move (15m)",
    dotColor: "bg-[#00F0FF]",
    status: "Monitoring",
    statusTone: "brand",
    routeId: "home",
  },
  {
    symbol: "ADAUSDT",
    name: "Perpetual · 20x",
    price: "$0.7621",
    delta: "+0.66%",
    positive: true,
    keySignal: "Volatility expansion",
    signalDetail: "52% (vs. 38% baseline)",
    dotColor: "bg-[#F5A623]",
    status: "Observing",
    statusTone: "neutral",
    routeId: "home",
  },
];

export function MarketScannerView({ onNavigate }) {
  return (
    <div className="animate-fade-up space-y-6">
      {/* Header */}
      <div>
        <div className="text-[12px] font-bold tracking-wider text-[#5B6474] uppercase mb-1">
          MARKET SCANNER
        </div>
        <h1 className="text-[28px] font-bold text-[#0B1524] tracking-tight">
          No actionable opportunities
        </h1>
        <p className="text-[14px] text-[#5B6474] mt-0.5">
          Markets are being monitored continuously.
        </p>
      </div>

      {/* 5 Top Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <Card className="p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#F4F6FA] grid place-items-center text-[#0B1524]">
            <Database size={18} />
          </div>
          <div>
            <div className="text-[20px] font-bold text-[#0B1524] tnum leading-tight">147</div>
            <div className="text-[11.5px] text-[#5B6474]">Markets monitored</div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#FEF3E0] grid place-items-center text-[#B54708]">
            <AlertTriangle size={18} />
          </div>
          <div>
            <div className="text-[20px] font-bold text-[#B54708] tnum leading-tight">12</div>
            <div className="text-[11.5px] text-[#5B6474]">Anomalies under observation</div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#F4F6FA] grid place-items-center text-[#5B6474]">
            <Target size={18} />
          </div>
          <div>
            <div className="text-[20px] font-bold text-[#0B1524] tnum leading-tight">0</div>
            <div className="text-[11.5px] text-[#5B6474]">Actionable setups</div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#F4F6FA] grid place-items-center text-[#0B1524]">
            <Clock size={18} />
          </div>
          <div>
            <div className="text-[20px] font-bold text-[#0B1524] font-mono leading-tight">1.8s</div>
            <div className="text-[11.5px] text-[#5B6474]">Last scan</div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#DCFAE6] grid place-items-center text-[#067647]">
            <Wifi size={18} />
          </div>
          <div>
            <div className="text-[18px] font-bold text-[#067647] leading-tight flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#17B26A] animate-pulse" />
              LIVE
            </div>
            <div className="text-[11.5px] text-[#5B6474]">Bitget connection</div>
          </div>
        </Card>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Table: Under Observation */}
        <div className="lg:col-span-8">
          <Card className="p-0 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#EEF1F6]">
              <h2 className="text-[13px] font-bold tracking-wider text-[#5B6474] uppercase">
                UNDER OBSERVATION
              </h2>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 px-6 py-2.5 bg-[#F8FAFD] border-b border-[#EEF1F6] text-[12px] font-semibold text-[#5B6474]">
              <div className="col-span-4">MARKET</div>
              <div className="col-span-3">PRICE</div>
              <div className="col-span-3">KEY SIGNAL</div>
              <div className="col-span-2 text-right">STATUS</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-[#EEF1F6]">
              {OBSERVATION_DATA.map((row) => (
                <div
                  key={row.symbol}
                  onClick={() => onNavigate?.(row.routeId)}
                  className="grid grid-cols-12 items-center px-6 py-3.5 text-[13.5px] hover:bg-[#F8FAFD] transition-colors cursor-pointer group"
                >
                  <div className="col-span-4 flex items-center gap-2.5">
                    <AssetIcon symbol={row.symbol} size={28} />
                    <div>
                      <div className="font-bold text-[#0B1524] group-hover:text-[#0052FF] transition-colors">
                        {row.symbol}
                      </div>
                      <div className="text-[11.5px] text-[#8B93A1]">{row.name}</div>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <div className="font-semibold text-[#0B1524] font-mono">{row.price}</div>
                    <div className={`text-[11.5px] font-medium ${row.positive ? "text-[#067647]" : "text-[#D92D20]"}`}>
                      {row.delta}
                    </div>
                  </div>

                  <div className="col-span-3">
                    <div className="flex items-center gap-1.5 font-medium text-[#0B1524]">
                      <span className={`w-1.5 h-1.5 rounded-full ${row.dotColor}`} />
                      <span>{row.keySignal}</span>
                    </div>
                    <div className="text-[11.5px] text-[#8B93A1] truncate">{row.signalDetail}</div>
                  </div>

                  <div className="col-span-2 text-right">
                    <Badge tone={row.statusTone} className="text-[11px] font-semibold">
                      {row.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Rail: Market Overview & Recent Activity */}
        <div className="lg:col-span-4 space-y-4">
          {/* Market Overview */}
          <Card className="p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEF1F6] mb-3">
              <span className="text-[12px] font-bold tracking-wider text-[#5B6474] uppercase">
                MARKET OVERVIEW
              </span>
              <span className="text-[12px] text-[#8B93A1]">Total markets: 150+</span>
            </div>
            <div className="space-y-3 text-[13px]">
              <div className="flex justify-between items-center">
                <span className="text-[#5B6474]">BTC Dominance</span>
                <div className="text-right">
                  <span className="font-bold text-[#0B1524] font-mono">52.4%</span>
                  <span className="text-[11.5px] text-[#067647] ml-1.5">+0.3%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#5B6474]">Total Volume (24h)</span>
                <div className="text-right">
                  <span className="font-bold text-[#0B1524] font-mono">$48.2B</span>
                  <span className="text-[11.5px] text-[#067647] ml-1.5">+12.6%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#5B6474]">Market Sentiment</span>
                <span className="flex items-center gap-1.5 font-medium text-[#0B1524]">
                  <span className="w-2 h-2 rounded-full bg-[#98A2B3]" /> Neutral
                </span>
              </div>
            </div>
          </Card>

          {/* Recent Observations */}
          <Card className="p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEF1F6] mb-3">
              <span className="text-[12px] font-bold tracking-wider text-[#5B6474] uppercase">
                RECENT OBSERVATIONS
              </span>
              <button className="text-[12px] font-semibold text-[#0052FF] hover:underline">
                View all →
              </button>
            </div>
            <div className="space-y-3 text-[12.5px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AssetIcon symbol="BTC" size={20} />
                  <div>
                    <span className="font-bold text-[#0B1524]">BTCUSDT</span>
                    <div className="text-[11.5px] text-[#5B6474]">Funding rate 2.8σ above baseline</div>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-[#8B93A1]">14:21</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AssetIcon symbol="ETH" size={20} />
                  <div>
                    <span className="font-bold text-[#0B1524]">ETHUSDT</span>
                    <div className="text-[11.5px] text-[#5B6474]">Volatility expanding</div>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-[#8B93A1]">14:17</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AssetIcon symbol="SOL" size={20} />
                  <div>
                    <span className="font-bold text-[#0B1524]">SOLUSDT</span>
                    <div className="text-[11.5px] text-[#5B6474]">Order-book imbalance detected</div>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-[#8B93A1]">14:12</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AssetIcon symbol="BNB" size={20} />
                  <div>
                    <span className="font-bold text-[#0B1524]">BNBUSDT</span>
                    <div className="text-[11.5px] text-[#5B6474]">Basis elevated</div>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-[#8B93A1]">14:08</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AssetIcon symbol="XRP" size={20} />
                  <div>
                    <span className="font-bold text-[#0B1524]">XRPUSDT</span>
                    <div className="text-[11.5px] text-[#5B6474]">Large orders in order book</div>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-[#8B93A1]">14:03</span>
              </div>
            </div>
          </Card>

          {/* REOPEN is always working card */}
          <Card className="p-5 bg-gradient-to-br from-white to-[#F4F8FE]">
            <div className="flex items-center gap-2 text-[13px] font-bold text-[#0B1524] mb-1">
              <Sparkles size={16} className="text-[#0052FF]" />
              <span>REOPEN is always working</span>
            </div>
            <p className="text-[12.5px] text-[#5B6474]">
              Scanning. Detecting. Researching.
            </p>
            <div className="mt-3 flex items-center gap-2 text-[12px] font-bold text-[#067647]">
              <span className="w-2 h-2 rounded-full bg-[#17B26A] animate-ping" />
              <span>AI RESEARCHING ...</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
