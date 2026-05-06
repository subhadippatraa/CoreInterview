import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { SearchModal } from './components/ui/SearchModal';
import { useSearchShortcut } from './hooks/useSearchShortcut';
import './index.css';

// Lazy load heavy page routes for optimal performance
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const SectionLayout = lazy(() => import('./pages/SectionLayout').then(m => ({ default: m.SectionLayout })));
const MockInterview = lazy(() => import('./pages/MockInterview').then(m => ({ default: m.MockInterview })));
const Profile = lazy(() => import('./pages/Profile').then(m => ({ default: m.Profile })));

// Loading Fallback
const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-4 border-[var(--color-accent)]/30 border-t-[var(--color-accent)] rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  useSearchShortcut(openSearch);

  useEffect(() => {
    const handleOpenGlobalSearch = () => openSearch();
    window.addEventListener('open-global-search', handleOpenGlobalSearch);
    return () => window.removeEventListener('open-global-search', handleOpenGlobalSearch);
  }, [openSearch]);

  return (
    <Router>
      <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col">
        <Navbar />
        <main className="flex-1 relative flex flex-col">
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/section/:sectionId" element={<SectionLayout />} />
                <Route path="/section/:sectionId/question/:questionId" element={<SectionLayout />} />
                <Route path="/mock" element={<MockInterview />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
        <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
      </div>
    </Router>
  );
}

export default App;
