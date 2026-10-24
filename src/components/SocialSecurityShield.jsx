import React from 'react';
import { RIDER_PROFILE } from '../data/mockData';
import { ShieldCheck, HeartPulse, Award, AlertCircle } from 'lucide-react';

export default function SocialSecurityShield() {
  const { targetDays, currentDays, platform } = RIDER_PROFILE.socialSecurityThreshold;
  const progressPercent = Math.round((currentDays / targetDays) * 100);
  const daysLeft = targetDays - currentDays;

  return (
    <div className="space-y-4">
      {/* 90-Day Statutory Progress Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 shadow-2xl space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
              Code on Social Security (Section 114)
            </span>
            <h3 className="text-base font-bold text-zinc-100 mt-1">
              Day {currentDays} of {targetDays} on {platform}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              <strong className="text-amber-400 font-semibold">{daysLeft} more active shifts</strong> to unlock statutory health & accidental cover.
            </p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-bold font-mono text-emerald-400">{progressPercent}%</span>
            <span className="text-[10px] text-zinc-500 block">Complete</span>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-zinc-950 rounded-full h-2.5 p-0.5 border border-zinc-800 overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
            <span>Day 1</span>
            <span className="text-amber-400 font-medium">Day 84 (Active)</span>
            <span>Day 90 Target</span>
          </div>
        </div>

        {/* Benefits Unlocking */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <div className="p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>₹5 Lakh PM-JAY</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Cashless hospital cover for your family.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1">
            <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>₹2 Lakh e-Shram</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Accidental death & disability insurance.
            </p>
          </div>
        </div>

        {/* Algorithmic Deactivation Risk Warning */}
        <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Acceptance Rate: 76%</span>
            </div>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono font-bold">
              Buffer: +1%
            </span>
          </div>
          <p className="text-zinc-300 text-[11px] leading-relaxed">
            Platform dispatch algorithms throttle order allocations below 75%. Accept your next short-distance trip to maintain safe standing and protect your 84-day streak.
          </p>
        </div>
      </div>
    </div>
  );
}
