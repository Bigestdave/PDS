import React from "react";
import { STRATEGY_DATA } from "./data/strategy";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { SectionHeader } from "./components/SectionHeader";
import { SignalCard } from "./components/SignalCard";
import { RuleTable } from "./components/RuleTable";
import { ExecutionCard } from "./components/ExecutionCard";
import { DislocationChart } from "./components/DislocationChart";
import { MechanismSection } from "./components/MechanismSection";
import { TradeAnatomySection } from "./components/TradeAnatomySection";
import { PortfolioSection } from "./components/PortfolioSection";
import { BottomBanner } from "./components/BottomBanner";
import { useInView } from "./hooks/useInView";

function StrategySection({ sectionHeader, cards, chart }) {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="strategy"
      ref={ref}
      className={`py-16 lg:py-24 border-t border-[#EAEAE5] transition-all duration-800 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
        <div
          className={`lg:col-span-4 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <SectionHeader
            eyebrow={sectionHeader.eyebrow}
            title={sectionHeader.title}
            description={sectionHeader.description}
          />
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3">
          <div
            className={`transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <SignalCard card={cards.signal} />
          </div>
          <div
            className={`transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "280ms" }}
          >
            <RuleTable card={cards.rule} />
          </div>
          <div
            className={`transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <ExecutionCard card={cards.execution} />
          </div>
        </div>
      </div>

      <div className="mt-12 lg:mt-16">
        <DislocationChart chartData={chart} />
      </div>
    </section>
  );
}

export default function App() {
  const { nav, hero, sectionHeader, cards, chart, mechanism, anatomy } = STRATEGY_DATA;

  return (
    <div id="top" className="min-h-screen bg-[#F7F7F4] text-[#111111] scroll-smooth selection:bg-[#7F8F63]/25 selection:text-[#111111]">
      {/* Sticky Navbar (Hero link removed, top progress bar active) */}
      <Navbar nav={nav} />

      {/* Main Sections */}
      <main className="w-full max-w-[1360px] mx-auto px-6 sm:px-10">
        {/* Section 1: Hero */}
        <HeroSection hero={hero} />

        {/* Section 2: Strategy */}
        <StrategySection
          sectionHeader={sectionHeader}
          cards={cards}
          chart={chart}
        />

        {/* Section 3: The Mechanism */}
        <div className="border-t border-[#EAEAE5]">
          <MechanismSection mechanism={mechanism} />
        </div>

        {/* Section 4: Trade Anatomy */}
        <div className="border-t border-[#EAEAE5]">
          <TradeAnatomySection anatomy={anatomy} />
        </div>

        {/* Section 5: Portfolio Capital & Risk Simulation */}
        <PortfolioSection />

        {/* Section 6: Bottom CTA Banner */}
        <BottomBanner />
      </main>
    </div>
  );
}
