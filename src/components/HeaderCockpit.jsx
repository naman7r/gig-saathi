import React, { useState } from 'react';
import { AlertTriangle, Battery, Wifi, PhoneCall, Globe } from 'lucide-react';
import { RIDER_PROFILE } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

export default function HeaderCockpit({ activeTab, setActiveTab, currentLang, setCurrentLang }) {
  const [sosActive, setSosActive] = useState(false);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const languages = [
    { code: 'hinglish', label: 'Hinglish' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ' },
    { code: 'en', label: 'English' }
  ];

  return (
    <header className="border-b border-slate-800 bg-[#0B0F19]/90 backdrop-blur sticky top-0 z-40">
      {/* Top micro-bar: System status & Extreme Weather alert */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-3 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-amber-400 font-medium truncate max-w-[70%]">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 animate-pulse text-amber-400" />
          <span className="truncate">{t.heatAlert}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px] shrink-0">
          <span className="flex items-center gap-1"><Wifi className="w-3 h-3 text-emerald-400" /> 4G</span>
          <span className="flex items-center gap-1"><Battery className="w-3 h-3 text-amber-400" /> 72%</span>
        </div>
      </div>

      {/* Main Rider Identity Header */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-xl shadow-lg shadow-amber-500/20 border border-amber-400/30">
              🛵
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0B0F19] rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-slate-100 text-base leading-tight tracking-tight flex items-center gap-1.5">
                {t.appName} <span className="text-amber-400 font-extrabold text-xs bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/30">साथी</span>
              </h1>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded font-mono">v3.0</span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>{RIDER_PROFILE.name}</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-medium">★ {RIDER_PROFILE.rating}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Zomato + Swiggy</span>
            </p>
          </div>
        </div>

        {/* Right side: Language Switcher & SOS */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-lg p-0.5 text-[10px] font-bold">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setCurrentLang(l.code)}
                className={`px-1.5 py-1 rounded transition-all ${
                  currentLang === l.code
                    ? 'bg-amber-500 text-black shadow-sm font-extrabold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* SOS Button */}
          <button
            onClick={() => setSosActive(!sosActive)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md shrink-0 ${
              sosActive
                ? 'bg-red-600 text-white animate-bounce'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <PhoneCall className={`w-3.5 h-3.5 ${sosActive ? 'text-white' : 'text-red-400'}`} />
            <span className="text-[11px]">{sosActive ? 'SOS Dialing...' : 'SOS'}</span>
          </button>
        </div>
      </div>

      {/* SOS Alert Modal if active */}
      {sosActive && (
        <div className="bg-red-950/80 border-y border-red-500/40 p-3 mx-3 mb-2 rounded-lg text-xs text-red-200 flex items-center justify-between">
          <div>
            <p className="font-bold text-red-100">Emergency Protocol Triggered</p>
            <p className="text-[11px] text-red-300">Live GPS location shared with emergency contacts (112 & Team Leads).</p>
          </div>
          <button
            onClick={() => setSosActive(false)}
            className="bg-red-800 hover:bg-red-700 text-white px-2.5 py-1 rounded text-[11px] font-bold"
          >
            Cancel
          </button>
        </div>
      )}
    </header>
  );
}
