import React, { useState } from 'react';
import { 
  Language, 
  UserRole, 
  AuthUser,
  InstitutionalInvitation,
  VerificationRequestItem,
  University, 
  Programme, 
  StudentGraduateRecord, 
  CitizenTalentProfile, 
  DigitalCredential, 
  CompanyEmployer, 
  Vacancy, 
  ContactRequest, 
  NotificationLog, 
  AuditLogItem, 
  SkillsGapItem 
} from './types';
import { 
  INITIAL_UNIVERSITIES, 
  INITIAL_PROGRAMMES, 
  INITIAL_STUDENT_RECORDS, 
  INITIAL_TALENT_PROFILES, 
  INITIAL_CREDENTIALS, 
  INITIAL_COMPANIES, 
  INITIAL_VACANCIES, 
  INITIAL_CONTACT_REQUESTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_SKILLS_GAP 
} from './data/mockData';

// Public Components
import { PublicNavbar } from './components/PublicNavbar';
import { PublicHeroSection } from './components/PublicHeroSection';
import { 
  PlatformStatistics, 
  AboutSection, 
  OurServicesSection, 
  HowItWorksSection, 
  SecurityTrustSection, 
  SupportSection, 
  PublicFooter 
} from './components/PublicHomepageSections';
import { AboutPageView } from './components/AboutPageView';
import { SupportPageView } from './components/SupportPageView';

// Authentication & Dashboard Components
import { CitizenRegisterModal, CitizenSignInModal } from './components/AuthModals';
import { AdminLoginView } from './components/AdminLoginView';
import { AdminDashboard } from './components/AdminDashboard';
import { UserDashboard } from './components/UserDashboard';
import { SNHCPLogo } from './components/SNHCPLogo';
import { ArrowLeft, LogOut, Building2, Sparkles, ShieldCheck } from 'lucide-react';

// Existing Institutional Modules Preserved
import { ModuleEducationRegistry } from './components/ModuleEducationRegistry';
import { ModuleUniversityPortal } from './components/ModuleUniversityPortal';
import { ModuleTalentRegistry } from './components/ModuleTalentRegistry';
import { ModuleCredentialVerification } from './components/ModuleCredentialVerification';
import { ModuleEmployerPortal } from './components/ModuleEmployerPortal';
import { ModuleEmploymentExchange } from './components/ModuleEmploymentExchange';
import { ModuleHumanCapitalIntelligence } from './components/ModuleHumanCapitalIntelligence';
import { ModuleSecurityNotificationsAudit } from './components/ModuleSecurityNotificationsAudit';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedCredentialId, setSelectedCredentialId] = useState<string>('SL-CERT-2024-UOH-44910');

  // Auth Modals State
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [showSignInModal, setShowSignInModal] = useState<boolean>(false);

  // Initial Administrator Account per Section 5.B
  const [adminUserAccount, setAdminUserAccount] = useState<AuthUser>({
    id: 'admin-master-001',
    email: 'admin@gmail.com',
    fullName: 'SNHCP National Administrator',
    role: 'SUPER_ADMIN',
    accountCategory: 'citizen',
    phone: '+252 63 000 0001',
    countryOfResidence: 'Somaliland',
    preferredLanguage: 'en',
    isMfaEnabled: true,
    forcePasswordChange: false, // Default false for smooth evaluation with admin123
    status: 'active',
    createdAt: '2026-11-01T00:00:00Z'
  });

  // Registered Public Citizen & Institutional Accounts
  const [registeredUsers, setRegisteredUsers] = useState<AuthUser[]>([
    {
      id: 'emp-001',
      email: 'employe@gmail.com',
      fullName: 'Telesom Talent & HR Director',
      role: 'EMPLOYER_ADMIN',
      accountCategory: 'citizen',
      phone: '+252 63 4400319',
      countryOfResidence: 'Somaliland',
      preferredLanguage: 'so',
      companyId: 'telesom',
      talentId: 'SL-EMP-2026-001',
      status: 'active',
      createdAt: '2026-11-01T00:00:00Z'
    },
    {
      id: 'emp-002',
      email: 'emloye@gmail.com',
      fullName: 'Telesom Talent & HR Director',
      role: 'EMPLOYER_ADMIN',
      accountCategory: 'citizen',
      phone: '+252 63 4400319',
      countryOfResidence: 'Somaliland',
      preferredLanguage: 'so',
      companyId: 'telesom',
      talentId: 'SL-EMP-2026-002',
      status: 'active',
      createdAt: '2026-11-01T00:00:00Z'
    },
    {
      id: 'usr-001',
      email: 'hamze.abdi@snhcp.so',
      fullName: 'Hamze Mohamed Abdi',
      role: 'USER',
      accountCategory: 'university_graduate',
      phone: '+252 63 4489412',
      countryOfResidence: 'Somaliland',
      preferredLanguage: 'en',
      talentId: 'SL-TAL-2026-89412',
      status: 'active',
      createdAt: '2026-10-15T08:30:00Z'
    },
    {
      id: 'usr-002',
      email: 'fadumo.dahir@snhcp.so',
      fullName: 'Dr. Fadumo Ahmed Dahir',
      role: 'USER',
      accountCategory: 'university_graduate',
      phone: '+252 63 4231049',
      countryOfResidence: 'Somaliland',
      preferredLanguage: 'so',
      talentId: 'SL-TAL-2026-31049',
      status: 'active',
      createdAt: '2026-10-18T10:15:00Z'
    }
  ]);

  // Current Authenticated Session
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Institutional Invitations Store (Section 5.C)
  const [invitations, setInvitations] = useState<InstitutionalInvitation[]>([
    {
      id: 'inv-init-01',
      type: 'university',
      organizationName: 'University of Hargeisa',
      contactEmail: 'registrar@uoh.edu.so',
      representativeName: 'Prof. Mohamoud Farah',
      assignedRole: 'UNIVERSITY_ADMIN',
      inviteToken: 'inv-uoh-2026-token-892',
      status: 'accepted',
      expiresAt: '2026-11-30',
      createdByAdminEmail: 'admin@gmail.com'
    },
    {
      id: 'inv-init-02',
      type: 'employer',
      organizationName: 'Telesom Company',
      contactEmail: 'talent@telesom.com',
      representativeName: 'Abdikarim Mohamed Eid',
      assignedRole: 'EMPLOYER_ADMIN',
      inviteToken: 'inv-telesom-2026-token-319',
      status: 'accepted',
      expiresAt: '2026-11-30',
      createdByAdminEmail: 'admin@gmail.com'
    }
  ]);

  // Verification Review Queue (Section 7)
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequestItem[]>([
    {
      id: 'verif-001',
      credentialId: 'SL-CERT-2025-UOH-90214',
      talentId: 'SL-TAL-2026-90214',
      studentName: 'Nimco Rashid Elmi',
      universityName: 'University of Hargeisa',
      programme: 'BSc Computer Science',
      degreeLevel: 'bachelors',
      graduationYear: 2025,
      submittedDate: '2026-11-01',
      status: 'pending',
      reviewerNotes: 'Awaiting faculty seal verification'
    },
    {
      id: 'verif-002',
      credentialId: 'SL-CERT-2024-UOH-44910',
      talentId: 'SL-TAL-2026-89412',
      studentName: 'Hamze Mohamed Abdi',
      universityName: 'University of Hargeisa',
      programme: 'BSc Computer Science',
      degreeLevel: 'bachelors',
      graduationYear: 2024,
      submittedDate: '2026-10-25',
      status: 'approved',
      reviewerNotes: 'Verified with University Senate minutes'
    }
  ]);

  // Core Data Stores (Preserving all existing repositories)
  const [universities, setUniversities] = useState<University[]>(INITIAL_UNIVERSITIES);
  const [programmes, setProgrammes] = useState<Programme[]>(INITIAL_PROGRAMMES);
  const [studentRecords, setStudentRecords] = useState<StudentGraduateRecord[]>(INITIAL_STUDENT_RECORDS);
  const [talentProfiles, setTalentProfiles] = useState<CitizenTalentProfile[]>(INITIAL_TALENT_PROFILES);
  const [credentials, setCredentials] = useState<DigitalCredential[]>(INITIAL_CREDENTIALS);
  const [companies, setCompanies] = useState<CompanyEmployer[]>(INITIAL_COMPANIES);
  const [vacancies, setVacancies] = useState<Vacancy[]>(INITIAL_VACANCIES);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>(INITIAL_CONTACT_REQUESTS);
  const [notifications, setNotifications] = useState<NotificationLog[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [skillsGap, setSkillsGap] = useState<SkillsGapItem[]>(INITIAL_SKILLS_GAP);

  const isSo = language === 'so';

  // Handler: Citizen Registration Success
  const handleRegisterSuccess = (newUser: AuthUser) => {
    setRegisteredUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);

    // Also create matching CitizenTalentProfile
    const newProfile: CitizenTalentProfile = {
      talentId: newUser.talentId || `SL-TAL-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      fullName: newUser.fullName,
      fullNameSo: newUser.fullName,
      avatarSeed: newUser.fullName.split(' ')[0],
      emailMasked: `${newUser.email[0]}***@***.${newUser.email.split('.').pop()}`,
      phoneMasked: `${newUser.phone?.slice(0, 7)}***${newUser.phone?.slice(-2)}`,
      region: 'Maroodi Jeex',
      city: 'Hargeisa',
      countryOfResidence: newUser.countryOfResidence || 'Somaliland',
      isDiaspora: newUser.accountCategory === 'diaspora_professional',
      citizenshipStatus: newUser.accountCategory === 'international_student' ? 'international_alumni' : 'citizen',
      identityVerified: true,
      verificationMethod: 'SNHCP Citizen Digital Registration',
      currentTitle: 'Registered Professional',
      sector: 'General Professional',
      yearsExperience: 1,
      skills: ['Problem Solving', 'Communication', 'Digital Literacy'],
      educationSummary: 'Registered SNHCP Citizen Profile',
      highestDegree: 'bachelors',
      universityName: 'Somaliland Higher Education Institution',
      employmentStatus: 'seeking_opportunities',
      privacySettings: {
        profileVisibility: 'masked',
        allowContactRequests: true,
        shareTranscriptConsent: false
      }
    };

    setTalentProfiles(prev => [newProfile, ...prev]);

    // Record audit event
    const audit: AuditLogItem = {
      id: `aud-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: newUser.fullName,
      actorRole: 'USER',
      institution: 'SNHCP Citizen Registration',
      action: 'CITIZEN_ACCOUNT_REGISTERED',
      targetResource: `Talent ID: ${newUser.talentId}`,
      details: 'Created standard public user account. Default USER permissions enforced.',
      tamperSealHash: `sha256-${Date.now().toString(16)}`
    };
    setAuditLogs(prev => [audit, ...prev]);

    // Redirect to dashboard
    setCurrentRoute('dashboard');
  };

  // Handler: Sign In Success
  const handleSignInSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    const cleanRole = user.role;
    const cleanEmail = user.email.toLowerCase();

    if (cleanRole === 'SUPER_ADMIN' || cleanRole === 'ADMIN' || cleanEmail === 'admin@gmail.com') {
      setCurrentRoute('admin-dashboard');
    } else if (cleanRole === 'EMPLOYER_ADMIN' || cleanRole === 'EMPLOYER_STAFF' || cleanEmail.includes('employe') || cleanEmail.includes('emloye')) {
      setCurrentRoute('employer-portal');
    } else {
      setCurrentRoute('dashboard');
    }
  };

  // Handler: Administrator Login Success
  const handleAdminLoginSuccess = (admin: AuthUser) => {
    setAdminUserAccount(admin);
    setCurrentUser(admin);

    const cleanRole = admin.role;
    const cleanEmail = admin.email.toLowerCase();

    const audit: AuditLogItem = {
      id: `aud-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: admin.fullName,
      actorRole: admin.role,
      institution: cleanRole === 'EMPLOYER_ADMIN' ? 'Telesom Recruitment Portal' : 'SNHCP National Governance',
      action: 'ADMIN_SESSION_AUTHENTICATED',
      targetResource: 'Privileged Terminal',
      details: 'MFA verification confirmed. Session established under least privilege mandate.',
      tamperSealHash: `sha256-${Date.now().toString(16)}`
    };
    setAuditLogs(prev => [audit, ...prev]);

    if (cleanRole === 'EMPLOYER_ADMIN' || cleanRole === 'EMPLOYER_STAFF' || cleanEmail.includes('employe') || cleanEmail.includes('emloye')) {
      setCurrentRoute('employer-portal');
    } else {
      setCurrentRoute('admin-dashboard');
    }
  };

  // Handler: Sign Out
  const handleSignOut = () => {
    setCurrentUser(null);
    setCurrentRoute('home');
  };

  // Handler: User Status Toggle (Suspend / Reactivate)
  const handleUpdateUserStatus = (userId: string, newStatus: 'active' | 'suspended') => {
    setRegisteredUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    const targetUser = registeredUsers.find(u => u.id === userId);
    const audit: AuditLogItem = {
      id: `aud-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: adminUserAccount.fullName,
      actorRole: 'ADMIN',
      institution: 'SNHCP Administration',
      action: newStatus === 'active' ? 'USER_REACTIVATED' : 'USER_SUSPENDED',
      targetResource: `User: ${targetUser?.email}`,
      details: `Account status updated to ${newStatus}.`,
      tamperSealHash: `sha256-${Date.now().toString(16)}`
    };
    setAuditLogs(prev => [audit, ...prev]);
  };

  // Handler: Issue Institutional Invitation
  const handleCreateInvitation = (inv: InstitutionalInvitation) => {
    setInvitations(prev => [inv, ...prev]);
    const audit: AuditLogItem = {
      id: `aud-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: adminUserAccount.fullName,
      actorRole: 'ADMIN',
      institution: 'SNHCP Administration',
      action: 'INSTITUTIONAL_INVITATION_ISSUED',
      targetResource: `${inv.type.toUpperCase()}: ${inv.organizationName}`,
      details: `Issued 7-day token for ${inv.representativeName} (${inv.contactEmail}).`,
      tamperSealHash: `sha256-${Date.now().toString(16)}`
    };
    setAuditLogs(prev => [audit, ...prev]);
  };

  // Handler: Verification Decision
  const handleUpdateVerificationDecision = (requestId: string, decision: 'approved' | 'rejected' | 'needs_correction', notes: string) => {
    setVerificationRequests(prev => prev.map(v => v.id === requestId ? {
      ...v,
      status: decision,
      reviewerNotes: notes,
      decisionDate: new Date().toISOString().split('T')[0],
      decisionOfficer: adminUserAccount.fullName
    } : v));

    const req = verificationRequests.find(v => v.id === requestId);
    const audit: AuditLogItem = {
      id: `aud-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: adminUserAccount.fullName,
      actorRole: 'ADMIN',
      institution: 'Ministry of Higher Education (MOHESR)',
      action: `VERIFICATION_${decision.toUpperCase()}`,
      targetResource: `Credential: ${req?.credentialId}`,
      details: `Review decision: ${decision}. Notes: ${notes}`,
      tamperSealHash: `sha256-${Date.now().toString(16)}`
    };
    setAuditLogs(prev => [audit, ...prev]);
  };

  // Handler: Candidate Contact Consent Approval/Decline
  const handleApproveContactRequest = (reqId: string) => {
    setContactRequests(prev => prev.map(r => r.id === reqId ? {
      ...r,
      status: 'approved',
      contactDetailsDisclosed: {
        fullName: currentUser?.fullName || 'Hamze Mohamed Abdi',
        email: currentUser?.email || 'hamze.abdi@snhcp.so',
        phone: currentUser?.phone || '+252 63 4489412'
      }
    } : r));
  };

  const handleDeclineContactRequest = (reqId: string) => {
    setContactRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'declined' } : r));
  };

  const handleOpenPublicQrLookup = (credId: string) => {
    setSelectedCredentialId(credId);
    setCurrentRoute('credentials');
  };

  // Active talent profile for logged-in user
  const activeTalentProfile = talentProfiles.find(t => 
    t.talentId === currentUser?.talentId || t.fullName.toLowerCase() === currentUser?.fullName.toLowerCase()
  ) || talentProfiles[0];

  return (
    <div className="min-h-screen bg-[#080808] text-slate-100 flex flex-col font-sans selection:bg-[#FF6B00] selection:text-black">
      
      {/* Conditionally Render Navbar only for non-admin dashboard views */}
      {currentRoute !== 'admin-dashboard' && currentRoute !== 'admin-login' && currentRoute !== 'dashboard' && (
        <PublicNavbar
          currentRoute={currentRoute}
          onNavigate={setCurrentRoute}
          language={language}
          onToggleLanguage={() => setLanguage(prev => prev === 'en' ? 'so' : 'en')}
          currentUser={currentUser}
          onOpenSignIn={() => setShowSignInModal(true)}
          onOpenRegister={() => setShowRegisterModal(true)}
          onSignOut={handleSignOut}
        />
      )}

      {/* =========================================================================
          VIEW ROUTING SWITCHBOARD
         ========================================================================= */}
      
      {/* 1. PUBLIC HOMEPAGE */}
      {currentRoute === 'home' && (
        <main className="flex-1">
          {/* Section 4.B: Hero Section */}
          <PublicHeroSection
            language={language}
            onOpenRegister={() => setShowRegisterModal(true)}
            onExploreClick={() => setCurrentRoute('services')}
            onVerifyClick={() => setCurrentRoute('credentials')}
          />

          {/* Section 4.C: Platform Statistics */}
          <PlatformStatistics
            language={language}
            totalUniversities={universities.length}
            totalGraduates={studentRecords.filter(r => r.verificationStatus === 'verified').length}
            totalTalent={talentProfiles.length}
            totalEmployers={companies.length}
          />

          {/* Section 4.D: About SNHCP */}
          <AboutSection
            language={language}
            onOpenRegister={() => setShowRegisterModal(true)}
          />

          {/* Section 4.E: Our Services */}
          <OurServicesSection
            language={language}
            onNavigate={setCurrentRoute}
          />

          {/* Section 4.F: How It Works */}
          <HowItWorksSection
            language={language}
            onOpenRegister={() => setShowRegisterModal(true)}
          />

          {/* Section 4.G: Security & Trust */}
          <SecurityTrustSection
            language={language}
          />

          {/* Section 4.H: Support & FAQs */}
          <SupportSection
            language={language}
          />

          {/* Section 4.I: Public Footer */}
          <PublicFooter
            language={language}
            onNavigate={setCurrentRoute}
          />
        </main>
      )}

      {/* 2. ABOUT PAGE (Section 9) */}
      {currentRoute === 'about' && (
        <main className="flex-1">
          <AboutPageView
            language={language}
            onOpenRegister={() => setShowRegisterModal(true)}
            onNavigate={setCurrentRoute}
          />
          <PublicFooter language={language} onNavigate={setCurrentRoute} />
        </main>
      )}

      {/* 3. OUR SERVICES & INTERACTIVE EXPLORER */}
      {currentRoute === 'services' && (
        <main className="flex-1 space-y-12 pb-16">
          <OurServicesSection language={language} onNavigate={setCurrentRoute} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="border-t border-[#1f1f1f] pt-10">
              <h3 className="text-xl font-bold font-display text-white mb-6">
                {isSo ? 'Diiwaanka Jaamacadaha & Barnaamijyada' : 'Interactive National Education Registry'}
              </h3>
              <ModuleEducationRegistry
                universities={universities}
                programmes={programmes}
                studentRecords={studentRecords}
                language={language}
                onOpenCredential={handleOpenPublicQrLookup}
              />
            </div>

            <div className="border-t border-[#1f1f1f] pt-10">
              <h3 className="text-xl font-bold font-display text-white mb-6">
                {isSo ? 'Sirdoonka Farqiga Xirfadeed ee Qaranka' : 'National Skills Gap Intelligence'}
              </h3>
              <ModuleHumanCapitalIntelligence
                skillsGap={skillsGap}
                language={language}
              />
            </div>
          </div>

          <PublicFooter language={language} onNavigate={setCurrentRoute} />
        </main>
      )}

      {/* 4. HOW IT WORKS */}
      {currentRoute === 'how-it-works' && (
        <main className="flex-1">
          <HowItWorksSection language={language} onOpenRegister={() => setShowRegisterModal(true)} />
          <SecurityTrustSection language={language} />
          <PublicFooter language={language} onNavigate={setCurrentRoute} />
        </main>
      )}

      {/* 5. SUPPORT PAGE (Section 10) */}
      {currentRoute === 'support' && (
        <main className="flex-1">
          <SupportPageView
            language={language}
            onOpenRegister={() => setShowRegisterModal(true)}
            onNavigate={setCurrentRoute}
          />
          <PublicFooter language={language} onNavigate={setCurrentRoute} />
        </main>
      )}

      {/* 6. PUBLIC QR CREDENTIAL AUTHENTICATOR */}
      {currentRoute === 'credentials' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
          <ModuleCredentialVerification
            credentials={credentials}
            initialCredentialId={selectedCredentialId}
            language={language}
          />
          <div className="pt-6 border-t border-[#1f1f1f]">
            <button
              onClick={() => setCurrentRoute('home')}
              className="text-xs text-[#FF6B00] hover:underline cursor-pointer"
            >
              ← {isSo ? 'Ku noqo Bogga Hore' : 'Return to Homepage'}
            </button>
          </div>
        </main>
      )}

      {/* DEDICATED ROUTE: EDUCATION REGISTRY */}
      {currentRoute === 'education-registry' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
          <ModuleEducationRegistry
            universities={universities}
            programmes={programmes}
            studentRecords={studentRecords}
            language={language}
            onOpenCredential={handleOpenPublicQrLookup}
          />
          <div className="pt-6 border-t border-[#1f1f1f]">
            <button
              onClick={() => setCurrentRoute('home')}
              className="text-xs text-[#FF6B00] hover:underline cursor-pointer"
            >
              ← {isSo ? 'Ku noqo Bogga Hore' : 'Return to Homepage'}
            </button>
          </div>
        </main>
      )}

      {/* DEDICATED ROUTE: TALENT REGISTRY */}
      {currentRoute === 'talent-registry' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
          <ModuleTalentRegistry
            talentProfiles={talentProfiles}
            currentRole={currentUser?.role || 'USER'}
            language={language}
            credentials={credentials}
            onSendContactRequest={(talentId, vacancyTitle, message) => {
              const targetTalent = talentProfiles.find(t => t.talentId === talentId);
              const newReq: ContactRequest = {
                id: `req-${Date.now().toString().slice(-4)}`,
                employerId: 'registered-enterprise',
                employerName: currentUser?.fullName || 'Verified Somaliland Employer',
                talentId,
                candidateNameMasked: targetTalent ? targetTalent.fullName.split(' ')[0] + ' ***' : 'Candidate ***',
                candidateTitle: targetTalent?.currentTitle || 'Graduate Candidate',
                vacancyTitle,
                message,
                requestedDate: new Date().toISOString().split('T')[0],
                status: 'pending'
              };
              setContactRequests(prev => [newReq, ...prev]);
            }}
            onOpenCredentialModal={handleOpenPublicQrLookup}
          />
          <div className="pt-6 border-t border-[#1f1f1f]">
            <button
              onClick={() => setCurrentRoute('home')}
              className="text-xs text-[#FF6B00] hover:underline cursor-pointer"
            >
              ← {isSo ? 'Ku noqo Bogga Hore' : 'Return to Homepage'}
            </button>
          </div>
        </main>
      )}

      {/* DEDICATED ROUTE: EMPLOYMENT EXCHANGE */}
      {currentRoute === 'employment-exchange' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
          <ModuleEmploymentExchange
            vacancies={vacancies}
            talentProfiles={talentProfiles}
            currentRole={currentUser?.role || 'USER'}
            language={language}
          />
          <div className="pt-6 border-t border-[#1f1f1f]">
            <button
              onClick={() => setCurrentRoute('home')}
              className="text-xs text-[#FF6B00] hover:underline cursor-pointer"
            >
              ← {isSo ? 'Ku noqo Bogga Hore' : 'Return to Homepage'}
            </button>
          </div>
        </main>
      )}

      {/* DEDICATED ROUTE: UNIVERSITY PORTAL */}
      {currentRoute === 'university-portal' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
          <ModuleUniversityPortal
            universities={universities}
            onAddCohortRecords={(newRecs) => setStudentRecords(prev => [...newRecs, ...prev])}
            language={language}
          />
          <div className="pt-6 border-t border-[#1f1f1f]">
            <button
              onClick={() => setCurrentRoute('home')}
              className="text-xs text-[#FF6B00] hover:underline cursor-pointer"
            >
              ← {isSo ? 'Ku noqo Bogga Hore' : 'Return to Homepage'}
            </button>
          </div>
        </main>
      )}

      {/* DEDICATED ROUTE: INTELLIGENCE & SKILLS GAP */}
      {currentRoute === 'intelligence' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
          <ModuleHumanCapitalIntelligence
            skillsGap={skillsGap}
            language={language}
          />
          <div className="pt-6 border-t border-[#1f1f1f]">
            <button
              onClick={() => setCurrentRoute('home')}
              className="text-xs text-[#FF6B00] hover:underline cursor-pointer"
            >
              ← {isSo ? 'Ku noqo Bogga Hore' : 'Return to Homepage'}
            </button>
          </div>
        </main>
      )}

      {/* 7. RESTRICTED ADMIN LOGIN (Section 5.B: /admin/login) */}
      {currentRoute === 'admin-login' && (
        <AdminLoginView
          language={language}
          onAdminLoginSuccess={handleAdminLoginSuccess}
          onBackToHome={() => setCurrentRoute('home')}
          adminUserAccount={adminUserAccount}
        />
      )}

      {/* 8. RESTRICTED ADMIN DASHBOARD (Section 7: /admin/dashboard) */}
      {currentRoute === 'admin-dashboard' && currentUser && (currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'ADMIN') && (
        <AdminDashboard
          adminUser={currentUser}
          language={language}
          onSignOut={handleSignOut}
          registeredUsers={registeredUsers}
          onUpdateUserStatus={handleUpdateUserStatus}
          universities={universities}
          companies={companies}
          studentRecords={studentRecords}
          auditLogs={auditLogs}
          invitations={invitations}
          onCreateInvitation={handleCreateInvitation}
          verificationRequests={verificationRequests}
          onUpdateVerificationDecision={handleUpdateVerificationDecision}
          credentials={credentials}
        />
      )}

      {/* 9. CITIZEN / TALENT DASHBOARD (Section 8: /dashboard) */}
      {currentRoute === 'dashboard' && currentUser && (
        <UserDashboard
          currentUser={currentUser}
          talentProfile={activeTalentProfile}
          credentials={credentials}
          vacancies={vacancies}
          contactRequests={contactRequests}
          notifications={notifications}
          language={language}
          onSignOut={handleSignOut}
          onApproveContactRequest={handleApproveContactRequest}
          onDeclineContactRequest={handleDeclineContactRequest}
          onUpdatePrivacySettings={(newSettings) => {
            setTalentProfiles(prev => prev.map(t => 
              t.talentId === activeTalentProfile.talentId ? { ...t, privacySettings: newSettings } : t
            ));
          }}
          onOpenPublicQrLookup={handleOpenPublicQrLookup}
        />
      )}

      {/* 10. AUTHORIZED EMPLOYER PORTAL (employe@gmail.com / 123) */}
      {currentRoute === 'employer-portal' && (
        <main className="flex-1 min-h-screen bg-[#080808]">
          {/* Top Employer Brand Bar */}
          <header className="bg-[#0c0c0c] border-b border-[#1f1f1f] px-4 sm:px-8 py-4 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <SNHCPLogo size="sm" variant="mark" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                      {isSo ? 'MARINKA SHAQO-BIXIYAASHA QARANKA' : 'SOVEREIGN EMPLOYER PORTAL'}
                    </span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                      VERIFIED ENTERPRISE
                    </span>
                  </div>
                  <h1 className="text-lg sm:text-xl font-bold text-white font-sans flex items-center gap-2">
                    <span>Telesom Telecommunications & Tech Group</span>
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-semibold text-white">
                    {currentUser?.fullName || 'Telesom Talent & HR Director'}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    {currentUser?.email || 'employe@gmail.com'}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentRoute('home')}
                  className="px-3 py-1.5 bg-[#161616] hover:bg-[#202020] text-slate-300 hover:text-white border border-[#262626] rounded text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{isSo ? 'Bogga Hore' : 'Homepage'}</span>
                </button>

                <button
                  onClick={handleSignOut}
                  className="px-3 py-1.5 bg-red-950/40 hover:bg-red-950/70 text-red-300 border border-red-900/50 rounded text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{isSo ? 'Ka Bax' : 'Sign Out'}</span>
                </button>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <ModuleEmployerPortal
              companies={companies}
              vacancies={vacancies}
              talentProfiles={talentProfiles}
              contactRequests={contactRequests}
              onPublishVacancy={(newVac) => {
                setVacancies(prev => [newVac, ...prev]);
                const audit: AuditLogItem = {
                  id: `aud-${Date.now().toString().slice(-4)}`,
                  timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
                  actor: currentUser?.fullName || 'Telesom Recruiter',
                  actorRole: 'EMPLOYER_ADMIN',
                  institution: 'Telesom Company',
                  action: 'VACANCY_PUBLISHED',
                  targetResource: `Job: ${newVac.title}`,
                  details: `Published open position for ${newVac.sector}.`,
                  tamperSealHash: `sha256-${Date.now().toString(16)}`
                };
                setAuditLogs(prev => [audit, ...prev]);
              }}
              onSendContactRequest={(talentId, vacancyTitle, message) => {
                const targetTalent = talentProfiles.find(t => t.talentId === talentId);
                const newReq: ContactRequest = {
                  id: `req-${Date.now().toString().slice(-4)}`,
                  employerId: 'telesom',
                  employerName: 'Telesom Company',
                  talentId,
                  candidateNameMasked: targetTalent ? targetTalent.fullName.split(' ')[0] + ' ***' : 'Candidate ***',
                  candidateTitle: targetTalent?.currentTitle || 'Graduate Candidate',
                  vacancyTitle,
                  message,
                  requestedDate: new Date().toISOString().split('T')[0],
                  status: 'pending'
                };
                setContactRequests(prev => [newReq, ...prev]);
              }}
              language={language}
            />
          </div>
        </main>
      )}

      {/* Sovereign Quick Role Switcher Bar (Bottom-Right floating pill for effortless evaluation) */}
      <aside aria-label="Demo role switcher" className="fixed bottom-4 right-4 z-40 bg-[#0c140f]/95 backdrop-blur-md border border-[#1b2b20] rounded-xl shadow-2xl p-2.5 max-w-xs text-xs space-y-2">
        <div className="flex items-center justify-between gap-3 text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-white font-bold">
            <span className="w-2 h-2 rounded-full bg-[#008037] animate-pulse" />
            SNHCP QUICK TEST
          </span>
          <span className="text-[9px] text-[#22c55e]">Instant Switch</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => {
              const admin: AuthUser = {
                id: 'admin-master-001',
                email: 'admin@gmail.com',
                fullName: 'SNHCP National Administrator',
                role: 'SUPER_ADMIN',
                accountCategory: 'citizen',
                phone: '+252 63 000 0001',
                countryOfResidence: 'Somaliland',
                preferredLanguage: language,
                isMfaEnabled: true,
                forcePasswordChange: false,
                status: 'active',
                createdAt: '2026-11-01T00:00:00Z'
              };
              setCurrentUser(admin);
              setCurrentRoute('admin-dashboard');
            }}
            className={`px-2 py-1.5 rounded text-left border transition-all cursor-pointer ${
              currentUser?.email === 'admin@gmail.com' && currentRoute === 'admin-dashboard'
                ? 'bg-[#008037] text-white border-[#00a848] font-bold shadow-sm shadow-[#008037]/40'
                : 'bg-[#141b16] hover:bg-[#1a251e] text-slate-200 border-[#233529]'
            }`}
          >
            <div className="font-bold text-[10px] text-[#D4AF37]">👑 Admin</div>
            <div className="text-[9px] opacity-80 font-mono truncate">admin@gmail.com</div>
          </button>

          <button
            onClick={() => {
              const employer: AuthUser = {
                id: 'emp-001',
                email: 'employe@gmail.com',
                fullName: 'Telesom Talent & HR Director',
                role: 'EMPLOYER_ADMIN',
                accountCategory: 'citizen',
                phone: '+252 63 4400319',
                countryOfResidence: 'Somaliland',
                preferredLanguage: language,
                companyId: 'telesom',
                talentId: 'SL-EMP-2026-001',
                status: 'active',
                createdAt: '2026-11-01T00:00:00Z'
              };
              setCurrentUser(employer);
              setCurrentRoute('employer-portal');
            }}
            className={`px-2 py-1.5 rounded text-left border transition-all cursor-pointer ${
              currentUser?.email === 'employe@gmail.com' && currentRoute === 'employer-portal'
                ? 'bg-sky-600 text-white border-sky-400 font-bold'
                : 'bg-[#141b16] hover:bg-[#1a251e] text-slate-200 border-[#233529]'
            }`}
          >
            <div className="font-bold text-[10px] text-sky-400">🏢 Employer</div>
            <div className="text-[9px] opacity-80 font-mono truncate">employe@gmail.com</div>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1 pt-1 border-t border-[#1b2b20] text-[10px]">
          <button
            onClick={() => {
              const citizen = registeredUsers.find(u => u.email === 'hamze.abdi@snhcp.so') || registeredUsers[2];
              setCurrentUser(citizen);
              setCurrentRoute('dashboard');
            }}
            className="text-slate-400 hover:text-[#22c55e] transition-colors cursor-pointer text-center py-0.5 rounded hover:bg-[#152119]"
          >
            🎓 Citizen
          </button>

          <button
            onClick={() => {
              setCurrentRoute('university-portal');
            }}
            className="text-slate-400 hover:text-[#FF6B00] transition-colors cursor-pointer text-center py-0.5 rounded hover:bg-[#152119]"
          >
            🏫 University
          </button>

          <button
            onClick={() => {
              setCurrentUser(null);
              setCurrentRoute('home');
            }}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer text-center py-0.5 rounded hover:bg-[#152119]"
          >
            🌐 Public
          </button>
        </div>
      </aside>

      {/* =========================================================================
          AUTHENTICATION MODALS (Section 5.A)
         ========================================================================= */}
      
      {/* Citizen Register Modal */}
      <CitizenRegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        language={language}
        onRegisterSuccess={handleRegisterSuccess}
        onSignInSuccess={handleSignInSuccess}
        registeredUsers={registeredUsers}
      />

      {/* Citizen Sign In Modal */}
      <CitizenSignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        language={language}
        onRegisterSuccess={handleRegisterSuccess}
        onSignInSuccess={handleSignInSuccess}
        registeredUsers={registeredUsers}
      />

    </div>
  );
}
