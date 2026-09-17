import React from "react";

export function AccentDash({ className = "" }) {
  return (
    <span
      className={`inline-block w-6 h-[2px] bg-[#7F8F63] rounded-full shrink-0 ${className}`}
    />
  );
}

export function IndexPill({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#EAEAE5] text-[#555555] font-mono text-[10.5px] font-semibold tracking-wider self-start ${className}`}
    >
      {children}
    </span>
  );
}

export function NetworkIcon({ className = "w-3 h-3" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="4" cy="4" r="2.2" fill="#7F8F63" />
      <circle cx="12" cy="4" r="2.2" fill="#7F8F63" />
      <circle cx="8" cy="12" r="2.2" fill="#7F8F63" />
      <path
        d="M4 4L8 12M12 4L8 12"
        stroke="#7F8F63"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function NoteBox({ headerText, children, className = "" }) {
  return (
    <div
      className={`rounded-[10px] border border-[#E6E6DF] bg-[#FBFBFA] p-4 ${className}`}
    >
      <div className="flex items-center gap-2 text-[#747474] font-mono text-[10px] tracking-[0.15em] uppercase font-medium mb-2.5">
        <NetworkIcon className="w-3.5 h-3.5" />
        <span>{headerText}</span>
      </div>
      {children}
    </div>
  );
}
