import React, { useState } from 'react';
import { DigitalCredential, Language } from '../types';
import { SomalilandEmblem } from './SomalilandEmblem';
import { CredentialInspectionModal } from './CredentialInspectionModal';
import { 
  Search, 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  AlertOctagon, 
  Download, 
  ExternalLink, 
  Lock, 
  Award, 
  FileCheck, 
  Maximize2,
  Printer,
  Sparkles
} from 'lucide-react';

interface ModuleCredentialVerificationProps {
  credentials: DigitalCredential[];
  initialCredentialId?: string;
  language: Language;
}

export const ModuleCredentialVerification: React.FC<ModuleCredentialVerificationProps> = ({
  credentials,
  initialCredentialId,
  language
}) => {
  const isSo = language === 'so';
  const [searchCode, setSearchCode] = useState<string>(initialCredentialId || 'SL-CERT-2024-UOH-44910');
  const [activeCredential, setActiveCredential] = useState<DigitalCredential | null>(
    credentials.find(c => c.credentialId === (initialCredentialId || 'SL-CERT-2024-UOH-44910')) || credentials[0]
  );
  const [hasSearched, setHasSearched] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [showHologramModal, setShowHologramModal] = useState<boolean>(false);

  const handleVerify = (idToVerify: string) => {
    const trimmed = idToVerify.trim();
    const found = credentials.find(c => 
      c.credentialId.toLowerCase() === trimmed.toLowerCase() ||
      c.qrCodeToken.toLowerCase().includes(trimmed.toLowerCase())
    );

    if (found) {
      setActiveCredential(found);
      setNotFound(false);
    } else {
      setActiveCredential(null);
      setNotFound(true);
    }
    setHasSearched(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1f1f1f]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#008037] font-bold mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008037] animate-pulse" />
            {isSo ? 'QAYBTA 04: SHAHAADOOYINKA & HUBINTA QR' : 'MODULE 04: DIGITAL ACADEMIC CREDENTIALS'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            {isSo ? 'Nidaamka Hubinta Shahaadooyinka Dijitaalka ah' : 'Digital Credential Verification & QR Authenticator'}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            {isSo
              ? 'Xaqiiji sax ahaanshaha shahaadooyinka jaamacadaha Somaliland adiga oo isticmaalaya lambarka shahaadada ama sawirka QR-ka. Nidaamku wuxuu xaqiijinayaa in shahaadadu ka timid jaamacad aqoonsan.'
              : 'Official sovereign verification engine validating degree certificates, diplomas, and academic credentials issued by authorized Somaliland universities with tamper-evident cryptographic signatures.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-[#111111] px-3 py-1.5 rounded-lg border border-[#222222]">
          <ShieldCheck className="w-4 h-4 text-[#008037]" />
          <span>SHA-256 Ledger Authenticated</span>
        </div>
      </div>

      {/* Verification Search Bar & Sample Presets */}
      <div className="bg-[#111111] p-5 sm:p-6 rounded-2xl border border-[#222222] shadow-xl space-y-4">
        <label className="block text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
          {isSo ? 'Geli Lambarka Shahaadada (Credential ID ama Token):' : 'Enter SNHCP Credential ID or QR Token:'}
        </label>
        
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <QrCode className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF6B00]" />
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="e.g. SL-CERT-2024-UOH-44910"
              className="w-full pl-10 pr-4 py-3 text-xs font-mono font-medium bg-[#161616] border border-[#2b2b2b] rounded-xl focus:outline-none focus:border-[#FF6B00] text-white placeholder-slate-500 shadow-inner"
            />
          </div>

          <button
            onClick={() => handleVerify(searchCode)}
            className="px-6 py-3 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black rounded-xl text-xs font-extrabold shadow-md transition-all whitespace-nowrap shrink-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>{isSo ? 'Xaqiiji Sax ahaanshaha' : 'Verify Authenticity'}</span>
          </button>
        </div>

        {/* Quick Click Sample Presets */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-medium text-slate-400 font-mono text-[11px]">{isSo ? 'Tusaalooyin la hubin karo:' : 'Quick Test Credentials:'}</span>
          {credentials.map(c => (
            <button
              key={c.credentialId}
              onClick={() => {
                setSearchCode(c.credentialId);
                handleVerify(c.credentialId);
              }}
              className="px-3 py-1 rounded-lg bg-[#161616] hover:bg-[#202020] text-slate-300 hover:text-white border border-[#262626] hover:border-[#FF6B00] font-mono text-[11px] transition-colors cursor-pointer"
            >
              {c.universityAcronym} ({c.credentialId.split('-')[1]})
            </button>
          ))}
          <button
            onClick={() => {
              setSearchCode('SL-CERT-INVALID-99999');
              handleVerify('SL-CERT-INVALID-99999');
            }}
            className="px-3 py-1 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-900/60 font-mono text-[11px] transition-colors cursor-pointer"
          >
            Invalid ID Test
          </button>
        </div>
      </div>

      {/* Result Display: Not Found State */}
      {notFound && (
        <div className="p-8 bg-red-950/40 border border-red-900/60 rounded-2xl text-center space-y-3">
          <AlertOctagon className="w-12 h-12 text-red-400 mx-auto" />
          <h3 className="text-base font-bold text-red-200 font-sans">
            {isSo ? 'Shahaadadan lagama helin Diiwaanka Qaranka' : 'Credential Not Found in Official Registry'}
          </h3>
          <p className="text-xs text-red-300 max-w-md mx-auto leading-relaxed">
            {isSo
              ? 'Shahaadada lambarkeedu yahay ma jirto ama ma soo marin nidaamka xaqiijinta rasmiga ah ee jaamacadaha aqoonsan ee Somaliland.'
              : 'The requested credential identifier has no record of issuance or verification by an accredited institution in the Somaliland National Human Capital Platform.'}
          </p>
        </div>
      )}

      {/* Result Display: Official Verifiable Sovereign Credential Card */}
      {activeCredential && !notFound && (
        <div className="bg-[#111111] border-2 border-[#1c3624] rounded-2xl overflow-hidden shadow-2xl space-y-0">
          
          {/* Top Verification Status Banner */}
          <div className="bg-gradient-to-r from-[#008037] via-[#09662f] to-[#04401c] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
              <div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-100">
                  {isSo ? 'SHAHAADO RASMI AH OO LA XAQIIJIYAY' : 'OFFICIAL VERIFIED ACADEMIC CREDENTIAL'}
                </div>
                <div className="text-sm font-bold font-sans">
                  {isSo ? 'Xaqiijinta Diiwaanka Qaranka ee Somaliland' : 'Authenticated via Somaliland National Higher Education Registry'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowHologramModal(true)}
                className="px-3.5 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white border border-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>{isSo ? 'Eeg Shahaadada Hologramka' : 'Inspect Holographic Certificate'}</span>
              </button>

              <span className="font-mono text-xs text-emerald-200 hidden sm:inline-block">
                Token: {activeCredential.credentialId}
              </span>
            </div>
          </div>

          {/* Certificate Inner Presentation Body */}
          <div className="p-6 sm:p-10 bg-gradient-to-b from-[#0c140f] via-[#0e0e0e] to-[#080808] relative">
            
            {/* Watermark Crest Emblem in background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <SomalilandEmblem size={480} />
            </div>

            {/* Sovereign Ministry Header */}
            <div className="text-center space-y-1 relative z-10 border-b border-[#1f2f24] pb-6">
              <div className="flex justify-center mb-2">
                <SomalilandEmblem size={52} />
              </div>
              <div className="text-xs font-mono font-bold text-[#008037] uppercase tracking-widest">
                {isSo ? 'Jamhuuriyadda Somaliland' : 'Republic of Somaliland'}
              </div>
              <div className="text-sm font-semibold text-slate-200">
                {isSo ? 'Wasaaradda Tacliinta Sare & Sayniska' : 'Ministry of Higher Education, Science & Technology'}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                National Credential Verification System (SNHCP)
              </div>
            </div>

            {/* Credential Content */}
            <div className="my-8 text-center space-y-4 relative z-10">
              <div className="text-xs uppercase tracking-widest text-[#FF6B00] font-semibold font-mono">
                {isSo ? 'Waxaa Halkan Lagu Xaqiijinayaa In' : 'This is to certify that'}
              </div>

              <div className="text-2xl sm:text-4xl font-bold text-white font-display">
                {isSo ? activeCredential.studentNameSo : activeCredential.studentName}
              </div>

              <div className="text-xs text-slate-400 font-mono">
                Talent ID: <span className="font-semibold text-[#FF6B00]">{activeCredential.talentId}</span>
              </div>

              <div className="text-xs uppercase tracking-wider text-slate-400 pt-2">
                {isSo ? 'Wuxuu/Waxay si guul leh u dhammaystay/dhammaysatay' : 'Has successfully fulfilled all statutory requirements for the award of'}
              </div>

              <div className="text-xl sm:text-2xl font-bold text-[#008037] font-display">
                {activeCredential.programmeName}
              </div>

              <div className="text-sm font-semibold text-slate-200">
                {activeCredential.universityName} ({activeCredential.universityAcronym})
              </div>

              <div className="text-xs text-slate-400 font-mono tabular-nums">
                {isSo ? 'Taariikhda Qalinjabinta:' : 'Conferred on:'} <span className="text-white font-medium">{activeCredential.graduationDate}</span> · Classification: <span className="text-white font-medium">{activeCredential.honorsGrade}</span>
              </div>
            </div>

            {/* Dual Institutional Signatures & Verification Seal */}
            <div className="pt-6 border-t border-[#1f2f24] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs relative z-10">
              <div className="space-y-1">
                <div className="font-semibold text-white">{activeCredential.issuingDean}</div>
                <div className="text-[11px] text-slate-400">{isSo ? 'Hormuudka Kulliyadda' : 'Dean of Faculty'}</div>
                <div className="font-mono text-[10px] text-emerald-400">Institutional Signature Verified</div>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#121c16] border border-[#21432c]">
                <ShieldCheck className="w-6 h-6 text-[#008037] mb-1" />
                <span className="font-bold text-[11px] text-white">MOHESR National Seal</span>
                <span className="font-mono text-[10px] text-slate-400">{activeCredential.nationalRegistrySeal}</span>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-white">{activeCredential.registrarOfficer}</div>
                <div className="text-[11px] text-slate-400">{isSo ? 'Diiwaan-hayaha Guud' : 'Chief Academic Registrar'}</div>
                <div className="font-mono text-[10px] text-emerald-400">Senate Seal Verified</div>
              </div>
            </div>

            {/* Cryptographic SHA-256 Ledger Line */}
            <div className="mt-8 pt-4 border-t border-[#1f2f24] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 relative z-10 font-mono">
              <div className="truncate max-w-md">
                SHA-256: <span className="text-emerald-400">{activeCredential.cryptographicSignature}</span>
              </div>
              <div className="text-emerald-400 font-semibold flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Tamper-evident record</span>
              </div>
            </div>

          </div>

          {/* Privacy Protection Notice for Public Verification */}
          <div className="px-6 py-4 bg-[#0d0d0d] border-t border-[#1f1f1f] text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#FF6B00]" />
              <span>
                {isSo
                  ? 'Ilaalinta Sirta (Section 6.4): Qoraalka buuxa ee darajooyinka (Transcript) iyo xogta gaarka ah lama shaaciyo ilaa ardaydu ogolaato.'
                  : 'Privacy Mandate (Section 6.4): Detailed course transcripts and candidate contact details are withheld from public lookup.'}
              </span>
            </div>
            <button
              onClick={() => setShowHologramModal(true)}
              className="text-[#FF6B00] font-bold hover:underline flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{isSo ? 'Fur Shahaadada Buuxda' : 'Open Full Sovereign Certificate'}</span>
            </button>
          </div>

        </div>
      )}

      {/* Hologram Credential Inspection Modal */}
      <CredentialInspectionModal
        credential={activeCredential}
        isOpen={showHologramModal}
        onClose={() => setShowHologramModal(false)}
        language={language}
      />
    </div>
  );
};
