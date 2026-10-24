import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { RIDER_PROFILE } from '../data/mockData';

export default function AskSaathiAssistant({ onNavigateTab }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `नमस्ते रवि। मैं आपका साथी AI हूँ। कमाई का हिसाब, ई-श्रम और आयुष्मान भारत स्कीम, या गलत पेनल्टी हटाने के बारे में आप हिंदी, पंजाबी या अंग्रेजी में पूछ सकते हैं।`
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const PRELOADED_QUESTIONS = [
    {
      label: "आईडी ब्लॉक नियम",
      query: "क्या कंपनी बिना कारण बताए मेरी आईडी ब्लॉक कर सकती है?",
      reply: `नहीं। सामाजिक सुरक्षा संहिता (Code on Social Security 2020) के तहत एग्रीगेटर को कारण बताओ नोटिस और अपील का अवसर देना जरूरी है। यदि आपकी आईडी बिना कारण ब्लॉक हुई है, तो 'Pay Audit' टैब में जाकर तुरंत टाइमस्टैम्प के साथ फॉर्मल अपील कॉपी करें।`
    },
    {
      label: "₹5 लाख स्वास्थ्य बीमा",
      query: "मुझे आयुष्मान भारत और ई-श्रम का फायदा कब मिलेगा?",
      reply: `आप ज़ोमैटो पर 84 दिन पूरे कर चुके हैं। सामाजिक सुरक्षा संहिता की धारा 114 के अनुसार 90 दिन पूरे होते ही आप ₹5 लाख कैशलेस अस्पताल इलाज (AB-PMJAY) और ₹2 लाख ई-श्रम दुर्घटना बीमा के हकदार बन जाएंगे। बस 6 और शिफ्ट बाकी हैं!`
    },
    {
      label: "बारिश में कम पेमेंट",
      query: "कल बारिश में ऑर्डर दिए पर सर्ज पे नहीं मिला, क्या करूँ?",
      reply: `यह मिसिंग वेदर सर्ज का मामला है। 'Pay Audit' टैब में उस ऑर्डर को चेक करें। सिस्टम ने ₹20 का सर्ज न मिलने की कमी पकड़ी है, जिसका अपील ड्राफ्ट 1-क्लिक में तैयार है।`
    },
    {
      label: "गलत कैंसिलेशन पेनल्टी",
      query: "कस्टमर ने गलत एड्रेस डाला और ₹80 पेनल्टी लग गई, कैसे हटाऊँ?",
      reply: `रेस्तरां में 15 मिनट से ज्यादा इंतजार के बाद यदि ग्राहक ऑर्डर रद्द करता है, तो डिलीवरी पार्टनर पर पेनल्टी लगाना नियमों के विरुद्ध है। हमारी तैयार शिकायत को सपोर्ट में भेजें।`
    }
  ];

  const handleSendQuery = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const newMsgs = [...messages, { role: 'user', text: query }];
    setMessages(newMsgs);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = `आपकी बात समझ आ गई, रवि। आपके 84-दिन के ट्रैक रिकॉर्ड और 4.82 रेटिंग के आधार पर यह सीधे नियमों के तहत आता है। आप इसे संबंधित टैब से आसानी से हल कर सकते हैं।`;

      const found = PRELOADED_QUESTIONS.find(q => query.toLowerCase().includes(q.query.slice(0, 8).toLowerCase()));
      if (found) {
        replyText = found.reply;
      } else if (query.includes('petrol') || query.includes('kamai')) {
        replyText = `पेट्रोल खर्च और असली बचत देखने के लिए 'Shift Logger' का उपयोग करें। हमारे डेटा के अनुसार, चंडीगढ़ में रात की शिफ्ट में दोपहर से 275% ज्यादा असली बचत होती है।`;
      } else if (query.includes('penalty') || query.includes('kaat')) {
        replyText = `कंपनी द्वारा काटी गई पेनल्टी को चुनौती देने के लिए 'Pay Audit' टैब में जाकर सीधे अपील कॉपी कर लें।`;
      }

      setMessages([...newMsgs, { role: 'assistant', text: replyText }]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="space-y-3">
      {/* Quick Prompts */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block">
          अक्सर पूछे जाने वाले सवाल:
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {PRELOADED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(q.query)}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-left text-xs text-zinc-300 font-medium transition-all truncate"
            >
              {q.label}
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
              className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                m.role === 'user'
                  ? 'bg-zinc-100 text-zinc-900 font-semibold rounded-tr-none'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono pl-8">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
            <span>Saathi AI is responding...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
          placeholder="हिंदी या Hinglish में पूछें..."
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
        />

        <button
          onClick={() => handleSendQuery()}
          className="w-9 h-9 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 flex items-center justify-center shrink-0 transition-all font-bold"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
