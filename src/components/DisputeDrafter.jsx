import React, { useState } from 'react';
import { FileText, Copy, CheckCircle2, Share2, AlertCircle } from 'lucide-react';
import { RIDER_PROFILE } from '../data/mockData';

const TRANSLATIONS = {
  hinglish: {
    tabSurge: 'दूरी व बारिश सर्ज कटौती',
    tabCancel: 'गलत कैंसिलेशन पेनल्टी',
    cardTitle: 'कंपनी को औपचारिक शिकायत पत्र (Draft)',
    copyBtn: 'कॉपी करें',
    copiedBtn: 'कॉपी हो गया!',
    disclaimer: 'यह पत्र आधिकारिक एग्रीगेटर सपोर्ट और शिकायत सेल के लिए तैयार किया गया है।',
    whatsappBtn: 'व्हाट्सऐप पर भेजें ↗',
    exportBtn: 'जीपीएस सबूत डाउनलोड करें',
    copyNotice: 'शिकायत पत्र क्लिपबोर्ड पर कॉपी हो गया!',
    evidenceNotice: 'सबूत पैक तैयार! जीपीएस ओडोमीटर और टाइमस्टैम्प सुरक्षित हैं।'
  },
  hi: {
    tabSurge: 'दूरी व वर्षा सर्ज कटौती',
    tabCancel: 'अनुचित रद्दीकरण जुर्माना',
    cardTitle: 'कंपनी को औपचारिक शिकायत पत्र (प्रारूप)',
    copyBtn: 'कॉपी करें',
    copiedBtn: 'कॉपी हुआ',
    disclaimer: 'यह पत्र एग्रीगेटर सहायता केंद्र एवं शिकायत सेल हेतु प्रमाणित प्रारूप है।',
    whatsappBtn: 'व्हाट्सऐप पर प्रेषित करें ↗',
    exportBtn: 'जीपीएस साक्ष्य डाउनलोड करें',
    copyNotice: 'शिकायत पत्र कॉपी हो गया।',
    evidenceNotice: 'साक्ष्य पैक तैयार। जीपीएस ओडोमीटर और समय मुहर सुरक्षित।'
  },
  en: {
    tabSurge: 'Missing Surge & Distance',
    tabCancel: 'Cancellation Penalty',
    cardTitle: 'Formal Dispute Appeal Draft',
    copyBtn: 'Copy Text',
    copiedBtn: 'Copied!',
    disclaimer: 'Structured for tier-1 aggregator support and formal dispute grievance cells.',
    whatsappBtn: 'Share via WhatsApp ↗',
    exportBtn: 'Export GPS Evidence Pack',
    copyNotice: 'Grievance letter copied to clipboard.',
    evidenceNotice: 'Evidence pack ready! GPS odometer and timestamp logs exported.'
  }
};

export default function DisputeDrafter({ prefilledSlip, onNotify, currentLang = 'hinglish' }) {
  const [issueType, setIssueType] = useState(
    prefilledSlip ? (prefilledSlip.penaltyDeduction ? 'cancellation' : 'surge') : 'surge'
  );
  const [copied, setCopied] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

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
      onNotify(t.copyNotice, "success");
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Issue Switcher */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setIssueType('surge')}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            issueType === 'surge'
              ? 'bg-blue-50/80 border-blue-400 text-blue-900 font-bold shadow-xs'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <span className="text-xs">{t.tabSurge}</span>
          <span className="text-[10px] text-slate-500 block font-mono">Order #ZOM-7782190</span>
        </button>

        <button
          onClick={() => setIssueType('cancellation')}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            issueType === 'cancellation'
              ? 'bg-rose-50/80 border-rose-400 text-rose-900 font-bold shadow-xs'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <span className="text-xs">{t.tabCancel}</span>
          <span className="text-[10px] text-slate-500 block font-mono">Order #SWG-4902188</span>
        </button>
      </div>

      {/* Appeal Preview Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-800 text-xs font-semibold">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>{t.cardTitle}</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? t.copiedBtn : t.copyBtn}</span>
          </button>
        </div>

        {/* Text Container */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800 max-h-64 overflow-y-auto whitespace-pre-wrap select-all">
          {appealContent}
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 text-[11px] text-slate-500">
          <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span>{t.disclaimer}</span>
        </div>

        {/* Send actions */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(appealContent)}`}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all text-center min-h-[44px] shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{t.whatsappBtn}</span>
          </a>

          <button
            type="button"
            onClick={() => {
              if (onNotify) {
                onNotify(t.evidenceNotice, "success");
              }
            }}
            className="py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all min-h-[44px] cursor-pointer"
          >
            <span>{t.exportBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
