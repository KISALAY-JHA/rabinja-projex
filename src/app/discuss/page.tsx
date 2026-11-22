'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Coffee,
  Search,
  PlusCircle,
  Lock,
  Globe,
  Users,
  MessageSquare,
  Sparkles,
  Send,
  Share2,
  X,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Key,
  ShieldCheck,
  ChevronRight,
  Flame,
  ThumbsUp
} from 'lucide-react';
import { getStoredUser, type AuthUser } from '@/lib/api-client';

interface DiscussionRoom {
  id: string;
  code: string;
  title: string;
  initiator: string;
  category: string;
  description: string;
  isPrivate: boolean;
  participantCount: number;
  linkedProject?: string;
  createdAt: string;
  messages: {
    id: string;
    sender: string;
    text: string;
    time: string;
    isInitiator?: boolean;
    likes?: number;
  }[];
}

const INITIAL_ROOMS: DiscussionRoom[] = [
  {
    id: 'room-1',
    code: 'PET-204',
    title: 'Can Edge-AI Wearables replace traditional pet telemetry collars without thermal throttling?',
    initiator: 'Rabinja Animal Wellness Lab',
    category: 'Hardware & IoT',
    description: 'Debating whether sub-meter GPS and biometric pulse oximetry can run locally on BLE 5.2 microcontrollers without overheating canine skin.',
    isPrivate: false,
    participantCount: 18,
    linkedProject: 'Pet Shield',
    createdAt: '2 hours ago',
    messages: [
      { id: 'm1', sender: 'Devansh K.', text: 'Heat dissipation is the main bottleneck. Using thermally conductive silicone sleeves with LTE-M low duty cycling is critical.', time: '1h ago', isInitiator: true, likes: 6 },
      { id: 'm2', sender: 'Sanya R.', text: 'We tested continuous BLE beacons vs intermittent cellular pings. Battery life leaped from 12 hours to 4 days.', time: '45m ago', likes: 4 },
      { id: 'm3', sender: 'Ananya S.', text: '15+ consensus reached! The synthesis report should advise Rabinja Labs to implement dynamic sleep telemetry.', time: '10m ago', likes: 7 }
    ]
  },
  {
    id: 'room-2',
    code: 'DESK-88',
    title: 'Computer Vision Posture Detection vs Ergonomic Pressure Sensors: Which is better for Smart Desk?',
    initiator: 'Kisalay Jha',
    category: 'AI & Autonomous',
    description: 'Privacy concerns arise when mounting wide-angle lenses on desks. Are unobtrusive capacitive pressure strips on armrests superior for privacy?',
    isPrivate: false,
    participantCount: 16,
    linkedProject: 'Smart Desk',
    createdAt: '3 hours ago',
    messages: [
      { id: 'm1', sender: 'Harshal Yadav', text: 'On-device edge inference with zero video frame uploads guarantees complete confidentiality.', time: '2h ago', isInitiator: true, likes: 8 },
      { id: 'm2', sender: 'Rohan V.', text: 'Capacitive sensors are cheaper to manufacture, but computer vision can detect spinal curvature and shoulder slumping.', time: '1h ago', likes: 5 }
    ]
  },
  {
    id: 'room-3',
    code: 'SOUL-15',
    title: 'Confidential Mental Health AI Sanctuary: Guaranteeing zero telemetry and zero server leakage',
    initiator: 'Cognitive Research Guild',
    category: 'Mental Health & Social',
    description: 'How to structure self-hosted vector databases for therapeutic cognitive reframing so no corporate server ever sees introspective journaling.',
    isPrivate: false,
    participantCount: 14,
    linkedProject: 'Therapist',
    createdAt: '5 hours ago',
    messages: [
      { id: 'm1', sender: 'Dr. Meera N.', text: 'End-to-end client encrypted vector embeddings with local browser SQLite memory is the gold standard.', time: '3h ago', isInitiator: true, likes: 5 },
      { id: 'm2', sender: 'Karan T.', text: 'Need 1 more participant to cross 15 members and transmit our architectural recommendations to the Therapist team!', time: '20m ago', likes: 3 }
    ]
  },
  {
    id: 'room-4',
    code: 'PRIME-01',
    title: 'Rabinjathon: Prime 1 format brainstorm — How to evaluate working model videos without code inspection?',
    initiator: 'Rabinja Squad Coordinator',
    category: 'Ideathons & Campus',
    description: 'Explaining our philosophy: Innovators should never be forced to disclose proprietary source code to enter contests. Demonstrating real working prototypes is authentic.',
    isPrivate: false,
    participantCount: 24,
    linkedProject: 'Rabinjathon: Prime 1',
    createdAt: '6 hours ago',
    messages: [
      { id: 'm1', sender: 'Organizer Node', text: 'Proprietary IP theft is real. Video walkthroughs + live telemetry verification protect the innovator while proving feasibility.', time: '5h ago', isInitiator: true, likes: 12 },
      { id: 'm2', sender: 'Aditya P.', text: 'Love that participants keep their secret sauce private. This builds trust for genuine builders.', time: '3h ago', likes: 9 }
    ]
  },
  {
    id: 'room-5',
    code: 'PRIV-77',
    title: 'Private Syndicate: Hardware Bill-of-Materials & PCB Assembly Vendors in India',
    initiator: 'Embedded Founders Circle',
    category: 'Hardware & IoT',
    description: 'Invite-only mastermind sharing verified PCBA fabricators, component lead times, and customs clearance benchmarks.',
    isPrivate: true,
    participantCount: 8,
    createdAt: '1 day ago',
    messages: [
      { id: 'm1', sender: 'HardwareLead', text: 'Welcome to the private room. Enter the room passkey to access vendor comparison matrices.', time: '1d ago', isInitiator: true }
    ]
  }
];

const CATEGORIES = [
  'ALL',
  'Hardware & IoT',
  'AI & Autonomous',
  'Mental Health & Social',
  'Ideathons & Campus',
  'FinTech & Wealth'
];

export default function OpenDiscussionPage() {
  const [rooms, setRooms] = useState<DiscussionRoom[]>(INITIAL_ROOMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [user, setUser] = useState<AuthUser | null>(null);

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState<DiscussionRoom | null>(null);
  const [privateCodeInput, setPrivateCodeInput] = useState('');
  const [codeError, setCodeError] = useState('');

  // Active Room Messaging State
  const [newMsgText, setNewMsgText] = useState('');
  const [roomCopied, setRoomCopied] = useState(false);

  // New Room Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('AI & Autonomous');
  const [formDesc, setFormDesc] = useState('');
  const [formIsPrivate, setFormIsPrivate] = useState(false);
  const [formLinkedProject, setFormLinkedProject] = useState('');

  useEffect(() => {
    setUser(getStoredUser());
    const stored = localStorage.getItem('rabinja_open_discussions');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRooms([...parsed, ...INITIAL_ROOMS.filter(r => !parsed.some((p: any) => p.id === r.id))]);
        }
      } catch {}
    }
  }, []);

  const filteredRooms = useMemo(() => {
    return rooms.filter((r) => {
      const matchCat = selectedCategory === 'ALL' || r.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.initiator.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q) ||
        (r.linkedProject && r.linkedProject.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [rooms, selectedCategory, searchQuery]);

  const handleJoinByCode = (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError('');
    const targetCode = privateCodeInput.trim().toUpperCase();
    const found = rooms.find((r) => r.code.toUpperCase() === targetCode);
    if (found) {
      setActiveRoom(found);
      setPrivateCodeInput('');
    } else {
      setCodeError(`No room found with code "${targetCode}". Please verify code.`);
    }
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const generatedCode = 'CAFE-' + Math.floor(100 + Math.random() * 900);
    const newRoom: DiscussionRoom = {
      id: 'room-' + Date.now(),
      code: generatedCode,
      title: formTitle,
      initiator: user?.displayName || user?.phone || 'Innovator Initiator',
      category: formCategory,
      description: formDesc || 'Open brainstorming & technical exchange room.',
      isPrivate: formIsPrivate,
      participantCount: 1,
      linkedProject: formLinkedProject.trim() || undefined,
      createdAt: 'Just now',
      messages: [
        {
          id: 'm-' + Date.now(),
          sender: user?.displayName || 'Initiator',
          text: `Welcome to the discussion on: "${formTitle}". Let's solve this together!`,
          time: 'Just now',
          isInitiator: true,
          likes: 1
        }
      ]
    };

    const updated = [newRoom, ...rooms];
    setRooms(updated);
    try {
      localStorage.setItem('rabinja_open_discussions', JSON.stringify(updated.filter(r => !INITIAL_ROOMS.some(i => i.id === r.id))));
    } catch {}

    setCreateModalOpen(false);
    setFormTitle('');
    setFormDesc('');
    setFormLinkedProject('');
    setFormIsPrivate(false);
    setActiveRoom(newRoom);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgText.trim() || !activeRoom) return;

    const senderName = user?.displayName || user?.phone || 'Guest Builder';
    const newMsg = {
      id: 'msg-' + Date.now(),
      sender: senderName,
      text: newMsgText.trim(),
      time: 'Just now',
      likes: 0
    };

    const updatedRoom: DiscussionRoom = {
      ...activeRoom,
      participantCount: activeRoom.participantCount + 1,
      messages: [...activeRoom.messages, newMsg]
    };

    setActiveRoom(updatedRoom);
    setRooms((prev) => prev.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
    setNewMsgText('');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24 text-white">
      {/* ── TOP HERO SECTION ── */}
      <section className="relative overflow-hidden border-b border-cyan-500/20 bg-gradient-to-b from-black via-[#060B18] to-[var(--bg-primary)] pt-3 pb-8 sm:pt-6 sm:pb-12 px-4 sm:px-6">
        <div className="pointer-events-none absolute top-10 left-1/3 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-5 right-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10 text-center sm:text-left">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold tracking-wider">
                <Coffee size={14} className="text-amber-400 animate-pulse" />
                <span>THE OPEN INNOVATION CAFÉ</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Where Builders Debate, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-400 bg-clip-text text-transparent">
                  Shape Ideas & Transmit Feedback
                </span>
              </h1>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Start an open think tank or join private rooms with a code. When any topic reaches <span className="text-amber-400 font-bold">15+ participants</span>, our system compiles community consensus insights and delivers them directly to the project team.
              </p>

              {/* 15-Member Rule High-Trust Alert */}
              <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex items-start gap-3 text-left">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400 flex items-center justify-center shrink-0">
                  <Flame size={16} />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                    // THE 15-BUILDER CONSENSUS RULE
                  </div>
                  <p className="text-[11px] text-zinc-300 leading-relaxed mt-0.5">
                    Discussion topics require at least 15 active participants. Once crossed, the consensus outcome is shared with the project founder and team, letting them know what the public genuinely thinks.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Quick Action Controls */}
            <div className="w-full lg:w-80 space-y-3 shrink-0">
              <button
                onClick={() => setCreateModalOpen(true)}
                className="btn btn-primary w-full py-3.5 justify-center text-xs font-bold font-mono tracking-wider shadow-[0_0_25px_rgba(0,212,255,0.35)] flex items-center gap-2 active:scale-95"
              >
                <PlusCircle size={16} />
                <span>Start a New Discussion</span>
              </button>

              {/* Join with Code Box */}
              <form onSubmit={handleJoinByCode} className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2 text-left">
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                  <Key size={13} className="text-cyan-400" />
                  <span>HAVE A ROOM PASSKEY?</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={privateCodeInput}
                    onChange={(e) => setPrivateCodeInput(e.target.value)}
                    placeholder="e.g. PET-204"
                    className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 uppercase tracking-wider"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:text-white hover:bg-cyan-500/40 text-xs font-mono font-bold transition-colors"
                  >
                    Join
                  </button>
                </div>
                {codeError && (
                  <p className="text-[10px] text-rose-400 font-mono mt-1">
                    {codeError}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH & FILTER CONTROLS ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pb-6 border-b border-zinc-800">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, projects, or room codes..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-black shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── DISCUSSION ROOMS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {filteredRooms.map((room) => {
            const hasCrossed15 = room.participantCount >= 15;
            return (
              <div
                key={room.id}
                onClick={() => setActiveRoom(room)}
                className="group p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-cyan-400/50 hover:bg-[#070D1B] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-4"
              >
                {/* Top badges */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700/80 text-zinc-300 text-[10px] font-mono">
                      {room.category}
                    </span>
                    {room.linkedProject && (
                      <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono font-bold">
                        ✦ {room.linkedProject}
                      </span>
                    )}
                    {room.isPrivate ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/30">
                        <Lock size={10} /> Private
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                        <Globe size={10} /> Public
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">
                    CODE: <strong className="text-white">{room.code}</strong>
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="space-y-1.5 text-left">
                  <h3 className="font-display text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {room.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>
                </div>

                {/* 15-Member Progress Bar & Status */}
                <div className="space-y-1 text-left">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Users size={12} className="text-cyan-400" />
                      <span>{room.participantCount} Participants</span>
                    </span>
                    {hasCrossed15 ? (
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <Sparkles size={11} />
                        Dispatched to Team
                      </span>
                    ) : (
                      <span className="text-zinc-500">
                        {15 - room.participantCount} needed to transmit
                      </span>
                    )}
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        hasCrossed15
                          ? 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                          : 'bg-cyan-500'
                      }`}
                      style={{ width: `${Math.min(100, (room.participantCount / 15) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Footer attribution */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-900 text-[10px] font-mono text-zinc-500">
                  <span>Initiated by: <strong className="text-zinc-300">{room.initiator}</strong></span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Enter Café <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          ACTIVE DISCUSSION ROOM MODAL / LIVE FORUM
          ════════════════════════════════════════════════════════════════════════ */}
      {activeRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in text-left">
          <div className="relative w-full max-w-2xl bg-[#05070E] border-2 border-cyan-500/50 rounded-3xl p-4 sm:p-6 shadow-[0_0_60px_rgba(0,212,255,0.25)] space-y-4 max-h-[92vh] flex flex-col">
            {/* Top Bar */}
            <div className="flex items-start justify-between pb-3 border-b border-zinc-800 shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] font-mono">
                    {activeRoom.category}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/40 font-bold">
                    CODE: {activeRoom.code}
                  </span>
                  {activeRoom.linkedProject && (
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40">
                      ✦ {activeRoom.linkedProject}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  {activeRoom.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://rabinjasquad.in/discuss?code=${activeRoom.code}`);
                    setRoomCopied(true);
                    setTimeout(() => setRoomCopied(false), 2000);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5"
                >
                  <Share2 size={13} />
                  <span>{roomCopied ? 'Copied!' : 'Share'}</span>
                </button>
                <button
                  onClick={() => setActiveRoom(null)}
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* 15+ Threshold Banner */}
            <div className={`p-3 rounded-xl border text-xs font-mono shrink-0 flex items-center justify-between ${
              activeRoom.participantCount >= 15
                ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-400'
            }`}>
              <div className="flex items-center gap-2">
                <Sparkles size={14} className={activeRoom.participantCount >= 15 ? 'text-amber-400' : 'text-cyan-400'} />
                <span>
                  {activeRoom.participantCount >= 15
                    ? `Consensus Reached (${activeRoom.participantCount} Members) • Briefing Transmitted to ${activeRoom.linkedProject || 'Project Team'}`
                    : `${activeRoom.participantCount} / 15 Members Joined • Needs ${15 - activeRoom.participantCount} more to dispatch insights`}
                </span>
              </div>
            </div>

            {/* Problem Context */}
            <div className="p-3 bg-black/60 rounded-xl border border-zinc-800/80 text-xs text-zinc-300 shrink-0">
              <span className="text-[10px] font-mono text-zinc-500 block uppercase mb-0.5">
                // Problem Statement by {activeRoom.initiator}:
              </span>
              {activeRoom.description}
            </div>

            {/* Chat Thread Messages */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 min-h-[160px]">
              {activeRoom.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-2xl border text-xs space-y-1 text-left ${
                    msg.isInitiator
                      ? 'bg-cyan-950/20 border-cyan-500/30'
                      : 'bg-zinc-900/50 border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      {msg.sender}
                      {msg.isInitiator && (
                        <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 text-[9px] border border-cyan-500/40">
                          Initiator
                        </span>
                      )}
                    </span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="text-zinc-200 leading-relaxed font-sans text-xs">
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Send Message Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-zinc-800 shrink-0">
              <input
                type="text"
                required
                value={newMsgText}
                onChange={(e) => setNewMsgText(e.target.value)}
                placeholder="Share your perspective, critique, or technical fix..."
                className="flex-1 px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-sans"
              />
              <button
                type="submit"
                className="btn btn-primary px-4 py-2 text-xs font-bold font-mono flex items-center gap-1.5 shrink-0"
              >
                <Send size={13} />
                <span>Post</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          START A NEW DISCUSSION MODAL
          ════════════════════════════════════════════════════════════════════════ */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in text-left">
          <div className="relative w-full max-w-lg bg-[#05070E] border-2 border-cyan-500/40 rounded-3xl p-5 sm:p-6 shadow-[0_0_50px_rgba(0,212,255,0.25)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400 flex items-center justify-center">
                  <Coffee size={16} />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white">Start a Discussion Topic</h3>
                  <p className="text-[10px] font-mono text-zinc-400">Launch a public café room or private mastermind</p>
                </div>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateRoom} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="block text-zinc-400 mb-1">TOPIC TITLE / QUESTION</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Can solar micro-inverters work with portable smart desks?"
                  className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">DOMAIN / CATEGORY</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="AI & Autonomous">AI & Autonomous</option>
                    <option value="Hardware & IoT">Hardware & IoT</option>
                    <option value="Mental Health & Social">Mental Health & Social</option>
                    <option value="Ideathons & Campus">Ideathons & Campus</option>
                    <option value="FinTech & Wealth">FinTech & Wealth</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">LINKED PROJECT (OPTIONAL)</label>
                  <input
                    type="text"
                    value={formLinkedProject}
                    onChange={(e) => setFormLinkedProject(e.target.value)}
                    placeholder="e.g. Smart Desk, Pet Shield..."
                    className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">CONTEXT & PROBLEM TO SOLVE</label>
                <textarea
                  rows={3}
                  required
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Explain the technical trade-offs, challenges, or feedback you want from other builders..."
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>

              {/* Room Access Mode */}
              <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 space-y-2">
                <span className="text-[10px] text-zinc-400 block uppercase font-bold">
                  // Access Control
                </span>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                    <input
                      type="radio"
                      name="accessMode"
                      checked={!formIsPrivate}
                      onChange={() => setFormIsPrivate(false)}
                      className="text-cyan-400"
                    />
                    <span>Public (Anyone can enter)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                    <input
                      type="radio"
                      name="accessMode"
                      checked={formIsPrivate}
                      onChange={() => setFormIsPrivate(true)}
                      className="text-cyan-400"
                    />
                    <span>Private (Join with passkey code)</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full py-3 justify-center text-xs font-bold font-mono tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.35)]"
              >
                Launch Discussion Topic
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
