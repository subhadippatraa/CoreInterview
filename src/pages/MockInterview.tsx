import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { CodeBlock } from '../components/ui/CodeBlock';
import { TimerRing } from '../components/mock/TimerRing';
import { useMockSession } from '../hooks/useMockSession';
import { useProgress } from '../hooks/useProgress';
import { sections } from '../data/sections';
import questions from '../data/questions';
import { Link } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  LightBulbIcon, 
  SpeakerWaveIcon, 
  ChatBubbleBottomCenterTextIcon,
  PlayIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  FireIcon,
  BookmarkIcon as BookmarkOutline
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';

import type { Question } from '../data/types';

function InteractiveFollowUp({ followUp, renderAnswer }: { followUp: Partial<Question> & { question: string }; renderAnswer: (s: string) => string }) {
  return (
    <div className="bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 p-4 rounded-xl shadow-sm transition-all group">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 w-6 h-6 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center shrink-0">
          <ChatBubbleBottomCenterTextIcon className="w-3.5 h-3.5" />
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">{followUp.question}</div>
          {followUp.answer && (
            <div
              className="text-[14px] leading-relaxed text-[var(--color-text2)]"
              dangerouslySetInnerHTML={{ __html: renderAnswer(followUp.answer) }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function MockInterview() {
  const mock = useMockSession(questions);
  const { saveMockResult, toggleBookmark, isBookmarked } = useProgress();

  const isCurrentBookmarked = mock.currentQuestion ? isBookmarked(mock.currentQuestion.id) : false;

  // Premium Keyboard Shortcuts
  useEffect(() => {
    if (mock.phase !== 'session' || !mock.currentQuestion) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in the search modal
      if (document.activeElement?.tagName === 'INPUT') return;

      if (!mock.showAnswer) {
        if (e.code === 'Space') {
          e.preventDefault();
          mock.setShowAnswer(true);
        }
      } else if (!mock.hasRatedCurrent) {
        if (e.key === '1') mock.rateQuestion('easy');
        if (e.key === '2') mock.rateQuestion('got-it');
        if (e.key === '3') mock.rateQuestion('needs-work');
      } else {
        if (e.code === 'Space' || e.code === 'ArrowRight') {
          e.preventDefault();
          mock.nextQuestion();
        }
      }
      
      // Global shortcut for bookmarking current question (B)
      if (Object.keys(e).length && e.key.toLowerCase() === 'b') {
         toggleBookmark(mock.currentQuestion!.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mock.phase, mock.currentQuestion, mock.showAnswer, mock.hasRatedCurrent, toggleBookmark]);

  const renderAnswer = (text: string) =>
    text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--color-text)] font-semibold">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="font-mono text-sm bg-[#1e1e2e] text-[#89b4fa] px-1.5 py-0.5 rounded border border-[#2a2a3a]">$1</code>');

  /* ── Config Screen ── */
  if (mock.phase === 'config') {
    return (
      <PageWrapper className="max-w-[520px] mx-auto px-6 py-16">
        <h1 className="font-heading text-3xl font-extrabold text-[var(--color-text)] mb-2">Mock Interview</h1>
        <p className="text-sm text-[var(--color-text2)] mb-10">Configure your practice session.</p>

        {/* Topic */}
        <div className="mb-6">
          <label className="font-heading text-xs font-bold text-[var(--color-text3)] uppercase tracking-widest mb-2 block">Topic</label>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => mock.setSelectedSection('all')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${mock.selectedSection === 'all' ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-bg2)] border border-[var(--color-border)] text-[var(--color-text2)] hover:text-[var(--color-text)]'}`}>
              All Topics
            </button>
            {sections.map(s => (
              <button key={s.id} onClick={() => mock.setSelectedSection(s.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${mock.selectedSection === s.id ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-bg2)] border border-[var(--color-border)] text-[var(--color-text2)] hover:text-[var(--color-text)]'}`}>
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="mb-6">
          <label className="font-heading text-xs font-bold text-[var(--color-text3)] uppercase tracking-widest mb-2 block">Difficulty</label>
          <div className="flex gap-2">
            {['all', 'easy', 'medium', 'hard'].map(d => (
              <button key={d} onClick={() => mock.setSelectedDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors cursor-pointer ${mock.selectedDifficulty === d ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-bg2)] border border-[var(--color-border)] text-[var(--color-text2)] hover:text-[var(--color-text)]'}`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Timer */}
        <div className="mb-10">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => mock.setTimerEnabled(!mock.timerEnabled)}
              className={`w-10 h-6 rounded-full relative transition-colors cursor-pointer ${mock.timerEnabled ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-bg3)] border border-[var(--color-border)]'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${mock.timerEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
            </div>
            <span className="text-sm text-[var(--color-text)]">60 second timer per question</span>
          </label>
        </div>

        <button
          onClick={mock.startSession}
          className="w-full py-4 bg-[var(--color-accent)] text-white text-lg font-bold rounded-xl hover:bg-[#4a6ee8] hover:shadow-lg hover:shadow-[var(--color-accent)]/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer mt-8"
        >
          <PlayIcon className="w-5 h-5 flex-shrink-0" />
          Initialize Simulation
        </button>
      </PageWrapper>
    );
  }

  /* ── Session Screen ── */
  if (mock.phase === 'session' && mock.currentQuestion) {
    return (
      <PageWrapper className="max-w-[700px] mx-auto px-6 py-10">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-10">
          {/* Progress Dots */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {mock.sessionQuestions.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === mock.currentIndex ? 'bg-[var(--color-accent)] scale-125' :
                  i < mock.currentIndex ? 'bg-[var(--color-green)]' :
                  'bg-[var(--color-border2)]'
                }`}
              />
            ))}
          </div>
          <button onClick={mock.endSession} className="text-xs font-mono text-[var(--color-text3)] hover:text-[var(--color-red)] transition-colors cursor-pointer">
            End Session
          </button>
        </div>

        {/* Timer */}
        {mock.timerEnabled && (
          <div className="flex justify-center mb-8">
            <TimerRing duration={60} onComplete={() => {}} isRunning={!mock.showAnswer} />
          </div>
        )}

        {/* Question */}
        <div className="text-center mb-10 pt-4 relative">
          
          <div className="absolute right-0 top-0">
             <button 
               onClick={() => toggleBookmark(mock.currentQuestion!.id)}
               className="p-2 rounded-full hover:bg-[var(--color-bg2)] transition-colors group"
               title="Bookmark Question (Press B)"
             >
               {isCurrentBookmarked ? (
                 <BookmarkSolid className="w-6 h-6 text-yellow-500 transform group-hover:scale-110 transition-transform" />
               ) : (
                 <BookmarkOutline className="w-6 h-6 text-[var(--color-text2)] group-hover:text-[var(--color-text)] transform group-hover:scale-110 transition-transform" />
               )}
             </button>
          </div>

          <span className={`text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-widest badge-${mock.currentQuestion.difficulty} mb-4 inline-block font-mono`}>
            {mock.currentQuestion.difficulty} Level
          </span>
          <h2 className="font-heading text-3xl md:text-[34px] font-extrabold text-[var(--color-text)] leading-tight max-w-3xl mx-auto">
            {mock.currentQuestion.question}
          </h2>
        </div>

        {/* Reveal / Answer */}
        {!mock.showAnswer ? (
          <div className="text-center mt-16">
            <button
              onClick={() => mock.setShowAnswer(true)}
              className="px-8 py-4 bg-[var(--color-bg2)] text-[var(--color-text)] border border-[var(--color-border)] font-bold rounded-2xl hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all cursor-pointer shadow-sm hover:shadow-md transform active:scale-95 group flex items-center justify-center gap-2 mx-auto"
            >
              Reveal Answer
              <span className="group-hover:translate-y-1 transition-transform">👇</span>
            </button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="space-y-6">
                {/* Interview Pitch */}
                {mock.currentQuestion.interviewPitch && (
                  <div className="bg-[var(--color-bg)] border-l-4 border-l-[var(--color-accent)] border-[var(--color-border)] p-6 rounded-r-xl shadow-md">
                    <h3 className="text-[13px] font-bold uppercase tracking-wider text-[var(--color-text3)] mb-3 flex items-center gap-2">
                       <SpeakerWaveIcon className="w-4 h-4 text-[var(--color-accent)]" />
                       The Script (What to say out loud)
                    </h3>
                    <div
                      className="text-[16px] leading-[1.7] text-[var(--color-text)] font-medium"
                      dangerouslySetInnerHTML={{ __html: renderAnswer(mock.currentQuestion.interviewPitch) }}
                    />
                  </div>
                )}

                {/* Main Explanation */}
                <div className="bg-[var(--color-bg2)] border border-[var(--color-border)] p-6 rounded-xl shadow-sm">
                  <h3 className="text-[13px] font-bold uppercase tracking-wider text-[var(--color-text3)] mb-3 flex items-center gap-2">
                    <LightBulbIcon className="w-4 h-4 text-yellow-500" />
                    Deep Dive & Trade-offs
                  </h3>
                  <div
                    className="text-[15px] leading-[1.8] text-[var(--color-text)]"
                    dangerouslySetInnerHTML={{ __html: renderAnswer(mock.currentQuestion.explanation || mock.currentQuestion.answer) }}
                  />
                </div>

                {/* Code Example */}
                {mock.currentQuestion.example && (
                    <div className="mt-4">
                      <CodeBlock codeString={mock.currentQuestion.example} defaultLanguage={mock.currentQuestion.sectionId} />                      </div>
                  )}
                {/* Follow Ups */}
                {mock.currentQuestion.followUps && mock.currentQuestion.followUps.length > 0 && (
                  <div className="pt-4">
                    <h3 className="text-[14px] font-bold text-[var(--color-text)] tracking-tight mb-4">Follow-up Questions</h3>
                    <div className="space-y-4">
                      {mock.currentQuestion.followUps.map((fu: Partial<Question> & { question: string }, i: number) => (
                        <InteractiveFollowUp key={i} followUp={fu} renderAnswer={renderAnswer} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Rating Buttons */}
              {!mock.hasRatedCurrent ? (
                <div className="pt-10 border-t border-[var(--color-border)] mt-8 text-center pb-4">
                  <h4 className="text-sm font-bold text-[var(--color-text3)] uppercase tracking-wider mb-6 flex items-center justify-center gap-2">
                    <FireIcon className="w-4 h-4" /> Grade Your Performance
                  </h4>
                  <div className="flex justify-center gap-4">
                    <button onClick={() => mock.rateQuestion('easy')}
                      title="Hotkey: 1"
                      className="group flex flex-col items-center justify-center gap-2 w-28 h-24 rounded-2xl border-2 border-[var(--color-green)]/30 bg-[var(--color-green)]/5 text-[var(--color-green)] hover:bg-[var(--color-green)]/15 hover:border-[var(--color-green)]/50 transition-all cursor-pointer transform hover:-translate-y-1 relative">
                      <div className="absolute top-1 right-2 text-[10px] opacity-50 font-mono">1</div>
                      <CheckCircleIcon className="w-8 h-8" />
                      <span className="text-[12px] font-bold">Too Easy</span>
                    </button>
                    <button onClick={() => mock.rateQuestion('got-it')}
                      title="Hotkey: 2"
                      className="group flex flex-col items-center justify-center gap-2 w-28 h-24 rounded-2xl border-2 border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/15 hover:border-[var(--color-accent)]/50 transition-all cursor-pointer transform hover:-translate-y-1 relative">
                      <div className="absolute top-1 right-2 text-[10px] opacity-50 font-mono">2</div>
                      <HandThumbUpIcon className="w-8 h-8" />
                      <span className="text-[12px] font-bold">Got It</span>
                    </button>
                    <button onClick={() => mock.rateQuestion('needs-work')}
                      title="Hotkey: 3"
                      className="group flex flex-col items-center justify-center gap-2 w-28 h-24 rounded-2xl border-2 border-[var(--color-red)]/30 bg-[var(--color-red)]/5 text-[var(--color-red)] hover:bg-[var(--color-red)]/15 hover:border-[var(--color-red)]/50 transition-all cursor-pointer transform hover:-translate-y-1 relative">
                      <div className="absolute top-1 right-2 text-[10px] opacity-50 font-mono">3</div>
                      <HandThumbDownIcon className="w-8 h-8" />
                      <span className="text-[12px] font-bold">Needs Work</span>
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-center text-[13px] text-[var(--color-text2)] font-bold mt-10 pt-4 border-t border-[var(--color-border)] flex items-center justify-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-500" /> Rated successfully
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Next Button */}
        <div className="mt-10 text-center">
          <button
            onClick={mock.nextQuestion}
            disabled={!mock.hasRatedCurrent && mock.showAnswer}
            className="px-6 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-[var(--color-bg2)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-bg3)]"
          >
            Next →
          </button>
        </div>
      </PageWrapper>
    );
  }

  /* ── End Screen ── */
  const easyCount = mock.ratings.filter(r => r.rating === 'easy').length;
  const gotItCount = mock.ratings.filter(r => r.rating === 'got-it').length;
  const needsWorkCount = mock.ratings.filter(r => r.rating === 'needs-work').length;

  // Save results
  if (mock.phase === 'end' && mock.ratings.length > 0) {
    saveMockResult(mock.ratings);
  }

  return (
    <PageWrapper className="max-w-[520px] mx-auto px-6 py-16 text-center">
      <h1 className="font-heading text-3xl font-extrabold text-[var(--color-text)] mb-2">Session Complete</h1>
      <p className="text-sm text-[var(--color-text2)] mb-10">
        You attempted {mock.ratings.length} of {mock.sessionQuestions.length} questions.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-[var(--color-bg2)] border border-[var(--color-border)] rounded-lg p-4">
          <div className="text-2xl font-heading font-bold text-[var(--color-green)]">{easyCount}</div>
          <div className="text-xs text-[var(--color-text3)] mt-1">Too Easy</div>
        </div>
        <div className="bg-[var(--color-bg2)] border border-[var(--color-border)] rounded-lg p-4">
          <div className="text-2xl font-heading font-bold text-[var(--color-accent)]">{gotItCount}</div>
          <div className="text-xs text-[var(--color-text3)] mt-1">Got It</div>
        </div>
        <div className="bg-[var(--color-bg2)] border border-[var(--color-border)] rounded-lg p-4">
          <div className="text-2xl font-heading font-bold text-[var(--color-red)]">{needsWorkCount}</div>
          <div className="text-xs text-[var(--color-text3)] mt-1">Needs Work</div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={mock.resetSession}
          className="px-5 py-2.5 bg-[var(--color-accent)] text-white font-medium text-sm rounded-lg hover:bg-[#4a6ee8] transition-colors cursor-pointer"
        >
          Start New Session
        </button>
        <Link
          to="/"
          className="px-5 py-2.5 border border-[var(--color-border2)] text-[var(--color-text)] font-medium text-sm rounded-lg hover:bg-[var(--color-bg3)] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </PageWrapper>
  );
}
