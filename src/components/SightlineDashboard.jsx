import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, Download, Calendar, ChevronDown, TrendingUp, TrendingDown, 
  ArrowUpRight, ArrowRight, Clock, Navigation, Fuel, AlertCircle, CheckCircle2, 
  ShieldCheck, HeartPulse, DollarSign, Command, HelpCircle, Layers, SlidersHorizontal,
  Home, Wallet, FileText, Settings, Award, AlertTriangle, Eye, RefreshCw
} from 'lucide-react';
import { RIDER_PROFILE, INCOMING_ORDER_SCENARIOS, MOCK_PAYOUT_SLIPS, HISTORICAL_SHIFTS } from '../data/mockData';

export default function SightlineDashboard({ onOpenAppeal, onOpenAskAI, onSwitchToMobile }) {
  const [selectedRange, setSelectedRange] = useState('Today'); // 'Today' | '7D' | '30D' | '90D'
  const [comparePrevious, setComparePrevious] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState('overview');
  const [selectedOrderIdx, setSelectedOrderIdx] = useState(0);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const order = INCOMING_ORDER_SCENARIOS[selectedOrderIdx];
  const isSkip = order.verdict === 'SKIP';

  // Keyboard shortcut listener for Command/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full bg-[#F4F5F7] min-h-screen text-slate-800 antialiased font-sans selection:bg-blue-600 selection:text-white">
      {/* Outer Studio Container */}
      <div className="max-w-[1560px] mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Main Dashboard Frame (Sightline aesthetic: Clean off-white surface with subtle border) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col lg:flex-row min-h-[900px]">
          
          {/* ========================================================= */}
          {/* LEFT SIDEBAR (Sightline Structure) */}
          {/* ========================================================= */}
          <aside className="w-full lg:w-64 border-r border-slate-100 p-5 flex flex-col justify-between shrink-0 bg-slate-50/50">
            <div className="space-y-6">
              {/* App Brand Header */}
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
                    🛵
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 tracking-tight leading-none">GigSaathi</h2>
                    <span className="text-[11px] text-slate-400 font-medium">Ravi K. • Driver Hub</span>
                  </div>
                </div>
              </div>

              {/* Search with ⌘K Badge */}
              <button 
                onClick={() => setCommandPaletteOpen(true)}
                className="w-full bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl px-3 py-2 flex items-center justify-between text-xs text-slate-400 shadow-xs transition-all"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <span>Quick search...</span>
                </div>
                <kbd className="bg-slate-100 text-slate-500 font-mono text-[10px] px-1.5 py-0.5 rounded border border-slate-200">
                  ⌘K
                </kbd>
              </button>

              {/* Navigation Sections */}
              <div className="space-y-4">
                {/* Section 1: Analytics & Operations */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block">
                    Operations
                  </span>
                  
                  <button
                    onClick={() => setActiveSidebarItem('overview')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeSidebarItem === 'overview'
                        ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Home className="w-4 h-4 text-blue-600" />
                      <span>Overview</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveSidebarItem('trips')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeSidebarItem === 'trips'
                        ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Navigation className="w-4 h-4 text-slate-500" />
                      <span>Trip Radar</span>
                    </div>
                    <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-bold">
                      1 Ping
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveSidebarItem('audits')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeSidebarItem === 'audits'
                        ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-slate-500" />
                      <span>Pay Audits</span>
                    </div>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-bold">
                      -₹32 Flag
                    </span>
                  </button>
                </div>

                {/* Section 2: Statutory Protection */}
                <div className="space-y-1 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block">
                    Statutory Rights
                  </span>

                  <button
                    onClick={() => setActiveSidebarItem('shield')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeSidebarItem === 'shield'
                        ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Code 2026 Shield</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
                      Day 84
                    </span>
                  </button>

                  <button
                    onClick={() => onOpenAskAI()}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-slate-500" />
                      <span>Ask Saathi AI</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Sidebar: 90-Day Social Security Progress Card */}
            <div className="pt-6 border-t border-slate-200/80">
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Statutory Health Streak</span>
                  <span className="text-[11px] font-mono font-bold text-emerald-600">93%</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: '93%' }} />
                </div>

                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Day 84 of 90</span>
                  <span className="text-amber-600 font-semibold">6 shifts left</span>
                </div>

                <button 
                  onClick={onSwitchToMobile}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 mt-1"
                >
                  <span>Preview on Mobile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* MAIN STAGE CONTENT (Sightline Grid Layout) */}
          {/* ========================================================= */}
          <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
            
            {/* Top Greeting & Action Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  Acme Hub <span className="text-slate-300">•</span> Chandigarh Sector 35 Overview
                </span>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-1">
                  Good afternoon, Ravi
                </h1>
              </div>

              {/* Date Filter & Export Action */}
              <div className="flex items-center flex-wrap gap-3">
                {/* Date range segmented pills */}
                <div className="flex items-center bg-slate-100 rounded-xl p-1 text-xs font-semibold text-slate-600">
                  {['Today', '7D', '30D', '90D'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setSelectedRange(range)}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        selectedRange === range
                          ? 'bg-white text-slate-900 shadow-xs font-bold'
                          : 'hover:text-slate-900'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>

                {/* Compare to previous switch */}
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600 pl-1">
                  <button 
                    onClick={() => setComparePrevious(!comparePrevious)}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                      comparePrevious ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      comparePrevious ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </button>
                  <span className="hidden sm:inline">Compare to prev</span>
                </div>

                {/* Notifications & Export */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onOpenAppeal()}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 relative shadow-xs"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
                  </button>

                  <button 
                    onClick={() => onOpenAppeal()}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Evidence</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 4 TOP KPI CARDS WITH MICRO-SPARKLINES (Sightline Pattern) */}
            {/* ========================================================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Real Net Take-Home */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">₹</span>
                    Real Net Take-Home
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">{selectedRange}</span>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight">
                    ₹690.00
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>↗ ₹69.0/hr net</span>
                    <span className="text-slate-400 font-normal font-sans ml-1">vs ₹42 avg</span>
                  </div>
                </div>

                {/* Micro Sparkline Curve (SVG) */}
                <div className="pt-2">
                  <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <path
                      d="M 0 20 Q 25 15 50 18 T 100 4"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Card 2: Deliveries Completed */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">📦</span>
                    Deliveries Completed
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">{selectedRange}</span>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight">
                    16 Orders
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>↗ 2.4 orders/hr</span>
                    <span className="text-slate-400 font-normal font-sans ml-1">Zomato + Swiggy</span>
                  </div>
                </div>

                {/* Micro Sparkline Curve */}
                <div className="pt-2">
                  <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <path
                      d="M 0 18 Q 30 22 60 10 T 100 5"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Card 3: Operating Fuel & Bike Wear */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">⛽</span>
                    Operating Fuel & Wear
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">{selectedRange}</span>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight">
                    ₹370.00
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>32.8% of gross</span>
                    <span className="text-slate-400 font-normal font-sans ml-1">(IDinsight avg)</span>
                  </div>
                </div>

                {/* Micro Histogram Bars */}
                <div className="pt-2 flex items-end justify-between gap-1 h-8">
                  {[40, 60, 50, 75, 90, 65, 45].map((h, i) => (
                    <div 
                      key={i} 
                      className={`w-full rounded-xs ${i === 4 ? 'bg-rose-500' : 'bg-slate-200'}`} 
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Card 4: Underpayment & Anomaly Flags */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">⚠️</span>
                    Underpayment Discrepancy
                  </span>
                  <span className="font-mono text-[11px] text-rose-500 font-bold">1 Flag</span>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl font-extrabold text-rose-600 font-mono tracking-tight">
                    -₹32.00
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <span>Shaved km & rain surge</span>
                  </div>
                </div>

                {/* Sparkline curve */}
                <div className="pt-2">
                  <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <path
                      d="M 0 10 Q 30 8 60 16 T 100 22"
                      fill="none"
                      stroke="#F43F5E"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

            </div>

            {/* ========================================================= */}
            {/* MIDDLE SECTION: EARNINGS CURVE VS DONUT BREAKDOWN */}
            {/* ========================================================= */}
            <div className="grid grid-cols-12 gap-6 items-stretch">
              
              {/* Dual-Curve Earnings vs Expenses Chart (Sightline style) */}
              <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Earnings Telemetry</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl font-extrabold text-slate-900 font-mono">₹1,120.00</span>
                      <span className="text-xs font-bold text-emerald-600">↗ 6.2% vs last 30 shifts</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Gross Platform Payout
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <span className="w-2.5 h-2.5 rounded-full border border-dashed border-slate-400" /> Real Net (After Fuel)
                    </span>
                  </div>
                </div>

                {/* Smooth Multi-Wave Graph */}
                <div className="pt-4 h-48 relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 120" preserveAspectRatio="none">
                    {/* Shaded Area */}
                    <defs>
                      <linearGradient id="blueFade" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 0 90 Q 75 40 150 70 T 300 35 T 450 65 T 600 20 L 600 120 L 0 120 Z"
                      fill="url(#blueFade)"
                    />
                    
                    {/* Solid Primary Curve (Gross) */}
                    <path
                      d="M 0 90 Q 75 40 150 70 T 300 35 T 450 65 T 600 20"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Dashed Secondary Curve (Real Net after costs) */}
                    <path
                      d="M 0 105 Q 75 65 150 90 T 300 65 T 450 85 T 600 50"
                      fill="none"
                      stroke="#94A3B8"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                    />

                    {/* Interactive Active Day Marker */}
                    <circle cx="300" cy="35" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" />
                    <circle cx="300" cy="65" r="3.5" fill="#94A3B8" stroke="#FFFFFF" strokeWidth="2" />
                  </svg>

                  {/* Horizontal X-Axis */}
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-100">
                    <span>11 AM</span>
                    <span>1 PM</span>
                    <span>3 PM</span>
                    <span className="text-blue-600 font-bold">6 PM (Dinner Rush)</span>
                    <span>8 PM</span>
                    <span>10 PM</span>
                  </div>
                </div>
              </div>

              {/* Donut Chart: Payout vs Expense Allocation (Sightline Pattern) */}
              <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">Income Breakdown</h3>
                    <span className="text-[11px] font-mono text-slate-400">Shift Total</span>
                  </div>

                  {/* SVG Donut Circle */}
                  <div className="py-5 flex items-center justify-center relative">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        {/* Net Take-Home (62%) */}
                        <circle
                          cx="50" cy="50" r="38"
                          fill="transparent"
                          stroke="#10B981"
                          strokeWidth="10"
                          strokeDasharray="148 238"
                          strokeDashoffset="0"
                        />
                        {/* Fuel Expense (28%) */}
                        <circle
                          cx="50" cy="50" r="38"
                          fill="transparent"
                          stroke="#F43F5E"
                          strokeWidth="10"
                          strokeDasharray="66 238"
                          strokeDashoffset="-148"
                        />
                        {/* Bike Wear & Platform Fee (10%) */}
                        <circle
                          cx="50" cy="50" r="38"
                          fill="transparent"
                          stroke="#F59E0B"
                          strokeWidth="10"
                          strokeDasharray="24 238"
                          strokeDashoffset="-214"
                        />
                      </svg>
                      {/* Center label */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xl font-bold font-mono text-slate-900 leading-none">62%</span>
                        <span className="text-[10px] text-slate-400 font-medium">Kept Net</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend list */}
                <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-600 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      Net Take-Home
                    </span>
                    <span className="font-mono font-bold text-slate-900">₹690.00 (62%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-600 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      Fuel Burn (@ ₹2.6/km)
                    </span>
                    <span className="font-mono font-bold text-rose-500">₹290.00 (26%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-600 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      Maintenance & Wear
                    </span>
                    <span className="font-mono font-bold text-amber-600">₹140.00 (12%)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ========================================================= */}
            {/* BOTTOM SECTION: TRIP RADAR + AUDIT DISPUTE TABLE */}
            {/* ========================================================= */}
            <div className="grid grid-cols-12 gap-6 items-stretch">
              
              {/* Left: Incoming Opportunity Evaluator (Trip Radar) */}
              <div className="col-span-12 lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Incoming Trip Radar</h3>
                    <p className="text-xs text-slate-400">Deadhead return fuel evaluation before accepting</p>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full font-mono ${
                    isSkip ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    AI: {order.verdict}
                  </span>
                </div>

                {/* Scenario switcher */}
                <div className="grid grid-cols-3 gap-2">
                  {INCOMING_ORDER_SCENARIOS.map((sc, idx) => (
                    <button
                      key={sc.id}
                      onClick={() => setSelectedOrderIdx(idx)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        selectedOrderIdx === idx
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px]">
                        <span>{sc.platform}</span>
                        <span className={sc.verdict === 'ACCEPT' ? 'text-emerald-400' : 'text-rose-400'}>
                          {sc.verdict}
                        </span>
                      </div>
                      <p className="font-semibold truncate mt-1">{sc.restaurant.split('(')[0]}</p>
                      <p className="text-[10px] opacity-75 font-mono">₹{sc.offeredPayout} • {sc.oneWayDistanceKm}km</p>
                    </button>
                  ))}
                </div>

                {/* Trip Math Detail */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pickup to dropoff:</span>
                    <span className="font-semibold text-slate-800">{order.restaurant} &rarr; {order.dropLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total distance:</span>
                    <span className="font-mono text-slate-800">{order.oneWayDistanceKm}km + <strong className="text-rose-600">{order.deadheadReturnKm}km deadhead</strong> = {order.totalDistanceKm}km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated fuel expense:</span>
                    <span className="font-mono font-bold text-rose-600">-₹{order.realFuelCost.toFixed(1)}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold">
                    <span>True Net Take-Home:</span>
                    <span className={`font-mono ${isSkip ? 'text-rose-600' : 'text-emerald-600'}`}>
                      ₹{order.netProfit.toFixed(1)} ({order.effectiveHourlyRate.toFixed(1)}/hr)
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => alert(`Order declined. You saved ₹${order.realFuelCost.toFixed(0)} in deadhead fuel.`)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-all"
                  >
                    Decline Order
                  </button>
                  <button 
                    onClick={() => alert(`Order accepted. Mileage tracking active.`)}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs"
                  >
                    Accept Trip
                  </button>
                </div>
              </div>

              {/* Right: Pay Audit Statement & 1-Click Grievance Draft */}
              <div className="col-span-12 lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Audit Discrepancies</h3>
                      <p className="text-xs text-slate-400">Computer vision cross-reference with GPS telemetry</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      Zomato #{MOCK_PAYOUT_SLIPS[0].orderId}
                    </span>
                  </div>

                  <div className="space-y-3 pt-3">
                    <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-3.5 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-rose-800 font-bold">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Underpayment: ₹32.00 Shortfall</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        • <strong>Distance Shaving:</strong> Actual trip odometer was 7.4 km, but platform credited 5.1 km (-₹12).<br />
                        • <strong>Missing Rain Surge:</strong> Severe weather was active in Sector 17; ₹0 surge was remitted (-₹20).
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs space-y-1.5">
                      <div className="flex justify-between text-slate-600">
                        <span>Settled amount:</span>
                        <span className="font-mono font-bold text-slate-800">₹50.00</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Expected fair pay:</span>
                        <span className="font-mono font-bold text-emerald-600">₹82.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onOpenAppeal()}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Auto-Draft Formal Grievance Appeal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </main>

        </div>

      </div>

      {/* ========================================================= */}
      {/* COMMAND PALETTE MODAL (⌘K - Sightline feature) */}
      {/* ========================================================= */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-start justify-center pt-24 p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden text-slate-800 space-y-2">
            <div className="p-3 border-b border-slate-100 flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                className="w-full text-xs outline-none bg-transparent placeholder-slate-400"
              />
              <kbd className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                ESC
              </kbd>
            </div>

            <div className="p-2 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
                Quick Actions
              </span>
              <button 
                onClick={() => {
                  onOpenAppeal();
                  setCommandPaletteOpen(false);
                }}
                className="w-full p-2 rounded-lg text-left hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between font-medium transition-all"
              >
                <span>Draft Grievance Appeal for ₹32 Underpayment</span>
                <span className="text-[10px] text-slate-400 font-mono">↵ to run</span>
              </button>

              <button 
                onClick={() => {
                  onOpenAskAI("सामाजिक सुरक्षा के लिए 90 या 120 दिन का क्या नियम है?");
                  setCommandPaletteOpen(false);
                }}
                className="w-full p-2 rounded-lg text-left hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between font-medium transition-all"
              >
                <span>Check 90/120 Day Statutory Rules</span>
                <span className="text-[10px] text-slate-400 font-mono">↵ to run</span>
              </button>

              <button 
                onClick={() => {
                  onSwitchToMobile();
                  setCommandPaletteOpen(false);
                }}
                className="w-full p-2 rounded-lg text-left hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between font-medium transition-all"
              >
                <span>Toggle Rider Mobile Frame View</span>
                <span className="text-[10px] text-slate-400 font-mono">↵ to run</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
