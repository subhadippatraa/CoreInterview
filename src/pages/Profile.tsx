import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { useProgress } from '../hooks/useProgress';
import { sections } from '../data/sections';
import questions from '../data/questions';
import { Link } from 'react-router-dom';
import { ChartBarIcon, BookmarkIcon, ClockIcon, TrashIcon } from '@heroicons/react/24/outline';

export function Profile() {
  const { data } = useProgress();

  // Metrics calculation
  const totalQuestions = questions.length;
  const reviewedCount = data.reviewed.length;
  const bookmarkCount = data.bookmarks.length;
  const totalMocks = data.mockResults.length;

  const completedPercentage = Math.round((reviewedCount / totalQuestions) * 100) || 0;

  // Detailed Section Progress
  const sectionStats = sections.map(section => {
    const sectionQuestions = questions.filter(q => q.sectionId === section.id);
    const sectionReviewed = sectionQuestions.filter(q => data.reviewed.includes(q.id));
    const completionPerc = Math.round((sectionReviewed.length / sectionQuestions.length) * 100) || 0;
    
    return {
      ...section,
      total: sectionQuestions.length,
      reviewed: sectionReviewed.length,
      percentage: completionPerc
    };
  });

  const clearData = () => {
    if (window.confirm("Are you sure you want to clear ALL your progress, bookmarks, and mock results? This cannot be undone.")) {
      localStorage.removeItem('coreinterview');
      window.location.reload();
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-screen-lg mx-auto space-y-12 pt-8 pb-16 px-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
              </span>
              Developer Dashboard
            </div>
            <h1 className="text-4xl font-heading font-extrabold tracking-tight text-[var(--color-text)]">
              Your Profile
            </h1>
            <p className="text-[var(--color-text2)] mt-2 text-[15px] max-w-xl leading-relaxed">
              Track your interview preparation progress. All data is saved securely on your device for complete privacy and instant access.
            </p>
          </div>
          <button 
            onClick={clearData}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-red-500/20 text-red-500 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/30 rounded-xl text-[14px] font-semibold transition-all shadow-sm"
          >
            <TrashIcon className="w-4 h-4" />
            Clear Data
          </button>
        </div>

        {/* Global Stats Row */}
        <div>
          <h3 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2 mb-4">
            <ChartBarIcon className="w-5 h-5 text-[var(--color-accent)]" />
            Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-[var(--color-bg)] shadow-sm border border-[var(--color-border)] p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden group hover:border-[var(--color-accent)]/50 transition-colors">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-colors" />
              <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
                <ChartBarIcon className="w-5 h-5 text-current" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[var(--color-text3)] uppercase tracking-wider mb-1">Completion</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-extrabold font-heading text-[var(--color-text)] tracking-tight">
                    {completedPercentage}%
                  </p>
                  <span className="text-[13px] font-medium text-[var(--color-text3)]">({reviewedCount} / {totalQuestions})</span>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-bg)] shadow-sm border border-[var(--color-border)] p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden group hover:border-[var(--color-accent)]/50 transition-colors">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/10 transition-colors" />
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                <BookmarkIcon className="w-5 h-5 text-current" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[var(--color-text3)] uppercase tracking-wider mb-1">Saved Pins</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-extrabold font-heading text-[var(--color-text)] tracking-tight">
                    {bookmarkCount}
                  </p>
                  <span className="text-[13px] font-medium text-[var(--color-text3)]">items stored</span>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-bg)] shadow-sm border border-[var(--color-border)] p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden group hover:border-[var(--color-accent)]/50 transition-colors">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <ClockIcon className="w-5 h-5 text-current" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[var(--color-text3)] uppercase tracking-wider mb-1">Mocks Finished</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-extrabold font-heading text-[var(--color-text)] tracking-tight">
                    {totalMocks}
                  </p>
                  <span className="text-[13px] font-medium text-[var(--color-text3)]">simulations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Breakdown Map */}
        <div className="pt-4">
          <h3 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2 mb-4">
            <span className="text-lg">📚</span>
            Topic Mastery
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sectionStats.map(stat => (
              <Link 
                key={stat.id} 
                to={`/section/${stat.id}`}
                className="bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-md p-5 rounded-2xl transition-all block group relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-[15px] font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors pr-8 leading-snug">{stat.name}</h4>
                  <span className="text-[12px] font-mono font-bold bg-[var(--color-bg2)] text-[var(--color-text2)] px-2 py-1 rounded-md">{stat.percentage}%</span>
                </div>
                {/* Progress bar line */}
                <div className="w-full bg-[var(--color-border)] h-2 rounded-full overflow-hidden mb-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.percentage}%` }}
                    className="bg-[var(--color-accent)] h-full rounded-full"
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <p className="text-[12px] font-medium text-[var(--color-text3)]">
                  {stat.reviewed} <span className="font-normal opacity-70">of</span> {stat.total} <span className="font-normal opacity-70">topics mastered</span>
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Bookmarked Questions Preview */}
        {data.bookmarks.length > 0 && (
          <div className="pt-4">
            <h3 className="text-lg font-bold text-[var(--color-text)] flex items-center justify-between mb-4">
              <span className="flex items-center gap-2">
                <BookmarkIcon className="w-5 h-5 text-[var(--color-accent)]" />
                Quick Access Pins
              </span>
              <span className="text-[13px] text-[var(--color-text3)] font-medium bg-[var(--color-bg2)] px-2.5 py-1 rounded-full">{data.bookmarks.length} saved</span>
            </h3>
            <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl overflow-hidden divide-y divide-[var(--color-border)]/50 shadow-sm">
              {data.bookmarks.slice(0, 10).map(bId => {
                const q = questions.find(q => q.id === bId);
                if (!q) return null;
                return (
                  <Link 
                    key={bId}
                    to={`/section/${q.sectionId}/question/${q.id}`}
                    className="flex justify-between items-center p-4 hover:bg-[var(--color-bg2)] transition-colors group"
                  >
                    <div className="text-[15px] font-medium text-[var(--color-text)] line-clamp-1 group-hover:text-[var(--color-accent)] transition-colors">
                      {q.question}
                    </div>
                    <div className="ml-4 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text2)] whitespace-nowrap bg-[var(--color-bg)] border border-[var(--color-border)] px-2.5 py-1 rounded-md shadow-sm">
                      {q.sectionId}
                    </div>
                  </Link>
                );
              })}
              {data.bookmarks.length > 10 && (
                <div className="p-4 text-center text-sm font-bold text-[var(--color-text2)] bg-[var(--color-bg)] border-t border-[var(--color-border)]">
                  + {data.bookmarks.length - 10} more saved items
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </PageWrapper>
  );
}