'use client';

import { useState } from 'react';
import Image from 'next/image';

interface AnimeCharacterBayProps {
  /** Image source for the character illustration (defaults to '/logo.png') */
  imageSrc?: string;
  /** Character title or callsign */
  callsign?: string;
  /** Tactical status */
  status?: string;
  /** Size variant */
  variant?: 'hero' | 'compact' | 'side-badge';
  /** Optional custom class */
  className?: string;
}

export function AnimeCharacterBay({
  imageSrc = '/logo.png',
  callsign = 'CYBER RABBIT // UNIT-01',
  status = 'ONLINE // SYNC 100%',
  variant = 'hero',
  className = '',
}: AnimeCharacterBayProps) {
  const [imgError, setImgError] = useState(false);

  if (variant === 'side-badge') {
    return (
      <div className={`relative group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-cyan-400/40 bg-black/90 shadow-[0_0_15px_rgba(0,212,255,0.25)] ${className}`}>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-400/60 bg-black shrink-0 relative">
          <img
            src={imgError ? '/logo.png' : imageSrc}
            alt="Anime Character"
            className="w-full h-full object-cover animate-energy-pulse"
            onError={() => setImgError(true)}
          />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-mono text-[10px] font-bold text-cyan-300 tracking-wider uppercase">
            {callsign}
          </span>
          <span className="font-mono text-[9px] text-zinc-400">
            {status}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative max-w-sm sm:max-w-md mx-auto p-4 sm:p-6 rounded-2xl anime-character-bay anime-chamfer border border-cyan-500/40 ${className}`}>
      {/* Corner HUD Bracket markers */}
      <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400 pointer-events-none select-none">
        ◤
      </div>
      <div className="absolute top-2 right-2 text-[10px] font-mono text-cyan-400 pointer-events-none select-none">
        ◥
      </div>
      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-cyan-400 pointer-events-none select-none">
        ◣
      </div>
      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-cyan-400 pointer-events-none select-none">
        ◢
      </div>

      {/* Mecha HUD Scanner line */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none animate-pulse" />

      {/* Character Image Stage */}
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto my-3 flex items-center justify-center">
        {/* Glowing cyber energy ring behind character */}
        <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-[spin_12s_linear_infinite] shadow-[0_0_30px_rgba(0,212,255,0.3)]" />
        <div className="absolute inset-2 rounded-full border border-dashed border-blue-500/40 animate-[spin_18s_linear_infinite_reverse]" />

        {/* Character Illustration */}
        <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-2xl overflow-hidden animate-anime-float z-10 flex items-center justify-center">
          <img
            src={imgError ? '/logo.png' : imageSrc}
            alt="RABINJA Character Operator"
            className="w-full h-full object-contain animate-energy-pulse drop-shadow-[0_0_25px_rgba(0,212,255,0.7)]"
            onError={() => setImgError(true)}
          />
        </div>
      </div>

      {/* Tactical Status Readout */}
      <div className="mt-2 text-center z-10 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/40 text-[11px] font-mono font-bold text-cyan-300">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>{callsign}</span>
          <span className="text-zinc-500">|</span>
          <span className="text-emerald-400">{status}</span>
        </div>
      </div>
    </div>
  );
}
