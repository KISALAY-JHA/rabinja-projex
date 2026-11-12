'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User, ShieldCheck, Bookmark, Sparkles, Phone,
  Users, CheckCircle2, ArrowRight, LogOut, Smartphone
} from 'lucide-react';
import { SAMPLE_PROJECTS } from '@/lib/sample-data';

interface AuthUser {
  phone: string;
  displayName?: string;
  username?: string;
  teamName?: string | null;
  verified: boolean;
  verifiedAt?: string;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'audits' | 'activity'>('bookmarks');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('rabinja_auth_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('rabinja_auth_user');
    setUser(null);
    window.dispatchEvent(new Event('rabinja-auth-change'));
  };

  const bookmarkedProjects = SAMPLE_PROJECTS.slice(0, 2);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-cyan-400 font-mono text-xs">
        LOADING NODE PROFILE...
      </div>
    );
  }

  if (!user || !user.verified) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="card p-8 sm:p-10 max-w-md w-full text-center bg-[#05070E] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,212,255,0.15)]">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-400 mx-auto mb-4 flex items-center justify-center shadow-lg">
            <Smartphone size={28} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold mb-3">
            // IDENTITY AUTH REQUIRED
          </div>
          <h1 className="font-display text-2xl font-extrabold text-white mb-2">
            Phone Verification Required
          </h1>
          <p className="text-zinc-400 text-xs mb-6 leading-relaxed">
            Verify your phone number with our 1-click link or 6-digit OTP code to unlock your squad profile, bookmarks, and submissions.
          </p>
          <div className="flex flex-col gap-2.5">
            <Link
              href="/auth/signup"
              className="btn btn-primary w-full py-3 justify-center text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.35)]"
            >
              Verify Phone Number
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/auth/login"
              className="btn btn-secondary w-full py-2.5 justify-center text-xs font-mono"
            >
              Sign In Existing Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ── Subheader / Profile Card ── */}
      <div className="border-b border-zinc-800 bg-[#05070E] py-12">
        <div className="container-page max-w-5xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-brand flex items-center justify-center font-display font-extrabold text-xl sm:text-2xl text-black shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                {user.displayName ? user.displayName.split(' ').map(n => n[0]).join('') : 'U'}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="font-display text-xl sm:text-3xl font-extrabold text-white">
                    {user.displayName || 'Squad Innovator'}
                  </h1>
                  {user.username && (
                    <span className="text-xs font-mono text-cyan-400">@{user.username}</span>
                  )}
                  <span className="badge badge-green flex items-center gap-1 text-[10px] font-mono">
                    <CheckCircle2 size={11} /> Phone Verified
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-1 font-mono">
                  <span className="flex items-center gap-1 text-cyan-300 font-bold">
                    <Phone size={12} className="text-cyan-400" /> {user.phone}
                  </span>
                  <span>•</span>
                  {user.teamName && (
                    <>
                      <span className="flex items-center gap-1 text-zinc-300">
                        <Users size={12} className="text-cyan-400" /> Team {user.teamName}
                      </span>
                      <span>•</span>
                    </>
                  )}
                  <span>Squad Node Active</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleLogout}
                className="btn btn-secondary text-xs flex items-center gap-1.5 border-rose-500/30 text-rose-400 hover:bg-rose-500/10 font-mono"
              >
                <LogOut size={13} />
                Disconnect Session
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Tab Navigation ── */}
      <div className="container-page max-w-5xl py-8">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-8">
          {[
            { key: 'bookmarks', label: 'Bookmarked Projects', icon: Bookmark },
            { key: 'audits',    label: 'NEX AI Audits',       icon: Sparkles },
            { key: 'activity',  label: 'Squad Activity',      icon: ShieldCheck },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as typeof activeTab)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeTab === t.key
                  ? 'bg-cyan-500/15 border border-cyan-400 text-cyan-300 font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'bookmarks' && (
          <div>
            {bookmarkedProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bookmarkedProjects.map((p) => (
                  <Link key={p.id} href={`/explore/${p.slug}`}>
                    <div className="card p-5 bg-[#05070E] border border-cyan-500/20 hover:border-cyan-400 transition-all">
                      <h4 className="font-display font-bold text-white text-base">{p.title}</h4>
                      <p className="text-zinc-400 text-xs mt-1">{p.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="card p-8 text-center border-dashed border-zinc-800 bg-[#05070E]">
                <Bookmark size={28} className="mx-auto mb-2 text-cyan-400 opacity-60" />
                <h4 className="font-display text-base font-bold text-white mb-1">No Bookmarked Projects</h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4">
                  Browse projects on the explore feed and bookmark builds to follow their competition progress.
                </p>
                <Link href="/explore" className="btn btn-secondary text-xs font-mono">
                  Explore Projects
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'audits' && (
          <div className="card p-8 text-center border-dashed border-zinc-800 bg-[#05070E]">
            <Sparkles size={28} className="mx-auto mb-2 text-cyan-400 opacity-60" />
            <h4 className="font-display text-base font-bold text-white mb-1">No Active AI Audits</h4>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4">
              Submit your project repository or paste codebase architecture to run an autonomous evaluation with NEX AI.
            </p>
            <Link href="/nex" className="btn btn-primary text-xs font-mono font-bold">
              Launch NEX AI Simulator
            </Link>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="card p-6 bg-[#05070E] border border-zinc-800">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold mb-4">
              // TELEMETRY LOG
            </h4>
            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="text-zinc-300">Identity Authenticated via Phone OTP ({user.phone})</span>
                <span className="text-emerald-400 font-bold">VERIFIED</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="text-zinc-300">Squad Node Initialized</span>
                <span className="text-cyan-400 font-bold">ACTIVE</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
