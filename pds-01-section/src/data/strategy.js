export const STRATEGY_DATA = {
  nav: {
    brand: "PDS-01",
    links: [
      { label: "Strategy", href: "#strategy", id: "strategy" },
      { label: "Mechanism", href: "#mechanism", id: "mechanism" },
      { label: "Anatomy", href: "#anatomy", id: "anatomy" },
      { label: "Portfolio", href: "#portfolio", id: "portfolio" }
    ]
  },
  hero: {
    title: "PDS-01",
    subtitle: "Perpetual Dislocation Snapback",
    description: "A systematic strategy designed to capture temporary dislocations between Bitget perpetuals and their spot reference.",
    stats: [
      { value: "+1.41 bps", label: "Net Expectancy" },
      { value: "+1.38", label: "Annualized Sharpe" },
      { value: "19", label: "Audited Trades" }
    ],
    ctaPrimary: "View Strategy",
    ctaSecondary: "GitHub"
  },
  sectionHeader: {
    eyebrow: "THE SIGNAL, RULE & EXECUTION",
    title: "The edge is in the details.",
    description: "PDS-01 exploits temporary dislocations between Bitget perpetuals and their spot reference — with a clearly defined entry, exit and execution process."
  },
  cards: {
    signal: {
      index: "01",
      title: "The Signal",
      description: "Perpetual trades at an unusually large premium to its spot reference.",
      conditionTitle: "DISLOCATION CONDITION",
      conditionBody: "Perpetual premium > threshold vs. spot reference."
    },
    rule: {
      index: "02",
      title: "The Rule",
      items: [
        { label: "Entry", value: "+10.82 bps" },
        { label: "Target", value: "+4.96 bps" },
        { label: "Hard Stop", value: "+15.0 bps offset" },
        { label: "Timeout", value: "8 hours" }
      ]
    },
    execution: {
      index: "03",
      title: "The Execution",
      description: "Passive maker execution with explicit friction assumptions.",
      notesTitle: "EXECUTION NOTES",
      notes: [
        "Passive maker orders (no taker fees)",
        "Explicit trading & funding cost assumptions",
        "Slippage modelled in backtest"
      ]
    }
  },
  chart: {
    badgeLeft: "PRICE DISLOCATION & SNAPBACK",
    badgeRight: "PDS-01 EXAMPLE",
    yAxisLevels: [
      { label: "104.0", y: 60 },
      { label: "102.0", y: 120 },
      { label: "100.0", y: 180 },
      { label: "98.0", y: 240 }
    ],
    timeLabels: [
      { label: "T0", x: 70 },
      { label: "T1", x: 165 },
      { label: "T2", x: 260 },
      { label: "T3", x: 355 },
      { label: "T4", x: 450 },
      { label: "T5", x: 545 },
      { label: "T6", x: 640 },
      { label: "T7", x: 735 },
      { label: "T8", x: 830 }
    ],
    entryMarker: {
      x: 260,
      y: 128,
      label: "ENTRY",
      value: "+10.82 bps"
    },
    targetMarker: {
      x: 775,
      y: 200,
      label: "TARGET",
      value: "+4.96 bps"
    },
    legend: {
      items: [
        {
          label: "Perpetual Price",
          sublabel: "(trading price)",
          type: "line",
          color: "#7F8F63"
        },
        {
          label: "Spot Reference",
          sublabel: "(reference price)",
          type: "line",
          color: "#596067"
        },
        {
          label: "Dislocation (premium)",
          sublabel: null,
          type: "area",
          color: "rgba(127, 143, 99, 0.22)"
        }
      ],
      footnote: "The perpetual trades at a significant premium, then converges back to the reference price."
    }
  },
  mechanism: {
    eyebrow: "THE MECHANISM",
    title: "From dislocation to snapback.",
    description: "A simple, repeatable process. The strategy looks for temporary inefficiencies, enters with discipline, and captures the reversion.",
    steps: [
      {
        index: "01",
        title: "Detect",
        description: "Identify when the perpetual trades at an unusually large premium to its spot reference."
      },
      {
        index: "02",
        title: "Enter",
        description: "Execute at the defined entry threshold with passive maker orders, incorporating friction assumptions."
      },
      {
        index: "03",
        title: "Converge",
        description: "Capture the snapback as the perpetual price returns to its spot reference."
      }
    ]
  },
  anatomy: {
    eyebrow: "TRADE ANATOMY",
    title: "Trade Anatomy",
    description: "A clear view of the key levels and relationships that drive the strategy.",
    legend: [
      { label: "Spot Reference", sublabel: "(reference price)", type: "line", color: "#596067" },
      { label: "Perpetual Price", sublabel: "(trading price)", type: "line", color: "#7F8F63" },
      { label: "Entry", sublabel: "(+10.82 bps)", type: "dot", color: "#7F8F63" },
      { label: "Target", sublabel: "(+4.96 bps)", type: "dashed", color: "#7F8F63" },
      { label: "Stop", sublabel: "(+15.0 bps offset)", type: "dashed", color: "#E06A6A" }
    ],
    levels: [
      { label: "106.0", y: 40 },
      { label: "104.0", y: 90 },
      { label: "102.0", y: 140 },
      { label: "100.0", y: 190 },
      { label: "98.0", y: 240 }
    ],
    timeLabels: ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"]
  }
};
