import {
  calculateNetTakeHome,
  calculateEffectiveHourlyRate,
  evaluateStatutoryDays,
  detectPayoutAnomaly,
  queryKnowledgeBase
} from '../src/utils/ledgerEngine.js';

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    failed++;
  }
}

console.log("\n🧪 Running GigSaathi Deterministic Quality & Compliance Tests...\n");

// Test 1: Arithmetic Net Pay Calculation
const net = calculateNetTakeHome(1120, 290, 80, 60);
assert(net === 690, "Net take home calculation: ₹1120 - ₹290 - ₹80 - ₹60 = ₹690");

// Test 2: Effective Hourly Rate
const hourly = calculateEffectiveHourlyRate(690, 10);
assert(hourly === 69, "Effective hourly rate: ₹690 / 10h = ₹69/hr");

// Test 3: Zero or Negative hours safeguard
const zeroHours = calculateEffectiveHourlyRate(500, 0);
assert(zeroHours === 0, "Zero hours safeguard returns 0 without division-by-zero error");

// Test 4: Day deduplication for statutory social security counter
const sampleShifts = [
  { date: '2026-10-21', platform: 'Zomato' },
  { date: '2026-10-21', platform: 'Swiggy' }, // Same day multi-apping
  { date: '2026-10-22', platform: 'Zomato' },
  { date: '2026-10-23', platform: 'Zomato' }
];
const daysResult = evaluateStatutoryDays(sampleShifts);
assert(daysResult.cumulativeDays === 3, "Deduplicates same-day multi-app shifts (3 unique days)");
assert(daysResult.singlePlatformDays === 3, "Tracks max single platform active days correctly");

// Test 5: Anomaly detection on underpayment
const underpaidTrip = { payout: 38, distanceKm: 6.2 }; // Rate = 6.12/km vs baseline 8.5/km (72% of baseline)
const anomalyCheck = detectPayoutAnomaly(underpaidTrip, 8.5);
assert(anomalyCheck.isAnomaly === true, "Flags rate per km below 80% baseline as an anomaly");
assert(anomalyCheck.underpaidEstimate >= 15, "Estimates underpaid shortfall correctly");

// Test 6: Grounded Knowledge Base query with citation
const kbResult = queryKnowledgeBase("When do I get Ayushman Bharat 5 lakh cover?");
assert(kbResult.found === true && kbResult.citationId === "KB-003", "Knowledge Base returns verified citation [KB-003] for healthcare");

// Test 7: Out-of-scope query refusal
const outOfScope = queryKnowledgeBase("Should I invest in bitcoin cryptocurrency?");
assert(outOfScope.found === false && outOfScope.outOfScope === true, "Explicitly refuses out-of-scope queries with helpline fallback");

// Test 8: Gemini Assistant graceful fallback without API key
const { askGeminiAssistant } = await import('../src/utils/geminiAssistant.js');
const assistantRes = await askGeminiAssistant("90 दिन का नियम क्या है?", "");
assert(assistantRes.source === 'local_kb' && assistantRes.citationId === 'KB-002', "Gemini Assistant falls back to local KB-002 citation when no API key provided");

// Test 9: Gemini Assistant handles out-of-scope gracefully without crashing
const outOfScopeAssistant = await askGeminiAssistant("Recipe for biryani", "");
assert(outOfScopeAssistant.source === 'local_kb' && (outOfScopeAssistant.text.includes("1915") || outOfScopeAssistant.text.includes("14434")), "Gemini Assistant out-of-scope fallback returns verified helpline numbers (1915/14434)");

console.log(`\n========================================`);
console.log(`Summary: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}
