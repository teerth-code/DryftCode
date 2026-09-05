'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { WindowHeader } from '@/components/layout/WindowHeader';
import { useApp } from '@/context/AppContext';
import { Search, Filter, Sparkles, UserPlus, Check, ArrowRight, ShieldAlert } from 'lucide-react';

export default function DiscoveryPage() {
  const { hackathons, userHackathons, joinHackathon, teammateRadar, inviteTeammate } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [selectedTrack, setSelectedTrack] = useState('ALL');

  const featured = hackathons[0];

  const filteredHackathons = hackathons.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          h.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <AppLayout>
      <WindowHeader subtag="find your arena." title="DISCOVERY RADAR" badge="LIVE GRID" />

      {/* Featured Arena Banner */}
      <div className="relative bg-gradient-to-r from-[#161418] via-[#1A1820] to-[#121214] border border-[#27272A] rounded-3xl p-6 md:p-8 mb-8 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] font-bold text-[#FF5500] bg-[#FF5500]/10 border border-[#FF5500]/30 px-3 py-1 rounded-full uppercase tracking-wider">
                // FEATURED SYSTEM CONFLICT
              </span>
              <span className="font-mono text-xs font-black text-[#00E599]">
                {featured.totalBounty} TOTAL BOUNTY
              </span>
            </div>

            <h2 className="font-mono text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
              {featured.name}
            </h2>

            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
              {featured.description}
            </p>

            <div className="font-mono text-xs text-zinc-400 pt-1">
              Starts: <span className="text-white font-semibold">{featured.dates}</span> • {featured.location}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 min-w-[180px]">
            {userHackathons.includes(featured.id) ? (
              <button
                disabled
                className="w-full bg-[#18181B] text-[#00E599] border border-[#00E599]/40 font-mono font-bold text-xs uppercase px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-default"
              >
                <Check className="w-4 h-4" /> TICKET VERIFIED
              </button>
            ) : (
              <button
                onClick={() => joinHackathon(featured.id)}
                className="w-full bg-[#FF5500] hover:bg-[#FF6611] text-black font-mono font-black text-xs uppercase px-6 py-3.5 rounded-xl shadow-[0_0_25px_rgba(255,85,0,0.5)] hover:scale-105 transition-all tracking-wider flex items-center justify-center gap-2"
              >
                CLAIM TICKET <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <Link
              href={`/hackathons/${featured.id}`}
              className="w-full text-center font-mono text-xs text-zinc-400 hover:text-white uppercase tracking-wider py-1 underline underline-offset-4"
            >
              VIEW SCHEMATIC
            </Link>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search wild arenas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0E0E10] border border-[#222226] focus:border-[#FF5500] text-white pl-11 pr-4 py-3 rounded-xl font-mono text-xs placeholder:text-zinc-600 outline-none transition-colors"
          />
        </div>

        <div>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full bg-[#0E0E10] border border-[#222226] focus:border-[#FF5500] text-zinc-300 px-4 py-3 rounded-xl font-mono text-xs outline-none cursor-pointer"
          >
            <option value="ALL">SF / Hybrid</option>
            <option value="SF">SF Campus Only</option>
            <option value="HYBRID">Hybrid / Remote</option>
          </select>
        </div>

        <div>
          <select
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
            className="w-full bg-[#0E0E10] border border-[#222226] focus:border-[#FF5500] text-zinc-300 px-4 py-3 rounded-xl font-mono text-xs outline-none cursor-pointer"
          >
            <option value="ALL">GEN Z tracks</option>
            <option value="AGENTS">Autonomous Agents</option>
            <option value="CONSUMER">Absurd Consumer</option>
            <option value="INFRA">Hacker Tooling</option>
          </select>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Hackathons List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredHackathons.map((h) => {
            const isJoined = userHackathons.includes(h.id);

            return (
              <div
                key={h.id}
                className="bg-[#0E0E10] border border-[#222226] hover:border-[#FF5500]/50 rounded-2xl p-6 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#161619] border border-[#2A2A30] rounded-xl flex items-center justify-center font-mono font-black text-[#FF5500] text-lg shrink-0 group-hover:scale-105 transition-transform">
                    {h.name.charAt(0)}
                  </div>
                  <div className="space-y-1.5">
                    <Link
                      href={`/hackathons/${h.id}`}
                      className="font-mono text-base font-bold text-white group-hover:text-[#FF5500] transition-colors uppercase"
                    >
                      {h.name}
                    </Link>
                    <div className="font-mono text-xs text-zinc-500">
                      {h.dates} • {h.location}
                    </div>
                    <div className="font-mono text-xs font-bold text-[#00E599]">
                      {h.totalBounty} REWARD
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {['Consumer Dev', 'Unsupervised AI', 'Absurd Apps'].map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-[#141417] text-zinc-400 border border-zinc-800 text-[10px] font-mono px-2.5 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  {isJoined ? (
                    <span className="inline-flex items-center gap-1.5 text-[#00E599] bg-[#00E599]/10 border border-[#00E599]/30 px-3 py-1.5 rounded-xl font-mono text-xs font-bold">
                      <Check className="w-3.5 h-3.5" /> JOINED
                    </span>
                  ) : (
                    <button
                      onClick={() => joinHackathon(h.id)}
                      className="bg-[#18181C] hover:bg-[#FF5500] hover:text-black border border-zinc-700 text-white font-mono font-bold text-xs uppercase px-4 py-2 rounded-xl transition-all"
                    >
                      CLAIM TICKET
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 1 Col: Team Radar Formation Widget */}
        <div className="space-y-6">
          <div className="bg-[#0E0E10] border border-[#222226] rounded-2xl p-6">
            <div className="font-mono text-xs text-[#FF5500] uppercase font-bold tracking-wider mb-1">
              TEAM RADAR FORMATION
            </div>
            <p className="text-zinc-400 text-xs font-sans mb-6">
              Form up with rogue coders before launch sequence.
            </p>

            <div className="space-y-3">
              {teammateRadar.map((tm) => (
                <div
                  key={tm.id}
                  className="bg-[#141416] border border-[#222226] rounded-xl p-3 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-2 h-2 rounded-full bg-[#FF5500] animate-ping" />
                    <div className="truncate">
                      <div className="font-mono text-xs font-bold text-white truncate">
                        {tm.username}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono truncate">
                        {tm.role}
                      </div>
                    </div>
                  </div>

                  {tm.status === 'invited' ? (
                    <span className="font-mono text-[10px] text-[#00E599] font-bold px-2 py-1 bg-[#00E599]/10 rounded border border-[#00E599]/30">
                      SENT
                    </span>
                  ) : (
                    <button
                      onClick={() => inviteTeammate(tm.id)}
                      className="bg-[#18181C] hover:bg-[#FF5500] hover:text-black border border-zinc-700 text-white font-mono text-[10px] font-bold uppercase px-3 py-1.5 rounded transition-all"
                    >
                      INVITE
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => alert("Lobby Created! Your room code is #DRIFTCODE-7729")}
              className="w-full mt-6 bg-[#FF5500] hover:bg-[#FF6611] text-black font-mono font-black text-xs uppercase py-3 rounded-xl shadow-[0_0_20px_rgba(255,85,0,0.4)] transition-all tracking-wider"
            >
              LAUNCH A NEW LOBBY
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

