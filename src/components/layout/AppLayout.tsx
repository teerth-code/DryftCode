'use client';

import React from 'react';
import { Sidebar } from './Sidebar';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#080809]">
      <Sidebar />
      <main className="flex-1 min-w-0 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

