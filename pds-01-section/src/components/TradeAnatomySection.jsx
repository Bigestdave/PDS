import React from "react";
import { AccentDash } from "./primitives";
import { generateMarketCurve, pointsToSvgPath } from "../lib/financialCurves";
import { useInView } from "../hooks/useInView";

export function TradeAnatomySection({ anatomy }) {
  const [sectionRef, isInView] = useInView({ threshold: 0.15, triggerOnce: true });
  const { eyebrow, title, description, legend, levels, timeLabels } = anatomy;

  // Clear vertical positions with ZERO collision
  const stopY = 36;      // Level ~106.0+
  const targetY = 92;    // Level ~104.0
  const entryX = 220;
  const entryY = 126;    // Level ~103.0
  const targetMeetX = 670;
  const targetMeetY = 198;

  // Realistic market keyframes
  const spotKeyframes = [
    { x: 55, y: 226 },
    { x: 130, y: 215 },
    { x: 220, y: 194 },
    { x: 310, y: 178 },
    { x: 400, y: 184 },
    { x: 490, y: 194 },
    { x: 580, y: 204 },
    { x: 670, y: 198 },
    { x: 740, y: 195 }
  ];

  const perpKeyframes = [
    { x: 55, y: 210 },
    { x: 130, y: 194 },
    { x: 220, y: 126 },
    { x: 300, y: 104 },
    { x: 380, y: 130 },
    { x: 460, y: 164 },
    { x: 550, y: 188 },
    { x: 640, y: 198 },
    { x: 740, y: 194 }
  ];

  const spotPoints = generateMarketCurve(spotKeyframes, 100, 0.65);
  const perpPoints = generateMarketCurve(perpKeyframes, 100, 0.75);

  const spotPath = pointsToSvgPath(spotPoints);
  const perpPath = pointsToSvgPath(perpPoints);

  return (
    <section
      id="anatomy"
      ref={sectionRef}
      className={`py-16 lg:py-24 transition-all duration-800 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
        {/* Left Column: Eyebrow, Heading, Description, Detailed Legend */}
        <div className="lg:col-span-4 space-y-7">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <AccentDash />
              <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#747474] font-medium">
                {eyebrow}
              </span>
            </div>

            <h2 className="text-[38px] sm:text-[46px] font-semibold text-[#111111] leading-[1.08] tracking-[-0.03em]">
              {title}
            </h2>

            <p className="mt-4 text-[14px] leading-[1.65] text-[#747474] max-w-sm">
              {description}
            </p>
          </div>

          {/* Detailed Level Legend */}
          <div className="pt-2 space-y-4">
            {legend.map((item, idx) => (
              <div
                key={item.label}
                className={`flex items-center gap-3.5 text-[13px] transition-all duration-500 ${
                  isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                }`}
                style={{ transitionDelay: `${200 + idx * 80}ms` }}
              >
                {item.type === "line" && (
                  <div
                    className="w-5 h-[2px] rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                )}
                {item.type === "dot" && (
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                )}
                {item.type === "dashed" && (
                  <div
                    className="w-5 h-0 border-t-2 border-dashed shrink-0"
                    style={{ borderColor: item.color }}
                  />
                )}

                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-[#111111]">{item.label}</span>
                  <span className="text-[#747474] text-[12px] font-mono">{item.sublabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Full Trade Anatomy SVG Card */}
        <div className="lg:col-span-8 rounded-[14px] border border-[#E5E5DE] bg-[#FDFDFB] p-6 sm:p-7 lg:p-8 shadow-[0_1px_4px_rgba(0,0,0,0.015)] transition-all hover:border-[#D5D5CD]">
          {/* Card Badges */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#747474] font-medium">
              PDS-01 TRADE EXAMPLE
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-[6px] border border-[#E5E5DE] bg-[#F7F7F4] text-[#555555] font-mono text-[10px] tracking-[0.14em] uppercase font-medium">
              SPOT VS PERPETUAL
            </span>
          </div>

          {/* SVG Canvas */}
          <svg viewBox="0 0 760 290" className="w-full h-auto overflow-visible select-none">
            {/* Horizontal Gridlines & Y-Axis Labels */}
            {levels.map((lvl) => (
              <g key={lvl.label}>
                <line x1="45" y1={lvl.y} x2="735" y2={lvl.y} stroke="#EFEFEA" strokeWidth="1" />
                <text
                  x="10"
                  y={lvl.y + 4}
                  fill="#8E8E8A"
                  fontSize="10"
                  fontFamily="Geist Mono Variable, ui-monospace, monospace"
                >
                  {lvl.label}
                </text>
              </g>
            ))}

            {/* X-Axis T0..T8 */}
            {timeLabels.map((lbl, idx) => {
              const xPos = 55 + idx * 85;
              return (
                <text
                  key={lbl}
                  x={xPos}
                  y="275"
                  fill="#8E8E8A"
                  fontSize="10"
                  fontFamily="Geist Mono Variable, ui-monospace, monospace"
                  textAnchor="middle"
                >
                  {lbl}
                </text>
              );
            })}

            {/* Hard Stop Horizontal Dashed Line (Coral/Salmon) */}
            <line
              x1="220"
              y1={stopY}
              x2="735"
              y2={stopY}
              stroke="#F28B82"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              pathLength="1"
              strokeDashoffset={isInView ? "0" : "1"}
              style={{
                transition: "stroke-dashoffset 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s"
              }}
            />
            {/* STOP Label - cleanly placed above the line */}
            <g
              transform={`translate(735, ${stopY - 6})`}
              style={{
                opacity: isInView ? 1 : 0,
                transition: "opacity 0.6s ease 0.8s"
              }}
            >
              <text
                x="0"
                y="0"
                fill="#E05252"
                fontSize="9.5"
                fontFamily="Geist Mono Variable, ui-monospace, monospace"
                fontWeight="700"
                textAnchor="end"
              >
                STOP
              </text>
              <text
                x="0"
                y="11"
                fill="#747474"
                fontSize="9"
                fontFamily="Geist Mono Variable, ui-monospace, monospace"
                textAnchor="end"
              >
                +15.0 bps
              </text>
            </g>

            {/* Target Horizontal Dashed Line (Olive) */}
            <line
              x1="220"
              y1={targetY}
              x2="735"
              y2={targetY}
              stroke="#7F8F63"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              pathLength="1"
              strokeDashoffset={isInView ? "0" : "1"}
              style={{
                transition: "stroke-dashoffset 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s"
              }}
            />
            {/* TARGET Label - with 56px clearance from STOP */}
            <g
              transform={`translate(735, ${targetY - 6})`}
              style={{
                opacity: isInView ? 1 : 0,
                transition: "opacity 0.6s ease 0.9s"
              }}
            >
              <text
                x="0"
                y="0"
                fill="#111111"
                fontSize="9.5"
                fontFamily="Geist Mono Variable, ui-monospace, monospace"
                fontWeight="700"
                textAnchor="end"
              >
                TARGET
              </text>
              <text
                x="0"
                y="11"
                fill="#637349"
                fontSize="9"
                fontFamily="Geist Mono Variable, ui-monospace, monospace"
                fontWeight="600"
                textAnchor="end"
              >
                +4.96 bps
              </text>
            </g>

            {/* Spot Curve (Charcoal) - with draw-in animation */}
            <path
              d={spotPath}
              fill="none"
              stroke="#596067"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={isInView ? "0" : "1"}
              style={{
                transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s"
              }}
            />

            {/* Perpetual Curve (Olive) - with draw-in animation */}
            <path
              d={perpPath}
              fill="none"
              stroke="#7F8F63"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={isInView ? "0" : "1"}
              style={{
                transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s"
              }}
            />

            {/* Entry Vertical Dashed Line at T2 (x=220) */}
            <g
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(-14px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s"
              }}
            >
              <line
                x1={entryX}
                y1={entryY}
                x2={entryX}
                y2="260"
                stroke="#7F8F63"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.85"
              />
              {/* Entry Dot with Pulse Halo */}
              <circle cx={entryX} cy={entryY} r="6" fill="#7F8F63" fillOpacity="0.22" />
              <circle cx={entryX} cy={entryY} r="3.5" fill="#7F8F63" />

              {/* Entry Annotation */}
              <g transform={`translate(${entryX - 10}, ${entryY - 26})`}>
                <text
                  x="0"
                  y="0"
                  fill="#111111"
                  fontSize="9.5"
                  fontFamily="Geist Mono Variable, ui-monospace, monospace"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  ENTRY
                </text>
                <text
                  x="0"
                  y="11"
                  fill="#637349"
                  fontSize="9"
                  fontFamily="Geist Mono Variable, ui-monospace, monospace"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  +10.82 bps
                </text>
              </g>
            </g>

            {/* Target Marker Dot at Convergence Point (x=670) */}
            <g
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "scale(1)" : "scale(0.5)",
                transformOrigin: `${targetMeetX}px ${targetMeetY}px`,
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 1.1s"
              }}
            >
              <circle cx={targetMeetX} cy={targetMeetY} r="5.5" fill="#7F8F63" fillOpacity="0.22" />
              <circle cx={targetMeetX} cy={targetMeetY} r="3" fill="#7F8F63" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
