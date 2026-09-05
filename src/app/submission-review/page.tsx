'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { WindowHeader } from '@/components/layout/WindowHeader';
import { useApp } from '@/context/AppContext';
import { ProjectSubmission } from '@/types';
import { Check, Star, Award, CheckCircle2, Sliders } from 'lucide-react';

export default function SubmissionReviewPage() {
  const { submissions, updateSubmissionStatus } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [selectedSub, setSelectedSub] = useState<ProjectSubmission>(submissions[1] || submissions[0]);
  const [brainrotQuotient, setBrainrotQuotient] = useState(9.8);
  const [technicalAudacity, setTechnicalAudacity] = useState(8.5);

  const filtered = submissions.filter(s => {
    if (selectedFilter === 'BRAINROT') return s.track.includes('Consumer') || s.track.includes('Brainrot');
    if (selectedFilter === 'AGENTS') return s.track.includes('Agents');
    return true;
  });

  const handleLogVerdict = () => {
    updateSubmissionStatus(
      selectedSub.id,
      'VERDICT',
      'WINNER',
      { brainrotQuotient, technicalAudacity }
    );
    alert(`Official verdict logged for ${selectedSub.title}! Winner status assigned.`);
  };

  return (
    <AppLayout>
      <WindowHeader subtag="the verdict." title="SUBMISSION ORACLE" badge="REVIEW MATRIX" />

      {/* Filter Tabs */}
      <div className="flex items-center gap-3 border-b border-[#1F1F23] pb-4 mb-8 font-mono text-xs overflow-x-auto">
        <button
          onClick={() => setSelectedFilter('ALL')}
          className={`px-4 py-2 rounded-xl font-bold uppercase transition-all ${
            selectedFilter === 'ALL'
              ? 'bg-[#FF5500] text-black shadow-[0_0_15px_rgba(255,85,0,0.4)]'
              : 'bg-[#121214] text-zinc-400 hover:text-white border border-zinc-800'
          }`}
        >
          ALL SHIPS ({submissions.length})
        </button>
        <button
          onClick={() => setSelectedFilter('BRAINROT')}
          className={`px-4 py-2 rounded-xl font-bold uppercase transition-all ${
            selectedFilter === 'BRAINROT'
              ? 'bg-[#FF5500] text-black shadow-[0_0_15px_rgba(255,85,0,0.4)]'
              : 'bg-[#121214] text-zinc-400 hover:text-white border border-zinc-800'
          }`}
        >
          BRAINROT TRACK
        </button>
        <button
          onClick={() => setSelectedFilter('AGENTS')}
          className={`px-4 py-2 rounded-xl font-bold uppercase transition-all ${
            selectedFilter === 'AGENTS'
              ? 'bg-[#FF5500] text-black shadow-[0_0_15px_rgba(255,85,0,0.4)]'
              : 'bg-[#121214] text-zinc-400 hover:text-white border border-zinc-800'
          }`}
        >
          AUTONOMOUS AGENTS
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Table of Submissions */}
        <div className="lg:col-span-2 bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#1F1F23] text-zinc-500 uppercase">
                  <th className="pb-4 font-bold">PROJECT</th>
                  <th className="pb-4 font-bold">TRACK</th>
                  <th className="pb-4 font-bold">TIME</th>
                  <th className="pb-4 font-bold text-right">JUDGEMENT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1E]">
                {filtered.map((sub) => {
                  const isSelected = selectedSub?.id === sub.id;

                  return (
                    <tr
                      key={sub.id}
                      onClick={() => setSelectedSub(sub)}
                      className={`cursor-pointer transition-colors hover:bg-[#141417] ${
                        isSelected ? 'bg-[#18181C] border-l-2 border-[#FF5500]' : ''
                      }`}
                    >
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={sub.mediaPreview || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&q=80'}
                            alt=""
                            className="w-9 h-9 rounded-lg object-cover border border-[#27272A]"
                          />
                          <div>
                            <div className="font-bold text-white uppercase">{sub.title}</div>
                            <div className="text-[10px] text-zinc-500">{sub.teamName}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-2 text-zinc-400">{sub.track}</td>
                      <td className="py-4 px-2 text-zinc-500">{sub.submittedTime}</td>

                      <td className="py-4 pl-4 text-right">
                        <span
                          className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                            sub.judgement === 'WINNER'
                              ? 'bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/40 font-black'
                              : sub.judgement === 'REVIEWED'
                              ? 'bg-[#FF5500]/10 text-[#FF5500] border border-[#FF5500]/40'
                              : 'bg-zinc-800/80 text-zinc-400 border border-zinc-700'
                          }`}
                        >
                          {sub.judgement || 'PENDING'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel: Submission Brief */}
        <div className="bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 space-y-6">
          <div>
            <div className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-wider mb-1">
              SUBMISSION BRIEF
            </div>
            <h2 className="font-mono text-2xl font-black text-white uppercase">
              {selectedSub?.title || 'MEME-TRADING BOT'}
            </h2>
          </div>

          {/* Absurdity & Chaos notes */}
          <div className="bg-[#141416] border border-[#27272A] p-4 rounded-2xl space-y-2">
            <div className="font-mono text-xs font-bold text-[#FF5500] uppercase">
              ABSURDITY & CHAOS DEPLOYED
            </div>
            <p className="text-zinc-300 text-xs font-sans leading-relaxed">
              {selectedSub?.description}
            </p>
          </div>

          {/* Tech tags */}
          <div className="space-y-2 font-mono">
            <div className="text-[11px] text-zinc-400 font-bold uppercase">COMPILED WITH</div>
            <div className="flex flex-wrap gap-2">
              {(selectedSub?.techStack || ['Node.js', 'GPT-4o', 'Solana Devkit']).map((t, idx) => (
                <span key={idx} className="bg-[#18181C] text-zinc-300 border border-zinc-700 text-xs px-3 py-1 rounded-lg">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Rubric Rating */}
          <div className="space-y-4 pt-4 border-t border-[#1F1F23] font-mono">
            <div className="text-xs text-[#FF5500] font-bold uppercase tracking-wider">
              ORACLE RUBRIC RATING
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Brainrot Quotient</span>
                <span className="font-bold text-[#FF5500] text-sm">{brainrotQuotient} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={brainrotQuotient}
                onChange={(e) => setBrainrotQuotient(parseFloat(e.target.value))}
                className="w-full accent-[#FF5500]"
              />

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-zinc-400">Technical Audacity</span>
                <span className="font-bold text-[#FF5500] text-sm">{technicalAudacity} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={technicalAudacity}
                onChange={(e) => setTechnicalAudacity(parseFloat(e.target.value))}
                className="w-full accent-[#FF5500]"
              />
            </div>
          </div>

          <button
            onClick={handleLogVerdict}
            className="w-full bg-[#FF5500] hover:bg-[#FF6611] text-black font-mono font-black text-xs uppercase py-4 rounded-xl shadow-[0_0_25px_rgba(255,85,0,0.5)] hover:scale-105 transition-all tracking-wider flex items-center justify-center gap-2"
          >
            LOG OFFICIAL VERDICT <Check className="w-4 h-4" />
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

