import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const PHRASES = [
  'backend systems.',
  'resilient APIs.',
  'scalable databases.',
  'distributed pipelines.',
  'cloud architectures.',
  'products end-to-end.',
];

const ROW_HEIGHT = 40; // sleek, compact desktop row height
const ROW_HEIGHT_MOBILE = 32; // sleek, compact mobile row height

/**
 * Compact Kinetic Text Reel (jh3yy @ 21st.dev style):
 * - Fixed prefix on the focal center line: "I design & build"
 * - Compact vertical kinetic reel cycling with smooth spring physics
 * - Snug 3-phrase visible aperture (1 dimmed above, 1 active center, 1 dimmed below)
 * - Auto-cycle (2.8s), hover pause, click-to-focus, and wheel navigation
 */
export function KineticHeadlineReel() {
  const reduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [rowHeight, setRowHeight] = useState(ROW_HEIGHT);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const updateSize = () => {
      setRowHeight(window.innerWidth < 640 ? ROW_HEIGHT_MOBILE : ROW_HEIGHT);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Auto-cycle through phrases every 2.8s when not hovered
  useEffect(() => {
    if (reduceMotion || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % PHRASES.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [reduceMotion, isHovered]);

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 18) {
      if (e.deltaY > 0) {
        setCurrentIndex(prev => (prev + 1) % PHRASES.length);
      } else {
        setCurrentIndex(prev => (prev - 1 + PHRASES.length) % PHRASES.length);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 20) {
      if (diff > 0) {
        setCurrentIndex(prev => (prev + 1) % PHRASES.length);
      } else {
        setCurrentIndex(prev => (prev - 1 + PHRASES.length) % PHRASES.length);
      }
    }
    touchStartY.current = null;
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative flex flex-col justify-center sm:flex-row sm:items-center sm:gap-3 my-1 select-none"
      role="region"
      aria-label="Interactive Kinetic Headline Reel"
    >
      {/* Fixed Prefix: "I design & build" pinned at center line */}
      <span className="shrink-0 text-[24px] sm:text-[30px] lg:text-[34px] font-bold tracking-tight text-[#A1A1AA]">
        I design &amp; build
      </span>

      {/* Kinetic Reel Container with Snug Gradient Fade Mask */}
      <div className="relative h-[96px] sm:h-[118px] w-full min-w-[260px] sm:min-w-[360px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)]">
        {/* Phrases Vertical Stack */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-start">
          {PHRASES.map((phrase, i) => {
            // Calculate wrapped circular offset relative to currentIndex (-2 to +2)
            let offset = i - (currentIndex % PHRASES.length);
            if (offset < -Math.floor(PHRASES.length / 2)) {
              offset += PHRASES.length;
            } else if (offset > Math.floor(PHRASES.length / 2)) {
              offset -= PHRASES.length;
            }

            const isActive = offset === 0;
            const isNear = Math.abs(offset) === 1;

            return (
              <motion.div
                key={phrase}
                onClick={() => setCurrentIndex(i)}
                animate={
                  reduceMotion
                    ? { opacity: isActive ? 1 : 0.2 }
                    : {
                        y: offset * rowHeight,
                        opacity: isActive ? 1 : isNear ? 0.35 : 0.08,
                        scale: isActive ? 1 : isNear ? 0.94 : 0.88,
                        filter: isActive ? 'blur(0px)' : isNear ? 'blur(0.5px)' : 'blur(1.5px)',
                      }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        type: 'spring',
                        stiffness: 240,
                        damping: 22,
                        mass: 0.7,
                      }
                }
                className={`absolute left-1.5 sm:left-2.5 flex items-center gap-2 transition-colors cursor-pointer ${
                  isActive ? 'pointer-events-auto z-10' : 'pointer-events-auto z-0 hover:opacity-60'
                }`}
                style={{
                  transformOrigin: 'left center',
                }}
              >
                {/* Active word dot beacon indicator */}
                {isActive && (
                  <motion.span
                    layoutId="kinetic-active-dot"
                    className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_#FFFFFF]"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}

                {/* Phrase Text */}
                <span
                  className={`text-[22px] sm:text-[28px] lg:text-[32px] font-bold tracking-tight whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF] to-[#E4E4E7] bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(255,255,255,0.6)]'
                      : 'text-[#71717A]'
                  }`}
                >
                  {phrase}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
