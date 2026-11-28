import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';

interface ScrollSectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  showDivider?: boolean;
}

/**
 * Continuous Scroll-Linked Section Transition (Apple / Linear Pro Style)
 *
 * Provides fluid spatial continuity between page components:
 * - Smooth entrance interpolation (y: 40px -> 0, scale: 0.97 -> 1, opacity: 0.15 -> 1, blur: 6px -> 0px)
 * - Spring-smoothed physics (stiffness 140, damping 24) responding continuously to scroll wheel velocity
 * - Optional architectural hairline beam separator with central illuminated titanium pin
 * - Seamless fallback for prefers-reduced-motion
 */
export function ScrollSectionTransition({
  children,
  className = '',
}: ScrollSectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Scroll tracking as component approaches viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.95', 'start 0.38'],
  });

  // Spring physics for organic, non-linear fluid response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.2,
  });

  const opacity = useTransform(smoothProgress, [0, 1], [0.15, 1]);
  const y = useTransform(smoothProgress, [0, 1], [40, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [0.97, 1]);
  const filter = useTransform(smoothProgress, [0, 0.7, 1], ['blur(6px)', 'blur(1px)', 'blur(0px)']);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Animated Section Content - Completely Borderless & Fluid */}
      <motion.div
        style={{
          opacity,
          y,
          scale,
          filter,
          transformOrigin: 'top center',
        }}
        className={`will-change-transform ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default ScrollSectionTransition;
