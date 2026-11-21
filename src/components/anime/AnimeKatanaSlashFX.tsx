'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface SlashBurst {
  id: number;
  x: number;
  y: number;
}

export function AnimeKatanaSlashFX() {
  const [slashes, setSlashes] = useState<SlashBurst[]>([]);

  const triggerSlash = useCallback((clientX: number, clientY: number) => {
    const id = Date.now() + Math.random();
    setSlashes((prev) => [...prev.slice(-3), { id, x: clientX, y: clientY }]);

    // Auto-remove after animation ends (480ms)
    setTimeout(() => {
      setSlashes((prev) => prev.filter((s) => s.id !== id));
    }, 500);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Check if clicked element or parent is clickable (button, link, tab, card, input)
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest(
        'button, a, [role="button"], [role="tab"], .btn, .card, input, select'
      );

      // Trigger blade slash on any interactive element click
      if (isInteractive) {
        triggerSlash(e.clientX, e.clientY);
      }
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        const target = e.target as HTMLElement | null;
        if (!target) return;

        const isInteractive = target.closest(
          'button, a, [role="button"], [role="tab"], .btn, .card'
        );

        if (isInteractive) {
          triggerSlash(touch.clientX, touch.clientY);
        }
      }
    };

    window.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [triggerSlash]);

  if (slashes.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none">
      {slashes.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{
            left: s.x,
            top: s.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Blade Shockwave Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-cyan-400 animate-katana-shockwave pointer-events-none" />

          {/* Primary Cyan Blade Slash Beam */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-1 bg-gradient-to-r from-transparent via-[#00D4FF] to-white rounded-full animate-katana-slash-a shadow-[0_0_20px_#00D4FF] pointer-events-none" />

          {/* Counter Crimson Blade Slash Beam */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-1 bg-gradient-to-r from-transparent via-[#FF2D55] to-white rounded-full animate-katana-slash-b shadow-[0_0_20px_#FF2D55] pointer-events-none" />

          {/* Crossed Katana Combat Silhouette */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-katana-clash pointer-events-none flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_15px_rgba(0,212,255,0.9)]"
            >
              {/* Katana 1 (Diagonal Left) */}
              <path
                d="M6 34 L32 8 M32 8 L35 11 L31 7 Z M6 34 L4 36 M8 32 L5 29"
                stroke="#00D4FF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Katana 2 (Diagonal Right) */}
              <path
                d="M34 34 L8 8 M8 8 L5 11 L9 7 Z M34 34 L36 36 M32 32 L35 29"
                stroke="#FF2D55"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Center Clash Flare */}
              <circle cx="20" cy="20" r="3" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Glowing Kanji Slash Character (斬 - Zan) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-xs font-black text-white animate-katana-kanji pointer-events-none drop-shadow-[0_0_15px_#00D4FF]">
            斬
          </div>

          {/* Sparks Radiating Outward */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-katana-sparks pointer-events-none">
            <span className="absolute -top-3 left-3 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00D4FF]" />
            <span className="absolute -bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_#FF2D55]" />
            <span className="absolute -top-4 right-2 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_#fff]" />
            <span className="absolute bottom-4 -left-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00D4FF]" />
          </div>
        </div>
      ))}
    </div>
  );
}
