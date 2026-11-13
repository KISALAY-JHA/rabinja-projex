'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, ExternalLink, X, Info } from 'lucide-react';

interface AdSlotProps {
  /** Google AdSense Ad Slot ID (from your Google AdSense console) */
  adSlotId?: string;
  /** Format of the ad slot */
  format?: 'banner' | 'native-card' | 'feed-inline' | 'sidebar' | 'mobile-inline';
  /** Optional custom title for sponsor */
  title?: string;
  /** Optional custom description */
  description?: string;
  /** Target referral / sponsor link */
  href?: string;
  /** Image or badge label */
  sponsorLabel?: string;
  /** Custom fallback title */
  fallbackTitle?: string;
  /** Custom fallback description */
  fallbackDescription?: string;
  /** Custom fallback target link */
  fallbackHref?: string;
  className?: string;
}

export function AdSlot({
  adSlotId,
  format = 'feed-inline',
  title,
  description,
  href,
  sponsorLabel = 'Official Technology Sponsor',
  fallbackTitle = 'Deploy Scalable AI Architectures on Cloud GPU Clusters',
  fallbackDescription = 'High-throughput inference for PyTorch, Llama 3, and DeepTech models with 99.9% enterprise uptime.',
  fallbackHref = 'https://cloud.google.com',
  className = '',
}: AdSlotProps) {
  const [closed, setClosed] = useState(false);
  const [adsenseLoaded, setAdsenseLoaded] = useState(false);

  const displayTitle = title || fallbackTitle;
  const displayDesc = description || fallbackDescription;
  const displayLink = href || fallbackHref;

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (clientId && adSlotId) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdsenseLoaded(true);
      } catch (err) {
        console.error('AdSense display error:', err);
      }
    }
  }, [clientId, adSlotId]);

  if (closed) return null;

  return (
    <div className={`w-full my-4 select-none ${className}`}>
      {/* Top Header: "ADVERTISEMENT" (Moctale Batch 1 Screen 1 Style) */}
      <div className="flex items-center justify-between px-1 mb-1.5">
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-semibold">
          ADVERTISEMENT
        </span>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-600">
          <Info size={11} />
          <span>Sponsored</span>
        </div>
      </div>

      {/* Ad Container */}
      <div className="relative rounded-2xl bg-zinc-950 border border-zinc-800/90 overflow-hidden shadow-md">
        {/* If Google AdSense client ID & slot ID are provided */}
        {clientId && adSlotId ? (
          <div className="w-full min-h-[100px] flex items-center justify-center overflow-hidden py-2">
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: '100%' }}
              data-ad-client={clientId}
              data-ad-slot={adSlotId}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        ) : (
          /* Native High-Converting Ad Banner (Matches Moctale Screen 1 style) */
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-zinc-950 via-zinc-900/60 to-cyan-950/20">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
                <Sparkles size={20} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                    PROMOTED
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                    {displayTitle}
                  </h4>
                </div>
                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                  {displayDesc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
              <a
                href={displayLink}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="px-3.5 py-1.5 rounded-full bg-white text-black font-mono font-bold text-xs hover:bg-zinc-200 transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>Open</span>
                <ExternalLink size={12} />
              </a>
              <button
                onClick={() => setClosed(true)}
                className="w-7 h-7 rounded-full bg-zinc-900 text-zinc-500 hover:text-white flex items-center justify-center transition-colors"
                title="Dismiss ad"
                aria-label="Dismiss"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
