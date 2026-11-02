import React, { useState } from 'react';
import { University, Programme, StudentGraduateRecord, Language, DegreeLevel } from '../types';
import { SomalilandEmblem } from './SomalilandEmblem';
import { 
  Search, 
  Filter, 
  Building, 
  GraduationCap, 
  Award, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  X, 
  ShieldCheck, 
  ExternalLink,
  BookOpen,
  Users,
  Building2
} from 'lucide-react';

interface ModuleEducationRegistryProps {
  universities: University[];
  programmes: Programme[];
  studentRecords: StudentGraduateRecord[];
  language: Language;
  onOpenCredential: (credentialId: string) => void;
}

export const ModuleEducationRegistry: React.FC<ModuleEducationRegistryProps> = ({
  universities,
  programmes,
  studentRecords,
  language,
  onOpenCredential
}) => {
  const isSo = language === 'so';
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'institutions' | 'programmes' | 'cohorts'>('institutions');
  const [selectedUniversityId, setSelectedUniversityId] = useState<string | null>(null);

  const regions = ['Maroodi Jeex', 'Awdal', 'Togdheer', 'Sahil', 'Sanaag', 'Sool'];

  const filteredUniversities = universities.filter(u => {
    const matchesRegion = selectedRegion === 'all' || u.region === selectedRegion;
    const matchesSearch = searchQuery === '' || 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.nameSo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.acronym.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const filteredProgrammes = programmes.filter(p => {
    const matchesLevel = selectedLevel === 'all' || p.degreeLevel === selectedLevel;
    const matchesSearch = searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fieldOfStudy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const filteredCohorts = studentRecords.filter(r => {
    const matchesLevel = selectedLevel === 'all' || r.degreeLevel === selectedLevel;
    const matchesSearch = searchQuery === '' ||
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.talentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.programme.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const selectedUni = universities.find(u => u.id === selectedUniversityId);

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1f1f1f]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#008037] font-bold mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008037] animate-pulse" />
            {isSo ? 'QAYBTA 01: DIIWAANKA QARANKA' : 'MODULE 01: NATIONAL REGISTRY'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            {isSo ? 'Diiwaanka Waxbarashada Sare ee Somaliland' : 'National Higher Education Registry'}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            {isSo
              ? 'Xogta rasmiga ah ee jaamacadaha aqoonsan, kulliyadaha, takhasusyada shahaadooyinka, iyo diiwaanka ardayda iyo qalinjabiyayaasha Jamhuuriyadda Somaliland.'
              : 'Official sovereign repository of accredited higher education institutions, faculties, academic degree curricula, and verified graduate cohorts.'}
          </p>
        </div>

        {/* Segmented View Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#121212] rounded-xl border border-[#222222] self-start md:self-auto">
          <button
            onClick={() => setActiveTab('institutions')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'institutions'
                ? 'bg-[#1e1e1e] text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isSo ? `Jaamacadaha (${universities.length})` : `Universities (${universities.length})`}
          </button>
          <button
            onClick={() => setActiveTab('programmes')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'programmes'
                ? 'bg-[#1e1e1e] text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isSo ? 'Barnaamijyada Shahaadada' : 'Degree Programmes'}
          </button>
          <button
            onClick={() => setActiveTab('cohorts')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'cohorts'
                ? 'bg-[#1e1e1e] text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isSo ? 'Dufcadaha Qalinjabiyay' : 'Verified Graduate Cohorts'}
          </button>
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
            placeholder={isSo ? 'Raadi magaca jaamacadda, takhasuska, ama lambarka...' : 'Search university, degree programme, or record ID...'}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#161616] border border-[#282828] rounded-lg focus:outline-none focus:border-[#FF6B00] text-white placeholder-slate-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'institutions' && (
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 text-xs bg-[#161616] border border-[#282828] rounded-lg text-slate-200 focus:outline-none focus:border-[#FF6B00] cursor-pointer"
            >
              <option value="all">{isSo ? 'Dhammaan Gobollada (All Regions)' : 'All 6 Regions'}</option>
              {regions.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          )}

          {(activeTab === 'programmes' || activeTab === 'cohorts') && (
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 text-xs bg-[#161616] border border-[#282828] rounded-lg text-slate-200 focus:outline-none focus:border-[#FF6B00] cursor-pointer"
            >
              <option value="all">{isSo ? 'Dhammaan Shahaadooyinka' : 'All Qualification Levels'}</option>
              <option value="bachelors">Bachelor's Degree</option>
              <option value="masters">Master's Degree</option>
              <option value="phd">PhD</option>
              <option value="higher_diploma">Higher Diploma</option>
              <option value="diploma">Diploma</option>
            </select>
          )}
        </div>
      </div>

      {/* Tab 1: Universities Grid */}
      {activeTab === 'institutions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUniversities.map((uni) => (
            <div
              key={uni.id}
              onClick={() => setSelectedUniversityId(uni.id)}
              className={`cursor-pointer p-6 rounded-xl border transition-all bg-[#111111] space-y-4 hover:border-[#333333] shadow-md group ${
                selectedUniversityId === uni.id 
                  ? 'border-[#FF6B00] ring-1 ring-[#FF6B00]' 
                  : 'border-[#222222]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="font-mono text-xs font-bold text-[#FF6B00]">
                    {uni.acronym}
                  </span>
                  <h3 className="text-base font-bold text-white font-sans mt-0.5 group-hover:text-[#FF6B00] transition-colors">
                    {isSo ? uni.nameSo : uni.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#008037]" />
                    <span>{uni.city}, {uni.region}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">Est. {uni.establishedYear}</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                  {uni.status === 'accredited' ? (isSo ? 'AQOONSAN' : 'ACCREDITED') : 'PROVISIONAL'}
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="pt-3 border-t border-[#1f1f1f] grid grid-cols-3 gap-2 text-center font-mono">
                <div className="p-2 bg-[#161616] rounded-lg border border-[#242424]">
                  <div className="text-sm font-bold text-white tabular-nums">
                    {uni.totalStudents.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400">{isSo ? 'Arday' : 'Students'}</div>
                </div>
                <div className="p-2 bg-[#161616] rounded-lg border border-[#242424]">
                  <div className="text-sm font-bold text-[#008037] tabular-nums">
                    {uni.verifiedGraduates.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400">{isSo ? 'Qalinjabiyay' : 'Graduates'}</div>
                </div>
                <div className="p-2 bg-[#161616] rounded-lg border border-[#242424]">
                  <div className="text-sm font-bold text-white tabular-nums">
                    {uni.programmesCount}
                  </div>
                  <div className="text-[10px] text-slate-400">{isSo ? 'Koorsooyin' : 'Programs'}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1f1f1f] flex items-center justify-between text-xs text-slate-400">
                <span className="truncate max-w-[190px]">{uni.authorizedOfficer}</span>
                <span className="text-[#FF6B00] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{isSo ? 'Faahfaahin' : 'Inspect'}</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Programmes Table */}
      {activeTab === 'programmes' && (
        <div className="bg-[#111111] border border-[#222222] rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#161616] text-slate-400 border-b border-[#222222] uppercase tracking-wider font-mono text-[10px]">
                <tr>
                  <th className="px-5 py-3.5">{isSo ? 'Barnaamijka & Takhasuska' : 'Programme Title'}</th>
                  <th className="px-5 py-3.5">{isSo ? 'Jaamacadda' : 'Institution'}</th>
                  <th className="px-5 py-3.5">{isSo ? 'Heerka' : 'Degree Level'}</th>
                  <th className="px-5 py-3.5">{isSo ? 'Qaybta' : 'Field of Study'}</th>
                  <th className="px-5 py-3.5 text-right">{isSo ? 'Muddada' : 'Duration'}</th>
                  <th className="px-5 py-3.5 text-right">{isSo ? 'Xaaladda' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c1c1c]">
                {filteredProgrammes.map((p) => (
                  <tr key={p.id} className="hover:bg-[#161616]/70 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-white">
                      {isSo ? p.nameSo : p.name}
                    </td>
                    <td className="px-5 py-3.5 text-slate-300">
                      {p.universityName}
                    </td>
                    <td className="px-5 py-3.5 text-[#FF6B00] uppercase font-mono text-[11px]">
                      {p.degreeLevel.replace('_', ' ')}
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">
                      {p.fieldOfStudy}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono tabular-nums text-slate-300">
                      {p.durationYears} {isSo ? 'Sano' : 'Years'}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold font-mono text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isSo ? 'Aqoonsan' : 'Accredited'}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Verified Graduate Cohorts */}
      {activeTab === 'cohorts' && (
        <div className="bg-[#111111] border border-[#222222] rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#161616] text-slate-400 border-b border-[#222222] uppercase tracking-wider font-mono text-[10px]">
                <tr>
                  <th className="px-5 py-3.5">{isSo ? 'Talent ID & Magaca' : 'Talent ID & Graduate Name'}</th>
                  <th className="px-5 py-3.5">{isSo ? 'Jaamacadda & Kulliyadda' : 'University & Faculty'}</th>
                  <th className="px-5 py-3.5">{isSo ? 'Shahaadada' : 'Degree & Major'}</th>
                  <th className="px-5 py-3.5">{isSo ? 'Sannadka' : 'Grad Year'}</th>
                  <th className="px-5 py-3.5 text-right">{isSo ? 'Darajada / GPA' : 'GPA / Honours'}</th>
                  <th className="px-5 py-3.5 text-right">{isSo ? 'Shahaadada QR' : 'Credential Token'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c1c1c]">
                {filteredCohorts.map((r) => (
                  <tr key={r.id} className="hover:bg-[#161616]/70 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-white">
                        {isSo && r.fullNameSo ? r.fullNameSo : r.fullName}
                      </div>
                      <div className="font-mono text-[11px] text-[#FF6B00] mt-0.5">
                        {r.talentId}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="text-white font-medium">{r.universityName}</div>
                      <div className="text-[11px] text-slate-400">{r.faculty}</div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-300">
                      <div>{r.programme}</div>
                      <div className="text-[11px] text-[#008037] uppercase font-mono">{r.degreeLevel}</div>
                    </td>
                    <td className="px-5 py-3.5 font-mono tabular-nums text-slate-300">
                      {r.graduationYear}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="font-mono font-bold text-white">{r.gpa.toFixed(2)}</div>
                      <div className="text-[10px] text-slate-400">{r.honors || 'Standard'}</div>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => onOpenCredential(r.credentialId)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold bg-[#181818] hover:bg-[#222222] text-[#FF6B00] rounded-lg border border-[#2e2e2e] transition-colors cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>{r.credentialId.split('-').slice(0, 3).join('-')}...</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* University Institutional Detail Modal */}
      {selectedUni && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedUniversityId(null);
          }}
        >
          <div className="bg-[#0e0e0e] border border-[#262626] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-auto overflow-hidden relative">
            
            {/* National Top Line */}
            <div className="absolute top-0 inset-x-0 h-1.5 flex">
              <div className="flex-1 bg-[#008037]" />
              <div className="flex-1 bg-white" />
              <div className="flex-1 bg-[#C8102E]" />
            </div>

            <div className="flex items-start justify-between border-b border-[#202020] pb-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#141414] border border-[#282828] text-[#FF6B00]">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-[#008037]">
                    {selectedUni.acronym} · {selectedUni.region}
                  </span>
                  <h3 className="text-xl font-bold text-white font-sans mt-0.5">
                    {isSo ? selectedUni.nameSo : selectedUni.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {selectedUni.city}, Somaliland · Established {selectedUni.establishedYear} · {selectedUni.contactEmail}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUniversityId(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg bg-[#181818] border border-[#282828] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center font-mono">
              <div className="p-3 bg-[#141414] rounded-xl border border-[#242424]">
                <div className="text-xl font-bold text-white">
                  {selectedUni.totalStudents.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-1">{isSo ? 'Ardayda Dhigata' : 'Active Students'}</div>
              </div>
              <div className="p-3 bg-[#141414] rounded-xl border border-[#242424]">
                <div className="text-xl font-bold text-[#008037]">
                  {selectedUni.verifiedGraduates.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-1">{isSo ? 'Qalinjabiyayaal' : 'Verified Alumni'}</div>
              </div>
              <div className="p-3 bg-[#141414] rounded-xl border border-[#242424]">
                <div className="text-xl font-bold text-[#FF6B00]">
                  {selectedUni.facultiesCount}
                </div>
                <div className="text-xs text-slate-400 mt-1">{isSo ? 'Kulliyadood' : 'Faculties'}</div>
              </div>
            </div>

            <div className="p-4 bg-[#141414] rounded-xl border border-[#242424] space-y-2 text-xs">
              <div className="font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#008037]" />
                <span>Authorized Institutional Signatory</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {selectedUni.authorizedOfficer} · Fully accredited under the Somaliland Ministry of Higher Education, Science & Research (MOHESR).
              </p>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#202020]">
              <button
                onClick={() => setSelectedUniversityId(null)}
                className="px-5 py-2 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold text-xs rounded-lg shadow-md cursor-pointer"
              >
                {isSo ? 'Xidh Daaqadda' : 'Done & Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
