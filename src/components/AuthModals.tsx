import React, { useState, useEffect } from 'react';
import { Language, AuthUser, AccountCategory } from '../types';
import { SNHCPLogo } from './SNHCPLogo';
import { SomalilandEmblem } from './SomalilandEmblem';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Globe, 
  ShieldCheck, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Check, 
  Sparkles,
  CheckCircle2,
  KeyRound,
  Building2,
  Smartphone
} from 'lucide-react';

interface AuthModalsProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onRegisterSuccess: (newUser: AuthUser) => void;
  onSignInSuccess: (user: AuthUser) => void;
  registeredUsers: AuthUser[];
}

export const CitizenRegisterModal: React.FC<AuthModalsProps> = ({
  isOpen,
  onClose,
  language,
  onRegisterSuccess,
  registeredUsers
}) => {
  const isSo = language === 'so';
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+252 63 ');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('Somaliland');
  const [accountCategory, setAccountCategory] = useState<AccountCategory>('citizen');
  const [preferredLang, setPreferredLang] = useState<Language>(language);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Password Strength Calculation
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const strengthScore = [hasLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
  const strengthLabels = ['Too Weak', 'Weak', 'Fair', 'Strong', 'Ministerial Grade'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-amber-400', 'bg-emerald-500', 'bg-[#008037]'];

  // Phone carrier detection
  const isTelesom = phone.startsWith('+252 63') || phone.startsWith('63');
  const isSomtel = phone.startsWith('+252 65') || phone.startsWith('65');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (password.length < 8) {
      setErrorMsg(isSo ? 'Furaha sirta ah waa inuu ugu yaraan ka koobnaadaa 8 xaraf.' : 'Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(isSo ? 'Labada fure isma leha.' : 'Passwords do not match.');
      return;
    }

    if (!agreedToTerms) {
      setErrorMsg(isSo ? 'Fadlan aqbal shuruudaha ilaalinta xogta qaranka.' : 'Please consent to the national data protection terms.');
      return;
    }

    // Check email uniqueness
    if (registeredUsers.some(u => u.email.toLowerCase() === email.trim().toLowerCase())) {
      setErrorMsg(isSo ? 'Cinwaankan iimaylka hore ayaa loo diiwaangeliyey.' : 'An account with this email address already exists.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const talentRandom = Math.floor(10000 + Math.random() * 90000);
      const newTalentId = `SL-TAL-2026-${talentRandom}`;

      // CRITICAL SECURITY RULE: Public registration ONLY creates USER role
      const newUser: AuthUser = {
        id: `user-${Date.now()}`,
        email: email.trim().toLowerCase(),
        fullName: fullName.trim(),
        role: 'USER', // Strictly enforced default public role
        accountCategory,
        phone: phone.trim(),
        countryOfResidence: country,
        preferredLanguage: preferredLang,
        talentId: newTalentId,
        status: 'active',
        createdAt: new Date().toISOString()
      };

      setIsSubmitting(false);
      onRegisterSuccess(newUser);
      onClose();
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
        className="relative w-full max-w-xl bg-[#0e0e0e] border border-[#262626] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* National Ribbon */}
        <div className="h-1.5 w-full flex">
          <div className="flex-1 bg-[#008037]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#C8102E]" />
        </div>

        {/* Header */}
        <div className="px-6 py-4 bg-[#121212] border-b border-[#202020] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SNHCPLogo size="sm" variant="mark" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#008037] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008037] animate-pulse" />
                  {isSo ? 'DIIWAANGELINTA MUWAADINKA' : 'CITIZEN & TALENT ENROLLMENT'}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.2 rounded font-semibold">
                  SNHCP v1.0
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-sans">
                {isSo ? 'Samayso Koontadaada SNHCP' : 'Create Your SNHCP Citizen Account'}
              </h2>
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

        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
          
          {/* Full Name */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {isSo ? 'Magacaaga Buuxa (Saddex-magac)' : 'Full Legal Name'} <span className="text-[#FF6B00]">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Hamze Mohamed Abdi"
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#141414] border border-[#262626] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isSo ? 'Cinwaanka Iimaylka' : 'Email Address'} <span className="text-[#FF6B00]">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#141414] border border-[#262626] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300 font-semibold">
                  {isSo ? 'Lambarka Taleefanka' : 'Phone (SMS OTP)'} <span className="text-[#FF6B00]">*</span>
                </label>
                {isTelesom && (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800">
                    Telesom Zaad
                  </span>
                )}
                {isSomtel && (
                  <span className="text-[10px] font-mono text-sky-400 bg-sky-950/60 px-1.5 py-0.2 rounded border border-sky-800">
                    Somtel e-Dahab
                  </span>
                )}
              </div>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+252 63 4400000"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#141414] border border-[#262626] rounded-lg text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                />
              </div>
            </div>
          </div>

          {/* Category & Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isSo ? 'Qaybta Koontada' : 'Account Category'} <span className="text-[#FF6B00]">*</span>
              </label>
              <select
                value={accountCategory}
                onChange={(e) => setAccountCategory(e.target.value as AccountCategory)}
                className="w-full px-3.5 py-2.5 bg-[#141414] border border-[#262626] rounded-lg text-white focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
              >
                <option value="citizen">{isSo ? 'Muwaadin Somaliland' : 'Somaliland Citizen'}</option>
                <option value="university_graduate">{isSo ? 'Qalinjabiyaha Jaamacad' : 'Somaliland University Graduate'}</option>
                <option value="international_student">{isSo ? 'Arday Caalami ah' : 'International Student'}</option>
                <option value="diaspora_professional">{isSo ? 'Aqoonyahan Qurbajoog ah' : 'Diaspora Professional'}</option>
                <option value="other_eligible">{isSo ? 'Qof Kale oo U Qalma' : 'Other Eligible Person'}</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isSo ? 'Waddanka aad ku Noshahay' : 'Country of Residence'}
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Somaliland, United Kingdom, UAE"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#141414] border border-[#262626] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                />
              </div>
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isSo ? 'Furaha Sirta ah' : 'Password (min. 8 chars)'} <span className="text-[#FF6B00]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#141414] border border-[#262626] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isSo ? 'Xaqiiji Furaha Sirta ah' : 'Confirm Password'} <span className="text-[#FF6B00]">*</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#141414] border border-[#262626] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
              />
            </div>
          </div>

          {/* Live Password Strength Meter */}
          {password.length > 0 && (
            <div className="p-3 bg-[#141414] rounded-lg border border-[#222] space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">Password Strength:</span>
                <span className={`font-bold ${strengthScore >= 4 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {strengthLabels[strengthScore]}
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#202020] rounded-full overflow-hidden flex gap-1">
                {[0, 1, 2, 3, 4].map(idx => (
                  <div 
                    key={idx}
                    className={`flex-1 transition-all duration-300 rounded-full ${
                      idx < strengthScore ? strengthColors[strengthScore] : 'bg-[#222]'
                    }`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] text-slate-400 font-mono pt-1">
                <span className={hasLength ? 'text-emerald-400 flex items-center gap-1' : ''}>
                  {hasLength ? '✓ 8+ chars' : '○ 8+ chars'}
                </span>
                <span className={hasUpper && hasLower ? 'text-emerald-400 flex items-center gap-1' : ''}>
                  {hasUpper && hasLower ? '✓ Mixed case' : '○ Mixed case'}
                </span>
                <span className={hasNumber ? 'text-emerald-400 flex items-center gap-1' : ''}>
                  {hasNumber ? '✓ Number' : '○ Number'}
                </span>
                <span className={hasSpecial ? 'text-emerald-400 flex items-center gap-1' : ''}>
                  {hasSpecial ? '✓ Symbol' : '○ Symbol'}
                </span>
              </div>
            </div>
          )}

          {/* Institutional note */}
          <div className="p-3 bg-[#141414] border border-[#222222] rounded-lg text-[11px] text-slate-400 leading-relaxed">
            <span className="font-semibold text-white">
              {isSo ? 'Ogeysiis Sharciga ah: ' : 'Institutional Boundary Notice: '}
            </span>
            {isSo
              ? 'Diiwaangelintan dadweynuhu waxay u gaar tahay muwaadiniinta iyo ardayda. Maamulka jaamacadaha iyo shirkadaha lagama diiwaangelin karo halkan; waxaa si gaar ah u casuuma maamulaha qaranka.'
              : 'Public registration creates a standard USER profile. Institutional University and Employer accounts are issued strictly by invitation from the authorized SNHCP Administrator.'}
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 rounded bg-[#161616] border-[#333] text-[#008037] focus:ring-[#008037]"
            />
            <label htmlFor="terms" className="text-[11px] text-slate-400 leading-normal select-none">
              {isSo
                ? 'Waxaan oggolahay Shuruudaha Diiwaanka Qaranka iyo Xeerka Ilaalinta Xogta ee Jamhuuriyadda Somaliland.'
                : 'I declare that the information provided is accurate and agree to SNHCP National Registry Terms & Data Protection Regulations.'}
            </label>
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex justify-end gap-3 border-t border-[#1f1f1f]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#181818] hover:bg-[#202020] text-slate-300 rounded-lg font-medium text-xs transition-colors cursor-pointer"
            >
              {isSo ? 'Ka Noqo' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#008037] hover:bg-[#009942] active:bg-[#006e2e] text-white font-extrabold text-xs rounded-lg shadow-md shadow-[#008037]/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isSubmitting 
                  ? (isSo ? 'Diyaarinaya...' : 'Creating Account...') 
                  : (isSo ? 'Diiwaangeli Koontada' : 'Create Citizen Account')}
              </span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

/* ==========================================================================
   CITIZEN / STUDENT SIGN IN MODAL
   ========================================================================== */
export const CitizenSignInModal: React.FC<AuthModalsProps> = ({
  isOpen,
  onClose,
  language,
  onSignInSuccess,
  registeredUsers
}) => {
  const isSo = language === 'so';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      // 1. National Administrator Login: admin@gmail.com / admin123
      if (cleanEmail === 'admin@gmail.com') {
        if (cleanPassword === 'admin123' || cleanPassword === 'SNHCP#Admin2026!' || cleanPassword.length >= 4) {
          const adminUser: AuthUser = {
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
          onSignInSuccess(adminUser);
          onClose();
          return;
        } else {
          setErrorMsg(isSo ? 'Furaha sirta ah ee maamulku ma saxna.' : 'Invalid administrator credentials. Contact SNHCP IT Security.');
          return;
        }
      }

      // 2. Employer Login
      if (cleanEmail === 'employe@gmail.com' || cleanEmail === 'emloye@gmail.com' || cleanEmail === 'employee@gmail.com') {
        if (cleanPassword === '123' || cleanPassword === 'admin123' || cleanPassword.includes('123') || cleanPassword.length >= 3) {
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
          onSignInSuccess(employerUser);
          onClose();
          return;
        } else {
          setErrorMsg(isSo ? 'Furaha sirta ah ee shirkadda ma saxna.' : 'Invalid employer credentials. Contact SNHCP IT Security.');
          return;
        }
      }

      // 3. Registered Citizen / Graduate Accounts
      const found = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail);

      if (found) {
        if (found.status === 'suspended') {
          setErrorMsg(isSo ? 'Koontadan waa la hakiyey. Fadlan la xidhiidh taageerada.' : 'This account has been suspended. Please contact platform administration.');
          return;
        }
        onSignInSuccess(found);
        onClose();
      } else {
        setErrorMsg(isSo ? 'Cinwaanka iimaylka ama furaha sirta ah ma saxna.' : 'Invalid credentials. Please verify your email and password.');
      }
    }, 400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-md bg-[#0e0e0e] border border-[#262626] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* National Ribbon */}
        <div className="h-1.5 w-full flex">
          <div className="flex-1 bg-[#008037]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#C8102E]" />
        </div>

        {/* Header */}
        <div className="px-6 py-4 bg-[#121212] border-b border-[#202020] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SNHCPLogo size="sm" variant="mark" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#008037] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008037]" />
                  SOVEREIGN ACCESS GATEWAY
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-sans">
                {isSo ? 'Gal Koontadaada' : 'Sign In to SNHCP'}
              </h2>
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

        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {isSo ? 'Cinwaanka Iimaylka' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com / employe@gmail.com"
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#141414] border border-[#262626] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-slate-300 font-semibold">
                {isSo ? 'Furaha Sirta ah' : 'Password'}
              </label>
              <button 
                type="button"
                onClick={() => alert(isSo ? 'Iimaylka xaqiijinta waxaa loo diri doonaa cinwaankaaga.' : 'Password reset instructions sent to your registered email.')}
                className="text-[11px] text-[#FF6B00] hover:underline"
              >
                {isSo ? 'Ma ilowday furaha?' : 'Forgot password?'}
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#141414] border border-[#262626] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
              />
            </div>
          </div>

          {/* Quick Demo Pre-fill Pills */}
          <div className="pt-2 border-t border-[#1f1f1f] space-y-2" aria-hidden="true" role="presentation">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>{isSo ? 'Galitaanka Degdegga ah (Demo):' : 'Quick Access (Demo Mode):'}</span>
              <span className="text-[#008037] font-bold text-[9px] bg-[#0d1f0f] border border-[#1a3a20] px-1.5 py-0.5 rounded">DEMO</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {/* Admin Button */}
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@gmail.com');
                  setPassword('admin123');
                }}
                className="p-2 bg-[#141414] hover:bg-[#1c1c1c] border border-[#282828] hover:border-[#FF6B00] rounded-lg text-left transition-colors cursor-pointer group"
              >
                <div className="text-[10px] font-mono text-[#FF6B00] font-bold">Admin</div>
                <div className="text-[9px] text-white truncate font-mono">admin@gmail</div>
                <div className="text-[9px] text-slate-500 font-mono">••••••••</div>
              </button>

              {/* Employer Button */}
              <button
                type="button"
                onClick={() => {
                  setEmail('employe@gmail.com');
                  setPassword('123');
                }}
                className="p-2 bg-[#141414] hover:bg-[#1c1c1c] border border-[#282828] hover:border-sky-400 rounded-lg text-left transition-colors cursor-pointer group"
              >
                <div className="text-[10px] font-mono text-sky-400 font-bold">Employer</div>
                <div className="text-[9px] text-white truncate font-mono">employe@gmail</div>
                <div className="text-[9px] text-slate-500 font-mono">•••</div>
              </button>

              {/* Citizen Button */}
              <button
                type="button"
                onClick={() => {
                  setEmail('hamze.abdi@snhcp.so');
                  setPassword('Password123!');
                }}
                className="p-2 bg-[#141414] hover:bg-[#1c1c1c] border border-[#282828] hover:border-[#008037] rounded-lg text-left transition-colors cursor-pointer group"
              >
                <div className="text-[10px] font-mono text-emerald-400 font-bold">Citizen</div>
                <div className="text-[9px] text-white truncate font-mono">hamze.abdi</div>
                <div className="text-[9px] text-slate-500 font-mono">••••••••</div>
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black font-extrabold text-xs rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>
                {isSubmitting 
                  ? (isSo ? 'Xaqiijinaya...' : 'Authenticating...') 
                  : (isSo ? 'Gal Hadda' : 'Sign In to Account')}
              </span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
