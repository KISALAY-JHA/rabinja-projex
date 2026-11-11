'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ============================================================
   Button — RABINJA Projex UI Primitive
   ============================================================ */

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'secondary' | 'nex';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  /** Render as a child element (e.g. anchor). When true, merges props onto the single child. */
  asChild?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  solid:
    'bg-accent text-white hover:bg-accent-hover active:bg-accent-hover',
  outline:
    'border border-accent text-accent bg-transparent hover:bg-accent-light active:bg-accent-light',
  ghost:
    'bg-transparent text-text-primary hover:bg-surface-hover active:bg-surface-hover',
  secondary:
    'bg-secondary text-white hover:bg-secondary-hover active:bg-secondary-hover',
  nex:
    'bg-nex-primary text-white hover:bg-nex-primary-hover active:bg-nex-primary-hover',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled,
      className,
      children,
      asChild,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base
          'inline-flex items-center justify-center font-medium rounded-lg',
          'transition-colors duration-[var(--transition-fast)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          'cursor-pointer select-none',
          // Variant & size
          variantStyles[variant],
          sizeStyles[size],
          // States
          isDisabled && 'opacity-50 pointer-events-none',
          fullWidth && 'w-full',
          className,
        )}
        {...rest}
      >
        {loading && (
          <Loader2
            className="animate-spin shrink-0"
            size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
