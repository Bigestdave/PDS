import React, { useState } from "react";
import { generateMarketCurve, pointsToSvgPath, buildAreaPolygon } from "../lib/financialCurves";
import { ChartLegend } from "./ChartLegend";
import { useInView } from "../hooks/useInView";

export function DislocationChart({ chartData }) {
  const [containerRef, isInView] = useInView({ threshold: 0.15, triggerOnce: true });
  const [hoverX, setHoverX] = useState(null);

  const {
    badgeLeft,
    badgeRight,
    yAxisLevels,
    timeLabels,
    entryMarker,
    targetMarker,
    legend
  } = chartData;

  // Keyframes for Spot Reference (charcoal)
  const spotKeyframes = [
    { x: 55, y: 226 },
    { x: 120, y: 212 },
    { x: 190, y: 194 },
    { x: 260, y: 178 },
    { x: 330, y: 168 },
    { x: 420, y: 172 },
    { x: 510, y: 184 },
    { x: 600, y: 197 },
    { x: 690, y: 203 },
    { x: 775, y: 201 },
    { x: 855, y: 194 }
  ];

  // Keyframes for Perpetual Price (olive)
  const perpKeyframes = [
    { x: 55, y: 212 },
    { x: 120, y: 196 },
    { x: 190, y: 166 },
    { x: 260, y: 128 },
    { x: 330, y: 112 },
    { x: 410, y: 138 },
    { x: 490, y: 162 },
    { x: 580, y: 185 },
    { x: 670, y: 198 },
    { x: 775, y: 200 },
    { x: 855, y: 193 }
  ];

  const spotPoints = generateMarketCurve(spotKeyframes, 120, 0.7);
  const perpPoints = generateMarketCurve(perpKeyframes, 120, 0.8);

  const spotPath = pointsToSvgPath(spotPoints);
  const perpPath = pointsToSvgPath(perpPoints);

  // Area slice between T1 (x ≈ 140) and Target (x ≈ 775)
  const topSlice = perpPoints.filter(p => p.x >= 140 && p.x <= 775);
  const bottomSlice = spotPoints.filter(p => p.x >= 140 && p.x <= 775);
  const premiumAreaPath = buildAreaPolygon(topSlice, bottomSlice);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 880;
    if (svgX >= 55 && svgX <= 855) {
      setHoverX(svgX);
    } else {
      setHoverX(null);
    }
  };

  const handleMouseLeave = () => setHoverX(null);

  // Tooltip calculations
  let activePerp = null;
  let activeSpot = null;
  let activeDiff = null;

  if (hoverX !== null) {
    activePerp = perpPoints.reduce((prev, curr) =>
      Math.abs(curr.x - hoverX) < Math.abs(prev.x - hoverX) ? curr : prev
    );
    activeSpot = spotPoints.reduce((prev, curr) =>
      Math.abs(curr.x - hoverX) < Math.abs(prev.x - hoverX) ? curr : prev
    );
    activeDiff = (((activeSpot.y - activePerp.y) / 60) * 10).toFixed(2);
  }

  return (
    <div
      ref={containerRef}
      className={`w-full rounded-[14px] border border-[#E5E5DE] bg-[#FDFDFB] p-6 sm:p-7 lg:p-8 shadow-[0_1px_4px_rgba(0,0,0,0.015)] transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Chart Top Badges */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="inline-flex items-center px-2.5 py-1 rounded-[6px] border border-[#E5E5DE] bg-[#F7F7F4] text-[#444444] font-mono text-[10px] tracking-[0.14em] uppercase font-medium">
            {badgeLeft}
          </div>
          <span className="text-[#888888] text-[10px] select-none">•</span>
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#747474] font-medium">
            {badgeRight}
          </span>
        </div>

        {activeDiff !== null && (
          <div className="font-mono text-[11px] text-[#7F8F63] font-semibold tracking-tight bg-[#7F8F63]/10 px-2.5 py-0.5 rounded-full animate-fade-in">
            Dislocation: +{activeDiff} bps
          </div>
        )}
      </div>

      {/* Main Grid: SVG Chart (Left) + Divider + Legend & Narrative (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
        {/* Left: SVG Chart Canvas */}
        <div className="lg:col-span-9 relative w-full lg:pr-8 cursor-crosshair">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto overflow-visible select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              <linearGradient id="dislocationGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7F8F63" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#7F8F63" stopOpacity="0.04" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines & Y-Axis Labels */}
            {yAxisLevels.map((lvl) => (
              <g key={lvl.label}>
                <line
                  x1="55"
                  y1={lvl.y}
                  x2="855"
                  y2={lvl.y}
                  stroke="#EFEFEA"
                  strokeWidth="1"
                />
                <text
                  x="15"
                  y={lvl.y + 4}
                  fill="#8E8E8A"
                  fontSize="10.5"
                  fontFamily="Geist Mono Variable, ui-monospace, monospace"
                >
                  {lvl.label}
                </text>
              </g>
            ))}

            {/* X-Axis T0..T8 Labels */}
            {timeLabels.map((t) => (
              <text
                key={t.label}
                x={t.x}
                y="278"
                fill="#8E8E8A"
                fontSize="10.5"
                fontFamily="Geist Mono Variable, ui-monospace, monospace"
                textAnchor="middle"
              >
                {t.label}
              </text>
            ))}

            {/* Premium Dislocation Area Fill (fades in smoothly after lines finish drawing) */}
            <path
              d={premiumAreaPath}
              fill="url(#dislocationGrad)"
              style={{
                opacity: isInView ? 1 : 0,
                transition: "opacity 0.9s ease-out 0.8s"
              }}
            />

            {/* Spot Reference Line (Charcoal) - draws in using pathLength="1" */}
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
                transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s"
              }}
            />

            {/* Perpetual Price Line (Olive) - draws in using pathLength="1" */}
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
                transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s"
              }}
            />

            {/* Entry Marker Vertical Dashed Line at T2 */}
            <g
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(-16px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s"
              }}
            >
              <line
                x1={entryMarker.x}
                y1={entryMarker.y}
                x2={entryMarker.x}
                y2="262"
                stroke="#7F8F63"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.85"
              />

              {/* Entry Marker Dot with Pulse Halo */}
              <circle
                cx={entryMarker.x}
                cy={entryMarker.y}
                r="6.5"
                fill="#7F8F63"
                fillOpacity="0.22"
              />
              <circle
                cx={entryMarker.x}
                cy={entryMarker.y}
                r="3.5"
                fill="#7F8F63"
              />

              {/* Entry Annotation */}
              <g transform={`translate(${entryMarker.x}, ${entryMarker.y - 28})`}>
                <text
                  x="0"
                  y="0"
                  fill="#111111"
                  fontSize="10"
                  fontFamily="Geist Mono Variable, ui-monospace, monospace"
                  fontWeight="700"
                  letterSpacing="0.08em"
                  textAnchor="middle"
                >
                  {entryMarker.label}
                </text>
                <text
                  x="0"
                  y="13"
                  fill="#637349"
                  fontSize="10"
                  fontFamily="Geist Mono Variable, ui-monospace, monospace"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {entryMarker.value}
                </text>
              </g>
            </g>

            {/* Target Marker Vertical Dashed Line */}
            <g
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(-16px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.1s"
              }}
            >
              <line
                x1={targetMarker.x}
                y1={targetMarker.y}
                x2={targetMarker.x}
                y2="262"
                stroke="#7F8F63"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.85"
              />

              {/* Target Marker Dot with Pulse Halo */}
              <circle
                cx={targetMarker.x}
                cy={targetMarker.y}
                r="6.5"
                fill="#7F8F63"
                fillOpacity="0.22"
              />
              <circle
                cx={targetMarker.x}
                cy={targetMarker.y}
                r="3.5"
                fill="#7F8F63"
              />

              {/* Target Annotation */}
              <g transform={`translate(${targetMarker.x}, ${targetMarker.y - 28})`}>
                <text
                  x="0"
                  y="0"
                  fill="#111111"
                  fontSize="10"
                  fontFamily="Geist Mono Variable, ui-monospace, monospace"
                  fontWeight="700"
                  letterSpacing="0.08em"
                  textAnchor="middle"
                >
                  {targetMarker.label}
                </text>
                <text
                  x="0"
                  y="13"
                  fill="#637349"
                  fontSize="10"
                  fontFamily="Geist Mono Variable, ui-monospace, monospace"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {targetMarker.value}
                </text>
              </g>
            </g>

            {/* Interactive Hover Crosshair */}
            {hoverX !== null && activePerp && activeSpot && (
              <g>
                <line
                  x1={hoverX}
                  y1="50"
                  x2={hoverX}
                  y2="265"
                  stroke="#111111"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  opacity="0.4"
                />
                <circle cx={hoverX} cy={activePerp.y} r="3" fill="#7F8F63" stroke="#FDFDFB" strokeWidth="1.5" />
                <circle cx={hoverX} cy={activeSpot.y} r="3" fill="#596067" stroke="#FDFDFB" strokeWidth="1.5" />
              </g>
            )}
          </svg>
        </div>

        {/* Right: Legend Column with Left Border Divider */}
        <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-[#E5E5DE] pt-6 lg:pt-0 lg:pl-8">
          <ChartLegend legend={legend} />
        </div>
      </div>
    </div>
  );
}
