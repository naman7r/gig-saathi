import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, PhoneCall } from 'lucide-react';
import { RIDER_PROFILE } from '../data/mockData';

export default function HeaderCockpit({ currentLang, setCurrentLang }) {
  const [sosActive, setSosActive] = useState(false);

  const languages = [
    { code: 'hinglish', label: 'Hinglish' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'en', label: 'English' }
  ];

  return (
    <header className="px-5 pt-4 pb-3 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-30 space-y-3">
      {/* Primary Nav Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-lg shadow-md shadow-amber-500/20">
            🛵
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-zinc-100 text-sm tracking-tight">GigSaathi</h1>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-zinc-400 font-medium">
              {RIDER_PROFILE.name} • {RIDER_PROFILE.city.split('(')[0]}
            </p>
          </div>
        </div>

        {/* Right actions: Language pill + SOS */}
        <div className="flex items-center gap-2">
          {/* Segmented language pill */}
          <div className="flex bg-zinc-900 border border-zinc-800 rounded-full p-0.5 text-[11px] font-medium">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setCurrentLang(l.code)}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  currentLang === l.code
                    ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* SOS button */}
          <button
            onClick={() => setSosActive(!sosActive)}
            className={`p-2 rounded-full border transition-all ${
              sosActive
                ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-rose-400'
            }`}
            title="Emergency SOS"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subtle Environmental / Heat Warning Pill */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2 flex items-center justify-between text-xs text-amber-300">
        <div className="flex items-center gap-2 truncate">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate text-[11px] font-medium">38°C Heatwave in Chandigarh • Take hydration break in 15m</span>
        </div>
        <span className="text-[10px] font-mono text-amber-400/80 font-bold shrink-0">Sec 35</span>
      </div>

      {/* SOS Active Banner if triggered */}
      {sosActive && (
        <div className="bg-rose-950/90 border border-rose-500/40 rounded-xl p-3 text-xs text-rose-200 flex items-center justify-between animate-fadeIn">
          <div>
            <p className="font-bold text-rose-100">Emergency Protocol Active</p>
            <p className="text-[11px] text-rose-300">GPS location shared with 112 emergency services.</p>
          </div>
          <button
            onClick={() => setSosActive(false)}
            className="bg-rose-800 hover:bg-rose-700 text-white px-2 py-1 rounded-lg text-[10px] font-bold"
          >
            Cancel
          </button>
        </div>
      )}
    </header>
  );
}
