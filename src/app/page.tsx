'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Zap,
  Terminal,
  Trophy,
  Users,
  Clock,
  ExternalLink,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Flame,
  Code
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function LandingPage() {
  const { hackathons } = useApp();
  const mainHackathon = hackathons[0];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Who is this for actually?",
      a: "Devs, designers, cyber-curators, game orchestrators, and absolute maniacs who can assemble fully functioning code structures under the influence of extreme late-night adrenaline. If you've ever spent 8 hours on a Saturday building a tool that translates movie lines into pirate code, you're the target audience."
    },
    {
      q: "What if I don't have a team?",
      a: "Don't sweat it. 50% of people show up completely solo. We have dedicated conceptual matchmaker spaces and team drafting sequences at the opening to hook you up with aligned builders."
    },
    {
      q: "Do I have to build an AI product?",
      a: "Nope. You can build whatever you want as long as it fits into the core arena descriptions. Consumer platforms, mechanical hardware tools, unhinged games, or cyber shields are all extremely fair game."
    },
    {
      q: "How much does it cost?",
      a: "Exactly $0. Admission is fully covered including premium food, specialized late-night energy shots, physical prizes, and limited-edition chaos shirts."
    }
  ];

  return (
    <div className="min-h-screen bg-[#060607] text-white selection:bg-[#FF5500] selection:text-white font-sans relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#FF5500]/15 via-[#FF5500]/5 to-transparent blur-[140px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#080809]/80 border-b border-[#1A1A1E]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-[#FF5500] rounded-lg flex items-center justify-center font-mono font-black text-black text-xl shadow-[0_0_20px_rgba(255,85,0,0.6)] group-hover:scale-105 transition-transform">
              D
            </div>
            <div className="flex items-baseline">
              <span className="font-mono font-black text-2xl text-white uppercase tracking-wider">
                DRIFT
              </span>
              <span className="font-script text-[#FF5500] font-normal italic lowercase text-3xl ml-0.5">
                code
              </span>
              <span className="font-script text-amber-500 font-normal lowercase text-xl ml-2 hidden sm:inline-block">
                // chaos
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-mono text-xs text-[#A0A0AA] tracking-wider uppercase">
            <a href="#vibe" className="hover:text-[#FF5500] transition-colors">// the-vibe</a>
            <a href="#tracks" className="hover:text-[#FF5500] transition-colors">// tracks</a>
            <a href="#bounty" className="hover:text-[#FF5500] transition-colors">// bounty</a>
            <a href="#schedule" className="hover:text-[#FF5500] transition-colors">// schedule</a>
            <a href="#faq" className="hover:text-[#FF5500] transition-colors">// questions</a>
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-2 bg-[#121215] border border-[#27272A] px-3 py-1.5 rounded-full font-mono text-[11px] text-[#00E599] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse" />
              100 SPACES LEFT
            </span>
            <Link
              href="/discovery"
              className="bg-[#FF5500] hover:bg-[#FF6611] text-black font-mono font-bold text-xs uppercase px-5 py-2.5 rounded-xl shadow-[0_0_25px_rgba(255,85,0,0.5)] hover:shadow-[0_0_35px_rgba(255,85,0,0.8)] transition-all tracking-wider flex items-center gap-2"
            >
              ENTER VOID <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <section className="relative pt-12 pb-20 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#FF5500]/40 px-4 py-1.5 rounded-full">
            <span className="font-mono text-xs font-bold text-[#FF5500]">
              [FEB 21-23] • SF, CALIFORNIA
            </span>
            <span className="text-zinc-600">|</span>
            <span className="font-mono text-xs text-zinc-400">
              LATE-NIGHT GEN Z CODING SPREE
            </span>
          </div>

          <h1 className="font-mono font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-white uppercase leading-[0.9]">
            BREEDING <br />
            <span className="font-script font-normal text-[#FF5500] text-5xl sm:text-7xl md:text-8xl lg:text-9xl lowercase normal-case inline-block -rotate-2 -mr-2">
              creative
            </span>{" "}
            <span className="text-[#FF5500] text-glow-orange">CHAOS</span> <br />
            IN THE DARK.
          </h1>

          <p className="max-w-2xl mx-auto font-sans text-sm sm:text-base text-zinc-400 leading-relaxed pt-4">
            No corporate suits. No boring panels. Just 36 hours of raw, unhinged building with 400 of the weirdest hackers, creators, and brainrot-architects. We provide the fuel (energy drinks + ambient beats); you manifest the tech.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <Link
              href="/auth/login"
              className="bg-[#FF5500] hover:bg-[#FF6611] text-black font-mono font-black text-sm uppercase px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(255,85,0,0.6)] hover:scale-105 transition-all tracking-wider flex items-center gap-3"
            >
              SUBMIT APPLICATION <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="bg-[#141417] hover:bg-[#1A1A1E] text-white border border-[#27272A] hover:border-zinc-700 font-mono font-bold text-sm uppercase px-8 py-4 rounded-xl transition-all tracking-wider"
            >
              JOIN DISCORD
            </a>
          </div>
        </motion.div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-8 border-t border-[#1F1F23]">
          <div>
            <div className="font-mono text-3xl md:text-4xl font-extrabold text-white">$25,000</div>
            <div className="font-mono text-xs text-zinc-500 uppercase mt-1">Total Cash Pool</div>
          </div>
          <div>
            <div className="font-mono text-3xl md:text-4xl font-extrabold text-white">400+</div>
            <div className="font-mono text-xs text-zinc-500 uppercase mt-1">Devs Expected</div>
          </div>
          <div>
            <div className="font-mono text-3xl md:text-4xl font-extrabold text-white">36h</div>
            <div className="font-mono text-xs text-zinc-500 uppercase mt-1">Of Pure Adrenaline</div>
          </div>
          <div>
            <div className="font-mono text-3xl md:text-4xl font-extrabold text-white">3</div>
            <div className="font-mono text-xs text-zinc-500 uppercase mt-1">Cursed Tracks</div>
          </div>
        </div>

        {/* Countdown Timer Box */}
        <div className="mt-16 bg-[#0E0E10] border border-[#222226] rounded-3xl p-8 max-w-3xl mx-auto relative overflow-hidden">
          <div className="font-script text-2xl text-[#FF5500] mb-4">
            Tick tock... the servers spin up in
          </div>
          <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto font-mono">
            <div className="bg-[#161619] border border-[#2A2A30] rounded-2xl p-4">
              <div className="text-3xl md:text-5xl font-black text-white">12</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">DAYS</div>
            </div>
            <div className="bg-[#161619] border border-[#2A2A30] rounded-2xl p-4">
              <div className="text-3xl md:text-5xl font-black text-white">08</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">HOURS</div>
            </div>
            <div className="bg-[#161619] border border-[#2A2A30] rounded-2xl p-4">
              <div className="text-3xl md:text-5xl font-black text-white">45</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">MINUTES</div>
            </div>
            <div className="bg-[#161619] border border-[#2A2A30] rounded-2xl p-4">
              <div className="text-3xl md:text-5xl font-black text-[#FF5500]">19</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">SECONDS</div>
            </div>
          </div>
          <p className="font-mono text-xs text-zinc-500 mt-6">
            // Warning: applications close automatically when we run out of late-night snacks.
          </p>
        </div>
      </section>

      {/* Section: The Vibe Check */}
      <section id="vibe" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#1F1F23]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden border border-[#27272A] group">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"
              alt="Hacker Vibe"
              className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 flex flex-col justify-end">
              <div className="font-mono text-xs text-[#FF5500] uppercase font-bold">// SYSTEM ARCHITECTURE</div>
              <div className="font-mono text-lg text-white font-bold">TERMINAL MONOSPACE VISION</div>
            </div>
          </div>

          <div className="space-y-6">
            <span className="font-mono text-xs bg-[#18181B] text-[#FF5500] border border-[#FF5500]/30 px-3 py-1 rounded-full uppercase font-bold tracking-wider">
              THE VIBE CHECK
            </span>
            <div className="font-script text-3xl md:text-4xl text-[#FF5500]">
              For those who dream in monospace...
            </div>
            <h2 className="font-mono text-3xl md:text-5xl font-extrabold uppercase text-white tracking-tight leading-tight">
              Manifest your wildest side projects.
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              We believe the best creations happen after midnight. When standard logic decays, and chaotic intuition takes the driver's seat. DRIFTCODE Chaos is a playground for experimental web tools, chaotic gaming agents, absurd consumer software, and anything that makes you laugh, gasp, or question the future.
            </p>
            <div className="bg-[#121215] border-l-2 border-[#FF5500] p-4 rounded-r-xl font-mono text-xs text-amber-500/90">
              Forget about standard Pitch Decks. Show us the terminal logs, show us the unhinged code repo, show us the functioning prototype.
            </div>
          </div>
        </div>
      </section>

      {/* Section: Choose Your Poison (Tracks) */}
      <section id="tracks" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#1F1F23]">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs bg-[#18181B] text-[#FF5500] border border-[#FF5500]/30 px-3 py-1 rounded-full uppercase font-bold tracking-wider">
            CHOOSE YOUR POISON
          </span>
          <div className="font-script text-3xl md:text-4xl text-[#FF5500]">
            Three arenas of absolute chaos
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainHackathon.tracks.map((track) => (
            <motion.div
              key={track.id}
              whileHover={{ y: -6 }}
              className="bg-[#0E0E10] border border-[#222226] hover:border-[#FF5500]/50 rounded-3xl p-8 transition-all relative flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-4xl font-black text-zinc-700 group-hover:text-[#FF5500] transition-colors">
                    {track.number}
                  </span>
                  <Code className="w-6 h-6 text-zinc-600 group-hover:text-[#FF5500] transition-colors" />
                </div>
                <h3 className="font-mono text-xl font-bold text-white uppercase mb-1">
                  {track.title}
                </h3>
                <div className="font-mono text-xs text-[#FF5500] uppercase mb-4">
                  {track.tagline}
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {track.description}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#1A1A1E]">
                <Link
                  href="/discovery"
                  className="font-mono text-xs font-bold text-white group-hover:text-[#FF5500] flex items-center gap-2 uppercase tracking-wider"
                >
                  SELECT TRACK <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section: Bounties */}
      <section id="bounty" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#1F1F23]">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs bg-[#18181B] text-[#FF5500] border border-[#FF5500]/30 px-3 py-1 rounded-full uppercase font-bold tracking-wider">
            THE BOUNTY
          </span>
          <div className="font-script text-3xl md:text-4xl text-[#FF5500]">
            Filthy rich payouts
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainHackathon.bounties.map((bounty, i) => (
            <div
              key={i}
              className={`bg-[#0E0E10] border rounded-3xl p-8 relative flex flex-col justify-between ${
                i === 0 ? 'border-[#FF5500] shadow-[0_0_30px_rgba(255,85,0,0.15)] bg-gradient-to-b from-[#141418] to-[#0E0E10]' : 'border-[#222226]'
              }`}
            >
              <div>
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
                  {bounty.rank}
                </div>
                <div className="font-mono text-4xl md:text-5xl font-black text-white mb-2">
                  {bounty.amount}
                </div>
                <div className="font-mono text-xs text-[#FF5500] font-bold uppercase mb-4">
                  {bounty.perks}
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {bounty.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Schedule */}
      <section id="schedule" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#1F1F23]">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs bg-[#18181B] text-[#FF5500] border border-[#FF5500]/30 px-3 py-1 rounded-full uppercase font-bold tracking-wider">
            THE LATE-NIGHT LOG
          </span>
          <div className="font-script text-3xl md:text-4xl text-[#FF5500]">
            How the weekend plays out
          </div>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto font-mono">
          {mainHackathon.schedule.map((item, index) => (
            <div
              key={index}
              className="bg-[#0E0E10] border border-[#222226] hover:border-zinc-700 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
            >
              <div className="flex items-center gap-6 min-w-[200px]">
                <div className="text-[#FF5500]">
                  <div className="text-lg font-black">{item.day}</div>
                  <div className="text-xs text-zinc-500">{item.date}</div>
                </div>
                <div className="text-sm font-bold text-amber-500 bg-[#1A1A1E] px-3 py-1 rounded-lg">
                  {item.time}
                </div>
              </div>
              <div className="flex-1">
                <div className="text-base font-bold text-white">{item.title}</div>
                <div className="text-xs text-zinc-400 font-sans mt-0.5">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Sponsors */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#1F1F23] text-center">
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">// BACKED BY THE REAL ONES</div>
        <div className="font-script text-2xl text-[#FF5500] mb-8">
          Sponsors supporting the late night culture
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 font-mono font-bold text-xs text-zinc-400 uppercase tracking-wider">
          {['HYPERBASE AI', 'REPLIT NOIR', 'AMBER COMMERCE', 'NEON VENTURES', 'OBSIDIAN LABS', 'VOID WIRELESS'].map((s, i) => (
            <div key={i} className="bg-[#0E0E10] border border-[#1F1F23] rounded-xl p-4 hover:border-[#FF5500]/50 hover:text-white transition-colors">
              {s}
            </div>
          ))}
        </div>
      </section>

      {/* Section: FAQ */}
      <section id="faq" className="py-20 px-4 md:px-8 max-w-4xl mx-auto border-t border-[#1F1F23]">
        <div className="text-center mb-16 space-y-3">
          <span className="font-mono text-xs bg-[#18181B] text-[#FF5500] border border-[#FF5500]/30 px-3 py-1 rounded-full uppercase font-bold tracking-wider">
            FOR THE CONFUSED CODERS
          </span>
          <div className="font-script text-3xl md:text-4xl text-[#FF5500]">
            Frequently asked nonsense
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#0E0E10] border border-[#222226] rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-6 text-left font-mono text-base font-bold text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openFaq === i ? 'rotate-180 text-[#FF5500]' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed border-t border-[#1F1F23] pt-4 font-sans">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section CTA: Step into the void */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="bg-gradient-to-b from-[#141418] to-[#0A0A0C] border-2 border-[#FF5500] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-[0_0_50px_rgba(255,85,0,0.25)]">
          <span className="font-mono text-xs text-[#FF5500] uppercase font-bold tracking-widest">
            THE APOCALYPSE IS NIGH
          </span>
          <div className="font-script text-4xl md:text-5xl text-[#FF5500] mt-2 mb-4">
            Step into the late-night void
          </div>
          <h2 className="font-mono text-3xl md:text-5xl font-black uppercase text-white tracking-tight mb-6">
            READY TO MANIFEST CHAOS?
          </h2>
          <p className="text-zinc-400 text-sm max-w-lg mx-auto mb-8 font-sans">
            Applications are reviewed on a rolling basis. Give us your most interesting side project URL, and we'll send you your acceptance logs in 48 hours if you qualify.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/auth/login"
              className="bg-[#FF5500] hover:bg-[#FF6611] text-black font-mono font-extrabold text-sm uppercase px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(255,85,0,0.6)] hover:scale-105 transition-all tracking-wider"
            >
              REQUEST AN INVITATION
            </Link>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="bg-[#18181C] hover:bg-zinc-800 text-white font-mono font-bold text-sm uppercase px-8 py-4 rounded-xl border border-zinc-700 transition-all tracking-wider"
            >
              STALK ON TWITTER
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1F1F23] py-12 px-4 md:px-8 max-w-7xl mx-auto font-mono text-xs text-zinc-500 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-baseline mb-1">
            <span className="font-mono font-black text-lg text-white uppercase tracking-wider">
              DRIFT
            </span>
            <span className="font-script text-[#FF5500] text-2xl font-normal italic lowercase ml-0.5">
              code
            </span>
            <span className="font-script text-amber-500 text-base font-normal lowercase ml-1">
              // chaos
            </span>
          </div>
          <div>Built under the influence of extreme late-night coding energy. © 2026.</div>
          <div className="text-[11px] text-zinc-600 mt-1">// Powered by espresso, synthetic beats, and compiler diagnostics.</div>
        </div>
        <div className="flex items-center gap-6 text-zinc-400 uppercase tracking-wider">
          <a href="#" className="hover:text-[#FF5500]">Twitter</a>
          <a href="#" className="hover:text-[#FF5500]">GitHub</a>
          <a href="#" className="hover:text-[#FF5500]">Discord</a>
          <a href="#" className="hover:text-[#FF5500]">Figma</a>
        </div>
      </footer>
    </div>
  );
}
