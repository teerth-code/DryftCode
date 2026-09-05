'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Hackathon,
  ProjectSubmission,
  Badge,
  NotificationItem,
  LeaderboardEntry,
  TeammateRadar,
  SubmissionStatus
} from '@/types';

interface AppContextType {
  user: UserProfile;
  hackathons: Hackathon[];
  userHackathons: string[];
  submissions: ProjectSubmission[];
  badges: Badge[];
  notifications: NotificationItem[];
  leaderboard: LeaderboardEntry[];
  teammateRadar: TeammateRadar[];
  // Actions
  joinHackathon: (hackathonId: string) => void;
  submitProject: (submission: Omit<ProjectSubmission, 'id' | 'submittedTime' | 'status' | 'integrityRating'>) => string;
  updateSubmissionStatus: (submissionId: string, status: SubmissionStatus, judgement?: 'WINNER' | 'REVIEWED' | 'PENDING', rubric?: { brainrotQuotient: number; technicalAudacity: number }) => void;
  createHackathon: (hackathon: Omit<Hackathon, 'id' | 'claimedSlots' | 'maxSlots' | 'status'>) => string;
  inviteTeammate: (teammateId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  setUserRole: (role: 'hacker' | 'organizer' | 'club') => void;
}

const initialUser: UserProfile = {
  id: 'usr_1',
  name: 'HACKER_X69',
  handle: '@hacker_x69',
  avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
  university: 'SF State University',
  bio: 'I build chaotic systems, unhinged terminal modules, and meme agents under the moonlight.',
  role: 'hacker',
  stats: {
    attended: 12,
    shipped: 8,
    badges: 4
  },
  earnedBadges: ['3 AM SOLDIER', 'MEME ARCHITECT'],
  techStack: ['Rust', 'Solidity', 'Tailwind', 'Next.js', 'Python'],
  level: 'LEVEL 3 HACKER'
};

const initialHackathons: Hackathon[] = [
  {
    id: 'driftcode-chaos-v1',
    name: 'DRIFTCODE CHAOS V1',
    slogan: 'LATE-NIGHT BAY AREA CODING SPREE',
    description: 'No corporate pitches. No boring panel talks. Just 36 hours of raw, chaotic building with 400 of the finest engineers, cyber-artists, and digital creators on the West Coast.',
    dates: 'FEB 21-23, 2026',
    location: 'SF State Campus & Hybrid',
    totalBounty: '$25,000',
    status: 'REGISTERED',
    claimedSlots: 342,
    maxSlots: 400,
    isFeatured: true,
    tracks: [
      {
        id: 'tr_1',
        number: '01',
        title: 'Autonomous Chaos Agents',
        tagline: 'For the bot orchestrators',
        description: 'Build AI entities with absolute agency. We want to see social bots that operate rogue accounts, trade cursed memetic tokens, or spin up their own smart contracts inside Discord communities.'
      },
      {
        id: 'tr_2',
        number: '02',
        title: 'Absurd Consumer Tools',
        tagline: 'Gen Z attention hacking',
        description: 'Chrome extensions that replace all text with slang, TikTok recommendation visualizers, gamified social platforms, or decentralized networks driven purely by hyperstition and internet clout.'
      },
      {
        id: 'tr_3',
        number: '03',
        title: 'Hacker Infrastructure',
        tagline: 'Deep system architecture',
        description: 'Command line enhancements, raw performance frameworks, security bypass tooling, and audio-reactive terminal streams. Pure speed, visual styling, and unhinged utility wins this track.'
      }
    ],
    bounties: [
      {
        rank: 'GRAND CHAMPION',
        title: 'Grand Prize',
        amount: '$15,000',
        perks: '+ Apple M4 Max Hardware Stack',
        description: 'Awarded to the most shockingly functional and creative build of the entire weekend.'
      },
      {
        rank: 'TRACK WINNER (×3)',
        title: 'Track Winner',
        amount: '$3,000/ea',
        perks: '+ Custom Ortho-Linear Keyboards',
        description: 'Outstanding execution, beautiful terminal interface, and pure late-night sweat equity.'
      },
      {
        rank: 'PEOPLE\'S CHOICE MEME',
        title: 'Best Meme Product',
        amount: '$1,000',
        perks: '+ Lifetime Energy Fuel Allocation',
        description: 'Absurd, chaotic, yet impeccably engineered brainrot utility tool.'
      }
    ],
    schedule: [
      { day: 'FRIDAY', date: 'FEB 21', time: '18:00', title: 'Vibe check & Team drafting sequences', description: 'Claim your desk, construct your keyboard temple, and find co-conspirators.' },
      { day: 'FRIDAY', date: 'FEB 21', time: '20:00', title: 'Hacking countdown initiated', description: 'No more talking. Let the terminal cook.' },
      { day: 'SATURDAY', date: 'FEB 22', time: '12:00', title: 'Progress audits & tacos', description: 'Get roasted / validated by specialized builders and rehydrate.' },
      { day: 'SUNDAY', date: 'FEB 23', time: '14:00', title: 'Project submissions & Live demos', description: 'Live terminal pitches. Strict 2-minute hard limits. Filthy rich payouts.' }
    ]
  },
  {
    id: 'synaptic-decay-v4',
    name: 'SYNAPTIC DECAY // VOL. 4',
    slogan: 'UNSUPERVISED NEURAL EXPEDITION',
    description: 'An unhinged build conflict in SF and Hybrid. Target consumer software, AI proxy agents, and digital noise generators.',
    dates: 'April 11-13, 2026',
    location: 'Hybrid SF',
    totalBounty: '$5,000',
    status: 'ONGOING',
    claimedSlots: 198,
    maxSlots: 250,
    tracks: [],
    bounties: [],
    schedule: []
  },
  {
    id: 'vibecheck-automation',
    name: 'VIBECHECK AUTOMATION',
    slogan: 'AUTOMATED MEMETIC CONTROL',
    description: 'Automated social sentiment engines and browser extension exploits.',
    dates: 'May 02-04, 2026',
    location: 'SF, CA',
    totalBounty: '$10,000',
    status: 'COMPLETED',
    claimedSlots: 300,
    maxSlots: 300,
    tracks: [],
    bounties: [],
    schedule: []
  },
  {
    id: 'cyberpunk-speedrun-v3',
    name: 'CYBERPUNK SPEEDRUN V3',
    slogan: 'FAST COMPILATION WARFARE',
    description: 'Ultra high-speed development contest. 24 hours to ship production WASM micro-apps.',
    dates: 'Feb 05-07, 2026',
    location: 'Online',
    totalBounty: '$10,000',
    status: 'REGISTERED',
    claimedSlots: 150,
    maxSlots: 200,
    tracks: [],
    bounties: [],
    schedule: []
  }
];

const initialSubmissions: ProjectSubmission[] = [
  {
    id: 'sub_1',
    hackathonId: 'driftcode-chaos-v1',
    hackathonName: 'DRIFTCODE CHAOS V1',
    title: 'TIKTOK_BYPASS_AGENT',
    teamName: 'DRIFT_CHAOTICS',
    track: 'Absurd Consumer Tools',
    trackId: 'tr_2',
    description: 'A Chrome agent that scrapes algorithmic visual streams, isolates high-frequency kinetic audio logs, and injects retro analog noise artifacts to throw off central attention trackers.',
    githubUrl: 'github.com/chaos_sf/tiktok_bypasser_extreme',
    demoUrl: 'tiktok-bypass.chaos_sf.vercel.app',
    techStack: ['Next.js', 'Tailwind', 'Rust Core', 'WebAssembly', 'GPT-4o API'],
    teamMembers: ['@hacker_x69', '@synth_beats', '@brainrot_ops'],
    mediaPreview: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80',
    integrityRating: 90,
    status: 'SUBMITTED',
    judgement: 'WINNER',
    submittedTime: '03:22 AM',
    rubricRating: {
      brainrotQuotient: 9.8,
      technicalAudacity: 8.5
    },
    score: 91.5,
    prizeBounty: '$15,000 + M4 Max Stack'
  },
  {
    id: 'sub_2',
    hackathonId: 'driftcode-chaos-v1',
    hackathonName: 'DRIFTCODE CHAOS V1',
    title: 'Meme-trading Bot',
    teamName: 'Autonomous Bros',
    track: 'Autonomous Chaos Agents',
    trackId: 'tr_1',
    description: 'This agent analyzes Twitter trends for brainrot words and instantly deploys tiny micro-cap tokens named after those words. It debates simulated traders in Discord until it starts a cult.',
    githubUrl: 'github.com/autonomous-bros/meme-trader',
    demoUrl: 'meme-trader.chaos.app',
    techStack: ['Node.js', 'GPT-4o', 'Solana Devkit'],
    teamMembers: ['@hacker_x69', '@sol_rebel'],
    mediaPreview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
    integrityRating: 95,
    status: 'UNDER REVIEW',
    judgement: 'REVIEWED',
    submittedTime: '04:01 AM',
    rubricRating: {
      brainrotQuotient: 9.8,
      technicalAudacity: 8.5
    },
    score: 94.8,
    prizeBounty: '$3,000'
  },
  {
    id: 'sub_3',
    hackathonId: 'synaptic-decay-v4',
    hackathonName: 'SYNAPTIC DECAY // VOL. 4',
    title: 'HackerTerminal Ext.',
    teamName: 'Static Devs',
    track: 'Hacker Infrastructure',
    trackId: 'tr_3',
    description: 'Command line extension for live visualizer audio streams.',
    githubUrl: 'github.com/static-devs/hacker-term',
    demoUrl: 'hacker-term.dev',
    techStack: ['Rust', 'WASM'],
    teamMembers: ['@wasm_master'],
    integrityRating: 85,
    status: 'SUBMITTED',
    judgement: 'PENDING',
    submittedTime: '04:19 AM'
  }
];

const initialBadges: Badge[] = [
  {
    id: 'bdg_1',
    name: '3 AM SOLDIER',
    tagline: 'Active build past 3 AM',
    description: 'Compiled production code between 3:00 AM and 5:00 AM during a live conflict.',
    iconName: 'Flame',
    unlocked: true
  },
  {
    id: 'bdg_2',
    name: 'MEME BUILDER',
    tagline: 'Build with 9.5+ rot score',
    description: 'Achieved an Oracle Brainrot Quotient above 9.5 on official submission.',
    iconName: 'Crown',
    unlocked: true
  },
  {
    id: 'bdg_3',
    name: 'GOD COMPILER',
    tagline: 'WASM compile under 50ms',
    description: 'Achieved ultra fast WebAssembly compilation latency.',
    iconName: 'Zap',
    unlocked: false
  },
  {
    id: 'bdg_4',
    name: 'TERMINAL OVERLORD',
    tagline: '12/15 ships completed',
    description: 'Ship 15 verified builds across hackathons.',
    iconName: 'Terminal',
    unlocked: false,
    progress: 80
  }
];

const initialNotifications: NotificationItem[] = [
  {
    id: 'nt_1',
    type: 'BADGE',
    title: 'BADGE UNLOCKED LEGACY',
    description: 'You earned the \'DRIFTCODE Oracle\' badge for compiling 3 projects before 3:00 AM.',
    timestamp: '10m ago',
    read: false
  },
  {
    id: 'nt_2',
    type: 'COMPILER',
    title: 'SUBMISSION COMPOSITION RECEIVED',
    description: 'Artifact \'MEME-TRADING BOT\' has successfully bypassed sanity check arrays.',
    timestamp: '2h ago',
    read: false
  },
  {
    id: 'nt_3',
    type: 'ARENA',
    title: 'DRIFTCODE CHAOS V1 INITIATION',
    description: 'Rolling entry is closing. Over 380 hackers verified. Claim space now.',
    timestamp: '4h ago',
    read: true
  },
  {
    id: 'nt_4',
    type: 'JUDGEMENT',
    title: 'WINNER ANNOUNCED JUDGEMENT',
    description: 'Chaos Club SF took 2nd place in Autonomous Agent bounty track.',
    timestamp: 'Yesterday',
    read: true
  }
];

const initialLeaderboard: LeaderboardEntry[] = [
  { rank: 1, teamName: 'AGENT_SMITH_REBELS', projectName: 'Rogue-GPT', track: 'Auto Agents', score: 98.2, prizeBounty: '$3,000' },
  { rank: 2, teamName: 'TERMINAL_OVERLORDS', projectName: 'Solana Micropay CLI', track: 'Hacker Tooling', score: 94.8, prizeBounty: '$3,000' },
  { rank: 3, teamName: 'DRIFT_CHAOTICS', projectName: 'TikTok Bypass Agent', track: 'Absurd Consumer', score: 91.5, prizeBounty: '$15,000 + M4 Max', isCurrentUser: true },
  { rank: 4, teamName: 'BRAINROT_ORCHESTRA', projectName: 'YeetScript', track: 'Absurd Consumer', score: 89.4, prizeBounty: '$1,000' },
  { rank: 5, teamName: 'CYBER_NOMADS', projectName: 'NeonShield', track: 'Hacker Tooling', score: 87.1, prizeBounty: '-' },
  { rank: 6, teamName: 'VOID_GLITCHERS', projectName: 'Discord_Cult_Sim', track: 'Auto Agents', score: 84.3, prizeBounty: '-' },
  { rank: 7, teamName: 'APEX_BUILDERS', projectName: 'HyperReplit', track: 'Hacker Tooling', score: 81.9, prizeBounty: '-' }
];

const initialTeammateRadar: TeammateRadar[] = [
  { id: 'tm_1', username: 'rust_god_99', role: 'System Architecture & Solana', skills: 'Rust / WASM', status: 'available' },
  { id: 'tm_2', username: 'synth_beats', role: 'Vibe / UI / Tailwind master', skills: 'React / Next.js', status: 'available' },
  { id: 'tm_3', username: 'brainrot_ops', role: 'AI simulation endpoints', skills: 'Python / PyTorch', status: 'available' }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [hackathons, setHackathons] = useState<Hackathon[]>(initialHackathons);
  const [userHackathons, setUserHackathons] = useState<string[]>(['driftcode-chaos-v1', 'cyberpunk-speedrun-v3']);
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>(initialSubmissions);
  const [badges, setBadges] = useState<Badge[]>(initialBadges);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(initialLeaderboard);
  const [teammateRadar, setTeammateRadar] = useState<TeammateRadar[]>(initialTeammateRadar);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('dryftcode_user');
      const savedHackathons = localStorage.getItem('dryftcode_joined');
      const savedSubmissions = localStorage.getItem('dryftcode_submissions');
      const savedBadges = localStorage.getItem('dryftcode_badges');
      
      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedHackathons) setUserHackathons(JSON.parse(savedHackathons));
      if (savedSubmissions) setSubmissions(JSON.parse(savedSubmissions));
      if (savedBadges) setBadges(JSON.parse(savedBadges));
    } catch (e) {
      console.error('Failed to load local storage state:', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('dryftcode_user', JSON.stringify(user));
      localStorage.setItem('dryftcode_joined', JSON.stringify(userHackathons));
      localStorage.setItem('dryftcode_submissions', JSON.stringify(submissions));
      localStorage.setItem('dryftcode_badges', JSON.stringify(badges));
    } catch (e) {
      console.error('Failed to save state to local storage:', e);
    }
  }, [user, userHackathons, submissions, badges]);

  const joinHackathon = (hackathonId: string) => {
    if (!userHackathons.includes(hackathonId)) {
      const updatedJoined = [...userHackathons, hackathonId];
      setUserHackathons(updatedJoined);
      
      setHackathons(prev => prev.map(h => {
        if (h.id === hackathonId) {
          return { ...h, claimedSlots: Math.min(h.claimedSlots + 1, h.maxSlots), status: 'REGISTERED' };
        }
        return h;
      }));

      const hObj = hackathons.find(h => h.id === hackathonId);
      const newNotif: NotificationItem = {
        id: `nt_${Date.now()}`,
        type: 'ARENA',
        title: 'TICKET CLAIMED',
        description: `You successfully registered for ${hObj?.name || 'hackathon arena'}. Prepare your build sequence.`,
        timestamp: 'Just now',
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  const submitProject = (newSubData: Omit<ProjectSubmission, 'id' | 'submittedTime' | 'status' | 'integrityRating'>): string => {
    const id = `sub_${Date.now()}`;
    const newSubmission: ProjectSubmission = {
      ...newSubData,
      id,
      status: 'SUBMITTED',
      integrityRating: 90,
      submittedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      judgement: 'PENDING'
    };

    setSubmissions(prev => [newSubmission, ...prev]);

    setUser(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        shipped: prev.stats.shipped + 1
      }
    }));

    const newNotif: NotificationItem = {
      id: `nt_${Date.now()}`,
      type: 'COMPILER',
      title: 'SUBMISSION TRANSMITTED',
      description: `Artifact '${newSubData.title}' compiled to ledger successfully.`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    return id;
  };

  const updateSubmissionStatus = (
    submissionId: string,
    status: SubmissionStatus,
    judgement?: 'WINNER' | 'REVIEWED' | 'PENDING',
    rubric?: { brainrotQuotient: number; technicalAudacity: number }
  ) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id === submissionId) {
        const isWinner = judgement === 'WINNER';
        const updated: ProjectSubmission = {
          ...sub,
          status,
          judgement: judgement || sub.judgement,
          rubricRating: rubric || sub.rubricRating,
          score: rubric ? Math.round(((rubric.brainrotQuotient * 0.4) + (rubric.technicalAudacity * 0.4) + 1.8) * 10) : sub.score
        };

        if (isWinner) {
          setUser(u => ({
            ...u,
            stats: { ...u.stats, badges: u.stats.badges + 1 },
            earnedBadges: Array.from(new Set([...u.earnedBadges, 'VICTORY ORACLE', 'MEME ARCHITECT']))
          }));

          setBadges(bList => bList.map(b => b.id === 'bdg_2' ? { ...b, unlocked: true } : b));

          setLeaderboard(lBoard => [
            { rank: 2, teamName: sub.teamName, projectName: sub.title, track: sub.track, score: 96.5, prizeBounty: '$15,000', isCurrentUser: true },
            ...lBoard.filter(item => !item.isCurrentUser)
          ]);
        }

        return updated;
      }
      return sub;
    }));

    const newNotif: NotificationItem = {
      id: `nt_${Date.now()}`,
      type: 'JUDGEMENT',
      title: 'OFFICIAL VERDICT LOGGED',
      description: `Status for submission '${submissionId}' updated to ${status}${judgement ? ` (${judgement})` : ''}.`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const createHackathon = (newH: Omit<Hackathon, 'id' | 'claimedSlots' | 'maxSlots' | 'status'>): string => {
    const id = `hack_${Date.now()}`;
    const created: Hackathon = {
      ...newH,
      id,
      claimedSlots: 1,
      maxSlots: 400,
      status: 'REGISTERED'
    };
    setHackathons(prev => [created, ...prev]);
    return id;
  };

  const inviteTeammate = (teammateId: string) => {
    setTeammateRadar(prev => prev.map(t => t.id === teammateId ? { ...t, status: 'invited' } : t));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const setUserRole = (role: 'hacker' | 'organizer' | 'club') => {
    setUser(prev => ({ ...prev, role }));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        hackathons,
        userHackathons,
        submissions,
        badges,
        notifications,
        leaderboard,
        teammateRadar,
        joinHackathon,
        submitProject,
        updateSubmissionStatus,
        createHackathon,
        inviteTeammate,
        markNotificationRead,
        markAllNotificationsRead,
        setUserRole
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
