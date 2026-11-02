import React, { useState } from 'react';
import { CitizenTalentProfile, DigitalCredential, Language, UserRole } from '../types';
import { TalentCardModal } from './TalentCardModal';
import { CandidateContactModal } from './CandidateContactModal';
import { CredentialInspectionModal } from './CredentialInspectionModal';
import { 
  Search, 
  Filter, 
  Shield, 
  User, 
  Globe, 
  Briefcase, 
  Mail, 
  Phone, 
  Lock, 
  CheckCircle2, 
  ChevronRight, 
  Send, 
  AlertTriangle,
  Award,
  Sparkles,
  MapPin,
  ExternalLink
} from 'lucide-react';

interface ModuleTalentRegistryProps {
  talentProfiles: CitizenTalentProfile[];
  currentRole: UserRole;
  language: Language;
  credentials?: DigitalCredential[];
  onSendContactRequest: (talentId: string, vacancyTitle: string, message: string) => void;
  onOpenCredentialModal?: (talentId: string) => void;
}

export const ModuleTalentRegistry: React.FC<ModuleTalentRegistryProps> = ({
  talentProfiles,
  currentRole,
  language,
  credentials = [],
  onSendContactRequest,
  onOpenCredentialModal
}) => {
  const isSo = language === 'so';
  const [activeTab, setActiveTab] = useState<'all' | 'diaspora'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');

  // Modals state
  const [inspectTalent, setInspectTalent] = useState<CitizenTalentProfile | null>(null);
  const [contactTalent, setContactTalent] = useState<CitizenTalentProfile | null>(null);
  const [inspectCredential, setInspectCredential] = useState<DigitalCredential | null>(null);

  // Available skills filter list
  const skillFilters = ['all', 'React', 'Node.js', 'SQL', 'Clinical Diagnosis', 'AutoCAD', 'Islamic Banking', 'AWS', 'Maternal Health'];
  const sectors = ['all', 'Information Technology', 'Medicine & Health Sciences', 'Engineering', 'Banking & Financial Services', 'Cloud & Telecommunications', 'Nursing & Midwifery'];

  const filteredTalent = talentProfiles.filter(t => {
    const matchesDiaspora = activeTab === 'all' || (activeTab === 'diaspora' && t.isDiaspora);
    const matchesSkill = selectedSkill === 'all' || t.skills.includes(selectedSkill);
    const matchesSector = selectedSector === 'all' || t.sector === selectedSector;
    const matchesSearch = searchQuery === '' ||
      t.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.talentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.currentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.countryOfResidence.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDiaspora && matchesSkill && matchesSector && matchesSearch;
  });

  const handleOpenCredentialForTalent = (talentId: string) => {
    const matched = credentials.find(c => c.talentId === talentId);
    if (matched) {
      setInspectCredential(matched);
    } else if (credentials.length > 0) {
      setInspectCredential(credentials[0]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1f1f1f]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#008037] font-bold mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008037] animate-pulse" />
            {isSo ? 'QAYBTA 03: DIIWAANKA HIBADA & MUWAADINKA' : 'MODULE 03: CITIZEN & TALENT REGISTRY'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            {isSo ? 'Diiwaanka Hibada Qaran & Aqoonyahanka Qurbajoogta' : 'National Talent & Diaspora Professional Registry'}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            {isSo
              ? 'Xogta aqoonyahanka Somaliland ee dalka iyo dibadda ku nool. Ilaalinta xogta gaarka ah (Privacy-First) iyada oo aan loo bandhigin xogta xidhiidhka ilaa musharraxu si rasmi ah u ogolaado.'
              : 'Verified competency profiles with unique Talent IDs. Built with strict privacy controls—personal contact info is masked by default and only disclosed upon explicit candidate consent.'}
          </p>
        </div>

        {/* Segmented Switcher: All vs Diaspora */}
        <div className="flex items-center gap-1 p-1 bg-[#121212] rounded-xl border border-[#222222] self-start md:self-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#1e1e1e] text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isSo ? 'Dhammaan Aqoonyahanka (All Talent)' : 'All National Talent'}
          </button>
          <button
            onClick={() => setActiveTab('diaspora')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'diaspora'
                ? 'bg-[#1e1e1e] text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#008037]" />
              <span>{isSo ? 'Aqoonyahanka Qurbajoogta (Diaspora)' : 'Diaspora Talent Registry'}</span>
            </span>
          </button>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="p-4 rounded-xl bg-[#111111] border border-[#222222] flex items-start gap-3 text-xs shadow-md">
        <Lock className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
        <div className="text-slate-300 leading-relaxed">
          <span className="font-semibold text-white">
            {isSo ? 'Shuruucda Ilaalinta Xogta Gaarka ah (Section 6.5 & 8): ' : 'Mandatory Privacy Shield (Article 14 & SNHCP Mandate): '}
          </span>
          {isSo
            ? 'Dhammaan macluumaadka xidhiidhka musharraxiinta waa qarsoon yihiin. Shirkadaha iyo loo-shaqeeyayaashu waa inay u diraan "Codsi Xidhiidh Rasmi ah" si qofku u oggolaado ama u diido. Ma jiro wadahadal toos ah oo furan.'
            : 'Candidate contact coordinates are strictly masked by default. Authorized institutional employers query by skills and verified degrees, and dispatch formal clearance requests via the SNHCP gateway. Candidates retain sovereign consent.'}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#111111] p-3 rounded-xl border border-[#222222] shadow-md">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isSo ? 'Raadi xirfad, magac, Talent ID, ama goobta...' : 'Search by skill, title, Talent ID, or location...'}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#161616] border border-[#282828] rounded-lg focus:outline-none focus:border-[#FF6B00] text-white placeholder-slate-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Skill Filter */}
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="px-3 py-2 text-xs bg-[#161616] border border-[#282828] rounded-lg text-slate-200 focus:outline-none focus:border-[#FF6B00] cursor-pointer"
          >
            <option value="all">{isSo ? 'Xirfadaha Dhammaan' : 'All Skills'}</option>
            {skillFilters.filter(s => s !== 'all').map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Sector Filter */}
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-3 py-2 text-xs bg-[#161616] border border-[#282828] rounded-lg text-slate-200 focus:outline-none focus:border-[#FF6B00] cursor-pointer"
          >
            <option value="all">{isSo ? 'Dhammaan Qaybaha (All Sectors)' : 'All Sectors'}</option>
            {sectors.filter(s => s !== 'all').map(sec => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Talent Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTalent.map((profile) => (
          <div
            key={profile.talentId}
            className="bg-[#111111] border border-[#222222] rounded-xl p-5 flex flex-col justify-between hover:border-[#333333] transition-all shadow-lg space-y-4 group"
          >
            <div className="space-y-3">
              {/* Top Profile Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1b2b20] to-[#0c140f] border border-[#27402f] flex items-center justify-center font-bold text-white text-sm">
                    {profile.fullName.split(' ')[0][0]}{profile.fullName.split(' ')[1] ? profile.fullName.split(' ')[1][0] : ''}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-sans group-hover:text-[#FF6B00] transition-colors">
                      {profile.fullName}
                    </h3>
                    <div className="text-[11px] font-mono text-slate-400">
                      ID: <span className="text-[#FF6B00]">{profile.talentId}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-[9px] font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    VERIFIED
                  </span>
                  {profile.isDiaspora && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-300 border border-amber-800 text-[9px] font-mono font-bold">
                      DIASPORA
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Education */}
              <div className="space-y-1 text-xs">
                <div className="text-slate-200 font-semibold flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>{profile.currentTitle}</span>
                </div>
                <div className="text-slate-400 text-[11px]">
                  {profile.universityName} · {profile.highestDegree.toUpperCase()}
                </div>
                <div className="text-slate-500 text-[10px] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{profile.city}, {profile.countryOfResidence}</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {profile.skills.slice(0, 3).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-[#161616] border border-[#282828] text-[10px] text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
                {profile.skills.length > 3 && (
                  <span className="px-1.5 py-0.5 rounded bg-[#161616] text-[10px] text-slate-500 font-mono">
                    +{profile.skills.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="pt-3 border-t border-[#1f1f1f] flex items-center justify-between gap-2 text-xs">
              <button
                onClick={() => setInspectTalent(profile)}
                className="px-3 py-1.5 rounded-lg bg-[#161616] hover:bg-[#202020] text-slate-200 hover:text-white border border-[#282828] text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>{isSo ? 'Eeg Kaadhka' : 'Inspect ID'}</span>
              </button>

              <button
                onClick={() => setContactTalent(profile)}
                className="px-3 py-1.5 rounded-lg bg-[#008037] hover:bg-[#009b43] text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
              >
                <Send className="w-3 h-3" />
                <span>{isSo ? 'Codso Xidhiidh' : 'Request Contact'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Talent Card Smart ID Modal */}
      <TalentCardModal
        talent={inspectTalent}
        isOpen={Boolean(inspectTalent)}
        onClose={() => setInspectTalent(null)}
        language={language}
        onOpenCredentialInspect={(talentId) => {
          setInspectTalent(null);
          handleOpenCredentialForTalent(talentId);
        }}
        onRequestContact={(t) => {
          setInspectTalent(null);
          setContactTalent(t);
        }}
      />

      {/* Candidate Contact Clearance Modal */}
      <CandidateContactModal
        talent={contactTalent}
        isOpen={Boolean(contactTalent)}
        onClose={() => setContactTalent(null)}
        language={language}
        onSendContactRequest={onSendContactRequest}
      />

      {/* Credential Inspection Modal */}
      <CredentialInspectionModal
        credential={inspectCredential}
        isOpen={Boolean(inspectCredential)}
        onClose={() => setInspectCredential(null)}
        language={language}
      />
    </div>
  );
};
