'use client';

import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface LogoIntroSplashProps {
  /** Video file path (default: '/intro.mp4') */
  videoUrl?: string;
}

export function LogoIntroSplash({
  videoUrl = '/intro.mp4',
}: LogoIntroSplashProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if user has disabled the intro in settings
    try {
      const disabled = localStorage.getItem('rabinja_disable_intro') === 'true';
      if (!disabled) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const dismissSplash = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 400);
  };

  const handleSkipForever = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.setItem('rabinja_disable_intro', 'true');
    } catch {
      // ignore
    }
    dismissSplash();
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={dismissSplash}
      className={`fixed inset-0 z-[9999] bg-black flex flex-col justify-between items-center select-none cursor-pointer transition-opacity duration-400 overflow-hidden w-screen max-w-full ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ touchAction: 'none' }}
    >
      {/* ── Skip Button in Top Corner ── */}
      <div className="absolute top-4 right-4 z-30">
        <button
          onClick={dismissSplash}
          className="px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-[11px] font-mono text-zinc-300 hover:text-white backdrop-blur-md flex items-center gap-1 active:scale-95 transition-all"
        >
          <span>Skip</span>
          <X size={12} />
        </button>
      </div>

      {/* ── TOP SECTION (Branded Header) ── */}
      <div className="w-full flex-1 flex flex-col justify-center items-center px-4 z-20 text-center">
        <span className="text-[11px] font-mono tracking-[0.25em] text-cyan-400 font-bold uppercase mb-1">
          RABINJA PROJEX
        </span>
        <h2 className="text-white font-display text-base sm:text-xl font-extrabold tracking-[0.25em] uppercase drop-shadow-[0_0_20px_rgba(0,212,255,0.6)]">
          BY RABINJA SQUAD
        </h2>
      </div>

      {/* ── MIDDLE SECTION (Video touches phone's left and right vertical edges completely, 0% crop) ── */}
      <div className="w-full w-screen max-w-full bg-black relative flex items-center justify-center shrink-0 overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          playsInline
          onEnded={dismissSplash}
          className="w-full w-screen max-w-full h-auto block mx-auto"
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* ── BOTTOM SECTION (Dedicated 2-Line Tagline) ── */}
      <div className="w-full flex-1 flex flex-col justify-center items-center px-4 z-20 text-center space-y-1">
        <h3 className="text-white font-display text-sm sm:text-lg font-bold tracking-[0.22em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]">
          FOR RABINJATHON
        </h3>
        <h4 className="text-cyan-300 font-display text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase drop-shadow-[0_0_15px_rgba(0,212,255,0.8)]">
          TO INNOVATORS
        </h4>

        {/* Small "Don't show again" hint */}
        <button
          onClick={handleSkipForever}
          className="pt-2 text-[10px] font-mono text-zinc-500 hover:text-zinc-300 underline transition-colors"
        >
          Turn off intro on startup
        </button>
      </div>
    </div>
  );
}
