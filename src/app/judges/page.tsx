'use client';

import Link from 'next/link';
import { Scale, ShieldCheck, Award, ArrowRight, ExternalLink, CheckCircle } from 'lucide-react';
import { SAMPLE_EVALUATIONS } from '@/lib/sample-data';

// Unique judges derived from sample evaluations
const JUDGES = [
  {
    id: 'jdg-01',
    name: 'Dr. Arvind Ramanathan',
    title: 'Principal AI Research Scientist, IISc Bangalore',
    specialization: 'Large Language Models & Edge AI',
    verified: true,
    evaluationsCount: 14,
    avatar: null,
  },
  {
    id: 'jdg-02',
    name: 'Priya Sundaram',
    title: 'VP of Engineering, Cleantech Grid Ventures',
    specialization: 'Distributed Energy & Climate Analytics',
    verified: true,
    evaluationsCount: 18,
    avatar: null,
  },
  {
    id: 'jdg-03',
    name: 'Vikram Malhotra',
    title: 'Chief Cryptographer, Cybershield India',
    specialization: 'Post-Quantum Cryptography & Zero-Knowledge Proofs',
    verified: true,
    evaluationsCount: 12,
    avatar: null,
  },
  {
    id: 'jdg-04',
    name: 'Dr. Radhika Nair',
    title: 'Professor of Computer Science, IIT Bombay',
    specialization: 'Autonomous Systems & Computer Vision',
    verified: true,
    evaluationsCount: 22,
    avatar: null,
  },
];

export default function JudgesDirectoryPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* ── Subheader ── */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-surface)] py-12">
        <div className="container-page">
          <div className="flex items-center gap-2 mb-3">
            <span className="badge badge-purple text-xs">
              <Scale size={13} /> INDEPENDENT JURY COUNCIL
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-3">
            Official Evaluators & Jury
          </h1>

          <p className="text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            The distinguished researchers, system architects, and technical leaders who independently review, score, and certify Rabinjathon submissions.
          </p>
        </div>
      </div>

      {/* ── Judges Grid ── */}
      <div className="container-page py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {JUDGES.map((judge) => (
            <div key={judge.id} className="card p-6 border-[var(--border)] bg-[var(--bg-surface)] flex flex-col justify-between hover:border-[var(--purple)]/60 transition-all">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center font-display font-bold text-lg text-white mb-4 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  {judge.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>

                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="font-display font-bold text-white text-base">{judge.name}</h3>
                  <CheckCircle size={14} className="text-[var(--green)] shrink-0" />
                </div>

                <p className="text-xs text-[var(--text-muted)] mb-3 leading-snug">{judge.title}</p>

                <div className="p-2.5 rounded-lg bg-[var(--bg-surface-2)] border border-[var(--border)] text-xs text-[var(--text-secondary)] mb-4">
                  <span className="block font-semibold text-white text-[11px] uppercase tracking-wider mb-0.5">Focus</span>
                  <span>{judge.specialization}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>{judge.evaluationsCount} Audits Complete</span>
                <span className="text-[var(--purple)] font-medium">Certified Jury</span>
              </div>
            </div>
          ))}
        </div>

        {/* Jury Governance Banner */}
        <div className="card p-6 bg-gradient-to-r from-purple-950/20 via-[var(--bg-surface-2)] to-blue-950/20 border-[var(--purple)]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--purple)]/10 border border-[var(--purple)]/40 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} className="text-[var(--purple)]" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Strict Anti-Bias & Conflict Protocol</h4>
              <p className="text-xs text-[var(--text-muted)]">Judges are isolated from team identities during initial technical grading and calibrated via NEX AI.</p>
            </div>
          </div>

          <Link href="/events" className="btn btn-secondary text-xs shrink-0 self-start md:self-auto">
            View Judging Rubric <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
