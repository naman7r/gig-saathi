import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, FileSearch, ShieldCheck, ArrowRight, Clock, Navigation, Fuel, 
  Search, SlidersHorizontal, Calendar, Bell, Mail, ChevronDown, CheckCircle2, 
  XCircle, AlertCircle, TrendingUp, Sparkles, Home, Wallet, FileText, MessageSquare, 
  Settings, HelpCircle, ArrowUpRight, Share2, UploadCloud, HeartPulse, Award,
  Check, PhoneCall, ExternalLink, RefreshCw, User, ShieldAlert, AlertTriangle,
  Thermometer, Droplets, Sun, CloudRain, Wind, Plus, Minus
} from 'lucide-react';
import { RIDER_PROFILE, INCOMING_ORDER_SCENARIOS, MOCK_PAYOUT_SLIPS, HISTORICAL_SHIFTS } from '../data/mockData';
import { KNOWLEDGE_BASE } from '../data/knowledgeBase';
import SlipScanner from './SlipScanner';
import SocialSecurityShield from './SocialSecurityShield';
import DocumentHelper from './DocumentHelper';
import SafetyGuardian from './SafetyGuardian';

const DATE_RANGE_DATA = {
  today: {
    label: 'Today (24 Oct 2026)',
    shortLabel: 'Today',
    hours: '10.0',
    netEarnings: '690.00',
    hourlyRate: '69.00',
    spend: '370.00',
    gross: '1,120.00',
    deliveries: 16,
    shortfall: '32.00',
    takeHomePct: 62,
    fuelPct: 28,
    wearPct: 10,
    bars: [
      { day: '8 AM', hours: '1.2h', height: '35%', active: false },
      { day: '11 AM', hours: '2.5h', height: '65%', active: false },
      { day: '2 PM', hours: '1.8h', height: '45%', active: false },
      { day: '5 PM', hours: '2.0h', height: '55%', active: false },
      { day: '8 PM', hours: '2.5h', height: '85%', active: true, tag: 'Peak Rush' },
    ]
  },
  yesterday: {
    label: 'Yesterday (23 Oct 2026)',
    shortLabel: 'Yesterday',
    hours: '11.5',
    netEarnings: '780.00',
    hourlyRate: '67.80',
    spend: '420.00',
    gross: '1,280.00',
    deliveries: 18,
    shortfall: '45.00',
    takeHomePct: 61,
    fuelPct: 29,
    wearPct: 10,
    bars: [
      { day: '8 AM', hours: '1.0h', height: '30%', active: false },
      { day: '11 AM', hours: '3.0h', height: '75%', active: false },
      { day: '2 PM', hours: '2.0h', height: '50%', active: false },
      { day: '5 PM', hours: '2.5h', height: '65%', active: false },
      { day: '8 PM', hours: '3.0h', height: '90%', active: true, tag: 'Rain Surge' },
    ]
  },
  week: {
    label: '20–24 Oct 2026',
    shortLabel: 'This Week',
    hours: '48.5',
    netEarnings: '3,310.00',
    hourlyRate: '68.25',
    spend: '2,140.65',
    gross: '5,450.00',
    deliveries: 84,
    shortfall: '125.00',
    takeHomePct: 61,
    fuelPct: 29,
    wearPct: 10,
    bars: [
      { day: 'Mon', hours: '6.5h', height: '45%', active: false },
      { day: 'Tue', hours: '7.0h', height: '55%', active: false },
      { day: 'Wed', hours: '8.2h', height: '65%', active: false },
      { day: 'Thu', hours: '7.8h', height: '60%', active: false },
      { day: 'Fri', hours: '11.5h', height: '90%', active: true, tag: '11:30h' },
      { day: 'Sat', hours: '4.5h', height: '40%', active: false },
      { day: 'Sun', hours: '3.0h', height: '30%', active: false },
    ]
  },
  month: {
    label: 'Last 30 Days (Oct 2026)',
    shortLabel: 'Month',
    hours: '218.0',
    netEarnings: '15,200.00',
    hourlyRate: '69.72',
    spend: '9,400.00',
    gross: '24,600.00',
    deliveries: 390,
    shortfall: '640.00',
    takeHomePct: 62,
    fuelPct: 28,
    wearPct: 10,
    bars: [
      { day: 'Wk 1', hours: '46h', height: '65%', active: false },
      { day: 'Wk 2', hours: '52h', height: '80%', active: false },
      { day: 'Wk 3', hours: '49h', height: '70%', active: false },
      { day: 'Wk 4', hours: '55h', height: '95%', active: true, tag: 'Peak Month' },
      { day: 'Wk 5', hours: '16h', height: '30%', active: false },
    ]
  }
};

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'audit',
    unread: true,
    title: 'Pay Shortfall Detected',
    message: 'Order #ZOM-7782190 underpaid by ₹32.00 (shaved 1.3 km + uncredited rain surge).',
    time: '12m ago',
    actionLabel: 'Inspect Slip',
    targetNav: 'audits'
  },
  {
    id: 'notif-2',
    type: 'statutory',
    unread: true,
    title: 'Statutory Shield Milestone',
    message: 'Day 84 of 90 logged on Zomato. Only 6 shifts remain to qualify for ₹5L Ayushman Bharat cover.',
    time: '1h ago',
    actionLabel: 'View Rights',
    targetNav: 'statutory'
  },
  {
    id: 'notif-3',
    type: 'compliance',
    unread: true,
    title: 'PUC Renewal Alert',
    message: 'Hero Splendor (CH-01-AB-4921) Pollution Under Control certificate expires in 14 days (07 Nov 2026).',
    time: '3h ago',
    actionLabel: 'Open Vault',
    targetNav: 'statutory'
  },
  {
    id: 'notif-4',
    type: 'safety',
    unread: false,
    title: 'Chandigarh Heatwave Advisory',
    message: '38°C index in Sector 35. Take mandatory 15-minute hydration break before next trip ping.',
    time: '4h ago',
    actionLabel: 'Safety Guide',
    targetNav: 'statutory'
  }
];

export default function ClientDeskDashboard({ onOpenAppeal, onOpenAskAI, onSwitchToMobile }) {
  const [activeNav, setActiveNav] = useState('dashboard'); // 'dashboard' | 'audits' | 'statutory'
  const [selectedOrderIdx, setSelectedOrderIdx] = useState(0);
  const [selectedRangeKey, setSelectedRangeKey] = useState('week'); // 'today' | 'yesterday' | 'week' | 'month'
  const [orderActionStatus, setOrderActionStatus] = useState(null); // feedback for accept/decline
  
  // Interactive UI Dropdowns & Drawers
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);

  // Weather & Hydration Telemetry State
  const [waterGlasses, setWaterGlasses] = useState(5); // 5 of 8 glasses
  const [hydrationSeconds, setHydrationSeconds] = useState(840); // 14:00 countdown
  
  // Live Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchContainerRef = useRef(null);

  const order = INCOMING_ORDER_SCENARIOS[selectedOrderIdx];
  const isSkip = order.verdict === 'SKIP';
  const currentMetrics = DATE_RANGE_DATA[selectedRangeKey];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Hydration interval countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setHydrationSeconds(prev => (prev > 0 ? prev - 1 : 900));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddWater = () => {
    if (waterGlasses < 12) {
      setWaterGlasses(prev => prev + 1);
      setHydrationSeconds(900); // reset to 15m
    }
  };

  const handleMinusWater = () => {
    if (waterGlasses > 0) {
      setWaterGlasses(prev => prev - 1);
    }
  };

  // Keyboard shortcut listener for Command/Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchResults(true);
      }
      if (e.key === 'Escape') {
        setShowNotifications(false);
        setShowProfileDrawer(false);
        setShowDateDropdown(false);
        setShowSearchResults(false);
        setShowHelpModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter search results across orders, slips, and knowledge base
  const filteredResults = {
    orders: INCOMING_ORDER_SCENARIOS.filter(o => 
      o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.dropLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.platform.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    slips: MOCK_PAYOUT_SLIPS.filter(s =>
      s.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.platform.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    statutory: KNOWLEDGE_BASE.filter(kb =>
      kb.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kb.summary.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

  const hasSearchResults = searchQuery.trim().length > 0 && 
    (filteredResults.orders.length > 0 || filteredResults.slips.length > 0 || filteredResults.statutory.length > 0);

  return (
    <div className="w-full bg-[#EAECEF] min-h-screen p-4 sm:p-6 lg:p-8 font-sans text-slate-800 antialiased selection:bg-slate-900 selection:text-white relative">
      
      {/* Main Studio White Canvas (Inspired strictly by Scrolltide Client Desk) */}
      <div className="max-w-[1520px] mx-auto bg-white rounded-[32px] shadow-[0_25px_70px_rgba(0,0,0,0.06)] border border-slate-200/80 p-6 lg:p-8 relative overflow-hidden">
        
        {/* ========================================================= */}
        {/* TOP NAVBAR ROW */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          
          {/* Left Brand & Navigation Pills */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Glyph Icon */}
            <button 
              onClick={() => setActiveNav('dashboard')}
              title="Return to Main Cockpit"
              className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center font-bold text-base shadow-sm transition-transform active:scale-95"
            >
              🛵
            </button>

            {/* Pill tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100/70 p-1 rounded-full border border-slate-200/60">
              <button 
                onClick={() => setActiveNav('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeNav === 'dashboard' 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                }`}
              >
                <span>Dashboard</span>
              </button>

              <button 
                onClick={() => setActiveNav('audits')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeNav === 'audits' 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                }`}
              >
                <span>Pay Audits</span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              </button>

              <button 
                onClick={() => setActiveNav('statutory')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeNav === 'statutory' 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                }`}
              >
                <span>Statutory Reports</span>
              </button>
            </div>
          </div>

          {/* Right Profile & Actions */}
          <div className="flex items-center gap-3 relative">
            
            {/* Multi-app avatar stack */}
            <button 
              onClick={() => setShowProfileDrawer(true)}
              title="View linked aggregator platforms"
              className="flex items-center -space-x-2 transition-transform hover:scale-105"
            >
              <span className="w-7 h-7 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white shadow-xs">
                ZM
              </span>
              <span className="w-7 h-7 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white shadow-xs">
                SW
              </span>
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white shadow-xs">
                ZP
              </span>
            </button>

            {/* Add Action Button */}
            <button 
              onClick={() => onOpenAskAI("सामाजिक सुरक्षा के लिए 90 या 120 दिन का क्या नियम है?")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-900 hover:text-white transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>+ Ask Saathi AI</span>
            </button>

            {/* Notification Bell Button */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(prev => !prev);
                  setShowProfileDrawer(false);
                  setShowDateDropdown(false);
                }}
                className={`p-2 rounded-full border transition-all relative ${
                  showNotifications 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Alerts & Telemetry</h4>
                      {unreadCount > 0 && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full font-mono">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button 
                        onClick={handleMarkAllRead}
                        className="text-[11px] text-blue-600 hover:underline font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto mt-1">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`py-3 text-left transition-colors ${notif.unread ? 'bg-amber-50/40 -mx-4 px-4' : ''}`}>
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="text-xs font-bold text-slate-900">{notif.title}</h5>
                          <span className="text-[10px] text-slate-400 font-mono shrink-0">{notif.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <button 
                            onClick={() => {
                              setActiveNav(notif.targetNav);
                              setShowNotifications(false);
                            }}
                            className="text-xs font-semibold text-slate-900 hover:text-blue-600 flex items-center gap-1"
                          >
                            <span>{notif.actionLabel}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                          {notif.unread && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Primary Profile Badge (RK) */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowProfileDrawer(prev => !prev);
                  setShowNotifications(false);
                  setShowDateDropdown(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-sm transition-transform active:scale-95 ring-2 ring-slate-100"
              >
                RK
              </button>

              {/* Profile Drawer Dropdown */}
              {showProfileDrawer && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                      RK
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{RIDER_PROFILE.name}</h4>
                      <p className="text-xs text-slate-500">Hero Splendor • CH-01-AB-4921</p>
                    </div>
                  </div>

                  <div className="py-3 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Partner Rating:</span>
                      <span className="font-bold text-slate-900 font-mono">4.82 ★ (1,420 trips)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Statutory Days Logged:</span>
                      <span className="font-bold text-emerald-600 font-mono">84 / 90 (Central Rules)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Active Platforms:</span>
                      <span className="font-semibold text-slate-800">Zomato, Swiggy, Zepto</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">e-Shram UAN:</span>
                      <span className="font-mono text-slate-700">2984-7102-4821</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Bank DBT Link:</span>
                      <span className="font-semibold text-emerald-600">✓ Verified (HDFC)</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <button 
                      onClick={() => {
                        setShowProfileDrawer(false);
                        onSwitchToMobile();
                      }}
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>📱 Switch to Mobile View</span>
                    </button>
                    <button 
                      onClick={() => setShowProfileDrawer(false)}
                      className="w-full py-1.5 text-slate-400 hover:text-slate-600 text-xs font-medium text-center"
                    >
                      Close Profile
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* OUTER GRID: LEFT ICON RAIL + CONTENT */}
        {/* ========================================================= */}
        <div className="flex gap-6 pt-6">
          
          {/* Left Vertical Icon Rail (Scrolltide desk signature) */}
          <div className="hidden sm:flex flex-col items-center justify-between py-2 w-12 border-r border-slate-100 pr-4 shrink-0">
            <div className="space-y-4">
              <button 
                onClick={() => setActiveNav('dashboard')}
                title="Cockpit Dashboard"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  activeNav === 'dashboard' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <Home className="w-4 h-4" />
              </button>

              <button 
                onClick={() => setActiveNav('audits')}
                title="Pay Statement Audits"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all relative ${
                  activeNav === 'audits' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500" />
              </button>

              <button 
                onClick={() => setActiveNav('statutory')}
                title="Statutory Reports & Documents"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  activeNav === 'statutory' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
              </button>

              <button 
                onClick={() => onOpenAskAI()}
                title="Ask Saathi AI Assistant"
                className="w-10 h-10 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-800 flex items-center justify-center transition-all"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <button 
                onClick={onSwitchToMobile}
                title="Switch to Mobile Smartphone Preview"
                className="w-9 h-9 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center transition-all hover:scale-105 shadow-xs"
              >
                📱
              </button>
              
              <button 
                onClick={() => setShowHelpModal(true)}
                title="Help & Shortcuts"
                className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 flex items-center justify-center transition-all"
              >
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
                  <button onClick={() => setActiveNav('dashboard')} className="hover:text-slate-600">Home</button> 
                  <span className="text-slate-300">→</span> Partner Cockpit 
                  <span className="text-slate-300">→</span> 
                  <span className="text-slate-700 font-semibold">
                    {activeNav === 'dashboard' ? 'Overview' : activeNav === 'audits' ? 'Pay Statement Audits' : 'Statutory Compliance Shield'}
                  </span>
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
                  {activeNav === 'dashboard' && 'Gig worker companion'}
                  {activeNav === 'audits' && 'Payout Audit Desk'}
                  {activeNav === 'statutory' && 'Statutory Rights & Shield'}
                </h2>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center flex-wrap gap-2.5 relative">
                
                {/* Search Input with Live Dropdown */}
                <div ref={searchContainerRef} className="relative">
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3.5 py-1.5 text-xs text-slate-600 focus-within:ring-2 focus-within:ring-slate-900 focus-within:bg-white transition-all">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSearchResults(true);
                      }}
                      onFocus={() => setShowSearchResults(true)}
                      placeholder="Search trips, orders, claims..." 
                      className="bg-transparent border-none outline-none text-xs w-44 placeholder-slate-400"
                    />
                    {searchQuery ? (
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setShowSearchResults(false);
                        }}
                        className="text-slate-400 hover:text-slate-600 text-xs"
                      >
                        ✕
                      </button>
                    ) : (
                      <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-white border border-slate-200 rounded">
                        ⌘K
                      </kbd>
                    )}
                  </div>

                  {/* Search Results Dropdown */}
                  {showSearchResults && hasSearchResults && (
                    <div className="absolute right-0 top-10 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 text-left space-y-3 max-h-96 overflow-y-auto animate-in fade-in slide-in-from-top-1">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search Matches</span>
                        <button onClick={() => setShowSearchResults(false)} className="text-slate-400 hover:text-slate-700 text-xs">✕</button>
                      </div>

                      {/* Orders */}
                      {filteredResults.orders.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Incoming Trips</span>
                          {filteredResults.orders.map((o, idx) => (
                            <button
                              key={o.id}
                              onClick={() => {
                                setSelectedOrderIdx(INCOMING_ORDER_SCENARIOS.findIndex(sc => sc.id === o.id));
                                setActiveNav('dashboard');
                                setShowSearchResults(false);
                              }}
                              className="w-full text-left p-2 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                            >
                              <div>
                                <p className="font-bold text-slate-900">{o.title}</p>
                                <p className="text-[10px] text-slate-500">{o.restaurant} → {o.dropLocation}</p>
                              </div>
                              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${o.verdict === 'SKIP' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                {o.verdict}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Slips */}
                      {filteredResults.slips.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Audit Slips</span>
                          {filteredResults.slips.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => {
                                setActiveNav('audits');
                                setShowSearchResults(false);
                              }}
                              className="w-full text-left p-2 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                            >
                              <div>
                                <p className="font-bold text-slate-900">Order #{s.orderId}</p>
                                <p className="text-[10px] text-slate-500">{s.platform} • {s.restaurant}</p>
                              </div>
                              <span className="font-mono text-rose-600 font-bold text-xs">-₹{s.underpaidAmount}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Statutory */}
                      {filteredResults.statutory.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Central Rules 2026</span>
                          {filteredResults.statutory.map((kb) => (
                            <button
                              key={kb.id}
                              onClick={() => {
                                onOpenAskAI(kb.topic);
                                setShowSearchResults(false);
                              }}
                              className="w-full text-left p-2 rounded-xl hover:bg-slate-50 border border-slate-100 text-xs block"
                            >
                              <p className="font-bold text-slate-900">{kb.topic}</p>
                              <p className="text-[10px] text-slate-500 truncate">{kb.summary}</p>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Date Filter Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => {
                      setShowDateDropdown(prev => !prev);
                      setShowNotifications(false);
                      setShowProfileDrawer(false);
                    }}
                    className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{currentMetrics.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showDateDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Options */}
                  {showDateDropdown && (
                    <div className="absolute right-0 top-10 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-1 text-left">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 block">
                        Select Ledger Timeframe
                      </span>
                      {Object.entries(DATE_RANGE_DATA).map(([key, data]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setSelectedRangeKey(key);
                            setShowDateDropdown(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                            selectedRangeKey === key 
                              ? 'bg-slate-900 text-white font-bold' 
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{data.label}</span>
                          {selectedRangeKey === key && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Interactive Weather & Hydration Pill */}
                <button 
                  onClick={() => setShowWeatherModal(true)}
                  title="Click to view full Weather Telemetry & Hydration Guard"
                  className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/90 rounded-full px-3.5 py-1.5 text-xs font-semibold text-amber-900 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <Thermometer className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                  <span>38°C (Feels 42°C)</span>
                  <span className="text-amber-300">•</span>
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-mono text-blue-700 font-bold">{formatTimer(hydrationSeconds)}</span>
                </button>

                {/* Draft Dispute Button */}
                <button 
                  onClick={() => onOpenAppeal(MOCK_PAYOUT_SLIPS[0])}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>Draft Dispute</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* ========================================================= */}
            {/* VIEW MODE 1: DASHBOARD (SCROLLTIDE BENTO GRID) */}
            {/* ========================================================= */}
            {activeNav === 'dashboard' && (
              <div className="grid grid-cols-12 gap-5 items-stretch">
                
                {/* 1. LEFT TALL GRADIENT CARD (Social Security / Advantages) */}
                <div className="col-span-12 lg:col-span-3 bg-gradient-to-b from-[#D5DCFA] via-[#E2E8FC] to-[#EDF2FD] rounded-[28px] p-6 flex flex-col justify-between shadow-sm relative overflow-hidden min-h-[460px] border border-blue-100">
                  {/* Top Label */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 font-mono tracking-tight">
                      Central Rules 2026
                    </span>
                    <button 
                      onClick={() => setActiveNav('statutory')}
                      title="View all statutory details"
                      className="w-6 h-6 rounded-full bg-white/70 hover:bg-white backdrop-blur flex items-center justify-center text-xs text-slate-600 shadow-xs transition-all"
                    >
                      ↗
                    </button>
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
                        onClick={() => setActiveNav('statutory')}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                      >
                        <span>Check Qualification</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. MIDDLE TOP: ACTIVITY HISTOGRAM (Hours Worked in Selected Period) */}
                <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-slate-50/70 border border-slate-200/80 rounded-[28px] p-5 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Activity</h3>
                      <p className="text-xs font-medium text-slate-500 mt-1">Logged {currentMetrics.shortLabel.toLowerCase()}</p>
                      <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight mt-0.5">
                        {currentMetrics.hours}<span className="text-sm font-normal text-slate-400">h</span>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <button 
                        onClick={() => setSelectedRangeKey(prev => prev === 'week' ? 'today' : 'week')}
                        title="Toggle view"
                        className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center text-xs transition-colors"
                      >
                        ⇅
                      </button>
                      <button 
                        onClick={() => setActiveNav('audits')}
                        title="Open Audit Breakdown"
                        className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center text-xs transition-colors"
                      >
                        ↗
                      </button>
                    </div>
                  </div>

                  {/* Vertical Histogram Bars */}
                  <div className="pt-6">
                    <div className="flex items-end justify-between h-36 px-1 gap-2">
                      {currentMetrics.bars.map((b, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer">
                          {b.active && (
                            <span className="text-[10px] font-bold bg-[#D4F73C] text-slate-900 px-1.5 py-0.5 rounded-full font-mono shadow-xs animate-bounce" style={{ animationDuration: '3s' }}>
                              {b.tag}
                            </span>
                          )}
                          <div 
                            title={`${b.day}: ${b.hours}`}
                            className={`w-full rounded-full transition-all group-hover:opacity-80 ${
                              b.active ? 'bg-[#D4F73C] shadow-sm' : 'bg-slate-200/90'
                            }`}
                            style={{ height: b.height }}
                          />
                          <span className={`text-[10px] font-semibold ${b.active ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
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
                        ₹{currentMetrics.netEarnings.split('.')[0]}<span className="text-sm font-semibold text-slate-400">.{currentMetrics.netEarnings.split('.')[1]}</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 font-mono mt-1 block">
                        ↗ ₹{currentMetrics.hourlyRate} / hour net
                      </span>
                    </div>

                    <button 
                      onClick={() => setActiveNav('audits')}
                      title="Inspect settlement allocation"
                      className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center text-xs transition-colors"
                    >
                      ≡
                    </button>
                  </div>

                  {/* Allocation Bars */}
                  <div className="space-y-3 pt-6">
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span className="text-slate-700">Worker Net Take-Home</span>
                        <span className="font-mono font-bold text-slate-900">{currentMetrics.takeHomePct}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-slate-900 h-full rounded-full transition-all duration-500" style={{ width: `${currentMetrics.takeHomePct}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span className="text-slate-500">Fuel Burn (@ ₹2.6/km)</span>
                        <span className="font-mono font-bold text-rose-500">{currentMetrics.fuelPct}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: `${currentMetrics.fuelPct}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span className="text-slate-400">Bike Wear & Depreciation</span>
                        <span className="font-mono text-slate-600">{currentMetrics.wearPct}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-slate-400 h-full rounded-full transition-all duration-500" style={{ width: `${currentMetrics.wearPct}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. RIGHT TOP: SAGE-GREEN LIVE TRIP RADAR CARD */}
                <div className="col-span-12 lg:col-span-3 bg-[#BFD9C3] rounded-[28px] p-6 flex flex-col justify-between shadow-sm relative overflow-hidden border border-emerald-200/70 text-slate-900 min-h-[460px]">
                  
                  {/* Scenario Toggle & Platform Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {INCOMING_ORDER_SCENARIOS.map((sc, i) => (
                        <button
                          key={sc.id}
                          onClick={() => {
                            setSelectedOrderIdx(i);
                            setOrderActionStatus(null);
                          }}
                          className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center transition-all ${
                            selectedOrderIdx === i 
                              ? 'bg-slate-900 text-white shadow-xs scale-110' 
                              : 'bg-white/60 text-slate-700 hover:bg-white'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-slate-800 font-mono bg-white/50 px-2.5 py-0.5 rounded-full">
                      {order.platform} Ping
                    </span>
                  </div>

                  {/* Main Payout & Route */}
                  <div className="space-y-3 py-3">
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
                    <div className="bg-slate-900 text-white rounded-2xl p-3.5 space-y-1 text-xs shadow-md">
                      <div className="flex justify-between text-slate-400">
                        <span>Deadhead return:</span>
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

                    {/* Interactive Feedback Message */}
                    {orderActionStatus && (
                      <div className="p-2 rounded-xl bg-white/90 text-slate-900 text-xs font-semibold text-center animate-in fade-in">
                        {orderActionStatus}
                      </div>
                    )}
                  </div>

                  {/* Action Decision */}
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setOrderActionStatus(`✕ Order Declined: Saved ₹${order.realFuelCost.toFixed(0)} in empty fuel.`)}
                      className="py-2.5 px-3 bg-white/80 hover:bg-white text-slate-900 font-bold rounded-xl text-xs transition-all shadow-xs cursor-pointer active:scale-95"
                    >
                      Decline Trip
                    </button>
                    <button 
                      onClick={() => setOrderActionStatus(`✓ Order Accepted: Route logging & fuel odometer live.`)}
                      className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all shadow-sm cursor-pointer active:scale-95"
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
                      <p className="text-xs font-medium text-slate-500 mt-1">Expenses {currentMetrics.shortLabel.toLowerCase()}</p>
                      <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight mt-0.5">
                        ₹{currentMetrics.spend.split('.')[0]}<span className="text-sm font-semibold text-slate-400">.{currentMetrics.spend.split('.')[1] || '00'}</span>
                      </div>
                      <span className="text-xs font-semibold text-rose-500 font-mono mt-1 block">
                        ↘ 32% overhead ratio (IDinsight 2024 benchmark)
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
                        Hero Splendor 110cc
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
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
                        {/* Active data point on peak day */}
                        <circle cx="320" cy="40" r="5" fill="#D4F73C" stroke="#0F172A" strokeWidth="2.5" />
                      </svg>
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-400 font-semibold px-2 pt-2 border-t border-slate-200/80">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span className="text-slate-900 font-bold">Thu (Peak)</span>
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
                      onClick={() => setActiveNav('audits')}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
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
                      <div className="text-xl font-bold font-mono text-slate-900">{currentMetrics.deliveries}</div>
                      <span className="text-[10px] text-slate-400 font-medium">Deliveries {currentMetrics.shortLabel}</span>
                    </div>
                    <div>
                      <div className="text-xl font-bold font-mono text-rose-500">₹{currentMetrics.shortfall}</div>
                      <span className="text-[10px] text-slate-400 font-medium">Shortfall Flagged</span>
                    </div>
                    <div>
                      <div className="text-xl font-bold font-mono text-emerald-600">100%</div>
                      <span className="text-[10px] text-slate-400 font-medium">Doc Ready</span>
                    </div>
                  </div>
                </div>

                {/* 7. FULL WIDTH WEATHER, TEMPERATURE & HYDRATION TELEMETRY CARD */}
                <div className="col-span-12 bg-white rounded-[28px] border border-slate-200/90 p-6 shadow-sm space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg shadow-xs">
                        ☀️
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider font-mono block">
                          Microclimate & Physiology Telemetry
                        </span>
                        <h3 className="text-base font-extrabold text-slate-900">
                          Chandigarh Tricity Weather, Temperature & Hydration Guard
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-full font-mono font-bold flex items-center gap-1.5 shadow-xs">
                        <Thermometer className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                        <span>38°C (Feels 42°C Heat Index)</span>
                      </span>
                      <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-mono font-bold flex items-center gap-1.5 shadow-xs">
                        <Droplets className="w-3.5 h-3.5 text-blue-600" />
                        <span>Hydrate in {formatTimer(hydrationSeconds)}</span>
                      </span>
                    </div>
                  </div>

                  {/* 3-Column Studio Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    
                    {/* Col 1: Temperature & Heat Index */}
                    <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/80 space-y-3 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Temperature</span>
                          <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight mt-1 flex items-baseline gap-2">
                            <span>38°C</span>
                            <span className="text-xs font-semibold text-rose-600 font-sans">Feels like 42°C</span>
                          </div>
                          <p className="text-xs font-medium text-slate-600 mt-1">☀️ Severe afternoon heatwave in Sector 35</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800">
                          Level 3 Alert
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/80 text-center">
                        <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-xs">
                          <span className="text-[10px] text-slate-400 block font-medium">Humidity</span>
                          <span className="text-xs font-bold font-mono text-slate-800">48%</span>
                        </div>
                        <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-xs">
                          <span className="text-[10px] text-slate-400 block font-medium">Wind NW</span>
                          <span className="text-xs font-bold font-mono text-slate-800">14 km/h</span>
                        </div>
                        <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-xs">
                          <span className="text-[10px] text-slate-400 block font-medium">Air Quality</span>
                          <span className="text-xs font-bold font-mono text-amber-700">142 AQI</span>
                        </div>
                      </div>
                    </div>

                    {/* Col 2: Interactive Hydration Tracker */}
                    <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-200/80 space-y-3 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Hydration Monitor</span>
                          <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight mt-1">
                            {waterGlasses} / 8 <span className="text-xs font-normal text-slate-500 font-sans">Glasses ({waterGlasses * 250} ml)</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">Target: 250ml every 30m in 38°C heat</p>
                        </div>

                        <div className="text-right">
                          <span className="font-mono text-sm font-bold text-blue-700 bg-white border border-blue-200 px-2 py-1 rounded-lg block shadow-xs">
                            {formatTimer(hydrationSeconds)}
                          </span>
                          <span className="text-[10px] text-blue-500 block mt-0.5">next break</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1.5">
                        <div className="w-full bg-blue-100 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className="bg-blue-600 h-full rounded-full transition-all duration-300 shadow-xs" 
                            style={{ width: `${Math.min(100, Math.round((waterGlasses / 8) * 100))}%` }} 
                          />
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-2 pt-1">
                        <button 
                          onClick={handleAddWater}
                          className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Drank 1 Glass (+250ml)</span>
                        </button>
                        <button 
                          onClick={handleMinusWater}
                          title="Undo 1 glass"
                          className="w-9 h-9 bg-white hover:bg-slate-100 border border-blue-200 text-slate-600 rounded-xl text-xs flex items-center justify-center transition-colors shadow-xs"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => setHydrationSeconds(900)}
                          title="Reset 15-minute countdown"
                          className="w-9 h-9 bg-white hover:bg-slate-100 border border-blue-200 text-slate-600 rounded-xl text-xs flex items-center justify-center transition-colors shadow-xs"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Col 3: Hourly Forecast & Rain Surge */}
                    <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/80 space-y-3 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Shift Forecast</span>
                          <p className="text-xs font-semibold text-slate-900 mt-0.5">Next 8 Hours Outlook</p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full font-mono">
                          Rain Surge at 6 PM
                        </span>
                      </div>

                      {/* Hourly Timeline */}
                      <div className="grid grid-cols-6 gap-1.5 pt-1 text-center">
                        {[
                          { t: 'Now', temp: '38°', icon: '☀️', surge: null },
                          { t: '2 PM', temp: '39°', icon: '☀️', surge: null },
                          { t: '4 PM', temp: '36°', icon: '⛅', surge: null },
                          { t: '6 PM', temp: '32°', icon: '🌦️', surge: '+₹20' },
                          { t: '8 PM', temp: '29°', icon: '🌧️', surge: '+₹30' },
                          { t: '10 PM', temp: '27°', icon: '🌙', surge: null },
                        ].map((h, idx) => (
                          <div 
                            key={idx}
                            className={`p-1.5 rounded-xl border flex flex-col items-center justify-between transition-all ${
                              h.surge 
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-xs' 
                                : idx === 0 
                                  ? 'bg-amber-50 border-amber-200 text-amber-900' 
                                  : 'bg-white border-slate-200/70 text-slate-700'
                            }`}
                          >
                            <span className="text-[9px] font-mono font-medium text-slate-500">{h.t}</span>
                            <span className="text-sm my-0.5">{h.icon}</span>
                            <span className="text-[11px] font-bold font-mono text-slate-900">{h.temp}</span>
                            {h.surge ? (
                              <span className="text-[8px] font-extrabold text-emerald-700 font-mono mt-0.5 bg-emerald-200/60 rounded px-1">
                                {h.surge}
                              </span>
                            ) : (
                              <span className="text-[8px] text-slate-400 font-mono mt-0.5">Norm</span>
                            )}
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] text-slate-500 pt-1">
                        🌧️ Rain surcharge triggers at 6:00 PM (+₹20 to +₹30). Platform payout slips will be automatically audited for this bonus.
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW MODE 2: PAY AUDITS DESK */}
            {/* ========================================================= */}
            {activeNav === 'audits' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Pay Audit Banner */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                  <div>
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Automated OCR Audit Engine</span>
                    <h3 className="text-xl font-bold mt-1">Cross-referencing Platform Slips with GPS Telemetry</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl">
                      We check every settlement slip against hardware odometer records and meteorological rain logs. Discrepancies generate instant, legally backed dispute drafts under Section 114.
                    </p>
                  </div>
                  <button 
                    onClick={() => onOpenAppeal(MOCK_PAYOUT_SLIPS[0])}
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-2xl text-xs flex items-center gap-2 transition-all shadow-md shrink-0 active:scale-95"
                  >
                    <FileSearch className="w-4 h-4" />
                    <span>Draft Formal Appeal ↗</span>
                  </button>
                </div>

                {/* Embedded SlipScanner */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
                  <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span>Recent Platform Statement Audits</span>
                    <span className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-mono font-bold">
                      2 Flagged
                    </span>
                  </h4>
                  <SlipScanner onDraftDispute={(slip) => onOpenAppeal(slip)} />
                </div>

                {/* Audit History Log Table */}
                <div className="bg-slate-50/70 rounded-3xl border border-slate-200/80 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Settlement Audit Log</h4>
                    <span className="text-xs text-slate-500 font-mono">Last updated: 24 Oct 2026, 12:45</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                          <th className="py-2.5 font-bold">Order ID</th>
                          <th className="py-2.5 font-bold">Platform</th>
                          <th className="py-2.5 font-bold">Restaurant</th>
                          <th className="py-2.5 font-bold">Paid Distance</th>
                          <th className="py-2.5 font-bold">GPS Distance</th>
                          <th className="py-2.5 font-bold">Shortfall</th>
                          <th className="py-2.5 font-bold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        <tr className="hover:bg-white/80 transition-colors">
                          <td className="py-3 font-mono font-bold text-slate-900">#ZOM-7782190</td>
                          <td className="py-3 font-semibold text-rose-600">Zomato</td>
                          <td className="py-3 text-slate-700">Sindhi Sweets (Sec 17)</td>
                          <td className="py-3 font-mono text-slate-500">4.8 km</td>
                          <td className="py-3 font-mono text-slate-900 font-bold">6.1 km</td>
                          <td className="py-3 font-mono font-bold text-rose-600">-₹32.00</td>
                          <td className="py-3">
                            <button 
                              onClick={() => onOpenAppeal(MOCK_PAYOUT_SLIPS[0])}
                              className="px-3 py-1 bg-slate-900 text-white rounded-full text-[11px] font-semibold hover:bg-slate-800 transition-all"
                            >
                              Appeal ↗
                            </button>
                          </td>
                        </tr>
                        <tr className="hover:bg-white/80 transition-colors">
                          <td className="py-3 font-mono font-bold text-slate-900">#SWG-449102</td>
                          <td className="py-3 font-semibold text-orange-600">Swiggy</td>
                          <td className="py-3 text-slate-700">Subway (Phase 5)</td>
                          <td className="py-3 font-mono text-slate-500">3.2 km</td>
                          <td className="py-3 font-mono text-slate-900 font-bold">3.2 km</td>
                          <td className="py-3 font-mono font-bold text-rose-600">-₹45.00</td>
                          <td className="py-3">
                            <button 
                              onClick={() => onOpenAppeal(MOCK_PAYOUT_SLIPS[1])}
                              className="px-3 py-1 bg-slate-900 text-white rounded-full text-[11px] font-semibold hover:bg-slate-800 transition-all"
                            >
                              Appeal ↗
                            </button>
                          </td>
                        </tr>
                        <tr className="hover:bg-white/80 transition-colors">
                          <td className="py-3 font-mono font-bold text-slate-900">#ZPT-110294</td>
                          <td className="py-3 font-semibold text-slate-900">Zepto</td>
                          <td className="py-3 text-slate-700">Dark Store Sec 22</td>
                          <td className="py-3 font-mono text-slate-500">2.1 km</td>
                          <td className="py-3 font-mono text-slate-900 font-bold">2.1 km</td>
                          <td className="py-3 font-mono font-bold text-emerald-600">₹0.00</td>
                          <td className="py-3 text-slate-400 font-mono text-[11px]">Settled ✓</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW MODE 3: STATUTORY REPORTS & SHIELD */}
            {/* ========================================================= */}
            {activeNav === 'statutory' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Statutory Rights Banner */}
                <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                  <div>
                    <span className="text-blue-300 text-xs font-bold uppercase tracking-wider font-mono">Central Rules Notified 8 May 2026</span>
                    <h3 className="text-xl font-bold mt-1">Statutory Entitlements & Compliance Shield</h3>
                    <p className="text-xs text-blue-200 mt-1 max-w-xl">
                      Under Section 114 of the Code on Social Security, workers completing 90 days with one aggregator or 120 days across multiple aggregators qualify for state welfare board cover.
                    </p>
                  </div>
                  <button 
                    onClick={() => onOpenAskAI("सामाजिक सुरक्षा के लिए 90 या 120 दिन का क्या नियम है?")}
                    className="px-5 py-2.5 bg-white text-slate-950 hover:bg-blue-50 font-bold rounded-2xl text-xs flex items-center gap-2 transition-all shadow-md shrink-0 active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Ask Legal Assistant</span>
                  </button>
                </div>

                {/* Bento Row: Social Security Shield + Document Helper + Safety Guardian */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
                    <SocialSecurityShield />
                  </div>
                  <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
                    <DocumentHelper />
                  </div>
                  <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
                    <SafetyGuardian />
                  </div>
                </div>

                {/* Verified Statutory Knowledge Base Reference Accordion */}
                <div className="bg-slate-50/70 rounded-3xl border border-slate-200/80 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Official Legal Framework (Dated Knowledge Base)</h4>
                    <span className="text-xs font-semibold text-emerald-600 font-mono">6/6 Sources Verified</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {KNOWLEDGE_BASE.map((item) => (
                      <div key={item.id} className="p-4 bg-white rounded-2xl border border-slate-200/70 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                            {item.id}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Verified {item.verifiedDate}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-slate-900">{item.topic}</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>
                        <a 
                          href={item.sourceUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:underline pt-1"
                        >
                          <span>Official Gazette Source</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* WEATHER & HYDRATION TELEMETRY MODAL */}
      {/* ========================================================= */}
      {showWeatherModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-slate-900 space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-base">
                  ☀️
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Chandigarh Hub Climate & Hydration</h3>
                  <p className="text-[10px] text-slate-400">IMD Doppler Radar & Odometer Telemetry</p>
                </div>
              </div>
              <button 
                onClick={() => setShowWeatherModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Current Temperature Stats */}
            <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-extrabold text-amber-900 font-mono">38°C</span>
                  <span className="text-xs font-semibold text-rose-600 ml-2">Feels like 42°C</span>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                  Heatwave Alert
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Pavement and motorcycle saddle temperatures reach 48°C during peak sunlight. Drink 250ml water every 30m to avoid heat cramps.
              </p>
            </div>

            {/* Hydration Tracker */}
            <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-blue-900">Water Logged: {waterGlasses}/8 Glasses ({waterGlasses * 250}ml)</span>
                <span className="font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                  Break in {formatTimer(hydrationSeconds)}
                </span>
              </div>

              <div className="w-full bg-blue-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round((waterGlasses / 8) * 100))}%` }}
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleAddWater}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Drank 1 Glass (+250ml)</span>
                </button>
                <button
                  onClick={handleMinusWater}
                  className="w-9 h-9 bg-white border border-blue-200 text-slate-600 rounded-xl text-xs flex items-center justify-center"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Forecast Row */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Shift Forecast (IMD Radar)
              </span>
              <div className="grid grid-cols-6 gap-1.5 text-center">
                {[
                  { t: 'Now', temp: '38°', icon: '☀️', surge: null },
                  { t: '2 PM', temp: '39°', icon: '☀️', surge: null },
                  { t: '4 PM', temp: '36°', icon: '⛅', surge: null },
                  { t: '6 PM', temp: '32°', icon: '🌦️', surge: '+₹20' },
                  { t: '8 PM', temp: '29°', icon: '🌧️', surge: '+₹30' },
                  { t: '10 PM', temp: '27°', icon: '🌙', surge: null },
                ].map((h, i) => (
                  <div key={i} className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <span className="text-[9px] text-slate-400 font-mono block">{h.t}</span>
                    <span className="text-sm block my-0.5">{h.icon}</span>
                    <span className="font-bold text-[11px] block">{h.temp}</span>
                    {h.surge && (
                      <span className="text-[8px] font-extrabold text-emerald-600 font-mono block bg-emerald-100 rounded px-0.5 mt-0.5">
                        {h.surge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setShowWeatherModal(false)}
              className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* HELP & SHORTCUTS MODAL */}
      {/* ========================================================= */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-slate-900 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold">Cockpit Navigation & Shortcuts</h3>
              </div>
              <button 
                onClick={() => setShowHelpModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="font-semibold text-slate-800">Toggle Command Palette / Search:</span>
                <kbd className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[11px] font-mono text-slate-700">⌘K / Ctrl+K</kbd>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="font-semibold text-slate-800">Close Dropdowns / Modals:</span>
                <kbd className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[11px] font-mono text-slate-700">ESC</kbd>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="font-semibold text-slate-800">Smartphone Preview Toggle:</span>
                <span className="font-medium text-slate-900">Click 📱 in left rail</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="font-semibold text-slate-800">Government Helplines:</span>
                <span className="font-mono text-blue-600 font-bold">112 (SOS) • 14434 (e-Shram)</span>
              </div>
            </div>

            <button 
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-all"
            >
              Got it
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
