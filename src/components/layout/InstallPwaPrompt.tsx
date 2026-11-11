'use client';

import { useState, useEffect } from 'react';
import { Download, Share2, X, Smartphone, Sparkles } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPwaPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    // 1. Check if already installed / running in standalone app mode
    const standaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (standaloneMode) {
      setIsStandalone(true);
      return;
    }

    // 2. Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registered:', reg.scope);
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    }

    // 3. Android / Chrome / Desktop PWA install trigger
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Check dismiss history before showing automatically
      const dismissedUntil = localStorage.getItem('rabinja_pwa_dismissed');
      if (!dismissedUntil || Date.now() >= parseInt(dismissedUntil, 10)) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 4. iOS Safari Detection
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua);
    const isSafari = ua.includes('safari') && !ua.includes('crios') && !ua.includes('fxios');

    if (isIosDevice && isSafari && !standaloneMode) {
      setIsIos(true);
      const dismissedUntil = localStorage.getItem('rabinja_pwa_dismissed');
      if (!dismissedUntil || Date.now() >= parseInt(dismissedUntil, 10)) {
        const timer = setTimeout(() => setShowIosGuide(true), 3000);
        return () => clearTimeout(timer);
      }
    }

    // 5. Custom trigger from button anywhere in the app
    const handleCustomTrigger = () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
      } else if (isIosDevice) {
        setShowIosGuide(true);
      } else {
        alert("To install RABINJA Projex as an app:\n\n• On Chrome/Edge: Click the install icon (⊕) in your browser address bar.\n• On Android: Tap Menu (⋮) -> 'Install app' or 'Add to Home Screen'.");
      }
    };
    window.addEventListener('trigger-pwa-install', handleCustomTrigger);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('trigger-pwa-install', handleCustomTrigger);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIosGuide(false);
    // Dismiss for 3 days
    localStorage.setItem('rabinja_pwa_dismissed', (Date.now() + 3 * 86400 * 1000).toString());
  };

  if (isStandalone) return null;

  return (
    <>
      {/* ── Native Install Banner (Android / Chrome / Desktop) ── */}
      {showPrompt && deferredPrompt && (
        <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[9990] animate-bounce-in">
          <div className="glass-strong border border-purple-500/40 rounded-2xl p-4 shadow-[0_10px_40px_rgba(168,85,247,0.3)] bg-[#09090B]/95 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center shrink-0 shadow-lg">
                <Smartphone className="text-white" size={24} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-white font-display font-bold text-sm">Use RABINJA Projex as App</h4>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                    PWA
                  </span>
                </div>
                <p className="text-[var(--text-secondary)] text-xs mt-1 leading-relaxed">
                  Install on your phone or PC for full-screen view, faster load times, and one-tap access.
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={handleInstallClick}
                    className="btn btn-primary text-xs py-1.5 px-3.5 flex items-center gap-1.5 shadow-md"
                  >
                    <Download size={13} />
                    Install App
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="text-xs text-[var(--text-muted)] hover:text-white px-2 py-1.5 transition-colors"
                  >
                    Not now
                  </button>
                </div>
              </div>

              <button
                onClick={handleDismiss}
                className="text-[var(--text-muted)] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── iOS Add-to-Home-Screen Guide ── */}
      {showIosGuide && isIos && (
        <div className="fixed bottom-20 left-4 right-4 z-[9990] animate-fade-up">
          <div className="glass-strong border border-cyan-500/40 rounded-2xl p-4 shadow-[0_10px_40px_rgba(6,182,212,0.25)] bg-[#09090B]/95 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-brand flex items-center justify-center shrink-0">
                <Sparkles className="text-white" size={20} />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-white font-display font-bold text-sm flex items-center gap-1.5">
                  Install App on iPhone
                </h4>
                <p className="text-zinc-300 text-xs mt-1 leading-relaxed">
                  Tap the <span className="inline-flex items-center gap-0.5 text-cyan-400 font-medium">Share <Share2 size={11} /></span> icon at the bottom of Safari, then choose <strong className="text-white font-semibold">"Add to Home Screen"</strong>.
                </p>
                <button
                  onClick={handleDismiss}
                  className="mt-2.5 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
                >
                  Got it, dismiss
                </button>
              </div>

              <button
                onClick={handleDismiss}
                className="text-[var(--text-muted)] hover:text-white p-1"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
