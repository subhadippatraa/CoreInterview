import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { sections } from '../data/sections';
import questions from '../data/questions';
import { useProgress } from '../hooks/useProgress';
import { CodeBracketIcon, ServerIcon, CircleStackIcon, CpuChipIcon, GlobeAltIcon, RectangleGroupIcon, CloudIcon } from '@heroicons/react/24/outline';

import React from 'react';

const iconMap: Record<string, React.ElementType> = {
  csharp: CodeBracketIcon, aspnet: ServerIcon, dbms: CircleStackIcon,
  os: CpuChipIcon, networking: GlobeAltIcon, systemdesign: RectangleGroupIcon, devops: CloudIcon,
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export function Home() {
  const { data } = useProgress();

  return (
    <PageWrapper className="flex-1">
      <div className="max-w-[720px] mx-auto px-6 sm:px-10 lg:px-0 pt-16 sm:pt-24 pb-28">

        {/* Hero */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="font-mono text-[12px] text-[var(--color-text3)] mb-4">{'// interview prep for .NET freshers'}</p>

          <h1 className="text-[36px] sm:text-[44px] font-extrabold leading-[1.1] tracking-tight mb-5">
            <span className="text-[var(--color-text)]">Core</span>
            <span className="text-[var(--color-accent)]">Interview</span>
          </h1>

          <p className="text-[15px] sm:text-[16px] text-[var(--color-text2)] max-w-[440px] leading-[1.7] mb-8">
            Master C#, ASP.NET Core, DBMS, System Design and more. Prepare smarter for your .NET interview.
          </p>

          <div className="flex flex-wrap gap-3 mb-14">
            <Link to={`/section/${sections[0].id}`}>
              <motion.button whileTap={{ scale: 0.97 }}
                className="h-10 px-5 bg-[var(--color-accent)] text-white text-[13px] font-semibold rounded-lg hover:brightness-110 transition-all cursor-pointer">
                Start Preparing →
              </motion.button>
            </Link>
            <Link to="/mock">
              <motion.button whileTap={{ scale: 0.97 }}
                className="h-10 px-5 bg-[var(--color-bg2)] border border-[var(--color-border)] text-[var(--color-text2)] text-[13px] font-medium rounded-lg hover:text-[var(--color-text)] hover:border-[var(--color-border2)] transition-all cursor-pointer">
                Mock Interview
              </motion.button>
            </Link>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="flex gap-10 mb-12 pb-8 border-b border-[var(--color-border)]">
          <div>
            <div className="text-[22px] font-bold text-[var(--color-text)]">{questions.length}</div>
            <div className="text-[12px] text-[var(--color-text3)]">Questions</div>
          </div>
          <div>
            <div className="text-[22px] font-bold text-[var(--color-text)]">{sections.length}</div>
            <div className="text-[12px] text-[var(--color-text3)]">Topics</div>
          </div>
          <div>
            <div className="text-[22px] font-bold text-[var(--color-green)]">Free</div>
            <div className="text-[12px] text-[var(--color-text3)]">Forever</div>
          </div>
        </motion.div>

        {/* Topics */}
        <h2 className="text-[11px] font-bold text-[var(--color-text3)] uppercase tracking-[0.12em] mb-5">Topics</h2>

        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sections.map(section => {
            const sectionQs = questions.filter(q => q.sectionId === section.id);
            const count = sectionQs.length;
            const completedCount = sectionQs.filter(q => data.reviewed.includes(q.id)).length;
            const progress = count === 0 ? 0 : Math.round((completedCount / count) * 100);
            const Icon = iconMap[section.icon] || CodeBracketIcon;
            return (
              <motion.div key={section.id} variants={item}>
                <Link to={`/section/${section.id}`}>
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                    className="group flex items-start gap-3.5 p-4 rounded-xl bg-[var(--color-bg2)] border border-[var(--color-border)] hover:border-[var(--color-border2)] transition-all cursor-pointer">

                    <div className="p-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text3)] group-hover:text-[var(--color-accent)] group-hover:border-[var(--color-accent)]/20 transition-all shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <h3 className="text-[14px] font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                          {section.name}
                        </h3>
                        <span className="text-[var(--color-text3)] group-hover:text-[var(--color-accent)] transition-colors text-[12px]">→</span>
                      </div>
                      <p className="text-[12px] text-[var(--color-text3)] leading-relaxed mb-3">{section.description}</p>
                      
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[10px] text-[var(--color-text3)]">{count} {count === 1 ? 'question' : 'questions'}</span>
                        <div className="flex items-center gap-2 w-24">
                          <div className="h-1.5 flex-1 bg-[var(--color-bg3)] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-500 ease-out"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="font-mono text-[10px] text-[var(--color-accent)]">{progress}%</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </PageWrapper>
  );
}
