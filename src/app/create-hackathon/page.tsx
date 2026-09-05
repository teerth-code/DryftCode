'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { WindowHeader } from '@/components/layout/WindowHeader';
import { useApp } from '@/context/AppContext';
import { Upload, ArrowRight, X, Plus } from 'lucide-react';

export default function CreateHackathonPage() {
  const router = useRouter();
  const { createHackathon } = useApp();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('Brainrot Engine V1');
  const [dates, setDates] = useState('June 13-15, 2026');
  const [slogan, setSlogan] = useState('Manifest ridiculous prototypes at 3 AM');
  const [rules, setRules] = useState('No corporate templates. Must compile with maximum speed.');
  const [totalBounty, setTotalBounty] = useState('$5,000');
  const [posterUrl, setPosterUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      const newId = createHackathon({
        name,
        slogan,
        description: rules,
        dates,
        location: 'SF State Campus & Hybrid',
        totalBounty,
        tracks: [
          { id: 't1', number: '01', title: 'Pure Consumer / Brainrot', tagline: 'Internet Natives', description: 'Consumer apps and memes.' },
          { id: 't2', number: '02', title: 'Unsupervised AI Agents', tagline: 'Let them cook', description: 'Autonomous agents.' }
        ],
        bounties: [
          { rank: 'GRAND PRIZE', title: 'Track Winner', amount: totalBounty, perks: '+ Keyboards', description: 'Top rated build.' }
        ],
        schedule: []
      });

      router.push(`/hackathons/${newId}`);
    }
  };

  return (
    <AppLayout>
      <WindowHeader subtag="cook something up." title="CREATION LAB" badge="DRAFTMODE" />

      {/* Stepper Header */}
      <div className="flex items-center gap-4 border-b border-[#1F1F23] pb-6 mb-8 font-mono text-xs overflow-x-auto">
        <button
          onClick={() => setStep(1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            step === 1
              ? 'bg-[#FF5500] text-black font-bold shadow-[0_0_15px_rgba(255,85,0,0.4)]'
              : 'bg-[#141416] text-zinc-400 border border-zinc-800'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">1</span>
          THE BASICS
        </button>

        <span className="text-zinc-600">---</span>

        <button
          onClick={() => setStep(2)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            step === 2
              ? 'bg-[#FF5500] text-black font-bold shadow-[0_0_15px_rgba(255,85,0,0.4)]'
              : 'bg-[#141416] text-zinc-400 border border-zinc-800'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">2</span>
          TRACKS & BOUNTIES
        </button>

        <span className="text-zinc-600">---</span>

        <button
          onClick={() => setStep(3)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            step === 3
              ? 'bg-[#FF5500] text-black font-bold shadow-[0_0_15px_rgba(255,85,0,0.4)]'
              : 'bg-[#141416] text-zinc-400 border border-zinc-800'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">3</span>
          BRANDING
        </button>
      </div>

      <form onSubmit={handleNext} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-2 bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 md:p-8 space-y-6">
          <div className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-wider">
            [STEP {step}: IDENTITY & DATE]
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">
                HACKATHON NAME
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#141416] border border-[#27272A] focus:border-[#FF5500] text-white px-4 py-3 rounded-xl text-xs outline-none"
                placeholder="e.g. Brainrot Engine V1"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">
                DATE SPAN
              </label>
              <input
                type="text"
                required
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full bg-[#141416] border border-[#27272A] focus:border-[#FF5500] text-white px-4 py-3 rounded-xl text-xs outline-none"
                placeholder="e.g. June 13-15, 2026"
              />
            </div>
          </div>

          <div className="font-mono">
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">
              GEN Z SLOGAN
            </label>
            <input
              type="text"
              required
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              className="w-full bg-[#141416] border border-[#27272A] focus:border-[#FF5500] text-white px-4 py-3 rounded-xl text-xs outline-none"
              placeholder="e.g. Manifest ridiculous prototypes at 3 AM"
            />
          </div>

          <div className="font-mono">
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">
              ABSURD RULES / REQUIREMENTS
            </label>
            <textarea
              rows={3}
              required
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              className="w-full bg-[#141416] border border-[#27272A] focus:border-[#FF5500] text-white p-4 rounded-xl text-xs outline-none resize-none"
            />
          </div>

          {/* Estimate Track details */}
          <div className="pt-4 border-t border-[#1F1F23] font-mono space-y-3">
            <div className="text-xs font-bold text-zinc-400 uppercase">
              ESTIMATE TRACK DETAILS
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#141416] border border-[#27272A] p-3 rounded-xl flex items-center justify-between">
                <span className="text-xs text-[#FF5500] font-bold">TRACK 01</span>
                <span className="text-xs text-white">Pure Consumer / Brainrot</span>
              </div>
              <div className="bg-[#141416] border border-[#27272A] p-3 rounded-xl flex items-center justify-between">
                <span className="text-xs text-[#FF5500] font-bold">TRACK 02</span>
                <span className="text-xs text-white">Unsupervised AI Agents</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-[#1F1F23]">
            <button
              type="button"
              onClick={() => router.push('/club-dashboard')}
              className="bg-[#141416] hover:bg-[#1A1A1E] text-zinc-300 border border-[#27272A] font-mono font-bold text-xs uppercase px-6 py-3.5 rounded-xl transition-all"
            >
              CANCEL DRAFT
            </button>

            <button
              type="submit"
              className="bg-[#FF5500] hover:bg-[#FF6611] text-black font-mono font-black text-xs uppercase px-8 py-3.5 rounded-xl shadow-[0_0_25px_rgba(255,85,0,0.5)] hover:scale-105 transition-all tracking-wider flex items-center gap-2"
            >
              {step === 3 ? 'PUBLISH HACKATHON' : 'NEXT WORKSPACE'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Panel: Glitch Branding Upload */}
        <div className="space-y-6">
          <div className="bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 space-y-6">
            <div className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-wider">
              GLITCH BRANDING UPLOAD
            </div>

            <div className="border-2 border-dashed border-[#27272A] hover:border-[#FF5500]/60 bg-[#141416] rounded-2xl p-8 text-center cursor-pointer transition-colors group">
              <Upload className="w-8 h-8 text-zinc-500 group-hover:text-[#FF5500] mx-auto mb-3 transition-colors" />
              <div className="font-mono text-xs font-bold text-white uppercase mb-1">
                DROP THE GLITCH POSTER
              </div>
              <div className="text-[10px] text-zinc-500 font-mono">
                PNG, GIF up to 20MB
              </div>
            </div>

            {/* Live Meta Preview */}
            <div className="space-y-2 font-mono">
              <div className="text-[11px] text-zinc-400 font-bold uppercase">LIVE META PREVIEW</div>
              <div className="bg-[#141416] border border-[#27272A] rounded-2xl p-4 flex items-center gap-4">
                <img
                  src={posterUrl}
                  alt="Poster"
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white uppercase">{name || 'YOUR EVENT LIVE PREVIEW'}</div>
                  <div className="text-[10px] text-[#00E599] font-bold mt-0.5">{totalBounty} track pool</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AppLayout>
  );
}

