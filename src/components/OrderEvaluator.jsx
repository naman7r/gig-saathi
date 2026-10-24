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

export default function OrderEvaluator({ currentLang = 'hinglish' }) {
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
    <div className="space-y-4">
      {/* Active Trip Analysis Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Subtle accent glow */}
        <div
          className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none ${
            isSkip ? 'bg-rose-500' : 'bg-emerald-500'
          }`}
        />

        {/* Platform & Timing Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              order.platform === 'Zomato'
                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                : 'bg-orange-500/15 text-orange-400 border border-orange-500/20'
            }`}>
              {order.platform}
            </span>
            <span className="text-xs text-zinc-400 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              {order.estimatedMinutes} {t.mins}
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs text-zinc-500 block">{t.offeredPayout}</span>
            <span className="text-2xl font-bold text-zinc-100 tracking-tight font-mono">
              ₹{order.offeredPayout}
            </span>
          </div>
        </div>

        {/* Route Details */}
        <div className="py-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center mt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" />
              <div className="w-0.5 h-7 bg-zinc-700/80 my-1" />
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400 ring-4 ring-rose-500/20" />
            </div>

            <div className="flex-1 space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider block">{t.pickup}</span>
                <p className="font-semibold text-zinc-200 text-sm">{order.restaurant}</p>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider block">{t.dropoff}</span>
                <p className="font-semibold text-zinc-200 text-sm">{order.dropLocation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Breakdown Grid */}
        <div className="bg-zinc-950/70 rounded-2xl p-4 border border-zinc-800/80 space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-zinc-500" />
              {t.totalDistance}
            </span>
            <span className="font-mono text-zinc-200 font-medium">
              {order.oneWayDistanceKm} {t.drop} + <span className="text-rose-400">{order.deadheadReturnKm} {t.emptyReturn}</span>
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-amber-500" />
              {t.estimatedFuel}
            </span>
            <span className="font-mono text-rose-400 font-semibold">-₹{order.realFuelCost.toFixed(1)}</span>
          </div>

          <div className="pt-2 border-t border-zinc-800/80 flex justify-between items-baseline">
            <div>
              <span className="text-xs text-zinc-400 block font-medium">{t.realNet}</span>
              <span className="text-[11px] text-zinc-500">{t.effectiveRate}</span>
            </div>
            <div className="text-right">
              <span className={`text-lg font-bold font-mono block ${isSkip ? 'text-rose-400' : 'text-emerald-400'}`}>
                ₹{order.netProfit.toFixed(1)}
              </span>
              <span className={`text-xs font-mono font-semibold ${isSkip ? 'text-rose-400' : 'text-emerald-400'}`}>
                ₹{order.effectiveHourlyRate.toFixed(1)}/hr {isSkip && t.belowMin}
              </span>
            </div>
          </div>
        </div>

        {/* Recommendation Banner */}
        <div className={`mt-4 rounded-2xl p-3.5 border text-xs flex items-start gap-3 ${
          isSkip
            ? 'bg-rose-500/10 border-rose-500/25 text-rose-200'
            : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-200'
        }`}>
          {isSkip ? (
            <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <p className="font-bold tracking-tight">
              {isSkip ? t.recDecline : t.recAccept}
            </p>
            <p className="text-[11px] text-zinc-300 leading-relaxed opacity-90">
              {getReason(order)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            type="button"
            onClick={() => alert(t.alertDeclined)}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
              isSkip
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
            }`}
          >
            {t.declineBtn}
          </button>

          <button
            type="button"
            onClick={() => alert(t.alertAccepted)}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer ${
              !isSkip
                ? 'bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold shadow-lg shadow-emerald-500/20'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
            }`}
          >
            <span>{t.acceptBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Incoming Requests Switcher */}
      <div className="space-y-2 pt-1">
        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-1">
          {t.activePings}
        </span>
        <div className="grid grid-cols-3 gap-2">
          {INCOMING_ORDER_SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => setSelectedIdx(idx)}
              className={`p-2.5 rounded-2xl border text-left transition-all ${
                selectedIdx === idx
                  ? 'bg-zinc-800/90 border-zinc-600 text-zinc-100 shadow-sm'
                  : 'bg-zinc-950/60 border-zinc-800/60 hover:border-zinc-700 text-zinc-400'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-medium">
                <span>{sc.platform}</span>
                <span className={sc.verdict === 'ACCEPT' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {sc.verdict === 'ACCEPT' ? (currentLang === 'hi' ? 'लाभ' : currentLang === 'hinglish' ? 'फ़ायदा' : 'ACCEPT') : (currentLang === 'hi' ? 'हानि' : currentLang === 'hinglish' ? 'घाटा' : 'SKIP')}
                </span>
              </div>
              <p className="text-xs font-semibold text-zinc-200 mt-1 truncate">{sc.restaurant.split('(')[0]}</p>
              <p className="text-[10px] text-zinc-500 font-mono mt-0.5">₹{sc.offeredPayout} • {sc.oneWayDistanceKm}km</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
