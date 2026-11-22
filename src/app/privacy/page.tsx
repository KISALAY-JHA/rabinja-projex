import React from 'react';
import Link from 'next/link';
import { Shield, ChevronLeft, EyeOff, Database, Server, UserCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-6 pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-white transition-colors">
          <ChevronLeft size={14} /> Back to Projex Home
        </Link>

        <div className="border-b border-zinc-800 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold uppercase mb-2">
            // DATA SOVEREIGNTY & PRIVACY
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-mono">
            Zero Spyware • No Code Harvesters • Local Pitch Recording Sovereignty
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
          {/* Section 1 */}
          <section className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <EyeOff size={18} className="text-cyan-400" />
              1. Zero Secret Code Extraction
            </h2>
            <p>
              We believe code theft is the biggest fear of young engineers. RABINJA Projex will never scrape, clone, read, or train AI models on your private source code repositories without explicit consent. Video walkthroughs and working prototypes are your proof of execution.
            </p>
          </section>

          {/* Section 2 */}
          <section className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Server size={18} className="text-purple-400" />
              2. Local Practice Recording Privacy (0 Cloud Uploads)
            </h2>
            <p>
              When practicing your pitch inside the NEX AI Studio, video and audio streams are processed in-browser. Any practice recordings you make are saved strictly to your local computer / phone storage via the HTML5 MediaStream API. <strong>Zero video bytes are uploaded to our backend servers or third-party cloud buckets.</strong>
            </p>
          </section>

          {/* Section 3 */}
          <section className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck size={18} className="text-emerald-400" />
              3. Phone Authentication & Data Minimization
            </h2>
            <p>
              We collect your phone number exclusively for authentic identity verification, one-time OTP login, and account recovery. We do not sell your contact information to data brokers, telemetry trackers, or marketing syndicates.
            </p>
          </section>

          {/* Section 4 */}
          <section className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Database size={18} className="text-amber-400" />
              4. Cookies & Advertisements
            </h2>
            <p>
              We may display contextual technology advertisements through Google AdSense to sustain free platform operations. These services utilize standard browser cookies to serve relevant tech & engineering sponsorships. You can control cookie preferences in your browser at any time.
            </p>
          </section>

          <div className="pt-4 text-center text-xs font-mono text-zinc-500">
            Privacy inquiries & data deletion requests: <span className="text-cyan-400">rabinjathon@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
