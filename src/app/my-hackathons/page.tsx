'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { WindowHeader } from '@/components/layout/WindowHeader';
import { useApp } from '@/context/AppContext';
import { Flame, ArrowRight, ShieldCheck, Clock, Trophy, ExternalLink } from 'lucide-react';

export default function MyHackathonsPage() {
  const { hackathons, userHackathons, submissions } = useApp();
  const [activeTab, setActiveTab] = useState<'registered' | 'ongoing' | 'completed'>('registered');

  const joinedList = hackathons.filter(h => userHackathons.includes(h.id));

  return (
    <AppLayout>
      <WindowHeader subtag="your journey." title="MY HACKATHONS" badge="// LEVEL 3 HACKER" />

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-[#1F1F23] pb-4 mb-8 font-mono text-xs">
        <button
          onClick={() => setActiveTab('registered')}
          className={`px-4 py-2 rounded-xl font-bold uppercase transition-all ${
            activeTab === 'registered'
              ? 'bg-[#FF5500] text-black shadow-[0_0_15px_rgba(255,85,0,0.4)]'
              : 'bg-[#121214] text-zinc-400 hover:text-white border border-zinc-800'
          }`}
        >
          REGISTERED ({joinedList.length})
        </button>
        <button
          onClick={() => setActiveTab('ongoing')}
          className={`px-4 py-2 rounded-xl font-bold uppercase transition-all ${
            activeTab === 'ongoing'
              ? 'bg-[#FF5500] text-black shadow-[0_0_15px_rgba(255,85,0,0.4)]'
              : 'bg-[#121214] text-zinc-400 hover:text-white border border-zinc-800'
          }`}
        >
          ONGOING (1)
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-xl font-bold uppercase transition-all ${
            activeTab === 'completed'
              ? 'bg-[#FF5500] text-black shadow-[0_0_15px_rgba(255,85,0,0.4)]'
              : 'bg-[#121214] text-zinc-400 hover:text-white border border-zinc-800'
          }`}
        >
          COMPLETED (8)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Combats List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest font-bold">
            ACTIVE COMBATS
          </div>

          {joinedList.map((h) => {
            const hasSubmission = submissions.find(s => s.hackathonId === h.id);

            return (
              <div
                key={h.id}
                className="bg-[#0E0E10] border border-[#222226] hover:border-[#FF5500]/50 rounded-3xl p-6 md:p-8 space-y-6 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] text-[#00E599] bg-[#00E599]/10 border border-[#00E599]/30 px-2.5 py-0.5 rounded font-bold uppercase">
                      ACCEPTED
                    </span>
                    <h3 className="font-mono text-2xl font-black text-white uppercase mt-2 group-hover:text-[#FF5500] transition-colors">
                      {h.name}
                    </h3>
                    <div className="font-mono text-xs text-zinc-500 mt-1">
                      {h.dates}
                    </div>
                  </div>

                  <div className="sm:text-right font-mono">
                    <div className="text-[10px] text-zinc-500 uppercase">PRIZE POOL</div>
                    <div className="text-2xl font-extrabold text-[#FF5500]">{h.totalBounty}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1C1C20] flex flex-wrap items-center justify-between gap-4">
                  {hasSubmission ? (
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#00E599] font-bold">
                        STATUS: {hasSubmission.status}
                      </span>
                      <Link
                        href={`/submission-status/${hasSubmission.id}`}
                        className="bg-[#18181C] hover:bg-zinc-800 text-white font-mono font-bold text-xs uppercase px-4 py-2 rounded-xl border border-zinc-700 transition-all flex items-center gap-2"
                      >
                        VIEW ARTIFACT <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={`/submit/${h.id}`}
                      className="bg-[#FF5500] hover:bg-[#FF6611] text-black font-mono font-black text-xs uppercase px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(255,85,0,0.4)] hover:scale-105 transition-all tracking-wider flex items-center gap-2"
                    >
                      SUBMIT PROJECT <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}

                  <Link
                    href={`/hackathons/${h.id}`}
                    className="font-mono text-xs text-zinc-400 hover:text-white uppercase tracking-wider"
                  >
                    HACKATHON DETAILS →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hot Arena Warning Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#141210] border-2 border-amber-500/60 rounded-3xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(255,184,0,0.15)]">
            <div className="flex items-center gap-2 text-amber-500 font-mono text-xs font-bold uppercase mb-3">
              <Flame className="w-4 h-4 animate-bounce" /> HOT ARENA WARNING
            </div>

            <p className="text-zinc-300 text-xs font-sans leading-relaxed mb-6">
              A live battle is seeking digital weapons. Join current stream.
            </p>

            <div className="bg-[#0E0E10] border border-[#27272A] rounded-2xl p-5 space-y-3">
              <div className="font-mono text-xs text-[#FF5500] font-bold">LIVE NOW</div>
              <div className="font-mono text-base font-black text-white uppercase">
                CYBERPUNK SPEEDRUN V3
              </div>
              <div className="font-mono text-xs text-zinc-500">Feb 05-07, 2026</div>
              <div className="font-mono text-sm font-extrabold text-[#00E599]">
                $10,000 PRIZE POOL
              </div>

              <Link
                href="/submit/cyberpunk-speedrun-v3"
                className="block w-full text-center bg-[#FF5500] hover:bg-[#FF6611] text-black font-mono font-bold text-xs uppercase py-3 rounded-xl shadow-[0_0_15px_rgba(255,85,0,0.4)] transition-all"
              >
                SHIP CODE NOW
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

