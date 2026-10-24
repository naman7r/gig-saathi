import React from 'react';
import { Search, FolderOpen, ArrowRight, RotateCcw } from 'lucide-react';

export default function EmptyState({ 
  icon: Icon = FolderOpen,
  title = "कोई डेटा नहीं मिला / No Records Found", 
  description = "आपके चुने हुए फ़िल्टर में कोई ट्रिप या ऑडिट नहीं है।", 
  actionLabel, 
  onAction 
}) {
  return (
    <div className="w-full py-12 px-4 rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center text-center space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center shadow-xs">
        <Icon className="w-6 h-6 text-slate-400" />
      </div>

      <div className="max-w-xs space-y-1">
        <h4 className="text-sm font-bold text-slate-800">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 min-h-[44px]"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
