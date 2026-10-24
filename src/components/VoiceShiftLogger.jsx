import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Sparkles, TrendingUp, DollarSign, Fuel, Wrench, AlertCircle, ArrowUpRight } from 'lucide-react';
import { VOICE_SAMPLE_PRESETS, HISTORICAL_SHIFTS } from '../data/mockData';

export default function VoiceShiftLogger() {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState(VOICE_SAMPLE_PRESETS[0].text);
  const [extractedData, setExtractedData] = useState({
    orders: 16,
    grossPayout: 1120,
    fuelExpense: 290,
    bikeWear: 80,
    deductions: 60,
    hours: 10,
    netTakeHome: 690,
    trueHourlyRate: 69.0
  });

  // Simple Hinglish Parser Simulator for live voice / text input
  const parseHinglishInput = (text) => {
    setSpokenText(text);

    // Regex extraction for numbers and keywords
    const ordersMatch = text.match(/(\d+)\s*(order|delivery|orders)/i);
    const grossMatch = text.match(/(₹|rs\.?|inr)?\s*(\d+[\d,]*)\s*(mile|bane|mile hain|rupaye|gross)/i);
    const fuelMatch = text.match(/(₹|rs\.?|inr)?\s*(\d+[\d,]*)\s*(ka|ka petrol|petrol|diesel)/i);
    const penaltyMatch = text.match(/(₹|rs\.?|inr)?\s*(\d+[\d,]*)\s*(ka late penalty|penalty|deduction|fine)/i);
    const hoursMatch = text.match(/(\d+)\s*(ghante|hour|hours|hrs)/i);

    const orders = ordersMatch ? parseInt(ordersMatch[1], 10) : 14;
    const gross = grossMatch ? parseInt(grossMatch[2].replace(',', ''), 10) : (text.includes('390') ? 390 : (text.includes('920') ? 920 : 1120));
    const fuel = fuelMatch ? parseInt(fuelMatch[2].replace(',', ''), 10) : (text.includes('140') ? 140 : (text.includes('210') ? 210 : 290));
    const deductions = penaltyMatch ? parseInt(penaltyMatch[2].replace(',', ''), 10) : (text.includes('60') ? 60 : 0);
    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : (text.includes('4') ? 4 : 10);
    const bikeWear = Math.round(orders * 5); // ₹5 wear per order buffer

    const net = gross - fuel - bikeWear - deductions;
    const hourly = hours > 0 ? parseFloat((net / hours).toFixed(1)) : 0;

    setExtractedData({
      orders,
      grossPayout: gross,
      fuelExpense: fuel,
      bikeWear,
      deductions,
      hours,
      netTakeHome: net,
      trueHourlyRate: hourly
    });
  };

  const handleStartMic = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not natively supported in this browser. You can click any of the 1-tap Hinglish voice presets below!");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN'; // Hindi (India)
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        parseHinglishInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      setIsListening(false);
      alert("Mic permission needed or not available. Use the 1-tap voice presets for instant testing.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Hinglish Voice Shift Logger
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                ZERO-TYPING FRICTION
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Speak naturally in Hindi/Punjabi. AI calculates true take-home after fuel and bike depreciation.
            </p>
          </div>
        </div>

        {/* 1-Tap Preset Chips */}
        <div className="mt-3 pt-3 border-t border-slate-800 space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            1-Tap Voice Simulation Presets:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {VOICE_SAMPLE_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => parseHinglishInput(preset.text)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  spokenText === preset.text
                    ? 'bg-amber-500 text-black font-bold border-amber-400'
                    : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                "{preset.label}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mic Input Cockpit */}
      <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl p-4 shadow-xl space-y-4">
        {/* Active Speech Bar */}
        <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
          <button
            onClick={handleStartMic}
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all ${
              isListening
                ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-500/30'
                : 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-mono text-slate-500">
              {isListening ? 'Listening in Hindi / Punjabi...' : 'Recognized Voice Input:'}
            </p>
            <p className="text-xs text-slate-200 font-medium italic truncate mt-0.5">
              "{spokenText}"
            </p>
          </div>
        </div>

        {/* Real Take-Home Financial Metrics */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400">Gross Platform Payout</span>
            <div className="text-xl font-black font-mono text-slate-100 mt-0.5">
              ₹{extractedData.grossPayout}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">{extractedData.orders} deliveries completed</span>
          </div>

          <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-red-400">Total Operating Expenses</span>
            <div className="text-xl font-black font-mono text-red-400 mt-0.5">
              -₹{extractedData.fuelExpense + extractedData.bikeWear + extractedData.deductions}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">
              ₹{extractedData.fuelExpense} fuel + ₹{extractedData.bikeWear} wear
            </span>
          </div>

          <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/40 col-span-2 flex items-center justify-between">
            <div>
              <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider">
                True Take-Home Net Profit
              </span>
              <div className="text-2xl font-black font-mono text-emerald-400 mt-0.5">
                ₹{extractedData.netTakeHome}
              </div>
              <p className="text-[11px] text-slate-300">
                Effective Hourly Rate: <strong className="font-mono text-emerald-400">₹{extractedData.trueHourlyRate}/hr</strong> ({extractedData.hours} hrs)
              </p>
            </div>

            <div className="text-right">
              <span className={`text-[10px] font-bold px-2 py-1 rounded font-mono ${
                extractedData.trueHourlyRate >= 85 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {extractedData.trueHourlyRate >= 85 ? '✓ Above Living Wage' : '⚠️ Below ₹85 Living Wage'}
              </span>
            </div>
          </div>
        </div>

        {/* Historical Shift Comparison Intelligence */}
        <div className="bg-slate-950/90 rounded-xl p-3 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">
              Shift Comparison Intelligence
            </span>
            <span className="text-[10px] text-amber-400 font-mono">IDinsight Grounded</span>
          </div>

          <div className="space-y-2 text-xs">
            {HISTORICAL_SHIFTS.map((shift) => (
              <div key={shift.id} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-200">{shift.period}</p>
                  <p className="text-[11px] text-slate-400 font-mono">{shift.date} • {shift.orders} orders</p>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-slate-200">₹{shift.netTakeHome} net</div>
                  <div className={`text-[11px] font-mono font-black ${
                    shift.trueHourlyRate > 100 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    ₹{shift.trueHourlyRate}/hr
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-amber-300/90 bg-amber-500/10 p-2 rounded border border-amber-500/20 mt-2">
            💡 <strong>AI Observation:</strong> Dinner shifts net +275% higher true pay per hour because empty idling in heavy afternoon traffic cuts your take-home by half.
          </p>
        </div>
      </div>
    </div>
  );
}
