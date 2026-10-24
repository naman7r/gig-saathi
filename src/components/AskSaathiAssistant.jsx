import React, { useState } from 'react';
import { Send, Bot, ExternalLink, ShieldCheck } from 'lucide-react';
import { queryKnowledgeBase } from '../utils/ledgerEngine';

export default function AskSaathiAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `नमस्ते रवि। मैं आपका सत्यापित साथी AI हूँ। हमारे पास सामाजिक सुरक्षा संहिता (Central Rules 2026), ई-श्रम, और आयुष्मान भारत का सत्यापित डेटाबेस है। आप नीचे दिए गए प्रश्न चुन सकते हैं या हिंदी/अंग्रेजी में पूछ सकते हैं।`
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const PRELOADED_QUESTIONS = [
    {
      label: "90/120 दिन नियम",
      query: "सामाजिक सुरक्षा के लिए 90 या 120 दिन का क्या नियम है?"
    },
    {
      label: "₹5 लाख स्वास्थ्य बीमा",
      query: "आयुष्मान भारत PM-JAY योजना का लाभ गिग वर्कर को कब मिलेगा?"
    },
    {
      label: "गलत आईडी ब्लॉक",
      query: "क्या प्लेटफॉर्म बिना नोटिस मेरी आईडी ब्लॉक कर सकता है?"
    },
    {
      label: "आधिकारिक हेल्पलाइन",
      query: "शिकायत या आपातकाल के लिए सरकारी हेल्पलाइन नंबर क्या हैं?"
    }
  ];

  const handleSend = (userText) => {
    const q = userText || inputQuery;
    if (!q.trim()) return;

    const newMsgs = [...messages, { role: 'user', text: q }];
    setMessages(newMsgs);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const result = queryKnowledgeBase(q);
      let reply = "";

      if (result.found) {
        reply = `【प्रमाणित संदर्भ: ${result.citationId}】\n${result.summary}\n\n📌 कानूनी स्थिति: ${result.disclaimer || 'सत्यापित सरकारी नियम'}\n🔗 आधिकारिक स्रोत: ${result.sourceUrl}`;
      } else if (result.outOfScope) {
        reply = `⚠️ यह विषय हमारे सत्यापित कानूनी डेटाबेस में शामिल नहीं है।\n\n${result.refusalMessage}\n\nआधिकारिक संपर्क:\n${result.officialHelplines}`;
      } else {
        reply = result.message || "कृपया अपना प्रश्न विस्तार से लिखें।";
      }

      setMessages([...newMsgs, { role: 'assistant', text: reply }]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="space-y-3">
      {/* 1-Tap Questions */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block">
          सत्यापित डेटाबेस प्रश्न (1-टैप):
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {PRELOADED_QUESTIONS.map((pq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(pq.query)}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-left text-xs text-zinc-300 font-medium transition-all truncate"
            >
              {pq.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="bg-zinc-950 rounded-2xl p-3 border border-zinc-800 space-y-2.5 min-h-[220px] max-h-[300px] overflow-y-auto">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 ${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.role === 'assistant' && (
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                🤖
              </div>
            )}
            <div
              className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-zinc-100 text-zinc-900 font-semibold rounded-tr-none'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none font-sans'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono pl-8">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
            <span>सत्यापित डेटाबेस से उत्तर तैयार हो रहा है...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="हिंदी या Hinglish में पूछें..."
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
        />

        <button
          onClick={() => handleSend()}
          className="w-9 h-9 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 flex items-center justify-center shrink-0 transition-all font-bold"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
