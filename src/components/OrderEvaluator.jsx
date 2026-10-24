import React, { useState } from 'react';
import { INCOMING_ORDER_SCENARIOS } from '../data/mockData';
import { Zap, AlertOctagon, CheckCircle2, TrendingUp, Navigation, Clock, Fuel, Sparkles, ArrowRight } from 'lucide-react';

export default function OrderEvaluator() {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const order = INCOMING_ORDER_SCENARIOS[selectedScenarioIndex];

  return (
    <div className="space-y-4">
      {/* Feature Header Card */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                "Accept or Skip?" Order Evaluator
                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                  LIVE WOW MOMENT
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Calculates real fuel, deadhead empty return km & true take-home before you accept.
              </p>
            </div>
          </div>
        </div>

        {/* Order Selector Chips */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/80">
          {INCOMING_ORDER_SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => setSelectedScenarioIndex(idx)}
              className={`p-2 rounded-xl text-left border transition-all ${
                selectedScenarioIndex === idx
                  ? 'bg-amber-500/15 border-amber-500/50 shadow-sm shadow-amber-500/10'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className={sc.platform === 'Zomato' ? 'text-red-400' : 'text-orange-400'}>
                  {sc.platform}
                </span>
                <span className={`text-[10px] px-1 rounded ${
                  sc.verdict === 'ACCEPT' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {sc.verdict}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-200 mt-1 truncate">{sc.title}</p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">₹{sc.offeredPayout} • {sc.oneWayDistanceKm}km</p>
            </button>
          ))}
        </div>
      </div>

      {/* Live Order Incoming Cockpit */}
      <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl p-4 shadow-xl relative overflow-hidden">
        {/* Glow border according to verdict */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${
          order.verdict === 'ACCEPT' ? 'bg-emerald-500' : 'bg-red-500'
        }`} />

        {/* Order Banner */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${
                order.platform === 'Zomato' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
              }`}>
                {order.platform} Ping
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3" /> {order.estimatedMinutes} mins
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 mt-1">{order.restaurant}</h3>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <Navigation className="w-3 h-3 text-slate-500" />
              <span>Drop: <strong className="text-slate-200">{order.dropLocation}</strong></span>
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 font-medium">Offered Gross</span>
            <div className="text-2xl font-black text-slate-100 font-mono tracking-tight">
              ₹{order.offeredPayout}
            </div>
            <span className="text-[11px] text-slate-400 font-mono">{order.oneWayDistanceKm} km one-way</span>
          </div>
        </div>

        {/* The Truth Deconstruction Table (The Magic Comparison) */}
        <div className="mt-4 bg-slate-950/80 rounded-xl p-3 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
            <span className="font-semibold text-slate-300">Metric Under the Hood</span>
            <span className="font-semibold text-slate-300">Rider Reality</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Navigation className="w-3.5 h-3.5 text-blue-400" /> Total Riding Distance
            </span>
            <span className="font-mono text-slate-200 font-medium">
              {order.oneWayDistanceKm}km drop + <span className="text-red-400 font-bold">{order.deadheadReturnKm}km deadhead</span> = {order.totalDistanceKm}km
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Fuel className="w-3.5 h-3.5 text-amber-400" /> Fuel Expense (@ ₹2.6/km)
            </span>
            <span className="font-mono text-red-400 font-bold">
              -₹{order.realFuelCost.toFixed(1)}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Bike Wear & Oil Buffer</span>
            <span className="font-mono text-slate-400">-₹{order.bikeWearCost.toFixed(1)}</span>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-sm">
            <span className="font-bold text-slate-200">Real Take-Home Net Profit</span>
            <span className={`font-black font-mono text-base ${
              order.netProfit > 30 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              ₹{order.netProfit.toFixed(1)}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Effective Hourly Earning</span>
            <span className={`font-black font-mono ${
              order.effectiveHourlyRate >= 85 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              ₹{order.effectiveHourlyRate.toFixed(1)} / hr {order.effectiveHourlyRate < 85 && '(Below ₹85 Living Wage!)'}
            </span>
          </div>
        </div>

        {/* AI Recommendation Banner */}
        <div className={`mt-4 rounded-xl p-3 border flex items-start gap-3 ${
          order.verdict === 'ACCEPT'
            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
            : 'bg-red-950/40 border-red-500/50 text-red-200'
        }`}>
          {order.verdict === 'ACCEPT' ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertOctagon className="w-6 h-6 text-red-400 shrink-0 mt-0.5 animate-pulse" />
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                order.verdict === 'ACCEPT' ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'
              }`}>
                AI Verdict: {order.verdict}
              </span>
              <span className="text-xs font-bold">
                {order.verdict === 'ACCEPT' ? 'High Profit Yield' : 'Exploitative Trip Detected'}
              </span>
            </div>
            <p className="text-xs mt-1.5 leading-relaxed text-slate-300">
              {order.reason}
            </p>
          </div>
        </div>

        {/* Decision CTAs */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={() => alert(`Skipped! AI logged deadhead route avoidance. Your fuel savings: ₹${order.realFuelCost.toFixed(0)} saved.`)}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              order.verdict === 'SKIP'
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 ring-2 ring-red-400'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <span>Skip Order (Decline)</span>
          </button>

          <button
            onClick={() => alert(`Order Accepted! AI is tracking trip mileage (${order.totalDistanceKm} km) and fuel burn for tonight's audit log.`)}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              order.verdict === 'ACCEPT'
                ? 'bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <span>Accept Trip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
