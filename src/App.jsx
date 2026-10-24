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
import { Zap, FileSearch, ShieldCheck, Mic, Bot, Laptop, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState('laptop'); // 'laptop' | 'mobile'
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
      {/* Top Floating Viewport Switcher (Judge Presentation Control) */}
      <div className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-sm">
            🛵
          </div>
          <span className="font-bold text-xs tracking-tight text-zinc-200">
            GigSaathi <span className="text-zinc-500 font-normal">| Live Presentation Deck</span>
          </span>
        </div>

        {/* The Toggle: Laptop View vs Mobile Screen */}
        <div className="flex items-center bg-zinc-900 border border-zinc-700/80 rounded-full p-1 shadow-inner">
          <button
            onClick={() => setViewMode('laptop')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              viewMode === 'laptop'
                ? 'bg-zinc-100 text-zinc-900 shadow-md'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Laptop Dashboard</span>
          </button>

          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              viewMode === 'mobile'
                ? 'bg-amber-500 text-black shadow-md font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Rider Mobile View</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. LAPTOP COCKPIT VIEW (Full Widescreen Experience for Judges) */}
      {/* ========================================================= */}
      {viewMode === 'laptop' && (
        <div className="flex-1 w-full max-w-7xl mx-auto p-6 space-y-6 animate-fadeIn">
          {/* Top Widescreen Banner */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-zinc-100">Ravi Kumar's Cockpit</h2>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-zinc-500 font-mono">Chandigarh Hub (Sec 35) • Zomato + Swiggy</span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Real-time income protection, algorithmic fairness, and statutory rights monitoring.
              </p>
            </div>

            {/* Environmental & Language Controls */}
            <div className="flex items-center gap-3">
              <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl text-xs text-amber-300 font-medium">
                ☀️ 38°C Heatwave in Sec 35 • Hydration break due
              </div>

              <div className="flex bg-zinc-900 border border-zinc-800 rounded-full p-0.5 text-xs font-medium">
                {['hinglish', 'hi', 'en'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setCurrentLang(l)}
                    className={`px-2.5 py-1 rounded-full capitalize transition-all ${
                      currentLang === l ? 'bg-zinc-800 text-zinc-100 font-bold' : 'text-zinc-500'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3-Column Pro Grid Layout */}
          <div className="grid grid-cols-12 gap-6 items-start">
            {/* Left Column: Financial Reality & Statutory Streak */}
            <div className="col-span-12 lg:col-span-4 space-y-5">
              {/* Financial Truth Card */}
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 shadow-xl space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-medium text-zinc-400 block">Today's Real Take-Home (Net Profit)</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-extrabold text-zinc-100 font-mono tracking-tight">₹690</span>
                      <span className="text-xs font-bold text-emerald-400 font-mono">₹69/hr</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 font-mono block">Daily Target: ₹1,000</span>
                    <span className="text-xs font-semibold text-zinc-300 font-mono">69% reached</span>
                  </div>
                </div>

                <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '69%' }} />
                </div>

                <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-3 gap-2 text-center text-xs">
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

              {/* Statutory Social Security Progress */}
              <SocialSecurityShield />

              {/* Document Readiness */}
              <DocumentHelper />
            </div>

            {/* Middle Column: Active Workflows (Trip Radar / Pay Audit / Dispute) */}
            <div className="col-span-12 lg:col-span-5 space-y-4">
              {/* Clean Segment Controller */}
              <div className="grid grid-cols-4 bg-zinc-900 p-1 rounded-2xl border border-zinc-800">
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
                      <span className="text-[11px] truncate">{seg.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Workflow Body */}
              <div className="transition-all duration-300">
                {activeTab === 'trips' && <OrderEvaluator />}
                {activeTab === 'audits' && <SlipScanner onDraftDispute={handleDraftDisputeFromSlip} />}
                {activeTab === 'shield' && <SafetyGuardian />}
                {activeTab === 'voice' && <VoiceShiftLogger />}
                {activeTab === 'dispute' && <DisputeDrafter prefilledSlip={prefilledSlip} />}
              </div>
            </div>

            {/* Right Column: Conversational GenAI Assistant & Live Road Guard */}
            <div className="col-span-12 lg:col-span-3 space-y-5">
              {/* Ask Saathi GenAI Widget */}
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 shadow-xl space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold">
                    🤖
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-100">Ask Saathi AI</h3>
                    <p className="text-[10px] text-zinc-400">Grounded in Central Rules 2026</p>
                  </div>
                </div>

                <AskSaathiAssistant onNavigateTab={setActiveTab} />
              </div>

              {/* Road & Health Guard */}
              <SafetyGuardian />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. RIDER MOBILE VIEW (Realistic Smartphone Frame for Pitch) */}
      {/* ========================================================= */}
      {viewMode === 'mobile' && (
        <div className="flex-1 flex items-center justify-center py-6 px-4 animate-fadeIn">
          {/* Smartphone Frame Mockup */}
          <div className="w-full max-w-[400px] min-h-[820px] bg-zinc-950 rounded-[44px] border-[8px] border-zinc-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-zinc-700/80 flex flex-col relative overflow-hidden">
            {/* Dynamic Island / Speaker Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-50 flex items-center justify-end px-2">
              <span className="w-2 h-2 rounded-full bg-zinc-800" />
            </div>

            {/* In-Phone Header */}
            <HeaderCockpit
              currentLang={currentLang}
              setCurrentLang={setCurrentLang}
            />

            {/* In-Phone Daily Ticker */}
            <div className="px-4 py-2 bg-zinc-900/80 border-b border-zinc-800/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-zinc-500">Gross: </span>
                <span className="font-mono font-bold text-zinc-200">₹1,120</span>
              </div>
              <div className="text-right">
                <span className="text-zinc-500">Net Take-Home: </span>
                <span className="font-mono font-bold text-emerald-400">₹690</span>
                <span className="text-[10px] text-zinc-500 ml-1 font-mono">(₹69/hr)</span>
              </div>
            </div>

            {/* In-Phone Navigation Segment */}
            <div className="px-4 py-2.5">
              <div className="grid grid-cols-4 bg-zinc-900/90 p-1 rounded-2xl border border-zinc-800">
                {navSegments.map((seg) => {
                  const Icon = seg.icon;
                  const isActive = activeTab === seg.id;
                  return (
                    <button
                      key={seg.id}
                      onClick={() => setActiveTab(seg.id)}
                      className={`py-1.5 rounded-xl text-xs font-semibold transition-all flex flex-col items-center justify-center gap-0.5 ${
                        isActive
                          ? 'bg-zinc-800 text-zinc-100 font-bold'
                          : 'text-zinc-500'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} />
                      <span className="text-[10px] truncate">{seg.label.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* In-Phone Scrollable Screen Body */}
            <div className="flex-1 px-4 pb-20 overflow-y-auto space-y-3">
              {activeTab === 'trips' && <OrderEvaluator />}
              {activeTab === 'audits' && <SlipScanner onDraftDispute={handleDraftDisputeFromSlip} />}
              {activeTab === 'shield' && (
                <div className="space-y-3">
                  <SocialSecurityShield />
                  <DocumentHelper />
                  <SafetyGuardian />
                </div>
              )}
              {activeTab === 'voice' && <VoiceShiftLogger />}
              {activeTab === 'dispute' && <DisputeDrafter prefilledSlip={prefilledSlip} />}
            </div>

            {/* In-Phone Floating Ask AI Pill */}
            <div className="absolute bottom-4 left-0 right-0 px-4 z-40">
              <button
                onClick={() => setShowAskModal(true)}
                className="w-full bg-zinc-900/95 border border-zinc-700/80 text-zinc-200 py-2.5 px-3 rounded-2xl shadow-xl flex items-center justify-between text-xs font-medium"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">
                    🤖
                  </div>
                  <span className="text-zinc-300 text-[11px]">Ask Saathi in Hindi or English...</span>
                </div>
                <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-400">Ask AI</span>
              </button>
            </div>

            {/* In-Phone Bottom Home Bar */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-zinc-600 rounded-full z-50 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Floating Ask Modal for Mobile Mode */}
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
                  <p className="text-[10px] text-zinc-400">Central Rules 2026 Grounded Guidance</p>
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
  );
}
