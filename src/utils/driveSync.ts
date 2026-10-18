import {
  parseDriveEmbeddedHtml,
  formatCategoryTitle,
  getDefaultCategoryDescription,
  buildDriveVideo,
  DriveCategoryWithVideos,
  DriveVideo,
} from './driveParser.ts';
import { DEFAULT_FALLBACK_CATEGORIES } from './fallbackData.ts';

export { DEFAULT_FALLBACK_CATEGORIES };

const getRootFolderId = (): string => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      if (process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID) return process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
      if (process.env.VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID) return process.env.VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID;
    }
  } catch {}

  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      if ((import.meta as any).env.VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID) {
        return (import.meta as any).env.VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID;
      }
    }
  } catch {}

  return '1SG65fVDS0ZnfQxnsQyjuKBnm8rpQMASY';
};

export const ROOT_FOLDER_ID = getRootFolderId();
export const CACHE_TTL_MS = 60 * 1000; // 60 seconds

export interface PortfolioPayload {
  rootFolderId: string;
  rootTitle: string;
  categories: DriveCategoryWithVideos[];
  totalVideos: number;
  syncedAt: string;
  source: 'live' | 'cached' | 'fallback';
  warning?: string;
}

interface CacheEntry {
  timestamp: number;
  data: PortfolioPayload;
}

let portfolioCache: CacheEntry | null = null;

async function fetchHtmlWithTimeout(url: string, timeoutMs = 8000): Promise<string> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    if (!res.ok) {
      throw new Error(`Drive fetch returned status ${res.status}`);
    }
    return await res.text();
  } finally {
    clearTimeout(id);
  }
}

/**
 * Synchronize categories and videos from Google Drive public folder hierarchy.
 * Returns cached or fallback data gracefully on network timeout or rate limit.
 */
export async function syncDrivePortfolio(forceRefresh = false): Promise<PortfolioPayload> {
  const now = Date.now();
  if (!forceRefresh && portfolioCache && now - portfolioCache.timestamp < CACHE_TTL_MS) {
    return { ...portfolioCache.data, source: 'cached' };
  }

  try {
    const rootUrl = `https://drive.google.com/embeddedfolderview?id=${ROOT_FOLDER_ID}`;
    const rootHtml = await fetchHtmlWithTimeout(rootUrl, 10000);
    const { subfolders } = parseDriveEmbeddedHtml(rootHtml);

    // Extract title from head if available
    const titleMatch = rootHtml.match(/<title>([\s\S]*?)<\/title>/);
    const rootTitle = titleMatch ? titleMatch[1].trim() : 'EnoughEditz Drive Library';

    // If subfolders found, fetch files in each subfolder in parallel
    const categories: DriveCategoryWithVideos[] = await Promise.all(
      subfolders.map(async (folder) => {
        const folderUrl = `https://drive.google.com/embeddedfolderview?id=${folder.id}`;
        let videos: DriveVideo[] = [];
        try {
          const subfolderHtml = await fetchHtmlWithTimeout(folderUrl, 8000);
          const parsed = parseDriveEmbeddedHtml(subfolderHtml);
          videos = parsed.files.map(buildDriveVideo);
        } catch (subErr) {
          console.warn(`[Drive Sync] Failed to fetch subfolder ${folder.id} (${folder.name}):`, subErr);
        }

        const displayTitle = formatCategoryTitle(folder.name);
        return {
          id: folder.id,
          name: folder.name,
          title: displayTitle,
          description: getDefaultCategoryDescription(displayTitle),
          driveUrl: `https://drive.google.com/drive/folders/${folder.id}`,
          lastModified: folder.lastModified,
          videos,
        };
      })
    );

    const totalVideos = categories.reduce((sum, c) => sum + c.videos.length, 0);

    const payload: PortfolioPayload = {
      rootFolderId: ROOT_FOLDER_ID,
      rootTitle,
      categories,
      totalVideos,
      syncedAt: new Date().toISOString(),
      source: 'live',
    };

    portfolioCache = {
      timestamp: now,
      data: payload,
    };

    return payload;
  } catch (err: any) {
    console.error('[Drive Sync] Error syncing Drive portfolio:', err?.message || err);

    if (portfolioCache) {
      return {
        ...portfolioCache.data,
        source: 'cached',
        warning: 'Live sync failed; showing latest cached data',
      };
    }

    return {
      rootFolderId: ROOT_FOLDER_ID,
      rootTitle: 'EnoughEditz Library',
      categories: DEFAULT_FALLBACK_CATEGORIES,
      totalVideos: DEFAULT_FALLBACK_CATEGORIES.reduce((sum, c) => sum + c.videos.length, 0),
      syncedAt: new Date().toISOString(),
      source: 'fallback',
      warning: 'Live sync temporarily unavailable; showing master edits archive',
    };
  }
}

export function getDriveStatus() {
  return {
    status: 'ok',
    rootFolderId: ROOT_FOLDER_ID,
    folderUrl: `https://drive.google.com/drive/folders/${ROOT_FOLDER_ID}`,
    cached: !!portfolioCache,
    lastSyncedAt: portfolioCache?.data.syncedAt || null,
  };
}
