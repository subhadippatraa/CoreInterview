export interface Question {
  id: number;
  sectionId: string;
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  answer: string;
  whyAsked: string;
  followUps: string[];
  mistakes: string[];
  diagram?: 'middleware-pipeline' | 'di-flow' | 'http-lifecycle' | 'process-vs-thread' | 'load-balancing' | 'docker-layers';
  tags?: string[];
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
