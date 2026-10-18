import React from "react";
import { ActivePage } from "../types";
import { Youtube, FolderOpen, Mail, Sparkles, Settings } from "lucide-react";

interface FooterProps {
  brandName: string;
  contactEmail: string;
  youtubeUrl: string;
  driveFolderUrl: string;
  profileImageUrl?: string;
  setActivePage: (page: ActivePage) => void;
  onOpenDriveGuide: () => void;
  onOpenEditModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  brandName,
  contactEmail,
  youtubeUrl,
  driveFolderUrl,
  profileImageUrl = "/profile.jpg",
  setActivePage,
  onOpenDriveGuide,
  onOpenEditModal,
}) => {
  return (
    <footer className="border-t border-stone-200/80 bg-white dark:border-stone-800/80 dark:bg-stone-950 py-8 sm:py-12 text-sm text-stone-500 dark:text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5">
              <div className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-orange-500/80 shrink-0 shadow-xs">
                <img
                  src={profileImageUrl}
                  alt="EnoughEditz"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-heading font-bold text-stone-900 dark:text-white text-base">
                {brandName}
              </span>
            </div>
            <p className="mt-2 text-xs text-stone-500 dark:text-stone-400 max-w-sm">
              High-Retention Video Editing &bull; 3D Map Animations &bull;
              Explainer Breakdowns &bull; SaaS Motion
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-6 text-xs font-medium">
            <button
              onClick={() => {
                setActivePage("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="py-1 px-2 rounded-lg hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => {
                setActivePage("categories");
                const el = document.getElementById("categories");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="py-1 px-2 rounded-lg hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer"
            >
              Categories
            </button>
            <button
              onClick={() => {
                setActivePage("about");
                const el = document.getElementById("about");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="py-1 px-2 rounded-lg hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => {
                setActivePage("dm");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="py-1 px-2 rounded-lg hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer"
            >
              DM Inquiry
            </button>
            <button
              onClick={() => {
                setActivePage("contact");
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="py-1 px-2 rounded-lg hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Social & Admin Helpers */}
          <div className="flex items-center gap-3">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 dark:border-stone-800 hover:text-red-500 hover:border-red-300 transition-colors"
              title="YouTube Channel"
              aria-label="YouTube Channel"
            >
              <Youtube className="h-4 w-4" />
            </a>

            <a
              href={driveFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 dark:border-stone-800 hover:text-amber-500 hover:border-amber-300 transition-colors"
              title="Google Drive Library"
              aria-label="Google Drive Library"
            >
              <FolderOpen className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-stone-100 dark:border-stone-900 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-2 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          <p>
            Direct inquiries:{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="underline hover:text-orange-500 break-all"
            >
              {contactEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
