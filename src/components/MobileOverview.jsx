import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, ArrowRight, Fuel, AlertCircle, CheckCircle2, 
  ShieldCheck, Volume2, VolumeX, Sparkles, MessageSquare, 
  Bike, PackageCheck, WalletCards, Coins, ShieldAlert, Info,
  Wrench, Send, Sun, Droplets, CloudRain, MapPin
} from 'lucide-react';
import { MOCK_PAYOUT_SLIPS } from '../data/mockData';

const TRANSLATIONS = {
  hinglish: {
    greeting: 'नमस्ते रवि भाई!',
    subGreeting: 'चंडीगढ़ सेक्टर 35 • हीरो स्प्लेंडर 110cc',
    voiceBtnListen: 'बोलकर सुनो',
    voiceBtnStop: 'आवाज़ बंद करें',
    grossTitle: 'कुल कमाई (Gross)',
    grossSub: 'ज़ोमैटो (₹680) + स्विगी (₹440)',
    grossRate: '₹112.0 / घंटा ऐप दर',
    netTitle: 'जेब में क्या बचा?',
    netSub: 'पेट्रोल और बाइक खर्चा काट कर',
    netBadge: '₹69.0 / घंटा असली कमाई',
    fuelTitle: 'पेट्रोल और बाइक खर्च',
    fuelBadge: '32% खर्च',
    fuelBreakdown: '₹290 पेट्रोल + ₹80 बाइक घिसाई',
    deliveriesTitle: 'आज के कुल ऑर्डर्स',
    ordersUnit: 'ऑर्डर्स',
    deliveriesRate: 'औसतन 2.4 ऑर्डर/घंटा',
    underpayTitle: 'कंपनी ने कम दिए',
    underpayBadge: 'चोरी पकड़ी',
    underpayOrder: 'ऑर्डर #ZOM-7782190 (-₹32)',
    underpayDetail: '1.3 किमी कटौती + बारिश सर्ज गायब',
    chartTitle: 'कमाई का सच (ऐप दिखावा vs जेब)',
    appGross: 'ऐप कुल',
    realNet: 'जेब बचत',
    chartExplainer: 'नीली लाइन ऐप का दिखावा है। हरी लाइन पेट्रोल के बाद आपकी जेब में बचा असली पैसा है।',
    donutTitle: '₹100 का पूरा बंटवारा',
    donutCenter: 'जेब में',
    keptNet: 'जेब में बचा',
    fuelBurn: 'पेट्रोल टंकी में',
    wearCost: 'बाइक घिसाई',
    ayushmanTitle: 'आयुष्मान भारत ₹5 लाख',
    ayushmanSub: 'सरकारी कैशलेस अस्पताल इलाज',
    daysDone: '84/90 दिन पूरे',
    daysLeft: 'सिर्फ 6 दिन बाकी!',
    disputeBtn: 'कंपनी को शिकायत भेजो ↗',
    weatherTitle: 'मौसम व सेहत रडार',
    tempValue: '38°C धूप (महसूस 42°C)',
    heatAlert: 'दोपहर की धूप: पानी पिएं',
    hydrationTitle: 'पानी ब्रेक:',
    drankWaterBtn: 'पानी पी लिया',
    rainSurgeDesc: 'शाम 6:00 बजे बारिश सर्ज (+₹20/ऑर्डर)',
    hydrationResetMsg: 'शाबाश रवि भाई! हाइड्रेशन टाइमर रीसेट हो गया।',
    audioOverview: 'नमस्ते रवि भाई! आज आपने कुल 1120 रुपये कमाए, जिसमें से 370 रुपये पेट्रोल और बाइक में गए, और 690 रुपये आपकी असली जेब में बचे।'
  },
  hi: {
    greeting: 'नमस्ते रवि जी!',
    subGreeting: 'चंडीगढ़ सेक्टर 35 • हीरो स्प्लेंडर',
    voiceBtnListen: 'बोलकर सुनें',
    voiceBtnStop: 'आवाज़ रोकें',
    grossTitle: 'कुल सकल आय',
    grossSub: 'ज़ोमैटो (₹680) + स्विगी (₹440)',
    grossRate: '₹112.0 / घंटा सकल दर',
    netTitle: 'शुद्ध जेब बचत',
    netSub: 'पेट्रोल व वाहन खर्च घटाकर',
    netBadge: '₹69.0 / घंटा शुद्ध आय',
    fuelTitle: 'ईंधन एवं वाहन व्यय',
    fuelBadge: '32% व्यय',
    fuelBreakdown: '₹290 पेट्रोल + ₹80 घिसावट',
    deliveriesTitle: 'पूर्ण किए गए ऑर्डर',
    ordersUnit: 'ऑर्डर',
    deliveriesRate: 'औसतन 2.4 ऑर्डर/घंटा',
    underpayTitle: 'कंपनी द्वारा कम भुगतान',
    underpayBadge: 'कटौती चिह्नित',
    underpayOrder: 'ऑर्डर #ZOM-7782190 (-₹32)',
    underpayDetail: '1.3 किमी कटौती + वर्षा सर्ज गायब',
    chartTitle: 'सकल आय बनाम वास्तविक शुद्ध बचत',
    appGross: 'सकल आय',
    realNet: 'शुद्ध बचत',
    chartExplainer: 'नीली रेखा ऐप सकल आय है। हरी रेखा पेट्रोल के पश्चात वास्तविक शुद्ध बचत है।',
    donutTitle: '₹100 का पूरा बंटवारा',
    donutCenter: 'शुद्ध बचत',
    keptNet: 'जेब में बचा',
    fuelBurn: 'ईंधन में खर्च',
    wearCost: 'वाहन घिसावट',
    ayushmanTitle: 'आयुष्मान भारत ₹5 लाख',
    ayushmanSub: 'सरकारी कैशलेस अस्पताल इलाज',
    daysDone: '84/90 दिन पूर्ण',
    daysLeft: 'केवल 6 दिन शेष!',
    disputeBtn: 'औपचारिक शिकायत भेजें ↗',
    weatherTitle: 'मौसम एवं स्वास्थ्य रडार',
    tempValue: '38°C तापमान (महसूस 42°C)',
    heatAlert: 'तीव्र ग्रीष्म चेतावनी: जलपान करें',
    hydrationTitle: 'जलपान शेष:',
    drankWaterBtn: 'जलपान पूर्ण',
    rainSurgeDesc: 'सायं 6:00 बजे वर्षा सर्ज (+₹20/ऑर्डर)',
    hydrationResetMsg: 'उत्कृष्ट! जलपान टाइमर 20 मिनट हेतु पुनर्गठित।',
    audioOverview: 'नमस्ते रवि जी! आज आपकी कुल कमाई 1120 रुपये रही। पेट्रोल खर्च 370 रुपये काटकर शुद्ध बचत 690 रुपये हुई।'
  },
  en: {
    greeting: 'Good afternoon, Ravi',
    subGreeting: 'Chandigarh Sector 35 • Hero Splendor 110cc',
    voiceBtnListen: 'Listen Out Loud',
    voiceBtnStop: 'Stop Audio',
    grossTitle: 'Total Gross Earnings',
    grossSub: 'Zomato (₹680) + Swiggy (₹440)',
    grossRate: '₹112.0 / hr nominal',
    netTitle: 'Real Net in Pocket',
    netSub: 'After fuel & maintenance deducted',
    netBadge: '₹69.0 / hr effective rate',
    fuelTitle: 'Operating Fuel & Wear',
    fuelBadge: '32% of Gross',
    fuelBreakdown: '₹290 petrol + ₹80 wear',
    deliveriesTitle: 'Deliveries Completed',
    ordersUnit: 'Orders',
    deliveriesRate: 'Avg 2.4 orders/hr',
    underpayTitle: 'Underpayment Discrepancy',
    underpayBadge: 'Shortfall Flagged',
    underpayOrder: 'Order #ZOM-7782190 (-₹32)',
    underpayDetail: '1.3 km shaved + missing rain surge',
    chartTitle: 'Earnings Truth (App Pay vs Pocket)',
    appGross: 'Gross',
    realNet: 'Net',
    chartExplainer: 'The blue line is gross app pay. The green line is real money left after fuel.',
    donutTitle: 'Where Does Every ₹100 Go?',
    donutCenter: 'In Pocket',
    keptNet: 'Kept in Pocket',
    fuelBurn: 'Fuel Burn',
    wearCost: 'Bike Wear',
    ayushmanTitle: 'Ayushman Bharat ₹5 Lakh',
    ayushmanSub: 'Statutory Cashless Hospitalization',
    daysDone: '84/90 Days Done',
    daysLeft: 'Just 6 shifts left!',
    disputeBtn: 'File Grievance Notice ↗',
    weatherTitle: 'Live Weather Sentinel',
    tempValue: '38°C Sunny (Feels 42°C)',
    heatAlert: 'Peak Heat: Hydrate frequently',
    hydrationTitle: 'Hydration in:',
    drankWaterBtn: 'Drank Water',
    rainSurgeDesc: '6:00 PM Rain Surge (+₹20/order)',
    hydrationResetMsg: 'Great job Ravi! Hydration timer reset to 20 minutes.',
    audioOverview: 'Good afternoon Ravi. Today you earned 1120 gross. After deducting 370 rupees for petrol and maintenance, your real pocket savings are 690 rupees.'
  }
};

export default function MobileOverview({ 
  currentLang = 'hinglish', 
  onOpenAppeal, 
  onOpenEvidenceCert,
  onNotify,
  demoScenario = 'baseline' 
}) {
  const [speaking, setSpeaking] = useState(false);
  const [hydrationSeconds, setHydrationSeconds] = useState(840); // 14:00 countdown

  const isRainRush = demoScenario === 'rain_rush';
  const isWageTheft = demoScenario === 'wage_theft';

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  useEffect(() => {
    const timer = setInterval(() => {
      setHydrationSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDrankWater = () => {
    setHydrationSeconds(1200);
    if (onNotify) {
      onNotify(t.hydrationResetMsg, 'success');
    }
  };

  const toggleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(t.audioOverview);
    utt.lang = currentLang === 'en' ? 'en-IN' : 'hi-IN';
    utt.rate = 0.92;
    utt.onstart = () => setSpeaking(true);
    utt.onend = () => setSpeaking(false);
    utt.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utt);
  };

  return (
    <div className="space-y-3.5 text-slate-800 antialiased pb-4">
      {/* 1. Rider Greeting & Voice Pill */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Shift</span>
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            {t.subGreeting.split('•')[0]}
          </span>
        </div>

        <div className="flex items-center justify-between pt-0.5">
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
            {t.greeting}
          </h2>

          <button
            onClick={toggleSpeak}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer ${
              speaking
                ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {speaking ? (
              <VolumeX className="w-3 h-3" />
            ) : (
              <Volume2 className="w-3 h-3 text-emerald-400" />
            )}
            <span>{speaking ? t.voiceBtnStop : t.voiceBtnListen}</span>
            {speaking && (
              <span className="flex items-center gap-0.5 ml-0.5">
                <span className="w-0.5 h-2 bg-slate-950 animate-pulse" />
                <span className="w-0.5 h-3 bg-slate-950 animate-pulse delay-75" />
                <span className="w-0.5 h-1.5 bg-slate-950 animate-pulse delay-150" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. Weather & Hydration Sentinel Banner */}
      <div className={`border rounded-2xl p-3 shadow-xs space-y-2 text-xs transition-all ${
        isRainRush 
          ? 'bg-blue-50/90 border-blue-300 ring-2 ring-blue-400/40' 
          : 'bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-emerald-500/10 border-slate-200/90'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              isRainRush ? 'bg-blue-600 text-white shadow-xs' : 'bg-amber-500/20 text-amber-600'
            }`}>
              {isRainRush ? <CloudRain className="w-4 h-4 animate-bounce" /> : <Sun className="w-4 h-4" />}
            </div>
            <div>
              <span className="font-extrabold text-slate-900 font-mono text-xs">
                {isRainRush ? '27°C भारी बारिश (Thunderstorm)' : t.tempValue}
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-1.5 ${
                isRainRush 
                  ? 'bg-emerald-600 text-white font-mono' 
                  : 'text-amber-800 bg-amber-100 border border-amber-200'
              }`}>
                {isRainRush ? '+₹20 सर्ज सक्रिय (SURGE ACTIVE)' : t.heatAlert.split(':')[0]}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60">
          {/* Hydration Timer */}
          <div className="flex items-center justify-between bg-white/90 border border-slate-200 rounded-xl p-1.5 px-2">
            <div className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="font-mono font-bold text-blue-600 text-[11px]">{formatTimer(hydrationSeconds)}</span>
            </div>
            <button
              onClick={handleDrankWater}
              className="text-[9px] font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded transition-all active:scale-95 cursor-pointer"
            >
              {t.drankWaterBtn}
            </button>
          </div>

          {/* Rain Forecast */}
          <div className="flex items-center gap-1 bg-white/90 border border-slate-200 rounded-xl p-1.5 px-2 truncate">
            <CloudRain className={`w-3.5 h-3.5 shrink-0 ${isRainRush ? 'text-blue-600' : 'text-indigo-500'}`} />
            <span className="text-[10px] text-slate-700 font-semibold truncate">
              {isRainRush ? 'Active Surge (+₹20)' : '6 PM (+₹20)'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. 5 TOP RIDER KPI CARDS */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Card 1: Total Gross */}
        <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs space-y-1 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/20 flex items-center justify-center shrink-0">
              <WalletCards className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Gross</span>
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono tracking-tight pt-1">
            ₹1,120<span className="text-xs text-slate-400 font-semibold">.00</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium truncate">{t.grossTitle}</p>
        </div>

        {/* Card 2: Real Net in Pocket */}
        <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs space-y-1 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20 flex items-center justify-center shrink-0">
              <Coins className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Real Net</span>
          </div>
          <div className="text-xl font-extrabold text-emerald-600 font-mono tracking-tight pt-1">
            ₹690<span className="text-xs text-emerald-700/60 font-semibold">.00</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium truncate">{t.netTitle}</p>
        </div>

        {/* Card 3: Operating Fuel & Bike Wear */}
        <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs space-y-1 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-500/20 flex items-center justify-center shrink-0">
              <Fuel className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">{t.fuelBadge}</span>
          </div>
          <div className="text-xl font-extrabold text-rose-600 font-mono tracking-tight pt-1">
            -₹370<span className="text-xs text-rose-400 font-semibold">.00</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium truncate">{t.fuelTitle}</p>
        </div>

        {/* Card 4: Deliveries Completed */}
        <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs space-y-1 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500/20 flex items-center justify-center shrink-0">
              <PackageCheck className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">Today</span>
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono tracking-tight pt-1">
            16 <span className="text-xs text-slate-500 font-sans">{t.ordersUnit}</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium truncate">{t.deliveriesRate}</p>
        </div>
      </div>

      {/* Card 5: Underpayment Banner */}
      <div className={`bg-white rounded-2xl p-3.5 border shadow-xs space-y-2 bg-gradient-to-b from-rose-50/20 to-white transition-all ${
        isWageTheft ? 'border-rose-400 ring-2 ring-rose-500/40' : 'border-rose-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-500/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">{t.underpayTitle}</span>
              <span className="text-[10px] text-slate-500">{t.underpayDetail}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-base font-extrabold text-rose-600 font-mono block">-₹32.00</span>
            <span className="text-[9px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-bold uppercase">{t.underpayBadge}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            onClick={() => onOpenAppeal && onOpenAppeal(MOCK_PAYOUT_SLIPS[0])}
            className="py-2 px-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Send className="w-3 h-3 text-emerald-400" />
            <span className="truncate">{t.disputeBtn}</span>
          </button>

          <button
            onClick={() => onOpenEvidenceCert && onOpenEvidenceCert()}
            className="py-2 px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span className="truncate">प्रमाण पत्र (Evidence)</span>
          </button>
        </div>
      </div>

      {/* 4. Earnings Truth Dual-Curve Chart */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900">{t.chartTitle}</h3>
          <div className="flex items-center gap-2 text-[10px] font-bold">
            <span className="flex items-center gap-1 text-blue-600">
              <span className="w-2 h-2 rounded-full bg-blue-600" /> {t.appGross}
            </span>
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> {t.realNet}
            </span>
          </div>
        </div>

        {/* Explainer callout */}
        <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-slate-600">
          <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span className="leading-tight">{t.chartExplainer}</span>
        </div>

        {/* SVG Curve */}
        <div className="h-28 relative pt-1">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 70" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mobileEmeraldFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 55 Q 37 25 75 42 T 150 20 T 225 38 T 300 12 L 300 70 L 0 70 Z"
              fill="url(#mobileEmeraldFade)"
            />
            <path
              d="M 0 55 Q 37 25 75 42 T 150 20 T 225 38 T 300 12"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 0 62 Q 37 40 75 52 T 150 38 T 225 50 T 300 28"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="150" cy="20" r="3.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="150" cy="38" r="3.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
          </svg>
          <div className="flex justify-between text-[9px] font-mono text-slate-400 pt-1 border-t border-slate-100">
            <span>11 AM</span>
            <span>2 PM</span>
            <span className="text-slate-900 font-bold">6 PM Rush</span>
            <span>10 PM</span>
          </div>
        </div>
      </div>

      {/* 5. Donut Breakdown Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-slate-900">{t.donutTitle}</h3>

        <div className="flex items-center justify-around py-1">
          {/* SVG Donut */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="36" fill="transparent" stroke="#10B981" strokeWidth="11" strokeDasharray="140 226" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="36" fill="transparent" stroke="#F43F5E" strokeWidth="11" strokeDasharray="59 226" strokeDashoffset="-140" />
              <circle cx="50" cy="50" r="36" fill="transparent" stroke="#F59E0B" strokeWidth="11" strokeDasharray="27 226" strokeDashoffset="-199" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-extrabold font-mono text-emerald-600 leading-none">62%</span>
              <span className="text-[8px] text-slate-400 font-bold">{t.donutCenter}</span>
            </div>
          </div>

          {/* Breakdown Rows */}
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-semibold text-[11px]">{t.keptNet}:</span>
              <span className="font-mono font-bold text-emerald-600 text-[11px]">₹690</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="font-semibold text-[11px]">{t.fuelBurn}:</span>
              <span className="font-mono font-bold text-rose-600 text-[11px]">-₹290</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="font-semibold text-[11px]">{t.wearCost}:</span>
              <span className="font-mono font-bold text-amber-600 text-[11px]">-₹140</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Ayushman Bharat ₹5 Lakh Progress */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl p-3.5 space-y-2 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-950">{t.ayushmanTitle}</h4>
            <p className="text-[10px] text-emerald-800 font-medium">{t.ayushmanSub}</p>
          </div>
        </div>

        <div className="w-full bg-emerald-200/80 rounded-full h-2 overflow-hidden">
          <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: '93%' }} />
        </div>

        <div className="flex justify-between text-[10px] font-bold">
          <span className="text-slate-600">{t.daysDone}</span>
          <span className="text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-mono">{t.daysLeft}</span>
        </div>
      </div>
    </div>
  );
}
