import React, { useState } from 'react';
import { Scale, Copy, CheckCircle2, AlertTriangle, FileText, Send, Share2 } from 'lucide-react';
import { MOCK_PAYOUT_SLIPS, RIDER_PROFILE } from '../data/mockData';

export default function DisputeDrafter({ prefilledSlip }) {
  const [selectedIssueType, setSelectedIssueType] = useState(
    prefilledSlip ? (prefilledSlip.penaltyDeduction ? 'cancellation' : 'surge') : 'surge'
  );
  const [copied, setCopied] = useState(false);

  // Generate formal appeal text based on chosen issue
  const generateAppealDraft = () => {
    if (selectedIssueType === 'surge') {
      return `To: Zomato Partner Support Team
Subject: Appeal for Uncredited Weather Surge & Distance Discrepancy — Order #ZOM-7782190

Dear Partner Support,

I am writing to formally contest the payout credited for Order #ZOM-7782190 completed on 23 October 2026 at 21:24.

1. Discrepancy in Distance Pay:
According to live device GPS tracking, the trip distance from Sindhi Sweets (Sector 17) to Sector 38 was 7.4 km. However, the partner payout statement records only 5.1 km, creating a shortfall of 2.3 km (₹12).

2. Missing Severe Weather Surge:
During this trip, heavy rain conditions were active across the Sector 17 delivery zone. Under partner compensation policy guidelines, a minimum surge of ₹20 was active. This line item was credited as ₹0 in my settlement.

Total Uncredited Remittance Owed: ₹32.00

Evidence Attached:
- Timestamped GPS route log (7.4 km)
- In-app delivery confirmation timestamp (21:24)
- Screenshot of prevailing weather surge banner

I request you to review the trip telemetry and credit the adjusted amount of ₹32 to my partner wallet within 24 hours.

Regards,
${RIDER_PROFILE.name}
Partner ID: ZOM-CHD-88192
Contact: +91 98721 XXXXX
Rating: 4.82 (High Performance Tier)`;
    }

    if (selectedIssueType === 'cancellation') {
      return `To: Swiggy Partner Grievance Cell
Subject: Urgent Appeal Against Wrongful Cancellation Deduction (-₹80) — Order #SWG-4902188

Dear Grievance Team,

I am appealing the deduction of ₹80 levied on my account for Order #SWG-4902188 on 22 October 2026 at 14:32.

Grounds for Reversal:
1. Adherence to Protocol: I arrived at the restaurant (Subway, Phase 5) at 14:15, well within the designated pickup window.
2. Unreasonable Restaurant Delay: The order was delayed by 16 minutes by the merchant. I attempted to reach partner support via the SOS chat at 14:28.
3. Customer Cancellation: The customer cancelled the order at 14:31 due to food preparation delay, outside my control.

Levying an ₹80 penalty on the delivery partner for customer-side cancellations violates the Fair Platform Working Standards.

Action Requested:
Immediate reversal of the ₹80 deduction and correction of the order rating.

Attached Documentation:
- Merchant arrival timestamp at 14:15
- Partner app chat log attempt timestamp at 14:28

Regards,
${RIDER_PROFILE.name}
Partner ID: SWG-MH-55210
Rating: 4.82`;
    }

    return `To: Platform Partner Operations Team
Subject: Appeal Regarding False Customer Rating & Deactivation Warning

Dear Support,
I am writing to contest a 1-star rating and safety warning received on Order #ZOM-65109. The customer claimed food package tampering. 

I delivered the package with the original restaurant safety seal intact. I request verification of the delivery photo uploaded at 20:12.

Please expunge this penalty to safeguard my 84-day active standing under the Code on Social Security provisions.

Regards,
${RIDER_PROFILE.name}`;
  };

  const appealText = generateAppealDraft();

  const handleCopy = () => {
    navigator.clipboard.writeText(appealText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              AI Dispute & Deactivation Defender
              <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                POLICY-GROUNDED AGENT
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Converts Hindi voice or order evidence into formal, polite platform appeal letters that get answered.
            </p>
          </div>
        </div>

        {/* Issue Type Selector */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800">
          <button
            onClick={() => setSelectedIssueType('surge')}
            className={`p-2 rounded-xl text-left border text-xs transition-all ${
              selectedIssueType === 'surge'
                ? 'bg-purple-500/20 border-purple-500/50 text-purple-200 font-bold'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            🌧️ Missing Surge / Km
          </button>

          <button
            onClick={() => setSelectedIssueType('cancellation')}
            className={`p-2 rounded-xl text-left border text-xs transition-all ${
              selectedIssueType === 'cancellation'
                ? 'bg-purple-500/20 border-purple-500/50 text-purple-200 font-bold'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            ❌ Cancellation Penalty
          </button>

          <button
            onClick={() => setSelectedIssueType('rating')}
            className={`p-2 rounded-xl text-left border text-xs transition-all ${
              selectedIssueType === 'rating'
                ? 'bg-purple-500/20 border-purple-500/50 text-purple-200 font-bold'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            🛡️ False Rating / Block
          </button>
        </div>
      </div>

      {/* Generated Appeal Letter Container */}
      <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-purple-400" />
            Generated Appeal Draft (Platform Ready)
          </span>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-purple-600/30"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Appeal'}</span>
          </button>
        </div>

        {/* Textbox Container */}
        <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-[11px] leading-relaxed text-slate-300 max-h-72 overflow-y-auto whitespace-pre-wrap select-all">
          {appealText}
        </div>

        {/* Legal disclaimer */}
        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2 text-[11px] text-slate-400">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Informational Aid:</strong> Structured draft for tier-1 platform support and grievance officers. This is not formal legal counsel.
          </span>
        </div>

        {/* WhatsApp & Email 1-Tap Share */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(appealText)}`}
            target="_blank"
            rel="noreferrer"
            className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all text-center"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Send to Team Leader / WhatsApp</span>
          </a>

          <button
            onClick={() => alert("PDF Evidence Pack exported! Includes order receipts, GPS timeline, and signed grievance letter.")}
            className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>Download PDF Evidence Pack</span>
          </button>
        </div>
      </div>
    </div>
  );
}
