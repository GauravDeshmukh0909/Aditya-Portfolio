import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_SCROLL_REVEAL_CONFIG,
  normalizeRevealConfig,
  getRevealStyle,
} from './animationUtils.ts';

test('normalizeRevealConfig applies default values when none provided', () => {
  const normalized = normalizeRevealConfig();
  assert.equal(normalized.threshold, DEFAULT_SCROLL_REVEAL_CONFIG.threshold);
  assert.equal(normalized.rootMargin, DEFAULT_SCROLL_REVEAL_CONFIG.rootMargin);
  assert.equal(normalized.delayMs, 0);
  assert.equal(normalized.durationMs, 700);
  assert.equal(normalized.yOffsetPx, 28);
  assert.equal(normalized.triggerOnce, true);
});

test('normalizeRevealConfig clamps threshold between 0 and 1', () => {
  const low = normalizeRevealConfig({ threshold: -0.5 });
  assert.equal(low.threshold, 0);

  const high = normalizeRevealConfig({ threshold: 2.5 });
  assert.equal(high.threshold, 1);
});

test('getRevealStyle produces hidden transform and opacity when not visible', () => {
  const config = normalizeRevealConfig({ yOffsetPx: 30, durationMs: 800, delayMs: 150 });
  const style = getRevealStyle(false, config, false);

  assert.equal(style.opacity, 0);
  assert.equal(style.transform, 'translateY(30px)');
  assert.equal(style.transitionDuration, '800ms');
  assert.equal(style.transitionDelay, '150ms');
});

test('getRevealStyle produces visible transform and opacity when visible', () => {
  const config = normalizeRevealConfig({ yOffsetPx: 25, durationMs: 600 });
  const style = getRevealStyle(true, config, false);

  assert.equal(style.opacity, 1);
  assert.equal(style.transform, 'translateY(0px)');
  assert.equal(style.willChange, 'auto');
});

test('getRevealStyle disables motion when prefersReducedMotion is true', () => {
  const config = normalizeRevealConfig({ yOffsetPx: 30 });
  const style = getRevealStyle(false, config, true);

  assert.equal(style.opacity, 1);
  assert.equal(style.transform, 'none');
  assert.equal(style.transition, 'none');
});
