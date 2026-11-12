'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Phone, ArrowRight, Shield, ChevronLeft, Sparkles, Loader2,
  CheckCircle2, User, AtSign, Smartphone, MessageSquare, ExternalLink,
  Copy, Check
} from 'lucide-react';

type Step = 'phone' | 'otp' | 'profile';

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [verifyLink, setVerifyLink] = useState('');
  const [otp, setOtp] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showSimulatedSms, setShowSimulatedSms] = useState(false);

  const fullPhone = `${countryCode} ${phone.replace(/\D/g, '')}`;

  function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    const cleanNum = phone.replace(/\D/g, '');
    if (cleanNum.length < 10) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      // Generate genuine random 6-digit code
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://rabinja-projex.rabinjasquad.workers.dev';
      const link = `${origin}/auth/verify?phone=${encodeURIComponent(countryCode + cleanNum)}&code=${randomCode}`;

      setGeneratedOtp(randomCode);
      setVerifyLink(link);
      setStep('otp');
      setLoading(false);
      setShowSimulatedSms(true);
    }, 800);
  }

  function handleAutoVerifyWithCode(codeToUse: string) {
    setOtp(codeToUse);
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (codeToUse === generatedOtp) {
        setStep('profile');
        setShowSimulatedSms(false);
      } else {
        setError('Invalid verification code.');
      }
      setLoading(false);
    }, 600);
  }

  function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Enter the 6-digit verification code.');
      return;
    }
    if (otp !== generatedOtp) {
      setError('Code does not match. Use the generated OTP or click the verification link.');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setStep('profile');
      setLoading(false);
    }, 600);
  }

  function handleCompleteProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!displayName.trim()) { setError('Display name is required.'); return; }
    if (!username.trim() || !/^[a-z0-9_]{3,20}$/.test(username)) {
      setError('Username must be 3-20 chars (lowercase letters, numbers, underscores).');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      const userSession = {
        phone: fullPhone,
        verified: true,
        displayName: displayName.trim(),
        username: username.trim(),
        teamName: teamName.trim() || null,
        verifiedAt: new Date().toISOString(),
      };
      localStorage.setItem('rabinja_auth_user', JSON.stringify(userSession));
      window.dispatchEvent(new Event('rabinja-auth-change'));
      router.push('/explore');
    }, 700);
  }

  const copyVerifyLink = () => {
    navigator.clipboard.writeText(verifyLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const STEPS = ['phone', 'otp', 'profile'] as const;
  const stepIdx = STEPS.indexOf(step);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-grid py-12 px-4 relative overflow-x-hidden">
      {/* ── SIMULATED INCOMING SMS NOTIFICATION POP-IN (Serious Mecha Anime HUD) ── */}
      {showSimulatedSms && (
        <div className="fixed top-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[9990] animate-bounce-in">
          <div className="card p-4 bg-[#05070E] border-2 border-cyan-400 shadow-[0_0_40px_rgba(0,212,255,0.4)] rounded-2xl relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-400 flex items-center justify-center shrink-0">
                <MessageSquare size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                    // INCOMING SMS • NOW
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                </div>
                <p className="text-white text-xs font-semibold mt-1">
                  RABINJA SECURITY: OTP is <span className="text-cyan-400 font-mono font-extrabold text-sm">{generatedOtp}</span>
                </p>
                <div className="flex items-center gap-2 mt-2.5">
                  <button
                    onClick={() => handleAutoVerifyWithCode(generatedOtp)}
                    className="btn btn-primary text-xs py-1 px-3 shadow-md"
                  >
                    Auto-Fill & Verify
                  </button>
                  <button
                    onClick={() => setShowSimulatedSms(false)}
                    className="text-xs text-zinc-400 hover:text-white px-2 py-1"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background glow orbs */}
      <div className="glow-orb w-96 h-96 bg-cyan-500 -top-20 left-1/2 -translate-x-1/2 opacity-10 fixed" />
      <div className="glow-orb w-72 h-72 bg-blue-600 bottom-20 right-10 opacity-10 fixed" />

      <div className="w-full max-w-md relative z-10">
        {/* Back link */}
        {step !== 'phone' && (
          <button
            onClick={() => { setStep(step === 'otp' ? 'phone' : 'otp'); setError(''); }}
            className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors mb-4 uppercase tracking-wider"
          >
            <ChevronLeft size={16} /> [ BACK TO PREVIOUS STAGE ]
          </button>
        )}

        {/* Card */}
        <div className="card p-6 sm:p-8 bg-[#05070E] border border-cyan-500/30 shadow-[0_0_50px_rgba(0,212,255,0.15)] rounded-2xl relative">
          {/* Logo & HUD Title */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-400/40 bg-black shrink-0">
                <img src="/logo.png" alt="RABINJA" className="w-full h-full object-cover" />
              </div>
              <span className="font-display font-bold text-white text-base">
                RABINJA <span className="text-cyan-400">: Projex</span>
              </span>
            </Link>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 font-bold">
              AUTH // NODE 01
            </span>
          </div>

          {/* Step Progress Tracker */}
          <div className="flex items-center gap-2 mb-6">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-bold border transition-all ${
                    i < stepIdx
                      ? 'bg-emerald-500 border-emerald-500 text-black'
                      : i === stepIdx
                      ? 'border-cyan-400 text-cyan-400 bg-cyan-500/15 shadow-[0_0_10px_rgba(0,212,255,0.4)]'
                      : 'border-zinc-800 text-zinc-600'
                  }`}
                >
                  {i < stepIdx ? <CheckCircle2 size={13} /> : i + 1}
                </div>
                {i < 2 && (
                  <div className={`flex-1 h-0.5 transition-all ${i < stepIdx ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
                )}
              </div>
            ))}
          </div>

          {/* ── STAGE 1: PHONE INPUT ── */}
          {step === 'phone' && (
            <>
              <div className="mb-6">
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-1 font-bold">
                  // IDENTITY REGISTRATION
                </div>
                <h1 className="font-display text-2xl font-extrabold text-white">
                  Enter Mobile Number
                </h1>
                <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">
                  We generate an instant secure verification link and 6-digit OTP to authenticate your squad node.
                </p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5 tracking-wider">
                    Country Region
                  </label>
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="input mb-3 text-xs bg-zinc-900/80 border-zinc-800 text-white"
                  >
                    <option value="+91">🇮🇳 India (+91)</option>
                    <option value="+1">🇺🇸 United States (+1)</option>
                    <option value="+44">🇬🇧 United Kingdom (+44)</option>
                    <option value="+971">🇦🇪 UAE (+971)</option>
                    <option value="+65">🇸🇬 Singapore (+65)</option>
                  </select>

                  <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5 tracking-wider">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="input pl-9 text-sm font-mono tracking-wider bg-zinc-900/80 border-zinc-800 text-white focus:border-cyan-400"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-rose-400 flex items-center gap-1.5 font-mono">
                    <Shield size={13} /> {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full py-3 justify-center text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(0,212,255,0.35)]"
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      GENERATING VERIFICATION LINK...
                    </>
                  ) : (
                    <>
                      <span>Generate Verification Code & Link</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* ── STAGE 2: OTP & ONE-CLICK VERIFICATION LINK ── */}
          {step === 'otp' && (
            <>
              <div className="mb-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-1 font-bold">
                  // TRANSMISSION CODE
                </div>
                <h1 className="font-display text-2xl font-extrabold text-white">
                  Verify Your Phone
                </h1>
                <p className="text-zinc-400 text-xs mt-1">
                  Sent to <strong className="text-white font-mono">{fullPhone}</strong>
                </p>
              </div>

              {/* 1-Click Verification Card */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-400/40 mb-5">
                <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider mb-2 flex items-center justify-between">
                  <span>⚡ 1-Click Verification Link</span>
                  <span className="text-xs text-white font-mono bg-cyan-500/20 px-2 py-0.5 rounded">
                    CODE: {generatedOtp}
                  </span>
                </div>
                <p className="text-zinc-300 text-xs leading-relaxed mb-3">
                  Click the link below to verify your phone number in 1 tap and instantly unlock Projex:
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href={verifyLink}
                    className="btn btn-primary text-xs py-2 justify-center font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                  >
                    <span>Click to Verify Phone Now</span>
                    <ExternalLink size={13} />
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyVerifyLink}
                      className="btn btn-secondary text-[11px] py-1.5 flex-1 justify-center gap-1.5"
                    >
                      {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copied ? 'Link Copied!' : 'Copy Verification Link'}</span>
                    </button>

                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Verify my RABINJA Projex node with code ${generatedOtp}: ${verifyLink}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary text-[11px] py-1.5 px-3 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Manual OTP fallback */}
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
                      Or Enter 6-Digit Code
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAutoVerifyWithCode(generatedOtp)}
                      className="text-[10px] font-mono text-cyan-400 hover:underline"
                    >
                      Auto-fill ({generatedOtp})
                    </button>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="• • • • • •"
                    className="input text-center text-xl font-mono tracking-[0.4em] bg-zinc-900 border-zinc-800 text-cyan-400 focus:border-cyan-400"
                    autoFocus
                  />
                </div>

                {error && (
                  <p className="text-xs text-rose-400 flex items-center gap-1.5 font-mono">
                    <Shield size={13} /> {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="btn btn-secondary w-full py-2.5 justify-center text-xs font-bold uppercase tracking-widest"
                >
                  {loading ? 'CONFIRMING...' : 'Confirm OTP Code'}
                </button>
              </form>
            </>
          )}

          {/* ── STAGE 3: SQUAD PROFILE SETUP ── */}
          {step === 'profile' && (
            <>
              <div className="mb-6">
                <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 mb-1 font-bold">
                  // CLEARANCE GRANTED ✓
                </div>
                <h1 className="font-display text-2xl font-extrabold text-white">
                  Setup Squad Handle
                </h1>
                <p className="text-zinc-400 text-xs mt-1">
                  Verified with: <strong className="text-white font-mono">{fullPhone}</strong>
                </p>
              </div>

              <form onSubmit={handleCompleteProfile} className="space-y-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1 tracking-wider">
                    Innovator Full Name
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Kisalay Jha"
                      className="input pl-9 text-xs bg-zinc-900 border-zinc-800 text-white"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1 tracking-wider">
                    Username Handle
                  </label>
                  <div className="relative">
                    <AtSign size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      placeholder="kisalay_innovator"
                      className="input pl-9 text-xs font-mono bg-zinc-900 border-zinc-800 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1 tracking-wider">
                    Team Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Rabinja Core"
                    className="input text-xs bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>

                {error && (
                  <p className="text-xs text-rose-400 flex items-center gap-1.5 font-mono">
                    <Shield size={13} /> {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full py-3 justify-center text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                >
                  {loading ? 'FINALIZING...' : 'Complete Registration & Access Projex'}
                </button>
              </form>
            </>
          )}

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
            <span className="text-[11px] text-zinc-500">
              Already verified?{' '}
              <Link href="/auth/login" className="text-cyan-400 hover:underline font-semibold">
                Sign in with Phone
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
