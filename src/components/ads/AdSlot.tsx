'use client';

import { useState } from 'react';
import { ExternalLink, Sparkles, Megaphone, X } from 'lucide-react';

interface AdSlotProps {
  /** Format of the ad unit */
  format?: 'banner' | 'native-card' | 'mobile-inline' | 'sidebar';
  /** Optional custom title for sponsor */
  title?: string;
  /** Optional custom description */
  description?: string;
  /** Target referral / sponsor link */
  href?: string;
  /** Image or badge label */
  sponsorLabel?: string;
}

export function AdSlot({
  format = 'native-card',
  title = 'Accelerate Your AI Engineering on Cloud GPU Clusters',
  description = 'Deploy high-performance Llama 3, PyTorch, and Deep Learning models with instant serverless inference and 99.9% uptime.',
  href = 'https://cloud.google.com',
  sponsorLabel = 'Official Technology Sponsor',
}: AdSlotProps) {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  // 1. Native Sponsored Card (Looks organic, matches Dark Neon Design System)
  if (format === 'native-card') {
    return (
      <div className="card p-5 relative overflow-hidden group border-[var(--purple)]/30 bg-gradient-to-br from-purple-950/20 via-[var(--bg-surface)] to-blue-950/20 hover:border-[var(--purple)]/60 transition-all">
        {/* Subtle Sponsor Badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="badge badge-purple text-[10px] tracking-wider uppercase font-semibold">
              <Megaphone size={11} className="mr-1" /> {sponsorLabel}
            </span>
          </div>
          <span className="text-[10px] text-[var(--text-muted)] tracking-wider uppercase">Promoted</span>
        </div>

        <h3 className="font-display font-bold text-base text-white group-hover:text-[var(--purple)] transition-colors mb-2">
          {title}
        </h3>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
          {description}
        </p>

        <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
          <span className="text-[11px] text-[var(--text-muted)]">Verified Partner</span>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn btn-secondary text-xs px-3 py-1 text-white hover:text-[var(--purple)] flex items-center gap-1"
          >
            <span>Learn More</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    );
  }

  // 2. Responsive Horizontal Banner (For explore feed, homepage breaks, detail page)
  if (format === 'banner' || format === 'mobile-inline') {
    return (
      <div className="card p-4 sm:p-5 border-[var(--border)] bg-[var(--bg-surface-2)]/80 relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-6">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-purple-500/20 border border-[var(--amber)]/30 flex items-center justify-center shrink-0 text-[var(--amber)]">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge badge-amber text-[9px]">PROMOTED</span>
              <h4 className="font-semibold text-white text-sm">{title}</h4>
            </div>
            <p className="text-xs text-[var(--text-secondary)] line-clamp-2 max-w-2xl">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn btn-primary text-xs px-4 py-2"
          >
            Claim Offer <ExternalLink size={12} />
          </a>
          <button
            onClick={() => setClosed(true)}
            className="text-[var(--text-muted)] hover:text-white p-1"
            aria-label="Dismiss ad"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    );
  }

  // 3. Compact Sidebar Ad
  return (
    <div className="card p-4 border-[var(--border)] bg-[var(--bg-surface)] space-y-3">
      <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
        <span>Sponsor</span>
        <button onClick={() => setClosed(true)} className="hover:text-white"><X size={12} /></button>
      </div>
      <h4 className="font-semibold text-white text-xs leading-snug">{title}</h4>
      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{description}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="btn btn-secondary text-xs w-full justify-center py-1.5"
      >
        Visit Sponsor <ExternalLink size={11} />
      </a>
    </div>
  );
}
