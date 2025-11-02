import { ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, type = 'button', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 touch-manipulation disabled:pointer-events-none disabled:opacity-50';

    const variantStyles = {
      primary:
        'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95',
      secondary:
        'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95',
      outline:
        'border border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40 active:scale-95',
      ghost: 'bg-transparent text-white/60 hover:bg-white/5 hover:text-white active:scale-95',
    };

    const sizeStyles = {
      sm: 'h-9 px-4 text-sm min-h-[36px]',
      md: 'h-11 px-6 text-base min-h-[44px]',
      lg: 'h-14 px-8 text-lg min-h-[56px]',
    };

    return (
      <button
        ref={ref}
        type={type === 'submit' ? 'submit' : 'button'}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={disabled || isLoading}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {isLoading ? (
          <>
            <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
