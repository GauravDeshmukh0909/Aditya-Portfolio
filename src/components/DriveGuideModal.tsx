import React from 'react';
import { X, FolderOpen, RefreshCw, CheckCircle2, ShieldCheck, ExternalLink, HelpCircle } from 'lucide-react';

interface DriveGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  rootFolderUrl: string;
}

export const DriveGuideModal: React.FC<DriveGuideModalProps> = ({ isOpen, onClose, rootFolderUrl }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drive-guide-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-8 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl text-stone-900 dark:text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
              <FolderOpen className="h-4 w-4" />
            </div>
            <h3 id="drive-guide-title" className="font-heading text-sm sm:text-lg font-bold">
              Google Drive Integration Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200 cursor-pointer"
            aria-label="Close setup guide"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 sm:mt-6 space-y-5 sm:space-y-6 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
          <div>
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm sm:text-base mb-1.5 sm:mb-2">
              1. How Dynamic Video Sync Works
            </h4>
            <p className="leading-relaxed">
              EnoughEditz uses a secure backend crawler that inspects the public folder hierarchy in real time. The app treats each subfolder as a category, and automatically discovers newly created folders and uploaded videos without needing code edits.
            </p>
          </div>

          <div className="rounded-xl bg-orange-50/70 p-3.5 sm:p-4 border border-orange-200/80 dark:bg-orange-950/30 dark:border-orange-900/50">
            <h4 className="font-semibold text-orange-950 dark:text-orange-200 text-xs sm:text-sm mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-orange-600 shrink-0" />
              <span>Google Drive Folder Sharing Requirements</span>
            </h4>
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              To allow visitors to stream previews smoothly:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-xs text-stone-700 dark:text-stone-300">
              <li>Open your main Google Drive folder: <strong>Aditya Site</strong>.</li>
              <li>Click <strong>Share</strong> &rarr; General access &rarr; Set to <strong>&ldquo;Anyone with the link&rdquo;</strong> as <strong>Viewer</strong>.</li>
              <li>Subfolders inherit this permission automatically.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm sm:text-base mb-1.5 sm:mb-2">
              2. Adding New Categories &amp; Edits
            </h4>
            <ul className="list-disc list-inside space-y-1.5 leading-relaxed text-xs sm:text-sm">
              <li><strong>Add a new category:</strong> Create a new subfolder in Drive (e.g. <code>Documentaries</code> or <code>Shorts</code>). The site will discover it and render a dedicated carousel.</li>
              <li><strong>Add videos:</strong> Upload standard <code>.mp4</code> or <code>.mov</code> video files into any subfolder.</li>
              <li><strong>Move/Remove:</strong> Any files moved between folders or deleted will automatically update on the site.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm sm:text-base mb-1.5 sm:mb-2">
              3. Triggering Instant Refresh
            </h4>
            <p className="leading-relaxed text-xs sm:text-sm">
              The portfolio caches Drive listings for 60 seconds for lightning-fast loads. To see new changes immediately, click the <strong>&ldquo;Sync Drive&rdquo;</strong> button in the navigation header or Categories section.
            </p>
          </div>

          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
            <button
              onClick={onClose}
              className="rounded-xl border border-stone-300 bg-white py-2.5 px-4 text-xs font-semibold text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 cursor-pointer text-center"
            >
              Close
            </button>

            <a
              href={rootFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 py-2.5 px-4 text-xs font-bold text-white shadow-md hover:from-orange-500 hover:to-amber-400 cursor-pointer text-center"
            >
              <FolderOpen className="h-4 w-4" />
              <span>Open Aditya Site Folder</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
