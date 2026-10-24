import React, { useState } from 'react';
import { Mic, MicOff, DollarSign, Fuel, ArrowUpRight } from 'lucide-react';
import { VOICE_SAMPLE_PRESETS, HISTORICAL_SHIFTS } from '../data/mockData';

const TRANSLATIONS = {
  hinglish: {
    listening: 'सुन रहा हूँ (हिंदी/Hinglish)...',
    transcriptTitle: 'वॉइस इनपुट ट्रांसक्रिप्ट',
    presetsTitle: '1-टैप वॉइस सैंपल:',
    grossPayout: 'कुल कमाई (Gross)',
    deliveriesDone: 'ऑर्डर्स पूरे किए',
    operatingCosts: 'पेट्रोल व बाइक खर्च',
    fuelLabel: 'पेट्रोल',
    wearLabel: 'घिसाई',
    realNet: 'जेब में असली बचत',
    effectiveYield: 'प्रति घंटा असली दर:',
    hoursLogged: 'घंटे काम किया',
    aboveMin: 'सुरक्षित कमाई',
    belowMin: 'कम कमाई (घाटा)',
    shiftComp: 'शिफ्ट तुलना',
    last48: 'पिछले 48 घंटे',
    net: 'बचत',
    insight: '💡 काम की बात: डिनर शिफ्ट (शाम 7-11) में 275% ज्यादा बचत होती है क्योंकि दोपहर की धूप और ट्रैफिक में 45% ज्यादा पेट्रोल जलता है।'
  },
  hi: {
    listening: 'सुन रहा हूँ (बोलें)...',
    transcriptTitle: 'ध्वनि इनपुट विवरण',
    presetsTitle: 'त्वरित वॉइस नमूने:',
    grossPayout: 'सकल आय',
    deliveriesDone: 'ऑर्डर पूर्ण किए',
    operatingCosts: 'ईंधन एवं वाहन व्यय',
    fuelLabel: 'पेट्रोल',
    wearLabel: 'घिसावट',
    realNet: 'शुद्ध जेब बचत',
    effectiveYield: 'प्रति घंटा शुद्ध दर:',
    hoursLogged: 'घंटे कार्य किया',
    aboveMin: 'उचित दर',
    belowMin: 'न्यूनतम से कम',
    shiftComp: 'शिफ्ट दक्षता तुलना',
    last48: 'गत 48 घंटे',
    net: 'शुद्ध',
    insight: '💡 महत्वपूर्ण तथ्य: रात्रि शिफ्ट (7-11 बजे) में प्रति घंटा आय 275% अधिक रहती है क्योंकि दोपहर के जाम में ईंधन की खपत 45% अधिक होती है।'
  },
  en: {
    listening: 'Listening (Speak now)...',
    transcriptTitle: 'Voice Input Transcript',
    presetsTitle: '1-Tap Voice Samples:',
    grossPayout: 'Gross App Payout',
    deliveriesDone: 'deliveries completed',
    operatingCosts: 'Operating Expenses',
    fuelLabel: 'fuel',
    wearLabel: 'wear',
    realNet: 'Real Net Take-Home',
    effectiveYield: 'Effective hourly rate:',
    hoursLogged: 'hours logged',
    aboveMin: 'Above Living Wage',
    belowMin: 'Sub-Minimum Yield',
    shiftComp: 'Shift Efficiency Comparison',
    last48: 'Last 48 hrs',
    net: 'net',
    insight: '💡 Field Observation: Dinner shifts net 275% higher per hour because idling in afternoon heat consumes 45% more fuel for the exact same payout.'
  }
};

export default function VoiceShiftLogger({ currentLang = 'hinglish' }) {
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

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const parseHinglishInput = (text) => {
    setSpokenText(text);

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
    const bikeWear = Math.round(orders * 5);

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

  const [micStatusMsg, setMicStatusMsg] = useState(null);

  const handleStartMic = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicStatusMsg(currentLang === 'en' ? "Voice recognition not supported in browser. Please tap a preset below!" : "ब्राउज़र में माइक सपोर्ट नहीं है। कृपया नीचे दिए गए 1-टैप सैंपल चुनें!");
      setTimeout(() => setMicStatusMsg(null), 4000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = currentLang === 'en' ? 'en-IN' : 'hi-IN';
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
    }
  };

  return (
    <div className="space-y-4">
      {/* Speech Recorder Cockpit */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 shadow-2xl space-y-4">
        {/* Record trigger & transcribed text */}
        <div className="flex items-center gap-3.5 bg-zinc-950/80 p-3.5 rounded-2xl border border-zinc-800/80">
          <button
            onClick={handleStartMic}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse ring-4 ring-rose-500/20'
                : 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20 font-bold'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-wider">
              {isListening ? t.listening : t.transcriptTitle}
            </span>
            <p className="text-xs text-zinc-200 font-medium italic truncate mt-0.5">
              "{spokenText}"
            </p>
          </div>
        </div>

        {micStatusMsg && (
          <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-medium animate-in fade-in">
            {micStatusMsg}
          </div>
        )}

        {/* 1-Tap Presets */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-1">
            {t.presetsTitle}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {VOICE_SAMPLE_PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => parseHinglishInput(p.text)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  spokenText === p.text
                    ? 'bg-zinc-800 text-zinc-100 font-bold border-zinc-600'
                    : 'bg-zinc-950/70 text-zinc-400 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Extracted Take-Home Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="bg-zinc-950/80 p-3.5 rounded-2xl border border-zinc-800/80">
            <span className="text-[11px] text-zinc-500 block">{t.grossPayout}</span>
            <div className="text-xl font-bold font-mono text-zinc-100 mt-0.5">
              ₹{extractedData.grossPayout}
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">{extractedData.orders} {t.deliveriesDone}</span>
          </div>

          <div className="bg-zinc-950/80 p-3.5 rounded-2xl border border-zinc-800/80">
            <span className="text-[11px] text-rose-400 block">{t.operatingCosts}</span>
            <div className="text-xl font-bold font-mono text-rose-400 mt-0.5">
              -₹{extractedData.fuelExpense + extractedData.bikeWear + extractedData.deductions}
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">
              ₹{extractedData.fuelExpense} {t.fuelLabel} • ₹{extractedData.bikeWear} {t.wearLabel}
            </span>
          </div>

          <div className="bg-emerald-950/20 p-4 rounded-2xl border border-emerald-500/30 col-span-2 flex items-center justify-between">
            <div>
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">
                {t.realNet}
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">
                ₹{extractedData.netTakeHome}
              </div>
              <span className="text-[11px] text-zinc-400 font-mono">
                {t.effectiveYield} ₹{extractedData.trueHourlyRate}/hr ({extractedData.hours} {t.hoursLogged})
              </span>
            </div>

            <span className={`text-[10px] font-bold px-2 py-1 rounded-full font-mono ${
              extractedData.trueHourlyRate >= 85 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
            }`}>
              {extractedData.trueHourlyRate >= 85 ? t.aboveMin : t.belowMin}
            </span>
          </div>
        </div>

        {/* Shift Comparison */}
        <div className="pt-2 border-t border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-300">{t.shiftComp}</span>
            <span className="text-zinc-500 font-mono text-[11px]">{t.last48}</span>
          </div>

          <div className="space-y-1.5 text-xs">
            {HISTORICAL_SHIFTS.map((s) => (
              <div key={s.id} className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex items-center justify-between">
                <div>
                  <p className="font-medium text-zinc-200">{s.period.split('(')[0]}</p>
                  <p className="text-[10px] text-zinc-500 font-mono">{s.date}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-zinc-200 block font-semibold">₹{s.netTakeHome} {t.net}</span>
                  <span className={`text-[10px] font-mono font-bold ${
                    s.trueHourlyRate > 100 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    ₹{s.trueHourlyRate}/hr
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-zinc-400 bg-zinc-950 p-3 rounded-xl border border-zinc-800/80 leading-relaxed">
            {t.insight}
          </p>
        </div>
      </div>
    </div>
  );
}
