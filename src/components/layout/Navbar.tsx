import { Link, useLocation } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export function Navbar() {
  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <nav className="w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 group">
          <div className="w-7 h-7 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
            <span className="text-white font-heading font-extrabold text-xs">CI</span>
          </div>
          <span className="font-heading font-bold text-[15px] tracking-tight">
            <span className="text-[var(--color-text)] font-extrabold">Core</span>
            <span className="text-[var(--color-accent)]">Interview</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-2">
          <Link
            to="/home"
            className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
              location.pathname === '/home' || location.pathname === '/'
                ? 'text-[var(--color-text)] bg-[var(--color-bg2)]'
                : 'text-[var(--color-text2)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg2)]'
            }`}
          >
            Learn
          </Link>
          <Link
            to="/mock"
            className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
              location.pathname === '/mock'
                ? 'text-[var(--color-text)] bg-[var(--color-bg2)]'
                : 'text-[var(--color-text2)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg2)]'
            }`}
          >
            Mock Interview
          </Link>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 ml-2 rounded-lg text-[var(--color-text2)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg2)] transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
