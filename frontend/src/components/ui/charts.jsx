import React from "react";
import { cn } from "../../utils/cn";

export function PositionChart({
  timeframe = "1H",
  onTimeframeChange,
  entry = 108320,
  current = 107240,
  stop = 110420,
  target1 = 106540,
  target2 = 104980,
  className,
}) {
  // SVG Chart width/height
  const w = 740;
  const h = 280;

  return (
    <div className={cn("w-full", className)}>
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#EEF1F6] mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[14px] text-[#0B1524] tracking-tight">BTCUSDT</span>
            <span className="text-[13px] text-[#5B6474] font-mono">1H</span>
          </div>
          {/* Legend */}
          <div className="hidden sm:flex items-center gap-3 text-[11.5px] font-medium text-[#5B6474]">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0052FF]" /> Entry</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00F0FF]" /> Current</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#D92D20]" /> Stop</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#17B26A]" /> Target 1</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#067647]" /> Target 2</span>
          </div>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1 bg-[#F4F6FA] p-0.5 rounded-[6px] text-[12px] font-medium text-[#5B6474]">
          {["1H", "4H", "1D", "1W"].map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange?.(tf)}
              className={cn(
                "px-2.5 py-1 rounded-[5px] transition-colors cursor-pointer",
                timeframe === tf ? "bg-white text-[#0B1524] font-semibold shadow-xs" : "hover:text-[#0B1524]"
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full h-[280px] bg-[#FAFCFF] rounded-[10px] border border-[#EEF1F6] overflow-hidden">
        <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <linearGradient id="setupGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0052FF" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0052FF" stopOpacity="0.01" />
            </linearGradient>
            <pattern id="chartGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F0F4FA" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Grid */}
          <rect width={w} height={h} fill="url(#chartGrid)" />

          {/* Current setup highlight box */}
          <rect x="340" y="70" width="80" height="150" fill="url(#setupGradient)" stroke="#0052FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" rx="4" />

          {/* Horizontal Level Lines */}
          {/* Stop Loss (110,420) */}
          <line x1="20" y1="58" x2={w - 70} y2="58" stroke="#D92D20" strokeWidth="1.2" strokeDasharray="4 4" />
          <text x={w - 65} y="62" fill="#D92D20" fontSize="10.5" fontFamily="monospace" fontWeight="600">110,420</text>

          {/* Entry (108,320) */}
          <line x1="20" y1="110" x2={w - 70} y2="110" stroke="#0052FF" strokeWidth="1.2" strokeDasharray="4 4" />
          <text x={w - 65} y="114" fill="#0052FF" fontSize="10.5" fontFamily="monospace" fontWeight="600">108,320</text>

          {/* Current Price (107,240) */}
          <line x1="20" y1="138" x2={w - 70} y2="138" stroke="#00A3FF" strokeWidth="1.2" strokeDasharray="4 4" />
          <text x={w - 65} y="142" fill="#00A3FF" fontSize="10.5" fontFamily="monospace" fontWeight="600">107,240</text>

          {/* Target 1 (106,540) */}
          <line x1="20" y1="168" x2={w - 70} y2="168" stroke="#17B26A" strokeWidth="1.2" strokeDasharray="4 4" />
          <text x={w - 65} y="172" fill="#17B26A" fontSize="10.5" fontFamily="monospace" fontWeight="600">106,540</text>

          {/* Target 2 (104,980) */}
          <line x1="20" y1="218" x2={w - 70} y2="218" stroke="#067647" strokeWidth="1.2" strokeDasharray="4 4" />
          <text x={w - 65} y="222" fill="#067647" fontSize="10.5" fontFamily="monospace" fontWeight="600">104,980</text>

          {/* Candlestick sequence simulated */}
          {/* Rally leg */}
          <line x1="40" y1="160" x2="40" y2="130" stroke="#1E293B" strokeWidth="1" />
          <rect x="37" y="138" width="6" height="18" fill="#17B26A" />

          <line x1="65" y1="150" x2="65" y2="110" stroke="#1E293B" strokeWidth="1" />
          <rect x="62" y="118" width="6" height="24" fill="#17B26A" />

          <line x1="90" y1="135" x2="90" y2="90" stroke="#1E293B" strokeWidth="1" />
          <rect x="87" y="98" width="6" height="28" fill="#17B26A" />

          <line x1="115" y1="110" x2="115" y2="80" stroke="#1E293B" strokeWidth="1" />
          <rect x="112" y="85" width="6" height="22" fill="#17B26A" />

          <line x1="140" y1="100" x2="140" y2="70" stroke="#1E293B" strokeWidth="1" />
          <rect x="137" y="74" width="6" height="20" fill="#D92D20" />

          <line x1="165" y1="105" x2="165" y2="75" stroke="#1E293B" strokeWidth="1" />
          <rect x="162" y="82" width="6" height="18" fill="#17B26A" />

          {/* Top consolidation */}
          <line x1="190" y1="95" x2="190" y2="65" stroke="#1E293B" strokeWidth="1" />
          <rect x="187" y="70" width="6" height="15" fill="#17B26A" />

          <line x1="215" y1="85" x2="215" y2="60" stroke="#1E293B" strokeWidth="1" />
          <rect x="212" y="66" width="6" height="14" fill="#D92D20" />

          <line x1="240" y1="90" x2="240" y2="62" stroke="#1E293B" strokeWidth="1" />
          <rect x="237" y="68" width="6" height="18" fill="#17B26A" />

          <line x1="265" y1="85" x2="265" y2="58" stroke="#1E293B" strokeWidth="1" />
          <rect x="262" y="63" width="6" height="16" fill="#D92D20" />

          {/* Distribution rollover */}
          <line x1="290" y1="95" x2="290" y2="70" stroke="#1E293B" strokeWidth="1" />
          <rect x="287" y="75" width="6" height="16" fill="#D92D20" />

          <line x1="315" y1="105" x2="315" y2="82" stroke="#1E293B" strokeWidth="1" />
          <rect x="312" y="88" width="6" height="14" fill="#D92D20" />

          <line x1="340" y1="115" x2="340" y2="92" stroke="#1E293B" strokeWidth="1" />
          <rect x="337" y="98" width="6" height="14" fill="#D92D20" />

          <line x1="365" y1="125" x2="365" y2="105" stroke="#1E293B" strokeWidth="1" />
          <rect x="362" y="108" width="6" height="14" fill="#D92D20" />

          {/* Breakdown under Entry */}
          <line x1="390" y1="140" x2="390" y2="112" stroke="#1E293B" strokeWidth="1" />
          <rect x="387" y="116" width="6" height="20" fill="#D92D20" />

          <line x1="415" y1="148" x2="415" y2="128" stroke="#1E293B" strokeWidth="1" />
          <rect x="412" y="132" width="6" height="14" fill="#D92D20" />

          <line x1="440" y1="155" x2="440" y2="135" stroke="#1E293B" strokeWidth="1" />
          <rect x="437" y="138" width="6" height="15" fill="#D92D20" />

          <line x1="465" y1="168" x2="465" y2="142" stroke="#1E293B" strokeWidth="1" />
          <rect x="462" y="146" width="6" height="18" fill="#D92D20" />

          <line x1="490" y1="165" x2="490" y2="148" stroke="#1E293B" strokeWidth="1" />
          <rect x="487" y="152" width="6" height="10" fill="#17B26A" />

          {/* Current candle dot */}
          <circle cx="515" cy="138" r="3.5" fill="#00F0FF" stroke="#0052FF" strokeWidth="2" />

          {/* Floating Pill Annotations */}
          {/* "Funding remains elevated" at x=210, y=36 */}
          <rect x="200" y="24" width="136" height="20" rx="4" fill="#fff" stroke="#E6EAF0" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.05))" />
          <text x="206" y="38" fill="#0B1524" fontSize="9.5" fontWeight="500">Funding remains elevated</text>

          {/* "Basis begins to converge" at x=340, y=42 */}
          <rect x="330" y="32" width="138" height="20" rx="4" fill="#fff" stroke="#E6EAF0" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.05))" />
          <text x="336" y="46" fill="#0B1524" fontSize="9.5" fontWeight="500">Basis begins to converge</text>
        </svg>

        {/* Level Badges on Right Rail */}
        <div className="absolute right-3 top-10 flex flex-col gap-6 text-[10.5px] font-mono">
          <span className="bg-[#FDECEA] text-[#D92D20] px-1.5 py-0.5 rounded font-semibold border border-[#FECDCA]">Stop loss</span>
          <span className="bg-[#EAF1FF] text-[#0052FF] px-1.5 py-0.5 rounded font-semibold border border-[#C8DAFF]">Entry</span>
          <span className="bg-[#ECFDF3] text-[#17B26A] px-1.5 py-0.5 rounded font-semibold border border-[#ABEFC6]">Target 1</span>
        </div>
      </div>
    </div>
  );
}

export function OpportunityChart({
  timeframe = "1H",
  onTimeframeChange,
  className,
}) {
  const w = 740;
  const h = 240;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between pb-3 border-b border-[#EEF1F6] mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-[#0B1524]">BTCUSDT · 1H</span>
        </div>
        <div className="flex items-center gap-1 bg-[#F4F6FA] p-0.5 rounded-[6px] text-[12px] font-medium text-[#5B6474]">
          {["1H", "4H", "1D", "1W"].map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange?.(tf)}
              className={cn(
                "px-2.5 py-0.5 rounded-[5px] transition-colors cursor-pointer",
                timeframe === tf ? "bg-white text-[#0B1524] font-semibold shadow-xs" : "hover:text-[#0B1524]"
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full h-[220px] bg-[#FAFCFF] rounded-[10px] border border-[#EEF1F6] overflow-hidden">
        <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <pattern id="oppGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#F0F4FA" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width={w} height={h} fill="url(#oppGrid)" />

          {/* Dotted curve connecting candles */}
          <path
            d="M 30 180 Q 120 160 210 100 T 380 90 T 520 140 T 680 120"
            fill="none"
            stroke="#0052FF"
            strokeWidth="1.8"
            strokeDasharray="4 4"
            opacity="0.85"
          />

          {/* Setup callout box */}
          <rect x="470" y="80" width="90" height="30" rx="6" fill="#EAF1FF" stroke="#0052FF" strokeWidth="1" />
          <text x="480" y="99" fill="#0052FF" fontSize="11" fontWeight="600">Current setup</text>

          {/* Signal markers */}
          <circle cx="210" cy="100" r="3.5" fill="#0052FF" />
          <text x="180" y="80" fill="#0B1524" fontSize="10" fontWeight="600">Funding anomaly +2.8σ</text>

          <circle cx="340" cy="95" r="3.5" fill="#0052FF" />
          <text x="310" y="78" fill="#0B1524" fontSize="10" fontWeight="600">Basis expands +1.9σ</text>

          <circle cx="430" cy="115" r="3.5" fill="#D92D20" />
          <text x="395" y="135" fill="#0B1524" fontSize="10" fontWeight="600">Order-book pressure turns negative</text>

          {/* Current price marker */}
          <rect x={w - 75} y="112" width="65" height="20" rx="4" fill="#0052FF" />
          <text x={w - 68} y="126" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="monospace">108,320</text>
        </svg>
      </div>
    </div>
  );
}
