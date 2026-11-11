import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { LogoIntroSplash } from '@/components/layout/LogoIntroSplash';

export const metadata: Metadata = {
  title: {
    default: 'RABINJA Projex — Project Intelligence & Showcase Platform',
    template: '%s | RABINJA Projex',
  },
  description: 'Discover, evaluate, and showcase the most innovative projects in India. Powered by NEX AI — the first AI judge designed for engineering competitions.',
  keywords: ['project showcase', 'innovation', 'Rabinjathon', 'NEX AI', 'judge evaluation', 'engineering portfolio', 'hackathon'],
  metadataBase: new URL('https://projex.rabinja.com'),
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
      </head>
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary antialiased mobile-nav-offset">
        <LogoIntroSplash />
        <Header />
        <main className="flex-1 flex flex-col pt-16">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
