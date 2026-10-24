import React, { useState } from 'react';
import HeaderCockpit from './components/HeaderCockpit';
import OrderEvaluator from './components/OrderEvaluator';
import SlipScanner from './components/SlipScanner';
import SocialSecurityShield from './components/SocialSecurityShield';
import VoiceShiftLogger from './components/VoiceShiftLogger';
import DisputeDrafter from './components/DisputeDrafter';
import SafetyGuardian from './components/SafetyGuardian';
import DocumentHelper from './components/DocumentHelper';
import AskSaathiAssistant from './components/AskSaathiAssistant';
import { Zap, FileSearch, ShieldCheck, Mic, Scale, Bot, Sparkles, ChevronRight, MessageSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('trips'); // 'trips' | 'audits' | 'shield' | 'voice' | 'dispute'
  const [currentLang, setCurrentLang] = useState('hinglish');
  const [prefilledSlip, setPrefilledSlip] = useState(null);
  const [showAskModal, setShowAskModal] = useState(false);

  const handleDraftDisputeFromSlip = (slip) => {
    setPrefilledSlip(slip);
    setActiveTab('dispute');
  };

  const navSegments = [
    { id: 'trips', label: 'Trip Radar', icon: Zap },
    { id: 'audits', label: 'Pay Audit', icon: FileSearch },
    { id: 'shield', label: 'Rights Shield', icon: ShieldCheck },
    { id: 'voice', label: 'Shift Logger', icon: Mic },
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      {/* Centered Mobile Tactical Frame */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-zinc-950 border-x border-zinc-800/60 flex flex-col shadow-2xl relative">
        {/* Header */}
        <HeaderCockpit
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
        />

        {/* Hero Financial Take-Home Card */}
        <div className="px-5 pt-4 pb-2">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/60 border border-zinc-800 rounded-3xl p-5 shadow-xl space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-medium text-zinc-400 block">
                  Today's Real Take-Home (Net Profit)
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-extrabold text-zinc-100 font-mono tracking-tight">
                    ₹690
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 font-mono">
                    ₹69/hr
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-zinc-500 font-mono block">Daily Target: ₹1,000</span>
                <span className="text-xs font-semibold text-zinc-300 font-mono">69% reached</span>
              </div>
            </div>

            {/* Target Progress Bar */}
            <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full transition-all duration-700" style={{ width: '69%' }} />
            </div>

            {/* Quick Financial Decomposition */}
            <div className="pt-2 border-t border-zinc-800/60 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="text-[10px] text-zinc-500 block">Gross Payout</span>
                <span className="font-semibold text-zinc-200 font-mono">₹1,120</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block">Fuel & Wear</span>
                <span className="font-semibold text-rose-400 font-mono">-₹370</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block">Deductions</span>
                <span className="font-semibold text-rose-400 font-mono">-₹60</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Segmented Navigation */}
        <div className="px-5 py-3">
          <div className="grid grid-cols-4 bg-zinc-900/90 p-1 rounded-2xl border border-zinc-800/80">
            {navSegments.map((seg) => {
              const Icon = seg.icon;
              const isActive = activeTab === seg.id;
              return (
                <button
                  key={seg.id}
                  onClick={() => setActiveTab(seg.id)}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1 ${
                    isActive
                      ? 'bg-zinc-800 text-zinc-100 shadow-sm font-bold'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} />
                  <span className="text-[11px] truncate tracking-tight">{seg.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Dynamic Viewport */}
        <main className="flex-1 px-5 pb-24 overflow-y-auto space-y-4">
          {activeTab === 'trips' && <OrderEvaluator />}
          {activeTab === 'audits' && <SlipScanner onDraftDispute={handleDraftDisputeFromSlip} />}
          {activeTab === 'shield' && (
            <div className="space-y-4">
              <SocialSecurityShield />
              <DocumentHelper />
              <SafetyGuardian lang={currentLang} />
            </div>
          )}
          {activeTab === 'voice' && <VoiceShiftLogger />}
          {activeTab === 'dispute' && <DisputeDrafter prefilledSlip={prefilledSlip} />}
        </main>

        {/* Floating Conversational AI Pill (Clean, Modern, Voice/Chat Prompt) */}
        <div className="fixed bottom-4 left-0 right-0 max-w-md mx-auto px-5 z-40">
          <button
            onClick={() => setShowAskModal(true)}
            className="w-full bg-zinc-900/95 hover:bg-zinc-800/95 border border-zinc-700/80 text-zinc-200 py-3 px-4 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center justify-between text-xs font-semibold transition-all group hover:scale-[1.01]"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-zinc-300 font-medium">Ask Saathi in Hindi, Punjabi or English...</span>
            </div>
            <span className="text-[11px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full border border-zinc-700 group-hover:text-zinc-200 transition-colors">
              Ask AI
            </span>
          </button>
        </div>

        {/* Conversational Assistant Modal */}
        {showAskModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
            <div className="bg-zinc-950 border border-zinc-800 rounded-t-3xl sm:rounded-3xl max-w-md w-full p-5 shadow-2xl max-h-[85vh] overflow-y-auto space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-100">Saathi AI Companion</h3>
                    <p className="text-[10px] text-zinc-400">Grounded advice on rights, schemes, and deductions</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAskModal(false)}
                  className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <AskSaathiAssistant onNavigateTab={(tab) => {
                setActiveTab(tab);
                setShowAskModal(false);
              }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
