import React from 'react';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-full tracking-wider uppercase transition-all duration-300 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'text-xs py-2 px-4 gap-1.5',
    md: 'text-xs sm:text-sm py-3 px-6 gap-2',
    lg: 'text-sm sm:text-base py-3.5 sm:py-4 px-8 gap-2.5 shadow-md hover:shadow-lg',
  };

  const variantStyles = {
    // Variant 1: Modern Solid Velvet / Gold Pill
    primary:
      'bg-brand-primary hover:bg-brand-primary-hover text-white dark:bg-brand-primary dark:hover:bg-brand-primary-hover shadow-sm hover:shadow-md hover:-translate-y-0.5 border border-brand-primary/20',
    // Variant 2: Modern Soft / Outline Glass Pill
    secondary:
      'bg-surface-subtle/90 hover:bg-brand-primary hover:text-white dark:bg-dark-elevated text-brand-primary dark:text-brand-primary-light dark:hover:bg-brand-primary dark:hover:text-white border border-brand-primary/25 dark:border-brand-primary-light/25 hover:border-brand-primary shadow-xs hover:-translate-y-0.5',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
