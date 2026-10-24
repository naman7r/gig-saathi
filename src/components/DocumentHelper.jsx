import React, { useState } from 'react';
import { FileText, CheckCircle2, AlertTriangle, ShieldCheck, UploadCloud } from 'lucide-react';
import { RIDER_PROFILE } from '../data/mockData';

export default function DocumentHelper({ onNotify }) {
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
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4 text-slate-800 antialiased">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Document Vault</span>
          <h3 className="text-sm font-bold text-slate-900 mt-0.5">Welfare & Compliance Readiness</h3>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-mono font-bold">
          4/4 Ready
        </span>
      </div>

      <div className="space-y-2">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className={`p-3 rounded-2xl border text-xs transition-all ${
              doc.status === 'EXPIRING_SOON'
                ? 'bg-amber-50/80 border-amber-200'
                : 'bg-slate-50 border-slate-200/80'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <span>{doc.name}</span>
                  {doc.status === 'EXPIRING_SOON' ? (
                    <span className="text-[10px] text-amber-800 font-semibold bg-amber-100 px-1.5 py-0.5 rounded">Action needed</span>
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">{doc.number}</p>
              </div>
              <span className={`text-[10px] font-mono ${
                doc.status === 'EXPIRING_SOON' ? 'text-amber-800 font-bold' : 'text-slate-400 font-medium'
              }`}>
                {doc.expiry}
              </span>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-200/60 flex justify-between text-[11px] text-slate-500">
              <span>{doc.schemeImpact}</span>
              <span>{doc.linkedMobile}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          if (onNotify) {
            onNotify("Scanner opened. Upload your RC, Insurance, or Health Card for automated OCR verification.", "info");
          }
        }}
        className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-xs"
      >
        <UploadCloud className="w-3.5 h-3.5 text-emerald-400" />
        <span>Scan & Upload New Document</span>
      </button>
    </div>
  );
}
