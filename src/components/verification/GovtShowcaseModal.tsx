'use client';

import React, { useState } from 'react';
import {
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  Users,
  Send,
  X,
  FileText,
  Mail,
  AlertCircle
} from 'lucide-react';

interface GovtShowcaseModalProps {
  projectTitle: string;
  projectSlug: string;
  voteCount?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function GovtShowcaseModal({
  projectTitle,
  projectSlug,
  voteCount = 0,
  isOpen,
  onClose
}: GovtShowcaseModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [contactPhone, setContactPhone] = useState('');
  const [milestoneNotes, setMilestoneNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem('rabinja_govt_showcase_requests') || '[]';
    try {
      const arr = JSON.parse(stored);
      arr.push({
        projectTitle,
        projectSlug,
        contactPhone,
        milestoneNotes,
        timestamp: new Date().toISOString(),
        status: 'Audit Pending'
      });
      localStorage.setItem('rabinja_govt_showcase_requests', JSON.stringify(arr));
    } catch {}

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in text-left">
      <div className="relative w-full max-w-xl bg-[#05070E] border-2 border-amber-500/50 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(245,158,11,0.25)] space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400 text-amber-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
              <Landmark size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  // NATIONAL INNOVATION PIPELINE
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                  Govt Liaison
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                Government & Policy Showcase
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-3 rounded-2xl bg-amber-950/30 border border-amber-500/40">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 size={28} />
            </div>
            <h4 className="font-display font-bold text-white text-base">
              Showcase Dossier Queued for Rabinja Audit!
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed max-w-md mx-auto">
              We received your public support notification for <span className="text-amber-400 font-semibold">{projectTitle}</span>.
              Our technical audit squad will check your working model & verification status. Once certified, your project is officially submitted to our Government & PSU innovation liaison desk.
            </p>

            <div className="p-3 bg-black/60 rounded-xl border border-zinc-800 text-[11px] font-mono text-zinc-400 text-left">
              <div className="text-amber-400 font-bold mb-1">// NEXT STEPS:</div>
              <p>1. Rabinja team cross-checks public support & prototype evidence.</p>
              <p>2. Blue-Tick integrity verification scheduled.</p>
              <p>3. Briefing document prepared for government innovation missions.</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={`mailto:rabinjathon@gmail.com?subject=${encodeURIComponent(`Govt Showcase Request - ${projectTitle}`)}&body=${encodeURIComponent(
                  `Hello Rabinja Squad Team,\n\nWe have submitted our public support notification for "${projectTitle}" on Projex.\n\nProject: ${projectTitle}\nSlug: ${projectSlug}\nContact Phone: ${contactPhone}\nNotes: ${milestoneNotes}\n\nPlease audit our verification credentials for government showcase.\n\nThank you!`
                )}`}
                className="btn btn-primary flex-1 justify-center text-xs py-2.5 font-bold flex items-center gap-2"
              >
                <Mail size={14} />
                <span>Email Dossier Copy</span>
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Description & Verification Guarantee */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 font-mono text-[10px] uppercase">
                  Project In Focus:
                </span>
                <span className="text-amber-400 font-bold font-display">
                  {projectTitle}
                </span>
              </div>
              <p className="text-zinc-300 text-[11px] leading-relaxed">
                When an idea resonates with the public, government bodies need to know what real innovators are solving.
                Through Rabinja Labs, grassroots innovations with genuine public validation get represented directly to government innovation bodies, grants, and incubators.
              </p>
            </div>

            {/* 4-Step Pipeline Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px] font-mono">
              <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 space-y-1">
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-[10px]">
                  <Users size={12} />
                  <span>STEP 1: PUBLIC BACKING</span>
                </div>
                <p className="text-zinc-400 text-[10.5px]">
                  Public traction check ({voteCount} supporters, community reviews, real testers).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[10px]">
                  <ShieldCheck size={12} />
                  <span>STEP 2: BLUE-TICK AUDIT</span>
                </div>
                <p className="text-zinc-400 text-[10.5px]">
                  Rabinja team audits working prototype & verifies zero stolen source code.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 space-y-1">
                <div className="flex items-center gap-1.5 text-purple-400 font-bold text-[10px]">
                  <Award size={12} />
                  <span>STEP 3: EXPERT REVIEW</span>
                </div>
                <p className="text-zinc-400 text-[10.5px]">
                  Physical/expert audit if hardware or high-complexity technology is involved.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[10px]">
                  <Landmark size={12} />
                  <span>STEP 4: GOVT SHOWCASE</span>
                </div>
                <p className="text-zinc-400 text-[10.5px]">
                  Presented to government & public enterprise innovation representatives!
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-zinc-400 mb-1">
                  OFFICIAL CONTACT PHONE / WHATSAPP NUMBER
                </label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="XXXXX XXXXX"
                  className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">
                  PUBLIC SUPPORT EVIDENCE & MILESTONES
                </label>
                <textarea
                  rows={2}
                  required
                  value={milestoneNotes}
                  onChange={(e) => setMilestoneNotes(e.target.value)}
                  placeholder="Mention awards, public testing feedback, community reception, or prototype status..."
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 text-xs font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-black font-bold uppercase tracking-wider text-xs shadow-[0_0_25px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                >
                  <Send size={14} />
                  <span>Inform Us of Public Support & Request Govt Showcase</span>
                </button>
                <p className="text-[10px] text-zinc-500 text-center mt-2 font-mono">
                  All submissions are manually scrutinized by Rabinja Squad. Direct questions: <span className="text-amber-400">rabinjathon@gmail.com</span>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
