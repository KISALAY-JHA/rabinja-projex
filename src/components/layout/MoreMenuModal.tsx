'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  X, User, Send, HeartPulse, Settings, LogOut,
  HelpCircle, ShieldCheck, ExternalLink, ChevronRight
} from 'lucide-react';

interface MoreMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  authUser: { phone: string; displayName?: string } | null;
  onLogout: () => void;
}

export function MoreMenuModal({ isOpen, onClose, authUser, onLogout }: MoreMenuModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-2xl animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3.5 bg-black/90 border-b border-zinc-800/80 backdrop-blur-md">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <span>Account & More</span>
        </h2>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700/60 flex items-center justify-center text-zinc-300 hover:text-white active:scale-95 transition-all"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 px-4 py-4 max-w-lg mx-auto w-full space-y-4 pb-12">
        {/* User Card */}
        {authUser ? (
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-white text-base shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                {authUser.displayName ? authUser.displayName.slice(0, 2).toUpperCase() : 'KJ'}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  {authUser.displayName || 'Builder Node'}
                </h3>
                <p className="text-xs font-mono text-cyan-400">{authUser.phone}</p>
              </div>
            </div>
            <Link
              href="/profile"
              onClick={onClose}
              className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white"
            >
              View
            </Link>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-blue-950/30 border border-cyan-500/30 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Join RABINJA Projex</h3>
              <p className="text-xs text-zinc-400">Authenticate with phone to submit and vote</p>
            </div>
            <Link
              href="/auth/login"
              onClick={onClose}
              className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors shadow-sm"
            >
              Sign In
            </Link>
          </div>
        )}

        {/* Action List (Moctale Style) */}
        <div className="space-y-2">
          <Link
            href="/profile"
            onClick={onClose}
            className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700 transition-all text-zinc-200 hover:text-white"
          >
            <div className="flex items-center gap-3">
              <User size={18} className="text-zinc-400" />
              <span className="text-sm font-medium">My Profile</span>
            </div>
            <ChevronRight size={16} className="text-zinc-600" />
          </Link>

          <Link
            href="/profile?tab=submissions"
            onClick={onClose}
            className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700 transition-all text-zinc-200 hover:text-white"
          >
            <div className="flex items-center gap-3">
              <Send size={18} className="text-cyan-400" />
              <span className="text-sm font-medium">My Submissions & Projects</span>
            </div>
            <ChevronRight size={16} className="text-zinc-600" />
          </Link>

          <Link
            href="/profile?tab=health"
            onClick={onClose}
            className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-emerald-500/30 transition-all text-zinc-200 hover:text-white"
          >
            <div className="flex items-center gap-3">
              <HeartPulse size={18} className="text-emerald-400" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Profile Health & Standing</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                  Good
                </span>
              </div>
            </div>
            <ChevronRight size={16} className="text-zinc-600" />
          </Link>

          <Link
            href="/profile?tab=settings"
            onClick={onClose}
            className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700 transition-all text-zinc-200 hover:text-white"
          >
            <div className="flex items-center gap-3">
              <Settings size={18} className="text-zinc-400" />
              <span className="text-sm font-medium">Settings & Preferences</span>
            </div>
            <ChevronRight size={16} className="text-zinc-600" />
          </Link>

          {authUser && (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/30 hover:border-rose-500/40 text-rose-300 hover:text-rose-200 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <LogOut size={18} className="text-rose-400" />
                <span className="text-sm font-medium">Logout</span>
              </div>
              <ChevronRight size={16} className="text-rose-500/50" />
            </button>
          )}
        </div>

        {/* More Links */}
        <div className="pt-2 border-t border-zinc-900 space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 px-1 py-1">
            Information & Legal
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400">
            <Link href="/docs" onClick={onClose} className="p-2 rounded-lg hover:bg-zinc-900 transition-colors">
              Developer Docs
            </Link>
            <Link href="/events" onClick={onClose} className="p-2 rounded-lg hover:bg-zinc-900 transition-colors">
              Hackathon Guidelines
            </Link>
            <a href="mailto:support@rabinja.com" className="p-2 rounded-lg hover:bg-zinc-900 transition-colors flex items-center gap-1">
              Contact Support <ExternalLink size={10} />
            </a>
            <Link href="/privacy" onClick={onClose} className="p-2 rounded-lg hover:bg-zinc-900 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="text-center pt-2">
          <p className="text-[11px] text-zinc-600 font-mono">
            © 2026 RABINJA LABS Pvt. Ltd.
          </p>
        </div>
      </div>
    </div>
  );
}
