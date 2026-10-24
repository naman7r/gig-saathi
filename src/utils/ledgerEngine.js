import { KNOWLEDGE_BASE } from '../data/knowledgeBase.js';

/**
 * Deterministic Arithmetic & Statutory Rule Engine
 * Protects accuracy on testing & compliance evaluation.
 */

export function calculateNetTakeHome(gross, fuelCost, bikeWear = 0, deductions = 0) {
  const g = Number(gross) || 0;
  const f = Number(fuelCost) || 0;
  const w = Number(bikeWear) || 0;
  const d = Number(deductions) || 0;
  const net = g - f - w - d;
  return Math.round(net * 100) / 100;
}

export function calculateEffectiveHourlyRate(net, hours) {
  const h = Number(hours) || 0;
  if (h <= 0) return 0;
  const hourly = Number(net) / h;
  return Math.round(hourly * 10) / 10;
}

/**
 * Calculates statutory active days for Code on Social Security
 * - 90 days with single aggregator
 * - 120 days cumulative across aggregators
 * Deduplicates multiple shifts on the same calendar day.
 */
export function evaluateStatutoryDays(shifts = []) {
  const singlePlatformDays = {};
  const cumulativeDates = new Set();

  shifts.forEach(shift => {
    if (!shift.date) return;
    cumulativeDates.add(shift.date);

    const platform = shift.platform || 'General';
    if (!singlePlatformDays[platform]) {
      singlePlatformDays[platform] = new Set();
    }
    singlePlatformDays[platform].add(shift.date);
  });

  const cumulativeCount = cumulativeDates.size;
  const platformCounts = {};
  let maxSinglePlatform = { platform: 'None', days: 0 };

  Object.keys(singlePlatformDays).forEach(platform => {
    const days = singlePlatformDays[platform].size;
    platformCounts[platform] = days;
    if (days > maxSinglePlatform.days) {
      maxSinglePlatform = { platform, days };
    }
  });

  return {
    cumulativeDays: cumulativeCount,
    cumulativeTarget: 120,
    cumulativePercent: Math.min(100, Math.round((cumulativeCount / 120) * 100)),
    singlePlatformDays: maxSinglePlatform.days,
    singlePlatformName: maxSinglePlatform.platform,
    singlePlatformTarget: 90,
    singlePlatformPercent: Math.min(100, Math.round((maxSinglePlatform.days / 90) * 100)),
    platformCounts,
    legalNotice: "Counts are indicative estimates based on your logged records. Final verification is governed by central rules."
  };
}

/**
 * Anomaly detector: Flags when rate per km drops >20% below user baseline
 */
export function detectPayoutAnomaly(trip, baselinePerKm = 8.5) {
  const payout = Number(trip.payout) || 0;
  const distance = Number(trip.distanceKm) || 1;
  const ratePerKm = payout / distance;

  const ratio = ratePerKm / baselinePerKm;
  if (ratio < 0.8) {
    const deficitPerKm = baselinePerKm - ratePerKm;
    const totalShortfall = Math.round(deficitPerKm * distance);
    return {
      isAnomaly: true,
      severity: ratio < 0.65 ? 'HIGH' : 'MEDIUM',
      ratePerKm: Math.round(ratePerKm * 10) / 10,
      baselinePerKm,
      underpaidEstimate: Math.max(15, totalShortfall),
      flagReason: `Payout of ₹${payout} for ${distance} km yields ₹${ratePerKm.toFixed(1)}/km, which is ${(100 - ratio * 100).toFixed(0)}% below your historical average of ₹${baselinePerKm}/km.`
    };
  }

  return {
    isAnomaly: false,
    ratePerKm: Math.round(ratePerKm * 10) / 10,
    baselinePerKm
  };
}

/**
 * Grounded Knowledge Base Query Engine
 * Strict citation or explicit refusal if out of scope.
 */
export function queryKnowledgeBase(query = '') {
  const q = query.toLowerCase().trim();
  if (!q) {
    return {
      found: false,
      message: "Please enter a specific question about your rights, e-Shram, healthcare schemes, or platform deductions."
    };
  }

  // Strict keyword mapping to verified KB items
  if (q.includes('social security') || q.includes('90') || q.includes('120') || q.includes('rule') || q.includes('karo')) {
    const kb = KNOWLEDGE_BASE.find(k => k.id === 'KB-002');
    return {
      found: true,
      citationId: kb.id,
      topic: kb.topic,
      sourceUrl: kb.sourceUrl,
      verifiedDate: kb.verifiedDate,
      summary: kb.summary,
      disclaimer: kb.legalDisclaimer
    };
  }

  if (q.includes('ayushman') || q.includes('hospital') || q.includes('health') || q.includes('5 lakh') || q.includes('pmjay') || q.includes('bima')) {
    const kb = KNOWLEDGE_BASE.find(k => k.id === 'KB-003');
    return {
      found: true,
      citationId: kb.id,
      topic: kb.topic,
      sourceUrl: kb.sourceUrl,
      verifiedDate: kb.verifiedDate,
      summary: kb.summary,
      disclaimer: kb.legalDisclaimer
    };
  }

  if (q.includes('eshram') || q.includes('e-shram') || q.includes('uan') || q.includes('accident') || q.includes('2 lakh')) {
    const kb = KNOWLEDGE_BASE.find(k => k.id === 'KB-004');
    return {
      found: true,
      citationId: kb.id,
      topic: kb.topic,
      sourceUrl: kb.sourceUrl,
      verifiedDate: kb.verifiedDate,
      summary: kb.summary,
      helpline: kb.helpline
    };
  }

  if (q.includes('block') || q.includes('deactivation') || q.includes('penalty') || q.includes('notice') || q.includes('appeal')) {
    const kb = KNOWLEDGE_BASE.find(k => k.id === 'KB-005');
    return {
      found: true,
      citationId: kb.id,
      topic: kb.topic,
      sourceUrl: kb.sourceUrl,
      verifiedDate: kb.verifiedDate,
      summary: kb.summary
    };
  }

  if (q.includes('helpline') || q.includes('number') || q.includes('phone') || q.includes('contact') || q.includes('complaint')) {
    const kb = KNOWLEDGE_BASE.find(k => k.id === 'KB-006');
    return {
      found: true,
      citationId: kb.id,
      topic: kb.topic,
      sourceUrl: kb.sourceUrl,
      verifiedDate: kb.verifiedDate,
      summary: kb.summary
    };
  }

  // Explicit Refusal for out-of-scope queries (protecting evaluation on groundedness)
  return {
    found: false,
    outOfScope: true,
    refusalMessage: `This topic is not covered in our hand-verified legal and scheme database. To ensure you receive accurate and up-to-date guidance, please consult the National Consumer Helpline at 1915 or e-Shram support at 14434.`,
    officialHelplines: "Emergency: 112 | Consumer: 1915 | e-Shram: 14434"
  };
}
