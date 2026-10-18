import { EditableSiteContent } from "../types";

const env =
  typeof import.meta !== "undefined" && (import.meta as any).env
    ? (import.meta as any).env
    : {};
const envDriveId =
  env.VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID || "1SG65fVDS0ZnfQxnsQyjuKBnm8rpQMASY";

export const INITIAL_SITE_CONTENT: EditableSiteContent = {
  brandName: env.VITE_BRAND_NAME || "EnoughEditz",
  tagline: "High-Retention Video Editing & Motion Graphics",
  headline: "Crafting Visual Stories That Captivate & Convert",
  subheadline:
    "Specialized in dynamic 3D map animations, high-impact explainer breakdowns, and slick SaaS product motion graphics that elevate creator channels and digital brands.",
  aboutBio:
    "Hey, I'm Aditya, the creator and lead editor behind EnoughEditz. I specialize in turning complex ideas, data, and stories into captivating video assets. Whether it is geopolitical map flyovers, retention-focused video essays, or crisp SaaS walk-throughs, every project is engineered with surgical pacing, bespoke sound design, and broadcast-ready polish.",
  services: [
    {
      title: "Dynamic Map Animations",
      description:
        "Geopolitical territory zooms, custom 3D terrain flyovers, military/historic movement paths, and stylized route tracking optimized for documentaries and high-retention video essays.",
      badge: "Signature Craft",
    },
    {
      title: "Explainer & Video Essays",
      description:
        "Kinetic typography, visual analogies, vector iconography, and engaging narrative pacing that keeps audiences glued from the hook to the final CTA.",
      badge: "High Retention",
    },
    {
      title: "SaaS & UI Product Motion",
      description:
        "Sleek interface animations, feature walkthroughs, micro-interactions, and conversion-focused product teasers designed for software launches and marketing funnels.",
      badge: "Conversion Focused",
    },
    {
      title: "Sound Design & Color Finishing",
      description:
        "Multi-layer foley, punchy whooshes, atmospheric soundscapes, crisp dialogue levelling, and cinematic LUT color grading that elevates production value to studio quality.",
      badge: "Full Polish",
    },
  ],
  softwareList: [
    {
      name: "Adobe Premiere Pro",
      role: "Video Editing & Storytelling",
      color: "from-purple-500 to-indigo-600",
      image: "/premiere pro.png",
    },
    {
      name: "Adobe After Effects",
      role: "Motion Graphics & Visual Effects",
      color: "from-indigo-500 to-blue-600",
      image: "/after effects.png",
    },
    {
      name: "DaVinci Resolve",
      role: "Color Grading & Finishing",
      color: "from-rose-500 to-pink-600",
      image: "/davinchi resolve.png",
    },
    {
      name: "Photoshop",
      role: "Visual Design & Asset Creation",
      color: "from-blue-500 to-cyan-600",
      image: "/photoshop.png",
    },
  ],
  contactEmail: env.VITE_CONTACT_EMAIL || "adityaanilkhekade@gmail.com",
  youtubeUrl: env.VITE_YOUTUBE_URL || "https://www.youtube.com/@EnoughEditz",
  fiverrUrl: env.VITE_FIVERR_URL || "https://www.fiverr.com",
  driveFolderUrl:
    env.VITE_GOOGLE_DRIVE_ROOT_FOLDER_URL ||
    `https://drive.google.com/drive/folders/${envDriveId}`,
  profileImageUrl: "/profile.jpg",
  categoryDescriptions: {},
};

export const SOFTWARE_IMAGE_MAP: Record<string, string> = {
  "adobe premiere pro": "/premiere pro.png",
  "premiere pro": "/premiere pro.png",
  premiere: "/premiere pro.png",
  "adobe after effects": "/after effects.png",
  "after effects": "/after effects.png",
  ae: "/after effects.png",
  "davinci resolve": "/davinchi resolve.png",
  "davinchi resolve": "/davinchi resolve.png",
  davinci: "/davinchi resolve.png",
  resolve: "/davinchi resolve.png",
  photoshop: "/photoshop.png",
  "adobe photoshop": "/photoshop.png",
  ps: "/photoshop.png",
};

export function getSoftwareImage(
  name: string,
  explicitImage?: string,
): string | undefined {
  if (explicitImage && explicitImage.trim().length > 0) {
    return explicitImage;
  }
  const clean = (name || "").trim().toLowerCase();
  if (SOFTWARE_IMAGE_MAP[clean]) {
    return SOFTWARE_IMAGE_MAP[clean];
  }
  for (const [key, path] of Object.entries(SOFTWARE_IMAGE_MAP)) {
    if (clean.includes(key) || key.includes(clean)) {
      return path;
    }
  }
  return undefined;
}

export const LOCAL_STORAGE_CONTENT_KEY = "enougheditz_site_content";

export function loadSavedSiteContent(): EditableSiteContent {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CONTENT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const merged: EditableSiteContent = {
        ...INITIAL_SITE_CONTENT,
        ...parsed,
      };
      if (Array.isArray(merged.softwareList)) {
        merged.softwareList = merged.softwareList.map((item) => ({
          ...item,
          image: item.image || getSoftwareImage(item.name),
        }));
      }
      return merged;
    }
  } catch (e) {
    console.warn("Could not read saved site content from localStorage:", e);
  }
  return INITIAL_SITE_CONTENT;
}

export function saveSiteContent(content: EditableSiteContent): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_CONTENT_KEY, JSON.stringify(content));
  } catch (e) {
    console.error("Failed to save site content to localStorage:", e);
  }
}
