import React, { useState } from 'react';
import { Vacancy, JobApplication, CitizenTalentProfile, Language, UserRole } from '../types';
import { 
  Briefcase, 
  Building, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  CheckCircle2, 
  Send, 
  AlertCircle, 
  ArrowRight,
  X,
  Sparkles,
  Building2,
  Calendar,
  Award
} from 'lucide-react';

interface ModuleEmploymentExchangeProps {
  vacancies: Vacancy[];
  talentProfiles: CitizenTalentProfile[];
  currentRole: UserRole;
  language: Language;
}

export const ModuleEmploymentExchange: React.FC<ModuleEmploymentExchangeProps> = ({
  vacancies,
  talentProfiles,
  currentRole,
  language
}) => {
  const isSo = language === 'so';
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [applyingVacancy, setApplyingVacancy] = useState<Vacancy | null>(null);
  
  // Application form state
  const [applicantTalentId, setApplicantTalentId] = useState<string>('SL-TAL-2026-89412');
  const [coverNote, setCoverNote] = useState<string>(
    'I hold a verified BSc in Computer Science from the University of Hargeisa with hands-on proficiency in React, Node.js and SQL.'
  );
  const [appSubmittedNotice, setAppSubmittedNotice] = useState<boolean>(false);

  // Filtered vacancies
  const filtered = vacancies.filter(v => {
    const matchesSector = selectedSector === 'all' || v.sector.toLowerCase().includes(selectedSector.toLowerCase());
    const matchesType = selectedType === 'all' || v.employmentType === selectedType;
    const matchesSearch = searchQuery === '' ||
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSector && matchesType && matchesSearch;
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setAppSubmittedNotice(true);
    setTimeout(() => {
      setAppSubmittedNotice(false);
      setApplyingVacancy(null);
    }, 1800);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1f1f1f]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#008037] font-bold mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008037] animate-pulse" />
            {isSo ? 'QAYBTA 06: SUUQA SHAQADA EE QARANKA' : 'MODULE 06: NATIONAL EMPLOYMENT EXCHANGE'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            {isSo ? 'Suuqa Shaqada & Fursadaha Qalinjabiyayaasha' : 'National Employment Exchange & Trainee Programmes'}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            {isSo
              ? 'Xidhiidhinta tooska ah ee ardayda qalinjabisay iyo shaqo-bixiyayaasha dawladda iyo kuwa gaarka ah. Fursadaha tababarka qalinjabiyayaasha (Graduate Trainee) iyo shaqooyinka joogtada ah.'
              : 'Direct national connectivity linking verified graduates with authentic public and private sector employment opportunities, graduate trainee schemes, and technical apprenticeships.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-[#111111] px-3 py-1.5 rounded-lg border border-[#222222]">
          <span className="text-[#FF6B00] font-bold">{filtered.length}</span>
          <span>active opportunities</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#111111] p-3 rounded-xl border border-[#222222] shadow-md">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isSo ? 'Raadi shaqo, shirkad, xirfad, ama magaalada...' : 'Search by job title, employer, skill, or location...'}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#161616] border border-[#282828] rounded-lg focus:outline-none focus:border-[#FF6B00] text-white placeholder-slate-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 text-xs bg-[#161616] border border-[#282828] rounded-lg text-slate-200 focus:outline-none focus:border-[#FF6B00] cursor-pointer"
          >
            <option value="all">{isSo ? 'Noocyada Shaqada Dhammaan' : 'All Work Types'}</option>
            <option value="Full-time">Full-time</option>
            <option value="Graduate Trainee">Graduate Trainee Scheme</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
      </div>

      {/* Vacancies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((vac) => (
          <div
            key={vac.id}
            className="bg-[#111111] border border-[#222222] rounded-xl p-6 flex flex-col justify-between hover:border-[#333333] transition-all shadow-lg space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6B00] font-bold">
                    {vac.sector}
                  </span>
                  <h3 className="text-base font-bold text-white font-sans mt-0.5 group-hover:text-[#FF6B00] transition-colors">
                    {vac.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <Building2 className="w-3.5 h-3.5 text-[#008037]" />
                    <span className="font-semibold text-slate-300">{vac.companyName}</span>
                    <span aria-hidden="true">·</span>
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{vac.location}</span>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold shrink-0">
                  {vac.employmentType}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                {vac.description}
              </p>

              {/* Required Skills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {vac.requiredSkills.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-[#161616] border border-[#282828] text-[10px] text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#1f1f1f] flex items-center justify-between gap-3 text-xs">
              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Deadline: {vac.deadline}</span>
              </div>

              <button
                onClick={() => setApplyingVacancy(vac)}
                className="px-4 py-2 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold rounded-lg text-xs shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isSo ? 'Codso Hadda' : 'Apply with Talent ID'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {applyingVacancy && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setApplyingVacancy(null);
          }}
        >
          <div className="bg-[#0e0e0e] border border-[#262626] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 my-auto relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 flex">
              <div className="flex-1 bg-[#008037]" />
              <div className="flex-1 bg-white" />
              <div className="flex-1 bg-[#C8102E]" />
            </div>

            <div className="flex items-start justify-between border-b border-[#202020] pb-3 pt-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#008037] font-bold">
                  DIRECT TALENT APPLICATION
                </span>
                <h3 className="text-base font-bold text-white font-sans mt-0.5">
                  {applyingVacancy.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {applyingVacancy.companyName} · {applyingVacancy.location}
                </p>
              </div>
              <button
                onClick={() => setApplyingVacancy(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg bg-[#181818] border border-[#282828] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {appSubmittedNotice ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#008037] mx-auto" />
                <h4 className="text-base font-bold text-white">Application Dispatched!</h4>
                <p className="text-xs text-slate-400">
                  Your verified degree and competencies have been submitted directly to the employer's screening queue.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Your Verified SNHCP Talent ID
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantTalentId}
                    onChange={(e) => setApplicantTalentId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white font-mono focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Candidate Statement / Executive Note
                  </label>
                  <textarea
                    rows={4}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00] leading-relaxed"
                  />
                </div>

                <div className="p-3 bg-[#141414] rounded-lg border border-[#222222] text-[11px] text-slate-400 space-y-1">
                  <div className="text-white font-semibold flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#008037]" />
                    <span>Automatic Credential Attachment</span>
                  </div>
                  <p>
                    Your verified degree records, institutional GPA, and validated skills are automatically attached from the SNHCP ledger.
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-[#202020]">
                  <button
                    type="button"
                    onClick={() => setApplyingVacancy(null)}
                    className="px-4 py-2 bg-[#181818] hover:bg-[#222] text-slate-300 rounded-lg text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#008037] hover:bg-[#009b43] text-white font-extrabold rounded-lg text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Verified Application</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
