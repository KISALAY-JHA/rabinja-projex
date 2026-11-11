'use client';

import Link from 'next/link';
import {
  Trophy,
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  Award,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { SAMPLE_EVENTS, SAMPLE_PROJECTS } from '@/lib/sample-data';

export default function EventsPage() {
  const event = SAMPLE_EVENTS[0]; // Rabinjathon 2026
  const eventProjects = SAMPLE_PROJECTS.filter((p) => p.event_id === event.id);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden border-b border-[var(--border)] py-16 md:py-24 bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg-primary)]">
        {/* Neon Glow orbs */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[var(--purple)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[var(--cyan)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-page relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="badge badge-amber flex items-center gap-1.5 text-xs px-3 py-1">
              <Trophy size={13} /> OFFICIAL RABINJA HACKATHON
            </span>
            <span className="badge badge-green flex items-center gap-1.5 text-xs px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" /> Live Showcase
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-4xl">
            {event.name}
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 max-w-3xl leading-relaxed">
            {event.description}
          </p>

          {/* Quick Event Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mb-8">
            <div className="card p-4 bg-[var(--bg-surface-2)]/50 backdrop-blur-sm border-[var(--border)]">
              <div className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 mb-1">
                <Calendar size={13} className="text-[var(--cyan)]" /> Dates
              </div>
              <div className="font-semibold text-white text-sm">Oct 1 – Nov 30, 2026</div>
            </div>

            <div className="card p-4 bg-[var(--bg-surface-2)]/50 backdrop-blur-sm border-[var(--border)]">
              <div className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 mb-1">
                <MapPin size={13} className="text-[var(--purple)]" /> Location
              </div>
              <div className="font-semibold text-white text-sm">Hybrid / National India</div>
            </div>

            <div className="card p-4 bg-[var(--bg-surface-2)]/50 backdrop-blur-sm border-[var(--border)]">
              <div className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 mb-1">
                <Trophy size={13} className="text-[var(--amber)]" /> Prize Pool
              </div>
              <div className="font-semibold text-[var(--amber)] text-sm">₹25,00,000 INR</div>
            </div>

            <div className="card p-4 bg-[var(--bg-surface-2)]/50 backdrop-blur-sm border-[var(--border)]">
              <div className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 mb-1">
                <Users size={13} className="text-[var(--green)]" /> Finalists
              </div>
              <div className="font-semibold text-white text-sm">{eventProjects.length} Verified Entries</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Details Grid ── */}
      <section className="container-page py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Criteria & Tracks */}
          <div className="lg:col-span-2 space-y-10">
            {/* Judging Criteria */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={20} className="text-[var(--cyan)]" />
                <h2 className="font-display text-2xl font-bold text-white">Official Judging Rubric</h2>
              </div>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                All submissions are scored independently out of 100 points across four core dimensions by official industry evaluators and calibrated with NEX AI.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(event.criteria || {}).map(([key, item]) => (
                  <div key={key} className="card p-5 border-[var(--border)] bg-[var(--bg-surface)]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-white text-base">{item.label}</span>
                      <span className="badge badge-purple text-xs font-mono">{item.weight}%</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Evaluated on demonstrable depth, originality, and verifiable technical outcomes.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Finalist Projects */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">Event Finalist Projects</h2>
                  <p className="text-xs text-[var(--text-muted)]">Verified Rabinjathon entries currently undergoing live evaluation</p>
                </div>
                <Link href="/explore" className="btn btn-ghost text-xs">
                  View All in Explore <ArrowRight size={13} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eventProjects.map((p, idx) => (
                  <div key={p.id} className="card p-5 group hover:border-[var(--purple)]/60 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="badge badge-purple text-[10px]">{p.category}</span>
                        <span className="badge badge-amber text-[10px] font-mono">Rank #{idx + 1}</span>
                      </div>
                      <Link href={`/explore/${p.slug}`} className="block">
                        <h3 className="font-display font-bold text-lg text-white group-hover:text-[var(--purple)] transition-colors mb-2">
                          {p.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-4 leading-relaxed">
                        {p.subtitle || p.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
                      <span className="text-[var(--text-muted)]">by <strong className="text-white">{p.team_name}</strong></span>
                      <Link
                        href={`/explore/${p.slug}`}
                        className="text-[var(--purple)] hover:text-white font-medium flex items-center gap-1 transition-colors"
                      >
                        Details <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sidebar Awards & Integrity Policy */}
          <div className="space-y-6">
            {/* Awards Breakdown */}
            <div className="card p-6 border-[var(--border)] bg-[var(--bg-surface)]">
              <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                <Award size={18} className="text-[var(--amber)]" />
                Rabinjathon Honors
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-lg bg-[var(--bg-surface-2)] border border-[var(--amber)]/30">
                  <div className="flex items-center justify-between font-bold text-white mb-1">
                    <span className="flex items-center gap-1.5 text-[var(--amber)]">🥇 Grand Champion</span>
                    <span>₹10,00,000</span>
                  </div>
                  <p className="text-[var(--text-muted)]">Top overall project evaluated across all dimensions + NEX validation.</p>
                </div>

                <div className="p-3 rounded-lg bg-[var(--bg-surface-2)] border border-[var(--border)]">
                  <div className="flex items-center justify-between font-bold text-white mb-1">
                    <span className="flex items-center gap-1.5 text-zinc-300">🥈 Engineering Excellence</span>
                    <span>₹8,00,000</span>
                  </div>
                  <p className="text-[var(--text-muted)]">Awarded for highest technical architecture depth and algorithmic rigor.</p>
                </div>

                <div className="p-3 rounded-lg bg-[var(--bg-surface-2)] border border-[var(--border)]">
                  <div className="flex items-center justify-between font-bold text-white mb-1">
                    <span className="flex items-center gap-1.5 text-amber-700">🥉 Best Practical Impact</span>
                    <span>₹7,00,000</span>
                  </div>
                  <p className="text-[var(--text-muted)]">Highest market feasibility and immediate daily usefulness.</p>
                </div>
              </div>
            </div>

            {/* Integrity Shield */}
            <div className="card p-6 border-[var(--border)] bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-surface-2)]">
              <div className="flex items-center gap-2 mb-3 text-[var(--cyan)]">
                <ShieldCheck size={20} />
                <h4 className="font-display font-bold text-white text-sm">RABINJA Verification Standard</h4>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                Projects are cross-checked for genuine originality. AI-generated generic mockups without underlying working code or backend logic are disqualified.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <CheckCircle2 size={13} className="text-[var(--green)] shrink-0" />
                  <span>Public code repository inspection</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <CheckCircle2 size={13} className="text-[var(--green)] shrink-0" />
                  <span>NEX AI claim & stress-test validation</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <CheckCircle2 size={13} className="text-[var(--green)] shrink-0" />
                  <span>Independent verified judge scoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
