import Link from 'next/link';
import { Zap, Globe, Code2, Mail, ExternalLink, Share2 } from 'lucide-react';

const FOOTER_LINKS = {
  Platform: [
    { label: 'Explore Projects', href: '/explore' },
    { label: 'Events', href: '/events' },
    { label: 'NEX AI', href: '/nex' },
    { label: 'Leaderboard', href: '/events?tab=leaderboard' },
  ],
  Community: [
    { label: 'Discussions', href: '/explore?tab=discussions' },
    { label: 'Join a Team', href: '/teams' },
    { label: 'Become a Judge', href: '/judges/apply' },
    { label: 'Blog', href: '/blog' },
  ],
  Company: [
    { label: 'About RABINJA', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const SOCIAL_LINKS = [
  { icon: Globe,    href: 'https://twitter.com/rabinja_labs', label: 'Twitter / X' },
  { icon: Code2,    href: 'https://github.com/rabinja-labs',  label: 'GitHub' },
  { icon: Share2,   href: 'https://linkedin.com/company/rabinja', label: 'LinkedIn' },
  { icon: Mail,     href: 'mailto:hello@rabinja.com',          label: 'Email' },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-auto" role="contentinfo">
      {/* Top section */}
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 bg-gradient-brand rounded-xl flex items-center justify-center">
                <Zap size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-display font-bold text-lg leading-tight text-white">RABINJA</div>
                <div className="gradient-brand font-display font-bold text-sm leading-tight">Projex</div>
              </div>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-sm">
              The definitive platform for showcasing, evaluating, and discovering India's most innovative student and professional projects.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-[var(--bg-surface-2)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-[var(--border-hover)] transition-all"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="space-y-4">
              <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Neon divider */}
      <div className="neon-line" />

      {/* Bottom bar */}
      <div className="container-page py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <span>© 2026 RABINJA LABS. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
              All systems operational
            </span>
            <a
              href="https://rabinja.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              rabinja.com <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
