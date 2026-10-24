import React, { useState, useEffect } from 'react';
import { 
  Sun, HeartPulse, AlertTriangle, Droplets, 
  CloudRain, Wind, Thermometer, Plus, Minus, Check, Clock, RefreshCw, ShieldAlert
} from 'lucide-react';

export default function SafetyGuardian() {
  const [checklist, setChecklist] = useState({
    helmet: true,
    vest: true,
    lights: false,
    phoneCharge: true
  });
  
  // Hydration State
  const [waterGlasses, setWaterGlasses] = useState(5); // 5 of 8 glasses
  const [secondsLeft, setSecondsLeft] = useState(840); // 14 mins remaining
  const [timerActive, setTimerActive] = useState(true);

  // Forecast Timeline
  const hourlyForecast = [
    { time: 'Now', temp: '38°C', condition: 'Heatwave', rainRisk: '0%', surge: null },
    { time: '2 PM', temp: '39°C', condition: 'Peak Sun', rainRisk: '5%', surge: null },
    { time: '4 PM', temp: '36°C', condition: 'Partly Cloudy', rainRisk: '25%', surge: null },
    { time: '6 PM', temp: '32°C', condition: 'Scattered Drizzle', rainRisk: '65%', surge: '+₹20 Surge' },
    { time: '8 PM', temp: '29°C', condition: 'Rain Rush', rainRisk: '85%', surge: '+₹30 Surge' },
    { time: '10 PM', temp: '27°C', condition: 'Night Breeze', rainRisk: '20%', surge: null },
  ];

  // Hydration countdown ticker
  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 900));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddWater = () => {
    if (waterGlasses < 12) {
      setWaterGlasses(prev => prev + 1);
      setSecondsLeft(900); // reset to 15 mins
    }
  };

  const handleMinusWater = () => {
    if (waterGlasses > 0) {
      setWaterGlasses(prev => prev - 1);
    }
  };

  const toggleCheck = (k) => {
    setChecklist(p => ({ ...p, [k]: !p[k] }));
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-5 text-slate-800">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block font-mono">
            Rider Telemetry & Health
          </span>
          <h3 className="text-sm font-bold text-slate-900 mt-0.5">Weather & Hydration Guardian</h3>
        </div>
        <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full font-mono font-bold flex items-center gap-1.5">
          <Thermometer className="w-3.5 h-3.5 text-amber-600" />
          <span>38°C Chandigarh</span>
        </span>
      </div>

      {/* 1. CURRENT TEMPERATURE & HEATWAVE TELEMETRY */}
      <div className="bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 rounded-2xl p-4 border border-amber-200 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-600 font-mono">38°C</span>
              <span className="text-xs text-slate-500 font-medium">Feels like <strong className="text-amber-700">42°C</strong></span>
            </div>
            <p className="text-xs font-semibold text-slate-800 mt-0.5 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Extreme Heat Index in Sector 35 Hub</span>
            </p>
          </div>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            Orange Heat Alert
          </span>
        </div>

        {/* Climate Metrics Chips */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="bg-white p-2 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 block">Humidity</span>
            <span className="text-xs font-bold text-slate-800 font-mono">48%</span>
          </div>
          <div className="bg-white p-2 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 block">Wind (NW)</span>
            <span className="text-xs font-bold text-slate-800 font-mono">14 km/h</span>
          </div>
          <div className="bg-white p-2 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 block">Air Quality</span>
            <span className="text-xs font-bold text-amber-700 font-mono">142 AQI</span>
          </div>
        </div>
      </div>

      {/* 2. LIVE HYDRATION TRACKER WITH COUNTDOWN */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Hydration Interval Guard</h4>
              <p className="text-[11px] text-slate-500">Target: 250ml every 30m of riding</p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-1 rounded-lg flex items-center gap-1">
              <Clock className="w-3 h-3 text-blue-600" />
              <span>{formatTimer(secondsLeft)}</span>
            </span>
            <span className="text-[9px] text-slate-500 block mt-0.5">next water break</span>
          </div>
        </div>

        {/* Water Intake Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700 font-medium">Daily Water Logged</span>
            <span className="font-mono font-bold text-blue-700">
              {waterGlasses} / 8 Glasses ({waterGlasses * 250} ml)
            </span>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden p-0.5">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(100, Math.round((waterGlasses / 8) * 100))}%` }} 
            />
          </div>
        </div>

        {/* Intake Controller Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button 
            onClick={handleAddWater}
            className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Drank 1 Glass (+250ml)</span>
          </button>
          
          <button 
            onClick={handleMinusWater}
            title="Decrease 1 glass"
            className="w-9 h-9 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center rounded-xl text-xs transition-colors cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <button 
            onClick={() => setSecondsLeft(900)}
            title="Reset 15-minute countdown"
            className="w-9 h-9 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center rounded-xl text-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. HOURLY WEATHER FORECAST TIMELINE */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Shift Weather Forecast (Chandigarh / Mohali)
          </span>
          <span className="text-[10px] text-amber-700 font-semibold font-mono flex items-center gap-1">
            <CloudRain className="w-3 h-3 text-blue-500" />
            <span>Rain Surge at 6 PM</span>
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {hourlyForecast.map((h, i) => (
            <div 
              key={i} 
              className={`p-2.5 rounded-2xl border text-center transition-all ${
                h.surge 
                  ? 'bg-blue-50/80 border-blue-300 text-blue-900 shadow-xs' 
                  : i === 0 
                    ? 'bg-amber-50/80 border-amber-300 text-amber-900' 
                    : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <span className="text-[10px] font-mono text-slate-500 block">{h.time}</span>
              <div className="my-1 flex items-center justify-center">
                {h.surge ? (
                  <CloudRain className="w-4 h-4 text-blue-600" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
              </div>
              <span className="text-xs font-bold font-mono text-slate-900 block">{h.temp}</span>
              <span className="text-[9px] text-slate-500 block truncate">{h.condition}</span>
              {h.surge && (
                <span className="text-[9px] font-extrabold text-emerald-700 font-mono block mt-1 bg-emerald-50 border border-emerald-200 rounded py-0.5">
                  {h.surge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. FATIGUE TELEMETRY & NIGHT SAFETY CHECKLIST */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-800 font-semibold">Continuous Saddle Telemetry</span>
          <span className="text-amber-700 font-mono font-bold">7.5h of 9h limit (83%)</span>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: '83%' }} />
        </div>

        <p className="text-[11px] text-slate-600 leading-relaxed pt-1">
          Riding in 38°C beyond 7 hours causes micro-fatigue. Resting 15m in shaded hubs restores reaction speed and prevents dehydration cramps.
        </p>
      </div>

      {/* Safety Checklist */}
      <div className="space-y-2">
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block px-1">
          Rider safety checklist:
        </span>
        <div className="space-y-1.5 text-xs">
          {[
            { key: 'helmet', label: 'ISI Certified Helmet Strap Locked Tight' },
            { key: 'vest', label: 'Reflective High-Vis Vest On' },
            { key: 'lights', label: 'Bike Headlight & Red Tail Light Clean' },
            { key: 'phoneCharge', label: 'Phone Battery > 50% & Powerbank Ready' }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => toggleCheck(item.key)}
              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                checklist[item.key]
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 font-medium'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <span>{item.label}</span>
              <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                checklist[item.key] ? 'bg-emerald-600 text-white' : 'border border-slate-300 text-transparent'
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
