'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { WindowHeader } from '@/components/layout/WindowHeader';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, Clock, Lock, ExternalLink, RefreshCw, Edit3, ShieldAlert, Sparkles, Trophy } from 'lucide-react';
import { SubmissionStatus } from '@/types';

export default function SubmissionStatusPage() {
  const params = useParams();
  const router = useRouter();
  const submissionId = (params?.submissionId as string) || 'sub_1';
  const { submissions } = useApp();

  const submission = submissions.find(s => s.id === submissionId) || submissions[0];

  const stages: { key: SubmissionStatus; label: string; sub: string }[] = [
    { key: 'DRAFT', label: 'DRAFT', sub: 'Local sandbox' },
    { key: 'SUBMITTED', label: 'SUBMITTED', sub: 'Compiled to ledger' },
    { key: 'UNDER REVIEW', label: 'UNDER REVIEW', sub: 'Evaluated by Oracle' },
    { key: 'SHORTLISTED', label: 'SHORTLISTED', sub: 'Finalist selection' },
    { key: 'VERDICT', label: 'VERDICT', sub: 'Prize logic run' }
  ];

  const getStageIndex = (status: SubmissionStatus) => {
    switch (status) {
      case 'DRAFT': return 0;
      case 'SUBMITTED': return 1;
      case 'UNDER REVIEW': return 2;
      case 'SHORTLISTED': return 3;
      case 'VERDICT': return 4;
      default: return 1;
    }
  };

  const currentIndex = getStageIndex(submission.status);

  return (
    <AppLayout>
      <WindowHeader subtag="your build." title="SUBMISSION ORACLE" badge="ACTIVE SYSTEM TRANSMISSION" />

      {/* Main Status Header Card */}
      <div className="bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 md:p-8 mb-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-wider">
              {submission.track}
            </span>
            <h2 className="font-mono text-3xl font-black text-white uppercase mt-1">
              {submission.title}
            </h2>
            <div className="font-mono text-xs text-zinc-500 mt-1">
              ALLIANCE BUILDERS: {submission.teamMembers?.join(', ') || '@hacker_x69'}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-[#18181C] text-[#00E599] border border-[#00E599]/30 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full uppercase">
              STATUS: {submission.status}
            </span>
            {submission.judgement === 'WINNER' && (
              <span className="bg-[#FF5500] text-black font-mono font-black text-xs px-3.5 py-1.5 rounded-full uppercase shadow-[0_0_15px_rgba(255,85,0,0.5)]">
                WINNER 🏆
              </span>
            )}
          </div>
        </div>

        <p className="text-zinc-300 text-sm font-sans leading-relaxed max-w-3xl">
          {submission.description}
        </p>

        {/* Compilation Pipeline Stepper */}
        <div className="pt-6 border-t border-[#1F1F23]">
          <div className="font-mono text-xs text-zinc-500 font-bold uppercase tracking-widest mb-6">
            COMPILATION SEQUENCE
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono">
            {stages.map((st, idx) => {
              const isPast = idx < currentIndex;
              const isCurrent = idx === currentIndex;

              return (
                <div
                  key={st.key}
                  className={`p-4 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-[#18181C] border-[#FF5500] text-white shadow-[0_0_15px_rgba(255,85,0,0.2)]'
                      : isPast
                      ? 'bg-[#121215] border-[#00E599]/40 text-[#00E599]'
                      : 'bg-[#0A0A0C] border-zinc-800 text-zinc-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black">{idx + 1}</span>
                    {isPast || isCurrent ? (
                      <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
                    ) : (
                      <Clock className="w-4 h-4 text-zinc-700" />
                    )}
                  </div>
                  <div className="text-xs font-bold uppercase">{st.label}</div>
                  <div className="text-[10px] text-zinc-500 font-sans mt-0.5">{st.sub}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <Link
            href={`/submit/${submission.hackathonId}`}
            className="bg-[#18181C] hover:bg-[#222228] text-white font-mono font-bold text-xs uppercase px-5 py-3 rounded-xl border border-zinc-700 transition-all flex items-center gap-2"
          >
            <Edit3 className="w-3.5 h-3.5" /> EDIT BLUEPRINT SCHEMATIC
          </Link>
          <button
            onClick={() => alert("Re-deploy triggered! Transmitting latest commit...")}
            className="bg-[#18181C] hover:bg-[#222228] text-white font-mono font-bold text-xs uppercase px-5 py-3 rounded-xl border border-zinc-700 transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" /> FORCE LIVE RE DEPLOY
          </button>
        </div>
      </div>

      {/* Side Details Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 space-y-4 font-mono">
          <div className="text-xs text-[#FF5500] font-bold uppercase tracking-wider">
            RESOURCE DEPLOY VAULT
          </div>

          <div className="space-y-3">
            <div className="bg-[#141416] p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-zinc-500 uppercase">GITHUB SOURCE REPO</div>
                <div className="text-xs text-white font-bold">{submission.githubUrl}</div>
              </div>
              <a
                href={`https://${submission.githubUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#FF5500] hover:text-white p-2"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-[#141416] p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-zinc-500 uppercase">PRODUCTION REPLIT DEPLOY</div>
                <div className="text-xs text-white font-bold">{submission.demoUrl}</div>
              </div>
              <a
                href={`https://${submission.demoUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#FF5500] hover:text-white p-2"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-[#121214] border border-[#27272A] rounded-3xl p-6 flex items-start gap-4">
          <Lock className="w-6 h-6 text-[#FF5500] shrink-0 mt-1" />
          <div className="space-y-1 font-mono">
            <div className="text-xs font-bold text-white uppercase">ORACLE DIAGNOSTICS LOCKED</div>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Diagnostics and official score matrices are locked until the full-moon review cycle is compiled. Check back Feb 23, 16:30.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

