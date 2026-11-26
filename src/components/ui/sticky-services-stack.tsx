'use client';

import React, { useId, useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export type StickyServicesTheme = 'auto' | 'light' | 'dark';
export type ServicePreviewVariant =
  | 'identities'
  | 'systems'
  | 'guidelines'
  | 'toolkits'
  | 'direction'
  | 'prototyping'
  | 'spatial'
  | 'designops';

export interface CardColorPalette {
  lightSurface: string;
  darkSurface: string;
  lightGradient: string;
  darkGradient: string;
  spotlightColor: string;
  accentDot: string;
  badgeClasses: string;
  numberGlow: string;
}

export interface ServiceStackItem {
  id: string;
  indexLabel?: string;
  category: string;
  headline: string;
  description: string;
  previewVariant?: ServicePreviewVariant;
  customPreview?: React.ReactNode;
  palette?: CardColorPalette;
}

export interface StickyServicesStackProps extends React.HTMLAttributes<HTMLElement> {
  sectionLabel?: string;
  sectionIntro?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  items?: ServiceStackItem[];
  cardCount?: number;
  theme?: StickyServicesTheme;
  enableStackDimming?: boolean;
  animatePreviews?: boolean;
}

export const CARD_PALETTES: CardColorPalette[] = [
  // 1. Acid Lime & Obsidian
  {
    lightSurface: 'bg-[#F9FAF5] text-zinc-950 border-black/10',
    darkSurface: 'bg-[#090B08] text-zinc-50 border-lime-400/15',
    lightGradient:
      'radial-gradient(80% 90% at 88% 12%, rgba(217, 249, 157, 0.75) 0%, rgba(236, 252, 203, 0.3) 50%, transparent 100%)',
    darkGradient:
      'radial-gradient(75% 85% at 86% 14%, rgba(163, 230, 53, 0.16) 0%, rgba(77, 124, 15, 0.08) 52%, transparent 100%)',
    spotlightColor: 'rgba(163, 230, 53, 0.12)',
    accentDot: 'bg-lime-400',
    badgeClasses:
      'border-lime-600/25 bg-lime-500/10 text-lime-950 dark:border-lime-400/25 dark:bg-lime-400/10 dark:text-lime-300',
    numberGlow: 'dark:text-lime-50',
  },
  // 2. Electric Cobalt & Midnight
  {
    lightSurface: 'bg-[#F5F8FF] text-zinc-950 border-black/10',
    darkSurface: 'bg-[#080A11] text-zinc-50 border-blue-400/15',
    lightGradient:
      'radial-gradient(80% 90% at 85% 15%, rgba(147, 197, 253, 0.72) 0%, rgba(199, 210, 254, 0.35) 50%, transparent 100%)',
    darkGradient:
      'radial-gradient(75% 85% at 85% 15%, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.09) 55%, transparent 100%)',
    spotlightColor: 'rgba(59, 130, 246, 0.14)',
    accentDot: 'bg-blue-400',
    badgeClasses:
      'border-blue-600/25 bg-blue-500/10 text-blue-950 dark:border-blue-400/25 dark:bg-blue-400/10 dark:text-blue-300',
    numberGlow: 'dark:text-blue-50',
  },
  // 3. Sunset Coral & Espresso
  {
    lightSurface: 'bg-[#FDF7F4] text-zinc-950 border-black/10',
    darkSurface: 'bg-[#0F0908] text-zinc-50 border-orange-400/15',
    lightGradient:
      'radial-gradient(80% 90% at 88% 14%, rgba(253, 186, 116, 0.68) 0%, rgba(254, 205, 211, 0.4) 50%, transparent 100%)',
    darkGradient:
      'radial-gradient(75% 85% at 88% 14%, rgba(249, 115, 22, 0.18) 0%, rgba(244, 63, 94, 0.08) 55%, transparent 100%)',
    spotlightColor: 'rgba(249, 115, 22, 0.13)',
    accentDot: 'bg-orange-400',
    badgeClasses:
      'border-orange-600/25 bg-orange-500/10 text-orange-950 dark:border-orange-400/25 dark:bg-orange-400/10 dark:text-orange-300',
    numberGlow: 'dark:text-orange-50',
  },
  // 4. Emerald Mint & Deep Teal
  {
    lightSurface: 'bg-[#F3FAF8] text-zinc-950 border-black/10',
    darkSurface: 'bg-[#070E0C] text-zinc-50 border-emerald-400/15',
    lightGradient:
      'radial-gradient(80% 90% at 86% 15%, rgba(110, 231, 183, 0.65) 0%, rgba(165, 243, 252, 0.35) 50%, transparent 100%)',
    darkGradient:
      'radial-gradient(75% 85% at 86% 15%, rgba(16, 185, 129, 0.18) 0%, rgba(6, 182, 212, 0.08) 55%, transparent 100%)',
    spotlightColor: 'rgba(16, 185, 129, 0.13)',
    accentDot: 'bg-emerald-400',
    badgeClasses:
      'border-emerald-600/25 bg-emerald-500/10 text-emerald-950 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-300',
    numberGlow: 'dark:text-emerald-50',
  },
  // 5. Hyper Violet & Plum Obsidian
  {
    lightSurface: 'bg-[#F8F6FC] text-zinc-950 border-black/10',
    darkSurface: 'bg-[#0B0810] text-zinc-50 border-purple-400/15',
    lightGradient:
      'radial-gradient(80% 90% at 88% 14%, rgba(216, 180, 254, 0.72) 0%, rgba(245, 208, 254, 0.38) 50%, transparent 100%)',
    darkGradient:
      'radial-gradient(75% 85% at 88% 14%, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.09) 55%, transparent 100%)',
    spotlightColor: 'rgba(168, 85, 247, 0.14)',
    accentDot: 'bg-purple-400',
    badgeClasses:
      'border-purple-600/25 bg-purple-500/10 text-purple-950 dark:border-purple-400/25 dark:bg-purple-400/10 dark:text-purple-300',
    numberGlow: 'dark:text-purple-50',
  },
  // 6. Electric Cyan & Abyssal Slate
  {
    lightSurface: 'bg-[#F2FAFD] text-zinc-950 border-black/10',
    darkSurface: 'bg-[#070C10] text-zinc-50 border-cyan-400/15',
    lightGradient:
      'radial-gradient(80% 90% at 85% 15%, rgba(103, 232, 249, 0.65) 0%, rgba(186, 230, 253, 0.35) 50%, transparent 100%)',
    darkGradient:
      'radial-gradient(75% 85% at 85% 15%, rgba(6, 182, 212, 0.19) 0%, rgba(14, 165, 233, 0.08) 55%, transparent 100%)',
    spotlightColor: 'rgba(6, 182, 212, 0.14)',
    accentDot: 'bg-cyan-400',
    badgeClasses:
      'border-cyan-600/25 bg-cyan-500/10 text-cyan-950 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300',
    numberGlow: 'dark:text-cyan-50',
  },
  // 7. Crimson Rose & Velvet Noir
  {
    lightSurface: 'bg-[#FDF5F7] text-zinc-950 border-black/10',
    darkSurface: 'bg-[#10080B] text-zinc-50 border-rose-400/15',
    lightGradient:
      'radial-gradient(80% 90% at 87% 13%, rgba(253, 164, 175, 0.68) 0%, rgba(254, 205, 211, 0.36) 50%, transparent 100%)',
    darkGradient:
      'radial-gradient(75% 85% at 87% 13%, rgba(244, 63, 94, 0.19) 0%, rgba(225, 29, 72, 0.08) 55%, transparent 100%)',
    spotlightColor: 'rgba(244, 63, 94, 0.13)',
    accentDot: 'bg-rose-400',
    badgeClasses:
      'border-rose-600/25 bg-rose-500/10 text-rose-950 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-300',
    numberGlow: 'dark:text-rose-50',
  },
  // 8. Solar Gold & Smoked Bronze
  {
    lightSurface: 'bg-[#FCF9F2] text-zinc-950 border-black/10',
    darkSurface: 'bg-[#0E0C08] text-zinc-50 border-amber-400/15',
    lightGradient:
      'radial-gradient(80% 90% at 86% 14%, rgba(252, 211, 77, 0.68) 0%, rgba(254, 240, 138, 0.35) 50%, transparent 100%)',
    darkGradient:
      'radial-gradient(75% 85% at 86% 14%, rgba(245, 158, 11, 0.18) 0%, rgba(217, 119, 6, 0.08) 55%, transparent 100%)',
    spotlightColor: 'rgba(245, 158, 11, 0.13)',
    accentDot: 'bg-amber-400',
    badgeClasses:
      'border-amber-600/25 bg-amber-500/10 text-amber-950 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-300',
    numberGlow: 'dark:text-amber-50',
  },
];

function NoiseTextureOverlay({
  isDarkForced,
  isLightForced,
}: {
  isDarkForced: boolean;
  isLightForced: boolean;
}) {
  const filterId = useId();
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 z-[2] overflow-hidden mix-blend-overlay',
        isDarkForced
          ? 'opacity-[0.26]'
          : isLightForced
            ? 'opacity-[0.3]'
            : 'opacity-[0.3] dark:opacity-[0.26]',
      )}
    >
      <svg className="h-full w-full">
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>
    </div>
  );
}

export const DEFAULT_SERVICE_ITEMS: ServiceStackItem[] = [
  {
    id: 'identities',
    indexLabel: '1',
    category: '(Identities)',
    headline: 'Creating motion identities that are compelling and distinct.',
    description:
      'We craft motion identities that embody the core and character of brands. Each identity is created with intention—to be distinct, differentiated, compelling and scalable into broader systems.',
    previewVariant: 'identities',
  },
  {
    id: 'systems',
    indexLabel: '2',
    category: '(Systems)',
    headline: 'Building motion systems that scale your identity.',
    description:
      'We build motion systems that scale harmoniously across formats, teams, and touchpoints, ensuring consistency through detailed guidelines and toolkits.',
    previewVariant: 'systems',
  },
  {
    id: 'guidelines',
    indexLabel: '3',
    category: '(Guidelines)',
    headline: 'Developing motion guidelines that ensure consistency and excellence.',
    description:
      'We develop best practices and documentation that empower internal and external teams to ensure the identity is consistent and output at the highest of standards.',
    previewVariant: 'guidelines',
  },
  {
    id: 'toolkits',
    indexLabel: '4',
    category: '(Toolkits)',
    headline: 'Delivering production-ready motion toolkits for product teams.',
    description:
      'We translate motion principles into reusable code tokens, easing curves, and component libraries—bridging design and engineering without friction.',
    previewVariant: 'toolkits',
  },
  {
    id: 'direction',
    indexLabel: '5',
    category: '(Direction)',
    headline: 'Directing launch films and kinetic moments that move audiences.',
    description:
      'We art-direct flagship brand films, product reveals, and interactive web moments built to capture attention and elevate every launch.',
    previewVariant: 'direction',
  },
  {
    id: 'prototyping',
    indexLabel: '6',
    category: '(Prototyping)',
    headline: 'Validating tactile micro-interactions before a single line ships.',
    description:
      'We build high-frequency interactive prototypes with real physics, gesture responsiveness, and haptic timing to de-risk complex product flows.',
    previewVariant: 'prototyping',
  },
  {
    id: 'spatial',
    indexLabel: '7',
    category: '(3D & WebGL)',
    headline: 'Crafting real-time shaders and spatial experiences for the web.',
    description:
      'We blend GPU-accelerated shaders, depth-aware lighting, and 60fps canvas choreography to create signature digital flagships.',
    previewVariant: 'spatial',
  },
  {
    id: 'designops',
    indexLabel: '8',
    category: '(Design Ops)',
    headline: 'Automating motion tokens from Figma straight to production repos.',
    description:
      'We wire versioned animation specs, spring presets, and automated visual regression pipelines so design and code never drift apart.',
    previewVariant: 'designops',
  },
];

const EDITORIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface PreviewMediaProps {
  variant: ServicePreviewVariant;
  animate: boolean;
  prefersReducedMotion: boolean;
}

function ServicePreviewMedia({ variant, animate, prefersReducedMotion }: PreviewMediaProps) {
  const hoverMotion = prefersReducedMotion ? undefined : { y: -3, scale: 1.025 };

  if (variant === 'identities') {
    return (
      <motion.div
        whileHover={hoverMotion}
        transition={{ type: 'spring', stiffness: 360, damping: 24 }}
        className="relative flex aspect-[16/9] w-[205px] items-center justify-center overflow-hidden rounded-[8px] border border-white/15 bg-[#E2FF65] text-[#09090B] shadow-lg shadow-black/30 sm:w-[224px]"
        aria-hidden="true"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[#0B33FF]"
          animate={
            animate
              ? {
                  opacity: [0, 0, 1, 1, 0],
                }
              : { opacity: 0 }
          }
          transition={
            animate
              ? {
                  duration: 6,
                  times: [0, 0.62, 0.68, 0.9, 0.96],
                  repeat: Infinity,
                  ease: EDITORIAL_EASE,
                }
              : undefined
          }
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-start px-5"
          animate={
            animate
              ? {
                  opacity: [1, 1, 0, 0, 1],
                  x: [0, 12, 24, -12, 0],
                }
              : { opacity: 0 }
          }
          transition={
            animate
              ? {
                  duration: 6,
                  times: [0, 0.25, 0.34, 0.92, 1],
                  repeat: Infinity,
                  ease: EDITORIAL_EASE,
                }
              : undefined
          }
        >
          <svg viewBox="0 0 48 32" className="h-9 w-12 text-[#09090B]" fill="currentColor">
            <path d="M4 4h7l9 12-9 12H4l9-12L4 4zm17 0h8l9 12-9 12h-8l9-12-9-12z" />
          </svg>
        </motion.div>

        <motion.div
          className="relative z-10 flex items-center gap-2.5 px-4"
          animate={
            animate
              ? {
                  opacity: [0, 0, 1, 1, 0, 0],
                  y: [8, 8, 0, 0, -6, 8],
                }
              : { opacity: 1, y: 0 }
          }
          transition={
            animate
              ? {
                  duration: 6,
                  times: [0, 0.26, 0.36, 0.6, 0.68, 1],
                  repeat: Infinity,
                  ease: EDITORIAL_EASE,
                }
              : undefined
          }
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-[#09090B] text-[#E2FF65]">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 17l-5-5 5-5" />
              <path d="M18 17l-5-5 5-5" />
            </svg>
          </div>
          <div className="flex flex-col leading-[0.94] font-semibold tracking-[-0.03em] text-[#09090B]">
            <span className="text-[17px]">Back</span>
            <span className="text-[17px]">Market</span>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (variant === 'systems') {
    const tiles = [
      { bg: 'bg-gradient-to-br from-[#1D4ED8] to-[#7C3AED]', label: '' },
      { bg: 'bg-[#0F172A]', shape: 'arc' as const },
      { bg: 'bg-[#F8FAFC] text-[#0F172A]', label: 'e', accent: 'text-[#EF4444]' },
      { bg: 'bg-[#F8FAFC] text-[#0F172A]', label: 'X', accent: 'text-[#F59E0B]' },
      { bg: 'bg-gradient-to-tr from-[#2563EB] to-[#38BDF8]', label: '' },
      { bg: 'bg-[#020617]', shape: 'cross' as const },
      { bg: 'bg-gradient-to-br from-[#064E3B] to-[#0EA5E9]', shape: 'orb' as const },
      { bg: 'bg-[#111827] text-white', label: 'H' },
    ];

    return (
      <motion.div
        whileHover={hoverMotion}
        transition={{ type: 'spring', stiffness: 360, damping: 24 }}
        className="relative grid aspect-[16/9] w-[205px] grid-cols-4 grid-rows-2 gap-1 overflow-hidden rounded-[8px] border border-white/15 bg-[#09090B] p-1.5 shadow-lg shadow-black/30 sm:w-[224px]"
        aria-hidden="true"
      >
        {tiles.map((tile, idx) => (
          <motion.div
            key={idx}
            className={cn(
              'relative flex items-center justify-center overflow-hidden rounded-[3px] text-[13px] font-bold tracking-tight',
              tile.bg,
            )}
            animate={
              animate
                ? {
                    opacity: [0.85, 1, 0.85],
                    scale: [1, 1.03, 1],
                  }
                : undefined
            }
            transition={
              animate
                ? {
                    duration: 3.4,
                    delay: idx * 0.16,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : undefined
            }
          >
            {tile.shape === 'arc' && (
              <svg viewBox="0 0 24 24" className="h-5 w-5">
                <path d="M4 20A16 16 0 0 1 20 4v16H4Z" fill="#3B82F6" />
                <circle cx="15" cy="15" r="4" fill="#FACC15" />
              </svg>
            )}
            {tile.shape === 'cross' && (
              <svg viewBox="0 0 24 24" className="h-4 w-4">
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="#38BDF8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {tile.shape === 'orb' && (
              <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-[#22C55E] via-[#0EA5E9] to-[#A855F7]" />
            )}
            {tile.label && <span className={tile.accent}>{tile.label}</span>}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (variant === 'guidelines') {
    const pills = [
      'bg-[#3B82F6]',
      'bg-[#14B8A6]',
      'bg-[#22C55E]',
      'bg-[#F97316]',
      'bg-[#EC4899]',
      'bg-[#8B5CF6]',
    ];

    return (
      <motion.div
        whileHover={hoverMotion}
        transition={{ type: 'spring', stiffness: 360, damping: 24 }}
        className="relative aspect-[16/9] w-[205px] overflow-hidden rounded-[8px] border border-white/15 bg-gradient-to-br from-[#4338CA] via-[#2563EB] to-[#06B6D4] p-[4px] shadow-lg shadow-black/30 sm:w-[224px]"
        aria-hidden="true"
      >
        <div className="flex h-full w-full flex-col justify-between rounded-[4px] bg-white p-2.5 text-[#0F172A]">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] leading-[1.1] font-semibold tracking-[-0.02em] text-[#4338CA]">
              How does
              <br />
              Canva move?
            </span>
            <span className="mt-1 h-[2px] w-10 rounded-full bg-slate-200" />
            <span className="h-[2px] w-7 rounded-full bg-slate-200" />
          </div>
          <div className="flex flex-col items-end gap-[2px]">
            {pills.map((pillColor, idx) => (
              <motion.span
                key={pillColor}
                className={cn('h-[6px] w-5 rounded-full', pillColor)}
                style={{ marginRight: `${(pills.length - 1 - idx) * 9}px` }}
                animate={
                  animate
                    ? {
                        x: [0, 4, 0],
                      }
                    : undefined
                }
                transition={
                  animate
                    ? {
                        duration: 2.8,
                        delay: idx * 0.12,
                        repeat: Infinity,
                        ease: EDITORIAL_EASE,
                      }
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'toolkits') {
    return (
      <motion.div
        whileHover={hoverMotion}
        transition={{ type: 'spring', stiffness: 360, damping: 24 }}
        className="relative flex aspect-[16/9] w-[205px] flex-col justify-between overflow-hidden rounded-[8px] border border-white/15 bg-[#111114] p-3 text-white shadow-lg shadow-black/30 sm:w-[224px]"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between text-[9px] font-medium tracking-tight text-zinc-400">
          <span>ease.editorial</span>
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[8px] text-zinc-200">0.65s</span>
        </div>

        <svg viewBox="0 0 160 52" className="h-12 w-full overflow-visible">
          <path
            d="M4 46 C 36 46, 48 6, 156 6"
            fill="none"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="1.5"
          />
          <motion.path
            d="M4 46 C 36 46, 48 6, 156 6"
            fill="none"
            stroke="#A3E635"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0.25 }}
            animate={animate ? { pathLength: [0.15, 1, 0.15] } : { pathLength: 1 }}
            transition={
              animate ? { duration: 3.8, repeat: Infinity, ease: EDITORIAL_EASE } : undefined
            }
          />
          <motion.circle
            r="3.5"
            fill="#FFFFFF"
            cx="4"
            cy="46"
            animate={
              animate
                ? {
                    cx: [4, 54, 156, 4],
                    cy: [46, 14, 6, 46],
                  }
                : { cx: 156, cy: 6 }
            }
            transition={
              animate ? { duration: 3.8, repeat: Infinity, ease: EDITORIAL_EASE } : undefined
            }
          />
        </svg>

        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
          <span className="text-[9px] text-zinc-400">cubic-bezier(0.16, 1, 0.3, 1)</span>
        </div>
      </motion.div>
    );
  }

  if (variant === 'direction') {
    return (
      <motion.div
        whileHover={hoverMotion}
        transition={{ type: 'spring', stiffness: 360, damping: 24 }}
        className="relative flex aspect-[16/9] w-[205px] flex-col justify-between overflow-hidden rounded-[8px] border border-white/15 bg-[#18181B] p-3 text-white shadow-lg shadow-black/30 sm:w-[224px]"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between text-[9px] tracking-wider text-zinc-400 uppercase">
          <span className="flex items-center gap-1.5">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-rose-500"
              animate={animate ? { opacity: [1, 0.25, 1] } : undefined}
              transition={animate ? { duration: 1.4, repeat: Infinity } : undefined}
            />
            REEL 05
          </span>
          <span className="font-mono text-[9px] text-zinc-300">00:14:08</span>
        </div>

        <div className="flex items-center justify-center">
          <span className="text-[15px] font-semibold tracking-[-0.03em] text-white">
            Brand Film
          </span>
        </div>

        <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="h-full rounded-full bg-white"
            animate={animate ? { width: ['12%', '88%', '12%'] } : { width: '64%' }}
            transition={
              animate ? { duration: 4.5, repeat: Infinity, ease: 'easeInOut' } : undefined
            }
          />
        </div>
      </motion.div>
    );
  }

  if (variant === 'prototyping') {
    return (
      <motion.div
        whileHover={hoverMotion}
        transition={{ type: 'spring', stiffness: 360, damping: 24 }}
        className="relative flex aspect-[16/9] w-[205px] flex-col justify-between overflow-hidden rounded-[8px] border border-cyan-400/20 bg-[#0B1218] p-3 text-white shadow-lg shadow-black/30 sm:w-[224px]"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between text-[9px] font-mono text-cyan-300/80">
          <span>SPRING.STIFF</span>
          <span>420 / 28</span>
        </div>

        <div className="relative flex items-center justify-center py-1">
          <motion.div
            className="flex h-8 w-24 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/15 text-[11px] font-medium text-cyan-200"
            animate={
              animate
                ? {
                    scale: [1, 0.92, 1.06, 1],
                  }
                : undefined
            }
            transition={
              animate
                ? {
                    duration: 2.6,
                    repeat: Infinity,
                    ease: EDITORIAL_EASE,
                  }
                : undefined
            }
          >
            Tap & Hold
          </motion.div>
          <motion.span
            className="pointer-events-none absolute h-8 w-24 rounded-full border border-cyan-300/50"
            animate={
              animate
                ? {
                    scale: [1, 1.35],
                    opacity: [0.65, 0],
                  }
                : { opacity: 0 }
            }
            transition={
              animate
                ? {
                    duration: 2.6,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }
                : undefined
            }
          />
        </div>

        <div className="flex items-center justify-between text-[9px] text-zinc-400">
          <span>120fps Gesture</span>
          <span className="text-cyan-400">Active</span>
        </div>
      </motion.div>
    );
  }

  if (variant === 'spatial') {
    return (
      <motion.div
        whileHover={hoverMotion}
        transition={{ type: 'spring', stiffness: 360, damping: 24 }}
        className="relative flex aspect-[16/9] w-[205px] flex-col justify-between overflow-hidden rounded-[8px] border border-rose-400/20 bg-[#140B10] p-3 text-white shadow-lg shadow-black/30 sm:w-[224px]"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between text-[9px] font-mono text-rose-300/80">
          <span>GLSL // FRAG</span>
          <span>60 FPS</span>
        </div>

        <div className="relative flex items-center justify-center">
          <motion.div
            className="h-11 w-11 rounded-full bg-gradient-to-tr from-rose-500 via-fuchsia-500 to-amber-300 blur-[0.5px]"
            animate={
              animate
                ? {
                    rotate: [0, 180, 360],
                    scale: [1, 1.12, 1],
                  }
                : undefined
            }
            transition={
              animate
                ? {
                    duration: 7,
                    repeat: Infinity,
                    ease: 'linear',
                  }
                : undefined
            }
          />
          <div className="absolute h-12 w-20 rounded-full border border-white/25 [transform:rotateX(68deg)]" />
        </div>

        <div className="flex items-center justify-between text-[9px] text-zinc-400">
          <span>WebGL2 Mesh</span>
          <span className="font-mono text-rose-300">uTime</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={hoverMotion}
      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
      className="relative flex aspect-[16/9] w-[205px] flex-col justify-between overflow-hidden rounded-[8px] border border-amber-400/20 bg-[#13100A] p-3 text-white shadow-lg shadow-black/30 sm:w-[224px]"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between text-[9px] font-mono text-amber-300/80">
        <span>tokens.json</span>
        <span className="rounded bg-amber-400/15 px-1.5 py-0.5 text-[8px] text-amber-200">
          v2.4
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 px-1">
        <div className="rounded border border-white/15 bg-white/5 px-2 py-1 text-[9px] font-medium text-zinc-200">
          Figma
        </div>
        <div className="relative h-[2px] flex-1 overflow-hidden bg-white/15">
          <motion.div
            className="h-full w-1/2 bg-amber-400"
            animate={animate ? { x: ['-100%', '200%'] } : undefined}
            transition={
              animate ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } : undefined
            }
          />
        </div>
        <div className="rounded border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-[9px] font-medium text-amber-200">
          React
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[9px] text-zinc-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span>Synced 24 motion primitives</span>
      </div>
    </motion.div>
  );
}

interface StickyServiceCardProps {
  item: ServiceStackItem;
  index: number;
  total: number;
  enableStackDimming: boolean;
  animatePreviews: boolean;
  prefersReducedMotion: boolean;
  isDarkForced: boolean;
  isLightForced: boolean;
}

function StickyServiceCard({
  item,
  index,
  total,
  enableStackDimming,
  animatePreviews,
  prefersReducedMotion,
  isDarkForced,
  isLightForced,
}: StickyServiceCardProps) {
  const cardRef = useRef<HTMLLIElement>(null);
  const headingId = useId();
  const isLast = index === total - 1;

  const palette = item.palette ?? CARD_PALETTES[index % CARD_PALETTES.length];

  // Mouse-tracking spotlight motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(520px circle at ${mouseX}px ${mouseY}px, ${palette.spotlightColor}, transparent 75%)`;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 26,
    mass: 0.25,
  });

  const shouldDim = enableStackDimming && !prefersReducedMotion && !isLast;

  const overlayOpacity = useTransform(smoothProgress, [0.08, 0.88], shouldDim ? [0, 1] : [0, 0]);

  const cardScale = useTransform(smoothProgress, [0.08, 0.92], shouldDim ? [1, 0.968] : [1, 1]);

  const cardY = useTransform(smoothProgress, [0.08, 0.92], shouldDim ? [0, -14] : [0, 0]);

  const numberParallaxY = useTransform(
    smoothProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -24],
  );

  const surfaceClasses = isDarkForced
    ? palette.darkSurface
    : isLightForced
      ? palette.lightSurface
      : `${palette.lightSurface} dark:${palette.darkSurface.split(' ').join(' dark:')}`;

  const mutedTextClasses = isDarkForced
    ? 'text-zinc-400'
    : isLightForced
      ? 'text-zinc-600'
      : 'text-zinc-600 dark:text-zinc-400';

  const dimOverlayClasses = isDarkForced
    ? 'bg-[#050507]/65 backdrop-blur-[1.5px]'
    : isLightForced
      ? 'bg-zinc-900/14 backdrop-blur-[1px]'
      : 'bg-zinc-900/14 backdrop-blur-[1px] dark:bg-[#050507]/65 dark:backdrop-blur-[1.5px]';

  return (
    <li ref={cardRef} className="sticky top-0 list-none" style={{ zIndex: index + 1 }}>
      <motion.article
        aria-labelledby={headingId}
        onMouseMove={handleMouseMove}
        style={{
          scale: cardScale,
          y: cardY,
          transformOrigin: 'top center',
        }}
        className={cn(
          'group relative w-full overflow-hidden border-t will-change-transform',
          index > 0 &&
            'shadow-[0_-14px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_-18px_48px_rgba(0,0,0,0.72)]',
          surfaceClasses,
        )}
      >
        {/* Top subtle highlight line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60"
        />

        {/* Mesh gradients */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 z-[1]',
            isDarkForced ? 'hidden' : isLightForced ? 'block' : 'block dark:hidden',
          )}
          style={{ background: palette.lightGradient }}
        />
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 z-[1]',
            isDarkForced ? 'block' : isLightForced ? 'hidden' : 'hidden dark:block',
          )}
          style={{ background: palette.darkGradient }}
        />

        {/* Mouse spotlight */}
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: spotlightBg }}
          />
        )}

        {/* Noise overlay */}
        <NoiseTextureOverlay isDarkForced={isDarkForced} isLightForced={isLightForced} />

        {/* Scroll stack dimming overlay */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: overlayOpacity }}
          className={cn('pointer-events-none absolute inset-0 z-20', dimOverlayClasses)}
        />

        {/* Main content grid */}
        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-y-6 px-6 pt-8 pb-16 sm:px-10 sm:pt-10 sm:pb-24 md:grid-cols-12 md:gap-x-6">
          <div className="overflow-hidden md:col-span-3">
            <motion.span
              style={{ y: numberParallaxY }}
              initial={prefersReducedMotion ? false : { y: '45%', opacity: 0, filter: 'blur(6px)' }}
              whileInView={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.72, ease: EDITORIAL_EASE }}
              className={cn(
                'block text-[4.5rem] leading-[0.84] font-medium tracking-[-0.05em] tabular-nums select-none sm:text-[6.5rem] lg:text-[8.75rem]',
                palette.numberGlow,
              )}
              aria-hidden="true"
            >
              {item.indexLabel ?? String(index + 1)}
            </motion.span>
          </div>

          <div className="overflow-hidden md:col-span-2 md:pt-1">
            <motion.span
              initial={prefersReducedMotion ? false : { y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.55,
                delay: 0.05,
                ease: EDITORIAL_EASE,
              }}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium tracking-[-0.01em] backdrop-blur-xs sm:text-[13px]',
                palette.badgeClasses,
              )}
            >
              <motion.span
                animate={
                  animatePreviews && !prefersReducedMotion
                    ? { scale: [1, 1.35, 1], opacity: [0.8, 1, 0.8] }
                    : undefined
                }
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={cn('h-1.5 w-1.5 rounded-full', palette.accentDot)}
              />
              {item.category}
            </motion.span>
          </div>

          <div className="flex flex-col md:col-span-7">
            <div className="overflow-hidden">
              <motion.h3
                id={headingId}
                initial={
                  prefersReducedMotion ? false : { y: '32%', opacity: 0, filter: 'blur(4px)' }
                }
                whileInView={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.7,
                  delay: 0.08,
                  ease: EDITORIAL_EASE,
                }}
                className="max-w-[560px] text-[1.625rem] leading-[1.08] font-medium tracking-[-0.03em] sm:text-[2.125rem] lg:text-[2.5rem]"
              >
                {item.headline}
              </motion.h3>
            </div>

            <motion.div
              initial={prefersReducedMotion ? false : { y: 18, scale: 0.96, opacity: 0 }}
              whileInView={{ y: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 24,
                delay: 0.12,
              }}
              className="mt-8 mb-8"
            >
              {item.customPreview ? (
                item.customPreview
              ) : (
                <ServicePreviewMedia
                  variant={item.previewVariant ?? 'identities'}
                  animate={animatePreviews && !prefersReducedMotion}
                  prefersReducedMotion={prefersReducedMotion}
                />
              )}
            </motion.div>

            <motion.p
              initial={prefersReducedMotion ? false : { y: 14, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.62,
                delay: 0.18,
                ease: EDITORIAL_EASE,
              }}
              className={cn(
                'max-w-[500px] text-[12.5px] leading-[1.55] font-normal sm:text-[13.5px]',
                mutedTextClasses,
              )}
            >
              {item.description}
            </motion.p>
          </div>
        </div>
      </motion.article>
    </li>
  );
}

export const StickyServicesStack = React.forwardRef<HTMLElement, StickyServicesStackProps>(
  (
    {
      sectionLabel = '(Services)',
      sectionIntro = 'From core brand foundations to cross-functional moments.',
      ctaLabel = "Let's work together",
      ctaHref = '#contact',
      onCtaClick,
      items = DEFAULT_SERVICE_ITEMS,
      cardCount,
      theme = 'dark',
      enableStackDimming = true,
      animatePreviews = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const prefersReducedMotion = Boolean(useReducedMotion());
    const sectionTitleId = useId();
    const containerRef = useRef<HTMLElement>(null);

    const isDarkForced = theme === 'dark';
    const isLightForced = theme === 'light';

    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ['start start', 'end end'],
    });

    const scaleX = useSpring(scrollYProgress, {
      stiffness: 180,
      damping: 30,
      restDelta: 0.001,
    });

    const containerThemeClasses = isDarkForced
      ? 'bg-[#09090B] text-zinc-50'
      : isLightForced
        ? 'bg-white text-zinc-950'
        : 'bg-white text-zinc-950 dark:bg-[#09090B] dark:text-zinc-50';

    const baseItems = items.length > 0 ? items : DEFAULT_SERVICE_ITEMS;
    const clampedCount =
      typeof cardCount === 'number' && Number.isFinite(cardCount)
        ? Math.max(1, Math.min(baseItems.length, Math.round(cardCount)))
        : baseItems.length;
    const visibleItems = baseItems.slice(0, clampedCount);

    return (
      <section
        ref={node => {
          (containerRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        aria-labelledby={sectionTitleId}
        className={cn('relative w-full font-sans antialiased', containerThemeClasses, className)}
        style={{
          fontFamily: '"Plus Jakarta Sans", "Inter", "Helvetica Neue", Arial, sans-serif',
        }}
        {...rest}
      >
        {/* Top scroll progress bar */}
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="sticky top-0 z-50 h-[2px] w-full origin-left bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 opacity-80"
          />
        )}

        <header className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-y-4 px-6 pt-10 pb-14 sm:px-10 sm:pt-12 sm:pb-20 md:grid-cols-12 md:items-start md:gap-x-6">
          <div className="md:col-span-5">
            <h2
              id={sectionTitleId}
              className="text-[12.5px] font-medium tracking-[-0.01em] text-zinc-400 sm:text-[13px]"
            >
              {sectionLabel}
            </h2>
          </div>

          <div className="md:col-span-4">
            <p className="max-w-[260px] text-[12.5px] leading-[1.38] font-medium tracking-[-0.01em] sm:text-[13px]">
              {sectionIntro}
            </p>
          </div>

          <div className="md:col-span-3 md:flex md:justify-end">
            {ctaLabel && (
              <motion.a
                whileHover={prefersReducedMotion ? undefined : { x: 2 }}
                href={ctaHref}
                onClick={onCtaClick}
                className={cn(
                  'inline-flex items-center gap-1.5 border-b pb-0.5 text-[12.5px] font-medium tracking-[-0.01em] transition-opacity duration-200 hover:opacity-75 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-[13px]',
                  isDarkForced
                    ? 'border-zinc-50 focus-visible:ring-zinc-400 focus-visible:ring-offset-[#09090B]'
                    : isLightForced
                      ? 'border-zinc-950 focus-visible:ring-zinc-900 focus-visible:ring-offset-white'
                      : 'border-zinc-950 focus-visible:ring-zinc-900 focus-visible:ring-offset-white dark:border-zinc-50 dark:focus-visible:ring-zinc-400 dark:focus-visible:ring-offset-[#09090B]',
                )}
              >
                <span>{ctaLabel}</span>
                <span aria-hidden="true">↗</span>
              </motion.a>
            )}
          </div>
        </header>

        <ol className="relative m-0 flex flex-col p-0">
          {visibleItems.map((item, idx) => (
            <StickyServiceCard
              key={item.id}
              item={item}
              index={idx}
              total={visibleItems.length}
              enableStackDimming={enableStackDimming}
              animatePreviews={animatePreviews}
              prefersReducedMotion={prefersReducedMotion}
              isDarkForced={isDarkForced}
              isLightForced={isLightForced}
            />
          ))}
        </ol>
      </section>
    );
  },
);

StickyServicesStack.displayName = 'StickyServicesStack';

export { StickyServicesStack as component, StickyServicesStack as Component };
export default StickyServicesStack;
