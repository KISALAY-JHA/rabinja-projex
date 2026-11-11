import Link from 'next/link';
import {
  Sparkles, Trophy, Zap, ArrowRight, Star,
  Code2, Cpu, Leaf, Shield, GraduationCap, HeartPulse,
  TrendingUp, MessageSquare, Eye, ChevronRight, Award,
} from 'lucide-react';
import { SAMPLE_PROJECTS, SAMPLE_EVENTS, SAMPLE_DISCUSSIONS } from '@/lib/sample-data';
import { AdSlot } from '@/components/ads/AdSlot';

// ── Category color map ─────────────────────────────────────────────────────
const CATEGORY_CONFIG: Record<string, { color: string; cardClass: string; icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }> }> = {
  HealthTech:    { color: 'var(--red)',    cardClass: 'card-red',    icon: HeartPulse },
  CleanTech:     { color: 'var(--green)',  cardClass: 'card-green',  icon: Leaf },
  Cybersecurity: { color: 'var(--cyan)',   cardClass: 'card-cyan',   icon: Shield },
  AgriTech:      { color: 'var(--amber)',  cardClass: 'card-amber',  icon: Cpu },
  EdTech:        { color: 'var(--purple)', cardClass: 'card-purple', icon: GraduationCap },
  FinTech:       { color: 'var(--blue)',   cardClass: 'card-blue',   icon: TrendingUp },
  'Deep Tech':   { color: 'var(--indigo)', cardClass: 'card-purple', icon: Code2 },
};

function getCategoryConfig(category: string) {
  return CATEGORY_CONFIG[category] ?? { color: 'var(--blue)', cardClass: 'card-blue', icon: Code2 };
}

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function HomePage() {
  const featuredProject = SAMPLE_PROJECTS.find((p) => p.status === 'featured')!;
  const trendingProjects = SAMPLE_PROJECTS.filter((p) => p.id !== featuredProject.id).slice(0, 4);
  const activeEvent = SAMPLE_EVENTS.find((e) => e.status === 'active');

  return (
    <div className="bg-grid">
      {/* ════════════════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" aria-labelledby="hero-heading">
        {/* Background glow orbs */}
        <div className="glow-orb w-96 h-96 bg-purple-500 -top-20 -right-20" />
        <div className="glow-orb w-80 h-80 bg-blue-500 bottom-10 left-10" />
        <div className="glow-orb w-64 h-64 bg-pink-500 top-40 right-1/4" />

        <div className="container-page relative z-10" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
          <div className="max-w-4xl mx-auto text-center">
            {/* Live event badge */}
            {activeEvent && (
              <Link
                href={`/events/${activeEvent.slug}`}
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[var(--border-hover)] bg-[var(--bg-surface)] text-sm text-[var(--text-secondary)] hover:border-[var(--purple)] hover:text-white transition-all group"
                id="hero-event-badge"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-pulse" />
                <span className="font-semibold text-[var(--red)]">LIVE</span>
                <span>{activeEvent.name} — {activeEvent.prize_pool} Prize Pool</span>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
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
              <span className="gradient-nex font-semibold">NEX AI</span> — the first AI judge built for innovation competitions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/explore" id="hero-explore-btn" className="btn btn-primary btn-lg">
                <Compass size={18} />
                Explore Projects
                <ArrowRight size={16} />
              </Link>
              <Link href="/nex" id="hero-nex-btn" className="btn btn-secondary btn-lg group">
                <Sparkles size={18} className="text-[var(--purple)]" />
                Try NEX AI
              </Link>
              <Link href="/auth/signup" id="hero-signup-btn" className="btn btn-ghost btn-lg">
                Submit Your Project →
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
              {[
                { label: 'Projects', value: '1,200+', color: 'var(--purple)' },
                { label: 'Active Teams', value: '450+',   color: 'var(--blue)' },
                { label: 'AI Analyses', value: '8,500+', color: 'var(--cyan)' },
                { label: 'Prize Pool', value: '₹25L',    color: 'var(--green)' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="font-display text-3xl md:text-4xl font-bold"
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
          {[...SAMPLE_PROJECTS, ...SAMPLE_PROJECTS].map((p, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--purple)]" />
              <span className="font-semibold text-[var(--text-secondary)]">{p.title}</span>
              <span>by {p.team_name}</span>
              <span className="text-[var(--green)]">▲ {p.vote_count}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          FEATURED PROJECT
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
            <Link href="/explore?filter=featured" className="btn btn-ghost btn-sm hidden md:flex">
              View all featured <ArrowRight size={14} />
            </Link>
          </div>

          {/* Featured card */}
          <Link href={`/explore/${featuredProject.slug}`} id={`featured-project-${featuredProject.id}`}>
            <div className="card card-purple p-8 md:p-10 relative overflow-hidden group cursor-pointer">
              {/* BG decoration */}
              <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-bl from-purple-500 to-transparent rounded-full blur-3xl" />
              </div>

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  {/* Category + badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="badge badge-purple">
                      ⭐ Featured
                    </span>
                    <span className="badge badge-red">
                      {featuredProject.category}
                    </span>
                    {featuredProject.event_id && (
                      <span className="badge badge-amber">
                        Rabinjathon 2026
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-glow-purple transition-all">
                    {featuredProject.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-2 font-semibold">{featuredProject.subtitle}</p>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 truncate-3">
                    {featuredProject.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredProject.tech_stack.slice(0, 4).map((t) => (
                      <span key={t} className="badge badge-gray">{t}</span>
                    ))}
                    {featuredProject.tech_stack.length > 4 && (
                      <span className="badge badge-gray">+{featuredProject.tech_stack.length - 4}</span>
                    )}
                  </div>

                  {/* Team & stats */}
                  <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
                    <span className="font-semibold text-[var(--text-secondary)]">
                      by {featuredProject.team_name}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <TrendingUp size={14} className="text-[var(--green)]" />
                      {formatCount(featuredProject.vote_count)} votes
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Eye size={14} />
                      {formatCount(featuredProject.views)} views
                    </span>
                  </div>
                </div>

                {/* Score panel */}
                <div className="flex flex-col items-center justify-center gap-4 md:border-l md:border-[var(--border)] md:pl-8">
                  <div className="text-center">
                    <div className="score-display text-5xl md:text-6xl">90</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-widest font-semibold">Judge Score</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                    {[
                      { label: 'Innovation', score: 24, max: 25, color: 'var(--purple)' },
                      { label: 'Impact',     score: 23, max: 25, color: 'var(--blue)' },
                      { label: 'Technical',  score: 22, max: 25, color: 'var(--cyan)' },
                      { label: 'Clarity',    score: 21, max: 25, color: 'var(--green)' },
                    ].map((c) => (
                      <div key={c.label} className="bg-[var(--bg-surface-2)] rounded-lg p-3 text-center">
                        <div className="font-mono font-bold text-lg" style={{ color: c.color }}>
                          {c.score}<span className="text-xs text-[var(--text-muted)] font-normal">/{c.max}</span>
                        </div>
                        <div className="text-xs text-[var(--text-muted)] mt-0.5">{c.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="btn btn-primary w-full max-w-xs justify-center group-hover:shadow-purple-500/40">
                    View Full Analysis <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
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
                <TrendingUp size={16} className="text-[var(--blue)]" />
                <span className="text-xs font-semibold text-[var(--blue)] uppercase tracking-widest">Trending Now</span>
              </div>
              <h2 id="trending-heading" className="font-display text-2xl md:text-3xl font-bold">
                Hot Projects
              </h2>
            </div>
            <Link href="/explore?sort=trending" className="btn btn-ghost btn-sm hidden md:flex">
              See all <ArrowRight size={14} />
            </Link>
          </div>

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
                    {/* Rank + Category */}
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

                    <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <span className="font-semibold text-[var(--text-secondary)] truncate max-w-[100px]">
                        {project.team_name}
                      </span>
                      <div className="flex items-center gap-3">
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

          {/* ── Monetization / Sponsor Banner ── */}
          <div className="mt-8">
            <AdSlot
              format="banner"
              title="Scale Your Hardware & AI Prototypes with Cloud GPUs"
              description="Deploy high-concurrency neural networks, IoT telemetry pipelines, and edge models with $500 free credits."
              href="https://cloud.google.com"
              sponsorLabel="Featured Cloud Infrastructure Partner"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          NEX AI PROMO SECTION
          ════════════════════════════════════════════════════════ */}
      <section className="section-spacing" aria-labelledby="nex-heading">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-2xl border border-[rgba(168,85,247,0.3)] bg-[var(--bg-surface)] p-8 md:p-14 glow-nex">
            {/* Background gradient */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 20% 50%, var(--purple) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, var(--blue) 0%, transparent 60%)' }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-semibold badge-purple">
                  <Sparkles size={12} />
                  NEX AI — Powered by Gemini
                </div>
                <h2 id="nex-heading" className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight">
                  Your AI Judge,
                  <br />
                  <span className="gradient-nex">Available 24/7</span>
                </h2>
                <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
                  Upload your project document and NEX AI will instantly analyse it, generate judge-level viva questions, identify weaknesses, and simulate a full evaluation — before the real judges arrive.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/nex" id="nex-cta-primary" className="btn btn-primary btn-lg">
                    <Sparkles size={18} />
                    Start AI Analysis
                  </Link>
                  <Link href="/nex#how-it-works" id="nex-cta-secondary" className="btn btn-ghost btn-lg">
                    How it works →
                  </Link>
                </div>
              </div>

              {/* Feature list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: '📄', title: 'Document Analysis',      desc: 'Upload PDFs — AI extracts key insights and assesses completeness.',        color: 'var(--purple)' },
                  { icon: '❓', title: 'Judge Q Generation',     desc: 'AI predicts exactly what judges will ask based on your weak points.',       color: 'var(--blue)' },
                  { icon: '🎤', title: 'Viva Simulation',        desc: 'Practice a live viva with NEX AI acting as a critical judge panel.',        color: 'var(--cyan)' },
                  { icon: '✅', title: 'Evidence Verification',  desc: 'Cross-reference your claims against submitted materials for accuracy.',     color: 'var(--green)' },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="p-5 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border)] hover:border-[rgba(168,85,247,0.3)] transition-colors"
                  >
                    <div className="text-2xl mb-3">{f.icon}</div>
                    <h4 className="font-semibold text-white mb-1.5 text-sm">{f.title}</h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ACTIVE EVENT BANNER
          ════════════════════════════════════════════════════════ */}
      {activeEvent && (
        <section className="section-spacing" aria-labelledby="event-heading">
          <div className="container-page">
            <div className="card card-amber relative overflow-hidden p-8 md:p-10">
              <div className="glow-orb w-72 h-72 bg-amber-500 -top-20 -right-10 opacity-10" />
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy size={18} className="text-[var(--amber)]" />
                    <span className="badge badge-amber">ACTIVE EVENT</span>
                  </div>
                  <h2 id="event-heading" className="font-display text-2xl md:text-4xl font-bold text-white mb-2">
                    {activeEvent.name}
                  </h2>
                  <p className="text-[var(--text-secondary)] max-w-xl">{activeEvent.description}</p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
                    <span className="flex items-center gap-1.5">
                      <Award size={14} className="text-[var(--amber)]" />
                      Prize Pool: <strong className="text-[var(--amber)]">{activeEvent.prize_pool}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Trophy size={14} />
                      Up to {activeEvent.max_teams} teams
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 min-w-fit">
                  <Link href={`/events/${activeEvent.slug}`} id="event-view-btn" className="btn btn-primary btn-lg whitespace-nowrap">
                    View Event <ArrowRight size={16} />
                  </Link>
                  <Link href={`/events/${activeEvent.slug}#leaderboard`} className="btn btn-ghost btn-sm text-center">
                    See Rankings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          COMMUNITY DISCUSSIONS
          ════════════════════════════════════════════════════════ */}
      <section className="section-spacing" aria-labelledby="discussions-heading">
        <div className="container-page">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={16} className="text-[var(--cyan)]" />
                <span className="text-xs font-semibold text-[var(--cyan)] uppercase tracking-widest">Community</span>
              </div>
              <h2 id="discussions-heading" className="font-display text-2xl md:text-3xl font-bold">
                Hot Discussions
              </h2>
            </div>
            <Link href="/explore?tab=discussions" className="btn btn-ghost btn-sm hidden md:flex">
              All discussions <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {SAMPLE_DISCUSSIONS.map((disc) => (
              <Link
                key={disc.id}
                href={`/explore/${disc.project_id.replace('proj-', 'neurolink-assist')}#discussions`}
                id={`discussion-${disc.id}`}
              >
                <div className="card card-cyan p-6 group cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`badge ${
                          disc.category === 'question' ? 'badge-blue'
                          : disc.category === 'idea' ? 'badge-purple'
                          : disc.category === 'feedback' ? 'badge-green'
                          : 'badge-gray'
                        }`}>
                          {disc.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-white mb-2 group-hover:text-[var(--cyan)] transition-colors">
                        {disc.title}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] truncate-2 leading-relaxed">
                        {disc.body}
                      </p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2 shrink-0">
                      <span className="text-xs text-[var(--text-muted)]">
                        by <strong className="text-[var(--text-secondary)]">{disc.author.display_name}</strong>
                      </span>
                      <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                        <span className="flex items-center gap-1">
                          <MessageSquare size={11} /> {disc.reply_count} replies
                        </span>
                        <span className="flex items-center gap-1 text-[var(--green)]">
                          ▲ {disc.upvote_count}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          BOTTOM CTA
          ════════════════════════════════════════════════════════ */}
      <section className="section-spacing" aria-labelledby="cta-heading">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 badge badge-purple text-sm px-4 py-2">
              <Zap size={14} />
              Join the RABINJA Ecosystem
            </div>
            <h2 id="cta-heading" className="font-display text-3xl md:text-5xl font-bold mb-6">
              Ready to showcase
              <br />
              <span className="gradient-brand">your best work?</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-10">
              Create your free account with just your phone number. No email required. No credit card. Start building your project portfolio today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/auth/signup" id="cta-signup-btn" className="btn btn-primary btn-lg">
                <Zap size={18} />
                Create Account — Free
              </Link>
              <Link href="/explore" id="cta-explore-btn" className="btn btn-secondary btn-lg">
                Browse Projects First
              </Link>
            </div>
            <p className="mt-6 text-xs text-[var(--text-muted)]">
              Phone number verification · No spam · Delete anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Need this import for the Compass icon in the CTA section
function Compass({ size }: { size?: number }) {
  return (
    <svg width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
