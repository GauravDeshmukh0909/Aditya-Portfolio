import React from 'react';
import { ThemeMode } from '../types';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: ThemeMode;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      onClick={onToggle}
      className="group relative inline-flex h-8 w-15 shrink-0 cursor-pointer items-center rounded-full border border-stone-300/80 bg-stone-200/90 p-0.5 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:border-stone-700/80 dark:bg-stone-800/90 dark:focus-visible:ring-offset-stone-950"
    >
      {/* Background Icons */}
      <span className="absolute left-1.5 flex h-4 w-4 items-center justify-center text-amber-500 transition-opacity duration-200">
        <Sun className="h-3.5 w-3.5" />
      </span>
      <span className="absolute right-1.5 flex h-4 w-4 items-center justify-center text-stone-400 transition-opacity duration-200">
        <Moon className="h-3.5 w-3.5" />
      </span>

      {/* Movable Sliding Thumb */}
      <span
        className={`pointer-events-none relative flex h-6.5 w-6.5 transform items-center justify-center rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-out dark:bg-stone-900 ${
          isDark ? 'translate-x-7 text-amber-400' : 'translate-x-0 text-amber-500'
        }`}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5" />
        ) : (
          <Sun className="h-3.5 w-3.5" />
        )}
      </span>
    </button>
  );
};
