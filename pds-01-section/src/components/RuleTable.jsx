import React from "react";
import { IndexPill, AccentDash } from "./primitives";

export function RuleTable({ card }) {
  return (
    <div className="flex flex-col justify-between h-full px-0 md:px-6 lg:px-8 border-t md:border-t-0 md:border-l border-[#E5E5DE] pt-8 md:pt-0">
      <div>
        <IndexPill>{card.index}</IndexPill>
        <h3 className="text-[22px] font-medium text-[#111111] mt-3 tracking-[-0.015em]">
          {card.title}
        </h3>
        <AccentDash className="mt-3.5 mb-6" />

        <dl className="divide-y divide-[#EAEAE5]">
          {card.items.map((item) => (
            <div
              key={item.label}
              className="py-3 flex items-baseline justify-between text-[13px]"
            >
              <dt className="text-[#747474] font-normal">{item.label}</dt>
              <dd className="font-mono text-[#111111] font-medium text-[13px] tracking-tight">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
