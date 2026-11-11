import React from 'react';
import { cn } from '@/lib/utils';

/* ============================================================
   Skeleton — RABINJA Projex UI Primitive
   ============================================================ */

export type SkeletonVariant = 'text' | 'block' | 'circle' | 'card';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  /** Width override (css value). Defaults per variant. */
  width?: string | number;
  /** Height override (css value). Defaults per variant. */
  height?: string | number;
}

const variantDefaults: Record<SkeletonVariant, { w: string; h: string; extra: string }> = {
  text: { w: '100%', h: '1rem', extra: 'rounded' },
  block: { w: '100%', h: '8rem', extra: 'rounded-lg' },
  circle: { w: '2.5rem', h: '2.5rem', extra: 'rounded-full' },
  card: { w: '100%', h: '12rem', extra: 'rounded-lg' },
};

export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
  style,
  ...rest
}: SkeletonProps) {
  const defaults = variantDefaults[variant];

  return (
    <div
      className={cn(
        'animate-pulse bg-surface-hover',
        defaults.extra,
        className,
      )}
      style={{
        width: width ?? defaults.w,
        height: height ?? defaults.h,
        ...style,
      }}
      aria-hidden="true"
      {...rest}
    >
      {variant === 'card' && (
        <div className="flex flex-col gap-3 p-5 h-full">
          <div className="bg-border/60 rounded w-3/4 h-4" />
          <div className="bg-border/60 rounded w-full h-3" />
          <div className="bg-border/60 rounded w-5/6 h-3" />
          <div className="mt-auto flex gap-2">
            <div className="bg-border/60 rounded-full w-6 h-6" />
            <div className="bg-border/60 rounded w-20 h-4 self-center" />
          </div>
        </div>
      )}
    </div>
  );
}

Skeleton.displayName = 'Skeleton';

export default Skeleton;
