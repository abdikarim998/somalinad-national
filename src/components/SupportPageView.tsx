import React, { useState } from 'react';
import { Language } from '../types';
import { SupportSection } from './PublicHomepageSections';
import { 
  HelpCircle, 
  Key, 
  GraduationCap, 
  Briefcase, 
  Lock, 
  Mail, 
  Phone, 
  FileCheck,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

interface SupportPageViewProps {
  language: Language;
  onOpenRegister: () => void;
  onNavigate: (route: string) => void;
}

export const SupportPageView: React.FC<SupportPageViewProps> = ({
  language,
  onOpenRegister,
  onNavigate
}) => {
  const isSo = language === 'so';

  const supportGuides = [
    {
      icon: Key,
      titleEn: 'Account Registration & Login Help',
      titleSo: 'Caawimada Diiwaangelinta & Galka',
      descEn: 'Guidance for citizens creating their Talent ID and troubleshooting login issues.',
      descSo: 'Hagaha muwaadiniinta samaysanaya Talent ID iyo xallinta dhibaatooyinka galka.',
      actionTextEn: 'Read Registration Guide',
      actionTextSo: 'Akhri Hagaha'
    },
    {
      icon: GraduationCap,
      titleEn: 'Academic Record Inquiries',
      titleSo: 'Su\'aalaha Shahaadooyinka Jaamacadda',
      descEn: 'How to claim your verified graduate records and submit correction requests.',
      descSo: 'Sida loo codsado shahaadadaada qalinjabinta iyo sixidda macluumaadka.',
      actionTextEn: 'Verify Records',
      actionTextSo: 'Hubi Xogtaada'
    },
    {
      icon: FileCheck,
      titleEn: 'Credential & QR Verification',
      titleSo: 'Hubinta Shahaadada & QR-ka',
      descEn: 'Assistance for employers and embassies scanning and verifying SNHCP tokens.',
      descSo: 'Caawimada loo-shaqeeyayaasha iyo safaaradaha ee hubinta lambarka QR-ka.',
      actionTextEn: 'Open QR Lookup',
      actionTextSo: 'Fur Hubinta QR-ka'
    },
    {
      icon: Briefcase,
      titleEn: 'Institutional Access (University / Employer)',
      titleSo: 'Taageerada Jaamacadaha & Shirkadaha',
      descEn: 'Information regarding institutional invitation tokens and authorized registrar access.',
      descSo: 'Macluumaadka ku saabsan furayaasha casuumaadda rasmiga ah ee jaamacadaha iyo shirkadaha.',
      actionTextEn: 'Contact Admin',
      actionTextSo: 'La Xidhiidh Maamulka'
    },
    {
      icon: Lock,
      titleEn: 'Privacy & Security Complaints',
      titleSo: 'Cabashooyinka Amniga & Sirta Xogta',
      descEn: 'Direct escalation channel for personal data protection concerns or consent audits.',
      descSo: 'Xafiiska tooska ah ee cabashooyinka la xidhiidha ilaalinta xogta gaarka ah.',
      actionTextEn: 'Submit Complaint',
      actionTextSo: 'Gudbi Cabasho'
    }
  ];

  return (
    <div className="bg-[#080808] text-slate-100 py-12 lg:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Support Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#222222] text-xs font-mono text-[#FF6B00] font-semibold uppercase tracking-wider">
            {isSo ? 'XARUNTA CAAWIMADA QARANKA' : 'NATIONAL SUPPORT & HELP DESK'}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-white">
            {isSo ? 'Xarunta Taageerada ee SNHCP' : 'SNHCP Support & Assistance Center'}
          </h1>
          <p className="text-base text-slate-300 font-light leading-relaxed">
            {isSo
              ? 'Halkan waxaad ka helaysaa caawimo dhamaystiran oo ku saabsan diiwaangelinta, xaqiijinta shahaadooyinka, koontadaada iyo ilaalinta xogta gaarka ah.'
              : 'Official technical support, documentation, and grievance escalation for citizens, students, universities, and enterprise employers.'}
          </p>
        </div>

        {/* 5 Topic Quick Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportGuides.map((guide, idx) => {
            const Icon = guide.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#111111] border border-[#202020] hover:border-[#383838] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#181818] border border-[#292929] flex items-center justify-center text-[#FF6B00]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-sans">
                    {isSo ? guide.titleSo : guide.titleEn}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {isSo ? guide.descSo : guide.descEn}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (guide.titleEn.includes('Credential')) onNavigate('credentials');
                    else if (guide.titleEn.includes('Registration')) onOpenRegister();
                  }}
                  className="text-xs font-semibold text-[#FF6B00] hover:underline flex items-center gap-1 self-start pt-2 cursor-pointer"
                >
                  <span>{isSo ? guide.actionTextSo : guide.actionTextEn}</span>
                  <span>→</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Embedded Support Form & FAQs */}
      <SupportSection language={language} />

    </div>
  );
};
