import React from 'react';
import { UserRole, Language } from '../types';

interface RoleSwitcherBarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  language: Language;
}

export const RoleSwitcherBar: React.FC<RoleSwitcherBarProps> = ({
  currentRole,
  onSelectRole,
  language
}) => {
  const isSo = language === 'so';

  const roles: { id: UserRole; labelEn: string; labelSo: string; roleTagEn: string; roleTagSo: string }[] = [
    {
      id: 'national_authority',
      labelEn: 'National Oversight',
      labelSo: 'Kormeerka Qaranka',
      roleTagEn: 'Ministry & Commission View',
      roleTagSo: 'Wasaaradda & Kormeerka'
    },
    {
      id: 'university_admin',
      labelEn: 'University Registrar',
      labelSo: 'Diiwaan-hayaha Jaamacadda',
      roleTagEn: 'UoH Academic Senate Portal',
      roleTagSo: 'Maamulka Diiwaanka UoH'
    },
    {
      id: 'citizen_talent',
      labelEn: 'Citizen & Diaspora',
      labelSo: 'Aqoonyahan & Qurbajoog',
      roleTagEn: 'Talent ID & Credential Vault',
      roleTagSo: 'Aqoonsiga & Shahaadooyinka'
    },
    {
      id: 'employer',
      labelEn: 'Verified Employer',
      labelSo: 'Shirkadaha & Loo-shaqeeyaha',
      roleTagEn: 'Telesom Recruiter Portal',
      roleTagSo: 'Qorista Shaqaalaha'
    },
    {
      id: 'public_verifier',
      labelEn: 'Public Verifier',
      labelSo: 'Hubinta Shahaadada',
      roleTagEn: 'Instant QR Authentication',
      roleTagSo: 'Hubinta Rasmiga ah ee QR'
    }
  ];

  return (
    <div className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/60 py-2 px-4 sm:px-6 lg:px-8 text-xs transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">
          <span className="font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
            {isSo ? 'Aragtida Nidaamka:' : 'System Perspective:'}
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-500 dark:text-slate-400">
            {isSo ? 'Kala beddel qaybaha kala duwan ee madashu u adeegto' : 'Switch institutional role to preview specialized module capabilities'}
          </span>
        </div>

        {/* Segmented Interactive Control */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0">
          {roles.map((r) => {
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => onSelectRole(r.id)}
                className={`px-3 py-1.5 rounded-md font-medium text-xs transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-emerald-900 text-white shadow-xs font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={isSo ? r.roleTagSo : r.roleTagEn}
              >
                {isSo ? r.labelSo : r.labelEn}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
