'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Flame, Bookmark, ArrowUpRight } from 'lucide-react';
import type { Database } from '@/lib/supabase/database.types';

type Project = Database['public']['Tables']['projects']['Row'] & {
  nex_score?: number;
};

interface MobileProjectCardProps {
  project: Project;
  rank?: number;
  featured?: boolean;
}

export function MobileProjectCard({ project, rank, featured }: MobileProjectCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [voteCount, setVoteCount] = useState(project.vote_count || 0);
  const [hasVoted, setHasVoted] = useState(false);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    // sync to localStorage collections
    try {
      const saved = JSON.parse(localStorage.getItem('rabinja_saved_projects') || '[]');
      if (!isSaved) {
        if (!saved.includes(project.id)) saved.push(project.id);
      } else {
        const idx = saved.indexOf(project.id);
        if (idx !== -1) saved.splice(idx, 1);
      }
      localStorage.setItem('rabinja_saved_projects', JSON.stringify(saved));
      window.dispatchEvent(new Event('rabinja-saved-change'));
    } catch {
      // ignore
    }
  };

  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasVoted) {
      setVoteCount(prev => prev + 1);
      setHasVoted(true);
    } else {
      setVoteCount(prev => Math.max(0, prev - 1));
      setHasVoted(false);
    }
  };

  return (
    <Link
      href={`/explore/${project.slug}`}
      className="group block h-full select-none"
    >
      <div className="flex flex-col h-full rounded-2xl bg-zinc-950/90 border border-zinc-800/80 overflow-hidden hover:border-cyan-500/40 active:scale-[0.98] transition-all duration-150 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
        {/* Poster / Cover Image */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
          <img
            src={project.thumbnail_url || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Dark gradient overlay for bottom text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* Top Left Badge: NEX Score or Rank */}
          <div className="absolute top-2 left-2 flex items-center gap-1">
            {rank !== undefined ? (
              <span className="w-6 h-6 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono font-bold text-xs flex items-center justify-center shadow-md">
                {rank}
              </span>
            ) : project.nex_score ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300 shadow-md">
                <Sparkles size={10} className="text-cyan-400" />
                <span>{project.nex_score}</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-md border border-zinc-700 text-[10px] font-mono font-medium text-zinc-300">
                {project.category}
              </span>
            )}
          </div>

          {/* Top Right Save/Bookmark Button */}
          <button
            onClick={toggleSave}
            className={`absolute top-2 right-2 w-7 h-7 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
              isSaved
                ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,212,255,0.6)]'
                : 'bg-black/60 text-zinc-300 hover:text-white border border-white/10'
            }`}
            aria-label="Save project"
          >
            <Bookmark size={13} fill={isSaved ? 'currentColor' : 'none'} />
          </button>

          {/* Bottom Overlaid Metadata in Image */}
          <div className="absolute bottom-2 left-2 right-2">
            <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-semibold px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-cyan-500/20 mb-1">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-3 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-cyan-300 transition-colors leading-snug">
              {project.title}
            </h3>
            <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
              {project.team_name} • 2026
            </p>
          </div>

          {/* Metrics Footer (Moctale Style) */}
          <div className="mt-2.5 pt-2 border-t border-zinc-900 flex items-center justify-between text-[11px]">
            <button
              onClick={handleVote}
              className={`flex items-center gap-1 font-mono font-bold transition-colors ${
                hasVoted ? 'text-cyan-400' : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Upvote project"
            >
              <Flame size={12} className={hasVoted ? 'text-cyan-400 fill-cyan-400' : 'text-amber-500'} />
              <span>{voteCount >= 1000 ? `${(voteCount / 1000).toFixed(1)}k` : voteCount}</span>
            </button>

            <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-0.5">
              <span>View</span>
              <ArrowUpRight size={11} className="text-zinc-600 group-hover:text-cyan-400 transition-colors" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
