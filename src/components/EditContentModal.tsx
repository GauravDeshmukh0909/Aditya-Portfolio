import React, { useState } from 'react';
import { EditableSiteContent } from '../types';
import { X, Save, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { INITIAL_SITE_CONTENT } from '../utils/defaultContent';

interface EditContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: EditableSiteContent;
  onSave: (newContent: EditableSiteContent) => void;
}

export const EditContentModal: React.FC<EditContentModalProps> = ({
  isOpen,
  onClose,
  content,
  onSave,
}) => {
  const [formData, setFormData] = useState<EditableSiteContent>({ ...content });

  if (!isOpen) return null;

  const handleReset = () => {
    if (window.confirm('Reset all content to original defaults?')) {
      setFormData({ ...INITIAL_SITE_CONTENT });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleAddSoftware = () => {
    setFormData((prev) => ({
      ...prev,
      softwareList: [
        ...prev.softwareList,
        { name: 'New Software', role: 'Feature Role', color: 'from-orange-500 to-amber-600', image: '' },
      ],
    }));
  };

  const handleRemoveSoftware = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      softwareList: prev.softwareList.filter((_, i) => i !== index),
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-content-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl text-stone-900 dark:text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h3 id="edit-content-title" className="font-heading text-xl font-bold">
              Customize Portfolio Content
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Edit headline, bio, email, and software. Changes are saved locally on this browser.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
            aria-label="Close edit modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6 text-sm">
          {/* Headline & Subheadline */}
          <div className="space-y-4">
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-2">
              Hero Section
            </h4>
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Headline
              </label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder-stone-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Supporting Subheadline
              </label>
              <textarea
                rows={3}
                value={formData.subheadline}
                onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder-stone-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* About Bio */}
          <div className="space-y-4">
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-2">
              About &amp; Bio
            </h4>
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Personal Bio
              </label>
              <textarea
                rows={4}
                value={formData.aboutBio}
                onChange={(e) => setFormData({ ...formData, aboutBio: e.target.value })}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder-stone-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Software Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
              <h4 className="font-semibold text-stone-900 dark:text-stone-100">
                Software I Use ({formData.softwareList.length})
              </h4>
              <button
                type="button"
                onClick={handleAddSoftware}
                className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300"
              >
                <Plus className="h-3.5 w-3.5 text-orange-500" />
                <span>Add Software</span>
              </button>
            </div>

            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {formData.softwareList.map((software, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={software.name}
                    onChange={(e) => {
                      const updated = [...formData.softwareList];
                      updated[idx].name = e.target.value;
                      setFormData({ ...formData, softwareList: updated });
                    }}
                    placeholder="Tool name"
                    className="flex-1 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder-stone-500 focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="text"
                    value={software.role}
                    onChange={(e) => {
                      const updated = [...formData.softwareList];
                      updated[idx].role = e.target.value;
                      setFormData({ ...formData, softwareList: updated });
                    }}
                    placeholder="Role / Purpose"
                    className="flex-1 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder-stone-500 focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSoftware(idx)}
                    className="p-1.5 text-stone-400 hover:text-red-500 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Remove software"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details & Profile */}
          <div className="space-y-4">
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-2">
              Profile, Contact &amp; Links
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Profile Photo URL
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-orange-500/80 bg-stone-100 dark:bg-stone-800">
                    <img
                      src={formData.profileImageUrl || '/profile.jpg'}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <input
                    type="text"
                    value={formData.profileImageUrl}
                    onChange={(e) => setFormData({ ...formData, profileImageUrl: e.target.value })}
                    className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder-stone-500 focus:ring-2 focus:ring-orange-500"
                    placeholder="/profile.jpg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder-stone-500 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder-stone-500 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Fiverr Profile URL
                </label>
                <input
                  type="url"
                  value={formData.fiverrUrl || ''}
                  onChange={(e) => setFormData({ ...formData, fiverrUrl: e.target.value })}
                  className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder-stone-500 focus:ring-2 focus:ring-orange-500"
                  placeholder="https://www.fiverr.com"
                />
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-stone-800">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-5 py-2 text-xs font-semibold text-white hover:bg-orange-500 shadow-xs"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
