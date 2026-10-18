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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-stone-950/85 backdrop-blur-xl animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={onClose}
    >
      {/* Modal Dialog container with dynamic width and modern gradients */}
      <div
        className={`relative w-full max-w-[calc(100vw-1rem)] overflow-hidden rounded-2xl sm:rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl transition-all duration-300 ${
          isPortrait ? "sm:max-w-md" : "sm:max-w-5xl"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle orange accent glow at top */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-40 w-80 rounded-full bg-orange-500/10 dark:bg-orange-500/20 blur-3xl"
          aria-hidden="true"
        />

        {/* Header Bar */}
        <div className="relative flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800/80 px-3.5 py-2.5 sm:px-6 sm:py-3.5 bg-white/95 dark:bg-stone-900/90 backdrop-blur-md">
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-hidden pr-2">
            <h3
              id="video-modal-title"
              className="text-xs sm:text-base font-bold text-stone-900 dark:text-white truncate"
            >
              {video.title}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {hasPrev && onPrevVideo && (
              <button
                onClick={onPrevVideo}
                className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-stone-200 bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 transition-colors cursor-pointer"
                aria-label="Previous video"
                title="Previous video"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}

            {hasNext && onNextVideo && (
              <button
                onClick={onNextVideo}
                className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-stone-200 bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 transition-colors cursor-pointer"
                aria-label="Next video"
                title="Next video"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-stone-200 bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer"
              aria-label="Close video player modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Video Player Frame with rounded corners and adaptive aspect ratio */}
        <div
          className={`relative w-full bg-black ${isPortrait ? "aspect-[9/16] max-h-[70vh]" : "aspect-video max-h-[70vh]"}`}
        >
          <iframe
            src={video.embedUrl}
            title={video.title}
            className="h-full w-full border-0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
