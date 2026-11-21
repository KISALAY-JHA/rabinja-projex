'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  User, CheckCircle2, Bookmark, HeartPulse, Send, Settings,
  LogOut, Shield, ChevronRight, Smartphone, ArrowRight, Flame,
  Trophy, ExternalLink, Edit3, Film, UserPlus, LogIn, Sparkles,
  Users, UserCheck, X, Plus, PlusCircle, Check
} from 'lucide-react';
import { ProfileHealthTab } from '@/components/profile/ProfileHealthTab';
import { SubmissionsTab } from '@/components/profile/SubmissionsTab';
import { getStoredUser, clearStoredUser } from '@/lib/api-client';

interface StartupTeam {
  name: string;
  tagline: string;
  logo: string;
  sector: string;
  stage: string;
  members: { name: string; role: string; isFounder?: boolean }[];
}

interface FriendItem {
  id: string;
  name: string;
  username: string;
  phone: string;
  team?: string;
  status: 'friend' | 'pending_received' | 'pending_sent';
}

const DEFAULT_FRIENDS: FriendItem[] = [
  { id: 'f1', name: 'Aarav Patel', username: 'aarav_builds', phone: '+91 XXXXX XXXXX', team: 'Quantum Leap Labs', status: 'friend' },
  { id: 'f2', name: 'Riya Sharma', username: 'riya_hardware', phone: '+91 XXXXX XXXXX', team: 'Aether Robotics', status: 'friend' },
  { id: 'req1', name: 'Kabir Verma', username: 'kabir_ai', phone: '+91 XXXXX XXXXX', team: 'NeuroDesk', status: 'pending_received' },
];

const LOGO_EMBLEMS = ['🚀', '⚡', '🛡️', '🧬', '🌐', '🤖', '💎', '🦅', '🔥', '⚙️'];

function ProfileContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'overview' | 'startup_team' | 'network' | 'submissions' | 'health' | 'settings') || 'overview';
  const [activeTab, setActiveTab] = useState<'overview' | 'startup_team' | 'network' | 'submissions' | 'health' | 'settings'>(initialTab);

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

  // ── Startup Team State ──
  const [startupTeam, setStartupTeam] = useState<StartupTeam | null>(null);
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [teamFormName, setTeamFormName] = useState('');
  const [teamFormTagline, setTeamFormTagline] = useState('');
  const [teamFormLogo, setTeamFormLogo] = useState('🚀');
  const [teamFormSector, setTeamFormSector] = useState('AI & DeepTech');
  const [teamFormStage, setTeamFormStage] = useState('Bootstrapped Prototype');

  // ── Friends & Network State ──
  const [networkList, setNetworkList] = useState<FriendItem[]>(DEFAULT_FRIENDS);
  const [addFriendInput, setAddFriendInput] = useState('');
  const [friendSuccessMsg, setFriendSuccessMsg] = useState('');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['overview', 'startup_team', 'network', 'submissions', 'health', 'settings'].includes(tabParam)) {
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

      // Load Startup Team
      try {
        const storedTeam = localStorage.getItem('rabinja_startup_team');
        if (storedTeam) {
          setStartupTeam(JSON.parse(storedTeam));
        } else if (stored?.teamName) {
          const initTeam: StartupTeam = {
            name: stored.teamName,
            tagline: 'Autonomous DeepTech Ventures',
            logo: '🚀',
            sector: 'AI & Engineering',
            stage: 'Bootstrapped Prototype',
            members: [{ name: stored.displayName || 'Founder', role: 'Founder & Architect', isFounder: true }],
          };
          setStartupTeam(initTeam);
          localStorage.setItem('rabinja_startup_team', JSON.stringify(initTeam));
        }
      } catch {}

      // Load Network List
      try {
        const storedNet = localStorage.getItem('rabinja_friends_network');
        if (storedNet) {
          setNetworkList(JSON.parse(storedNet));
        }
      } catch {}

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

  const toggleDisableIntro = () => {
    const next = !disableIntro;
    setDisableIntro(next);
    try {
      if (next) {
        localStorage.setItem('rabinja_disable_intro', 'true');
      } else {
        localStorage.removeItem('rabinja_disable_intro');
      }
      window.dispatchEvent(new Event('rabinja-settings-change'));
    } catch {}
  };

  // ── Startup Team Handlers ──
  const handleSaveTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamFormName.trim()) return;

    const newTeam: StartupTeam = {
      name: teamFormName.trim(),
      tagline: teamFormTagline.trim() || 'Next-Gen Technology Startup',
      logo: teamFormLogo,
      sector: teamFormSector,
      stage: teamFormStage,
      members: startupTeam?.members || [
        { name: user?.displayName || 'Founder', role: 'Founder & CEO', isFounder: true },
      ],
    };

    setStartupTeam(newTeam);
    setIsEditingTeam(false);
    try {
      localStorage.setItem('rabinja_startup_team', JSON.stringify(newTeam));
    } catch {}
  };

  // ── Friend Request Handlers ──
  const handleSendFriendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addFriendInput.trim()) return;

    const newRequest: FriendItem = {
      id: 'req_' + Date.now(),
      name: addFriendInput.trim(),
      username: addFriendInput.trim().toLowerCase().replace(/\s+/g, '_'),
      phone: '+91 XXXXX XXXXX',
      status: 'pending_sent',
    };

    const updated = [newRequest, ...networkList];
    setNetworkList(updated);
    try {
      localStorage.setItem('rabinja_friends_network', JSON.stringify(updated));
    } catch {}

    setAddFriendInput('');
    setFriendSuccessMsg(`Friend request sent to @${newRequest.username}!`);
    setTimeout(() => setFriendSuccessMsg(''), 3000);
  };

  const handleAcceptRequest = (id: string) => {
    const updated = networkList.map((item) =>
      item.id === id ? { ...item, status: 'friend' as const } : item
    );
    setNetworkList(updated);
    try {
      localStorage.setItem('rabinja_friends_network', JSON.stringify(updated));
    } catch {}
  };

  const handleDeclineRequest = (id: string) => {
    const updated = networkList.filter((item) => item.id !== id);
    setNetworkList(updated);
    try {
      localStorage.setItem('rabinja_friends_network', JSON.stringify(updated));
    } catch {}
  };

  const handleInviteToTeam = (friendName: string) => {
    if (!startupTeam) {
      setActiveTab('startup_team');
      return;
    }
    const alreadyMember = startupTeam.members.some((m) => m.name === friendName);
    if (alreadyMember) return;

    const updatedTeam = {
      ...startupTeam,
      members: [...startupTeam.members, { name: friendName, role: 'Core Engineer' }],
    };
    setStartupTeam(updatedTeam);
    try {
      localStorage.setItem('rabinja_startup_team', JSON.stringify(updatedTeam));
    } catch {}
    setFriendSuccessMsg(`${friendName} invited & added to ${startupTeam.name}!`);
    setTimeout(() => setFriendSuccessMsg(''), 3000);
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
  if (!user && activeTab !== 'settings') {
    return (
      <div className="min-h-screen bg-black text-white pt-20 pb-24 px-4 flex items-center justify-center">
        <div className="max-w-md w-full hud-panel p-6 sm:p-8 rounded-3xl bg-[#05070E] border border-cyan-500/30 shadow-[0_0_50px_rgba(0,212,255,0.15)] text-center animate-fade-in">
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
            In RABINJA Projex, profiles only exist when you create them. Sign up for free or sign in to establish your verified builder identity, build your startup team, make friends, and showcase your innovations.
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
        </div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════
  // USER PROFILE & PREFERENCES
  // ═════════════════════════════════════════════════════════════════
  const displayName = user?.displayName || 'Guest Innovator';
  const username = user?.username || 'guest';
  const phone = user?.phone || 'Not Connected';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'IN';

  const friendsCount = networkList.filter((n) => n.status === 'friend').length;
  const pendingRequestsCount = networkList.filter((n) => n.status === 'pending_received').length;

  return (
    <div className="min-h-screen bg-black text-white pt-3 sm:pt-6 pb-24">
      {/* ── User Header Card ── */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/80 px-4 py-6 max-w-2xl mx-auto">
        <div className="flex items-start justify-between">
          {/* Avatar circle */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-display font-extrabold text-xl sm:text-2xl text-white shadow-[0_0_20px_rgba(0,212,255,0.3)] border border-cyan-400/40">
            {initials}
          </div>

          {/* Stats on Right */}
          <div className="flex items-center gap-4 sm:gap-6 text-center">
            <button onClick={() => setActiveTab('startup_team')} className="group">
              <div className="text-base sm:text-xl font-bold font-mono text-cyan-400 group-hover:scale-110 transition-transform">
                {startupTeam ? startupTeam.members.length : 0}
              </div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">
                Team Size
              </div>
            </button>
            <button onClick={() => setActiveTab('network')} className="group">
              <div className="text-base sm:text-xl font-bold font-mono text-white group-hover:text-cyan-400 transition-colors">
                {friendsCount}
              </div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">
                Friends
              </div>
            </button>
            <button onClick={() => setActiveTab('submissions')} className="group">
              <div className="text-base sm:text-xl font-bold font-mono text-white group-hover:text-cyan-400 transition-colors">
                {submissionsCount}
              </div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">
                Projects
              </div>
            </button>
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
          </div>

          {/* ── STARTUP TEAM BADGE (Shows prominent startup status) ── */}
          {startupTeam ? (
            <div className="mt-3.5 p-3 rounded-2xl bg-gradient-to-r from-[#070E24] via-[#04060E] to-black border border-cyan-400/40 shadow-[0_0_20px_rgba(0,212,255,0.2)] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-cyan-400 p-1 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                  <span className="text-xl">{startupTeam.logo}</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold uppercase">
                      STARTUP FOUNDER
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">{startupTeam.stage}</span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-white">
                    {startupTeam.name}
                  </h4>
                  <p className="text-[10px] text-zinc-400 line-clamp-1">{startupTeam.tagline}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('startup_team')}
                className="btn btn-ghost text-xs text-cyan-300 hover:text-white font-mono py-1 px-3 border border-cyan-500/30 shrink-0"
              >
                Team Deck →
              </button>
            </div>
          ) : (
            <div className="mt-3.5 p-3 rounded-2xl bg-[#05070E] border border-dashed border-zinc-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-white block">Create Your Startup Team</span>
                <span className="text-[10px] text-zinc-500 font-mono">Display your venture logo and build with teammates</span>
              </div>
              <button
                onClick={() => {
                  setActiveTab('startup_team');
                  setIsEditingTeam(true);
                }}
                className="btn btn-primary text-xs py-1.5 px-3 font-mono font-bold shrink-0"
              >
                + Form Startup
              </button>
            </div>
          )}

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
      </div>

      {/* ── Segmented Profile Tabs ── */}
      <div className="max-w-2xl mx-auto px-4 mt-3">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar p-1 rounded-2xl bg-zinc-950 border border-zinc-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 min-w-[70px] py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <User size={13} />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('startup_team')}
            className={`flex-1 min-w-[100px] py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'startup_team'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <span>🚀</span>
            <span>Startup Team</span>
          </button>

          <button
            onClick={() => setActiveTab('network')}
            className={`flex-1 min-w-[90px] py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap relative ${
              activeTab === 'network'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Users size={13} />
            <span>Network</span>
            {pendingRequestsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-1.5 right-1.5" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex-1 min-w-[90px] py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'submissions'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Send size={13} />
            <span>Projects</span>
          </button>

          <button
            onClick={() => setActiveTab('health')}
            className={`flex-1 min-w-[70px] py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'health'
                ? 'bg-zinc-800 text-emerald-300 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <HeartPulse size={13} className={activeTab === 'health' ? 'text-emerald-400' : ''} />
            <span>Health</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 min-w-[70px] py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Settings size={13} />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* ── Tab Content Views ── */}
      <div className="max-w-2xl mx-auto px-4 mt-4">
        {/* ── TAB 1: OVERVIEW ── */}
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
              <div className="grid grid-cols-3 gap-2 text-center my-3">
                <div className="p-3 rounded-xl bg-black border border-zinc-800">
                  <span className="text-lg font-bold font-mono text-cyan-400 block">{friendsCount}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">Friends</span>
                </div>
                <div className="p-3 rounded-xl bg-black border border-zinc-800">
                  <span className="text-lg font-bold font-mono text-white block">{savedCount}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">Saved</span>
                </div>
                <div className="p-3 rounded-xl bg-black border border-zinc-800">
                  <span className="text-lg font-bold font-mono text-emerald-400 block">{submissionsCount}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">Projects</span>
                </div>
              </div>
              <Link href="/explore" className="btn btn-secondary text-xs py-2 px-3 inline-flex">
                Explore Projects →
              </Link>
            </div>
          </div>
        )}

        {/* ── TAB 2: STARTUP TEAM ── */}
        {activeTab === 'startup_team' && (
          <div className="space-y-4 animate-fade-in text-left">
            {isEditingTeam || !startupTeam ? (
              <div className="p-5 rounded-2xl bg-[#05070E] border border-cyan-500/40 shadow-[0_0_30px_rgba(0,212,255,0.15)] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <div>
                    <h3 className="font-display text-base font-bold text-white">
                      {startupTeam ? 'Edit Startup Venture' : 'Launch Your Startup Team'}
                    </h3>
                    <p className="text-[10px] font-mono text-zinc-400">
                      Display your startup logo and manage your engineering squad
                    </p>
                  </div>
                  {startupTeam && (
                    <button
                      onClick={() => setIsEditingTeam(false)}
                      className="text-xs text-zinc-500 hover:text-white font-mono"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveTeam} className="space-y-3.5 text-xs font-mono">
                  {/* Select Logo Emblem */}
                  <div>
                    <label className="block text-zinc-400 mb-1.5">CHOOSE TEAM LOGO EMBLEM</label>
                    <div className="flex flex-wrap gap-2">
                      {LOGO_EMBLEMS.map((em) => (
                        <button
                          key={em}
                          type="button"
                          onClick={() => setTeamFormLogo(em)}
                          className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border transition-all ${
                            teamFormLogo === em
                              ? 'bg-cyan-950 border-cyan-400 scale-110 shadow-[0_0_12px_rgba(0,212,255,0.4)]'
                              : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          {em}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">STARTUP / TEAM NAME</label>
                    <input
                      type="text"
                      required
                      value={teamFormName}
                      onChange={(e) => setTeamFormName(e.target.value)}
                      placeholder="e.g. NeuroTech Labs, Aether Dynamics..."
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">MISSION / TAGLINE</label>
                    <input
                      type="text"
                      value={teamFormTagline}
                      onChange={(e) => setTeamFormTagline(e.target.value)}
                      placeholder="e.g. Building autonomous cognitive diagnostics..."
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-zinc-400 mb-1">INDUSTRY DOMAIN</label>
                      <select
                        value={teamFormSector}
                        onChange={(e) => setTeamFormSector(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
                      >
                        <option value="AI & DeepTech">AI & DeepTech</option>
                        <option value="Hardware & IoT">Hardware & IoT</option>
                        <option value="Health & Biotech">Health & Biotech</option>
                        <option value="FinTech">FinTech</option>
                        <option value="CleanTech">CleanTech</option>
                        <option value="Open Innovation">Open Innovation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-zinc-400 mb-1">STAGE</label>
                      <select
                        value={teamFormStage}
                        onChange={(e) => setTeamFormStage(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
                      >
                        <option value="Ideation">Ideation</option>
                        <option value="Hackathon Squad">Hackathon Squad</option>
                        <option value="Bootstrapped Prototype">Bootstrapped Prototype</option>
                        <option value="Pre-Seed">Pre-Seed</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="btn btn-primary w-full justify-center text-xs py-2.5 font-bold">
                      {startupTeam ? 'Save Team Updates' : 'Launch Startup Profile →'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Team Card Deck */}
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#070D22] via-[#04060E] to-black border-2 border-cyan-500/40 shadow-[0_0_35px_rgba(0,212,255,0.2)]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-black border-2 border-cyan-400 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                        {startupTeam.logo}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold uppercase">
                            OFFICIAL STARTUP SQUAD
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            {startupTeam.stage}
                          </span>
                        </div>
                        <h2 className="font-display text-xl font-bold text-white">
                          {startupTeam.name}
                        </h2>
                        <p className="text-xs text-zinc-400 mt-0.5">{startupTeam.tagline}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setTeamFormName(startupTeam.name);
                        setTeamFormTagline(startupTeam.tagline);
                        setTeamFormLogo(startupTeam.logo);
                        setTeamFormSector(startupTeam.sector);
                        setTeamFormStage(startupTeam.stage);
                        setIsEditingTeam(true);
                      }}
                      className="text-xs font-mono text-cyan-400 hover:text-white border border-cyan-500/30 px-2.5 py-1.5 rounded-xl shrink-0"
                    >
                      Edit Deck
                    </button>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>Sector: <strong className="text-white">{startupTeam.sector}</strong></span>
                    <span>Members: <strong className="text-cyan-300">{startupTeam.members.length} Innovators</strong></span>
                  </div>
                </div>

                {/* Team Members List */}
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                      Core Startup Members
                    </h3>
                    <button
                      onClick={() => setActiveTab('network')}
                      className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <UserPlus size={12} /> Invite Friends from Network
                    </button>
                  </div>

                  <div className="space-y-2">
                    {startupTeam.members.map((m, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-black border border-zinc-800/80 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-300">
                            {m.name[0]}
                          </div>
                          <div>
                            <span className="font-bold text-white block">{m.name}</span>
                            <span className="text-[10px] font-mono text-zinc-400">{m.role}</span>
                          </div>
                        </div>
                        {m.isFounder && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                            Founder
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 3: NETWORK & FRIENDS ── */}
        {activeTab === 'network' && (
          <div className="space-y-4 animate-fade-in text-left">
            {/* Feedback Message */}
            {friendSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                <span>{friendSuccessMsg}</span>
              </div>
            )}

            {/* Send Friend Request Form */}
            <div className="p-4 rounded-2xl bg-[#05070E] border border-zinc-800 space-y-3">
              <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
                <UserPlus size={16} className="text-cyan-400" />
                <span>Connect with Innovators & Send Friend Request</span>
              </h3>
              <form onSubmit={handleSendFriendRequest} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={addFriendInput}
                  onChange={(e) => setAddFriendInput(e.target.value)}
                  placeholder="Enter builder username or name..."
                  className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                />
                <button type="submit" className="btn btn-primary text-xs py-2 px-3 font-mono font-bold shrink-0">
                  Send Request
                </button>
              </form>
              <p className="text-[11px] text-zinc-500 font-mono">
                Connect with collaborators from discussion rooms, hackathons, and ideathons.
              </p>
            </div>

            {/* Pending Friend Requests */}
            {pendingRequestsCount > 0 && (
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
                <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>Pending Friend Requests ({pendingRequestsCount})</span>
                </h4>
                <div className="space-y-2">
                  {networkList
                    .filter((n) => n.status === 'pending_received')
                    .map((req) => (
                      <div key={req.id} className="p-3 rounded-xl bg-black border border-cyan-500/30 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white">
                            {req.name[0]}
                          </div>
                          <div>
                            <span className="font-bold text-white block">{req.name}</span>
                            <span className="text-[10px] font-mono text-cyan-400">@{req.username}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleAcceptRequest(req.id)}
                            className="px-2.5 py-1 rounded-lg bg-cyan-400 text-black font-bold font-mono text-xs hover:bg-cyan-300 transition-colors"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleDeclineRequest(req.id)}
                            className="px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-400 font-mono text-xs hover:text-white"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* My Friends List */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Innovator Friends ({friendsCount})
                </h4>
                <span className="text-[10px] font-mono text-zinc-500">Collaborators & Teammates</span>
              </div>

              <div className="space-y-2">
                {networkList
                  .filter((n) => n.status === 'friend')
                  .map((f) => (
                    <div key={f.id} className="p-3 rounded-xl bg-black border border-zinc-800/80 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-white">
                          {f.name[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white">{f.name}</span>
                            <UserCheck size={12} className="text-cyan-400" />
                          </div>
                          <span className="text-[10px] font-mono text-zinc-400">@{f.username}</span>
                          {f.team && (
                            <span className="text-[10px] font-mono text-cyan-300 block mt-0.5">
                              Founder @ {f.team}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleInviteToTeam(f.name)}
                        className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-cyan-950 border border-zinc-800 hover:border-cyan-500/40 text-cyan-300 font-mono text-[11px] transition-all"
                      >
                        + Invite to Team
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 4: SUBMISSIONS ── */}
        {activeTab === 'submissions' && (
          <div className="animate-fade-in">
            <SubmissionsTab />
          </div>
        )}

        {/* ── TAB 5: HEALTH ── */}
        {activeTab === 'health' && (
          <div className="animate-fade-in">
            <ProfileHealthTab />
          </div>
        )}

        {/* ── TAB 6: SETTINGS ── */}
        {activeTab === 'settings' && (
          <div className="space-y-4 animate-fade-in text-left">
            {/* Startup Intro Video Preferences */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
                    <Film size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Startup Intro Video</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        disableIntro
                          ? 'bg-zinc-900 border-zinc-700 text-zinc-400'
                          : 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                      }`}>
                        {disableIntro ? 'Disabled' : 'Active'}
                      </span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Plays the cinematic RABINJA Projex intro animation when you open the app. Disable to launch directly to your feed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">
                  Current state: <strong className={disableIntro ? 'text-zinc-300' : 'text-cyan-400'}>{disableIntro ? 'Skipping Video' : 'Playing Video'}</strong>
                </span>
                <button
                  type="button"
                  onClick={toggleDisableIntro}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all active:scale-95 ${
                    disableIntro
                      ? 'bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,212,255,0.25)]'
                  }`}
                >
                  {disableIntro ? 'Turn ON Intro Video' : 'Turn OFF Intro Video'}
                </button>
              </div>
            </div>

            {/* Account Settings / Session Info */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                {user ? 'Account Settings' : 'Authentication Status'}
              </h3>
              {user ? (
                <>
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
                </>
              ) : (
                <div className="text-left space-y-3">
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    You are currently browsing Projex in Public Anonymous Mode. Register your phone number to establish an authentic builder profile.
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <Link href="/auth/signup" className="btn btn-primary text-xs py-2 px-3">
                      Register with Phone
                    </Link>
                    <Link href="/auth/login" className="btn btn-secondary text-xs py-2 px-3 font-mono">
                      Sign In
                    </Link>
                  </div>
                </div>
              )}
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
