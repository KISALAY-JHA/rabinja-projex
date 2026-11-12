import Link from 'next/link';
import {
  Sparkles, TrendingUp, Compass, Trophy, Star, ArrowRight,
  Eye, MessageSquare, ThumbsUp, CheckCircle2, ChevronRight,
  Code2, Heart, Shield, Cpu, Leaf, GraduationCap, Coins,
} from 'lucide-react';
import { SAMPLE_PROJECTS, SAMPLE_EVENTS, SAMPLE_DISCUSSIONS } from '@/lib/sample-data';
import { AdSlot } from '@/components/ads/AdSlot';

const CATEGORY_MAP: Record<string, { icon: typeof Code2; color: string; cardClass: string }> = {
  HealthTech:    { icon: Heart,         color: 'var(--red)',    cardClass: 'card-red' },
  CleanTech:     { icon: Leaf,          color: 'var(--green)',  cardClass: 'card-green' },
  Cybersecurity: { icon: Shield,        color: 'var(--purple)', cardClass: 'card-purple' },
  DeepTech:      { icon: Cpu,           color: 'var(--cyan)',   cardClass: 'card-cyan' },
  EdTech:        { icon: GraduationCap, color: 'var(--amber)',  cardClass: 'card-amber' },
  FinTech:       { icon: Coins,         color: 'var(--green)',  cardClass: 'card-green' },
};

function getCategoryConfig(cat: string) {
  return CATEGORY_MAP[cat] ?? { icon: Code2, color: 'var(--blue)', cardClass: 'card-blue' };
}

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function HomePage() {
  const featuredProject = SAMPLE_PROJECTS.find((p) => p.status === 'featured') || SAMPLE_PROJECTS[0] || null;
  const trendingProjects = featuredProject
    ? SAMPLE_PROJECTS.filter((p) => p.id !== featuredProject.id).slice(0, 4)
    : [];
  const activeEvent = SAMPLE_EVENTS.find((e) => e.status === 'active');

  return (
    <div className="bg-grid">
      {/* ════════════════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" aria-labelledby="hero-heading">
        {/* Background glow orbs */}
        <div className="glow-orb w-96 h-96 bg-[var(--cyan)] -top-20 -right-20" />
        <div className="glow-orb w-80 h-80 bg-[var(--cobalt)] bottom-10 left-10" />
        <div className="glow-orb w-64 h-64 bg-[var(--red)] top-40 right-1/4" />

        <div className="container-page relative z-10" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo Pill */}
            <div className="inline-flex items-center gap-3 p-1.5 pr-4 mb-6 rounded-full glass-strong border border-[var(--cyan)]/30 bg-[#04060C]/90 shadow-[0_0_25px_rgba(0,212,255,0.25)] animate-fade-in">
              <img src="/logo.png" alt="RABINJA Projex" className="w-8 h-8 rounded-full object-cover border border-[var(--cyan)]/50" />
              <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                RABINJA <span className="text-[var(--cyan)]">: Projex</span>
              </span>
            </div>

            {/* Live event badge */}
            {activeEvent && (
              <div className="block mb-6">
                <Link
                  href={`/events/${activeEvent.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--cyan)]/30 bg-[var(--bg-surface)] text-sm text-[var(--text-secondary)] hover:border-[var(--cyan)] hover:text-white transition-all group"
                  id="hero-event-badge"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-pulse" />
                  <span className="font-semibold text-[var(--red)]">LIVE</span>
                  <span>{activeEvent.name} — {activeEvent.prize_pool} Prize Pool</span>
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            )}

            {/* Headline */}
            <h1 id="hero-heading" className="font-display text-5xl md:text-7xl font-800 mb-6 leading-none tracking-tight">
              Where Innovation
              <br />
              <span className="gradient-brand">Gets Recognized</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover and showcase groundbreaking projects. Vote for your favourites,
              engage in expert discussions, and get real-time AI analysis from{' '}
              <span className="gradient-nex font-semibold">NEX AI</span> — the first autonomous judge built for innovation competitions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/explore" id="hero-explore-btn" className="btn btn-primary btn-lg">
                <Compass size={18} />
                Explore Projects
                <ArrowRight size={16} />
              </Link>
              <Link href="/nex" id="hero-nex-btn" className="btn btn-secondary btn-lg group">
                <Sparkles size={18} className="text-[var(--cyan)]" />
                Try NEX AI
              </Link>
              <Link href="/auth/signup" id="hero-signup-btn" className="btn btn-ghost btn-lg">
                Submit Your Project →
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
              {[
                { label: 'Ecosystem', value: 'RABINJA', color: 'var(--cyan)' },
                { label: 'Evaluation Engine', value: 'NEX AI', color: 'var(--blue)' },
                { label: 'Competitions', value: 'Rabinjathon', color: 'var(--amber)' },
                { label: 'Status', value: 'Online', color: 'var(--green)' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)]">
                  <div
                    className="font-display text-2xl md:text-3xl font-bold"
                    style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}80` }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1 font-semibold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          LIVE TICKER
          ════════════════════════════════════════════════════════ */}
      <div className="border-y border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden py-3">
        <div className="flex gap-8 animate-ticker whitespace-nowrap" aria-hidden="true">
          {SAMPLE_PROJECTS.length > 0 ? (
            [...SAMPLE_PROJECTS, ...SAMPLE_PROJECTS].map((p, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
                <span className="font-semibold text-[var(--text-secondary)]">{p.title}</span>
                <span>by {p.team_name}</span>
                <span className="text-[var(--green)]">▲ {p.vote_count}</span>
              </span>
            ))
          ) : (
            [1, 2, 3, 4].map((i) => (
              <span key={i} className="inline-flex items-center gap-3 text-sm text-[var(--text-muted)]">
                <span className="w-2 h-2 rounded-full bg-[var(--cyan)] animate-pulse" />
                <span className="font-bold text-white font-mono tracking-wider">RABINJA PROJEX</span>
                <span>•</span>
                <span className="text-[var(--cyan)] font-medium">NEX AI AUTONOMOUS EVALUATION ENGINE READY</span>
                <span>•</span>
                <span className="text-zinc-300 font-medium">RABINJATHON 2026 SUBMISSIONS OPEN</span>
                <span>•</span>
                <span className="text-[var(--red)] font-semibold">ALL SYSTEMS OPERATIONAL</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          FEATURED PROJECT SECTION
          ════════════════════════════════════════════════════════ */}
      <section className="section-spacing" aria-labelledby="featured-heading">
        <div className="container-page">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star size={16} className="text-[var(--amber)]" />
                <span className="text-xs font-semibold text-[var(--amber)] uppercase tracking-widest">Featured Project</span>
              </div>
              <h2 id="featured-heading" className="font-display text-2xl md:text-3xl font-bold">
                Editor's Pick
              </h2>
            </div>
            <Link href="/explore" className="btn btn-ghost btn-sm hidden md:flex">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {featuredProject ? (
            <Link href={`/explore/${featuredProject.slug}`} id={`featured-project-${featuredProject.id}`}>
              <div className="card card-purple p-8 md:p-10 relative overflow-hidden group cursor-pointer">
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="badge badge-purple">⭐ Featured</span>
                      <span className="badge badge-red">{featuredProject.category}</span>
                      {featuredProject.event_id && (
                        <span className="badge badge-amber">Rabinjathon 2026</span>
                      )}
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-glow-cyan transition-all">
                      {featuredProject.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-2 font-semibold">{featuredProject.subtitle}</p>
                    <p className="text-[var(--text-muted)] mb-6 text-sm leading-relaxed line-clamp-3">
                      {featuredProject.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {featuredProject.tech_stack.map((t) => (
                        <span key={t} className="badge badge-gray">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-2xl p-6">
                    <h4 className="text-xs font-semibold text-[var(--cyan)] uppercase tracking-wider mb-2">
                      NEX AI Evaluation
                    </h4>
                    <div className="text-3xl font-display font-bold text-white mb-4">
                      92<span className="text-sm text-[var(--text-muted)] font-normal">/100</span>
                    </div>
                    <div className="btn btn-primary w-full justify-center">
                      View Full Analysis <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            /* Empty showcase callout */
            <div className="card p-8 md:p-12 text-center max-w-3xl mx-auto border-[var(--cyan)]/30 bg-gradient-to-b from-[#080D1A] to-[#04060C] shadow-[0_0_50px_rgba(0,212,255,0.12)]">
              <div className="w-16 h-16 rounded-2xl bg-gradient-brand mx-auto mb-5 flex items-center justify-center shadow-[0_0_25px_rgba(0,212,255,0.5)]">
                <Sparkles size={28} className="text-[#04060C]" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                Project Showcase Ready
              </h3>
              <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                No projects have been published to the public feed yet. Be the first innovator to register your project, simulate live evaluations with NEX AI, and claim your place in the RABINJA hall of fame.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/auth/signup" className="btn btn-primary btn-lg">
                  Submit Your Project
                  <ArrowRight size={16} />
                </Link>
                <Link href="/nex" className="btn btn-secondary btn-lg">
                  <Sparkles size={16} className="text-[var(--cyan)]" />
                  Launch NEX AI Judge
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          TRENDING PROJECTS GRID
          ════════════════════════════════════════════════════════ */}
      <section className="section-spacing" aria-labelledby="trending-heading">
        <div className="container-page">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-[var(--cyan)]" />
                <span className="text-xs font-semibold text-[var(--cyan)] uppercase tracking-widest">Trending Now</span>
              </div>
              <h2 id="trending-heading" className="font-display text-2xl md:text-3xl font-bold">
                Hot Projects
              </h2>
            </div>
            <Link href="/explore" className="btn btn-ghost btn-sm hidden md:flex">
              See all <ArrowRight size={14} />
            </Link>
          </div>

          {trendingProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {trendingProjects.map((project, idx) => {
                const cfg = getCategoryConfig(project.category);
                const CatIcon = cfg.icon;
                return (
                  <Link
                    key={project.id}
                    href={`/explore/${project.slug}`}
                    id={`trending-project-${project.id}`}
                  >
                    <article className={`card ${cfg.cardClass} h-full p-5 flex flex-col cursor-pointer`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs font-bold text-[var(--text-muted)]">
                          #{idx + 2}
                        </span>
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: `${cfg.color}20`, border: `1px solid ${cfg.color}40` }}
                        >
                          <CatIcon size={16} style={{ color: cfg.color }} />
                        </div>
                      </div>
                      <h3 className="font-display font-bold text-white mb-1 text-lg leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] mb-3 font-medium">{project.subtitle}</p>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-auto truncate-2">
                        {project.description}
                      </p>
                    </article>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="card p-8 text-center border-dashed border-[var(--border)] max-w-xl mx-auto">
              <TrendingUp size={32} className="mx-auto mb-3 text-[var(--cyan)] opacity-70" />
              <h3 className="font-display text-lg font-bold text-white mb-1">
                Leaderboard Submissions Open
              </h3>
              <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto mb-4 leading-relaxed">
                Top-voted and highest-ranked projects will appear here as teams publish their Rabinjathon builds.
              </p>
              <Link href="/auth/signup" className="btn btn-secondary text-xs">
                Publish Project to Trending
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          NEX AI TEASER BANNER
          ════════════════════════════════════════════════════════ */}
      <section className="section-spacing" aria-labelledby="nex-teaser-heading">
        <div className="container-page">
          <div className="card p-8 md:p-14 relative overflow-hidden border-[var(--cyan)]/30 bg-gradient-to-r from-[#080D1A] via-[#0E1528] to-[#04060C] shadow-[0_0_60px_rgba(0,212,255,0.15)]">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 text-xs font-mono font-semibold text-[var(--cyan)]">
                <Sparkles size={13} />
                THE NEXT GENERATION OF JUDGING
              </div>
              <h2 id="nex-teaser-heading" className="font-display text-3xl md:text-5xl font-bold mb-4">
                Tired of Subjective Hackathon Judging?
              </h2>
              <p className="text-[var(--text-secondary)] text-base md:text-lg mb-8 leading-relaxed">
                NEX AI evaluates projects on raw engineering merit. Architecture depth,
                code originality, real-world utility, and team presentation — simulated objectively in seconds.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/nex" className="btn btn-primary btn-lg">
                  <Sparkles size={18} />
                  Evaluate a Project with NEX AI
                </Link>
                <Link href="/events" className="btn btn-secondary btn-lg">
                  Explore Rabinjathon 2026
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
