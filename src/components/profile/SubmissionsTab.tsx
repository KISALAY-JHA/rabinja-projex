'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Send, CheckCircle2, Clock, XCircle, FileText, ArrowUpRight, ExternalLink } from 'lucide-react';
import { SubmitProjectModal } from './SubmitProjectModal';

export function SubmissionsTab() {
  const [filter, setFilter] = useState<'All' | 'Approved' | 'Pending' | 'Rejected' | 'Drafts'>('All');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const loadSubmissions = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('rabinja_user_submissions') || '[]');
      setSubmissions(stored);
    } catch {
      setSubmissions([]);
    }
  };

  useEffect(() => {
    loadSubmissions();
    window.addEventListener('storage', loadSubmissions);
    return () => window.removeEventListener('storage', loadSubmissions);
  }, []);

  const total = submissions.length;
  const approved = submissions.filter(s => s.submission_status === 'approved').length;
  const pending = submissions.filter(s => !s.submission_status || s.submission_status === 'pending').length;
  const rejected = submissions.filter(s => s.submission_status === 'rejected').length;

  const filteredList = submissions.filter(s => {
    if (filter === 'All') return true;
    if (filter === 'Approved') return s.submission_status === 'approved';
    if (filter === 'Pending') return !s.submission_status || s.submission_status === 'pending';
    if (filter === 'Rejected') return s.submission_status === 'rejected';
    if (filter === 'Drafts') return s.status === 'draft';
    return true;
  });

  return (
    <div className="relative space-y-4 max-w-2xl mx-auto animate-fade-in pb-20">
      {/* Information Header */}
      <div className="text-left px-1">
        <h3 className="text-base font-bold text-white tracking-tight">
          My Contributions & Submissions
        </h3>
        <p className="text-xs text-zinc-400 mt-0.5">
          Manage all content and project submission requests that you have submitted to Rabinjathons.
        </p>
      </div>

      {/* 4-Stat Metric Funnel Cards (Moctale Batch 1 Screen 8 Style) */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-center">
          <div className="text-lg sm:text-2xl font-bold font-mono text-white">{total}</div>
          <div className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">Total</div>
        </div>
        <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-center">
          <div className="text-lg sm:text-2xl font-bold font-mono text-emerald-400">{approved}</div>
          <div className="text-[10px] font-mono text-emerald-500/80 uppercase mt-0.5">Approved</div>
        </div>
        <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-center">
          <div className="text-lg sm:text-2xl font-bold font-mono text-amber-400">{pending}</div>
          <div className="text-[10px] font-mono text-amber-500/80 uppercase mt-0.5">Pending</div>
        </div>
        <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-center">
          <div className="text-lg sm:text-2xl font-bold font-mono text-rose-400">{rejected}</div>
          <div className="text-[10px] font-mono text-rose-500/80 uppercase mt-0.5">Rejected</div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {(['All', 'Approved', 'Pending', 'Rejected', 'Drafts'] as const).map(chip => (
          <button
            key={chip}
            onClick={() => setFilter(chip)}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-all active:scale-95 ${
              filter === chip
                ? 'bg-white text-black font-bold shadow-sm'
                : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white'
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* List or Empty State */}
      {filteredList.length === 0 ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950/70 border border-zinc-800 text-center my-4">
          <FileText size={36} className="mx-auto text-zinc-600 mb-3" />
          <h4 className="text-sm font-bold text-white mb-1">No contributions found</h4>
          <p className="text-xs text-zinc-500 max-w-xs mx-auto mb-4">
            You haven't submitted any projects in this filter category yet. Tap the button below to submit your innovation.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold hover:bg-cyan-500/20 active:scale-95 transition-all"
          >
            <Plus size={14} />
            <span>Submit Innovation Now</span>
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredList.map((sub) => (
            <div
              key={sub.id}
              className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800/90 flex items-center justify-between gap-3 text-left"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-white truncate">
                    {sub.title}
                  </span>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                    sub.submission_status === 'approved'
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                      : sub.submission_status === 'rejected'
                      ? 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                  }`}>
                    {sub.submission_status || 'Pending'}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 truncate">
                  {sub.category} • {sub.team_name} • {new Date(sub.created_at).toLocaleDateString()}
                </p>
              </div>

              <Link
                href={`/explore/${sub.slug}`}
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-cyan-400 shrink-0"
              >
                <ArrowUpRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Floating Action Button (FAB) (Moctale Purple + Button in Batch 1 Screen 8) */}
      <div className="fixed bottom-20 right-4 z-30">
        <button
          onClick={() => setModalOpen(true)}
          className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-bold shadow-[0_0_20px_rgba(0,212,255,0.6)] hover:scale-105 active:scale-95 transition-all border border-black/40"
          title="Submit New Project"
          aria-label="Submit project"
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>
      </div>

      <SubmitProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitted={() => loadSubmissions()}
      />
    </div>
  );
}
