import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { CodeBlock } from '../components/ui/CodeBlock';
import { InteractiveFollowUp } from '../components/ui/InteractiveFollowUp';
import { DiagramRenderer } from '../components/diagrams/DiagramRenderer';
import questions from '../data/questions';
import { sections } from '../data/sections';
import { BookmarkIcon as BookmarkOutline, LightBulbIcon, ExclamationTriangleIcon, ChatBubbleBottomCenterTextIcon, CodeBracketIcon, CommandLineIcon, Bars3Icon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid, CheckCircleIcon as CheckSolid } from '@heroicons/react/24/solid';
import { useProgress } from '../hooks/useProgress';

const staggerChild: Variants = {
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
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const section = sections.find(s => s.id === sectionId);
  const sectionQuestions = questions.filter(q => q.sectionId === sectionId);

  const activeQuestionId = questionId ? parseInt(questionId) : sectionQuestions[0]?.id;
  const activeQuestion = sectionQuestions.find(q => q.id === activeQuestionId);

  useEffect(() => {
    if (sectionId && !questionId && sectionQuestions.length > 0) {
      navigate(`/section/${sectionId}/question/${sectionQuestions[0].id}`, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId, sectionId]);

  const [prevQuestionId, setPrevQuestionId] = useState(activeQuestionId);
  if (activeQuestionId !== prevQuestionId) {
    setPrevQuestionId(activeQuestionId);
    setShowExample(false);
  }

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [activeQuestionId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
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
      .replace(/\\n/g, '<br/>')
      .replace(/\n/g, '<br/>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');

  return (
    <div className="flex min-h-[calc(100vh-56px)]">

      {/* ═══════ Left Sidebar ═══════ */}
      <aside className="w-[280px] shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg)] overflow-y-auto hidden lg:block sticky top-14 h-[calc(100vh-56px)]">
        <div className="py-6 px-4">
          <div className="mb-6 px-2">
            <Link to="/home" className="inline-flex items-center gap-2 text-[12px] text-[var(--color-text3)] hover:text-[var(--color-text)] transition-colors group">
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              <span>All Topics</span>
            </Link>
          </div>

          <div className="mb-4 px-2">
            <h2 className="text-[14px] font-semibold text-[var(--color-text)] tracking-tight">{section.name}</h2>
          </div>

          <div className="space-y-0.5">
            {sectionQuestions.map(q => {
              const isActive = q.id === activeQuestionId;
              const isDone = isReviewed(q.id);
              return (
                <Link
                  key={q.id}
                  to={`/section/${sectionId}/question/${q.id}`}
                  className={`group flex items-start gap-2.5 px-3 py-2 rounded-md text-[13px] leading-snug transition-all ${isActive
                    ? 'text-[var(--color-text)] font-medium bg-[var(--color-bg2)]'
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
      <main ref={mainRef} className="flex-1 overflow-y-auto">
        <article className="max-w-4xl mx-auto px-6 sm:px-10 py-10 sm:py-14 pb-24 lg:pb-14">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] text-[var(--color-text3)] mb-10 font-mono">
            <Link to="/home" className="hover:text-[var(--color-text2)] transition-colors">Home</Link>
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

          {/* ① Question Text */}
          <h1 id="section-question" className="font-heading text-[32px] sm:text-[40px] font-extrabold text-[var(--color-text)] leading-[1.15] tracking-tight mb-6">
            {activeQuestion.question}
          </h1>

          <div className="flex items-center gap-3 text-[13px] text-[var(--color-text3)] mb-10 pb-10 border-b border-[var(--color-border)]">
             <span className="font-medium text-[var(--color-text2)]">Interview Guide</span>
             <span>•</span>
             <span>{section.name}</span>
          </div>

          {/* ── All Sections Always Visible ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeQuestion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >

              {/* ② Answer — What to Say in the Interview */}
              <motion.div id="section-answer" custom={0} variants={staggerChild} initial="hidden" animate="visible" className="mb-8">
                <div className="bg-[var(--color-bg2)] border-l-4 border-l-[var(--color-accent)] border border-[var(--color-border)] p-6 rounded-r-xl shadow-sm">
                  <h3 className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[var(--color-accent)] mb-3">
                    <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
                    What to Say in the Interview
                  </h3>
                  <div className="text-[15px] leading-[1.85] text-[var(--color-text)]" dangerouslySetInnerHTML={{ __html: renderAnswer(activeQuestion.interviewPitch || activeQuestion.answer) }} />
                </div>
              </motion.div>

              {/* ③ Under the Hood — Full Explanation */}
              <motion.div id="section-explanation" custom={1} variants={staggerChild} initial="hidden" animate="visible" className="mb-8">
                <div className="bg-[var(--color-bg2)] border border-[var(--color-border)] p-6 rounded-xl shadow-sm">
                  <h3 className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[var(--color-text3)] mb-3">
                    <CommandLineIcon className="w-4 h-4" />
                    Under the Hood
                  </h3>
                  <div className="answer-prose text-[15px] leading-[1.9] text-[var(--color-text)]" dangerouslySetInnerHTML={{ __html: renderAnswer(activeQuestion.explanation || activeQuestion.answer) }} />
                </div>
              </motion.div>

              {/* ④ Example */}
              {activeQuestion.example && (
                <motion.div id="section-example" custom={2} variants={staggerChild} initial="hidden" animate="visible" className="mb-8">
                  <div className="bg-[var(--color-bg2)] border border-[var(--color-border)] p-5 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[var(--color-text3)]">
                        <CodeBracketIcon className="w-4 h-4" />
                        Code Example / Query
                      </h3>
                      <button 
                        onClick={() => setShowExample(!showExample)}
                        className="text-[11px] font-bold px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white hover:brightness-110 transition-all shadow-sm"
                      >
                        {showExample ? 'Hide Query' : 'Show Solution / Query'}
                      </button>
                    </div>
                    
                    <AnimatePresence>
                      {showExample && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: 'auto', opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                            <div className="mt-5">
                              <CodeBlock codeString={activeQuestion.example} defaultLanguage={activeQuestion.sectionId} />
                            </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* ⑤ Diagram */}
              {activeQuestion.diagram && (
                <motion.div id="section-diagram" custom={3} variants={staggerChild} initial="hidden" animate="visible" className="mb-10">
                  <DiagramRenderer diagramId={activeQuestion.diagram} />
                </motion.div>
              )}

              {/* ⑥ Why Interviewers Ask This */}
              <motion.div id="section-why-asked" custom={4} variants={staggerChild} initial="hidden" animate="visible"
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

              {/* ⑦ Follow-ups */}
              {activeQuestion.followUps.length > 0 && (
                <motion.div id="section-follow-ups" custom={5} variants={staggerChild} initial="hidden" animate="visible" className="mb-12">
                  <h3 className="flex items-center gap-2 font-heading text-[14px] font-bold text-[var(--color-text)] tracking-tight mb-5">
                    <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-[var(--color-accent)]" />
                    Common Follow-up Questions
                  </h3>
                  <div className="space-y-4">
                    {activeQuestion.followUps.map((fu, i) => (
                      <InteractiveFollowUp key={i} followUp={fu} index={i} renderAnswer={renderAnswer} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ⑧ Common Mistakes */}
              {activeQuestion.mistakes.length > 0 && (
                <motion.div id="section-mistakes" custom={6} variants={staggerChild} initial="hidden" animate="visible"
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
                  onClick={() => toggleReviewed(activeQuestion.id)}
                  className={`text-[12px] font-mono cursor-pointer transition-colors ${isReviewed(activeQuestion.id)
                    ? 'text-[var(--color-green)]'
                    : 'text-[var(--color-text3)] hover:text-[var(--color-green)]'
                    }`}
                >
                  {isReviewed(activeQuestion.id) ? '✓ Reviewed' : '○ Mark as reviewed'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Previous / Next ── */}
          <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex justify-between items-center">
            {currentIndex > 0 ? (
              <Link to={`/section/${sectionId}/question/${sectionQuestions[currentIndex - 1].id}`}
                className="group flex flex-col items-start"
              >
                <span className="text-[11px] text-[var(--color-text3)] font-mono mb-1">← Previous</span>
                <span className="text-[13px] text-[var(--color-text2)] group-hover:text-[var(--color-text)] transition-colors line-clamp-1 max-w-[260px]">
                  {sectionQuestions[currentIndex - 1].question}
                </span>
              </Link>
            ) : <span />}
            {currentIndex < sectionQuestions.length - 1 ? (
              <Link to={`/section/${sectionId}/question/${sectionQuestions[currentIndex + 1].id}`}
                className="group flex flex-col items-end text-right"
              >
                <span className="text-[11px] text-[var(--color-text3)] font-mono mb-1">Next →</span>
                <span className="text-[13px] text-[var(--color-text2)] group-hover:text-[var(--color-text)] transition-colors line-clamp-1 max-w-[260px]">
                  {sectionQuestions[currentIndex + 1].question}
                </span>
              </Link>
            ) : <span />}
          </div>

          {/* Keyboard hint */}
          <div className="mt-10 text-center">
            <p className="text-[11px] font-mono text-[var(--color-text3)]/50">
              ← → to navigate · B to bookmark
            </p>
          </div>
        </article>
      </main>

      {/* ═══════ Right Sidebar: On This Page ═══════ */}
      <aside className="w-[180px] shrink-0 hidden xl:block sticky top-14 h-[calc(100vh-56px)] overflow-y-auto border-l border-[var(--color-border)]">
        <div className="py-10 px-5">
          <h4 className="font-heading text-[10px] font-bold text-[var(--color-text3)] uppercase tracking-[0.15em] mb-5">On This Page</h4>
          <nav className="space-y-3">
            {[
              { id: 'section-question', label: 'Question' },
              { id: 'section-answer', label: 'What to Say' },
              { id: 'section-explanation', label: 'Under the Hood' },
              ...(activeQuestion.example ? [{ id: 'section-example', label: 'Example' }] : []),
              ...(activeQuestion.diagram ? [{ id: 'section-diagram', label: 'Diagram' }] : []),
              { id: 'section-why-asked', label: 'Why Asked' },
              ...(activeQuestion.followUps.length > 0 ? [{ id: 'section-follow-ups', label: 'Follow-ups' }] : []),
              ...(activeQuestion.mistakes.length > 0 ? [{ id: 'section-mistakes', label: 'Mistakes' }] : []),
            ].map(item => (
              <button
                key={item.id}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="block text-[12px] text-[var(--color-text3)] hover:text-[var(--color-text)] transition-colors cursor-pointer text-left"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {activeQuestion.companies && activeQuestion.companies.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
              <h4 className="font-heading text-[10px] font-bold text-[var(--color-text3)] uppercase tracking-[0.15em] mb-4">Asked By</h4>
              <div className="flex flex-wrap gap-1.5">
                {activeQuestion.companies.map((company: string) => (
                  <span key={company} className="text-[10px] font-mono font-medium text-[var(--color-text2)] bg-[var(--color-bg2)] px-2 py-1 rounded border border-[var(--color-border)]">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          )}
          {activeQuestion.practiceLinks && activeQuestion.practiceLinks.length > 0 && (
            <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
              <h4 className="font-heading text-[10px] font-bold text-[var(--color-text3)] uppercase tracking-[0.15em] mb-4">Practice Links</h4>
              <div className="flex flex-col gap-2">
                {activeQuestion.practiceLinks.map((link, i) => (
                  <a 
                    key={i} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group/link p-2 rounded-lg bg-[var(--color-bg2)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all"
                  >
                    <span className="text-[11px] font-medium text-[var(--color-text2)] group-hover/link:text-[var(--color-text)]">{link.platform}</span>
                    <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${link.type === 'practice' ? 'text-[var(--color-accent)] bg-[var(--color-accent)]/10' : 'text-[var(--color-purple)] bg-[var(--color-purple)]/10'}`}>
                      {link.type}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ═══════ Mobile Bottom Nav ═══════ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-bg)]/95 backdrop-blur-md border-t border-[var(--color-border)] safe-area-bottom">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Prev */}
          {currentIndex > 0 ? (
            <Link
              to={`/section/${sectionId}/question/${sectionQuestions[currentIndex - 1].id}`}
              className="flex items-center gap-1 text-[var(--color-text2)] hover:text-[var(--color-text)] transition-colors p-2"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              <span className="text-[12px] font-medium">Prev</span>
            </Link>
          ) : <div className="w-16" />}

          {/* Question list toggle */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-bg2)] border border-[var(--color-border)] cursor-pointer"
          >
            <Bars3Icon className="w-4 h-4 text-[var(--color-text3)]" />
            <span className="text-[12px] font-semibold text-[var(--color-text)]">{currentIndex + 1} / {sectionQuestions.length}</span>
          </button>

          {/* Next */}
          {currentIndex < sectionQuestions.length - 1 ? (
            <Link
              to={`/section/${sectionId}/question/${sectionQuestions[currentIndex + 1].id}`}
              className="flex items-center gap-1 text-[var(--color-text2)] hover:text-[var(--color-text)] transition-colors p-2"
            >
              <span className="text-[12px] font-medium">Next</span>
              <ChevronRightIcon className="w-5 h-5" />
            </Link>
          ) : <div className="w-16" />}
        </div>
      </div>

      {/* ═══════ Mobile Question Drawer ═══════ */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="lg:hidden fixed inset-0 z-[60] bg-black/60"
            />
            {/* Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-[70] bg-[var(--color-bg)] border-t border-[var(--color-border)] rounded-t-2xl max-h-[70vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-[var(--color-bg)] border-b border-[var(--color-border)] px-5 py-4 flex items-center justify-between">
                <h3 className="text-[14px] font-semibold text-[var(--color-text)]">{section.name}</h3>
                <button onClick={() => setMobileDrawerOpen(false)} className="p-1 cursor-pointer">
                  <XMarkIcon className="w-5 h-5 text-[var(--color-text3)]" />
                </button>
              </div>
              <div className="p-3 pb-8 space-y-1">
                {sectionQuestions.map((q, i) => {
                  const isActive = q.id === activeQuestionId;
                  const isDone = isReviewed(q.id);
                  return (
                    <Link
                      key={q.id}
                      to={`/section/${sectionId}/question/${q.id}`}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`flex items-start gap-3 px-4 py-3 rounded-xl text-[14px] leading-snug transition-all ${
                        isActive
                          ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium'
                          : 'text-[var(--color-text2)] hover:bg-[var(--color-bg2)]'
                      }`}
                    >
                      {isDone ? (
                        <CheckSolid className="w-5 h-5 shrink-0 text-[var(--color-green)] mt-[1px]" />
                      ) : (
                        <span className="w-5 h-5 shrink-0 flex items-center justify-center text-[11px] font-mono text-[var(--color-text3)] mt-[1px]">{i + 1}</span>
                      )}
                      <span className="line-clamp-2">{q.question}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
