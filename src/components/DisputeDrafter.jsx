import React, { useState } from 'react';
import { FileText, Copy, CheckCircle2, Share2, AlertCircle } from 'lucide-react';
import { RIDER_PROFILE } from '../data/mockData';

export default function DisputeDrafter({ prefilledSlip, onNotify }) {
  const [issueType, setIssueType] = useState(
    prefilledSlip ? (prefilledSlip.penaltyDeduction ? 'cancellation' : 'surge') : 'surge'
  );
  const [copied, setCopied] = useState(false);

  const getAppealText = () => {
    if (issueType === 'surge') {
      return `To: Zomato Partner Support Team
Subject: Dispute Notice: Missing Weather Surge & Km Discrepancy — Order #ZOM-7782190

Dear Partner Support,

I am writing to formally contest the settlement for Order #ZOM-7782190 completed on 23 October 2026 at 21:24.

1. Distance Telemetry Shortfall:
Device GPS telemetry records 7.4 km from Sindhi Sweets (Sector 17) to Sector 38. The settlement records only 5.1 km (-2.3 km / ₹12 shortfall).

2. Uncredited Severe Weather Surcharge:
Heavy rain conditions were active in the Sector 17 zone during this trip. Under compensation guidelines, a ₹20 surge was applicable, but credited as ₹0.

Total Discrepancy: ₹32.00

Attached Evidence:
- GPS trip odometer timestamp (7.4 km)
- In-app order completion log at 21:24

Please adjust and credit ₹32 to my partner wallet within 24 hours.

Regards,
${RIDER_PROFILE.name}
Partner ID: ZOM-CHD-88192
Rating: 4.82`;
    }

    return `To: Swiggy Partner Grievance Cell
Subject: Appeal Against Unfair Cancellation Deduction (-₹80) — Order #SWG-4902188

Dear Grievance Team,

I am appealing the deduction of ₹80 levied on Order #SWG-4902188 on 22 October 2026.

Grounds:
1. I arrived at Subway (Phase 5) at 14:15, well within the pickup window.
2. The restaurant delayed food preparation by 16 minutes. Support was alerted via in-app chat at 14:28.
3. The customer cancelled at 14:31 due to merchant delay outside my control.

Levying cancellation penalties on delivery partners for merchant/customer cancellations breaches fair platform standards.

Requested Action: Immediate reversal of ₹80 deduction.

Regards,
${RIDER_PROFILE.name}
Partner ID: SWG-MH-55210`;
  };

  const appealContent = getAppealText();

  const handleCopy = () => {
    navigator.clipboard.writeText(appealContent);
    setCopied(true);
    if (onNotify) {
      onNotify("शिकायत पत्र कॉपी हो गया! / Grievance letter copied to clipboard.", "success");
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Issue Switcher */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setIssueType('surge')}
          className={`p-3 rounded-2xl border text-left transition-all ${
            issueType === 'surge'
              ? 'bg-zinc-800/90 border-zinc-600 text-zinc-100 font-bold'
              : 'bg-zinc-950/60 border-zinc-800/60 text-zinc-400 hover:border-zinc-700'
          }`}
        >
          <span className="text-xs">Missing Surge / Distance</span>
          <span className="text-[10px] text-zinc-500 block font-mono">Order #ZOM-7782190</span>
        </button>

        <button
          onClick={() => setIssueType('cancellation')}
          className={`p-3 rounded-2xl border text-left transition-all ${
            issueType === 'cancellation'
              ? 'bg-zinc-800/90 border-zinc-600 text-zinc-100 font-bold'
              : 'bg-zinc-950/60 border-zinc-800/60 text-zinc-400 hover:border-zinc-700'
          }`}
        >
          <span className="text-xs">Cancellation Penalty</span>
          <span className="text-[10px] text-zinc-500 block font-mono">Order #SWG-4902188</span>
        </button>
      </div>

      {/* Appeal Preview Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
          <div className="flex items-center gap-2 text-zinc-300 text-xs font-semibold">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Formal Dispute Appeal Draft</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl text-xs font-semibold text-zinc-200 transition-all"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Text Container */}
        <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800 font-mono text-[11px] leading-relaxed text-zinc-300 max-h-64 overflow-y-auto whitespace-pre-wrap select-all">
          {appealContent}
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 text-[11px] text-zinc-500">
          <AlertCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
          <span>Informational aid. Structured for tier-1 support and grievance cells.</span>
        </div>

        {/* Send actions */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(appealContent)}`}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all text-center"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share via WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => {
              if (onNotify) {
                onNotify("सबूत पैक तैयार! जीपीएस ओडोमीटर और टाइमस्टैम्प सुरक्षित हैं। / Evidence pack exported.", "success");
              }
            }}
            className="py-3 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all min-h-[44px]"
          >
            <span>Export Evidence Pack</span>
          </button>
        </div>
      </div>
    </div>
  );
}
