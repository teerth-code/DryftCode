'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { WindowHeader } from '@/components/layout/WindowHeader';
import { useApp } from '@/context/AppContext';
import { Bell, CheckCheck, ShieldCheck, Flame, Cpu, Trophy, AlertTriangle } from 'lucide-react';

export default function SignalFeedPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'BADGE': return <Flame className="w-5 h-5 text-[#FF5500]" />;
      case 'COMPILER': return <Cpu className="w-5 h-5 text-[#00E599]" />;
      case 'ARENA': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'JUDGEMENT': return <Trophy className="w-5 h-5 text-[#FF5500]" />;
      default: return <Bell className="w-5 h-5 text-zinc-400" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppLayout>
      <WindowHeader subtag="stay wired." title="SIGNAL FEED" badge={`${unreadCount} UNREAD`} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: All Transmissions */}
        <div className="lg:col-span-2 bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between font-mono">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              ALL TRANSMISSIONS
            </div>
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-[#FF5500] hover:underline font-bold uppercase flex items-center gap-1.5"
            >
              <CheckCheck className="w-4 h-4" /> MARK ALL AS READ
            </button>
          </div>

          <div className="space-y-4 font-mono">
            {notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => markNotificationRead(item.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  !item.read
                    ? 'bg-[#18181C] border-[#FF5500]/50 shadow-[0_0_15px_rgba(255,85,0,0.15)]'
                    : 'bg-[#121215] border-[#222226] opacity-80'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-[#141417] border border-zinc-800 shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-white uppercase">{item.title}</div>
                    <div className="text-[10px] text-zinc-500">{item.timestamp}</div>
                  </div>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Oracle Heuristics Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#0E0E10] border border-[#222226] rounded-3xl p-6 space-y-6 font-mono">
            <div className="text-xs font-bold text-[#FF5500] uppercase tracking-wider">
              ORACLE HEURISTICS
            </div>

            <div className="bg-[#141416] p-4 rounded-2xl border border-zinc-800 space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase">UNREAD SIGNALS</div>
              <div className="text-xl font-black text-amber-500">{unreadCount} SYSTEM FLAGS</div>
            </div>

            <div className="bg-[#141416] p-4 rounded-2xl border border-zinc-800 space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase">INTEGRITY METRICS</div>
              <div className="text-xl font-black text-[#00E599]">ALL PIPELINES GREEN</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

