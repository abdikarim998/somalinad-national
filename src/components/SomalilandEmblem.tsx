import React from 'react';

interface EmblemProps {
  size?: number;
  className?: string;
}

export const SomalilandEmblem: React.FC<EmblemProps> = ({ size = 32, className = '' }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full border border-emerald-700/30 bg-emerald-900/90 text-white shadow-sm overflow-hidden ${className}`}
      style={{ width: size, height: size }}
      title="Republic of Somaliland · Jamhuuriyadda Somaliland"
      aria-label="Somaliland National Emblem"
    >
      {/* Somaliland Flag Tricolor Striped Ring Motif */}
      <div className="absolute inset-0 flex flex-col opacity-25">
        <div className="h-1/3 bg-emerald-600 w-full" />
        <div className="h-1/3 bg-white w-full" />
        <div className="h-1/3 bg-red-600 w-full" />
      </div>
      
      {/* Central Black 5-pointed Star Symbol of Somaliland */}
      <svg 
        viewBox="0 0 24 24" 
        className="relative z-10 w-3/5 h-3/5 text-amber-300 drop-shadow-sm fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </div>
  );
};
