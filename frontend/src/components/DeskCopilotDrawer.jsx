import React, { useState } from "react";

export function DeskCopilotDrawer({ isOpen, onClose, onSelectOpportunity }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Welcome to the Bitget AI Trading Desk. I am monitoring live feeds across Bitget Perps and Reality Tokens. How can I assist your trade research today?",
      citations: [],
      action: null,
      timestamp: "Ready"
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    "Find me opportunities similar to PDS-01",
    "Stress test: What happens if BTC drops 5%?",
    "What is our portfolio risk exposure?",
    "Explain the RSPYUSDT reality token anchor"
  ];

  const handleSend = async (queryText) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    // Add user message
    const userMsg = { role: "user", content: q, timestamp: "Just now" };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/copilot/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.answer,
            citations: data.citations || [],
            action: data.suggested_action,
            timestamp: data.timestamp
          }
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Failed to reach intelligence backend. Please verify FastAPI is running on port 8000.",
          citations: [],
          timestamp: "Error"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-[480px] bg-[#101318] border-l border-[#1F242E] shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col justify-between">
      {/* Header */}
      <div className="p-5 bg-[#0C0E12] border-b border-[#1C2028] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <h3 className="font-mono text-[14px] font-bold text-white tracking-wide uppercase">
            AI Desk Analyst Copilot
          </h3>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full border border-[#232730] flex items-center justify-center text-[#8E96A5] hover:text-white cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Quick Prompt Pills */}
      <div className="p-4 bg-[#0E1116] border-b border-[#1A1E26] overflow-x-auto whitespace-nowrap space-x-2">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            className="inline-block px-3 py-1 rounded-[6px] bg-[#171B22] hover:bg-[#202530] text-[#A1A7B5] hover:text-white font-mono text-[11px] border border-[#252B37] transition-colors cursor-pointer"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              m.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[92%] p-4 rounded-[12px] text-[13px] leading-relaxed ${
                m.role === "user"
                  ? "bg-[#1E232D] text-white font-medium rounded-tr-none"
                  : "bg-[#14171E] border border-[#202530] text-[#D1D5DB] rounded-tl-none space-y-3"
              }`}
            >
              <div className="whitespace-pre-line font-sans">{m.content}</div>

              {/* Citations / Data telemetry badges */}
              {m.citations && m.citations.length > 0 && (
                <div className="pt-2 border-t border-[#202530]/80 flex flex-wrap gap-1.5 font-mono text-[10.5px]">
                  <span className="text-[#6B7280] select-none">Live Data:</span>
                  {m.citations.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-[4px] bg-[#1A1F29] border border-[#272E3D] text-[#8E96A5]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Button */}
              {m.action && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (m.action.opportunity_id && onSelectOpportunity) {
                        onSelectOpportunity(m.action.opportunity_id);
                        onClose();
                      }
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-[#10B981] hover:bg-[#0EA271] text-[#0B0C0E] font-mono text-[11.5px] font-bold cursor-pointer transition-transform hover:scale-[1.02]"
                  >
                    <span>{m.action.label}</span>
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>
            <span className="text-[10px] font-mono text-[#555C6B] mt-1 px-1">
              {m.timestamp}
            </span>
          </div>
        ))}
        {loading && (
          <div className="text-[12px] font-mono text-[#10B981] animate-pulse">
            Analyzing telemetry & calculating scenarios...
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-4 bg-[#0C0E12] border-t border-[#1C2028]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder="Ask the desk analyst..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 px-3.5 py-2 rounded-[8px] bg-[#161920] border border-[#242935] text-white font-mono text-[13px] focus:outline-none focus:border-[#10B981]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-[8px] bg-[#10B981] hover:bg-[#0EA271] text-[#0B0C0E] font-mono text-[12.5px] font-bold cursor-pointer transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
