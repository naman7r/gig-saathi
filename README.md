# 🛵 GigSaathi AI (साथी) — India's AI Income Shield & Decision Co-Pilot for Gig Workers

> **Built for InnoSprint 2.0 (Chandigarh University) • Theme: Build with Antigravity**  
> *Track: Gig Worker Companion • AI for Economic Dignity & Worker Rights*  
> *Target Score: 100/100 (30 Idea + 25 Working Prototype + 25 AI/Antigravity + 20 Presentation)*

---

## 🌟 The Core Problem: India's Opaque Gig Black Box

India's gig and platform economy is projected by **NITI Aayog** to surge from **7.7 million (2020-21)** to **23.5 million workers by 2029-30**. 

Yet, delivery partners (Swiggy, Zomato, Zepto, Blinkit) operate in a structural information asymmetry:
1. **The Hidden 32% Expense Drain (*IDinsight 2024*)**: Platforms display gross payouts (e.g. ₹1,120), but omit fuel costs (₹220–₹350/day), vehicle depreciation/oil wear (₹70–₹100/day), and unpaid deadhead return trips. Many riders net **₹50–₹68/hour**—below statutory minimum living wages.
2. **The 42% Unresolved Grievance Black Hole (*The Asia Foundation 2022*)**: 42% of gig workers find dispute handling time-consuming, and 36% leave grievances completely unresolved because they lack formal English drafting skills and timestamped telemetry proof.
3. **Rigid Statutory Thresholds (*Code on Social Security 2020, Sec 114*)**: The Indian labor framework conditions social security (health and accidental insurance) on maintaining **90 continuous days with an aggregator**. Arbitrary account throttling or deactivations wipe this progress out.

---

## ⚡ The Solution: GigSaathi AI (साथी)

GigSaathi is an independent, mobile-first, voice-enabled AI companion that sits **on top of platform apps** to serve as the worker's private advocate and decision shield.

### 🎯 4 Killer AI Features Built in Prototype

1. **"Accept or Skip?" Smart Order Evaluator (The Live Wow Moment)**:
   - When a ping arrives (e.g., ₹52 for 8.4 km to Kharar), AI computes the hidden **6.5 km empty return trip (14.9 km total)** + **fuel consumption @ ₹2.6/km (-₹38.7)**.
   - Exposes true net take-home: **₹13.3 for 42 minutes = ₹19.0/hr!**
   - AI Verdict: 🔴 **SKIP THIS ORDER** with localized cluster recommendation.

2. **Slip Vision AI & Underpayment Anomaly Detector**:
   - Ingests order screenshots / receipts via Multimodal OCR.
   - Deconstructs Base Pay, Distance Pay, Peak Surge, Rain Bonus, and Deductions.
   - **Cross-checks real telemetry**: Detects distance shaving (7.4 km actual vs 5.1 km credited) and missing rain surge (+₹20 uncredited).
   - Flags: **"⚠️ Underpayment: ₹32 Shortchanged"** with 1-click appeal routing.

3. **90-Day Social Security & Deactivation Shield**:
   - Live tracker for the statutory **90-day aggregator engagement threshold** under Section 114 of India's Code on Social Security.
   - *Status: "Day 84 of 90 with Zomato — 6 days left to unlock ₹5 Lakh Ayushman Bharat hospitalization and ₹2 Lakh e-Shram accidental cover!"*
   - Early warning risk meter for order acceptance rate (76% vs 75% throttling threshold).

4. **Hinglish Voice Shift Logger & Dispute Drafter**:
   - Zero-typing friction: Speak in Hindi or Punjabi: *"Aaj 16 order deliver kiye, ₹1,120 bane, ₹290 ka petrol laga..."*
   - Instant mathematical breakdown: Gross vs Operating Expenses vs Net ₹/hour.
   - Converts grievances into formal, timestamped, policy-grounded appeal letters with 1-click WhatsApp/support copy and PDF evidence export.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide Icons, Canvas Confetti
- **UI Design System**: High-Contrast Outdoor Tactical Dark Mode (`#070A12` / `#0B0F19`), mobile-first frame (max-w-md), large thumb touch targets.
- **AI & NLP**:
  - Web Speech API for Hindi/Punjabi voice recognition
  - Regex & NLP entity extraction engine (orders, gross, fuel, deductions, hours)
  - Multimodal Vision OCR parser simulation with platform policy verification
  - Agentic Dispute Appeal Generator citing Indian Code on Social Security provisions
- **Local Dev Server**: Vite running on `http://127.0.0.1:5175`

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/naman7r/gig-saathi.git
cd gig-saathi

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5175` in your browser.

---

## 📊 Mapping to InnoSprint 2.0 Marking Scheme (100 Marks)

| Criteria | Points | How GigSaathi Wins It |
|---|:---:|---|
| **Idea & Grounding** | **30** | Anchored in hard empirical data from IDinsight (32% expense drain), NITI Aayog (23.5M gig workforce), and Asia Foundation (42% grievance failure). Focused strictly on food/quick-commerce delivery riders. |
| **Working Prototype** | **25** | High-contrast, mobile-first tactical cockpit. 1-tap Hinglish voice simulation, interactive order deconstruction, slip scanner with red-flag underpayment alerts, and 90-day progress tracker. |
| **AI & Antigravity Usage** | **25** | Multimodal Vision OCR extraction, mathematical decision modeling (deadhead fuel calculation), Hinglish NLP voice extraction, and automated policy-grounded appeal drafting. |
| **Presentation & Story** | **20** | The human story of **Ravi Kumar (26, Chandigarh rider)**. Built-in interactive **Pitch Cheat Sheet** modal with timed 5-minute speaking script and judge Q&A defense. |

---

*Built with ❤️ at InnoSprint 2.0 • Chandigarh University*
