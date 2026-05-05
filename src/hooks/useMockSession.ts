import { useState, useCallback } from 'react';

interface MockRating {
  id: number;
  rating: 'easy' | 'got-it' | 'needs-work';
}

type Phase = 'config' | 'session' | 'end';

export interface Question {
  id: number;
  sectionId: string;
  difficulty: string;
  question: string;
  answer: string;
  whyAsked: string;
  followUps: string[];
  mistakes: string[];
  diagram?: string;
}

export function useMockSession(allQuestions: Question[]) {
  const [phase, setPhase] = useState<Phase>('config');
  const [selectedSection, setSelectedSection] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState<MockRating[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const startSession = useCallback(() => {
    let filtered = [...allQuestions];
    if (selectedSection !== 'all') {
      filtered = filtered.filter(q => q.sectionId === selectedSection);
    }
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }
    // Shuffle
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }
    setSessionQuestions(filtered);
    setCurrentIndex(0);
    setRatings([]);
    setShowAnswer(false);
    setPhase('session');
  }, [allQuestions, selectedSection, selectedDifficulty]);

  const rateQuestion = useCallback((rating: 'easy' | 'got-it' | 'needs-work') => {
    const q = sessionQuestions[currentIndex];
    if (!q) return;
    setRatings(prev => [...prev, { id: q.id, rating }]);
  }, [sessionQuestions, currentIndex]);

  const nextQuestion = useCallback(() => {
    setShowAnswer(false);
    if (currentIndex + 1 >= sessionQuestions.length) {
      setPhase('end');
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, sessionQuestions.length]);

  const endSession = useCallback(() => {
    setPhase('end');
  }, []);

  const resetSession = useCallback(() => {
    setPhase('config');
    setSessionQuestions([]);
    setCurrentIndex(0);
    setRatings([]);
    setShowAnswer(false);
  }, []);

  const currentQuestion = sessionQuestions[currentIndex] ?? null;
  const hasRatedCurrent = ratings.some(r => r.id === currentQuestion?.id);

  return {
    phase, setPhase,
    selectedSection, setSelectedSection,
    selectedDifficulty, setSelectedDifficulty,
    timerEnabled, setTimerEnabled,
    sessionQuestions, currentIndex, currentQuestion,
    ratings, hasRatedCurrent,
    showAnswer, setShowAnswer,
    startSession, rateQuestion, nextQuestion, endSession, resetSession,
  };
}
