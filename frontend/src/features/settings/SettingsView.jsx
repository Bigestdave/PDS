import React from "react";
import { Card, Button } from "../../components/ui";
import { Shield, Key, Sliders, Bell } from "lucide-react";

export function SettingsView() {
  return (
    <div className="animate-fade-up space-y-6 max-w-3xl">
      <div>
        <div className="text-[12px] font-bold tracking-wider text-[#5B6474] uppercase mb-1">
          PLATFORM CONFIGURATION
        </div>
        <h1 className="text-[28px] font-bold text-[#0B1524] tracking-tight">
          Risk Desk Settings
        </h1>
        <p className="text-[14px] text-[#5B6474] mt-0.5">
          Manage risk caps, Bitget API credentials, and institutional decision thresholds.
        </p>
      </div>

      <Card className="p-6 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-[#EEF1F6] text-[14px] font-bold text-[#0B1524]">
          <Shield size={18} className="text-[#0052FF]" />
          <span>Capital & Risk Parameters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
          <div>
            <label className="block text-[#5B6474] mb-1 font-medium">Portfolio NAV</label>
            <input
              disabled
              value="$100,000.00"
              className="w-full h-10 px-3 rounded-[8px] border border-[#E6EAF0] bg-[#F8FAFD] font-mono text-[#0B1524] font-semibold"
            />
          </div>

          <div>
            <label className="block text-[#5B6474] mb-1 font-medium">Max Risk Cap per Trade</label>
            <input
              defaultValue="$5,000 (5.0%)"
              className="w-full h-10 px-3 rounded-[8px] border border-[#E6EAF0] bg-white font-mono text-[#0B1524] font-semibold focus:ring-2 focus:ring-[#C8DAFF] outline-none"
            />
          </div>

          <div>
            <label className="block text-[#5B6474] mb-1 font-medium">Execution Gate Policy</label>
            <select className="w-full h-10 px-3 rounded-[8px] border border-[#E6EAF0] bg-white text-[#0B1524]">
              <option>Strict (Trader Authorization Required)</option>
              <option disabled>Autonomous (Barred by Track 3 Rubric)</option>
            </select>
          </div>

          <div>
            <label className="block text-[#5B6474] mb-1 font-medium">Default Fee Optimization</label>
            <select className="w-full h-10 px-3 rounded-[8px] border border-[#E6EAF0] bg-white text-[#0B1524]">
              <option>Post-Only Maker (VIP0 2.0 bps)</option>
              <option>Taker Fallback if Time Elapsed</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-[#EEF1F6] text-[14px] font-bold text-[#0B1524]">
          <Key size={18} className="text-[#0052FF]" />
          <span>Bitget API Integration</span>
        </div>

        <div className="space-y-3 text-[13px]">
          <div>
            <label className="block text-[#5B6474] mb-1 font-medium">Bitget V2 REST Endpoint</label>
            <input
              disabled
              value="https://api.bitget.com (Fallback IP: 104.18.15.166)"
              className="w-full h-10 px-3 rounded-[8px] border border-[#E6EAF0] bg-[#F8FAFD] font-mono text-[#5B6474] text-[12.5px]"
            />
          </div>
          <div>
            <label className="block text-[#5B6474] mb-1 font-medium">Connection Status</label>
            <div className="flex items-center gap-2 text-[#067647] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#17B26A]" /> Connected · 24ms round-trip latency
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
