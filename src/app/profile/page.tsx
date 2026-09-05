'use client';

import React from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { WindowHeader } from '@/components/layout/WindowHeader';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, Award, Flame, Code, ExternalLink } from 'lucide-react';

export default function ProfilePage() {
  const { user, submissions } = useApp();

  const shipments = [
    {
      id: 'sh_1',
      title: 'MEMEPAY TERMINAL',
      hackathon: 'VibeCheck Hackathon',
      description: 'A fast retro interface built to stream micro payments via Solana.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80'
    },
    {
      id: 'sh_2',
      title: 'SYNAPSE CULT',
      hackathon: 'Synaptic Hackathon',
      description: 'Autonomous agent ecosystem simulating financial trading.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80'
    }
  ];

  return (
    <AppLayout>
      <WindowHeader subtag="your legacy." title="CODER PROFILES" badge="VERIFIED HACKER" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 1 Col: Coder Card */}
        <div className="bg-[#0E0E10] border border-[#222226] rounded-3xl p-8 text-center space-y-6 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
          <div className="relative inline-block">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-28 h-28 rounded-3xl object-cover mx-auto border-2 border-[#FF5500] shadow-[0_0_25px_rgba(255,85,0,0.4)]"
            />
            <span className="absolute -bottom-2 -right-2 bg-[#FF5500] text-black font-mono text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
              X69
            </span>
          </div>

          <div>
            <h2 className="font-mono text-2xl font-black text-white uppercase">{user.name}</h2>
            <div className="font-mono text-xs text-[#FF5500] font-bold mt-1">{user.university}</div>
          </div>

          <p className="text-zinc-300 text-xs font-sans italic leading-relaxed bg-[#141416] p-4 rounded-2xl border border-zinc-800">
            {user.bio}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 py-4 border-y border-[#1F1F23] font-mono">
            <div>
              <div className="text-2xl font-black text-white">{user.stats.attended}</div>
              <div className="text-[10px] text-zinc-500 uppercase">ATTENDED</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#FF5500]">{user.stats.shipped}</div>
              <div className="text-[10px] text-zinc-500 uppercase">SHIPPED</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#00E599]">{user.stats.badges}</div>
              <div className="text-[10px] text-zinc-500 uppercase">BADGES</div>
            </div>
          </div>

          {/* Earned Badges */}
          <div className="space-y-2 font-mono text-left">
            <div className="text-[11px] text-zinc-400 font-bold uppercase">EARNED BADGES</div>
            <div className="flex flex-wrap gap-2">
              {user.earnedBadges.map((b, i) => (
                <span key={i} className="bg-[#18181C] text-[#FF5500] border border-[#FF5500]/40 text-xs font-bold px-3 py-1 rounded-xl uppercase">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Powered By */}
          <div className="space-y-2 font-mono text-left pt-2">
            <div className="text-[11px] text-zinc-400 font-bold uppercase">POWERED BY</div>
            <div className="flex flex-wrap gap-2">
              {user.techStack.map((t, i) => (
                <span key={i} className="bg-[#141416] text-zinc-300 border border-zinc-800 text-xs px-3 py-1 rounded-lg">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right 2 Cols: Compilation of Shipments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-wider">
            COMPILATION OF SHIPMENTS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {shipments.map((sh) => (
              <div
                key={sh.id}
                className="bg-[#0E0E10] border border-[#222226] hover:border-[#FF5500]/50 rounded-3xl overflow-hidden transition-all group"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={sh.image}
                    alt={sh.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-mono text-lg font-bold text-white uppercase group-hover:text-[#FF5500] transition-colors">
                    {sh.title}
                  </h3>
                  <div className="font-mono text-xs text-[#FF5500] font-bold">{sh.hackathon}</div>
                  <p className="text-zinc-400 text-xs font-sans leading-relaxed">{sh.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

