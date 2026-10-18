# EnoughEditz - Video Editing & Motion Graphics Portfolio

Modern, high-performance portfolio for **EnoughEditz** (Aditya) showcasing 3D map animations, high-impact explainer breakdowns, and SaaS product motion graphics. Features live Google Drive integration, theater modal video playback, theme switching, and direct client inquiry workflows.

---

## 🚀 Deploying to Vercel

This repository is optimized for **zero-config production deployment on Vercel**.

### Option 1: Deploy via GitHub (Recommended)

1. Push this project to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Production release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New..." &rarr; "Project"**.
3. Import your GitHub repository.
4. Vercel will automatically detect:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your site will be live worldwide in under 1 minute!

### Option 2: Deploy via Vercel CLI

Run the following command in your terminal:
```bash
npx vercel
```
Follow the interactive prompts to deploy directly. For production updates:
```bash
npx vercel --prod
```

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (with Vite HMR and local API middleware)
npm run dev

# 3. Type check
npm run lint

# 4. Production build
npm run build

# 5. Preview production build locally
npm run preview
```

---

## 📁 Project Architecture

```
├── api/                     # Vercel Serverless Functions
│   └── drive/
│       ├── portfolio.ts     # /api/drive/portfolio (CORS + Edge CDN cached sync)
│       └── status.ts        # /api/drive/status (Health & cache status)
├── public/                  # Static assets & software badges
├── src/
│   ├── components/          # Modular React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── CategoriesSection.tsx
│   │   ├── CategoryCarousel.tsx
│   │   ├── VideoModal.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── DMPage.tsx
│   │   ├── DriveGuideModal.tsx
│   │   ├── EditContentModal.tsx
│   │   └── Footer.tsx
│   ├── hooks/               # Custom hooks (scroll reveal, accessibility)
│   ├── utils/
│   │   ├── driveSync.ts     # Unified Google Drive crawler & fallback data
│   │   ├── driveParser.ts   # HTML parsing & format utilities
│   │   └── defaultContent.ts# Default portfolio copy & software mappings
│   ├── App.tsx              # Main application shell
│   ├── index.css            # Tailwind CSS v4 styling & design tokens
│   └── main.tsx             # Entry point
├── server.ts                # Standalone Express server (optional/Docker)
├── vercel.json              # Vercel Edge caching and routing configuration
└── vite.config.ts           # Vite bundler configuration
```

---

## 🔄 Dynamic Google Drive Sync

- The portfolio fetches videos in real time from public subfolders in Google Drive.
- Each subfolder automatically becomes a carousel category.
- Google Drive responses are cached for 60 seconds at Vercel's global CDN edge for instantaneous load times.
- If Google Drive is temporarily rate-limiting or offline, the app automatically serves seeded master edits so your portfolio is always 100% functional.

### Adding New Videos:
1. Open your Google Drive root folder.
2. Ensure folder sharing is set to **"Anyone with the link can view"**.
3. Create or rename subfolders for categories (e.g. `Map Animation`, `Explainer Videos`, `SaaS Animation`).
4. Upload `.mp4` or `.mov` video files.
5. Click **"Sync Drive"** on the website or wait for the 60-second cache window to refresh.
