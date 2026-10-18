import React, { useState } from "react";
import { DriveCategoryWithVideos, DriveVideo } from "../types";
import { CategoryCarousel } from "./CategoryCarousel";
import {
  RefreshCw,
  FolderOpen,
  Layers,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { RevealOnScroll } from "./RevealOnScroll";

interface CategoriesSectionProps {
  categories: DriveCategoryWithVideos[];
  isLoading: boolean;
  error?: string | null;
  isSyncing: boolean;
  onSyncDrive: () => void;
  syncedAt?: string | null;
  driveFolderUrl: string;
  categoryDescriptions?: Record<string, string>;
  activeVideoId?: string | null;
  onSelectVideo: (
    video: DriveVideo,
    categoryTitle: string,
    isPortrait: boolean,
  ) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  isLoading,
  error,
  isSyncing,
  onSyncDrive,
  syncedAt,
  driveFolderUrl,
  categoryDescriptions = {},
  activeVideoId,
  onSelectVideo,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const { ref: headerRef, style: headerStyle } = useScrollReveal({
    threshold: 0.08,
    durationMs: 700,
    yOffsetPx: 28,
  });

  const filteredCategories =
    selectedFilter === "all"
      ? categories
      : categories.filter(
          (c) =>
            c.id === selectedFilter ||
            c.title.toLowerCase() === selectedFilter.toLowerCase(),
        );

  const formattedSyncedTime = syncedAt
    ? new Date(syncedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <section
      id="categories"
      className="py-20 sm:py-28 max-w-7xl mx-auto px-6 lg:px-10 scroll-mt-16"
    >
      {/* Section Header */}
      <div
        ref={headerRef as any}
        style={headerStyle}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-3">
            <span>Portfolio Archive</span>
            <span className="text-orange-500" aria-hidden="true">
              /
            </span>
            <span>Dynamic Drive Folders</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Categories
          </h2>
          <p className="mt-3 text-base text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
            Explore different styles of editing, from motion graphics to
            detailed visual storytelling
          </p>
        </div>

        {/* Sync Status & Action Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={driveFolderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 hover:border-orange-300 hover:text-orange-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-orange-500 dark:hover:text-orange-400 shadow-xs transition-colors"
          >
            <FolderOpen className="h-3.5 w-3.5 text-orange-500" />
            <span>Drive Folder</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
        </div>
      </div>

      {/* Segmented Filter Control */}
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 mb-10 rounded-2xl bg-stone-100/90 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 max-w-fit">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
              selectedFilter === "all"
                ? "bg-white text-stone-900 shadow-sm dark:bg-stone-800 dark:text-white"
                : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
            }`}
          >
            All Disciplines ({categories.length})
          </button>

          {categories.map((cat) => {
            const isCurrent = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                  isCurrent
                    ? "bg-white text-stone-900 shadow-sm dark:bg-stone-800 dark:text-white"
                    : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                }`}
              >
                {cat.title} ({cat.videos.length})
              </button>
            );
          })}
        </div>
      )}

      {/* Error Notice if any */}
      {error && (
        <div className="mb-10 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200 flex items-center gap-3.5">
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
          <div>
            <p className="font-bold">Google Drive Sync Notice</p>
            <p className="text-xs mt-0.5">
              {error}. Serving cached master edits seamlessly.
            </p>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && categories.length === 0 ? (
        <div className="space-y-10 animate-pulse">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-96 rounded-3xl bg-stone-200/70 dark:bg-stone-800/50"
            />
          ))}
        </div>
      ) : (
        /* Category Carousels List */
        <div className="space-y-16">
          {filteredCategories.map((category) => (
            <RevealOnScroll
              key={category.id}
              threshold={0.06}
              durationMs={750}
              yOffsetPx={28}
            >
              <CategoryCarousel
                category={category}
                customDescription={categoryDescriptions[category.title]}
                onSelectVideo={onSelectVideo}
                onOpenDriveFolder={(url) => window.open(url, "_blank")}
              />
            </RevealOnScroll>
          ))}

          {filteredCategories.length === 0 && (
            <div className="rounded-3xl border border-dashed border-stone-300 p-16 text-center dark:border-stone-800">
              <FolderOpen className="h-12 w-12 text-stone-400 mx-auto mb-3" />
              <p className="text-stone-600 dark:text-stone-400 font-semibold">
                No categories found matching this filter.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
