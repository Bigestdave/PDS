import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  ExternalLink,
  Shield,
  Layers,
} from "lucide-react";
import { Card, Button, ProgressBar } from "../../components/ui";
import { AssetIcon } from "../../components/ui/icons";

const PROGRESS_STEPS = [
  {
    id: 1,
    title: "Market anomaly",
    desc: "Statistical deviation detected",
    time: "14:26",
    status: "complete",
  },
  {
    id: 2,
    title: "Market context",
    desc: "Price structure analyzed",
    time: "14:27",
    status: "complete",
  },
  {
    id: 3,
    title: "Funding",
    desc: "+0.0213% · 2.8σ above baseline",
    time: "14:28",
    status: "complete",
  },
  {
    id: 4,
    title: "Basis",
    desc: "+12.4 bps · 1.9σ above baseline",
    time: "14:29",
    status: "complete",
  },
  {
    id: 5,
    title: "Order book",
    desc: "Analyzing current pressure...",
    time: "14:31",
    status: "in-progress",
  },
  {
    id: 6,
    title: "Volatility regime",
    desc: "Waiting for confirmation",
    time: "—",
    status: "waiting",
  },
  {
    id: 7,
    title: "Risk structure",
    desc: "Waiting for analysis",
    time: "—",
    status: "waiting",
  },
];

export function ResearchProgressView({ onNavigate }) {
  const [expanded, setExpanded] = useState(5);

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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#0052FF] bg-[#EAF1FF] px-2 py-0.5 rounded">
              ⚡ RESEARCH IN PROGRESS
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
            Potential short setup / Perpetual dislocation / momentum exhaustion
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-[#EAF1FF] text-[#0052FF] text-[12px] font-bold px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#0052FF] animate-pulse" />
            ANALYZING
          </span>
          <Button variant="primary" size="sm" onClick={() => onNavigate?.("trade-decision")}>
            View Decision →
          </Button>
        </div>
      </div>

      {/* Grid: 70% Progress Steps + 30% Status Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Progress Checklist */}
        <div className="lg:col-span-8">
          <Card className="p-6">
            <div className="flex items-center gap-2 text-[12px] font-bold tracking-wider text-[#5B6474] uppercase mb-6">
              <Layers size={16} className="text-[#0052FF]" />
              <span>RESEARCH PROGRESS</span>
            </div>

            {/* Vertical timeline */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#EEF1F6]">
              {PROGRESS_STEPS.map((step) => {
                const isComplete = step.status === "complete";
                const isInProgress = step.status === "in-progress";
                const isWaiting = step.status === "waiting";

                return (
                  <div key={step.id} className="relative group cursor-pointer" onClick={() => setExpanded(step.id)}>
                    {/* Circle Node Icon */}
                    <div className="absolute -left-6 top-0 -translate-x-1/2">
                      {isComplete && (
                        <div className="w-6 h-6 rounded-full bg-[#17B26A] grid place-items-center text-white shadow-xs">
                          <CheckCircle2 size={15} />
                        </div>
                      )}
                      {isInProgress && (
                        <div className="w-6 h-6 rounded-full bg-white border-2 border-[#0052FF] grid place-items-center">
                          <span className="w-2 h-2 rounded-full bg-[#0052FF] animate-ping" />
                        </div>
                      )}
                      {isWaiting && (
                        <div className="w-6 h-6 rounded-full bg-white border-2 border-[#E6EAF0]" />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-semibold text-[14.5px] ${isWaiting ? "text-[#8B93A1]" : "text-[#0B1524]"}`}>
                          {step.title}
                        </div>
                        <div className="text-[13px] text-[#5B6474]">{step.desc}</div>
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-[#8B93A1] font-mono">
                        <span>{step.time}</span>
                        {expanded === step.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Bottom monitoring banner */}
          <Card className="p-4 mt-4 bg-[#F8FAFD] flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#EAF1FF] grid place-items-center text-[#0052FF] shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <div className="text-[13.5px] font-semibold text-[#0B1524]">
                REOPEN is continuously monitoring markets in the background.
              </div>
              <div className="text-[12.5px] text-[#5B6474]">
                You'll be notified when a trade meets our research criteria.
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Status Card */}
        <div className="lg:col-span-4">
          <Card className="p-6">
            <div className="text-[12px] font-bold tracking-wider text-[#5B6474] uppercase mb-3">
              📈 RESEARCH STATUS
            </div>
            <div className="text-[18px] font-bold text-[#0B1524]">
              5 / 7 <span className="text-[14px] font-normal text-[#5B6474]">checks complete</span>
            </div>

            <ProgressBar value={71} height={8} className="mt-3 mb-5" />

            <div className="space-y-3 text-[13px] border-t border-[#EEF1F6] pt-4">
              <div className="flex justify-between">
                <span className="text-[#5B6474]">Data sources</span>
                <span className="font-medium text-[#0B1524]">Bitget · Deribit · Coinglass</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B6474]">Latency</span>
                <span className="font-mono text-[#067647] font-semibold">24ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B6474]">Started</span>
                <span className="font-mono text-[#0B1524]">14:26:14 (UTC)</span>
              </div>
            </div>

            <Button
              variant="primary"
              full
              className="mt-6"
              onClick={() => onNavigate?.("trade-decision")}
            >
              Open Trade Decision →
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
