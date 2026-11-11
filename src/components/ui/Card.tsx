import React from 'react';
import { cn } from '@/lib/utils';

/* ============================================================
   Card — RABINJA Projex UI Primitive
   ============================================================ */

export type CardVariant = 'default' | 'interactive' | 'bordered' | 'flat';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  interactive?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'shadow-xs hover:shadow-sm transition-shadow',
  interactive: 'cursor-pointer hover:translate-y-[-2px] hover:shadow-md transition-all duration-200',
  bordered: 'border-2 border-border-strong',
  flat: '',
};

export function Card({
  variant = 'default',
  interactive = false,
  className,
  style,
  children,
  ...rest
}: CardProps) {
  const actualVariant: CardVariant = interactive ? 'interactive' : variant;

  return (
    <div
      className={cn(
        'bg-bg-card border border-border rounded-lg overflow-hidden',
        variantClasses[actualVariant],
        className
      )}
      style={{
        borderRadius: 'var(--radius-md)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-6 py-4 border-b border-border', className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardContent({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6', className)} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'px-6 py-3 border-t border-border bg-bg-card-warm flex items-center justify-between',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
