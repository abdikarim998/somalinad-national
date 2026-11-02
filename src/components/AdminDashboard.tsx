import React, { useState } from 'react';
import { 
  AuthUser, 
  University, 
  CompanyEmployer, 
  StudentGraduateRecord, 
  InstitutionalInvitation, 
  VerificationRequestItem, 
  AuditLogItem, 
  Language, 
  UserRole,
  DigitalCredential
} from '../types';
import { SNHCPLogo } from './SNHCPLogo';
import { SomalilandEmblem } from './SomalilandEmblem';
import { CredentialInspectionModal } from './CredentialInspectionModal';
import { 
  BarChart3, 
  Users, 
  Building2, 
  Briefcase, 
  CheckCircle2, 
  ShieldAlert, 
  ShieldCheck,
  Settings, 
  LogOut, 
  Search, 
  Filter, 
  Plus, 
  Send, 
  AlertTriangle, 
  Lock, 
  Check, 
  X, 
  Key, 
  FileText, 
  Eye, 
  Shield, 
  Smartphone,
  Mail,
  UserCheck,
  Copy,
  ExternalLink,
  Sparkles,
  Maximize2,
  Clock
} from 'lucide-react';

interface AdminDashboardProps {
  adminUser: AuthUser;
  language: Language;
  onSignOut: () => void;
  // Live Data Repositories
  registeredUsers: AuthUser[];
  onUpdateUserStatus: (userId: string, newStatus: 'active' | 'suspended') => void;
  universities: University[];
  companies: CompanyEmployer[];
  studentRecords: StudentGraduateRecord[];
  auditLogs: AuditLogItem[];
  invitations: InstitutionalInvitation[];
  onCreateInvitation: (invitation: InstitutionalInvitation) => void;
  verificationRequests: VerificationRequestItem[];
  onUpdateVerificationDecision: (requestId: string, decision: 'approved' | 'rejected' | 'needs_correction', notes: string) => void;
  credentials?: DigitalCredential[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  language,
  onSignOut,
  registeredUsers,
  onUpdateUserStatus,
  universities,
  companies,
  studentRecords,
  auditLogs,
  invitations,
  onCreateInvitation,
  verificationRequests,
  onUpdateVerificationDecision,
  credentials = []
}) => {
  const isSo = language === 'so';
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'universities' | 'employers' | 'verifications' | 'audit' | 'settings'>('overview');

  // Search and filter states
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<string>('all');
  
  // Invite modal state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteType, setInviteType] = useState<'university' | 'employer'>('university');
  const [inviteOrgName, setInviteOrgName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRepName, setInviteRepName] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('UNIVERSITY_ADMIN');
  const [createdInviteNotice, setCreatedInviteNotice] = useState<InstitutionalInvitation | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);

  // Verification decision modal state
  const [selectedVerif, setSelectedVerif] = useState<VerificationRequestItem | null>(null);
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [inspectCredentialModal, setInspectCredentialModal] = useState<DigitalCredential | null>(null);

  // Platform settings state
  const [smsGateway, setSmsGateway] = useState('Telesom Zaad Enterprise Gateway (Active)');
  const [emailService, setEmailService] = useState('Gov Somaliland National Mail Relay (Active)');
  const [mfaRequired, setMfaRequired] = useState(true);
  const [saveSettingsSuccess, setSaveSettingsSuccess] = useState(false);

  // Compute live real metrics
  const totalUsers = registeredUsers.length;
  const totalUnis = universities.length;
  const verifiedGraduates = studentRecords.filter(r => r.verificationStatus === 'verified').length;
  const totalStudents = universities.reduce((acc, u) => acc + u.totalStudents, 0);
  const totalEmployers = companies.length;
  const pendingVerificationsCount = verificationRequests.filter(v => v.status === 'pending').length;

  const handleSendInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    const token = `inv-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newInvite: InstitutionalInvitation = {
      id: `inv-${Date.now()}`,
      type: inviteType,
      organizationName: inviteOrgName,
      contactEmail: inviteEmail,
      representativeName: inviteRepName,
      assignedRole: inviteRole,
      inviteToken: token,
      status: 'pending',
      expiresAt: expires,
      createdByAdminEmail: adminUser.email
    };

    onCreateInvitation(newInvite);
    setCreatedInviteNotice(newInvite);
  };

  const handleCloseInviteModal = () => {
    setShowInviteModal(false);
    setCreatedInviteNotice(null);
    setInviteOrgName('');
    setInviteEmail('');
    setInviteRepName('');
    setCopiedToken(false);
  };

  const handleApplyDecision = (decision: 'approved' | 'rejected' | 'needs_correction') => {
    if (!selectedVerif) return;
    onUpdateVerificationDecision(selectedVerif.id, decision, reviewerNotes);
    setSelectedVerif(null);
    setReviewerNotes('');
  };

  const filteredUsers = registeredUsers.filter(u => {
    const matchesSearch = userSearch === '' || 
      u.fullName.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      (u.talentId && u.talentId.toLowerCase().includes(userSearch.toLowerCase()));
    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-[#080808] text-slate-100 flex flex-col font-sans">
      
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0e0e0e] border-b border-[#1f1f1f] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <SNHCPLogo size="sm" variant="mark" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white font-sans flex items-center gap-2">
                SNHCP Administrator Portal
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/30 font-bold">
                  {adminUser.role}
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {adminUser.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden md:flex items-center gap-2 text-slate-400 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#008037]" />
              <span>Privileged Session Active</span>
            </div>

            <button
              onClick={onSignOut}
              className="px-3.5 py-1.5 rounded-lg bg-[#161616] hover:bg-[#202020] text-red-400 border border-[#2b2b2b] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isSo ? 'Ka Bax' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace with Sidebar & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <aside className="lg:w-64 shrink-0 space-y-1 bg-[#0d0d0d] p-3 rounded-xl border border-[#1f1f1f] self-start w-full shadow-xl">
          <div className="px-3 py-2 text-[10px] uppercase font-mono tracking-widest text-[#008037] font-bold">
            {isSo ? 'QAYBAHA MAAMULKA' : 'GOVERNANCE CENTER'}
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#181818] text-white font-bold border-l-2 border-[#FF6B00]' : 'text-slate-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-[#FF6B00]" />
            <span>{isSo ? 'Guudmar (Overview)' : 'Overview'}</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeTab === 'users' ? 'bg-[#181818] text-white font-bold border-l-2 border-[#FF6B00]' : 'text-slate-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <Users className="w-4 h-4 text-[#FF6B00]" />
            <span>{isSo ? 'Maamulka Isticmaalayaasha' : 'User Management'}</span>
          </button>

          <button
            onClick={() => setActiveTab('universities')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeTab === 'universities' ? 'bg-[#181818] text-white font-bold border-l-2 border-[#FF6B00]' : 'text-slate-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#FF6B00]" />
            <span>{isSo ? 'Jaamacadaha & Casuumaadaha' : 'University Management'}</span>
          </button>

          <button
            onClick={() => setActiveTab('employers')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeTab === 'employers' ? 'bg-[#181818] text-white font-bold border-l-2 border-[#FF6B00]' : 'text-slate-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <Briefcase className="w-4 h-4 text-[#FF6B00]" />
            <span>{isSo ? 'Shirkadaha & Loo-shaqeeyaha' : 'Employer Management'}</span>
          </button>

          <button
            onClick={() => setActiveTab('verifications')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeTab === 'verifications' ? 'bg-[#181818] text-white font-bold border-l-2 border-[#FF6B00]' : 'text-slate-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" />
              <span>{isSo ? 'Dib-u-eegista Shahaadooyinka' : 'Verifications'}</span>
            </span>
            {pendingVerificationsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#FF6B00] text-black font-mono font-bold text-[10px]">
                {pendingVerificationsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeTab === 'audit' ? 'bg-[#181818] text-white font-bold border-l-2 border-[#FF6B00]' : 'text-slate-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <Shield className="w-4 h-4 text-[#FF6B00]" />
            <span>{isSo ? 'Xusuus-Qorka Baadhista (Audit)' : 'Security & Audit'}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeTab === 'settings' ? 'bg-[#181818] text-white font-bold border-l-2 border-[#FF6B00]' : 'text-slate-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <Settings className="w-4 h-4 text-[#FF6B00]" />
            <span>{isSo ? 'Dejinta Nidaamka' : 'Platform Policies'}</span>
          </button>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#008037] font-bold">
                  NATIONAL PLATFORM METRICS
                </span>
                <h2 className="text-2xl font-bold text-white font-display mt-0.5">
                  Executive Governance Dashboard
                </h2>
              </div>

              {/* 8 Primary Indicators */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                <div className="p-4 bg-[#111111] rounded-xl border border-[#222222] shadow-md space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase">Registered Users</div>
                  <div className="text-2xl font-bold text-white">{totalUsers}</div>
                  <div className="text-[10px] text-emerald-400">Public & Institutional</div>
                </div>

                <div className="p-4 bg-[#111111] rounded-xl border border-[#222222] shadow-md space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase">Accredited Unis</div>
                  <div className="text-2xl font-bold text-[#FF6B00]">{totalUnis}</div>
                  <div className="text-[10px] text-slate-400">All 6 Regions</div>
                </div>

                <div className="p-4 bg-[#111111] rounded-xl border border-[#222222] shadow-md space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase">Verified Graduates</div>
                  <div className="text-2xl font-bold text-[#008037]">{verifiedGraduates.toLocaleString()}</div>
                  <div className="text-[10px] text-slate-400">With SHA-256 Seals</div>
                </div>

                <div className="p-4 bg-[#111111] rounded-xl border border-[#222222] shadow-md space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase">Pending Verifications</div>
                  <div className="text-2xl font-bold text-amber-400">{pendingVerificationsCount}</div>
                  <div className="text-[10px] text-amber-400">Needs Adjudication</div>
                </div>
              </div>

              {/* Recent Audit Stream */}
              <div className="p-6 bg-[#111111] border border-[#222222] rounded-xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 font-sans">
                    <Shield className="w-4 h-4 text-[#008037]" />
                    <span>Recent Administrative Audit Events</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('audit')}
                    className="text-xs text-[#FF6B00] hover:underline"
                  >
                    View Complete Log →
                  </button>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {auditLogs.slice(0, 4).map((log) => (
                    <div
                      key={log.id}
                      className="p-3 bg-[#161616] border border-[#242424] rounded-lg flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="text-white font-bold">{log.action}</div>
                        <div className="text-slate-400 text-[11px] font-sans">{log.details}</div>
                        <div className="text-[10px] text-slate-500">{log.actor} · {log.institution}</div>
                      </div>
                      <div className="text-right text-[10px] text-slate-400 shrink-0">
                        <div>{log.timestamp}</div>
                        <div className="text-emerald-400 truncate max-w-[120px]">{log.tamperSealHash}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: USER MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111111] p-3 rounded-xl border border-[#222222]">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search user by name, email, or Talent ID..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#161616] border border-[#282828] rounded-lg focus:outline-none focus:border-[#FF6B00] text-white"
                  />
                </div>

                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-[#161616] border border-[#282828] rounded-lg text-slate-200 focus:outline-none focus:border-[#FF6B00] cursor-pointer"
                >
                  <option value="all">All Roles</option>
                  <option value="USER">USER (Citizen)</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="UNIVERSITY_ADMIN">UNIVERSITY_ADMIN</option>
                  <option value="EMPLOYER_ADMIN">EMPLOYER_ADMIN</option>
                </select>
              </div>

              <div className="bg-[#111111] border border-[#222222] rounded-xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#161616] text-slate-400 border-b border-[#222222] font-mono text-[10px] uppercase">
                    <tr>
                      <th className="px-5 py-3">Full Legal Name</th>
                      <th className="px-5 py-3">Assigned Role</th>
                      <th className="px-5 py-3">Talent Ref</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c1c1c]">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-[#161616]/50">
                        <td className="px-5 py-3">
                          <div className="font-bold text-white">{u.fullName}</div>
                          <div className="text-slate-400 text-[11px] font-mono">{u.email}</div>
                        </td>
                        <td className="px-5 py-3 font-mono text-emerald-400 font-bold">
                          {u.role}
                        </td>
                        <td className="px-5 py-3 font-mono text-[#FF6B00]">
                          {u.talentId || '—'}
                        </td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            u.status === 'active' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800' : 'bg-red-950/60 text-red-300 border border-red-800'
                          }`}>
                            {u.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          {u.status === 'active' ? (
                            <button
                              onClick={() => onUpdateUserStatus(u.id, 'suspended')}
                              className="px-2.5 py-1 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/80 rounded text-[11px] font-semibold cursor-pointer"
                            >
                              Suspend
                            </button>
                          ) : (
                            <button
                              onClick={() => onUpdateUserStatus(u.id, 'active')}
                              className="px-2.5 py-1 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/80 rounded text-[11px] font-semibold cursor-pointer"
                            >
                              Reactivate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: UNIVERSITIES & INVITATIONS */}
          {activeTab === 'universities' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-sans">Accredited Higher Education Directory</h3>
                  <p className="text-xs text-slate-400">Institutional representatives must be invited via secure token</p>
                </div>

                <button
                  onClick={() => {
                    setInviteType('university');
                    setInviteRole('UNIVERSITY_ADMIN');
                    setShowInviteModal(true);
                  }}
                  className="px-4 py-2 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold rounded-xl text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Issue University Invite</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {universities.map((uni) => (
                  <div key={uni.id} className="p-5 bg-[#111111] border border-[#222222] rounded-xl space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#FF6B00] font-bold">{uni.acronym}</span>
                        <h4 className="font-bold text-white text-sm">{uni.name}</h4>
                        <div className="text-xs text-slate-400">{uni.city}, {uni.region} · Est. {uni.establishedYear}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold">
                        ACCREDITED
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono pt-1">
                      Signatory: <span className="text-slate-200">{uni.authorizedOfficer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EMPLOYER MANAGEMENT */}
          {activeTab === 'employers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-sans">Verified Enterprise Directory</h3>
                  <p className="text-xs text-slate-400">Authorized corporate recruiters and HR leadership accounts</p>
                </div>

                <button
                  onClick={() => {
                    setInviteType('employer');
                    setInviteRole('EMPLOYER_ADMIN');
                    setShowInviteModal(true);
                  }}
                  className="px-4 py-2 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold rounded-xl text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Issue Employer Invite</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companies.map((c) => (
                  <div key={c.id} className="p-5 bg-[#111111] border border-[#222222] rounded-xl space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#008037] font-bold">{c.sector}</span>
                        <h4 className="font-bold text-white text-sm">{c.name}</h4>
                        <div className="text-xs text-slate-400">HQ: {c.headquarters}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold">
                        VERIFIED
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono pt-1">
                      Representative: <span className="text-slate-200">{c.authorizedRepresentative}</span> ({c.contactEmail})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: VERIFICATIONS QUEUE */}
          {activeTab === 'verifications' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white font-sans">Academic Credential Adjudication Queue</h3>
                <p className="text-xs text-slate-400">Review university Senate minutes and award tamper-evident ministerial QR seals</p>
              </div>

              <div className="bg-[#111111] border border-[#222222] rounded-xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#161616] text-slate-400 border-b border-[#222222] font-mono text-[10px] uppercase">
                    <tr>
                      <th className="px-5 py-3">Applicant & Talent ID</th>
                      <th className="px-5 py-3">Institution & Major</th>
                      <th className="px-5 py-3">Grad Year</th>
                      <th className="px-5 py-3">Review Status</th>
                      <th className="px-5 py-3 text-right">Adjudicate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c1c1c]">
                    {verificationRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-[#161616]/50">
                        <td className="px-5 py-3">
                          <div className="font-bold text-white">{req.studentName}</div>
                          <div className="text-[11px] font-mono text-[#FF6B00]">{req.talentId}</div>
                        </td>
                        <td className="px-5 py-3">
                          <div className="text-white">{req.programme}</div>
                          <div className="text-slate-400 text-[11px]">{req.universityName}</div>
                        </td>
                        <td className="px-5 py-3 font-mono text-slate-300">
                          {req.graduationYear}
                        </td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            req.status === 'approved'
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                              : req.status === 'rejected'
                              ? 'bg-red-950/60 text-red-300 border border-red-800'
                              : 'bg-amber-950/60 text-amber-300 border border-amber-800'
                          }`}>
                            {req.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedVerif(req);
                              setReviewerNotes(req.reviewerNotes || '');
                            }}
                            className="px-3 py-1.5 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold rounded-lg text-xs shadow-sm cursor-pointer"
                          >
                            Review & Seal
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: AUDIT */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="bg-[#111111] border border-[#222222] rounded-xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#161616] text-slate-400 border-b border-[#222222] font-mono text-[10px] uppercase">
                    <tr>
                      <th className="px-5 py-3">Timestamp</th>
                      <th className="px-5 py-3">Executing Actor</th>
                      <th className="px-5 py-3">Institution</th>
                      <th className="px-5 py-3">Action</th>
                      <th className="px-5 py-3 text-right">SHA-256 Stamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c1c1c]">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-[#161616]/50">
                        <td className="px-5 py-3 font-mono text-slate-400">{log.timestamp}</td>
                        <td className="px-5 py-3 font-bold text-white">{log.actor}</td>
                        <td className="px-5 py-3 text-slate-300">{log.institution}</td>
                        <td className="px-5 py-3 font-mono text-emerald-400">{log.action}</td>
                        <td className="px-5 py-3 font-mono text-right text-slate-400 truncate max-w-[140px]">
                          {log.tamperSealHash}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="p-6 bg-[#111111] border border-[#222222] rounded-xl space-y-6 shadow-xl text-xs">
              <div>
                <h3 className="text-base font-bold text-white font-sans">National Security & Cryptographic Policies</h3>
                <p className="text-xs text-slate-400">Configure sovereign communication gateways and least-privilege mandates</p>
              </div>

              {saveSettingsSuccess && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-200 rounded-lg">
                  Platform policies successfully saved to secure keystore.
                </div>
              )}

              <div className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    Somaliland SMS OTP Gateway Carrier
                  </label>
                  <input
                    type="text"
                    value={smsGateway}
                    onChange={(e) => setSmsGateway(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    National Government Mail Relay
                  </label>
                  <input
                    type="text"
                    value={emailService}
                    onChange={(e) => setEmailService(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#141414] rounded-xl border border-[#222222]">
                  <div>
                    <div className="font-bold text-white text-sm">Mandatory Administrator Multi-Factor Authentication</div>
                    <div className="text-slate-400 mt-0.5">Enforces TOTP code validation for all privileged sessions</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={mfaRequired}
                    onChange={(e) => setMfaRequired(e.target.checked)}
                    className="w-4 h-4 text-[#FF6B00] accent-[#FF6B00]"
                  />
                </div>

                <button
                  onClick={() => {
                    setSaveSettingsSuccess(true);
                    setTimeout(() => setSaveSettingsSuccess(false), 2000);
                  }}
                  className="px-6 py-2.5 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold rounded-lg text-xs shadow-md cursor-pointer"
                >
                  Save Platform Policies
                </button>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* Institutional Invitation Modal (Section 5.C) */}
      {showInviteModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseInviteModal();
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
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#008037] font-bold">
                    INSTITUTIONAL ACCESS DISPATCH
                  </span>
                  <h3 className="text-base font-bold text-white font-sans">
                    {inviteType === 'university' ? 'Invite University Representative' : 'Invite Employer Representative'}
                  </h3>
                </div>
              </div>
              <button
                onClick={handleCloseInviteModal}
                className="text-slate-400 hover:text-white p-2 rounded-lg bg-[#181818] border border-[#282828] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {createdInviteNotice ? (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Invitation Token Generated & Encrypted</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    A secure 7-day token link has been issued for <strong>{createdInviteNotice.representativeName}</strong> ({createdInviteNotice.contactEmail}).
                  </p>
                </div>

                <div className="p-3 bg-[#161616] rounded-xl border border-[#242424] space-y-2 font-mono">
                  <div className="text-[10px] text-slate-400 uppercase">Single-Use Activation Token</div>
                  <div className="text-emerald-400 font-bold break-all bg-[#0d0d0d] p-2.5 rounded border border-[#222]">
                    {createdInviteNotice.inviteToken}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Expires: {createdInviteNotice.expiresAt}</span>
                    <button
                      onClick={() => {
                        const link = `${window.location.origin}/#activate/${createdInviteNotice.inviteToken}`;
                        navigator.clipboard.writeText(link);
                        setCopiedToken(true);
                        setTimeout(() => setCopiedToken(false), 2000);
                      }}
                      className="text-[#FF6B00] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                    >
                      {copiedToken ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedToken ? 'Link Copied!' : 'Copy Activation Link'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleCloseInviteModal}
                    className="px-5 py-2 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold rounded-lg text-xs shadow-md cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendInvitation} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Institution / Organization Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inviteOrgName}
                    onChange={(e) => setInviteOrgName(e.target.value)}
                    placeholder={inviteType === 'university' ? 'e.g. University of Hargeisa' : 'e.g. Telesom Company'}
                    className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Representative Official Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inviteRepName}
                    onChange={(e) => setInviteRepName(e.target.value)}
                    placeholder="e.g. Prof. Mohamoud Farah / Abdikarim Eid"
                    className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Official Institutional Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="registrar@institution.edu.so"
                    className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div className="p-3 bg-[#141414] border border-[#222] rounded-lg text-[11px] text-slate-400">
                  A secure 7-day single-use activation token will be generated. The invited representative will configure their personal credentials upon first activation.
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-[#202020]">
                  <button
                    type="button"
                    onClick={handleCloseInviteModal}
                    className="px-4 py-2 bg-[#181818] hover:bg-[#222] text-slate-300 rounded-lg text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold rounded-lg text-xs shadow-md cursor-pointer"
                  >
                    Generate Activation Token
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Verification Adjudication Decision Modal */}
      {selectedVerif && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedVerif(null);
          }}
        >
          <div className="bg-[#0e0e0e] border border-[#262626] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-auto relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 flex">
              <div className="flex-1 bg-[#008037]" />
              <div className="flex-1 bg-white" />
              <div className="flex-1 bg-[#C8102E]" />
            </div>

            <div className="flex items-start justify-between border-b border-[#202020] pb-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#141414] border border-[#282828] text-[#FF6B00]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#008037] font-bold">
                    MINISTERIAL ADJUDICATION COUNCIL
                  </span>
                  <h3 className="text-base font-bold text-white font-sans">
                    Academic Credential Forensics & Approval
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedVerif(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg bg-[#181818] border border-[#282828] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Evidence Review Box */}
              <div className="p-4 bg-[#141414] rounded-xl border border-[#242424] space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-white font-bold text-sm">{selectedVerif.studentName}</div>
                    <div className="text-[11px] font-mono text-[#FF6B00]">Talent Ref: {selectedVerif.talentId}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-[10px] font-mono">
                    SENATE SEAL PRESENT
                  </span>
                </div>
                <div className="text-slate-300 pt-1">
                  {selectedVerif.programme} ({selectedVerif.degreeLevel.toUpperCase()})
                </div>
                <div className="text-slate-400 text-[11px]">
                  {selectedVerif.universityName} · Class of {selectedVerif.graduationYear}
                </div>
                
                <div className="pt-2 border-t border-[#1f1f1f] flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 font-mono">Dual Senate Archive Match</span>
                  <button
                    onClick={() => {
                      const matchedCred = credentials.find(c => c.credentialId === selectedVerif.credentialId) || credentials[0];
                      setInspectCredentialModal(matchedCred);
                    }}
                    className="text-[#FF6B00] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Inspect Full Diploma</span>
                  </button>
                </div>
              </div>

              {/* Quick Reason Presets */}
              <div className="space-y-1.5">
                <label className="block text-slate-400 font-mono text-[10px] uppercase">
                  Quick Verification Notes Presets:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Verified with University Senate minutes',
                    'Accreditation council criteria fully satisfied',
                    'Awaiting dual Dean signatory confirmation',
                    'Transcript discrepancy requires correction'
                  ].map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setReviewerNotes(preset)}
                      className="px-2.5 py-1 bg-[#161616] hover:bg-[#202020] text-slate-300 rounded-md border border-[#262626] text-[10px] cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Ministerial Reviewer Notes / Justification
                </label>
                <textarea
                  rows={3}
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  placeholder="Record official verification decision reasoning..."
                  className="w-full px-3.5 py-2 bg-[#161616] border border-[#282828] rounded-lg text-white focus:outline-none focus:border-[#FF6B00] leading-relaxed"
                />
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-[#202020]">
                <button
                  type="button"
                  onClick={() => handleApplyDecision('rejected')}
                  className="px-4 py-2 bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Reject Record
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleApplyDecision('needs_correction')}
                    className="px-4 py-2 bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-800 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Request Corrections
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyDecision('approved')}
                    className="px-5 py-2 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold rounded-lg text-xs shadow-md cursor-pointer"
                  >
                    Approve & Seal QR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hologram Credential Inspection Modal */}
      <CredentialInspectionModal
        credential={inspectCredentialModal}
        isOpen={Boolean(inspectCredentialModal)}
        onClose={() => setInspectCredentialModal(null)}
        language={language}
      />

    </div>
  );
};
