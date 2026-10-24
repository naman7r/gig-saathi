import React, { useState } from 'react';
import { 
  Zap, FileSearch, ShieldCheck, ArrowRight, Clock, Navigation, Fuel, 
  Search, SlidersHorizontal, Calendar, Bell, Mail, ChevronDown, CheckCircle2, 
  XCircle, AlertCircle, TrendingUp, Sparkles, Home, Wallet, FileText, MessageSquare, 
  Settings, HelpCircle, ArrowUpRight, Share2, UploadCloud, HeartPulse, Award
} from 'lucide-react';
import { RIDER_PROFILE, INCOMING_ORDER_SCENARIOS, MOCK_PAYOUT_SLIPS, HISTORICAL_SHIFTS } from '../data/mockData';

export default function ClientDeskDashboard({ onOpenAppeal, onOpenAskAI, onSwitchToMobile }) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [selectedOrderIdx, setSelectedOrderIdx] = useState(0);
  const order = INCOMING_ORDER_SCENARIOS[selectedOrderIdx];
  const isSkip = order.verdict === 'SKIP';

  return (
    <div className="w-full bg-[#EAECEF] min-h-screen p-4 sm:p-6 lg:p-8 font-sans text-slate-800 antialiased selection:bg-slate-900 selection:text-white">
      {/* Main Studio White Canvas (Inspired strictly by Scrolltide Client Desk) */}
      <div className="max-w-[1520px] mx-auto bg-white rounded-[32px] shadow-[0_25px_70px_rgba(0,0,0,0.06)] border border-slate-200/80 p-6 lg:p-8 relative overflow-hidden">
        
        {/* Top Navbar Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          {/* Left Brand & Navigation Pills */}
          <div className="flex items-center gap-4">
            {/* Glyph Icon */}
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-sm">
              🛵
            </div>

            {/* Pill tabs */}
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setActiveNav('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeNav === 'dashboard' 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Dashboard</span>
              </button>

              <button 
                onClick={() => setActiveNav('audits')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeNav === 'audits' 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Pay Audits</span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              </button>

              <button 
                onClick={() => setActiveNav('statutory')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeNav === 'statutory' 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Statutory Reports</span>
              </button>
            </div>
          </div>

          {/* Right Profile & Actions */}
          <div className="flex items-center gap-3">
            {/* Multi-app avatar stack */}
            <div className="flex items-center -space-x-2">
              <span className="w-7 h-7 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                ZM
              </span>
              <span className="w-7 h-7 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                SW
              </span>
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                ZP
              </span>
            </div>

            {/* Add Action Button */}
            <button 
              onClick={() => onOpenAskAI()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            >
              <span>+ Ask Saathi AI</span>
            </button>

            {/* Notification & Message Icons */}
            <button className="p-2 rounded-full border border-slate-200 text-slate-500 hover:text-slate-800 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" />
            </button>

            {/* Primary Profile Badge */}
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold shadow-sm">
              RK
            </div>
          </div>
        </div>

        {/* Outer Grid with Left Icon Rail + Content */}
        <div className="flex gap-6 pt-6">
          {/* Left Vertical Icon Rail (Scrolltide desk signature) */}
          <div className="hidden sm:flex flex-col items-center justify-between py-2 w-12 border-r border-slate-100 pr-4 shrink-0">
            <div className="space-y-4">
              <button className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md">
                <Home className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setActiveNav('audits')}
                className="w-10 h-10 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-800 flex items-center justify-center transition-all"
              >
                <Wallet className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setActiveNav('statutory')}
                className="w-10 h-10 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-800 flex items-center justify-center transition-all"
              >
                <FileText className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onOpenAskAI()}
                className="w-10 h-10 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-800 flex items-center justify-center transition-all"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <button 
                onClick={onSwitchToMobile}
                title="Switch to Mobile Smartphone Preview"
                className="w-9 h-9 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center transition-all hover:scale-105"
              >
                📱
              </button>
              <button className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-6 min-w-0">
            {/* Title & Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                  Home <span className="text-slate-300">→</span> Partner Cockpit <span className="text-slate-300">→</span> Chandigarh Central
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
                  Gig worker companion
                </h2>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center flex-wrap gap-2.5">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3.5 py-1.5 text-xs text-slate-600">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search trips, orders, claims..." 
                    className="bg-transparent border-none outline-none text-xs w-44 placeholder-slate-400"
                  />
                </div>

                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>20–24 Oct 2026</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>

                <button 
                  onClick={() => onOpenAppeal()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full text-xs transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>Draft Dispute</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* BENTO GRID (Strictly inspired by Scrolltide Client Desk layout) */}
            <div className="grid grid-cols-12 gap-5 items-stretch">
              
              {/* 1. LEFT TALL GRADIENT CARD (Social Security / Advantages) */}
              <div className="col-span-12 lg:col-span-3 bg-gradient-to-b from-[#D5DCFA] via-[#E2E8FC] to-[#EDF2FD] rounded-[28px] p-6 flex flex-col justify-between shadow-sm relative overflow-hidden min-h-[460px] border border-blue-100">
                {/* Top Label */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 font-mono tracking-tight">
                    Central Rules 2026
                  </span>
                  <span className="w-6 h-6 rounded-full bg-white/70 backdrop-blur flex items-center justify-center text-xs text-slate-600 shadow-xs">
                    ✕
                  </span>
                </div>

                {/* 3D Holographic Prism Illustration */}
                <div className="py-6 flex flex-col items-center justify-center text-center">
                  <div className="relative">
                    <div className="w-28 h-28 bg-gradient-to-tr from-blue-400 via-indigo-300 to-purple-300 rounded-2xl rotate-45 shadow-xl shadow-blue-500/20 flex items-center justify-center border-2 border-white/60 animate-pulse" style={{ animationDuration: '4s' }}>
                      <span className="text-3xl -rotate-45">🛡️</span>
                    </div>
                    {/* Shadow pedestal */}
                    <div className="w-24 h-4 bg-slate-400/20 rounded-full blur-xs mx-auto mt-7" />
                  </div>
                </div>

                {/* Bottom Card Content */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-white space-y-2.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Statutory Shield</h4>
                      <p className="text-[11px] text-slate-500">Day 84 of 90 on Zomato</p>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      ⏳ 6 days left
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-snug">
                    Unlocks <strong className="text-slate-900">₹5 Lakh Ayushman Bharat</strong> cashless hospital cover and <strong className="text-slate-900">₹2 Lakh e-Shram</strong> accidental insurance.
                  </p>

                  <div className="pt-1">
                    <button 
                      onClick={() => onOpenAskAI("सामाजिक सुरक्षा के लिए 90 या 120 दिन का क्या नियम है?")}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>Check Qualification</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. MIDDLE TOP: ACTIVITY HISTOGRAM (Hours Worked This Week) */}
              <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-slate-50/70 border border-slate-200/80 rounded-[28px] p-5 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Activity</h3>
                    <p className="text-xs font-medium text-slate-500 mt-1">Worked this week</p>
                    <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight mt-0.5">
                      48.5<span className="text-sm font-normal text-slate-400">h</span>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <span className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center text-xs">
                      ⇅
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center text-xs">
                      ↗
                    </span>
                  </div>
                </div>

                {/* Vertical Histogram Bars (Mon to Sun with Active Friday Lime Highlight) */}
                <div className="pt-6">
                  <div className="flex items-end justify-between h-36 px-1 gap-2">
                    {[
                      { day: 'Mon', hours: '6.5h', height: '45%', active: false },
                      { day: 'Tue', hours: '7.0h', height: '55%', active: false },
                      { day: 'Wed', hours: '8.2h', height: '65%', active: false },
                      { day: 'Thu', hours: '7.8h', height: '60%', active: false },
                      { day: 'Fri', hours: '11.5h', height: '90%', active: true, tag: '11:30h' },
                      { day: 'Sat', hours: '4.5h', height: '40%', active: false },
                      { day: 'Sun', hours: '3.0h', height: '30%', active: false },
                    ].map((b, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        {b.active && (
                          <span className="text-[10px] font-bold bg-[#D4F73C] text-slate-900 px-1.5 py-0.5 rounded-full font-mono shadow-xs">
                            {b.tag}
                          </span>
                        )}
                        <div 
                          className={`w-full rounded-full transition-all ${
                            b.active ? 'bg-[#D4F73C] shadow-sm' : 'bg-slate-200/90'
                          }`}
                          style={{ height: b.height }}
                        />
                        <span className={`text-[10px] font-semibold ${b.active ? 'text-slate-900' : 'text-slate-400'}`}>
                          {b.day}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. MIDDLE TOP RIGHT: TAKE-HOME & ALLOCATION BARS */}
              <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-slate-50/70 border border-slate-200/80 rounded-[28px] p-5 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Real Net Earnings</h3>
                    <p className="text-xs font-medium text-slate-500 mt-1">Total take-home profit</p>
                    <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight mt-0.5">
                      ₹690<span className="text-sm font-semibold text-slate-400">.00</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 font-mono mt-1 block">
                      ↗ ₹69.00 / hour net
                    </span>
                  </div>

                  <span className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center text-xs">
                    ≡
                  </span>
                </div>

                {/* Allocation Bars */}
                <div className="space-y-3 pt-6">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-700">Worker Net Take-Home</span>
                      <span className="font-mono font-bold text-slate-900">62%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-slate-900 h-full rounded-full" style={{ width: '62%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-500">Fuel Burn (@ ₹2.6/km)</span>
                      <span className="font-mono font-bold text-rose-500">28%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-rose-500 h-full rounded-full" style={{ width: '28%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-400">Bike Wear & Depreciation</span>
                      <span className="font-mono text-slate-600">10%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-slate-400 h-full rounded-full" style={{ width: '10%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. RIGHT TOP: SAGE-GREEN LIVE TRIP RADAR CARD */}
              <div className="col-span-12 lg:col-span-3 bg-[#BFD9C3] rounded-[28px] p-6 flex flex-col justify-between shadow-sm relative overflow-hidden border border-emerald-200/70 text-slate-900 min-h-[460px]">
                {/* Overlapping circle glyphs */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center -space-x-2 opacity-80">
                    <div className="w-6 h-6 rounded-full bg-slate-800/80" />
                    <div className="w-6 h-6 rounded-full bg-slate-700/60" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 font-mono bg-white/40 px-2.5 py-0.5 rounded-full">
                    {order.platform} Ping
                  </span>
                </div>

                {/* Main Payout & Route */}
                <div className="space-y-3 py-4">
                  <div>
                    <span className="text-xs text-slate-700 font-medium block">Offered Payout</span>
                    <div className="text-4xl font-extrabold text-slate-950 font-mono tracking-tight">
                      ₹{order.offeredPayout}.00
                    </div>
                    <span className="text-xs text-slate-700 font-mono">
                      {order.oneWayDistanceKm} km dropoff • {order.estimatedMinutes} mins
                    </span>
                  </div>

                  <div className="bg-white/60 backdrop-blur-md rounded-2xl p-3.5 space-y-2 text-xs border border-white/80">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold shrink-0">●</span>
                      <p className="font-semibold text-slate-900 truncate">{order.restaurant}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold shrink-0">●</span>
                      <p className="font-semibold text-slate-900 truncate">{order.dropLocation}</p>
                    </div>
                  </div>

                  {/* Mathematical Truth */}
                  <div className="bg-slate-900 text-white rounded-2xl p-3.5 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Empty deadhead return:</span>
                      <span className="text-rose-400 font-bold font-mono">+{order.deadheadReturnKm} km</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Real fuel burn:</span>
                      <span className="text-rose-400 font-bold font-mono">-₹{order.realFuelCost.toFixed(0)}</span>
                    </div>
                    <div className="pt-1 border-t border-slate-800 flex justify-between font-bold">
                      <span>Net Yield:</span>
                      <span className={`font-mono ${isSkip ? 'text-rose-400' : 'text-emerald-400'}`}>
                        ₹{order.netProfit.toFixed(1)} (₹{order.effectiveHourlyRate.toFixed(1)}/hr)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Decision */}
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => alert(`Order declined. You saved ₹${order.realFuelCost.toFixed(0)} in empty deadhead fuel.`)}
                    className="py-2.5 px-3 bg-white/80 hover:bg-white text-slate-900 font-bold rounded-xl text-xs transition-all shadow-xs"
                  >
                    Decline Trip
                  </button>
                  <button 
                    onClick={() => alert(`Order accepted. Telemetry tracking active.`)}
                    className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all shadow-sm"
                  >
                    Accept Trip
                  </button>
                </div>
              </div>

              {/* 5. MIDDLE BOTTOM: OPERATING EXPENSES WITH SMOOTH SPEND CURVE */}
              <div className="col-span-12 lg:col-span-6 bg-slate-50/70 border border-slate-200/80 rounded-[28px] p-5 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Operating Spend</h3>
                    <p className="text-xs font-medium text-slate-500 mt-1">Expenses this week</p>
                    <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight mt-0.5">
                      ₹2,140<span className="text-sm font-semibold text-slate-400">.65</span>
                    </div>
                    <span className="text-xs font-semibold text-rose-500 font-mono mt-1 block">
                      ↘ ₹370.00 today (32% of gross)
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700">
                      Hero Splendor 110cc
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700">
                      ₹2.6/km Fuel
                    </span>
                  </div>
                </div>

                {/* Spend Curve Graph */}
                <div className="pt-6">
                  <div className="relative h-24 w-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                      <path
                        d="M 0 70 Q 80 85 160 65 T 320 40 T 500 60"
                        fill="none"
                        stroke="#0F172A"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Active data point on Thursday */}
                      <circle cx="320" cy="40" r="5" fill="#D4F73C" stroke="#0F172A" strokeWidth="2.5" />
                    </svg>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400 font-semibold px-2 pt-2 border-t border-slate-200/80">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span className="text-slate-900 font-bold">Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>

              {/* 6. RIGHT BOTTOM: PLATFORM AUDIT & BUBBLE SUMMARY */}
              <div className="col-span-12 lg:col-span-6 bg-slate-50/70 border border-slate-200/80 rounded-[28px] p-5 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Platform Allocation</h3>
                    <p className="text-xs font-medium text-slate-500 mt-1">Settlement distribution</p>
                  </div>
                  <button 
                    onClick={() => onOpenAppeal()}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                  >
                    <span>View audit logs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bubble Chart Simulation */}
                <div className="py-4 flex items-center justify-around">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-cyan-500/20 text-cyan-800 border-2 border-cyan-500/40 flex items-center justify-center font-extrabold text-base shadow-sm">
                      64%
                    </div>
                    <span className="text-xs font-bold text-slate-700 mt-2">Zomato</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-800 border-2 border-emerald-500/40 flex items-center justify-center font-extrabold text-sm shadow-sm">
                      28%
                    </div>
                    <span className="text-xs font-bold text-slate-700 mt-2">Swiggy</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-800 border-2 border-rose-500/40 flex items-center justify-center font-bold text-xs shadow-sm">
                      8%
                    </div>
                    <span className="text-xs font-bold text-slate-700 mt-2">Zepto</span>
                  </div>
                </div>

                {/* Bottom Metric Summary */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200/80 text-center">
                  <div>
                    <div className="text-xl font-bold font-mono text-slate-900">16</div>
                    <span className="text-[10px] text-slate-400 font-medium">Deliveries Today</span>
                  </div>
                  <div>
                    <div className="text-xl font-bold font-mono text-rose-500">₹32</div>
                    <span className="text-[10px] text-slate-400 font-medium">Shortfall Flagged</span>
                  </div>
                  <div>
                    <div className="text-xl font-bold font-mono text-emerald-600">100%</div>
                    <span className="text-[10px] text-slate-400 font-medium">Doc Ready</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
