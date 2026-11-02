import React, { useState } from 'react';
import { SkillsGapItem, Language } from '../types';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  PieChart, 
  Users, 
  Building, 
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  MapPin
} from 'lucide-react';

interface ModuleHumanCapitalIntelligenceProps {
  skillsGap: SkillsGapItem[];
  language: Language;
}

export const ModuleHumanCapitalIntelligence: React.FC<ModuleHumanCapitalIntelligenceProps> = ({
  skillsGap,
  language
}) => {
  const isSo = language === 'so';
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'moderate' | 'surplus'>('all');

  const filteredSkills = skillsGap.filter(item => {
    if (selectedFilter === 'critical') return item.gapStatus === 'critical_shortage';
    if (selectedFilter === 'moderate') return item.gapStatus === 'moderate_shortage';
    if (selectedFilter === 'surplus') return item.gapStatus === 'surplus';
    return true;
  });

  const regionalData = [
    { region: 'Maroodi Jeex (Hargeisa)', students: 16800, graduates: 25400, percent: 51 },
    { region: 'Awdal (Borama)', students: 7800, graduates: 12650, percent: 25 },
    { region: 'Togdheer (Burao)', students: 4120, graduates: 6300, percent: 13 },
    { region: 'Sahil (Berbera)', students: 1350, graduates: 1840, percent: 4 },
    { region: 'Sanaag (Erigavo)', students: 1200, graduates: 1530, percent: 3 },
    { region: 'Sool (Las Anod / Aynaba)', students: 1700, graduates: 2570, percent: 4 },
  ];

  const graduationTrends = [
    { year: 2020, total: 4900, stem: 1100, health: 850, business: 2100, others: 850 },
    { year: 2021, total: 5450, stem: 1300, health: 980, business: 2250, others: 920 },
    { year: 2022, total: 6100, stem: 1550, health: 1120, business: 2400, others: 1030 },
    { year: 2023, total: 7200, stem: 1950, health: 1350, business: 2600, others: 1300 },
    { year: 2024, total: 8400, stem: 2400, health: 1650, business: 2800, others: 1550 },
    { year: 2025, total: 9650, stem: 2900, health: 1950, business: 3100, others: 1700 }
  ];

  const handleExport = () => {
    const reportData = {
      title: "Somaliland National Human Capital Intelligence Report",
      date: new Date().toISOString(),
      skillsGapAnalysis: skillsGap,
      regionalDistribution: regionalData,
      graduationTrends: graduationTrends
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SNHCP_National_Intelligence_Report_${new Date().getFullYear()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1f1f1f]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#008037] font-bold mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008037] animate-pulse" />
            {isSo ? 'QAYBTA 07: SIRDOONKA CUDUDDA SHAQAALAHA' : 'MODULE 07: HUMAN CAPITAL INTELLIGENCE'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            {isSo ? 'Falanqaynta & Sirdoonka Awoodda Shaqaalaha Qaranka' : 'National Human Capital Intelligence & Skills Gap Matrix'}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            {isSo
              ? 'Xogta istiraatiijiga ah ee dawladda Somaliland u adeegsato qorshaynta horumarinta tacliinta sare, yareynta farqiga xirfadeed (Skills Gap), iyo tayaynta shaqaalaha.'
              : 'Strategic workforce intelligence synthesizing higher education output against economic demand to inform national curriculum reforms and sovereign workforce planning.'}
          </p>
        </div>

        <button
          onClick={handleExport}
          className="px-4 py-2 bg-[#FF6B00] hover:bg-[#ff7b1a] text-black rounded-xl text-xs font-extrabold shadow-md transition-all flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isSo ? 'Soo Dejiso Warbixinta Qaran (JSON)' : 'Export Strategic Report'}</span>
        </button>
      </div>

      {/* 4 National Macro Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-[#111111] rounded-xl border border-[#222222] shadow-md space-y-2">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            {isSo ? 'Wadarta Ardayda Dhigata' : 'Total Enrolled Population'}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            32,970
          </div>
          <div className="text-[11px] text-[#008037] font-mono">
            {isSo ? '64% BSc, 21% Diploma, 14% MSc, 1% PhD' : '64% Undergrad · 21% TVET · 15% Postgrad'}
          </div>
        </div>

        <div className="p-5 bg-[#111111] rounded-xl border border-[#222222] shadow-md space-y-2">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            {isSo ? 'Qalinjabiyayaasha La Xaqiijiyay' : 'Verified Sovereign Alumni'}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#008037] font-mono tabular-nums">
            49,690
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Accredited Somaliland Institutions
          </div>
        </div>

        <div className="p-5 bg-[#111111] rounded-xl border border-[#222222] shadow-md space-y-2">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            {isSo ? 'Awoodda Shaqo ee STEM' : 'STEM Cohort Proportion'}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#FF6B00] font-mono tabular-nums">
            30.1%
          </div>
          <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+6.2% annual growth</span>
          </div>
        </div>

        <div className="p-5 bg-[#111111] rounded-xl border border-[#222222] shadow-md space-y-2">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            {isSo ? 'Farqiga Xirfadeed ee Loo Baahan Yahay' : 'Critical Shortage Indicators'}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
            4 Sectors
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            High Priority Government Intervention
          </div>
        </div>
      </div>

      {/* Skills Gap Analysis Table */}
      <div className="bg-[#111111] border border-[#222222] rounded-xl overflow-hidden shadow-xl space-y-0">
        <div className="p-4 bg-[#141414] border-b border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#FF6B00]" />
            <span>{isSo ? 'Shaxda Farqiga Xirfadeed (Supply vs Demand Matrix)' : 'National Supply vs Demand Skills Matrix'}</span>
          </h3>

          <div className="flex items-center gap-1 p-1 bg-[#1a1a1a] rounded-lg">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                selectedFilter === 'all' ? 'bg-[#262626] text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Skills
            </button>
            <button
              onClick={() => setSelectedFilter('critical')}
              className={`px-3 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                selectedFilter === 'critical' ? 'bg-red-950/60 text-red-300 font-bold border border-red-800' : 'text-slate-400 hover:text-white'
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => setSelectedFilter('moderate')}
              className={`px-3 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                selectedFilter === 'moderate' ? 'bg-amber-950/60 text-amber-300 font-bold border border-amber-800' : 'text-slate-400 hover:text-white'
              }`}
            >
              Moderate
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#161616] text-slate-400 border-b border-[#222222] font-mono text-[10px] uppercase">
              <tr>
                <th className="px-5 py-3">Competency & Skill Area</th>
                <th className="px-5 py-3">Sector</th>
                <th className="px-5 py-3 text-right">Available Talent</th>
                <th className="px-5 py-3 text-right">Employer Demand</th>
                <th className="px-5 py-3 text-right">University Output</th>
                <th className="px-5 py-3 text-right">Gap Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c1c1c]">
              {filteredSkills.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#161616]/50">
                  <td className="px-5 py-3 font-bold text-white">{item.skillName}</td>
                  <td className="px-5 py-3 text-slate-400">{item.sector}</td>
                  <td className="px-5 py-3 text-right font-mono text-slate-300">{item.availableTalentCount.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right font-mono text-[#FF6B00] font-bold">{item.employerDemandCount.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right font-mono text-slate-400">{item.universityAnnualOutput.toLocaleString()} / yr</td>
                  <td className="px-5 py-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      item.gapStatus === 'critical_shortage'
                        ? 'bg-red-950/60 text-red-300 border border-red-800'
                        : item.gapStatus === 'moderate_shortage'
                        ? 'bg-amber-950/60 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                    }`}>
                      {item.gapStatus.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regional Distribution Grid */}
      <div className="bg-[#111111] p-6 rounded-xl border border-[#222222] shadow-md space-y-4">
        <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#008037]" />
          <span>Regional Higher Education Distribution (All 6 Somaliland Regions)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          {regionalData.map((reg, i) => (
            <div key={i} className="p-3.5 bg-[#161616] rounded-xl border border-[#242424] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{reg.region.split(' ')[0]}</span>
                <span className="text-[#008037] font-bold">{reg.percent}%</span>
              </div>
              <div className="h-1.5 w-full bg-[#202020] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#008037] to-[#FF6B00] rounded-full" 
                  style={{ width: `${reg.percent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>{reg.students.toLocaleString()} students</span>
                <span>{reg.graduates.toLocaleString()} alumni</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
