import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { LogoIntroSplash } from '@/components/layout/LogoIntroSplash';
import { InstallPwaPrompt } from '@/components/layout/InstallPwaPrompt';

export const viewport: Viewport = {
  themeColor: '#09090B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: {
    default: 'RABINJA Projex — Project Intelligence & Showcase Platform',
    template: '%s | RABINJA Projex',
  },
  description: 'Discover, evaluate, and showcase the most innovative projects in India. Powered by NEX AI — the first AI judge designed for engineering competitions.',
  keywords: ['project showcase', 'innovation', 'Rabinjathon', 'NEX AI', 'judge evaluation', 'engineering portfolio', 'hackathon'],
  metadataBase: new URL('https://rabinja-projex.rabinjasquad.workers.dev'),
  applicationName: 'RABINJA Projex',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'RABINJA Projex',
  },
  formatDetection: {
    telephone: false,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '64x64', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'RABINJA Projex',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="RABINJA Projex" />
      </head>
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary antialiased mobile-nav-offset">
        <LogoIntroSplash />
        <InstallPwaPrompt />
        <Header />
        <main className="flex-1 flex flex-col pt-16">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
