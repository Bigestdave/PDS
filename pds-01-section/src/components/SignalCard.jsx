import React from "react";
import { IndexPill, NoteBox } from "./primitives";

export function SignalCard({ card }) {
  return (
    <div className="flex flex-col justify-between h-full px-0 md:px-6 lg:px-8">
      <div>
        <IndexPill>{card.index}</IndexPill>
        <h3 className="text-[22px] font-medium text-[#111111] mt-3 tracking-[-0.015em]">
          {card.title}
        </h3>
        <p className="text-[13px] text-[#747474] mt-2.5 leading-[1.55]">
          {card.description}
        </p>
      </div>

      <div className="mt-8">
        <div className="w-6 h-[1px] bg-[#E5E5DE] mb-5" />
        <NoteBox headerText={card.conditionTitle}>
          <p className="text-[12.5px] text-[#333333] leading-[1.5]">
            {card.conditionBody}
          </p>
        </NoteBox>
      </div>
    </div>
  );
}
