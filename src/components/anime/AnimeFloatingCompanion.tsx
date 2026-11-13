'use client';

import { useState } from 'react';
import { Sparkles, X, ChevronUp, Radio } from 'lucide-react';

export function AnimeFloatingCompanion() {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  if (minimized) return null;

  return (
    <div className="fixed bottom-20 right-3 sm:bottom-6 sm:right-6 z-40 select-none">
      {isOpen ? (
        <div className="w-72 p-4 rounded-xl anime-chamfer bg-black/95 border border-cyan-400/50 shadow-[0_0_30px_rgba(0,212,255,0.4)] backdrop-blur-xl animate-fade-in relative">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-cyan-500/30">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-display text-xs font-bold text-white tracking-wider uppercase">
                RABINJA AI COMPANION
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-1"
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-xl border border-cyan-400/50 overflow-hidden bg-black shrink-0 relative shadow-[0_0_15px_rgba(0,212,255,0.4)]">
              <img
                src="/logo.png"
                alt="Cyber Rabbit Companion"
                className="w-full h-full object-cover animate-energy-pulse"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-cyan-400 font-bold">
                UNIT: CYBER RABBIT
              </span>
              <span className="text-[11px] text-zinc-300 leading-tight">
                Squad Commander online. Ready for project submission and NEX AI evaluations.
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400">
            <span>SYNC: 100%</span>
            <span className="text-cyan-400 font-bold">// SYSTEM ONLINE</span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 p-2 rounded-full bg-black/90 border border-cyan-400/60 shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:scale-105 active:scale-95 transition-all"
          title="RABINJA Tactical Companion"
          aria-label="Open RABINJA Companion"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-cyan-400/80 bg-black shrink-0 relative">
            <img
              src="/logo.png"
              alt="Cyber Rabbit Companion"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            />
          </div>
          <span className="hidden sm:inline-block pr-2 font-mono text-xs font-bold text-cyan-300 tracking-wider">
            OPERATOR
          </span>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 border-2 border-black animate-pulse" />
        </button>
      )}
    </div>
  );
}
