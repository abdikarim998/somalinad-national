import React, { useEffect, useState } from 'react';
import { CitizenTalentProfile, Language } from '../types';
import { SomalilandEmblem } from './SomalilandEmblem';
import { SNHCPLogo } from './SNHCPLogo';
import { 
  X, 
  ShieldCheck, 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  MapPin, 
  Mail, 
  Phone, 
  Lock, 
  QrCode, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Printer,
  Sparkles,
  Cpu
} from 'lucide-react';

interface TalentCardModalProps {
  talent: CitizenTalentProfile | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onOpenCredentialInspect?: (talentId: string) => void;
  onRequestContact?: (talent: CitizenTalentProfile) => void;
}

export const TalentCardModal: React.FC<TalentCardModalProps> = ({
  talent,
  isOpen,
  onClose,
  language,
  onOpenCredentialInspect,
  onRequestContact
}) => {
  const isSo = language === 'so';
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !talent) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(talent.talentId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#0e0e0e] border border-[#262626] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* National Ribbon */}
        <div className="h-1.5 w-full flex">
          <div className="flex-1 bg-[#008037]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#C8102E]" />
        </div>

        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#121212] border-b border-[#202020] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#181818] border border-[#2b2b2b] flex items-center justify-center text-[#FF6B00]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#008037] font-bold">
                  {isSo ? 'KAADHKA HIWADDA QARANKA' : 'NATIONAL TALENT IDENTIFIER MODEL'}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-1.5 py-0.2 rounded font-semibold">
                  IDENTITY CERTIFIED
                </span>
              </div>
              <h3 className="text-base font-bold text-white font-sans">
                {isSo ? 'Dossier-ka Rasmiga ah ee Muwaadinka' : 'Verified Citizen Talent Profile Dossier'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-[#181818] hover:bg-[#222] border border-[#2c2c2c] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* DIGITAL SOVEREIGN TALENT SMART CARD (Physical 3D-styled model) */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#121c15] via-[#0d140f] to-[#080d09] border-2 border-[#1c3624] p-6 sm:p-8 shadow-2xl text-white overflow-hidden">
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#008037]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Top Card Row: Chip & National Emblem */}
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-3">
                {/* Simulated EMV Chip */}
                <div className="w-12 h-9 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-1 border border-amber-500/40 shadow-inner flex flex-col justify-between">
                  <div className="w-full h-1 border-b border-amber-700/60" />
                  <div className="w-full h-1 border-b border-amber-700/60" />
                  <div className="w-full h-1 border-b border-amber-700/60" />
                </div>
                <div className="text-[10px] font-mono text-[#D4AF37] font-semibold tracking-wider flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>SNHCP BIOMETRIC SECURE</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <SomalilandEmblem className="w-10 h-10 drop-shadow" />
              </div>
            </div>

            {/* Talent ID Number */}
            <div className="mt-6 flex items-center justify-between">
              <div className="font-mono text-lg sm:text-xl font-bold tracking-widest text-[#FF6B00]">
                {talent.talentId}
              </div>
              <button
                onClick={handleCopyId}
                className="text-[10px] font-mono text-slate-400 hover:text-white px-2 py-0.5 rounded bg-[#18261c] border border-[#294231] cursor-pointer"
              >
                {copiedId ? (isSo ? 'La guriyay' : 'Copied!') : (isSo ? 'Guri ID' : 'Copy ID')}
              </button>
            </div>

            {/* Candidate Identity Details */}
            <div className="mt-4 pt-4 border-t border-[#1b3323] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide">
                  {talent.fullName}
                </div>
                <div className="text-xs text-slate-300 font-sans flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>{talent.currentTitle}</span>
                </div>
                <div className="text-xs text-slate-400 font-sans flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{talent.universityName} ({talent.highestDegree.toUpperCase()})</span>
                </div>
              </div>

              {/* Scannable Micro QR */}
              <div className="bg-white p-2 rounded-lg shrink-0 shadow-md">
                <QrCode className="w-16 h-16 text-black" />
                <div className="text-[7px] text-center font-mono font-bold text-black mt-0.5">
                  OFFICIAL QR
                </div>
              </div>
            </div>

            {/* Card Footer Indicators */}
            <div className="mt-4 pt-3 border-t border-[#1b3323] flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-[#FF6B00]" />
                <span>{talent.city}, {talent.countryOfResidence}</span>
                {talent.isDiaspora && (
                  <span className="px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-300 border border-amber-800 text-[9px] font-bold">
                    DIASPORA
                  </span>
                )}
              </div>
              <div className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Gov Somaliland Verified</span>
              </div>
            </div>

          </div>

          {/* Core Competencies & Skills Badges */}
          <div className="p-5 rounded-xl bg-[#121212] border border-[#222222] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>{isSo ? 'Xirfadaha & Aqoonta La Xaqiijiyay' : 'Verified Competencies & Skills'}</span>
              </h4>
              <span className="text-[10px] text-slate-400 font-mono">
                {talent.skills.length} Certified
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {talent.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-[#181818] border border-[#292929] text-xs font-medium text-slate-200 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008037]" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>

            <div className="pt-2 text-xs text-slate-400 leading-relaxed">
              {talent.educationSummary}
            </div>
          </div>

          {/* Privacy & Recruiter Consent Notice */}
          <div className="p-4 rounded-xl bg-[#141414] border border-[#242424] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Somaliland Data Protection Mandate</span>
              </span>
              <span className="text-[10px] font-mono text-[#D4AF37]">
                Consent Required
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-1">
              <div className="p-2.5 bg-[#181818] rounded-md border border-[#282828] flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>Email: <span className="text-white">{talent.emailMasked}</span></span>
              </div>
              <div className="p-2.5 bg-[#181818] rounded-md border border-[#282828] flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>Phone: <span className="text-white">{talent.phoneMasked}</span></span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              {isSo
                ? 'Xogta tooska ah ee xidhiidhka muwaadinka waxaa la kashifayaa oo keliya marka uu si toos ah u aqbalo codsiga xidhiidhka ee loo-shaqeeyaha.'
                : 'Direct personal contact data is strictly masked by default. Full contact coordinates are only unlocked after the candidate explicitly approves the employer\'s clearance inquiry.'}
            </p>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="px-6 py-4 bg-[#121212] border-t border-[#202020] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              if (onOpenCredentialInspect) {
                onOpenCredentialInspect(talent.talentId);
              }
            }}
            className="px-4 py-2 bg-[#181818] hover:bg-[#222] text-slate-200 hover:text-white border border-[#2c2c2c] rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>{isSo ? 'Eeg Shahaadooyinka (QR)' : 'View Verified Degrees'}</span>
          </button>

          <div className="flex items-center gap-3">
            {onRequestContact && (
              <button
                onClick={() => {
                  onRequestContact(talent);
                  onClose();
                }}
                className="px-4 py-2 bg-[#008037] hover:bg-[#009b43] text-white font-bold rounded-lg text-xs shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSo ? 'Codso Xidhiidh Rasmi ah' : 'Request Contact Clearance'}</span>
              </button>
            )}

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
