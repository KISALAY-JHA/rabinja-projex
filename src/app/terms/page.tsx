import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronLeft, Scale, Lock, Heart, Award, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-6 pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-white transition-colors">
          <ChevronLeft size={14} /> Back to Projex Home
        </Link>

        <div className="border-b border-zinc-800 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold uppercase mb-2">
            // LEGAL & INNOVATION CHARTER
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-mono">
            Effective Date: November 2026 • Platform: RABINJA Projex (by RABINJA SQUAD)
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
          {/* Section 1 */}
          <section className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck size={18} className="text-cyan-400" />
              1. Intellectual Property & No Mandatory Source Code Disclosure
            </h2>
            <p>
              RABINJA Projex is designed with builder IP security as a core principle. Innovators retain 100% full legal ownership of their inventions, codebases, hardware designs, and trade secrets.
            </p>
            <p className="text-zinc-400">
              Unlike traditional platforms, <strong>no public source code repository disclosure is ever mandatory</strong>. You are only required to demonstrate working models, explainers, or architecture walkthroughs. You are encouraged to keep your proprietary algorithmic logic and &quot;secret sauce&quot; completely private.
            </p>
          </section>

          {/* Section 2 */}
          <section className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Scale size={18} className="text-amber-400" />
              2. Copyright Examination & Anti-Frivolous Claim Policy (₹100 Fee)
            </h2>
            <p>
              To protect builders against malicious copyright strikes or unsubstantiated takedowns by competitors, filing a formal IP infringement claim requires a <strong>₹100 examination deposit</strong> accompanied by demonstrable evidence.
            </p>
            <p className="text-zinc-400">
              The project accused does not pay any fee. Our expert technical squad audits the claim within 7 working days. If the claim is verified as legitimate, the examination deposit is credited toward the claimant as an honor of good innovation guardianship.
            </p>
          </section>

          {/* Section 3 */}
          <section className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Heart size={18} className="text-rose-400" />
              3. Direct Supporter Funding & Payout Policy (0% Cut)
            </h2>
            <p>
              Public supporters, venture scouts, and enthusiasts can directly back project teams using Razorpay, PayPal, or UPI.
            </p>
            <p className="text-zinc-400">
              <strong>Rabinja Projex deducts 0% platform fee</strong> from direct user funding contributions. 100% of supporter payments flow straight to the team&apos;s registered gateway (less standard processor transaction rates and statutory taxes charged by Razorpay or PayPal).
            </p>
          </section>

          {/* Section 4 */}
          <section className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Lock size={18} className="text-emerald-400" />
              4. Phone-Verified Proof of Humanity
            </h2>
            <p>
              All builder identities, upvotes, ratings, and peer discussions require verified mobile phone node authentication. Disposable email addresses, bot rings, and coordinated voting cartels are strictly prohibited and result in permanent node revocation.
            </p>
          </section>

          {/* Section 5 */}
          <section className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Award size={18} className="text-purple-400" />
              5. Government & Policy Showcase Representation
            </h2>
            <p>
              Grassroots projects that achieve verified public traction may be audited by Rabinja Labs for inclusion in the National Innovation Dossier presented to Government Innovation Missions, DST, and state incubation funds. Participation in showcase delegations is subject to technical verification.
            </p>
          </section>

          <div className="pt-4 text-center text-xs font-mono text-zinc-500">
            For legal inquiries or dispute arbitration, contact: <span className="text-cyan-400">rabinjathon@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
