'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  Award,
  ExternalLink,
  CheckCircle2,
  MessageSquare,
  ChevronRight,
  Layers,
  Video,
  Presentation,
  Search,
  Filter,
  Globe,
  Sparkles,
  X,
  PlusCircle,
  Share2
} from 'lucide-react';
import { SAMPLE_EVENTS } from '@/lib/sample-data';
import {
  GLOBAL_EVENTS_LIST,
  COUNTRY_BOXES,
  type GlobalEventItem
} from '@/lib/global-events-data';

const primaryEvent = SAMPLE_EVENTS[0];

// ── Helpers ──────────────────────────────────────────────────────────────────

function getRoundStatus(start: string, end: string): 'upcoming' | 'open' | 'closed' {
  const now = new Date();
  const s = new Date(start);
  const e = new Date(end);
  if (now < s) return 'upcoming';
  if (now >= s && now <= e) return 'open';
  return 'closed';
}

function fmtDateRange(start: string, end: string) {
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  return `${new Date(start).toLocaleDateString('en-IN', opts)} – ${new Date(end).toLocaleDateString('en-IN', opts)}`;
}

const ROUND_ICONS = [Video, Layers, Presentation];

const STATUS_STYLES: Record<string, string> = {
  upcoming: 'bg-zinc-800 text-zinc-400 border border-zinc-700',
  open:     'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/40',
  closed:   'bg-red-900/20 text-red-400 border border-red-900/40',
};
const STATUS_LABELS: Record<string, string> = {
  upcoming: 'Upcoming',
  open:     'Open',
  closed:   'Closed',
};

// ── Main Component ────────────────────────────────────────────────────────────

export default function EventsPage() {
  const [activeView, setActiveView] = useState<'prime' | 'explore'>('prime');

  // Directory filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [selectedMode, setSelectedMode] = useState<string>('ALL');
  const [selectedEventModal, setSelectedEventModal] = useState<GlobalEventItem | null>(null);
  const [listModalOpen, setListModalOpen] = useState(false);

  // List Event Form State
  const [submitEventName, setSubmitEventName] = useState('');
  const [submitOrg, setSubmitOrg] = useState('');
  const [submitLink, setSubmitLink] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Filtered & Sorted events with Rabinjathon ALWAYS pinned on top
  const filteredEvents = useMemo(() => {
    let list = [...GLOBAL_EVENTS_LIST];

    // Filter by country
    if (selectedCountry !== 'ALL') {
      list = list.filter((e) => e.countryCode === selectedCountry);
    }

    // Filter by mode
    if (selectedMode !== 'ALL') {
      list = list.filter((e) => e.mode === selectedMode);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.organizer.toLowerCase().includes(q) ||
          e.domain.toLowerCase().includes(q) ||
          e.country.toLowerCase().includes(q)
      );
    }

    // Sort: Rabinjathon Official always first, then by name
    return list.sort((a, b) => {
      if (a.isRabinjaOfficial && !b.isRabinjaOfficial) return -1;
      if (!a.isRabinjaOfficial && b.isRabinjaOfficial) return 1;
      return 0;
    });
  }, [selectedCountry, selectedMode, searchQuery]);

  const handleListSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setListModalOpen(false);
      setSubmitEventName('');
      setSubmitOrg('');
      setSubmitLink('');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24 text-white">

      {/* ── TOP EVENT NAVIGATION BAR (Switcher between Rabinjathon & Explore More Events) ── */}
      <div className="border-b border-cyan-500/20 bg-black/90 sticky top-14 z-30 backdrop-blur-xl">
        <div className="container-page flex items-center justify-between py-2.5 px-3 sm:px-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('prime')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all active:scale-95 ${
                activeView === 'prime'
                  ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                  : 'text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Trophy size={14} className={activeView === 'prime' ? 'text-black' : 'text-cyan-400'} />
              <span>Rabinjathon: Prime 1</span>
            </button>

            <button
              onClick={() => setActiveView('explore')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all active:scale-95 ${
                activeView === 'explore'
                  ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                  : 'text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Globe size={14} className={activeView === 'explore' ? 'text-black' : 'text-cyan-400'} />
              <span>Explore More Events</span>
              <span className="hidden sm:inline-block ml-1 px-1.5 py-0.2 rounded-full bg-cyan-950 text-cyan-300 text-[10px] border border-cyan-500/40">
                Directory
              </span>
            </button>
          </div>

          {/* List Your Event Action (Right) */}
          <button
            onClick={() => setListModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 px-2.5 py-1.5 rounded-xl bg-cyan-950/40 transition-all shrink-0"
          >
            <PlusCircle size={13} />
            <span className="hidden sm:inline">Organizing an Event?</span>
            <span>List Event</span>
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          VIEW 1: RABINJATHON: PRIME 1 (OFFICIAL ARENA)
          ════════════════════════════════════════════════════════════════════════ */}
      {activeView === 'prime' && (
        <>
          {/* ═══ HERO BANNER ═══════════════════════════════════════════════════ */}
          <section className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg-primary)]">
            <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[var(--cyan)]/8 blur-3xl" />
            <div className="pointer-events-none absolute top-1/2 right-1/4 h-72 w-72 rounded-full bg-[var(--purple)]/8 blur-3xl" />

            <div className="container-page relative z-10 py-10 md:py-16">
              {/* Badges */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="badge badge-green flex items-center gap-1.5 text-xs px-3 py-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--green)]" />
                  Registration Open
                </span>
                <span className="badge badge-purple flex items-center gap-1.5 text-xs px-3 py-1">
                  <MapPin size={12} /> Online
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-surface-2)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                  <Users size={12} /> {primaryEvent.team_size}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display mb-3 max-w-4xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
                {primaryEvent.name}
              </h1>
              <p className="mb-2 text-sm font-medium text-[var(--cyan)]">by {primaryEvent.organizer}</p>
              <p className="mb-6 max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
                {primaryEvent.description}
              </p>

              {/* Mobile CTA Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row lg:hidden mb-4">
                <a
                  href={primaryEvent.register_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary text-xs justify-center shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                >
                  Register on Unstop <ExternalLink size={13} />
                </a>
                <a
                  href={primaryEvent.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary text-xs justify-center text-emerald-400 border-emerald-500/40"
                >
                  <MessageSquare size={13} /> Join WhatsApp Group
                </a>
              </div>
            </div>
          </section>

          {/* ═══ MAIN DETAILS (2-Column Grid on Laptop) ═════════════════════════ */}
          <section className="container-page py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column (2/3): Stages, Eligibility, Criteria, Rules */}
              <div className="lg:col-span-2 space-y-10">
                {/* 3-Round Timeline */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={20} className="text-[var(--cyan)]" />
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Stages & Timelines</h2>
                  </div>
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-cyan-500/20">
                    {primaryEvent.rounds.map((r, idx) => {
                      const Icon = ROUND_ICONS[idx] || Video;
                      const status = getRoundStatus(r.start, r.end);
                      return (
                        <div key={r.id} className="relative group">
                          <span className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-black border-2 border-cyan-400 flex items-center justify-center text-[10px] font-mono font-bold text-cyan-300">
                            {r.id}
                          </span>
                          <div className="p-4 sm:p-5 rounded-2xl bg-[#05070E] border border-cyan-500/20 group-hover:border-cyan-400/50 transition-all">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                                <Icon size={16} className="text-cyan-400" />
                                <span>Round {r.id} — {r.name}</span>
                              </h3>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${STATUS_STYLES[status]}`}>
                                {STATUS_LABELS[status]}
                              </span>
                            </div>
                            <div className="text-xs font-mono text-cyan-300 mb-2">
                              {fmtDateRange(r.start, r.end)} • Max duration: {r.maxDuration}
                            </div>
                            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                              {r.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Eligibility Grid */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users size={20} className="text-[var(--cyan)]" />
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Eligibility Criteria</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {primaryEvent.eligibility.map((el) => (
                      <div key={el} className="p-3 rounded-xl bg-[#05070E] border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <span>{el}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rules & Guidelines */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck size={20} className="text-[var(--cyan)]" />
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Event Rules & Integrity Policy</h2>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#05070E] border border-zinc-800 space-y-3 text-xs sm:text-sm text-zinc-300">
                    {primaryEvent.rules.map((rule, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <span className="text-cyan-400 font-mono font-bold shrink-0">{idx + 1}.</span>
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar (1/3): Sticky Action Panel */}
              <div className="space-y-6">
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#05070E] via-zinc-950 to-black border-2 border-cyan-500/40 shadow-[0_0_35px_rgba(0,212,255,0.15)] space-y-4">
                  <h3 className="font-display font-bold text-lg text-white">Register for Rabinjathon</h3>
                  <p className="text-xs text-zinc-400">
                    Registration is free and conducted directly on the official Unstop opportunity portal.
                  </p>
                  <a
                    href={primaryEvent.register_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full justify-center text-xs py-3 font-bold"
                  >
                    Register on Unstop Platform <ExternalLink size={14} />
                  </a>
                  <a
                    href={primaryEvent.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary w-full justify-center text-xs py-2.5 text-emerald-400 border-emerald-500/30"
                  >
                    <MessageSquare size={14} /> Join Official WhatsApp
                  </a>

                  <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-zinc-400">
                      <span>Registration Closes:</span>
                      <strong className="text-white">31 Dec 2026</strong>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Mode:</span>
                      <strong className="text-cyan-300">Online-First</strong>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Prizes:</span>
                      <strong className="text-amber-400">Participation Certificate</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          VIEW 2: EXPLORE MORE EVENTS DIRECTORY (SEARCH & COUNTRY BOXES)
          ════════════════════════════════════════════════════════════════════════ */}
      {activeView === 'explore' && (
        <section className="container-page py-8 space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300">
              <Globe size={13} />
              <span>GLOBAL & NATIONAL DIRECTORY</span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
              Discover Active Buildathons & Hackathons
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Filter by country or search for competitions worldwide. Official Rabinjathon events are always prioritized at the top.
            </p>
          </div>

          {/* ── OPTION 1: SEARCH & FILTER BAR ── */}
          <div className="p-4 rounded-2xl bg-[#05070E] border border-cyan-500/30 shadow-[0_0_30px_rgba(0,212,255,0.1)] space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search event name, organizer, domain (e.g. Rabinjathon, SIH, AI, Web3, Robotics)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-zinc-800 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs font-mono"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Mode Filters */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono pt-1">
              <span className="text-zinc-500 flex items-center gap-1 text-[11px]">
                <Filter size={12} /> Format:
              </span>
              {['ALL', 'Online', 'In-Person', 'Hybrid'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    selectedMode === mode
                      ? 'bg-cyan-400 text-black font-bold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {mode === 'ALL' ? 'All Modes' : mode}
                </button>
              ))}
            </div>
          </div>

          {/* ── OPTION 2: BOXES OF DIFFERENT COUNTRIES ── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Globe size={16} className="text-cyan-400" />
                <span>Browse by Country</span>
              </h2>
              <span className="text-[11px] font-mono text-zinc-500">
                {filteredEvents.length} events matching
              </span>
            </div>

            {/* Country Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {COUNTRY_BOXES.map((country) => {
                const isSelected = selectedCountry === country.code;
                return (
                  <button
                    key={country.code}
                    onClick={() => setSelectedCountry(country.code)}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all active:scale-95 border ${
                      isSelected
                        ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                        : 'bg-[#05070E] border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-2xl mb-1">{country.flag}</span>
                    <span className="text-xs font-bold leading-tight line-clamp-1">{country.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── EVENT LISTINGS (RABINJATHON PINNED AT TOP) ── */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  className={`p-5 rounded-2xl flex flex-col justify-between text-left transition-all border relative overflow-hidden group ${
                    evt.isRabinjaOfficial
                      ? 'bg-gradient-to-br from-[#070D1F] via-[#04060E] to-black border-cyan-400/60 shadow-[0_0_30px_rgba(0,212,255,0.25)]'
                      : 'bg-[#05070E] border-zinc-800 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]'
                  }`}
                >
                  {/* Pinned Badge for Rabinjathon */}
                  {evt.isRabinjaOfficial && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-400 via-cyan-500 to-blue-600 text-black text-[9px] font-mono font-extrabold uppercase px-3 py-0.5 rounded-bl-xl shadow-md">
                      ⭐ RABINJA SQUAD // OFFICIAL
                    </div>
                  )}

                  <div>
                    {/* Header with Flag, Logo & Mode */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-cyan-500/30 p-1 flex items-center justify-center shrink-0">
                          <img src={evt.logo} alt={evt.name} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">{evt.flag}</span>
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{evt.country}</span>
                          </div>
                          <span className="text-[10px] font-mono text-cyan-400 font-semibold">{evt.organizer}</span>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                        evt.status === 'Registration Open' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-zinc-900 text-zinc-400'
                      }`}>
                        {evt.status}
                      </span>
                    </div>

                    {/* Event Name */}
                    <h3 className="font-display text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5 line-clamp-1">
                      {evt.name}
                    </h3>

                    {/* Brief description */}
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                      {evt.brief}
                    </p>

                    {/* Meta chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4 text-[10px] font-mono text-zinc-300">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                        {evt.mode}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                        {evt.teamSize}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-amber-400">
                        {evt.prize}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-zinc-900 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedEventModal(evt)}
                      className="text-xs font-mono text-cyan-300 hover:text-white font-bold transition-colors"
                    >
                      View Details →
                    </button>
                    <a
                      href={evt.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900 text-xs font-mono font-bold transition-all"
                    >
                      <span>Spawn on Platform</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="p-12 text-center rounded-2xl bg-[#05070E] border border-dashed border-zinc-800">
                <Trophy size={32} className="mx-auto mb-2 text-zinc-600" />
                <h4 className="font-display font-bold text-white text-base">No competitions found</h4>
                <p className="text-xs text-zinc-400 mt-1 mb-4">
                  Try adjusting your country filter or search keyword.
                </p>
                <button
                  onClick={() => { setSelectedCountry('ALL'); setSelectedMode('ALL'); setSearchQuery(''); }}
                  className="btn btn-secondary text-xs"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          EVENT DETAIL MODAL (BRIEF INFO + FULL DOSSIER + DIRECT SPAWN LINK)
          ════════════════════════════════════════════════════════════════════════ */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in text-left">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#05070E] border-2 border-cyan-500/40 rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(0,212,255,0.3)] space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-black border border-cyan-400 p-1 flex items-center justify-center shrink-0">
                  <img src={selectedEventModal.logo} alt={selectedEventModal.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{selectedEventModal.flag}</span>
                    <span className="text-xs font-mono text-zinc-400">{selectedEventModal.country}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-xs font-mono text-cyan-400 font-bold">{selectedEventModal.organizer}</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-2xl font-bold text-white mt-0.5">
                    {selectedEventModal.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedEventModal(null)}
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 block text-[10px]">Format:</span>
                <span className="font-bold text-white">{selectedEventModal.mode}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 block text-[10px]">Team Size:</span>
                <span className="font-bold text-white">{selectedEventModal.teamSize}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 block text-[10px]">Deadline:</span>
                <span className="font-bold text-cyan-300">{selectedEventModal.registrationDeadline}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 block text-[10px]">Honors:</span>
                <span className="font-bold text-amber-400 truncate block">{selectedEventModal.prize}</span>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="space-y-2">
              <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider text-cyan-400">
                About the Event
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {selectedEventModal.description}
              </p>
            </div>

            {/* Rounds / Stages if available */}
            {selectedEventModal.rounds && (
              <div className="space-y-2">
                <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider text-cyan-400">
                  Stages & Schedule
                </h4>
                <div className="space-y-2">
                  {selectedEventModal.rounds.map((rnd, i) => (
                    <div key={i} className="p-3 rounded-xl bg-black border border-zinc-800 text-xs">
                      <div className="flex justify-between font-bold text-white mb-1">
                        <span>{rnd.name}</span>
                        <span className="text-cyan-400 font-mono">{rnd.dates}</span>
                      </div>
                      <p className="text-zinc-400">{rnd.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] font-mono text-zinc-400">
                Spawns directly to official event host
              </span>
              <a
                href={selectedEventModal.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full sm:w-auto text-xs py-2.5 px-6 font-bold justify-center"
              >
                <span>Spawn on Official Registration Platform</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          ORGANIZER "LIST YOUR BUILDATHON" MODAL
          ════════════════════════════════════════════════════════════════════════ */}
      {listModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in text-left">
          <div className="relative w-full max-w-md bg-[#05070E] border-2 border-cyan-500/40 rounded-3xl p-5 sm:p-6 shadow-[0_0_50px_rgba(0,212,255,0.25)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <h3 className="font-display text-base font-bold text-white">List Your Hackathon</h3>
                <p className="text-[10px] font-mono text-zinc-400">Directly spawn builders to your event platform</p>
              </div>
              <button
                onClick={() => setListModalOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            {submitSuccess ? (
              <div className="p-6 text-center space-y-2 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
                <CheckCircle2 size={32} className="mx-auto text-emerald-400" />
                <h4 className="font-display font-bold text-white text-sm">Submission Received!</h4>
                <p className="text-xs text-zinc-300">
                  Our team will review your event details and list it in the Global Directory.
                </p>
              </div>
            ) : (
              <form onSubmit={handleListSubmit} className="space-y-3 text-xs font-mono">
                <div>
                  <label className="block text-zinc-400 mb-1">EVENT NAME</label>
                  <input
                    type="text"
                    required
                    value={submitEventName}
                    onChange={(e) => setSubmitEventName(e.target.value)}
                    placeholder="e.g. AI Innovation Summit Hackathon"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">ORGANIZING BODY / UNIVERSITY</label>
                  <input
                    type="text"
                    required
                    value={submitOrg}
                    onChange={(e) => setSubmitOrg(e.target.value)}
                    placeholder="e.g. ACM Student Chapter / Tech Club"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">DIRECT REGISTRATION URL</label>
                  <input
                    type="url"
                    required
                    value={submitLink}
                    onChange={(e) => setSubmitLink(e.target.value)}
                    placeholder="https://unstop.com/... or your website"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary w-full justify-center text-xs py-2.5 font-bold"
                  >
                    Submit for Directory Listing
                  </button>
                  <p className="text-[10px] text-zinc-500 text-center mt-2">
                    Questions? Email us directly at <span className="text-cyan-400">rabinjathon@gmail.com</span>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
