'use client';

import React from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { WindowHeader } from '@/components/layout/WindowHeader';
import { useApp } from '@/context/AppContext';
import { Flame, Crown, Zap, Terminal, Trophy, ShieldAlert } from 'lucide-react';

export default function BadgesPage() {
  const { user, badges } = useApp();

  return (
    <AppLayout>
      <WindowHeader subtag="flex your wins." title="LEGACY TROPHY" badge="ACHIEVEMENTS" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 1 Col: Profile Card + Badges in Progress */}
        <div className="space-y-6">
          <div className="bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 text-center space-y-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-3xl object-cover mx-auto border-2 border-[#FF5500] shadow-[0_0_20px_rgba(255,85,0,0.4)]"
            />
            <div>
              <h2 className="font-mono text-2xl font-black text-white uppercase">{user.name}</h2>
              <div className="font-mono text-xs text-[#FF5500] font-bold mt-1">{user.university}</div>
            </div>

            <p className="text-zinc-400 text-xs font-sans italic leading-relaxed">
              {user.bio}
            </p>

            <div className="grid grid-cols-3 gap-2 py-4 border-y border-[#1F1F23] font-mono">
              <div>
                <div className="text-xl font-black text-white">{user.stats.attended}</div>
                <div className="text-[10px] text-zinc-500 uppercase">ATTENDED</div>
              </div>
              <div>
                <div className="text-xl font-black text-[#FF5500]">{user.stats.shipped}</div>
                <div className="text-[10px] text-zinc-500 uppercase">SHIPPED</div>
              </div>
              <div>
                <div className="text-xl font-black text-[#00E599]">{user.stats.badges}</div>
                <div className="text-[10px] text-zinc-500 uppercase">BADGES</div>
              </div>
            </div>

            {/* Badges In Progress */}
            <div className="text-left font-mono space-y-2 pt-2">
              <div className="text-xs font-bold text-zinc-400 uppercase">BADGES IN PROGRESS</div>
              <div className="bg-[#141416] p-4 rounded-2xl border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white font-bold">Terminal Overlord (12/15)</span>
                  <span className="text-[#FF5500] font-bold">80%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF5500] w-[80%] rounded-full shadow-[0_0_10px_rgba(255,85,0,0.6)]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2 Cols: Earned Badges & Leaderboard Snippet */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section: Earned Badges & Recognition */}
          <div className="space-y-4">
            <div className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-wider">
              EARNED BADGES & RECOGNITION
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
              <div className="bg-[#0E0E10] border border-[#FF5500]/50 rounded-3xl p-6 text-center space-y-3 relative overflow-hidden group hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-[#FF5500]/10 border border-[#FF5500]/40 rounded-2xl flex items-center justify-center text-[#FF5500] mx-auto">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-white uppercase">3 AM SOLDIER</h3>
                <p className="text-[11px] text-zinc-400 font-sans leading-tight">Active build past 3 AM</p>
              </div>

              <div className="bg-[#0E0E10] border border-[#FF5500]/50 rounded-3xl p-6 text-center space-y-3 relative overflow-hidden group hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/40 rounded-2xl flex items-center justify-center text-amber-500 mx-auto">
                  <Crown className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-white uppercase">MEME BUILDER</h3>
                <p className="text-[11px] text-zinc-400 font-sans leading-tight">Build with 9.5+ rot score</p>
              </div>

              <div className="bg-[#0E0E10] border border-zinc-800 opacity-60 rounded-3xl p-6 text-center space-y-3 relative overflow-hidden">
                <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 mx-auto">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-zinc-400 uppercase">GOD COMPILER</h3>
                <p className="text-[11px] text-zinc-500 font-sans leading-tight">WASM compile under 50ms</p>
              </div>
            </div>
          </div>

          {/* Section: DRIFTCODE Oracle Leaderboard */}
          <div className="space-y-4">
            <div className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-wider">
              DRIFTCODE ORACLE LEADERBOARD
            </div>

            <div className="bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 space-y-3 font-mono">
              <div className="bg-[#141416] p-4 rounded-2xl border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-[#FF5500] font-black text-sm">#1</span>
                  <span className="font-bold text-white uppercase">sol_rebel</span>
                </div>
                <span className="text-xs text-zinc-400 font-bold">38 ships</span>
              </div>

              <div className="bg-[#18181C] p-4 rounded-2xl border-2 border-[#FF5500] flex items-center justify-between shadow-[0_0_15px_rgba(255,85,0,0.2)]">
                <div className="flex items-center gap-4">
                  <span className="text-[#FF5500] font-black text-sm">#2</span>
                  <span className="font-bold text-white uppercase">hacker_x69</span>
                </div>
                <span className="text-xs text-[#FF5500] font-extrabold">32 ships (You)</span>
              </div>

              <div className="bg-[#141416] p-4 rounded-2xl border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-[#FF5500] font-black text-sm">#3</span>
                  <span className="font-bold text-white uppercase">wasm_master</span>
                </div>
                <span className="text-xs text-zinc-400 font-bold">28 ships</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
