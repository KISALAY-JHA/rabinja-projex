'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Sparkles, ChevronRight, Trophy } from 'lucide-react';
import type { Database } from '@/lib/supabase/database.types';

type Project = Database['public']['Tables']['projects']['Row'] & {
  nex_score?: number;
};

interface MostInterestedHeroProps {
  projects: Project[];
}

export function MostInterestedHero({ projects }: MostInterestedHeroProps) {
  const [filter, setFilter] = useState<'week' | 'month' | 'all'>('week');
  
  if (!projects || projects.length === 0) return null;
  const topProjects = projects.slice(0, 3);

  return (
    <div className="w-full mb-6">
      {/* Header: Title + Time Filter */}
      <div className="flex items-center justify-between px-3 sm:px-4 mb-3">
        <div className="flex items-center gap-1.5">
          <Flame size={18} className="text-amber-500 fill-amber-500 animate-pulse" />
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Most Interested
          </h2>
        </div>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg px-2.5 py-1 pr-6 appearance-none focus:outline-none focus:border-cyan-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 text-[10px]">
            ▼
          </span>
        </div>
      </div>

      {/* Horizontal Snap Scroll Carousel (Moctale Style) */}
      <div className="flex gap-3 overflow-x-auto px-3 sm:px-4 no-scrollbar snap-x snap-mandatory pb-1">
        {topProjects.map((proj, idx) => (
          <Link
            key={proj.id}
            href={`/explore/${proj.slug}`}
            className="snap-start shrink-0 w-[84vw] max-w-[360px] group block"
          >
            <div className="relative flex items-center p-3 rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-zinc-950 border border-zinc-800/90 hover:border-cyan-500/40 active:scale-[0.99] transition-all shadow-lg overflow-hidden">
              {/* Big Rank Number (Moctale #1, #2 Graphic) */}
              <div className="font-display font-black text-4xl sm:text-5xl text-zinc-800 group-hover:text-cyan-500/30 transition-colors w-10 sm:w-12 shrink-0 text-center select-none">
                {idx + 1}
              </div>

              {/* Poster Thumbnail */}
              <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800 shadow-md mr-3">
                <img
                  src={proj.thumbnail_url || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=300&q=80'}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {proj.nex_score && (
                  <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[9px] font-mono font-bold text-cyan-300 border border-cyan-500/30">
                    ★ {proj.nex_score}
                  </div>
                )}
              </div>

              {/* Content Details */}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                  {proj.category} • {proj.team_name}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400">
                    <Flame size={12} className="fill-amber-400" />
                    <span>{proj.vote_count ? `${proj.vote_count} Interested` : 'Trending'}</span>
                  </span>
                </div>
              </div>

              <ChevronRight size={18} className="text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
