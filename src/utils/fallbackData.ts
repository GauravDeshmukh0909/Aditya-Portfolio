import {
  getDefaultCategoryDescription,
  buildDriveVideo,
  DriveCategoryWithVideos,
} from './driveParser.ts';

/**
 * Pure client-safe fallback portfolio data.
 * Does not depend on Node.js globals or server crawler logic.
 */
export const DEFAULT_FALLBACK_CATEGORIES: DriveCategoryWithVideos[] = [
  {
    id: '1yrenEvYv5eLezcsf0nUl5pq4SxYb4oUX',
    name: 'map animation',
    title: 'Map Animation',
    description: getDefaultCategoryDescription('Map Animation'),
    driveUrl: 'https://drive.google.com/drive/folders/1yrenEvYv5eLezcsf0nUl5pq4SxYb4oUX',
    videos: [
      buildDriveVideo({ id: '1y3TyL8L-CIz_YXv6xQlvjkyxBrZgHKXL', title: 'Copy of alaska ( vid 1).mp4' }),
      buildDriveVideo({ id: '1vwlj55nng3lCN2zvs57l8UD61G7lrK9k', title: 'Copy of east and west usa 2.0.mp4' }),
      buildDriveVideo({ id: '1KbolcCOD7NaJXKObMarnrlEq6sgyPro3', title: 'Copy of Usa school in Canada.mp4' }),
    ],
  },
  {
    id: '18MgyKw1YYnYU1ryBWojaaFSwAUhSEpmP',
    name: 'explaner videos',
    title: 'Explainer Videos',
    description: getDefaultCategoryDescription('Explainer Videos'),
    driveUrl: 'https://drive.google.com/drive/folders/18MgyKw1YYnYU1ryBWojaaFSwAUhSEpmP',
    videos: [
      buildDriveVideo({ id: '1XKQyzHQIZeaNRlYxbc4R51rTWpLDV_Cp', title: 'Copy of reel 04 cg.mp4' }),
      buildDriveVideo({ id: '1bq-QbHB0O9XAQIXG8vx6FU3bf5NnZmXy', title: 'Copy of reel1 plot information.mp4' }),
      buildDriveVideo({ id: '1lIHr2v8d_tf9VCvfbjuoY-napzuterDf', title: 'Copy of reel2_3.mp4' }),
      buildDriveVideo({ id: '1DOpc9wiQQl23Axf3pWEbkufR4L-LYbYU', title: 'Copy of reel3_1.mp4' }),
    ],
  },
  {
    id: '1zw0zzhSg9rZ-eel3eA8SYsiW-1A9pLuS',
    name: 'sas animation',
    title: 'SaaS Animation',
    description: getDefaultCategoryDescription('SaaS Animation'),
    driveUrl: 'https://drive.google.com/drive/folders/1zw0zzhSg9rZ-eel3eA8SYsiW-1A9pLuS',
    videos: [
      buildDriveVideo({
        id: '18lcDZeABAAbugAWz86W0Ukd_TqGUEXoj',
        title: 'Mavio AI Meeting Notes — Turn Every Meeting Into Notes, Decisions & Action Items 5 1080P.mp4',
      }),
    ],
  },
];
