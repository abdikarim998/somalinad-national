import React from 'react';
import { Language } from '../types';
import { ArrowRight, ShieldCheck, GraduationCap, Users, QrCode, Sparkles } from 'lucide-react';

interface PublicHeroSectionProps {
  language: Language;
  onOpenRegister: () => void;
  onExploreClick: () => void;
  onVerifyClick: () => void;
}

export const PublicHeroSection: React.FC<PublicHeroSectionProps> = ({
  language,
  onOpenRegister,
  onExploreClick,
  onVerifyClick
}) => {
  const isSo = language === 'so';

  return (
    <section className="relative overflow-hidden bg-[#080808] border-b border-[#181818] pt-14 pb-20 lg:pt-20 lg:pb-32">
      
      {/* Official Somaliland National Colors Top Ribbon (Green, White, Red) */}
      <div className="absolute top-0 inset-x-0 h-[3px] flex shadow-sm">
        <div className="h-full flex-1 bg-[#008037]" />
        <div className="h-full flex-1 bg-white" />
        <div className="h-full flex-1 bg-[#C8102E]" />
      </div>

      {/* Atmospheric Ambient Lighting in Somaliland Government Green & Gold */}
      <div className="absolute top-0 left-1/4 w-[520px] h-[520px] bg-[#008037]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/10 w-[450px] h-[450px] bg-[#D4AF37]/10 rounded-full blur-[130px] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Editorial Headline & Messaging */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Eyebrow Label with Sovereign Somaliland Government Identity */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0c1810] border border-[#008037]/40 text-xs font-semibold tracking-wider text-slate-300 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#008037] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#008037]" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#22c55e] font-bold">
                {isSo ? 'DOWLADDA SOMALILAND' : 'GOVERNMENT OF SOMALILAND'}
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-[10px] font-mono text-[#D4AF37] font-semibold">NATIONAL DIGITAL REGISTRY</span>
            </div>

            {/* Editorial Serif Big Headline with Official Somaliland Colors */}
            <div className="space-y-2">
              {isSo ? (
                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white font-display leading-[1.08] text-balance">
                  MUSTAQBALKA <br />
                  <span className="font-editorial italic font-normal text-transparent bg-clip-text bg-linear-to-r from-[#22c55e] via-[#4ade80] to-[#D4AF37]">
                    KAYDKA AQOONTA
                  </span> <br />
                  EE SOMALILAND
                </h1>
              ) : (
                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white font-display leading-[1.08] text-balance">
                  THE FUTURE OF <br />
                  <span className="font-editorial italic font-normal text-transparent bg-clip-text bg-linear-to-r from-[#22c55e] via-[#4ade80] to-[#D4AF37]">
                    SOMALILAND'S
                  </span> <br />
                  HUMAN CAPITAL
                </h1>
              )}
            </div>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed">
              {isSo
                ? 'Hal madal qaran oo isku xiraysa waxbarashada, shahaadooyinka, xirfadlayaasha iyo fursadaha shaqo ee Jamhuuriyadda Somaliland iyo dibaddeeda.'
                : 'One trusted sovereign platform connecting higher education, verified qualifications, professional talent and employment opportunities across the Republic of Somaliland.'}
            </p>

            {/* Action Buttons in Government Green & Gold */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenRegister}
                className="px-7 py-3.5 bg-[#008037] hover:bg-[#009942] active:bg-[#006e2e] text-white font-extrabold text-sm rounded-md transition-all shadow-lg shadow-[#008037]/30 border border-[#00a848]/40 flex items-center gap-2.5 cursor-pointer group"
              >
                <span>{isSo ? 'SAMAYSO KOONTO (REGISTER)' : 'CREATE YOUR ACCOUNT'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-[#121212] hover:bg-[#181818] text-white border border-[#2b2b2b] hover:border-[#D4AF37]/50 font-semibold text-sm rounded-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{isSo ? 'KALA SAAR ADEEGYADA' : 'EXPLORE PLATFORM'}</span>
              </button>

              <button
                onClick={onVerifyClick}
                className="px-4 py-3.5 text-slate-300 hover:text-[#22c55e] font-medium text-xs flex items-center gap-2 transition-colors cursor-pointer group"
              >
                <div className="w-6 h-6 rounded bg-[#161616] border border-[#262626] group-hover:border-[#008037] flex items-center justify-center transition-colors">
                  <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <span>{isSo ? 'Hubi Shahaadada (QR Scanner)' : 'Verify QR Credential'}</span>
              </button>
            </div>

            {/* Three Concise Trust Indicators (Section 4.B) with National Government Accents */}
            <div className="pt-8 border-t border-[#1a1a1a] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0e0e0e] border border-[#1e1e1e] hover:border-[#008037]/50 transition-all">
                <div className="w-8 h-8 rounded-md bg-[#0d1c12] border border-[#008037]/40 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4 text-[#22c55e]" />
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {isSo ? 'Diiwaanka Waxbarashada' : 'Education Registry'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isSo ? 'Jaamacadaha la aqoonsan yahay' : 'MOHESR Accredited'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0e0e0e] border border-[#1e1e1e] hover:border-[#D4AF37]/50 transition-all">
                <div className="w-8 h-8 rounded-md bg-[#1f1a0d] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {isSo ? 'Shahaadooyinka Qaranka' : 'Verified Credentials'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isSo ? 'SHA-256 Tamper-Proof' : 'Cryptographically Audited'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0e0e0e] border border-[#1e1e1e] hover:border-[#C8102E]/50 transition-all">
                <div className="w-8 h-8 rounded-md bg-[#221013] border border-[#C8102E]/40 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-[#ef4444]" />
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {isSo ? 'Kaydka Aqoonyahanka' : 'National Talent Pool'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isSo ? 'Dalka & Qurbajoogta' : 'Domestic & Diaspora Match'}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Composition with Official Somaliland Frame */}
          <div className="lg:col-span-5 relative">
            
            {/* Subtle green glow behind card */}
            <div className="absolute -inset-1 rounded-2xl bg-linear-to-b from-[#008037]/25 via-transparent to-transparent blur-xl opacity-75" />

            <div className="relative mx-auto max-w-lg lg:max-w-none rounded-2xl overflow-hidden border border-[#242424] bg-[#0d0d0d] shadow-2xl shadow-black group">
              
              {/* Sovereign Top Flag Ribbon on Card */}
              <div className="h-[3px] bg-linear-to-r from-[#008037] via-white to-[#C8102E]" />

              {/* Image Frame */}
              <div className="aspect-4/3 relative overflow-hidden bg-[#121212]">
                <img
                  src="/src/assets/images/somaliland_institution_hero_1793597606071.jpg"
                  alt="Modern university and technological institution in Hargeisa, Somaliland"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-90 contrast-105 group-hover:scale-103 transition-transform duration-700"
                />
                
                {/* Vignette Overlay for Depth */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0d0d0d] via-transparent to-black/40" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

                {/* Floating Real-Time Credential Stamp Overlay */}
                <div className="absolute top-4 right-4 bg-black/85 backdrop-blur-md border border-[#008037]/40 rounded-lg px-3 py-2 shadow-xl flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#008037] animate-pulse" />
                  <div className="text-left font-mono">
                    <div className="text-[10px] text-[#22c55e] font-bold uppercase tracking-wider">
                      SHA-256 VERIFIED
                    </div>
                    <div className="text-[9px] text-[#D4AF37]">
                      SL-CERT-2024-UOH
                    </div>
                  </div>
                </div>

                {/* Live Graduate Counter badge on bottom-left of image */}
                <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-md border border-[#D4AF37]/40 rounded-lg px-3 py-2 shadow-xl flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-[#008037]/20 border border-[#008037]/40 flex items-center justify-center text-[#22c55e]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white font-mono">1,840+ Graduates</div>
                    <div className="text-[10px] text-slate-400">Senate Minutes Authenticated</div>
                  </div>
                </div>
              </div>

              {/* In-Frame Editorial Glass Caption */}
              <div className="p-5 bg-[#0e0e0e] border-t border-[#1c1c1c] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-[#008037] uppercase font-bold flex items-center gap-1.5">
                    <span className="text-[#22c55e]">JAMHUURIYADDA SOMALILAND</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-[#D4AF37] font-normal">REPUBLIC OF SOMALILAND</span>
                  </div>
                  <div className="text-sm font-bold text-white font-sans mt-0.5">
                    {isSo ? 'Xarunta Tacliinta Sare & Sirdoonka Hibada' : 'Academic & Talent Innovation Center'}
                  </div>
                </div>

                <div className="text-right font-mono text-xs text-slate-400">
                  <span className="text-white font-semibold">Hargeisa</span>
                  <div className="text-[10px] text-[#D4AF37]">9.56° N, 44.06° E</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
