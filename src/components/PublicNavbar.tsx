import React, { useState } from 'react';
import { SNHCPLogo } from './SNHCPLogo';
import { Language, AuthUser } from '../types';
import { Menu, X, Globe, User, LogOut, Shield, ChevronDown } from 'lucide-react';

interface PublicNavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  language: Language;
  onToggleLanguage: () => void;
  currentUser: AuthUser | null;
  onOpenSignIn: () => void;
  onOpenRegister: () => void;
  onSignOut: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  currentRoute,
  onNavigate,
  language,
  onToggleLanguage,
  currentUser,
  onOpenSignIn,
  onOpenRegister,
  onSignOut
}) => {
  const isSo = language === 'so';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', labelEn: 'Home', labelSo: 'Hoyga' },
    { id: 'about', labelEn: 'About', labelSo: 'Ku Saabsan' },
    { id: 'education-registry', labelEn: 'Education Registry', labelSo: 'Diiwaanka Jaamacadaha' },
    { id: 'talent-registry', labelEn: 'Talent Directory', labelSo: 'Diiwaanka Hibada' },
    { id: 'credentials', labelEn: 'Verify Credential', labelSo: 'Hubi Shahaado' },
    { id: 'employment-exchange', labelEn: 'Job Exchange', labelSo: 'Suuqa Shaqada' },
    { id: 'support', labelEn: 'Support', labelSo: 'Taageerada' },
  ];

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-[#1b1b1b] transition-colors">
      {/* Somaliland National Colors Top Line */}
      <div className="h-[2.5px] w-full flex">
        <div className="flex-1 bg-[#008037]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#C8102E]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: SNHCP Logo & Brand Name */}
          <div className="flex items-center shrink-0">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 focus:outline-none group text-left cursor-pointer"
            >
              <SNHCPLogo size="md" variant="full" />
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm font-medium transition-colors tracking-wide relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isSo ? link.labelSo : link.labelEn}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#008037] rounded-full shadow-[0_0_8px_#008037]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions (Language toggle, Sign In, Register / User Session) */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            {/* Language Toggle */}
            <button
              onClick={onToggleLanguage}
              className="px-2.5 py-1 text-xs font-semibold rounded-md border border-[#262626] hover:border-[#D4AF37] bg-[#111111] text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              title={isSo ? 'Switch to English' : 'U beddel Af-Soomaali'}
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isSo ? 'SO' : 'EN'}</span>
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-[#141414] border border-[#262626] text-xs font-semibold text-white hover:border-[#008037] cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-[#008037]/20 text-[#22c55e] flex items-center justify-center font-bold text-xs border border-[#008037]/40">
                    {currentUser.fullName[0]}
                  </div>
                  <span className="max-w-[120px] truncate">{currentUser.fullName}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md bg-[#111111] border border-[#222222] shadow-2xl py-2 z-50 text-xs text-slate-200">
                    <div className="px-4 py-2 border-b border-[#222222]">
                      <div className="font-bold text-white truncate">{currentUser.fullName}</div>
                      <div className="text-[11px] text-slate-400 truncate">{currentUser.email}</div>
                      <div className="mt-1 text-[10px] uppercase font-mono tracking-wider text-[#D4AF37]">
                        {currentUser.role.replace('_', ' ')}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        const cleanRole = currentUser.role;
                        const cleanEmail = currentUser.email.toLowerCase();
                        if (cleanRole === 'SUPER_ADMIN' || cleanRole === 'ADMIN' || cleanEmail === 'admin@gmail.com') {
                          onNavigate('admin-dashboard');
                        } else if (cleanRole === 'EMPLOYER_ADMIN' || cleanRole === 'EMPLOYER_STAFF' || cleanEmail.includes('employe') || cleanEmail.includes('emloye')) {
                          onNavigate('employer-portal');
                        } else {
                          onNavigate('dashboard');
                        }
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#1a1a1a] flex items-center gap-2 cursor-pointer text-slate-200 hover:text-white"
                    >
                      <User className="w-3.5 h-3.5 text-[#008037]" />
                      <span>
                        {currentUser.role === 'EMPLOYER_ADMIN'
                          ? (isSo ? 'Geli Qaybta Shirkadda (Employer)' : 'Employer Recruiter Portal')
                          : currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'ADMIN'
                          ? (isSo ? 'Xafiiska Maamulka (Admin)' : 'Administrator Console')
                          : (isSo ? 'Geli Qaybtaada (Dashboard)' : 'Talent Dashboard')}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onSignOut();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#1a1a1a] text-red-400 flex items-center gap-2 border-t border-[#222222] cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{isSo ? 'Ka Bax (Sign Out)' : 'Sign Out'}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={onOpenSignIn}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {isSo ? 'Gal (Sign In)' : 'Sign In'}
                </button>

                <button
                  onClick={onOpenRegister}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-[#008037] hover:bg-[#009942] active:bg-[#006e2e] rounded-md transition-all shadow-md shadow-[#008037]/25 cursor-pointer border border-[#00a848]/40"
                >
                  {isSo ? 'Is Diiwaangeli' : 'Register'}
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-3">
            <button
              onClick={onToggleLanguage}
              className="px-2 py-1 text-xs font-semibold rounded bg-[#111111] border border-[#262626] text-slate-300"
            >
              {isSo ? 'SO' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0c0c0c] border-b border-[#222222] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 rounded-md text-sm font-medium ${
                  currentRoute === link.id
                    ? 'bg-[#181818] text-[#FF6B00] font-bold'
                    : 'text-slate-300 hover:bg-[#141414] hover:text-white'
                }`}
              >
                {isSo ? link.labelSo : link.labelEn}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#1f1f1f] flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const cleanRole = currentUser.role;
                    const cleanEmail = currentUser.email.toLowerCase();
                    if (cleanRole === 'SUPER_ADMIN' || cleanRole === 'ADMIN' || cleanEmail === 'admin@gmail.com') {
                      onNavigate('admin-dashboard');
                    } else if (cleanRole === 'EMPLOYER_ADMIN' || cleanRole === 'EMPLOYER_STAFF' || cleanEmail.includes('employe') || cleanEmail.includes('emloye')) {
                      onNavigate('employer-portal');
                    } else {
                      onNavigate('dashboard');
                    }
                  }}
                  className="w-full py-2.5 px-3 rounded-md bg-[#008037] text-white font-bold text-sm text-center shadow-md shadow-[#008037]/25"
                >
                  {currentUser.role === 'EMPLOYER_ADMIN'
                    ? (isSo ? 'Geli Qaybta Shirkadda' : 'Open Employer Portal')
                    : currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'ADMIN'
                    ? (isSo ? 'Geli Maamulka' : 'Open Admin Console')
                    : (isSo ? 'Geli Dashboard' : 'Open Dashboard')}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignOut();
                  }}
                  className="w-full py-2 px-3 rounded-md bg-[#181818] text-red-400 font-medium text-xs text-center"
                >
                  {isSo ? 'Ka Bax' : 'Sign Out'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSignIn();
                  }}
                  className="w-full py-2.5 px-3 rounded-md bg-[#141414] border border-[#2a2a2a] text-white font-semibold text-sm text-center"
                >
                  {isSo ? 'Gal (Sign In)' : 'Sign In'}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="w-full py-2.5 px-3 rounded-md bg-[#008037] text-white font-bold text-sm text-center shadow-md shadow-[#008037]/25"
                >
                  {isSo ? 'Is Diiwaangeli (Citizen Register)' : 'Register Account'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
