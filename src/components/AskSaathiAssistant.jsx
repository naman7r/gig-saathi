import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, Mic, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { RIDER_PROFILE } from '../data/mockData';

export default function AskSaathiAssistant({ onNavigateTab }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `नमस्ते रवि! मैं हूँ गिग साथी AI (GigSaathi)। मैं आपकी कमाई, सुरक्षा, ई-श्रम और आयुष्मान भारत स्कीम, और कंपनी के गलत जुर्माने को हटाने में मदद कर सकता हूँ। आप हिंदी, पंजाबी या अंग्रेजी में कुछ भी पूछ सकते हैं।`
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const PRELOADED_QUESTIONS = [
    {
      label: "🛡️ आईडी ब्लॉक नियम",
      query: "क्या कंपनी बिना कारण बताए मेरी आईडी ब्लॉक कर सकती है?",
      reply: `नहीं। सामाजिक सुरक्षा संहिता (Code on Social Security 2020) और हालिया दिशा-निर्देशों के तहत, एग्रीगेटर को कारण बताओ नोटिस और अपील का अवसर देना अनिवार्य है। यदि आपकी आईडी बिना स्पष्टीकरण ब्लॉक हुई है, तो तुरंत 'शिकायत पत्र लेखक' टैब में जाकर टाइमस्टैम्प के साथ फॉर्मल अपील भेजें।`
    },
    {
      label: "🏥 ₹5 लाख स्वास्थ्य बीमा",
      query: "मुझे आयुष्मान भारत और ई-श्रम का फायदा कब मिलेगा?",
      reply: `बधाई हो रवि! आप ज़ोमैटो पर 84 दिन पूरे कर चुके हैं। सामाजिक सुरक्षा संहिता की धारा 114 के तहत 90 दिन पूरे होते ही आप ₹5 लाख कैशलेस अस्पताल इलाज (AB-PMJAY) और ₹2 लाख ई-श्रम दुर्घटना बीमा के पात्र हो जाएंगे। बस 6 शिफ्ट बाकी हैं!`
    },
    {
      label: "🌧️ बारिश में कम पेमेंट",
      query: "कल बारिश में ऑर्डर दिए पर सर्ज पे नहीं मिला, क्या करूँ?",
      reply: `यह अक्सर 'मिसिंग सर्ज एनोमली' होती है। हमारे 'पर्ची स्कैनर' टैब में उस ऑर्डर का स्क्रीनशॉट डालें। एआई मौसम का समय और जीपीएस दूरी देखकर ₹20 से ₹35 का अंतर पकड़ेगा और कंपनी सपोर्ट के लिए तैयार शिकायत पत्र बना देगा।`
    },
    {
      label: "🛑 गलत कैंसिलेशन पेनल्टी",
      query: "कस्टमर ने गलत एड्रेस डाला और ₹80 पेनल्टी लग गई, कैसे हटाऊँ?",
      reply: `यह गैरकानूनी कटौती है। आप 'शिकायत पत्र लेखक' में जाकर 'Customer Cancellation' चुनें। एआई रेस्टोरेंट अराइवल टाइम (14:15) और सपोर्ट कॉल लॉग को जोड़कर तुरंत रिफंड क्लेम तैयार कर देगा।`
    }
  ];

  const handleSendQuery = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const newMsgs = [...messages, { role: 'user', text: query }];
    setMessages(newMsgs);
    setInputQuery('');
    setIsTyping(true);

    // Dynamic grounded answer matching
    setTimeout(() => {
      let replyText = `आपकी बात समझ आ गई, रवि। आपके 84-दिन के ट्रैक रिकॉर्ड और 4.82 स्टार रेटिंग के आधार पर, यह मुद्दा सीधे हमारे सुरक्षा व अधिकार नियमों के तहत आता है। आप इसे सीधे संबंधित टैब से 1-क्लिक में हल कर सकते हैं।`;

      const foundPreset = PRELOADED_QUESTIONS.find(q => query.toLowerCase().includes(q.query.slice(0, 10).toLowerCase()));
      if (foundPreset) {
        replyText = foundPreset.reply;
      } else if (query.includes('petrol') || query.includes('kamai') || query.includes('earning')) {
        replyText = `पेट्रोल खर्च और असली बचत देखने के लिए 'बोलकर लॉग करें' टैब का उपयोग करें। हमारे डेटा के अनुसार, चंडीगढ़ में दोपहर के बजाय शाम 7 से 11 बजे की शिफ्ट में 275% ज्यादा असली बचत होती है।`;
      } else if (query.includes('penalty') || query.includes('kaat') || query.includes('dispute')) {
        replyText = `कंपनी द्वारा काटी गई पेनल्टी को चुनौती देने के लिए 'शिकायत पत्र लेखक' टैब खोलें। वहाँ से औपचारिक अपील सीधे व्हाट्सएप या सपोर्ट में भेजी जा सकती है।`;
      }

      setMessages([...newMsgs, { role: 'assistant', text: replyText }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Ask Saathi AI (साथी से पूछें)
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                MULTILINGUAL GENAI
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Grounded policy assistant for rights, welfare schemes, platform deductions, and safety.
            </p>
          </div>
        </div>

        {/* 1-Tap Quick Question Chips */}
        <div className="mt-3 pt-3 border-t border-slate-800 space-y-1.5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Quick Questions (1-Tap):
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {PRELOADED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendQuery(q.query)}
                className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-slate-700 text-left text-xs text-slate-300 font-medium transition-all truncate"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages Viewport */}
      <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl p-4 shadow-xl space-y-3 min-h-[280px] max-h-[360px] overflow-y-auto flex flex-col justify-between">
        <div className="space-y-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 text-xs font-bold">
                  🤖
                </div>
              )}
              <div
                className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-amber-500 text-black font-semibold rounded-tr-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pl-9">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping" />
              <span>Saathi AI is referencing labor policies & guidelines...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
            placeholder="हिंदी या Hinglish में पूछें..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />

          <button
            onClick={() => handleSendQuery()}
            className="w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center shrink-0 transition-all shadow-md shadow-amber-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
