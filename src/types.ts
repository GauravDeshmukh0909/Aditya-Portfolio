import { DriveCategoryWithVideos, DriveVideo } from './utils/driveParser';

export type { DriveCategoryWithVideos, DriveVideo };

export type ActivePage = 'home' | 'categories' | 'about' | 'dm' | 'contact';

export type ThemeMode = 'light' | 'dark';

export interface EditableSiteContent {
  brandName: string;
  tagline: string;
  headline: string;
  subheadline: string;
  aboutBio: string;
  services: Array<{
    title: string;
    description: string;
    badge: string;
  }>;
  softwareList: Array<{
    name: string;
    role: string;
    color: string;
    image?: string;
  }>;
  contactEmail: string;
  youtubeUrl: string;
  fiverrUrl: string;
  driveFolderUrl: string;
  profileImageUrl: string;
  categoryDescriptions: Record<string, string>;
}
