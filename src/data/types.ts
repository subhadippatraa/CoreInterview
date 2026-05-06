export interface FollowUp {
  id?: number;
  question: string;
  answer: string;
}

export interface PracticeLink {
  platform: string;
  url: string;
  type: 'concept' | 'practice';
}

export interface Question {
  id: number;
  sectionId: string;
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  answer: string;
  interviewPitch?: string;
  explanation?: string;
  example?: string;
  whyAsked: string;
  followUps: FollowUp[];
  mistakes: string[];
  diagram?: 'middleware-pipeline' | 'di-flow' | 'http-lifecycle' | 'process-vs-thread' | 'load-balancing' | 'docker-layers';
  tags?: string[];
  companies?: string[];
  practiceLinks?: PracticeLink[];
}

export interface MockResult {
  date: string;
  ratings: { id: number; rating: 'easy' | 'got-it' | 'needs-work' }[];
}

export interface AppSettings {
  timerEnabled: boolean;
  lastSection: string | null;
}

export interface StorageData {
  reviewed: number[];
  bookmarks: number[];
  mockResults: MockResult[];
  settings: AppSettings;
}
