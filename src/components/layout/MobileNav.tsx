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
      className="fixed bottom-0 left-0 right-0 md:hidden z-40 bg-black/95 border-t border-zinc-800/80 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-8px_25px_rgba(0,0,0,0.85)] backdrop-blur-xl w-full max-w-full overflow-hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-1 w-full max-w-full">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                id="mobile-nav-nex"
                className="relative -top-3 flex flex-col items-center group active:scale-95 transition-transform"
                title="Launch NEX AI"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.5)] border-2 border-black group-hover:shadow-[0_0_25px_rgba(0,212,255,0.8)] transition-all">
                  <Sparkles size={20} className="text-black fill-black/20 animate-pulse" />
                </div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 mt-1 tracking-wider">
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
                <item.icon
                  size={20}
                  strokeWidth={isActive ? 2.3 : 1.7}
                  className={`transition-colors ${isActive ? 'text-cyan-400' : 'text-current'}`}
                />
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00D4FF]" />
                )}
              </div>
              <span className="mt-1.5 font-mono text-[9px] tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
