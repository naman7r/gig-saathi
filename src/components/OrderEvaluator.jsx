import React, { useState } from 'react';
import { INCOMING_ORDER_SCENARIOS } from '../data/mockData';
import { Navigation, Clock, Fuel, ArrowRight, XCircle, CheckCircle } from 'lucide-react';

const TRANSLATIONS = {
  hinglish: {
    mins: 'मिनट',
    offeredPayout: 'ऑफर पेआउट',
    pickup: 'पिकअप (Pickup)',
    dropoff: 'ड्रॉप (Dropoff)',
    totalDistance: 'रास्ते की कुल दूरी',
    drop: 'किमी ड्रॉप',
    emptyReturn: 'किमी खाली वापसी',
    estimatedFuel: 'पेट्रोल खर्च (@ ₹2.6/किमी)',
    realNet: 'जेब में असली बचत',
    effectiveRate: 'प्रति घंटा असली दर',
    belowMin: '(घाटा है!)',
    recDecline: 'सलाह: यह ऑर्डर मत लो (घाटा है)',
    recAccept: 'सलाह: तुरंत ले लो (बढ़िया कमाई)',
    declineBtn: 'ऑर्डर छोड़ो (Decline)',
    acceptBtn: 'ऑर्डर ले लो (Accept)',
    activePings: 'नये ऑर्डर्स (Active Requests):',
    alertDeclined: 'ऑर्डर छोड़ दिया। आपने ₹39 का खाली वापसी पेट्रोल बचा लिया!',
    alertAccepted: 'ऑर्डर स्वीकार किया। जीपीएस माइलेज और ईंधन ट्रैकिंग सक्रिय है।'
  },
  hi: {
    mins: 'मिनट',
    offeredPayout: 'प्रस्तावित राशि',
    pickup: 'पिकअप',
    dropoff: 'ड्रॉप',
    totalDistance: 'कुल दूरी (वापसी सहित)',
    drop: 'किमी ड्रॉप',
    emptyReturn: 'किमी खाली वापसी',
    estimatedFuel: 'ईंधन व्यय (@ ₹2.6/किमी)',
    realNet: 'शुद्ध जेब बचत',
    effectiveRate: 'प्रति घंटा शुद्ध दर',
    belowMin: '(घाटे का सौदा)',
    recDecline: 'सलाह: यह ऑर्डर अस्वीकार करें',
    recAccept: 'सलाह: तुरंत स्वीकार करें',
    declineBtn: 'अस्वीकार करें',
    acceptBtn: 'स्वीकार करें',
    activePings: 'सक्रिय ऑर्डर अनुरोध:',
    alertDeclined: 'ऑर्डर अस्वीकृत। आपने ₹39 का खाली वापसी ईंधन व्यय बचा लिया!',
    alertAccepted: 'ऑर्डर स्वीकृत। जीपीएस माइलेज एवं ईंधन ट्रैकिंग सक्रिय।'
  },
  en: {
    mins: 'mins',
    offeredPayout: 'Offered Payout',
    pickup: 'Pickup Location',
    dropoff: 'Dropoff Destination',
    totalDistance: 'Total Route (with Return)',
    drop: 'km drop',
    emptyReturn: 'km empty return',
    estimatedFuel: 'Estimated Fuel (@ ₹2.6/km)',
    realNet: 'Real Net in Pocket',
    effectiveRate: 'Effective hourly yield',
    belowMin: '(below minimum wage)',
    recDecline: 'Recommendation: Decline this trip',
    recAccept: 'Recommendation: High-yield order — Accept',
    declineBtn: 'Decline Trip',
    acceptBtn: 'Accept Trip',
    activePings: 'Active Delivery Requests:',
    alertDeclined: 'Trip declined. You saved ₹39 in deadhead return fuel!',
    alertAccepted: 'Trip accepted. GPS mileage & fuel logging active.'
  }
};

export default function OrderEvaluator({ currentLang = 'hinglish', onNotify }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const order = INCOMING_ORDER_SCENARIOS[selectedIdx];
  const isSkip = order.verdict === 'SKIP';

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const getReason = (ord) => {
    if (currentLang === 'en') return ord.reason;
    if (currentLang === 'hi') {
      if (ord.id === 'ord-1') return 'खरड़ से 6.5 किमी खाली वापसी में कमाई का 74% ईंधन में नष्ट होगा। शुद्ध दर केवल ₹19/घंटा है। कृपया प्रतीक्षा करें।';
      if (ord.id === 'ord-2') return 'न्यूनतम वापसी दूरी एवं ₹25 वर्षा भत्ता। ₹166/घंटा शुद्ध आय। तुरंत स्वीकार करने हेतु अनुशंसित।';
      if (ord.id === 'ord-3') return '₹20 वर्षा सर्ज के साथ संतुलित ऑर्डर। ईंधन व्यय के पश्चात उत्कृष्ट शुद्ध लाभ।';
    }
    // Hinglish
    if (ord.id === 'ord-1') return '6.5 किमी खाली वापसी में 74% पैसा पेट्रोल में जल जाएगा। सिर्फ ₹19/घंटा बचेगा। 3 मिनट रुको, सेक्टर 22 का अच्छा ऑर्डर आएगा।';
    if (ord.id === 'ord-2') return 'पास की दूरी और ₹25 का सर्ज बोनस! ₹166/घंटा असली कमाई बनेगी। तुरंत ले लो भाई!';
    if (ord.id === 'ord-3') return 'बारिश का ₹20 सर्ज मिल रहा है और वापसी की दूरी कम है। यह बढ़िया मुनाफे का ऑर्डर है।';
    return ord.reason;
  };

  return (
    <div className="space-y-4 text-slate-800 antialiased">
      {/* Active Trip Analysis Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs relative overflow-hidden">
        {/* Platform & Timing Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
              order.platform === 'Zomato'
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-orange-50 text-orange-700 border border-orange-200'
            }`}>
              {order.platform}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {order.estimatedMinutes} {t.mins}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-semibold">{t.offeredPayout}</span>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
              ₹{order.offeredPayout}
            </span>
          </div>
        </div>

        {/* Route Details */}
        <div className="py-3.5 space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center mt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
              <div className="w-0.5 h-7 bg-slate-200 my-1" />
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-4 ring-rose-100" />
            </div>

            <div className="flex-1 space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t.pickup}</span>
                <p className="font-bold text-slate-900 text-sm">{order.restaurant}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t.dropoff}</span>
                <p className="font-bold text-slate-900 text-sm">{order.dropLocation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Breakdown Grid */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <Navigation className="w-3.5 h-3.5 text-slate-400" />
              {t.totalDistance}
            </span>
            <span className="font-mono text-slate-800 font-bold">
              {order.oneWayDistanceKm} {t.drop} + <span className="text-rose-600">{order.deadheadReturnKm} {t.emptyReturn}</span>
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <Fuel className="w-3.5 h-3.5 text-amber-500" />
              {t.estimatedFuel}
            </span>
            <span className="font-mono text-rose-600 font-bold">-₹{order.realFuelCost.toFixed(1)}</span>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
            <div>
              <span className="text-xs text-slate-500 block font-bold">{t.realNet}</span>
              <span className="text-[11px] text-slate-400">{t.effectiveRate}</span>
            </div>
            <div className="text-right">
              <span className={`text-xl font-extrabold font-mono block ${isSkip ? 'text-rose-600' : 'text-emerald-600'}`}>
                ₹{order.netProfit.toFixed(1)}
              </span>
              <span className={`text-xs font-mono font-bold ${isSkip ? 'text-rose-600' : 'text-emerald-600'}`}>
                ₹{order.effectiveHourlyRate.toFixed(1)}/hr {isSkip && t.belowMin}
              </span>
            </div>
          </div>
        </div>

        {/* Recommendation Banner */}
        <div className={`mt-3.5 rounded-2xl p-3.5 border text-xs flex items-start gap-2.5 ${
          isSkip
            ? 'bg-rose-50 border-rose-200 text-rose-900'
            : 'bg-emerald-50 border-emerald-200 text-emerald-900'
        }`}>
          {isSkip ? (
            <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          )}
          <div className="space-y-0.5">
            <p className="font-extrabold tracking-tight text-xs">
              {isSkip ? t.recDecline : t.recAccept}
            </p>
            <p className="text-[11px] leading-relaxed opacity-90">
              {getReason(order)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mt-3.5">
          <button
            type="button"
            onClick={() => {
              if (onNotify) {
                onNotify(t.alertDeclined, 'info');
              }
            }}
            className="py-2.5 px-3 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 active:scale-95"
          >
            {t.declineBtn}
          </button>

          <button
            type="button"
            onClick={() => {
              if (onNotify) {
                onNotify(t.alertAccepted, 'success');
              }
            }}
            className="py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer bg-slate-900 hover:bg-slate-800 text-white shadow-xs active:scale-95"
          >
            <span>{t.acceptBtn}</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* Incoming Requests Switcher */}
      <div className="space-y-2 pt-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
          {t.activePings}
        </span>
        <div className="grid grid-cols-3 gap-2">
          {INCOMING_ORDER_SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => setSelectedIdx(idx)}
              className={`p-2.5 rounded-2xl border text-left transition-all ${
                selectedIdx === idx
                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-medium">
                <span className="font-bold">{sc.platform}</span>
                <span className={sc.verdict === 'ACCEPT' ? 'text-emerald-400 font-extrabold' : 'text-rose-400 font-extrabold'}>
                  {sc.verdict === 'ACCEPT' ? (currentLang === 'hi' ? 'लाभ' : currentLang === 'hinglish' ? 'फ़ायदा' : 'ACCEPT') : (currentLang === 'hi' ? 'हानि' : currentLang === 'hinglish' ? 'घाटा' : 'SKIP')}
                </span>
              </div>
              <p className="text-xs font-bold truncate mt-1">{sc.restaurant.split('(')[0]}</p>
              <p className="text-[10px] opacity-75 font-mono mt-0.5">₹{sc.offeredPayout} • {sc.oneWayDistanceKm}km</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
