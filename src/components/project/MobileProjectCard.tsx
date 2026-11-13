'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Flame, Bookmark, ArrowUpRight, Star } from 'lucide-react';
import type { ProjectItem } from '@/lib/sample-data';
import { getStoredUser, apiToggleVote, apiGetVote } from '@/lib/api-client';

interface MobileProjectCardProps {
  project: ProjectItem;
  rank?: number;
  featured?: boolean;
}

export function MobileProjectCard({ project, rank, featured }: MobileProjectCardProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [voteCount, setVoteCount] = useState(project.vote_count || 0);
  const [hasVoted, setHasVoted] = useState(false);
  const [loadingVote, setLoadingVote] = useState(false);

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      apiGetVote(project.id, user.id).then((res) => {
        setVoteCount(res.voteCount);
        setHasVoted(res.hasVoted);
      });
    }

    try {
      const saved = JSON.parse(localStorage.getItem('rabinja_saved_projects') || '[]');
      setIsSaved(saved.includes(project.id) || saved.includes(project.slug));
    } catch {
      // ignore
    }
  }, [project.id, project.slug]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
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

  const handleVote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const user = getStoredUser();
    if (!user) {
      router.push('/auth/signup');
      return;
    }

    if (loadingVote) return;
    setLoadingVote(true);
    try {
      const res = await apiToggleVote(project.id, user.id);
      setVoteCount(res.voteCount);
      setHasVoted(res.hasVoted);
    } catch {
      // ignore
    } finally {
      setLoadingVote(false);
    }
  };

  const isRabinjaBrand = project.is_rabinja_brand || project.category === 'RABINJA Original';

  return (
    <Link
      href={`/explore/${project.slug}`}
      className="group block h-full select-none"
    >
      <div className={`flex flex-col h-full rounded-2xl bg-[#05070E] border transition-all duration-200 overflow-hidden shadow-lg ${
        isRabinjaBrand
          ? 'border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,212,255,0.25)]'
          : 'border-zinc-800 hover:border-zinc-700'
      }`}>
        {/* Poster / Cover Image */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
          <img
            src={project.thumbnail_url || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80'}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

          {/* Top Left Badge: Special RABINJA Original or Rank */}
          <div className="absolute top-2 left-2 flex items-center gap-1">
            {isRabinjaBrand ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/90 backdrop-blur-md border border-cyan-400/60 text-[9px] font-mono font-bold text-cyan-300 shadow-[0_0_10px_rgba(0,212,255,0.4)]">
                <Sparkles size={9} className="text-cyan-400" />
                <span>RABINJA ORIGINAL</span>
              </span>
            ) : rank !== undefined ? (
              <span className="w-6 h-6 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono font-bold text-xs flex items-center justify-center">
                {rank}
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-md border border-zinc-700 text-[10px] font-mono text-zinc-300">
                {project.category}
              </span>
            )}
          </div>

          {/* Top Right Save Button */}
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
            <span className="inline-block text-[9px] font-mono uppercase tracking-wider text-cyan-300 font-bold px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-cyan-500/30 mb-0.5">
              {project.team_name}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-3 flex flex-col flex-1 justify-between text-left">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-cyan-300 transition-colors leading-snug">
              {project.title}
            </h3>
            <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
              {project.subtitle || project.description}
            </p>
          </div>

          {/* Metrics Footer (Real Community Votes, Zero Fake Counts) */}
          <div className="mt-3 pt-2 border-t border-zinc-900 flex items-center justify-between text-[11px]">
            <button
              onClick={handleVote}
              disabled={loadingVote}
              className={`flex items-center gap-1 font-mono font-bold transition-all px-1.5 py-0.5 rounded-md ${
                hasVoted
                  ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Cast verified vote"
            >
              <Flame size={12} className={hasVoted ? 'text-cyan-400 fill-cyan-400' : 'text-amber-500'} />
              <span>{voteCount}</span>
            </button>

            <span className="text-[10px] font-mono text-cyan-400/80 flex items-center gap-0.5 group-hover:text-cyan-300 transition-colors">
              <span>Inspect</span>
              <ArrowUpRight size={11} className="text-cyan-400" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
