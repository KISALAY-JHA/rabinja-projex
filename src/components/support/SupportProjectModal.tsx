'use client';

import React, { useState } from 'react';
import {
  Heart,
  DollarSign,
  CreditCard,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  X,
  Sparkles,
  QrCode,
  AlertCircle
} from 'lucide-react';

interface SupportProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  teamName: string;
  payoutConfig?: {
    razorpayLink?: string;
    paypalMe?: string;
    upiId?: string;
  };
}

const PRESET_AMOUNTS_INR = [100, 250, 500, 1000, 2500];

export function SupportProjectModal({
  isOpen,
  onClose,
  projectTitle,
  teamName,
  payoutConfig = {}
}: SupportProjectModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [supportSuccess, setSupportSuccess] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorNote, setDonorNote] = useState('');

  if (!isOpen) return null;

  // Defaults if creator hasn't set their custom gateway yet
  const razorpayUrl = payoutConfig.razorpayLink || `https://pages.razorpay.com/pl_rabinja_support`;
  const paypalUrl = payoutConfig.paypalMe
    ? (payoutConfig.paypalMe.startsWith('http') ? payoutConfig.paypalMe : `https://paypal.me/${payoutConfig.paypalMe}`)
    : `https://paypal.me/rabinjasquad`;
  const upiId = payoutConfig.upiId || 'rabinjasquad@upi';

  const amountToPay = customAmount ? parseFloat(customAmount) || selectedAmount : selectedAmount;

  const handleConfirmSupport = (method: 'razorpay' | 'paypal' | 'upi') => {
    // Record genuine supporter contribution locally
    const stored = localStorage.getItem('rabinja_project_donations') || '[]';
    try {
      const arr = JSON.parse(stored);
      arr.push({
        projectTitle,
        teamName,
        amount: amountToPay,
        method,
        donorName: donorName || 'Anonymous Supporter',
        donorNote,
        date: new Date().toISOString()
      });
      localStorage.setItem('rabinja_project_donations', JSON.stringify(arr));
    } catch {}

    if (method === 'paypal') {
      window.open(`${paypalUrl}/${Math.round(amountToPay / 85)}USD`, '_blank');
    } else if (method === 'razorpay') {
      window.open(razorpayUrl, '_blank');
    }

    setSupportSuccess(true);
    setTimeout(() => {
      setSupportSuccess(false);
      onClose();
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in text-left">
      <div className="relative w-full max-w-lg bg-[#05070E] border-2 border-rose-500/40 rounded-3xl p-5 sm:p-6 shadow-[0_0_60px_rgba(244,63,94,0.25)] space-y-4 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-400 text-rose-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.35)]">
              <Heart size={20} className="fill-rose-500/30" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold">
                  // INNOVATION FUEL
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-500/40">
                  Direct Backing
                </span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-white">
                Back {projectTitle}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>

        {supportSuccess ? (
          <div className="p-6 text-center space-y-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 size={28} />
            </div>
            <h4 className="font-display font-bold text-white text-base">
              Thank You for Fueling Innovation!
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Your contribution of <strong className="text-emerald-400">₹{amountToPay}</strong> directly empowers the <strong className="text-white">{teamName}</strong> squad to build, manufacture, and scale their prototype.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Direct Payout Guarantee Notice */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-950/30 via-black to-zinc-950 border border-rose-500/30 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-rose-300 font-mono font-bold text-[11px]">
                <ShieldCheck size={14} className="text-rose-400 shrink-0" />
                <span>100% DIRECT BUILDER REVENUE POLICY</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                RABINJA Projex takes <strong>0% platform cut</strong> from direct supporter funding. 100% of your money goes straight to the team (less standard payment gateway card/UPI fees and GST charged by Razorpay / PayPal).
              </p>
            </div>

            {/* Choose Amount */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Select Support Amount (INR)
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {PRESET_AMOUNTS_INR.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="pt-1">
                <input
                  type="number"
                  placeholder="Or enter custom amount in ₹..."
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>

            {/* Supporter Note */}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Your Name / Handle (Optional)"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-sans"
              />
              <textarea
                rows={2}
                placeholder="Encouraging note to the founders... (Optional)"
                value={donorNote}
                onChange={(e) => setDonorNote(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-sans"
              />
            </div>

            {/* Payment Methods */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Pay Securely via:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Razorpay (UPI, Cards, Netbanking in India) */}
                <button
                  type="button"
                  onClick={() => handleConfirmSupport('razorpay')}
                  className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-400 text-left transition-all group flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <CreditCard size={14} className="text-blue-400" />
                      <span>Razorpay / UPI</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">GPay, PhonePe, Paytm, Cards</span>
                  </div>
                  <ExternalLink size={13} className="text-blue-400 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* PayPal (Global Supporters, USD/EUR) */}
                <button
                  type="button"
                  onClick={() => handleConfirmSupport('paypal')}
                  className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 hover:border-amber-400 text-left transition-all group flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <DollarSign size={14} className="text-amber-400" />
                      <span>PayPal Global</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">USD, EUR, International Cards</span>
                  </div>
                  <ExternalLink size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Direct UPI VPA Display */}
              <div className="p-2.5 rounded-xl bg-black border border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                <span>Direct UPI VPA: <strong className="text-cyan-400">{upiId}</strong></span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(upiId);
                    alert(`UPI ID ${upiId} copied to clipboard!`);
                  }}
                  className="text-[10px] text-zinc-300 hover:text-white underline"
                >
                  Copy VPA
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
