'use client';

import { useState, useRef } from 'react';
import { Volume2, VolumeX, X } from 'lucide-react';

interface LogoIntroSplashProps {
  /** Video file path (default: '/intro.mp4') */
  videoUrl?: string;
}

export function LogoIntroSplash({
  videoUrl = '/intro.mp4',
}: LogoIntroSplashProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const dismissSplash = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
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
      onClick={dismissSplash}
      className={`fixed inset-0 z-[9999] bg-black flex flex-col justify-between items-center select-none cursor-pointer transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ touchAction: 'none' }}
    >
      {/* ── TOP SECTION (Solid Black Area) ── */}
      <div className="w-full flex-1 flex flex-col justify-between items-center pt-8 pb-4 px-6 z-20">
        {/* Floating action buttons in top-right */}
        <div className="w-full flex justify-end items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSound();
            }}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/25 active:scale-95 transition-all shadow-md"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-white" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              dismissSplash();
            }}
            className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono tracking-widest uppercase flex items-center gap-1 hover:bg-white/25 active:scale-95 transition-all shadow-md"
          >
            <span>Skip</span>
            <X size={13} />
          </button>
        </div>

        {/* Top Text: by rabinjathon (Cool white typography) */}
        <div className="text-center my-auto">
          <h2 className="text-white font-display text-lg sm:text-2xl font-extrabold tracking-[0.25em] sm:tracking-[0.35em] uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]">
            by rabinjathon
          </h2>
        </div>
      </div>

      {/* ── MIDDLE SECTION (Video spanning full 100% breadth of screen) ── */}
      <div className="w-full bg-black relative flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted={isMuted}
          playsInline
          onEnded={dismissSplash}
          className="w-full h-auto max-h-[55vh] sm:max-h-[65vh] object-cover sm:object-contain block"
        />
      </div>

      {/* ── BOTTOM SECTION (Solid Black Area) ── */}
      <div className="w-full flex-1 flex flex-col justify-between items-center pt-4 pb-8 px-6 z-20">
        {/* Bottom Text: for rabinjathon (Cool white typography) */}
        <div className="text-center my-auto">
          <h2 className="text-white font-display text-lg sm:text-2xl font-extrabold tracking-[0.25em] sm:tracking-[0.35em] uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]">
            for rabinjathon
          </h2>
        </div>

        {/* Tap to enter hint */}
        <p className="text-[11px] font-mono tracking-wider text-zinc-500 uppercase">
          Tap anywhere or Skip to enter
        </p>
      </div>
    </div>
  );
}
