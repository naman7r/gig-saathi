import React, { useState } from 'react';
import HeaderCockpit from './components/HeaderCockpit';
import MobileOverview from './components/MobileOverview';
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
import JudgeBriefModal from './components/JudgeBriefModal';
import AuditEvidenceModal from './components/AuditEvidenceModal';
import Toast from './components/Toast';
import { 
  Home, Zap, FileSearch, ShieldCheck, Mic, Bot, Laptop, 
  Smartphone, Bike, Briefcase, Trophy, Sparkles 
} from 'lucide-react';
import { MOCK_PAYOUT_SLIPS } from './data/mockData';

export default function App() {
  const [viewMode, setViewMode] = useState('laptop'); // 'laptop' | 'mobile'
  const [laptopTheme, setLaptopTheme] = useState('desi'); // 'desi' (Plain-Speak Worker Mode with Audio) | 'clientdesk' (Pro Auditor Desk)
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'trips' | 'audits' | 'shield' | 'voice' | 'dispute'
  const [currentLang, setCurrentLang] = useState('hinglish');
  const [prefilledSlip, setPrefilledSlip] = useState(null);
  const [showAskModal, setShowAskModal] = useState(false);
  const [showJudgeModal, setShowJudgeModal] = useState(false);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [demoScenario, setDemoScenario] = useState('baseline'); // 'baseline' | 'rain_rush' | 'wage_theft'
  const [askQuery, setAskQuery] = useState('');
  const [activeModalContent, setActiveModalContent] = useState(null);
  const [toast, setToast] = useState(null); // { message, type }

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleDraftDisputeFromSlip = (slip) => {
    setPrefilledSlip(slip);
    setActiveTab('dispute');
  };

  const navSegments = currentLang === 'hi' ? [
    { id: 'overview', label: 'डैशबोर्ड', icon: Home },
    { id: 'trips', label: 'ऑर्डर रडार', icon: Zap },
    { id: 'audits', label: 'वेतन ऑडिट', icon: FileSearch },
    { id: 'shield', label: 'अधिकार कवच', icon: ShieldCheck },
    { id: 'voice', label: 'वॉइस लॉग', icon: Mic },
  ] : currentLang === 'hinglish' ? [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'trips', label: 'Trip Radar', icon: Zap },
    { id: 'audits', label: 'Pay Audit', icon: FileSearch },
    { id: 'shield', label: 'Govt Shield', icon: ShieldCheck },
    { id: 'voice', label: 'Voice Shift', icon: Mic },
  ] : [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'trips', label: 'Trip Radar', icon: Zap },
    { id: 'audits', label: 'Pay Audit', icon: FileSearch },
    { id: 'shield', label: 'Rights Shield', icon: ShieldCheck },
    { id: 'voice', label: 'Shift Logger', icon: Mic },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-slate-800 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Floating Viewport Controller (Laptop vs Mobile Switcher) */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-xs gap-2">
        
        {/* Left Side: Brand + Pitch Brief Button */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm shadow-xs font-bold shrink-0">
            <Bike className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-slate-900 hidden sm:inline">
            Giggy <span className="text-slate-400 font-normal text-xs">| Dual Viewport Cockpit</span>
          </span>

          {/* Executive Pitch Brief Button (Evaluator Walkthrough) */}
          <button
            onClick={() => setShowJudgeModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 shadow-2xs transition-all cursor-pointer"
            title="Open Executive Pitch & Architecture Brief for Evaluators"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Pitch Brief</span>
          </button>
        </div>

        {/* Center / Right: Demo Scenarios + Viewport Controls */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          
          {/* Quick Demo Simulator Toggles */}
          <div className="hidden lg:flex items-center bg-slate-100 border border-slate-200 rounded-full p-0.5 text-xs">
            <span className="px-2 py-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Simulator:
            </span>
            <button
              onClick={() => {
                setDemoScenario('baseline');
                showToast('Reset to standard afternoon shift baseline.', 'info');
              }}
              className={`px-2.5 py-1 rounded-full font-semibold transition-all cursor-pointer text-xs ${
                demoScenario === 'baseline' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              ☀️ Normal
            </button>
            <button
              onClick={() => {
                setDemoScenario('rain_rush');
                showToast('Simulated 6 PM Monsoon Rain Rush (+₹20/order surge) active!', 'info');
              }}
              className={`px-2.5 py-1 rounded-full font-semibold transition-all cursor-pointer text-xs ${
                demoScenario === 'rain_rush' ? 'bg-blue-600 text-white shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              🌧️ Rain Surge
            </button>
            <button
              onClick={() => {
                setDemoScenario('wage_theft');
                showToast('Algorithmic distance trimming flagged (-₹32). GPS telemetry audit evidence card generated!', 'warning');
                setShowEvidenceModal(true);
              }}
              className={`px-2.5 py-1 rounded-full font-semibold transition-all cursor-pointer text-xs ${
                demoScenario === 'wage_theft' ? 'bg-rose-600 text-white shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              🚨 Wage Skim (-₹32)
            </button>
          </div>

          {viewMode === 'laptop' && (
            <div className="hidden sm:flex items-center bg-slate-100 border border-slate-200 rounded-full p-1 text-xs">
              <button
                onClick={() => setLaptopTheme('desi')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                  laptopTheme === 'desi'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>
                  {currentLang === 'en'
                    ? 'Rider Cockpit'
                    : currentLang === 'hi'
                      ? 'सरल वर्कर मोड'
                      : 'सरल वर्कर मोड'}
                </span>
              </button>

              <button
                onClick={() => setLaptopTheme('clientdesk')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                  laptopTheme === 'clientdesk'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>
                  {currentLang === 'en'
                    ? 'Auditor Desk'
                    : currentLang === 'hi'
                      ? 'ऑडिट डेस्क'
                      : 'ऑडिट डेस्क'}
                </span>
              </button>
            </div>
          )}

          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-full p-1 shadow-inner">
            <button
              onClick={() => setViewMode('laptop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'laptop'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Laptop View</span>
            </button>

            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Rider Phone</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. LAPTOP VIEWS */}
      {/* ========================================================= */}
      {viewMode === 'laptop' && laptopTheme === 'desi' && (
        <SightlineDashboard 
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
          onNotify={showToast}
          onOpenAppeal={(slip) => {
            if (slip) setPrefilledSlip(slip);
            setActiveModalContent('appeal');
          }}
          onOpenAskAI={(query) => {
            if (query) setAskQuery(query);
            setShowAskModal(true);
          }}
          onSwitchToMobile={() => setViewMode('mobile')}
        />
      )}

      {viewMode === 'laptop' && laptopTheme === 'clientdesk' && (
        <ClientDeskDashboard 
          onOpenAppeal={(slip) => {
            if (slip) setPrefilledSlip(slip);
            setActiveModalContent('appeal');
          }}
          onOpenAskAI={(query) => {
            if (query) setAskQuery(query);
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
          <div className="w-full max-w-[420px] min-h-[850px] bg-slate-900 rounded-[48px] p-2.5 shadow-[0_25px_70px_rgba(15,23,42,0.25)] ring-1 ring-slate-800/80 flex flex-col relative">
            
            {/* Inner Phone Screen Display */}
            <div className="w-full flex-1 bg-[#F4F5F7] rounded-[40px] overflow-hidden flex flex-col relative border border-slate-200/80 text-slate-800">
              
              {/* In-Phone Header */}
              <HeaderCockpit
                currentLang={currentLang}
                setCurrentLang={setCurrentLang}
              />

              {/* In-Phone Daily Ticker */}
              <div className="px-4 py-2 bg-white border-b border-slate-200/90 flex items-center justify-between text-xs shadow-2xs">
                <div>
                  <span className="text-slate-500">
                    {currentLang === 'hi' ? 'सकल कमाई: ' : currentLang === 'hinglish' ? 'कुल कमाई: ' : 'Gross: '}
                  </span>
                  <span className="font-mono font-bold text-slate-900">₹1,120</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">
                    {currentLang === 'hi' ? 'शुद्ध बचत: ' : currentLang === 'hinglish' ? 'जेब में बचत: ' : 'Net Take-Home: '}
                  </span>
                  <span className="font-mono font-bold text-emerald-600">₹690</span>
                  <span className="text-[10px] text-slate-500 ml-1 font-mono">(₹69/hr)</span>
                </div>
              </div>

              {/* In-Phone Navigation Segment */}
              <div className="px-3.5 py-2.5">
                <div className="grid grid-cols-5 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
                  {navSegments.map((seg) => {
                    const Icon = seg.icon;
                    const isActive = activeTab === seg.id;
                    return (
                      <button
                        key={seg.id}
                        onClick={() => setActiveTab(seg.id)}
                        className={`py-1.5 rounded-xl text-xs font-semibold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                          isActive
                            ? 'bg-slate-900 text-white font-bold shadow-xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span className="text-[10px] truncate">{seg.label.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* In-Phone Scrollable Screen Body */}
              <div className="flex-1 px-3.5 pb-20 overflow-y-auto space-y-3">
                {activeTab === 'overview' && (
                  <MobileOverview 
                    currentLang={currentLang} 
                    onOpenAppeal={handleDraftDisputeFromSlip} 
                    onOpenEvidenceCert={() => setShowEvidenceModal(true)}
                    onNotify={showToast} 
                    demoScenario={demoScenario}
                  />
                )}
                {activeTab === 'trips' && <OrderEvaluator currentLang={currentLang} onNotify={showToast} />}
                {activeTab === 'audits' && <SlipScanner currentLang={currentLang} onDraftDispute={handleDraftDisputeFromSlip} />}
                {activeTab === 'shield' && (
                  <div className="space-y-3">
                    <SocialSecurityShield currentLang={currentLang} />
                    <DocumentHelper currentLang={currentLang} onNotify={showToast} />
                    <SafetyGuardian currentLang={currentLang} />
                  </div>
                )}
                {activeTab === 'voice' && <VoiceShiftLogger currentLang={currentLang} />}
                {activeTab === 'dispute' && <DisputeDrafter currentLang={currentLang} prefilledSlip={prefilledSlip} onNotify={showToast} />}
              </div>

              {/* In-Phone Floating Ask AI Pill */}
              <div className="absolute bottom-3 left-0 right-0 px-3.5 z-40">
                <button
                  onClick={() => setShowAskModal(true)}
                  className="w-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-800 py-2.5 px-3 rounded-2xl shadow-lg flex items-center justify-between text-xs font-medium cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-700 text-[11px] truncate font-medium">
                      {currentLang === 'en' 
                        ? 'Ask Giggy AI for instant legal advice...' 
                        : currentLang === 'hi' 
                          ? 'गिगी (Giggy) AI से नियम या अधिकार पूछें...' 
                          : 'Giggy AI से हिंदी या Hinglish में पूछें...'}
                    </span>
                  </div>
                  <span className="text-[10px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full text-slate-700 font-semibold shrink-0">
                    {currentLang === 'en' ? 'Ask AI' : currentLang === 'hi' ? 'पूछें' : 'पूछो'}
                  </span>
                </button>
              </div>

              {/* In-Phone Bottom Home Bar */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-400/80 rounded-full z-50 pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      {/* Appeal Generator Modal (Accessible from Laptop Dashboard) */}
      {activeModalContent === 'appeal' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-2xl text-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Formal Grievance Appeal Draft</h3>
              <button 
                onClick={() => setActiveModalContent(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>
            <DisputeDrafter 
              prefilledSlip={prefilledSlip || MOCK_PAYOUT_SLIPS[0]} 
              onNotify={showToast} 
              currentLang={currentLang}
            />
          </div>
        </div>
      )}

      {/* Grounded Assistant Modal */}
      {showAskModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl text-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Giggy AI Companion</h3>
                  <p className="text-[10px] text-slate-500">Central Rules 2026 Grounded Guidance</p>
                </div>
              </div>

              <button 
                type="button"
                onClick={() => setShowAskModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-400 hover:text-slate-800 flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            <AskSaathiAssistant 
              currentLang={currentLang} 
              initialQuery={askQuery}
              onNotify={showToast} 
            />
          </div>
        </div>
      )}

      {/* Executive Pitch & Evaluator Brief Modal */}
      <JudgeBriefModal 
        isOpen={showJudgeModal} 
        onClose={() => setShowJudgeModal(false)} 
      />

      {/* Verifiable GPS Telemetry & Statutory Audit Certificate Modal */}
      <AuditEvidenceModal 
        isOpen={showEvidenceModal} 
        onClose={() => setShowEvidenceModal(false)} 
        onNotify={showToast} 
      />

      {/* Global Toast Notification */}
      <Toast 
        message={toast?.message} 
        type={toast?.type} 
        onClose={() => setToast(null)} 
      />
    </div>
  );
}
