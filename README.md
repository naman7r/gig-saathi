# GigSaathi (गिग साथी)

> An independent income shield and statutory rights co-pilot for India's platform delivery workers.

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-9%20Passed-emerald)](./scripts/runTests.js)
[![License](https://img.shields.io/badge/License-MIT-blue)](./LICENSE)

---

## Overview

Over 12 million app-based gig workers in India (Swiggy, Zomato, Zepto, Blinkit) operate in a structural black box:
- **Income Opacity**: Payout algorithms display gross figures, hiding fuel consumption, bike depreciation, and deadhead return mileage. Empirical studies (*IDinsight 2024*) show operating costs consume roughly **32% of gross earnings**, frequently dropping effective wages below statutory minimums.
- **Statutory Threshold Friction**: Under the **Central Rules (May 2026)** of India's Code on Social Security, workers qualify for social security after maintaining **90 days of engagement with one aggregator** or **120 days cumulatively across aggregators**. Workers currently have no multi-platform tool to verify their standing.
- **Grievance Resolution Failure**: Over 42% of platform workers report dispute processes as exhausting and time-consuming (*The Asia Foundation*), with 36% of wage disputes going unresolved due to lack of timestamped evidence and formal drafting tools.

**GigSaathi** is an independent, client-side co-pilot designed to give workers transparency, algorithmic fairness, and entitlement advocacy.

---

## Architectural Principles

```
                        ┌──────────────────────────────────────────────┐
                        │              GIGSAATHI CLIENT                │
                        │    (Dual View: Desktop Cockpit / Mobile)     │
                        └──────────────────────┬───────────────────────┘
                                               │
               ┌───────────────────────────────┴───────────────────────────────┐
               ▼                                                               ▼
   ┌───────────────────────┐                                       ┌───────────────────────┐
   │ DETERMINISTIC ENGINE  │                                       │     LANGUAGE & AI     │
   │  (Pure JS Arithmetic) │                                       │ (Multilingual Ground) │
   ├───────────────────────┤                                       ├───────────────────────┤
   │ • Net Pay Computation │                                       │ • Slip OCR Extraction │
   │ • Fuel Burn / Km Cost │                                       │ • Formal Appeal Draft │
   │ • 90/120 Day Counter  │                                       │ • Grounded Policy Q&A │
   │ • Anomaly Detection   │                                       │ • Voice Transcription │
   └───────────────────────┘                                       └───────────────────────┘
               │                                                               │
               └───────────────────────────────┬───────────────────────────────┘
                                               ▼
                              ┌─────────────────────────────────┐
                              │  VERIFIED STATUTORY REPOSITORY  │
                              │  • Code on Social Security 2020 │
                              │  • Central Rules (8 May 2026)   │
                              │  • e-Shram / AB-PMJAY Protocols │
                              │  • Official Emergency Helplines │
                              └─────────────────────────────────┘
```

> **Design Rule:** *Arithmetic is code; language is AI.*  
> Net payouts, hourly earnings, deadhead distances, and day counts are calculated deterministically. The language model extracts unstructured receipts, synthesizes multi-lingual advice, and structures grievance documentation.

---

## Core Capabilities

### 1. Trip Radar (Opportunity Evaluator)
Evaluates incoming delivery pings before acceptance:
- Factors in one-way delivery distance plus **unpaid deadhead return mileage**.
- Applies local vehicle fuel burn rates (e.g., ₹2.60/km for 110cc two-wheelers).
- Reveals true net earnings and effective hourly yield (e.g., a ₹52 gross order yielding only ₹13.30 net or ₹19/hr).
- Provides an automated decision recommendation (*Accept* vs. *Decline*).

### 2. Pay Audit (Vision OCR & Anomaly Detection)
- Parses platform payout receipts and settlement screenshots.
- Deconstructs earnings into base pay, distance compensation, weather surcharges, and deductions.
- Cross-references device GPS telemetry against logged platform distance to identify distance-shaving anomalies.
- Flags uncredited weather bonuses during extreme conditions and unfair cancellation penalties.
- Generates 1-click formal dispute letters citing order IDs, timestamps, and statutory fair-work provisions.

### 3. Rights & Statutory Shield
- Tracks active days toward the statutory **90-day (single platform)** and **120-day (multi-platform cumulative)** thresholds under Section 114 of the Code on Social Security.
- Prepares workers for upcoming **Ayushman Bharat PM-JAY** (₹5 Lakh family hospitalization) and **e-Shram** (₹2 Lakh accidental cover) enrolment.
- Monitors algorithmic deactivation risk by tracking rolling acceptance rates against platform throttling thresholds (75%).

### 4. Grounded Legal & Policy Assistant ("Ask Saathi")
- Multilingual conversational interface supporting **Hindi**, **Punjabi**, **Hinglish**, and **English**.
- Powered by a hand-verified knowledge base containing primary government notifications, gazettes, and official helplines (112, 1915, 14434, 1073).
- Strictly provides citations (e.g., `[KB-002]`) and explicitly refuses out-of-scope inquiries to prevent legal hallucinations.

### 5. Health & Road Safety Telemetry
- Environmental weather telemetry (e.g., extreme 38°C heat index alerts in Chandigarh) with scheduled hydration countdowns.
- Shift fatigue monitoring that alerts workers when continuous riding exceeds 7.5 hours (a threshold linked to 40% slower emergency braking reflexes).
- Night-riding checklist covering reflective gear, ISI helmet standards, and illumination.
- 1-tap Emergency SOS protocol dispatching live GPS coordinates to verified emergency services.

---

## Responsive Dual-Viewport System

GigSaathi includes a native viewport controller built into the navigation bar:
- **Laptop Dashboard**: Expands into a 3-column command center suited for desktop management, fleet analytics, and projector presentations.
- **Rider Mobile Frame**: Restricts the interface into a photorealistic smartphone chassis with touch-optimized ergonomics suited for on-bike handlebar usage.

---

## Project Structure

```
gig-saathi/
├── scripts/
│   └── runTests.js               # Standalone test runner
├── src/
│   ├── components/
│   │   ├── AskSaathiAssistant.jsx # Grounded conversational assistant
│   │   ├── DisputeDrafter.jsx     # Structured platform grievance generator
│   │   ├── DocumentHelper.jsx     # Identity & regulatory compliance vault
│   │   ├── HeaderCockpit.jsx      # Top status telemetry and controls
│   │   ├── OrderEvaluator.jsx     # Deadhead & fuel margin evaluator
│   │   ├── SafetyGuardian.jsx     # Heatwave & fatigue monitoring
│   │   ├── SlipScanner.jsx        # Receipt parser & anomaly detector
│   │   ├── SocialSecurityShield.jsx # 90/120-day threshold monitor
│   │   └── VoiceShiftLogger.jsx   # Speech-to-data shift accounting
│   ├── data/
│   │   ├── knowledgeBase.js       # Hand-verified statutory repository
│   │   ├── mockData.js            # Field research telemetry & shift logs
│   │   └── translations.js        # Multilingual localization dictionaries
│   ├── utils/
│   │   └── ledgerEngine.js        # Deterministic math & audit algorithms
│   ├── App.jsx                    # Root application with dual-viewport controller
│   ├── index.css                  # Tailwind CSS v4 styling rules
│   └── main.jsx                   # Application entrypoint
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/naman7r/gig-saathi.git
cd gig-saathi

# Install dependencies
npm install

# Run automated compliance tests
npm test

# Launch the development server
npm run dev
```

The application will be accessible at `http://localhost:5175`.

---

## Automated Verification Suite

The repository includes a standalone test suite validating arithmetic determinism, statutory day deduplication, and grounded retrieval:

```bash
npm test
```

### Verified Test Cases:
- `calculateNetTakeHome()`: Validates exact deduction arithmetic (`₹1,120 - ₹290 - ₹80 - ₹60 = ₹690`).
- `calculateEffectiveHourlyRate()`: Validates hourly yield calculations and handles zero-hour safeguards.
- `evaluateStatutoryDays()`: Deduplicates same-day multi-app shifts across platforms.
- `detectPayoutAnomaly()`: Verifies anomaly detection when per-km rates fall below the 80% baseline.
- `queryKnowledgeBase()`: Confirms grounded statutory citations (`[KB-003]`) and verified helpline fallback for out-of-scope queries.

---

## Legal & Compliance Notice

*GigSaathi provides informational guidance, mathematical transparency, and documentation assistance for informal gig workers. Generated dispute appeals and entitlement estimates do not constitute formal legal counsel. Statutory rules, contribution rates, and scheme rollouts are subject to official notifications by the Ministry of Labour and Employment and respective State Welfare Boards.*
