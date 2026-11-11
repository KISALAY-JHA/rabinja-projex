import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ============================================================
   Badge — RABINJA Projex UI Primitive
   ============================================================ */

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'warning'
  | 'error'
  | 'nex';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Show a small coloured dot indicator. */
  dot?: boolean;
  /** Show a remove (X) button. */
  removable?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-accent-light text-accent',
  secondary: 'bg-secondary-light text-secondary',
  outline: 'bg-transparent border border-border text-text-secondary',
  success: 'bg-success-light text-success',
  warning: 'bg-warning-light text-warning',
  error: 'bg-error-light text-error',
  nex: 'bg-nex-accent-light text-nex-primary',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-accent',
  secondary: 'bg-secondary',
  outline: 'bg-text-muted',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  nex: 'bg-nex-accent',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5 gap-1',
  md: 'text-sm px-2.5 py-1 gap-1.5',
};

export function Badge({
  variant = 'default',
  size = 'sm',
  dot = false,
  removable = false,
  onRemove,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full whitespace-nowrap',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {children}
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-0.5 rounded-full p-0.5 hover:bg-black/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent cursor-pointer"
          aria-label={`Remove ${typeof children === 'string' ? children : 'item'}`}
        >
          <X size={size === 'sm' ? 10 : 12} />
        </button>
      )}
    </span>
  );
}

Badge.displayName = 'Badge';

export default Badge;
