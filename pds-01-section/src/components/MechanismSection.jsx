import React from "react";
import { AccentDash, IndexPill } from "./primitives";
import { generateMarketCurve, pointsToSvgPath } from "../lib/financialCurves";
import { useInView } from "../hooks/useInView";

function DetectMiniChart({ active }) {
  const spotK = [{ x: 10, y: 48 }, { x: 50, y: 44 }, { x: 95, y: 38 }, { x: 140, y: 36 }];
  const perpK = [{ x: 10, y: 44 }, { x: 50, y: 36 }, { x: 95, y: 22 }, { x: 140, y: 16 }];
  const spotP = pointsToSvgPath(generateMarketCurve(spotK, 25, 0.4));
  const perpP = pointsToSvgPath(generateMarketCurve(perpK, 25, 0.5));

  return (
    <svg viewBox="0 0 150 70" className="w-full h-auto select-none overflow-visible">
      <circle
        cx="95"
        cy="30"
        r="16"
        fill="#7F8F63"
        fillOpacity="0.18"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "scale(1)" : "scale(0.5)",
          transformOrigin: "95px 30px",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s"
        }}
      />
      <line
        x1="95"
        y1="10"
        x2="95"
        y2="52"
        stroke="#7F8F63"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.6"
        style={{
          opacity: active ? 0.6 : 0,
          transition: "opacity 0.4s ease 0.6s"
        }}
      />
      <path
        d={spotP}
        fill="none"
        stroke="#596067"
        strokeWidth="1.4"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={active ? "0" : "1"}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s" }}
      />
      <path
        d={perpP}
        fill="none"
        stroke="#7F8F63"
        strokeWidth="1.6"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={active ? "0" : "1"}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s" }}
      />
      <circle cx="95" cy="22" r="2.5" fill="#7F8F63" style={{ opacity: active ? 1 : 0, transition: "opacity 0.4s ease 0.8s" }} />
    </svg>
  );
}

function EnterMiniChart({ active }) {
  const spotK = [{ x: 10, y: 52 }, { x: 45, y: 48 }, { x: 80, y: 40 }, { x: 140, y: 32 }];
  const perpK = [{ x: 10, y: 42 }, { x: 45, y: 34 }, { x: 80, y: 24 }, { x: 140, y: 18 }];
  const spotP = pointsToSvgPath(generateMarketCurve(spotK, 25, 0.4));
  const perpP = pointsToSvgPath(generateMarketCurve(perpK, 25, 0.5));

  return (
    <svg viewBox="0 0 150 70" className="w-full h-auto select-none overflow-visible">
      <line
        x1="80"
        y1="10"
        x2="80"
        y2="55"
        stroke="#7F8F63"
        strokeWidth="1"
        strokeDasharray="2 2"
        style={{
          opacity: active ? 0.75 : 0,
          transform: active ? "translateY(0)" : "translateY(-10px)",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.7s"
        }}
      />
      <circle
        cx="80"
        cy="24"
        r="5"
        fill="#7F8F63"
        fillOpacity="0.22"
        style={{ opacity: active ? 1 : 0, transition: "opacity 0.4s ease 0.8s" }}
      />
      <circle
        cx="80"
        cy="24"
        r="2.5"
        fill="#7F8F63"
        style={{ opacity: active ? 1 : 0, transition: "opacity 0.4s ease 0.8s" }}
      />
      <text
        x="80"
        y="6"
        fill="#111111"
        fontSize="8.5"
        fontFamily="Geist Mono Variable, ui-monospace, monospace"
        fontWeight="700"
        letterSpacing="0.08em"
        textAnchor="middle"
        style={{
          opacity: active ? 1 : 0,
          transition: "opacity 0.4s ease 0.8s"
        }}
      >
        ENTRY
      </text>
      <path
        d={spotP}
        fill="none"
        stroke="#596067"
        strokeWidth="1.4"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={active ? "0" : "1"}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s" }}
      />
      <path
        d={perpP}
        fill="none"
        stroke="#7F8F63"
        strokeWidth="1.6"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={active ? "0" : "1"}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s" }}
      />
    </svg>
  );
}

function ConvergeMiniChart({ active }) {
  const spotK = [{ x: 10, y: 42 }, { x: 55, y: 44 }, { x: 105, y: 36 }, { x: 140, y: 35 }];
  const perpK = [{ x: 10, y: 24 }, { x: 55, y: 28 }, { x: 105, y: 36 }, { x: 140, y: 35 }];
  const spotP = pointsToSvgPath(generateMarketCurve(spotK, 25, 0.4));
  const perpP = pointsToSvgPath(generateMarketCurve(perpK, 25, 0.5));

  return (
    <svg viewBox="0 0 150 70" className="w-full h-auto select-none overflow-visible">
      <circle
        cx="105"
        cy="36"
        r="14"
        fill="#7F8F63"
        fillOpacity="0.18"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "scale(1)" : "scale(0.5)",
          transformOrigin: "105px 36px",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s"
        }}
      />
      <line
        x1="105"
        y1="16"
        x2="105"
        y2="54"
        stroke="#7F8F63"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.6"
        style={{ opacity: active ? 0.6 : 0, transition: "opacity 0.4s ease 0.8s" }}
      />
      <path
        d={spotP}
        fill="none"
        stroke="#596067"
        strokeWidth="1.4"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={active ? "0" : "1"}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s" }}
      />
      <path
        d={perpP}
        fill="none"
        stroke="#7F8F63"
        strokeWidth="1.6"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={active ? "0" : "1"}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s" }}
      />
      <circle cx="105" cy="36" r="2.5" fill="#7F8F63" style={{ opacity: active ? 1 : 0, transition: "opacity 0.4s ease 1s" }} />
    </svg>
  );
}

export function MechanismSection({ mechanism }) {
  const [sectionRef, isInView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section
      id="mechanism"
      ref={sectionRef}
      className={`py-16 lg:py-24 transition-all duration-800 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Section Eyebrow & Headline */}
      <div className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <AccentDash />
          <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#747474] font-medium">
            {mechanism.eyebrow}
          </span>
        </div>

        <h2 className="text-[38px] sm:text-[44px] font-semibold text-[#111111] leading-[1.08] tracking-[-0.03em]">
          {mechanism.title}
        </h2>

        <p className="mt-4 text-[14px] text-[#747474] leading-[1.65] max-w-xl">
          {mechanism.description}
        </p>
      </div>

      {/* 3 Process Cards: Horizontal layout matching reference media_1789647594126.png */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        {/* Step 01: Detect */}
        <div
          className={`md:col-span-3 rounded-[14px] border border-[#E5E5DE] bg-[#FDFDFB] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.015)] h-[175px] flex items-center justify-between gap-4 transition-all duration-700 hover:border-[#D5D5CD] hover:-translate-y-1 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="flex-1 flex flex-col justify-between h-full">
            <div>
              <IndexPill>01</IndexPill>
              <h3 className="text-[21px] font-medium text-[#111111] mt-2 tracking-[-0.015em]">
                Detect
              </h3>
            </div>
            <p className="text-[12px] text-[#747474] leading-[1.5] max-w-[150px]">
              Identify when the perpetual trades at an unusually large premium to its spot reference.
            </p>
          </div>
          <div className="w-[125px] shrink-0">
            <DetectMiniChart active={isInView} />
          </div>
        </div>

        {/* Arrow 1 */}
        <div
          className={`hidden md:flex md:col-span-1 justify-center text-[#A0A098] text-base select-none transition-opacity duration-500 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "350ms" }}
        >
          →
        </div>

        {/* Step 02: Enter */}
        <div
          className={`md:col-span-3 rounded-[14px] border border-[#E5E5DE] bg-[#FDFDFB] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.015)] h-[175px] flex items-center justify-between gap-4 transition-all duration-700 hover:border-[#D5D5CD] hover:-translate-y-1 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "450ms" }}
        >
          <div className="flex-1 flex flex-col justify-between h-full">
            <div>
              <IndexPill>02</IndexPill>
              <h3 className="text-[21px] font-medium text-[#111111] mt-2 tracking-[-0.015em]">
                Enter
              </h3>
            </div>
            <p className="text-[12px] text-[#747474] leading-[1.5] max-w-[150px]">
              Execute at the defined entry threshold with passive maker orders, incorporating friction assumptions.
            </p>
          </div>
          <div className="w-[125px] shrink-0">
            <EnterMiniChart active={isInView} />
          </div>
        </div>

        {/* Arrow 2 */}
        <div
          className={`hidden md:flex md:col-span-1 justify-center text-[#A0A098] text-base select-none transition-opacity duration-500 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "650ms" }}
        >
          →
        </div>

        {/* Step 03: Converge */}
        <div
          className={`md:col-span-3 rounded-[14px] border border-[#E5E5DE] bg-[#FDFDFB] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.015)] h-[175px] flex items-center justify-between gap-4 transition-all duration-700 hover:border-[#D5D5CD] hover:-translate-y-1 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "750ms" }}
        >
          <div className="flex-1 flex flex-col justify-between h-full">
            <div>
              <IndexPill>03</IndexPill>
              <h3 className="text-[21px] font-medium text-[#111111] mt-2 tracking-[-0.015em]">
                Converge
              </h3>
            </div>
            <p className="text-[12px] text-[#747474] leading-[1.5] max-w-[150px]">
              Capture the snapback as the perpetual price returns to its spot reference.
            </p>
          </div>
          <div className="w-[125px] shrink-0">
            <ConvergeMiniChart active={isInView} />
          </div>
        </div>
      </div>
    </section>
  );
}
