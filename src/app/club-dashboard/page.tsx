'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { WindowHeader } from '@/components/layout/WindowHeader';
import { useApp } from '@/context/AppContext';
import { Plus, Users, Trophy, Rocket, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ClubDashboardPage() {
  const { hackathons } = useApp();
  const [clubName, setClubName] = useState('CHAOS CLUB SF');
  const [affiliation, setAffiliation] = useState('SF State University');
  const [hypeDescription, setHypeDescription] = useState('We foster radical coding constructs, midnight terminal operations, and extreme software design for absolute creators.');
  const [leadOpsEmail, setLeadOpsEmail] = useState('captain@chaosclub.xyz');

  const handleRegisterHQ = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Club HQ ${clubName} registration submitted! Application is under full-moon review.`);
  };

  return (
    <AppLayout>
      <WindowHeader subtag="your hq." title="CLUB CONSOLE" badge="// LEVEL 3 ORG" />

      {/* Top Console Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 md:p-8 font-mono space-y-2">
          <div className="text-4xl md:text-5xl font-black text-white">156</div>
          <div className="text-xs font-bold text-zinc-400 uppercase">MEMBERS</div>
          <div className="text-[11px] text-zinc-600 font-sans">Active hackers on Discord</div>
        </div>

        <div className="bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 md:p-8 font-mono space-y-2">
          <div className="text-4xl md:text-5xl font-black text-[#FF5500]">3</div>
          <div className="text-xs font-bold text-zinc-400 uppercase">HACKATHONS</div>
          <div className="text-[11px] text-zinc-600 font-sans">Hosted & upcoming events</div>
        </div>

        <div className="bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 md:p-8 font-mono space-y-2">
          <div className="text-4xl md:text-5xl font-black text-[#00E599]">41</div>
          <div className="text-xs font-bold text-zinc-400 uppercase">SHIPS</div>
          <div className="text-[11px] text-zinc-600 font-sans">Total verified submissions</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Events Managed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              EVENTS MANAGED
            </div>
            <Link
              href="/create-hackathon"
              className="bg-[#18181C] hover:bg-[#FF5500] hover:text-black border border-zinc-700 text-white font-mono font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all flex items-center gap-2"
            >
              NEW HACKATHON <Plus className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4 font-mono">
            {hackathons.map((h) => (
              <div
                key={h.id}
                className="bg-[#0E0E10] border border-[#222226] hover:border-[#FF5500]/50 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#141416] border border-zinc-800 rounded-xl flex items-center justify-center font-mono font-black text-[#FF5500] text-lg">
                    {h.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#FF5500] transition-colors uppercase">
                      {h.name}
                    </h3>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      {h.dates} • {h.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                      h.status === 'COMPLETED'
                        ? 'bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/30'
                        : 'bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30'
                    }`}
                  >
                    {h.status}
                  </span>
                  <Link
                    href={`/hackathons/${h.id}`}
                    className="text-xs text-zinc-400 hover:text-white uppercase tracking-wider"
                  >
                    VIEW →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form: Register New HQ */}
        <div className="bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 md:p-8 space-y-6">
          <div>
            <div className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-1">
              REGISTER NEW HQ
            </div>
            <p className="text-zinc-400 text-xs font-sans">
              Onboard your university hacker club in minutes.
            </p>
          </div>

          <form onSubmit={handleRegisterHQ} className="space-y-4 font-mono">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">
                CLUB NAME
              </label>
              <input
                type="text"
                required
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                placeholder="e.g. Berkeley Brainrot Architects"
                className="w-full bg-[#141416] border border-[#27272A] focus:border-[#FF5500] text-white px-4 py-3 rounded-xl text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">
                UNIVERSITY / AFFILIATION
              </label>
              <input
                type="text"
                required
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
                placeholder="e.g. UC Berkeley"
                className="w-full bg-[#141416] border border-[#27272A] focus:border-[#FF5500] text-white px-4 py-3 rounded-xl text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">
                HYPE DESCRIPTION
              </label>
              <textarea
                rows={3}
                required
                value={hypeDescription}
                onChange={(e) => setHypeDescription(e.target.value)}
                placeholder="Explain your club's chaotic energy in 1 sentence..."
                className="w-full bg-[#141416] border border-[#27272A] focus:border-[#FF5500] text-white p-4 rounded-xl text-xs outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">
                LEAD OPS (EMAIL)
              </label>
              <input
                type="email"
                required
                value={leadOpsEmail}
                onChange={(e) => setLeadOpsEmail(e.target.value)}
                placeholder="captain@chaosclub.xyz"
                className="w-full bg-[#141416] border border-[#27272A] focus:border-[#FF5500] text-white px-4 py-3 rounded-xl text-xs outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF5500] hover:bg-[#FF6611] text-black font-mono font-black text-xs uppercase py-3.5 rounded-xl shadow-[0_0_20px_rgba(255,85,0,0.4)] transition-all tracking-wider flex items-center justify-center gap-2"
            >
              MANIFEST CLUB VOID <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[10px] text-zinc-500 text-center font-mono pt-2">
              // We review applications under the full moon
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}

