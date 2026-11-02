import React, { useState, useEffect } from 'react';
import { CitizenTalentProfile, Language } from '../types';
import { 
  X, 
  Send, 
  ShieldCheck, 
  Lock, 
  User, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface CandidateContactModalProps {
  talent: CitizenTalentProfile | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSendContactRequest: (talentId: string, vacancyTitle: string, message: string) => void;
}

export const CandidateContactModal: React.FC<CandidateContactModalProps> = ({
  talent,
  isOpen,
  onClose,
  language,
  onSendContactRequest
}) => {
  const isSo = language === 'so';
  const [vacancyTitle, setVacancyTitle] = useState('Software Engineering Specialist');
  const [message, setMessage] = useState(
    'We reviewed your verified higher education degree and technical competencies on SNHCP and would like to formally request direct contact details to discuss career placement.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !talent) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSendContactRequest(talent.talentId, vacancyTitle, message);
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        onClose();
      }, 1600);
    }, 600);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-lg bg-[#0e0e0e] border border-[#262626] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden my-auto"
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
              <Send className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#008037] font-bold">
                  {isSo ? 'Ilaalinta Xogta Gaarka ah' : 'CANDIDATE PRIVACY CLEARANCE'}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-[10px] font-mono text-[#D4AF37] font-bold">
                  CONSENT MANDATE
                </span>
              </div>
              <h3 className="text-base font-bold text-white font-sans">
                {isSo ? 'Codso Xidhiidhka Musharraxa' : 'Submit Candidate Contact Request'}
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

        {/* Form Body */}
        {submittedSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              {isSo ? 'Codsiga Si Guul Leh Ayaa Loo Diray!' : 'Contact Request Dispatched Successfully!'}
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              {isSo
                ? 'Musharraxa waxaa loo diray ogeysiis SMS iyo degdeg ah. Marka uu ogolaado, xogtiisa tooska ah ee xidhiidhka ayaa laguugu soo bandhigi doonaa marinka shaqo-bixiyaha.'
                : 'A sovereign consent notification was delivered to the candidate. Upon approval, their unmasked contact coordinates will unlock in your Employer Portal.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 text-xs">
            {/* Candidate Target Banner */}
            <div className="p-3.5 rounded-xl bg-[#141414] border border-[#242424] flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="font-bold text-white text-sm">{talent.fullName}</div>
                <div className="text-slate-400 text-[11px]">{talent.currentTitle} · {talent.universityName}</div>
                <div className="font-mono text-[10px] text-[#FF6B00]">Talent ID: {talent.talentId}</div>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-semibold">
                  IDENTITY CERTIFIED
                </span>
              </div>
            </div>

            {/* Position Title */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isSo ? 'Magaca Booska Shaqada' : 'Position / Vacancy Designation'} <span className="text-[#FF6B00]">*</span>
              </label>
              <input
                type="text"
                required
                value={vacancyTitle}
                onChange={(e) => setVacancyTitle(e.target.value)}
                placeholder="e.g. Senior Network Engineer"
                className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            {/* Recruiter Message */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isSo ? 'Farriinta Rasmiga ah ee Loo-shaqeeyaha' : 'Official Inquiry & Introduction Message'} <span className="text-[#FF6B00]">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="State the employment opportunity and organizational mandate..."
                className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00] leading-relaxed"
              />
            </div>

            {/* Sovereign Consent Explainer */}
            <div className="p-3 rounded-lg bg-[#141414] border border-[#222222] text-[11px] text-slate-400 space-y-1.5 leading-relaxed">
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <Lock className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>{isSo ? 'Qodobka 14aad ee Sharciga Xogta Qaranka' : 'Article 14 Candidate Privacy Safeguard'}</span>
              </div>
              <p>
                {isSo
                  ? 'Iimaylka iyo lambarka taleefanka musharraxa lama bandhigi doono ilaa musharraxu uu ka eego fariintan kuna xaqiijiyo ogolaanshaha marinkiisa gaarka ah.'
                  : 'Personal contact details are strictly withheld until the candidate verifies your institutional inquiry and grants express consent inside their private Citizen Portal.'}
              </p>
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#202020]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#181818] hover:bg-[#222] text-slate-300 rounded-lg text-xs transition-colors cursor-pointer"
              >
                {isSo ? 'Jooji' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold rounded-lg text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? (isSo ? 'Diraya...' : 'Dispatching...') : (isSo ? 'Dir Codsiga Xidhiidhka' : 'Dispatch Clearance Inquiry')}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
