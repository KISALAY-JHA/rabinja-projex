'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, SlidersHorizontal, Flame, Sparkles, Trophy,
  Compass, HeartPulse, Leaf, Shield, Cpu, GraduationCap, Coins,
  Code2, Filter, Star
} from 'lucide-react';
import { RABINJA_PROJECTS, type ProjectItem } from '@/lib/sample-data';
import { MobileProjectCard } from '@/components/project/MobileProjectCard';
import { MostInterestedHero } from '@/components/project/MostInterestedHero';
import { AdSlot } from '@/components/ads/AdSlot';
import { apiFetchProjects } from '@/lib/api-client';

const SEGMENT_TABS = [
  { key: 'rabinja_brand', label: '⭐ RABINJA Originals', icon: Sparkles },
  { key: 'all', label: 'All Projects', icon: Compass },
  { key: 'trending', label: 'Most Voted', icon: Flame },
  { key: 'hackathons', label: 'Rabinjathon 2026', icon: Trophy },
];

const TRACK_CHIPS = [
  'All Tracks', 'RABINJA Original', 'Hardware & IoT', 'Health & Mind', 'FinTech', 'Social & Neural', 'IP & Security'
];

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState('rabinja_brand');
  const [selectedTrack, setSelectedTrack] = useState('All Tracks');
  const [query, setQuery] = useState('');
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(RABINJA_PROJECTS);

  // Fetch live projects from backend
  useEffect(() => {
    apiFetchProjects().then((projs) => {
      if (projs && projs.length > 0) {
        setProjectsList(projs);
      }
    });
  }, []);

  const filtered = useMemo(() => {
    let list = [...projectsList];

    // Filter by tab
    if (activeTab === 'rabinja_brand') {
      list = list.filter((p) => p.is_rabinja_brand || p.category === 'RABINJA Original');
    } else if (activeTab === 'trending') {
      list = list.sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0));
    } else if (activeTab === 'hackathons') {
      list = list.filter((p) => p.event_id !== null);
    }

    // Filter by track chip
    if (selectedTrack !== 'All Tracks') {
      if (selectedTrack === 'RABINJA Original') {
        list = list.filter((p) => p.is_rabinja_brand || p.category === 'RABINJA Original');
      } else {
        const t = selectedTrack.toLowerCase();
        list = list.filter((p) =>
          p.category.toLowerCase().includes(t) ||
          p.tags.some((tag) => tag.toLowerCase().includes(t))
        );
      }
    }

    // Search query filter
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle?.toLowerCase().includes(q) ||
          p.team_name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.tech_stack.some((ts) => ts.toLowerCase().includes(q))
      );
    }

    return list;
  }, [activeTab, selectedTrack, query, projectsList]);

  return (
    <div className="min-h-screen bg-black text-white pb-24 pt-16">
      {/* ── Brand Header Banner ── */}
      <div className="px-3 sm:px-4 pt-4 pb-2 max-w-4xl mx-auto">
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#05070E] via-zinc-950 to-[#05070E] border border-cyan-500/30 flex items-center justify-between gap-3 shadow-[0_0_30px_rgba(0,212,255,0.12)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl overflow-hidden bg-black border border-cyan-400/50 p-1 shrink-0 flex items-center justify-center">
              <img src="/logo.png" alt="RABINJA" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                RABINJA LABS // OFFICIAL REPOSITORY
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                8 Flagship Innovations under the RABINJA Brand
              </span>
            </div>
          </div>
          <Link
            href="/auth/signup"
            className="btn btn-ghost text-[11px] font-mono text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 py-1.5 px-3 shrink-0"
          >
            Create Profile Free →
          </Link>
        </div>
      </div>

      {/* ── Search Bar Input ── */}
      <div className="px-3 sm:px-4 pt-2 pb-2 max-w-4xl mx-auto">
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-zinc-400 pointer-events-none" />
          <input
            id="explore-search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search RABINJA projects: Projex, Therapist, Smart Desk, Pet Shield, Investra..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all font-mono"
          />
        </div>
      </div>

      {/* ── Segmented Top Tabs ── */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 mt-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-zinc-800/80 pb-2">
          {SEGMENT_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all active:scale-95 ${
                  isActive
                    ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                    : 'text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/60'
                }`}
              >
                <Icon size={13} className={isActive ? 'text-black' : 'text-zinc-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Secondary Domain Filter Chips ── */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 mt-2.5 mb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {TRACK_CHIPS.map((chip) => {
            const isSelected = selectedTrack === chip;
            return (
              <button
                key={chip}
                onClick={() => setSelectedTrack(chip)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono whitespace-nowrap transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                    : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Most Interested Hero ── */}
      {!query && activeTab !== 'rabinja_brand' && (
        <div className="max-w-4xl mx-auto">
          <MostInterestedHero projects={projectsList} />
        </div>
      )}

      {/* ── Main 2-Column Mobile Grid ── */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            {filtered.length} {filtered.length === 1 ? 'Innovation' : 'Innovations'}
          </span>
          <span className="text-[11px] text-cyan-400 font-mono font-medium">
            RABINJA Brand Ecosystem
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 px-4 bg-zinc-950/60 rounded-3xl border border-zinc-800/80 my-4">
            <Compass size={36} className="mx-auto text-zinc-600 mb-3" />
            <h3 className="font-display text-base font-bold text-white mb-1">
              No Projects Found
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4 leading-relaxed font-mono">
              Try adjusting your search terms or switch category filter.
            </p>
            <button
              onClick={() => {
                setActiveTab('rabinja_brand');
                setSelectedTrack('All Tracks');
                setQuery('');
              }}
              className="btn btn-secondary text-xs py-2 px-3 font-mono"
            >
              Reset to RABINJA Originals
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((proj, idx) => (
              <MobileProjectCard
                key={proj.id}
                project={proj}
                featured={proj.status === 'featured'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
