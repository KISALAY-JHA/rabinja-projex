'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Trophy, Sparkles, Bookmark, User } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Explore',     href: '/explore',     icon: Compass },
  { label: 'Events',      href: '/events',      icon: Trophy },
  { label: 'NEX AI',      href: '/nex',         icon: Sparkles, isCenter: true },
  { label: 'Collections', href: '/collections', icon: Bookmark },
  { label: 'Profile',     href: '/profile',     icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 md:hidden z-40 bg-black/95 border-t border-cyan-500/20 pb-[max(env(safe-area-inset-bottom),6px)] shadow-[0_-10px_35px_rgba(0,0,0,0.95)] backdrop-blur-2xl w-full max-w-full overflow-hidden"
      aria-label="Mobile navigation"
    >
      {/* Anime top edge glow filament */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      <div className="flex items-center justify-around h-16 px-1 w-full max-w-full relative">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                id="mobile-nav-nex"
                className="relative -top-3.5 flex flex-col items-center group active:scale-90 transition-transform"
                title="Launch NEX AI"
              >
                {/* Mecha Core Ring */}
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 opacity-80 blur-sm group-hover:opacity-100 transition-opacity animate-pulse" />
                  <div className="relative w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_24px_rgba(0,212,255,0.85)] bg-black flex items-center justify-center">
                    <video
                      src="/nex-ai.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover rounded-full scale-105 pointer-events-none"
                    />
                  </div>
                </div>
                <span className="text-[10px] font-mono font-extrabold text-cyan-300 mt-1 tracking-wider uppercase drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]">
                  NEX AI
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              id={`mobile-nav-${item.label.toLowerCase()}`}
              className={`flex-1 flex flex-col items-center justify-center py-1 text-[10px] font-medium transition-all active:scale-95 ${
                isActive ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <div className="relative">
                {isActive && (
                  <div className="absolute -inset-1.5 rounded-full bg-cyan-400/25 blur-sm animate-pulse pointer-events-none" />
                )}
                <item.icon
                  size={20}
                  strokeWidth={isActive ? 2.4 : 1.7}
                  className={`transition-colors relative z-10 ${isActive ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(0,212,255,1)]' : 'text-current'}`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00D4FF]" />
                )}
              </div>
              <span className={`mt-1 font-mono text-[9px] tracking-wider uppercase transition-colors ${
                isActive ? 'text-cyan-300 font-bold' : 'text-zinc-400'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
