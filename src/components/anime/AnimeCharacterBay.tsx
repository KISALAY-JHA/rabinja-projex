'use client';

import { useState } from 'react';

interface AnimeCharacterBayProps {
  /** Optional image source for custom character art */
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
  imageSrc,
  callsign = 'CYBER SHINOBI // UNIT-01',
  status = 'COMBAT READY // SYNC 100%',
  variant = 'hero',
  className = '',
}: AnimeCharacterBayProps) {
  const [activeFigure, setActiveFigure] = useState<'blade' | 'pilot'>('blade');
  const [glowMode, setGlowMode] = useState<'cyan' | 'crimson' | 'gold'>('cyan');

  const glowColorMap = {
    cyan: {
      border: 'border-cyan-400/50',
      glow: 'shadow-[0_0_35px_rgba(0,212,255,0.4)]',
      accent: '#00D4FF',
      text: 'text-cyan-400',
      fill: '#00D4FF',
    },
    crimson: {
      border: 'border-rose-500/50',
      glow: 'shadow-[0_0_35px_rgba(255,45,85,0.4)]',
      accent: '#FF2D55',
      text: 'text-rose-400',
      fill: '#FF2D55',
    },
    gold: {
      border: 'border-amber-400/50',
      glow: 'shadow-[0_0_35px_rgba(245,158,11,0.4)]',
      accent: '#F59E0B',
      text: 'text-amber-400',
      fill: '#F59E0B',
    },
  };

  const activeTheme = glowColorMap[glowMode];

  if (variant === 'side-badge') {
    return (
      <div className={`relative group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-cyan-400/40 bg-black/90 shadow-[0_0_15px_rgba(0,212,255,0.25)] ${className}`}>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-400/60 bg-black shrink-0 relative flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-cyan-400">
            <path d="M12 2 L19 8 L16 21 L12 18 L8 21 L5 8 Z" stroke="currentColor" strokeWidth="1.5" fill="#00D4FF22" />
            <circle cx="12" cy="11" r="2.5" fill="#00D4FF" />
          </svg>
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
    <div className={`relative max-w-sm sm:max-w-md mx-auto p-4 sm:p-6 rounded-2xl anime-character-bay anime-chamfer border ${activeTheme.border} ${activeTheme.glow} transition-all duration-300 bg-black/85 backdrop-blur-xl ${className}`}>
      {/* Corner HUD Bracket markers */}
      <div className={`absolute top-2 left-2 text-[10px] font-mono ${activeTheme.text} pointer-events-none select-none`}>
        ◤
      </div>
      <div className={`absolute top-2 right-2 text-[10px] font-mono ${activeTheme.text} pointer-events-none select-none`}>
        ◥
      </div>
      <div className={`absolute bottom-2 left-2 text-[10px] font-mono ${activeTheme.text} pointer-events-none select-none`}>
        ◣
      </div>
      <div className={`absolute bottom-2 right-2 text-[10px] font-mono ${activeTheme.text} pointer-events-none select-none`}>
        ◢
      </div>

      {/* Top Figure Switcher & Aura Lighting Controls */}
      <div className="flex items-center justify-between gap-2 mb-3 px-1 border-b border-zinc-800/80 pb-2.5">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveFigure('blade')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all ${
              activeFigure === 'blade'
                ? 'bg-cyan-400 text-black shadow-[0_0_12px_rgba(0,212,255,0.6)]'
                : 'text-zinc-400 hover:text-white bg-zinc-900/60'
            }`}
          >
            Blade Hero
          </button>
          <button
            onClick={() => setActiveFigure('pilot')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all ${
              activeFigure === 'pilot'
                ? 'bg-cyan-400 text-black shadow-[0_0_12px_rgba(0,212,255,0.6)]'
                : 'text-zinc-400 hover:text-white bg-zinc-900/60'
            }`}
          >
            Cyber Pilot
          </button>
        </div>

        {/* Aura Lighting Selector */}
        <div className="flex items-center gap-1.5" title="Switch Anime Lighting Aura">
          <button
            onClick={() => setGlowMode('cyan')}
            className={`w-4 h-4 rounded-full bg-cyan-400 transition-transform ${glowMode === 'cyan' ? 'scale-125 ring-2 ring-white shadow-[0_0_10px_#00D4FF]' : 'opacity-60 hover:opacity-100'}`}
          />
          <button
            onClick={() => setGlowMode('crimson')}
            className={`w-4 h-4 rounded-full bg-rose-500 transition-transform ${glowMode === 'crimson' ? 'scale-125 ring-2 ring-white shadow-[0_0_10px_#FF2D55]' : 'opacity-60 hover:opacity-100'}`}
          />
          <button
            onClick={() => setGlowMode('gold')}
            className={`w-4 h-4 rounded-full bg-amber-400 transition-transform ${glowMode === 'gold' ? 'scale-125 ring-2 ring-white shadow-[0_0_10px_#F59E0B]' : 'opacity-60 hover:opacity-100'}`}
          />
        </div>
      </div>

      {/* Main Anime Figure Stage with Volumetric Anime Action Lighting */}
      <div className="relative w-48 h-48 sm:w-60 sm:h-60 mx-auto my-2 flex items-center justify-center overflow-visible">
        {/* Anime Speed Rays / Action Lighting Rays */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
          <div className="absolute inset-0 rotate-45 border-t border-b border-transparent via-white" />
        </div>

        {/* Rotating Anime Energy Halos */}
        <div
          className="absolute inset-2 rounded-full border border-dashed animate-[spin_16s_linear_infinite] pointer-events-none"
          style={{ borderColor: activeTheme.accent, opacity: 0.5 }}
        />
        <div
          className="absolute inset-6 rounded-full border animate-[spin_24s_linear_infinite_reverse] pointer-events-none"
          style={{ borderColor: activeTheme.accent, opacity: 0.3 }}
        />

        {/* Core Volumetric Bloom Lighting Orb */}
        <div
          className="absolute w-36 h-36 rounded-full filter blur-2xl pointer-events-none animate-pulse"
          style={{ backgroundColor: activeTheme.accent, opacity: 0.22 }}
        />

        {/* The Anime Figure Illustration (SVG) */}
        <div className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 animate-anime-float flex items-center justify-center select-none">
          {activeFigure === 'blade' ? (
            /* ── Anime Blade Shinobi Figure ── */
            <svg
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_0_20px_rgba(0,212,255,0.7)]"
            >
              {/* Anime Energy Wings / Cape Aura */}
              <path
                d="M80 85 C 40 70, 20 110, 10 135 C 35 125, 60 110, 80 95 Z"
                fill="url(#wingGradLeft)"
                opacity="0.85"
              />
              <path
                d="M80 85 C 120 70, 140 110, 150 135 C 125 125, 100 110, 80 95 Z"
                fill="url(#wingGradRight)"
                opacity="0.85"
              />

              {/* Left Katana Blade (Cyan Plasma Figure) */}
              <path
                d="M20 30 Q 50 65, 75 90"
                stroke={activeTheme.accent}
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path d="M20 30 Q 50 65, 75 90" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
              {/* Tsuba Guard & Tsuka */}
              <line x1="72" y1="85" x2="80" y2="95" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
              <line x1="76" y1="92" x2="84" y2="102" stroke="#18181B" strokeWidth="5" strokeLinecap="round" />

              {/* Right Katana Blade (Slashing Cross Stance) */}
              <path
                d="M140 30 Q 110 65, 85 90"
                stroke={activeTheme.accent}
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path d="M140 30 Q 110 65, 85 90" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
              {/* Tsuba Guard & Tsuka */}
              <line x1="88" y1="85" x2="80" y2="95" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
              <line x1="84" y1="92" x2="76" y2="102" stroke="#18181B" strokeWidth="5" strokeLinecap="round" />

              {/* Anime Mecha Warrior Torso / Armor */}
              <path
                d="M65 80 L95 80 L90 120 L80 130 L70 120 Z"
                fill="#0A0F1D"
                stroke={activeTheme.accent}
                strokeWidth="2"
              />
              {/* Glowing Chest Reactor Core */}
              <polygon points="80,95 88,105 80,115 72,105" fill="#FFFFFF" />
              <polygon points="80,97 86,105 80,113 74,105" fill={activeTheme.accent} />

              {/* Mecha Pauldrons (Shoulder Armor) */}
              <path d="M55 75 L68 70 L65 88 L52 82 Z" fill="#182238" stroke={activeTheme.accent} strokeWidth="1.5" />
              <path d="M105 75 L92 70 L95 88 L108 82 Z" fill="#182238" stroke={activeTheme.accent} strokeWidth="1.5" />

              {/* Anime Head / Helmet Silhouette */}
              <path
                d="M80 40 L96 52 L92 76 L80 84 L68 76 L64 52 Z"
                fill="#050811"
                stroke={activeTheme.accent}
                strokeWidth="2"
              />

              {/* Spiky Anime Hair / Helmet Crest */}
              <path
                d="M80 22 L86 38 L98 28 L94 46 L110 40 L98 55 L80 42 L62 55 L50 40 L66 46 L62 28 L74 38 Z"
                fill="#0E1626"
                stroke={activeTheme.accent}
                strokeWidth="1.5"
              />

              {/* Glowing Anime Cyber Visor (Eyes of the Figure) */}
              <path
                d="M70 60 L90 60 L87 66 L73 66 Z"
                fill={activeTheme.accent}
                filter="url(#visorGlow)"
              />
              <line x1="72" y1="63" x2="88" y2="63" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

              {/* Linear Gradients */}
              <defs>
                <linearGradient id="wingGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={activeTheme.accent} stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#050811" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="wingGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={activeTheme.accent} stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#050811" stopOpacity="0.1" />
                </linearGradient>
                <filter id="visorGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
            </svg>
          ) : (
            /* ── Anime Cyber Pilot NEX Figure ── */
            <svg
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_0_20px_rgba(0,212,255,0.7)]"
            >
              {/* Dual Holographic Shield Halos */}
              <circle cx="80" cy="80" r="68" stroke={activeTheme.accent} strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
              <circle cx="80" cy="80" r="54" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.4" />

              {/* Pilot Cyber Flight Jacket / Suit */}
              <path
                d="M60 85 L100 85 L108 135 L80 142 L52 135 Z"
                fill="#0A0E1A"
                stroke={activeTheme.accent}
                strokeWidth="2"
              />
              {/* Collar Neon Edge */}
              <path d="M68 85 L80 102 L92 85" stroke={activeTheme.accent} strokeWidth="2.5" fill="none" />

              {/* Floating Orbiting Energy Crystals */}
              <polygon points="30,70 36,80 30,90 24,80" fill={activeTheme.accent} className="animate-bounce" />
              <polygon points="130,70 136,80 130,90 124,80" fill={activeTheme.accent} className="animate-bounce" />

              {/* Anime Operator Head & Hair */}
              <path
                d="M80 44 C 95 44, 98 58, 96 74 C 94 84, 88 92, 80 92 C 72 92, 66 84, 64 74 C 62 58, 65 44, 80 44 Z"
                fill="#070A14"
                stroke={activeTheme.accent}
                strokeWidth="1.8"
              />

              {/* Flowing Cyber Locks (Hair Strands) */}
              <path
                d="M80 32 C 60 32, 54 48, 56 68 C 50 62, 50 48, 62 36 Z"
                fill="#16223B"
                stroke={activeTheme.accent}
                strokeWidth="1.2"
              />
              <path
                d="M80 32 C 100 32, 106 48, 104 68 C 110 62, 110 48, 98 36 Z"
                fill="#16223B"
                stroke={activeTheme.accent}
                strokeWidth="1.2"
              />

              {/* Tactical Headset with Glowing Transceiver */}
              <rect x="58" y="60" width="6" height="18" rx="3" fill="#FFFFFF" />
              <rect x="96" y="60" width="6" height="18" rx="3" fill="#FFFFFF" />
              <path d="M61 60 C 61 40, 99 40, 99 60" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
              <circle cx="56" cy="69" r="3" fill={activeTheme.accent} />
              <circle cx="104" cy="69" r="3" fill={activeTheme.accent} />

              {/* Glowing Holographic AR Eye Visor */}
              <path
                d="M68 64 L92 64 L89 72 L71 72 Z"
                fill={activeTheme.accent}
                opacity="0.9"
              />
              <line x1="70" y1="68" x2="90" y2="68" stroke="#FFFFFF" strokeWidth="2" />
            </svg>
          )}
        </div>
      </div>

      {/* Tactical Status Readout */}
      <div className="mt-1 text-center z-10 relative">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-black/80 border border-zinc-800 text-[10px] sm:text-[11px] font-mono font-bold text-zinc-200 max-w-full truncate shadow-[0_0_15px_rgba(0,0,0,0.8)]">
          <span className="w-2 h-2 rounded-full animate-ping shrink-0" style={{ backgroundColor: activeTheme.accent }} />
          <span className="truncate">{activeFigure === 'blade' ? 'CYBER SHINOBI // BLADE MASTER' : 'NEX OPERATIVE // PILOT UNIT'}</span>
          <span className="text-zinc-600 shrink-0">|</span>
          <span className="text-emerald-400 shrink-0">{status}</span>
        </div>
      </div>
    </div>
  );
}
