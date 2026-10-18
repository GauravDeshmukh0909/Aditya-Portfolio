import React, { useEffect } from "react";
import { DriveVideo } from "../types";
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Play,
  Sparkles,
} from "lucide-react";

interface VideoModalProps {
  video: DriveVideo | null;
  categoryTitle: string;
  isPortrait?: boolean;
  onClose: () => void;
  onPrevVideo?: () => void;
  onNextVideo?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  categoryTitle,
  isPortrait = false,
  onClose,
  onPrevVideo,
  onNextVideo,
  hasPrev = true,
  hasNext = true,
}) => {
  useEffect(() => {
    if (!video) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && onPrevVideo) {
        onPrevVideo();
      } else if (e.key === "ArrowRight" && onNextVideo) {
        onNextVideo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [video, onClose, onPrevVideo, onNextVideo]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/85 backdrop-blur-xl animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={onClose}
    >
      {/* Modal Dialog container with dynamic width and modern gradients */}
      <div
        className={`relative w-full overflow-hidden rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl transition-all duration-300 ${
          isPortrait ? "max-w-md" : "max-w-5xl"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle orange accent glow at top */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-40 w-80 rounded-full bg-orange-500/10 dark:bg-orange-500/20 blur-3xl"
          aria-hidden="true"
        />

        {/* Header Bar */}
        <div className="relative flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800/80 px-4 py-3 sm:px-6 bg-white/95 dark:bg-stone-900/90 backdrop-blur-md">
          <div className="flex items-center gap-2.5 overflow-hidden pr-3">
            <span className="rounded-full bg-orange-500/10 dark:bg-orange-500/20 px-2.5 py-0.5 text-xs font-semibold text-orange-700 dark:text-orange-400 shrink-0 border border-orange-500/20 dark:border-orange-500/30">
              {isPortrait ? "9:16 Reel" : "16:9"} • {categoryTitle}
            </span>
            <h3
              id="video-modal-title"
              className="text-sm sm:text-base font-bold text-stone-900 dark:text-white truncate"
            >
              {video.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={video.driveViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-100 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-200 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700 dark:hover:text-white transition-colors"
              title="Open full resolution in Google Drive"
            >
              <span>Drive</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <button
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-stone-200 bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              aria-label="Close video player modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Video Player Frame with rounded corners and adaptive aspect ratio */}
        <div
          className={`relative w-full bg-black ${isPortrait ? "aspect-[9/16] max-h-[72vh]" : "aspect-video"}`}
        >
          <iframe
            src={video.embedUrl}
            title={video.title}
            className="h-full w-full border-0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        {/* Modal Footer with Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-200/80 dark:border-stone-800/80 px-4 py-3 sm:px-6 text-xs text-stone-500 dark:text-stone-400 bg-white/95 dark:bg-stone-900/90">
          <div className="flex items-center gap-2 truncate">
            <span className="font-mono text-stone-500 dark:text-stone-400 truncate">
              {video.rawTitle}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onPrevVideo && (
              <button
                onClick={onPrevVideo}
                disabled={!hasPrev}
                className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-stone-100 px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-200 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 dark:hover:text-white disabled:opacity-40 transition-colors"
                aria-label="Previous video"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Prev (←)</span>
              </button>
            )}

            {onNextVideo && (
              <button
                onClick={onNextVideo}
                disabled={!hasNext}
                className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-stone-100 px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-200 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 dark:hover:text-white disabled:opacity-40 transition-colors"
                aria-label="Next video"
              >
                <span>Next (→)</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="inline-flex items-center gap-1 rounded-lg border border-stone-300 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 dark:hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
