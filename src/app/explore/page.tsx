'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, Filter, TrendingUp, Eye, MessageSquare,
  Compass, Code2, Cpu, Leaf, Shield, GraduationCap,
  HeartPulse, SlidersHorizontal, ChevronDown, Zap,
} from 'lucide-react';
import { SAMPLE_PROJECTS } from '@/lib/sample-data';
import { AdSlot } from '@/components/ads/AdSlot';

const CATEGORIES = ['All', 'HealthTech', 'CleanTech', 'Cybersecurity', 'AgriTech', 'EdTech', 'FinTech', 'Deep Tech'];
const SORT_OPTIONS = [
  { label: 'Most Votes', value: 'votes' },
  { label: 'Most Viewed', value: 'views' },
  { label: 'Newest', value: 'newest' },
  { label: 'Top Scored', value: 'score' },
];

const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  HealthTech: HeartPulse, CleanTech: Leaf, Cybersecurity: Shield,
  AgriTech: Cpu, EdTech: GraduationCap, 'Deep Tech': Code2, All: Compass,
};

const CATEGORY_COLORS: Record<string, string> = {
  HealthTech: 'var(--red)', CleanTech: 'var(--green)', Cybersecurity: 'var(--cyan)',
  AgriTech: 'var(--amber)', EdTech: 'var(--purple)', FinTech: 'var(--blue)', 'Deep Tech': 'var(--indigo)',
};

const CARD_CLASS: Record<string, string> = {
  HealthTech: 'card-red', CleanTech: 'card-green', Cybersecurity: 'card-cyan',
  AgriTech: 'card-amber', EdTech: 'card-purple', FinTech: 'card-blue', 'Deep Tech': 'card-purple',
};

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function ExplorePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('votes');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...SAMPLE_PROJECTS];
    if (category !== 'All') list = list.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle?.toLowerCase().includes(q) ||
          p.team_name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (sort === 'votes')  list.sort((a, b) => b.vote_count - a.vote_count);
    if (sort === 'views')  list.sort((a, b) => b.views - a.views);
    if (sort === 'newest') list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return list;
  }, [query, category, sort]);

  return (
    <div className="min-h-screen bg-bg-primary bg-grid">
      {/* Page header */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-surface)]">
        <div className="container-page py-10">
          <div className="flex items-center gap-2 mb-2">
            <Compass size={18} className="text-[var(--blue)]" />
            <span className="text-xs font-semibold text-[var(--blue)] uppercase tracking-widest">Discovery</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Explore Projects
          </h1>
          <p className="text-[var(--text-secondary)] max-w-xl">
            {SAMPLE_PROJECTS.length > 0
              ? `Browse ${SAMPLE_PROJECTS.length}+ groundbreaking projects from India's most innovative teams.`
              : "Discover, evaluate, and showcase groundbreaking engineering projects from India's most innovative teams."}
          </p>

          {/* Search bar */}
          <div className="mt-6 flex items-center gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                id="explore-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, tech, team, or tag..."
                className="input pl-9"
                autoFocus
              />
            </div>
            <button
              id="explore-filter-btn"
              onClick={() => setShowFilters(!showFilters)}
              className={`btn btn-secondary flex items-center gap-2 ${showFilters ? 'border-[var(--purple)] text-[var(--purple)]' : ''}`}
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>

          {/* Sort + filters row */}
          {showFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-3 animate-fade-up">
              <span className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider">Sort by:</span>
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  id={`sort-${opt.value}`}
                  onClick={() => setSort(opt.value)}
                  className={`btn btn-sm ${sort === opt.value ? 'btn-primary' : 'btn-ghost'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container-page py-8">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
          {CATEGORIES.map((cat) => {
            const CatIcon = CATEGORY_ICONS[cat] ?? Code2;
            const isActive = category === cat;
            const color = CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                id={`category-${cat.toLowerCase().replace(/ /g, '-')}`}
                onClick={() => setCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap border transition-all ${
                  isActive
                    ? 'text-white border-current'
                    : 'text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]'
                }`}
                style={isActive ? {
                  color: color,
                  borderColor: color,
                  background: `${color}18`,
                  boxShadow: `0 0 20px ${color}30`,
                } : {}}
              >
                <CatIcon size={15} />
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-[var(--text-muted)]">
            <strong className="text-white">{filtered.length}</strong> projects found
            {category !== 'All' && <> in <strong className="text-white">{category}</strong></>}
            {query && <> matching <strong className="text-white">&quot;{query}&quot;</strong></>}
          </p>
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Filter size={13} />
            Sorted by: <strong className="text-white">{SORT_OPTIONS.find(o => o.value === sort)?.label}</strong>
          </div>
        </div>

        {/* ── Monetization Slot in Explore ── */}
        <AdSlot
          format="mobile-inline"
          title="Build & Deploy Your Hackathon Ideas with Cloudflare Workers"
          description="Fast serverless execution, global KV storage, and zero cold starts. Perfect for hackathon builders."
          href="https://workers.cloudflare.com"
          sponsorLabel="Ecosystem Infrastructure Sponsor"
        />

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 card p-8 max-w-lg mx-auto border-[var(--cyan)]/30 bg-[var(--bg-surface)]">
            <div className="w-14 h-14 rounded-2xl bg-gradient-brand mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Zap size={24} className="text-[#04060C]" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">No Projects Published Yet</h3>
            <p className="text-[var(--text-muted)] text-sm mb-6 leading-relaxed">
              Be the first innovation team to showcase your codebase, simulate judge evaluations with NEX AI, and claim rank #1.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/auth/signup" className="btn btn-primary text-xs">
                Submit Your Project
              </Link>
              <Link href="/nex" className="btn btn-secondary text-xs">
                Simulate NEX AI
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((project) => {
              const cardCls = CARD_CLASS[project.category] ?? 'card-blue';
              const catColor = CATEGORY_COLORS[project.category] ?? 'var(--blue)';
              const CatIcon = CATEGORY_ICONS[project.category] ?? Code2;

              return (
                <Link
                  key={project.id}
                  href={`/explore/${project.slug}`}
                  id={`explore-project-${project.id}`}
                >
                  <article className={`card ${cardCls} h-full p-6 flex flex-col cursor-pointer`}>
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.status === 'featured' && (
                          <span className="badge badge-amber">⭐ Featured</span>
                        )}
                        <span
                          className="badge"
                          style={{
                            background: `${catColor}20`,
                            color: catColor,
                            border: `1px solid ${catColor}40`,
                          }}
                        >
                          <CatIcon size={10} />
                          {project.category}
                        </span>
                      </div>
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${catColor}18`, border: `1px solid ${catColor}30` }}
                      >
                        <CatIcon size={16} style={{ color: catColor }} />
                      </div>
                    </div>

                    {/* Title & desc */}
                    <h2 className="font-display font-bold text-white text-xl mb-1 leading-tight">
                      {project.title}
                    </h2>
                    {project.subtitle && (
                      <p className="text-xs text-[var(--text-secondary)] mb-3 font-medium">{project.subtitle}</p>
                    )}
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 truncate-3">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                      {project.tech_stack.slice(0, 3).map((t) => (
                        <span key={t} className="badge badge-gray text-[10px]">{t}</span>
                      ))}
                      {project.tech_stack.length > 3 && (
                        <span className="badge badge-gray text-[10px]">+{project.tech_stack.length - 3}</span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <span className="font-semibold text-[var(--text-secondary)] truncate max-w-[120px]">
                        {project.team_name}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-[var(--green)]">
                          <TrendingUp size={11} /> {formatCount(project.vote_count)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={11} /> {formatCount(project.views)}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
