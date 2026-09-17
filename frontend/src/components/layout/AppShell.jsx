import React, { useState, useEffect } from "react";
import {
  Home,
  BarChart3,
  ScanSearch,
  Crosshair,
  Clock,
  Settings,
  Search,
  ChevronDown,
  Menu,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { ReopenLogo, BitgetLogo } from "../ui/icons";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "scanner", label: "Market Scanner", icon: BarChart3 },
  { id: "research", label: "Research", icon: ScanSearch },
  { id: "positions", label: "Positions", icon: Crosshair },
  { id: "history", label: "History", icon: Clock },
  { id: "settings", label: "Settings", icon: Settings },
];

export function AppShell({ activeRoute = "home", onNavigate, children }) {
  const [mobileNav, setMobileNav] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const h = String(d.getUTCHours()).padStart(2, "0");
      const m = String(d.getUTCMinutes()).padStart(2, "0");
      const s = String(d.getUTCSeconds()).padStart(2, "0");
      setCurrentTime(`${h}:${m}:${s} (UTC)`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText("0x8F3a2b7194e1d8824c2a");
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const SidebarContent = () => (
    <div className="basis-sidebar flex h-full w-[240px] shrink-0 flex-col border-r border-[#E6EAF0]">
      {/* Brand Header */}
      <div className="flex h-[72px] items-center gap-3 px-6 cursor-pointer" onClick={() => onNavigate?.("home")}>
        <ReopenLogo size={32} />
        <div>
          <div className="text-[17px] font-bold tracking-tight text-[#0B1524] leading-none">
            REOPEN
          </div>
          <div className="text-[11px] font-medium text-[#5B6474] tracking-wider uppercase mt-0.5">
            Risk Desk
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex flex-col gap-1 px-3 py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate?.(item.id);
                setMobileNav(false);
              }}
              className={cn(
                "flex h-11 w-full items-center gap-3 rounded-[10px] px-3 text-[14.5px] transition-colors duration-150 cursor-pointer text-left",
                isActive
                  ? "bg-[#EAF1FF] font-semibold text-[#0052FF]"
                  : "text-[#1B2637] hover:bg-[#EEF2F8]"
              )}
            >
              <Icon
                size={18}
                strokeWidth={isActive ? 2.2 : 1.8}
                className={isActive ? "text-[#0052FF]" : "text-[#5B6474]"}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Status */}
      <div className="mt-auto px-6 pb-6">
        <div className="border-t border-[#E6EAF0] pt-4 text-[12px] text-[#5B6474] space-y-1.5 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#17B26A]" />
            <span className="font-medium text-[#1B2637]">Bitget connected</span>
          </div>
          <div
            onClick={handleCopy}
            className="flex items-center justify-between text-[#5B6474] hover:text-[#0B1524] cursor-pointer pt-0.5"
            title="Click to copy wallet address"
          >
            <span>0x8F3a...4c2a</span>
            {copied ? <Check size={13} className="text-[#067647]" /> : <Copy size={13} />}
          </div>
          <div className="text-[11px] text-[#8B93A1]">Latency 24ms</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="basis-bg flex min-h-screen">
      {/* Desktop Persistent Sidebar */}
      <div className="sticky top-0 hidden h-screen lg:block">
        <SidebarContent />
      </div>

      {/* Mobile Nav Overlay */}
      {mobileNav && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="animate-fade absolute inset-0 bg-[#0B1524]/30" onClick={() => setMobileNav(false)} />
          <div className="animate-fade relative h-full">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content Pane */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* TopBar */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center gap-4 border-b border-[#E6EAF0] bg-white/90 px-6 backdrop-blur-md lg:px-8">
          <button
            onClick={() => setMobileNav(true)}
            className="grid h-9 w-9 place-items-center rounded-lg text-[#5B6474] hover:bg-[#F4F6FA] lg:hidden"
            aria-label="Open navigation"
          >
            <Menu size={18} />
          </button>

          {/* Search Input */}
          <div className="w-full max-w-[480px]">
            <div className="flex h-10 items-center gap-2.5 rounded-full bg-[#F1F4F9] px-4 transition-colors duration-150 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#C8DAFF]">
              <Search size={16} className="text-[#8B93A1]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search markets, signals, research..."
                className="h-full w-full bg-transparent text-[13.5px] text-[#0B1524] outline-none placeholder:text-[#98A1B0]"
              />
            </div>
          </div>

          {/* Top Right Live Telemetry & Profile */}
          <div className="ml-auto flex items-center gap-4 text-[13px] font-medium text-[#5B6474]">
            {/* LIVE dot */}
            <div className="hidden sm:flex items-center gap-1.5 text-[12.5px] font-semibold text-[#067647]">
              <span className="w-2 h-2 rounded-full bg-[#17B26A] animate-pulse" />
              <span>LIVE</span>
            </div>

            {/* Bitget connection */}
            <div className="hidden md:flex items-center gap-1.5 text-[12.5px]">
              <BitgetLogo size={16} />
              <span className="font-semibold text-[#0B1524]">Bitget</span>
              <span className="text-[#8B93A1]">Connected</span>
            </div>

            {/* Latency */}
            <div className="hidden lg:flex items-center text-[12px] text-[#8B93A1] font-mono">
              Latency <span className="text-[#17B26A] font-semibold ml-1">24ms</span>
            </div>

            {/* Clock */}
            <div className="hidden xl:flex items-center text-[12.5px] text-[#5B6474] font-mono">
              {currentTime || "14:32:17 (UTC)"}
            </div>

            {/* Account Selector */}
            <button className="hidden sm:flex items-center gap-1 text-[13px] text-[#0B1524] hover:text-[#0052FF] font-medium">
              <span>Pro Account</span>
              <ChevronDown size={14} className="text-[#8B93A1]" />
            </button>

            {/* User Avatar Circle */}
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[#0B1524] text-[13px] font-bold text-white shadow-xs">
              JD
            </div>
          </div>
        </header>

        {/* Main Routed Content */}
        <main className="min-w-0 flex-1 px-6 py-7 lg:px-8">
          <div className="mx-auto w-full max-w-[1320px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
