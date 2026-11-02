import React, { useState } from 'react';
import { NotificationLog, AuditLogItem, Language } from '../types';
import { AuditInspectionModal } from './AuditInspectionModal';
import { 
  Shield, 
  Lock, 
  Bell, 
  MessageSquare, 
  Mail, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Send,
  Eye,
  Hash,
  Sparkles
} from 'lucide-react';

interface ModuleSecurityNotificationsAuditProps {
  notifications: NotificationLog[];
  auditLogs: AuditLogItem[];
  onTriggerTestNotification: (channel: 'sms' | 'whatsapp' | 'email', recipient: string, text: string) => void;
  language: Language;
}

export const ModuleSecurityNotificationsAudit: React.FC<ModuleSecurityNotificationsAuditProps> = ({
  notifications,
  auditLogs,
  onTriggerTestNotification,
  language
}) => {
  const isSo = language === 'so';
  const [activeTab, setActiveTab] = useState<'audit' | 'notifications' | 'governance'>('audit');
  const [selectedAuditForModal, setSelectedAuditForModal] = useState<AuditLogItem | null>(null);
  
  // Test notification dispatch state
  const [testChannel, setTestChannel] = useState<'sms' | 'whatsapp' | 'email'>('sms');
  const [testRecipient, setTestRecipient] = useState<string>('+252 63 4489412');
  const [testMessage, setTestMessage] = useState<string>(
    'SNHCP Security: Your account was accessed from a verified institutional session in Hargeisa. If this was not you, contact security.'
  );
  const [testSent, setTestSent] = useState<boolean>(false);

  const handleSendTest = (e: React.FormEvent) => {
    e.preventDefault();
    onTriggerTestNotification(testChannel, testRecipient, testMessage);
    setTestSent(true);
    setTimeout(() => setTestSent(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1f1f1f]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#008037] font-bold mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008037] animate-pulse" />
            {isSo ? 'QAYBTA 08: AMNIGA & FARRIIMAHA' : 'SECTIONS 7 & 8: SECURITY, PRIVACY & NOTIFICATIONS'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            {isSo ? 'Amniga Xogta, Xusuus-Qorka Baadhista & Farriimaha' : 'Security Architecture, Audit Trail & Gateway Logs'}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            {isSo
              ? 'Xusuus-qorka amni ee aan la tirtiri karin (Tamper-evident Audit Trail), daba-galka farriimaha SMS/WhatsApp, iyo ilaalinta shuruucda xogta gaarka ah ee muwaadinka.'
              : 'Tamper-evident audit logging of all institutional data queries, multi-channel notification infrastructure (SMS, WhatsApp, Email), and personal data governance controls.'}
          </p>
        </div>

        {/* Segmented Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#121212] rounded-xl border border-[#222222]">
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-[#1e1e1e] text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isSo ? 'Xusuus-Qorka Amniga (Audit)' : 'Security Audit Trail'}
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-[#1e1e1e] text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isSo ? 'Farriimaha SMS & WhatsApp' : 'Notification Gateway'}
          </button>
          <button
            onClick={() => setActiveTab('governance')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'governance'
                ? 'bg-[#1e1e1e] text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isSo ? 'Shuruucda Xogta & Xuduudaha' : 'Governance & Boundaries'}
          </button>
        </div>
      </div>

      {/* Tab 1: Tamper-Evident Access Audit Log */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="p-4 bg-[#111111] rounded-xl border border-[#222222] flex items-start gap-3 text-xs shadow-md">
            <Lock className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
            <div className="text-slate-300 leading-relaxed">
              <span className="font-semibold text-white">
                {isSo ? 'Xusuus-Qor Joogto ah oo Aan Waxba Laga Beddeli Karin (Section 8.1): ' : 'Tamper-Evident Audit Mandate (Section 8.1): '}
              </span>
              {isSo
                ? 'Qof kasta oo gala ama wax ka eega xogta shahaadooyinka ama musharrixiinta waxa lagu qoraa saxeexan SHA-256. Ma jiro maamule kaligii wax masixi kara.'
                : 'Every institutional read, credential query, and candidate data release is permanently recorded with cryptographic SHA-256 integrity hashes to prevent unauthorized surveillance or modification.'}
            </div>
          </div>

          <div className="bg-[#111111] border border-[#222222] rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#161616] text-slate-400 border-b border-[#222222] font-mono text-[10px] uppercase">
                  <tr>
                    <th className="px-5 py-3">Timestamp (UTC)</th>
                    <th className="px-5 py-3">Actor & Role</th>
                    <th className="px-5 py-3">Institution</th>
                    <th className="px-5 py-3">Action</th>
                    <th className="px-5 py-3">Cryptographic Seal</th>
                    <th className="px-5 py-3 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1c1c1c]">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#161616]/60 transition-colors">
                      <td className="px-5 py-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                        {log.timestamp}
                      </td>
                      <td className="px-5 py-3">
                        <div className="font-bold text-white">{log.actor}</div>
                        <div className="text-[10px] font-mono text-[#FF6B00]">{log.actorRole}</div>
                      </td>
                      <td className="px-5 py-3 text-slate-300">
                        {log.institution}
                      </td>
                      <td className="px-5 py-3 font-mono text-emerald-400 font-semibold text-[11px]">
                        {log.action}
                      </td>
                      <td className="px-5 py-3 font-mono text-[10px] text-slate-400 truncate max-w-[140px]">
                        {log.tamperSealHash}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => setSelectedAuditForModal(log)}
                          className="px-2.5 py-1 bg-[#181818] hover:bg-[#222] text-[#FF6B00] border border-[#2b2b2b] rounded-md text-[11px] font-mono transition-colors cursor-pointer"
                        >
                          Verify Block
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Notifications Gateway */}
      {activeTab === 'notifications' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-[#111111] p-6 rounded-xl border border-[#222222] space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2 border-b border-[#1f1f1f] pb-3">
              <Send className="w-4 h-4 text-[#FF6B00]" />
              <span>Simulate Secure Gateway Dispatch</span>
            </h3>

            <form onSubmit={handleSendTest} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Delivery Channel
                </label>
                <select
                  value={testChannel}
                  onChange={(e) => setTestChannel(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00] cursor-pointer"
                >
                  <option value="sms">Telesom Zaad / SMS Gateway</option>
                  <option value="whatsapp">Somtel / WhatsApp Business API</option>
                  <option value="email">National Government SMTP Relay</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Recipient Number or Address
                </label>
                <input
                  type="text"
                  required
                  value={testRecipient}
                  onChange={(e) => setTestRecipient(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white font-mono focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Notification Payload
                </label>
                <textarea
                  rows={3}
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00] leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold rounded-lg text-xs shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{testSent ? 'Dispatched Successfully!' : 'Send Test Notification'}</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-[#111111] p-6 rounded-xl border border-[#222222] shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2 border-b border-[#1f1f1f] pb-3">
              <Bell className="w-4 h-4 text-[#008037]" />
              <span>Gateway Delivery Logs</span>
            </h3>

            <div className="space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="p-3.5 bg-[#161616] border border-[#242424] rounded-lg flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{n.subject}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#202020] text-slate-300 uppercase">
                        {n.channel}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">{n.message}</p>
                    <div className="text-[10px] font-mono text-slate-500">
                      To: {n.recipientMasked} · {n.timestamp}
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold shrink-0">
                    DELIVERED
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Governance & Legal Boundaries */}
      {activeTab === 'governance' && (
        <div className="bg-[#111111] p-6 rounded-xl border border-[#222222] shadow-xl space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2 border-b border-[#1f1f1f] pb-3">
            <Shield className="w-4 h-4 text-[#008037]" />
            <span>Somaliland Sovereign Data Governance Mandate</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
            <div className="p-4 bg-[#141414] rounded-xl border border-[#222222] space-y-1.5">
              <div className="font-bold text-white text-sm">1. Sovereign Ownership</div>
              <p className="text-slate-400 leading-relaxed">
                All citizen educational and competency records belong exclusively to the sovereign citizen and the Republic of Somaliland. No foreign entity or third-party ad network possesses access to candidate telemetry.
              </p>
            </div>

            <div className="p-4 bg-[#141414] rounded-xl border border-[#222222] space-y-1.5">
              <div className="font-bold text-white text-sm">2. Masked-by-Default Privacy</div>
              <p className="text-slate-400 leading-relaxed">
                Direct phone numbers and email coordinates remain masked until an authorized employer submits a formal contact clearance inquiry and the citizen grants explicit digital approval.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Audit Block Forensic Inspection Modal */}
      <AuditInspectionModal
        auditItem={selectedAuditForModal}
        isOpen={Boolean(selectedAuditForModal)}
        onClose={() => setSelectedAuditForModal(null)}
        language={language}
      />
    </div>
  );
};
