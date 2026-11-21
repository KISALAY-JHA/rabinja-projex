'use client';

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
  Mic,
} from 'lucide-react';
import { SAMPLE_EVENTS } from '@/lib/sample-data';

const event = SAMPLE_EVENTS[0];

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

// ── Component ─────────────────────────────────────────────────────────────────

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">

      {/* ═══ HERO BANNER ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg-primary)]">
        {/* Neon glow orbs */}
        <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[var(--cyan)]/8 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 right-1/4 h-72 w-72 rounded-full bg-[var(--purple)]/8 blur-3xl" />

        <div className="container-page relative z-10 py-14 md:py-20">
          {/* Badges */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="badge badge-green flex items-center gap-1.5 text-xs px-3 py-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--green)]" />
              Registration Open
            </span>
            <span className="badge badge-purple flex items-center gap-1.5 text-xs px-3 py-1">
              <MapPin size={12} /> Online
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-surface-2)] px-3 py-1 text-xs text-[var(--text-secondary)]">
              <Users size={12} /> {event.team_size}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display mb-4 max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
            {event.name}
          </h1>
          <p className="mb-2 text-sm font-medium text-[var(--cyan)]">by {event.organizer}</p>
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            {event.description}
          </p>

          {/* Mobile CTA */}
          <div className="flex flex-col gap-3 sm:flex-row lg:hidden">
            <a
              href={event.register_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex items-center justify-center gap-2 py-3 text-sm font-bold"
            >
              Register on Unstop <ExternalLink size={14} />
            </a>
            <a
              href={event.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost flex items-center justify-center gap-2 py-3 text-sm"
            >
              <MessageSquare size={14} /> Join WhatsApp Group
            </a>
          </div>

          {/* Key dates strip */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <Calendar size={13} className="text-[var(--cyan)]" />
              <span>Reg. Opens: <strong className="text-white">18 Oct 2026</strong></span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <Clock size={13} className="text-[var(--red)]" />
              <span>Reg. Deadline: <strong className="text-white">31 Dec 2026, 11:59 PM IST</strong></span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <Award size={13} className="text-[var(--amber)]" />
              <span>Prize: <strong className="text-white">Participation Certificate</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MAIN BODY ═════════════════════════════════════════════════════ */}
      <section className="container-page py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* ── LEFT MAIN COLUMN ──────────────────────────────────────────── */}
          <div className="space-y-10 lg:col-span-2">

            {/* ── 3-Round Timeline ───────────────────────────────────── */}
            <div>
              <div className="mb-6 flex items-center gap-2">
                <Layers size={20} className="text-[var(--cyan)]" />
                <h2 className="font-display text-2xl font-bold text-white">Event Rounds</h2>
              </div>

              <div className="relative space-y-0">
                {event.rounds.map((round, idx) => {
                  const status = getRoundStatus(round.start, round.end);
                  const Icon = ROUND_ICONS[idx] ?? Mic;
                  const isLast = idx === event.rounds.length - 1;

                  return (
                    <div key={round.id} className="relative flex gap-5">
                      {/* Vertical connector */}
                      {!isLast && (
                        <div className="absolute left-5 top-10 bottom-0 w-px bg-[var(--border)]" />
                      )}

                      {/* Circle icon */}
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-surface-2)]">
                        <Icon size={16} className="text-[var(--cyan)]" />
                      </div>

                      {/* Card */}
                      <div className="mb-6 flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 transition-all hover:border-[var(--border-hover)]">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="font-display text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                            Round {round.id}
                          </span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLES[status]}`}>
                            {STATUS_LABELS[status]}
                          </span>
                          <span className="ml-auto rounded-full border border-[var(--border)] bg-[var(--bg-surface-2)] px-2 py-0.5 text-[10px] text-[var(--text-muted)]">
                            Max: {round.maxDuration}
                          </span>
                        </div>
                        <h3 className="font-display mb-1 text-base font-bold text-white">{round.name}</h3>
                        <p className="mb-3 text-sm leading-relaxed text-[var(--text-secondary)]">{round.desc}</p>
                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                          <Calendar size={12} />
                          {fmtDateRange(round.start, round.end)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Eligibility ─────────────────────────────────────────── */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Users size={20} className="text-[var(--purple)]" />
                <h2 className="font-display text-2xl font-bold text-white">Eligibility</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {event.eligibility.map((e) => (
                  <div
                    key={e}
                    className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-secondary)]"
                  >
                    <CheckCircle2 size={14} className="shrink-0 text-[var(--green)]" />
                    {e}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Judging Criteria ────────────────────────────────────── */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <ShieldCheck size={20} className="text-[var(--cyan)]" />
                <h2 className="font-display text-2xl font-bold text-white">Judging Criteria</h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Object.entries(event.criteria).map(([key, item]) => (
                  <div key={key} className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-bold text-white">{item.label}</span>
                      <span className="badge badge-purple text-xs font-mono">{item.weight}%</span>
                    </div>
                    {/* Weight bar */}
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-surface-2)]">
                      <div
                        className="h-full rounded-full bg-[var(--cyan)]"
                        style={{ width: `${item.weight}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Rules ───────────────────────────────────────────────── */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <ShieldCheck size={20} className="text-[var(--red)]" />
                <h2 className="font-display text-2xl font-bold text-white">Rules & Guidelines</h2>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-6">
                <ul className="space-y-3">
                  {event.rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <ChevronRight size={15} className="mt-0.5 shrink-0 text-[var(--cyan)]" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Finalist Projects (empty state) ─────────────────────── */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Trophy size={20} className="text-[var(--amber)]" />
                <h2 className="font-display text-2xl font-bold text-white">Finalist Projects</h2>
              </div>
              <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-surface)] p-10 text-center">
                <Trophy size={36} className="mx-auto mb-3 text-[var(--amber)] opacity-50" />
                <h4 className="font-display mb-2 text-base font-bold text-white">No Submissions Yet</h4>
                <p className="mx-auto max-w-sm text-sm text-[var(--text-muted)] leading-relaxed">
                  Submissions open after Round 1 begins. Register to participate.
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ─────────────────────────────────────────────── */}
          <div className="hidden lg:block">
            <div className="sticky top-6 space-y-5">

              {/* Register CTA */}
              <div className="rounded-xl border border-[#00D4FF]/30 bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-surface-2)] p-6 shadow-lg">
                <h3 className="font-display mb-1 text-lg font-bold text-white">Register Now</h3>
                <p className="mb-4 text-xs leading-relaxed text-[var(--text-muted)]">
                  Open to all eligible students. Register before 31 Dec 2026, 11:59 PM IST.
                </p>
                <a
                  href={event.register_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex w-full items-center justify-center gap-2 py-3 text-sm font-bold"
                >
                  Register on Unstop <ExternalLink size={14} />
                </a>
                <a
                  href={event.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost mt-2 flex w-full items-center justify-center gap-2 py-2.5 text-xs"
                >
                  <MessageSquare size={13} /> Join WhatsApp Group
                </a>
              </div>

              {/* Key Dates */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
                <h3 className="font-display mb-4 text-sm font-bold text-white flex items-center gap-2">
                  <Calendar size={15} className="text-[var(--cyan)]" /> Key Dates
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Reg. Opens</span>
                    <span className="font-medium text-white">18 Oct 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Reg. Deadline</span>
                    <span className="font-medium text-[var(--red)]">31 Dec 2026</span>
                  </div>
                  <div className="border-t border-[var(--border)] pt-3">
                    {event.rounds.map((r) => (
                      <div key={r.id} className="mb-2 last:mb-0 flex justify-between">
                        <span className="text-[var(--text-muted)]">Round {r.id}</span>
                        <span className="text-right font-medium text-white">
                          {new Date(r.start).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          {' – '}
                          {new Date(r.end).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Organizer */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
                <h3 className="font-display mb-3 text-sm font-bold text-white">Organizer</h3>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--cyan)]/30 bg-[var(--bg-surface-2)] text-[var(--cyan)]">
                    <span className="font-display text-xs font-bold">R</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{event.organizer}</p>
                    <p className="text-xs text-[var(--text-muted)]">Student-Led Innovation Event</p>
                  </div>
                </div>
              </div>

              {/* Prize */}
              <div className="rounded-xl border border-[var(--amber)]/20 bg-[var(--bg-surface)] p-5">
                <h3 className="font-display mb-2 text-sm font-bold text-white flex items-center gap-2">
                  <Award size={15} className="text-[var(--amber)]" /> Prize
                </h3>
                <p className="text-sm font-semibold text-[var(--amber)]">🏅 {event.prize_info}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  All participants who complete the event receive a digital participation certificate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MOBILE BOTTOM CTA ═══════════════════════════════════════════════ */}
      <section className="container-page pb-12 lg:hidden">
        <div className="rounded-xl border border-[#00D4FF]/30 bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-surface-2)] p-6">
          <h3 className="font-display mb-1 text-base font-bold text-white">Organizer: {event.organizer}</h3>
          <p className="mb-4 text-xs text-[var(--text-muted)]">Prize: 🏅 {event.prize_info}</p>
          <div className="space-y-2 text-xs mb-5">
            {event.rounds.map((r) => (
              <div key={r.id} className="flex justify-between text-[var(--text-muted)]">
                <span>Round {r.id}: {r.name}</span>
                <span className="text-white">
                  {new Date(r.start).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            ))}
          </div>
          <a
            href={event.register_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary flex w-full items-center justify-center gap-2 py-3 text-sm font-bold"
          >
            Register on Unstop <ExternalLink size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}
