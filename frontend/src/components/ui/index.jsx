import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../utils/cn";
import {
  AlertTriangle,
  Check,
  ChevronRight,
  Copy,
  Info,
  Loader2,
  X,
} from "lucide-react";

/* -------------------------------- Buttons -------------------------------- */

const variants = {
  primary: "bg-[#0052FF] text-white hover:bg-[#0046DC] active:bg-[#0046DC] shadow-[0_1px_2px_rgba(0,82,255,0.18)]",
  secondary: "bg-[#EAF1FF] text-[#0052FF] hover:bg-[#DFE9FF]",
  outline: "bg-white text-[#0B1524] border border-[#E6EAF0] hover:bg-[#F4F6FA]",
  ghost: "bg-transparent text-[#5B6474] hover:bg-[#F4F6FA] hover:text-[#0B1524]",
  danger: "bg-[#D92D20] text-white hover:bg-[#BB271C]",
};

const sizes = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-10 px-4 text-[14px]",
  lg: "h-12 px-5 text-[15px]",
};

export function Button({
  variant = "primary",
  size = "md",
  pill,
  loading,
  full,
  icon,
  iconRight,
  className,
  children,
  disabled,
  ...rest
}) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 select-none cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8DAFF] focus-visible:ring-offset-1",
        "disabled:opacity-45 disabled:pointer-events-none",
        pill ? "rounded-full" : "rounded-[10px]",
        variants[variant],
        sizes[size],
        full && "w-full",
        className
      )}
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : icon}
      {children}
      {iconRight}
    </button>
  );
}

export function IconButton({ label, className, children, ...rest }) {
  return (
    <button
      {...rest}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full border border-[#E6EAF0] bg-white text-[#5B6474]",
        "transition-colors duration-150 hover:text-[#0B1524] hover:border-[#D8DEE8] cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
}

/* ---------------------------------- Cards --------------------------------- */

export function Card({ className, children, padded = true, ...rest }) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-[14px] border border-[#E6EAF0] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]",
        padded && "p-5",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className }) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div>
        <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-[#0B1524]">{title}</h3>
        {subtitle && <p className="mt-0.5 text-[13px] text-[#5B6474]">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/* --------------------------------- Badges --------------------------------- */

const tones = {
  neutral: "bg-[#F4F6FA] text-[#5B6474]",
  positive: "bg-[#DCFAE6] text-[#067647]",
  brand: "bg-[#EAF1FF] text-[#0052FF]",
  warning: "bg-[#FEF3E0] text-[#B54708]",
  negative: "bg-[#FDECEA] text-[#D92D20]",
};

export function Badge({ tone = "neutral", dot, className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-[3px] text-[12px] font-medium",
        tones[tone],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            tone === "positive" && "bg-[#17B26A]",
            tone === "neutral" && "bg-[#98A2B3]",
            tone === "brand" && "bg-[#0052FF]",
            tone === "warning" && "bg-[#F5A623]",
            tone === "negative" && "bg-[#D92D20]"
          )}
        />
      )}
      {children}
    </span>
  );
}

export function StatusDot({ tone = "positive" }) {
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full",
        tone === "positive" && "bg-[#17B26A]",
        tone === "neutral" && "bg-[#98A2B3]",
        tone === "warning" && "bg-[#F5A623]"
      )}
    />
  );
}

export function ProgressBar({ value, className, height = 8 }) {
  return (
    <div
      style={{ height }}
      className={cn("w-full overflow-hidden rounded-full bg-[#EEF1F6]", className)}
    >
      <div
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        className="h-full rounded-full bg-[#0052FF] transition-[width] duration-500 ease-out"
      />
    </div>
  );
}

export function WalletAddress({ address, className, short = true, onCopy }) {
  const [copied, setCopied] = useState(false);
  const display = short ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(address);
        setCopied(true);
        onCopy?.();
        setTimeout(() => setCopied(false), 1400);
      }}
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[12.5px] text-[#5B6474] transition-colors duration-150 hover:text-[#0B1524] cursor-pointer",
        className
      )}
    >
      <span>{display}</span>
      {copied ? <Check size={13} className="text-[#067647]" /> : <Copy size={13} />}
    </button>
  );
}

export function Modal({ open, onClose, title, subtitle, children, footer, width = 560 }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-6">
      <div className="animate-fade absolute inset-0 bg-[#0B1524]/30 backdrop-blur-xs" onClick={onClose} />
      <div
        style={{ width }}
        className="animate-fade-up relative max-h-[88vh] w-full overflow-hidden rounded-[16px] border border-[#E6EAF0] bg-white shadow-[0_24px_48px_-12px_rgba(16,24,40,0.18)] flex flex-col"
      >
        <header className="flex items-start justify-between gap-4 px-6 pb-4 pt-5 border-b border-[#EEF1F6]">
          <div>
            <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-[#0B1524]">{title}</h2>
            {subtitle && <p className="mt-0.5 text-[13px] text-[#5B6474]">{subtitle}</p>}
          </div>
          <IconButton label="Close" onClick={onClose}>
            <X size={16} />
          </IconButton>
        </header>
        <div className="max-h-[65vh] overflow-y-auto px-6 py-5 flex-1">{children}</div>
        {footer && <div className="border-t border-[#E6EAF0] bg-[#F8FAFD] px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}
