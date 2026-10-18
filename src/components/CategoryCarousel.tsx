import React, { useState, useRef, useEffect, useCallback } from "react";
import { DriveCategoryWithVideos, DriveVideo } from "../types";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink,
  Film,
  FolderOpen,
} from "lucide-react";
import { getCategoryAspectRatio } from "../utils/driveParser";

interface CategoryCarouselProps {
  category: DriveCategoryWithVideos;
  customDescription?: string;
  activeVideoId?: string | null;
  onSelectVideo: (
    video: DriveVideo,
    categoryTitle: string,
    isPortrait: boolean,
  ) => void;
  onOpenDriveFolder: (url: string) => void;
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  category,
  customDescription,
  activeVideoId,
  onSelectVideo,
  onOpenDriveFolder,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const videos = category.videos || [];
  const total = videos.length;
  const description = customDescription || category.description;

  // Aspect ratio per user request:
  // Map animation & explainer videos -> portrait (9:16)
  // SaaS animation -> landscape (16:9)
  const isPortrait =
    getCategoryAspectRatio(category.title || category.name) === "portrait";

  // Check scroll position to toggle side button visibility / state
  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  // Scroll left and right handlers for side buttons
  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = isPortrait ? 290 : 410;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Keyboard navigation when carousel is focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scroll("right");
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scroll("left");
    }
  };

  return (
    <div
      className="relative rounded-3xl border border-stone-200/90 bg-gradient-to-b from-white via-stone-50/50 to-white p-6 sm:p-9 dark:border-stone-800/90 dark:from-stone-900/90 dark:via-stone-900/50 dark:to-stone-950/80 shadow-md transition-colors"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`${category.title} carousel`}
    >
      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-100 pb-6 dark:border-stone-800/80">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
              {category.title}
            </h3>

            {/* Unified Orange Palette for ALL category badges (No inconsistent indigo/blue) */}
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-orange-500/10 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400 border border-orange-500/20">
              <span>
                {total} {total === 1 ? " Project" : " Projects"}
              </span>
            </span>
          </div>

          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-3xl leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Drive folder link */}
        <div className="flex items-center gap-2 self-start sm:self-end">
          <a
            href={category.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 hover:border-orange-300 hover:text-orange-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-orange-500 dark:hover:text-orange-400 shadow-xs transition-colors"
            title={`Open ${category.title} folder in Google Drive`}
          >
            <FolderOpen className="h-3.5 w-3.5 text-orange-500" />
            <span>Open in Drive</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </div>
      </div>

      {/* Carousel Track Container */}
      {total === 0 ? (
        /* Empty State */
        <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 p-12 text-center dark:border-stone-800">
          <Film className="h-10 w-10 text-stone-400 mb-3" />
          <h4 className="text-base font-semibold text-stone-800 dark:text-stone-200">
            No videos in this folder yet
          </h4>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 max-w-md">
            Upload MP4 or MOV files into the &quot;{category.name}&quot; folder
            in Google Drive to display them automatically.
          </p>
          <a
            href={category.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-500 shadow-sm"
          >
            <FolderOpen className="h-4 w-4" />
            <span>Upload to Drive</span>
          </a>
        </div>
      ) : (
        <div className="relative mt-8 group/carousel">
          {/* FLOATING LEFT NAVIGATION BUTTON (stable position, no layout shift) */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/95 dark:bg-stone-900/95 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 shadow-xl backdrop-blur-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
              canScrollLeft
                ? "opacity-90 hover:opacity-100 hover:scale-105 hover:border-orange-500 hover:text-orange-500 active:scale-95 cursor-pointer"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label={`Scroll previous videos in ${category.title}`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* FLOATING RIGHT NAVIGATION BUTTON (stable position, no layout shift) */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/95 dark:bg-stone-900/95 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 shadow-xl backdrop-blur-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
              canScrollRight
                ? "opacity-90 hover:opacity-100 hover:scale-105 hover:border-orange-500 hover:text-orange-500 active:scale-95 cursor-pointer"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label={`Scroll next videos in ${category.title}`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Smooth Horizontal Scroll Track (stable dimensions, zero jitter) */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: "none" }}
          >
            {videos.map((video) => {
              const isActive = activeVideoId === video.id;

              return (
                <div
                  key={video.id}
                  className={`relative shrink-0 snap-center transition-colors duration-200 ${
                    isPortrait
                      ? "w-[230px] sm:w-[270px]"
                      : "w-[320px] sm:w-[390px]"
                  }`}
                >
                  {/* Card Container with Rounded Corners & STABLE hover state (no transform/translate) */}
                  <div
                    className={`relative flex flex-col h-full overflow-hidden rounded-3xl border bg-white p-2.5 shadow-xs dark:bg-stone-900 transition-all duration-200 ${
                      isActive
                        ? "border-orange-500 ring-2 ring-orange-500/30 shadow-md"
                        : "border-stone-200/90 dark:border-stone-800 hover:border-orange-400/80 dark:hover:border-orange-500/60 hover:shadow-md"
                    }`}
                  >
                    {/* Video Thumbnail Box with Rounded Corners & Correct Aspect Ratio */}
                    <div
                      className={`relative w-full overflow-hidden rounded-2xl bg-stone-950 shadow-inner group/thumb ${
                        isPortrait ? "aspect-[9/16]" : "aspect-video"
                      }`}
                    >
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            video.fallbackThumbUrl;
                        }}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                      />

                      {/* Film vignette overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover/thumb:opacity-75 transition-opacity" />

                      {/* Status badge: 'Now playing' if active, or clean format label */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        {isActive ? (
                          <span className="rounded-full bg-orange-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                            <span>Now playing</span>
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>

                      {/* Interactive Play Button with stable hover scaling */}
                      <button
                        onClick={() =>
                          onSelectVideo(video, category.title, isPortrait)
                        }
                        className="absolute inset-0 flex items-center justify-center focus:outline-none cursor-pointer"
                        aria-label={`Play ${video.title}`}
                      >
                        <div className="flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-xl shadow-orange-600/30 backdrop-blur-md transition-transform duration-200 hover:scale-110 active:scale-95">
                          <Play className="h-5.5 w-5.5 fill-white translate-x-0.5" />
                        </div>
                      </button>
                    </div>

                    {/* Metadata Card Footer */}
                    <div className="flex justify-between  p-1 pt-3">
                      <div>
                        <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm line-clamp-1 transition-colors">
                          {video.title}
                        </h4>
                      </div>
                      <div>
                        <a
                          href={video.driveViewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-stone-500 hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400 transition-colors"
                          title="Open original in Drive"
                        >
                          <span className="text-[12px]">Drive</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
