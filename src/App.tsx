import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { SectionLayout } from './pages/SectionLayout';
import { MockInterview } from './pages/MockInterview';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col">
        <Navbar />
        <main className="flex-1 relative flex flex-col">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/section/:sectionId" element={<SectionLayout />} />
              <Route path="/section/:sectionId/question/:questionId" element={<SectionLayout />} />
              <Route path="/mock" element={<MockInterview />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
