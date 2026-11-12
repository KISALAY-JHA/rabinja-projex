'use client';

import Link from 'next/link';
import { Bookmark, FolderPlus, ArrowRight, Eye, TrendingUp, Sparkles, Code2 } from 'lucide-react';
import { SAMPLE_PROJECTS } from '@/lib/sample-data';

export default function CollectionsPage() {
  const savedProjects = SAMPLE_PROJECTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* ── Subheader ── */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-surface)] py-10">
        <div className="container-page flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-purple text-xs">
                <Bookmark size={12} /> PERSONAL REPOSITORY
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Saved Collections
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Curate, organize, and study groundbreaking Rabinjathon architectures and benchmark projects.
            </p>
          </div>

          <button className="btn btn-primary self-start md:self-auto text-xs">
            <FolderPlus size={14} /> New Collection
          </button>
        </div>
      </div>

      {/* ── Collections Grid ── */}
      <div className="container-page py-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="card p-6 border-[var(--purple)]/40 bg-[var(--bg-surface)]">
            <div className="flex items-center justify-between mb-3">
              <span className="badge badge-purple text-[10px]">Active Collection</span>
              <span className="text-xs text-[var(--text-muted)] font-mono">{savedProjects.length} Projects</span>
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-1">
              Deep Tech & AI Architecture
            </h3>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              High-ranking systems analyzed with NEX AI for distributed throughput and LLM optimizations.
            </p>
            <div className="text-xs text-[var(--text-secondary)] flex items-center gap-2">
              <span>Updated recently</span>
              <span>•</span>
              <span className="text-[var(--cyan)]">Private Access</span>
            </div>
          </div>

          <div className="card p-6 border-[var(--border)] bg-[var(--bg-surface)] flex flex-col justify-center items-center text-center border-dashed">
            <FolderPlus size={28} className="text-[var(--text-muted)] mb-3" />
            <h4 className="font-display font-bold text-white text-sm mb-1">Create Custom Folder</h4>
            <p className="text-xs text-[var(--text-muted)] mb-4 max-w-xs">
              Segment projects by tech stack, competition track, or evaluation scores.
            </p>
            <button className="btn btn-secondary text-xs">Create Folder</button>
          </div>
        </div>

        {/* Saved Projects List */}
        <div>
          <h2 className="font-display text-xl font-bold text-white mb-5 flex items-center gap-2">
            <Sparkles size={18} className="text-[var(--amber)]" />
            Bookmarked Projects
          </h2>

          {savedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {savedProjects.map((p) => (
                <div key={p.id} className="card p-5 group flex flex-col justify-between hover:border-[var(--cyan)] transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge badge-purple text-[10px]">{p.category}</span>
                      <span className="text-xs font-mono text-[var(--green)]">▲ {p.vote_count}</span>
                    </div>
                    <Link href={`/explore/${p.slug}`}>
                      <h3 className="font-display font-bold text-base text-white group-hover:text-[var(--cyan)] transition-colors mb-2">
                        {p.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-4">
                      {p.subtitle || p.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {p.tech_stack.slice(0, 3).map((t) => (
                        <span key={t} className="badge badge-gray text-[9px]">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
                    <span className="text-[var(--text-muted)]">{p.team_name}</span>
                    <Link
                      href={`/explore/${p.slug}`}
                      className="text-[var(--cyan)] hover:text-white font-medium flex items-center gap-1 transition-colors"
                    >
                      View <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center border-dashed border-[var(--border)]">
              <Bookmark size={28} className="mx-auto mb-3 text-[var(--cyan)] opacity-60" />
              <h4 className="font-display font-bold text-white text-base mb-1">No Bookmarked Projects Yet</h4>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto mb-4 leading-relaxed">
                Bookmark projects as you browse the explore feed to save them to your personal intelligence repository.
              </p>
              <Link href="/explore" className="btn btn-secondary text-xs">
                Explore Projects
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
