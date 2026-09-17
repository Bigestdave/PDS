import React from "react";
import { IndexPill, NoteBox } from "./primitives";

export function ExecutionCard({ card }) {
  return (
    <div className="flex flex-col justify-between h-full px-0 md:px-6 lg:px-8 border-t md:border-t-0 md:border-l border-[#E5E5DE] pt-8 md:pt-0">
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
        <NoteBox headerText={card.notesTitle}>
          <ul className="space-y-1.5 text-[12px] text-[#444444] leading-[1.45]">
            {card.notes.map((note, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#7F8F63] font-bold select-none">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </NoteBox>
      </div>
    </div>
  );
}
