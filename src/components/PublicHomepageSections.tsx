import React, { useState } from 'react';
import { Language } from '../types';
import { SNHCPLogo } from './SNHCPLogo';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  FileCheck, 
  Globe, 
  BarChart3, 
  Layers, 
  UserPlus, 
  CheckCircle2, 
  Lock, 
  FileText, 
  EyeOff, 
  HelpCircle, 
  Mail, 
  Phone, 
  Send, 
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface SectionsProps {
  language: Language;
  onNavigate: (route: string) => void;
  onOpenRegister: () => void;
  totalUniversities: number;
  totalGraduates: number;
  totalTalent: number;
  totalEmployers: number;
}

/* ==========================================================================
   SECTION 4.C: PLATFORM STATISTICS
   ========================================================================== */
export const PlatformStatistics: React.FC<Pick<SectionsProps, 'language' | 'totalUniversities' | 'totalGraduates' | 'totalTalent' | 'totalEmployers'>> = ({
  language,
  totalUniversities,
  totalGraduates,
  totalTalent,
  totalEmployers
}) => {
  const isSo = language === 'so';

  return (
    <section className="bg-[#0b0b0b] border-b border-[#181818] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#22c55e] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008037]" />
              {isSo ? 'XOGTA NOOL EE DIIWAANKA QARAN' : 'AUTHENTIC REGISTRY METRICS'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-sans mt-1">
              {isSo ? 'Diiwaanka Qaran ee Kobcaya' : 'Growing National Registry'}
            </h2>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            {isSo ? 'Xogta tooska ah ee jaamacadaha & shirkadaha' : 'Live verified database synchronization'}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stat 1 */}
          <div className="p-6 rounded-lg bg-[#0e1410] border border-[#1b2b20] hover:border-[#008037]/60 transition-colors">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              {totalUniversities}
            </div>
            <div className="mt-2 text-xs font-semibold text-slate-300">
              {isSo ? 'Jaamacadaha Diwaangashan' : 'Registered Universities'}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              {isSo ? 'Dhammaan gobollada Somaliland' : 'Accredited higher institutions'}
            </div>
          </div>

          {/* Stat 2 */}
          <div className="p-6 rounded-lg bg-[#0e1410] border border-[#1b2b20] hover:border-[#008037]/60 transition-colors">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#22c55e] font-mono tabular-nums">
              {totalGraduates.toLocaleString()}+
            </div>
            <div className="mt-2 text-xs font-semibold text-slate-300">
              {isSo ? 'Qalinjabiyayaasha La Xaqiijiyay' : 'Verified Graduates'}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              {isSo ? 'Shahaadooyin leh QR SHA-256' : 'Digitally authenticated degrees'}
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-6 rounded-lg bg-[#0e1410] border border-[#1b2b20] hover:border-[#008037]/60 transition-colors">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] font-mono tabular-nums">
              {totalTalent.toLocaleString()}+
            </div>
            <div className="mt-2 text-xs font-semibold text-slate-300">
              {isSo ? 'Aqoonyahanka Diwaangashan' : 'Registered Talent Pool'}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              {isSo ? 'Dalka iyo Qurbajoogta' : 'Domestic & Diaspora professionals'}
            </div>
          </div>

          {/* Stat 4 */}
          <div className="p-6 rounded-lg bg-[#0e1410] border border-[#1b2b20] hover:border-[#008037]/60 transition-colors">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              {totalEmployers}
            </div>
            <div className="mt-2 text-xs font-semibold text-slate-300">
              {isSo ? 'Shirkadaha La Xaqiijiyay' : 'Active Verified Employers'}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              {isSo ? 'Hay\'adaha & ganacsiga gaarka ah' : 'Enterprise & public institutions'}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

/* ==========================================================================
   SECTION 4.D: ABOUT SNHCP
   ========================================================================== */
export const AboutSection: React.FC<Pick<SectionsProps, 'language' | 'onOpenRegister'>> = ({
  language,
  onOpenRegister
}) => {
  const isSo = language === 'so';

  return (
    <section id="about" className="py-20 lg:py-24 bg-[#080808] border-b border-[#181818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#22c55e] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008037]" />
            {isSo ? 'KU SAABSAN MADASHA' : 'ABOUT THE PLATFORM'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display leading-tight text-balance">
            {isSo ? 'Dhisidda Kaabayaasha Cududda Shaqaalaha Somaliland' : "Building Somaliland's Human Capital Infrastructure"}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            {isSo
              ? 'SNHCP waxaa loo qaabeeyey in lagu abuuro diiwaan qaran oo lagu kalsoonaan karo oo ku saabsan waxbarashada, shahaadooyinka, xirfadaha iyo fursadaha shaqo. Madashu waxay isku xirtaa jaamacadaha, ardayda, qalinjabiyayaasha, shirkadaha iyo hay\'adaha rasmiga ah iyada oo la marayo hal nidaam dijitaal ah oo sugan.'
              : 'SNHCP is designed to establish a trusted national digital record of education, qualifications, professional skills and employment opportunities. The platform connects universities, students, graduates, employers and authorized institutions through one secure digital ecosystem.'}
          </p>
        </div>

        {/* 3 Core Feature Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="p-8 rounded-xl bg-[#101411] border border-[#1b261f] hover:border-[#008037] transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-lg bg-[#142318] border border-[#1f3d29] flex items-center justify-center text-[#22c55e]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-sans group-hover:text-[#22c55e] transition-colors">
              {isSo ? 'Diiwaanka Waxbarashada Qaran' : 'National Education Registry'}
            </h3>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              {isSo
                ? 'Diiwaan midaysan oo ay ku jiraan jaamacadaha ka qaybgalaya, ardayda dhigata, qalinjabiyayaasha iyo shahaadooyinka tacliinta sare ee la aqoonsan yahay.'
                : 'A unified record of participating universities, enrolled students, graduates and academic qualifications across Somaliland.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-xl bg-[#101411] border border-[#1b261f] hover:border-[#D4AF37] transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-lg bg-[#211d10] border border-[#3b321a] flex items-center justify-center text-[#D4AF37]">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-sans group-hover:text-[#D4AF37] transition-colors">
              {isSo ? 'Xaqiijinta Shahaadooyinka Dijitaalka ah' : 'Digital Credential Verification'}
            </h3>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              {isSo
                ? 'Helitaan sugan oo loogu talagalay shahaadooyinka waxbarasho iyo xaqiijin toos ah oo lagu kalsoonaan karo oo ku salaysan shahaadooyinka jaamacaduhu bixiyeen.'
                : 'Secure access to academic records and trusted verification of university-issued credentials backed by cryptographic authenticity.'}
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-xl bg-[#101411] border border-[#1b261f] hover:border-[#C8102E] transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-lg bg-[#221013] border border-[#3b171c] flex items-center justify-center text-[#ef4444]">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-sans group-hover:text-[#ef4444] transition-colors">
              {isSo ? 'Hibada Qaran & Shaqooyinka' : 'National Talent & Employment'}
            </h3>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              {isSo
                ? 'Isku xirka aqoonyahanka tayada leh iyo shirkadaha shaqaaleysiinta iyada oo la ilaalinayo sirta xogta qofka iyo ogolaanshihiisa rasmiga ah.'
                : 'Connecting qualified professionals with legitimate employers and career opportunities without unsolicited intrusions or demographic bias.'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

/* ==========================================================================
   SECTION 4.E: OUR SERVICES (8 CARDS)
   ========================================================================== */
export const OurServicesSection: React.FC<Pick<SectionsProps, 'language' | 'onNavigate'>> = ({
  language,
  onNavigate
}) => {
  const isSo = language === 'so';

  const services = [
    {
      id: 'student-registration',
      icon: UserPlus,
      titleEn: 'Student & Graduate Registration',
      titleSo: 'Diiwaangelinta Ardayda & Qalinjabiyayaasha',
      descEn: 'Personal digital profiles for higher education students and graduates with unique Talent IDs.',
      descSo: 'Muuqaallo dijitaal ah oo u gaar ah ardayda iyo qalinjabiyayaasha oo wata Talent ID qaran.'
    },
    {
      id: 'university-portal',
      icon: Building2,
      titleEn: 'University Management Portal',
      titleSo: 'Xafiiska Maamulka Jaamacadaha',
      descEn: 'Institutional interface for submitting student cohorts and verifying academic credentials under strict dual sign-off.',
      descSo: 'Qaybta jaamacaduhu ku maamulaan dufcadaha qalinjabiyay iyada oo la raacayo kala-saaridda xilalka.'
    },
    {
      id: 'digital-credentials',
      icon: FileCheck,
      titleEn: 'Digital Certificates & Transcripts',
      titleSo: 'Shahaadooyinka & Warqadaha Darajooyinka',
      descEn: 'Cryptographically secured academic documents with QR code public authenticity lookup.',
      descSo: 'Dukumentiyo waxbarasho oo leh saxeex dijitaal ah iyo xaqiijin degdeg ah oo QR-code ah.'
    },
    {
      id: 'talent-registry',
      icon: Users,
      titleEn: 'National Talent Registry',
      titleSo: 'Diiwaanka Hibada Qaran',
      descEn: 'Comprehensive repository of skills, verified qualifications, and professional competencies.',
      descSo: 'Kaydka qaran ee xirfadaha, khibradaha shaqo, iyo aqoonta la xaqiijiyay ee muwaadiniinta.'
    },
    {
      id: 'employer-portal',
      icon: Briefcase,
      titleEn: 'Employer & Recruitment Portal',
      titleSo: 'Xafiiska Shirkadaha & Shaqaalaysiinta',
      descEn: 'Verified enterprise recruitment tools with competency matching and candidate consent workflows.',
      descSo: 'Qaybta shirkadaha la hubiyay ee shaqaalaysiinta iyada oo loo marayo codsiga ogolaanshaha.'
    },
    {
      id: 'diaspora-registry',
      icon: Globe,
      titleEn: 'Diaspora Talent Registry',
      titleSo: 'Diiwaanka Aqoonyahanka Qurbajoogta',
      descEn: 'Engagement platform for Somaliland professionals abroad contributing via knowledge transfer, mentorship, and return.',
      descSo: 'Isku-xirka aqoonyahanka qurbajoogta ee ku nool UK, UAE, USA, Yurub si ay dalka wax ugu celiyaan.'
    },
    {
      id: 'government-intelligence',
      icon: BarChart3,
      titleEn: 'Government Intelligence Dashboard',
      titleSo: 'Xafiiska Sirdoonka ee Dawladda',
      descEn: 'Aggregated macro statistics on graduate production, geographic talent distribution, and workforce trends.',
      descSo: 'Warbixinno heer qaran ah oo dawladda ka caawiya qorshaynta horumarinta tacliinta sare.'
    },
    {
      id: 'skills-inventory',
      icon: Layers,
      titleEn: 'National Skills Inventory & Gap Analysis',
      titleSo: 'Jaxdinka Farqiga Xirfadaha Qaranka',
      descEn: 'Systematic comparison of available talent versus economic demand to identify critical deficits.',
      descSo: 'Falanqaynta farqiga u dhexeeya wax-soo-saarka tacliinta iyo baahida dhabta ah ee dhaqaalaha.'
    }
  ];

  return (
    <section id="services" className="py-20 lg:py-24 bg-[#0b0b0b] border-b border-[#181818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#22c55e] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008037]" />
            {isSo ? 'ADEEGYADA QARANKA' : 'OUR INTEGRATED SERVICES'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display leading-tight text-balance">
            {isSo ? 'Adeegyada Muhiimka ah ee Madashu Bixiso' : 'Core National Platform Capabilities'}
          </h2>
          <p className="text-base text-slate-300 font-light leading-relaxed">
            {isSo
              ? 'Kaabayaal dijitaal ah oo u adeegaya ardayda, qalinjabiyayaasha, jaamacadaha, shirkadaha ganacsiga iyo hay\'adaha qaranka.'
              : 'Digital public infrastructure serving students, graduates, universities, private enterprises, and sovereign institutions.'}
          </p>
        </div>

        {/* 8 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc) => {
            const IconComponent = svc.icon;
            return (
              <div
                key={svc.id}
                className="p-6 rounded-xl bg-[#0f1410] border border-[#1b261e] hover:border-[#008037] hover:bg-[#121c15] transition-all flex flex-col justify-between group cursor-default"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-[#142318] border border-[#1e3826] flex items-center justify-center text-white group-hover:text-[#22c55e] group-hover:border-[#008037]/60 transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-sans group-hover:text-[#22c55e] transition-colors">
                    {isSo ? svc.titleSo : svc.titleEn}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {isSo ? svc.descSo : svc.descEn}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1a281e] flex items-center justify-between text-[11px] text-slate-400 group-hover:text-white">
                  <span>{isSo ? 'Adeeg Sugan' : 'Secure Service'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#22c55e]" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

/* ==========================================================================
   SECTION 4.F: HOW IT WORKS (4 STEPS)
   ========================================================================== */
export const HowItWorksSection: React.FC<Pick<SectionsProps, 'language' | 'onOpenRegister'>> = ({
  language,
  onOpenRegister
}) => {
  const isSo = language === 'so';

  const steps = [
    {
      num: '01',
      titleEn: 'CREATE YOUR ACCOUNT',
      titleSo: 'SAMAYSO KOONTI',
      descEn: 'Citizens, students and graduates create their personal accounts through the secure registration portal.',
      descSo: 'Muwaadiniinta, ardayda iyo qalinjabiyayaashu waxay iska diiwaangeliyaan bogga rasmiga ah.'
    },
    {
      num: '02',
      titleEn: 'VERIFY YOUR INFORMATION',
      titleSo: 'XAQIIJI MACLUUMAADKAAGA',
      descEn: 'Users and participating universities provide the necessary academic evidence and official records.',
      descSo: 'Ardayda iyo jaamacaduhu waxay bixiyaan xogta rasmiga ah iyo caddaymaha shahaadooyinka.'
    },
    {
      num: '03',
      titleEn: 'BUILD YOUR PROFILE',
      titleSo: 'DHIS MUUQAALKAAGA',
      descEn: 'Users access their verified academic credentials, maintain professional skills, and set privacy controls.',
      descSo: 'Qofku wuxuu helayaa shahaadooyinkiisa la hubiyay, wuxuuna maamulanayaa xogtiisa gaarka ah.'
    },
    {
      num: '04',
      titleEn: 'CONNECT WITH OPPORTUNITIES',
      titleSo: 'KU XIDHNOW FURSOOYINKA',
      descEn: 'Discover suitable employment, internship programmes, and professional collaborative opportunities.',
      descSo: 'Hel fursadaha shaqo ee ku habboon aqoontaada, shirkadaha dalkana si rasmi ah ugu xidhnow.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-24 bg-[#080808] border-b border-[#181818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#22c55e] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008037]" />
            {isSo ? 'HANAANKA SHUQULKA' : 'PROCESS WORKFLOW'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display leading-tight text-balance">
            {isSo ? 'Sida Madashu U Shaqeyso' : 'How the Platform Operates'}
          </h2>
          <p className="text-base text-slate-300 font-light leading-relaxed">
            {isSo
              ? 'Afar tallaabo oo cad oo isku xiraya aqoontaada jaamacadeed iyo suuqa shaqada ee qaranka.'
              : 'A seamless, four-step institutional journey from university matriculation to verified career connectivity.'}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-6 rounded-xl bg-[#0f1410] border border-[#1b261e] hover:border-[#008037]/60 transition-all space-y-4 relative"
            >
              <div className="text-3xl font-black font-mono text-[#D4AF37] tracking-wider">
                STEP {st.num}
              </div>
              <h3 className="text-sm font-bold text-white font-sans uppercase tracking-wide">
                {isSo ? st.titleSo : st.titleEn}
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                {isSo ? st.descSo : st.descEn}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenRegister}
            className="px-8 py-3.5 bg-[#008037] hover:bg-[#009942] active:bg-[#006e2e] text-white font-bold text-sm rounded-md transition-all shadow-lg shadow-[#008037]/25 border border-[#00a848]/40 cursor-pointer"
          >
            {isSo ? 'BILAAB LABA DAQIIQO GUDAHOOD' : 'START REGISTRATION TODAY'}
          </button>
        </div>

      </div>
    </section>
  );
};

/* ==========================================================================
   SECTION 4.G: SECURITY AND TRUST
   ========================================================================== */
export const SecurityTrustSection: React.FC<Pick<SectionsProps, 'language'>> = ({ language }) => {
  const isSo = language === 'so';

  const principles = [
    {
      titleEn: 'Protected Personal Information',
      titleSo: 'Ilaalinta Xogta Shakhsiga ah',
      descEn: 'Personal identifiers and contact details are masked by default to protect citizens from unauthorized access.',
      descSo: 'Aqoonsiga shakhsiga iyo xogta xidhiidhka waa la qariyaa si muwaadiniinta looga ilaaliyo marin-u-hel aan la oggolayn.'
    },
    {
      titleEn: 'Secure Academic Records',
      titleSo: 'Diiwaan Waxbarasho oo Sugan',
      descEn: 'Transcripts and degree certificates are encrypted at rest and in transit with cryptographic hashing.',
      descSo: 'Shahaadooyinka iyo darajooyinka waxbarasho waxaa lagu ilaaliyaa sirin dijitaal ah oo SHA-256 ah.'
    },
    {
      titleEn: 'Controlled Data Sharing',
      titleSo: 'Wadaagista Xogta oo La Maamulo',
      descEn: 'Employers and third parties cannot download candidate data without verified authorization.',
      descSo: 'Shirkadaha iyo cid saddexaad ma soo dejisan karaan xogta musharrixiinta iyada oo aan la fasaxin.'
    },
    {
      titleEn: 'Verified Institutional Records',
      titleSo: 'Diiwaan Jaamacadeed oo La Hubiyay',
      descEn: 'Only recognized universities can submit graduate cohorts with dual signatory approval.',
      descSo: 'Jaamacadaha aqoonsan oo keliya ayaa soo gelin kara dufcadaha qalinjabiyay iyada oo la raacayo ansixinta labada masuul.'
    },
    {
      titleEn: 'Audited Access',
      titleSo: 'Xusuus-Qor Baadhis oo Joogto ah',
      descEn: 'Every data access query is logged in a tamper-resistant security audit trail for accountability.',
      descSo: 'Diiwaan-gelin kasta oo xog la eego waxaa lagu qoraa xusuus-qor amni oo aan waxba laga beddeli karin.'
    },
    {
      titleEn: 'Candidate Consent',
      titleSo: 'Ogolaanshaha Musharraxa',
      descEn: 'Contact details are only disclosed to employers after the candidate explicitly approves a formal request.',
      descSo: 'Xogta xidhiidhka waxaa loo fasaxaa loo-shaqeeyaha marka qofku si cad u ogolaado codsiga.'
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#0b0b0b] border-b border-[#181818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#22c55e] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008037]" />
            {isSo ? 'AMNIGA & ILAALINTA XOGTA' : 'SECURITY & PRIVACY CONSTITUTION'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display leading-tight text-balance">
            {isSo ? 'Xogtaada. Maamulkaaga.' : 'YOUR INFORMATION. YOUR CONTROL.'}
          </h2>
          <p className="text-base text-slate-300 font-light leading-relaxed">
            {isSo
              ? 'SNHCP waxaa loo qaabeeyey iyada oo xoogga la saarayo ilaalinta xogta gaarka ah, aqoonsiga sugan, iyo xaddidaadda marin-u-helka macluumaadka shakhsiga ah.'
              : 'SNHCP is designed around privacy, secure identity management and controlled access to personal academic and professional information.'}
          </p>
        </div>

        {/* 6 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-[#0f1410] border border-[#1b261e] hover:border-[#008037]/50 transition-all space-y-2.5"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
                <h3 className="text-sm font-bold text-white font-sans">
                  {isSo ? p.titleSo : p.titleEn}
                </h3>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed pl-6">
                {isSo ? p.descSo : p.descEn}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

/* ==========================================================================
   SECTION 4.H: SUPPORT & CONTACT
   ========================================================================== */
export const SupportSection: React.FC<Pick<SectionsProps, 'language'>> = ({ language }) => {
  const isSo = language === 'so';
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const supportEmail = 'support@snhcp.govsomaliland.org';
  const supportPhone = '+252 63 000 0000';

  const faqs = [
    {
      qEn: 'Who can register on the SNHCP platform?',
      qSo: 'Yaa iska diiwaangelin kara madasha SNHCP?',
      aEn: 'Any Somaliland citizen, graduate or current student of an accredited Somaliland higher education institution, or diaspora professional.',
      aSo: 'Muwaadin kasta oo Somaliland ah, ardayda iyo qalinjabiyayaasha jaamacadaha aqoonsan, iyo aqoonyahanka qurbajoogta.'
    },
    {
      qEn: 'How can a university get access to the portal?',
      qSo: 'Sidee jaamacaddu ku heli kartaa xafiiska maamulka?',
      aEn: 'University accounts are not created publicly. Only the authorized SNHCP Administrator can create and invite recognized higher education institutions.',
      aSo: 'Koonfiyada jaamacadaha lagama furo meel furan. Kaliya maamulaha rasmiga ah ee SNHCP ayaa casuumi kara jaamacadaha aqoonsan.'
    },
    {
      qEn: 'Are my contact details visible to companies?',
      qSo: 'Shirkaduhu ma arki karaan taleefankayga iyo iimaylkayga?',
      aEn: 'No. Candidate contact details are masked by default. Employers must submit a formal Contact Request which you can approve or decline.',
      aSo: 'Maya. Xogtaada xidhiidhka waa qarsoon tahay. Shirkaduhu waa inay codsi kuu soo diraan si aad u ogolaato ama u diido.'
    },
    {
      qEn: 'How do employers verify a graduate’s credentials?',
      qSo: 'Sidee shirkaduhu u xaqiijiyaan shahaadada qofka qalinjabiyay?',
      aEn: 'Employers can scan the secure QR code on the credential or enter the SNHCP Credential ID in the public verification tool.',
      aSo: 'Waxay sawiri karaan lambarka QR-ka ama waxay galin karaan lambarka shahaadada nidaamka xaqiijinta.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <section id="support" className="py-20 lg:py-24 bg-[#080808] border-b border-[#181818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#22c55e] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008037]" />
            {isSo ? 'TAAGEERADA & CAAWIMADA' : 'SUPPORT & INQUIRIES'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display leading-tight text-balance">
            {isSo ? 'Waxaan Diyaar U Nahay Inaan Ku Caawino' : 'WE ARE HERE TO HELP'}
          </h2>
          <p className="text-base text-slate-300 font-light leading-relaxed">
            {isSo
              ? 'Ma u baahan tahay caawimo la xiriirta diiwaangelinta, xogta shahaadooyinka, xaqiijinta ama koontadaada? La xiriir kooxda taageerada SNHCP.'
              : 'Need assistance with registration, academic records, verification or account access? Contact the SNHCP support team.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-[#0f1410] border border-[#1b261e] rounded-xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-white font-sans">
              {isSo ? 'Soo Dir Farriin / Su\'aal' : 'Submit Support Request'}
            </h3>

            {submitted ? (
              <div className="p-6 bg-[#142318] border border-[#008037]/60 rounded-lg text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#22c55e] mx-auto" />
                <div className="text-sm font-bold text-white">
                  {isSo ? 'Farriintaada si guul ah ayaa loo diray!' : 'Your support inquiry has been submitted!'}
                </div>
                <p className="text-xs text-slate-400">
                  {isSo ? 'Kooxda taageeradu waxay kula soo xidhiidhi doontaa 24 saacadood gudahood.' : 'The SNHCP support desk will review and respond within 24 business hours.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">
                      {isSo ? 'Magacaaga Buuxa' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ahmed Mohamed"
                      className="w-full px-3.5 py-2.5 bg-[#141b16] border border-[#233529] rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-[#008037]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">
                      {isSo ? 'Cinwaanka Iimaylka' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#141b16] border border-[#233529] rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-[#008037]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">
                    {isSo ? 'Mowduuca' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={isSo ? 'Su\'aal ku saabsan shahaadadayda...' : 'Inquiry regarding academic credential verification...'}
                    className="w-full px-3.5 py-2.5 bg-[#141b16] border border-[#233529] rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-[#008037]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">
                    {isSo ? 'Farriintaada' : 'Message'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={isSo ? 'Faahfaahi su\'aashaada ama caawimada aad u baahan tahay...' : 'Provide details regarding your issue or inquiry...'}
                    className="w-full px-3.5 py-2.5 bg-[#141b16] border border-[#233529] rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-[#008037]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#008037] hover:bg-[#009942] active:bg-[#006e2e] text-white font-bold text-xs rounded-md transition-all shadow-md shadow-[#008037]/25 flex items-center gap-2 cursor-pointer border border-[#00a848]/40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSo ? 'Soo Dir Farriinta' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}

            <div className="pt-6 border-t border-[#1b261e] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-mono">{supportEmail}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#22c55e]" />
                <span className="font-mono">{supportPhone}</span>
              </div>
            </div>
          </div>

          {/* Right: FAQs */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-white font-sans mb-4">
              {isSo ? 'Su\'aalaha Badanaa La Isweydiiyo' : 'Frequently Asked Questions'}
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#1b261e] rounded-lg bg-[#0f1410] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between text-xs font-semibold text-white hover:text-[#22c55e] transition-colors cursor-pointer"
                    >
                      <span>{isSo ? faq.qSo : faq.qEn}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#22c55e]' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs text-slate-400 font-light leading-relaxed border-t border-[#1b261e] pt-3">
                        {isSo ? faq.aSo : faq.aEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

/* ==========================================================================
   SECTION 4.I: PUBLIC FOOTER
   ========================================================================== */
export const PublicFooter: React.FC<Pick<SectionsProps, 'language' | 'onNavigate'>> = ({
  language,
  onNavigate
}) => {
  const isSo = language === 'so';

  return (
    <footer className="bg-[#050505] border-t border-[#161616] py-14 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#181818]">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <SNHCPLogo size="md" variant="full" />
            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
              {isSo
                ? 'Madasha Qaran ee Kobcinta Awoodda Shaqaalaha Somaliland (SNHCP) waa kaabayaal dijitaal ah oo isku xira jaamacadaha, ardayda, shirkadaha iyo fursadaha shaqo ee dalka.'
                : 'Somaliland National Human Capital Platform is a national digital infrastructure connecting higher education institutions, verified credentials, citizen talent, and employment opportunities.'}
            </p>
            <div className="text-[11px] font-mono text-slate-500">
              National Digital Platform · Republic of Somaliland
            </div>
          </div>

          {/* Col 2: Platform */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              {isSo ? 'Madasha' : 'Platform'}
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  {isSo ? 'Hoyga' : 'Home'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  {isSo ? 'Ku Saabsan' : 'About'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  {isSo ? 'Adeegyada' : 'Services'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                  {isSo ? 'Sida Ay U Shaqeyso' : 'How It Works'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              {isSo ? 'Taageerada' : 'Support'}
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('support')} className="hover:text-white transition-colors cursor-pointer">
                  {isSo ? 'Xarunta Caawimada' : 'Help Center'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('support')} className="hover:text-white transition-colors cursor-pointer">
                  {isSo ? 'Xiriirka' : 'Contact Us'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('support')} className="hover:text-white transition-colors cursor-pointer">
                  {isSo ? 'Su\'aalaha Badanaa' : 'FAQs'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Restricted */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              {isSo ? 'Sharciga & Amniga' : 'Legal & Portal'}
            </div>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-white cursor-pointer">{isSo ? 'Shuruucda Xogta' : 'Privacy Policy'}</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">{isSo ? 'Shuruudaha Isticmaalka' : 'Terms of Service'}</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">{isSo ? 'Ilaalinta Xogta' : 'Data Protection'}</span>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => onNavigate('admin-login')} 
                  className="text-slate-500 hover:text-[#D4AF37] transition-colors font-mono text-[11px] cursor-pointer"
                >
                  {isSo ? 'Xafiiska Maamulka (Admin)' : 'Administrator Access'}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright with Somaliland National Emblem Badge */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#008037]" />
            <span>© 2026 Somaliland National Human Capital Platform. Republic of Somaliland.</span>
          </div>
          <div className="flex items-center gap-3 font-mono">
            <span>SNHCP Sovereign Digital Infrastructure</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#D4AF37]">MOHESR & MESAF Authorized</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
