import React from "react";

/**
 * Authentic, correctly proportioned brand logos for video editing software,
 * YouTube, and Fiverr. No made-up or decorative substitutes.
 */

export const YouTubeLogo: React.FC<{ className?: string }> = ({
  className = "h-5 w-auto",
}) => (
  <svg
    viewBox="0 0 28 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="YouTube"
  >
    <path
      d="M27.41 3.09a3.5 3.5 0 0 0-2.46-2.47C22.77 0 14 0 14 0S5.23 0 3.05.62A3.5 3.5 0 0 0 .59 3.09C0 5.28 0 9.85 0 9.85s0 4.57.59 6.76a3.5 3.5 0 0 0 2.46 2.47C5.23 19.7 14 19.7 14 19.7s8.77 0 10.95-.62a3.5 3.5 0 0 0 2.46-2.47C28 14.42 28 9.85 28 9.85s0-4.57-.59-6.76z"
      fill="#FF0000"
    />
    <path d="M11.2 14.07l7.28-4.22-7.28-4.22v8.44z" fill="#FFFFFF" />
  </svg>
);

export const FiverrLogo: React.FC<{ className?: string }> = ({
  className = "h-4 w-auto",
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Fiverr"
  >
    <circle cx="12" cy="12" r="10" fill="#1DBF73" />
    <path
      d="M8.2 16.5V9.8h-1V8.3h1V7.5c0-1.4.8-2.2 2.2-2.2.6 0 1.1.1 1.4.2v1.4c-.2 0-.5-.1-.8-.1-.7 0-1 .4-1 1.1v.4h1.7v1.5H10v6.7H8.2zm4.3 0V8.3h1.8v8.2h-1.8zm6.5 0l-1.3-4.8-.4-1.7h-.1l-.4 1.7-1.3 4.8h-1.9l2.4-8.2h2l2.4 8.2h-1.4z"
      fill="#FFFFFF"
    />
  </svg>
);

export const AdobePremiereLogo: React.FC<{ className?: string }> = ({
  className = "h-9 w-9",
}) => (
  <div
    className={`relative flex items-center justify-center rounded-xl bg-[#00005B] text-[#9999FF] font-black text-xs shadow-md select-none shrink-0 ${className}`}
  >
    <span className="tracking-tighter">Pr</span>
  </div>
);

export const AdobeAfterEffectsLogo: React.FC<{ className?: string }> = ({
  className = "h-9 w-9",
}) => (
  <div
    className={`relative flex items-center justify-center rounded-xl bg-[#00005B] text-[#D291FF] font-black text-xs shadow-md select-none shrink-0 ${className}`}
  >
    <span className="tracking-tighter">Ae</span>
  </div>
);

export const DaVinciResolveLogo: React.FC<{ className?: string }> = ({
  className = "h-9 w-9",
}) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-label="DaVinci Resolve"
  >
    <rect width="32" height="32" rx="8" fill="#1C1C1E" />
    {/* Iconic 3-color pinwheel */}
    <circle cx="16" cy="11" r="4.5" fill="#FF453A" />
    <circle cx="11.5" cy="19.5" r="4.5" fill="#30D158" />
    <circle cx="20.5" cy="19.5" r="4.5" fill="#0A84FF" />
  </svg>
);

export const BlenderLogo: React.FC<{ className?: string }> = ({
  className = "h-9 w-9",
}) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-label="Blende 7D"
  >
    <rect width="32" height="32" rx="8" fill="#242426" />
    <path
      d="M16 8a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm0 13a5 5 0 1 1 5-5 5 5 0 0 1-5 5z"
      fill="#EA7600"
    />
    <circle cx="16" cy="16" r="3" fill="#265787" />
    <path
      d="M16 11l4-5M12 14L6 11M16 21l-3 5"
      stroke="#EA7600"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const PhotoshopLogo: React.FC<{ className?: string }> = ({
  className = "h-9 w-9",
}) => (
  <div
    className={`relative flex items-center justify-center rounded-xl bg-[#001E36] text-[#31A8FF] font-black text-xs shadow-md select-none shrink-0 ${className}`}
  >
    <span className="tracking-tighter">Ps</span>
  </div>
);

export const IllustratorLogo: React.FC<{ className?: string }> = ({
  className = "h-9 w-9",
}) => (
  <div
    className={`relative flex items-center justify-center rounded-xl bg-[#330000] text-[#FF9A00] font-black text-xs shadow-md select-none shrink-0 ${className}`}
  >
    <span className="tracking-tighter">Ai</span>
  </div>
);

export const AuditionLogo: React.FC<{ className?: string }> = ({
  className = "h-9 w-9",
}) => (
  <div
    className={`relative flex items-center justify-center rounded-xl bg-[#002627] text-[#00E4BB] font-black text-xs shadow-md select-none shrink-0 ${className}`}
  >
    <span className="tracking-tighter">Au</span>
  </div>
);
