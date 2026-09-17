import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { MarketTickerStrip } from "./components/MarketTickerStrip";
import { OpportunityCard } from "./components/OpportunityCard";
import { EvidenceModal } from "./components/EvidenceModal";
import { AuditLedgerModal } from "./components/AuditLedgerModal";

const API_BASE = "http://127.0.0.1:8000/api";

export default function App() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [reviewCard, setReviewCard] = useState(null);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [auditLog, setAuditLog] = useState([]);

  // Fetch opportunities from FastAPI backend
  const fetchOpportunities = async () => {
    try {
      const res = await fetch(`${API_BASE}/opportunities`);
      if (res.ok) {
        const data = await res.json();
        setOpportunities(data);
      }
    } catch (e) {
      console.warn("Using fallback opportunities as backend connects...");
    } finally {
      setLoading(false);
      setScanning(false);
    }
  };

  const fetchAuditLog = async () => {
    try {
      const res = await fetch(`${API_BASE}/audit-log`);
      if (res.ok) {
        const data = await res.json();
        setAuditLog(data.history || []);
      }
    } catch (e) {
      // quiet
    }
  };

  useEffect(() => {
    fetchOpportunities();
    fetchAuditLog();
    const interval = setInterval(() => {
      fetchOpportunities();
      fetchAuditLog();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleRescan = async () => {
    setScanning(true);
    try {
      await fetch(`${API_BASE}/scan`, { method: "POST" });
      await fetchOpportunities();
    } catch (e) {
      setScanning(false);
    }
  };

  const handleAuthorize = async (oppId, sizeUsd, notes) => {
    try {
      const res = await fetch(`${API_BASE}/opportunities/${oppId}/decision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opportunity_id: oppId,
          action: "AUTHORIZE",
          adjusted_size_usd: sizeUsd,
          trader_notes: notes
        })
      });
      if (res.ok) {
        setReviewCard(null);
        await fetchOpportunities();
        await fetchAuditLog();
      }
    } catch (e) {
      alert("Error submitting authorization");
    }
  };

  const handleReject = async (oppId, notes) => {
    try {
      const res = await fetch(`${API_BASE}/opportunities/${oppId}/decision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opportunity_id: oppId,
          action: "REJECT",
          trader_notes: notes
        })
      });
      if (res.ok) {
        setReviewCard(null);
        await fetchOpportunities();
        await fetchAuditLog();
      }
    } catch (e) {
      alert("Error submitting rejection");
    }
  };

  const filteredOpps = opportunities.filter((o) => {
    if (selectedCategory === "ALL") return true;
    if (selectedCategory === "PDS") return o.strategy_type === "PDS_DISLOCATION";
    if (selectedCategory === "CRYPTO") return o.strategy_type !== "PDS_DISLOCATION";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#ECECEC]">
      {/* Top Sticky Header */}
      <Navbar
        onRescan={handleRescan}
        onOpenAudit={() => setIsAuditOpen(true)}
        auditCount={auditLog.length}
        scanning={scanning}
      />

      {/* Real-time Ticker & Radar Telemetry Bar */}
      <MarketTickerStrip />

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Desk Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#1E2229]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#10B981] font-semibold">
                INTELLIGENCE DISCOVERY FEED
              </span>
            </div>
            <h1 className="text-[32px] sm:text-[38px] font-bold text-white tracking-tight">
              Trade Decision Desk
            </h1>
            <p className="text-[14px] text-[#8E96A5] mt-1 max-w-2xl leading-relaxed">
              Autonomous multi-source research engine identifying high-conviction dislocations on Bitget. 
              The AI produces the evidence-backed decision; the human trader retains final execution authority.
            </p>
          </div>

          {/* Strategy Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-[8px] bg-[#12151B] border border-[#1E2229] font-mono text-[11.5px] self-start md:self-auto">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-3 py-1.5 rounded-[6px] transition-all cursor-pointer ${
                selectedCategory === "ALL"
                  ? "bg-[#232832] text-white font-bold shadow-sm"
                  : "text-[#8E96A5] hover:text-white"
              }`}
            >
              All Signals ({opportunities.length})
            </button>
            <button
              onClick={() => setSelectedCategory("PDS")}
              className={`px-3 py-1.5 rounded-[6px] transition-all cursor-pointer ${
                selectedCategory === "PDS"
                  ? "bg-[#7F8F63]/30 text-[#C1D49D] font-bold border border-[#7F8F63]/40 shadow-sm"
                  : "text-[#8E96A5] hover:text-white"
              }`}
            >
              PDS Dislocation ({opportunities.filter(o => o.strategy_type === 'PDS_DISLOCATION').length})
            </button>
            <button
              onClick={() => setSelectedCategory("CRYPTO")}
              className={`px-3 py-1.5 rounded-[6px] transition-all cursor-pointer ${
                selectedCategory === "CRYPTO"
                  ? "bg-[#232832] text-white font-bold shadow-sm"
                  : "text-[#8E96A5] hover:text-white"
              }`}
            >
              Crypto Perps ({opportunities.filter(o => o.strategy_type !== 'PDS_DISLOCATION').length})
            </button>
          </div>
        </div>

        {/* Opportunity Cards Grid (The Star of the Show) */}
        {loading ? (
          <div className="py-20 text-center text-[#6B7280] font-mono">
            Scanning Bitget markets for live opportunities...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredOpps.map((card) => (
              <OpportunityCard
                key={card.id}
                card={card}
                onReview={(c) => setReviewCard(c)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Review Trade Evidence Modal (Signal -> Evidence -> Risk -> Decision) */}
      {reviewCard && (
        <EvidenceModal
          card={reviewCard}
          onClose={() => setReviewCard(null)}
          onAuthorize={handleAuthorize}
          onReject={handleReject}
        />
      )}

      {/* Trader Decision Audit Ledger Modal */}
      <AuditLedgerModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        auditLog={auditLog}
      />
    </div>
  );
}
