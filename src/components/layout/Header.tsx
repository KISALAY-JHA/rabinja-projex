'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Search, Bell, LayoutGrid, MoreVertical,
  Sparkles, Trophy, Compass, BookOpen, Smartphone,
  CheckCircle2, LogOut
} from 'lucide-react';
import { BrowseModal } from './BrowseModal';
import { MoreMenuModal } from './MoreMenuModal';

const NAV_LINKS = [
  {
    label: 'Explore',
    href: '/explore',
    icon: Compass,
  },
  {
    label: 'Events',
    href: '/events',
    icon: Trophy,
  },
  {
    label: 'NEX AI',
    href: '/nex',
    icon: Sparkles,
    highlight: true,
  },
  {
    label: 'Docs',
    href: '/docs',
    icon: BookOpen,
  },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [browseOpen, setBrowseOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [authUser, setAuthUser] = useState<{ phone: string; displayName?: string } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setBrowseOpen(false);
    setMoreMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const checkAuth = () => {
      const stored = localStorage.getItem('rabinja_auth_user');
      if (stored) {
        try {
          setAuthUser(JSON.parse(stored));
        } catch {
          setAuthUser(null);
        }
      } else {
        setAuthUser(null);
      }
    };
    checkAuth();
    window.addEventListener('rabinja-auth-change', checkAuth);
    return () => window.removeEventListener('rabinja-auth-change', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('rabinja_auth_user');
    setAuthUser(null);
    window.dispatchEvent(new Event('rabinja-auth-change'));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full max-w-full z-40 transition-all duration-200 overflow-x-hidden ${
          scrolled ? 'bg-black/95 border-b border-zinc-800/80 backdrop-blur-xl' : 'bg-black/75 backdrop-blur-md'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 w-full">
            {/* ── Brand Logo (Left) ── */}
            <Link href="/" className="flex items-center gap-2 group shrink-0" id="header-logo">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl overflow-hidden border border-cyan-400/50 shadow-[0_0_12px_rgba(0,212,255,0.3)] group-hover:scale-105 transition-transform bg-black flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="RABINJA Projex" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-baseline">
                <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-white uppercase">
                  RABINJA
                </span>
                <span className="ml-1 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  PROJEX
                </span>
              </div>
            </Link>

            {/* ── Desktop Navigation Links (Center) ── */}
            <nav className="hidden md:flex items-center gap-1.5" role="navigation" aria-label="Main navigation">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  id={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-150 ${
                    item.highlight
                      ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                      : pathname.startsWith(item.href)
                      ? 'text-white bg-zinc-900 border border-zinc-700'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  <item.icon size={14} className={item.highlight ? 'text-cyan-400' : ''} />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* ── Action Icons (Right - Phone-first layout inspired by Moctale) ── */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Search Icon */}
              <Link
                href="/explore?focus=search"
                className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors active:scale-95"
                title="Search projects and builders"
                aria-label="Search"
              >
                <Search size={18} />
              </Link>

              {/* Notification Bell with indicator */}
              <Link
                href="/profile?tab=activity"
                className="relative w-9 h-9 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors active:scale-95"
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-black" />
              </Link>

              {/* 3x3 Grid Icon: Browse By Categories Drawer */}
              <button
                onClick={() => setBrowseOpen(true)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-400 hover:text-cyan-300 hover:bg-zinc-900 transition-colors active:scale-95"
                title="Browse by Tracks & Tags"
                aria-label="Browse by categories"
                id="header-browse-grid-btn"
              >
                <LayoutGrid size={18} />
              </button>

              {/* 3-Dots More Menu Icon */}
              <button
                onClick={() => setMoreMenuOpen(true)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors active:scale-95"
                title="Account and Options"
                aria-label="Account options"
                id="header-more-menu-btn"
              >
                <MoreVertical size={18} />
              </button>

              {/* Desktop Only Auth Pill */}
              {authUser ? (
                <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-zinc-800 ml-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-semibold"
                  >
                    <CheckCircle2 size={12} />
                    <span>{authUser.phone.slice(-6)}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-1 text-zinc-500 hover:text-rose-400 transition-colors"
                    title="Disconnect"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-zinc-800 ml-1">
                  <Link
                    href="/auth/login"
                    className="text-xs font-mono px-3 py-1.5 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Moctale-inspired "Browse By" Overlay Modal ── */}
      <BrowseModal isOpen={browseOpen} onClose={() => setBrowseOpen(false)} />

      {/* ── Moctale-inspired "More Options / Profile" Modal ── */}
      <MoreMenuModal
        isOpen={moreMenuOpen}
        onClose={() => setMoreMenuOpen(false)}
        authUser={authUser}
        onLogout={handleLogout}
      />
    </>
  );
}
