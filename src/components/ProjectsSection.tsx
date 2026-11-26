import React, { useEffect, useId, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { GRID_PROJECTS, IMPACT_METRICS, type ProjectItem } from '../lib/config';
import { HeroMetricTicker } from './HeroMotion';

export interface ProjectImageAsset {
  src: string;
  srcSet?: string;
}

interface ProjectsSectionProps {
  screenshots: Record<string, ProjectImageAsset>;
}

interface ActiveModalData {
  src: string;
  srcSet?: string;
  title: string;
  company: string;
  category?: string;
  description: string;
  external?: string;
}

const VIEWPORT = { once: true, amount: 0.15 } as const;
const EDITORIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ProjectSheetPalette {
  accent: string;
  accentText: string;
  badgeClasses: string;
  spotlightColor: string;
  numberGlow: string;
  gradient: string;
  urlHost: string;
}

const SHEET_PALETTES: Record<string, ProjectSheetPalette> = {
  'portal-bisnis-askrindo': {
    accent: '#FFFFFF',
    accentText: 'text-white',
    badgeClasses: 'bg-white/[0.06] text-[#E4E4E7]',
    spotlightColor: 'rgba(255, 255, 255, 0.08)',
    numberGlow: 'text-white/20 group-hover:text-white/45',
    gradient: 'radial-gradient(75% 85% at 85% 15%, rgba(255, 255, 255, 0.04) 0%, transparent 100%)',
    urlHost: 'insurtech.askrindo.co.id',
  },
  fortify: {
    accent: '#FFFFFF',
    accentText: 'text-white',
    badgeClasses: 'bg-white/[0.06] text-[#E4E4E7]',
    spotlightColor: 'rgba(255, 255, 255, 0.08)',
    numberGlow: 'text-white/20 group-hover:text-white/45',
    gradient: 'radial-gradient(75% 85% at 86% 14%, rgba(255, 255, 255, 0.04) 0%, transparent 100%)',
    urlHost: 'fortify.msiglife.co.id',
  },
  andromeda: {
    accent: '#FFFFFF',
    accentText: 'text-white',
    badgeClasses: 'bg-white/[0.06] text-[#E4E4E7]',
    spotlightColor: 'rgba(255, 255, 255, 0.08)',
    numberGlow: 'text-white/20 group-hover:text-white/45',
    gradient: 'radial-gradient(75% 85% at 88% 14%, rgba(255, 255, 255, 0.04) 0%, transparent 100%)',
    urlHost: 'andromeda.msiglife.co.id',
  },
  pen: {
    accent: '#FFFFFF',
    accentText: 'text-white',
    badgeClasses: 'bg-white/[0.06] text-[#E4E4E7]',
    spotlightColor: 'rgba(255, 255, 255, 0.08)',
    numberGlow: 'text-white/20 group-hover:text-white/45',
    gradient: 'radial-gradient(75% 85% at 86% 14%, rgba(255, 255, 255, 0.04) 0%, transparent 100%)',
    urlHost: 'askrindo.co.id/penjaminan-kmk-pen',
  },
};

const DEFAULT_PALETTE: ProjectSheetPalette = {
  accent: '#FFFFFF',
  accentText: 'text-white',
  badgeClasses: 'bg-white/[0.06] text-[#E4E4E7]',
  spotlightColor: 'rgba(255, 255, 255, 0.08)',
  numberGlow: 'text-white/20 group-hover:text-white/45',
  gradient: 'radial-gradient(75% 85% at 85% 15%, rgba(255, 255, 255, 0.04) 0%, transparent 100%)',
  urlHost: 'production-system.internal',
};

const PROJECT_SPECS: Record<string, { flow: string[]; latency: string; throughput: string }> = {
  'portal-bisnis-askrindo': {
    flow: [
      'Client / Partner H2H Request',
      'Nginx TLS Termination & Rate Limiter',
      'Spring Boot Premium Engine (6 Lines)',
      'Redis Mutex SET lock:pay:{order_id} NX EX 30',
      'PostgreSQL Pessimistic SELECT ... FOR UPDATE',
      'Idempotent HTTP 200 Webhook Reconciliation',
    ],
    latency: '< 45ms p99',
    throughput: '1,800 TPS',
  },
  fortify: {
    flow: [
      'User Mobile Photo & Liveness Capture',
      'OCR Preprocessing & Base64 Normalization',
      'Biometric STT / TTS Validation Pipeline',
      'Spring Cloud Event Bus Publisher',
      'Apache Kafka Zero-Loss Topic Stream',
      'Encrypted PostgreSQL Policy Vault',
    ],
    latency: '< 120ms e-KYC',
    throughput: '800 Req/min',
  },
  andromeda: {
    flow: [
      'Agency Agent Compensation Trigger',
      'Spring Cloud Multi-DB Routing Engine',
      'PostgreSQL Commission Ledger',
      'Microsoft SQL Server Policy Sync',
      'Real-time SLA Calculation Pipeline',
      'Automated Audit Trail & Payout Emit',
    ],
    latency: '< 80ms query',
    throughput: '3,200 Ops/sec',
  },
  pen: {
    flow: [
      'Banking Partner Relief API Payload',
      'Government PEN Verification Gate',
      'Spring Boot Working Capital Evaluator',
      'Automated e-Materai Stamping Workflow',
      'Disbursement Guarantee Approval Pipeline',
      'JasperReports Financial Reconciliation',
    ],
    latency: '< 65ms sync',
    throughput: '2,400+ TPS',
  },
};

interface StickyEditorialSheetProps {
  project: ProjectItem;
  media?: ProjectImageAsset;
  index: number;
  total: number;
  reduceMotion: boolean;
  onOpenModal: (data: ActiveModalData) => void;
}

function StickyEditorialSheet({
  project,
  media,
  index,
  total,
  reduceMotion,
  onOpenModal,
}: StickyEditorialSheetProps) {
  const cardRef = useRef<HTMLLIElement>(null);
  const isLast = index === total - 1;
  const palette = SHEET_PALETTES[project.slug] ?? DEFAULT_PALETTE;
  const spec = PROJECT_SPECS[project.slug];

  // Active view tab state: 'preview' or 'architecture'
  const [activeTab, setActiveTab] = useState<'preview' | 'architecture'>('preview');

  // Mouse-tracking spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(640px circle at ${mouseX}px ${mouseY}px, ${palette.spotlightColor}, transparent 75%)`;

  // 3D Perspective Tilt on the browser mockup
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [5, -5]), {
    stiffness: 280,
    damping: 26,
  });
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 280,
    damping: 26,
  });

  function handleMockupMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(xPct);
    tiltY.set(yPct);
  }

  function handleMockupMouseLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  // Pure sibling sticky stacking physics from sticky-services-stack
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 26,
    mass: 0.25,
  });

  const shouldDim = !reduceMotion && !isLast;

  const overlayOpacity = useTransform(smoothProgress, [0.08, 0.88], shouldDim ? [0, 0.82] : [0, 0]);
  const cardScale = useTransform(smoothProgress, [0.08, 0.92], shouldDim ? [1, 0.965] : [1, 1]);
  const cardY = useTransform(smoothProgress, [0.08, 0.92], shouldDim ? [0, -18] : [0, 0]);
  const numberParallaxY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, -28]);

  return (
    <li
      ref={cardRef}
      className="sticky top-0 flex h-screen min-h-[100dvh] w-full list-none items-center justify-center overflow-hidden bg-[#080808]"
      style={{ zIndex: index + 1 }}
    >
      <motion.article
        onMouseMove={handleMouseMove}
        style={{
          scale: cardScale,
          y: cardY,
          transformOrigin: 'top center',
        }}
        className="group relative flex h-full w-full items-center justify-center overflow-hidden will-change-transform"
      >
        {/* Ambient mesh gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-1 opacity-70"
          style={{ background: palette.gradient }}
        />

        {/* Mouse spotlight overlay */}
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: spotlightBg }}
          />
        )}

        {/* Stacking dimming overlay */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 z-20 bg-[#050505]/80 backdrop-blur-[1px]"
        />

        {/* Main Content Layout: Wide Immersive Fullscreen Grid */}
        <div className="relative z-10 mx-auto grid w-full max-w-[1640px] grid-cols-1 items-center gap-8 px-6 sm:px-12 lg:grid-cols-12 lg:gap-14 xl:px-20">
          {/* Left Column: Number, Metadata, Narrative & Architecture */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              {/* Massive Parallax Index & Badge */}
              <div className="mb-3 flex items-center justify-between gap-4">
                <motion.span
                  style={{ y: numberParallaxY }}
                  className={`font-mono text-5xl font-extrabold tracking-tighter tabular-nums select-none transition-colors sm:text-7xl lg:text-8xl xl:text-9xl ${palette.numberGlow}`}
                  aria-hidden="true"
                >
                  {`0${index + 1}`}
                </motion.span>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase sm:text-sm">
                    {project.company}
                  </span>
                  {project.category && (
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold tracking-tight ${palette.badgeClasses}`}
                    >
                      {project.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Title with live link arrow */}
              <h3 className="mb-3 text-2xl font-bold tracking-tight text-[#FFFFFF] sm:text-3xl lg:text-4xl">
                {project.external ? (
                  <a
                    href={project.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2.5 transition-colors hover:text-[#E4E4E7]"
                  >
                    <span>{project.title}</span>
                    <motion.span
                      aria-hidden="true"
                      whileHover={{ x: 3, y: -3 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="inline-block text-[#A1A1AA] transition-colors group-hover/link:text-white"
                    >
                      &#8599;
                    </motion.span>
                  </a>
                ) : (
                  project.title
                )}
              </h3>

              {/* Technical Narrative */}
              <p className="mb-5 max-w-xl text-xs leading-relaxed text-[#A1A1AA] sm:text-sm lg:text-base">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Chips with Framer Motion hover springs */}
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tech.map(t => (
                <motion.span
                  key={t}
                  whileHover={reduceMotion ? undefined : { scale: 1.08, y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className="cursor-default rounded-full bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-[#D4D4D8] transition-colors hover:bg-white/12 hover:text-white"
                >
                  {t}
                </motion.span>
              ))}
            </div>

            {/* Live Link Action */}
            {project.external && (
              <div className="mt-6">
                <motion.a
                  href={project.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={reduceMotion ? undefined : { x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="group/btn inline-flex items-center gap-2.5 text-xs font-bold tracking-wider text-[#FFFFFF] uppercase transition-colors hover:text-[#E4E4E7] sm:text-sm"
                >
                  <span>Explore Live Platform</span>
                  <span className="transition-transform duration-200 group-hover/btn:translate-x-1.5">
                    &rarr;
                  </span>
                </motion.a>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Browser Preview + Spec Switcher */}
          <div className="lg:col-span-6">
            {/* Interactive View Switcher Tabs (Framer Motion layoutId) */}
            <div className="mb-3.5 flex items-center justify-between">
              <div className="inline-flex rounded-full bg-[#141416]/90 p-1 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`relative rounded-full px-4 py-1 text-xs font-semibold transition-colors duration-200 ${
                    activeTab === 'preview'
                      ? 'text-[#080808]'
                      : 'text-[#8E8E93] hover:text-[#FFFFFF]'
                  }`}
                >
                  {activeTab === 'preview' && (
                    <motion.span
                      layoutId={`active-tab-${project.slug}`}
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                      className="absolute inset-0 z-0 rounded-full bg-[#FFFFFF]"
                    />
                  )}
                  <span className="relative z-10">Live Interface</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('architecture')}
                  className={`relative rounded-full px-4 py-1 text-xs font-semibold transition-colors duration-200 ${
                    activeTab === 'architecture'
                      ? 'text-[#080808]'
                      : 'text-[#8E8E93] hover:text-[#FFFFFF]'
                  }`}
                >
                  {activeTab === 'architecture' && (
                    <motion.span
                      layoutId={`active-tab-${project.slug}`}
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                      className="absolute inset-0 z-0 rounded-full bg-[#FFFFFF]"
                    />
                  )}
                  <span className="relative z-10">Architecture Blueprint</span>
                </button>
              </div>

              {spec && (
                <div className="hidden items-center gap-3 font-mono text-xs text-[#8E8E93] sm:flex">
                  <span>{spec.latency}</span>
                  <span>·</span>
                  <span className="text-[#FFFFFF]">{spec.throughput}</span>
                </div>
              )}
            </div>

            {/* View Content with AnimatePresence */}
            <AnimatePresence mode="wait">
              {activeTab === 'preview' ? (
                media && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
                    className="relative"
                  >
                    {/* Floating 3D Browser Frame with Spring Physics */}
                    <motion.div
                      onMouseMove={handleMockupMouseMove}
                      onMouseLeave={handleMockupMouseLeave}
                      style={{
                        rotateX,
                        rotateY,
                        transformPerspective: 1200,
                      }}
                      className="overflow-hidden rounded-2xl bg-[#121214] shadow-[0_24px_60px_rgba(0,0,0,0.85)] will-change-transform"
                    >
                      {/* Chrome Header Bar */}
                      <div className="flex items-center justify-between bg-[#080808]/90 px-4 py-2.5 backdrop-blur-sm">
                        <div className="flex items-center gap-1.5" aria-hidden="true">
                          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                        </div>
                        <span className="truncate rounded-md bg-white/5 px-3 py-0.5 font-mono text-[11px] text-[#8E8E93]">
                          https://{palette.urlHost}
                        </span>
                        <div className="w-10" />
                      </div>

                      {/* Screenshot with zoom trigger */}
                      <button
                        type="button"
                        onClick={() =>
                          onOpenModal({
                            src: media.src,
                            srcSet: media.srcSet,
                            title: project.title,
                            company: project.company,
                            category: project.category,
                            description: project.description,
                            external: project.external,
                          })
                        }
                        className="group/img relative block w-full cursor-zoom-in text-left focus:outline-none"
                        title="Click to view full architecture preview"
                      >
                        <img
                          src={media.src}
                          srcSet={media.srcSet}
                          sizes="(max-width: 768px) 100vw, 760px"
                          alt={`${project.title} screenshot`}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[16/10] max-h-[50vh] w-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.02]"
                        />

                        {/* Hover expand hint pill */}
                        <div className="absolute inset-0 flex items-center justify-center bg-[#080808]/50 opacity-0 transition-opacity duration-200 group-hover/img:opacity-100">
                          <span className="inline-flex items-center gap-2 rounded-full bg-[#18181B] px-4 py-2 text-xs font-semibold text-[#FFFFFF] shadow-xl backdrop-blur-md">
                            <svg
                              className="h-4 w-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                              />
                            </svg>
                            <span>View Architecture Preview</span>
                          </span>
                        </div>
                      </button>
                    </motion.div>
                  </motion.div>
                )
              ) : (
                <motion.div
                  key="architecture"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
                  className="relative overflow-hidden rounded-2xl bg-[#121214] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.85)] sm:p-7"
                >
                  <div className="mb-4 flex items-center justify-between pb-3">
                    <span className="font-mono text-xs font-bold text-[#E4E4E7] uppercase tracking-wider">
                      // Pipeline Topology &amp; Concurrency
                    </span>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#FFFFFF]">
                      Production Live
                    </span>
                  </div>

                  {spec && (
                    <ol className="space-y-2.5 font-mono text-xs sm:text-sm">
                      {spec.flow.map((step, sIdx) => (
                        <motion.li
                          key={step}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: sIdx * 0.05 }}
                          className="flex items-center gap-3 text-[#D4D4D8]"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-[10px] text-white">
                            {sIdx + 1}
                          </span>
                          <span className="truncate">{step}</span>
                        </motion.li>
                      ))}
                    </ol>
                  )}

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 text-xs font-mono text-[#8E8E93]">
                    <div>
                      Latency: <span className="font-semibold text-[#FFFFFF]">{spec?.latency}</span>
                    </div>
                    <div>
                      Peak Throughput:{' '}
                      <span className="font-semibold text-[#FFFFFF]">{spec?.throughput}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.article>
    </li>
  );
}

export function ProjectsSection({ screenshots }: ProjectsSectionProps) {
  const reduceMotion = useReducedMotion();
  const [activeModal, setActiveModal] = useState<ActiveModalData | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    if (!activeModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  return (
    <section id="projects" className="scroll-mt-20 w-full">
      {/* Editorial Section Header & Metrics Strip */}
      <div className="mx-auto mb-16 w-full max-w-[1360px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: EDITORIAL_EASE }}
          className="mb-14 max-w-3xl"
        >
          <p className="mb-2 text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase">
            // Selected Systems &amp; Case Studies
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#FFFFFF] sm:text-5xl">
            Production Engineering Impact
          </h2>
          <p className="text-base leading-relaxed text-[#8E8E93] sm:text-lg">
            Measured backend optimizations, dual-lock concurrency safeguards, and zero-loss event
            streaming platforms running across enterprise environments.
          </p>
        </motion.div>

        {/* Sleek Minimalist Analytical Metrics Strip */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: EDITORIAL_EASE }}
          className="grid grid-cols-2 gap-y-8 py-8 lg:grid-cols-4 lg:gap-8"
        >
          {IMPACT_METRICS.map(item => (
            <div key={item.label} className="px-4 sm:px-6 first:pl-0 last:pr-0">
              <div className="text-3xl font-extrabold tracking-tight tabular-nums text-[#FFFFFF] sm:text-4xl">
                {item.numeric !== null ? (
                  <HeroMetricTicker value={item.numeric} suffix={item.suffix} />
                ) : (
                  item.headline
                )}
              </div>
              <p className="mt-1 text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[#8E8E93]">{item.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* True 100vw Fullscreen Editorial Stacking Showcase Track */}
      <ol className="relative m-0 flex w-full flex-col p-0">
        {GRID_PROJECTS.map((project, idx) => (
          <StickyEditorialSheet
            key={project.slug}
            project={project}
            media={screenshots[project.slug]}
            index={idx}
            total={GRID_PROJECTS.length}
            reduceMotion={Boolean(reduceMotion)}
            onOpenModal={setActiveModal}
          />
        ))}
      </ol>

      {/* High-Resolution Screenshot Lightbox Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]/85 p-4 backdrop-blur-md sm:p-6"
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
              onClick={e => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-[#121214] text-[#FFFFFF] shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase">
                    {activeModal.company}
                  </span>
                  {activeModal.category && (
                    <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-[10px] font-semibold text-[#D4D4D8] uppercase">
                      {activeModal.category}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="rounded-full p-1 text-[#8E8E93] transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close preview"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="overflow-y-auto p-4 sm:p-6">
                <img
                  src={activeModal.src}
                  srcSet={activeModal.srcSet}
                  alt={`${activeModal.title} full preview`}
                  className="w-full rounded-xl object-contain shadow-xs"
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#FFFFFF]">{activeModal.title}</h3>
                    <p className="mt-1 text-sm text-[#8E8E93]">{activeModal.description}</p>
                  </div>
                  {activeModal.external && (
                    <a
                      href={activeModal.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#FFFFFF] px-4 py-2 text-xs font-bold text-[#080808] shadow-md transition-all hover:bg-[#E4E4E7]"
                    >
                      <span>Visit Live Platform</span>
                      <span>&#8599;</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
