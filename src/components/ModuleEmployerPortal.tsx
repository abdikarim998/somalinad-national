import React, { useState } from 'react';
import { CompanyEmployer, Vacancy, CitizenTalentProfile, ContactRequest, Language, DegreeLevel } from '../types';
import { TalentCardModal } from './TalentCardModal';
import { CandidateContactModal } from './CandidateContactModal';
import { 
  Building2, 
  Plus, 
  Users, 
  Send, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  MapPin, 
  Briefcase, 
  Mail, 
  Phone, 
  Lock, 
  X,
  Award,
  Clock,
  ArrowRight
} from 'lucide-react';

interface ModuleEmployerPortalProps {
  companies: CompanyEmployer[];
  vacancies: Vacancy[];
  talentProfiles: CitizenTalentProfile[];
  contactRequests: ContactRequest[];
  onPublishVacancy: (newVacancy: Vacancy) => void;
  onSendContactRequest: (talentId: string, vacancyTitle: string, message: string) => void;
  language: Language;
}

export const ModuleEmployerPortal: React.FC<ModuleEmployerPortalProps> = ({
  companies,
  vacancies,
  talentProfiles,
  contactRequests,
  onPublishVacancy,
  onSendContactRequest,
  language
}) => {
  const isSo = language === 'so';
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('telesom');
  const [activeTab, setActiveTab] = useState<'matches' | 'vacancies' | 'requests'>('matches');
  
  // Vacancy Creation Modal State
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('Power Systems & Renewable Energy Engineer');
  const [newSector, setNewSector] = useState<string>('Energy & Infrastructure');
  const [newDegree, setNewDegree] = useState<DegreeLevel>('bachelors');
  const [newSkills, setNewSkills] = useState<string>('Renewable Energy, Solar Grid, AutoCAD, Substation Design');
  const [newExperience, setNewExperience] = useState<number>(2);
  const [newLocation, setNewLocation] = useState<string>('Hargeisa, Somaliland');
  const [newDesc, setNewDesc] = useState<string>(
    'Responsible for electrical grid stability, solar farm integration, and substations maintenance.'
  );

  // Modals state
  const [selectedTalentForCard, setSelectedTalentForCard] = useState<CitizenTalentProfile | null>(null);
  const [selectedTalentForContact, setSelectedTalentForContact] = useState<CitizenTalentProfile | null>(null);

  const selectedCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];
  const companyVacancies = vacancies.filter(v => v.companyId === selectedCompanyId);

  // Focus vacancy for candidate competency matching
  const [selectedVacancyId, setSelectedVacancyId] = useState<string>(
    companyVacancies[0]?.id || vacancies[0]?.id || ''
  );
  const activeVacancy = vacancies.find(v => v.id === selectedVacancyId) || vacancies[0];

  // Algorithmic candidate matching logic
  const candidateMatches = talentProfiles.map(talent => {
    let score = 0;
    const rationale: string[] = [];

    // Degree match
    if (talent.highestDegree === activeVacancy?.degreeRequired || talent.highestDegree === 'masters' || talent.highestDegree === 'phd') {
      score += 35;
      rationale.push(isSo ? 'Shahaadada loo baahan yahay way u buuxsantay' : 'Required qualification level satisfied');
    }

    // Skills match
    const matchedSkills = talent.skills.filter(s => 
      activeVacancy?.requiredSkills.some(req => req.toLowerCase() === s.toLowerCase())
    );
    const skillPoints = Math.min(45, matchedSkills.length * 15);
    score += skillPoints;
    if (matchedSkills.length > 0) {
      rationale.push(isSo ? `Xirfadaha la helay: ${matchedSkills.join(', ')}` : `Matched core competencies: ${matchedSkills.join(', ')}`);
    }

    // Experience
    if (talent.yearsExperience >= (activeVacancy?.minExperienceYears || 0)) {
      score += 20;
      rationale.push(isSo ? `Khibrad ku filan (${talent.yearsExperience} sano)` : `Experience requirement satisfied (${talent.yearsExperience} yrs)`);
    }

    return {
      talent,
      score: Math.min(100, score),
      rationale,
      matchedSkills
    };
  }).sort((a, b) => b.score - a.score);

  const handleCreateVacancySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Vacancy = {
      id: `vac-${Date.now()}`,
      companyId: selectedCompany.id,
      companyName: selectedCompany.name,
      title: newTitle,
      sector: newSector,
      degreeRequired: newDegree,
      fieldOfStudy: 'Engineering or Related',
      requiredSkills: newSkills.split(',').map(s => s.trim()).filter(Boolean),
      minExperienceYears: newExperience,
      location: newLocation,
      employmentType: 'Full-time',
      deadline: '2026-12-31',
      postedDate: new Date().toISOString().split('T')[0],
      applicantsCount: 0,
      status: 'open',
      description: newDesc
    };

    onPublishVacancy(created);
    setShowCreateModal(false);
    setSelectedVacancyId(created.id);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1f1f1f]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#008037] font-bold mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008037] animate-pulse" />
            {isSo ? 'QAYBTA 05: XAFIISKA LOO-SHAQEEYAHA' : 'MODULE 05: EMPLOYER PORTAL'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            {isSo ? 'Xafiiska Shirkadaha & Qorista Shaqaalaha' : 'Employer & Enterprise Recruitment Portal'}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            {isSo
              ? 'Xarunta qorista shaqaalaha ee shirkadaha la xaqiijiyay. Isku-aaddinta xirfadaha iyada oo aan la isticmaalin xog qoys ama qabiil, iyo maaraynta codsiyada xidhiidhka.'
              : 'Verified employer dashboard. Match vacancies against certified university credentials with transparent competency scoring and candidate-consented contact releases.'}
          </p>
        </div>

        {/* Selected Employer Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">{isSo ? 'Shirkadda:' : 'Enterprise:'}</span>
          <select
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
            className="px-3.5 py-2 text-xs font-semibold bg-[#141414] border border-[#282828] rounded-xl text-white focus:outline-none focus:border-[#FF6B00] cursor-pointer"
          >
            {companies.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mandatory Candidate Privacy Banner (Section 6.5 Compliance) */}
      <div className="p-4 bg-[#111111] rounded-xl border border-[#222222] flex items-start gap-3 text-xs shadow-md">
        <Lock className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
        <div className="text-slate-300 leading-relaxed">
          <span className="font-semibold text-white">
            {isSo ? 'Hab-raaca Ilaalinta Sirta Musharrixiinta (Section 6 Module 5): ' : 'Candidate Privacy Protocol (Section 6 Module 5): '}
          </span>
          {isSo
            ? 'Musharraxa profile-kiisa buuxa lama arki karo ilaa aad codsi u dirto oo uu ogolaado. Ma jiro live chat toos ah; marka musharraxu ogolaado, nidaamku wuxuu si toos ah kuu siinayaa iimaylka iyo taleefanka rasmiga ah.'
            : 'Candidate profiles are anonymized during initial search. Unsolicited contact is strictly disabled. Submit a formal Contact Request to unlock candidate-approved phone and email coordinates.'}
        </div>
      </div>

      {/* Segmented Tabs & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 bg-[#121212] rounded-xl border border-[#222222]">
          <button
            onClick={() => setActiveTab('matches')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'matches'
                ? 'bg-[#1e1e1e] text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isSo ? 'Isku-Aaddinta Musharrixiinta' : 'Competency Matching'}
          </button>
          <button
            onClick={() => setActiveTab('vacancies')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'vacancies'
                ? 'bg-[#1e1e1e] text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isSo ? `Fursadaha Furan (${companyVacancies.length})` : `Active Vacancies (${companyVacancies.length})`}
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'requests'
                ? 'bg-[#1e1e1e] text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isSo ? 'Codsiyada Xidhiidhka' : 'Contact Requests'}
          </button>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black rounded-xl text-xs font-extrabold shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isSo ? 'Daabac Fursad Shaqo' : 'Publish New Vacancy'}</span>
        </button>
      </div>

      {/* Tab 1: Competency Matching View */}
      {activeTab === 'matches' && (
        <div className="space-y-6">
          {/* Target vacancy selector */}
          <div className="bg-[#111111] p-5 rounded-xl border border-[#222222] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#FF6B00] font-bold">
                {isSo ? 'Fursadda loo eegayo Isku-Aaddinta:' : 'Active Benchmark Vacancy:'}
              </span>
              <div className="text-base font-bold text-white font-sans mt-0.5">
                {activeVacancy?.title}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                <span>{activeVacancy?.location}</span>
                <span aria-hidden="true">·</span>
                <span>Requires: <span className="text-slate-300">{activeVacancy?.requiredSkills.join(', ')}</span></span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">Min {activeVacancy?.minExperienceYears} yrs</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">{isSo ? 'Beddel:' : 'Switch Benchmark:'}</span>
              <select
                value={selectedVacancyId}
                onChange={(e) => setSelectedVacancyId(e.target.value)}
                className="px-3 py-1.5 text-xs bg-[#161616] border border-[#282828] rounded-lg text-white font-medium cursor-pointer focus:outline-none focus:border-[#FF6B00]"
              >
                {vacancies.map(v => (
                  <option key={v.id} value={v.id}>{v.title} ({v.companyName})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ranked Candidates List */}
          <div className="space-y-4">
            {candidateMatches.map(({ talent, score, rationale, matchedSkills }) => (
              <div
                key={talent.talentId}
                className="p-5 bg-[#111111] border border-[#222222] rounded-xl hover:border-[#333333] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-lg"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#FF6B00]">
                      {talent.talentId}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {talent.fullName.split(' ')[0]} {talent.fullName.split(' ')[1] ? talent.fullName.split(' ')[1][0] + '.' : ''} (Masked)
                    </span>
                    <span className="text-xs text-slate-400">
                      {talent.highestDegree.toUpperCase()} · {talent.universityName}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#181818] border border-[#262626] text-slate-300 font-medium">
                      {talent.currentTitle}
                    </span>
                    <span className="text-slate-500 font-mono">
                      {talent.yearsExperience} yrs exp · {talent.city}
                    </span>
                  </div>

                  {/* Competency Rationale Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rationale.map((r, i) => (
                      <span key={i} className="text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2 py-0.5 rounded font-mono">
                        ✓ {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Match Score & Actions */}
                <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                  <div className="text-right">
                    <div className="text-xl font-bold font-mono text-[#008037]">
                      {score}%
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono uppercase">
                      Match Rating
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTalentForCard(talent)}
                    className="px-3 py-1.5 bg-[#161616] hover:bg-[#202020] text-slate-300 hover:text-white border border-[#282828] rounded-lg text-xs font-medium transition-colors cursor-pointer"
                  >
                    Inspect Profile
                  </button>

                  <button
                    onClick={() => setSelectedTalentForContact(talent)}
                    className="px-4 py-2 bg-[#008037] hover:bg-[#009b43] text-white font-bold rounded-lg text-xs shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSo ? 'Codso Xidhiidh' : 'Request Contact'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Vacancies List */}
      {activeTab === 'vacancies' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {companyVacancies.map((v) => (
              <div
                key={v.id}
                className="p-5 bg-[#111111] border border-[#222222] rounded-xl space-y-3 shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#FF6B00] font-bold">
                      {v.sector}
                    </span>
                    <h4 className="text-base font-bold text-white font-sans mt-0.5">
                      {v.title}
                    </h4>
                    <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#008037]" />
                      <span>{v.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-emerald-400">{v.employmentType}</span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold">
                    ACTIVE
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {v.description}
                </p>

                <div className="pt-2 border-t border-[#1f1f1f] flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Req: {v.degreeRequired.toUpperCase()}</span>
                  <span>Min {v.minExperienceYears} yrs exp</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Contact Requests Table */}
      {activeTab === 'requests' && (
        <div className="bg-[#111111] border border-[#222222] rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#161616] text-slate-400 border-b border-[#222222] font-mono text-[10px] uppercase">
              <tr>
                <th className="px-5 py-3">Talent ID & Candidate</th>
                <th className="px-5 py-3">Vacancy Target</th>
                <th className="px-5 py-3">Clearance Status</th>
                <th className="px-5 py-3 text-right">Requested Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c1c1c]">
              {contactRequests.map((req) => (
                <tr key={req.id} className="hover:bg-[#161616]/50">
                  <td className="px-5 py-3">
                    <div className="font-bold text-white">{req.candidateNameMasked}</div>
                    <div className="text-[10px] font-mono text-[#FF6B00]">{req.talentId}</div>
                  </td>
                  <td className="px-5 py-3 text-slate-300">{req.vacancyTitle}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      req.status === 'approved'
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                        : req.status === 'declined'
                        ? 'bg-red-950/60 text-red-300 border border-red-800'
                        : 'bg-amber-950/60 text-amber-300 border border-amber-800'
                    }`}>
                      {req.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-slate-400">{req.requestedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Vacancy Creation Modal */}
      {showCreateModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowCreateModal(false);
          }}
        >
          <div className="bg-[#0e0e0e] border border-[#262626] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 my-auto relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 flex">
              <div className="flex-1 bg-[#008037]" />
              <div className="flex-1 bg-white" />
              <div className="flex-1 bg-[#C8102E]" />
            </div>

            <div className="flex items-start justify-between border-b border-[#202020] pb-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#141414] border border-[#282828] text-[#FF6B00]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#008037] font-bold">
                    LABOR DEMAND MODEL
                  </span>
                  <h3 className="text-base font-bold text-white font-sans">
                    {isSo ? 'Daabac Fursad Shaqo oo Cusub' : 'Publish New Verified Enterprise Vacancy'}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white p-2 rounded-lg bg-[#181818] border border-[#282828] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateVacancySubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isSo ? 'Magaca Shaqada (Job Title)' : 'Position Title'} <span className="text-[#FF6B00]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isSo ? 'Qaybta (Sector)' : 'Industry Sector'} <span className="text-[#FF6B00]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newSector}
                    onChange={(e) => setNewSector(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isSo ? 'Shahaadada Loo Baahan Yahay' : 'Required Degree'} <span className="text-[#FF6B00]">*</span>
                  </label>
                  <select
                    value={newDegree}
                    onChange={(e) => setNewDegree(e.target.value as DegreeLevel)}
                    className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00] cursor-pointer"
                  >
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="higher_diploma">Higher Diploma</option>
                    <option value="diploma">Diploma</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isSo ? 'Xirfadaha Loo Baahan Yahay (Kala saar hakad)' : 'Required Professional Skills (Comma-separated)'} <span className="text-[#FF6B00]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isSo ? 'Sanooyinka Khibradda' : 'Min Experience (Years)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newExperience}
                    onChange={(e) => setNewExperience(parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white font-mono focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isSo ? 'Goobta' : 'Location'} <span className="text-[#FF6B00]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isSo ? 'Faahfaahinta Shaqada' : 'Description'}
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00] leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#202020]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-[#181818] hover:bg-[#222] text-slate-300 rounded-lg text-xs cursor-pointer"
                >
                  {isSo ? 'Jooji' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold rounded-lg text-xs shadow-md cursor-pointer"
                >
                  {isSo ? 'Daabac Hadda' : 'Publish to National Exchange'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Talent Card Smart ID Modal */}
      <TalentCardModal
        talent={selectedTalentForCard}
        isOpen={Boolean(selectedTalentForCard)}
        onClose={() => setSelectedTalentForCard(null)}
        language={language}
        onRequestContact={(t) => {
          setSelectedTalentForCard(null);
          setSelectedTalentForContact(t);
        }}
      />

      {/* Candidate Contact Clearance Modal */}
      <CandidateContactModal
        talent={selectedTalentForContact}
        isOpen={Boolean(selectedTalentForContact)}
        onClose={() => setSelectedTalentForContact(null)}
        language={language}
        onSendContactRequest={onSendContactRequest}
      />
    </div>
  );
};
