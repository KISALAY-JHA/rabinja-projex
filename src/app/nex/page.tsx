'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Sparkles,
  Cpu,
  ShieldAlert,
  Target,
  FileText,
  Send,
  Loader2,
  RefreshCw,
  Terminal,
  Layers,
  ChevronRight,
  Info,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { SAMPLE_PROJECTS } from '@/lib/sample-data';
import { evaluateWithNex } from '@/lib/nex-engine';

interface Message {
  id: string;
  sender: 'user' | 'nex';
  mode?: string;
  text: string;
  timestamp: string;
  note?: string;
}

const MODES = [
  {
    id: 'technical',
    name: 'Technical Judge',
    badge: 'ENGINEERING AUDIT',
    color: 'text-[var(--cyan)]',
    borderColor: 'border-[var(--cyan)]/40 hover:border-[var(--cyan)]',
    activeBg: 'bg-[var(--cyan)]/10 text-[var(--cyan)] border-[var(--cyan)]',
    icon: Cpu,
    desc: 'Audits architecture, algorithmic depth, concurrency, latency, and edge cases.',
  },
  {
    id: 'redteam',
    name: 'Red-Team / Weakness',
    badge: 'VULNERABILITY & HYPE AUDIT',
    color: 'text-[var(--red)]',
    borderColor: 'border-[var(--red)]/40 hover:border-[var(--red)]',
    activeBg: 'bg-[var(--red)]/10 text-[var(--red)] border-[var(--red)]',
    icon: ShieldAlert,
    desc: 'Exposes unverified claims, benchmark cheats, failure points, and single-points of failure.',
  },
  {
    id: 'impact',
    name: 'Impact & Product',
    badge: 'MARKET & USABILITY AUDIT',
    color: 'text-[var(--green)]',
    borderColor: 'border-[var(--green)]/40 hover:border-[var(--green)]',
    activeBg: 'bg-[var(--green)]/10 text-[var(--green)] border-[var(--green)]',
    icon: Target,
    desc: 'Evaluates real user need, friction, time-to-value, and market defensibility.',
  },
  {
    id: 'general',
    name: 'Flagship Intelligence',
    badge: 'MULTI-CRITERIA EVALUATION',
    color: 'text-[var(--purple)]',
    borderColor: 'border-[var(--purple)]/40 hover:border-[var(--purple)]',
    activeBg: 'bg-[var(--purple)]/10 text-[var(--purple)] border-[var(--purple)]',
    icon: Sparkles,
    desc: 'RABINJA flagship evaluation across Feasibility, Originality, and Practical Value.',
  },
];

function NexWorkspaceContent() {
  const searchParams = useSearchParams();
  const initialProjectSlug = searchParams.get('project') || '';

  const [selectedSlug, setSelectedSlug] = useState<string>(initialProjectSlug);
  const [selectedMode, setSelectedMode] = useState<string>('technical');
  const [inputText, setInputText] = useState('');
  const [privateDoc, setPrivateDoc] = useState('');
  const [showDocUpload, setShowDocUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'nex',
      text: `### ⚡ NEX AI Project Intelligence Initialized

Welcome to **NEX** — RABINJA's specialized project intelligence system.
NEX is not a conversational chatbot; it is an analytical judging engine designed to challenge technical claims, simulate official judges, identify hidden failure modes, and help innovators harden their work.

- **Select an official Rabinjathon project** or **load a private spec document**
- **Choose a specialized judge persona** on the left
- **Initiate an audit** to receive scores, architectural critique, and defense questions.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  useEffect(() => {
    if (initialProjectSlug) {
      setSelectedSlug(initialProjectSlug);
    }
  }, [initialProjectSlug]);

  const activeProject = SAMPLE_PROJECTS.find((p) => p.slug === selectedSlug);

  const handleSend = async (customPrompt?: string) => {
    const promptToSend = customPrompt || inputText;
    if (!promptToSend.trim() && !privateDoc.trim() && !selectedSlug) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: promptToSend || (privateDoc ? 'Evaluating loaded private project document...' : `Auditing ${activeProject?.title}`),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      // Simulate real-time neural processing latency
      await new Promise((resolve) => setTimeout(resolve, 800));

      const evaluationOutput = evaluateWithNex(
        selectedMode,
        promptToSend,
        selectedSlug || undefined,
        privateDoc || undefined
      );

      const nexMsg: Message = {
        id: `nex-${Date.now()}`,
        sender: 'nex',
        mode: selectedMode,
        text: evaluationOutput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        note: 'Processed via NEX Autonomous Core (simulated engine). Real-time judge synthesis active.',
      };
      setMessages((prev) => [...prev, nexMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'nex',
          text: `⚠️ **Audit Communication Error:** ${err.message || 'Unable to complete NEX evaluation session.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {/* ── Subheader ── */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-surface)] py-4 px-6 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-lg text-white">NEX AI Intelligence Workspace</h1>
                <span className="badge badge-purple text-[10px] tracking-wider font-mono">v2.4 ACTIVE</span>
              </div>
              <p className="text-xs text-[var(--text-muted)]">Autonomous Project Evaluation & Judge Simulation Engine</p>
            </div>
          </div>

          {/* Quick Stats or Private Indicator */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-2)] border border-[var(--border)] text-[var(--text-secondary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
              <span>NEX Core Online</span>
            </div>
            <button
              onClick={() => setShowDocUpload(!showDocUpload)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                privateDoc
                  ? 'border-[var(--green)] bg-[var(--green)]/10 text-[var(--green)]'
                  : 'border-[var(--border)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <FileText size={14} />
              <span>{privateDoc ? 'Private Spec Loaded' : 'Private Document Upload'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Workspace ── */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── LEFT COLUMN: Persona & Target Configuration ── */}
        <div className="lg:col-span-4 space-y-5">
          {/* Target Project Selection */}
          <div className="card p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3 flex items-center gap-2">
              <Layers size={14} className="text-[var(--purple)]" />
              Audit Target
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-[var(--text-muted)] block mb-1">Rabinjathon Official Project</label>
                <select
                  value={selectedSlug}
                  onChange={(e) => {
                    setSelectedSlug(e.target.value);
                    if (e.target.value) setPrivateDoc('');
                  }}
                  className="input text-xs py-2"
                >
                  <option value="">-- Or select public project to audit --</option>
                  {SAMPLE_PROJECTS.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.title} ({p.category})
                    </option>
                  ))}
                </select>
              </div>

              {activeProject && (
                <div className="p-3 rounded-lg bg-[var(--bg-surface-2)] border border-[var(--border)] text-xs space-y-1.5">
                  <div className="flex justify-between font-semibold text-white">
                    <span>{activeProject.title}</span>
                    <span className="badge badge-purple text-[10px]">{activeProject.category}</span>
                  </div>
                  <p className="text-[var(--text-muted)] line-clamp-2">{activeProject.subtitle}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {activeProject.tech_stack.slice(0, 3).map((t) => (
                      <span key={t} className="badge badge-gray text-[9px]">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Private Spec Box (Modal-like inline collapsible) */}
          {showDocUpload && (
            <div className="card p-5 border-[var(--purple)]/50 relative">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <FileText size={14} className="text-[var(--purple)]" />
                  Private Project Spec
                </h4>
                <span className="badge badge-gray text-[9px]">Never Published</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mb-3">
                Paste your architecture brief, unreleased README, or technical thesis. Evaluated purely inside NEX AI and never exposed publicly.
              </p>
              <textarea
                value={privateDoc}
                onChange={(e) => {
                  setPrivateDoc(e.target.value);
                  if (e.target.value) setSelectedSlug('');
                }}
                rows={4}
                placeholder="Paste architecture, performance claims, system design..."
                className="input text-xs resize-none mb-3 font-mono"
              />
              <div className="flex justify-between items-center text-xs">
                <span className="text-[var(--text-muted)]">
                  {privateDoc.length > 0 ? `${privateDoc.length} characters loaded` : 'No document pasted'}
                </span>
                {privateDoc && (
                  <button
                    onClick={() => setPrivateDoc('')}
                    className="text-[var(--red)] hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Judge Persona Selection */}
          <div className="card p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3 flex items-center gap-2">
              <Terminal size={14} className="text-[var(--cyan)]" />
              Evaluation Persona
            </h3>

            <div className="space-y-2.5">
              {MODES.map((mode) => {
                const Icon = mode.icon;
                const isActive = selectedMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                      isActive ? mode.activeBg : `bg-[var(--bg-surface-2)] ${mode.borderColor}`
                    }`}
                  >
                    <div className={`p-2 rounded-lg bg-[var(--bg-surface)] ${mode.color} shrink-0`}>
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-white">{mode.name}</span>
                        <span className="text-[9px] font-mono tracking-wider opacity-70">{mode.badge}</span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] mt-1 leading-snug">{mode.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="card p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              Trigger Specialized Inquiries
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => handleSend('Simulate an aggressive technical judge cross-examination session.')}
                className="btn btn-secondary text-xs w-full justify-start py-2 font-mono text-left truncate"
              >
                &gt; Cross-examine architecture & latency
              </button>
              <button
                onClick={() => handleSend('Detect hype, unbacked statements, and marketing exaggerations.')}
                className="btn btn-secondary text-xs w-full justify-start py-2 font-mono text-left truncate"
              >
                &gt; Red-team vulnerability & claim audit
              </button>
              <button
                onClick={() => handleSend('Evaluate practical product defensibility against Big Tech replication.')}
                className="btn btn-secondary text-xs w-full justify-start py-2 font-mono text-left truncate"
              >
                &gt; Moat & competitive defense assessment
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Interactive Terminal & Report Stream ── */}
        <div className="lg:col-span-8 flex flex-col h-[750px] card overflow-hidden border-[var(--border)]">
          {/* Header of Stream */}
          <div className="p-4 border-b border-[var(--border)] bg-[var(--bg-surface-2)] flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
              <Terminal size={14} className="text-[var(--purple)]" />
              <span>Target: <strong className="text-white">{activeProject ? activeProject.title : privateDoc ? 'Private Document' : 'Awaiting Selection'}</strong></span>
              <span>•</span>
              <span className="capitalize text-[var(--cyan)]">{selectedMode} Mode</span>
            </div>
            <button
              onClick={() => {
                setMessages([messages[0]]);
              }}
              className="text-xs text-[var(--text-muted)] hover:text-white flex items-center gap-1 transition-colors"
            >
              <RefreshCw size={12} /> Clear Stream
            </button>
          </div>

          {/* Message History / Output Stream */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    {msg.sender === 'user' ? 'YOU' : 'NEX INTELLIGENCE ENGINE'}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">{msg.timestamp}</span>
                </div>

                <div
                  className={`p-5 rounded-2xl max-w-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-[var(--purple)]/40 text-white'
                      : 'bg-[var(--bg-surface-2)] border border-[var(--border)] text-[var(--text-secondary)] w-full prose-invert'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans text-sm">
                    {msg.text}
                  </div>

                  {msg.note && (
                    <div className="mt-3 pt-3 border-t border-[var(--border)] text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                      <Info size={12} className="text-[var(--cyan)]" />
                      {msg.note}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3 p-4 bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-2xl w-full">
                <Loader2 size={18} className="text-[var(--purple)] animate-spin" />
                <span className="text-xs font-mono text-[var(--text-muted)] animate-pulse">
                  NEX AI synthesizing technical claims, stress-testing failure paths & computing judge rubric scores...
                </span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-[var(--border)] bg-[var(--bg-surface)]">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !loading && handleSend()}
                placeholder={
                  activeProject
                    ? `Ask NEX to audit ${activeProject.title} or type specific engineering queries...`
                    : 'Ask NEX to analyze, challenge, or grade project claims...'
                }
                className="input flex-1 text-sm bg-[var(--bg-surface-2)]"
                disabled={loading}
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || (!inputText.trim() && !activeProject && !privateDoc)}
                className="btn btn-primary px-5 shrink-0"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                <span>Evaluate</span>
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-[var(--text-muted)]">
              <span>Press Enter to submit inquiry to NEX judging engine</span>
              <span className="flex items-center gap-1">
                <CheckCircle size={11} className="text-[var(--green)]" />
                Private verification active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NexWorkspacePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <Loader2 size={32} className="text-[var(--purple)] animate-spin" />
      </div>
    }>
      <NexWorkspaceContent />
    </Suspense>
  );
}
