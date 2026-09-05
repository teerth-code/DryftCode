'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { WindowHeader } from '@/components/layout/WindowHeader';
import { useApp } from '@/context/AppContext';
import { Clock, Users, Trophy, Code, ArrowRight, Check, Zap, Flame } from 'lucide-react';

export default function HackathonDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const hackathonId = (params?.id as string) || 'driftcode-chaos-v1';
  
  const { hackathons, userHackathons, joinHackathon } = useApp();
  const hackathon = hackathons.find(h => h.id === hackathonId) || hackathons[0];

  const isJoined = userHackathons.includes(hackathon.id);

  return (
    <AppLayout>
      <WindowHeader subtag="the blueprint." title="HACKATHON SCHEMATIC" badge={hackathon.status} />

      {/* Main Banner Box */}
      <div className="bg-gradient-to-br from-[#161418] via-[#121215] to-[#0A0A0C] border-2 border-[#FF5500]/70 rounded-3xl p-6 md:p-10 mb-8 relative overflow-hidden shadow-[0_0_40px_rgba(255,85,0,0.2)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5500]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#18181C] border border-[#FF5500]/40 px-3.5 py-1 rounded-full font-mono text-xs text-[#FF5500] font-bold">
              <span>{hackathon.slogan}</span>
              <span>•</span>
              <span>{hackathon.location}</span>
            </div>

            <h1 className="font-mono text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
              {hackathon.name}
            </h1>

            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-sans">
              {hackathon.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <Clock className="w-4 h-4 text-[#FF5500]" />
                <span>{hackathon.dates}</span>
              </div>
              <div className="flex items-center gap-2 text-[#00E599]">
                <Trophy className="w-4 h-4" />
                <span>{hackathon.totalBounty} Cash Pool</span>
              </div>
              <div className="flex items-center gap-2 text-amber-400">
                <Users className="w-4 h-4" />
                <span>{hackathon.claimedSlots} / {hackathon.maxSlots} Hacker Slots Claimed</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0E0E10] border border-[#222226] rounded-2xl p-6 min-w-[280px] space-y-4 text-center shrink-0">
            <div className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-wider">
              JOIN THE CHAOS
            </div>

            <div className="grid grid-cols-3 gap-2 font-mono">
              <div className="bg-[#161619] p-2 rounded-lg border border-zinc-800">
                <div className="text-lg font-black text-white">02</div>
                <div className="text-[9px] text-zinc-500 uppercase">DAYS</div>
              </div>
              <div className="bg-[#161619] p-2 rounded-lg border border-zinc-800">
                <div className="text-lg font-black text-white">14</div>
                <div className="text-[9px] text-zinc-500 uppercase">HOURS</div>
              </div>
              <div className="bg-[#161619] p-2 rounded-lg border border-zinc-800">
                <div className="text-lg font-black text-[#FF5500]">58</div>
                <div className="text-[9px] text-zinc-500 uppercase">MINS</div>
              </div>
            </div>

            {isJoined ? (
              <div className="space-y-2">
                <div className="w-full bg-[#141416] text-[#00E599] border border-[#00E599]/40 font-mono font-bold text-xs uppercase py-3 rounded-xl flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> VERIFIED PARTICIPANT
                </div>
                <Link
                  href={`/submit/${hackathon.id}`}
                  className="block w-full bg-[#FF5500] hover:bg-[#FF6611] text-black font-mono font-black text-xs uppercase py-3 rounded-xl shadow-[0_0_20px_rgba(255,85,0,0.4)] transition-all tracking-wider"
                >
                  SUBMIT ARTIFACT BLUEPRINT
                </Link>
              </div>
            ) : (
              <button
                onClick={() => {
                  joinHackathon(hackathon.id);
                  router.push(`/submit/${hackathon.id}`);
                }}
                className="w-full bg-[#FF5500] hover:bg-[#FF6611] text-black font-mono font-black text-xs uppercase py-3.5 rounded-xl shadow-[0_0_25px_rgba(255,85,0,0.5)] hover:scale-105 transition-all tracking-wider"
              >
                JOIN THE CHAOS NOW
              </button>
            )}

            <div className="text-[10px] text-zinc-500 font-mono">
              // Warning: Rolling entry closes at 400 devs.
            </div>
          </div>
        </div>
      </div>

      {/* Arenas of Engagement (Tracks) */}
      <div className="mb-10">
        <div className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-widest mb-1">
          ARENAS OF ENGAGEMENT (TRACKS)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hackathon.tracks.map((track) => (
            <div
              key={track.id}
              className="bg-[#0E0E10] border border-[#222226] rounded-2xl p-6 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-[#FF5500]">{track.number}</span>
                <span className="bg-[#18181C] text-zinc-400 text-[10px] font-mono px-2.5 py-1 rounded">
                  {track.tagline}
                </span>
              </div>
              <h3 className="font-mono text-lg font-bold text-white uppercase">{track.title}</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-sans">{track.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Runbook Schedule & Bounties Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Schedule */}
        <div className="bg-[#0E0E10] border border-[#222226] rounded-2xl p-6 space-y-4">
          <div className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-widest mb-2">
            RUNBOOK TIMES (SCHEDULE)
          </div>

          <div className="space-y-3 font-mono text-xs">
            {hackathon.schedule.map((item, idx) => (
              <div key={idx} className="bg-[#141416] border border-zinc-800/80 p-3 rounded-xl flex items-center gap-4">
                <div className="text-[#FF5500] font-bold min-w-[70px]">{item.time}</div>
                <div>
                  <div className="text-white font-bold">{item.title}</div>
                  <div className="text-zinc-500 text-[11px] font-sans">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bounty Details */}
        <div className="bg-[#0E0E10] border border-[#222226] rounded-2xl p-6 space-y-4">
          <div className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-widest mb-2">
            ESTIMATED CODES BOUNTY
          </div>

          <div className="space-y-4">
            {hackathon.bounties.map((b, idx) => (
              <div key={idx} className="bg-[#141416] border border-[#27272A] p-4 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] text-zinc-500 uppercase">{b.rank}</div>
                  <div className="font-mono text-xl font-black text-white">{b.amount}</div>
                  <div className="font-mono text-xs text-[#FF5500] font-bold">{b.perks}</div>
                </div>
                <Trophy className="w-8 h-8 text-[#FF5500] opacity-80" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

