import React, { useState } from "react";
import {
  Mail,
  Youtube,
  ExternalLink,
  Copy,
  Check,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface ContactSectionProps {
  contactEmail: string;
  youtubeUrl: string;
  driveFolderUrl: string;
  fiverrUrl?: string;
  profileImageUrl?: string;
  onNavigateToDM: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactEmail,
  youtubeUrl,
  driveFolderUrl,
  fiverrUrl,
  profileImageUrl = "/profile.jpg",
  onNavigateToDM,
}) => {
  const [copied, setCopied] = useState(false);

  const { ref: cardRef, style: cardStyle } = useScrollReveal({
    threshold: 0.1,
    durationMs: 750,
    yOffsetPx: 32,
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.warn("Copy failed:", e);
    }
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 max-w-7xl mx-auto px-6 lg:px-10 scroll-mt-10"
    >
      <div
        ref={cardRef as any}
        style={cardStyle}
        className="relative overflow-hidden rounded-3xl border border-stone-200/90 bg-white/90 p-8 sm:p-16 text-stone-900 shadow-xl backdrop-blur-md dark:border-stone-800 dark:bg-gradient-to-br dark:from-stone-900 dark:via-stone-950 dark:to-black dark:text-white dark:shadow-2xl"
      >
        {/* Subtle orange accent glow in background */}
        <div
          className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-orange-500/10 dark:bg-orange-600/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="max-w-3xl">
          {/* Creator Profile Presence */}
          <div className="flex items-center gap-3.5 mb-6">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-orange-500/80 shadow-md">
              <img
                src={profileImageUrl}
                alt="EnoughEditz Profile"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-stone-900" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                Aditya Anil Khekade &bull; EnoughEditz
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Lead Video Editor &bull; Available for retainers &amp;
                individual projects
              </p>
            </div>
          </div>

          {/* Clean editorial kicker (Zero-pill discipline) */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-4">
            <span>Project Collaboration</span>
            <span className="text-orange-500" aria-hidden="true">
              /
            </span>
            <span>Channel Retainers</span>
            <span className="text-orange-500" aria-hidden="true">
              /
            </span>
            <span>Video Essays</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-tight">
            Ready to elevate your visual storytelling?
          </h2>

          <p className="mt-5 text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
            Whether you need a high-retention map animation for your upcoming
            documentary, a sleek SaaS feature demo, or a complete channel
            editing overhaul, reach out directly.
          </p>

          {/* Prominent Action Bar with modern gradients */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${contactEmail}`}
              className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-orange-600/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <Mail className="h-4 w-4" />
              <span>Email me directly</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            <button
              onClick={onNavigateToDM}
              className="inline-flex items-center gap-2.5 rounded-2xl border border-stone-300 bg-stone-100/90 px-7 py-4 text-sm font-semibold text-stone-800 hover:bg-stone-200/90 hover:border-stone-400 active:scale-[0.98] dark:border-stone-700 dark:bg-stone-800/80 dark:text-white dark:hover:bg-stone-700/90 dark:hover:border-stone-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <MessageSquare className="h-4 w-4 text-orange-500 dark:text-orange-400" />
              <span>Open DM Inquiry Form</span>
            </button>
          </div>

          {/* Email Clickable & Copy Row */}
          <div className="mt-10 flex flex-wrap items-center gap-3 pt-8 border-t border-stone-200/80 dark:border-stone-800/90 text-sm">
            <span className="text-stone-500 dark:text-stone-400">
              Direct Inquiries:
            </span>
            <div className="inline-flex items-center gap-2.5 rounded-xl bg-stone-100/90 px-4 py-2 border border-stone-200 dark:bg-stone-800/80 dark:border-stone-700">
              <a
                href={`mailto:${contactEmail}`}
                className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 hover:underline"
              >
                {contactEmail}
              </a>
              <button
                onClick={handleCopy}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-white p-1 rounded-md transition-colors"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            {copied && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                Email address copied!
              </span>
            )}
          </div>

          {/* Links to YouTube and Google Drive */}
          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-stone-500 dark:text-stone-400">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              <Youtube className="h-4 w-4 text-red-500" />
              <span>YouTube: @EnoughEditz</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
            </a>

            <span
              className="text-stone-300 dark:text-stone-700"
              aria-hidden="true"
            >
              •
            </span>

            <a
              href={driveFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              <span>Google Drive Video Library</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>

            {fiverrUrl && (
              <>
                <span
                  className="text-stone-300 dark:text-stone-700"
                  aria-hidden="true"
                >
                  •
                </span>
                <a
                  href={fiverrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                >
                  <span>Hire me on Fiverr</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
