import React, { useState } from 'react';
import { ShieldAlert, Sun, CloudRain, HeartPulse, Moon, CheckSquare, PhoneCall, AlertTriangle, Coffee, MapPin, BatteryCharging } from 'lucide-react';
import { RIDER_PROFILE } from '../data/mockData';

export default function SafetyGuardian({ lang = 'hinglish' }) {
  const [hydrationCounter, setHydrationCounter] = useState(18); // minutes left
  const [checklist, setChecklist] = useState({
    helmet: true,
    vest: true,
    lights: false,
    phoneCharge: true,
    restBreakTaken: false
  });
  const [sosActive, setSosActive] = useState(false);

  const toggleCheck = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Safety, Heatwave & Fatigue Guardian
              <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                OFFICIAL PILLAR
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              AI-monitored health alerts, heatstroke warnings, and late-night road risk checks.
            </p>
          </div>
        </div>
      </div>

      {/* Extreme Weather & Hydration Alert */}
      <div className="bg-[#0F172A] border border-amber-500/40 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Sun className="w-5 h-5 animate-spin" style={{ animationDuration: '20s' }} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                Weather Telemetry: Chandigarh Sec 35
              </span>
              <h3 className="text-sm font-bold text-slate-100">Severe Heatwave Warning (38°C)</h3>
            </div>
          </div>
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
            Heat Index: 43°C
          </span>
        </div>

        <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Coffee className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-slate-200">Mandatory Hydration Alarm</p>
              <p className="text-[11px] text-slate-400">Drink 500ml water with ORS/electrolytes to prevent heat cramps.</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-mono font-black text-amber-400">{hydrationCounter}m</span>
            <p className="text-[9px] text-slate-500">countdown</p>
          </div>
        </div>
      </div>

      {/* Fatigue & Continuous Work Monitor */}
      <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              Shift Fatigue Telemetry
            </span>
            <p className="text-xs text-slate-400 mt-0.5">
              Current shift: <strong className="text-slate-200 font-mono">7.5 hours logged</strong> across Zomato & Swiggy.
            </p>
          </div>
          <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
            Moderate Fatigue
          </span>
        </div>

        {/* Fatigue Progress Bar */}
        <div className="space-y-1">
          <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 border border-slate-800 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 h-full rounded-full transition-all"
              style={{ width: '75%' }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0h (Fresh)</span>
            <span className="text-amber-400 font-bold">7.5h (Current)</span>
            <span className="text-red-400 font-bold">10h (High Accident Risk)</span>
          </div>
        </div>

        <div className="bg-orange-950/30 border border-orange-500/40 rounded-xl p-3 text-xs text-slate-300 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
          <span>
            <strong>AI Fatigue Alert:</strong> Over 7 continuous hours on two-wheelers increases braking reaction time by 40%. Pull over for 15 minutes of rest before accepting evening rush orders.
          </span>
        </div>
      </div>

      {/* Night Riding & Road Safety Checklist */}
      <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Pre-Ride & Night Shift Safety Protocol
          </h3>
        </div>

        <div className="space-y-2 text-xs">
          {[
            { key: 'helmet', label: 'ISI Certified Helmet Strap Locked Tight' },
            { key: 'vest', label: 'Reflective High-Vis Vest On (Visible at 100m)' },
            { key: 'lights', label: 'Bike Headlight & Red Tail Light Clean and Functional' },
            { key: 'phoneCharge', label: 'Phone Battery > 50% or Powerbank Connected' },
            { key: 'restBreakTaken', label: '15-min Water and Stretching Break Taken' }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => toggleCheck(item.key)}
              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                checklist[item.key]
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="font-medium">{item.label}</span>
              <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                checklist[item.key] ? 'bg-emerald-500 text-black' : 'border border-slate-700 text-transparent'
              }`}>
                ✓
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Emergency SOS & Police Dispatcher */}
      <div className="bg-red-950/40 border border-red-500/50 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-red-400" />
            <div>
              <h3 className="text-sm font-bold text-red-200">Emergency SOS Protocol</h3>
              <p className="text-[11px] text-red-300">1-Tap Live GPS broadcast to Emergency 112 & Team Leads</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              setSosActive(!sosActive);
              alert("🚨 Live GPS Location coordinates (30.7333° N, 76.7794° E - Sec 35 Chandigarh) dispatched to Emergency Services and Platform Safety Squad.");
            }}
            className="py-2.5 px-3 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-xl text-xs transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{sosActive ? 'Dispatched (Cancel)' : 'Trigger SOS Now'}</span>
          </button>

          <a
            href="tel:112"
            className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 text-center"
          >
            <span>Dial National 112</span>
          </a>
        </div>
      </div>
    </div>
  );
}
