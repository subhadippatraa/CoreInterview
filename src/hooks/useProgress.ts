import { useState, useCallback, useEffect } from 'react';
import type { StorageData } from '../data/types';

const STORAGE_KEY = 'coreinterview';

const defaultData: StorageData = {
  reviewed: [],
  bookmarks: [],
  mockResults: [],
  settings: { timerEnabled: true, lastSection: null },
  streak: { current: 0, best: 0, lastActiveDate: null }
};

function loadData(): StorageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    
    let baseData = { ...defaultData };
    if (parsed) {
      baseData = { ...defaultData, ...parsed };
      // Ensure streak exists for users migrating from older versions
      if (!baseData.streak) {
        baseData.streak = { current: 0, best: 0, lastActiveDate: null };
      }
    }

    // Process streak logic on initial load
    const now = new Date();
    const yr = now.getFullYear();
    const mo = String(now.getMonth() + 1).padStart(2, '0');
    const da = String(now.getDate()).padStart(2, '0');
    const todayStr = `${yr}-${mo}-${da}`; // Reliable local YYYY-MM-DD

    if (baseData.streak.lastActiveDate) {
      if (baseData.streak.lastActiveDate !== todayStr) {
        const [ly, lm, ld] = baseData.streak.lastActiveDate.split('-').map(Number);
        const lastActiveLocal = new Date(ly, lm - 1, ld);
        const todayLocal = new Date(yr, now.getMonth(), now.getDate());
        
        const diffTime = todayLocal.getTime() - lastActiveLocal.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        // If active yesterday, increment streak
        if (diffDays === 1) {
          baseData.streak.current += 1;
          baseData.streak.best = Math.max(baseData.streak.current, baseData.streak.best);
        } 
        // Missed a day or more, reset streak
        else if (diffDays > 1) {
          baseData.streak.current = 1;
        }
        baseData.streak.lastActiveDate = todayStr;
      }
    } else {
      // First time using app
      baseData.streak.current = 1;
      baseData.streak.best = 1;
      baseData.streak.lastActiveDate = todayStr;
    }

    // Save immediately if we updated the streak on load
    if (parsed && (baseData.streak.lastActiveDate !== parsed.streak?.lastActiveDate)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(baseData));
    }

    return baseData;
  } catch {
    return defaultData;
  }
}

function saveData(data: StorageData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useProgress() {
  const [data, setData] = useState<StorageData>(loadData);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const toggleReviewed = useCallback((id: number) => {
    setData(prev => {
      const reviewed = prev.reviewed.includes(id)
        ? prev.reviewed.filter(r => r !== id)
        : [...prev.reviewed, id];
      return { ...prev, reviewed };
    });
  }, []);

  const toggleBookmark = useCallback((id: number) => {
    setData(prev => {
      const bookmarks = prev.bookmarks.includes(id)
        ? prev.bookmarks.filter(b => b !== id)
        : [...prev.bookmarks, id];
      return { ...prev, bookmarks };
    });
  }, []);

  const isReviewed = useCallback((id: number) => data.reviewed.includes(id), [data.reviewed]);
  const isBookmarked = useCallback((id: number) => data.bookmarks.includes(id), [data.bookmarks]);

  const saveMockResult = useCallback((ratings: { id: number; rating: 'easy' | 'got-it' | 'needs-work' }[]) => {
    setData(prev => ({
      ...prev,
      mockResults: [...prev.mockResults, { date: new Date().toISOString(), ratings }],
    }));
  }, []);

  const updateSettings = useCallback((patch: Partial<StorageData['settings']>) => {
    setData(prev => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  }, []);

  return {
    data,
    toggleReviewed,
    toggleBookmark,
    isReviewed,
    isBookmarked,
    saveMockResult,
    updateSettings,
  };
}
