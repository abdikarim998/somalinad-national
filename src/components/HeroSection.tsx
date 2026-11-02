import React from 'react';
import { Language, UserRole } from '../types';
import { SomalilandEmblem } from './SomalilandEmblem';
import { ShieldCheck, GraduationCap, Users, Building2, BarChart3, QrCode } from 'lucide-react';

interface HeroSectionProps {
  language: Language;
  onNavigateTab: (tab: string) => void;
  onSetRole: (role: UserRole) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onNavigateTab,
  onSetRole
}) => {
  const isSo = language === 'so';

  return (
    <section className="border-b border-slate-200 dark:border-slate-800 bg-linear-to-b from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 py-10 sm:py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Sovereign Header & Vision */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">
            <span className="text-emerald-800 dark:text-emerald-400 font-semibold tracking-wide uppercase">
              {isSo ? 'Jamhuuriyadda Somaliland' : 'Republic of Somaliland'}
            </span>
            <span aria-hidden="true">·</span>
            <span>{isSo ? 'Qorshaha Qaran ee Kobcinta Awoodda Aqoonyahanka' : 'National Digital Transformation Infrastructure'}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">Version 1.0 (2026)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight text-balance">
            {isSo 
              ? 'Madasha Qaran ee Kobcinta Awoodda Shaqaalaha & Hibada Somaliland'
              : 'Somaliland National Human Capital Platform (SNHCP)'}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {isSo
              ? 'Nidaamka dhexe ee qaranka ee xaqiijinta aqoonta, diiwaangelinta jaamacadaha, keydinta shahaadooyinka dijitaalka ah, iyo isku-xidhka aqoonyahanka iyo fursadaha shaqo ee dalka iyo qurbajoogta.'
              : 'A trusted national digital infrastructure establishing a secure, unified record of Somaliland’s higher education institutions, verified academic credentials, professional talent pool, and workforce intelligence.'}
          </p>

          {/* Action Row */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                onSetRole('public_verifier');
                onNavigateTab('credentials');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-md text-sm font-semibold shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 focus:outline-none"
            >
              <QrCode className="w-4 h-4" />
              <span>{isSo ? 'Hubi Shahaadada (QR)' : 'Verify Academic Credential'}</span>
            </button>

            <button
              onClick={() => {
                onSetRole('citizen_talent');
                onNavigateTab('talent');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-md text-sm font-semibold transition-colors"
            >
              <Users className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>{isSo ? 'Diiwaanka Hibada & Talent ID' : 'Explore Talent Registry'}</span>
            </button>

            <button
              onClick={() => {
                onSetRole('national_authority');
                onNavigateTab('intelligence');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-md text-sm font-semibold transition-colors"
            >
              <BarChart3 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>{isSo ? 'Sirdoonka Farqiga Xirfadeed' : 'National Skills Gap Matrix'}</span>
            </button>
          </div>
        </div>

        {/* 4-Metric Sovereign Indicator Strip (Tabular Figures, Zero Pill, High Legibility) */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
              8
            </span>
            <span className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              {isSo ? 'Jaamacadaha Aqoonsan' : 'Accredited Higher Institutions'}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              {isSo ? 'UoH, Amoud, Burao, Edna, Golis, BMFA, Sanaag' : 'Coverage across all 6 national regions'}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800 dark:text-emerald-400 font-mono tabular-nums">
              50,290+
            </span>
            <span className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              {isSo ? 'Qalin-jabiyayaasha La Xaqiijiyay' : 'Verified Graduate Records'}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              {isSo ? 'Laga bilaabo 1998 ilaa 2026' : 'Historical & active registry from 1998-2026'}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
              32,970
            </span>
            <span className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              {isSo ? 'Ardayda Dhigata ee Diwaangashan' : 'Active Enrolled Students'}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              {isSo ? 'BSc, MSc, PhD, Diblooma Sare' : 'BSc, MSc, PhD & TVET programmes'}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
              100%
            </span>
            <span className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              {isSo ? 'Ilaalinta Amniga & Saxeexa QR' : 'Cryptographic Verification'}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              {isSo ? 'SHA-256 & Shahaado la Hubiyay' : 'Tamper-evident institutional audit hash'}
            </span>
          </div>
        </div>

        {/* Modular Ecosystem Navigator Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Universities & Ingestion */}
          <div 
            onClick={() => {
              onSetRole('university_admin');
              onNavigateTab('education');
            }}
            className="group cursor-pointer p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-emerald-600 dark:hover:border-emerald-500 transition-all shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">Module 01 & 02</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
              {isSo ? 'Diiwaanka & Xafiiska Jaamacadaha' : 'National Education & University Portal'}
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isSo
                ? 'Diiwaangelinta jaamacadaha, kulliyadaha, takhasusyada, iyo soo gelinta dufcadaha qalinjabiyay iyada oo la raacayo sharciga kala-saaridda xilalka.'
                : 'Manage university profiles, faculties, degree programmes, and bulk ingest graduate cohorts with strict separation of duties.'}
            </p>
            <div className="mt-4 text-xs font-semibold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
              <span>{isSo ? 'Fur Xafiiska Jaamacadda' : 'Access University Portal'}</span>
              <span>→</span>
            </div>
          </div>

          {/* Card 2: Talent & Diaspora */}
          <div 
            onClick={() => {
              onSetRole('citizen_talent');
              onNavigateTab('talent');
            }}
            className="group cursor-pointer p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-emerald-600 dark:hover:border-emerald-500 transition-all shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">Module 03</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
              {isSo ? 'Diiwaanka Muwaadinka & Qurbajoogta' : 'Talent & Diaspora Professional Pool'}
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isSo
                ? 'Aqoonsiga Hibada (Talent ID), ilaalinta sirta qofka, iyo ka faa\'iidaysiga aqoonta iyo waayo-aragnimada qurbajoogta Somaliland ee UK, UAE, USA.'
                : 'Unique SNHCP Talent IDs, masked privacy profiles, and mobilization of international diaspora experts for national development.'}
            </p>
            <div className="mt-4 text-xs font-semibold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
              <span>{isSo ? 'Eeg Xogta Aqoonyahanka' : 'View Talent Directory'}</span>
              <span>→</span>
            </div>
          </div>

          {/* Card 3: Employer & Exchange */}
          <div 
            onClick={() => {
              onSetRole('employer');
              onNavigateTab('exchange');
            }}
            className="group cursor-pointer p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-emerald-600 dark:hover:border-emerald-500 transition-all shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">Module 05 & 06</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
              {isSo ? 'Xafiiska Shirkadaha & Suuqa Shaqada' : 'Employer Portal & National Exchange'}
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isSo
                ? 'Daabacidda fursadaha shaqo, isku-aaddinta shahaadada iyo xirfadaha, iyo codsashada xidhiidhka musharraxa iyada oo aan jirin farriimo toos ah.'
                : 'Publish vacancies, run competency matching against verified credentials, and send formal contact requests without unconsented live chat.'}
            </p>
            <div className="mt-4 text-xs font-semibold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
              <span>{isSo ? 'Suuqa Shaqada & Shirkadaha' : 'Open Employment Exchange'}</span>
              <span>→</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
