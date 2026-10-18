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
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-100 dark:bg-stone-800 group-hover:scale-105 transition-transform duration-300">
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
      className="py-12 sm:py-20 lg:py-28 border-t border-stone-200/80 dark:border-stone-800/80 scroll-mt-16 bg-stone-50/50 dark:bg-stone-900/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div
          ref={headerRef as any}
          style={headerStyle}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-16"
        >
          <div>
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white">
              Creative Vision &amp; Workflow
            </h2>
          </div>
        </div>

        {/* Bio + YouTube Channel Presentation Grid */}
        <div
          ref={bioGridRef as any}
          style={bioGridStyle}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-12 sm:mb-20"
        >
          {/* Bio Column */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-stone-200/90 bg-white/90 p-5 sm:p-8 md:p-10 dark:border-stone-800 dark:bg-stone-900/90 shadow-sm backdrop-blur-md">
            <div>
              {/* Creator Profile Presentation */}
              <div className="flex flex-row items-center gap-4 sm:gap-5 mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-stone-100 dark:border-stone-800/80">
                <div className="relative group shrink-0">
                  <div className="relative h-16 w-16 sm:h-22 sm:w-22 overflow-hidden rounded-2xl ring-2 ring-orange-500/80 shadow-md transition-transform group-hover:scale-105 bg-stone-100 dark:bg-stone-800">
                    <img
                      src={content.profileImageUrl || "/profile.jpg"}
                      alt="Aditya - EnoughEditz Lead Editor"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span
                    className="absolute -bottom-1 -right-1 flex h-4.5 w-4.5 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white dark:ring-stone-900"
                    title="Available for projects"
                  >
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  </span>
                </div>

                <div className="overflow-hidden">
                  <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-white truncate">
                    Aditya Anil Khekade
                  </h3>
                  <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 tracking-wide mt-0.5">
                    &bull; Video Editor &amp; Motion Designer
                  </p>

                  {/* Fiverr badge */}
                  {content.fiverrUrl && (
                    <div className="mt-2 sm:mt-3">
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

              <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white mb-2 sm:mb-2.5">
                My Approach to Editing
              </h4>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm sm:text-base font-normal">
                {content.aboutBio}
              </p>
            </div>
          </div>

          {/* YouTube Channel Spotlight */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-stone-200/90 bg-white/90 p-5 sm:p-8 md:p-10 text-stone-900 shadow-sm backdrop-blur-md dark:border-stone-800 dark:bg-gradient-to-br dark:from-stone-900 dark:via-stone-900 dark:to-black dark:text-white dark:shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="flex items-center gap-3 sm:gap-3.5">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 shadow-lg shadow-red-600/30 p-2.5">
                    <img
                      src="/video.png"
                      alt="YouTube logo"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-white">
                      EnoughEditz
                    </h4>
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                      @EnoughEditz
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                Explore stunning motion graphics, cinematic edits, map
                animations, visual storytelling, and creative editing
                techniques. From smooth transitions to eye-catching animations,
                we turn ideas into engaging visuals.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-center">
              <a
                href={content.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl border border-stone-200 bg-white px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-stone-700 hover:border-orange-300 hover:text-orange-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-orange-500 dark:hover:text-orange-400 shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                <img
                  src="/video.png"
                  alt=""
                  className="h-5 w-5 sm:h-6 sm:w-6"
                />
                <span>View YouTube Channel</span>
              </a>
            </div>
          </div>
        </div>

        {/* Software & Production Stack with Modern Gradient Badges */}
        <div ref={softwareRef as any} style={softwareStyle}>
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-1.5 sm:mb-2">
                <span>Production Stack</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
                Software &amp; Creative Tools
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {content.softwareList.map((software, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white/80 p-4 sm:p-5 dark:border-stone-800/80 dark:bg-stone-900/60 shadow-xs hover:border-orange-500/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  {/* Software logo with fallback */}
                  <SoftwareLogo software={software} />
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-white truncate group-hover:text-orange-500 transition-colors">
                      {software.name}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">
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
