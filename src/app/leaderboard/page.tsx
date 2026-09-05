'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { WindowHeader } from '@/components/layout/WindowHeader';
import { useApp } from '@/context/AppContext';
import { Trophy, Award, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

export default function LeaderboardPage() {
  const { leaderboard } = useApp();
  const [activeFilter, setActiveFilter] = useState('OVERALL');

  const top3 = leaderboard.slice(0, 3);
  const remaining = leaderboard.slice(3);

  return (
    <AppLayout>
      <WindowHeader subtag="flex your wins." title="LEGACY RECOGNITION" badge="ORACLE RANKINGS" />

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-[#1F1F23] pb-4 mb-8 font-mono text-xs overflow-x-auto">
        <button
          onClick={() => setActiveFilter('OVERALL')}
          className={`px-4 py-2 rounded-xl font-bold uppercase transition-all ${
            activeFilter === 'OVERALL'
              ? 'bg-[#FF5500] text-black shadow-[0_0_15px_rgba(255,85,0,0.4)]'
              : 'bg-[#121214] text-zinc-400 hover:text-white border border-zinc-800'
          }`}
        >
          OVERALL HACKATHON WINNERS
        </button>
        <button
          onClick={() => setActiveFilter('TRACK')}
          className={`px-4 py-2 rounded-xl font-bold uppercase transition-all ${
            activeFilter === 'TRACK'
              ? 'bg-[#FF5500] text-black shadow-[0_0_15px_rgba(255,85,0,0.4)]'
              : 'bg-[#121214] text-zinc-400 hover:text-white border border-zinc-800'
          }`}
        >
          TRACK CONFLICT LEADERS
        </button>
        <button
          onClick={() => setActiveFilter('BOUNTIES')}
          className={`px-4 py-2 rounded-xl font-bold uppercase transition-all ${
            activeFilter === 'BOUNTIES'
              ? 'bg-[#FF5500] text-black shadow-[0_0_15px_rgba(255,85,0,0.4)]'
              : 'bg-[#121214] text-zinc-400 hover:text-white border border-zinc-800'
          }`}
        >
          SPECIAL ORACLE BOUNTIES
        </button>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 font-mono">
        {top3.map((entry) => (
          <div
            key={entry.rank}
            className={`bg-[#0E0E10] border rounded-3xl p-6 relative flex flex-col justify-between overflow-hidden ${
              entry.rank === 1
                ? 'border-[#FF5500] shadow-[0_0_30px_rgba(255,85,0,0.2)] bg-gradient-to-b from-[#181514] to-[#0E0E10]'
                : entry.isCurrentUser
                ? 'border-[#00E599] shadow-[0_0_20px_rgba(0,229,153,0.15)]'
                : 'border-[#222226]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#FF5500] bg-[#FF5500]/10 border border-[#FF5500]/30 px-3 py-1 rounded-full">
                  #{entry.rank} SCORE: {entry.score}
                </span>
                <Trophy className={`w-6 h-6 ${entry.rank === 1 ? 'text-[#FF5500]' : 'text-zinc-600'}`} />
              </div>

              <h3 className="text-xl font-black text-white uppercase">{entry.teamName}</h3>
              <div className="text-xs text-amber-500 font-bold mt-0.5">{entry.projectName}</div>
              <div className="text-[11px] text-zinc-500 mt-1">{entry.track}</div>
            </div>

            <div className="pt-4 mt-6 border-t border-[#1F1F23] flex items-center justify-between">
              <span className="text-xs text-[#00E599] font-extrabold">{entry.prizeBounty}</span>
              {entry.isCurrentUser && (
                <span className="text-[10px] bg-[#00E599]/20 text-[#00E599] font-bold px-2 py-0.5 rounded">YOU</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Oracle Evaluation Matrix section + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 1 Col: Matrix Explain */}
        <div className="bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 md:p-8 space-y-6">
          <div>
            <div className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-1">
              ORACLE EVALUATION MATRIX
            </div>
            <p className="text-zinc-400 text-xs font-sans leading-relaxed">
              Our judges consist of West Coast developer advocates, decentralized tech founders, and late-night builders rating artifacts across three unhinged dimensions:
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="bg-[#141416] p-4 rounded-xl border border-zinc-800 space-y-1">
              <div className="text-[#FF5500] font-bold">1. Chaotic Ingenuity (40% WEIGHT)</div>
              <p className="text-zinc-400 text-[11px] font-sans">
                How surprisingly absurd, unique, or delightfully unhinged is the core conceptual design?
              </p>
            </div>

            <div className="bg-[#141416] p-4 rounded-xl border border-zinc-800 space-y-1">
              <div className="text-[#FF5500] font-bold">2. Technical Integrity (40% WEIGHT)</div>
              <p className="text-zinc-400 text-[11px] font-sans">
                Performance metrics, speed compilation, robust code repo pipelines, and active live deploys.
              </p>
            </div>

            <div className="bg-[#141416] p-4 rounded-xl border border-zinc-800 space-y-1">
              <div className="text-[#FF5500] font-bold">3. Aesthetic Vibe (20% WEIGHT)</div>
              <p className="text-zinc-400 text-[11px] font-sans">
                Glitch terminal interfaces, keyboard shortcuts, CRT shaders, and rich console graphics.
              </p>
            </div>
          </div>

          <Link
            href="/submission-review"
            className="block w-full text-center bg-[#18181C] hover:bg-[#FF5500] hover:text-black border border-zinc-700 text-white font-mono font-bold text-xs uppercase py-3 rounded-xl transition-all"
          >
            EXPLORE ALL SUBMISSIONS
          </Link>
        </div>

        {/* Right 2 Cols: Ranked List Table */}
        <div className="lg:col-span-2 bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#1F1F23] text-zinc-500 uppercase">
                  <th className="pb-4 font-bold">RANK</th>
                  <th className="pb-4 font-bold">ALLIANCE TEAM</th>
                  <th className="pb-4 font-bold">ARTIFACT PROJECT</th>
                  <th className="pb-4 font-bold">TRACK</th>
                  <th className="pb-4 font-bold">SCORE</th>
                  <th className="pb-4 font-bold text-right">PRIZE BOUNTY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1E]">
                {leaderboard.map((row) => (
                  <tr
                    key={row.rank}
                    className={`hover:bg-[#141417] transition-colors ${
                      row.isCurrentUser ? 'bg-[#FF5500]/10 font-bold' : ''
                    }`}
                  >
                    <td className="py-4 font-bold text-[#FF5500]">0{row.rank}</td>
                    <td className="py-4 font-bold text-white uppercase">{row.teamName}</td>
                    <td className="py-4 text-amber-500">{row.projectName}</td>
                    <td className="py-4 text-zinc-400">{row.track}</td>
                    <td className="py-4 font-extrabold text-white">{row.score}</td>
                    <td className="py-4 text-right text-[#00E599] font-bold">{row.prizeBounty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

