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
import ClientDeskDashboard from './components/ClientDeskDashboard';
import SightlineDashboard from './components/SightlineDashboard';
import { Zap, FileSearch, ShieldCheck, Mic, Bot, Laptop, Smartphone } from 'lucide-react';
import { MOCK_PAYOUT_SLIPS } from './data/mockData';

export default function App() {
  const [viewMode, setViewMode] = useState('laptop'); // 'laptop' | 'mobile'
  const [activeTab, setActiveTab] = useState('trips'); // 'trips' | 'audits' | 'shield' | 'voice' | 'dispute'
  const [currentLang, setCurrentLang] = useState('hinglish');
  const [prefilledSlip, setPrefilledSlip] = useState(null);
  const [showAskModal, setShowAskModal] = useState(false);
  const [activeModalContent, setActiveModalContent] = useState(null);

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
    <div className="min-h-screen bg-[#F4F5F7] text-slate-800 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Floating Viewport Controller (Laptop vs Mobile Switcher) */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-6 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm shadow-xs font-bold">
            🛵
          </div>
          <span className="font-extrabold text-sm tracking-tight text-slate-900">
            GigSaathi <span className="text-slate-400 font-normal text-xs">| Dual Viewport Cockpit</span>
          </span>
        </div>

        {/* Viewport Toggle */}
        <div className="flex items-center bg-slate-100 border border-slate-200 rounded-full p-1 shadow-inner">
          <button
            onClick={() => setViewMode('laptop')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              viewMode === 'laptop'
                ? 'bg-slate-900 text-white shadow-sm font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Laptop Dashboard</span>
          </button>

          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              viewMode === 'mobile'
                ? 'bg-slate-900 text-white shadow-sm font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Rider Mobile Frame</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. LAPTOP STUDIO VIEW (Scrolltide Client Desk Flagship) */}
      {/* ========================================================= */}
      {viewMode === 'laptop' && (
        <ClientDeskDashboard 
          onOpenAppeal={(slip) => {
            if (slip) setPrefilledSlip(slip);
            setActiveModalContent('appeal');
          }}
          onOpenAskAI={(query) => {
            setShowAskModal(true);
          }}
          onSwitchToMobile={() => setViewMode('mobile')}
        />
      )}

      {/* ========================================================= */}
      {/* 2. RIDER MOBILE VIEW (Smartphone Mockup Frame) */}
      {/* ========================================================= */}
      {viewMode === 'mobile' && (
        <div className="flex-1 flex items-center justify-center py-8 px-4 bg-[#F4F5F7]">
          {/* Smartphone Frame Mockup */}
          <div className="w-full max-w-[400px] min-h-[820px] bg-zinc-950 rounded-[44px] border-[8px] border-zinc-800 shadow-[0_30px_90px_rgba(0,0,0,0.35)] ring-1 ring-zinc-700/80 flex flex-col relative overflow-hidden text-zinc-100">
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

      {/* Appeal Generator Modal (Accessible from Laptop Dashboard) */}
      {activeModalContent === 'appeal' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl text-zinc-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-base font-bold text-zinc-100">Formal Grievance Appeal Draft</h3>
              <button 
                onClick={() => setActiveModalContent(null)}
                className="w-8 h-8 rounded-full bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>
            <DisputeDrafter prefilledSlip={MOCK_PAYOUT_SLIPS[0]} />
          </div>
        </div>
      )}

      {/* Grounded Assistant Modal */}
      {showAskModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-md w-full p-6 shadow-2xl text-zinc-100 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
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

            <AskSaathiAssistant />
          </div>
        </div>
      )}
    </div>
  );
}
