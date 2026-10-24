import React, { useState } from 'react';
import { MOCK_PAYOUT_SLIPS } from '../data/mockData';
import { FileText, AlertCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

const TRANSLATIONS = {
  hinglish: {
    auditing: "जीपीएस लॉग से कंपनी का हिसाब चेक हो रहा है...",
    settled: "कंपनी ने दिया",
    expected: "असली में देय: ₹",
    basePay: "बेस पे",
    distancePay: "दूरी का पैसा",
    recorded: "किमी ऐप में दर्ज",
    weatherSurge: "बारिश का सर्ज",
    expectedSurge: "(₹20 मिलना चाहिए था)",
    underpayDetected: "चोरी पकड़ी गई:",
    shortchanged: "कम दिए",
    draftAppeal: "शिकायत पत्र तैयार करें (₹",
    recover: "वापस मांगें)"
  },
  hi: {
    auditing: "जीपीएस लॉग के आधार पर ऑडिट जारी है...",
    settled: "प्रदत्त राशि",
    expected: "वास्तविक देय: ₹",
    basePay: "मूल वेतन",
    distancePay: "दूरी भुगतान",
    recorded: "किमी दर्ज",
    weatherSurge: "वर्षा सर्ज",
    expectedSurge: "(₹20 देय था)",
    underpayDetected: "कटौती चिह्नित:",
    shortchanged: "कम भुगतान",
    draftAppeal: "औपचारिक विवाद अपील तैयार करें (₹",
    recover: "दावा करें)"
  },
  en: {
    auditing: "Auditing statement against GPS logs...",
    settled: "Settled",
    expected: "Expected: ₹",
    basePay: "Base pay",
    distancePay: "Distance pay",
    recorded: "km recorded",
    weatherSurge: "Weather surge",
    expectedSurge: "(expected ₹20)",
    underpayDetected: "Underpayment Detected:",
    shortchanged: "Shortchanged",
    draftAppeal: "Draft Dispute Appeal (Recover ₹",
    recover: ")"
  }
};

export default function SlipScanner({ onDraftDispute, currentLang = 'hinglish' }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const currentSlip = MOCK_PAYOUT_SLIPS[selectedIdx];

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const handleSelectSlip = (idx) => {
    setIsScanning(true);
    setTimeout(() => {
      setSelectedIdx(idx);
      setIsScanning(false);
    }, 300);
  };

  const getFlags = (slip) => {
    if (currentLang === 'en') return slip.anomalyFlags;
    if (currentLang === 'hi') {
      if (slip.id === 'slip-zomato-9482') return [
        "दूरी कटौती: आपने 7.4 किमी यात्रा की, कंपनी ने केवल 5.1 किमी माना (-₹12 हानि)।",
        "वर्षा भत्ता गायब: सेक्टर 17 में भारी वर्षा के बावजूद ₹0 सर्ज दिया गया (-₹20 हानि)।"
      ];
      return [
        "ग्राहक द्वारा रद्द किए जाने के बावजूद राइडर पर ₹50 का जुर्माना लगाया गया।",
        "दुकान पर प्रतीक्षा समय 18 मिनट से अधिक होने का कोई मुआवजा नहीं दिया गया।"
      ];
    }
    // Hinglish
    if (slip.id === 'slip-zomato-9482') return [
      "किमी घटाया: आपने 7.4 किमी बाइक चलाई, कंपनी ने सिर्फ 5.1 किमी माना (-₹12 नुकसान)।",
      "बारिश का पैसा गायब: सेक्टर 17 में तेज बारिश थी, फिर भी ₹0 सर्ज दिया (-₹20 नुकसान)।"
    ];
    return [
      "कस्टमर ने कैंसिल किया फिर भी राइडर पर ₹50 पेनल्टी काटी गई।",
      "रेस्टोरेंट पर 18 मिनट खड़ा रहने का कोई वेटिंग पैसा नहीं दिया।"
    ];
  };

  return (
    <div className="space-y-4 text-slate-800 antialiased">
      {/* Slip Switcher */}
      <div className="grid grid-cols-2 gap-2">
        {MOCK_PAYOUT_SLIPS.map((slip, idx) => (
          <button
            key={slip.id}
            onClick={() => handleSelectSlip(idx)}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedIdx === idx
                ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className={slip.platform === 'Zomato' ? 'text-rose-500' : 'text-orange-500'}>
                {slip.platform} Payout
              </span>
              <span className="text-rose-600 font-mono text-[11px] font-extrabold">
                -₹{slip.underpaidAmount}
              </span>
            </div>
            <p className="text-xs font-bold mt-1 truncate">
              {idx === 0 
                ? (currentLang === 'en' ? 'Shaved Km & Rain Surge' : currentLang === 'hi' ? 'दूरी व वर्षा कटौती' : 'किमी घटाया व बारिश सर्ज गायब')
                : (currentLang === 'en' ? 'Unfair Cancellation Fee' : currentLang === 'hi' ? 'अनुचित रद्दीकरण शुल्क' : 'गलत कैंसिलेशन पेनल्टी')}
            </p>
            <p className="text-[10px] opacity-70 font-mono mt-0.5">#{slip.orderId.split('-')[1]}</p>
          </button>
        ))}
      </div>

      {/* Main Statement Audit Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs relative overflow-hidden space-y-4">
        {isScanning ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-semibold">{t.auditing}</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-start justify-between pb-3.5 border-b border-slate-100">
              <div>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  currentSlip.platform === 'Zomato' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-orange-50 text-orange-700 border border-orange-200'
                }`}>
                  {currentSlip.platform} Trip Payout
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1.5">{currentSlip.restaurant}</h3>
                <p className="text-xs text-slate-500">{currentSlip.customerLoc}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-semibold">{t.settled}</span>
                <span className={`text-xl font-extrabold font-mono ${currentSlip.totalPaid < 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                  ₹{currentSlip.totalPaid}
                </span>
                <span className="text-[10px] text-slate-500 font-mono block font-medium">{t.expected}{currentSlip.expectedFairPay}</span>
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>{t.basePay}</span>
                <span className="font-mono text-slate-900 font-bold">₹{currentSlip.basePay}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>{t.distancePay} ({currentSlip.recordedDistanceKm} {t.recorded})</span>
                <span className="font-mono text-slate-900 font-bold">₹{currentSlip.distancePay || 0}</span>
              </div>

              {currentSlip.peakSurgeLogged !== undefined && (
                <div className="flex justify-between text-slate-600">
                  <span>{t.weatherSurge}</span>
                  <span className="font-mono text-rose-600 font-bold">
                    ₹{currentSlip.peakSurgeLogged} <span className="text-slate-400 font-normal">{t.expectedSurge}</span>
                  </span>
                </div>
              )}

              {currentSlip.penaltyDeduction && (
                <div className="flex justify-between text-rose-600 font-bold">
                  <span>{currentSlip.penaltyReason}</span>
                  <span className="font-mono">₹{currentSlip.penaltyDeduction}</span>
                </div>
              )}
            </div>

            {/* Audit Anomaly Alert */}
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 space-y-2 text-rose-900">
              <div className="flex items-center gap-2 text-xs font-bold">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{t.underpayDetected} ₹{currentSlip.underpaidAmount} {t.shortchanged}</span>
              </div>
              <div className="space-y-1 pl-6 text-xs text-slate-700">
                {getFlags(currentSlip).map((flag, idx) => (
                  <p key={idx} className="leading-relaxed opacity-90">• {flag}</p>
                ))}
              </div>
            </div>

            {/* 1-Click Appeal Action */}
            <button
              type="button"
              onClick={() => onDraftDispute(currentSlip)}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-xs min-h-[44px] cursor-pointer active:scale-95"
            >
              <span>{t.draftAppeal}{currentSlip.underpaidAmount} {t.recover}</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
