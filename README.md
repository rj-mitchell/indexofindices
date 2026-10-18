# Global Quality of Life Observatory 🌍

An interactive, user-weighted global quality-of-life mapping platform and analytical observatory.

Built with **React 18**, **TypeScript**, **Tailwind CSS**, and **react-simple-maps** (D3-Geo + TopoJSON 50m resolution), featuring client-side 60fps dynamic scoring, side-out country dossiers, divergence storytelling, and head-to-head country comparison.

---

## 🌟 Key Features

1. **Clean Civic Light Aesthetic**:
   - Designed in an editorial publication style inspired by *Our World in Data* and *The Economist*.
   - Clear typography, high-contrast accessible data tables, and an intuitive emerald-to-rose color scale.

2. **Higher-Level Aggregated View with Granular Dials**:
   - By default, users dial higher-level macro dimensions:
     - 🛡️ **Safety & Peace** (Violent crime, Global Peace Index, Terrorism, Road traffic deaths)
     - 🏛️ **Governance & Rule of Law** (Anti-Corruption CPI, Rule of Law WGI, Gov effectiveness)
     - 📈 **Economy & Business** (Business readiness, Economic complexity, Purchasing power, GDP PPP)
     - 🫀 **Health & Well-being** (Healthy lifespan HALE, Universal Health Coverage)
     - ⚖️ **Civil Liberties & Rights** (Press Freedom RSF, Liberal Democracy V-Dem)
     - 💻 **Infrastructure & Tech** (Broadband speeds Ookla, Logistics LPI, Internet penetration)
     - ☀️ **Climate & Environment** (Climate Comfort ~24°C, Sun & Low Rain, Air Quality PM2.5, Clean Water)
   - Toggle on **"Fine-Tune Sub-Indices"** to adjust any of the 18 specific datasets independently.

3. **At-a-Glance Strengths & Deficits (Hover & Click)**:
   - Hovering over any nation immediately displays its current rank, composite score, and direct references to indices it excels at or lags behind (e.g. *Israel: High-Tech Complexity 88/100 vs. Global Peace Index 12/100*).
   - Clicking opens the full **Country Dossier Sheet** with deep divergence storytelling, benchmark comparisons, and verified raw metrics (homicide rates, broadband Mbps, sunshine hours, rainfall mm).

4. **Head-to-Head Country Comparison**:
   - Compare any two countries side-by-side with automatic winner calculations, comparative macro dimension bars, and an indicator-by-indicator scorecard.

5. **Climate Modeling for Ideal Living Preferences**:
   - Explicitly models climate comfort:
     - Proximity to ~24°C average temperature
     - High annual sunshine hours (2,800+ hrs/yr)
     - Low to moderate annual precipitation (penalizing heavy monsoon rains and excessive humidity)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Running the Application

```bash
# Install dependencies (if not already installed)
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

To run a production preview:
```bash
npm run build
npm run preview
```

---

## 📊 Data Architecture

- `src/data/countries.json`: Complete profile for 236 countries and sovereign territories, keyed by ISO-3 alpha code.
- `src/data/indicators.json`: Complete taxonomy of all 18 indicators with source citations, units, polarity inversion flags, and methodology tiers (Tier 1 Empirical, Tier 2 Normative, Tier 3 Expert/Perception).
- `src/data/categories.json`: Specification of the 7 macro dimensions.
- `scripts/generate_dataset.py`: Python generator script to refresh, harmonize, and normalize new indicators.
