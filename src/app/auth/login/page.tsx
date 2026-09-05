'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Terminal, Shield, ArrowRight, Github, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setUserRole } = useApp();
  const [activeTab, setActiveTab] = useState<'hacker' | 'organizer'>('hacker');
  const [email, setEmail] = useState('hacker@driftcode.dev');
  const [password, setPassword] = useState('••••••••••••');
  const [keepActive, setKeepActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole(activeTab === 'hacker' ? 'hacker' : 'club');
    if (activeTab === 'hacker') {
      router.push('/my-hackathons');
    } else {
      router.push('/club-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#080809] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5500]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Logo */}
      <Link href="/" className="flex flex-col items-center gap-2 mb-8 group">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF5500] rounded-xl flex items-center justify-center font-mono font-black text-black text-2xl shadow-[0_0_25px_rgba(255,85,0,0.6)] group-hover:scale-105 transition-transform">
            D
          </div>
          <div className="flex items-baseline">
            <span className="font-mono font-black text-3xl text-white uppercase tracking-wider">
              DRIFT
            </span>
            <span className="font-script text-[#FF5500] font-normal italic lowercase text-4xl ml-0.5">
              code
            </span>
          </div>
        </div>
        <div className="font-script text-2xl text-[#FF5500]">
          unhinged builds in the dark.
        </div>
      </Link>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#0E0E10] border border-[#222226] rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative z-10">
        <p className="text-zinc-400 text-xs font-mono text-center mb-6 leading-relaxed">
          Sign in to access your hackathon workspaces, build consoles, and project pipelines.
        </p>

        {/* Role Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-[#141416] p-1.5 rounded-xl border border-zinc-800 mb-6 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('hacker')}
            className={`py-2.5 rounded-lg font-bold transition-all uppercase ${
              activeTab === 'hacker'
                ? 'bg-[#FF5500] text-black shadow-[0_0_15px_rgba(255,85,0,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            STUDENT HACKER
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('organizer')}
            className={`py-2.5 rounded-lg font-bold transition-all uppercase ${
              activeTab === 'organizer'
                ? 'bg-[#FF5500] text-black shadow-[0_0_15px_rgba(255,85,0,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            ORGANIZER CLUB
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 font-mono">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">
              TERMINAL ID (EMAIL)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#141416] border border-[#27272A] focus:border-[#FF5500] text-white pl-11 pr-4 py-3 rounded-xl text-xs outline-none transition-colors"
                placeholder="hacker@driftcode.dev"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">
              ACCESS KEY (PASSWORD)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#141416] border border-[#27272A] focus:border-[#FF5500] text-white pl-11 pr-4 py-3 rounded-xl text-xs outline-none transition-colors"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={keepActive}
                onChange={(e) => setKeepActive(e.target.checked)}
                className="accent-[#FF5500] rounded"
              />
              <span>Keep terminal session active</span>
            </label>
            <a href="#" className="hover:text-[#FF5500] transition-colors">
              Forgot credentials?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF5500] hover:bg-[#FF6611] text-black font-mono font-black text-xs uppercase py-4 rounded-xl shadow-[0_0_25px_rgba(255,85,0,0.5)] hover:scale-[1.02] transition-all tracking-wider flex items-center justify-center gap-2"
          >
            EXECUTE AUTHENTICATION <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-[#1F1F23] text-center space-y-4 font-mono">
          <Link
            href="/auth/login"
            onClick={(e) => {
              e.preventDefault();
              alert("Registration account sequence initialized! Logged in as demo hacker.");
              router.push('/my-hackathons');
            }}
            className="text-xs text-[#FF5500] font-bold uppercase hover:underline"
          >
            MANIFEST NEW ACCOUNT
          </Link>

          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-3">
              OR FEDERATED GATEWAYS
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleSubmit}
                className="bg-[#141416] hover:bg-[#1A1A1E] border border-[#27272A] text-zinc-300 px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors"
              >
                Google SSO
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[#141416] hover:bg-[#1A1A1E] border border-[#27272A] text-zinc-300 px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors"
              >
                <Github className="w-3.5 h-3.5" /> GitHub
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[#141416] hover:bg-[#1A1A1E] border border-[#27272A] text-zinc-300 px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors"
              >
                GitLab
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
