'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { WindowHeader } from '@/components/layout/WindowHeader';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, Users, Trophy, ExternalLink, Github, Disc as Discord, Check } from 'lucide-react';

export default function OrganizerProfilePage() {
  const { hackathons } = useApp();
  const [following, setFollowing] = useState(false);

  return (
    <AppLayout>
      <WindowHeader subtag="the architects." title="ORGANIZER HQ" badge="// VERIFIED CREATOR" />

      {/* Main Organizer Header Banner */}
      <div className="bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 md:p-10 mb-8 relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-[#00E599] bg-[#00E599]/10 border border-[#00E599]/30 px-3 py-1 rounded-full uppercase font-bold">
              VERIFIED CLUB HQ
            </span>
            <h1 className="font-mono text-3xl md:text-5xl font-black text-white uppercase">
              CHAOS CLUB SF
            </h1>
            <div className="font-mono text-xs text-[#FF5500] font-bold">SF State University</div>
          </div>

          <button
            onClick={() => setFollowing(!following)}
            className={`font-mono text-xs uppercase px-8 py-3.5 rounded-xl font-bold transition-all ${
              following
                ? 'bg-[#18181C] text-[#00E599] border border-[#00E599]/40'
                : 'bg-[#FF5500] hover:bg-[#FF6611] text-black shadow-[0_0_20px_rgba(255,85,0,0.4)] hover:scale-105'
            }`}
          >
            {following ? 'FOLLOWING ORGANIZER ✓' : 'FOLLOW THIS ORGANIZER'}
          </button>
        </div>

        <p className="text-zinc-300 text-sm font-sans leading-relaxed max-w-3xl">
          We foster radical coding constructs, midnight terminal operations, and extreme software design for absolute creators.
        </p>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#1F1F23] max-w-xl font-mono">
          <div>
            <div className="text-3xl font-black text-white">4</div>
            <div className="text-[10px] text-zinc-500 uppercase">HOSTED</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#FF5500]">1.2K</div>
            <div className="text-[10px] text-zinc-500 uppercase">CREATORS</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#00E599]">$50K</div>
            <div className="text-[10px] text-zinc-500 uppercase">DISTRIBUTED</div>
          </div>
        </div>

        {/* Digital Connections */}
        <div className="flex items-center gap-6 pt-2 font-mono text-xs text-zinc-400">
          <a href="#" className="hover:text-white flex items-center gap-2">
            <Github className="w-4 h-4 text-[#FF5500]" /> GitHub // drift_hacker
          </a>
          <a href="#" className="hover:text-white flex items-center gap-2">
            <Discord className="w-4 h-4 text-[#FF5500]" /> Discord // chaos_sf
          </a>
        </div>
      </div>

      {/* Arenas Hosted & Leaders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Arenas Hosted */}
        <div className="lg:col-span-2 space-y-6">
          <div className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-wider">
            ARENAS HOSTED BY THIS CLIQUE
          </div>

          <div className="space-y-4 font-mono">
            {hackathons.map((h) => (
              <div
                key={h.id}
                className="bg-[#0E0E10] border border-[#222226] hover:border-[#FF5500]/50 rounded-2xl p-6 space-y-3 transition-all"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white uppercase">{h.name}</h3>
                  <span className="text-xs text-[#00E599] font-extrabold">{h.totalBounty} POOL</span>
                </div>
                <p className="text-xs text-zinc-400 font-sans">
                  Construct finalized with over 150 project submissions uploaded.
                </p>
                <Link
                  href={`/hackathons/${h.id}`}
                  className="inline-block text-xs text-[#FF5500] hover:underline font-bold uppercase"
                >
                  EXPLORE ARENA SCHEMATIC →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Clique Leaders */}
        <div className="space-y-6">
          <div className="bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 space-y-4 font-mono">
            <div className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
              CLIQUE LEADERS (OPS)
            </div>
            <p className="text-xs text-zinc-400 font-sans">
              Administered by <span className="text-white font-bold font-mono">@drift_hacker</span>, <span className="text-white font-bold font-mono">@hacker_x69</span> and 4 others.
            </p>
            <div className="space-y-2 pt-2">
              {['@drift_hacker', '@hacker_x69', '@sol_rebel', '@brainrot_ops'].map((lead, idx) => (
                <div key={idx} className="bg-[#141416] p-3 rounded-xl border border-zinc-800 text-xs font-bold text-zinc-300">
                  {lead}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

