import React from 'react';

interface SNHCPLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'mark' | 'emblem-only';
  className?: string;
  showSubtitle?: boolean;
}

export const SNHCPLogo: React.FC<SNHCPLogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
  showSubtitle = true
}) => {
  const sizeMap = {
    sm: { icon: 34, text: 'text-base', sub: 'text-[9px]', badge: 'text-[8px]' },
    md: { icon: 44, text: 'text-lg', sub: 'text-[10px]', badge: 'text-[9px]' },
    lg: { icon: 56, text: 'text-xl', sub: 'text-xs', badge: 'text-[10px]' },
    xl: { icon: 72, text: 'text-2xl', sub: 'text-sm', badge: 'text-xs' }
  };

  const { icon, text, sub, badge } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Somaliland National Emblem (Coat of Arms: Scales of Justice, Laurel Wreath of Peace, National Flag Tri-Color) */}
      <div 
        className="relative flex items-center justify-center shrink-0 rounded-full bg-gradient-to-b from-[#14281d] via-[#0d1610] to-[#070c08] border-2 border-[#D4AF37]/80 shadow-[0_0_15px_rgba(0,128,55,0.25)] group"
        style={{ width: icon, height: icon }}
        title="Jamhuuriyadda Somaliland — National Human Capital Platform"
        aria-label="Somaliland National Emblem"
      >
        {/* Subtle national green glow */}
        <div className="absolute inset-0 rounded-full bg-radial from-[#008037]/20 to-transparent pointer-events-none" />

        {/* Authentic Somaliland National Emblem Vector */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-[90%] h-[90%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Golden Border & Beaded Rim */}
          <circle cx="50" cy="50" r="47" stroke="#D4AF37" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="44" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="1.5 1.5" />

          {/* Somaliland National Flag Arc in Upper Ring (Green, White, Red) */}
          <path 
            d="M 12 50 A 38 38 0 0 1 88 50" 
            stroke="#008037" 
            strokeWidth="3.5" 
            strokeLinecap="round"
          />
          <path 
            d="M 16 50 A 34 34 0 0 1 84 50" 
            stroke="#FFFFFF" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
          <path 
            d="M 20 50 A 30 30 0 0 1 80 50" 
            stroke="#C8102E" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />

          {/* Central Black 5-Pointed Star of Somaliland */}
          <polygon 
            points="50,17 52.2,23.5 59,23.5 53.5,27.5 55.6,34 50,30 44.4,34 46.5,27.5 41,23.5 47.8,23.5" 
            fill="#080808" 
            stroke="#D4AF37" 
            strokeWidth="0.8"
          />

          {/* Golden Laurel / Olive Wreath of Peace (Laamaha Nabadda) */}
          {/* Left Branch */}
          <path 
            d="M 24 72 C 16 62, 16 42, 26 30" 
            stroke="#008037" 
            strokeWidth="1.8" 
            strokeLinecap="round"
          />
          <path d="M 18 64 Q 13 58 17 55 Q 21 57 18 64 Z" fill="#008037" stroke="#D4AF37" strokeWidth="0.5" />
          <path d="M 16 52 Q 11 46 15 43 Q 19 45 16 52 Z" fill="#008037" stroke="#D4AF37" strokeWidth="0.5" />
          <path d="M 20 40 Q 17 34 22 32 Q 25 35 20 40 Z" fill="#008037" stroke="#D4AF37" strokeWidth="0.5" />
          <path d="M 24 72 Q 22 78 28 80 Q 30 75 24 72 Z" fill="#008037" stroke="#D4AF37" strokeWidth="0.5" />

          {/* Right Branch */}
          <path 
            d="M 76 72 C 84 62, 84 42, 74 30" 
            stroke="#008037" 
            strokeWidth="1.8" 
            strokeLinecap="round"
          />
          <path d="M 82 64 Q 87 58 83 55 Q 79 57 82 64 Z" fill="#008037" stroke="#D4AF37" strokeWidth="0.5" />
          <path d="M 84 52 Q 89 46 85 43 Q 81 45 84 52 Z" fill="#008037" stroke="#D4AF37" strokeWidth="0.5" />
          <path d="M 80 40 Q 83 34 78 32 Q 75 35 80 40 Z" fill="#008037" stroke="#D4AF37" strokeWidth="0.5" />
          <path d="M 76 72 Q 78 78 72 80 Q 70 75 76 72 Z" fill="#008037" stroke="#D4AF37" strokeWidth="0.5" />

          {/* Central Scales of Justice (Meezaanka Cadaaladda) */}
          {/* Vertical Central Pillar */}
          <line x1="50" y1="33" x2="50" y2="72" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="35" r="3" fill="#D4AF37" stroke="#080808" strokeWidth="0.8" />
          <path d="M 46 72 L 54 72 L 56 75 L 44 75 Z" fill="#D4AF37" />

          {/* Horizontal Balance Beam */}
          <line x1="30" y1="41" x2="70" y2="41" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="30" cy="41" r="2" fill="#D4AF37" />
          <circle cx="70" cy="41" r="2" fill="#D4AF37" />
          <circle cx="50" cy="41" r="2.5" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />

          {/* Left Pan Strings & Pan */}
          <line x1="30" y1="42" x2="25" y2="56" stroke="#D4AF37" strokeWidth="1" />
          <line x1="30" y1="42" x2="35" y2="56" stroke="#D4AF37" strokeWidth="1" />
          <path d="M 23 56 Q 30 62 37 56 Z" fill="#D4AF37" stroke="#F59E0B" strokeWidth="0.8" />

          {/* Right Pan Strings & Pan */}
          <line x1="70" y1="42" x2="65" y2="56" stroke="#D4AF37" strokeWidth="1" />
          <line x1="70" y1="42" x2="75" y2="56" stroke="#D4AF37" strokeWidth="1" />
          <path d="M 63 56 Q 70 62 77 56 Z" fill="#D4AF37" stroke="#F59E0B" strokeWidth="0.8" />

          {/* Shaking Hands of Accord & Unity (Heshiiska Qaran) */}
          <g transform="translate(38, 62) scale(0.6)">
            {/* Left Hand Cuff & Forearm */}
            <path d="M 0 10 L 10 10 L 16 16 L 8 20 Z" fill="#008037" stroke="#D4AF37" strokeWidth="1" />
            {/* Right Hand Cuff & Forearm */}
            <path d="M 40 10 L 30 10 L 24 16 L 32 20 Z" fill="#C8102E" stroke="#D4AF37" strokeWidth="1" />
            {/* Clasping Golden Hands */}
            <path 
              d="M 12 14 C 16 11, 24 11, 28 14 C 28 18, 22 21, 20 21 C 18 21, 12 18, 12 14 Z" 
              fill="#D4AF37" 
              stroke="#080808" 
              strokeWidth="1" 
            />
          </g>

          {/* Ribbon Base at Bottom */}
          <path 
            d="M 32 84 Q 50 88 68 84 Q 65 79 50 81 Q 35 79 32 84 Z" 
            fill="#D4AF37" 
            stroke="#080808" 
            strokeWidth="0.6"
          />
        </svg>

        {/* Somaliland National Colors Micro-Ribbon on Bottom of Emblem */}
        <div className="absolute -bottom-1 inset-x-2 h-[3px] rounded-full overflow-hidden flex shadow-sm">
          <div className="flex-1 bg-[#008037]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#C8102E]" />
        </div>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2 leading-none">
            <span className={`font-black tracking-tight text-white ${text} font-sans`}>
              SNHCP
            </span>
            {/* Somaliland Sovereign Emblem Badge */}
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#008037]/20 border border-[#008037]/60 text-[#22c55e] font-mono text-[9px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008037]" />
              SOMALILAND
            </span>
          </div>

          {showSubtitle && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`text-slate-300 font-semibold tracking-wide uppercase ${sub} font-sans`}>
                Somaliland National Human Capital
              </span>
              <span className="hidden sm:inline text-zinc-600">·</span>
              <span className={`hidden sm:inline font-mono text-[#D4AF37] ${badge}`}>
                GOVERNMENT OF SOMALILAND
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
