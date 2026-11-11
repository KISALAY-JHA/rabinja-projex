'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Phone, ArrowRight, Shield, ChevronLeft, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

type Step = 'phone' | 'otp';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setError('Enter a valid 10-digit phone number.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setStep('otp');
      startResendCooldown();
    } catch {
      setError('Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) { setError('Enter the 6-digit OTP.'); return; }
    setError('');
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      router.push('/explore');
    } catch {
      setError('Invalid OTP. Try again.');
    } finally {
      setLoading(false);
    }
  }

  function startResendCooldown() {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((c) => {
        if (c <= 1) { clearInterval(interval); return 0; }
        return c - 1;
      });
    }, 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary bg-grid py-12 px-4">
      <div className="glow-orb w-96 h-96 bg-blue-500 top-0 right-0 opacity-10 fixed" />
      <div className="glow-orb w-72 h-72 bg-purple-500 bottom-20 left-10 opacity-10 fixed" />

      <div className="w-full max-w-md relative z-10">
        {step === 'otp' && (
          <button
            onClick={() => { setStep('phone'); setError(''); }}
            className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-white transition-colors mb-6"
          >
            <ChevronLeft size={16} /> Back
          </button>
        )}

        <div className="card border-gradient p-8 md:p-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-white">RABINJA <span className="gradient-brand">Projex</span></span>
          </div>

          {step === 'phone' ? (
            <>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome back
              </h1>
              <p className="text-[var(--text-muted)] text-sm mb-8">
                Sign in with your phone number.
              </p>

              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label htmlFor="login-country">Country Code</label>
                  <select
                    id="login-country"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="input mb-3"
                  >
                    <option value="+91">🇮🇳 India (+91)</option>
                    <option value="+1">🇺🇸 USA (+1)</option>
                    <option value="+44">🇬🇧 UK (+44)</option>
                    <option value="+971">🇦🇪 UAE (+971)</option>
                    <option value="+65">🇸🇬 Singapore (+65)</option>
                  </select>
                  <label htmlFor="login-phone">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      id="login-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="input input-phone pl-9"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-[var(--red)] flex items-center gap-2">
                    <Shield size={14} /> {error}
                  </p>
                )}

                <button
                  type="submit"
                  id="login-send-otp-btn"
                  disabled={loading}
                  className="btn btn-primary w-full justify-center btn-lg"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <>Send OTP <ArrowRight size={16} /></>}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
                Don&apos;t have an account?{' '}
                <Link href="/auth/signup" className="text-[var(--purple)] hover:underline font-medium">
                  Create one
                </Link>
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={18} className="text-[var(--green)]" />
                <span className="text-[var(--green)] text-sm font-semibold">OTP sent!</span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                Enter your code
              </h1>
              <p className="text-[var(--text-muted)] text-sm mb-8">
                Sent to <strong className="text-white font-mono">{countryCode} {phone}</strong>
              </p>

              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <label htmlFor="login-otp">6-Digit OTP</label>
                  <input
                    id="login-otp"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="••••••"
                    className="input input-otp"
                    autoFocus
                    required
                  />
                </div>

                {error && (
                  <p className="text-sm text-[var(--red)] flex items-center gap-2">
                    <Shield size={14} /> {error}
                  </p>
                )}

                <button
                  type="submit"
                  id="login-verify-otp-btn"
                  disabled={loading || otp.length !== 6}
                  className="btn btn-primary w-full justify-center btn-lg"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <>Sign In <ArrowRight size={16} /></>}
                </button>

                <div className="text-center text-sm text-[var(--text-muted)]">
                  {resendCooldown > 0 ? (
                    <span>Resend in <strong className="font-mono text-white">{resendCooldown}s</strong></span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-[var(--purple)] hover:underline font-medium"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
          Protected by RABINJA Security · End-to-end encrypted
        </p>
      </div>
    </div>
  );
}
