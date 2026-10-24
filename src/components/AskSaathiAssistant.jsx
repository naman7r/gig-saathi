import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, ExternalLink, ShieldCheck, Key, Sparkles, Volume2, VolumeX, X, Check } from 'lucide-react';
import { askGeminiAssistant } from '../utils/geminiAssistant.js';

export default function AskSaathiAssistant({ currentLang = 'hinglish', initialQuery = '', onNotify }) {
  const isEn = currentLang === 'en';
  const isHi = currentLang === 'hi';

  const defaultGreeting = isEn
    ? "Good afternoon Naman. I am Giggy, your verified legal and welfare AI co-pilot. I am grounded in India's Code on Social Security (Central Rules 2026), e-Shram, and Ayushman Bharat PM-JAY. Feel free to select a prompt below or ask in English or Hinglish."
    : isHi
      ? "नमस्ते नमन जी। मैं आपका कानूनी व कल्याण AI साथी Giggy हूँ। हमारे पास सामाजिक सुरक्षा संहिता (Central Rules 2026), ई-श्रम, और आयुष्मान भारत का प्रमाणित डेटाबेस है। आप नीचे दिए गए प्रश्न चुन सकते हैं या हिन्दी/अंग्रेजी में पूछ सकते हैं।"
      : "नमस्ते नमन। मैं आपका कानूनी व कल्याण AI साथी Giggy हूँ। हमारे पास सामाजिक सुरक्षा संहिता (Central Rules 2026), ई-श्रम, और आयुष्मान भारत का प्रमाणित डेटाबेस है। आप नीचे दिए गए प्रश्न चुन सकते हैं या हिंदी/अंग्रेजी में पूछ सकते हैं।";

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      source: 'local_kb',
      text: defaultGreeting
    }
  ]);

  // Update greeting if language switches and only default message exists
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].role === 'assistant') {
        return [{ ...prev[0], text: defaultGreeting }];
      }
      return prev;
    });
  }, [currentLang]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    return (
      (typeof localStorage !== 'undefined' && localStorage.getItem('gemini_api_key')) ||
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) ||
      ''
    );
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const chatScrollRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const PRELOADED_QUESTIONS = isEn ? [
    {
      label: "90/120-Day Rule",
      query: "What is the 90 or 120-day rule for platform gig worker social security under Central Rules?"
    },
    {
      label: "₹5 Lakh Health Cover",
      query: "When will gig delivery workers receive Ayushman Bharat PM-JAY coverage?"
    },
    {
      label: "Unfair ID Block",
      query: "Can an aggregator platform deactivate or block my delivery ID without notice?"
    },
    {
      label: "Official Helplines",
      query: "What are the official national grievance and emergency helpline numbers for gig workers?"
    }
  ] : isHi ? [
    {
      label: "90/120 दिन नियम",
      query: "सामाजिक सुरक्षा के लिए 90 या 120 दिन का क्या नियम है?"
    },
    {
      label: "₹5 लाख स्वास्थ्य बीमा",
      query: "आयुष्मान भारत PM-JAY योजना का लाभ गिग वर्कर को कब मिलेगा?"
    },
    {
      label: "अनुचित आईडी ब्लॉक",
      query: "क्या प्लेटफॉर्म बिना नोटिस मेरी आईडी ब्लॉक कर सकता है?"
    },
    {
      label: "आधिकारिक हेल्पलाइन",
      query: "शिकायत या आपातकाल के लिए सरकारी हेल्पलाइन नंबर क्या हैं?"
    }
  ] : [
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

  const handleSend = async (userText) => {
    const q = userText || inputQuery;
    if (!q.trim() || isTyping) return;

    const newMsgs = [...messages, { role: 'user', text: q }];
    setMessages(newMsgs);
    setInputQuery('');
    setIsTyping(true);

    try {
      const response = await askGeminiAssistant(q, apiKey, currentLang);
      setMessages([
        ...newMsgs,
        {
          role: 'assistant',
          text: response.text,
          source: response.source,
          model: response.model || null,
          citationId: response.citationId || null,
          sourceUrl: response.sourceUrl || null
        }
      ]);
    } catch (err) {
      setMessages([
        ...newMsgs,
        {
          role: 'assistant',
          text: isEn 
            ? "Sorry, there was a temporary error retrieving the legal citation. Please try again or call National Helpline at 1915."
            : "माफ़ करें, उत्तर लाने में अस्थायी समस्या हुई। कृपया दोबारा पूछें या 1915 पर कॉल करें।",
          source: 'error'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // If opened with an initial query from dashboard/shortcuts, execute it
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSend(initialQuery.trim());
    }
  }, [initialQuery]);

  const saveApiKey = () => {
    const trimmed = keyInput.trim();
    if (trimmed) {
      localStorage.setItem('gemini_api_key', trimmed);
      setApiKey(trimmed);
    } else {
      localStorage.removeItem('gemini_api_key');
      setApiKey('');
    }
    setShowKeyModal(false);
  };

  const toggleSpeech = (text, index) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      const msg = isEn ? "Text-to-Speech is not supported in your browser." : "आपके ब्राउज़र में आवाज़ (Text-to-Speech) समर्थित नहीं है।";
      if (onNotify) {
        onNotify(msg, 'warning');
      }
      return;
    }

    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown/citations for cleaner audio voice output
    const cleanSpeechText = text
      .replace(/【.*?】/g, '')
      .replace(/\[Verified Citation:.*?\]/g, '')
      .replace(/\[KB-\d+\]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[*#_~]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    utterance.lang = isEn ? 'en-IN' : 'hi-IN';
    utterance.rate = 0.95;

    // Pick voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = isEn
      ? voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en'))
      : voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);

    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-3">
      {/* Engine Status & API Key Header Bar */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          {apiKey ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Google Gemini 2.5 Flash Live</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[10px] text-amber-800 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>{isEn ? "Verified Legal KB (Local)" : "सत्यापित कानूनी डेटाबेस (Local)"}</span>
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            setKeyInput(apiKey);
            setShowKeyModal(true);
          }}
          className="flex items-center gap-1 text-[10px] font-semibold text-slate-700 hover:text-slate-900 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 transition-colors min-h-[32px] cursor-pointer"
          title={isEn ? "Configure Google Gemini API Key" : "Google Gemini API Key जोड़ें या बदलें"}
        >
          <Key className="w-3 h-3 text-amber-600" />
          <span>{apiKey ? (isEn ? 'API Key Active' : 'API Key सक्रिय') : (isEn ? 'Add Google API' : 'Google API जोड़ें')}</span>
        </button>
      </div>

      {/* 1-Tap Questions */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
          {isEn ? "Verified Legal Prompts (1-Tap):" : "सत्यापित डेटाबेस प्रश्न (1-टैप):"}
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {PRELOADED_QUESTIONS.map((pq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(pq.query)}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 text-left text-xs text-slate-700 font-medium transition-all truncate min-h-[44px] cursor-pointer"
            >
              {pq.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div
        ref={chatScrollRef}
        className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-2.5 min-h-[220px] max-h-[300px] overflow-y-auto"
      >
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 ${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.role === 'assistant' && (
              <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                {m.source === 'gemini_api' ? <Sparkles className="w-3.5 h-3.5 text-blue-600" /> : <Bot className="w-3.5 h-3.5 text-blue-600" />}
              </div>
            )}
            <div
              className={`p-3 rounded-2xl max-w-[88%] text-xs leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-slate-900 text-white font-semibold rounded-tr-none shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none font-sans shadow-2xs'
              }`}
            >
              {/* Message Source & Audio bar */}
              {m.role === 'assistant' && (
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1 font-mono">
                    {m.source === 'gemini_api' ? (
                      <span className="text-emerald-700 font-semibold">✨ Gemini 2.5 Flash</span>
                    ) : (
                      <span className="text-blue-700 font-semibold">⚖️ Central Rules 2026 KB</span>
                    )}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleSpeech(m.text, idx)}
                    className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-800 transition-colors px-1 py-0.5 rounded cursor-pointer"
                    title={speakingIndex === idx ? (isEn ? "Stop Audio" : "आवाज़ बंद करें") : (isEn ? "Listen Out Loud" : "आवाज़ में सुनें")}
                  >
                    {speakingIndex === idx ? (
                      <>
                        <VolumeX className="w-3 h-3 text-rose-500 animate-pulse" />
                        <span className="text-rose-600 font-medium">{isEn ? 'Stop' : 'बंद करें'}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3 text-slate-600" />
                        <span>{isEn ? 'Listen' : 'बोलकर सुनो'}</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Message Text */}
              <div>{m.text}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono pl-8">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping" />
            <span>
              {apiKey 
                ? (isEn ? "Analyzing via Google Gemini 2.5 Flash..." : "Google Gemini 2.5 Flash से कानूनी विश्लेषण हो रहा है...") 
                : (isEn ? "Generating verified answer from statutory database..." : "सत्यापित डेटाबेस से उत्तर तैयार हो रहा है...")}
            </span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={apiKey 
            ? (isEn ? "Ask Google Gemini for legal & rights advice..." : "Google Gemini से कानूनी सलाह पूछें...") 
            : (isEn ? "Ask in English, Hindi, or Hinglish..." : "हिंदी या Hinglish में पूछें...")}
          className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 min-h-[44px] shadow-2xs"
        />

        <button
          type="button"
          onClick={() => handleSend()}
          disabled={isTyping}
          className="w-11 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shrink-0 transition-all font-bold min-h-[44px] min-w-[44px] disabled:opacity-50 cursor-pointer shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Official Emergency & Grievance Helpline Speed-Dial */}
      <div className="flex items-center justify-between pt-1 px-1 text-[11px] text-slate-500">
        <span>{isEn ? "Official Helplines:" : "आधिकारिक सहायता:"}</span>
        <div className="flex items-center gap-2 font-mono">
          <a href="tel:1915" className="text-amber-700 hover:underline">{isEn ? "1915 (Consumer)" : "1915 (उपभोक्ता)"}</a>
          <span className="text-slate-300">•</span>
          <a href="tel:14434" className="text-blue-700 hover:underline">14434 (e-Shram)</a>
          <span className="text-slate-300">•</span>
          <a href="tel:112" className="text-rose-700 hover:underline">{isEn ? "112 (Emergency)" : "112 (आपातकाल)"}</a>
        </div>
      </div>

      {/* Google API Key Configuration Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-5 space-y-3.5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  {isEn ? "Google Gemini API Setup" : "Google Gemini API सेटअप"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 min-h-[32px] min-w-[32px] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {isEn 
                ? "Enter your Google Gemini 2.5 Flash API Key to enable natural language legal reasoning grounded in verified Indian Labour Gazette rules." 
                : "Google Gemini 2.5 Flash API Key जोड़ें। यह प्राकृतिक भाषा और जटिल कानूनी सवालों के सटीक Hinglish जवाब देता है।"}
            </p>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-700 block">
                Google Gemini API Key:
              </label>
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            <div className="text-[11px] text-slate-500 space-y-1">
              <div>
                🔒 <span className="text-slate-700 font-medium">{isEn ? "Secure:" : "सुरक्षित:"}</span> {isEn ? "Stored locally in your browser only." : "यह API Key सिर्फ आपके ब्राउज़र के LocalStorage में सुरक्षित रहती है।"}
              </div>
              <div>
                🔑 {isEn ? "Get a free key here: " : "मुफ्त की यहाँ से लें: "}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Google AI Studio ↗
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={saveApiKey}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 min-h-[40px] transition-colors cursor-pointer shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isEn ? "Save" : "सहेजें (Save)"}</span>
              </button>
              {apiKey && (
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('gemini_api_key');
                    setApiKey('');
                    setKeyInput('');
                    setShowKeyModal(false);
                  }}
                  className="px-3 bg-slate-100 hover:bg-rose-50 text-rose-600 border border-slate-200 hover:border-rose-200 rounded-xl text-xs py-2 min-h-[40px] transition-colors cursor-pointer"
                >
                  {isEn ? "Remove" : "हटाएं"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
