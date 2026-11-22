'use client';

import React, { useState, useEffect } from 'react';
import {
  X, Share2, Copy, Check, MessageSquare,
  Sparkles, ExternalLink, Globe, Smartphone, Trophy, Shield
} from 'lucide-react';

interface ShareProjexModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  customUrl?: string;
}

export function ShareProjexModal({
  isOpen,
  onClose,
  title = 'RABINJA Projex — Project Intelligence & Buildathon Arena',
  description = 'Discover real engineering projects, phone-verified builders, and Rabinjathon: Prime 1. No fake metrics, no algorithm noise.',
  customUrl,
}: ShareProjexModalProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('https://rabinjasquad.in');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(customUrl || window.location.origin);
    }
  }, [customUrl, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const shareText = `🚀 Check out ${title}!\n\n${description}\n\nExplore here: ${shareUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}&hashtags=RabinjaProjex,Rabinjathon,Innovators`;
    window.open(url, '_blank');
  };

  const handleLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch {}
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#05070E] border-2 border-cyan-500/40 rounded-3xl p-5 sm:p-6 shadow-[0_0_50px_rgba(0,212,255,0.25)] text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Share2 size={15} />
            </div>
            <div>
              <h3 className="font-display text-sm sm:text-base font-bold text-white">
                Share Projex Card
              </h3>
              <p className="text-[10px] font-mono text-zinc-400">
                Official Digital Innovation Dossier
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── SPECIAL PROJEX SHARE CARD (Visual Preview) ── */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#070B16] via-black to-[#05070E] border border-cyan-500/30 relative overflow-hidden mb-5 shadow-[0_0_30px_rgba(0,212,255,0.15)] group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-600/10 rounded-full blur-xl pointer-events-none" />

          {/* Card Top Pill */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-[9px] font-mono font-bold text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>RABINJA PROJEX</span>
            </div>
            <span className="text-[9px] font-mono text-zinc-500">
              VERIFIED ARENA
            </span>
          </div>

          {/* Logo & Headline */}
          <div className="flex items-start gap-3 my-2">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-cyan-400/50 p-1 shrink-0 flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.4)]">
              <img src="/logo.png" alt="RABINJA" className="w-full h-full object-contain" />
            </div>
            <div>
              <h4 className="font-display text-sm font-extrabold text-white leading-snug line-clamp-2">
                {title}
              </h4>
              <p className="text-[11px] text-zinc-400 line-clamp-2 mt-0.5 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Card Bottom Badges */}
          <div className="pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span className="text-cyan-400 font-bold flex items-center gap-1">
              <Shield size={11} /> Phone-Verified
            </span>
            <span className="text-zinc-500 truncate max-w-[150px]">
              {shareUrl.replace(/^https?:\/\//, '')}
            </span>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          {/* WhatsApp */}
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50 font-mono text-xs font-bold transition-all active:scale-95"
          >
            <MessageSquare size={14} className="text-emerald-400" />
            <span>WhatsApp</span>
          </button>

          {/* Twitter / X */}
          <button
            onClick={handleTwitter}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-white font-mono text-xs font-bold transition-all active:scale-95"
          >
            <Globe size={14} className="text-cyan-400" />
            <span>X / Twitter</span>
          </button>

          {/* LinkedIn */}
          <button
            onClick={handleLinkedIn}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-950/40 border border-blue-500/40 text-blue-300 hover:bg-blue-900/50 font-mono text-xs font-bold transition-all active:scale-95"
          >
            <Share2 size={14} className="text-blue-400" />
            <span>LinkedIn</span>
          </button>

          {/* Mobile Native Sheet */}
          <button
            onClick={handleNativeShare}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/50 font-mono text-xs font-bold transition-all active:scale-95"
          >
            <Smartphone size={14} className="text-cyan-400" />
            <span>Device Share</span>
          </button>
        </div>

        {/* Copy Link Input Bar */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-zinc-950 border border-zinc-800">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 bg-transparent text-xs font-mono text-zinc-300 px-2.5 py-1 focus:outline-none truncate"
          />
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              copied
                ? 'bg-emerald-500 text-black'
                : 'bg-cyan-400 text-black hover:bg-cyan-300'
            }`}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
