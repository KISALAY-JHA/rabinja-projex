'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, X, Play, Zap, Sparkles } from 'lucide-react';

interface LogoIntroSplashProps {
  /** Optional custom MP4/WebM URL or local file (e.g. '/intro.mp4') */
  videoUrl?: string;
  /** Optional YouTube link or Video ID (e.g. 'dQw4w9WgXcQ' or 'https://www.youtube.com/watch?v=...') */
  youtubeUrl?: string;
  /** Auto-dismiss duration in ms when using fallback animation (default: 3200ms) */
  duration?: number;
  /** If true, shows every time the app opens on mobile */
  alwaysShowOnMobile?: boolean;
}

export function LogoIntroSplash({
  videoUrl = '',
  youtubeUrl = '', // You can paste your YouTube video link here anytime!
  duration = 3400,
  alwaysShowOnMobile = true,
}: LogoIntroSplashProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Helper to extract YouTube ID from link
  const getYouTubeId = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url;
  };

  const ytId = getYouTubeId(youtubeUrl);

  const dismissSplash = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 600); // Wait for fade-out transition
  };

  useEffect(() => {
    // If using video or fallback animation, set auto-dismiss timer
    if (!ytId) {
      const timer = setTimeout(() => {
        dismissSplash();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, ytId]);

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
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-blue-600/20 rounded-full blur-[90px]" />
      </div>

      {/* ── Top Bar with Skip & Mute Controls ── */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        {videoUrl && (
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.muted = !isMuted;
                setIsMuted(!isMuted);
              }
            }}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        )}

        <button
          onClick={dismissSplash}
          className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 hover:bg-white/20 active:scale-95 transition-all"
        >
          <span>Skip</span>
          <X size={14} />
        </button>
      </div>

      {/* ── Content Container: YouTube / Direct Video / Futuristic Neon Reveal ── */}
      <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center text-center">
        {ytId ? (
          /* YouTube Embed Mode (plays when you add YouTube link) */
          <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.3)] bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1`}
              title="RABINJA Logo Video"
              className="w-full h-full object-cover"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        ) : videoUrl ? (
          /* Direct MP4/WebM Video Mode */
          <div className="w-full max-w-md aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.3)] bg-black">
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
        ) : (
          /* High-Tech RABINJA Futuristic Neon Animation (Default Fallback) */
          <div className="flex flex-col items-center">
            {/* Glowing Logo Icon */}
            <div className="relative mb-8 group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-brand flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.6)] animate-bounce duration-1000">
                <Zap size={48} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
              </div>
              <div className="absolute -inset-2 bg-gradient-brand rounded-3xl blur-xl opacity-50 -z-10 animate-pulse" />
            </div>

            {/* Brand Title */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-wider mb-2 flex items-center justify-center gap-2">
              <span>RABINJA</span>
              <span className="gradient-brand">PROJEX</span>
            </h1>

            {/* Tagline */}
            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-medium tracking-wide max-w-xs mb-8">
              Discover the work. Understand the thinking.
            </p>

            {/* Progress Bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-brand rounded-full animate-[progress_3.2s_ease-in-out_forwards]" />
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
              <Sparkles size={12} className="text-[var(--purple)]" />
              <span>NEX AI Project Ecosystem</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-8 text-[11px] text-[var(--text-muted)] tracking-wider">
        Tap anywhere or Skip to enter
      </div>
    </div>
  );
}
