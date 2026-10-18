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
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-8 px-6 lg:px-10">
        {/* Zone 1: Brand Wordmark with User's Uploaded Profile Avatar */}
        <button
          onClick={() => handleNavClick("home")}
          className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-xl whitespace-nowrap shrink-0 p-1"
          aria-label="EnoughEditz Homepage"
        >
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-2 ring-orange-500/80 p-0.5 bg-white dark:bg-stone-900 shadow-sm transition-transform group-hover:scale-105">
            <img
              src={profileImageUrl}
              alt="EnoughEditz Profile"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-heading font-extrabold tracking-tight text-xl text-stone-900 dark:text-white transition-colors group-hover:text-orange-500">
              EnoughEditz
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
          </div>
        </button>

        {/* Zone 2: Navigation Links (Pure typography, no pill enclosures) */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium"
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

        {/* Zone 3: Apple-Style Sliding Theme Toggle + Primary Action */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Apple-inspired Sliding Theme Toggle with movable thumb and sun/moon icons */}
          <ThemeToggle theme={theme} onToggle={toggleTheme} />

          {/* Primary Action Button (Modern Gradient CTA) */}
          <button
            onClick={() => handleNavClick("dm")}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:shadow-orange-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 bg-stone-50 text-stone-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
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
        <div className="md:hidden border-b border-stone-200 bg-white/95 px-6 py-6 dark:border-stone-800 dark:bg-stone-950/95 backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between py-2 text-left text-base font-semibold transition-colors ${
                  activePage === item.id
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-stone-700 dark:text-stone-300"
                }`}
              >
                <span>{item.label}</span>
                <ArrowUpRight className="h-4 w-4 opacity-40" />
              </button>
            ))}

            <div className="pt-4 mt-2 border-t border-stone-100 dark:border-stone-900 flex flex-col gap-3">
              <button
                onClick={() => handleNavClick("dm")}
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-sm shadow-md shadow-orange-500/20"
              >
                Start a Project
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
