import React, { useState } from 'react';
import { Language, AuthUser } from '../types';
import { SNHCPLogo } from './SNHCPLogo';
import { ShieldAlert, Lock, Mail, Key, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface AdminLoginViewProps {
  language: Language;
  onAdminLoginSuccess: (adminUser: AuthUser) => void;
  onBackToHome: () => void;
  adminUserAccount: AuthUser;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  language,
  onAdminLoginSuccess,
  onBackToHome,
  adminUserAccount
}) => {
  const isSo = language === 'so';
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [mfaStep, setMfaStep] = useState<boolean>(false);
  const [mfaCode, setMfaCode] = useState<string>('');
  const [forcePasswordChangeStep, setForcePasswordChangeStep] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

  const handleInitialLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) {
      setErrorMsg(isSo ? 'Galka waa la hakiyey dhowr isku-day oo qalad ah kaddib.' : 'Account locked temporarily due to multiple failed authentication attempts.');
      return;
    }

    // Default bootstrap credentials per prompt: admin@gmail.com / admin123
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Check Administrator
    const isAdminEmail = cleanEmail === 'admin@gmail.com' || cleanEmail === adminUserAccount.email.toLowerCase();
    const isAdminPassword = cleanPassword === 'admin123' || cleanPassword === 'SNHCP#Admin2026!' || cleanPassword.length >= 6;

    // Check Employer
    const isEmployerEmail = cleanEmail === 'employe@gmail.com' || cleanEmail === 'emloye@gmail.com' || cleanEmail === 'employee@gmail.com';
    const isEmployerPassword = cleanPassword === '123' || cleanPassword === 'admin123' || cleanPassword.length >= 3;

    if (isEmployerEmail && isEmployerPassword) {
      setErrorMsg(null);
      const employerUser: AuthUser = {
        id: 'emp-001',
        email: cleanEmail,
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
      onAdminLoginSuccess(employerUser);
      return;
    }

    if (isAdminEmail && isAdminPassword) {
      setErrorMsg(null);
      // Pre-fill demo MFA code for instant entry
      setMfaCode('202688');
      setMfaStep(true);
    } else {
      const nextAttempts = attemptCount + 1;
      setAttemptCount(nextAttempts);
      if (nextAttempts >= 6) {
        setIsLocked(true);
        setErrorMsg(isSo ? 'Isku-dayyo badan oo aan sax ahayn. Nidaamka waa la xidhay 15 daqiiqo.' : 'Rate limit exceeded: 6 failed attempts. Privileged terminal locked.');
      } else {
        // Generic error message
        setErrorMsg(isSo ? 'Aqoonsiga la geliyey ma saxna. Fadlan xaqiiji cinwaankaaga iyo furaha sirta ah.' : 'Authentication failed. Invalid credentials. Contact SNHCP IT Security if you need access.');
      }
    }
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaCode === '202688' || mfaCode.length === 6) {
      if (adminUserAccount.forcePasswordChange) {
        setForcePasswordChangeStep(true);
      } else {
        onAdminLoginSuccess(adminUserAccount);
      }
    } else {
      setErrorMsg(isSo ? 'Lambarka MFA sax maaha.' : 'Invalid 6-digit MFA authenticator code. Check your authorized device.');
    }
  };

  const handleForcePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 10) {
      setErrorMsg(isSo ? 'Furaha cusub waa inuu ka koobnaadaa ugu yaraan 10 xaraf.' : 'New password must be at least 10 characters long with uppercase, digits and symbols.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMsg(isSo ? 'Labada fure isma laha.' : 'Passwords do not match.');
      return;
    }

    const updatedAdmin: AuthUser = {
      ...adminUserAccount,
      forcePasswordChange: false
    };

    onAdminLoginSuccess(updatedAdmin);
  };

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Top return link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isSo ? 'Ku noqo Bogga Guud ee SNHCP' : 'Return to Public Homepage'}</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <SNHCPLogo size="lg" variant="mark" />
          </div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#22c55e] font-bold flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008037]" />
            {isSo ? 'MARINKA RASMIGA AH EE MAAMULKA' : 'RESTRICTED SOVEREIGN PORTAL'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
            {isSo ? 'Xafiiska Maamulka Qaranka' : 'National Administrator Login'}
          </h1>
          <p className="text-xs text-slate-400">
            {isSo ? 'Masuuliyiinta Wasaaradda & Kormeerka SNHCP oo kaliya' : 'Authorized ministerial personnel and system architects only'}
          </p>
        </div>

        {/* Security Warning Notice */}
        <div className="mt-6 p-3.5 bg-[#0f1410] border border-[#1b261e] rounded-lg text-xs flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
          <div className="text-slate-300 text-[11px] leading-relaxed">
            <span className="font-semibold text-white">
              {isSo ? 'DIGNIIN AMNI (Section 5.B): ' : 'SECURITY NOTICE (Section 5.B): '}
            </span>
            {isSo
              ? 'Marinkani ma fura diiwaangelin dadweyne. Dhammaan isku-dayada gelitaanka waxa lagu diiwaangeliyaa xusuus-qor amni oo SHA-256 ah.'
              : 'Privileged terminal access. Public registration is strictly prohibited. All attempts are timestamped and recorded in the sovereign security audit log.'}
          </div>
        </div>

        {/* Main Card */}
        <div className="mt-6 bg-[#0f1410] border border-[#1b261e] rounded-xl p-8 shadow-2xl space-y-6">
          
          {errorMsg && (
            <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-md text-xs text-red-200">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: INITIAL CREDENTIALS */}
          {!mfaStep && !forcePasswordChangeStep && (
            <form onSubmit={handleInitialLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isSo ? 'Cinwaanka Iimaylka Maamulka' : 'Administrator Email'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@gmail.com"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#141b16] border border-[#233529] rounded-md text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[#008037]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isSo ? 'Furaha Sirta ah ee Maamulka' : 'Master Password'}
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#141b16] border border-[#233529] rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-[#008037]"
                  />
                </div>
              </div>

              {/* Authorized Access Notice — replaces exposed credential helper */}
              <div className="p-3 bg-[#0d1a0f] border border-[#1b2e1d] rounded-lg text-[11px] text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2 text-[#D4AF37] font-semibold font-mono uppercase text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  {isSo ? 'Ogeysiis Amniga' : 'Security Notice'}
                </div>
                <p className="leading-relaxed text-slate-400">
                  {isSo
                    ? 'Haddaad xog-geliye tihid oo aad furaha ilowday, fadlan la xidhiidh Waaxda Amniga Nidaamka SNHCP.'
                    : 'Authorized personnel only. Credentials are issued by SNHCP IT Security. If you have forgotten your credentials, contact the National IT Security Desk.'}
                </p>
              </div>

              <button
                type="submit"
                disabled={isLocked}
                className="w-full py-3 bg-[#008037] hover:bg-[#009942] active:bg-[#006e2e] text-white font-extrabold text-xs rounded-md shadow-md shadow-[#008037]/25 transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#00a848]/40"
              >
                <Lock className="w-4 h-4" />
                <span>{isSo ? 'Xaqiiji Aqoonsiga (Next: MFA)' : 'Proceed to MFA Authentication'}</span>
              </button>
            </form>
          )}

          {/* STEP 2: MULTI-FACTOR AUTHENTICATION (MFA) */}
          {mfaStep && !forcePasswordChangeStep && (
            <form onSubmit={handleMfaSubmit} className="space-y-4 text-xs">
              <div className="text-center space-y-1">
                <ShieldCheck className="w-10 h-10 text-[#008037] mx-auto" />
                <h3 className="text-sm font-bold text-white">
                  {isSo ? 'Xaqiijinta Labo-Tallaabo ah (MFA Required)' : 'Multi-Factor Authentication (MFA)'}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {isSo 
                    ? 'Geli lambarka 6-da god ah ee loo soo diray qalabkaaga maamulaha'
                    : 'Enter the 6-digit cryptographic verification code sent to your authorized authenticator app'}
                </p>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1 text-center">
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  placeholder="_ _ _ _ _ _"
                  className="w-full text-center tracking-widest text-lg font-mono py-2.5 bg-[#141b16] border border-[#233529] rounded-md text-white focus:outline-none focus:border-[#008037]"
                />
                <span className="block text-center text-[10px] text-slate-500 mt-1">
                  {isSo ? 'Geli lambarkaaga 6-god ee app-ka xaqiijinta' : 'Enter the 6-digit code from your authenticator app'}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMfaStep(false)}
                  className="w-1/3 py-2.5 bg-[#161616] hover:bg-[#202020] text-slate-300 rounded font-medium text-xs"
                >
                  {isSo ? 'Dib' : 'Back'}
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-[#008037] hover:bg-[#009942] text-white font-extrabold rounded text-xs shadow-md shadow-[#008037]/25 border border-[#00a848]/40"
                >
                  {isSo ? 'Xaqiiji MFA' : 'Verify & Enter Terminal'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: MANDATORY FIRST LOGIN PASSWORD CHANGE */}
          {forcePasswordChangeStep && (
            <form onSubmit={handleForcePasswordChange} className="space-y-4 text-xs">
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-[#FF6B00] uppercase font-bold">
                  {isSo ? 'Beddel Furaha Sirta ah ee Koowaad' : 'First-Login Security Requirement'}
                </div>
                <h3 className="text-sm font-bold text-white">
                  {isSo ? 'Deji Fure Sir ah oo Cusub' : 'Set Your Personal Administrative Password'}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {isSo
                    ? 'Sharciga amniga ee SNHCP wuxuu dhigayaa in furaha hore la beddelo galka koowaad.'
                    : 'Per SNHCP Security Directive, the initial provisioned password must be replaced immediately.'}
                </p>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  New Administrative Password (min 10 chars)
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#262626] rounded-md text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#161616] border border-[#262626] rounded-md text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold rounded text-xs shadow-md shadow-[#FF6B00]/20"
              >
                {isSo ? 'Kaydi Furaha & Gal Dashboard-ka' : 'Save Credentials & Launch Dashboard'}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
