import React from 'react';
import { SomalilandEmblem } from './SomalilandEmblem';
import { Language } from '../types';

interface TopNavigationProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: Language;
  onToggleLanguage: () => void;
  onOpenVerifyModal: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  currentTab,
  onSelectTab,
  language,
  onToggleLanguage,
  onOpenVerifyModal,
}) => {
  const isSo = language === 'so';

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* ZONE 1: Single Brand Wordmark Element */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => onSelectTab('overview')}
              className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <SomalilandEmblem size={32} />
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap">
                  {isSo ? 'SNHCP Somaliland' : 'SNHCP · Somaliland'}
                </span>
                <span className="text-[10px] uppercase font-semibold text-emerald-800 dark:text-emerald-400 tracking-wider">
                  {isSo ? 'Madasha Awoodda Shaqaalaha' : 'National Human Capital'}
                </span>
              </div>
            </button>
          </div>

          {/* ZONE 2: 4–5 Concise Single-Line Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => onSelectTab('overview')}
              className={`hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentTab === 'overview' ? 'text-emerald-800 dark:text-emerald-400 font-semibold border-b-2 border-emerald-800 dark:border-emerald-400' : ''
              }`}
            >
              {isSo ? 'Guudmar' : 'Overview'}
            </button>
            <button
              onClick={() => onSelectTab('education')}
              className={`hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentTab === 'education' ? 'text-emerald-800 dark:text-emerald-400 font-semibold border-b-2 border-emerald-800 dark:border-emerald-400' : ''
              }`}
            >
              {isSo ? 'Diiwaanka Jaamacadaha' : 'Education Registry'}
            </button>
            <button
              onClick={() => onSelectTab('talent')}
              className={`hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentTab === 'talent' ? 'text-emerald-800 dark:text-emerald-400 font-semibold border-b-2 border-emerald-800 dark:border-emerald-400' : ''
              }`}
            >
              {isSo ? 'Hibada & Qurbajoogta' : 'Talent & Diaspora'}
            </button>
            <button
              onClick={() => onSelectTab('exchange')}
              className={`hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentTab === 'exchange' ? 'text-emerald-800 dark:text-emerald-400 font-semibold border-b-2 border-emerald-800 dark:border-emerald-400' : ''
              }`}
            >
              {isSo ? 'Suuqa Shaqada' : 'Employment Exchange'}
            </button>
            <button
              onClick={() => onSelectTab('intelligence')}
              className={`hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentTab === 'intelligence' ? 'text-emerald-800 dark:text-emerald-400 font-semibold border-b-2 border-emerald-800 dark:border-emerald-400' : ''
              }`}
            >
              {isSo ? 'Sirdoonka Qaranka' : 'Skills Intelligence'}
            </button>
          </nav>

          {/* ZONE 3: 1 Primary Action + Language Selector */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onToggleLanguage}
              aria-label="Toggle language between Somali and English"
              className="px-2.5 py-1 text-xs font-semibold rounded border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors whitespace-nowrap shrink-0"
            >
              {language === 'en' ? 'SO · Af-Soomaali' : 'EN · English'}
            </button>

            <button
              onClick={onOpenVerifyModal}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-md transition-colors shadow-sm whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-600 focus:outline-none"
            >
              {isSo ? 'Hubi Shahaado (QR)' : 'Verify Credential'}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
