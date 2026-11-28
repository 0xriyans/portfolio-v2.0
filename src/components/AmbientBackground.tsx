import { useEffect, useId, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

/**
 * Architectural Grid Ambience (Linear & Vercel Pro Style)
 *
 * Designed for Palette 2 (Monochrome Titanium):
 * 1. Clean, calm, non-distracting architectural hairline grid with crosshair (+) coordinates
 * 2. Interactive specular cursor spotlight that softly illuminates the grid cells around the mouse
 * 3. Gentle scroll parallax giving subtle depth without distracting kinetic movement
 * 4. Analog Matte Noise Film Grain (3.5% opacity) preventing banding on deep OLED blacks (#080808)
 * 5. Static soft titanium horizon highlights for spatial atmospheric depth
 */
export function AmbientBackground() {
  const filterId = useId();
  const reduceMotion = useReducedMotion();
  const [hasMouse, setHasMouse] = useState(false);

  // Mouse coordinate motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Fluid spring physics for subtle spotlight follow
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 0.2 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.2 });

  // Subtle scroll parallax for the grid layer
  const { scrollYProgress } = useScroll();
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Real-time radial specular light gradient revealing the grid near the cursor
  const primarySpotlight = useMotionTemplate`radial-gradient(680px circle at ${springX}px ${springY}px, rgba(255, 255, 255, 0.065) 0%, rgba(255, 255, 255, 0.02) 35%, transparent 70%)`;
  const ambientSheen = useMotionTemplate`radial-gradient(1000px circle at ${springX}px ${springY}px, rgba(255, 255, 255, 0.022) 0%, transparent 60%)`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(centerX);
      mouseY.set(centerY);

      const handleMouseMove = (e: MouseEvent) => {
        if (!hasMouse) setHasMouse(true);
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [hasMouse, mouseX, mouseY]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* 1. Base Calm Architectural Hairline Grid with Crosshair Intersections */}
      <motion.div
        style={reduceMotion ? undefined : { y: gridY }}
        className="absolute -inset-20 opacity-35"
      >
        {/* Fine Linear Grid lines (36px x 36px) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Micro-crosshairs (+) at major grid intersections (72px x 72px) */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              radial-gradient(circle 1.5px at center, rgba(255, 255, 255, 0.15) 100%, transparent 100%)
            `,
            backgroundSize: '72px 72px',
          }}
        />
      </motion.div>

      {/* 2. Interactive Specular Cursor Spotlight (Illuminates grid cells around the mouse) */}
      {!reduceMotion && hasMouse && (
        <>
          <motion.div
            style={{ background: primarySpotlight }}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
          />
          <motion.div
            style={{ background: ambientSheen }}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
          />
        </>
      )}

      {/* 3. Static Center Ambient Glow (Fallback when mouse is stationary or on touch) */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(900px circle at 50% 25%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
        }}
      />

      {/* 4. Subtle Titanium Specular Horizon Highlights */}
      <div className="absolute -top-40 left-1/2 h-[340px] w-[800px] -translate-x-1/2 rounded-full bg-white/[0.02] blur-[160px]" />
      <div className="absolute top-[45%] -right-48 h-[460px] w-[460px] rounded-full bg-white/[0.015] blur-[170px]" />
      <div className="absolute -bottom-40 left-10 h-[400px] w-[400px] rounded-full bg-white/[0.016] blur-[160px]" />

      {/* 5. Analog Matte Grain Film Texture (Exact SVG feTurbulence Overlay) */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-[0.035] mix-blend-screen">
        <svg className="h-full w-full">
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.82"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${filterId})`} />
        </svg>
      </div>
    </div>
  );
}
