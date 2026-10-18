/**
 * Utilities for scroll reveal entrance animations and motion preference checks.
 */

export interface ScrollRevealConfig {
  threshold?: number;
  rootMargin?: string;
  delayMs?: number;
  durationMs?: number;
  yOffsetPx?: number;
  triggerOnce?: boolean;
}

export const DEFAULT_SCROLL_REVEAL_CONFIG: Required<ScrollRevealConfig> = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
  delayMs: 0,
  durationMs: 700,
  yOffsetPx: 28,
  triggerOnce: true,
};

/**
 * Normalizes scroll reveal configuration with sensible defaults.
 */
export function normalizeRevealConfig(config?: ScrollRevealConfig): Required<ScrollRevealConfig> {
  return {
    threshold: typeof config?.threshold === 'number' ? Math.max(0, Math.min(1, config.threshold)) : DEFAULT_SCROLL_REVEAL_CONFIG.threshold,
    rootMargin: config?.rootMargin ?? DEFAULT_SCROLL_REVEAL_CONFIG.rootMargin,
    delayMs: typeof config?.delayMs === 'number' ? Math.max(0, config.delayMs) : DEFAULT_SCROLL_REVEAL_CONFIG.delayMs,
    durationMs: typeof config?.durationMs === 'number' ? Math.max(100, config.durationMs) : DEFAULT_SCROLL_REVEAL_CONFIG.durationMs,
    yOffsetPx: typeof config?.yOffsetPx === 'number' ? config.yOffsetPx : DEFAULT_SCROLL_REVEAL_CONFIG.yOffsetPx,
    triggerOnce: config?.triggerOnce ?? DEFAULT_SCROLL_REVEAL_CONFIG.triggerOnce,
  };
}

/**
 * Returns inline style object for transition timing and transform offset.
 */
export function getRevealStyle(
  isVisible: boolean,
  config: Required<ScrollRevealConfig>,
  prefersReducedMotion: boolean = false
): React.CSSProperties {
  if (prefersReducedMotion) {
    return {
      opacity: 1,
      transform: 'none',
      transition: 'none',
    };
  }

  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : `translateY(${config.yOffsetPx}px)`,
    transitionProperty: 'opacity, transform',
    transitionDuration: `${config.durationMs}ms`,
    transitionDelay: `${config.delayMs}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: isVisible ? 'auto' : 'opacity, transform',
  };
}
