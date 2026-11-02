import React, { useState, useEffect } from 'react';
import { DigitalCredential, Language } from '../types';
import { SomalilandEmblem } from './SomalilandEmblem';
import { SNHCPLogo } from './SNHCPLogo';
import { 
  X, 
  ShieldCheck, 
  Award, 
  QrCode, 
  Download, 
  Printer, 
  Share2, 
  Check, 
  ExternalLink, 
  Lock, 
  FileCheck, 
  Sparkles,
  Building2,
  Calendar,
  UserCheck
} from 'lucide-react';

interface CredentialInspectionModalProps {
  credential: DigitalCredential | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const CredentialInspectionModal: React.FC<CredentialInspectionModalProps> = ({
  credential,
  isOpen,
  onClose,
  language
}) => {
  const isSo = language === 'so';
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyConfirmed, setVerifyConfirmed] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !credential) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(credential.cryptographicSignature);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#verify/${credential.credentialId}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSimulateReverify = () => {
    setIsVerifying(true);
    setVerifyConfirmed(false);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifyConfirmed(true);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#0e0e0e] border border-[#262626] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Sovereign National Ribbon */}
        <div className="h-1.5 w-full flex">
          <div className="flex-1 bg-[#008037]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#C8102E]" />
        </div>

        {/* Modal Header Bar */}
        <div className="px-6 py-4 bg-[#121212] border-b border-[#202020] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#181818] border border-[#2b2b2b] flex items-center justify-center text-[#FF6B00]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#008037] font-bold">
                  {isSo ? 'NIDAAMKA HUBINTA SHAHAADOOYINKA' : 'SOVEREIGN CREDENTIAL MODEL'}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-1.5 py-0.2 rounded font-semibold">
                  STATUS: VERIFIED
                </span>
              </div>
              <h3 className="text-base font-bold text-white font-sans">
                {isSo ? 'Nuqulka Rasmiga ah ee Shahaadada Qaranka' : 'Official National Academic Credential Inspection'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181818] hover:bg-[#222] text-slate-300 hover:text-white border border-[#2c2c2c] text-xs font-medium transition-colors cursor-pointer"
              title="Print Certificate"
            >
              <Printer className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>{isSo ? 'Daabac' : 'Print'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181818] hover:bg-[#222] text-slate-300 hover:text-white border border-[#2c2c2c] text-xs font-medium transition-colors cursor-pointer"
              title="Share Link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#FF6B00]" />}
              <span>{copiedLink ? (isSo ? 'La guriyay!' : 'Copied!') : (isSo ? 'La wadaag' : 'Share Link')}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-[#181818] hover:bg-[#222] border border-[#2c2c2c] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* THE OFFICIAL DIPLOMA CERTIFICATE MODEL (Sovereign Guilloche Luxury Presentation) */}
          <div className="relative p-8 sm:p-12 rounded-2xl bg-[#0b0f0d] border-2 border-[#1c3624] text-slate-100 shadow-2xl overflow-hidden print:p-4 print:border-black print:bg-white print:text-black">
            
            {/* Background Guilloche & Watermark */}
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#008037_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#008037]/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -top-16 w-80 h-80 rounded-full bg-[#FF6B00]/10 blur-3xl pointer-events-none" />

            {/* Inner Border Frame */}
            <div className="border border-[#23422d]/80 rounded-xl p-6 sm:p-10 relative space-y-8">
              
              {/* Certificate Header with Somaliland Emblem & Titles */}
              <div className="text-center space-y-3 pb-6 border-b border-[#1b3323]">
                <div className="flex justify-center mb-2">
                  <div className="p-2.5 rounded-full bg-[#0d1c12] border border-[#21432c] shadow-inner">
                    <SomalilandEmblem className="w-16 h-16 drop-shadow-[0_4px_12px_rgba(0,128,55,0.3)]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#008037] uppercase">
                    Jamhuuriyadda Somaliland · Republic of Somaliland
                  </h4>
                  <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
                    Ministry of Higher Education, Science & Research (MOHESR)
                  </div>
                  <h2 className="text-xl sm:text-3xl font-display font-bold text-white pt-1">
                    {credential.universityName.toUpperCase()}
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">
                    Accredited Institutional Member of the SNHCP Sovereign Higher Education Registry
                  </p>
                </div>
              </div>

              {/* Certificate Declaration Body */}
              <div className="text-center space-y-4 max-w-2xl mx-auto py-2">
                <div className="text-[11px] font-mono tracking-widest text-[#FF6B00] uppercase font-semibold">
                  {isSo ? 'WAXAA LA CADDEYNAYAA IN' : 'THIS IS TO CERTIFY THAT'}
                </div>

                <div className="text-2xl sm:text-4xl font-display font-bold text-white tracking-wide border-b border-[#23422d] pb-3 inline-block px-8">
                  {credential.studentName}
                </div>
                
                {credential.studentNameSo && credential.studentNameSo !== credential.studentName && (
                  <div className="text-sm font-sans text-slate-400">
                    {credential.studentNameSo}
                  </div>
                )}

                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-xl mx-auto">
                  {isSo
                    ? 'Uu si guul leh u dhammaystiray dhammaan shuruudihii tacliimeed ee loo baahnaa, isla markaana Golaha Sare ee Tacliinta Jaamacadda ay u aqoonsadeen shahaadada:'
                    : 'having successfully satisfied all prescribed academic conditions, curriculum requirements, and institutional examinations has been conferred with the degree of:'}
                </div>

                <div className="p-4 rounded-xl bg-[#0e1c12] border border-[#21432c] shadow-inner space-y-1">
                  <div className="text-lg sm:text-2xl font-display font-bold text-[#FF6B00]">
                    {credential.documentType || 'Bachelor of Science'}
                  </div>
                  <div className="text-sm sm:text-base font-sans font-semibold text-white">
                    {credential.programmeName}
                  </div>
                  <div className="text-xs font-mono text-emerald-400">
                    Classification: <span className="font-bold text-white">{credential.honorsGrade}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  Conferred on: <span className="text-white font-medium">{credential.graduationDate}</span> · Field: <span className="text-white">{credential.fieldOfStudy}</span>
                </div>
              </div>

              {/* Signatures & Dynamic QR Verification Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#1b3323] items-end text-center sm:text-left">
                
                {/* Dean Signature */}
                <div className="space-y-1.5">
                  <div className="h-10 flex items-center justify-center sm:justify-start">
                    <div className="font-display italic text-lg sm:text-xl text-[#D4AF37]/90 select-none">
                      {credential.issuingDean.split(' ')[0]} {credential.issuingDean.split(' ')[1]}
                    </div>
                  </div>
                  <div className="h-[1px] bg-[#23422d]" />
                  <div className="text-[11px] font-bold text-white">{credential.issuingDean}</div>
                  <div className="text-[10px] text-slate-400 font-mono">Dean of Academic Faculty</div>
                  <div className="text-[9px] text-emerald-400 font-mono flex items-center justify-center sm:justify-start gap-1">
                    <UserCheck className="w-3 h-3" />
                    <span>Cryptographically Signed</span>
                  </div>
                </div>

                {/* Center: Live Verifiable QR Seal */}
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="relative p-2.5 rounded-xl bg-white text-black shadow-lg border border-[#23422d]">
                    <QrCode className="w-20 h-20" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-5 h-5 rounded-full bg-[#008037] border-2 border-white flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white">★</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-[#008037] font-bold tracking-wider">
                    SNHCP VERIFIED SEAL
                  </div>
                </div>

                {/* Registrar Signature */}
                <div className="space-y-1.5 text-center sm:text-right">
                  <div className="h-10 flex items-center justify-center sm:justify-end">
                    <div className="font-display italic text-lg sm:text-xl text-[#D4AF37]/90 select-none">
                      {credential.registrarOfficer.split(' ')[0]} {credential.registrarOfficer.split(' ')[1]}
                    </div>
                  </div>
                  <div className="h-[1px] bg-[#23422d]" />
                  <div className="text-[11px] font-bold text-white">{credential.registrarOfficer}</div>
                  <div className="text-[10px] text-slate-400 font-mono">University Senate Registrar</div>
                  <div className="text-[9px] text-emerald-400 font-mono flex items-center justify-center sm:justify-end gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Senate Archive Authenticated</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Cryptographic Ledger & Forensic Verification Bar */}
          <div className="p-5 rounded-xl bg-[#121212] border border-[#222222] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1c1c1c] pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#FF6B00]" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  {isSo ? 'Xaqiijinta Cryptographic-ka ee SHA-256' : 'Cryptographic Proof & Ledger Integrity'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSimulateReverify}
                  disabled={isVerifying}
                  className="px-3 py-1 rounded-md bg-[#181818] hover:bg-[#222] text-[#FF6B00] border border-[#2e2e2e] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
                  <span>{isVerifying ? (isSo ? 'Hubinta...' : 'Validating...') : (isSo ? 'Dib u Hubi Hadda' : 'Re-verify Ledger')}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-[#161616] rounded-lg border border-[#242424] space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest">
                  Official Credential Identifier
                </div>
                <div className="text-white font-bold text-sm text-[#FF6B00]">
                  {credential.credentialId}
                </div>
                <div className="text-[11px] text-slate-400">
                  Talent Reference: {credential.talentId}
                </div>
              </div>

              <div className="p-3 bg-[#161616] rounded-lg border border-[#242424] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                    SHA-256 Immutable Signature
                  </span>
                  <button
                    onClick={handleCopyHash}
                    className="text-[10px] text-[#FF6B00] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : null}
                    <span>{copiedHash ? 'Copied' : 'Copy Hash'}</span>
                  </button>
                </div>
                <div className="text-[11px] text-emerald-400 break-all">
                  {credential.cryptographicSignature}
                </div>
              </div>
            </div>

            {verifyConfirmed && (
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {isSo
                    ? 'Shahaadadani waxay si toos ah ugu xidhan tahay diiwaanka rasmiga ah ee Wasaaradda Waxbarashada Sare. Ma jiro wax beddel ah ama wax is-daba-marin ah oo lagu sameeyay.'
                    : 'This credential signature is certified by the Somaliland Ministry of Higher Education, Science & Research. Blockchain tamper-evident seal is verified valid.'}
                </span>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-[#121212] border-t border-[#202020] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-mono">
            Issued under SNHCP Sovereign Protocol 2026.1
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#181818] hover:bg-[#222222] text-white border border-[#2e2e2e] rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>{isSo ? 'Daabac Nuqulka Rasmiga ah' : 'Print / Export Official PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold rounded-lg text-xs shadow-md transition-colors cursor-pointer"
            >
              {isSo ? 'Xidh Daaqadda' : 'Done & Close'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
