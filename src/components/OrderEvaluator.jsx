import React, { useState } from 'react';
import { INCOMING_ORDER_SCENARIOS } from '../data/mockData';
import { Navigation, Clock, Fuel, ArrowRight, XCircle, CheckCircle, ChevronRight, AlertTriangle } from 'lucide-react';

export default function OrderEvaluator() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const order = INCOMING_ORDER_SCENARIOS[selectedIdx];
  const isSkip = order.verdict === 'SKIP';

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
              {order.estimatedMinutes} mins
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs text-zinc-500 block">Offered Payout</span>
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
                <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider block">Pickup</span>
                <p className="font-semibold text-zinc-200 text-sm">{order.restaurant}</p>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider block">Dropoff</span>
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
              Total distance (with return)
            </span>
            <span className="font-mono text-zinc-200 font-medium">
              {order.oneWayDistanceKm} km drop + <span className="text-rose-400">{order.deadheadReturnKm} km empty</span>
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-amber-500" />
              Estimated fuel (@ ₹2.6/km)
            </span>
            <span className="font-mono text-rose-400 font-semibold">-₹{order.realFuelCost.toFixed(1)}</span>
          </div>

          <div className="pt-2 border-t border-zinc-800/80 flex justify-between items-baseline">
            <div>
              <span className="text-xs text-zinc-400 block font-medium">Real Net Take-Home</span>
              <span className="text-[11px] text-zinc-500">Effective rate</span>
            </div>
            <div className="text-right">
              <span className={`text-lg font-bold font-mono block ${isSkip ? 'text-rose-400' : 'text-emerald-400'}`}>
                ₹{order.netProfit.toFixed(1)}
              </span>
              <span className={`text-xs font-mono font-semibold ${isSkip ? 'text-rose-400' : 'text-emerald-400'}`}>
                ₹{order.effectiveHourlyRate.toFixed(1)}/hr {isSkip && '(below minimum)'}
              </span>
            </div>
          </div>
        </div>

        {/* AI Recommendation Banner */}
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
              {isSkip ? 'Recommendation: Decline this trip' : 'Recommendation: High-yield order — Accept'}
            </p>
            <p className="text-[11px] text-zinc-300 leading-relaxed opacity-90">
              {order.reason}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            type="button"
            onClick={() => alert(`ऑर्डर छोड़ दिया। आपने ₹${order.realFuelCost.toFixed(0)} का खाली वापसी पेट्रोल बचा लिया!`)}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
              isSkip
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
            }`}
          >
            ऑर्डर छोड़ें (Decline)
          </button>

          <button
            type="button"
            onClick={() => alert(`ऑर्डर स्वीकार किया। जीपीएस माइलेज और ईंधन ट्रैकिंग सक्रिय है।`)}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer ${
              !isSkip
                ? 'bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold shadow-lg shadow-emerald-500/20'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
            }`}
          >
            <span>ऑर्डर लें (Accept)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scenario Switcher (Clean, Uncluttered) */}
      <div className="space-y-2 pt-1">
        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider px-1">
          Simulated incoming pings:
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
                  {sc.verdict}
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
