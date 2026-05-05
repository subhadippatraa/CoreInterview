import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { DiagramRenderer } from '../components/diagrams/DiagramRenderer';
import questions from '../data/questions.json';
import { sections } from '../data/sections';
import { BookmarkIcon as BookmarkOutline, LightBulbIcon, ExclamationTriangleIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid, CheckCircleIcon as CheckSolid } from '@heroicons/react/24/solid';
import { useProgress } from '../hooks/useProgress';

const staggerChild = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: 'easeOut' },
  }),
};

export function SectionLayout() {
  const { sectionId, questionId } = useParams();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark, isReviewed, toggleReviewed } = useProgress();

  const section = sections.find(s => s.id === sectionId);
  const sectionQuestions = questions.filter(q => q.sectionId === sectionId);

  const activeQuestionId = questionId ? parseInt(questionId) : sectionQuestions[0]?.id;
  const activeQuestion = sectionQuestions.find(q => q.id === activeQuestionId);

  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowAnswer(false);
    if (sectionId && !questionId && sectionQuestions.length > 0) {
      navigate(`/section/${sectionId}/question/${sectionQuestions[0].id}`, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId, sectionId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setShowAnswer(prev => !prev);
      }
      if (e.key === 'b' || e.key === 'B') {
        if (activeQuestion) toggleBookmark(activeQuestion.id);
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const idx = sectionQuestions.findIndex(q => q.id === activeQuestionId);
        if (idx < sectionQuestions.length - 1) {
          navigate(`/section/${sectionId}/question/${sectionQuestions[idx + 1].id}`);
        }
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const idx = sectionQuestions.findIndex(q => q.id === activeQuestionId);
        if (idx > 0) {
          navigate(`/section/${sectionId}/question/${sectionQuestions[idx - 1].id}`);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeQuestionId, sectionId, sectionQuestions, activeQuestion]);

  if (!section || !activeQuestion) {
    return <PageWrapper className="p-8 text-center text-[var(--color-text2)]">Not found</PageWrapper>;
  }

  const currentIndex = sectionQuestions.findIndex(q => q.id === activeQuestionId);

  const renderAnswer = (text: string) =>
    text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');

  return (
    <div className="flex min-h-[calc(100vh-56px)]">

      {/* ═══════ Left Sidebar ═══════ */}
      <aside className="w-[280px] shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg)] overflow-y-auto hidden lg:block sticky top-14 h-[calc(100vh-56px)]">
        <div className="py-6 px-4">
          <div className="mb-6 px-2">
            <Link to="/" className="inline-flex items-center gap-2 text-[12px] text-[var(--color-text3)] hover:text-white transition-colors group">
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              <span>All Topics</span>
            </Link>
          </div>

          <div className="mb-4 px-2">
            <h2 className="text-[14px] font-semibold text-white tracking-tight">{section.name}</h2>
          </div>

          <div className="space-y-0.5">
            {sectionQuestions.map(q => {
              const isActive = q.id === activeQuestionId;
              const isDone = isReviewed(q.id);
              return (
                <Link
                  key={q.id}
                  to={`/section/${sectionId}/question/${q.id}`}
                  className={`group flex items-start gap-2.5 px-3 py-2 rounded-md text-[13px] leading-snug transition-all ${
                    isActive
                      ? 'text-white font-medium bg-[var(--color-bg2)]'
                      : 'text-[var(--color-text3)] hover:text-[var(--color-text2)] hover:bg-white/5'
                  }`}
                >
                  {isDone ? (
                    <CheckSolid className="w-4 h-4 shrink-0 text-[var(--color-green)] mt-[1px]" />
                  ) : (
                    <div className="w-4 h-4 shrink-0 rounded-full border border-[var(--color-border2)] mt-[1px] group-hover:border-[var(--color-text3)] transition-colors" />
                  )}
                  <span className="line-clamp-2">{q.question}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      {/* ═══════ Main Content ═══════ */}
      <main className="flex-1 overflow-y-auto">
        <article className="max-w-4xl mx-auto px-6 sm:px-10 py-10 sm:py-14">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] text-[var(--color-text3)] mb-10 font-mono">
            <Link to="/" className="hover:text-[var(--color-text2)] transition-colors">Home</Link>
            <span className="opacity-40">/</span>
            <Link to={`/section/${sectionId}`} className="hover:text-[var(--color-text2)] transition-colors">{section.name}</Link>
            <span className="opacity-40">/</span>
            <span className="text-[var(--color-text2)]">Q{currentIndex + 1} of {sectionQuestions.length}</span>
          </nav>

          {/* Question Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-[0.15em] badge-${activeQuestion.difficulty}`}>
              {activeQuestion.difficulty}
            </span>
            <button
              onClick={() => toggleBookmark(activeQuestion.id)}
              className="text-[var(--color-text3)] hover:text-[var(--color-amber)] transition-colors p-1 cursor-pointer"
              title="Toggle bookmark (B)"
            >
              {isBookmarked(activeQuestion.id)
                ? <BookmarkSolid className="w-5 h-5 text-[var(--color-amber)]" />
                : <BookmarkOutline className="w-5 h-5" />
              }
            </button>
          </div>

          {/* Question Text */}
          <h1 id="section-question" className="font-heading text-[32px] sm:text-[40px] font-extrabold text-white leading-[1.15] tracking-tight mb-6">
            {activeQuestion.question}
          </h1>

          <div className="flex items-center gap-3 text-[13px] text-[var(--color-text3)] mb-10 pb-10 border-b border-[var(--color-border)]">
             <span className="font-medium text-[var(--color-text2)]">Interview Guide</span>
             <span>•</span>
             <span>{section.name}</span>
          </div>

          {/* ── Answer Section ── */}
          <div className="relative min-h-[120px]">
            {!showAnswer && (
              <div className="relative">
                <div
                  className="answer-prose text-[15px] leading-[1.9] text-[var(--color-text)] blur-[6px] select-none pointer-events-none"
                  dangerouslySetInnerHTML={{ __html: renderAnswer(activeQuestion.answer) }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowAnswer(true)}
                    className="px-7 py-3 bg-[var(--color-accent)] text-white font-medium text-[14px] rounded-xl cursor-pointer shadow-[0_4px_24px_rgba(91,127,255,0.2)] hover:shadow-[0_4px_32px_rgba(91,127,255,0.3)] hover:brightness-110 transition-all"
                  >
                    Show Answer
                  </motion.button>
                </div>
              </div>
            )}

            <AnimatePresence>
              {showAnswer && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Answer */}
                  <motion.div
                    custom={0}
                    variants={staggerChild}
                    initial="hidden"
                    animate="visible"
                    id="section-answer"
                    className="answer-prose text-[15px] leading-[1.9] text-[var(--color-text)] mb-10"
                    dangerouslySetInnerHTML={{ __html: renderAnswer(activeQuestion.answer) }}
                  />

                  {/* Diagram */}
                  {activeQuestion.diagram && (
                    <motion.div id="section-diagram" custom={1} variants={staggerChild} initial="hidden" animate="visible" className="mb-10">
                      <DiagramRenderer diagramId={activeQuestion.diagram} />
                    </motion.div>
                  )}

                  {/* Why Asked */}
                  <motion.div id="section-why-asked" custom={2} variants={staggerChild} initial="hidden" animate="visible"
                    className="mb-12 bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50" />
                    <h3 className="flex items-center gap-2 font-heading text-[13px] font-bold text-amber-500 uppercase tracking-[0.1em] mb-3">
                      <LightBulbIcon className="w-5 h-5" />
                      Why interviewers ask this
                    </h3>
                    <p className="text-[15px] leading-[1.8] text-[var(--color-text2)]">
                      {activeQuestion.whyAsked}
                    </p>
                  </motion.div>

                  {/* Follow-ups */}
                  {activeQuestion.followUps.length > 0 && (
                    <motion.div id="section-follow-ups" custom={3} variants={staggerChild} initial="hidden" animate="visible" className="mb-12">
                      <h3 className="flex items-center gap-2 font-heading text-[14px] font-bold text-white tracking-tight mb-5">
                        <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-[var(--color-accent)]" />
                        Common Follow-up Questions
                      </h3>
                      <div className="space-y-3">
                        {activeQuestion.followUps.map((fu, i) => (
                          <div key={i} className="flex items-start gap-4 text-[15px] text-[var(--color-text)] bg-[var(--color-bg2)] border border-[var(--color-border)] px-5 py-4 rounded-xl hover:border-[var(--color-border2)] transition-colors shadow-sm">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-mono text-[12px] shrink-0 mt-0.5">
                              {i + 1}
                            </div>
                            <span className="leading-relaxed">{fu}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Common Mistakes */}
                  {activeQuestion.mistakes.length > 0 && (
                    <motion.div id="section-mistakes" custom={4} variants={staggerChild} initial="hidden" animate="visible"
                      className="mb-12 bg-red-500/5 border border-red-500/20 rounded-2xl p-6 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50" />
                      <h3 className="flex items-center gap-2 font-heading text-[13px] font-bold text-red-500 uppercase tracking-[0.1em] mb-4">
                        <ExclamationTriangleIcon className="w-5 h-5" />
                        Common mistakes to avoid
                      </h3>
                      <ul className="space-y-3">
                        {activeQuestion.mistakes.map((m, i) => (
                          <li key={i} className="text-[15px] text-[var(--color-text2)] flex gap-3 items-start leading-relaxed">
                            <span className="text-red-500 mt-1 shrink-0">•</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-4 mb-6">
                    <button
                      onClick={() => setShowAnswer(false)}
                      className="text-[12px] text-[var(--color-text3)] hover:text-[var(--color-text2)] transition-colors font-mono cursor-pointer"
                    >
                      ↑ Hide answer
                    </button>
                    <span className="text-[var(--color-border2)]">·</span>
                    <button
                      onClick={() => toggleReviewed(activeQuestion.id)}
                      className={`text-[12px] font-mono cursor-pointer transition-colors ${
                        isReviewed(activeQuestion.id)
                          ? 'text-[var(--color-green)]'
                          : 'text-[var(--color-text3)] hover:text-[var(--color-green)]'
                      }`}
                    >
                      {isReviewed(activeQuestion.id) ? '✓ Reviewed' : '○ Mark as reviewed'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Previous / Next ── */}
          <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex justify-between items-center">
            {currentIndex > 0 ? (
              <Link to={`/section/${sectionId}/question/${sectionQuestions[currentIndex - 1].id}`}
                className="group flex flex-col items-start"
              >
                <span className="text-[11px] text-[var(--color-text3)] font-mono mb-1">← Previous</span>
                <span className="text-[13px] text-[var(--color-text2)] group-hover:text-white transition-colors line-clamp-1 max-w-[260px]">
                  {sectionQuestions[currentIndex - 1].question}
                </span>
              </Link>
            ) : <span />}
            {currentIndex < sectionQuestions.length - 1 ? (
              <Link to={`/section/${sectionId}/question/${sectionQuestions[currentIndex + 1].id}`}
                className="group flex flex-col items-end text-right"
              >
                <span className="text-[11px] text-[var(--color-text3)] font-mono mb-1">Next →</span>
                <span className="text-[13px] text-[var(--color-text2)] group-hover:text-white transition-colors line-clamp-1 max-w-[260px]">
                  {sectionQuestions[currentIndex + 1].question}
                </span>
              </Link>
            ) : <span />}
          </div>

          {/* Keyboard hint */}
          <div className="mt-10 text-center">
            <p className="text-[11px] font-mono text-[var(--color-text3)]/50">
              Space to reveal · ← → to navigate · B to bookmark
            </p>
          </div>
        </article>
      </main>

      {/* ═══════ Right Sidebar: On This Page ═══════ */}
      <aside className="w-[180px] shrink-0 hidden xl:block sticky top-14 h-[calc(100vh-56px)] overflow-y-auto border-l border-[var(--color-border)]">
        <div className="py-10 px-5">
          <h4 className="font-heading text-[10px] font-bold text-[var(--color-text3)] uppercase tracking-[0.15em] mb-5">On This Page</h4>
          <nav className="space-y-3">
            <a href="#section-question" className="block text-[12px] text-[var(--color-text2)] hover:text-white transition-colors">Question</a>
            {showAnswer && (
              <>
                <a href="#section-answer" className="block text-[12px] text-[var(--color-text2)] hover:text-white transition-colors">Answer</a>
                {activeQuestion.diagram && <a href="#section-diagram" className="block text-[12px] text-[var(--color-text3)] hover:text-white transition-colors">Diagram</a>}
                <a href="#section-why-asked" className="block text-[12px] text-[var(--color-text3)] hover:text-white transition-colors">Why Asked</a>
                <a href="#section-follow-ups" className="block text-[12px] text-[var(--color-text3)] hover:text-white transition-colors">Follow-ups</a>
                <a href="#section-mistakes" className="block text-[12px] text-[var(--color-text3)] hover:text-white transition-colors">Mistakes</a>
              </>
            )}
          </nav>
        </div>
      </aside>
    </div>
  );
}
