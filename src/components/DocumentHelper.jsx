import React, { useState } from 'react';
import { FileText, CheckCircle2, AlertTriangle, ShieldCheck, UploadCloud, Calendar, RefreshCw } from 'lucide-react';
import { RIDER_PROFILE } from '../data/mockData';

export default function DocumentHelper() {
  const [documents, setDocuments] = useState([
    {
      id: 'doc-aadhaar',
      name: 'Aadhaar Card',
      number: 'XXXX-XXXX-4812',
      status: 'VERIFIED',
      linkedMobile: 'Verified (+91 98721 XXXXX)',
      schemeImpact: 'Essential for e-Shram & AB-PMJAY',
      expiry: 'Lifetime Valid'
    },
    {
      id: 'doc-eshram',
      name: 'e-Shram UAN Card',
      number: 'UAN: 1009-8823-9102',
      status: 'ACTIVE',
      linkedMobile: 'Active on Central NDUW Portal',
      schemeImpact: 'Unlocks ₹2 Lakh Accidental Death & Disability Cover',
      expiry: 'Valid'
    },
    {
      id: 'doc-dl',
      name: 'Driving License (DL)',
      number: 'CH-01-2018-00491',
      status: 'VERIFIED',
      linkedMobile: 'Class: MCWG (Two Wheeler with Gear)',
      schemeImpact: 'Aggregator Onboarding & Road Legal',
      expiry: 'Expires in 340 Days (Sep 2027)'
    },
    {
      id: 'doc-puc',
      name: 'Vehicle Pollution (PUC) & Insurance',
      number: 'CH-01-BX-8821 (Hero Splendor)',
      status: 'EXPIRING_SOON',
      linkedMobile: 'Third Party Commercial Insurance Active',
      schemeImpact: 'Avoid ₹10,000 traffic fine under Motor Vehicles Act',
      expiry: 'Expires in 14 Days! (Renew ASAP)'
    }
  ]);

  const [activeUploadModal, setActiveUploadModal] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              AI Document Vault & Scheme Helper
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                OFFICIAL PILLAR
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Parses IDs, tracks PUC/Insurance expiration, and prepares documents for 1-click welfare filing.
            </p>
          </div>
        </div>
      </div>

      {/* Welfare Document Readiness Score */}
      <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Welfare Filing Readiness
            </span>
            <h3 className="text-base font-bold text-slate-100 mt-0.5">
              100% Prepared for e-Shram & PM-JAY
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              All statutory documents verified with Aadhaar-linked mobile verification.
            </p>
          </div>

          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono font-black text-lg">
            4/4
          </div>
        </div>

        {/* Document Cards */}
        <div className="space-y-2.5 pt-1">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`p-3 rounded-xl border transition-all ${
                doc.status === 'EXPIRING_SOON'
                  ? 'bg-amber-950/20 border-amber-500/40'
                  : 'bg-slate-950/70 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">{doc.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      doc.status === 'EXPIRING_SOON'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {doc.status === 'EXPIRING_SOON' ? '⚠️ 14 Days Left' : '✓ Verified'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{doc.number}</p>
                </div>

                <span className="text-[10px] text-slate-400 font-mono">{doc.expiry}</span>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{doc.schemeImpact}</span>
                <span className="text-slate-500">{doc.linkedMobile}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 1-Tap Action: Upload New Document */}
        <button
          onClick={() => alert("Document Scanner activated: Use camera to scan PAN Card, Insurance Certificate, or Platform ID for automatic OCR verification.")}
          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all mt-2"
        >
          <UploadCloud className="w-4 h-4 text-indigo-400" />
          <span>Scan & Auto-Fill New Document (OCR)</span>
        </button>
      </div>
    </div>
  );
}
