import { Link, useLocation } from 'react-router-dom';
import { SunIcon, MoonIcon, Bars2Icon, XMarkIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { FireIcon as FireIconSolid } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useProgress } from '../../hooks/useProgress';

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data } = useProgress();

  const currentStreak = data.streak?.current || 0;

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

  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setMobileMenuOpen(false);
  }

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isActive = (path: string) => location.pathname === path || (path === '/home' && location.pathname === '/');

  return (
    <nav className="w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-1.5 group">
          <div className="w-7 h-7 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
            <span className="text-white font-heading font-extrabold text-xs">CI</span>
          </div>
          <span className="font-heading font-bold text-[15px] tracking-tight">
            <span className="text-[var(--color-text)] font-extrabold">Core</span>
            <span className="text-[var(--color-accent)]">Interview</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden sm:flex items-center gap-2">
          <Link to="/home"
            className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
              isActive('/home') ? 'text-[var(--color-text)] bg-[var(--color-bg2)]' : 'text-[var(--color-text2)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg2)]'
            }`}>
            Learn
          </Link>
          <Link to="/mock"
            className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
              isActive('/mock') ? 'text-[var(--color-text)] bg-[var(--color-bg2)]' : 'text-[var(--color-text2)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg2)]'
            }`}>
            Mock Interview
          </Link>

          {/* Streak Indicator */}
          {currentStreak > 0 && (
            <div className="flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500" title={`${currentStreak} Day Streak!`}>
              <FireIconSolid className="w-4 h-4" />
              <span className="text-xs font-bold">{currentStreak}</span>
            </div>
          )}

          {/* Search Button */}
          <button 
            onClick={() => window.dispatchEvent(new Event('open-global-search'))}
            className="flex items-center gap-2 ml-2 px-3 py-1.5 rounded-lg text-[13px] text-[var(--color-text2)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg2)] transition-colors border border-[var(--color-border)] bg-[var(--color-bg)]"
          >
            <MagnifyingGlassIcon className="w-4 h-4" />
            <span>Search...</span>
            <kbd className="hidden lg:inline-block ml-1 font-mono text-[10px] font-bold bg-[var(--color-bg2)] px-1.5 py-0.5 rounded border border-[var(--color-border)]">
              ⌘K
            </kbd>
          </button>

          <button onClick={toggleTheme}
            className="p-1.5 ml-2 rounded-lg text-[var(--color-text2)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg2)] transition-colors cursor-pointer"
            aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>

          <Link to="/profile"
            className={`p-1.5 ml-1 rounded-lg transition-colors ${
              isActive('/profile') ? 'text-[var(--color-text)] bg-[var(--color-bg2)]' : 'text-[var(--color-text2)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg2)]'
            }`}
            aria-label="Profile">
            <UserCircleIcon className="w-5 h-5" />
          </Link>
        </div>

        {/* Mobile: search + theme + hamburger */}
        <div className="flex sm:hidden items-center gap-1">
          {currentStreak > 0 && (
            <div className="flex items-center gap-1 mr-1 px-2 py-1 rounded-full bg-orange-500/10 text-orange-500" title={`${currentStreak} Day Streak!`}>
              <FireIconSolid className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">{currentStreak}</span>
            </div>
          )}
          <button 
            onClick={() => window.dispatchEvent(new Event('open-global-search'))}
            className="p-2 rounded-lg text-[var(--color-text2)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
          <button onClick={toggleTheme}
            className="p-2 rounded-lg text-[var(--color-text2)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
            aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[var(--color-text2)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
            aria-label="Menu">
            {mobileMenuOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars2Icon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-3 space-y-1">
          <Link to="/home"
            className={`block px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${
              isActive('/home') ? 'text-[var(--color-text)] bg-[var(--color-bg2)]' : 'text-[var(--color-text2)]'
            }`}>
            Learn
          </Link>
          <Link to="/mock"
            className={`block px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${
              isActive('/mock') ? 'text-[var(--color-text)] bg-[var(--color-bg2)]' : 'text-[var(--color-text2)]'
            }`}>
            Mock Interview
          </Link>
          <Link to="/profile"
            className={`block px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors flex items-center gap-2 ${
              isActive('/profile') ? 'text-[var(--color-text)] bg-[var(--color-bg2)]' : 'text-[var(--color-text2)]'
            }`}>
            <UserCircleIcon className="w-5 h-5" />
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
}
