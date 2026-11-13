'use client';

import React, { useState } from 'react';
import { X, Send, Sparkles, Code2, Globe, Users } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface SubmitProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: (project: any) => void;
}

const CATEGORIES = ['DeepTech', 'HealthTech', 'CleanTech', 'Cybersecurity', 'FinTech', 'EdTech'];

export function SubmitProjectModal({ isOpen, onClose, onSubmitted }: SubmitProjectModalProps) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [techStack, setTechStack] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [teamName, setTeamName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Project title is required');
      return;
    }

    setSubmitting(true);
    setError('');

    const newProject = {
      id: `proj-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: title.trim(),
      subtitle: subtitle.trim() || null,
      description: subtitle.trim() || 'Innovative engineering submission submitted to RABINJA Projex.',
      thumbnail_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
      demo_url: demoUrl.trim() || null,
      repo_url: repoUrl.trim() || null,
      video_url: null,
      tech_stack: techStack.split(',').map(s => s.trim()).filter(Boolean),
      category,
      tags: [category, 'Community'],
      event_id: 'evt-001',
      team_name: teamName.trim() || 'Independent Builder',
      team_members: [teamName.trim() || 'Lead Builder'],
      status: 'published' as const,
      submission_status: 'pending', // for user submissions tracker
      views: 0,
      vote_count: 0,
      nex_score: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // 1. Save to localStorage user submissions
    try {
      const stored = JSON.parse(localStorage.getItem('rabinja_user_submissions') || '[]');
      stored.unshift(newProject);
      localStorage.setItem('rabinja_user_submissions', JSON.stringify(stored));
    } catch {
      // ignore
    }

    // 2. Post to backend API
    try {
      const authUser = JSON.parse(localStorage.getItem('rabinja_auth_user') || '{}');
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newProject.title,
          subtitle: newProject.subtitle,
          description: newProject.description,
          tech_stack: newProject.tech_stack,
          category: newProject.category,
          demo_url: newProject.demo_url,
          repo_url: newProject.repo_url,
          userId: authUser.id || 'community-builder',
        }),
      });
    } catch {
      // fallback
    }

    setSubmitting(false);
    onSubmitted(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Submit Innovation Project
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 mt-4 text-left">
          {error && (
            <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">
              PROJECT TITLE *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. NeuroSync Edge Telemetry"
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">
              ONE-LINE SUMMARY / SUBTITLE
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Brief description of the problem solved"
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                TRACK / DOMAIN
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                TEAM / CREATOR NAME
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Team / Solo name"
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">
              TECH STACK (COMMA SEPARATED)
            </label>
            <input
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="e.g. Python, PyTorch, Next.js, Docker"
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                GITHUB REPO URL
              </label>
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                LIVE DEMO URL
              </label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-full bg-cyan-400 text-black font-mono font-bold text-xs hover:bg-cyan-300 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,212,255,0.4)] disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Innovation →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
