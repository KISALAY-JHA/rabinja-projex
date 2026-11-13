'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  User, CheckCircle2, Bookmark, HeartPulse, Send, Settings,
  LogOut, Shield, ChevronRight, Smartphone, ArrowRight, Flame,
  Trophy, ExternalLink, Edit3, Film
} from 'lucide-react';
import { ProfileHealthTab } from '@/components/profile/ProfileHealthTab';
import { SubmissionsTab } from '@/components/profile/SubmissionsTab';
import { SAMPLE_PROJECTS } from '@/lib/sample-data';

function ProfileContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') as 'overview' | 'submissions' | 'health' | 'settings' || 'overview';
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'health' | 'settings'>(initialTab);

  const [user, setUser] = useState<{
    phone: string;
    displayName?: string;
    username?: string;
  } | null>(null);

  const [savedCount, setSavedCount] = useState(0);
  const [submissionsCount, setSubmissionsCount] = useState(0);
  const [disableIntro, setDisableIntro] = useState(false);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['overview', 'submissions', 'health', 'settings'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  useEffect(() => {
    const loadProfile = () => {
      try {
        const stored = localStorage.getItem('rabinja_auth_user');
        if (stored) setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }

      try {
        const saved = JSON.parse(localStorage.getItem('rabinja_saved_projects') || '[]');
        setSavedCount(saved.length);
      } catch {
        setSavedCount(0);
      }

      try {
        const subs = JSON.parse(localStorage.getItem('rabinja_user_submissions') || '[]');
        setSubmissionsCount(subs.length);
      } catch {
        setSubmissionsCount(0);
      }

      try {
        setDisableIntro(localStorage.getItem('rabinja_disable_intro') === 'true');
      } catch {
        setDisableIntro(false);
      }
    };

    loadProfile();
    window.addEventListener('rabinja-auth-change', loadProfile);
    window.addEventListener('rabinja-saved-change', loadProfile);
    return () => {
      window.removeEventListener('rabinja-auth-change', loadProfile);
      window.removeEventListener('rabinja-saved-change', loadProfile);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('rabinja_auth_user');
    setUser(null);
    window.dispatchEvent(new Event('rabinja-auth-change'));
  };

  const displayName = user?.displayName || 'Kisalay Jha';
  const username = user?.username || 'kisalay_jha';
  const phone = user?.phone || '+91 ••••• ••••07';
  const initials = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'KJ';

  return (
    <div className="min-h-screen bg-black text-white pt-16 pb-24">
      {/* ── User Header Card (Moctale Batch 1 Screen 6 Style) ── */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/80 px-4 py-6 max-w-2xl mx-auto">
        <div className="flex items-start justify-between">
          {/* Avatar circle */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-display font-extrabold text-xl sm:text-2xl text-white shadow-[0_0_20px_rgba(0,212,255,0.3)] border border-cyan-400/40">
            {initials}
          </div>

          {/* Stats on Right (Moctale 0 Reviews / 0 Collections Style) */}
          <div className="flex items-center gap-4 sm:gap-6 text-center">
            <button onClick={() => setActiveTab('submissions')} className="group">
              <div className="text-base sm:text-xl font-bold font-mono text-white group-hover:text-cyan-400 transition-colors">
                {submissionsCount}
              </div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">
                Submissions
              </div>
            </button>
            <Link href="/collections" className="group">
              <div className="text-base sm:text-xl font-bold font-mono text-white group-hover:text-cyan-400 transition-colors">
                {savedCount}
              </div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">
                Saved Projects
              </div>
            </Link>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-4 text-left">
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {displayName}
            </h1>
            <CheckCircle2 size={16} className="text-cyan-400 fill-cyan-400/20" />
          </div>
          <p className="text-xs font-mono text-cyan-400">@{username}</p>

          <div className="flex items-center gap-3 text-xs text-zinc-400 mt-2">
            <span>0 Followers</span>
            <span>•</span>
            <span>0 Following</span>
            <span>•</span>
            <span className="text-zinc-500">Joined this month</span>
          </div>

          {/* Edit Profile / Phone Auth CTA */}
          <div className="mt-4 flex items-center gap-2">
            {!user ? (
              <Link
                href="/auth/signup"
                className="flex-1 py-2 rounded-xl bg-cyan-400 text-black font-mono font-bold text-xs text-center shadow-[0_0_15px_rgba(0,212,255,0.3)] active:scale-95 transition-all"
              >
                Verify Phone Identity
              </Link>
            ) : (
              <button
                onClick={() => setActiveTab('settings')}
                className="flex-1 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-200 font-mono font-medium text-xs text-center active:scale-95 transition-all"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* "Interested In" Card (Moctale Ramayana Preview Style) */}
        <div className="mt-5 pt-4 border-t border-zinc-900">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
            Currently Interested In
          </div>
          <Link
            href="/events"
            className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500/40 transition-all group"
          >
            <div className="w-12 h-14 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-zinc-700">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=200&q=80"
                alt="Rabinjathon 2026"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                Rabinjathon 2026
              </h4>
              <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                Active Flagship Challenge • ₹25L Prize Pool
              </p>
            </div>
            <ChevronRight size={16} className="text-zinc-600 group-hover:text-cyan-400 transition-colors shrink-0" />
          </Link>
        </div>
      </div>

      {/* ── Segmented Profile Tabs (Moctale Screen 6 Icons Style) ── */}
      <div className="max-w-2xl mx-auto px-4 mt-3">
        <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-zinc-950 border border-zinc-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'overview'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <User size={14} />
            <span className="hidden sm:inline">Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'submissions'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Send size={14} />
            <span className="hidden sm:inline">Submissions</span>
          </button>

          <button
            onClick={() => setActiveTab('health')}
            className={`py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'health'
                ? 'bg-zinc-800 text-emerald-300 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <HeartPulse size={14} className={activeTab === 'health' ? 'text-emerald-400' : ''} />
            <span className="hidden sm:inline">Health</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'settings'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Settings size={14} />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>

      {/* ── Tab Content Views ── */}
      <div className="max-w-2xl mx-auto px-4 mt-4">
        {activeTab === 'overview' && (
          <div className="space-y-4 animate-fade-in text-left">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Node Identity & Verification
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Connected Phone Node: <span className="font-mono text-cyan-400">{phone}</span>
              </p>
              <p className="text-[11px] text-zinc-500 mt-1">
                Verified builders receive cryptographic attestations on every NEX AI evaluation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">NEX AI Autonomous Judge</h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Ready to benchmark your code architecture and viva questions.
                </p>
              </div>
              <Link
                href="/nex"
                className="px-3.5 py-1.5 rounded-full bg-cyan-400 text-black text-xs font-mono font-bold hover:bg-cyan-300 transition-colors shrink-0"
              >
                Launch NEX →
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'submissions' && <SubmissionsTab />}

        {activeTab === 'health' && <ProfileHealthTab />}

        {activeTab === 'settings' && (
          <div className="space-y-3.5 max-w-xl mx-auto animate-fade-in text-left">
            {/* Startup Video Intro Toggle */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <div className="pr-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Film size={15} className="text-cyan-400" />
                  <span>Startup Video Intro</span>
                </h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  {disableIntro ? 'Intro video is turned OFF on startup' : 'Intro video plays when opening app'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const next = !disableIntro;
                  setDisableIntro(next);
                  try {
                    if (next) {
                      localStorage.setItem('rabinja_disable_intro', 'true');
                    } else {
                      localStorage.removeItem('rabinja_disable_intro');
                    }
                  } catch {}
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  !disableIntro ? 'bg-cyan-500' : 'bg-zinc-800'
                }`}
                role="switch"
                aria-checked={!disableIntro}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow-lg ring-0 transition duration-200 ease-in-out ${
                    !disableIntro ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Username Change Rule Card (Moctale Batch 2 Screen 1 Style) */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
              <h3 className="text-sm font-bold text-white mb-2">Change Username</h3>
              <ul className="text-xs text-zinc-400 space-y-1 list-disc list-inside mb-4">
                <li>Users with an active strike cannot change their username.</li>
                <li>Usernames can only be changed once every 30 days.</li>
              </ul>
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Current Username</span>
                <input
                  type="text"
                  disabled
                  value={`@${username}`}
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-400 font-mono"
                />
                <button
                  onClick={() => alert('Username cooldown is active. Next modification available in 30 days.')}
                  className="mt-2 px-4 py-2 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-zinc-200 transition-colors"
                >
                  Proceed
                </button>
              </div>
            </div>

            {user && (
              <button
                onClick={handleLogout}
                className="w-full p-3.5 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-rose-300 font-mono text-xs font-bold hover:bg-rose-950/40 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={14} />
                <span>Disconnect & Logout</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center text-cyan-400 font-mono text-xs">
        LOADING PROFILE HUB...
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}
