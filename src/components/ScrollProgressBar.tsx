import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

/**
 * Ultra-thin fixed scroll progress indicator along the top edge (`scaleX` GPU transform only).
 */
export function ScrollProgressBar() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="pointer-events-none fixed top-0 right-0 left-0 z-50 h-[2.5px] bg-gradient-to-r from-white via-[#E4E4E7] to-white/70 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
    />
  );
}
