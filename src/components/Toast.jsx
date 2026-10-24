import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function Toast({ message, type = 'info', onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />,
    info: <Info className="w-4 h-4 text-blue-400 shrink-0" />
  };

  const bgStyles = {
    success: 'bg-emerald-950/95 border-emerald-500/40 text-emerald-100',
    error: 'bg-rose-950/95 border-rose-500/40 text-rose-100',
    warning: 'bg-amber-950/95 border-amber-500/40 text-amber-100',
    info: 'bg-slate-900/95 border-slate-700/80 text-slate-100'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className={`p-4 rounded-2xl border shadow-2xl flex items-start justify-between gap-3 ${bgStyles[type]}`}>
        <div className="flex items-start gap-2.5">
          {icons[type]}
          <p className="text-xs font-semibold leading-relaxed">{message}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-white p-0.5 rounded-md min-h-[32px] min-w-[32px] flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
