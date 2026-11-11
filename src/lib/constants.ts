/* ============================================================
   RABINJA Projex — Application Constants
   ============================================================ */

export const APP_NAME = 'RABINJA';
export const PRODUCT_NAME = 'Projex';
export const AI_NAME = 'NEX AI';

export const TAGLINE = 'Discover the work. Understand the thinking. Explore what people build.';
export const DESCRIPTION = 'A project discovery, showcase and evaluation platform by RABINJA.';

export const NAV_ITEMS = [
  { label: 'Explore', href: '/explore' },
  { label: 'Events', href: '/events' },
  { label: 'NEX AI', href: '/nex' },
  { label: 'Collections', href: '/collections' },
] as const;

export const MOBILE_NAV_ITEMS = [
  { label: 'Home', href: '/', icon: 'Home' },
  { label: 'Explore', href: '/explore', icon: 'Compass' },
  { label: 'NEX AI', href: '/nex', icon: 'Brain' },
  { label: 'Events', href: '/events', icon: 'Trophy' },
  { label: 'Profile', href: '/profile', icon: 'User' },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: 'Explore Projects', href: '/explore' },
    { label: 'Rabinjathon', href: '/events/rabinjathon' },
    { label: 'NEX AI', href: '/nex' },
    { label: 'Collections', href: '/collections' },
  ],
  company: [
    { label: 'About RABINJA', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
} as const;

/**
 * Demo data disclaimer shown in the frontend prototype.
 * Must be visible wherever mock data is displayed.
 */
export const DEMO_DISCLAIMER = 'Sample data for demonstration purposes only. Not real project information.';

/**
 * NEX AI disclaimer label.
 */
export const NEX_DISCLAIMER = 'AI-generated practice assessment. Not an official evaluation.';
