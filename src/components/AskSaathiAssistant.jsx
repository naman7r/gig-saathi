import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, ExternalLink, ShieldCheck, Key, Sparkles, Volume2, VolumeX, X, Check } from 'lucide-react';
import { askGeminiAssistant } from '../utils/geminiAssistant.js';

export default function AskSaathiAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      source: 'local_kb',
      text: `नमस्ते रवि। मैं आपका कानूनी व कल्याण साथी AI हूँ। हमारे पास सामाजिक सुरक्षा संहिता (Central Rules 2026), ई-श्रम, और आयुष्मान भारत का प्रमाणित डेटाबेस है। आप नीचे दिए गए प्रश्न चुन सकते हैं या हिंदी/अंग्रेजी में पूछ सकते हैं।`
    }
  ]);

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

  const handleSend = async (userText) => {
    const q = userText || inputQuery;
    if (!q.trim() || isTyping) return;

    const newMsgs = [...messages, { role: 'user', text: q }];
    setMessages(newMsgs);
    setInputQuery('');
    setIsTyping(true);

    try {
      const response = await askGeminiAssistant(q, apiKey);
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
          text: "माफ़ करें, उत्तर लाने में अस्थायी समस्या हुई। कृपया दोबारा पूछें या 1915 पर कॉल करें।",
          source: 'error'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

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
      alert("आपके ब्राउज़र में आवाज़ (Text-to-Speech) समर्थित नहीं है।");
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
      .replace(/\[KB-\d+\]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[*#_~]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95;

    // Pick Hindi or Indian English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));
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
      <div className="flex items-center justify-between pb-1 border-b border-zinc-800/80">
        <div className="flex items-center gap-1.5">
          {apiKey ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Google Gemini 2.5 Flash Live</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-400 font-semibold">
              <ShieldCheck className="w-3 h-3" />
              <span>सत्यापित कानूनी डेटाबेस (Local)</span>
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            setKeyInput(apiKey);
            setShowKeyModal(true);
          }}
          className="flex items-center gap-1 text-[10px] font-medium text-zinc-400 hover:text-zinc-200 px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 transition-colors min-h-[32px]"
          title="Google Gemini API Key जोड़ें या बदलें"
        >
          <Key className="w-3 h-3 text-amber-400" />
          <span>{apiKey ? 'API Key सक्रिय' : 'Google API जोड़ें'}</span>
        </button>
      </div>

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
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-left text-xs text-zinc-300 font-medium transition-all truncate min-h-[44px]"
            >
              {pq.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div
        ref={chatScrollRef}
        className="bg-zinc-950 rounded-2xl p-3 border border-zinc-800 space-y-2.5 min-h-[220px] max-h-[300px] overflow-y-auto"
      >
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 ${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.role === 'assistant' && (
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                {m.source === 'gemini_api' ? <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> : '🤖'}
              </div>
            )}
            <div
              className={`p-3 rounded-2xl max-w-[88%] text-xs leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-zinc-100 text-zinc-900 font-semibold rounded-tr-none'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none font-sans'
              }`}
            >
              {/* Message Source & Audio bar */}
              {m.role === 'assistant' && (
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-zinc-800/60 text-[10px] text-zinc-400">
                  <span className="flex items-center gap-1 font-mono">
                    {m.source === 'gemini_api' ? (
                      <span className="text-emerald-400 font-semibold">✨ Gemini 2.5 Flash</span>
                    ) : (
                      <span className="text-amber-400 font-semibold">⚖️ Central Rules 2026 KB</span>
                    )}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleSpeech(m.text, idx)}
                    className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-amber-400 transition-colors px-1 py-0.5 rounded"
                    title={speakingIndex === idx ? "आवाज़ बंद करें" : "आवाज़ में सुनें"}
                  >
                    {speakingIndex === idx ? (
                      <>
                        <VolumeX className="w-3 h-3 text-rose-400 animate-pulse" />
                        <span className="text-rose-400">बंद करें</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3" />
                        <span>बोलकर सुनो</span>
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
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono pl-8">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
            <span>
              {apiKey ? "Google Gemini 2.5 Flash से कानूनी विश्लेषण हो रहा है..." : "सत्यापित डेटाबेस से उत्तर तैयार हो रहा है..."}
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
          placeholder={apiKey ? "Google Gemini से कानूनी सलाह पूछें..." : "हिंदी या Hinglish में पूछें..."}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 min-h-[44px]"
        />

        <button
          type="button"
          onClick={() => handleSend()}
          disabled={isTyping}
          className="w-11 h-11 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 flex items-center justify-center shrink-0 transition-all font-bold min-h-[44px] min-w-[44px] disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Official Emergency & Grievance Helpline Speed-Dial */}
      <div className="flex items-center justify-between pt-1 px-1 text-[11px] text-zinc-400">
        <span>आधिकारिक सहायता:</span>
        <div className="flex items-center gap-2 font-mono">
          <a href="tel:1915" className="text-amber-400 hover:underline">1915 (उपभोक्ता)</a>
          <span className="text-zinc-600">•</span>
          <a href="tel:14434" className="text-blue-400 hover:underline">14434 (ई-श्रम)</a>
          <span className="text-zinc-600">•</span>
          <a href="tel:112" className="text-rose-400 hover:underline">112 (आपातकाल)</a>
        </div>
      </div>

      {/* Google API Key Configuration Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full p-4 space-y-3.5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Google Gemini API सेटअप</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 min-h-[32px] min-w-[32px] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Google Gemini 2.5 Flash API Key जोड़ें। यह प्राकृतिक भाषा और जटिल कानूनी सवालों के सटीक Hinglish जवाब देता है।
            </p>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-zinc-300 block">
                Google Gemini API Key:
              </label>
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div className="text-[11px] text-zinc-500 space-y-1">
              <div>
                🔒 <span className="text-zinc-400">सुरक्षित:</span> यह API Key सिर्फ आपके ब्राउज़र के LocalStorage में सुरक्षित रहती है।
              </div>
              <div>
                🔑 मुफ्त की यहाँ से लें:{" "}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline"
                >
                  Google AI Studio ↗
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={saveApiKey}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 min-h-[40px] transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                <span>सहेजें (Save)</span>
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
                  className="px-3 bg-zinc-800 hover:bg-rose-950/40 text-rose-400 border border-zinc-700 hover:border-rose-800 rounded-xl text-xs py-2 min-h-[40px] transition-colors"
                >
                  हटाएं
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
