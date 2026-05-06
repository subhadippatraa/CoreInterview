import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { sections } from '../data/sections';
import questions from '../data/questions';
import { useProgress } from '../hooks/useProgress';
import { CodeBracketIcon, ServerIcon, CircleStackIcon, CpuChipIcon, GlobeAltIcon, RectangleGroupIcon, CloudIcon, TableCellsIcon, ArrowRightIcon, SparklesIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

import React from 'react';

const iconMap: Record<string, React.ElementType> = {
  csharp: CodeBracketIcon, aspnet: ServerIcon, efcore: TableCellsIcon, dbms: CircleStackIcon,
  os: CpuChipIcon, networking: GlobeAltIcon, systemdesign: RectangleGroupIcon, devops: CloudIcon,
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export function Home() {
  const { data } = useProgress();

  const totalQuestions = questions.length;
  const totalReviewed = data.reviewed.length;
  const overallProgress = totalQuestions === 0 ? 0 : Math.round((totalReviewed / totalQuestions) * 100);

  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = searchQuery.trim() === '' || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !difficultyFilter || q.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const showSearchResults = searchQuery.trim().length > 0 || difficultyFilter;

  return (
    <PageWrapper className="flex-1">
      <div className="max-w-[880px] mx-auto px-6 sm:px-10 lg:px-0 pt-14 sm:pt-20 pb-28">

        {/* ═══ Hero ═══ */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
          


          <h1 className="text-[40px] sm:text-[52px] font-extrabold leading-[1.08] tracking-tight mb-5">
            <span className="text-[var(--color-text)]">Crack your </span>
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-purple)] bg-clip-text text-transparent">.NET Interview</span>
          </h1>

          <p className="text-[16px] sm:text-[17px] text-[var(--color-text2)] max-w-[520px] leading-[1.7] mb-8">
            Master C#, ASP.NET Core, EF Core, DBMS, System Design and more. 
            Curated questions with expert answers, real code examples, and interviewer insights.
          </p>

          <div className="flex flex-wrap gap-3 mb-14">
            <Link to={`/section/${sections[0].id}`}>
              <motion.button whileTap={{ scale: 0.97 }}
                className="h-11 px-6 bg-[var(--color-accent)] text-white text-[13px] font-semibold rounded-xl hover:brightness-110 transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-[var(--color-accent)]/20">
                Start Learning
                <ArrowRightIcon className="w-4 h-4" />
              </motion.button>
            </Link>
            <Link to="/mock">
              <motion.button whileTap={{ scale: 0.97 }}
                className="h-11 px-6 bg-[var(--color-bg2)] border border-[var(--color-border)] text-[var(--color-text2)] text-[13px] font-medium rounded-xl hover:text-[var(--color-text)] hover:border-[var(--color-border2)] transition-all cursor-pointer">
                Mock Interview
              </motion.button>
            </Link>
          </div>
        </motion.section>

        {/* ═══ Progress Overview ═══ */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="mb-12 p-5 rounded-2xl bg-[var(--color-bg2)] border border-[var(--color-border)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-semibold text-[var(--color-text)]">Your Progress</span>
              <span className="text-[12px] font-mono text-[var(--color-text3)]">{totalReviewed}/{totalQuestions} questions</span>
            </div>
            <span className="text-[14px] font-bold text-[var(--color-accent)] font-mono">{overallProgress}%</span>
          </div>
          <div className="h-2 bg-[var(--color-bg3)] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-purple)] rounded-full"
            />
          </div>
        </motion.div>

        {/* ═══ Stats Row ═══ */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-14">
          {[
            { value: totalQuestions, label: 'Questions', color: 'var(--color-accent)' },
            { value: sections.length, label: 'Topics', color: 'var(--color-purple)' },
            { value: 'Free', label: 'Forever', color: 'var(--color-green)' },
          ].map((stat, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.08 }}
              className="p-4 rounded-xl bg-[var(--color-bg2)] border border-[var(--color-border)] text-center"
            >
              <div className="text-[24px] font-bold font-mono" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-[11px] text-[var(--color-text3)] font-medium uppercase tracking-wider mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ═══ Search + Filter ═══ */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
          className="mb-10">

          {/* Search Bar */}
          <div className="relative mb-4">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text3)]" />
            <input
              type="text"
              placeholder="Search questions... (e.g. async, LINQ, deadlock)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-[var(--color-bg2)] border border-[var(--color-border)] text-[14px] text-[var(--color-text)] placeholder-[var(--color-text3)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[var(--color-text3)] font-medium mr-1">Filter:</span>
            {(['easy', 'medium', 'hard'] as const).map(level => (
              <button
                key={level}
                onClick={() => setDifficultyFilter(difficultyFilter === level ? null : level)}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider cursor-pointer transition-all ${
                  difficultyFilter === level
                    ? `badge-${level} ring-1 ring-offset-1 ring-offset-[var(--color-bg)]`
                    : 'text-[var(--color-text3)] bg-[var(--color-bg2)] border border-[var(--color-border)] hover:border-[var(--color-border2)]'
                }`}
              >
                {level}
              </button>
            ))}
            {(searchQuery || difficultyFilter) && (
              <button
                onClick={() => { setSearchQuery(''); setDifficultyFilter(null); }}
                className="ml-auto text-[11px] text-[var(--color-text3)] hover:text-[var(--color-text)] cursor-pointer transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </motion.div>

        {/* ═══ Search Results ═══ */}
        {showSearchResults ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-14">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[13px] font-bold text-[var(--color-text)] uppercase tracking-[0.1em]">
                {filteredQuestions.length} {filteredQuestions.length === 1 ? 'Result' : 'Results'}
              </h2>
            </div>
            {filteredQuestions.length === 0 ? (
              <div className="py-12 text-center text-[var(--color-text3)]">
                <p className="text-[15px] mb-1">No questions found</p>
                <p className="text-[12px]">Try a different keyword or clear filters</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredQuestions.slice(0, 20).map(q => {
                  const sec = sections.find(s => s.id === q.sectionId);
                  return (
                    <Link key={q.id} to={`/section/${q.sectionId}/question/${q.id}`}>
                      <div className="group flex items-start gap-3 p-4 rounded-xl bg-[var(--color-bg2)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all cursor-pointer">
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider badge-${q.difficulty} shrink-0 mt-1`}>
                          {q.difficulty}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">{q.question}</p>
                          <p className="text-[12px] text-[var(--color-text3)] mt-0.5">{sec?.name}</p>
                        </div>
                        <ArrowRightIcon className="w-4 h-4 text-[var(--color-text3)] group-hover:text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-all shrink-0 mt-1" />
                      </div>
                    </Link>
                  );
                })}
                {filteredQuestions.length > 20 && (
                  <p className="text-center text-[12px] text-[var(--color-text3)] pt-2">Showing first 20 of {filteredQuestions.length} results</p>
                )}
              </div>
            )}
          </motion.div>
        ) : (
        <>
        {/* ═══ Topics Grid ═══ */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[13px] font-bold text-[var(--color-text)] uppercase tracking-[0.1em]">All Topics</h2>
            <span className="text-[11px] text-[var(--color-text3)] font-mono">{sections.length} sections</span>
          </div>

          <div className="space-y-12">
            {[
              {
                title: '.NET Ecosystem',
                color: 'var(--color-accent)',
                sectionIds: ['csharp', 'dotnet', 'aspnet', 'efcore', 'architecture']
              },
              {
                title: 'Core Subjects',
                color: 'var(--color-green)',
                sectionIds: ['sql-theory', 'sql-queries', 'dbms', 'systemdesign', 'os', 'networking']
              },
              {
                title: 'DevOps & Others',
                color: 'var(--color-purple)',
                sectionIds: ['devops']
              }
            ].map((category, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-3 mb-4 pl-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: category.color }} />
                  <h3 className="text-[14px] font-bold text-[var(--color-text2)] uppercase tracking-widest">{category.title}</h3>
                </div>
                
                <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {category.sectionIds.map(sectionId => {
                    const section = sections.find(s => s.id === sectionId);
                    if (!section) return null;
                    
                    const sectionQs = questions.filter(q => q.sectionId === section.id);
                    const count = sectionQs.length;
                    const completedCount = sectionQs.filter(q => data.reviewed.includes(q.id)).length;
                    const progress = count === 0 ? 0 : Math.round((completedCount / count) * 100);
                    const Icon = iconMap[section.icon] || CodeBracketIcon;
                    const isComplete = progress === 100 && count > 0;

                    return (
                      <motion.div key={section.id} variants={item}>
                        <Link to={`/section/${section.id}`}>
                          <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}
                            className={`group relative flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${
                              isComplete
                                ? 'bg-[var(--color-green)]/5 border-[var(--color-green)]/20 hover:border-[var(--color-green)]/40'
                                : 'bg-[var(--color-bg2)] border-[var(--color-border)] hover:border-[var(--color-accent)]/30 hover:shadow-lg hover:shadow-[var(--color-accent)]/5'
                            }`}>

                            {/* Icon */}
                            <div className={`p-2.5 rounded-xl border shrink-0 mt-0.5 transition-all ${
                              isComplete
                                ? 'bg-[var(--color-green)]/10 border-[var(--color-green)]/20 text-[var(--color-green)]'
                                : 'bg-[var(--color-bg)] border-[var(--color-border)] text-[var(--color-text3)] group-hover:text-[var(--color-accent)] group-hover:border-[var(--color-accent)]/25'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className={`text-[15px] font-semibold leading-snug transition-colors ${
                                  isComplete
                                    ? 'text-[var(--color-green)]'
                                    : 'text-[var(--color-text)] group-hover:text-[var(--color-accent)]'
                                }`}>
                                  {section.name}
                                </h3>
                                {isComplete && <CheckCircleIcon className="w-4 h-4 text-[var(--color-green)]" />}
                              </div>
                              <p className="text-[12px] text-[var(--color-text3)] leading-relaxed mb-3">{section.description}</p>

                              {/* Progress bar */}
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-[10px] text-[var(--color-text3)]">{completedCount}/{count}</span>
                                <div className="flex-1 h-1.5 bg-[var(--color-bg3)] rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-500 ease-out ${
                                      isComplete ? 'bg-[var(--color-green)]' : 'bg-[var(--color-accent)]'
                                    }`}
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>
                                <span className={`font-mono text-[10px] font-medium ${
                                  isComplete ? 'text-[var(--color-green)]' : 'text-[var(--color-accent)]'
                                }`}>{progress}%</span>
                              </div>
                            </div>

                            {/* Arrow */}
                            <ArrowRightIcon className={`w-4 h-4 shrink-0 mt-1 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-1 ${
                              isComplete ? 'text-[var(--color-green)]' : 'text-[var(--color-accent)]'
                            }`} />
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ Footer CTA ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/8 to-[var(--color-purple)]/8 border border-[var(--color-accent)]/15">
            <h3 className="text-[18px] font-bold text-[var(--color-text)] mb-2">Ready to ace your interview?</h3>
            <p className="text-[13px] text-[var(--color-text3)] mb-5 max-w-[360px] mx-auto">
              Practice with our mock interview mode and get real-time feedback.
            </p>
            <Link to="/mock">
              <motion.button whileTap={{ scale: 0.97 }}
                className="h-10 px-5 bg-[var(--color-accent)] text-white text-[13px] font-semibold rounded-xl hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-[var(--color-accent)]/20">
                Try Mock Interview →
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Footer note */}
        <div className="mt-10 text-center">
          <p className="text-[11px] font-mono text-[var(--color-text3)]/40">
            Built for .NET developers · Open source · Always free
          </p>
        </div>
        </>
        )}
      </div>
    </PageWrapper>
  );
}
