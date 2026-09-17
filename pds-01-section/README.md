# PDS-01 — Signal, Rule & Execution Component

A production-ready React 19 + Tailwind CSS v4 + SVG implementation of the **PDS-01 (Perpetual Dislocation Snapback)** strategy specification, recreated with institutional precision from the design specifications.

## Architecture

`
pds-01-section/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx                     # React entry point
│   ├── App.jsx                      # Section assembly & layout grid
│   ├── index.css                    # Tailwind CSS v4 & Geist font imports
│   ├── data/
│   │   └── strategy.js              # Strategy parameters, copy & chart series data
│   ├── lib/
│   │   └── curve.js                 # Catmull-Rom spline to cubic Bézier path builder
│   └── components/
│       ├── Navbar.jsx               # Institutional top navigation
│       ├── SectionHeader.jsx        # Eyebrow, 47px headline & editorial description
│       ├── SignalCard.jsx           # Column 01: The Signal & Dislocation Condition
│       ├── RuleTable.jsx            # Column 02: The Rule (+10.82 bps, +4.96 bps, etc.)
│       ├── ExecutionCard.jsx        # Column 03: The Execution & Maker Notes
│       ├── DislocationChart.jsx     # Handcrafted SVG visualization of basis snapback
│       ├── ChartLegend.jsx          # Institutional legend & narrative caption
│       └── primitives.jsx           # AccentDash, IndexPill, NoteBox, NetworkIcon
└── dist/                            # Production build bundle
`

## Design System & Tokens
- **Palette**: Warm Ivory (#F7F7F4), Pure Ink (#111111), Muted Charcoal (#747474), Subtle Hairline (#E5E5DE), Institutional Olive (#7F8F63), Chart Reference Slate (#596067).
- **Typography**: Geist Sans for primary editorial copy; Geist Mono for labels, tickers, metrics, and axis notations.
- **Chart**: Pure SVG math using Catmull-Rom splines converted to cubic Béziers (^1$ continuity), with exact analytical marker positioning.

## Getting Started

`ash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Create production build
npm run build

# Preview production build
npm run preview
`
