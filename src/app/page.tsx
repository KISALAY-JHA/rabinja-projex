import Link from 'next/link';
import {
  Sparkles,
  Compass,
  Trophy,
  Users,
  ArrowRight,
  CheckCircle2,
  Calendar,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { SAMPLE_PROJECTS } from '@/lib/sample-data';

// ─── Platform Pillars ────────────────────────────────────────────────────────

const PILLARS = [
  {
    icon: Compass,
    title: 'Discover Projects',
    desc: 'Browse real innovation across hardware, software, health, fintech and more.',
  },
  {
    icon: Trophy,
    title: 'Live Hackathons',
    desc: 'Find active buildathons, ideathons, and register directly on their platforms.',
  },
  {
    icon: Sparkles,
    title: 'NEX AI Evaluation',
    desc: 'Get your project stress-tested by autonomous AI. No bias, real feedback.',
  },
  {
    icon: Users,
    title: 'Authentic Community',
    desc: 'No algorithm noise. Phone-verified people. Genuine votes and discussions.',
  },
];

// ─── Rabinjathon Round dates ──────────────────────────────────────────────────

const ROUNDS = [
  { label: 'Round 1', date: '1 Jan 2027' },
  { label: 'Round 2', date: '15 Jan 2027' },
  { label: 'Grand Finale', date: '31 Jan 2027' },
];

// ─── Homepage ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const displayProjects = SAMPLE_PROJECTS.slice(0, 6);

  return (
    <div className="bg-black w-full overflow-x-hidden pb-20 md:pb-0">

      {/* ══════════════════════════════════════════════════════════
          1. HERO SECTION
          ══════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden w-full"
        aria-label="Hero — Where Innovation Gets Recognized"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 md:w-[480px] md:h-[480px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-16 w-56 h-56 md:w-96 md:h-96 rounded-full bg-blue-700/10 blur-3xl" />

        <div className="container-page relative z-10 pt-10 pb-16 md:pt-20 md:pb-24">
          <div className="max-w-3xl mx-auto text-center px-4">

            {/* Top pill badge */}
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/40 text-[11px] md:text-xs font-mono font-semibold text-rose-300 hover:border-rose-400 transition-colors mb-6 md:mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
              ● RABINJATHON: PRIME 1 // REGISTRATION OPEN
            </Link>

            {/* Headline */}
            <h1 className="font-display text-[2.2rem] leading-[1.1] sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4 md:mb-6">
              Where Innovation{' '}
              <span className="block gradient-brand">Gets Recognized</span>
            </h1>

            {/* Sub-description */}
            <p className="text-sm md:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-8 md:mb-10 px-2">
              The first project-centric platform for builders, hackathons, and innovators in
              India. Discover real projects, join buildathons, support ideas, and get authentic
              feedback — not algorithm noise.
            </p>

            {/* CTA buttons */}
            <div className="flex items-center justify-center gap-3 mb-8 md:mb-10 px-4">
              <Link
                href="/explore"
                className="btn btn-primary text-xs md:text-sm py-2.5 md:py-3 px-5 md:px-7 shadow-[0_0_20px_rgba(0,212,255,0.35)]"
              >
                <Compass size={15} />
                Explore Projects
              </Link>
              <Link
                href="/events"
                className="btn btn-secondary text-xs md:text-sm py-2.5 md:py-3 px-5 md:px-7"
              >
                View Events
              </Link>
            </div>

            {/* Platform trust row */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-[11px] md:text-sm text-zinc-400">
              {[
                'No Fake Metrics',
                'Phone Verified Identity',
                'Real Project Submissions',
              ].map((label) => (
                <span key={label} className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  {label}
                </span>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. LIVE EVENT BANNER — Rabinjathon Prime 1
          ══════════════════════════════════════════════════════════ */}
      <section
        className="section-spacing w-full"
        aria-label="Live Event — Rabinjathon Prime 1"
      >
        <div className="container-page px-4">
          <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-950/30 via-black to-black p-6 md:p-10 shadow-[0_0_40px_rgba(244,63,94,0.12)]">
            <div className="flex flex-col md:flex-row md:items-start gap-8">

              {/* Left: event info */}
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-[10px] md:text-xs font-mono font-bold text-rose-400 uppercase tracking-wider mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
                  Live Event
                </div>

                <h2 className="font-display text-xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                  Rabinjathon: Prime 1 —{' '}
                  <span className="text-rose-400">Now Open</span>
                </h2>

                <div className="flex flex-col sm:flex-row gap-4 items-start mb-5">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-black border border-rose-500/30 shrink-0 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
                    <img
                      src="/images/events/poster-rabinjathon.png"
                      alt="Rabinjathon Prime 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs md:text-sm text-zinc-300">
                    <span className="flex items-center gap-1.5">
                      <Users size={13} className="text-zinc-500 shrink-0" />
                      Organizer: <span className="text-white font-medium ml-1">RABINJA Squad</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-zinc-500 shrink-0" />
                      Mode: <span className="text-white font-medium ml-1">Online</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-zinc-500 shrink-0" />
                      Registration Deadline: <span className="text-white font-medium ml-1">31 Dec 2026</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-zinc-500 shrink-0" />
                      Round 1 Starts: <span className="text-white font-medium ml-1">1 Jan 2027</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Trophy size={13} className="text-amber-500 shrink-0" />
                      Prize: <span className="text-amber-400 font-medium ml-1">Participation Certificate</span>
                    </span>
                  </div>
                </div>

                <a
                  href="https://unstop.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary text-xs md:text-sm py-2.5 px-5 inline-flex items-center gap-2 shadow-[0_0_16px_rgba(244,63,94,0.3)]"
                >
                  Register on Unstop
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Right: round dates */}
              <div className="shrink-0 w-full md:w-52 flex flex-row md:flex-col gap-3">
                {ROUNDS.map((r, i) => (
                  <div
                    key={r.label}
                    className="flex-1 md:flex-none rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 md:p-4"
                  >
                    <div className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                      Round {i + 1}
                    </div>
                    <div className="text-xs md:text-sm font-bold text-white leading-tight">{r.label}</div>
                    <div className="text-[11px] md:text-xs text-cyan-400 font-mono mt-0.5">{r.date}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. PLATFORM PILLARS
          ══════════════════════════════════════════════════════════ */}
      <section
        className="section-spacing w-full"
        aria-label="Platform Pillars"
      >
        <div className="container-page px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-display text-xl md:text-3xl font-bold text-white">
              Built for Real Builders
            </h2>
            <p className="text-sm md:text-base text-zinc-400 mt-2 max-w-xl mx-auto">
              Every feature is designed around authenticity — no vanity metrics, no clout games.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {PILLARS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="card p-4 md:p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.08)] transition-all flex flex-col gap-3"
              >
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-cyan-400 md:hidden" />
                  <Icon size={20} className="text-cyan-400 hidden md:block" />
                </div>
                <div>
                  <h3 className="font-display text-sm md:text-base font-bold text-white mb-1 leading-tight">
                    {title}
                  </h3>
                  <p className="text-[11px] md:text-sm text-zinc-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. OFFICIAL RABINJA BRAND PROJECTS
          ══════════════════════════════════════════════════════════ */}
      <section
        className="section-spacing w-full"
        aria-label="Official RABINJA Brand Projects"
      >
        <div className="container-page px-4">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <div>
              <span className="text-[10px] md:text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                // RABINJA Brand Ecosystem
              </span>
              <h2 className="font-display text-xl md:text-3xl font-bold text-white mt-1">
                Official Brand Projects
              </h2>
            </div>
            <Link href="/explore" className="btn btn-ghost text-xs hidden sm:inline-flex items-center gap-1.5">
              Explore All <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {displayProjects.map((p) => {
              const visibleTech = p.tech_stack.slice(0, 3);
              const extraTech = p.tech_stack.length - 3;
              return (
                <div
                  key={p.id}
                  className="card rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition-all flex flex-col p-5 md:p-6"
                >
                  {/* Thumbnail Image */}
                  {p.thumbnail_url && (
                    <Link
                      href={`/explore/${p.slug}`}
                      className="block w-full h-36 rounded-xl overflow-hidden mb-3.5 bg-black border border-zinc-800/80 group-hover:border-cyan-500/40 transition-colors relative"
                    >
                      <img
                        src={p.thumbnail_url}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  )}

                  {/* Category badge */}
                  <span className="inline-block self-start px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] md:text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wide mb-3">
                    {p.category}
                  </span>

                  {/* Title */}
                  <Link href={`/explore/${p.slug}`}>
                    <h3 className="font-display text-base md:text-lg font-bold text-white hover:text-cyan-300 transition-colors line-clamp-1 mb-1.5">
                      {p.title}
                    </h3>
                  </Link>

                  {/* Subtitle */}
                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-4 flex-1">
                    {p.subtitle}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {visibleTech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                    {extraTech > 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500">
                        +{extraTech}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-zinc-900 pt-3 flex items-center justify-between">
                    <span className="text-[11px] md:text-xs text-zinc-500 font-mono truncate max-w-[55%]">
                      {p.team_name}
                    </span>
                    <Link
                      href={`/explore/${p.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] md:text-xs text-cyan-400 hover:text-cyan-300 font-mono font-semibold transition-colors shrink-0"
                    >
                      View Project <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile "Explore All" link */}
          <div className="mt-6 text-center sm:hidden">
            <Link href="/explore" className="btn btn-ghost text-xs inline-flex items-center gap-1.5">
              Explore All Projects <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. NEX AI TEASER BANNER
          ══════════════════════════════════════════════════════════ */}
      <section
        className="section-spacing w-full"
        aria-label="NEX AI Evaluation"
      >
        <div className="container-page px-4">
          <div className="relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-[#05070E] via-[#070c1b] to-black p-7 md:p-14 shadow-[0_0_60px_rgba(0,212,255,0.12)]">
            {/* Background glow */}
            <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 rounded-full bg-cyan-500/5 blur-3xl" />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-[10px] md:text-xs font-mono font-bold text-cyan-400 mb-4">
                <Sparkles size={12} />
                NEX AI ENGINE
              </div>

              <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
                AI-Powered Project Evaluation
              </h2>

              <p className="text-sm md:text-base text-zinc-300 leading-relaxed mb-7 max-w-xl">
                NEX AI evaluates projects on architecture depth, originality, and real-world impact.
                No bias, instant feedback.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/nex"
                  className="btn btn-primary text-xs md:text-sm py-2.5 md:py-3 px-5 md:px-7 inline-flex items-center gap-2 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                >
                  <Sparkles size={15} />
                  Evaluate with NEX AI →
                </Link>
                <Link
                  href="/explore"
                  className="btn btn-secondary text-xs md:text-sm py-2.5 md:py-3 px-5 md:px-7"
                >
                  Explore Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
