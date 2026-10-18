import React from "react";
import { EditableSiteContent } from "../types";
import { getSoftwareImage } from "../utils/defaultContent";
import { FiverrLogo } from "./BrandLogos";
import {
  Youtube,
  ExternalLink,
  Sparkles,
  Check,
  Monitor,
  Cpu,
  Scissors,
  Sliders,
  Layers,
  Compass,
  ArrowUpRight,
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface AboutSectionProps {
  content: EditableSiteContent;
  onOpenEditModal?: () => void;
}

const SoftwareLogo: React.FC<{
  software: {
    name: string;
    role: string;
    color?: string;
    image?: string;
  };
}> = ({ software }) => {
  const [imageError, setImageError] = React.useState(false);
  const imageSrc = software.image || getSoftwareImage(software.name);

  if (!imageSrc || imageError) {
    return (
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-extrabold text-sm shadow-xs group-hover:scale-105 transition-transform duration-300 border border-stone-200/60 dark:border-stone-700/60"
        aria-label={`${software.name} logo`}
      >
        {software.name.substring(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-100 dark:bg-stone-800 p-1 group-hover:scale-105 transition-transform duration-300">
      <img
        src={imageSrc}
        alt={`${software.name} logo`}
        className="h-full w-full object-contain"
        loading="lazy"
        onError={() => setImageError(true)}
      />
    </div>
  );
};

export const AboutSection: React.FC<AboutSectionProps> = ({
  content,
  onOpenEditModal,
}) => {
  const { ref: headerRef, style: headerStyle } = useScrollReveal({
    threshold: 0.08,
    durationMs: 700,
    yOffsetPx: 24,
  });

  const { ref: bioGridRef, style: bioGridStyle } = useScrollReveal({
    threshold: 0.08,
    durationMs: 750,
    delayMs: 100,
    yOffsetPx: 28,
  });

  const { ref: softwareRef, style: softwareStyle } = useScrollReveal({
    threshold: 0.08,
    durationMs: 750,
    delayMs: 150,
    yOffsetPx: 28,
  });

  return (
    <section
      id="about"
      className="py-20 sm:py-28 border-t border-stone-200/80 dark:border-stone-800/80 scroll-mt-16 bg-stone-50/50 dark:bg-stone-900/20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div
          ref={headerRef as any}
          style={headerStyle}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-3">
              <span>Behind The Edits</span>
              <span className="text-orange-500" aria-hidden="true">
                /
              </span>
              <span>About</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white">
              Creative Vision &amp; Workflow
            </h2>
          </div>

          {onOpenEditModal && (
            <button
              onClick={onOpenEditModal}
              className="self-start md:self-end text-xs font-semibold text-stone-500 hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400 transition-colors"
            >
              Edit Studio Copy &rarr;
            </button>
          )}
        </div>

        {/* Bio + YouTube Channel Presentation Grid */}
        <div
          ref={bioGridRef as any}
          style={bioGridStyle}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20"
        >
          {/* Bio Column */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-stone-200/90 bg-white/90 p-8 sm:p-10 dark:border-stone-800 dark:bg-stone-900/90 shadow-sm backdrop-blur-md">
            <div>
              {/* Creator Profile Presentation */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6 pb-6 border-b border-stone-100 dark:border-stone-800/80">
                <div className="relative group shrink-0">
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-2xl ring-2 ring-orange-500/80 shadow-md transition-transform group-hover:scale-105 bg-stone-100 dark:bg-stone-800">
                    <img
                      src={content.profileImageUrl || "/profile.jpg"}
                      alt="Aditya - EnoughEditz Lead Editor"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span
                    className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white dark:ring-stone-900"
                    title="Available for projects"
                  >
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
                    Aditya Anil Khekade
                  </h3>
                  <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 tracking-wide mt-0.5">
                    &bull; Video Editor &amp; Motion Designer
                  </p>
                  {/* <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>
                      Open for commissions, contract edits &amp; channel
                      retainers
                    </span>
                  </p> */}

                  {/* Fiverr badge */}
                  {content.fiverrUrl && (
                    <div className="mt-3">
                      <a
                        href={content.fiverrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                      >
                        <span>Hire me on Fiverr</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <h4 className="text-base font-bold text-stone-900 dark:text-white mb-2.5">
                My Approach to Editing
              </h4>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm sm:text-base font-normal">
                {content.aboutBio}
              </p>
            </div>

            {/* <div className="mt-8 pt-8 border-t border-stone-100 dark:border-stone-800 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="block text-stone-400 uppercase tracking-wider text-[10px] font-bold">
                  Turnaround
                </span>
                <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm mt-0.5 block">
                  24–48 Hours
                </span>
              </div>
              <div>
                <span className="block text-stone-400 uppercase tracking-wider text-[10px] font-bold">
                  Resolution
                </span>
                <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm mt-0.5 block">
                  4K &amp; 1080p ProRes
                </span>
              </div>
              <div>
                <span className="block text-stone-400 uppercase tracking-wider text-[10px] font-bold">
                  Revisions
                </span>
                <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm mt-0.5 block">
                  Iterative Polish
                </span>
              </div>
            </div> */}
          </div>

          {/* YouTube Channel Spotlight */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-stone-200/90 bg-white/90 p-8 sm:p-10 text-stone-900 shadow-sm backdrop-blur-md dark:border-stone-800 dark:bg-gradient-to-br dark:from-stone-900 dark:via-stone-900 dark:to-black dark:text-white dark:shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 shadow-lg shadow-red-600/30">
                    <img src="./video.png" alt="youtube logo" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-lg text-stone-900 dark:text-white">
                      EnoughEditz
                    </h4>
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                      @EnoughEditz
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                Explore stunning motion graphics, cinematic edits, map
                animations, visual storytelling, and creative editing
                techniques. From smooth transitions to eye-catching animations,
                we turn ideas into engaging visuals.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-center">
              <a
                href={content.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex max-w-60 items-center justify-center rounded-full bg-stone-900 px-6 py-3.5 text-sm font-bold text-white hover:bg-stone-800 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-100 transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                <div className="flex items-center justify-center gap-2">
                  <img
                    src="./video.png"
                    alt=""
                    className="h-6 w-6 text-red-500 dark:text-red-600"
                  />
                  <span className="text-center">View Channel</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Software & Production Stack with Modern Gradient Badges */}
        <div ref={softwareRef as any} style={softwareStyle}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-2">
                <span>Production Stack</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
                Software &amp; Creative Tools
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.softwareList.map((software, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white/80 p-5 dark:border-stone-800/80 dark:bg-stone-900/60 shadow-xs hover:border-orange-500/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  {/* Software logo with fallback */}
                  <SoftwareLogo software={software} />
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-sm text-stone-900 dark:text-white truncate group-hover:text-orange-500 transition-colors">
                      {software.name}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">
                      {software.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
