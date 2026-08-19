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
    <img
      src="./images/logo.png"
      alt="Gradiolex Logo"
      className={`${iconSizes[size]} object-cover rounded-full shadow-md transform group-hover:scale-105 transition-all duration-300 border border-amber-300/40 ring-2 ring-brand-primary/25 shrink-0 overflow-hidden`}
    />
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
