// Domain data & realistic research-backed benchmarks for Indian delivery workers
// Grounded in IDinsight 2024, NITI Aayog 2022, and Fairwork India studies

export const RIDER_PROFILE = {
  name: "Naman Rajput",
  age: 26,
  city: "Chandigarh (Tricity Hub - Sec 35 / Mohali)",
  vehicle: "Hero Splendor 110cc (Petrol @ ₹98.4/L)",
  fuelCostPerKm: 2.6, // ₹2.60 per km in stop-and-go traffic
  platforms: ["Zomato", "Swiggy"],
  rating: 4.82,
  acceptanceRate: 76, // 75% is danger threshold for algorithmic throttling
  todayHoursLogged: 7.5,
  socialSecurityThreshold: {
    targetDays: 90,
    currentDays: 84, // 6 days to unlock Code on Social Security benefits
    platform: "Zomato",
    eligibleSchemes: ["Ayushman Bharat PM-JAY", "e-Shram Accidental Cover"]
  }
};

export const INCOMING_ORDER_SCENARIOS = [
  {
    id: "ord-1",
    platform: "Zomato",
    title: "The Deadhead Highway Trap",
    tagline: "High gross illusion, terrible net return",
    restaurant: "Burger King (Sector 35)",
    dropLocation: "Kharar Highway (Out of Delivery Zone)",
    oneWayDistanceKm: 8.4,
    deadheadReturnKm: 6.5,
    totalDistanceKm: 14.9,
    offeredPayout: 52,
    estimatedMinutes: 42,
    weather: "Drizzle (31°C)",
    traffic: "Heavy (Peak Evening)",
    surgeOffered: 0,
    verdict: "SKIP",
    verdictColor: "red",
    realFuelCost: 38.7, // 14.9 km * 2.6
    bikeWearCost: 15.0,
    netProfit: 13.3, // 52 - 38.7
    effectiveHourlyRate: 19.0, // (13.3 / 42) * 60
    reason: "6.5 km empty return from Kharar eats 74% of your gross pay in fuel. Net rate is only ₹19/hr. Wait 3 mins for Sector 22 cluster orders."
  },
  {
    id: "ord-2",
    platform: "Swiggy",
    title: "The Clustered Golden Batch",
    tagline: "Short distance + dense surge = peak efficiency",
    restaurant: "Nik Baker's (Sector 9)",
    dropLocation: "Sector 8 (High-density delivery hub)",
    oneWayDistanceKm: 2.8,
    deadheadReturnKm: 0.5,
    totalDistanceKm: 3.3,
    offeredPayout: 68,
    estimatedMinutes: 20,
    weather: "Normal (32°C)",
    traffic: "Moderate",
    surgeOffered: 25,
    verdict: "ACCEPT",
    verdictColor: "emerald",
    realFuelCost: 8.6, // 3.3 km * 2.6
    bikeWearCost: 4.0,
    netProfit: 55.4, // 68 - 8.6 - 4.0
    effectiveHourlyRate: 166.2, // (55.4 / 20) * 60
    reason: "Minimal deadhead return. High ₹25 peak surge active. Clears ₹166/hr net rate. Highly recommended to accept immediately."
  },
  {
    id: "ord-3",
    platform: "Zomato",
    title: "The Rainy Dinner Rush",
    tagline: "Balanced order with legitimate weather surge",
    restaurant: "Pal Dhaba (Sector 28)",
    dropLocation: "Sector 20 (Residential)",
    oneWayDistanceKm: 4.6,
    deadheadReturnKm: 1.8,
    totalDistanceKm: 6.4,
    offeredPayout: 74,
    estimatedMinutes: 28,
    weather: "Thunderstorm Rain (+₹20 Surge)",
    traffic: "Slow Traffic",
    surgeOffered: 20,
    verdict: "ACCEPT",
    verdictColor: "emerald",
    realFuelCost: 16.6,
    bikeWearCost: 6.0,
    netProfit: 51.4,
    effectiveHourlyRate: 110.1,
    reason: "Legitimate rain bonus included. Return distance stays inside main commercial zone. Solid ₹110/hr net yield."
  }
];

export const MOCK_PAYOUT_SLIPS = [
  {
    id: "slip-zomato-9482",
    platform: "Zomato",
    orderId: "ZOM-7782190",
    date: "23 Oct 2026, 20:45",
    restaurant: "Sindhi Sweets, Sector 17",
    customerLoc: "Sector 38, Chandigarh (7.4 km)",
    basePay: 28,
    distancePay: 22,
    recordedDistanceKm: 5.1, // Shaved from 7.4 km!
    actualGpsDistanceKm: 7.4,
    peakSurgeLogged: 0,
    activeWeatherCondition: "Heavy Rain & High Demand (8-10 PM)",
    totalPaid: 50,
    expectedFairPay: 82, // Base 28 + Distance 34 (7.4km) + Rain Surge 20
    underpaymentDetected: true,
    underpaidAmount: 32,
    anomalyFlags: [
      "GPS Distance Mismatch: Actual 7.4 km, platform logged 5.1 km (-₹12 distance pay).",
      "Missing Weather Surge: Rain surge was active in Sec 17 zone, ₹0 credited (-₹20 surge)."
    ],
    evidenceTimeline: [
      { time: "20:45", event: "Order accepted at Sector 17" },
      { time: "20:58", event: "Food picked up; heavy rain began" },
      { time: "21:24", event: "Delivered to Sector 38 (GPS odometer: 7.4 km)" }
    ]
  },
  {
    id: "slip-swiggy-3104",
    platform: "Swiggy",
    orderId: "SWG-4902188",
    date: "22 Oct 2026, 14:15",
    restaurant: "Subway (Phase 5, Mohali)",
    customerLoc: "Sector 70, Mohali",
    basePay: 30,
    distancePay: 18,
    recordedDistanceKm: 4.2,
    actualGpsDistanceKm: 4.2,
    penaltyDeduction: -80, // Customer cancelled after 15 mins wait!
    penaltyReason: "Customer Cancellation Penalty",
    totalPaid: -32, // Negative order payout!
    expectedFairPay: 48,
    underpaymentDetected: true,
    underpaidAmount: 80,
    anomalyFlags: [
      "Unfair Customer Cancellation Penalty: Rider waited 16 mins at restaurant through no fault of his own.",
      "Support call attempt logged at 14:28 (No agent answered)."
    ],
    evidenceTimeline: [
      { time: "14:15", event: "Arrived at restaurant" },
      { time: "14:31", event: "Customer cancelled while order was being packed" },
      { time: "14:32", event: "Platform deducted ₹80 cancellation penalty from rider" }
    ]
  }
];

export const HISTORICAL_SHIFTS = [
  {
    id: "shift-1",
    date: "23 Oct (Yesterday Night)",
    period: "Dinner Surge (7:00 PM - 11:30 PM)",
    hours: 4.5,
    orders: 11,
    grossPayout: 840,
    fuelExpense: 175,
    bikeWear: 45,
    deductions: 0,
    netTakeHome: 620,
    trueHourlyRate: 137.8,
    efficiencyScore: "A+"
  },
  {
    id: "shift-2",
    date: "23 Oct (Yesterday Afternoon)",
    period: "Lunch Rush (12:00 PM - 4:30 PM)",
    hours: 4.5,
    orders: 7,
    grossPayout: 460,
    fuelExpense: 190,
    bikeWear: 45,
    deductions: 60, // delay deduction in traffic
    netTakeHome: 165,
    trueHourlyRate: 36.7,
    efficiencyScore: "D"
  },
  {
    id: "shift-3",
    date: "22 Oct (Wednesday Evening)",
    period: "Dinner Shift (6:30 PM - 11:00 PM)",
    hours: 4.5,
    orders: 9,
    grossPayout: 690,
    fuelExpense: 160,
    bikeWear: 45,
    deductions: 0,
    netTakeHome: 485,
    trueHourlyRate: 107.8,
    efficiencyScore: "A"
  }
];

export const GOVERNMENT_WELFARE_SCHEMES = [
  {
    id: "scheme-eshram",
    name: "e-Shram Universal UAN Portal",
    ministry: "Ministry of Labour & Employment (Govt of India)",
    benefit: "₹2,00,000 Accidental Death / Permanent Disability Cover",
    cost: "100% Free Government Registration",
    qualificationCriteria: "Unorganized gig worker, age 16-59, not in EPFO/ESIC.",
    status: "Eligible (Action Required)",
    requiredDocs: ["Aadhaar Card", "Aadhaar-linked Mobile", "Bank Account Details (IFSC)"],
    portalUrl: "https://eshram.gov.in"
  },
  {
    id: "scheme-pmjay",
    name: "Ayushman Bharat PM-JAY (Code on Social Security Linked)",
    ministry: "National Health Authority",
    benefit: "₹5,00,000 Cashless Family Hospitalization Cover per Year",
    cost: "Covered under aggregator welfare levy",
    qualificationCriteria: "90 days continuous engagement with registered aggregator (Naman is on Day 84!)",
    status: "6 Days Remaining to Qualify",
    requiredDocs: ["Aggregator Partner ID", "e-Shram UAN", "Ration Card / Income Certificate"],
    portalUrl: "https://mera.pmjay.gov.in"
  },
  {
    id: "scheme-pmsby",
    name: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    ministry: "Ministry of Finance",
    benefit: "₹2,00,000 Accidental Death Cover at ₹20/year premium",
    cost: "₹20 / year auto-debit",
    qualificationCriteria: "Savings bank account holder, age 18-70.",
    status: "Instant 1-Click Enrollment via Bank App",
    requiredDocs: ["Bank Passbook", "Aadhaar Card"],
    portalUrl: "https://financialservices.gov.in"
  }
];

export const VOICE_SAMPLE_PRESETS = [
  {
    label: "Full 10-Hr Heavy Shift",
    text: "Aaj 16 orders deliver kiye, ₹1,120 bane, ₹290 ka petrol laga, 10 ghante lage, ek order cancel hua."
  },
  {
    label: "Rain Surge Shift with Penalty",
    text: "Aaj 12 order kare barish me, ₹920 mila, ₹210 petrol laga, par company ne ₹60 ka late penalty kaat liya."
  },
  {
    label: "Short Afternoon Shift",
    text: "Aaj dopahar me 6 order kiye, ₹390 mila, ₹140 ka petrol laga, 4 ghante chalaya."
  }
];
