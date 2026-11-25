import { useState, useEffect } from 'react';
import { MOTION } from '@styles/motionTokens';
import usePrefersReducedMotion from './usePrefersReducedMotion';

/**
 * Fires once when the referenced element reaches the configured viewport visibility threshold.
 * Immediately returns true when prefers-reduced-motion is active.
 */
const useInViewOnce = (ref, threshold = MOTION.trigger.viewport) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [inView, setInView] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setInView(true);
      return;
    }

    const node = ref && ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0] && entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, threshold, prefersReducedMotion]);

  return inView;
};

export default useInViewOnce;
