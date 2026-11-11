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
      className="fixed bottom-0 left-0 right-0 md:hidden z-50 glass-strong border-t border-[var(--border)] pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
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
                <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.6)] border-2 border-[var(--bg-primary)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.9)] transition-all">
                  <Sparkles size={22} className="text-white animate-pulse" />
                </div>
                <span className="text-[10px] font-bold text-white mt-1 tracking-wider">
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
                isActive ? 'text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
            >
              <div className="relative">
                <item.icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className={`transition-colors ${isActive ? 'text-[var(--purple)]' : 'text-current'}`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--purple)] shadow-[0_0_6px_var(--purple)]" />
                )}
              </div>
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
