import React from 'react';
import { RIDER_PROFILE, GOVERNMENT_WELFARE_SCHEMES } from '../data/mockData';
import { ShieldCheck, AlertCircle, HeartPulse, Award, Calendar, ExternalLink } from 'lucide-react';

export default function SocialSecurityShield() {
  const { targetDays, currentDays, platform, eligibleSchemes } = RIDER_PROFILE.socialSecurityThreshold;
  const progressPercent = Math.round((currentDays / targetDays) * 100);
  const daysLeft = targetDays - currentDays;

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              90-Day Social Security & Deactivation Shield
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                LEGAL COMPLIANCE
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Monitors the statutory engagement threshold under India's Code on Social Security (Sec 114).
            </p>
          </div>
        </div>
      </div>

      {/* 90-Day Threshold Progress Card */}
      <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl p-4 shadow-xl space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
              Engagement Tracker ({platform})
            </span>
            <h3 className="text-base font-bold text-slate-100 mt-0.5">
              Day {currentDays} of {targetDays} Completed
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Just <strong className="text-amber-400">{daysLeft} more active shifts</strong> to unlock statutory health & accident protection.
            </p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black font-mono text-emerald-400">{progressPercent}%</span>
            <p className="text-[10px] text-slate-500">Eligibility Met</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-950 rounded-full h-3.5 p-0.5 border border-slate-800 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-amber-500 h-full rounded-full transition-all duration-1000 shadow-sm shadow-emerald-500/50"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>Day 1 (Started)</span>
            <span className="text-amber-400 font-bold">Day 84 (Current)</span>
            <span>Day 90 (Statutory Protection)</span>
          </div>
        </div>

        {/* Benefits Unlocked */}
        <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 space-y-2">
          <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
            Benefits Unlocking on Day 90:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <HeartPulse className="w-3.5 h-3.5" />
                <span>₹5 Lakh PM-JAY</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Cashless family hospitalization coverage.</p>
            </div>

            <div className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-500/30">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>₹2 Lakh e-Shram</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Accidental death & permanent disability cover.</p>
            </div>
          </div>
        </div>

        {/* Deactivation Risk Early Warning Meter */}
        <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-bold text-amber-300">
                Algorithmic Risk Meter: 76% Acceptance Rate
              </span>
            </div>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono font-bold">
              CAUTION ZONE
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your rolling acceptance rate is <strong className="text-amber-400">76%</strong>. In the Chandigarh cluster, algorithms throttle order dispatch below <strong className="text-red-400">75%</strong>.
          </p>
          <div className="bg-slate-900/80 p-2.5 rounded-lg text-xs text-slate-300 border border-slate-800">
            💡 <strong className="text-amber-400">GigSaathi Advice:</strong> Accept your next 2 short-distance orders to bump your score to 80% and safeguard your 84-day streak!
          </div>
        </div>
      </div>
    </div>
  );
}
