export type UserRole = 'hacker' | 'organizer' | 'club';

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  university: string;
  bio: string;
  role: UserRole;
  stats: {
    attended: number;
    shipped: number;
    badges: number;
  };
  earnedBadges: string[];
  techStack: string[];
  level?: string;
}

export interface Track {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
}

export interface Bounty {
  rank: string;
  title: string;
  amount: string;
  perks: string;
  description: string;
}

export interface ScheduleItem {
  day: string;
  date: string;
  time: string;
  title: string;
  description: string;
}

export interface Hackathon {
  id: string;
  name: string;
  slogan: string;
  description: string;
  dates: string;
  location: string;
  totalBounty: string;
  status: 'DRAFT' | 'REGISTERED' | 'ONGOING' | 'COMPLETED';
  tracks: Track[];
  bounties: Bounty[];
  schedule: ScheduleItem[];
  rules?: string;
  claimedSlots: number;
  maxSlots: number;
  image?: string;
  isFeatured?: boolean;
}

export type SubmissionStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER REVIEW' | 'SHORTLISTED' | 'VERDICT';

export interface RubricRating {
  brainrotQuotient: number; // e.g. 9.8
  technicalAudacity: number; // e.g. 8.5
}

export interface ProjectSubmission {
  id: string;
  hackathonId: string;
  hackathonName: string;
  title: string;
  teamName: string;
  track: string;
  trackId: string;
  description: string;
  githubUrl: string;
  demoUrl: string;
  techStack: string[];
  teamMembers: string[];
  mediaPreview?: string;
  integrityRating: number; // percentage e.g. 90
  status: SubmissionStatus;
  judgement?: 'WINNER' | 'REVIEWED' | 'PENDING';
  submittedTime: string;
  rubricRating?: RubricRating;
  score?: number;
  prizeBounty?: string;
}

export interface Badge {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  progress?: number; // percentage or fraction string
}

export interface NotificationItem {
  id: string;
  type: 'BADGE' | 'COMPILER' | 'ARENA' | 'JUDGEMENT';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  teamName: string;
  projectName: string;
  track: string;
  score: number;
  prizeBounty: string;
  isCurrentUser?: boolean;
}

export interface TeammateRadar {
  id: string;
  username: string;
  role: string;
  skills: string;
  status: 'available' | 'invited';
}

