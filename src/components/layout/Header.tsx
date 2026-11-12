'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Search, Menu, X, ChevronDown,
  Sparkles, Trophy, Compass, User, BookOpen, Download, Smartphone,
  CheckCircle2, LogOut
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
  const [authUser, setAuthUser] = useState<{ phone: string; displayName?: string } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong border-b border-cyan-500/20 bg-black/90' : 'bg-transparent'
      }`}
    >
      <div className="container-page px-3 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 group shrink-0" id="header-logo">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-cyan-400/50 shadow-[0_0_15px_rgba(0,212,255,0.4)] group-hover:scale-105 transition-transform bg-black flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="RABINJA Projex" className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-extrabold text-base sm:text-lg tracking-tight">
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
                      ? 'gradient-nex font-bold'
                      : pathname.startsWith(item.href)
                      ? 'text-white bg-zinc-900 border border-cyan-500/30'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  <item.icon size={15} />
                  {item.label}
                  {item.sub && <ChevronDown size={13} className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Dropdown */}
                {item.sub && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 glass-strong border border-cyan-500/30 rounded-xl overflow-hidden py-1 min-w-[180px] bg-black/95 animate-scale-in">
                    {item.sub.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
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
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Install Web App CTA */}
            <button
              onClick={() => window.dispatchEvent(new Event('trigger-pwa-install'))}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold hover:bg-cyan-500/20 active:scale-95 transition-all shadow-[0_0_10px_rgba(0,212,255,0.2)]"
              title="Install RABINJA Projex as Web App"
            >
              <Smartphone size={13} className="text-cyan-400" />
              <span>App</span>
            </button>

            {/* Authenticated user status vs Login buttons */}
            {authUser ? (
              <div className="hidden sm:flex items-center gap-2 pl-1">
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-semibold"
                >
                  <CheckCircle2 size={13} />
                  <span>{authUser.phone.slice(-6)}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors"
                  title="Disconnect Node"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  id="header-login-btn"
                  className="hidden md:flex btn btn-secondary text-xs font-mono uppercase tracking-wider py-1.5 px-3"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  id="header-signup-btn"
                  className="hidden sm:flex btn btn-primary text-xs font-mono uppercase tracking-wider py-1.5 px-3.5 shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                >
                  Join Squad
                </Link>
              </>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-zinc-300 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              id="header-mobile-menu-btn"
            >
              {menuOpen ? <X size={22} className="text-cyan-400" /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="md:hidden glass-strong border-t border-cyan-500/30 bg-black/95 animate-fade-up">
          <div className="container-page py-4 px-4 flex flex-col gap-1.5">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  item.highlight
                    ? 'gradient-nex font-bold'
                    : pathname.startsWith(item.href)
                    ? 'text-white bg-zinc-900 border border-cyan-500/30'
                    : 'text-zinc-300'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-zinc-800 mt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  window.dispatchEvent(new Event('trigger-pwa-install'));
                }}
                className="btn btn-secondary w-full justify-center flex items-center gap-2 border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold"
              >
                <Download size={14} />
                Install Web App (No Browser Bar)
              </button>

              {authUser ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-emerald-500/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span className="text-xs font-mono text-white font-bold">{authUser.phone}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-rose-400 font-mono underline"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/auth/login" className="btn btn-secondary w-full justify-center text-xs font-mono uppercase">
                    Sign In with Phone
                  </Link>
                  <Link href="/auth/signup" className="btn btn-primary w-full justify-center text-xs font-mono uppercase font-bold shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                    Verify Phone & Join Squad
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
