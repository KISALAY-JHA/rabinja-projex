'use client';

import { useState, useRef } from 'react';
import { Volume2, VolumeX, X } from 'lucide-react';

interface LogoIntroSplashProps {
  /** Video file path (default: '/intro.mp4') */
  videoUrl?: string;
  /** Optional YouTube link fallback */
  youtubeUrl?: string;
}

export function LogoIntroSplash({
  videoUrl = '/intro.mp4',
  youtubeUrl = '',
}: LogoIntroSplashProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const dismissSplash = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 600);
  };

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#050507] flex flex-col items-center justify-center select-none transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ touchAction: 'none' }}
    >
      {/* ── Background Glow ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-cyan-600/20 rounded-full blur-[90px]" />
      </div>

      {/* ── Top Bar with Sound & Skip Controls ── */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-3">
        {videoUrl && (
          <button
            onClick={toggleSound}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all shadow-lg"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-[var(--green)]" />}
          </button>
        )}

        <button
          onClick={dismissSplash}
          className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 hover:bg-white/20 active:scale-95 transition-all shadow-lg"
        >
          <span>Skip</span>
          <X size={14} />
        </button>
      </div>

      {/* ── Main Presentation ── */}
      <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center text-center">
        {/* Top Text: by rabinjathon */}
        <div className="mb-4 sm:mb-6 animate-fade-in">
          <p className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-purple-400 font-bold drop-shadow-[0_0_15px_rgba(168,85,247,0.7)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping inline-block" />
            by rabinjathon
          </p>
        </div>

        {/* Video Player */}
        <div className="w-full max-w-sm sm:max-w-md aspect-video rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.35)] bg-black relative group">
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            muted={isMuted}
            playsInline
            onEnded={dismissSplash}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Text: for rabinjathon */}
        <div className="mt-4 sm:mt-6 animate-fade-in">
          <p className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-cyan-400 font-bold drop-shadow-[0_0_15px_rgba(6,182,212,0.7)] flex items-center gap-2">
            for rabinjathon
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
          </p>
        </div>
      </div>

      {/* Tap anywhere or skip hint */}
      <button
        onClick={dismissSplash}
        className="absolute bottom-8 text-[11px] text-[var(--text-muted)] tracking-wider hover:text-white transition-colors"
      >
        Tap here or Skip to enter Projex
      </button>
    </div>
  );
}
