'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, SlidersHorizontal, Flame, Sparkles, Trophy,
  Compass, HeartPulse, Leaf, Shield, Cpu, GraduationCap, Coins,
  Code2, Filter
} from 'lucide-react';
import { SAMPLE_PROJECTS } from '@/lib/sample-data';
import { MobileProjectCard } from '@/components/project/MobileProjectCard';
import { MostInterestedHero } from '@/components/project/MostInterestedHero';
import { AdSlot } from '@/components/ads/AdSlot';

const SEGMENT_TABS = [
  { key: 'all', label: 'All Projects', icon: Compass },
  { key: 'trending', label: 'Trending', icon: Flame },
  { key: 'top_nex', label: 'NEX Top Rated', icon: Sparkles },
  { key: 'hackathons', label: 'Active Events', icon: Trophy },
];

const TRACK_CHIPS = [
  'All Tracks', 'DeepTech', 'HealthTech', 'CleanTech', 'Cybersecurity', 'FinTech', 'EdTech'
];

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTrack, setSelectedTrack] = useState('All Tracks');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let list = [...SAMPLE_PROJECTS];

    // Filter by track
    if (selectedTrack !== 'All Tracks') {
      list = list.filter((p) => p.category.toLowerCase() === selectedTrack.toLowerCase());
    }

    // Filter by tab
    if (activeTab === 'trending') {
      list = list.sort((a, b) => b.vote_count - a.vote_count);
    } else if (activeTab === 'top_nex') {
      list = list.sort((a, b) => (b.nex_score || 0) - (a.nex_score || 0));
    } else if (activeTab === 'hackathons') {
      list = list.filter((p) => p.event_id !== null);
    }

    // Search query filter
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

    return list;
  }, [activeTab, selectedTrack, query]);

  return (
    <div className="min-h-screen bg-black text-white pb-24 pt-16">
      {/* ── Search Bar Input (Moctale Search Page Style) ── */}
      <div className="px-3 sm:px-4 pt-3 pb-2 max-w-4xl mx-auto">
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-zinc-400 pointer-events-none" />
          <input
            id="explore-search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search innovations, stacks, teams, or tags..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all"
          />
        </div>
      </div>

      {/* ── Segmented Top Tabs (Moctale Batch 2 Screenshot 5 Style) ── */}
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
                    ? 'bg-white text-black shadow-md'
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
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-semibold'
                    : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Most Interested Hero (Horizontal Snap Carousel) ── */}
      {!query && (
        <div className="max-w-4xl mx-auto">
          <MostInterestedHero projects={SAMPLE_PROJECTS} />
          {/* Native Advertisement Spot (Moctale Screen 1 Placement) */}
          <div className="px-3 sm:px-4">
            <AdSlot adSlotId="1234567890" />
          </div>
        </div>
      )}

      {/* ── Main 2-Column Mobile Grid (Moctale Style) ── */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            {filtered.length} {filtered.length === 1 ? 'Innovation' : 'Innovations'}
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            Tap poster to inspect
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 px-4 bg-zinc-950/60 rounded-3xl border border-zinc-800/80 my-4">
            <Compass size={36} className="mx-auto text-zinc-600 mb-3" />
            <h3 className="text-sm font-bold text-white mb-1">No innovations found</h3>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto mb-4">
              Try adjusting your search terms or clearing track filters.
            </p>
            <button
              onClick={() => {
                setSelectedTrack('All Tracks');
                setQuery('');
                setActiveTab('all');
              }}
              className="text-xs font-mono font-bold px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-cyan-400 hover:text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filtered.map((proj, idx) => (
              <MobileProjectCard
                key={proj.id}
                project={proj}
                rank={activeTab === 'trending' ? idx + 1 : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
