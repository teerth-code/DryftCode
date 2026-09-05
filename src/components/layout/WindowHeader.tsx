'use client';

import React from 'react';

interface WindowHeaderProps {
  subtag?: string;
  title: string;
  badge?: string;
  children?: React.ReactNode;
}

export function WindowHeader({ subtag, title, badge, children }: WindowHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-[#1F1F23] gap-4">
      <div>
        {subtag && (
          <div className="font-script text-2xl text-[#FF5500] leading-none mb-1">
            {subtag}
          </div>
        )}
        <div className="flex items-center gap-3">
          <h1 className="font-mono text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            {title}
          </h1>
          {badge && (
            <span className="bg-[#18181B] text-[#00E599] border border-[#00E599]/30 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {children}

        {/* Terminal window dots */}
        <div className="flex items-center gap-1.5 bg-[#141416] px-3 py-1.5 rounded-full border border-zinc-800/80">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF3344] shadow-[0_0_8px_rgba(255,51,68,0.6)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFB800] shadow-[0_0_8px_rgba(255,184,0,0.6)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#00E599] shadow-[0_0_8px_rgba(0,229,153,0.6)]" />
        </div>
      </div>
    </div>
  );
}

