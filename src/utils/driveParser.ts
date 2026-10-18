/**
 * Pure utility functions for parsing Google Drive embedded folder views,
 * sanitizing titles, generating mailto links, and carousel navigation math.
 */

export interface DriveFolder {
  id: string;
  name: string;
  title: string;
  description: string;
  driveUrl: string;
  lastModified?: string;
}

export interface DriveVideo {
  id: string;
  rawTitle: string;
  title: string;
  driveViewUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  fallbackThumbUrl: string;
  lastModified?: string;
  durationEstimate?: string;
}

export interface DriveCategoryWithVideos extends DriveFolder {
  videos: DriveVideo[];
}

/**
 * Format raw folder names into beautiful display titles.
 * Handles common abbreviations and typos gracefully.
 */
export function formatCategoryTitle(rawName: string): string {
  const trimmed = (rawName || "").trim();
  const lower = trimmed.toLowerCase();

  if (
    lower === "explaner videos" ||
    lower === "explainer" ||
    lower === "explainers"
  ) {
    return "Explainer Videos";
  }
  if (
    lower === "sas animation" ||
    lower === "saas" ||
    lower === "saas animations"
  ) {
    return "SaaS Animation";
  }
  if (
    lower === "map animation" ||
    lower === "maps" ||
    lower === "map animations"
  ) {
    return "Map Animation";
  }

  // General title case with words
  return trimmed
    .replace(/[_-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      const wLower = word.toLowerCase();
      if (wLower === "saas") return "SaaS";
      if (wLower === "ai") return "AI";
      if (
        wLower === "cg" ||
        wLower === "vfx" ||
        wLower === "3d" ||
        wLower === "2d"
      )
        return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

/**
 * Default editable descriptions for categories
 */
export function getDefaultCategoryDescription(categoryTitle: string): string {
  const lower = categoryTitle.toLowerCase();
  if (lower.includes("map")) {
    return "Detailed map visuals and smooth geographic animations that bring locations, routes, and stories to life";
  }
  if (lower.includes("explainer")) {
    return "High-engagement breakdown videos with kinetic typography, bespoke vector illustrations, and crisp pacing that makes complex concepts effortless to follow.";
  }
  if (lower.includes("saas") || lower.includes("software")) {
    return "Product walk-throughs, UI feature showcases, and sleek modern motion graphics designed to drive signups and clearly demonstrate digital workflows.";
  }
  return "Curated commercial and creative video edits produced by EnoughEditz with precision pacing, sound design, and motion graphic polish.";
}

/**
 * Determine whether a category should display in Portrait (9:16 / Reels)
 * or Landscape (16:9 / Widescreen) format per design spec:
 * - Map Animation: Portrait
 * - Explainer Videos: Portrait
 * - SaaS Animation: Landscape
 */
export function getCategoryAspectRatio(
  categoryTitleOrName: string,
): "portrait" | "landscape" {
  const lower = (categoryTitleOrName || "").toLowerCase();
  if (
    lower.includes("saas") ||
    lower.includes("sas") ||
    lower.includes("software")
  ) {
    return "landscape";
  }
  if (
    lower.includes("map") ||
    lower.includes("explainer") ||
    lower.includes("explaner") ||
    lower.includes("reel") ||
    lower.includes("short") ||
    lower.includes("my own edits")
  ) {
    return "portrait";
  }
  return "landscape";
}

/**
 * Clean raw video file names (e.g. "Copy of reel 04 cg.mp4" -> "Reel 04 CG")
 */
export function cleanVideoTitle(fileName: string): string {
  if (!fileName) return "Untitled Project";

  let cleaned = fileName
    .replace(/\.(mp4|mov|webm|mkv|avi|m4v)$/i, "")
    .replace(/^Copy of\s+/i, "")
    .replace(/^Copy\s+of\s+/i, "")
    .replace(/[_-]+/g, " ")
    .trim();

  // Clean up internal tags or punctuation
  cleaned = cleaned
    .split(" ")
    .filter(Boolean)
    .map((token) => {
      const upper = token.toUpperCase();
      if (
        ["AI", "CG", "VFX", "SaaS", "USA", "HD", "4K", "1080P"].includes(upper)
      ) {
        return upper;
      }
      return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join(" ");

  return cleaned || "Video Project";
}

/**
 * Parse HTML returned from Google Drive embedded folder view:
 * `https://drive.google.com/embeddedfolderview?id=FOLDER_ID`
 */
export function parseDriveEmbeddedHtml(html: string): {
  subfolders: Array<{ id: string; name: string; lastModified?: string }>;
  files: Array<{
    id: string;
    title: string;
    thumbnailUrl?: string;
    lastModified?: string;
    isVideo: boolean;
  }>;
} {
  const subfolders: Array<{ id: string; name: string; lastModified?: string }> =
    [];
  const files: Array<{
    id: string;
    title: string;
    thumbnailUrl?: string;
    lastModified?: string;
    isVideo: boolean;
  }> = [];

  if (!html || typeof html !== "string") {
    return { subfolders, files };
  }

  // Split by <div class="flip-entry"
  const chunks = html.split(/<div class="flip-entry"/i);

  for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i];
    const idMatch = chunk.match(/id="entry-([a-zA-Z0-9_-]+)"/);
    if (!idMatch) continue;
    const id = idMatch[1];

    // Check title: <div class="flip-entry-title">TITLE</div>
    const titleMatch = chunk.match(
      /<div class="flip-entry-title">([\s\S]*?)<\/div>/,
    );
    let title = titleMatch ? titleMatch[1].trim() : "";
    title = title
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    // Check last modified: <div class="flip-entry-last-modified"><div>TIME</div></div>
    const modMatch = chunk.match(
      /<div class="flip-entry-last-modified"><div>([\s\S]*?)<\/div>/,
    );
    const lastModified = modMatch ? modMatch[1].trim() : undefined;

    // Check if it's a folder: contains /drive/folders/ or folder icon class
    const isFolder =
      chunk.includes("/drive/folders/") ||
      chunk.includes("drive-sprite-folder") ||
      chunk.includes('aria-label="Folder"');

    if (isFolder) {
      subfolders.push({
        id,
        name: title || "Folder",
        lastModified,
      });
    } else {
      // Check for thumbnail: <img src="URL"
      const thumbMatch =
        chunk.match(/<div class="flip-entry-thumb">\s*<img\s+src="([^"]+)"/i) ||
        chunk.match(/<img\s+src="([^"]+)"\s+alt="Video"/i);
      const thumbnailUrl = thumbMatch
        ? thumbMatch[1].replace(/&amp;/g, "&")
        : undefined;

      const isVideo =
        chunk.includes("video/") ||
        chunk.includes('alt="Video"') ||
        /\.(mp4|mov|webm|mkv|avi|m4v)/i.test(title);

      files.push({
        id,
        title: title || "Untitled File",
        thumbnailUrl,
        lastModified,
        isVideo,
      });
    }
  }

  return { subfolders, files };
}

/**
 * Format video object with reliable Google Drive URLs
 */
export function buildDriveVideo(rawFile: {
  id: string;
  title: string;
  thumbnailUrl?: string;
  lastModified?: string;
}): DriveVideo {
  const cleanTitle = cleanVideoTitle(rawFile.title);
  // High quality Google Drive thumbnail endpoint
  const driveThumb = `https://drive.google.com/thumbnail?id=${rawFile.id}&sz=w1280`;

  return {
    id: rawFile.id,
    rawTitle: rawFile.title,
    title: cleanTitle,
    driveViewUrl: `https://drive.google.com/file/d/${rawFile.id}/view`,
    embedUrl: `https://drive.google.com/file/d/${rawFile.id}/preview`,
    thumbnailUrl: rawFile.thumbnailUrl || driveThumb,
    fallbackThumbUrl: driveThumb,
    lastModified: rawFile.lastModified,
    durationEstimate: "HD 1080p",
  };
}

/**
 * Build mailto: URL for client project inquiries
 */
export function buildMailtoUrl(params: {
  recipientEmail: string;
  name: string;
  senderEmail: string;
  projectType?: string;
  budget?: string;
  message: string;
}): string {
  const subject = `[Project Inquiry] ${params.name.trim() ? params.name.trim() + " - " : ""}Video Editing for EnoughEditz`;

  const bodyLines = [
    `Hi EnoughEditz,`,
    ``,
    `Name: ${params.name.trim() || "Not specified"}`,
    `Email: ${params.senderEmail.trim() || "Not specified"}`,
    params.projectType ? `Project Category: ${params.projectType}` : "",
    params.budget ? `Estimated Budget/Timeline: ${params.budget}` : "",
    ``,
    `Project Details & Message:`,
    params.message.trim(),
    ``,
    `---`,
    `Sent from EnoughEditz Portfolio inquiry form`,
  ].filter((line) => line !== null);

  const body = bodyLines.join("\n");

  return `mailto:${encodeURIComponent(params.recipientEmail)}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

/**
 * Carousel index calculations with loop or clamp options
 */
export function getNextCarouselIndex(
  currentIndex: number,
  totalItems: number,
  loop = false,
): number {
  if (totalItems <= 1) return 0;
  if (currentIndex < totalItems - 1) {
    return currentIndex + 1;
  }
  return loop ? 0 : currentIndex;
}

export function getPrevCarouselIndex(
  currentIndex: number,
  totalItems: number,
  loop = false,
): number {
  if (totalItems <= 1) return 0;
  if (currentIndex > 0) {
    return currentIndex - 1;
  }
  return loop ? totalItems - 1 : 0;
}
