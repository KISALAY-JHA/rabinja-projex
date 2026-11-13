import Link from 'next/link';
import {
  Sparkles, TrendingUp, Compass, Star, ArrowRight,
  ChevronRight, Heart, Shield, Cpu, Leaf, GraduationCap, Coins,
  Code2, CheckCircle2, Smartphone
} from 'lucide-react';
import { SAMPLE_PROJECTS, SAMPLE_EVENTS } from '@/lib/sample-data';
import { AnimeCharacterBay } from '@/components/anime/AnimeCharacterBay';

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

export default function HomePage() {
  const featuredProject = SAMPLE_PROJECTS.find((p) => p.status === 'featured') || SAMPLE_PROJECTS[0] || null;
  const trendingProjects = featuredProject
    ? SAMPLE_PROJECTS.filter((p) => p.id !== featuredProject.id).slice(0, 4)
    : [];
  const activeEvent = SAMPLE_EVENTS.find((e) => e.status === 'active');

  return (
    <div className="bg-black bg-grid w-full overflow-x-hidden">
      {/* ════════════════════════════════════════════════════════
          HERO SECTION (Serious Cyber Anime HUD)
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden w-full" aria-labelledby="hero-heading">
        {/* Ambient glow orbs contained inside section */}
        <div className="glow-orb w-72 sm:w-96 h-72 sm:h-96 bg-[var(--cyan)] -top-20 -right-20 pointer-events-none" />
        <div className="glow-orb w-60 sm:w-80 h-60 sm:h-80 bg-[var(--cobalt)] bottom-10 left-10 pointer-events-none" />

        <div className="container-page relative z-10 pt-12 sm:pt-20 pb-12 sm:pb-20">
          <div className="max-w-4xl mx-auto text-center px-1">
            {/* Logo Emblem Pill */}
            <div className="inline-flex items-center gap-2.5 p-1.5 pr-4 mb-5 rounded-full hud-panel bg-black/90 shadow-[0_0_20px_rgba(0,212,255,0.3)] animate-fade-in border border-cyan-400/40">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-cyan-400/60 shrink-0">
                <img src="/logo.png" alt="RABINJA Projex" className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-white uppercase">
                RABINJA <span className="text-[var(--cyan)]">: Projex</span>
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            {/* Live event badge */}
            {activeEvent && (
              <div className="block mb-5">
                <Link
                  href={`/events/${activeEvent.slug}`}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-[#05070E] text-xs sm:text-sm text-zinc-300 hover:border-cyan-400 hover:text-white transition-all group max-w-full truncate"
                  id="hero-event-badge"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
                  <span className="font-mono font-bold text-rose-500 text-[11px]">LIVE EVENT</span>
                  <span className="truncate">{activeEvent.name}</span>
                  <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform shrink-0" />
                </Link>
              </div>
            )}

            {/* Headline with responsive mobile text scaling */}
            <h1 id="hero-heading" className="font-display text-3xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 leading-[1.12] tracking-tight text-white">
              Where Innovation
              <br />
              <span className="gradient-brand">Gets Recognized</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-zinc-300 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
              Discover and showcase engineering projects. Authenticate with your phone, vote for your favourites, and get unbiased architectural stress-testing from{' '}
              <span className="gradient-nex font-bold">NEX AI</span> — the first autonomous judge built for innovation competitions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-2">
              <Link href="/explore" id="hero-explore-btn" className="btn btn-primary text-xs sm:text-sm py-2.5 sm:py-3 px-5 sm:px-6 shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                <Compass size={16} />
                Explore Projects
                <ArrowRight size={15} />
              </Link>
              <Link href="/nex" id="hero-nex-btn" className="btn btn-secondary text-xs sm:text-sm py-2.5 sm:py-3 px-5 sm:px-6 group">
                <Sparkles size={16} className="text-cyan-400" />
                Launch NEX AI
              </Link>
              <Link href="/auth/signup" id="hero-signup-btn" className="btn btn-ghost text-xs sm:text-sm py-2.5 sm:py-3 px-4 font-mono text-cyan-300">
                Verify Phone & Submit →
              </Link>
            </div>

            {/* Anime Character Showcase Bay (Ready for custom character artworks) */}
            <div className="mt-8 sm:mt-12 px-2">
              <AnimeCharacterBay
                imageSrc="/logo.png"
                callsign="UNIT: CYBER RABBIT // SQUAD COMMANDER"
                status="ONLINE // READY FOR DECORATION"
              />
            </div>

            {/* Realtime Operational Telemetry HUD (No fake sample counters) */}
            <div className="mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-2xl mx-auto">
              {[
                { label: 'GENESIS TRACK', value: 'PHASE 01', color: 'var(--cyan)' },
                { label: 'NEX AI ENGINE', value: 'ACTIVE',   color: 'var(--blue)' },
                { label: 'AUTHENTICATION', value: 'PHONE OTP', color: 'var(--green)' },
                { label: 'RABINJATHON',   value: '2026 LIVE', color: 'var(--amber)' },
              ].map((stat) => (
                <div key={stat.label} className="hud-panel p-3 sm:p-4 text-center rounded-xl bg-[#05070E] border border-cyan-500/20">
                  <div
                    className="font-mono text-base sm:text-xl font-extrabold tracking-wider"
                    style={{ color: stat.color, textShadow: `0 0 15px ${stat.color}80` }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-zinc-400 mt-1 font-mono uppercase tracking-widest">
                    // {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          LIVE MECHA TELEMETRY TICKER
          ════════════════════════════════════════════════════════ */}
      <div className="border-y border-cyan-500/20 bg-[#020307] overflow-hidden py-2.5 w-full">
        <div className="flex gap-8 animate-ticker whitespace-nowrap" aria-hidden="true">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="inline-flex items-center gap-3 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00D4FF]" />
              <span className="font-extrabold text-white tracking-widest">[ RABINJA : PROJEX ]</span>
              <span>•</span>
              <span className="text-cyan-400 font-semibold">// NEX AI AUTONOMOUS EVALUATION ENGINE ONLINE</span>
              <span>•</span>
              <span className="text-zinc-300 font-medium">// RABINJATHON 2026 GENESIS OPEN</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">// SECURE PHONE OTP VERIFICATION REQUIRED</span>
              <span>•</span>
              <span className="text-rose-500 font-bold">// ZERO FAKE METRICS</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          FEATURED PROJECT SECTION (RABINJA BRAND ORIGINAL)
          ════════════════════════════════════════════════════════ */}
      <section className="section-spacing w-full" aria-labelledby="featured-heading">
        <div className="container-page">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Star size={15} className="text-cyan-400" />
                <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  // RABINJA BRAND ECOSYSTEM
                </span>
              </div>
              <h2 id="featured-heading" className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Official Brand Projects
              </h2>
            </div>
            <Link href="/explore" className="btn btn-ghost text-xs hidden sm:flex">
              Explore All 8 Inventions <ArrowRight size={13} />
            </Link>
          </div>

          {featuredProject && (
            <Link href={`/explore/${featuredProject.slug}`}>
              <div className="hud-panel p-6 sm:p-8 rounded-3xl bg-[#05070E] border-2 border-cyan-500/40 hover:border-cyan-400 transition-all shadow-[0_0_40px_rgba(0,212,255,0.15)] group relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="max-w-2xl text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest mb-3">
                      <Sparkles size={11} className="text-cyan-400" />
                      FLAGSHIP // {featuredProject.category}
                    </div>
                    <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {featuredProject.title}
                    </h3>
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                      {featuredProject.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {featuredProject.tech_stack.map((t) => (
                        <span key={t} className="px-2.5 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-cyan-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                    <span className="btn btn-primary text-xs py-2.5 px-4 font-bold shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                      Inspect Architecture →
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 text-center">
                      Verified RABINJA Part
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Quick Grid of other RABINJA Projects */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
            {SAMPLE_PROJECTS.slice(1, 5).map((p) => (
              <Link key={p.id} href={`/explore/${p.slug}`} className="group block">
                <div className="p-4 rounded-2xl bg-[#05070E] border border-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-all h-full flex flex-col justify-between text-left">
                  <div>
                    <span className="text-[9px] font-mono text-cyan-400 uppercase font-bold tracking-wider block mb-1">
                      {p.category}
                    </span>
                    <h4 className="font-display text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1">
                      {p.subtitle}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span>{p.team_name}</span>
                    <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          TRENDING PROJECTS / LEADERBOARD SECTION
          ════════════════════════════════════════════════════════ */}
      <section className="section-spacing pt-0 w-full" aria-labelledby="trending-heading">
        <div className="container-page">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <TrendingUp size={15} className="text-cyan-400" />
                <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  // LEADERBOARD
                </span>
              </div>
              <h2 id="trending-heading" className="font-display text-xl sm:text-2xl font-bold text-white">
                Live Submissions
              </h2>
            </div>
          </div>

          <div className="card p-6 sm:p-8 text-center border-dashed border-zinc-800 max-w-xl mx-auto bg-[#03050A]">
            <TrendingUp size={28} className="mx-auto mb-2 text-cyan-400 opacity-60" />
            <h3 className="font-display text-base font-bold text-white mb-1">
              Genesis Leaderboard Open
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4 leading-relaxed">
              Real community votes and verified scores will rank projects here as teams complete their Rabinjathon builds.
            </p>
            <Link href="/auth/signup" className="btn btn-secondary text-xs py-2 px-3.5 font-mono">
              Register Node & Submit
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          NEX AI TEASER BANNER (Serious Anime Mecha Vibe)
          ════════════════════════════════════════════════════════ */}
      <section className="section-spacing pt-0 w-full" aria-labelledby="nex-teaser-heading">
        <div className="container-page">
          <div className="hud-panel p-6 sm:p-12 relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-[#05070E] via-[#090E1C] to-black shadow-[0_0_50px_rgba(0,212,255,0.15)]">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] sm:text-xs font-mono font-bold text-cyan-400">
                <Sparkles size={12} />
                NEX-9 // AUTONOMOUS JUDGING NODE
              </div>
              <h2 id="nex-teaser-heading" className="font-display text-2xl sm:text-4xl font-extrabold mb-3 text-white">
                Tired of Subjective Hackathon Judging?
              </h2>
              <p className="text-zinc-300 text-xs sm:text-sm mb-6 leading-relaxed">
                NEX AI evaluates projects strictly on engineering merit: architecture depth, originality, stress testing, and real-world usefulness. No bias, instant feedback.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/nex" className="btn btn-primary text-xs sm:text-sm py-2.5 px-4 font-bold">
                  <Sparkles size={15} />
                  Evaluate a Project with NEX AI
                </Link>
                <Link href="/events" className="btn btn-secondary text-xs sm:text-sm py-2.5 px-4">
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
