export type Language = 'en' | 'so';

export type UserRole = 
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'UNIVERSITY_ADMIN'
  | 'UNIVERSITY_STAFF'
  | 'EMPLOYER_ADMIN'
  | 'EMPLOYER_STAFF'
  | 'USER'
  | 'GOVERNMENT_VIEWER'
  // Backward compatibility aliases
  | 'university_admin'
  | 'national_authority' 
  | 'citizen_talent' 
  | 'employer' 
  | 'public_verifier';

export type AccountCategory = 
  | 'citizen'
  | 'international_student'
  | 'university_graduate'
  | 'diaspora_professional'
  | 'other_eligible';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  accountCategory: AccountCategory;
  phone?: string;
  countryOfResidence?: string;
  preferredLanguage: Language;
  talentId?: string;
  institutionId?: string;
  companyId?: string;
  isMfaEnabled?: boolean;
  forcePasswordChange?: boolean;
  status: 'active' | 'suspended' | 'pending_verification';
  createdAt: string;
}

export interface InstitutionalInvitation {
  id: string;
  type: 'university' | 'employer';
  organizationName: string;
  contactEmail: string;
  representativeName: string;
  assignedRole: UserRole;
  inviteToken: string;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
  expiresAt: string;
  createdByAdminEmail: string;
}

export interface VerificationRequestItem {
  id: string;
  credentialId: string;
  talentId: string;
  studentName: string;
  universityName: string;
  programme: string;
  degreeLevel: DegreeLevel;
  graduationYear: number;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_correction';
  evidenceDocumentUrl?: string;
  reviewerNotes?: string;
  decisionDate?: string;
  decisionOfficer?: string;
}

export type DegreeLevel = 
  | 'phd' 
  | 'masters' 
  | 'postgrad_diploma' 
  | 'bachelors' 
  | 'higher_diploma' 
  | 'diploma' 
  | 'certificate';

export type StudentStatus = 
  | 'graduated' 
  | 'active' 
  | 'enrolled' 
  | 'transferred' 
  | 'withdrawn' 
  | 'on_leave';

export type VerificationStatus = 
  | 'verified' 
  | 'pending_institutional_review' 
  | 'pending_central_audit' 
  | 'rejected'
  | 'revoked';

export interface University {
  id: string;
  name: string;
  nameSo: string;
  acronym: string;
  establishedYear: number;
  region: string;
  city: string;
  status: 'accredited' | 'provisional';
  facultiesCount: number;
  programmesCount: number;
  totalStudents: number;
  verifiedGraduates: number;
  contactEmail: string;
  authorizedOfficer: string;
}

export interface Programme {
  id: string;
  universityId: string;
  universityName: string;
  name: string;
  nameSo: string;
  degreeLevel: DegreeLevel;
  fieldOfStudy: string;
  durationYears: number;
  accreditationStatus: 'accredited' | 'under_review';
}

export interface StudentGraduateRecord {
  id: string;
  talentId: string;
  fullName: string;
  fullNameSo?: string;
  nationalIdMasked: string;
  gender: 'Male' | 'Female';
  universityId: string;
  universityName: string;
  faculty: string;
  programme: string;
  degreeLevel: DegreeLevel;
  fieldOfStudy: string;
  enrollmentYear: number;
  graduationYear: number;
  status: StudentStatus;
  gpa: number;
  honors?: string;
  verificationStatus: VerificationStatus;
  credentialId: string;
  issueDate: string;
  qrHash: string;
}

export interface CitizenTalentProfile {
  talentId: string; // e.g. SL-TAL-2026-89412
  fullName: string;
  fullNameSo: string;
  avatarSeed: string;
  emailMasked: string;
  phoneMasked: string;
  region: string;
  city: string;
  countryOfResidence: string;
  isDiaspora: boolean;
  citizenshipStatus: 'citizen' | 'eligible_resident' | 'international_alumni';
  identityVerified: boolean;
  verificationMethod: string;
  currentTitle: string;
  sector: string;
  yearsExperience: number;
  skills: string[];
  educationSummary: string;
  highestDegree: DegreeLevel;
  universityName: string;
  employmentStatus: 'employed' | 'seeking_opportunities' | 'pursuing_postgraduate' | 'freelancer';
  diasporaDetails?: {
    country: string;
    returnInterest: 'immediate' | 'medium_term' | 'remote_only' | 'undecided';
    remoteMentoring: boolean;
    trainingInterest: boolean;
    investmentInterest: boolean;
  };
  privacySettings: {
    profileVisibility: 'masked' | 'verified_employers_only' | 'private';
    allowContactRequests: boolean;
    shareTranscriptConsent: boolean;
  };
}

export interface DigitalCredential {
  credentialId: string; // e.g. SL-CERT-2025-UOH-44910
  talentId: string;
  studentName: string;
  studentNameSo: string;
  universityName: string;
  universityAcronym: string;
  degreeLevel: DegreeLevel;
  programmeName: string;
  fieldOfStudy: string;
  graduationDate: string;
  honorsGrade: string;
  verificationStatus: VerificationStatus;
  qrCodeToken: string;
  cryptographicSignature: string;
  issuingDean: string;
  registrarOfficer: string;
  nationalRegistrySeal: string;
  documentType: 'Degree Certificate' | 'Higher Diploma' | 'Master of Science' | 'PhD Diploma';
}

export interface CompanyEmployer {
  id: string;
  name: string;
  sector: string;
  headquarters: string;
  registrationNumber: string;
  verifiedStatus: 'verified_enterprise' | 'pending_verification';
  authorizedRepresentative: string;
  contactEmail: string;
  activeVacanciesCount: number;
}

export interface Vacancy {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  sector: string;
  degreeRequired: DegreeLevel;
  fieldOfStudy: string;
  requiredSkills: string[];
  minExperienceYears: number;
  location: string;
  employmentType: 'Full-time' | 'Contract' | 'Graduate Trainee' | 'Internship';
  deadline: string;
  postedDate: string;
  applicantsCount: number;
  status: 'open' | 'closed';
  description: string;
}

export interface ContactRequest {
  id: string;
  employerId: string;
  employerName: string;
  talentId: string;
  candidateNameMasked: string;
  candidateTitle: string;
  vacancyTitle: string;
  message: string;
  requestedDate: string;
  status: 'pending' | 'approved' | 'declined';
  contactDetailsDisclosed?: {
    fullName: string;
    email: string;
    phone: string;
  };
}

export interface JobApplication {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  companyName: string;
  talentId: string;
  candidateNameMasked: string;
  appliedDate: string;
  matchScore: number;
  matchBreakdown: {
    degreeMatch: boolean;
    skillsMatched: string[];
    experienceSufficient: boolean;
    locationMatch: boolean;
  };
  status: 'submitted' | 'under_review' | 'shortlisted' | 'not_selected';
}

export interface NotificationLog {
  id: string;
  channel: 'sms' | 'email' | 'whatsapp';
  recipientMasked: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'delivered' | 'processing' | 'failed';
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  institution: string;
  action: string;
  targetResource: string;
  details: string;
  tamperSealHash: string;
}

export interface SkillsGapItem {
  sector: string;
  skillName: string;
  availableTalentCount: number;
  employerDemandCount: number;
  universityAnnualOutput: number;
  gapStatus: 'critical_shortage' | 'moderate_shortage' | 'balanced' | 'surplus';
  nationalPriority: 'High' | 'Medium' | 'Standard';
}
