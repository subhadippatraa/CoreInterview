import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { TimerRing } from '../components/mock/TimerRing';
import { useMockSession } from '../hooks/useMockSession';
import { useProgress } from '../hooks/useProgress';
import { sections } from '../data/sections';
import questions from '../data/questions';
import { Link } from 'react-router-dom';

function InteractiveFollowUp({ followUp, renderAnswer }: { followUp: any; renderAnswer: (s: string) => string }) {
  return (
    <div className="bg-[var(--color-bg2)] border border-[var(--color-border)] p-4 rounded-xl shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="text-[13px] font-semibold text-[var(--color-text)] mb-2">{followUp.question}</div>
          {followUp.answer && (
            <div
              className="text-[13px] text-[var(--color-text)]"
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
  const { saveMockResult } = useProgress();

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
          className="w-full py-3 bg-[var(--color-accent)] text-white font-medium rounded-lg hover:bg-[#4a6ee8] transition-colors cursor-pointer"
        >
          Start Session →
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
        <div className="text-center mb-10">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest badge-${mock.currentQuestion.difficulty} mb-3 inline-block`}>
            {mock.currentQuestion.difficulty}
          </span>
          <h2 className="font-heading text-2xl md:text-[28px] font-extrabold text-[var(--color-text)] leading-tight">
            {mock.currentQuestion.question}
          </h2>
        </div>

        {/* Reveal / Answer */}
        {!mock.showAnswer ? (
          <div className="text-center">
            <button
              onClick={() => mock.setShowAnswer(true)}
              className="px-6 py-3 bg-[var(--color-accent)] text-white font-medium rounded-lg hover:bg-[#4a6ee8] transition-colors cursor-pointer"
            >
              Reveal Answer
            </button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="space-y-6">
                {/* Interview Pitch */}
                {mock.currentQuestion.interviewPitch && (
                  <div className="bg-[var(--color-bg2)] border-l-4 border-l-[var(--color-accent)] border-[var(--color-border)] p-5 rounded-r-xl shadow-sm">
                    <h3 className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-text3)] mb-2">The Pitch (What to say)</h3>
                    <div
                      className="text-[15px] leading-relaxed text-[var(--color-text)]"
                      dangerouslySetInnerHTML={{ __html: renderAnswer(mock.currentQuestion.interviewPitch) }}
                    />
                  </div>
                )}

                {/* Main Explanation */}
                <div className="bg-[var(--color-bg2)] border border-[var(--color-border)] p-5 rounded-xl shadow-sm">
                  <h3 className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-text3)] mb-2">Deep Dive Explanation</h3>
                  <div
                    className="text-[15px] leading-[1.8] text-[var(--color-text)]"
                    dangerouslySetInnerHTML={{ __html: renderAnswer(mock.currentQuestion.explanation || mock.currentQuestion.answer) }}
                  />
                </div>

                {/* Code Example */}
                {mock.currentQuestion.example && (
                  <div className="bg-[var(--color-bg2)] border border-[var(--color-border)] p-4 rounded-xl shadow-sm overflow-x-auto nice-scrollbar">
                    <h3 className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-text3)] mb-3">Example</h3>
                    <div
                      className="font-mono text-[13px] text-[var(--color-text)] whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: mock.currentQuestion.example }}
                    />
                  </div>
                )}

                {/* Follow Ups */}
                {mock.currentQuestion.followUps && mock.currentQuestion.followUps.length > 0 && (
                  <div className="pt-4">
                    <h3 className="text-[14px] font-bold text-[var(--color-text)] tracking-tight mb-4">Follow-up Questions</h3>
                    <div className="space-y-4">
                      {mock.currentQuestion.followUps.map((fu: any, i: number) => (
                        <InteractiveFollowUp key={i} followUp={fu} renderAnswer={renderAnswer} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Rating Buttons */}
              {!mock.hasRatedCurrent ? (
                <div className="flex justify-center gap-3">
                  <button onClick={() => mock.rateQuestion('easy')}
                    className="px-4 py-2 rounded-lg text-sm border border-[var(--color-green)]/30 text-[var(--color-green)] hover:bg-[var(--color-green)]/10 transition-colors cursor-pointer">
                    Too Easy
                  </button>
                  <button onClick={() => mock.rateQuestion('got-it')}
                    className="px-4 py-2 rounded-lg text-sm border border-[var(--color-accent)]/30 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-colors cursor-pointer">
                    Got It
                  </button>
                  <button onClick={() => mock.rateQuestion('needs-work')}
                    className="px-4 py-2 rounded-lg text-sm border border-[var(--color-red)]/30 text-[var(--color-red)] hover:bg-[var(--color-red)]/10 transition-colors cursor-pointer">
                    Needs Work
                  </button>
                </div>
              ) : (
                <p className="text-center text-xs text-[var(--color-text3)] font-mono">✓ Rated</p>
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
