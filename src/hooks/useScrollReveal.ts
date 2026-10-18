import { useEffect, useRef, useState, useMemo } from 'react';
import {
  ScrollRevealConfig,
  normalizeRevealConfig,
  getRevealStyle,
} from '../utils/animationUtils';

export function useScrollReveal(config?: ScrollRevealConfig) {
  const normalizedConfig = useMemo(() => normalizeRevealConfig(config), [
    config?.threshold,
    config?.rootMargin,
    config?.delayMs,
    config?.durationMs,
    config?.yOffsetPx,
    config?.triggerOnce,
  ]);

  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(() => {
    // If running in environment without IntersectionObserver, reveal immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return true;
    }
    // If reduced motion is requested, reveal immediately
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return true;
      }
    } catch {
      // ignore
    }
    return false;
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
        if (e.matches) setIsVisible(true);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || isVisible) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (normalizedConfig.triggerOnce) {
            observer.unobserve(el);
          }
        } else if (!normalizedConfig.triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: normalizedConfig.threshold,
        rootMargin: normalizedConfig.rootMargin,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [normalizedConfig, isVisible]);

  const style = useMemo(
    () => getRevealStyle(isVisible, normalizedConfig, prefersReducedMotion),
    [isVisible, normalizedConfig, prefersReducedMotion]
  );

  return {
    ref: elementRef,
    isVisible,
    style,
  };
}
