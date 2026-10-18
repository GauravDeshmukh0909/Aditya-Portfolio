/**
 * EnoughEditz Video Editing Portfolio
 * Clean, minimal Apple-inspired design with selective orange accents.
 * Dynamic Google Drive subfolder category discovery and video sync.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ActivePage, ThemeMode, DriveCategoryWithVideos, DriveVideo, EditableSiteContent } from './types';
import { loadSavedSiteContent, saveSiteContent } from './utils/defaultContent';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { AboutSection } from './components/AboutSection';
import { DMPage } from './components/DMPage';
import { ContactSection } from './components/ContactSection';
import { VideoModal } from './components/VideoModal';
import { DriveGuideModal } from './components/DriveGuideModal';
import { EditContentModal } from './components/EditContentModal';
import { Footer } from './components/Footer';

import { DEFAULT_FALLBACK_CATEGORIES } from './utils/fallbackData.ts';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('enougheditz-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Active navigation view
  const [activePage, setActivePage] = useState<ActivePage>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['home', 'categories', 'about', 'dm', 'contact'].includes(hash)) {
      return hash as ActivePage;
    }
    return 'home';
  });

  // Editable site copy and settings
  const [content, setContent] = useState<EditableSiteContent>(loadSavedSiteContent);

  // Dynamic Google Drive Portfolio state (initialized with high-res master edits)
  const [categories, setCategories] = useState<DriveCategoryWithVideos[]>(DEFAULT_FALLBACK_CATEGORIES);
  const [totalVideos, setTotalVideos] = useState<number>(() =>
    DEFAULT_FALLBACK_CATEGORIES.reduce((sum, c) => sum + c.videos.length, 0)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [driveError, setDriveError] = useState<string | null>(null);
  const [syncedAt, setSyncedAt] = useState<string | null>(null);

  // Video Theater Modal state
  const [modalVideo, setModalVideo] = useState<DriveVideo | null>(null);
  const [modalCategoryTitle, setModalCategoryTitle] = useState<string>('');
  const [modalIsPortrait, setModalIsPortrait] = useState<boolean>(false);

  // Auxiliary Modals
  const [isDriveGuideOpen, setIsDriveGuideOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Theme synchronization with DOM
  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('enougheditz-theme', theme);
    } catch (e) {
      console.warn('Could not persist theme:', e);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Listen for hash changes for back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'categories', 'about', 'dm', 'contact'].includes(hash)) {
        setActivePage(hash as ActivePage);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync hash when activePage changes
  const handlePageChange = useCallback((page: ActivePage) => {
    setActivePage(page);
    window.location.hash = page === 'home' ? '' : page;
  }, []);

  // Fetch portfolio from backend API
  const fetchPortfolio = useCallback(async (refresh = false) => {
    if (refresh) {
      setIsSyncing(true);
    } else {
      setIsLoading(true);
    }
    setDriveError(null);

    try {
      const res = await fetch(`/api/drive/portfolio${refresh ? '?refresh=1' : ''}`);
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data.categories && Array.isArray(data.categories)) {
        setCategories(data.categories);
        setTotalVideos(data.totalVideos || 0);
        setSyncedAt(data.syncedAt || new Date().toISOString());
      }
      if (data.warning) {
        setDriveError(data.warning);
      }
    } catch (err: any) {
      console.error('Error fetching drive portfolio:', err);
      setCategories((prev) => (prev && prev.length > 0 ? prev : DEFAULT_FALLBACK_CATEGORIES));
      setDriveError('Could not sync with Google Drive currently. Showing cached data.');
    } finally {
      setIsLoading(false);
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio(false);
  }, [fetchPortfolio]);

  // Video selection for player modal
  const handleSelectVideo = useCallback((video: DriveVideo, categoryTitle: string, isPortrait: boolean) => {
    setModalVideo(video);
    setModalCategoryTitle(categoryTitle);
    setModalIsPortrait(isPortrait);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVideo(null);
  }, []);

  // Next / Prev video navigation within the current category inside modal
  const currentCategory = categories.find((c) => c.title === modalCategoryTitle);
  const currentVideoList = currentCategory?.videos || [];
  const currentVideoIndex = modalVideo ? currentVideoList.findIndex((v) => v.id === modalVideo.id) : -1;

  const handleNextVideo = useCallback(() => {
    if (currentVideoIndex >= 0 && currentVideoIndex < currentVideoList.length - 1) {
      setModalVideo(currentVideoList[currentVideoIndex + 1]);
    } else if (currentVideoList.length > 0) {
      setModalVideo(currentVideoList[0]);
    }
  }, [currentVideoIndex, currentVideoList]);

  const handlePrevVideo = useCallback(() => {
    if (currentVideoIndex > 0) {
      setModalVideo(currentVideoList[currentVideoIndex - 1]);
    } else if (currentVideoList.length > 0) {
      setModalVideo(currentVideoList[currentVideoList.length - 1]);
    }
  }, [currentVideoIndex, currentVideoList]);

  // Save customized content
  const handleSaveContent = useCallback((newContent: EditableSiteContent) => {
    setContent(newContent);
    saveSiteContent(newContent);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 selection:bg-orange-500/20 transition-colors duration-200">
      {/* Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={handlePageChange}
        theme={theme}
        toggleTheme={toggleTheme}
        isSyncing={isSyncing}
        onSyncDrive={() => fetchPortfolio(true)}
        driveFolderUrl={content.driveFolderUrl}
        youtubeUrl={content.youtubeUrl}
        profileImageUrl={content.profileImageUrl}
        onOpenDriveGuide={() => setIsDriveGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'dm' ? (
          /* Dedicated DM Page */
          <DMPage
            contactEmail={content.contactEmail}
            onBackToPortfolio={() => handlePageChange('home')}
            profileImageUrl={content.profileImageUrl}
          />
        ) : (
          /* Portfolio Main View */
          <>
            {/* 1. Hero / Intro */}
            <Hero
              headline={content.headline}
              subheadline={content.subheadline}
              driveFolderUrl={content.driveFolderUrl}
              profileImageUrl={content.profileImageUrl}
              onExploreWork={() => {
                const el = document.getElementById('categories');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                setActivePage('categories');
              }}
              onContactMe={() => handlePageChange('dm')}
              totalVideos={totalVideos}
              categoryCount={categories.length}
            />

            {/* 2. Categories & Carousels */}
            <CategoriesSection
              categories={categories}
              isLoading={isLoading}
              error={driveError}
              isSyncing={isSyncing}
              onSyncDrive={() => fetchPortfolio(true)}
              syncedAt={syncedAt}
              driveFolderUrl={content.driveFolderUrl}
              categoryDescriptions={content.categoryDescriptions}
              onSelectVideo={handleSelectVideo}
            />

            {/* 3. About & Software */}
            <AboutSection
              content={content}
              onOpenEditModal={() => setIsEditModalOpen(true)}
            />

            {/* 4. Contact */}
            <ContactSection
              contactEmail={content.contactEmail}
              youtubeUrl={content.youtubeUrl}
              driveFolderUrl={content.driveFolderUrl}
              fiverrUrl={content.fiverrUrl}
              profileImageUrl={content.profileImageUrl}
              onNavigateToDM={() => handlePageChange('dm')}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        brandName={content.brandName}
        contactEmail={content.contactEmail}
        youtubeUrl={content.youtubeUrl}
        driveFolderUrl={content.driveFolderUrl}
        profileImageUrl={content.profileImageUrl}
        setActivePage={handlePageChange}
        onOpenDriveGuide={() => setIsDriveGuideOpen(true)}
        onOpenEditModal={() => setIsEditModalOpen(true)}
      />

      {/* Theater Video Player Modal */}
      <VideoModal
        video={modalVideo}
        categoryTitle={modalCategoryTitle}
        isPortrait={modalIsPortrait}
        onClose={handleCloseModal}
        onPrevVideo={handlePrevVideo}
        onNextVideo={handleNextVideo}
        hasPrev={currentVideoList.length > 1}
        hasNext={currentVideoList.length > 1}
      />

      {/* Google Drive Setup Guide Modal */}
      <DriveGuideModal
        isOpen={isDriveGuideOpen}
        onClose={() => setIsDriveGuideOpen(false)}
        rootFolderUrl={content.driveFolderUrl}
      />

      {/* Content Customization Modal */}
      <EditContentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        content={content}
        onSave={handleSaveContent}
      />
    </div>
  );
}
