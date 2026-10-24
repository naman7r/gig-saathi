import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, Download, Calendar, ChevronDown, TrendingUp, TrendingDown, 
  ArrowUpRight, ArrowRight, Clock, Navigation, Fuel, AlertCircle, CheckCircle2, 
  ShieldCheck, HeartPulse, DollarSign, Command, HelpCircle, Layers, SlidersHorizontal,
  Home, Wallet, FileText, Settings, Award, AlertTriangle, Eye, RefreshCw,
  Volume2, VolumeX, Sparkles, MessageSquare, PhoneCall, Check, ExternalLink
} from 'lucide-react';
import { RIDER_PROFILE, INCOMING_ORDER_SCENARIOS, MOCK_PAYOUT_SLIPS, HISTORICAL_SHIFTS } from '../data/mockData';

const TRANSLATIONS = {
  hinglish: {
    langLabel: '🛵 देसी गिग भाषा (Hinglish)',
    overview: 'कमाई का हिसाब',
    trips: 'ऑर्डर चेक (फ़ायदा/घाटा)',
    audits: 'कटे पैसे पकड़ो',
    shield: 'सरकारी ₹5 लाख कार्ड',
    ask: 'साथी AI से पूछो',
    greeting: 'नमस्ते रवि भाई!',
    subGreeting: 'चंडीगढ़ सेक्टर 35 • हीरो स्प्लेंडर 110cc',
    netTitle: 'जेब में क्या बचा? (Real Net)',
    netSub: 'पेट्रोल और बाइक खर्चा काट कर',
    netBadge: 'प्रति घंटा कमाई',
    deliveriesTitle: 'आज के कुल ऑर्डर्स',
    deliveriesSub: 'ज़ोमैटो + स्विगी मिलाके',
    fuelTitle: 'पेट्रोल और बाइक का खर्च',
    fuelSub: 'कुल कमाई का 32% हिस्सा पेट्रोल टंकी में गया',
    underpayTitle: 'कंपनी ने कम दिए (पैसा कटा)',
    underpaySub: '1.3 किमी दूरी और बारिश का पैसा गायब',
    chartTitle: 'कमाई का सच (ऐप क्या दिखाता है vs जेब में क्या बचता है)',
    grossLegend: 'ऐप में दिखी कुल कमाई',
    netLegend: 'जेब में बचा असली पैसा (पेट्रोल के बाद)',
    donutTitle: '₹100 में से कहाँ गया पैसा?',
    donutCenter: 'जेब में बचा',
    keptNet: 'आपकी जेब में बचा',
    fuelBurn: 'पेट्रोल की टंकी में (@ ₹2.6/किमी)',
    wearCost: 'बाइक घिसाई और सर्विस',
    tripTitle: 'नया ऑर्डर आया: लें या छोड़ें?',
    tripDesc: 'खाली वापसी का पेट्रोल घाटा जोड़कर सही सलाह',
    tripVerdictSkip: '🔴 यह ऑर्डर मत लो (घाटा है!)',
    tripVerdictAccept: '🟢 तुरंत स्वीकार करो (बढ़िया कमाई!)',
    declineBtn: '❌ छोड़ दो (Decline)',
    acceptBtn: '✅ ले लो (Accept)',
    auditTitle: 'कटे हुए पैसे पकड़ो (GPS सबूत)',
    auditDesc: 'जोमैटो ने 7.4 किमी की जगह सिर्फ 5.1 किमी का पैसा दिया',
    disputeBtn: 'कंपनी को शिकायत भेजो (1-क्लिक व्हाट्सऐप) ↗',
    statutoryTitle: 'सरकारी ₹5 लाख मुफ्त इलाज (आयुष्मान)',
    statutorySub: '84 दिन पूरे • सिर्फ 6 दिन और Zomato चलाना है!',
    audioOverview: 'नमस्ते रवि भाई! आज आपने कुल 1120 रुपये कमाए, जिसमें से 370 रुपये पेट्रोल और बाइक में गए, और 690 रुपये आपकी असली जेब में बचे।',
    audioTripSkip: 'भाई, यह ऑर्डर मत लो। खरड़ से खाली वापस आने में 39 रुपये का पेट्रोल लगेगा, सिर्फ 13 रुपये बचेंगे। 3 मिनट रुको, अच्छा ऑर्डर आएगा।',
    audioTripAccept: 'यह बहुत बढ़िया ऑर्डर है भाई। पास की दूरी है और 25 रुपये बारिश का बोनस भी है। इसे तुरंत स्वीकार करो।',
    audioAudit: 'सावधान भाई, जोमैटो ने आपके 32 रुपये कम दिए हैं। आपने 7.4 किमी बाइक चलाई लेकिन ऐप ने सिर्फ 5.1 किमी दिखाया। नीचे बटन दबाकर तुरंत शिकायत भेजो।'
  },
  hi: {
    langLabel: 'हिन्दी (सरल हिन्दी)',
    overview: 'कमाई विवरण',
    trips: 'ऑर्डर रडार (लाभ/हानि)',
    audits: 'कटौती ऑडिट',
    shield: '₹5 लाख सरकारी कवच',
    ask: 'साथी AI सहायता',
    greeting: 'नमस्ते रवि जी!',
    subGreeting: 'चंडीगढ़ सेक्टर 35 • हीरो स्प्लेंडर',
    netTitle: 'आपकी शुद्ध जेब बचत',
    netSub: 'पेट्रोल व वाहन खर्च घटाकर',
    netBadge: 'प्रति घंटा शुद्ध आय',
    deliveriesTitle: 'पूर्ण किए गए ऑर्डर',
    deliveriesSub: 'ज़ोमैटो व स्विगी मिलाकर',
    fuelTitle: 'पेट्रोल एवं रखरखाव खर्च',
    fuelSub: 'कुल आय का 32% भाग पेट्रोल में',
    underpayTitle: 'कंपनी द्वारा कम भुगतान',
    underpaySub: 'दूरी व वर्षा भत्ते में कटौती',
    chartTitle: 'सकल आय बनाम जेब में बची शुद्ध बचत',
    grossLegend: 'ऐप में दर्ज सकल राशि',
    netLegend: 'शुद्ध बचत (पेट्रोल के बाद)',
    donutTitle: '₹100 का पूरा बंटवारा',
    donutCenter: 'शुद्ध बचत',
    keptNet: 'सवार की जेब में बचा',
    fuelBurn: 'पेट्रोल में खर्च (@ ₹2.6/किमी)',
    wearCost: 'वाहन घिसावट व सर्विस',
    tripTitle: 'ऑर्डर रडार: स्वीकार करें या छोड़ें?',
    tripDesc: 'खाली वापसी ईंधन का सटीक आंकलन',
    tripVerdictSkip: '🔴 अस्वीकार करें (घाटे का सौदा)',
    tripVerdictAccept: '🟢 तुरंत स्वीकार करें (उत्कृष्ट आय)',
    declineBtn: 'अस्वीकार करें',
    acceptBtn: 'स्वीकार करें',
    auditTitle: 'वेतन कटौती विवरण व जीपीएस सबूत',
    auditDesc: 'वास्तविक दूरी 7.4 किमी थी, भुगतान केवल 5.1 किमी का हुआ',
    disputeBtn: 'औपचारिक शिकायत पत्र तैयार करें ↗',
    statutoryTitle: 'आयुष्मान भारत ₹5 लाख स्वास्थ्य सुरक्षा',
    statutorySub: '84 दिन पूर्ण • केवल 6 दिन और सक्रिय रहना है',
    audioOverview: 'नमस्ते रवि जी! आज आपकी कुल कमाई 1120 रुपये रही। पेट्रोल खर्च 370 रुपये काटकर शुद्ध बचत 690 रुपये हुई।',
    audioTripSkip: 'कृपया यह ऑर्डर स्वीकार न करें। खरड़ से खाली वापसी में भारी पेट्रोल खर्च होगा।',
    audioTripAccept: 'यह ऑर्डर लाभदायक है, इसमें वर्षा भत्ता भी शामिल है। इसे तुरंत स्वीकार करें।',
    audioAudit: 'जोमैटो ने आपके 32 रुपये कम दिए हैं। कृपया नीचे दिए गए बटन से तुरंत शिकायत दर्ज करें।'
  },
  en: {
    langLabel: 'English (Simple)',
    overview: 'Overview',
    trips: 'Trip Profit Radar',
    audits: 'Pay Statement Audits',
    shield: 'Govt ₹5 Lakh Shield',
    ask: 'Ask Saathi AI',
    greeting: 'Good afternoon, Ravi',
    subGreeting: 'Chandigarh Sector 35 • Hero Splendor 110cc',
    netTitle: 'Real Net in Pocket',
    netSub: 'After fuel & maintenance deducted',
    netBadge: 'Real net per hour',
    deliveriesTitle: 'Deliveries Completed',
    deliveriesSub: 'Zomato + Swiggy combined',
    fuelTitle: 'Operating Fuel & Wear',
    fuelSub: '32.8% of gross spent on petrol',
    underpayTitle: 'Underpayment Discrepancy',
    underpaySub: 'Shaved km & missing rain surge',
    chartTitle: 'Earnings Truth (App Pay vs Pocket Reality)',
    grossLegend: 'Gross App Payout',
    netLegend: 'Real Net in Pocket',
    donutTitle: 'Where Does Every ₹100 Go?',
    donutCenter: 'In Pocket',
    keptNet: 'Kept in Pocket',
    fuelBurn: 'Fuel Burn (@ ₹2.6/km)',
    wearCost: 'Bike Wear & Service',
    tripTitle: 'Incoming Order: Accept or Skip?',
    tripDesc: 'Calculates empty return fuel trap before accepting',
    tripVerdictSkip: '🔴 SKIP ORDER (Deadhead Trap!)',
    tripVerdictAccept: '🟢 ACCEPT ORDER (High Net Profit!)',
    declineBtn: 'Decline Order',
    acceptBtn: 'Accept Trip',
    auditTitle: 'Shortfall Caught (GPS Evidence)',
    auditDesc: 'Zomato credited 5.1 km instead of 7.4 km actual',
    disputeBtn: 'Send Grievance Notice (1-Tap WhatsApp) ↗',
    statutoryTitle: 'Govt ₹5 Lakh Ayushman Bharat Cover',
    statutorySub: '84 days done • Just 6 shifts left to qualify!',
    audioOverview: 'Good afternoon Ravi. Today you earned 1120 gross. After deducting 370 rupees for petrol and maintenance, your real pocket savings are 690 rupees.',
    audioTripSkip: 'Do not take this order Ravi. The empty return trip from Kharar eats 39 rupees of fuel, leaving you only 13 rupees profit.',
    audioTripAccept: 'This is a great order. Short distance and 25 rupees rain bonus included. Accept it right away.',
    audioAudit: 'Zomato shortchanged you by 32 rupees on this order. Click the dispute button to send a notice.'
  }
};

export default function SightlineDashboard({ onOpenAppeal, onOpenAskAI, onSwitchToMobile }) {
  const [currentLang, setCurrentLang] = useState('hinglish'); // 'hinglish' | 'hi' | 'en'
  const [selectedRange, setSelectedRange] = useState('Today'); // 'Today' | '7D' | '30D' | '90D'
  const [comparePrevious, setComparePrevious] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState('overview');
  const [selectedOrderIdx, setSelectedOrderIdx] = useState(0);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [speakingText, setSpeakingText] = useState(null);

  const t = TRANSLATIONS[currentLang];
  const order = INCOMING_ORDER_SCENARIOS[selectedOrderIdx];
  const isSkip = order.verdict === 'SKIP';

  // Voice Speech Synthesizer Function (Audio reader for less-educated riders)
  const speakText = (textKey, fallbackText) => {
    if (!('speechSynthesis' in window)) return;
    
    // If already speaking this text, stop it
    if (speakingText === textKey) {
      window.speechSynthesis.cancel();
      setSpeakingText(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(fallbackText || t[textKey]);
    utterance.lang = currentLang === 'en' ? 'en-IN' : 'hi-IN';
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => setSpeakingText(textKey);
    utterance.onend = () => setSpeakingText(null);
    utterance.onerror = () => setSpeakingText(null);

    window.speechSynthesis.speak(utterance);
  };

  // Keyboard shortcut listener for Command/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full bg-[#F4F5F7] min-h-screen text-slate-800 antialiased font-sans selection:bg-slate-900 selection:text-white">
      {/* Outer Studio Container */}
      <div className="max-w-[1560px] mx-auto p-3 sm:p-6 lg:p-8">
        
        {/* Main Dashboard Frame */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col lg:flex-row min-h-[900px]">
          
          {/* ========================================================= */}
          {/* LEFT SIDEBAR (Rider Navigation) */}
          {/* ========================================================= */}
          <aside className="w-full lg:w-64 border-r border-slate-100 p-5 flex flex-col justify-between shrink-0 bg-slate-50/50">
            <div className="space-y-6">
              {/* App Brand Header */}
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-base shadow-sm">
                    🛵
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900 tracking-tight leading-none">गिग साथी (GigSaathi)</h2>
                    <span className="text-[11px] text-slate-500 font-medium">{t.subGreeting.split('•')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Language Selector Pill in Sidebar */}
              <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block pt-1">
                  भाषा चुनें / Select Language:
                </span>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { key: 'hinglish', label: 'Hinglish' },
                    { key: 'hi', label: 'हिन्दी' },
                    { key: 'en', label: 'English' },
                  ].map((l) => (
                    <button
                      key={l.key}
                      onClick={() => setCurrentLang(l.key)}
                      className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                        currentLang === l.key 
                          ? 'bg-slate-900 text-white shadow-xs' 
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Sections */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block">
                    {currentLang === 'en' ? 'Daily Dashboard' : 'दैनिक मेनू'}
                  </span>
                  
                  <button
                    onClick={() => setActiveSidebarItem('overview')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      activeSidebarItem === 'overview'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Home className="w-4 h-4 text-emerald-400" />
                      <span>{t.overview}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveSidebarItem('trips')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      activeSidebarItem === 'trips'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Navigation className="w-4 h-4 text-amber-500" />
                      <span>{t.trips}</span>
                    </div>
                    <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-bold">
                      1 नया
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveSidebarItem('audits')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      activeSidebarItem === 'audits'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-rose-500" />
                      <span>{t.audits}</span>
                    </div>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-mono font-bold">
                      -₹32
                    </span>
                  </button>
                </div>

                {/* Section 2: Statutory Protection */}
                <div className="space-y-1 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block">
                    {currentLang === 'en' ? 'Rights & Safety' : 'सरकारी अधिकार व सुरक्षा'}
                  </span>

                  <button
                    onClick={() => onOpenAskAI("सामाजिक सुरक्षा के लिए 90 या 120 दिन का क्या नियम है?")}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>{t.shield}</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-mono font-bold">
                      84/90 दिन
                    </span>
                  </button>

                  <button
                    onClick={() => onOpenAskAI()}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <span>{t.ask}</span>
                    </div>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full font-bold">
                      AI
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Card: Ayushman Bharat Progress */}
            <div className="pt-6 border-t border-slate-200/80">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl p-4 space-y-2.5 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🛡️</span>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">आयुष्मान भारत ₹5 लाख</h4>
                    <p className="text-[10px] text-emerald-800 font-medium">सरकारी कैशलेस अस्पताल इलाज</p>
                  </div>
                </div>

                <div className="w-full bg-emerald-200/80 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: '93%' }} />
                </div>

                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-600">84 दिन पूरे</span>
                  <span className="text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-mono">सिर्फ 6 दिन बाकी!</span>
                </div>

                <button 
                  onClick={onSwitchToMobile}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 mt-1"
                >
                  <span>📱 मोबाइल स्क्रीन देखें (Mobile View)</span>
                </button>
              </div>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* MAIN STAGE CONTENT (Plain-Speak Rider Dashboard) */}
          {/* ========================================================= */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
            
            {/* Top Greeting & Voice Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-500 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {t.subGreeting}
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    {t.greeting}
                  </h1>
                  
                  {/* Big Voice Button for the Entire Overview */}
                  <button
                    onClick={() => speakText('audioOverview', t.audioOverview)}
                    title="बोलकर सुनो (Listen out loud)"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                      speakingText === 'audioOverview'
                        ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 animate-pulse'
                        : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                    }`}
                  >
                    {speakingText === 'audioOverview' ? (
                      <VolumeX className="w-4 h-4 text-slate-950" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-amber-800" />
                    )}
                    <span>{speakingText === 'audioOverview' ? 'आवाज़ बंद करें (Stop)' : '🔊 बोलकर सुनो (Listen)'}</span>
                  </button>
                </div>
              </div>

              {/* Top Controls: Language Switcher & Dispute Button */}
              <div className="flex items-center flex-wrap gap-2.5">
                
                {/* 1-Tap Language Quick Switcher */}
                <div className="flex items-center bg-slate-100 border border-slate-200 rounded-full p-1 text-xs font-bold text-slate-700">
                  <button
                    onClick={() => setCurrentLang('hinglish')}
                    className={`px-3 py-1.5 rounded-full transition-all ${
                      currentLang === 'hinglish' ? 'bg-slate-900 text-white shadow-xs' : 'hover:text-slate-900'
                    }`}
                  >
                    Hinglish
                  </button>
                  <button
                    onClick={() => setCurrentLang('hi')}
                    className={`px-3 py-1.5 rounded-full transition-all ${
                      currentLang === 'hi' ? 'bg-slate-900 text-white shadow-xs' : 'hover:text-slate-900'
                    }`}
                  >
                    हिन्दी
                  </button>
                  <button
                    onClick={() => setCurrentLang('en')}
                    className={`px-3 py-1.5 rounded-full transition-all ${
                      currentLang === 'en' ? 'bg-slate-900 text-white shadow-xs' : 'hover:text-slate-900'
                    }`}
                  >
                    English
                  </button>
                </div>

                {/* Complaint Action Button */}
                <button 
                  onClick={() => onOpenAppeal(MOCK_PAYOUT_SLIPS[0])}
                  className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-bold shadow-xs transition-all active:scale-95"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>कंपनी को शिकायत भेजो</span>
                </button>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 4 TOP RIDER KPI CARDS (Crystal Clear Hindi / Hinglish) */}
            {/* ========================================================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Real Net Take-Home */}
              <div className="bg-emerald-50/40 rounded-2xl p-5 border-2 border-emerald-300 shadow-sm space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-emerald-950 font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">💰</span>
                    <span>{t.netTitle}</span>
                  </span>
                  <button
                    onClick={() => speakText('audioNet', t.audioNet)}
                    title="सुनो (Listen)"
                    className="p-1 rounded-full bg-white text-emerald-800 hover:bg-emerald-100 border border-emerald-200 shadow-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl font-extrabold text-emerald-950 font-mono tracking-tight">
                    ₹690<span className="text-base text-emerald-700 font-semibold">.00</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>₹69.0 / घंटा असली कमाई</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {t.netSub} (कुल ₹1,120 में से)
                  </p>
                </div>
              </div>

              {/* Card 2: Deliveries Completed */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-700 font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">📦</span>
                    <span>{t.deliveriesTitle}</span>
                  </span>
                  <span className="font-mono text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">आज</span>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                    16 <span className="text-base font-semibold text-slate-500 font-sans">ऑर्डर्स</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <span>↗ औसतन 2.4 ऑर्डर प्रति घंटा</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">{t.deliveriesSub}</p>
                </div>
              </div>

              {/* Card 3: Operating Fuel & Bike Wear */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-700 font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">⛽</span>
                    <span>{t.fuelTitle}</span>
                  </span>
                  <span className="font-mono text-[11px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full">32% खर्च</span>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl font-extrabold text-rose-600 font-mono tracking-tight">
                    -₹370<span className="text-base font-semibold text-rose-400">.00</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <span>₹290 पेट्रोल + ₹80 बाइक घिसाई</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">₹2.60 प्रति किलोमीटर के हिसाब से</p>
                </div>
              </div>

              {/* Card 4: Underpayment & Anomaly Flags */}
              <div className="bg-rose-50/50 rounded-2xl p-5 border-2 border-rose-300 shadow-sm space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-rose-900 font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-xs">⚠️</span>
                    <span>{t.underpayTitle}</span>
                  </span>
                  <span className="font-mono text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-full font-bold">चोरी पकड़ी</span>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl font-extrabold text-rose-600 font-mono tracking-tight">
                    -₹32<span className="text-base font-semibold text-rose-400">.00</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                    <span>ऑर्डर #ZOM-7782190 में कम दिए</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    1.3 किमी का ₹12 + बारिश का ₹20 गायब
                  </p>
                </div>
              </div>

            </div>

            {/* ========================================================= */}
            {/* MIDDLE SECTION: EARNINGS CURVE VS DONUT BREAKDOWN */}
            {/* ========================================================= */}
            <div className="grid grid-cols-12 gap-6 items-stretch">
              
              {/* Dual-Curve Earnings vs Expenses Chart */}
              <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{t.chartTitle}</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-extrabold text-slate-900 font-mono">₹1,120</span>
                      <span className="text-xs font-semibold text-slate-500">(ऐप पर दिखा)</span>
                      <span className="text-slate-300 font-bold">→</span>
                      <span className="text-2xl font-extrabold text-emerald-600 font-mono">₹690</span>
                      <span className="text-xs font-bold text-emerald-700">(असली बचत जेब में)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-blue-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> {t.grossLegend}
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> {t.netLegend}
                    </span>
                  </div>
                </div>

                {/* Plain-language Explainer Banner */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="text-base">💡</span>
                    <span>
                      <strong>समझने का आसान तरीका:</strong> ऊपर की नीली लाइन वो पैसा है जो ऐप ने दिखाया। नीचे की हरी लाइन वो असली पैसा है जो पेट्रोल भरवाने के बाद आपकी जेब में बचा।
                    </span>
                  </div>
                </div>

                {/* Smooth Multi-Wave Graph */}
                <div className="pt-2 h-44 relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="emeraldFade" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 0 90 Q 75 40 150 70 T 300 35 T 450 65 T 600 20 L 600 120 L 0 120 Z"
                      fill="url(#emeraldFade)"
                    />
                    
                    {/* Blue Curve (Gross) */}
                    <path
                      d="M 0 90 Q 75 40 150 70 T 300 35 T 450 65 T 600 20"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Green Curve (Real Net in Pocket) */}
                    <path
                      d="M 0 105 Q 75 65 150 90 T 300 65 T 450 85 T 600 50"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    <circle cx="300" cy="35" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" />
                    <circle cx="300" cy="65" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" />
                  </svg>

                  {/* Horizontal X-Axis */}
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-100">
                    <span>सुबह 11 बजे</span>
                    <span>दोपहर 1 बजे</span>
                    <span>शाम 3 बजे</span>
                    <span className="text-slate-900 font-bold">शाम 6 बजे (डिनर रश)</span>
                    <span>रात 8 बजे</span>
                    <span>रात 10 बजे</span>
                  </div>
                </div>
              </div>

              {/* Donut Chart: Plain Explanation */}
              <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="text-xs font-bold text-slate-800">{t.donutTitle}</h3>
                    <span className="text-[11px] font-mono text-emerald-600 font-bold">आज का कुल हिसाब</span>
                  </div>

                  {/* SVG Donut Circle */}
                  <div className="py-4 flex items-center justify-center relative">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        {/* Net (62%) */}
                        <circle
                          cx="50" cy="50" r="38"
                          fill="transparent"
                          stroke="#10B981"
                          strokeWidth="10"
                          strokeDasharray="148 238"
                          strokeDashoffset="0"
                        />
                        {/* Fuel (26%) */}
                        <circle
                          cx="50" cy="50" r="38"
                          fill="transparent"
                          stroke="#F43F5E"
                          strokeWidth="10"
                          strokeDasharray="66 238"
                          strokeDashoffset="-148"
                        />
                        {/* Wear (12%) */}
                        <circle
                          cx="50" cy="50" r="38"
                          fill="transparent"
                          stroke="#F59E0B"
                          strokeWidth="10"
                          strokeDasharray="24 238"
                          strokeDashoffset="-214"
                        />
                      </svg>
                      {/* Center label */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-extrabold font-mono text-emerald-600 leading-none">62%</span>
                        <span className="text-[10px] text-slate-500 font-bold mt-1">आपकी जेब में</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plain Legend list with Big Clear Rupee Labels */}
                <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <span className="flex items-center gap-2 text-emerald-950 font-bold">
                      <span className="w-3 h-3 rounded-full bg-emerald-500" />
                      {t.keptNet}
                    </span>
                    <span className="font-mono font-extrabold text-emerald-700">₹690.00 (62%)</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50/70 border border-rose-200">
                    <span className="flex items-center gap-2 text-rose-950 font-bold">
                      <span className="w-3 h-3 rounded-full bg-rose-500" />
                      {t.fuelBurn}
                    </span>
                    <span className="font-mono font-extrabold text-rose-600">-₹290.00 (26%)</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50/70 border border-amber-200">
                    <span className="flex items-center gap-2 text-amber-950 font-bold">
                      <span className="w-3 h-3 rounded-full bg-amber-500" />
                      {t.wearCost}
                    </span>
                    <span className="font-mono font-extrabold text-amber-700">-₹140.00 (12%)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ========================================================= */}
            {/* BOTTOM SECTION: TRIP RADAR + AUDIT DISPUTE TABLE */}
            {/* ========================================================= */}
            <div className="grid grid-cols-12 gap-6 items-stretch">
              
              {/* Left: Incoming Opportunity Evaluator (Trip Radar) */}
              <div className="col-span-12 lg:col-span-6 bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-slate-900">{t.tripTitle}</h3>
                      <button
                        onClick={() => speakText(
                          isSkip ? 'audioTripSkip' : 'audioTripAccept',
                          isSkip ? t.audioTripSkip : t.audioTripAccept
                        )}
                        title="बोलकर सुनो (Listen)"
                        className="p-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 shadow-xs"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{t.tripDesc}</p>
                  </div>

                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full font-mono shadow-xs ${
                    isSkip ? 'bg-rose-100 text-rose-700 border border-rose-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {isSkip ? t.tripVerdictSkip : t.tripVerdictAccept}
                  </span>
                </div>

                {/* Scenario switcher tabs */}
                <div className="grid grid-cols-3 gap-2">
                  {INCOMING_ORDER_SCENARIOS.map((sc, idx) => (
                    <button
                      key={sc.id}
                      onClick={() => setSelectedOrderIdx(idx)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        selectedOrderIdx === idx
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold">{sc.platform}</span>
                        <span className={`font-extrabold ${sc.verdict === 'ACCEPT' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {sc.verdict === 'ACCEPT' ? 'फ़ायदा' : 'घाटा'}
                        </span>
                      </div>
                      <p className="font-bold truncate mt-1">{sc.restaurant.split('(')[0]}</p>
                      <p className="text-[10px] opacity-80 font-mono">₹{sc.offeredPayout} ऑफर • {sc.oneWayDistanceKm}किमी</p>
                    </button>
                  ))}
                </div>

                {/* Plain-language Math Box */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">रेस्टोरेंट से ग्राहक:</span>
                    <span className="font-bold text-slate-800">{order.restaurant} &rarr; {order.dropLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">रास्ते का हिसाब:</span>
                    <span className="font-mono text-slate-800">
                      {order.oneWayDistanceKm}किमी ड्रॉप + <strong className="text-rose-600">{order.deadheadReturnKm}किमी खाली वापसी</strong> = कुल {order.totalDistanceKm}किमी
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">पेट्रोल का असली खर्च:</span>
                    <span className="font-mono font-bold text-rose-600">-₹{order.realFuelCost.toFixed(0)} (जेब से कटेगा)</span>
                  </div>
                  
                  {/* Verdict Row */}
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-bold">
                    <span>सब काट के असली बचत:</span>
                    <span className={`font-mono text-base ${isSkip ? 'text-rose-600' : 'text-emerald-600'}`}>
                      ₹{order.netProfit.toFixed(1)} (सिर्फ ₹{order.effectiveHourlyRate.toFixed(1)}/घंटा)
                    </span>
                  </div>

                  {/* Rider Guidance in spoken words */}
                  <div className={`p-2.5 rounded-lg text-xs leading-relaxed font-medium mt-1 ${
                    isSkip ? 'bg-rose-100/70 text-rose-900 border border-rose-200' : 'bg-emerald-100/70 text-emerald-900 border border-emerald-200'
                  }`}>
                    {order.reason}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => alert(`ऑर्डर छोड़ दिया। आपने ₹${order.realFuelCost.toFixed(0)} का खाली पेट्रोल बचा लिया!`)}
                    className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-xs transition-all border border-slate-300"
                  >
                    {t.declineBtn}
                  </button>
                  <button 
                    onClick={() => alert(`ऑर्डर स्वीकार किया। जीपीएस और माइलेज ट्रैकिंग चालू है।`)}
                    className="py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all shadow-sm"
                  >
                    {t.acceptBtn}
                  </button>
                </div>
              </div>

              {/* Right: Pay Audit Statement & 1-Click Grievance Draft */}
              <div className="col-span-12 lg:col-span-6 bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-extrabold text-slate-900">{t.auditTitle}</h3>
                        <button
                          onClick={() => speakText('audioAudit', t.audioAudit)}
                          title="बोलकर सुनो (Listen)"
                          className="p-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 shadow-xs"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{t.auditDesc}</p>
                    </div>

                    <span className="text-xs font-mono font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full border border-rose-300">
                      ज़ोमैटो #{MOCK_PAYOUT_SLIPS[0].orderId}
                    </span>
                  </div>

                  <div className="space-y-3 pt-3">
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-rose-900 font-extrabold text-sm">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>कंपनी ने ₹32.00 कम दिए (चोरी पकड़ी गई)</span>
                      </div>
                      <div className="text-slate-700 text-xs space-y-1 pl-6">
                        <p>• <strong>किमी घटाया:</strong> आपने 7.4 किमी बाइक चलाई, कंपनी ने सिर्फ 5.1 किमी माना (-₹12 नुकसान)।</p>
                        <p>• <strong>बारिश का पैसा गायब:</strong> सेक्टर 17 में तेज बारिश थी, फिर भी ₹0 सर्ज दिया (-₹20 नुकसान)।</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs space-y-1.5 font-medium">
                      <div className="flex justify-between text-slate-600">
                        <span>कंपनी ने जो दिया (Settled):</span>
                        <span className="font-mono font-bold text-slate-900">₹50.00</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>असली में जो मिलना चाहिए था:</span>
                        <span className="font-mono font-extrabold text-emerald-600 text-sm">₹82.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onOpenAppeal(MOCK_PAYOUT_SLIPS[0])}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <span>{t.disputeBtn}</span>
                </button>
              </div>

            </div>

          </main>

        </div>

      </div>

      {/* ========================================================= */}
      {/* COMMAND PALETTE MODAL (⌘K) */}
      {/* ========================================================= */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-start justify-center pt-24 p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden text-slate-800 space-y-2">
            <div className="p-3 border-b border-slate-100 flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                autoFocus
                type="text"
                placeholder="खोजें या पूछें (उदा. 90 दिन नियम, ₹32 शिकायत)..."
                className="w-full text-xs outline-none bg-transparent placeholder-slate-400"
              />
              <kbd className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                ESC
              </kbd>
            </div>

            <div className="p-2 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
                ज़रूरी शॉर्टकट
              </span>
              <button 
                onClick={() => {
                  onOpenAppeal();
                  setCommandPaletteOpen(false);
                }}
                className="w-full p-2 rounded-lg text-left hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between font-bold transition-all"
              >
                <span>₹32 कम मिलने की शिकायत तैयार करें</span>
                <span className="text-[10px] text-slate-400 font-mono">↵ दबाएं</span>
              </button>

              <button 
                onClick={() => {
                  onOpenAskAI("सामाजिक सुरक्षा के लिए 90 या 120 दिन का क्या नियम है?");
                  setCommandPaletteOpen(false);
                }}
                className="w-full p-2 rounded-lg text-left hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between font-bold transition-all"
              >
                <span>सरकारी ₹5 लाख मुफ्त इलाज (90/120 दिन नियम) देखें</span>
                <span className="text-[10px] text-slate-400 font-mono">↵ दबाएं</span>
              </button>

              <button 
                onClick={() => {
                  onSwitchToMobile();
                  setCommandPaletteOpen(false);
                }}
                className="w-full p-2 rounded-lg text-left hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between font-bold transition-all"
              >
                <span>📱 मोबाइल फोन व्यू खोलें</span>
                <span className="text-[10px] text-slate-400 font-mono">↵ दबाएं</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
