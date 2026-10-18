import React from "react";
import {
  ArrowRight,
  Play,
  Sparkles,
  FolderOpen,
  Mail,
  Film,
  Layers,
  Zap,
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface HeroProps {
  headline: string;
  subheadline: string;
  driveFolderUrl: string;
  onExploreWork: () => void;
  onContactMe: () => void;
  totalVideos: number;
  categoryCount: number;
  profileImageUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  headline,
  subheadline,
  driveFolderUrl,
  onExploreWork,
  onContactMe,
  totalVideos,
  categoryCount,
  profileImageUrl = "/profile.jpg",
}) => {
  const { ref: heroRef, style: heroStyle } = useScrollReveal({
    threshold: 0.05,
    durationMs: 750,
    yOffsetPx: 24,
  });

  const { ref: stripRef, style: stripStyle } = useScrollReveal({
    threshold: 0.1,
    durationMs: 700,
    delayMs: 150,
    yOffsetPx: 20,
  });

  return (
    <section className="relative overflow-hidden pt-12 pb-8 sm:pt-20 sm:pb-16">
      {/* Dynamic ambient gradient lighting */}
      <div
        className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-[640px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-orange-500/15 via-amber-400/10 to-transparent blur-3xl dark:from-orange-600/20 dark:via-amber-500/10 dark:to-transparent"
        aria-hidden="true"
      />

      <div
        ref={heroRef as any}
        style={heroStyle}
        className="mx-auto max-w-7xl px-6 lg:px-10"
      >
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Editor Profile Intro Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-stone-200/90 bg-white/90 p-1.5 pr-4 shadow-xs backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/90 mb-5 transition-transform hover:scale-[1.02]">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-orange-500/80 shadow-xs">
              <img
                src={profileImageUrl}
                alt="EnoughEditz Lead Editor"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-stone-900 dark:text-white">
                EnoughEditz
              </span>
              <span
                className="text-stone-300 dark:text-stone-600"
                aria-hidden="true"
              >
                •
              </span>
              <span className="text-stone-600 dark:text-stone-300 font-medium">
                Available for Selected Edits &amp; Retainers
              </span>
            </div>
          </div>

          {/* Primary Headline with Subtle Metallic-Orange Gradient Accent */}
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-stone-900 sm:text-6xl lg:text-7xl dark:text-white leading-[1.08] [text-wrap:balance]">
            Crafting{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              Visual Narratives
            </span>{" "}
            That Command Attention
          </h1>

          {/* Lead Prose */}
          <p className="mt-7 text-lg sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed font-normal max-w-2xl">
            {subheadline}
          </p>

          {/* High-Impact Actions with Modern Radiant Styling */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExploreWork}
              className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-orange-600/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <span>Categories</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onContactMe}
              className="inline-flex items-center gap-2.5 rounded-2xl border border-stone-200/90 bg-white/80 px-7 py-4 text-sm font-semibold text-stone-800 shadow-sm backdrop-blur-md hover:bg-stone-50 hover:border-orange-300 hover:text-stone-950 dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-200 dark:hover:bg-stone-800/90 dark:hover:border-stone-700 dark:hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <Mail className="h-4 w-4 text-orange-500" />
              <span>Direct Inquiry</span>
            </button>

            <a
              href={driveFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-stone-200/60 bg-stone-100/70 px-5 py-4 text-xs font-semibold text-stone-600 hover:bg-stone-200 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200 transition-colors"
              title="Open Google Drive Library"
            >
              <FolderOpen className="h-3.5 w-3.5 text-orange-500" />
              <span>Drive Library</span>
            </a>
          </div>

          {/* Studio Capabilities Strip with Modern Gradient Icons */}
          <div
            ref={stripRef as any}
            style={stripStyle}
            className="mt-16 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-stone-200/80 dark:border-stone-800/80 text-left"
          >
            {/* Capability 1 */}
            <div className="relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white/70 p-5 backdrop-blur-md dark:border-stone-800/80 dark:bg-stone-900/50 shadow-sm transition-all hover:border-orange-500/30">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-white">
                    3D Map Animation
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Geopolitical terrain flyovers &amp; route zooms
                  </p>
                </div>
              </div>
            </div>

            {/* Capability 2 */}
            <div className="relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white/70 p-5 backdrop-blur-md dark:border-stone-800/80 dark:bg-stone-900/50 shadow-sm transition-all hover:border-orange-500/30">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-white">
                    Explainer Video
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Kinetic typography &amp; narrative pacing
                  </p>
                </div>
              </div>
            </div>

            {/* Capability 3 */}
            <div className="relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white/70 p-5 backdrop-blur-md dark:border-stone-800/80 dark:bg-stone-900/50 shadow-sm transition-all hover:border-orange-500/30">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-600 to-rose-600 text-white shadow-md shadow-rose-600/20">
                  <Film className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-white">
                    SaaS &amp; UI Motion
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Conversion product walkthroughs &amp; teasers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
