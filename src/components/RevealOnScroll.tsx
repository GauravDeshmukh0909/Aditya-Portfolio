import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ScrollRevealConfig } from '../utils/animationUtils';

interface RevealOnScrollProps extends ScrollRevealConfig {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header';
  id?: string;
  style?: React.CSSProperties;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  as: Component = 'div',
  id,
  style: userStyle,
  threshold,
  rootMargin,
  delayMs,
  durationMs,
  yOffsetPx,
  triggerOnce,
}) => {
  const { ref, style: revealStyle, isVisible } = useScrollReveal({
    threshold,
    rootMargin,
    delayMs,
    durationMs,
    yOffsetPx,
    triggerOnce,
  });

  const mergedStyle: React.CSSProperties = {
    ...revealStyle,
    ...userStyle,
  };

  return (
    <Component
      ref={ref as any}
      id={id}
      className={`reveal-on-scroll ${isVisible ? 'is-revealed' : 'is-hidden'} ${className}`}
      style={mergedStyle}
    >
      {children}
    </Component>
  );
};
