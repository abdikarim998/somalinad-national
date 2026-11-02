import React, { useEffect, useState } from 'react';
import { AuditLogItem, Language } from '../types';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Check, 
  Clock, 
  User, 
  Building2, 
  Server,
  Hash,
  Sparkles
} from 'lucide-react';

interface AuditInspectionModalProps {
  auditItem: AuditLogItem | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AuditInspectionModal: React.FC<AuditInspectionModalProps> = ({
  auditItem,
  isOpen,
  onClose,
  language
}) => {
  const isSo = language === 'so';
  const [copiedHash, setCopiedHash] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !auditItem) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(auditItem.tamperSealHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
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
            <div className="w-9 h-9 rounded-lg bg-[#181818] border border-[#2b2b2b] flex items-center justify-center text-[#008037]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#008037] font-bold">
                  {isSo ? 'DIIWAANKA AAN LA BEDDELI KARIN' : 'IMMUTABLE LEDGER BLOCK'}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.2 rounded font-semibold">
                  SEAL VALID
                </span>
              </div>
              <h3 className="text-base font-bold text-white font-sans">
                {isSo ? 'Hubinta Badbaadada Xogta Qaranka' : 'Cryptographic Audit Block Inspection'}
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

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-5 text-xs">
          
          {/* Action & Timestamp Banner */}
          <div className="p-4 rounded-xl bg-[#141414] border border-[#262626] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#FF6B00]">
                {auditItem.action}
              </span>
              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {auditItem.timestamp}
              </span>
            </div>
            <div className="text-slate-300 font-sans leading-relaxed">
              {auditItem.details}
            </div>
          </div>

          {/* Actor & Authority Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
            <div className="p-3 bg-[#161616] rounded-lg border border-[#242424] space-y-1">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <User className="w-3 h-3 text-[#FF6B00]" />
                <span>Executing Officer</span>
              </div>
              <div className="font-bold text-white text-[11px] truncate">{auditItem.actor}</div>
              <div className="text-[10px] text-[#008037]">Role: {auditItem.actorRole}</div>
            </div>

            <div className="p-3 bg-[#161616] rounded-lg border border-[#242424] space-y-1">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Building2 className="w-3 h-3 text-[#FF6B00]" />
                <span>Institution / Node</span>
              </div>
              <div className="font-bold text-white text-[11px] truncate">{auditItem.institution}</div>
              <div className="text-[10px] text-slate-400">Node: SNHCP-MOHESR-01</div>
            </div>
          </div>

          {/* Target Resource */}
          <div className="p-3 bg-[#161616] rounded-lg border border-[#242424] space-y-1 font-mono">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">
              Target Entity & Resource Ref
            </div>
            <div className="font-bold text-white text-xs">
              {auditItem.targetResource}
            </div>
          </div>

          {/* Cryptographic SHA-256 Ledger Stamp */}
          <div className="p-4 rounded-xl bg-[#0c140f] border border-[#1b3323] space-y-2 font-mono">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                <Hash className="w-3.5 h-3.5" />
                <span>Tamper-Evident SHA-256 Block Seal</span>
              </div>
              <button
                onClick={handleCopyHash}
                className="text-[10px] text-[#FF6B00] hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : null}
                <span>{copiedHash ? 'Copied' : 'Copy Hash'}</span>
              </button>
            </div>
            <div className="text-[11px] text-emerald-300 break-all bg-[#080d09] p-2.5 rounded border border-[#1c3624]">
              {auditItem.tamperSealHash}
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#008037]" />
              <span>Cryptographic merkle consensus confirmed across ministerial nodes.</span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#121212] border-t border-[#202020] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold rounded-lg text-xs shadow-md transition-colors cursor-pointer"
          >
            {isSo ? 'Xidh Daaqadda' : 'Done & Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
