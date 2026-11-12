'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Zap, Search, Menu, X, ChevronDown,
  Sparkles, Trophy, Compass, User, BookOpen, Download, Smartphone,
} from 'lucide-react';

const NAV_LINKS = [
  {
    label: 'Explore',
    href: '/explore',
    icon: Compass,
    sub: [
      { label: 'All Projects', href: '/explore' },
      { label: 'By Category', href: '/explore?view=category' },
      { label: 'Trending', href: '/explore?sort=trending' },
    ],
  },
  {
    label: 'Events',
    href: '/events',
    icon: Trophy,
    sub: [
      { label: 'Active Events', href: '/events' },
      { label: 'Leaderboards', href: '/events?tab=leaderboard' },
    ],
  },
  {
    label: 'NEX AI',
    href: '/nex',
    icon: Sparkles,
    sub: null,
    highlight: true,
  },
  {
    label: 'Docs',
    href: '/docs',
    icon: BookOpen,
    sub: null,
  },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong border-b border-[var(--border)]' : 'bg-transparent'
      }`}
    >
      <div className="container-page">
        <div className="flex items-center justify-between h-16">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group" id="header-logo">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-[var(--cyan)]/40 shadow-[0_0_15px_rgba(0,212,255,0.35)] group-hover:scale-105 transition-transform bg-[#04060C] flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="RABINJA Projex" className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-800 text-lg tracking-tight">
              <span className="text-white">RABINJA</span>
              <span className="gradient-brand ml-1">Projex</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.sub && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  id={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    item.highlight
                      ? 'gradient-nex font-semibold'
                      : pathname.startsWith(item.href)
                      ? 'text-white bg-[var(--bg-surface-2)]'
                      : 'text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-surface-2)]'
                  }`}
                >
                  <item.icon size={15} />
                  {item.label}
                  {item.sub && <ChevronDown size={13} className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Dropdown */}
                {item.sub && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 glass-strong border border-[var(--border-hover)] rounded-xl overflow-hidden py-1 min-w-[180px] animate-scale-in">
                    {item.sub.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-surface-2)] transition-colors"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* ── Right Side Actions ── */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Link
              href="/explore"
              id="header-search-btn"
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-md bg-[var(--bg-surface-2)] border border-[var(--border)] text-[var(--text-muted)] text-sm hover:border-[var(--border-hover)] transition-colors"
              style={{ minWidth: 180 }}
            >
              <Search size={14} />
              <span>Search projects...</span>
              <span className="ml-auto font-mono text-xs opacity-60">⌘K</span>
            </Link>

            {/* Install Web App CTA */}
            <button
              onClick={() => window.dispatchEvent(new Event('trigger-pwa-install'))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold hover:bg-purple-500/20 active:scale-95 transition-all shadow-sm"
              title="Install RABINJA Projex as Web App"
            >
              <Smartphone size={13} className="text-purple-400" />
              <span>App</span>
            </button>

            {/* Login */}
            <Link
              href="/auth/login"
              id="header-login-btn"
              className="hidden md:flex btn btn-secondary text-sm"
            >
              <User size={14} />
              Sign In
            </Link>

            {/* Sign up CTA */}
            <Link
              href="/auth/signup"
              id="header-signup-btn"
              className="hidden md:flex btn btn-primary text-sm"
            >
              Join Free
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden btn btn-ghost p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              id="header-mobile-menu-btn"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="md:hidden glass-strong border-t border-[var(--border)] animate-fade-up">
          <div className="container-page py-4 flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  item.highlight
                    ? 'gradient-nex'
                    : pathname.startsWith(item.href)
                    ? 'text-white bg-[var(--bg-surface-2)]'
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[var(--border)] mt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  window.dispatchEvent(new Event('trigger-pwa-install'));
                }}
                className="btn btn-secondary w-full justify-center flex items-center gap-2 border-purple-500/40 text-purple-300 font-semibold"
              >
                <Download size={15} />
                Install Web App
              </button>
              <Link href="/auth/login" className="btn btn-secondary w-full justify-center">Sign In</Link>
              <Link href="/auth/signup" className="btn btn-primary w-full justify-center">Join Free</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
