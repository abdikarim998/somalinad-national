import React, { useState } from 'react';
import { University, StudentGraduateRecord, Language, DegreeLevel } from '../types';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  FileText, 
  ArrowRight, 
  Check, 
  Building2,
  Lock,
  Sparkles,
  UserCheck
} from 'lucide-react';

interface ModuleUniversityPortalProps {
  universities: University[];
  onAddCohortRecords: (newRecords: StudentGraduateRecord[]) => void;
  language: Language;
}

export const ModuleUniversityPortal: React.FC<ModuleUniversityPortalProps> = ({
  universities,
  onAddCohortRecords,
  language
}) => {
  const isSo = language === 'so';
  const [selectedUniversity, setSelectedUniversity] = useState<string>('uoh');
  const [facultyName, setFacultyName] = useState<string>('Faculty of Computing & Informatics');
  const [programmeName, setProgrammeName] = useState<string>('BSc in Software Engineering');
  const [degreeLevel, setDegreeLevel] = useState<DegreeLevel>('bachelors');
  const [graduationYear, setGraduationYear] = useState<number>(2025);
  
  // Separation of duties state
  const [deanSignatory, setDeanSignatory] = useState<string>('Dr. Abdirashid Saeed Dualeh (Dean of Computing)');
  const [registrarSignatory, setRegistrarSignatory] = useState<string>('Mohamoud Farah Ali (Chief Academic Registrar)');
  const [dualSignOffConfirmed, setDualSignOffConfirmed] = useState<boolean>(false);
  
  // Staged sample CSV records ready for submission
  const [isStaged, setIsStaged] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  const sampleStagedRows = [
    { name: 'Khadar Jama Warsame', nid: 'SL-NID-******881', gpa: 3.82, honors: 'First Class' },
    { name: 'Nasra Hussein Abdi', nid: 'SL-NID-******914', gpa: 3.75, honors: 'Second Class Upper' },
    { name: 'Yusuf Dahir Nur', nid: 'SL-NID-******402', gpa: 3.91, honors: 'First Class Honours' },
    { name: 'Hodan Mohamed Egal', nid: 'SL-NID-******219', gpa: 3.68, honors: 'Second Class Upper' },
  ];

  const handleStageSampleBatch = () => {
    setIsStaged(true);
    setSubmissionSuccess(false);
  };

  const handleCommitBatch = () => {
    if (!dualSignOffConfirmed) return;

    const uniObj = universities.find(u => u.id === selectedUniversity) || universities[0];

    const generatedRecords: StudentGraduateRecord[] = sampleStagedRows.map((row, idx) => {
      const randomTalentNumber = Math.floor(10000 + Math.random() * 90000);
      const talentId = `SL-TAL-2026-${randomTalentNumber}`;
      const credentialId = `SL-CERT-${graduationYear}-${uniObj.acronym.toUpperCase()}-${randomTalentNumber}`;

      return {
        id: `rec-batch-${Date.now()}-${idx}`,
        talentId,
        fullName: row.name,
        nationalIdMasked: row.nid,
        gender: idx % 2 === 0 ? 'Male' : 'Female',
        universityId: uniObj.id,
        universityName: uniObj.name,
        faculty: facultyName,
        programme: programmeName,
        degreeLevel,
        fieldOfStudy: 'Information Technology',
        enrollmentYear: graduationYear - 4,
        graduationYear,
        status: 'graduated',
        gpa: row.gpa,
        honors: row.honors,
        verificationStatus: 'verified',
        credentialId,
        issueDate: new Date().toISOString().split('T')[0],
        qrHash: `sha256-hash-${randomTalentNumber}-${Date.now().toString(16)}`
      };
    });

    onAddCohortRecords(generatedRecords);
    setSubmissionSuccess(true);
    setIsStaged(false);
    setDualSignOffConfirmed(false);
  };

  const uni = universities.find(u => u.id === selectedUniversity) || universities[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1f1f1f]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#008037] font-bold mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008037] animate-pulse" />
            {isSo ? 'QAYBTA 02: XAFIISKA JAAMACADAHA' : 'MODULE 02: UNIVERSITY PORTAL'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            {isSo ? 'Xafiiska Gelinta & Xaqiijinta Xogta Jaamacadda' : 'University Management & Ingestion Portal'}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            {isSo
              ? 'Xarunta rasmiga ah ee maamulka diiwaanka jaamacadda, soo gelinta dufcadaha qalinjabiyay (Bulk Ingestion), iyo sharciga kala-saaridda xilalka (Separation of Duties).'
              : 'Institutional portal for university registrars to ingest graduated cohorts, upload verified academic records, and execute dual-signatory verification workflows.'}
          </p>
        </div>

        {/* Selected University Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono font-medium">{isSo ? 'Jaamacadda:' : 'Active Institution:'}</span>
          <select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            className="px-3.5 py-2 text-xs font-semibold bg-[#141414] border border-[#282828] rounded-xl text-white focus:outline-none focus:border-[#FF6B00] cursor-pointer"
          >
            {universities.map(u => (
              <option key={u.id} value={u.id}>{u.name} ({u.acronym})</option>
            ))}
          </select>
        </div>
      </div>

      {/* University Identity & Security Governance Notice */}
      <div className="p-4 rounded-xl bg-[#111111] border border-[#1c3624] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs shadow-md">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#008037] shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white font-sans text-sm">
              {isSo ? `${uni.nameSo} (${uni.acronym}) - Xisaabta Rasmiga ah ee Diiwaanka` : `${uni.name} (${uni.acronym}) - Authorized Registrar Session`}
            </div>
            <p className="text-slate-400 mt-0.5 leading-relaxed">
              {isSo
                ? 'Dhammaan xogaha la soo geliyo waxaa lagu hubiyaa saxeex dijitaal ah. Qofka shaqaalaha ahi kaligii ma ansixin karo shahaadada isaga oo aan haysan ogolaanshaha Hormuudka & Diiwaan-hayaha Guud.'
                : 'All submitted records undergo mandatory schema validation and dual-signatory separation of duties before receiving cryptographic verification hashes.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-slate-400 font-mono text-[11px] bg-[#161616] px-3 py-1.5 rounded-lg border border-[#242424]">
          <span className="text-[#008037] font-bold">MOHESR Gateway</span>
          <span aria-hidden="true">·</span>
          <span>SL-MOH-VER-2026</span>
        </div>
      </div>

      {/* Success Notification Alert */}
      {submissionSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-800 text-white flex items-center justify-between gap-3 text-xs shadow-lg">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="leading-relaxed">
              {isSo
                ? `Dufcadda cusub ee 4-ta arday ee ${uni.acronym} si guul ah ayaa loogu daray Diiwaanka Qaranka, shahaadooyinkoodiina waa la shaabadeeyay!`
                : `Successfully registered and cryptographically verified new graduate cohort for ${uni.acronym}! QR credential tokens generated.`}
            </span>
          </div>
          <button
            onClick={() => setSubmissionSuccess(false)}
            className="text-white/80 hover:text-white font-bold p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2-Column Ingestion Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Cohort Configuration & Ingestion Details */}
        <div className="lg:col-span-1 bg-[#111111] p-6 rounded-xl border border-[#222222] space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white border-b border-[#1f1f1f] pb-3 flex items-center gap-2 font-sans">
            <FileSpreadsheet className="w-4 h-4 text-[#FF6B00]" />
            <span>{isSo ? '1. Qaybaha Dufcadda' : '1. Cohort Specification'}</span>
          </h3>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                {isSo ? 'Kulliyadda (Faculty)' : 'Academic Faculty'}
              </label>
              <input
                type="text"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                {isSo ? 'Barnaamijka (Degree Programme)' : 'Accredited Degree Programme'}
              </label>
              <input
                type="text"
                value={programmeName}
                onChange={(e) => setProgrammeName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  {isSo ? 'Heerka' : 'Degree Level'}
                </label>
                <select
                  value={degreeLevel}
                  onChange={(e) => setDegreeLevel(e.target.value as DegreeLevel)}
                  className="w-full px-3 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00] cursor-pointer"
                >
                  <option value="bachelors">Bachelor's</option>
                  <option value="masters">Master's</option>
                  <option value="phd">PhD</option>
                  <option value="higher_diploma">Higher Diploma</option>
                  <option value="diploma">Diploma</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  {isSo ? 'Sannadka Qalinjabinta' : 'Grad Year'}
                </label>
                <input
                  type="number"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(parseInt(e.target.value) || 2025)}
                  className="w-full px-3 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white font-mono tabular-nums focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleStageSampleBatch}
                className="w-full py-3 px-3 bg-[#161616] hover:bg-[#202020] text-[#FF6B00] border border-[#2c2c2c] hover:border-[#FF6B00] rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>{isSo ? 'Soo Geli Xog Wadareed (Load Sample CSV)' : 'Stage Standard CSV Batch (4 Records)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Validation Preview & Separation of Duties Sign-off */}
        <div className="lg:col-span-2 bg-[#111111] p-6 rounded-xl border border-[#222222] space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-sans">
              <FileText className="w-4 h-4 text-[#008037]" />
              <span>{isSo ? '2. Hubinta Shuruucda & Kala-Saaridda Masuuliyadda' : '2. Validation Preview & Dual Signatory Sign-off'}</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {isStaged ? `${sampleStagedRows.length} records staged` : 'No file staged'}
            </span>
          </div>

          {/* Staged Data Table */}
          {isStaged ? (
            <div className="space-y-4">
              <div className="border border-[#222222] rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#161616] text-slate-400 border-b border-[#222222] font-mono text-[10px] uppercase">
                    <tr>
                      <th className="px-4 py-2.5">Student Name</th>
                      <th className="px-4 py-2.5">Masked National ID</th>
                      <th className="px-4 py-2.5">Cumulative GPA</th>
                      <th className="px-4 py-2.5">Academic Honors</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c1c1c]">
                    {sampleStagedRows.map((r, i) => (
                      <tr key={i} className="hover:bg-[#161616]/50">
                        <td className="px-4 py-2.5 font-bold text-white">{r.name}</td>
                        <td className="px-4 py-2.5 font-mono text-slate-400">{r.nid}</td>
                        <td className="px-4 py-2.5 font-mono text-emerald-400 font-bold">{r.gpa}</td>
                        <td className="px-4 py-2.5 text-slate-300">{r.honors}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Separation of Duties Checklist */}
              <div className="p-4 bg-[#141414] border border-[#222222] rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase font-mono">
                  <UserCheck className="w-4 h-4 text-[#008037]" />
                  <span>Separation of Duties Verification (Mandatory Senate Sign-off)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-2.5 bg-[#181818] rounded-lg border border-[#282828] space-y-1">
                    <div className="text-[10px] text-slate-400">1. Faculty Dean Signatory</div>
                    <div className="text-white font-bold truncate">{deanSignatory}</div>
                    <div className="text-[10px] text-emerald-400">✓ Digital Signature Registered</div>
                  </div>

                  <div className="p-2.5 bg-[#181818] rounded-lg border border-[#282828] space-y-1">
                    <div className="text-[10px] text-slate-400">2. Chief Academic Registrar</div>
                    <div className="text-white font-bold truncate">{registrarSignatory}</div>
                    <div className="text-[10px] text-emerald-400">✓ Senate Minutes Verified</div>
                  </div>
                </div>

                <label className="flex items-start gap-2 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dualSignOffConfirmed}
                    onChange={(e) => setDualSignOffConfirmed(e.target.checked)}
                    className="mt-0.5 rounded bg-[#161616] border-[#333] text-[#008037] focus:ring-[#008037]"
                  />
                  <span className="text-xs text-slate-300 leading-normal select-none">
                    I solemnly attest that the Senate of {uni.name} has formally conferred these degrees and authorized the generation of immutable SHA-256 ledger blocks.
                  </span>
                </label>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  disabled={!dualSignOffConfirmed}
                  onClick={handleCommitBatch}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
                    dualSignOffConfirmed
                      ? 'bg-[#008037] hover:bg-[#009b43] text-white cursor-pointer'
                      : 'bg-[#181818] text-slate-500 border border-[#262626] cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Commit to National Ledger & Issue QR Credentials</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 space-y-3">
              <Upload className="w-10 h-10 mx-auto text-slate-600" />
              <div className="text-xs font-mono">
                Stage a student cohort batch using the form on the left to preview validation and execute dual-signatory verification.
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
