import React, { useState } from 'react';
import HeaderCockpit from './components/HeaderCockpit';
import OrderEvaluator from './components/OrderEvaluator';
import SlipScanner from './components/SlipScanner';
import SocialSecurityShield from './components/SocialSecurityShield';
import VoiceShiftLogger from './components/VoiceShiftLogger';
import DisputeDrafter from './components/DisputeDrafter';
import WelfareNavigator from './components/WelfareNavigator';
import SafetyGuardian from './components/SafetyGuardian';
import DocumentHelper from './components/DocumentHelper';
import AskSaathiAssistant from './components/AskSaathiAssistant';
import { TRANSLATIONS } from './data/translations';
import { Zap, FileSearch, ShieldCheck, Mic, Scale, Building2, HeartPulse, FileText, Bot, Trophy, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState('evaluator');
  const [currentLang, setCurrentLang] = useState('hinglish');
  const [prefilledSlipForDispute, setPrefilledSlipForDispute] = useState(null);
  const [showPitchModal, setShowPitchModal] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const handleDraftDisputeFromSlip = (slip) => {
    setPrefilledSlipForDispute(slip);
    setActiveTab('dispute');
  };

  const handleConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // The 8 cohesive views mapping directly to the 5 official competition pillars
  const navItems = [
    { id: 'evaluator', label: t.tabs.evaluator, short: 'Evaluator', icon: Zap, badge: 'Live' },
    { id: 'scanner', label: t.tabs.scanner, short: 'Scanner', icon: FileSearch, badge: 'OCR' },
    { id: 'safety', label: t.tabs.safety, short: 'Safety', icon: HeartPulse, badge: 'Heat' },
    { id: 'docs', label: t.tabs.docs, short: 'Docs', icon: FileText, badge: 'e-Shram' },
    { id: 'shield', label: t.tabs.shield, short: 'Shield', icon: ShieldCheck, badge: 'Day 84' },
    { id: 'voice', label: t.tabs.voice, short: 'Voice', icon: Mic, badge: 'Voice' },
    { id: 'dispute', label: t.tabs.dispute, short: 'Dispute', icon: Scale },
    { id: 'ask', label: t.tabs.ask, short: 'Ask AI', icon: Bot, badge: 'AI' },
  ];

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      {/* Centered Mobile Frame */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-[#0B0F19] border-x border-slate-800/80 flex flex-col shadow-2xl relative">
        {/* Cockpit Header with Language Switcher */}
        <HeaderCockpit
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
        />

        {/* Financial Ticker Bar */}
        <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">{t.todayPayout}: </span>
            <span className="font-mono font-bold text-slate-100">₹1,120</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400">{t.realTakeHome}: </span>
            <span className="font-mono font-black text-emerald-400">₹690</span>
            <span className="text-[10px] text-slate-500 font-mono ml-1">(₹69/hr)</span>
          </div>
        </div>

        {/* Scrollable Top Pill Tabs */}
        <div className="px-3 py-2 bg-slate-950/60 border-b border-slate-800/80 flex gap-1.5 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-amber-400'}`} />
                <span>{item.short}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1 rounded font-mono ${
                    isActive ? 'bg-black/20 text-black' : 'bg-slate-800 text-amber-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Viewport */}
        <main className="flex-1 p-4 pb-24 overflow-y-auto">
          {activeTab === 'evaluator' && <OrderEvaluator />}
          {activeTab === 'scanner' && <SlipScanner onDraftDispute={handleDraftDisputeFromSlip} />}
          {activeTab === 'safety' && <SafetyGuardian lang={currentLang} />}
          {activeTab === 'docs' && <DocumentHelper />}
          {activeTab === 'shield' && <SocialSecurityShield />}
          {activeTab === 'voice' && <VoiceShiftLogger />}
          {activeTab === 'dispute' && <DisputeDrafter prefilledSlip={prefilledSlipForDispute} />}
          {activeTab === 'ask' && <AskSaathiAssistant onNavigateTab={setActiveTab} />}
        </main>

        {/* Floating Pitch Guide Button */}
        <div className="fixed bottom-20 right-4 z-30 max-w-md mx-auto">
          <button
            onClick={() => {
              setShowPitchModal(true);
              handleConfetti();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold px-3 py-2 rounded-full shadow-xl shadow-amber-500/30 text-xs border border-amber-300 transition-all hover:scale-105"
          >
            <Trophy className="w-4 h-4" />
            <span>Judge Guide (100 Pts)</span>
          </button>
        </div>

        {/* Bottom Thumb Navigation Bar */}
        <nav className="fixed bottom-0 w-full max-w-md bg-[#0B0F19]/95 backdrop-blur-md border-t border-slate-800 py-1.5 px-1 flex justify-around items-center z-40">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center p-1 rounded-xl transition-all ${
                  isActive ? 'text-amber-400 scale-105' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-amber-500/20' : 'bg-transparent'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold tracking-tight mt-0.5">{item.short}</span>
              </button>
            );
          })}
          {/* Ask AI button in bottom nav */}
          <button
            onClick={() => setActiveTab('ask')}
            className={`flex flex-col items-center justify-center p-1 rounded-xl transition-all ${
              activeTab === 'ask' ? 'text-amber-400 scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className={`p-1 rounded-lg ${activeTab === 'ask' ? 'bg-amber-500/20' : 'bg-transparent'}`}>
              <Bot className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-[10px] font-semibold tracking-tight mt-0.5">Ask AI</span>
          </button>
        </nav>

        {/* Modal: Evaluation Matrix Guide for the Team */}
        {showPitchModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0F172A] border border-amber-500/40 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 font-mono uppercase tracking-wider">
                    InnoSprint 2.0 • 100/100 Evaluation
                  </span>
                  <h3 className="text-base font-bold text-slate-100">All 5 Official Pillars Covered</h3>
                </div>
                <button
                  onClick={() => setShowPitchModal(false)}
                  className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <strong className="text-amber-400">1. Earnings Tracking:</strong> Order Evaluator + Slip OCR Scanner + Voice Shift Logger.
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <strong className="text-amber-400">2. Safety Practices:</strong> Extreme 38°C Heatwave Alerts + Fatigue Reaction Monitor + Night Gear Checklist + 1-Tap SOS.
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <strong className="text-amber-400">3. Rights & Welfare Schemes:</strong> 90-Day Social Security Shield (Day 84 of 90) + e-Shram & Ayushman Bharat Navigator.
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <strong className="text-amber-400">4. Document Help:</strong> Document Vault with Aadhaar, DL, e-Shram UAN, and 14-day PUC expiry alert.
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <strong className="text-amber-400">5. Grievance & Dispute Drafting:</strong> Formal policy-grounded appeal letters with timestamps and WhatsApp sharing.
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <strong className="text-amber-400">6. Multilingual GenAI:</strong> "Ask Saathi" Assistant answering in Hindi, Punjabi, Hinglish, and English!
                </div>
              </div>

              <button
                onClick={() => setShowPitchModal(false)}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20"
              >
                Back to Live Cockpit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
