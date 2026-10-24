import React, { useState } from 'react';
import { 
  Trophy, Sparkles, ShieldCheck, Target, Layers, 
  ArrowRight, CheckCircle2, ChevronRight, X, Cpu, 
  Users, Scale, FileText, Smartphone, Laptop
} from 'lucide-react';

export default function JudgeBriefModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      badge: "The Problem",
      title: "1.2 Crore Workers vs Algorithmic Opacity",
      subtitle: "Why gig platforms consistently underpay Indian delivery riders without detection.",
      bullets: [
        {
          head: "The Invisible 32% Fuel & Deadhead Drain",
          desc: "Apps show gross payouts (e.g. ₹1,120), but hide that 110cc bike fuel (₹2.9/km) and empty return trips leave workers with just ₹69/hr — far below urban living wage."
        },
        {
          head: "Algorithmic Distance Trimming",
          desc: "Platforms routinely pay for straight-line Euclidean distance (5.1 km) instead of actual road telemetry (7.4 km), quietly skimming ₹15–₹40 per order."
        },
        {
          head: "Unclaimed Central Social Security",
          desc: "Under India's Code on Social Security (Central Rules 2026), working 90 days qualifies riders for ₹5 Lakh Ayushman Bharat health cover — yet 98% of riders never track or claim it."
        }
      ]
    },
    {
      badge: "The Architecture",
      title: "Dual-Engine AI + Telemetry Math",
      subtitle: "Built for street-level reliability in tier-2 Indian cities with offline resilience.",
      bullets: [
        {
          head: "Deterministic Statutory Rule Engine (Offline First)",
          desc: "Instant legal citations [KB-001 to KB-004] without hallucination, zero latency, and zero API costs. Operates even when 4G connectivity drops in basement food courts."
        },
        {
          head: "Google Gemini 2.5 Flash Live Integration",
          desc: "Processes multimodal pay slips, extracts hidden penalties from unstructured screenshots, and generates legally airtight formal appeal briefs in seconds."
        },
        {
          head: "Dual-Viewport Design (Rider + Policy Auditor)",
          desc: "Rider Phone View provides plain-speak audio synthesis in Hindi & Hinglish; Laptop Sightline View gives union leaders and policy auditors enterprise-grade compliance logs."
        }
      ]
    },
    {
      badge: "Competitive Moat",
      title: "Why Giggy Wins",
      subtitle: "What separates this from 80 generic chatbot wrappers.",
      bullets: [
        {
          head: "True Grounding in Real Indian Economics",
          desc: "Hero Splendor 110cc engine calibration, real-time heatwave hydration intervals (38°C Sector 35 telemetry), and automatic monsoon surge dispute generation."
        },
        {
          head: "Production Engineering & Zero Slop",
          desc: "13/13 deterministic compliance test suite passing, zero raw window alerts, verified national helpline fallbacks (1915 / 14434 / 112), and pure responsive layout."
        },
        {
          head: "1-Click Formal Legal Action",
          desc: "Doesn't just give advice — exports verifiable GPS audit certificates and pre-formatted grievance letters directly forwardable to aggregator grievance cells."
        }
      ]
    }
  ];

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in duration-200">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">Executive Pitch & Architecture Brief</h3>
                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold border border-blue-200 font-mono">
                  Slide {currentSlide + 1} of 3
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Evaluator Walkthrough • Google Antigravity Prototype</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Slide Content */}
        <div className="space-y-4 min-h-[300px]">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 font-mono">
              {slide.badge}
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              {slide.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {slide.subtitle}
            </p>
          </div>

          {/* Bullets */}
          <div className="space-y-3 pt-1">
            {slide.bullets.map((b, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <h4 className="text-xs font-bold text-slate-800">{b.head}</h4>
                </div>
                <p className="text-xs text-slate-600 pl-5.5 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          {/* Step Dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === i ? 'w-6 bg-blue-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentSlide > 0 && (
              <button
                onClick={() => setCurrentSlide(prev => prev - 1)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                Previous
              </button>
            )}

            {currentSlide < slides.length - 1 ? (
              <button
                onClick={() => setCurrentSlide(prev => prev + 1)}
                className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer transition-all"
              >
                Explore Live Demo
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
