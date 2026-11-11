'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getInitials } from '@/lib/utils';

/* ============================================================
   Avatar — RABINJA Projex UI Primitive
   ============================================================ */

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name: string;
  size?: AvatarSize;
}

const sizeMap: Record<AvatarSize, { px: number; text: string }> = {
  sm: { px: 32, text: 'text-xs' },
  md: { px: 40, text: 'text-sm' },
  lg: { px: 56, text: 'text-lg' },
  xl: { px: 80, text: 'text-xl' },
};

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  className,
  ...rest
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const { px, text } = sizeMap[size];
  const initials = getInitials(name);
  const showImage = src && !imgError;

  return (
    <div
      className={cn(
        'relative shrink-0 rounded-full border border-border overflow-hidden',
        'bg-accent-light text-accent font-semibold',
        'inline-flex items-center justify-center',
        text,
        className,
      )}
      style={{ width: px, height: px }}
      role="img"
      aria-label={alt || name}
      {...rest}
    >
      {showImage ? (
        <Image
          src={src}
          alt={alt || name}
          fill
          sizes={`${px}px`}
          className="object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </div>
  );
}

Avatar.displayName = 'Avatar';

export default Avatar;
