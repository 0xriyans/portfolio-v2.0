import { useState, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'motion/react';
import { SITE } from '../lib/config';
import { BorderBeam } from './ui/border-beam';

interface HeroIdCardProps {
  portraitSrc: string;
}

// Organic fluid Bezier curves for soft, supple lanyard fabric under gravity
const LEFT_STRAP_REST = 'M 16,-220 C 22,100 42,420 63,560';
const LEFT_STRAP_SWAY_A = 'M 16,-220 C 14,100 36,420 63,560';
const LEFT_STRAP_SWAY_B = 'M 16,-220 C 28,100 48,420 63,560';

const RIGHT_STRAP_REST = 'M 124,-220 C 118,100 98,420 77,560';
const RIGHT_STRAP_SWAY_A = 'M 124,-220 C 126,100 104,420 77,560';
const RIGHT_STRAP_SWAY_B = 'M 124,-220 C 112,100 92,420 77,560';

/**
 * Executive Pass ID Card (Behance Template inspired in Monochrome Titanium):
 * - Lanyard: 2 long curved woven ribbons converging into a metallic crimp sleeve & swivel lobster claw hook
 * - Casing: Molded portrait badge holder with top slot-punch tab and 3D bezel
 * - Card Layout: Centered portrait, bold identity typography, clean 3-row spec table, barcode & security chip
 * - Physics: Spring entrance drop ("jatuh"), smooth idle levitation ("melayang"), and draggable
 * - 3D Gyroscope: Interactive cursor-tracking perspective tilt (rotateX, rotateY) + dynamic holographic specular glare
 */
export function HeroIdCard({ portraitSrc }: HeroIdCardProps) {
  const reduceMotion = useReducedMotion();
  const [dragging, setDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D cursor tilt
  const mouseX = useMotionValue(0); // Normalized -0.5 to 0.5
  const mouseY = useMotionValue(0); // Normalized -0.5 to 0.5

  // Smooth springs for rotation physics
  const springConfig = { stiffness: 260, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);

  // Holographic glare coordinates (0% to 100%) and opacity
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacityTarget = useMotionValue(0);
  const glareOpacity = useSpring(glareOpacityTarget, { stiffness: 220, damping: 22 });

  // Dynamic holographic specular gradient following mouse spotlight
  const glareBackground = useMotionTemplate`radial-gradient(circle 180px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.35) 0%, rgba(220, 230, 255, 0.16) 30%, rgba(255, 200, 240, 0.08) 55%, transparent 75%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || dragging) return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1

    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);
    glareX.set(x * 100);
    glareY.set(y * 100);
    glareOpacityTarget.set(1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    glareOpacityTarget.set(0);
  };

  return (
    <div className="relative flex w-[236px] shrink-0 flex-col items-center select-none pt-2 overflow-visible">
      {/* 1. Outer Entrance Container: Drop from top ("Jatuh" with spring bounce) */}
      <motion.div
        initial={reduceMotion ? false : { y: -160, opacity: 0, scale: 0.9, rotate: -4 }}
        animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                type: 'spring',
                stiffness: 190,
                damping: 14,
                mass: 1.1,
                delay: 0.15,
              }
        }
        className="relative flex flex-col items-center overflow-visible"
      >
        {/* 2. Floating Levitation Container ("Terus Melayang" with ceiling pendulum pivot) */}
        <motion.div
          animate={
            reduceMotion || dragging
              ? { y: 0, rotate: 0, rotateX: 0, rotateY: 0 }
              : {
                  y: [-6, 6, -6],
                  rotate: [-1.2, 1.2, -1.2],
                  rotateX: [1.5, -1.5, 1.5],
                  rotateY: [-2.5, 2.5, -2.5],
                }
          }
          transition={
            reduceMotion || dragging
              ? { duration: 0.25 }
              : {
                  duration: 5.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
          style={{
            transformStyle: 'preserve-3d',
            perspective: 1000,
            transformOrigin: '50% -320px',
          }}
          className="relative flex flex-col items-center overflow-visible"
        >
          {/* Real Lanyard Straps + Metallic Hardware Assembly */}
          <div className="relative flex flex-col items-center overflow-visible" aria-hidden="true">
            {/* The 2 Long Straps SVG extending off-screen above */}
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 overflow-visible">
              <svg
                width="140"
                height="560"
                viewBox="0 0 140 560"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]"
              >
                {/* Left Strap: Solid black ribbon ("hitam polos") */}
                <motion.path
                  d={
                    reduceMotion || dragging
                      ? LEFT_STRAP_REST
                      : [LEFT_STRAP_REST, LEFT_STRAP_SWAY_A, LEFT_STRAP_SWAY_B, LEFT_STRAP_REST]
                  }
                  transition={
                    reduceMotion || dragging
                      ? { duration: 0.2 }
                      : { duration: 5.4, repeat: Infinity, ease: 'easeInOut' }
                  }
                  stroke="#050505"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <motion.path
                  d={
                    reduceMotion || dragging
                      ? LEFT_STRAP_REST
                      : [LEFT_STRAP_REST, LEFT_STRAP_SWAY_A, LEFT_STRAP_SWAY_B, LEFT_STRAP_REST]
                  }
                  transition={
                    reduceMotion || dragging
                      ? { duration: 0.2 }
                      : { duration: 5.4, repeat: Infinity, ease: 'easeInOut' }
                  }
                  stroke="#18181B"
                  strokeWidth="9"
                  strokeLinecap="round"
                />

                {/* Right Strap: Solid black ribbon ("hitam polos") */}
                <motion.path
                  d={
                    reduceMotion || dragging
                      ? RIGHT_STRAP_REST
                      : [RIGHT_STRAP_REST, RIGHT_STRAP_SWAY_A, RIGHT_STRAP_SWAY_B, RIGHT_STRAP_REST]
                  }
                  transition={
                    reduceMotion || dragging
                      ? { duration: 0.2 }
                      : { duration: 5.4, repeat: Infinity, ease: 'easeInOut' }
                  }
                  stroke="#050505"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <motion.path
                  d={
                    reduceMotion || dragging
                      ? RIGHT_STRAP_REST
                      : [RIGHT_STRAP_REST, RIGHT_STRAP_SWAY_A, RIGHT_STRAP_SWAY_B, RIGHT_STRAP_REST]
                  }
                  transition={
                    reduceMotion || dragging
                      ? { duration: 0.2 }
                      : { duration: 5.4, repeat: Infinity, ease: 'easeInOut' }
                  }
                  stroke="#18181B"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Stealth Gunmetal Crimp Sleeve Band + Swivel Hook */}
            <div className="relative z-20 flex flex-col items-center">
              {/* Metallic Crimp Band wrapping around the two straps */}
              <div className="flex h-4 w-8 items-center justify-center rounded-xs border border-white/20 bg-gradient-to-r from-[#18181B] via-[#2E2E33] to-[#18181B] shadow-md">
                <span className="h-1.5 w-4 rounded-full bg-[#080808]/90" />
              </div>
              {/* Swivel metal loop */}
              <div className="-mt-0.5 h-3 w-3 rounded-full border-2 border-white/30 bg-[#121212]" />
              {/* Metallic lobster claw / swivel snap hook */}
              <div className="-mt-1 flex h-4.5 w-3 items-center justify-center rounded-sm border border-white/20 bg-gradient-to-b from-[#3F3F46] via-[#27272A] to-[#18181B] shadow-xs">
                <span className="h-2 w-0.5 rounded-full bg-[#080808]/70" />
              </div>
            </div>
          </div>

          {/* Draggable Badge Holder Assembly with 3D Tilt */}
          <motion.div
            ref={cardRef}
            drag={!reduceMotion}
            dragSnapToOrigin
            dragElastic={0.35}
            dragConstraints={{ left: -24, right: 24, top: -20, bottom: 24 }}
            dragTransition={{ bounceStiffness: 190, bounceDamping: 14 }}
            whileDrag={reduceMotion ? undefined : { scale: 1.04 }}
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => {
              setDragging(false);
              mouseX.set(0);
              mouseY.set(0);
              glareOpacityTarget.set(0);
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: reduceMotion ? 0 : rotateX,
              rotateY: reduceMotion ? 0 : rotateY,
              transformStyle: 'preserve-3d',
            }}
            className={`group relative -mt-1 flex flex-col items-center will-change-transform ${
              reduceMotion ? '' : 'cursor-grab active:cursor-grabbing'
            }`}
          >
            {/* Top Molded Hanger Tab with Slot-Punch Hole (where the hook latches) */}
            <div
              style={{ transform: 'translateZ(10px)' }}
              className="relative z-10 -mb-1.5 flex h-7 w-16 flex-col items-center justify-center rounded-t-xl border-t border-x border-white/20 bg-[#161618] shadow-sm transition-transform duration-200"
            >
              {/* The Oval Punch Hole Slot */}
              <div className="h-2 w-7 rounded-full border border-white/25 bg-[#080808] shadow-inner" />
            </div>

            {/* The Badge Holder Casing (outer protective shell) */}
            <div
              style={{ transformStyle: 'preserve-3d' }}
              className="relative flex h-[336px] w-[220px] flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#141416] p-2 shadow-[0_24px_64px_rgba(0,0,0,0.85)]"
            >
              {/* BorderBeam perimeter lighting around the holder */}
              <BorderBeam
                size={110}
                duration={10}
                colorFrom="#FFFFFF"
                colorTo="#52525B"
                borderWidth={1.5}
              />

              {/* Dynamic Interactive Holographic Glare Overlay following mouse cursor */}
              <motion.div
                aria-hidden="true"
                style={{
                  opacity: reduceMotion ? 0 : glareOpacity,
                  background: glareBackground,
                  transform: 'translateZ(24px)',
                }}
                className="pointer-events-none absolute inset-0 z-30 rounded-2xl mix-blend-overlay transition-opacity duration-200"
              />

              {/* Animated ambient holographic specular sheen sweep */}
              <motion.div
                aria-hidden="true"
                initial={{ x: '-160%' }}
                animate={{ x: '160%' }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 5,
                  duration: 1.8,
                  ease: 'easeInOut',
                }}
                className="pointer-events-none absolute inset-0 z-20 skew-x-[-22deg] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
              />

              {/* The Inside Card (matching the Behance layout in Titanium palette) */}
              <div
                style={{ transformStyle: 'preserve-3d' }}
                className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0C]"
              >
                {/* Top header strip */}
                <div
                  style={{ transform: 'translateZ(8px)' }}
                  className="flex items-center justify-between border-b border-white/10 bg-[#080808] px-3 py-1.5"
                >
                  <span className="font-mono text-[9px] font-bold tracking-wider text-white uppercase">
                    0xRIYANS
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[7.5px] font-semibold tracking-wider text-emerald-400 uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#10B981]" />
                    FREELANCE READY
                  </span>
                </div>

                {/* Main Card Body */}
                <div className="flex flex-1 flex-col items-center justify-between p-2.5">
                  {/* Centered Portrait Frame with 3D Parallax */}
                  <div
                    style={{ transform: 'translateZ(18px)' }}
                    className="relative mt-1 h-[98px] w-[98px] shrink-0 overflow-hidden rounded-xl border-2 border-white/20 bg-[#121212] shadow-md transition-transform duration-200"
                  >
                    <img
                      src={portraitSrc}
                      alt="Riyan Sugiarto portrait"
                      width={98}
                      height={98}
                      loading="eager"
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-cover object-top"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 rounded-xl border border-white/10"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Identity: Bold Name & Subtitle */}
                  <div
                    style={{ transform: 'translateZ(12px)' }}
                    className="text-center pt-1.5 transition-transform duration-200"
                  >
                    <p className="text-[13px] font-bold tracking-widest text-[#FFFFFF] uppercase">
                      {SITE.name}
                    </p>
                    <p className="text-[10px] font-semibold text-[#A1A1AA]">
                      Full-Stack Software Engineer
                    </p>
                  </div>

                  {/* Spec Info Table: Freelance Availability on Fiverr & Upwork (No Company) */}
                  <div
                    style={{ transform: 'translateZ(14px)' }}
                    className="w-full space-y-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-2.5 py-1.5 font-mono text-[9px] transition-transform duration-200"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-1">
                      <span className="text-[#71717A]">STATUS</span>
                      <span className="flex items-center gap-1 font-semibold text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#10B981]" />
                        Open for Freelance
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-1">
                      <span className="text-[#71717A]">PLATFORMS</span>
                      <span className="font-bold text-white tracking-tight">Fiverr · Upwork</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#71717A]">FOCUS</span>
                      <span className="font-semibold text-[#D4D4D8]">
                        Full-Stack &amp; End-to-End
                      </span>
                    </div>
                  </div>

                  {/* Bottom Strip: CSS security chip + Barcode + VALID tag */}
                  <div
                    style={{ transform: 'translateZ(10px)' }}
                    className="mt-1 flex w-full items-center justify-between border-t border-white/10 pt-2 transition-transform duration-200"
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-3.5 w-5 shrink-0 grid-cols-2 gap-[1px] rounded border border-white/20 bg-[#080808] p-[1.5px]"
                    >
                      <span className="rounded-[0.5px] bg-white/60" />
                      <span className="rounded-[0.5px] bg-white/30" />
                      <span className="rounded-[0.5px] bg-white/30" />
                      <span className="rounded-[0.5px] bg-white/60" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="mx-2 h-3 flex-1 rounded opacity-75"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(90deg, #FFFFFF 0px 1.5px, transparent 1.5px 3px, #FFFFFF 3px 4px, transparent 4px 5.5px, #E4E4E7 5.5px 7.5px, transparent 7.5px 9px)',
                      }}
                    />
                    <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[8px] font-bold text-emerald-400">
                      HIRE ME
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Ambient ground shadow that pulses with the levitation */}
        <motion.div
          aria-hidden="true"
          animate={
            reduceMotion || dragging
              ? { scale: 1, opacity: 0.3 }
              : {
                  scale: [0.85, 1.15, 0.85],
                  opacity: [0.2, 0.45, 0.2],
                }
          }
          transition={
            reduceMotion || dragging
              ? { duration: 0.25 }
              : {
                  duration: 5.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
          className="pointer-events-none -mt-2 h-3.5 w-40 rounded-full bg-black/70 blur-md"
        />
      </motion.div>
    </div>
  );
}
