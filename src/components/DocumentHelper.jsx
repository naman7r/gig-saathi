import React, { useState } from 'react';
import { FileText, CheckCircle2, AlertTriangle, ShieldCheck, UploadCloud } from 'lucide-react';
import { RIDER_PROFILE } from '../data/mockData';

export default function DocumentHelper() {
  const [documents] = useState([
    {
      id: 'doc-aadhaar',
      name: 'Aadhaar Card',
      number: 'XXXX-XXXX-4812',
      status: 'VERIFIED',
      linkedMobile: 'Linked to +91 98721 XXXXX',
      schemeImpact: 'e-Shram & PM-JAY registration',
      expiry: 'Lifetime'
    },
    {
      id: 'doc-eshram',
      name: 'e-Shram UAN Card',
      number: 'UAN 1009-8823-9102',
      status: 'ACTIVE',
      linkedMobile: 'Central NDUW database verified',
      schemeImpact: '₹2 Lakh Accidental cover',
      expiry: 'Active'
    },
    {
      id: 'doc-dl',
      name: 'Driving License',
      number: 'CH-01-2018-00491',
      status: 'VERIFIED',
      linkedMobile: 'Class: MCWG (Two Wheeler)',
      schemeImpact: 'Commercial delivery authorization',
      expiry: 'Sep 2027'
    },
    {
      id: 'doc-puc',
      name: 'Pollution (PUC) & Insurance',
      number: 'Hero Splendor (CH-01-BX-8821)',
      status: 'EXPIRING_SOON',
      linkedMobile: 'Third-party cover',
      schemeImpact: 'Mandatory road compliance',
      expiry: 'Expires in 14 days'
    }
  ]);

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Document Vault</span>
          <h3 className="text-sm font-bold text-zinc-200 mt-0.5">Welfare & Compliance Readiness</h3>
        </div>
        <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-2.5 py-1 rounded-full font-mono font-bold">
          4/4 Ready
        </span>
      </div>

      <div className="space-y-2">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className={`p-3 rounded-2xl border text-xs transition-all ${
              doc.status === 'EXPIRING_SOON'
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-zinc-950/70 border-zinc-800/80'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-zinc-200">
                  <span>{doc.name}</span>
                  {doc.status === 'EXPIRING_SOON' ? (
                    <span className="text-[10px] text-amber-400 font-normal">⚠️ Action needed</span>
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 font-mono mt-0.5">{doc.number}</p>
              </div>
              <span className={`text-[10px] font-mono ${
                doc.status === 'EXPIRING_SOON' ? 'text-amber-400 font-bold' : 'text-zinc-500'
              }`}>
                {doc.expiry}
              </span>
            </div>

            <div className="mt-2 pt-2 border-t border-zinc-800/60 flex justify-between text-[11px] text-zinc-500">
              <span>{doc.schemeImpact}</span>
              <span>{doc.linkedMobile}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => alert("Scanner opened. You can take a photo of your new RC, Insurance, or Health Card for automated OCR verification.")}
        className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/80 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2"
      >
        <UploadCloud className="w-3.5 h-3.5 text-zinc-400" />
        <span>Scan & Upload New Document</span>
      </button>
    </div>
  );
}
