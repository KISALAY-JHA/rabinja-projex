'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowRight, Loader2, Smartphone, Sparkles } from 'lucide-react';

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const phone = searchParams.get('phone') || '';
  const code = searchParams.get('code') || '';

  const [status, setStatus] = useState<'verifying' | 'success' | 'invalid'>('verifying');

  useEffect(() => {
    if (!phone || !code || code.length < 4) {
      setStatus('invalid');
      return;
    }

    // Simulate cyber handshake verification
    const timer = setTimeout(() => {
      // Save authenticated session in localStorage
      const userSession = {
        phone,
        verified: true,
        verifiedAt: new Date().toISOString(),
        role: 'innovator',
        displayName: 'Squad Innovator',
        username: `user_${phone.replace(/\D/g, '').slice(-4)}`
      };
      localStorage.setItem('rabinja_auth_user', JSON.stringify(userSession));
      // Notify header and components
      window.dispatchEvent(new Event('rabinja-auth-change'));
      setStatus('success');
    }, 1200);

    return () => clearTimeout(timer);
  }, [phone, code]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Cyber ambient glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black" />

      <div className="w-full max-w-md relative z-10 card p-8 sm:p-10 border border-cyan-500/40 bg-[#05070E] shadow-[0_0_50px_rgba(0,212,255,0.25)] text-center">
        {/* Emblem */}
        <div className="w-16 h-16 rounded-2xl mx-auto mb-6 overflow-hidden border border-cyan-400/50 shadow-[0_0_30px_rgba(0,212,255,0.5)] bg-black">
          <img src="/logo.png" alt="RABINJA" className="w-full h-full object-cover" />
        </div>

        {status === 'verifying' && (
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-400 uppercase tracking-widest animate-pulse">
              <Loader2 size={12} className="animate-spin" />
              SYNCHRONIZING TELEMETRY...
            </div>
            <h1 className="font-display text-2xl font-bold text-white">
              Verifying Phone Node
            </h1>
            <p className="text-zinc-400 text-xs font-mono">
              VALIDATING CLEARANCE FOR: <span className="text-cyan-400 font-bold">{phone}</span>
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-5 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <CheckCircle2 size={24} />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                ✓ PHONE NUMBER VERIFIED
              </div>
              <h1 className="font-display text-2xl font-extrabold text-white mt-3">
                Clearance Granted
              </h1>
              <p className="text-zinc-300 text-xs mt-2 leading-relaxed">
                Your phone identity <span className="text-white font-mono font-bold">{phone}</span> is securely authenticated. You have unlocked complete access to the RABINJA Projex showcase, voting, and NEX AI simulator.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
              <button
                onClick={() => router.push('/explore')}
                className="btn btn-primary w-full py-3 justify-center text-sm font-bold shadow-[0_0_20px_rgba(0,212,255,0.4)]"
              >
                <span>Enter Projex Platform</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => router.push('/nex')}
                className="btn btn-secondary w-full py-2.5 justify-center text-xs"
              >
                <Sparkles size={14} className="text-cyan-400" />
                <span>Open NEX AI Simulator</span>
              </button>
            </div>
          </div>
        )}

        {status === 'invalid' && (
          <div className="space-y-5">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto">
              <Smartphone size={24} />
            </div>
            <h1 className="font-display text-xl font-bold text-white">
              Invalid or Expired Link
            </h1>
            <p className="text-zinc-400 text-xs">
              No verification credentials detected in link. Enter your phone number to generate a fresh verification link.
            </p>
            <Link href="/auth/signup" className="btn btn-primary w-full justify-center text-xs">
              Request Verification Code
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center text-cyan-400 font-mono text-sm">
        INITIALIZING SECURITY HANDSHAKE...
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
