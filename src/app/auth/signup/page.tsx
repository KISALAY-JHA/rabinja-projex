'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Phone, ArrowRight, Shield, ChevronLeft, Sparkles, Loader2, CheckCircle2, User, AtSign, Users } from 'lucide-react';

type Step = 'phone' | 'otp' | 'profile';

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const fullPhone = `${countryCode}${phone.replace(/\D/g, '')}`;

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setError('Enter a valid 10-digit phone number.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      // TODO: Supabase phone OTP
      // const { error } = await supabase.auth.signInWithOtp({ phone: fullPhone });
      await new Promise((r) => setTimeout(r, 1200)); // Simulate API call
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
    if (otp.length !== 6) {
      setError('Enter the 6-digit OTP.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      // TODO: Supabase OTP verification
      // const { error } = await supabase.auth.verifyOtp({ phone: fullPhone, token: otp, type: 'sms' });
      await new Promise((r) => setTimeout(r, 1000));
      setStep('profile');
    } catch {
      setError('Invalid OTP. Try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCompleteProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!displayName.trim()) { setError('Display name is required.'); return; }
    if (!username.trim() || !/^[a-z0-9_]{3,20}$/.test(username)) {
      setError('Username must be 3-20 chars, lowercase letters, numbers, underscores only.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      // TODO: Insert profile into Supabase
      await new Promise((r) => setTimeout(r, 1000));
      router.push('/explore');
    } catch {
      setError('Failed to create profile. Try again.');
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

  const STEPS = ['phone', 'otp', 'profile'] as const;
  const stepIdx = STEPS.indexOf(step);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary bg-grid py-12 px-4">
      {/* Background glow orbs */}
      <div className="glow-orb w-96 h-96 bg-purple-500 -top-20 left-1/2 -translate-x-1/2 opacity-10 fixed" />
      <div className="glow-orb w-72 h-72 bg-blue-500 bottom-20 right-10 opacity-10 fixed" />

      <div className="w-full max-w-md relative z-10">
        {/* Back link */}
        {step !== 'phone' && (
          <button
            onClick={() => { setStep(step === 'otp' ? 'phone' : 'otp'); setError(''); }}
            className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-white transition-colors mb-6"
          >
            <ChevronLeft size={16} /> Back
          </button>
        )}

        {/* Card */}
        <div className="card border-gradient p-8 md:p-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-white">RABINJA <span className="gradient-brand">Projex</span></span>
          </div>

          {/* Step progress */}
          <div className="flex items-center gap-2 mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                    i < stepIdx
                      ? 'bg-[var(--green)] border-[var(--green)] text-white'
                      : i === stepIdx
                      ? 'border-[var(--purple)] text-[var(--purple)] bg-[rgba(168,85,247,0.1)]'
                      : 'border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                >
                  {i < stepIdx ? <CheckCircle2 size={14} /> : i + 1}
                </div>
                {i < 2 && (
                  <div className={`flex-1 h-px transition-all ${i < stepIdx ? 'bg-[var(--green)]' : 'bg-[var(--border)]'}`} />
                )}
              </div>
            ))}
          </div>

          {/* ── Step 1: Phone ── */}
          {step === 'phone' && (
            <>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                Create your account
              </h1>
              <p className="text-[var(--text-muted)] text-sm mb-8">
                We&apos;ll send a one-time code to verify your number.
              </p>
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label htmlFor="phone-country">Country Code</label>
                  <select
                    id="phone-country"
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
                  <label htmlFor="phone-number">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      id="phone-number"
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
                  id="signup-send-otp-btn"
                  disabled={loading}
                  className="btn btn-primary w-full justify-center btn-lg"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <>Send OTP <ArrowRight size={16} /></>}
                </button>
              </form>
              <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-[var(--purple)] hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </>
          )}

          {/* ── Step 2: OTP ── */}
          {step === 'otp' && (
            <>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                Verify your number
              </h1>
              <p className="text-[var(--text-muted)] text-sm mb-8">
                We sent a 6-digit code to{' '}
                <strong className="text-white font-mono">{countryCode} {phone}</strong>
              </p>
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <label htmlFor="otp-code">Enter OTP</label>
                  <input
                    id="otp-code"
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
                  id="signup-verify-otp-btn"
                  disabled={loading || otp.length !== 6}
                  className="btn btn-primary w-full justify-center btn-lg"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <>Verify Code <ArrowRight size={16} /></>}
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

          {/* ── Step 3: Profile ── */}
          {step === 'profile' && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={18} className="text-[var(--green)]" />
                <span className="text-[var(--green)] text-sm font-semibold">Phone verified!</span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                Set up your profile
              </h1>
              <p className="text-[var(--text-muted)] text-sm mb-8">
                Almost done! Tell us who you are.
              </p>
              <form onSubmit={handleCompleteProfile} className="space-y-5">
                <div>
                  <label htmlFor="display-name">Full Name *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      id="display-name"
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Arjun Sharma"
                      className="input pl-9"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="username">Username * <span className="text-[var(--text-muted)] normal-case font-normal">(3–20 chars, no spaces)</span></label>
                  <div className="relative">
                    <AtSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      placeholder="arjun_builds"
                      className="input pl-9 font-mono"
                      required
                      maxLength={20}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="team-name">
                    Team Name <span className="text-[var(--text-muted)] normal-case font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      id="team-name"
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="RABINJA Dev Team"
                      className="input pl-9"
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
                  id="signup-complete-btn"
                  disabled={loading}
                  className="btn btn-primary w-full justify-center btn-lg"
                >
                  {loading
                    ? <Loader2 size={18} className="animate-spin" />
                    : <>Complete Setup <ArrowRight size={16} /></>
                  }
                </button>
              </form>
            </>
          )}
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-white">Terms</Link> and{' '}
          <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
