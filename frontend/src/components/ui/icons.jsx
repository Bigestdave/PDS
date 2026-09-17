import React from "react";
import { cn } from "../../utils/cn";

export function ReopenLogo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#0B1524" />
      <path
        d="M16 7.5 23 11.5v9L16 24.5 9 20.5v-9L16 7.5Z"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M16 7.5v17M9 11.5l14 9M23 11.5l-14 9" stroke="#fff" strokeWidth="1.2" opacity=".55" />
      <circle cx="16" cy="16" r="2.6" fill="#0052FF" />
    </svg>
  );
}

export function BitgetLogo({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#00F0FF" fillOpacity="0.18" />
      <path d="M12 4.5L5 8.5v7l7 4 7-4v-7l-7-4z" fill="#00F0FF" />
      <path d="M12 7.5L7.5 10v4l4.5 2.5 4.5-2.5v-4L12 7.5z" fill="#0B1524" />
    </svg>
  );
}

const Circle = ({ bg, size, children, className }) => (
  <span
    style={{ width: size, height: size, background: bg }}
    className={cn("grid shrink-0 place-items-center rounded-full text-white font-bold select-none", className)}
  >
    {children}
  </span>
);

export function AssetIcon({ symbol, size = 32 }) {
  const sym = (symbol || "").toUpperCase();
  const inner = Math.round(size * 0.58);

  if (sym.includes("BTC")) {
    return (
      <Circle bg="#F7931A" size={size}>
        <span style={{ fontSize: size * 0.5 }} className="leading-none">₿</span>
      </Circle>
    );
  }
  if (sym.includes("ETH")) {
    return (
      <Circle bg="#6B7FE3" size={size}>
        <svg width={inner} height={inner} viewBox="0 0 24 24" fill="none">
          <path d="M12 2 5.5 12.4 12 16.2l6.5-3.8L12 2Z" fill="#fff" fillOpacity=".92" />
          <path d="M12 17.6 5.5 13.8 12 22l6.5-8.2-6.5 3.8Z" fill="#fff" fillOpacity=".7" />
        </svg>
      </Circle>
    );
  }
  if (sym.includes("SOL")) {
    return (
      <Circle bg="#0B1120" size={size}>
        <svg width={inner} height={inner} viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id={`sol-${size}`} x1="0" y1="0" x2="24" y2="24">
              <stop stopColor="#19FB9B" />
              <stop offset="1" stopColor="#9945FF" />
            </linearGradient>
          </defs>
          <path d="M6 8.2h11.4L15 5.6H3.6L6 8.2Z" fill={`url(#sol-${size})`} />
          <path d="M6 13.3h11.4L15 10.7H3.6L6 13.3Z" fill={`url(#sol-${size})`} />
          <path d="M6 18.4h11.4L15 15.8H3.6L6 18.4Z" fill={`url(#sol-${size})`} />
        </svg>
      </Circle>
    );
  }
  if (sym.includes("BNB")) {
    return (
      <Circle bg="#F3BA2F" size={size}>
        <svg width={inner} height={inner} viewBox="0 0 24 24" fill="none">
          <path d="M12 3l3 3-5 5-3-3 5-5zM6 9l3 3-3 3-3-3 3-3zM18 9l3 3-3 3-3-3 3-3zM12 15l3 3-3 3-3-3 3-3z" fill="#fff" />
        </svg>
      </Circle>
    );
  }
  if (sym.includes("XRP")) {
    return (
      <Circle bg="#000000" size={size}>
        <svg width={inner} height={inner} viewBox="0 0 24 24" fill="none">
          <path d="M4 6h3.2L12 10.8 16.8 6H20l-6.4 6.4L20 18.8h-3.2L12 14 7.2 18.8H4l6.4-6.4L4 6z" fill="#fff" />
        </svg>
      </Circle>
    );
  }
  if (sym.includes("DOGE")) {
    return (
      <Circle bg="#C2A633" size={size}>
        <span style={{ fontSize: size * 0.48 }} className="leading-none">Ð</span>
      </Circle>
    );
  }
  if (sym.includes("ADA")) {
    return (
      <Circle bg="#0033AD" size={size}>
        <span style={{ fontSize: size * 0.45 }} className="leading-none">₳</span>
      </Circle>
    );
  }
  if (sym.includes("SPY")) {
    return (
      <Circle bg="#098551" size={size}>
        <span style={{ fontSize: size * 0.45 }} className="leading-none">S</span>
      </Circle>
    );
  }
  return (
    <Circle bg="#E6EAF0" size={size} className="text-muted">
      <span style={{ fontSize: size * 0.42 }}>{sym.slice(0, 1) || "T"}</span>
    </Circle>
  );
}
