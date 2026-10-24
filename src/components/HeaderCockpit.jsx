import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, PhoneCall, Droplets, Sun, CloudRain, Thermometer, ChevronDown, Plus, Bike } from 'lucide-react';
import { RIDER_PROFILE } from '../data/mockData';

const TRANSLATIONS = {
  hinglish: {
    weatherPill: '38°C धूप (Feels 42°C) • 14 मिनट में पानी पियो • शाम 6 बजे बारिश (+₹20)',
    currentWeather: 'मौसम स्थिति',
    weatherDesc: '38°C तेज धूप',
    stats: '(48% नमी • 142 AQI)',
    surgeForecast: 'बारिश सर्ज अलर्ट',
    surgeTime: 'शाम 6 बजे (+₹20/ऑर्डर)',
    waterIntake: 'पानी की मात्रा:',
    glassesConsumed: 'ml पानी पिया',
    drinkBtn: '250ml पानी पिया',
    sosTitle: 'आपातकालीन सहायता सक्रिय (Emergency Active)',
    sosSub: 'लाइव जीपीएस निर्देशांक तैयार हैं। आपातकालीन नियंत्रण कक्ष को कॉल करें।',
    call112: '112 पर कॉल करें (पुलिस / एम्बुलेंस)',
    cancel: 'रद्द करें'
  },
  hi: {
    weatherPill: '38°C तापमान (महसूस 42°C) • 14 मिनट में जलपान करें • सायं 6 बजे वर्षा (+₹20)',
    currentWeather: 'वर्तमान मौसम',
    weatherDesc: '38°C तीव्र धूप',
    stats: '(48% आर्द्रता • 142 AQI)',
    surgeForecast: 'वर्षा सर्ज पूर्वानुमान',
    surgeTime: 'सायं 6 बजे (+₹20/ऑर्डर)',
    waterIntake: 'जल सेवन मात्रा:',
    glassesConsumed: 'ml जल सेवन',
    drinkBtn: '250ml जल सेवन दर्ज करें',
    sosTitle: 'आपातकालीन सहायता सक्रिय (SOS Protocol)',
    sosSub: 'लाइव जीपीएस स्थिति तैयार है। आपातकालीन सेवा को तुरंत कॉल करें।',
    call112: '112 पर कॉल करें (आपातकाल)',
    cancel: 'रद्द करें'
  },
  en: {
    weatherPill: '38°C (Feels 42°C) • Hydrate in 14m • Rain surge at 6 PM (+₹20)',
    currentWeather: 'Current Weather',
    weatherDesc: '38°C Sunny',
    stats: '(48% Humidity • 142 AQI)',
    surgeForecast: 'Rain Surge Forecast',
    surgeTime: '6:00 PM (+₹20/order)',
    waterIntake: 'Hydration Intake:',
    glassesConsumed: 'ml consumed',
    drinkBtn: 'Drink 250ml',
    sosTitle: 'Emergency SOS Protocol Active',
    sosSub: 'Live GPS telemetry ready. Direct dispatch connect to national emergency services.',
    call112: 'Call 112 (Police / Ambulance)',
    cancel: 'Cancel'
  }
};

export default function HeaderCockpit({ currentLang = 'hinglish', setCurrentLang }) {
  const [sosActive, setSosActive] = useState(false);
  const [weatherExpanded, setWeatherExpanded] = useState(false);
  const [glasses, setGlasses] = useState(5);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const languages = [
    { code: 'hinglish', label: 'Hinglish' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'en', label: 'English' }
  ];

  return (
    <header className="px-4 pt-3.5 pb-3 border-b border-slate-200/90 bg-white/95 backdrop-blur-xl sticky top-0 z-30 space-y-2.5 text-slate-800 shadow-xs">
      {/* Primary Nav Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center shadow-xs ring-1 ring-slate-800 shrink-0">
            <Bike className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-slate-900 text-xs tracking-tight">GigSaathi</h1>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[10px] text-slate-500 font-medium truncate max-w-[150px]">
              {RIDER_PROFILE.name} • {RIDER_PROFILE.city.split('(')[0]}
            </p>
          </div>
        </div>

        {/* Right actions: Language pill + SOS */}
        <div className="flex items-center gap-1.5">
          {/* Segmented language pill */}
          <div className="flex bg-slate-100 border border-slate-200 rounded-full p-0.5 text-[10px] font-medium shadow-inner">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setCurrentLang(l.code)}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  currentLang === l.code
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* SOS button */}
          <button
            onClick={() => setSosActive(!sosActive)}
            className={`p-1.5 rounded-full border transition-all ${
              sosActive
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
            }`}
            title="Emergency SOS"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Weather & Hydration Pill */}
      <button 
        onClick={() => setWeatherExpanded(!weatherExpanded)}
        className="w-full bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200/80 rounded-xl px-3 py-1.5 flex items-center justify-between text-xs text-amber-900 transition-colors cursor-pointer text-left shadow-xs"
      >
        <div className="flex items-center gap-2 truncate">
          <Thermometer className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="truncate text-[11px] font-semibold">
            {t.weatherPill}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-amber-600 shrink-0 transition-transform ${weatherExpanded ? 'rotate-180' : ''}`} />
      </button>

      {/* Expanded Quick Weather & Hydration Mini-Drawer */}
      {weatherExpanded && (
        <div className="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-3 text-xs animate-in fade-in slide-in-from-top-1 text-slate-800 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">{t.currentWeather}</span>
              <span className="text-base font-extrabold text-amber-600 font-mono">{t.weatherDesc}</span>
              <span className="text-[10px] text-slate-500 ml-1.5">{t.stats}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-mono font-bold">{t.surgeForecast}</span>
              <span className="text-xs font-bold text-emerald-600 font-mono">{t.surgeTime}</span>
            </div>
          </div>

          {/* Quick Water Button */}
          <div className="flex items-center justify-between bg-blue-50/60 p-2.5 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <div>
                <span className="font-bold text-slate-800 block text-[11px]">{t.waterIntake} {glasses}/8</span>
                <span className="text-[10px] text-slate-500">{glasses * 250} {t.glassesConsumed}</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (glasses < 12) setGlasses(g => g + 1);
              }}
              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 active:scale-95 shadow-xs"
            >
              <Plus className="w-3 h-3" />
              <span>{t.drinkBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* SOS Active Banner if triggered */}
      {sosActive && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-3.5 text-xs text-rose-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 animate-fadeIn shadow-md">
          <div>
            <p className="font-extrabold text-rose-950 text-sm flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{t.sosTitle}</span>
            </p>
            <p className="text-[11px] text-rose-700 mt-0.5">
              {t.sosSub}
            </p>
          </div>
          
          <div className="flex items-center gap-2 pt-1 sm:pt-0">
            <a
              href="tel:112"
              className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-xs min-h-[44px]"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.call112}</span>
            </a>

            <button
              type="button"
              onClick={() => setSosActive(false)}
              className="px-3 py-2 bg-white border border-rose-200 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-semibold min-h-[44px]"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
