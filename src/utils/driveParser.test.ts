import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCategoryTitle,
  getDefaultCategoryDescription,
  getCategoryAspectRatio,
  cleanVideoTitle,
  parseDriveEmbeddedHtml,
  buildMailtoUrl,
  getNextCarouselIndex,
  getPrevCarouselIndex,
} from './driveParser.ts';

test('formatCategoryTitle normalizes known and generic categories correctly', () => {
  assert.equal(formatCategoryTitle('explaner videos'), 'Explainer Videos');
  assert.equal(formatCategoryTitle('sas animation'), 'SaaS Animation');
  assert.equal(formatCategoryTitle('map animation'), 'Map Animation');
  assert.equal(formatCategoryTitle('3d_vfx_showcase'), '3D VFX Showcase');
  assert.equal(formatCategoryTitle('youtube-documentary-edits'), 'Youtube Documentary Edits');
});

test('getDefaultCategoryDescription returns contextual descriptions', () => {
  assert.match(getDefaultCategoryDescription('Map Animation'), /geopolitical|terrain|geographic/i);
  assert.match(getDefaultCategoryDescription('Explainer Videos'), /kinetic typography|breakdown/i);
  assert.match(getDefaultCategoryDescription('SaaS Animation'), /product|UI feature|software/i);
});

test('getCategoryAspectRatio identifies portrait vs landscape accurately', () => {
  assert.equal(getCategoryAspectRatio('Map Animation'), 'portrait');
  assert.equal(getCategoryAspectRatio('map animation'), 'portrait');
  assert.equal(getCategoryAspectRatio('Explainer Videos'), 'portrait');
  assert.equal(getCategoryAspectRatio('explaner videos'), 'portrait');
  assert.equal(getCategoryAspectRatio('SaaS Animation'), 'landscape');
  assert.equal(getCategoryAspectRatio('sas animation'), 'landscape');
});

test('cleanVideoTitle strips extensions and Copy of prefix', () => {
  assert.equal(cleanVideoTitle('Copy of reel 04 cg.mp4'), 'Reel 04 CG');
  assert.equal(cleanVideoTitle('Copy of east and west usa 2.0.mp4'), 'East And West USA 2.0');
  assert.equal(cleanVideoTitle('Mavio AI Meeting Notes.mp4'), 'Mavio AI Meeting Notes');
});

test('parseDriveEmbeddedHtml parses folders and video entries accurately', () => {
  const mockFolderHtml = `
    <div class="flip-entries">
      <div class="flip-entry" id="entry-folder123" tabindex="0" role="link">
        <div class="flip-entry-info">
          <a href="https://drive.google.com/drive/folders/folder123">
            <div class="flip-entry-title">map animation</div>
          </a>
        </div>
      </div>
      <div class="flip-entry" id="entry-video456" tabindex="0" role="link">
        <div class="flip-entry-info">
          <a href="https://drive.google.com/file/d/video456/view">
            <div class="flip-entry-visual">
              <div class="flip-entry-thumb">
                <img src="https://lh3.googleusercontent.com/test=s190" alt="Video"/>
              </div>
            </div>
            <div class="flip-entry-title">Copy of alaska.mp4</div>
          </a>
        </div>
      </div>
    </div>
  `;

  const { subfolders, files } = parseDriveEmbeddedHtml(mockFolderHtml);
  assert.equal(subfolders.length, 1);
  assert.equal(subfolders[0].id, 'folder123');
  assert.equal(subfolders[0].name, 'map animation');

  assert.equal(files.length, 1);
  assert.equal(files[0].id, 'video456');
  assert.equal(files[0].title, 'Copy of alaska.mp4');
  assert.equal(files[0].isVideo, true);
  assert.equal(files[0].thumbnailUrl, 'https://lh3.googleusercontent.com/test=s190');
});

test('buildMailtoUrl constructs compliant mailto strings with proper encoding', () => {
  const url = buildMailtoUrl({
    recipientEmail: 'adityaanilkhekade@gmail.com',
    name: 'Alex Johnson',
    senderEmail: 'alex@example.com',
    projectType: 'Explainer Videos',
    budget: '$1,000 - $2,500',
    message: 'Need 3 videos edited for our YouTube channel launch!',
  });

  assert.ok(url.startsWith('mailto:adityaanilkhekade%40gmail.com'));
  assert.ok(url.includes('Alex%20Johnson'));
  assert.ok(url.includes('Explainer%20Videos'));
  assert.ok(url.includes('YouTube%20channel%20launch'));
});

test('carousel index navigation handles clamping and looping correctly', () => {
  // Clamped (loop=false)
  assert.equal(getNextCarouselIndex(0, 3, false), 1);
  assert.equal(getNextCarouselIndex(2, 3, false), 2);
  assert.equal(getPrevCarouselIndex(0, 3, false), 0);
  assert.equal(getPrevCarouselIndex(2, 3, false), 1);

  // Loop (loop=true)
  assert.equal(getNextCarouselIndex(2, 3, true), 0);
  assert.equal(getPrevCarouselIndex(0, 3, true), 2);
});
