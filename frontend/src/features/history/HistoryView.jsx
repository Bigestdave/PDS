import React from "react";
import { Card, Badge, Button } from "../../components/ui";
import { Clock, Shield, CheckCircle2, XCircle } from "lucide-react";

export function HistoryView({ auditLog = [], onOpenReview }) {
  const sampleHistory = [
    {
      id: "DEC-8192",
      order_id: "BGT-5CD2D8B5",
      symbol: "BTCUSDT",
      direction: "SHORT",
      action: "AUTHORIZE",
      size: "$4,500",
      status: "EXECUTED",
      timestamp: "2026-09-17 16:48:12 UTC",
      notes: "Approved after verifying order book bid wall skew and funding rate elevation."
    },
    {
      id: "DEC-8191",
      order_id: "BGT-42F19E81",
      symbol: "SPYUSDT",
      direction: "SHORT",
      action: "AUTHORIZE",
      size: "$4,500",
      status: "EXECUTED",
      timestamp: "2026-09-17 15:15:20 UTC",
      notes: "PDS-01 perpetual basis dislocation triggered at +12.5 bps."
    },
    {
      id: "DEC-8190",
      order_id: "N/A",
      symbol: "SOLUSDT",
      direction: "LONG",
      action: "REJECT",
      size: "$3,000",
      status: "REJECTED",
      timestamp: "2026-09-17 14:02:11 UTC",
      notes: "Rejected due to upcoming macro FOMC volatility."
    }
  ];

  const displayLog = auditLog.length > 0 ? auditLog : sampleHistory;

  return (
    <div className="animate-fade-up space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[12px] font-bold tracking-wider text-[#5B6474] uppercase mb-1">
            DECISION AUDIT TRAIL
          </div>
          <h1 className="text-[28px] font-bold text-[#0B1524] tracking-tight">
            Execution History & Compliance Ledger
          </h1>
          <p className="text-[14px] text-[#5B6474] mt-0.5">
            Immutable log of all human authorizations, rejections, and Bitget order receipts.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={onOpenReview} className="gap-2">
          <span>📈</span>
          <span>Open Post-Trade Review</span>
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-3 bg-[#F8FAFD] border-b border-[#EEF1F6] text-[12px] font-semibold text-[#5B6474]">
          <div className="col-span-2">TIMESTAMP</div>
          <div className="col-span-2">MARKET</div>
          <div className="col-span-2">ACTION</div>
          <div className="col-span-2">SIZE / ID</div>
          <div className="col-span-4">TRADER RATIONALE</div>
        </div>

        <div className="divide-y divide-[#EEF1F6]">
          {displayLog.map((item, idx) => (
            <div key={idx} className="grid grid-cols-12 items-center px-6 py-4 text-[13px]">
              <div className="col-span-2 font-mono text-[11.5px] text-[#8B93A1]">
                {item.timestamp || "2026-09-17 16:48"}
              </div>

              <div className="col-span-2 font-bold text-[#0B1524]">
                {item.symbol || "BTCUSDT"}
              </div>

              <div className="col-span-2">
                <Badge
                  tone={item.action === "AUTHORIZE" ? "positive" : "negative"}
                  className="font-bold text-[11px]"
                >
                  {item.action || "AUTHORIZE"}
                </Badge>
              </div>

              <div className="col-span-2 font-mono text-[12px] text-[#0B1524]">
                <div>{item.adjusted_size_usd || item.size || "$4,500"}</div>
                <div className="text-[10.5px] text-[#0052FF]">{item.execution_receipt_id || item.order_id || "BGT-5CD2D8B5"}</div>
              </div>

              <div className="col-span-4 text-[12.5px] text-[#5B6474] pr-4">
                {item.trader_notes || item.notes || "Human trader authorized execution."}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
