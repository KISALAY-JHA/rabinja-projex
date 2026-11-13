'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, FolderPlus, ArrowRight, Eye, TrendingUp, Sparkles, Code2, Compass } from 'lucide-react';
import { RABINJA_PROJECTS, type ProjectItem } from '@/lib/sample-data';
import { getStoredUser } from '@/lib/api-client';

export default function CollectionsPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('rabinja_saved_projects') || '[]');
      setSavedIds(stored);
    } catch {
      setSavedIds([]);
    }
    setIsLoaded(true);
  }, []);

  const savedProjects = RABINJA_PROJECTS.filter(
    (p) => savedIds.includes(p.id) || savedIds.includes(p.slug)
  );

  return (
    <div className="min-h-screen bg-black text-white pt-16 pb-24">
      {/* ── Subheader ── */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/80 py-10">
        <div className="container-page flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-purple text-xs font-mono">
                <Bookmark size={12} /> PERSONAL REPOSITORY
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2">
              Saved Innovations
            </h1>
            <p className="text-sm text-zinc-400">
              Your bookmarked RABINJA projects, architectures, and technical references.
            </p>
          </div>
        </div>
      </div>

      {/* ── Collections Content ── */}
      <div className="container-page py-10 space-y-10">
        {/* Saved Projects List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-400" />
              Bookmarked Projects ({savedProjects.length})
            </h2>
            <Link href="/explore" className="btn btn-ghost text-xs text-cyan-400">
              Browse All Projects →
            </Link>
          </div>

          {savedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {savedProjects.map((p) => (
                <div key={p.id} className="card p-5 group flex flex-col justify-between bg-[#05070E] border border-cyan-500/30 hover:border-cyan-400 transition-all rounded-2xl">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge badge-purple text-[10px]">{p.category}</span>
                      <span className="text-xs font-mono text-emerald-400">▲ {p.vote_count} votes</span>
                    </div>
                    <Link href={`/explore/${p.slug}`}>
                      <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-400 transition-colors mb-2">
                        {p.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                      {p.subtitle || p.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {p.tech_stack.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-cyan-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span>{p.team_name}</span>
                    <Link
                      href={`/explore/${p.slug}`}
                      className="text-cyan-400 hover:text-white flex items-center gap-1"
                    >
                      Inspect <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="hud-panel p-10 text-center max-w-xl mx-auto rounded-3xl bg-[#05070E] border border-zinc-800">
              <Bookmark size={36} className="mx-auto mb-3 text-cyan-400 opacity-60" />
              <h3 className="font-display text-lg font-bold text-white mb-2">
                No Bookmarked Projects Yet
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-md mx-auto mb-6">
                Explore the 8 official RABINJA Brand innovations and tap the bookmark icon on any project card to save it here.
              </p>
              <Link href="/explore" className="btn btn-primary text-xs py-2.5 px-5 font-bold">
                <Compass size={14} />
                Explore RABINJA Innovations
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
