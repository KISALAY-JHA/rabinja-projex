'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User,
  ShieldCheck,
  Bookmark,
  Sparkles,
  Settings,
  Phone,
  Users,
  CheckCircle2,
  TrendingUp,
  Lock,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_PROJECTS } from '@/lib/sample-data';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'audits' | 'activity'>('bookmarks');

  // Simulated logged-in user profile with phone verification
  const user = {
    display_name: 'Aditya Verma',
    username: 'aditya_v',
    phone: '+91 98765 43210',
    team_name: 'NeuralCraft Labs',
    role: 'Innovator & Auditor',
    phone_verified: true,
    joined: 'November 2026',
  };

  const bookmarkedProjects = SAMPLE_PROJECTS.slice(0, 2);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* ── Subheader / Profile Card ── */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-surface)] py-12">
        <div className="container-page max-w-5xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-brand flex items-center justify-center font-display font-extrabold text-2xl text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                {user.display_name.split(' ').map(n => n[0]).join('')}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-white">{user.display_name}</h1>
                  <span className="text-xs font-mono text-[var(--purple)]">@{user.username}</span>
                  <span className="badge badge-green flex items-center gap-1 text-[10px]">
                    <CheckCircle2 size={11} /> Phone Verified
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)] mt-1">
                  <span className="flex items-center gap-1 text-[var(--text-secondary)]">
                    <Phone size={12} className="text-[var(--cyan)]" /> {user.phone}
                  </span>
                  <span>•</span>
                  {user.team_name && (
                    <span className="flex items-center gap-1 text-[var(--text-secondary)]">
                      <Users size={12} className="text-[var(--purple)]" /> Team {user.team_name}
                    </span>
                  )}
                  <span>•</span>
                  <span>Member since {user.joined}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Link href="/auth/login" className="btn btn-secondary text-xs">
                Switch Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation Tabs ── */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-surface-2)]">
        <div className="container-page max-w-5xl flex gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'bookmarks'
                ? 'border-[var(--purple)] text-white'
                : 'border-transparent text-[var(--text-muted)] hover:text-white'
            }`}
          >
            <Bookmark size={14} /> Saved Bookmarks ({bookmarkedProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('audits')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'audits'
                ? 'border-[var(--purple)] text-white'
                : 'border-transparent text-[var(--text-muted)] hover:text-white'
            }`}
          >
            <Sparkles size={14} /> Private NEX AI Audits (3)
          </button>
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="container-page max-w-5xl py-10">
        {activeTab === 'bookmarks' && (
          <div className="space-y-4">
            <h3 className="font-display font-bold text-white text-lg mb-4">Bookmarked Submissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedProjects.map((p) => (
                <div key={p.id} className="card p-5 group flex flex-col justify-between hover:border-[var(--purple)] transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="badge badge-purple text-[10px]">{p.category}</span>
                      <span className="text-xs font-mono text-[var(--green)]">▲ {p.vote_count}</span>
                    </div>
                    <Link href={`/explore/${p.slug}`}>
                      <h4 className="font-display font-bold text-white group-hover:text-[var(--purple)] transition-colors mb-1 text-base">
                        {p.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-3">
                      {p.subtitle || p.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
                    <span className="text-[var(--text-muted)]">{p.team_name}</span>
                    <Link href={`/explore/${p.slug}`} className="text-[var(--purple)] hover:text-white font-medium flex items-center gap-1">
                      Explore <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'audits' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-bold text-white text-lg">Private NEX Analysis Records</h3>
              <span className="badge badge-gray text-[10px] flex items-center gap-1">
                <Lock size={10} /> End-to-End Private
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              These are your private project drafts evaluated using NEX AI. They are stored securely for your personal preparation and are strictly unpublished.
            </p>

            <div className="card p-5 border-[var(--cyan)]/30 bg-[var(--bg-surface)]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white text-sm">Autonomous Drone Swarm Telemetry Spec</span>
                <span className="badge badge-cyan text-[10px]">Technical Judge Audit</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3">
                Evaluated algorithmic mesh routing latency and failure tolerance. Overall Readiness Index: 84/100.
              </p>
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-3 border-t border-[var(--border)]">
                <span>Audited 2 days ago</span>
                <Link href="/nex" className="text-[var(--cyan)] hover:underline flex items-center gap-1">
                  Open in NEX <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
