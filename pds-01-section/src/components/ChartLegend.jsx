import React from "react";

export function ChartLegend({ legend }) {
  return (
    <div className="flex flex-col justify-center h-full space-y-6 lg:py-4">
      <div className="space-y-4">
        {legend.items.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            {item.type === "line" ? (
              <div
                className="w-5 h-[2px] mt-2 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            ) : (
              <div
                className="w-5 h-3 mt-1 shrink-0 rounded-[3px] border border-[#7F8F63]/30"
                style={{ backgroundColor: item.color }}
              />
            )}
            <div className="flex flex-col">
              <span className="text-[12.5px] font-medium text-[#111111] leading-tight">
                {item.label}
              </span>
              {item.sublabel && (
                <span className="text-[11px] text-[#747474] leading-tight mt-0.5">
                  {item.sublabel}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[#EAEAE5]">
        <p className="text-[11.5px] leading-[1.55] text-[#747474]">
          {legend.footnote}
        </p>
      </div>
    </div>
  );
}
