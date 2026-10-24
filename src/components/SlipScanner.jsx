import React, { useState } from 'react';
import { MOCK_PAYOUT_SLIPS } from '../data/mockData';
import { FileSearch, AlertTriangle, CheckCircle, UploadCloud, ShieldAlert, ArrowRight, Copy } from 'lucide-react';

export default function SlipScanner({ onDraftDispute }) {
  const [selectedSlipIndex, setSelectedSlipIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const currentSlip = MOCK_PAYOUT_SLIPS[selectedSlipIndex];

  const handleSelectSlip = (idx) => {
    setIsScanning(true);
    setTimeout(() => {
      setSelectedSlipIndex(idx);
      setIsScanning(false);
    }, 450);
  };

  return (
    <div className="space-y-4">
      {/* Feature Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <FileSearch className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Slip Vision AI & Underpayment Detector
              <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                MULTIMODAL OCR
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Reads platform payout screenshots, cross-references weather & distance, and flags stolen pay.
            </p>
          </div>
        </div>

        {/* Preset Slip Switchers */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800">
          {MOCK_PAYOUT_SLIPS.map((slip, idx) => (
            <button
              key={slip.id}
              onClick={() => handleSelectSlip(idx)}
              className={`p-2 rounded-xl text-left border transition-all ${
                selectedSlipIndex === idx
                  ? 'bg-blue-500/15 border-blue-500/50 shadow-sm shadow-blue-500/10'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className={slip.platform === 'Zomato' ? 'text-red-400' : 'text-orange-400'}>
                  {slip.platform} Payout
                </span>
                <span className="text-red-400 font-mono text-[10px]">
                  -₹{slip.underpaidAmount} Anomaly
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-200 mt-1 truncate">
                {idx === 0 ? '🌧️ Shaved Km + Missing Surge' : '❌ Unfair Cancellation Penalty'}
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Order #{slip.orderId}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Slip Analysis Container */}
      <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl p-4 shadow-xl">
        {isScanning ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-300 font-mono">Vision AI running OCR on payout slip...</p>
            <p className="text-[11px] text-slate-500">Extracting base pay, surge slabs, distance metrics & weather timestamps</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Visual Receipt Header */}
            <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    currentSlip.platform === 'Zomato' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {currentSlip.platform} Statement
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{currentSlip.date}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-200 mt-1">{currentSlip.restaurant}</h3>
                <p className="text-xs text-slate-400">{currentSlip.customerLoc}</p>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400">Credited to Wallet</span>
                <div className={`text-xl font-black font-mono ${
                  currentSlip.totalPaid < 0 ? 'text-red-400' : 'text-slate-100'
                }`}>
                  ₹{currentSlip.totalPaid}
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Fair pay: ₹{currentSlip.expectedFairPay}</span>
              </div>
            </div>

            {/* Extracted Breakdown Table */}
            <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800 text-xs space-y-2">
              <div className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                OCR Extracted Pay Structure
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Base Delivery Pay</span>
                <span className="font-mono font-medium">₹{currentSlip.basePay}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Distance Pay ({currentSlip.recordedDistanceKm} km recorded)</span>
                <span className="font-mono font-medium text-slate-200">
                  ₹{currentSlip.distancePay || 0}
                </span>
              </div>

              {currentSlip.peakSurgeLogged !== undefined && (
                <div className="flex justify-between text-slate-300">
                  <span>Weather & Peak Surge</span>
                  <span className="font-mono text-red-400 font-bold">
                    ₹{currentSlip.peakSurgeLogged} (Expected ₹20)
                  </span>
                </div>
              )}

              {currentSlip.penaltyDeduction && (
                <div className="flex justify-between text-red-400 font-bold">
                  <span>{currentSlip.penaltyReason}</span>
                  <span className="font-mono">₹{currentSlip.penaltyDeduction}</span>
                </div>
              )}
            </div>

            {/* Red-Flag Anomaly Alert (The High-Value Insight) */}
            <div className="bg-red-950/40 border border-red-500/50 rounded-xl p-3.5 space-y-2 text-red-200">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
                <span className="text-xs font-black uppercase tracking-wider text-red-400">
                  Underpayment Alert: ₹{currentSlip.underpaidAmount} Shortchanged
                </span>
              </div>

              <div className="space-y-1.5 pl-7 text-xs">
                {currentSlip.anomalyFlags.map((flag, i) => (
                  <p key={i} className="text-slate-300 leading-relaxed">
                    • <strong className="text-red-300">{flag}</strong>
                  </p>
                ))}
              </div>
            </div>

            {/* Evidence Timeline */}
            <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
              <p className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                Audit Timeline Generated for Platform Support
              </p>
              <div className="space-y-2 text-xs">
                {currentSlip.evidenceTimeline.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-300">
                    <span className="font-mono text-amber-400 text-[11px] shrink-0 font-bold">
                      [{item.time}]
                    </span>
                    <span>{item.event}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 1-Click Action to Dispute */}
            <button
              onClick={() => onDraftDispute(currentSlip)}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>Auto-Draft Formal Appeal Ticket (₹{currentSlip.underpaidAmount} Recovery)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
