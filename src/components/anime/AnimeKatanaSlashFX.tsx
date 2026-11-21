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
          {/* Anime Plasma Shockwave Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-cyan-400 animate-katana-shockwave pointer-events-none" />

          {/* Primary Cyan Blade Slash Laser Beam */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1.5 bg-gradient-to-r from-transparent via-[#00D4FF] to-white rounded-full animate-katana-slash-a shadow-[0_0_25px_#00D4FF,0_0_45px_#00D4FF] pointer-events-none" />

          {/* Counter Crimson Blade Slash Laser Beam */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1.5 bg-gradient-to-r from-transparent via-[#FF2D55] to-white rounded-full animate-katana-slash-b shadow-[0_0_25px_#FF2D55,0_0_45px_#FF2D55] pointer-events-none" />

          {/* Crossed Anime Katana Blades Clash (Detailed Figures) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-katana-clash pointer-events-none flex items-center justify-center">
            <svg
              width="52"
              height="52"
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_20px_rgba(0,212,255,1)]"
            >
              {/* Cyan Plasma Katana Figure (Slashing Northwest to Southeast) */}
              {/* Curved Energy Blade */}
              <path
                d="M8 44 C 18 34, 30 22, 44 8"
                stroke="#00D4FF"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M8 44 C 18 34, 30 22, 44 8"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Katana Tsuba Guard & Tsuka Handle */}
              <line x1="6" y1="46" x2="14" y2="38" stroke="#00D4FF" strokeWidth="3" strokeLinecap="round" />
              <line x1="4" y1="48" x2="8" y2="44" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />

              {/* Crimson Plasma Katana Figure (Slashing Northeast to Southwest) */}
              {/* Curved Energy Blade */}
              <path
                d="M44 44 C 34 34, 22 22, 8 8"
                stroke="#FF2D55"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M44 44 C 34 34, 22 22, 8 8"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Katana Tsuba Guard & Tsuka Handle */}
              <line x1="46" y1="46" x2="38" y2="38" stroke="#FF2D55" strokeWidth="3" strokeLinecap="round" />
              <line x1="48" y1="48" x2="44" y2="44" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />

              {/* Clash Contact Flare Core */}
              <circle cx="26" cy="26" r="4" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Anime Radiant Starburst Impact Flash (Pure Anime Lighting / Diamond Lens Flare) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-katana-starburst pointer-events-none flex items-center justify-center">
            {/* Horizontal Light Ray */}
            <div className="absolute w-28 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_15px_#00D4FF]" />
            {/* Vertical Light Ray */}
            <div className="absolute h-28 w-0.5 bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_15px_#FF2D55]" />
            {/* 4-Point Radiant Anime Star Core */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              className="drop-shadow-[0_0_20px_rgba(255,255,255,1)]"
            >
              <path
                d="M18 0 C18 11 25 18 36 18 C25 18 18 25 18 36 C18 25 11 18 0 18 C11 18 18 11 18 0 Z"
                fill="#FFFFFF"
              />
              <path
                d="M18 6 C18 13 23 18 30 18 C23 18 18 23 18 30 C18 23 13 18 6 18 C13 18 18 13 18 6 Z"
                fill="#00D4FF"
                opacity="0.8"
              />
            </svg>
          </div>

          {/* Anime High-Voltage Electric Discharge Lightning Sparks */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-katana-sparks pointer-events-none">
            <span className="absolute -top-4 left-4 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#00D4FF]" />
            <span className="absolute -bottom-4 right-4 w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_12px_#FF2D55]" />
            <span className="absolute -top-5 -right-3 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#fff]" />
            <span className="absolute bottom-5 -left-3 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00D4FF]" />
            <span className="absolute top-1 -right-6 w-1 h-1 rounded-full bg-amber-300 shadow-[0_0_8px_#F59E0B]" />
            <span className="absolute -bottom-1 -left-6 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_#fff]" />
          </div>
        </div>
      ))}
    </div>
  );
}
