import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'DryftCode // DRIFTcode Chaos - Unhinged Builds in the Dark',
  description: 'The Gen Z hacker arena and build conflict platform for autonomous agents, absurd consumer tools, and deep hacker infrastructure.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080809] text-gray-100 min-h-screen antialiased selection:bg-[#FF5500] selection:text-white">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
