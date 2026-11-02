import React, { useState } from 'react';
import { 
  AuthUser, 
  CitizenTalentProfile, 
  DigitalCredential, 
  Vacancy, 
  ContactRequest, 
  NotificationLog, 
  Language 
} from '../types';
import { SNHCPLogo } from './SNHCPLogo';
import { CredentialInspectionModal } from './CredentialInspectionModal';
import { TalentCardModal } from './TalentCardModal';
import { 
  User, 
  GraduationCap, 
  Award, 
  FileText, 
  Briefcase, 
  Bell, 
  ShieldCheck, 
  Lock, 
  Settings, 
  LogOut, 
  CheckCircle2, 
  QrCode, 
  Download, 
  Share2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Check, 
  X,
  ExternalLink,
  CreditCard,
  Maximize2
} from 'lucide-react';

interface UserDashboardProps {
  currentUser: AuthUser;
  talentProfile: CitizenTalentProfile;
  credentials: DigitalCredential[];
  vacancies: Vacancy[];
  contactRequests: ContactRequest[];
  notifications: NotificationLog[];
  language: Language;
  onSignOut: () => void;
  onApproveContactRequest: (requestId: string) => void;
  onDeclineContactRequest: (requestId: string) => void;
  onUpdatePrivacySettings: (settings: CitizenTalentProfile['privacySettings']) => void;
  onOpenPublicQrLookup: (credId: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  currentUser,
  talentProfile,
  credentials,
  vacancies,
  contactRequests,
  notifications,
  language,
  onSignOut,
  onApproveContactRequest,
  onDeclineContactRequest,
  onUpdatePrivacySettings,
  onOpenPublicQrLookup
}) => {
  const isSo = language === 'so';
  const [activeSection, setActiveSection] = useState<
    'overview' | 'profile' | 'education' | 'credentials' | 'skills' | 'jobs' | 'requests' | 'notifications' | 'privacy' | 'security'
  >('overview');

  const [privacySettings, setPrivacySettings] = useState(talentProfile.privacySettings);
  const [savePrivacyNotice, setSavePrivacyNotice] = useState(false);

  // Modals state
  const [inspectCredential, setInspectCredential] = useState<DigitalCredential | null>(null);
  const [showTalentCardModal, setShowTalentCardModal] = useState<boolean>(false);

  // User's matched credentials
  const userCredentials = credentials.filter(
    c => c.talentId === talentProfile.talentId || c.studentName.toLowerCase() === currentUser.fullName.toLowerCase()
  );

  // Fallback to all if empty for testing
  const activeCredentialsList = userCredentials.length > 0 ? userCredentials : [credentials[0]];

  // User's specific contact requests
  const userRequests = contactRequests.filter(r => r.talentId === talentProfile.talentId || r.candidateNameMasked.toLowerCase().includes(currentUser.fullName.split(' ')[0].toLowerCase()));

  const handleTogglePrivacy = (field: keyof CitizenTalentProfile['privacySettings'], val: any) => {
    const updated = { ...privacySettings, [field]: val };
    setPrivacySettings(updated);
    onUpdatePrivacySettings(updated);
    setSavePrivacyNotice(true);
    setTimeout(() => setSavePrivacyNotice(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-slate-100 flex flex-col">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0e0e0e] border-b border-[#1f1f1f] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <SNHCPLogo size="sm" variant="mark" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white font-sans flex items-center gap-2">
                SNHCP Citizen & Graduate Portal
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Talent ID: <span className="text-[#FF6B00] font-bold">{currentUser.talentId || talentProfile.talentId}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => setShowTalentCardModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161616] hover:bg-[#202020] text-slate-200 border border-[#2b2b2b] text-[11px] font-mono transition-colors cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Smart ID Card</span>
            </button>

            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-semibold">
              Verified Citizen Account
            </span>

            <button
              onClick={onSignOut}
              className="px-3 py-1.5 rounded-md bg-[#161616] hover:bg-[#202020] text-red-400 border border-[#2b2b2b] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isSo ? 'Ka Bax' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* User Sidebar */}
        <aside className="lg:w-64 shrink-0 space-y-1 bg-[#0d0d0d] p-3 rounded-xl border border-[#1f1f1f] self-start w-full">
          <div className="p-3 mb-2 rounded-lg bg-[#141414] border border-[#222222] text-xs">
            <div className="font-bold text-white truncate">{currentUser.fullName}</div>
            <div className="text-[11px] text-slate-400 truncate">{currentUser.email}</div>
            <div className="text-[10px] text-[#FF6B00] font-mono mt-1">{talentProfile.currentTitle}</div>
          </div>

          <button
            onClick={() => setActiveSection('overview')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeSection === 'overview' ? 'bg-[#181818] text-white font-bold border-l-2 border-[#FF6B00]' : 'text-slate-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <User className="w-4 h-4 text-[#FF6B00]" />
            <span>{isSo ? 'Dulmar Guud' : 'Overview'}</span>
          </button>

          <button
            onClick={() => setActiveSection('credentials')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeSection === 'credentials' ? 'bg-[#181818] text-white font-bold border-l-2 border-[#FF6B00]' : 'text-slate-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-[#FF6B00]" />
              <span>{isSo ? 'Shahaadooyinkayga (QR)' : 'My Certificates & QR'}</span>
            </span>
            <span className="text-[10px] font-mono text-[#FF6B00] font-bold">
              {activeCredentialsList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSection('education')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeSection === 'education' ? 'bg-[#181818] text-white font-bold border-l-2 border-[#FF6B00]' : 'text-slate-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-[#FF6B00]" />
            <span>{isSo ? 'Taariikhda Waxbarasho' : 'My Education'}</span>
          </button>

          <button
            onClick={() => setActiveSection('skills')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeSection === 'skills' ? 'bg-[#181818] text-white font-bold border-l-2 border-[#FF6B00]' : 'text-slate-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#FF6B00]" />
            <span>{isSo ? 'Xirfadahayga & Aqoonta' : 'My Skills & Portfolio'}</span>
          </button>

          <button
            onClick={() => setActiveSection('jobs')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeSection === 'jobs' ? 'bg-[#181818] text-white font-bold border-l-2 border-[#FF6B00]' : 'text-slate-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <Briefcase className="w-4 h-4 text-[#FF6B00]" />
            <span>{isSo ? 'Fursadaha Shaqada' : 'Opportunities & Jobs'}</span>
          </button>

          <button
            onClick={() => setActiveSection('requests')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeSection === 'requests' ? 'bg-[#181818] text-white font-bold border-l-2 border-[#FF6B00]' : 'text-slate-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
              <span>{isSo ? 'Codsiyada Xidhiidhka' : 'Contact Requests'}</span>
            </span>
            {userRequests.filter(r => r.status === 'pending').length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#FF6B00] text-black font-bold text-[10px]">
                {userRequests.filter(r => r.status === 'pending').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSection('notifications')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeSection === 'notifications' ? 'bg-[#181818] text-white font-bold border-l-2 border-[#FF6B00]' : 'text-slate-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <Bell className="w-4 h-4 text-[#FF6B00]" />
            <span>{isSo ? 'Farriimaha (SMS/Web)' : 'Notifications'}</span>
          </button>

          <button
            onClick={() => setActiveSection('privacy')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeSection === 'privacy' ? 'bg-[#181818] text-white font-bold border-l-2 border-[#FF6B00]' : 'text-slate-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <Lock className="w-4 h-4 text-[#FF6B00]" />
            <span>{isSo ? 'Sirta & Ogolaanshaha' : 'Privacy & Consent'}</span>
          </button>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 space-y-6">
          
          {/* SECTION: OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-[#111111] border border-[#222222] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] font-bold">
                    {isSo ? 'SOO DHAWOOW' : 'CITIZEN TALENT PROFILE'}
                  </span>
                  <h2 className="text-2xl font-bold text-white font-display mt-1">
                    {currentUser.fullName}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {talentProfile.educationSummary}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span>Talent ID: <span className="text-[#FF6B00] font-bold">{currentUser.talentId || talentProfile.talentId}</span></span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400">Identity Verified</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowTalentCardModal(true)}
                    className="p-3 bg-[#161616] hover:bg-[#202020] rounded-xl border border-[#262626] text-center min-w-[140px] cursor-pointer transition-colors"
                  >
                    <div className="text-xl font-bold font-mono text-[#FF6B00]">
                      Smart ID
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      View Digital Card
                    </div>
                  </button>

                  <div className="p-3 bg-[#161616] rounded-xl border border-[#262626] text-center min-w-[140px]">
                    <div className="text-xl font-bold font-mono text-[#008037]">
                      {activeCredentialsList.length}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Verified Degrees
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Credentials Quick List */}
              <div className="p-6 bg-[#111111] border border-[#222222] rounded-xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-[#202020] pb-3">
                  <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#FF6B00]" />
                    <span>Your Verified Higher Education Degrees</span>
                  </h3>
                  <button
                    onClick={() => setActiveSection('credentials')}
                    className="text-xs text-[#FF6B00] hover:underline"
                  >
                    View All Credentials →
                  </button>
                </div>

                <div className="space-y-3">
                  {activeCredentialsList.map((cred) => (
                    <div
                      key={cred.credentialId}
                      className="p-4 bg-[#161616] border border-[#242424] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="font-bold text-white text-sm">{cred.programmeName}</div>
                        <div className="text-slate-400">{cred.universityName} ({cred.universityAcronym}) · Class of {cred.graduationDate}</div>
                        <div className="font-mono text-[11px] text-[#FF6B00]">Token: {cred.credentialId}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setInspectCredential(cred)}
                          className="px-3.5 py-1.5 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Inspect Degree</span>
                        </button>

                        <button
                          onClick={() => onOpenPublicQrLookup(cred.credentialId)}
                          className="px-3 py-1.5 bg-[#1f1f1f] hover:bg-[#282828] text-white border border-[#333333] rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <QrCode className="w-3.5 h-3.5 text-[#008037]" />
                          <span>QR Token</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Employer Contact Requests */}
              <div className="p-6 bg-[#111111] border border-[#222222] rounded-xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-[#202020] pb-3">
                  <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
                    <span>Employer Contact Requests (Candidate Consent Required)</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    {userRequests.filter(r => r.status === 'pending').length} pending approval
                  </span>
                </div>

                {userRequests.length === 0 ? (
                  <div className="text-xs text-slate-500 py-3">No pending employer requests at this time.</div>
                ) : (
                  <div className="space-y-3">
                    {userRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-4 bg-[#161616] border border-[#242424] rounded-xl space-y-2 text-xs"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-bold text-white text-sm">{req.employerName}</div>
                            <div className="text-slate-400 font-medium">Position: {req.vacancyTitle}</div>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            req.status === 'approved' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}>
                            {req.status.toUpperCase()}
                          </span>
                        </div>

                        <p className="text-slate-300 text-[11px] bg-[#121212] p-2.5 rounded-lg border border-[#1e1e1e]">
                          "{req.message}"
                        </p>

                        {req.status === 'pending' && (
                          <div className="flex justify-end gap-2 pt-2">
                            <button
                              onClick={() => onDeclineContactRequest(req.id)}
                              className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#252525] text-slate-400 rounded-lg text-xs cursor-pointer"
                            >
                              Decline Request
                            </button>
                            <button
                              onClick={() => onApproveContactRequest(req.id)}
                              className="px-4 py-1.5 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold rounded-lg text-xs shadow-md cursor-pointer"
                            >
                              Approve & Share Contact Details
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION: CREDENTIALS & QR */}
          {activeSection === 'credentials' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white font-display">
                  {isSo ? 'Shahaadooyinkayga Dijitaalka ah ee La Hubiyay' : 'My Verified Digital Academic Credentials'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Backed by the issuing Somaliland university archive and the National Higher Education Registry
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeCredentialsList.map((cred) => (
                  <div
                    key={cred.credentialId}
                    className="p-6 bg-[#111111] border border-[#222222] rounded-xl space-y-4 relative overflow-hidden shadow-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-xs text-[#FF6B00] font-bold">
                          {cred.universityAcronym} · {cred.documentType}
                        </span>
                        <h3 className="text-lg font-bold text-white font-sans mt-0.5">
                          {cred.programmeName}
                        </h3>
                        <div className="text-xs text-slate-400">{cred.universityName}</div>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                        VERIFIED
                      </span>
                    </div>

                    <div className="p-3 bg-[#161616] rounded-lg border border-[#242424] text-xs space-y-1 font-mono">
                      <div className="text-slate-400">Credential ID: <span className="text-white">{cred.credentialId}</span></div>
                      <div className="text-slate-400">Conferred: <span className="text-white">{cred.graduationDate}</span></div>
                      <div className="text-slate-400">Honours: <span className="text-white">{cred.honorsGrade}</span></div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => setInspectCredential(cred)}
                        className="px-4 py-2 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold rounded-lg text-xs flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Inspect Official Degree</span>
                      </button>

                      <button
                        onClick={() => onOpenPublicQrLookup(cred.credentialId)}
                        className="p-2 bg-[#181818] hover:bg-[#202020] text-slate-300 rounded-lg border border-[#2b2b2b] cursor-pointer"
                        title="View Public QR"
                      >
                        <QrCode className="w-4 h-4 text-[#008037]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: PRIVACY & CONSENT */}
          {activeSection === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white font-display">
                  {isSo ? 'Ilaalinta Sirta & Ogolaanshaha Xogta' : 'Personal Data Governance & Privacy Controls'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Section 8.2: You have full sovereign ownership over your personal profile and data-sharing consents.
                </p>
              </div>

              {savePrivacyNotice && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs rounded-lg">
                  Privacy settings updated successfully.
                </div>
              )}

              <div className="p-6 bg-[#111111] border border-[#222222] rounded-xl space-y-4 text-xs shadow-xl">
                <div className="flex items-center justify-between p-4 bg-[#161616] rounded-xl border border-[#262626]">
                  <div>
                    <div className="font-bold text-white text-sm">Mask Profile in Public Searches</div>
                    <div className="text-slate-400 mt-0.5">
                      Your full name and direct contact numbers are obscured from prospective employers until you approve a request.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacySettings.profileVisibility === 'masked'}
                    onChange={(e) => handleTogglePrivacy('profileVisibility', e.target.checked ? 'masked' : 'verified_employers_only')}
                    className="w-4 h-4 text-[#FF6B00] accent-[#FF6B00] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#161616] rounded-xl border border-[#262626]">
                  <div>
                    <div className="font-bold text-white text-sm">Allow Employer Contact Requests</div>
                    <div className="text-slate-400 mt-0.5">
                      Verified companies can send you formal interview invitations routed through the SNHCP SMS/Portal gateway.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacySettings.allowContactRequests}
                    onChange={(e) => handleTogglePrivacy('allowContactRequests', e.target.checked)}
                    className="w-4 h-4 text-[#FF6B00] accent-[#FF6B00] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#161616] rounded-xl border border-[#262626]">
                  <div>
                    <div className="font-bold text-white text-sm">Detailed Coursework Transcript Consent</div>
                    <div className="text-slate-400 mt-0.5">
                      Permit authorized recruiting officers to inspect course-by-course grades after an approved interview request.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacySettings.shareTranscriptConsent}
                    onChange={(e) => handleTogglePrivacy('shareTranscriptConsent', e.target.checked)}
                    className="w-4 h-4 text-[#FF6B00] accent-[#FF6B00] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* OTHER SECTIONS */}
          {(activeSection === 'education' || activeSection === 'skills' || activeSection === 'jobs' || activeSection === 'requests' || activeSection === 'notifications') && (
            <div className="p-6 bg-[#111111] border border-[#222222] rounded-xl space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs font-mono text-[#FF6B00]">
                {activeSection.toUpperCase()} VIEW
              </h3>
              
              {activeSection === 'skills' && (
                <div className="space-y-4 text-xs">
                  <div className="text-slate-300 font-medium">Your Registered Professional Competencies:</div>
                  <div className="flex flex-wrap gap-2">
                    {talentProfile.skills.map((s) => (
                      <span key={s} className="px-3 py-1 bg-[#1a1a1a] border border-[#2b2b2b] rounded-lg text-white font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'jobs' && (
                <div className="space-y-3">
                  {vacancies.map((v) => (
                    <div key={v.id} className="p-4 bg-[#161616] border border-[#242424] rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{v.title}</div>
                        <div className="text-slate-400">{v.companyName} · {v.location}</div>
                      </div>
                      <span className="font-mono text-[#FF6B00] text-[11px]">{v.employmentType}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'notifications' && (
                <div className="space-y-3">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3.5 bg-[#161616] border border-[#242424] rounded-xl text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{n.subject}</span>
                        <span className="text-[10px] font-mono text-slate-500">{n.timestamp}</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">{n.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>

      </div>

      {/* Hologram Credential Inspection Modal */}
      <CredentialInspectionModal
        credential={inspectCredential}
        isOpen={Boolean(inspectCredential)}
        onClose={() => setInspectCredential(null)}
        language={language}
      />

      {/* National Talent Smart ID Card Modal */}
      <TalentCardModal
        talent={talentProfile}
        isOpen={showTalentCardModal}
        onClose={() => setShowTalentCardModal(false)}
        language={language}
      />

    </div>
  );
};
