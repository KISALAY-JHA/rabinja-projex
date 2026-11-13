'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  X, Activity, Crown, Trophy, Heart, Leaf, Shield,
  Cpu, GraduationCap, Coins, Code2, Zap, Award, Sparkles, ChevronRight
} from 'lucide-react';

interface BrowseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRACKS = [
  { name: 'HealthTech', icon: Heart, color: 'text-rose-400', bg: 'hover:border-rose-500/40 hover:bg-rose-500/5', href: '/explore?category=HealthTech' },
  { name: 'CleanTech', icon: Leaf, color: 'text-emerald-400', bg: 'hover:border-emerald-500/40 hover:bg-emerald-500/5', href: '/explore?category=CleanTech' },
  { name: 'Cybersecurity', icon: Shield, color: 'text-purple-400', bg: 'hover:border-purple-500/40 hover:bg-purple-500/5', href: '/explore?category=Cybersecurity' },
  { name: 'DeepTech', icon: Cpu, color: 'text-cyan-400', bg: 'hover:border-cyan-500/40 hover:bg-cyan-500/5', href: '/explore?category=DeepTech' },
  { name: 'EdTech', icon: GraduationCap, color: 'text-amber-400', bg: 'hover:border-amber-500/40 hover:bg-amber-500/5', href: '/explore?category=EdTech' },
  { name: 'FinTech', icon: Coins, color: 'text-emerald-400', bg: 'hover:border-emerald-500/40 hover:bg-emerald-500/5', href: '/explore?category=FinTech' },
];

const SPECIAL_COLLECTIONS = [
  { name: 'Open Source', icon: Code2, color: 'text-cyan-400', href: '/explore?tag=opensource' },
  { name: 'Hardware & IoT', icon: Zap, color: 'text-amber-400', href: '/explore?tag=hardware' },
  { name: 'Award Winners', icon: Award, color: 'text-yellow-400', href: '/explore?filter=winners' },
  { name: 'NEX Picks', icon: Sparkles, color: 'text-cyan-300', href: '/explore?filter=nex-picks' },
];

export function BrowseModal({ isOpen, onClose }: BrowseModalProps) {
  // Prevent background scroll when modal is open on phone
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

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-2xl animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="browse-modal-title"
    >
      {/* Top Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3.5 bg-black/90 border-b border-zinc-800/80 backdrop-blur-md">
        <h2 id="browse-modal-title" className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <span>Browse By</span>
          <span className="text-[11px] font-mono text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/40">
            PROJEX
          </span>
        </h2>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700/60 flex items-center justify-center text-zinc-300 hover:text-white active:scale-95 transition-all"
          aria-label="Close browse drawer"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 px-4 py-4 max-w-lg mx-auto w-full space-y-4 pb-12">
        {/* Hero Card: Trending & Live Activity */}
        <Link
          href="/explore?sort=trending"
          onClick={onClose}
          className="block p-4 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-cyan-950/30 border border-cyan-500/30 hover:border-cyan-400/60 transition-all active:scale-[0.99] group shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <Activity size={20} className="animate-pulse" />
              </div>
              <div>
                <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors block">
                  Trending Activity
                </span>
                <span className="text-xs text-zinc-400">
                  Top engineering innovations gaining momentum
                </span>
              </div>
            </div>
            <ChevronRight size={16} className="text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </div>
        </Link>

        {/* 2-Column High-Priority Tiles */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/explore?sort=rating"
            onClick={onClose}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-amber-500/40 hover:bg-amber-950/10 transition-all active:scale-[0.98] group text-center"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2 group-hover:scale-110 transition-transform">
              <Crown size={18} />
            </div>
            <span className="text-xs font-bold text-zinc-200 group-hover:text-white">NEX Top 100</span>
            <span className="text-[10px] text-zinc-500 mt-0.5">Highest rated by AI</span>
          </Link>

          <Link
            href="/events"
            onClick={onClose}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-cyan-500/40 hover:bg-cyan-950/10 transition-all active:scale-[0.98] group text-center"
          >
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
              <Trophy size={18} />
            </div>
            <span className="text-xs font-bold text-zinc-200 group-hover:text-white">Hackathons</span>
            <span className="text-[10px] text-zinc-500 mt-0.5">Active competitions</span>
          </Link>
        </div>

        {/* Category Tracks (3-Column Moctale Style Tiles) */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2.5 px-1">
            Tracks & Domains
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {TRACKS.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.name}
                  href={t.href}
                  onClick={onClose}
                  className={`flex flex-col items-center justify-center py-3.5 px-2 rounded-xl bg-zinc-950/90 border border-zinc-800/80 ${t.bg} transition-all active:scale-95 group text-center`}
                >
                  <Icon size={18} className={`${t.color} mb-1.5 group-hover:scale-110 transition-transform`} />
                  <span className="text-xs font-medium text-zinc-300 group-hover:text-white leading-tight">
                    {t.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Curated Filters (Moctale Franchise / Award Winners Style) */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2.5 px-1">
            Special Highlights
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {SPECIAL_COLLECTIONS.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.name}
                  href={c.href}
                  onClick={onClose}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900 transition-all active:scale-95 group"
                >
                  <Icon size={16} className={`${c.color} shrink-0`} />
                  <span className="text-xs font-medium text-zinc-300 group-hover:text-white truncate">
                    {c.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sub-footer note */}
        <div className="text-center pt-2">
          <p className="text-[11px] text-zinc-600 font-mono">
            RABINJA Projex • Real-time Innovation Network
          </p>
        </div>
      </div>
    </div>
  );
}
