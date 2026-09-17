import React, { useState, useEffect } from "react";
import { AccentDash } from "./primitives";
import { generateMarketCurve, pointsToSvgPath } from "../lib/financialCurves";

export function HeroSection({ hero }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger smooth entrance right after component mount
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Keyframes for the right-hand preview wave matching reference
  const perpKeyframes = [
    { x: 20, y: 255 },
    { x: 120, y: 242 },
    { x: 220, y: 215 },
    { x: 310, y: 202 },
    { x: 380, y: 212 },
    { x: 440, y: 175 },
    { x: 490, y: 140 },
    { x: 535, y: 128 },
    { x: 560, y: 122 }
  ];

  const spotKeyframes = [
    { x: 20, y: 270 },
    { x: 120, y: 258 },
    { x: 220, y: 236 },
    { x: 310, y: 228 },
    { x: 380, y: 224 },
    { x: 440, y: 222 },
    { x: 490, y: 212 },
    { x: 535, y: 214 },
    { x: 560, y: 212 }
  ];

  const perpPoints = generateMarketCurve(perpKeyframes, 90, 0.85);
  const spotPoints = generateMarketCurve(spotKeyframes, 90, 0.75);

  const perpPath = pointsToSvgPath(perpPoints);
  const spotPath = pointsToSvgPath(spotPoints);

  const intersectionX = 535;
  const perpIntersectionY = 128;
  const spotIntersectionY = 214;

  return (
    <section id="hero" className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Title, Subtitle, Description, Stat Cards, Action Buttons */}
        <div className="lg:col-span-7 space-y-8 z-10">
          <div
            className={`transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <AccentDash className="mb-6" />
            <h1 className="text-[56px] sm:text-[68px] lg:text-[76px] font-bold text-[#111111] leading-[0.96] tracking-[-0.04em]">
              {hero.title}
            </h1>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-medium text-[#111111] mt-3 tracking-[-0.025em]">
              {hero.subtitle}
            </h2>
          </div>

          <p
            className={`text-[15px] sm:text-[15.5px] leading-[1.65] text-[#747474] max-w-[460px] transition-all duration-700 delay-100 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {hero.description}
          </p>

          {/* 3 Metric Stat Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-[500px]">
            {hero.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`rounded-[12px] border border-[#E5E5DE] bg-[#FDFDFB] p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.015)] transition-all duration-700 hover:border-[#D5D5CD] hover:-translate-y-1 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${200 + idx * 100}ms` }}
              >
                <div className="font-mono text-[20px] sm:text-[23px] font-medium text-[#111111] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[12px] text-[#747474] mt-1.5 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div
            className={`flex items-center gap-3.5 pt-2 transition-all duration-700 delay-500 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <a
              href="#strategy"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#111111] text-[#F7F7F4] text-[13.5px] font-medium hover:bg-[#252525] transition-all shadow-sm hover:shadow"
            >
              <span>{hero.ctaPrimary}</span>
              <span className="text-xs transition-transform group-hover:translate-x-0.5">→</span>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#E5E5DE] bg-[#FDFDFB] text-[#111111] text-[13.5px] font-medium hover:bg-[#F2F2EE] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>{hero.ctaSecondary}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Realistic Financial Dislocation Preview Graphic */}
        <div className="lg:col-span-5 relative flex items-center justify-end">
          <svg viewBox="0 0 680 300" className="w-full h-auto select-none overflow-visible">
            <defs>
              <linearGradient id="heroFadeOlive" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7F8F63" stopOpacity="0.0" />
                <stop offset="30%" stopColor="#7F8F63" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#7F8F63" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="heroFadeCharcoal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#596067" stopOpacity="0.0" />
                <stop offset="30%" stopColor="#596067" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#596067" stopOpacity="0.85" />
              </linearGradient>
            </defs>

            {/* Perpetual curve surging upward with draw-in animation */}
            <path
              d={perpPath}
              fill="none"
              stroke="url(#heroFadeOlive)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={mounted ? "0" : "1"}
              style={{
                transition: "stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s"
              }}
            />

            {/* Spot curve holding steady with draw-in animation */}
            <path
              d={spotPath}
              fill="none"
              stroke="url(#heroFadeCharcoal)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={mounted ? "0" : "1"}
              style={{
                transition: "stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s"
              }}
            />

            {/* End vertical dashed alignment line */}
            <g
              style={{
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.6s ease-out 1.2s"
              }}
            >
              <line
                x1={intersectionX}
                y1={perpIntersectionY - 40}
                x2={intersectionX}
                y2={spotIntersectionY + 40}
                stroke="#B5B5AD"
                strokeWidth="1"
                strokeDasharray="2.5 2.5"
              />

              {/* End Dots */}
              <circle cx={intersectionX} cy={perpIntersectionY} r="3.5" fill="#7F8F63" />
              <circle cx={intersectionX} cy={spotIntersectionY} r="3.5" fill="#596067" />

              {/* Text Callouts matching reference */}
              <g transform={`translate(${intersectionX + 14}, ${perpIntersectionY + 3.5})`}>
                <text
                  x="0"
                  y="0"
                  fill="#747474"
                  fontSize="10"
                  fontFamily="Geist Mono Variable, ui-monospace, monospace"
                  letterSpacing="0.14em"
                >
                  • PERPETUALS
                </text>
              </g>

              <g transform={`translate(${intersectionX + 14}, ${spotIntersectionY + 3.5})`}>
                <text
                  x="0"
                  y="0"
                  fill="#747474"
                  fontSize="10"
                  fontFamily="Geist Mono Variable, ui-monospace, monospace"
                  letterSpacing="0.14em"
                >
                  • SPOT REFERENCE
                </text>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
