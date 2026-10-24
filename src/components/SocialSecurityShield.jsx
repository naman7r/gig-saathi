import React from 'react';
import { RIDER_PROFILE } from '../data/mockData';
import { ShieldCheck, HeartPulse, Award, AlertCircle } from 'lucide-react';

const TRANSLATIONS = {
  hinglish: {
    statute: 'सामाजिक सुरक्षा संहिता (Central Rules 2026)',
    dayProgress: 'दिन',
    of: 'में से',
    onPlatform: 'Zomato पर पूरे',
    shiftsLeft: 'सिर्फ',
    moreShifts: 'शिफ्ट और Zomato चलाना है',
    unlockDesc: 'ताकि ₹5 लाख का सरकारी आयुष्मान कार्ड अनलॉक हो सके।',
    complete: 'पूरा हुआ',
    day1: 'दिन 1',
    activeDay: 'दिन 84 (सक्रिय)',
    targetDay: 'दिन 90 लक्ष्य',
    benefit1Title: '₹5 लाख आयुष्मान कार्ड',
    benefit1Desc: 'सरकारी व प्राइवेट अस्पतालों में परिवार का मुफ्त कैशलेस इलाज।',
    benefit2Title: '₹2 लाख ई-श्रम बीमा',
    benefit2Desc: 'दुर्घटना मृत्यु व पूर्ण विकलांगता पर सरकारी आर्थिक सुरक्षा।',
    acceptanceTitle: 'स्वीकृति दर (Acceptance Rate): 76%',
    safeBuffer: 'सुरक्षित बफ़र: +1%',
    deactivationWarning: '75% से नीचे जाने पर ऐप ऑर्डर्स देना कम कर देता है। अपने 84 दिन के स्ट्रीक को सुरक्षित रखने के लिए अगला नजदीकी ऑर्डर जरूर लें।'
  },
  hi: {
    statute: 'सामाजिक सुरक्षा संहिता (धारा 114)',
    dayProgress: 'दिवस',
    of: 'कुल',
    onPlatform: 'Zomato पर पूर्ण',
    shiftsLeft: 'केवल',
    moreShifts: 'सक्रिय कार्य दिवस शेष',
    unlockDesc: 'सांविधिक स्वास्थ्य एवं दुर्घटना बीमा सुरक्षा प्राप्त करने हेतु।',
    complete: 'पूर्ण',
    day1: 'दिन 1',
    activeDay: 'दिन 84 (सक्रिय)',
    targetDay: 'दिन 90 लक्ष्य',
    benefit1Title: '₹5 लाख आयुष्मान भारत',
    benefit1Desc: 'परिवार हेतु सूचीबद्ध चिकित्सालयों में कैशलेस उपचार।',
    benefit2Title: '₹2 लाख ई-श्रम सुरक्षा',
    benefit2Desc: 'दुर्घटना जनित मृत्यु एवं अपंगता पर आर्थिक सहायता।',
    acceptanceTitle: 'ऑर्डर स्वीकृति दर: 76%',
    safeBuffer: 'सुरक्षित सीमा: +1%',
    deactivationWarning: '75% से कम स्वीकृति दर पर आवंटन में कमी आती है। अपनी 84-दिवसीय पात्रता सुरक्षित रखने हेतु अगला ऑर्डर स्वीकार करें।'
  },
  en: {
    statute: 'Code on Social Security (Section 114)',
    dayProgress: 'Day',
    of: 'of',
    onPlatform: 'on Zomato',
    shiftsLeft: 'Just',
    moreShifts: 'more active shifts to qualify',
    unlockDesc: 'to unlock statutory health & accidental cover under Central Rules.',
    complete: 'Complete',
    day1: 'Day 1',
    activeDay: 'Day 84 (Active)',
    targetDay: 'Day 90 Target',
    benefit1Title: '₹5 Lakh PM-JAY Cover',
    benefit1Desc: 'Cashless hospital coverage for you and your family.',
    benefit2Title: '₹2 Lakh e-Shram Insurance',
    benefit2Desc: 'Accidental death and disability protection.',
    acceptanceTitle: 'Acceptance Rate: 76%',
    safeBuffer: 'Buffer: +1%',
    deactivationWarning: 'Platform dispatch algorithms throttle order allocations below 75%. Accept your next short-distance trip to maintain safe standing and protect your 84-day streak.'
  }
};

export default function SocialSecurityShield({ currentLang = 'hinglish' }) {
  const { targetDays, currentDays, platform } = RIDER_PROFILE.socialSecurityThreshold;
  const progressPercent = Math.round((currentDays / targetDays) * 100);
  const daysLeft = targetDays - currentDays;

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <div className="space-y-4 text-slate-800 antialiased">
      {/* 90-Day Statutory Progress Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
              {t.statute}
            </span>
            <h3 className="text-base font-extrabold text-slate-900 mt-1">
              {t.dayProgress} {currentDays} {t.of} {targetDays} {t.onPlatform}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              <strong className="text-amber-800 font-bold">{t.shiftsLeft} {daysLeft} {t.moreShifts}</strong> {t.unlockDesc}
            </p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-extrabold font-mono text-emerald-600">{progressPercent}%</span>
            <span className="text-[10px] text-slate-400 block font-semibold">{t.complete}</span>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-100 rounded-full h-2.5 p-0.5 border border-slate-200 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>{t.day1}</span>
            <span className="text-amber-700 font-bold">{t.activeDay}</span>
            <span>{t.targetDay}</span>
          </div>
        </div>

        {/* Benefits Unlocking */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold">
              <HeartPulse className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.benefit1Title}</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              {t.benefit1Desc}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1">
            <div className="flex items-center gap-1.5 text-blue-800 text-xs font-bold">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.benefit2Title}</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              {t.benefit2Desc}
            </p>
          </div>
        </div>

        {/* Algorithmic Deactivation Risk Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t.acceptanceTitle}</span>
            </div>
            <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-mono font-bold">
              {t.safeBuffer}
            </span>
          </div>
          <p className="text-slate-700 text-[11px] leading-relaxed">
            {t.deactivationWarning}
          </p>
        </div>
      </div>
    </div>
  );
}
