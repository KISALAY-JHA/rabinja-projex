'use client';

import React, { useState } from 'react';
import { Heart, ShieldCheck, ChevronDown, Plus, AlertCircle, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'What is Profile Health?',
    a: 'Profile Health is an automated trust index measuring your account standing, submission integrity, and compliance with the RABINJA Projex community guidelines.',
  },
  {
    q: 'What types of content can result in a strike?',
    a: 'Submitting plagiarized repositories without attribution, submitting fake or non-functional demo links, deploying harmful code, spamming discussions, or attempting to manipulate NEX AI evaluation prompts.',
  },
  {
    q: 'How does the strike system work?',
    a: 'Strikes are issued following community flag verification or automated audit failures. Each strike places your account under increased scrutiny.',
  },
  {
    q: 'What happens when I receive my first strike?',
    a: 'Your first strike issues an official warning, temporarily locks username modifications for 60 days, and marks your pending submissions for manual review.',
  },
  {
    q: 'What are the penalties for subsequent strikes?',
    a: 'A 2nd strike revokes hackathon voting privileges and NEX fast-track badges. A 3rd strike results in permanent exclusion from Rabinjathons and project delisting.',
  },
  {
    q: 'Are strikes permanent?',
    a: 'Strikes for severe copyright or code plagiarism remain permanently. Minor infractions may be appealed or expunged after 180 days of verified good standing.',
  },
  {
    q: 'Can I appeal or remove a strike from my account?',
    a: 'Yes. You can submit an appeal through help@rabinja.com with cryptographic git commit logs or verification proof within 14 days of strike issuance.',
  },
  {
    q: 'How can I avoid receiving strikes?',
    a: 'Ensure all team members are appropriately credited, include genuine open-source licenses, verify that demo endpoints are live, and respect discussion norms.',
  },
  {
    q: 'Where can I view my Profile Health status?',
    a: 'Your Profile Health status is always visible here in your profile hub and in the Account & Options drawer.',
  },
];

export function ProfileHealthTab() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto animate-fade-in pb-10">
      {/* Information Header */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 text-xs text-zinc-400 leading-relaxed">
        <AlertCircle size={16} className="text-zinc-400 shrink-0 mt-0.5" />
        <p>
          Strikes are issued when repositories or discussions violate community and hackathon integrity guidelines. Strikes remain permanently on your node record.
        </p>
      </div>

      {/* Emerald Green Good Standing Card (Moctale Screen 2 Style) */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-emerald-950/25 to-zinc-950 border border-emerald-500/40 flex items-center gap-3.5 shadow-lg shadow-emerald-950/20">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
          <Heart size={20} className="fill-emerald-400/30" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-emerald-300">
            Your account is in good standing
          </h3>
          <p className="text-xs text-emerald-400/80 mt-0.5">
            No active strikes recorded. All builder privileges and NEX voting active.
          </p>
        </div>
      </div>

      {/* Active Strikes Card */}
      <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
            Active Strikes (0)
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
            CLEAN RECORD
          </span>
        </div>
        <p className="text-xs text-zinc-500 mt-2">
          No strikes on file. Keep building with integrity!
        </p>
      </div>

      {/* Frequently Asked Questions (Moctale 1-9 Accordion Style) */}
      <div className="pt-2">
        <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 px-1">
          Frequently Asked Questions
        </h4>

        <div className="divide-y divide-zinc-900 border border-zinc-800/90 rounded-2xl bg-zinc-950 overflow-hidden">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left text-xs font-semibold text-zinc-200 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3 pr-2">
                    <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-mono text-zinc-400 shrink-0">
                      {idx + 1}
                    </span>
                    <span>{faq.q}</span>
                  </div>
                  <div className="shrink-0 text-zinc-500">
                    <Plus size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-45 text-cyan-400' : ''}`} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-zinc-400 leading-relaxed border-t border-zinc-900 bg-black/40 animate-fade-in pl-11">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
