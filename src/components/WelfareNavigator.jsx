import React from 'react';
import { GOVERNMENT_WELFARE_SCHEMES, RIDER_PROFILE } from '../data/mockData';
import { ShieldCheck, ExternalLink, CheckSquare, HeartPulse, Building2, UserCheck } from 'lucide-react';

export default function WelfareNavigator() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Rights & Scheme Navigator
              <span className="text-[10px] bg-teal-500/10 text-teal-400 border border-teal-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                GOVT SCHEMES
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Guiding India's gig workers into statutory social security, insurance, and medical safety nets.
            </p>
          </div>
        </div>
      </div>

      {/* Profile Eligibility Check Summary */}
      <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl p-4 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs text-slate-400">Matched for Profile:</span>
            <p className="text-sm font-bold text-slate-200">
              {RIDER_PROFILE.name} • 26 yrs • Chandigarh / Punjab
            </p>
          </div>
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-xs font-mono font-bold">
            3 Schemes Available
          </span>
        </div>

        {/* Scheme Cards */}
        <div className="space-y-3">
          {GOVERNMENT_WELFARE_SCHEMES.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-slate-950/90 rounded-xl p-3.5 border border-slate-800 space-y-2 hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono text-teal-400 font-bold">
                    {scheme.ministry}
                  </span>
                  <h3 className="text-sm font-bold text-slate-100 mt-0.5">{scheme.name}</h3>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  {scheme.cost}
                </span>
              </div>

              {/* Benefit Highlight */}
              <div className="bg-teal-950/30 border border-teal-500/30 rounded-lg p-2 text-xs text-teal-200 font-semibold flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{scheme.benefit}</span>
              </div>

              {/* Criteria & Required Docs */}
              <div className="text-xs text-slate-400 space-y-1 pt-1">
                <p>
                  <strong className="text-slate-300">Eligibility:</strong> {scheme.qualificationCriteria}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {scheme.requiredDocs.map((doc, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 rounded text-[10px] font-mono"
                    >
                      ✓ {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-2 flex items-center justify-between">
                <span className={`text-[11px] font-bold ${
                  scheme.status.includes('Eligible') ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  ● {scheme.status}
                </span>

                <a
                  href={scheme.portalUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 font-bold min-h-[44px] min-w-[44px]"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
