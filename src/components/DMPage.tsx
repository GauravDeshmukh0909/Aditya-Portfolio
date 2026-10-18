import React, { useState } from 'react';
import { Mail, Send, Check, Copy, ArrowLeft, AlertCircle, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';
import { buildMailtoUrl } from '../utils/driveParser';

interface DMPageProps {
  contactEmail: string;
  onBackToPortfolio: () => void;
  profileImageUrl?: string;
}

export const DMPage: React.FC<DMPageProps> = ({
  contactEmail,
  onBackToPortfolio,
  profileImageUrl = '/profile.jpg',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Map Animation');
  const [budget, setBudget] = useState('Standard Turnaround (3-5 days)');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [lastMailtoUrl, setLastMailtoUrl] = useState('');

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) errs.name = 'Please enter your name or channel handle';
    if (!email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!message.trim()) errs.message = 'Please provide details about your project';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const mailto = buildMailtoUrl({
      recipientEmail: contactEmail,
      name,
      senderEmail: email,
      projectType,
      budget,
      message,
    });

    setLastMailtoUrl(mailto);
    setSubmitted(true);

    window.location.href = mailto;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (e) {
      console.warn('Copy failed', e);
    }
  };

  const handleCopyDraft = async () => {
    const draftText = `Subject: [Project Inquiry] ${name} - Video Editing for EnoughEditz\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType}\nBudget/Timeline: ${budget}\n\nMessage:\n${message}`;
    try {
      await navigator.clipboard.writeText(draftText);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2500);
    } catch (e) {
      console.warn('Copy draft failed', e);
    }
  };

  return (
    <div className="py-14 sm:py-24 max-w-4xl mx-auto px-6 lg:px-10">
      {/* Back button */}
      <div className="mb-10">
        <button
          onClick={onBackToPortfolio}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg py-1 px-2 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Portfolio Overview</span>
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        {/* Editor Profile Avatar */}
        <div className="inline-flex items-center gap-3 rounded-full border border-stone-200/90 bg-white/90 p-1.5 pr-4 shadow-xs backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/90 mb-5 transition-transform hover:scale-[1.02]">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-orange-500/80 shadow-xs">
            <img
              src={profileImageUrl}
              alt="EnoughEditz Lead Editor"
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-stone-900" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-stone-900 dark:text-white">Aditya &bull; EnoughEditz</div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400">Direct creator intake</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-3">
          <span>Client Intake</span>
          <span className="text-orange-500" aria-hidden="true">/</span>
          <span>Direct Inquiry</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Commission an Edit
        </h1>
        <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
          Provide your project scope, reference videos, and delivery deadline below to compose your project inquiry.
        </p>
      </div>

      {/* Submission Status Banner */}
      {submitted && (
        <div className="mb-10 rounded-3xl border border-orange-200 bg-orange-50/90 p-8 dark:border-orange-900/60 dark:bg-orange-950/40 text-stone-900 dark:text-stone-100 shadow-lg animate-in fade-in duration-200">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 text-white font-bold shadow-md shadow-orange-500/20">
              <Mail className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-extrabold text-lg text-orange-950 dark:text-orange-200">
                Email draft prepared in your mail app
              </h3>
              <p className="mt-1.5 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                Your email client has been prepared with your inquiry addressed to{' '}
                <strong className="text-orange-700 dark:text-orange-300 font-semibold">{contactEmail}</strong>.
              </p>
              <p className="mt-3 text-xs font-semibold text-orange-800 dark:text-orange-300 bg-orange-100/90 dark:bg-orange-900/40 p-3 rounded-xl inline-block border border-orange-200 dark:border-orange-800">
                Notice: Please review and click &ldquo;Send&rdquo; inside your email application. The browser prepares the draft; your email app sends it.
              </p>

              {/* Fallback actions */}
              <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-orange-200/80 dark:border-orange-900/60">
                <a
                  href={lastMailtoUrl}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:from-orange-500 hover:to-amber-400"
                >
                  <Mail className="h-4 w-4" />
                  <span>Re-open Mail App</span>
                </a>

                <button
                  onClick={handleCopyDraft}
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs font-semibold text-stone-800 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 shadow-xs"
                >
                  {copiedDraft ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedDraft ? 'Draft Copied!' : 'Copy Formatted Draft'}</span>
                </button>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs font-semibold text-stone-800 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 shadow-xs"
                >
                  {copiedEmail ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedEmail ? 'Email Copied!' : 'Copy Email Address'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main DM Form Card */}
      <div className="rounded-3xl border border-stone-200/90 bg-white/90 p-8 sm:p-12 dark:border-stone-800 dark:bg-stone-900/90 shadow-xl backdrop-blur-md">
        <form onSubmit={handleSubmit} className="space-y-7" noValidate>
          {/* Name & Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="dm-name" className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                Your Name / Channel Handle <span className="text-orange-500">*</span>
              </label>
              <input
                id="dm-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="e.g. Alex (Apex History)"
                className={`w-full rounded-2xl border bg-stone-50/50 px-4 py-3 text-sm text-stone-900 placeholder-stone-400 dark:bg-stone-950 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.name ? 'border-red-500' : 'border-stone-300 dark:border-stone-700'
                }`}
                required
              />
              {errors.name && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="dm-email" className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                Your Email Address <span className="text-orange-500">*</span>
              </label>
              <input
                id="dm-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="alex@channel.com"
                className={`w-full rounded-2xl border bg-stone-50/50 px-4 py-3 text-sm text-stone-900 placeholder-stone-400 dark:bg-stone-950 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.email ? 'border-red-500' : 'border-stone-300 dark:border-stone-700'
                }`}
                required
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>}
            </div>
          </div>

          {/* Project Focus & Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="dm-project-type" className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                Editorial Focus
              </label>
              <select
                id="dm-project-type"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full rounded-2xl border border-stone-300 bg-stone-50/50 px-4 py-3 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 [&>option]:bg-white [&>option]:text-stone-900 dark:[&>option]:bg-stone-900 dark:[&>option]:text-stone-100"
              >
                <option value="Map Animation">3D Map Animation (Geopolitical / Route Flyover)</option>
                <option value="Explainer Videos">Explainer Video Essay (High-Retention)</option>
                <option value="SaaS Animation">SaaS Product / UI Motion Graphics</option>
                <option value="Full Video Editing Suite">Full YouTube Episode Post-Production</option>
                <option value="Sound Design & Finishing">Audio Engineering &amp; Color Finishing</option>
                <option value="Other / Custom Request">Custom Creative Brief</option>
              </select>
            </div>

            <div>
              <label htmlFor="dm-budget" className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                Target Timeline
              </label>
              <select
                id="dm-budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-2xl border border-stone-300 bg-stone-50/50 px-4 py-3 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 [&>option]:bg-white [&>option]:text-stone-900 dark:[&>option]:bg-stone-900 dark:[&>option]:text-stone-100"
              >
                <option value="Standard Turnaround (3-5 days)">Standard Turnaround (3–5 days)</option>
                <option value="Rush Delivery (24-48 Hours)">Rush Delivery (24–48 Hours)</option>
                <option value="Single Video Pilot">Single Video Pilot</option>
                <option value="Ongoing Monthly Retainer">Ongoing Channel Retainer</option>
                <option value="Discuss Scope First">Discuss Scope &amp; Quote First</option>
              </select>
            </div>
          </div>

          {/* Message Area */}
          <div>
            <label htmlFor="dm-message" className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
              Project Brief &amp; Reference Links <span className="text-orange-500">*</span>
            </label>
            <textarea
              id="dm-message"
              rows={5}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
              }}
              placeholder="Outline your video concept, desired pacing or visual style, rough runtime, and any link to assets or footage..."
              className={`w-full rounded-2xl border bg-stone-50/50 px-4 py-3 text-sm text-stone-900 placeholder-stone-400 dark:bg-stone-950 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.message ? 'border-red-500' : 'border-stone-300 dark:border-stone-700'
              }`}
              required
            />
            {errors.message && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.message}</p>}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-stone-100 dark:border-stone-800">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 px-9 py-4 text-sm font-bold text-white shadow-xl shadow-orange-600/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <Send className="h-4 w-4" />
              <span>Submit &amp; Open Mail Draft</span>
            </button>

            {/* Direct fallback link */}
            <div className="text-center sm:text-right text-xs">
              <span className="text-stone-500 dark:text-stone-400 block">
                Direct Email:
              </span>
              <div className="inline-flex items-center gap-2 mt-1">
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-semibold text-stone-800 dark:text-stone-200 hover:text-orange-500 transition-colors"
                >
                  {contactEmail}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-stone-400 hover:text-stone-800 dark:hover:text-white p-1 rounded-md"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
