import React, { useState } from 'react';
import { Sun, HeartPulse, Moon, AlertTriangle, Coffee, PhoneCall } from 'lucide-react';
import { RIDER_PROFILE } from '../data/mockData';

export default function SafetyGuardian() {
  const [checklist, setChecklist] = useState({
    helmet: true,
    vest: true,
    lights: false,
    phoneCharge: true
  });
  const [sosActive, setSosActive] = useState(false);

  const toggleCheck = (k) => {
    setChecklist(p => ({ ...p, [k]: !p[k] }));
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Health & Safety</span>
          <h3 className="text-sm font-bold text-zinc-200 mt-0.5">Fatigue & Road Risk Guard</h3>
        </div>
        <span className="text-xs bg-amber-500/15 text-amber-400 border border-amber-500/25 px-2.5 py-1 rounded-full font-mono font-bold">
          7.5h Logged
        </span>
      </div>

      {/* Fatigue Warning */}
      <div className="bg-zinc-950/70 rounded-2xl p-4 border border-zinc-800/80 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-300 font-semibold">Continuous Riding Telemetry</span>
          <span className="text-amber-400 font-mono font-bold">75% of safe limit</span>
        </div>

        <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden">
          <div className="bg-amber-400 h-full rounded-full transition-all" style={{ width: '75%' }} />
        </div>

        <p className="text-[11px] text-zinc-400 leading-relaxed pt-1">
          Riding beyond 7 hours continuous slows emergency braking reaction times by 40%. A 15-minute rest break in the shade is strongly recommended before dinner surge.
        </p>
      </div>

      {/* Pre-Ride Checklist */}
      <div className="space-y-2">
        <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block px-1">
          Night shift safety checklist:
        </span>
        <div className="space-y-1.5 text-xs">
          {[
            { key: 'helmet', label: 'ISI Certified Helmet Strap Locked Tight' },
            { key: 'vest', label: 'Reflective High-Vis Vest On' },
            { key: 'lights', label: 'Bike Headlight & Red Tail Light Clean' },
            { key: 'phoneCharge', label: 'Phone Battery > 50%' }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => toggleCheck(item.key)}
              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                checklist[item.key]
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                  : 'bg-zinc-950/60 border-zinc-800/60 text-zinc-400'
              }`}
            >
              <span>{item.label}</span>
              <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                checklist[item.key] ? 'bg-emerald-500 text-black' : 'border border-zinc-700 text-transparent'
              }`}>
                ✓
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
