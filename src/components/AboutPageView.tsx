import React from 'react';
import { Language } from '../types';
import { SNHCPLogo } from './SNHCPLogo';
import { 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  Briefcase, 
  Globe, 
  BarChart3, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface AboutPageViewProps {
  language: Language;
  onOpenRegister: () => void;
  onNavigate: (route: string) => void;
}

export const AboutPageView: React.FC<AboutPageViewProps> = ({
  language,
  onOpenRegister,
  onNavigate
}) => {
  const isSo = language === 'so';

  return (
    <div className="bg-[#080808] text-slate-100 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Hero Banner */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#222222] text-xs font-mono text-[#FF6B00] font-semibold uppercase tracking-wider">
            {isSo ? 'QORSHAHA QARANKA EE SOMALILAND' : 'NATIONAL STRATEGIC IMPERATIVE'}
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold font-display text-white leading-tight text-balance">
            {isSo ? 'Ku Saabsan Madasha Qaran ee SNHCP' : 'About the Somaliland National Human Capital Platform'}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-3xl">
            {isSo
              ? 'SNHCP waa kaabayaal dijitaal ah oo loo aasaasay in lagu mideeyo aqoonta, shahaadooyinka, xirfadaha iyo fursadaha shaqaalenimo ee Jamhuuriyadda Somaliland.'
              : 'SNHCP is a sovereign digital transformation infrastructure establishing a centralized, cryptographically authenticated record of Somaliland’s higher education institutions, verified graduates, professional workforce, and diaspora capabilities.'}
          </p>
        </div>

        {/* Why Somaliland Needs the Platform (Section 9) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-mono text-[#FF6B00] font-bold uppercase tracking-widest">
              {isSo ? 'BAAHIDA DHABTA AH EE QARANKA' : 'THE NATIONAL PROBLEM & MANDATE'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              {isSo ? 'Maxaa Somaliland Ugu Baahan Tahay Madashan?' : 'Why Somaliland Requires a Unified Platform'}
            </h2>
            <div className="space-y-4 text-sm text-slate-300 font-light leading-relaxed">
              <p>
                {isSo
                  ? 'Taariikh ahaan, xogta ardayda dhigata jaamacadaha Somaliland, qalinjabiyayaasha, iyo shahaadooyinku waxay ku kala firirsanaayeen jaamacado gooni-gooni ah, hay\'ado dawladeed iyo shirkado gaar ah. Kala-daadsanaantaasi waxay adkaysay in la helo tirakoob sax ah oo qaran.'
                  : 'Historically, student enrollment records, graduate credentials, and skills inventories have been fragmented across independent universities, private firms, and individual CVs. This fragmentation hindered national education statistics, slowed down credential verification, and made sovereign workforce planning difficult.'}
              </p>
              <p>
                {isSo
                  ? 'SNHCP waxay xalinaysaa dhibaatadaas iyada oo dhistay buundo sugan oo isku xiraysa jaamacadaha, loo-shaqeeyayaasha, iyo muwaadiniinta iyada oo la adeegsanayo saxeexa casriga ah ee QR-ka iyo ilaalinta xogta gaarka ah.'
                  : 'SNHCP solves this structural coordination challenge by establishing an authoritative national bridge. It enables instant verification of university degrees, maps economic skills demand against graduation cohorts, and mobilizes international diaspora experts for national development.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 rounded-xl bg-[#111111] border border-[#222222] space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white font-sans border-b border-[#202020] pb-3">
              {isSo ? 'Tiirarka Aasaasiga ah ee SNHCP' : 'Core Sovereign Strategic Pillars'}
            </h3>
            
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                <span>Unified registry of all accredited higher education institutions across Somaliland.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                <span>Instant QR verification of degree certificates without exposing private personal identifiers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                <span>Fair and bias-free talent recruitment with explicit candidate consent protocols.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                <span>Structured mobilization of Somaliland professionals living in the UK, UAE, USA and Europe.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to action */}
        <div className="p-10 rounded-2xl bg-linear-to-r from-[#141414] to-[#0d0d0d] border border-[#262626] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white font-display">
              {isSo ? 'Ma Tahay Qalinjabiye ama Muwaadin?' : 'Are you a Graduate, Student or Professional?'}
            </h3>
            <p className="text-sm text-slate-400 font-light">
              {isSo ? 'Ku biir diiwaanka qaran oo hel aqoonsigaaga Talent ID laba daqiiqo gudahood.' : 'Register your verified profile and receive your unique SNHCP Talent ID today.'}
            </p>
          </div>

          <button
            onClick={onOpenRegister}
            className="px-7 py-3 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold text-xs rounded-md shadow-lg shadow-[#FF6B00]/25 transition-all cursor-pointer whitespace-nowrap"
          >
            {isSo ? 'Is Diiwaangeli Hadda' : 'Create Your Account'}
          </button>
        </div>

      </div>
    </div>
  );
};
