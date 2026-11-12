'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Trophy, Sparkles, User, Home } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home',    href: '/',        icon: Home },
  { label: 'Explore', href: '/explore', icon: Compass },
  { label: 'NEX AI',  href: '/nex',     icon: Sparkles, isCenter: true },
  { label: 'Events',  href: '/events',  icon: Trophy },
  { label: 'Profile', href: '/profile', icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-black/95 border-t border-cyan-500/30 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-10px_30px_rgba(0,0,0,0.9)] backdrop-blur-xl w-full max-w-full overflow-hidden"
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
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.6)] border-2 border-black group-hover:shadow-[0_0_25px_rgba(0,212,255,0.9)] transition-all">
                  <Sparkles size={22} className="text-black animate-pulse" />
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
              className={`flex-1 flex flex-col items-center justify-center py-1 text-[10px] font-semibold transition-all active:scale-95 ${
                isActive ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <div className="relative">
                <item.icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className={`transition-colors ${isActive ? 'text-cyan-400' : 'text-current'}`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_#00D4FF]" />
                )}
              </div>
              <span className="mt-1 font-mono text-[9px] tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
