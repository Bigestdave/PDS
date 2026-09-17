import React, { useState, useEffect } from "react";
import { AppShell } from "./components/layout/AppShell";
import { OpportunityView } from "./features/home/OpportunityView";
import { MarketScannerView } from "./features/scanner/MarketScannerView";
import { ResearchProgressView } from "./features/research/ResearchProgressView";
import { TradeDecisionView } from "./features/research/TradeDecisionView";
import { PositionsView } from "./features/positions/PositionsView";
import { HistoryView } from "./features/history/HistoryView";
import { SettingsView } from "./features/settings/SettingsView";
import { PostTradeReviewModal } from "./components/PostTradeReviewModal";

const API_BASE = "http://127.0.0.1:8000/api";

export default function App() {
  const [route, setRoute] = useState("home");
  const [opportunities, setOpportunities] = useState([]);
  const [auditLog, setAuditLog] = useState([]);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // Fetch opportunities from FastAPI backend
  const fetchOpportunities = async () => {
    try {
      const res = await fetch(`${API_BASE}/opportunities`);
      if (res.ok) {
        const data = await res.json();
        setOpportunities(data);
      }
    } catch (e) {
      // quiet fallback
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
      // quiet fallback
    }
  };

  useEffect(() => {
    fetchOpportunities();
    fetchAuditLog();
    const timer = setInterval(() => {
      fetchOpportunities();
      fetchAuditLog();
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const handleAuthorize = async (oppId) => {
    try {
      await fetch(`${API_BASE}/opportunities/${oppId}/decision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opportunity_id: oppId,
          action: "AUTHORIZE",
          adjusted_size_usd: "$4,500",
          trader_notes: "Authorized via REOPEN Decision Gate."
        })
      });
      await fetchAuditLog();
    } catch (e) {
      // quiet fallback
    }
  };

  const handleReject = async (oppId) => {
    try {
      await fetch(`${API_BASE}/opportunities/${oppId}/decision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opportunity_id: oppId,
          action: "REJECT",
          trader_notes: "Trader rejected proposal."
        })
      });
      await fetchAuditLog();
    } catch (e) {
      // quiet fallback
    }
  };

  // Render view corresponding to route
  const renderView = () => {
    switch (route) {
      case "home":
        return (
          <OpportunityView
            onNavigate={setRoute}
            onAuthorize={handleAuthorize}
            onReject={handleReject}
          />
        );
      case "scanner":
        return <MarketScannerView onNavigate={setRoute} />;
      case "research":
      case "research-progress":
        return <ResearchProgressView onNavigate={setRoute} />;
      case "trade-decision":
        return (
          <TradeDecisionView
            onNavigate={setRoute}
            onAuthorize={handleAuthorize}
            onReject={handleReject}
          />
        );
      case "positions":
        return <PositionsView onNavigate={setRoute} />;
      case "history":
        return <HistoryView auditLog={auditLog} onOpenReview={() => setIsReviewOpen(true)} />;
      case "settings":
        return <SettingsView />;
      default:
        return (
          <OpportunityView
            onNavigate={setRoute}
            onAuthorize={handleAuthorize}
            onReject={handleReject}
          />
        );
    }
  };

  return (
    <AppShell activeRoute={route} onNavigate={setRoute}>
      <div key={route} className="animate-fade">
        {renderView()}
      </div>

      {/* Post Trade Review Modal */}
      {isReviewOpen && (
        <PostTradeReviewModal onClose={() => setIsReviewOpen(false)} />
      )}
    </AppShell>
  );
}
