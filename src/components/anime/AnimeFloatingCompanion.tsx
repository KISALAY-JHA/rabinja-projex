'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, X, Compass, ChevronRight, EyeOff } from 'lucide-react';

export function AnimeFloatingCompanion() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('rabinja_hide_companion') === 'true';
      if (stored) setHidden(true);
    } catch {}

    let timer: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timer);
      timer = setTimeout(() => setIsScrolling(false), 800);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const hideForever = () => {
    setHidden(true);
    setIsOpen(false);
    try {
      localStorage.setItem('rabinja_hide_companion', 'true');
    } catch {}
  };

  if (hidden) return null;

  return (
    <div
      className={`fixed bottom-20 right-3 sm:bottom-6 sm:right-6 z-40 select-none transition-opacity duration-300 ${
        isScrolling && !isOpen ? 'opacity-30 hover:opacity-100' : 'opacity-100'
      }`}
    >
      {isOpen ? (
        <div className="w-[calc(100vw-24px)] max-w-xs p-4 rounded-2xl bg-[#05070E]/95 border border-cyan-400/50 shadow-[0_0_35px_rgba(0,212,255,0.35)] backdrop-blur-2xl animate-fade-in relative text-left">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-cyan-500/30">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-display text-xs font-bold text-white tracking-wider uppercase">
                RABINJA OPERATOR
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={hideForever}
                className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300 px-1 py-0.5 rounded transition-colors"
                title="Hide companion"
              >
                Hide
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-900 transition-colors"
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Pilot Info */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl border border-cyan-400/60 overflow-hidden bg-black shrink-0 relative shadow-[0_0_15px_rgba(0,212,255,0.4)]">
              <img
                src="/logo.png"
                alt="Cyber Rabbit Companion"
                className="w-full h-full object-cover animate-energy-pulse"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-mono text-[10px] text-cyan-400 font-bold tracking-wider">
                UNIT: CYBER RABBIT // 01
              </span>
              <span className="text-[11px] text-zinc-300 leading-tight mt-0.5">
                8 flagship innovations online. NEX AI autonomous evaluation engine ready.
              </span>
            </div>
          </div>

          {/* Quick Tactical Navigation Pills */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/80 mb-2">
            <Link
              href="/explore"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-mono font-bold text-zinc-300 hover:text-white hover:border-cyan-500/40 transition-colors"
            >
              <Compass size={12} className="text-cyan-400" />
              <span>Explore</span>
            </Link>
            <Link
              href="/nex"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-[10px] font-mono font-bold text-cyan-300 hover:bg-cyan-900/40 transition-colors shadow-sm"
            >
              <Sparkles size={12} className="text-cyan-400" />
              <span>NEX AI</span>
            </Link>
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400">
            <span>TELEMETRY: OPTIMAL</span>
            <span className="text-cyan-400 font-bold">// 100% OPERATIONAL</span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 p-1.5 sm:p-2 rounded-full bg-black/90 border border-cyan-400/60 shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:scale-105 active:scale-95 transition-all"
          title="RABINJA Tactical Companion"
          aria-label="Open RABINJA Companion"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-cyan-400/80 bg-black shrink-0 relative">
            <img
              src="/logo.png"
              alt="Cyber Rabbit Companion"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            />
          </div>
          <span className="hidden sm:inline-block pr-2 font-mono text-xs font-bold text-cyan-300 tracking-wider">
            OPERATOR
          </span>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-black animate-pulse" />
        </button>
      )}
    </div>
  );
}
