import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import questions from '../../data/questions';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const filteredQuestions = query
    ? questions
        .filter((q) => 
          q.question.toLowerCase().includes(query.toLowerCase()) || 
          (q.answer && q.answer.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 8)
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredQuestions.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredQuestions.length > 0) {
          handleSelect(filteredQuestions[selectedIndex]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredQuestions, selectedIndex, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (q: any) => {
    navigate(`/section/${q.sectionId}/question/${q.id}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] px-4 pointer-events-none"
          >
            <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[70vh]">
              
              {/* Search Input */}
              <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-bg2)]">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text3)]" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search questions... (e.g. async, LINQ, deadlock)"
                    className="w-full h-11 pl-11 pr-16 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[14px] text-[var(--color-text)] placeholder-[var(--color-text3)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button onClick={onClose} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text3)] hover:text-[var(--color-text)] bg-[var(--color-bg2)] border border-[var(--color-border)] rounded-md text-[10px] font-mono font-bold px-2 py-0.5 pointer-events-auto">
                    ESC
                  </button>
                </div>
              </div>

              {/* Results */}
              {query && (
                <div className="overflow-y-auto nice-scrollbar py-2">
                  {filteredQuestions.length > 0 ? (
                    <div className="px-2">
                      {filteredQuestions.map((q, idx) => (
                        <div
                          key={q.id}
                          onClick={() => handleSelect(q)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                            idx === selectedIndex 
                              ? 'bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20' 
                              : 'hover:bg-[var(--color-bg2)] border border-transparent'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${idx === selectedIndex ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-bg2)] border border-[var(--color-border)] text-[var(--color-text2)]'}`}>
                            <MagnifyingGlassIcon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-[14px] font-medium truncate ${idx === selectedIndex ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)]'}`}>
                              {q.question}
                            </p>
                            <p className="text-[12px] text-[var(--color-text3)] truncate mt-0.5 font-mono">
                              {q.sectionId}
                            </p>
                          </div>
                          <ChevronRightIcon className={`w-4 h-4 shrink-0 ${idx === selectedIndex ? 'text-[var(--color-accent)] opacity-100' : 'text-[var(--color-text3)] opacity-0'}`} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-[14px] text-[var(--color-text2)] font-medium">No results found for "{query}"</p>
                      <p className="text-[12px] text-[var(--color-text3)] mt-1">Try searching for a different keyword</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Empty State */}
              {!query && (
                <div className="py-10 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-bg2)] border border-[var(--color-border)] flex items-center justify-center mx-auto mb-4">
                    <MagnifyingGlassIcon className="w-6 h-6 text-[var(--color-text3)]" />
                  </div>
                  <p className="text-[14px] text-[var(--color-text2)] font-medium">Search the entire platform</p>
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-1">
                        <kbd className="px-2 py-1 bg-[var(--color-bg2)] border border-[var(--color-border)] rounded-md text-[11px] font-mono text-[var(--color-text2)]">↓</kbd>
                        <kbd className="px-2 py-1 bg-[var(--color-bg2)] border border-[var(--color-border)] rounded-md text-[11px] font-mono text-[var(--color-text2)]">↑</kbd>
                      </div>
                      <span className="text-[11px] text-[var(--color-text3)] uppercase font-bold tracking-wider">Navigate</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <kbd className="px-2 py-1 bg-[var(--color-bg2)] border border-[var(--color-border)] rounded-md text-[11px] font-mono text-[var(--color-text2)]">Enter</kbd>
                      <span className="text-[11px] text-[var(--color-text3)] uppercase font-bold tracking-wider">Select</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <kbd className="px-2 py-1 bg-[var(--color-bg2)] border border-[var(--color-border)] rounded-md text-[11px] font-mono text-[var(--color-text2)]">ESC</kbd>
                      <span className="text-[11px] text-[var(--color-text3)] uppercase font-bold tracking-wider">Close</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
