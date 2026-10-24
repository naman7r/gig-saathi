import React, { useState } from 'react';
import { 
  FileCheck, Shield, Share2, Copy, Check, Printer, 
  X, AlertTriangle, ExternalLink, Calendar, MapPin, Scale 
} from 'lucide-react';
import { RIDER_PROFILE } from '../data/mockData';

export default function AuditEvidenceModal({ isOpen, onClose, onNotify }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const evidenceText = `GIGGY STATUTORY AUDIT CERTIFICATE
Reference: GIG-AUDIT-2026-7782190
Date: 23 October 2026 | 21:24 IST
Platform: Zomato (Order #ZOM-7782190)
Rider: ${RIDER_PROFILE.name} (Partner ID: ZOM-CHD-88192)

AUDIT FINDINGS & TELEMETRY DISCREPANCIES:
1. Distance Telemetry Shortfall:
   - Road Odometer GPS Telemetry: 7.4 km
   - Platform Settlement Billed: 5.1 km
   - Unbilled Distance: 2.3 km (₹12.00 Shortfall)

2. Environmental Surcharge Telemetry:
   - IMD Weather Station 044: Heavy Rain (18 mm/hr) Active
   - Required Weather Surcharge: ₹20.00
   - Settled Amount: ₹0.00

TOTAL UNCREDITED SHORTFALL: ₹32.00
STATUTORY BASIS:
Code on Social Security (Central Rules 2026), Section 114 & Rule 14 (Aggregator Compensation Parity).

STATUS: Verified by Giggy Local Statutory Telemetry Engine.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(evidenceText);
    setCopied(true);
    if (onNotify) {
      onNotify("Audit evidence certificate copied to clipboard!", "success");
    }
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">GPS Audit Evidence Certificate</h3>
              <p className="text-[10px] text-slate-500 font-mono">Ref: GIG-AUDIT-2026-7782190</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Sheet Display */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-3.5 font-sans">
          
          {/* Certificate Badge & Official Watermark Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-blue-600 block font-mono">
                Statutory Telemetry Verification
              </span>
              <h4 className="text-xs font-extrabold text-slate-900 mt-0.5">
                Central Rules 2026 Compliance Audit
              </h4>
            </div>
            <div className="text-right">
              <span className="text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold font-mono">
                VERIFIED TAMPER-PROOF
              </span>
              <span className="text-[10px] text-slate-500 block font-mono mt-0.5">23 Oct 2026 • 21:24</span>
            </div>
          </div>

          {/* Parties Grid */}
          <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-2.5 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[10px]">Rider Telemetry Profile</span>
              <span className="font-bold text-slate-800">{RIDER_PROFILE.name}</span>
              <span className="text-slate-500 block font-mono text-[10px]">ZOM-CHD-88192 (Hero Splendor 110cc)</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Platform & Order</span>
              <span className="font-bold text-slate-800">Zomato Logistics</span>
              <span className="text-slate-500 block font-mono text-[10px]">Order #ZOM-7782190</span>
            </div>
          </div>

          {/* Audit Discrepancy Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-slate-100/80 px-3 py-1.5 font-semibold text-slate-600 text-[10px] uppercase">
              <span>Audit Item</span>
              <span className="text-center">Recorded vs Paid</span>
              <span className="text-right">Shortfall</span>
            </div>
            
            <div className="divide-y divide-slate-100">
              <div className="grid grid-cols-3 px-3 py-2 items-center text-[11px]">
                <div>
                  <span className="font-medium text-slate-800 block">Distance Telemetry</span>
                  <span className="text-[9px] text-slate-400">Sector 17 → Sector 38</span>
                </div>
                <div className="text-center font-mono">
                  <span className="text-emerald-700 font-bold">7.4 km</span> vs <span className="text-slate-400">5.1 km</span>
                </div>
                <div className="text-right font-mono font-bold text-rose-600">
                  -₹12.00
                </div>
              </div>

              <div className="grid grid-cols-3 px-3 py-2 items-center text-[11px]">
                <div>
                  <span className="font-medium text-slate-800 block">Monsoon Rain Surcharge</span>
                  <span className="text-[9px] text-slate-400">IMD Zone 044 (18mm/hr)</span>
                </div>
                <div className="text-center font-mono">
                  <span className="text-emerald-700 font-bold">₹20.00</span> vs <span className="text-slate-400">₹0.00</span>
                </div>
                <div className="text-right font-mono font-bold text-rose-600">
                  -₹20.00
                </div>
              </div>
            </div>

            <div className="bg-rose-50/70 border-t border-rose-100 px-3 py-2 flex items-center justify-between text-xs">
              <span className="font-bold text-rose-900">Total Confirmed Shortfall:</span>
              <span className="font-mono font-extrabold text-rose-700 text-sm">-₹32.00</span>
            </div>
          </div>

          {/* Statutory Reference Footnote */}
          <div className="flex items-start gap-2 text-[10px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200">
            <Scale className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
            <span>
              Pursuant to <strong>Code on Social Security (Central Rules 2026)</strong> and Model Grievance Redressal framework for platform gig workers. This record is hashed and timestamped for dispute submission.
            </span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={handleCopy}
            className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Evidence'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF</span>
          </button>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(evidenceText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs text-center"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp ↗</span>
          </a>
        </div>

      </div>
    </div>
  );
}
