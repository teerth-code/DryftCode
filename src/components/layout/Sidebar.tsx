'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Home,
  Terminal,
  FileCheck,
  User,
  Compass,
  Briefcase,
  Bell,
  Trophy,
  Settings
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useApp();

  const navItems = [
    {
      label: 'Club Dashboard',
      sublabel: 'your hq.',
      href: '/club-dashboard',
      icon: Home
    },
    {
      label: 'Create Hackathon',
      sublabel: 'cook something up.',
      href: '/create-hackathon',
      icon: Terminal
    },
    {
      label: 'Submission Review',
      sublabel: 'the verdict.',
      href: '/submission-review',
      icon: FileCheck
    },
    {
      label: 'Hacker Profile',
      sublabel: 'your legacy.',
      href: '/profile',
      icon: User
    },
    {
      label: 'Discovery Radar',
      sublabel: 'find your arena.',
      href: '/discovery',
      icon: Compass
    },
    {
      label: 'My Hackathons',
      sublabel: 'your journey.',
      href: '/my-hackathons',
      icon: Briefcase
    },
    {
      label: 'Signal Feed',
      sublabel: 'stay wired.',
      href: '/notifications',
      icon: Bell
    },
    {
      label: 'Leaderboard',
      sublabel: 'flex your wins.',
      href: '/leaderboard',
      icon: Trophy
    }
  ];

  return (
    <aside className="w-64 bg-[#0A0A0C] border-r border-[#1B1B1E] min-h-screen flex flex-col justify-between p-4 sticky top-0 h-screen z-40">
      <div>
        {/* Logo Header */}
        <Link href="/" className="flex items-center gap-3 px-2 py-4 mb-4 group">
          <div className="w-8 h-8 bg-[#FF5500] rounded-lg flex items-center justify-center font-mono font-black text-black text-lg shadow-[0_0_15px_rgba(255,85,0,0.5)] group-hover:scale-105 transition-transform">
            D
          </div>
          <div className="flex items-baseline">
            <span className="font-mono font-black text-xl text-white uppercase tracking-wider">
              DRIFT
            </span>
            <span className="font-script text-[#FF5500] font-normal italic lowercase text-2xl ml-0.5">
              code
            </span>
          </div>
        </Link>

        {/* Navigation items */}
        <nav className="space-y-2 overflow-y-auto max-h-[calc(100vh-210px)] pr-1 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-start gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#141417] border-2 border-[#FF5500] text-white shadow-[0_0_15px_rgba(255,85,0,0.2)]'
                    : 'text-zinc-400 hover:text-white hover:bg-[#121215] border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 mt-1 transition-colors ${isActive ? 'text-[#FF5500]' : 'text-zinc-400 group-hover:text-[#FF5500]'}`} />
                <div>
                  <div className="font-mono text-xs font-bold uppercase tracking-wide leading-tight text-white">
                    {item.label}
                  </div>
                  <div className={`font-script text-sm leading-tight italic ${isActive ? 'text-[#FF5500]' : 'text-zinc-500 group-hover:text-amber-500'}`}>
                    {item.sublabel}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile / Club Widget */}
      <div className="pt-4 border-t border-[#1B1B1E]">
        <div className="bg-[#121215] border border-[#242428] rounded-2xl p-3 flex items-center justify-between group hover:border-[#FF5500]/50 transition-colors">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-xl object-cover border border-[#FF5500]/60"
            />
            <div className="truncate">
              <div className="font-mono text-xs font-bold text-white uppercase truncate">
                CHAOS CLUB SF
              </div>
              <div className="text-[11px] text-zinc-400 font-mono truncate">
                @chaos_sf
              </div>
            </div>
          </div>
          <button className="text-zinc-500 hover:text-white p-1 rounded-md transition-colors" title="Settings">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
