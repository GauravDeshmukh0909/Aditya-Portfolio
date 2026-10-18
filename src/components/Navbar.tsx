import React, { useState } from "react";
import { ActivePage, ThemeMode } from "../types";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  isSyncing: boolean;
  onSyncDrive: () => void;
  driveFolderUrl: string;
  youtubeUrl: string;
  profileImageUrl: string;
  onOpenDriveGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  theme,
  toggleTheme,
  isSyncing,
  onSyncDrive,
  driveFolderUrl,
  youtubeUrl,
  profileImageUrl,
  onOpenDriveGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: Array<{ id: ActivePage; label: string }> = [
    { id: "home", label: "Home" },
    { id: "categories", label: "Categories" },
    { id: "about", label: "About" },
    { id: "dm", label: "Direct Inquiry" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);

    if (page === "dm") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(page);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/80 bg-white/85 dark:border-stone-800/80 dark:bg-stone-950/85 backdrop-blur-xl transition-colors duration-200">
      {/* 3-Zone Top Bar */}
      <div className="mx-auto flex h-16 sm:h-18 max-w-7xl items-center justify-between gap-2 sm:gap-4 md:gap-8 px-4 sm:px-6 lg:px-10">
        {/* Zone 1: Brand Wordmark with User's Uploaded Profile Avatar */}
        <button
          onClick={() => handleNavClick("home")}
          className="group flex items-center gap-2 sm:gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-xl whitespace-nowrap shrink-0 p-1"
          aria-label="EnoughEditz Homepage"
        >
          <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full ring-2 ring-orange-500/80 p-0.5 bg-white dark:bg-stone-900 shadow-sm transition-transform group-hover:scale-105">
            <img
              src={profileImageUrl}
              alt="EnoughEditz Profile"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="font-heading font-extrabold tracking-tight text-lg sm:text-xl text-stone-900 dark:text-white transition-colors group-hover:text-orange-500">
              EnoughEditz
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop typography) */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium"
          aria-label="Primary Navigation"
        >
          {navLinks.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer ${
                  isActive
                    ? "text-stone-900 font-semibold dark:text-white"
                    : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Sliding Theme Toggle + Primary Action + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
          {/* Sliding Theme Toggle with sun/moon icons */}
          <ThemeToggle theme={theme} onToggle={toggleTheme} />

          {/* Primary Action Button (Desktop & Tablet) */}
          <button
            onClick={() => handleNavClick("dm")}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:shadow-orange-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-stone-50 text-stone-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200/90 bg-white/95 px-4 sm:px-6 py-5 dark:border-stone-800/90 dark:bg-stone-950/95 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            {navLinks.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex min-h-[44px] items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400"
                      : "text-stone-700 hover:bg-stone-100/80 dark:text-stone-300 dark:hover:bg-stone-900/80"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className={`h-4 w-4 ${isActive ? "opacity-100 text-orange-500" : "opacity-40"}`} />
                </button>
              );
            })}

            <div className="pt-3 mt-2 border-t border-stone-200/80 dark:border-stone-800/80 flex flex-col gap-3">
              <button
                onClick={() => handleNavClick("dm")}
                className="w-full text-center py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white font-bold text-sm shadow-md shadow-orange-500/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
