import { useState, useCallback, useEffect } from 'react';
import type { StorageData } from '../data/types';

const STORAGE_KEY = 'coreinterview';

const defaultData: StorageData = {
  reviewed: [],
  bookmarks: [],
  mockResults: [],
  settings: { timerEnabled: true, lastSection: null },
};

function loadData(): StorageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    return { ...defaultData, ...JSON.parse(raw) };
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
