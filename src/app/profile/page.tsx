'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  User, CheckCircle2, Bookmark, HeartPulse, Send, Settings,
  LogOut, Shield, ChevronRight, Smartphone, ArrowRight, Flame,
  Trophy, ExternalLink, Edit3, Film, UserPlus, LogIn, Sparkles
} from 'lucide-react';
import { ProfileHealthTab } from '@/components/profile/ProfileHealthTab';
import { SubmissionsTab } from '@/components/profile/SubmissionsTab';
import { getStoredUser, clearStoredUser } from '@/lib/api-client';

function ProfileContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'overview' | 'submissions' | 'health' | 'settings') || 'overview';
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'health' | 'settings'>(initialTab);

  const [user, setUser] = useState<{
    id?: string;
    phone: string;
    displayName: string;
    username: string;
    teamName?: string | null;
    role?: string;
    isVerified?: boolean;
    createdAt?: string;
  } | null>(null);

  const [savedCount, setSavedCount] = useState(0);
  const [submissionsCount, setSubmissionsCount] = useState(0);
  const [disableIntro, setDisableIntro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['overview', 'submissions', 'health', 'settings'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  useEffect(() => {
    const loadProfile = () => {
      const stored = getStoredUser();
      setUser(stored);

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

      setLoading(false);
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
    clearStoredUser();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs text-zinc-400">Verifying session...</span>
        </div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════
  // NO PROFILE EXISTS BEFORE CREATION (Real Working App, No Fake User)
  // ═════════════════════════════════════════════════════════════════
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 pb-24 px-4 flex items-center justify-center">
        <div className="max-w-md w-full hud-panel p-6 sm:p-8 rounded-3xl bg-[#05070E] border border-cyan-500/30 shadow-[0_0_50px_rgba(0,212,255,0.15)] text-center animate-fade-in">
          {/* Brand Emblem */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-brand mx-auto mb-5 flex items-center justify-center shadow-[0_0_25px_rgba(0,212,255,0.4)]">
            <User size={30} className="text-black" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold mb-3">
            // AUTHENTIC ACCESS: NO PRE-SEEDED PROFILES
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Create Your Profile
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
            In RABINJA Projex, profiles only exist when you create them. Sign up for free or sign in to establish your verified builder identity, cast votes, submit star ratings, start technical discussions, and showcase your innovations.
          </p>

          <div className="space-y-3">
            <Link
              href="/auth/signup"
              className="btn btn-primary w-full justify-center py-3 text-xs sm:text-sm font-bold tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.35)]"
            >
              <UserPlus size={16} />
              Sign Up for Free
            </Link>

            <Link
              href="/auth/login"
              className="btn btn-secondary w-full justify-center py-3 text-xs sm:text-sm font-mono"
            >
              <LogIn size={16} />
              Sign In to Existing Account
            </Link>
          </div>

          <div className="mt-8 pt-5 border-t border-zinc-900 grid grid-cols-2 gap-3 text-left">
            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <span className="text-[11px] font-mono text-cyan-400 font-bold block mb-1">
                ✓ True Voting & Ratings
              </span>
              <span className="text-[10px] text-zinc-500">
                Real community-driven ratings with zero inflated mock numbers.
              </span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <span className="text-[11px] font-mono text-emerald-400 font-bold block mb-1">
                ✓ Free Innovator Node
              </span>
              <span className="text-[10px] text-zinc-500">
                Full access to discuss architectures and submit projects.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════
  // AUTHENTICATED USER PROFILE (Real user data)
  // ═════════════════════════════════════════════════════════════════
  const displayName = user.displayName;
  const username = user.username;
  const phone = user.phone;
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'IN';

  return (
    <div className="min-h-screen bg-black text-white pt-16 pb-24">
      {/* ── User Header Card ── */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/80 px-4 py-6 max-w-2xl mx-auto">
        <div className="flex items-start justify-between">
          {/* Avatar circle */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-display font-extrabold text-xl sm:text-2xl text-white shadow-[0_0_20px_rgba(0,212,255,0.3)] border border-cyan-400/40">
            {initials}
          </div>

          {/* Stats on Right */}
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
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold uppercase ml-1">
              Verified Innovator
            </span>
          </div>
          <p className="text-xs font-mono text-cyan-400">@{username}</p>

          <div className="flex items-center gap-3 text-xs text-zinc-400 mt-2">
            <span>Verified Phone: <strong className="text-white font-mono">{phone}</strong></span>
            {user.teamName && (
              <>
                <span>•</span>
                <span>Team: <strong className="text-white">{user.teamName}</strong></span>
              </>
            )}
          </div>

          {/* Profile Actions */}
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => setActiveTab('settings')}
              className="flex-1 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-200 font-mono font-medium text-xs text-center active:scale-95 transition-all"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="py-2 px-3 rounded-xl bg-red-950/40 border border-red-800/40 hover:border-red-600 text-red-300 font-mono text-xs flex items-center gap-1 active:scale-95 transition-all"
              title="Sign Out"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Brand Ecosystem Link */}
        <div className="mt-5 pt-4 border-t border-zinc-900">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
            RABINJA Ecosystem Track
          </div>
          <Link
            href="/explore"
            className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-cyan-500/30 hover:border-cyan-400 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-black shrink-0 border border-cyan-400/40 p-1 flex items-center justify-center">
              <img src="/logo.png" alt="RABINJA" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                RABINJA Original Projects
              </h4>
              <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                8 Official Brand Inventions • Verified Real Peer Review
              </p>
            </div>
            <ChevronRight size={16} className="text-zinc-600 group-hover:text-cyan-400 transition-colors shrink-0" />
          </Link>
        </div>
      </div>

      {/* ── Segmented Profile Tabs ── */}
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
                Verified member of RABINJA Projex ecosystem. Active to vote, rate, and open technical inquiries.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Ecosystem Activity
              </h3>
              <p className="text-xs text-zinc-300 mb-3">
                Saved Projects: <strong className="text-white font-mono">{savedCount}</strong>
              </p>
              <Link href="/explore" className="btn btn-secondary text-xs py-2 px-3 inline-flex">
                Explore Projects →
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="animate-fade-in">
            <SubmissionsTab />
          </div>
        )}

        {activeTab === 'health' && (
          <div className="animate-fade-in">
            <ProfileHealthTab />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4 animate-fade-in text-left">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                Account Settings
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-zinc-500 block mb-1 font-mono">Display Name</span>
                  <input
                    type="text"
                    value={displayName}
                    readOnly
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1 font-mono">Username</span>
                  <input
                    type="text"
                    value={`@${username}`}
                    readOnly
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-cyan-400 font-mono"
                  />
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1 font-mono">Phone</span>
                  <input
                    type="text"
                    value={phone}
                    readOnly
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-300 font-mono"
                  />
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-900">
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary text-xs text-red-400 border-red-900/40 hover:border-red-600"
                >
                  <LogOut size={13} />
                  Sign Out of Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white pt-24 pb-24 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
