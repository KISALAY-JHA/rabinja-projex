'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Phone, ArrowRight, Shield, ChevronLeft, Loader2,
  ExternalLink, MessageSquare, Check, Copy
} from 'lucide-react';

type Step = 'phone' | 'otp';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [verifyLink, setVerifyLink] = useState('');
  const [otp, setOtp] = useState('');
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
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://rabinja-projex.rabinjasquad.workers.dev';
      const link = `${origin}/auth/verify?phone=${encodeURIComponent(countryCode + cleanNum)}&code=${randomCode}`;

      setGeneratedOtp(randomCode);
      setVerifyLink(link);
      setStep('otp');
      setLoading(false);
      setShowSimulatedSms(true);
    }, 700);
  }

  function handleAutoVerifyWithCode(codeToUse: string) {
    setOtp(codeToUse);
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (codeToUse === generatedOtp) {
        completeLogin();
      } else {
        setError('Invalid verification code.');
        setLoading(false);
      }
    }, 500);
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
      completeLogin();
    }, 500);
  }

  function completeLogin() {
    const userSession = {
      phone: fullPhone,
      verified: true,
      displayName: `Innovator ${phone.slice(-4)}`,
      username: `user_${phone.replace(/\D/g, '').slice(-4)}`,
      verifiedAt: new Date().toISOString(),
    };
    localStorage.setItem('rabinja_auth_user', JSON.stringify(userSession));
    window.dispatchEvent(new Event('rabinja-auth-change'));
    router.push('/explore');
  }

  const copyVerifyLink = () => {
    navigator.clipboard.writeText(verifyLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-grid py-12 px-4 relative overflow-x-hidden">
      {/* ── SIMULATED INCOMING SMS NOTIFICATION POP-IN ── */}
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
                  RABINJA ACCESS: OTP is <span className="text-cyan-400 font-mono font-extrabold text-sm">{generatedOtp}</span>
                </p>
                <div className="flex items-center gap-2 mt-2.5">
                  <button
                    onClick={() => handleAutoVerifyWithCode(generatedOtp)}
                    className="btn btn-primary text-xs py-1 px-3 shadow-md"
                  >
                    Auto-Fill & Access
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

      {/* Ambient glow */}
      <div className="glow-orb w-96 h-96 bg-cyan-500/10 top-0 right-0 fixed" />
      <div className="glow-orb w-72 h-72 bg-blue-600/10 bottom-20 left-10 fixed" />

      <div className="w-full max-w-md relative z-10">
        {step === 'otp' && (
          <button
            onClick={() => { setStep('phone'); setError(''); }}
            className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors mb-4 uppercase tracking-wider"
          >
            <ChevronLeft size={16} /> [ BACK TO PHONE ENTRY ]
          </button>
        )}

        <div className="card p-6 sm:p-8 bg-[#05070E] border border-cyan-500/30 shadow-[0_0_50px_rgba(0,212,255,0.15)] rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-400/40 bg-black shrink-0">
                <img src="/logo.png" alt="RABINJA" className="w-full h-full object-cover" />
              </div>
              <span className="font-display font-bold text-white text-base">
                RABINJA <span className="text-cyan-400">: Projex</span>
              </span>
            </Link>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 font-bold">
              SYS // LOGIN
            </span>
          </div>

          {step === 'phone' ? (
            <>
              <div className="mb-6">
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-1 font-bold">
                  // IDENTITY HANDSHAKE
                </div>
                <h1 className="font-display text-2xl font-extrabold text-white">
                  Innovator Sign In
                </h1>
                <p className="text-zinc-400 text-xs mt-1.5">
                  Enter your registered mobile number to receive your login code or 1-tap link.
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
                    className="input mb-3 text-xs bg-zinc-900 border-zinc-800 text-white"
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
                      className="input pl-9 text-sm font-mono tracking-wider bg-zinc-900 border-zinc-800 text-white focus:border-cyan-400"
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
                      TRANSMITTING CODE...
                    </>
                  ) : (
                    <>
                      <span>Transmit Access Code</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="mb-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-1 font-bold">
                  // CODE CONFIRMATION
                </div>
                <h1 className="font-display text-2xl font-extrabold text-white">
                  Enter Login Code
                </h1>
                <p className="text-zinc-400 text-xs mt-1">
                  Sent to <strong className="text-white font-mono">{fullPhone}</strong>
                </p>
              </div>

              {/* 1-Click Verification Card */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-400/40 mb-5">
                <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider mb-2 flex items-center justify-between">
                  <span>⚡ 1-Click Login Link</span>
                  <span className="text-xs text-white font-mono bg-cyan-500/20 px-2 py-0.5 rounded">
                    CODE: {generatedOtp}
                  </span>
                </div>
                <p className="text-zinc-300 text-xs leading-relaxed mb-3">
                  Click below to authenticate instantly:
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href={verifyLink}
                    className="btn btn-primary text-xs py-2 justify-center font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                  >
                    <span>Click to Enter Projex Now</span>
                    <ExternalLink size={13} />
                  </Link>

                  <button
                    onClick={copyVerifyLink}
                    className="btn btn-secondary text-[11px] py-1.5 justify-center gap-1.5"
                  >
                    {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copied ? 'Link Copied!' : 'Copy Verification Link'}</span>
                  </button>
                </div>
              </div>

              {/* Manual OTP */}
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
                  {loading ? 'CONFIRMING...' : 'Sign In'}
                </button>
              </form>
            </>
          )}

          <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
            <span className="text-[11px] text-zinc-500">
              New to RABINJA?{' '}
              <Link href="/auth/signup" className="text-cyan-400 hover:underline font-semibold">
                Register Phone Number
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
