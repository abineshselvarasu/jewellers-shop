import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon-only' | 'monogram';
  textColor?: string;
  hideTextOnMobile?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  textColor,
  hideTextOnMobile = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
    xl: 'w-16 h-16 sm:w-20 sm:h-20',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl md:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl md:text-5xl',
  };

  const subSizes = {
    sm: 'text-[7px]',
    md: 'text-[9px] sm:text-[10px]',
    lg: 'text-[10px] sm:text-xs',
    xl: 'text-[12px] sm:text-[13px]',
  };

  const Emblem = (
    <div
      className={`${iconSizes[size]} relative rounded-full bg-gradient-to-br from-brand-primary via-brand-primary-hover to-brand-primary-dark text-white flex items-center justify-center shadow-md transform group-hover:scale-105 transition-all duration-300 border border-amber-300/40 ring-2 ring-brand-primary/25 shrink-0 overflow-hidden`}
    >
      {/* Subtle gold radial shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.35),transparent_65%)]" />
      
      {/* Geometric Diamond Facet Lines */}
      <svg
        className="w-full h-full absolute inset-0 p-1.5 opacity-30 text-amber-200 pointer-events-none"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polygon points="50,10 90,50 50,90 10,50" />
        <polygon points="50,22 78,50 50,78 22,50" />
        <circle cx="50" cy="50" r="44" strokeWidth="1" strokeDasharray="3 3" />
      </svg>

      {/* Monogram G & X with crown crownlet */}
      <div className="relative z-10 flex flex-col items-center justify-center font-classic select-none">
        <span className="text-[10px] text-amber-300 leading-none mb-[-2px] tracking-widest font-serif opacity-90">✦</span>
        <div className="flex items-center tracking-tighter leading-none">
          <span className="font-bold text-amber-100 text-sm sm:text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">G</span>
          <span className="font-bold text-amber-300 text-xs sm:text-sm -ml-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">X</span>
        </div>
      </div>
    </div>
  );

  if (variant === 'icon-only' || variant === 'monogram') {
    return <div className={`inline-flex items-center ${className}`}>{Emblem}</div>;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {Emblem}
      <div className={`flex flex-col ${hideTextOnMobile ? 'hidden sm:flex' : ''}`}>
        <span
          className={`font-classic font-bold tracking-wider leading-none ${titleSizes[size]} ${
            textColor || 'text-brand-primary dark:text-brand-primary-light'
          }`}
        >
          Gradiolex
        </span>
        <span
          className={`tracking-widest uppercase text-surface-muted dark:text-dark-subtle font-medium mt-0.5 ${subSizes[size]}`}
        >
          Jewellers • Est. 2010
        </span>
      </div>
    </div>
  );
};
