import React, { useState } from 'react';
import HeaderCockpit from './components/HeaderCockpit';
import OrderEvaluator from './components/OrderEvaluator';
import SlipScanner from './components/SlipScanner';
import SocialSecurityShield from './components/SocialSecurityShield';
import VoiceShiftLogger from './components/VoiceShiftLogger';
import DisputeDrafter from './components/DisputeDrafter';
import WelfareNavigator from './components/WelfareNavigator';
import { Zap, FileSearch, ShieldCheck, Mic, Scale, Building2, HelpCircle, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState('evaluator');
  const [prefilledSlipForDispute, setPrefilledSlipForDispute] = useState(null);
  const [showPitchModal, setShowPitchModal] = useState(false);

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

  const navItems = [
    { id: 'evaluator', label: 'Order Evaluator', short: 'Evaluator', icon: Zap, badge: 'Live Ping' },
    { id: 'scanner', label: 'Slip Scanner', short: 'Scanner', icon: FileSearch, badge: 'OCR' },
    { id: 'shield', label: '90-Day Shield', short: 'Shield', icon: ShieldCheck, badge: 'Day 84' },
    { id: 'voice', label: 'Voice Logger', short: 'Voice', icon: Mic, badge: 'Hinglish' },
    { id: 'dispute', label: 'Dispute Drafter', short: 'Dispute', icon: Scale },
    { id: 'welfare', label: 'Govt Schemes', short: 'Schemes', icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      {/* Centered Mobile Tactical Frame */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-[#0B0F19] border-x border-slate-800/80 flex flex-col shadow-2xl relative">
        {/* Cockpit Header */}
        <HeaderCockpit activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Quick High-Level Financial Reality Ticker */}
        <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">Today's Payout: </span>
            <span className="font-mono font-bold text-slate-100">₹1,120</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400">Real Take-Home: </span>
            <span className="font-mono font-black text-emerald-400">₹690</span>
            <span className="text-[10px] text-slate-500 font-mono ml-1">(₹69/hr)</span>
          </div>
        </div>

        {/* Tactical Tab Pills Bar (Top Sub-Nav) */}
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

        {/* Main Dynamic Viewport */}
        <main className="flex-1 p-4 pb-24 overflow-y-auto">
          {activeTab === 'evaluator' && <OrderEvaluator />}
          {activeTab === 'scanner' && <SlipScanner onDraftDispute={handleDraftDisputeFromSlip} />}
          {activeTab === 'shield' && <SocialSecurityShield />}
          {activeTab === 'voice' && <VoiceShiftLogger />}
          {activeTab === 'dispute' && <DisputeDrafter prefilledSlip={prefilledSlipForDispute} />}
          {activeTab === 'welfare' && <WelfareNavigator />}
        </main>

        {/* Quick Pitch Cheat Sheet Toggle Floating Button */}
        <div className="fixed bottom-20 right-4 z-30 max-w-md mx-auto">
          <button
            onClick={() => {
              setShowPitchModal(true);
              handleConfetti();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold px-3 py-2 rounded-full shadow-xl shadow-amber-500/30 text-xs border border-amber-300 transition-all hover:scale-105"
          >
            <Trophy className="w-4 h-4" />
            <span>Pitch Cheat Sheet (20 Pts)</span>
          </button>
        </div>

        {/* Bottom Thumb-Friendly Navigation Bar */}
        <nav className="fixed bottom-0 w-full max-w-md bg-[#0B0F19]/95 backdrop-blur-md border-t border-slate-800 py-1.5 px-2 flex justify-around items-center z-40">
          {navItems.map((item) => {
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
        </nav>

        {/* Modal: Live Pitch Cheat Sheet */}
        {showPitchModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0F172A] border border-amber-500/40 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 font-mono uppercase tracking-wider">
                    InnoSprint 2.0 • 100/100 Pitch Guide
                  </span>
                  <h3 className="text-base font-bold text-slate-100">GigSaathi 5-Minute Script</h3>
                </div>
                <button
                  onClick={() => setShowPitchModal(false)}
                  className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <strong className="text-amber-400">1. The Hook (0:00 - 1:00)</strong>
                  <p className="mt-1">
                    "Meet Ravi in Chandigarh. At 11 PM, his app shows ₹1,120 earned after 10 hours. He feels happy. But after subtracting ₹290 fuel, ₹80 bike maintenance, and an unfair cancellation penalty, Ravi took home ₹690 — just ₹69/hour! In India today, 10M gig workers are trapped in this illusion of earnings."
                  </p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <strong className="text-amber-400">2. Hard Data (1:00 - 1:45)</strong>
                  <p className="mt-1">
                    • <strong>IDinsight Study</strong>: Delivery partners lose 32% of gross earnings to operating costs.<br />
                    • <strong>Asia Foundation</strong>: 42% found dispute resolution exhausting, 36% unresolved.<br />
                    • <strong>NITI Aayog</strong>: Growing to 23.5 Million workers by 2030 with zero safety net.
                  </p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <strong className="text-amber-400">3. The 3 Live Wow Moments (1:45 - 3:30)</strong>
                  <p className="mt-1">
                    • <strong>Evaluator Tab</strong>: Show Order #1 (₹52 gross &rarr; ₹19/hr net after deadhead). AI says 🔴 <strong>SKIP</strong>.<br />
                    • <strong>Slip Scanner</strong>: Upload receipt; AI detects ₹32 underpayment from missing rain surge.<br />
                    • <strong>Shield Tab</strong>: Show Day 84 of 90 streak under India's Code on Social Security!
                  </p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <strong className="text-amber-400">4. Answer to Judges ("Why won't Swiggy build this?")</strong>
                  <p className="mt-1">
                    "Platforms have a direct conflict of interest. They highlight gross payouts to keep riders on roads. Only an independent worker-owned AI companion can show net take-home and defend their rights."
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowPitchModal(false)}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20"
              >
                Back to Live Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
