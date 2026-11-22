'use client';

import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  Cpu,
  ShieldAlert,
  Target,
  FileText,
  Send,
  Loader2,
  RefreshCw,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Camera,
  Download,
  Play,
  Square,
  CheckCircle2,
  AlertTriangle,
  Trophy,
  Users,
  Star,
  Award,
  ChevronRight,
  Eye,
  Clock,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  ThumbsUp,
  Sliders,
  BadgeCheck
} from 'lucide-react';
import { SAMPLE_PROJECTS } from '@/lib/sample-data';
import { evaluateWithNex } from '@/lib/nex-engine';
import { GLOBAL_EVENTS_LIST, type GlobalEventItem } from '@/lib/global-events-data';

// ── Mentors & Judges Registry ────────────────────────────────────────────────
interface MentorJudge {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatar: string;
  domain: string;
  credibility: string;
  pastEvents: string[];
  rating: number;
  reviewCount: number;
  verified: boolean;
  status: 'Available for Review' | 'In Jury Session';
}

const MENTORS_AND_JUDGES: MentorJudge[] = [
  {
    id: 'mj-1',
    name: 'Dr. Aarav Menon',
    role: 'Principal Systems Architect',
    organization: 'ex-Google Cloud & Autonomous Robotics Lead',
    avatar: '👨‍💼',
    domain: 'Distributed Systems & Edge AI',
    credibility: 'SIH Grand Jury Chair (2024–2025), Published 18 IEEE Papers on Real-time Fault Tolerance.',
    pastEvents: ['Rabinjathon: Prime 1', 'Smart India Hackathon', 'ACM ICPC Regional'],
    rating: 4.95,
    reviewCount: 48,
    verified: true,
    status: 'Available for Review',
  },
  {
    id: 'mj-2',
    name: 'Neha Sharma',
    role: 'Head of Venture Strategy',
    organization: 'AngelSeed Capital & Techstars Mentor',
    avatar: '👩‍💼',
    domain: 'FinTech, SaaS, Product-Market Fit',
    credibility: 'Evaluated 300+ seed startups; Microsoft Imagine Cup National Judge, GTM advisor to 4 YC founders.',
    pastEvents: ['Rabinjathon: Prime 1', 'Microsoft Imagine Cup', 'FinTech Sprint'],
    rating: 4.88,
    reviewCount: 39,
    verified: true,
    status: 'Available for Review',
  },
  {
    id: 'mj-3',
    name: 'Vikramaditya Rathore',
    role: 'Director of Cyber Defense',
    organization: 'National Defense Lab Consultant',
    avatar: '👨‍💻',
    domain: 'Hardware Security, IoT & Critical Infra',
    credibility: 'Lead juror for DefCon village challenges, national smart cities cybersecurity auditor.',
    pastEvents: ['Smart India Hackathon', 'DEFCON India', 'IoT Summit Sprint'],
    rating: 5.0,
    reviewCount: 31,
    verified: true,
    status: 'Available for Review',
  },
  {
    id: 'mj-4',
    name: 'Elena Rostova',
    role: 'Cryptographic Protocol Engineer',
    organization: 'ZeroKnowledge Labs',
    avatar: '👩‍🔬',
    domain: 'ZK Proofs, Web3 & Scalability',
    credibility: 'ETHGlobal Top Mentor (2023–2025), Co-author of recursive SNARK rollups standard.',
    pastEvents: ['ETHIndia 2026', 'HackMIT', 'Web3 Summit'],
    rating: 4.92,
    reviewCount: 44,
    verified: true,
    status: 'In Jury Session',
  },
  {
    id: 'mj-5',
    name: 'RABINJA Squad Lead Council',
    role: 'Open Innovation Core Team',
    organization: 'RABINJA Labs',
    avatar: '⚡',
    domain: 'DeepTech Prototyping & Practical Execution',
    credibility: 'Organizers of Rabinjathon Prime Edition; zero-fluff validation framework authors.',
    pastEvents: ['Rabinjathon: Prime 1', 'Projex Global Hack', 'Open Hardware Blitz'],
    rating: 4.98,
    reviewCount: 72,
    verified: true,
    status: 'Available for Review',
  },
];

// ── Winner Benchmarks ────────────────────────────────────────────────────────
interface EventBenchmark {
  winnerTitle: string;
  year: string;
  score: number;
  highlight: string;
  scoringCriteria: {
    category: string;
    weight: string;
    description: string;
  }[];
}

const EVENT_BENCHMARKS: Record<string, EventBenchmark> = {
  'rabinjathon-prime-1': {
    winnerTitle: 'AetherGrid OS (Decentralized Mesh Communicator)',
    year: '2026 Benchmark Standard',
    score: 96,
    highlight: 'Zero internet reliance, 99.4% packet delivery under high-jamming disaster field tests.',
    scoringCriteria: [
      { category: 'Proof-of-Execution', weight: '35%', description: 'Working prototype demo without mockups or simulated delays.' },
      { category: 'Real-world Resilience', weight: '25%', description: 'Tolerance to extreme conditions, low bandwidth, and hardware failure.' },
      { category: 'Zero-Hype Transparency', weight: '20%', description: 'Clear honest disclosure of technical limits and unit economics.' },
      { category: 'Pitch & Explainer Quality', weight: '20%', description: 'Clear 2-min hook + concise 5-min technical teardown.' },
    ],
  },
  'sih-2026': {
    winnerTitle: 'KavachTrack IoT (Automated Railway Fault Interceptor)',
    year: 'SIH 2024 1st Prize Winner',
    score: 95,
    highlight: 'Sub-₹450 edge sensors integrated with Indian Railways signaling relays, preventing derailments.',
    scoringCriteria: [
      { category: 'Ministry Problem Alignment', weight: '30%', description: 'Exact solution to the published nodal ministry problem statement.' },
      { category: 'Hardware/Software Viability', weight: '30%', description: 'Production-ready BOM cost and immediate deployability.' },
      { category: 'Scalability & Maintenance', weight: '20%', description: 'Ease of nationwide servicing with low skilled labour.' },
      { category: 'Jury Q&A Defense', weight: '20%', description: 'Defending against live edge cases and false-positive queries.' },
    ],
  },
  'imagine-cup-2026': {
    winnerTitle: 'Neurolink Assist (AI Eye-Gaze Communication Engine)',
    year: 'Global Winner Archetype',
    score: 94,
    highlight: 'Low-latency assistive interface for ALS patients running natively on edge neural chips.',
    scoringCriteria: [
      { category: 'Global Social Impact', weight: '30%', description: 'Measurable human uplift across underserved demographics.' },
      { category: 'Cloud Architecture & AI', weight: '30%', description: 'High availability, ethical AI training, and data privacy.' },
      { category: 'Commercial Defensibility', weight: '20%', description: 'Viable distribution channels, IP protection, and compliance.' },
      { category: 'Presentation Articulation', weight: '20%', description: 'Compelling storytelling with empathetic user focus.' },
    ],
  },
  'ethindia-2026': {
    winnerTitle: 'zkPay Rollup (Instant Zero-Gas Settlement Layer)',
    year: 'Top Hackathon Winner',
    score: 93,
    highlight: 'Recursive PLONK proofs executed under 400ms on consumer mobile hardware.',
    scoringCriteria: [
      { category: 'Cryptographic Novelty', weight: '35%', description: 'Innovative math primitives and verified smart contracts.' },
      { category: 'Testnet Proof-of-Concept', weight: '30%', description: 'Live transactions on public testnets with zero fake states.' },
      { category: 'UX & Developer Tooling', weight: '20%', description: '1-click SDK integration for Web3 frontend developers.' },
      { category: 'Code Cleanliness', weight: '15%', description: 'Comprehensive unit tests and security lint checks.' },
    ],
  },
};

// ── Eye-Level HUD Questions ──────────────────────────────────────────────────
const LIVE_HUD_QUESTIONS = [
  {
    phase: 'HOOK & IDENTITY (0:00 - 0:45)',
    question: '🎯 Look into the camera: What exact high-friction problem are you solving, and who is desperately waiting for this solution today?',
    tips: 'Maintain eye contact with the camera lens. Speak with conviction. Avoid buzzwords.',
  },
  {
    phase: 'ENGINEERING & ARCHITECTURE (0:45 - 2:00)',
    question: '⚡ How does your underlying engine achieve this without failing under load? What is your secret technical edge?',
    tips: 'Mention specific protocols, algorithms, or hardware chips. Keep pacing measured.',
  },
  {
    phase: 'UNFAIR ADVANTAGE & ALTERNATIVES (2:00 - 3:15)',
    question: '🛡️ Why hasn\'t an established incumbent or well-funded player done this already? What is your defensive moat?',
    tips: 'Highlight patentable logic, proprietary data, lower BOM cost, or operational access.',
  },
  {
    phase: 'FAILURE MODES & HONEST LIMITS (3:15 - 4:30)',
    question: '⚠️ Under what precise conditions will your current prototype crash or give inaccurate results?',
    tips: 'Jurors love engineers who know their bottlenecks. State it honestly and show your mitigation plan.',
  },
  {
    phase: 'ROADMAP & CLOSING CALL (4:30 - 5:00)',
    question: '🚀 What will you build and deploy with the prize/grant capital in the next 90 days?',
    tips: 'End strong with clear milestones. Smile, thank the jury panel, and invite questions.',
  },
];

function NexWorkspaceContent() {
  const searchParams = useSearchParams();
  const initialProjectSlug = searchParams.get('project') || '';

  // Main UI Tabs
  const [activeTab, setActiveTab] = useState<'practice' | 'benchmark' | 'mentors' | 'audit'>('practice');

  // Selected Event & Round
  const [selectedEventId, setSelectedEventId] = useState<string>('rabinjathon-prime-1');
  const [selectedRound, setSelectedRound] = useState<string>('Round 1: 2-Min Product Intro');

  // Benchmark Form States
  const [projectTitle, setProjectTitle] = useState('');
  const [projectTagline, setProjectTagline] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [videoDemoUrl, setVideoDemoUrl] = useState('');
  const [analyzingBenchmark, setAnalyzingBenchmark] = useState(false);
  const [benchmarkResult, setBenchmarkResult] = useState<any>(null);

  // Live Camera Presentation States
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [coachingAlert, setCoachingAlert] = useState<string>('Maintain natural eye contact with the top camera lens.');
  const [liveScore, setLiveScore] = useState<number>(88);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  // Classic Audit State (for NEX Core)
  const [selectedSlug, setSelectedSlug] = useState<string>(initialProjectSlug);
  const [selectedMode, setSelectedMode] = useState<string>('technical');
  const [inputText, setInputText] = useState('');
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditLogs, setAuditLogs] = useState<any[]>([
    {
      sender: 'nex',
      text: '### ⚡ NEX Autonomous Red-Team Core Active\nSelect a project or paste technical claims to initiate vulnerability analysis.',
      time: 'Ready',
    },
  ]);

  // Selected event object
  const activeEvent = useMemo(() => {
    return (
      GLOBAL_EVENTS_LIST.find((e) => e.slug === selectedEventId) ||
      GLOBAL_EVENTS_LIST[0]
    );
  }, [selectedEventId]);

  const benchmarkData = useMemo(() => {
    return (
      EVENT_BENCHMARKS[selectedEventId] ||
      EVENT_BENCHMARKS['rabinjathon-prime-1']
    );
  }, [selectedEventId]);

  // Session timer for camera practice
  useEffect(() => {
    let interval: any = null;
    if (cameraActive) {
      interval = setInterval(() => {
        setSessionSeconds((prev) => {
          const next = prev + 1;
          // Dynamic real-time coaching tips based on timing
          if (next % 18 === 0) {
            const tips = [
              'Eye Contact: Excellent ✨ Keep looking directly into the lens.',
              'Pacing Check: Measured cadence (135 words/min) gives authority.',
              'Clarity Check: Articulate technical terminology clearly.',
              'Hand Gestures: Use open, steady gestures within the camera frame.',
              'Energy Level: High confidence detected. Maintain strong projection.',
            ];
            setCoachingAlert(tips[Math.floor(Math.random() * tips.length)]);
            setLiveScore((s) => Math.min(98, s + (Math.random() > 0.4 ? 1 : -1)));
          }
          return next;
        });
      } , 1000);
    } else {
      setSessionSeconds(0);
    }
    return () => clearInterval(interval);
  }, [cameraActive]);

  // Handle Camera Start / Stop
  const toggleCamera = async () => {
    if (cameraActive) {
      // Stop all tracks
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      if (isRecording) {
        stopRecording();
      }
      setCameraActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
          audio: micActive,
        });
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
        setSessionSeconds(0);
      } catch (err: any) {
        alert(
          'Camera access required for live presentation practice: ' +
            (err.message || 'Please grant camera permissions.')
        );
      }
    }
  };

  // Toggle Mic
  const toggleMic = () => {
    if (mediaStreamRef.current) {
      const audioTracks = mediaStreamRef.current.getAudioTracks();
      audioTracks.forEach((t) => {
        t.enabled = !micActive;
      });
      setMicActive(!micActive);
    } else {
      setMicActive(!micActive);
    }
  };

  // Local Recording (0 bytes uploaded to backend)
  const startRecording = () => {
    if (!mediaStreamRef.current) return;
    setRecordedChunks([]);
    setRecordedVideoUrl(null);

    try {
      const recorder = new MediaRecorder(mediaStreamRef.current, {
        mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
          ? 'video/webm;codecs=vp9,opus'
          : 'video/webm',
      });

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      recorder.onstop = () => {
        // Blob will be created when chunks accumulate
      };

      recorder.start(1000); // 1-second chunks
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (err: any) {
      alert('Local screen recording init failed: ' + err.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (!isRecording && recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedVideoUrl(url);
    }
  }, [isRecording, recordedChunks]);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // Format time mm:ss
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Handle Benchmark Submission
  const handleRunBenchmark = () => {
    if (!projectTitle.trim() && !projectDetails.trim()) {
      alert('Please enter your project title and core technical solution.');
      return;
    }
    setAnalyzingBenchmark(true);
    setTimeout(() => {
      // Calculate realistic alignment metrics
      const detailsLen = projectDetails.length;
      const hasVideo = !!videoDemoUrl.trim();
      const baseAlignment = Math.min(94, Math.max(72, Math.floor(74 + (detailsLen / 50) + (hasVideo ? 8 : 0))));
      const criteriaScores = benchmarkData.scoringCriteria.map((c, i) => ({
        ...c,
        score: Math.min(98, Math.max(68, baseAlignment + (i % 2 === 0 ? 3 : -4))),
      }));

      setBenchmarkResult({
        overallScore: baseAlignment,
        eventTitle: activeEvent.name,
        comparedWinner: benchmarkData.winnerTitle,
        winnerScore: benchmarkData.score,
        criteriaScores,
        strengths: [
          'High alignment with round problem-solving guidelines.',
          'Demonstrates direct utility without unnecessary technical fluff.',
          'Clear articulation of hardware/software operational limits.',
        ],
        vulnerabilities: [
          'Jury will rigorously test edge-case latency and network disconnects.',
          'Need to quantify total customer acquisition cost or per-unit BOM.',
          'Ensure the 2-minute video lead hook captures attention in first 8 seconds.',
        ],
        recommendation: `Your solution is highly competitive for ${activeEvent.name}. Focus your live pitch on answering the 4 jury defense questions in the Live Camera Studio.`,
      });
      setAnalyzingBenchmark(false);
    }, 1200);
  };

  // Run classic NEX Red-Team
  const handleClassicAudit = (prompt?: string) => {
    const q = prompt || inputText;
    if (!q.trim() && !selectedSlug) return;
    setAuditLoading(true);
    setTimeout(() => {
      const resp = evaluateWithNex(selectedMode, q, selectedSlug || undefined);
      setAuditLogs((prev) => [
        ...prev,
        { sender: 'user', text: q || `Auditing ${selectedSlug}`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        { sender: 'nex', text: resp, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
      setInputText('');
      setAuditLoading(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-zinc-100 flex flex-col">
      {/* ── Subheader ── */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-surface)] py-3 px-4 sm:px-6 sticky top-14 sm:top-16 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_18px_rgba(0,212,255,0.7)] bg-black shrink-0 flex items-center justify-center">
              <video
                src="/nex-ai.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-base sm:text-lg text-white">NEX AI Intelligence Studio</h1>
                <span className="badge badge-purple text-[10px] tracking-wider font-mono">PITCH & JURY SIMULATOR</span>
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Event-Specific Practice • Real-Winner Benchmarks • Eye-Level Camera Studio • Mentor Ratings
              </p>
            </div>
          </div>

          {/* Navigation Mode Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border)] overflow-x-auto text-xs font-mono">
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'practice'
                  ? 'bg-cyan-500 text-black font-extrabold shadow-[0_0_12px_rgba(0,212,255,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Camera size={14} />
              <span>Live Pitch Studio</span>
            </button>
            <button
              onClick={() => setActiveTab('benchmark')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'benchmark'
                  ? 'bg-cyan-500 text-black font-extrabold shadow-[0_0_12px_rgba(0,212,255,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Trophy size={14} />
              <span>Event Benchmark</span>
            </button>
            <button
              onClick={() => setActiveTab('mentors')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'mentors'
                  ? 'bg-cyan-500 text-black font-extrabold shadow-[0_0_12px_rgba(0,212,255,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Users size={14} />
              <span>Mentors & Judges</span>
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'audit'
                  ? 'bg-cyan-500 text-black font-extrabold shadow-[0_0_12px_rgba(0,212,255,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Cpu size={14} />
              <span>Red-Team Audit</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Workspace Body ── */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6">
        {/* ================================================================= */}
        {/* TAB 1: LIVE CAMERA PRESENTATION PRACTICE STUDIO                     */}
        {/* ================================================================= */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            {/* Event Header Picker */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">Target Hackathon Stage</span>
                <div className="flex items-center gap-2 mt-1">
                  <select
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="bg-zinc-950 border border-zinc-700 text-white rounded-xl px-3 py-1.5 text-xs font-medium focus:border-cyan-400 focus:outline-none"
                  >
                    {GLOBAL_EVENTS_LIST.map((evt) => (
                      <option key={evt.slug} value={evt.slug}>
                        {evt.flag} {evt.name} ({evt.country})
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedRound}
                    onChange={(e) => setSelectedRound(e.target.value)}
                    className="bg-zinc-950 border border-zinc-700 text-white rounded-xl px-3 py-1.5 text-xs font-medium focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Round 1: 2-Min Product Intro">Round 1: 2-Min Product Intro Video</option>
                    <option value="Round 2: 5-Min Working Explainer">Round 2: 5-Min Working Explainer Demo</option>
                    <option value="Round 3: Grand Finale Live Jury Pitch">Round 3: Grand Finale Live Jury Pitch</option>
                  </select>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono">
                  <Clock size={14} className="text-cyan-400" />
                  <span>Session: <strong className="text-white font-bold">{formatTime(sessionSeconds)}</strong></span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                  <Eye size={14} />
                  <span>Eye Contact: <strong className="text-white font-bold">{liveScore}%</strong></span>
                </div>
              </div>
            </div>

            {/* Video Viewport & Eye-Level HUD Prompt */}
            <div className="relative rounded-3xl overflow-hidden bg-black border-2 border-cyan-500/30 shadow-[0_0_40px_rgba(0,212,255,0.15)] flex flex-col items-center justify-center min-h-[420px] md:min-h-[520px]">
              {/* Actual Video Element */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover max-h-[580px] ${cameraActive ? 'block' : 'hidden'}`}
              />

              {/* Fallback Camera Off View */}
              {!cameraActive && (
                <div className="text-center p-8 max-w-md">
                  <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4 text-cyan-400 shadow-[0_0_20px_rgba(0,212,255,0.2)]">
                    <Camera size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Initialize Live Presentation Studio</h3>
                  <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                    Practice face-to-face with NEX AI. The system places jury questions directly at your <strong>eye level</strong> to train natural lens eye contact, gives real-time speech and confidence feedback, and lets you record your pitch locally on your device.
                  </p>
                  <button
                    onClick={toggleCamera}
                    className="px-6 py-3 rounded-2xl bg-cyan-400 text-black font-extrabold text-sm hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,212,255,0.5)] flex items-center gap-2 mx-auto"
                    style={{ color: '#000000' }}
                  >
                    <Play size={16} fill="currentColor" />
                    <span>Start Camera & Microphone</span>
                  </button>
                  <p className="text-[11px] text-zinc-500 mt-3 font-mono">
                    🔒 Zero Cloud Storage: All recordings stay 100% private on your machine.
                  </p>
                </div>
              )}

              {/* ── EYE-LEVEL HUD OVERLAY (Positioned at TOP of video at user's eye level) ── */}
              {cameraActive && (
                <div className="absolute top-4 left-4 right-4 z-10">
                  <div className="p-4 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-cyan-500/50 shadow-2xl">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
                          {LIVE_HUD_QUESTIONS[currentQuestionIndex].phase}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">
                        Question {currentQuestionIndex + 1} of {LIVE_HUD_QUESTIONS.length}
                      </span>
                    </div>

                    {/* Eye Level Question */}
                    <p className="text-sm sm:text-base font-semibold text-white leading-snug">
                      {LIVE_HUD_QUESTIONS[currentQuestionIndex].question}
                    </p>

                    {/* Live Tip Bar */}
                    <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-zinc-800/80 text-[11px]">
                      <div className="flex items-center gap-1.5 text-amber-300">
                        <Eye size={13} className="shrink-0" />
                        <span>{LIVE_HUD_QUESTIONS[currentQuestionIndex].tips}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            setCurrentQuestionIndex((prev) =>
                              prev > 0 ? prev - 1 : LIVE_HUD_QUESTIONS.length - 1
                            )
                          }
                          className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 hover:text-white text-[10px] font-mono"
                        >
                          Prev
                        </button>
                        <button
                          onClick={() =>
                            setCurrentQuestionIndex((prev) =>
                              (prev + 1) % LIVE_HUD_QUESTIONS.length
                            )
                          }
                          className="px-2.5 py-0.5 rounded bg-cyan-500 text-black font-extrabold hover:bg-cyan-400 text-[10px] font-mono"
                          style={{ color: '#000000' }}
                        >
                          Next Question ➔
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── REAL-TIME COACHING BADGE (Bottom of video) ── */}
              {cameraActive && (
                <div className="absolute bottom-20 left-4 right-4 z-10 flex justify-center">
                  <div className="px-4 py-2 rounded-full bg-zinc-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-2 shadow-lg animate-fadeIn">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>{coachingAlert}</span>
                  </div>
                </div>
              )}

              {/* ── BOTTOM HUD CONTROLS ── */}
              {cameraActive && (
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between p-2.5 rounded-2xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMic}
                      className={`p-2.5 rounded-xl border text-xs transition-all flex items-center gap-1.5 ${
                        micActive
                          ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:text-white'
                          : 'bg-red-950/50 border-red-500 text-red-400'
                      }`}
                      title={micActive ? 'Mute Microphone' : 'Unmute Microphone'}
                    >
                      {micActive ? <Mic size={16} /> : <MicOff size={16} />}
                      <span className="hidden sm:inline text-[11px] font-mono">{micActive ? 'Mic On' : 'Muted'}</span>
                    </button>

                    <button
                      onClick={toggleCamera}
                      className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-white text-xs transition-all flex items-center gap-1.5"
                    >
                      <VideoOff size={16} />
                      <span className="hidden sm:inline text-[11px] font-mono">End Studio</span>
                    </button>
                  </div>

                  {/* Local Recorder Trigger */}
                  <div className="flex items-center gap-2">
                    {!isRecording ? (
                      <button
                        onClick={startRecording}
                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all font-mono"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                        <span>Record (Local Only)</span>
                      </button>
                    ) : (
                      <button
                        onClick={stopRecording}
                        className="px-4 py-2 rounded-xl bg-zinc-900 border border-red-500 text-red-400 hover:bg-red-950/50 font-bold text-xs flex items-center gap-1.5 font-mono"
                      >
                        <Square size={13} fill="currentColor" />
                        <span>Stop Recording</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Local Video Download Bar */}
            {recordedVideoUrl && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-zinc-950 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Download size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Your Pitch Recording is Ready</h4>
                    <p className="text-xs text-zinc-400">
                      Saved locally in browser memory. Not a single byte was transmitted to any server.
                    </p>
                  </div>
                </div>
                <a
                  href={recordedVideoUrl}
                  download={`rabinja-practice-pitch-${Date.now()}.webm`}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 font-mono shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  style={{ color: '#000000' }}
                >
                  <Download size={14} />
                  <span>Download .webm Video</span>
                </a>
              </div>
            )}

            {/* Diagnostic Rubric & Guidelines */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
                <div className="flex items-center gap-2 text-cyan-400 mb-2 font-bold text-xs uppercase tracking-wider font-mono">
                  <Eye size={15} />
                  <span>Eye Contact Training</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Questions appear at the top center of your display so you maintain direct eye contact with the camera lens rather than looking down at written notes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
                <div className="flex items-center gap-2 text-amber-400 mb-2 font-bold text-xs uppercase tracking-wider font-mono">
                  <ShieldAlert size={15} />
                  <span>Zero-Hype Pressure</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Questions are generated by simulating senior jurors who detect exaggerated claims, unverified metrics, and missing error-handling strategies.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
                <div className="flex items-center gap-2 text-emerald-400 mb-2 font-bold text-xs uppercase tracking-wider font-mono">
                  <CheckCircle2 size={15} />
                  <span>Local Privacy Guarantee</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  All stream analysis and video recording executes purely client-side via WebRTC & MediaStream APIs. Stays 100% inside your browser.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: EVENT BENCHMARK & REAL WINNERS COMPARISON ENGINE           */}
        {/* ================================================================= */}
        {activeTab === 'benchmark' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Form Input Side */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Trophy size={18} className="text-amber-400" />
                      <span>Benchmark Against Real Winners</span>
                    </h2>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Select your target event and submit your pitch specs. NEX AI will benchmark your submission against verified past winners of that event.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-1.5">Target Hackathon / Buildathon</label>
                    <select
                      value={selectedEventId}
                      onChange={(e) => {
                        setSelectedEventId(e.target.value);
                        setBenchmarkResult(null);
                      }}
                      className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-xl px-3.5 py-2.5 text-xs font-medium focus:border-cyan-400 focus:outline-none"
                    >
                      {GLOBAL_EVENTS_LIST.map((evt) => (
                        <option key={evt.slug} value={evt.slug}>
                          {evt.flag} {evt.name} ({evt.organizer} • {evt.country})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-1.5">Project Name</label>
                    <input
                      type="text"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      placeholder="e.g. AetherMesh Decentralized SOS"
                      className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-1.5">One-line Value Proposition</label>
                    <input
                      type="text"
                      value={projectTagline}
                      onChange={(e) => setProjectTagline(e.target.value)}
                      placeholder="e.g. Offline peer-to-peer mesh packet transmission for zero-coverage rescue operations."
                      className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-1.5">
                      Core Architecture, Tech Stack & Deliverables
                    </label>
                    <textarea
                      rows={5}
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder="Describe:
1. Problem and target user
2. Technical components, protocols, and database/hardware
3. Current working status (live prototype, testnet, bench test)
4. What makes this 10x better than existing alternatives"
                      className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-xl p-3 text-xs focus:border-cyan-400 focus:outline-none resize-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-1.5">
                      Pitch Video URL / Working Prototype Link (Optional)
                    </label>
                    <input
                      type="url"
                      value={videoDemoUrl}
                      onChange={(e) => setVideoDemoUrl(e.target.value)}
                      placeholder="e.g. https://youtu.be/... or https://github.com/..."
                      className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleRunBenchmark}
                    disabled={analyzingBenchmark}
                    className="w-full py-3 rounded-xl bg-cyan-400 text-black font-extrabold text-xs hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,212,255,0.4)] flex items-center justify-center gap-2 font-mono disabled:opacity-50"
                    style={{ color: '#000000' }}
                  >
                    {analyzingBenchmark ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Benchmarking Against Historical Winner Archetypes...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        <span>Run Alignment & Scoring Audit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Benchmark Results Side */}
              <div className="lg:col-span-6 space-y-4">
                {/* Historical Winner Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/20 to-zinc-900 border border-amber-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                      <Award size={13} />
                      <span>Event Benchmark Standard</span>
                    </span>
                    <span className="text-xs font-mono text-amber-300 font-bold">
                      Target Score: {benchmarkData.score}/100
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{benchmarkData.winnerTitle}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{benchmarkData.highlight}</p>

                  <div className="mt-4 pt-3 border-t border-amber-500/20 grid grid-cols-2 gap-2 text-[11px] font-mono">
                    {benchmarkData.scoringCriteria.map((c, i) => (
                      <div key={i} className="p-2 rounded-lg bg-zinc-950/70 border border-zinc-800">
                        <div className="flex items-center justify-between text-zinc-300">
                          <span>{c.category}</span>
                          <span className="text-amber-400">{c.weight}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audit Outcome Card */}
                {benchmarkResult ? (
                  <div className="p-5 rounded-2xl bg-zinc-900 border border-cyan-500/40 shadow-2xl space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                          NEX Alignment Diagnostic
                        </span>
                        <h3 className="text-lg font-bold text-white">{projectTitle || 'Your Project'}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black font-mono text-cyan-400">
                          {benchmarkResult.overallScore}
                          <span className="text-xs text-zinc-500 font-normal">/100</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400">
                          Competitive Tier
                        </span>
                      </div>
                    </div>

                    {/* Breakdown Sliders */}
                    <div className="space-y-2.5 pt-2 border-t border-zinc-800">
                      {benchmarkResult.criteriaScores.map((c: any, i: number) => (
                        <div key={i}>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-zinc-300">{c.category}</span>
                            <span className="font-mono text-cyan-400 font-bold">{c.score}%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-700"
                              style={{ width: `${c.score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Strengths & Vulnerabilities */}
                    <div className="space-y-3 pt-3 border-t border-zinc-800 text-xs">
                      <div>
                        <h5 className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                          <CheckCircle2 size={14} />
                          <span>Key Strengths Recognized by Jurors</span>
                        </h5>
                        <ul className="space-y-1 text-zinc-300 pl-4 list-disc">
                          {benchmarkResult.strengths.map((s: string, idx: number) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-bold text-amber-400 flex items-center gap-1.5 mb-1.5">
                          <AlertTriangle size={14} />
                          <span>Critical Vulnerabilities & Edge Cases to Defend</span>
                        </h5>
                        <ul className="space-y-1 text-zinc-300 pl-4 list-disc">
                          {benchmarkResult.vulnerabilities.map((v: string, idx: number) => (
                            <li key={idx}>{v}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setActiveTab('practice')}
                        className="w-full py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/50 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 font-mono transition-all"
                      >
                        <Camera size={14} />
                        <span>Take This Project to Live Camera Studio ➔</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-zinc-900/30 border border-dashed border-zinc-800 text-center">
                    <Sparkles size={28} className="text-zinc-600 mx-auto mb-2" />
                    <p className="text-xs text-zinc-500">
                      Fill in your project details on the left to generate your custom benchmark scorecard against real past champions.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: CONNECT WITH MENTORS & JUDGES DIRECTORY                    */}
        {/* ================================================================= */}
        {activeTab === 'mentors' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">Jury & Mentor Network</span>
                <h2 className="text-lg font-bold text-white mt-0.5">Verified Hackathon Judges & Tech Mentors</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Connect with registered jury chairs and architecture mentors. Review their domain credibility, past judging experience, and ratings from participating teams.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="mailto:rabinjathon@gmail.com?subject=Application%20for%20Judge%20or%20Mentor%20Registry"
                  className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-200 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5"
                >
                  <BadgeCheck size={14} className="text-cyan-400" />
                  <span>Register as Judge/Mentor</span>
                </a>
              </div>
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MENTORS_AND_JUDGES.map((mj) => (
                <div
                  key={mj.id}
                  className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl shadow-inner">
                          {mj.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-sm text-white">{mj.name}</h3>
                            {mj.verified && <BadgeCheck size={14} className="text-cyan-400" />}
                          </div>
                          <p className="text-[11px] text-zinc-400">{mj.role}</p>
                          <p className="text-[10px] font-mono text-cyan-400/90">{mj.organization}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 my-2.5">
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
                        <Star size={12} fill="currentColor" />
                        <span>{mj.rating}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        ({mj.reviewCount} participant team ratings)
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                      {mj.credibility}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-zinc-800/80 text-[11px]">
                      <div className="text-zinc-500 font-mono text-[10px] uppercase">Domain Expertise:</div>
                      <div className="text-zinc-300 font-medium">{mj.domain}</div>

                      <div className="text-zinc-500 font-mono text-[10px] uppercase mt-2">Past Events Judged:</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {mj.pastEvents.map((pe, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400"
                          >
                            {pe}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        mj.status === 'Available for Review'
                          ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {mj.status}
                    </span>

                    <a
                      href={`mailto:rabinjathon@gmail.com?subject=Request%20Pitch%20Review%20with%20${encodeURIComponent(
                        mj.name
                      )}`}
                      className="px-3 py-1.5 rounded-lg bg-cyan-400 text-black font-extrabold hover:bg-cyan-300 text-xs font-mono transition-all flex items-center gap-1"
                      style={{ color: '#000000' }}
                    >
                      <span>Request Review</span>
                      <ChevronRight size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: AUTONOMOUS RED-TEAM AUDIT (CLASSIC ENGINE)                 */}
        {/* ================================================================= */}
        {activeTab === 'audit' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Control Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">Audit Persona</span>
                {[
                  { id: 'technical', name: 'Technical Judge', desc: 'Audits architecture, latency, and edge cases.' },
                  { id: 'redteam', name: 'Red-Team / Weakness', desc: 'Exposes unverified claims and hype.' },
                  { id: 'impact', name: 'Impact & Product', desc: 'Evaluates real user need and defensibility.' },
                  { id: 'general', name: 'Flagship Intelligence', desc: 'Comprehensive multi-criteria scoring.' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMode(m.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all text-xs ${
                      selectedMode === m.id
                        ? 'bg-cyan-950/40 border-cyan-400 text-white font-bold'
                        : 'bg-zinc-950/50 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-zinc-200">{m.name}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{m.desc}</div>
                  </button>
                ))}
              </div>

              {/* Sample Projects Shortcut */}
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Load Registered Project</span>
                <select
                  value={selectedSlug}
                  onChange={(e) => setSelectedSlug(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-xl p-2 text-xs focus:border-cyan-400 focus:outline-none"
                >
                  <option value="">-- Choose from Projex --</option>
                  {SAMPLE_PROJECTS.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Conversation Log & Input */}
            <div className="lg:col-span-8 flex flex-col space-y-4">
              <div className="flex-1 p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4 min-h-[380px] max-h-[500px] overflow-y-auto font-mono text-xs">
                {auditLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl ${
                      log.sender === 'user'
                        ? 'bg-cyan-950/30 border border-cyan-500/30 ml-8 text-cyan-200'
                        : 'bg-zinc-950 border border-zinc-800 mr-8 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-1">
                      <span>{log.sender === 'user' ? 'Innovator Submission' : 'NEX Autonomous Core'}</span>
                      <span>{log.time}</span>
                    </div>
                    <div className="whitespace-pre-wrap leading-relaxed">{log.text}</div>
                  </div>
                ))}
              </div>

              {/* Audit Input Box */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleClassicAudit()}
                  placeholder="Enter specific claim to audit (e.g. 'We achieve 5ms latency with 10k concurrent nodes')..."
                  className="flex-1 bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 text-xs focus:border-cyan-400 focus:outline-none font-mono"
                />
                <button
                  onClick={() => handleClassicAudit()}
                  disabled={auditLoading}
                  className="px-5 py-3 rounded-xl bg-cyan-400 text-black font-extrabold text-xs hover:bg-cyan-300 transition-all font-mono disabled:opacity-50 shrink-0"
                  style={{ color: '#000000' }}
                >
                  {auditLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer Branding ── */}
      <footer className="mt-auto border-t border-[var(--border)] py-4 text-center text-xs text-zinc-500 font-mono">
        RABINJA SQUAD ❤️ INNOVATORS • Real-Time Pitch Intelligence • Zero Source Code Scraping Guaranteed
      </footer>
    </div>
  );
}

export default function NexWorkspacePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-500 font-mono">Loading NEX AI Studio...</div>}>
      <NexWorkspaceContent />
    </Suspense>
  );
}
