'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { WindowHeader } from '@/components/layout/WindowHeader';
import { useApp } from '@/context/AppContext';
import { Upload, ArrowRight, Save, CheckCircle, Code, Layers } from 'lucide-react';

export default function ProjectSubmissionPage() {
  const params = useParams();
  const router = useRouter();
  const hackathonId = (params?.hackathonId as string) || 'driftcode-chaos-v1';
  
  const { hackathons, submitProject } = useApp();
  const hackathon = hackathons.find(h => h.id === hackathonId) || hackathons[0];

  const [step, setStep] = useState(2);
  const [projectTitle, setProjectTitle] = useState('TIKTOK_BYPASS_AGENT');
  const [teamName, setTeamName] = useState('DRIFT_CHAOTICS');
  const [track, setTrack] = useState('Absurd Consumer Tools');
  const [description, setDescription] = useState('A Chrome agent that scrapes algorithmic visual streams, isolates high-frequency kinetic audio logs, and injects retro analog noise artifacts to throw off central attention trackers.');
  const [githubUrl, setGithubUrl] = useState('github.com/chaos_sf/tiktok_bypasser_extreme');
  const [demoUrl, setDemoUrl] = useState('tiktok-bypass.chaos_sf.vercel.app');
  const [techStackInput, setTechStackInput] = useState('Next.js, Tailwind, Rust Core, WebAssembly, GPT-4o API');
  const [signaturesInput, setSignaturesInput] = useState('@hack_x69, @synth_beats, @brainrot_ops');
  const [integrity, setIntegrity] = useState(90);
  const [previewImage, setPreviewImage] = useState('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const techStack = techStackInput.split(',').map(s => s.trim()).filter(Boolean);
    const teamMembers = signaturesInput.split(',').map(s => s.trim()).filter(Boolean);

    const subId = submitProject({
      hackathonId: hackathon.id,
      hackathonName: hackathon.name,
      title: projectTitle,
      teamName,
      track,
      trackId: 'tr_2',
      description,
      githubUrl,
      demoUrl,
      techStack,
      teamMembers,
      mediaPreview: previewImage
    });

    router.push(`/submission-status/${subId}`);
  };

  return (
    <AppLayout>
      <WindowHeader subtag="ship it." title="TERMINAL INTAKE" badge="PIPELINE ACTIVE" />

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
          SYSTEM METADATA
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
          CODE & DEMO REPO
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
          LIVE DEPLOY TEST
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Fields */}
        <div className="lg:col-span-2 bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 md:p-8 space-y-6">
          <div className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-wider">
            [STEP {step}: ARTIFACT DEPLOYMENT]
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">
                PROJECT TITLE
              </label>
              <input
                type="text"
                required
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full bg-[#141416] border border-[#27272A] focus:border-[#FF5500] text-white px-4 py-3 rounded-xl text-xs outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">
                TARGET TRACK
              </label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full bg-[#141416] border border-[#27272A] focus:border-[#FF5500] text-white px-4 py-3 rounded-xl text-xs outline-none cursor-pointer"
              >
                <option value="Absurd Consumer Tools">Absurd Consumer Tools</option>
                <option value="Autonomous Chaos Agents">Autonomous Chaos Agents</option>
                <option value="Hacker Infrastructure">Hacker Infrastructure</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">
                GITHUB REPOSITORY LINK
              </label>
              <input
                type="text"
                required
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full bg-[#141416] border border-[#27272A] focus:border-[#FF5500] text-white px-4 py-3 rounded-xl text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">
                LIVE DEMO URL
              </label>
              <input
                type="text"
                required
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                className="w-full bg-[#141416] border border-[#27272A] focus:border-[#FF5500] text-white px-4 py-3 rounded-xl text-xs outline-none"
              />
            </div>
          </div>

          <div className="font-mono">
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">
              TECH STACK LABELS
            </label>
            <input
              type="text"
              required
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              className="w-full bg-[#141416] border border-[#27272A] focus:border-[#FF5500] text-white px-4 py-3 rounded-xl text-xs outline-none"
            />
          </div>

          <div className="font-mono">
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">
              TEAM ALLIANCE SIGNATURES
            </label>
            <input
              type="text"
              required
              value={signaturesInput}
              onChange={(e) => setSignaturesInput(e.target.value)}
              className="w-full bg-[#141416] border border-[#27272A] focus:border-[#FF5500] text-white px-4 py-3 rounded-xl text-xs outline-none"
            />
          </div>

          <div className="font-mono">
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">
              ABSURDITY & HYPE BRIEF
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#141416] border border-[#27272A] focus:border-[#FF5500] text-white p-4 rounded-xl text-xs outline-none resize-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1F1F23]">
            <button
              type="button"
              onClick={() => alert("Draft saved locally!")}
              className="bg-[#141416] hover:bg-[#1A1A1E] text-zinc-300 border border-[#27272A] font-mono font-bold text-xs uppercase px-6 py-3.5 rounded-xl transition-all"
            >
              SAVE CURRENT COMPILE
            </button>

            <button
              type="submit"
              className="bg-[#FF5500] hover:bg-[#FF6611] text-black font-mono font-black text-xs uppercase px-8 py-3.5 rounded-xl shadow-[0_0_25px_rgba(255,85,0,0.5)] hover:scale-105 transition-all tracking-wider flex items-center gap-2"
            >
              COMPILE & TRANSMIT <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Panel: Media Demo Vault */}
        <div className="space-y-6">
          <div className="bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 space-y-6">
            <div className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-wider">
              MEDIA DEMO VAULT
            </div>

            {/* Dropzone */}
            <div className="border-2 border-dashed border-[#27272A] hover:border-[#FF5500]/60 bg-[#141416] rounded-2xl p-8 text-center cursor-pointer transition-colors group">
              <Upload className="w-8 h-8 text-zinc-500 group-hover:text-[#FF5500] mx-auto mb-3 transition-colors" />
              <div className="font-mono text-xs font-bold text-white uppercase mb-1">
                DROP THE GLITCH PREVIEW (MP4, GIF)
              </div>
              <div className="text-[10px] text-zinc-500 font-mono">
                Up to 100MB video demo file
              </div>
            </div>

            {/* Integrity Meter */}
            <div className="space-y-2 font-mono">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-400 uppercase">INTEGRITY RATING</span>
                <span className="text-[#00E599]">{integrity}% COMPILED</span>
              </div>
              <div className="w-full h-2.5 bg-[#141416] rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-[#00E599] rounded-full shadow-[0_0_12px_rgba(0,229,153,0.6)] transition-all duration-500"
                  style={{ width: `${integrity}%` }}
                />
              </div>
            </div>

            {/* Live Preview Card */}
            <div className="rounded-2xl overflow-hidden border border-[#27272A] relative bg-[#141416]">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-36 object-cover opacity-80"
              />
              <div className="p-4 bg-[#0E0E10]">
                <div className="font-mono text-xs font-bold text-white uppercase">{projectTitle}</div>
                <div className="font-mono text-[10px] text-[#FF5500] mt-0.5">{hackathon.name}</div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AppLayout>
  );
}

