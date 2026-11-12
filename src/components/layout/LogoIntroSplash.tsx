'use client';

import { useState, useRef } from 'react';

interface LogoIntroSplashProps {
  /** Video file path (default: '/intro.mp4') */
  videoUrl?: string;
}

export function LogoIntroSplash({
  videoUrl = '/intro.mp4',
}: LogoIntroSplashProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const dismissSplash = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 450);
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={dismissSplash}
      className={`fixed inset-0 z-[9999] bg-black flex flex-col justify-between items-center select-none cursor-pointer transition-opacity duration-500 overflow-hidden w-screen max-w-full ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ touchAction: 'none' }}
    >
      {/* ── TOP SECTION (Solid Pitch Black) ── */}
      <div className="w-full flex-1 flex flex-col justify-center items-center px-4 z-20">
        <h2 className="text-white font-display text-lg sm:text-2xl font-extrabold tracking-[0.28em] sm:tracking-[0.35em] uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] text-center">
          BY RABINJATHON
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

      {/* ── BOTTOM SECTION (Solid Pitch Black) ── */}
      <div className="w-full flex-1 flex flex-col justify-center items-center px-4 z-20">
        <h2 className="text-white font-display text-lg sm:text-2xl font-extrabold tracking-[0.28em] sm:tracking-[0.35em] uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] text-center">
          FOR RABINJATHON
        </h2>
      </div>
    </div>
  );
}
