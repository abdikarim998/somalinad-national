# SNHCP — Project Implementation Progress & Architecture
**Platform:** Somaliland National Human Capital Platform (SNHCP)  
**Version:** 1.0 (November 2026)  
**Status:** Public Homepage Redesign, RBAC, Authentication & Administration Active  

---

## 1. Executive Summary & Design Transformation

The public-facing homepage and authentication infrastructure of the Somaliland National Human Capital Platform have been redesigned and engineered according to the luxury dark visual standard inspired by the GOB Store aesthetic:

- **Color Palette:** Deep black `#080808` canvas, structural surface black `#111111`, Somaliland-inspired vibrant orange `#FF6B00` primary action accent, crisp white secondary accent, warm neutral text.
- **Typography:** Large editorial serif headlines (`Playfair Display`, `Cormorant Garamond`) paired with modern, clean sans-serif UI typography (`Plus Jakarta Sans`, `Inter`) and tabular data numerals (`JetBrains Mono`).
- **Brand Identity:** Original SNHCP brand mark incorporating the Somaliland Horn of Africa coastline contour, ascending human capital pathway, and central sovereign star emblem in light and dark variants.

---

## 2. Completed Architecture & Module Scope

### A. Public Homepage Redesign
- **Top Navigation Bar:** Sticky deep black navigation with SNHCP wordmark, Home, About, Our Services, How It Works, Support, language toggle (`EN | SO`), Sign In, and prominent orange Register button.
- **Hero Section:** Two-column editorial composition featuring the headline:
  `THE FUTURE OF SOMALILAND'S HUMAN CAPITAL`
  with supporting Somali/English prose, primary CTA ("CREATE YOUR ACCOUNT"), secondary platform explore, and 3 concise indicators (National Education Registry, Verified Academic Credentials, National Talent & Employment).
- **Hero Right Visual:** High-fidelity architectural representation of modern university research and student collaboration in Hargeisa.
- **Platform Statistics:** Real-time synchronized indicators (`Registered Universities`, `Verified Graduates`, `Registered Talent`, `Active Employers`).
- **About Section:** Explains the national problem and structural mandate with 3 core feature cards.
- **Our Services:** 8 services cards with interactive exploration links.
- **How It Works:** 4-step workflow from matriculation to verified career connectivity.
- **Security & Trust:** 6 principles (Protected Personal Information, Secure Academic Records, Controlled Data Sharing, Verified Institutional Records, Audited Access, Candidate Consent).
- **Support & FAQs:** Configurable support placeholders, contact inquiry form, and interactive accordions.
- **Footer:** Full platform links, legal terms, copyright 2026.

### B. Two-Tiered Authentication System (Section 5)
1. **Public Citizen / Student / Graduate Registration:**
   - Multi-field registration (Name, Email, Phone, Category, Residence, Passwords).
   - Enforces default `USER` role. **Never allows public creation of ADMIN, UNIVERSITY_ADMIN, or EMPLOYER accounts.**
   - Email uniqueness check, password strength validation, rate-limiting safeguards.
   - Redirects authenticated user immediately to `/dashboard`.
2. **Restricted Administrator Login (`/admin/login`):**
   - Dedicated private entry route.
   - Initial bootstrap email: `admin@gmail.com`.
   - Initial bootstrap seed: `SNHCP#Admin2026!`.
   - Multi-Factor Authentication (MFA) step with TOTP verification code.
   - Forced password change on first administrative login.
   - Audit event logging for all privileged sessions.
3. **Restricted Institutional Invitations (Section 5.C):**
   - Universities and Employers cannot register publicly.
   - Authorized administrators issue one-time 7-day invitation tokens.

### C. Role-Based Access Control (RBAC) (Section 6)
All 8 required roles defined and enforced:
1. `SUPER_ADMIN`
2. `ADMIN`
3. `UNIVERSITY_ADMIN`
4. `UNIVERSITY_STAFF`
5. `EMPLOYER_ADMIN`
6. `EMPLOYER_STAFF`
7. `USER`
8. `GOVERNMENT_VIEWER`

### D. Administration Dashboard (`/admin/dashboard`) (Section 7)
- **Overview:** 8 real metrics, recent administrative audit log.
- **User Management:** Search, filter by role/status, suspend and reactivate accounts.
- **University Management:** Accredited university directory and invitation token issuance.
- **Employer Management:** Verified company accounts review and invitation management.
- **Verification Review:** Queue of pending academic credentials, supporting evidence review, and ministerial approval/rejection.
- **Security & Audit:** Tamper-evident access log with SHA-256 seals.
- **Platform Settings:** SMS, email, and MFA policy configuration.

### E. User Dashboard (`/dashboard`) (Section 8)
- Complete self-service portal for citizens/graduates.
- My Certificates (with QR viewer), My Education, My Skills, Opportunities, Contact Requests (with candidate consent approval/rejection), Notifications, and Privacy Controls.

---

## 3. Environment Variables & Bootstrap Instructions

Configure the following variables in deployment `.env`:

```bash
INITIAL_ADMIN_EMAIL="admin@gmail.com"
INITIAL_ADMIN_PASSWORD="<secure-secret-configured-outside-source-control>"

SUPPORT_CONTACT_EMAIL="support@snhcp.govsomaliland.org"
SUPPORT_CONTACT_PHONE="+252 63 000 0000"
```

### Initial Administrator Login Verification:
1. Navigate to `/admin/login`.
2. Enter email: `admin@gmail.com` and password: `SNHCP#Admin2026!`.
3. Complete MFA prompt (demo key: `202688`).
4. Set new personal administrative password.
5. Launch Administrator Dashboard.

---

## 4. Professional Model Designs & System-Wide Enhancements (Section 11)

### A. Sovereign Credential Holographic Model (`CredentialInspectionModal.tsx`)
- High-security sovereign parchment diploma model with guilloche background motifs.
- Somaliland Coat of Arms header with Republic of Somaliland & MOHESR official typography.
- Dual verifiable cryptographic signatories (Dean of Academic Faculty & University Senate Registrar).
- Verifiable dynamic QR code seal with live simulation validator.
- Cryptographic SHA-256 block hash inspector with one-click copy.
- Official PDF export and browser print-styling support (`@media print`).

### B. Sovereign Citizen Talent Smart ID Card Model (`TalentCardModal.tsx`)
- 3D-styled physical smart card model with simulated EMV microchip and Somaliland star emblem.
- Biometric verification indicators, masked National ID, unique Talent ID, and NFC/QR credentials.
- Privacy-first data protection notice explaining candidate consent mandates.

### C. Candidate Privacy Clearance & Contact Modal (`CandidateContactModal.tsx`)
- Article 14 Candidate Privacy protocol integration.
- Recruiter inquiry drafting with role designation and custom justification.
- Automated notification dispatch to candidate SMS and portal inbox.

### D. Cryptographic Audit Block Inspector (`AuditInspectionModal.tsx`)
- Immutable ledger block review with SHA-256 integrity seal inspection.
- Officer and institutional node attribution with Merkle consensus status.

### E. Unified Sovereign Luxury Dark System Theme
- Standardized all institutional modules (`ModuleCredentialVerification`, `ModuleEducationRegistry`, `ModuleUniversityPortal`, `ModuleTalentRegistry`, `ModuleEmployerPortal`, `ModuleEmploymentExchange`, `ModuleHumanCapitalIntelligence`, `ModuleSecurityNotificationsAudit`) to the luxury dark standard (`#080808` canvas, `#111111` card surfaces, `#222222` borders, `#FF6B00` & `#008037` sovereign accents).
- Added `<html class="dark">` in `index.html` ensuring dark mode is universally active across all browsers.
- Connected all direct routes (`/education-registry`, `/talent-registry`, `/credentials`, `/employment-exchange`, `/university-portal`, `/intelligence`) to the primary navigation bar.
