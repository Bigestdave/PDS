import React from "react";
import { AccentDash } from "./primitives";

export function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="flex flex-col pr-0 lg:pr-4">
      {/* Eyebrow with leading dash */}
      <div className="flex items-center gap-2.5 mb-5">
        <AccentDash />
        <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#747474] font-medium">
          {eyebrow}
        </span>
      </div>

      {/* Two-line Editorial Title */}
      <h1 className="text-[38px] sm:text-[44px] lg:text-[47px] font-semibold text-[#111111] leading-[1.08] tracking-[-0.035em]">
        The edge is in<br />the details.
      </h1>

      {/* Description */}
      <p className="mt-6 text-[13.5px] leading-[1.65] text-[#747474] max-w-[340px]">
        {description}
      </p>
    </div>
  );
}
