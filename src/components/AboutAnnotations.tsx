import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

/**
 * Hand-drawn Titanium/Silver SVG annotations drawn on scroll via `motion/react`
 * across the 3 "Currently" blocks.
 */
export function AboutAnnotations() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();

  const drawTransition = (delay: number, duration = 0.65) =>
    reduceMotion
      ? { duration: 0 }
      : {
          pathLength: { duration, delay, ease: 'easeOut' as const },
          opacity: { duration: 0.2, delay },
        };

  const visible = reduceMotion || inView;

  return (
    <div ref={ref} className="grid gap-8 md:grid-cols-3">
      {/* Block 1: What I'm doing now */}
      <div className="space-y-2.5">
        <p className="text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase">
          What I&apos;m doing now
        </p>
        <p className="text-base leading-[1.7] text-[#A1A1AA]">
          Building insurance platforms at{' '}
          <span className="relative inline-block px-0.5 font-semibold text-[#FFFFFF]">
            Askrindo
            <svg
              aria-hidden="true"
              viewBox="0 0 110 14"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -bottom-1 left-0 h-2.5 w-full overflow-visible"
            >
              <motion.path
                d="M 2 10 Q 55 3 108 9"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.4"
                strokeLinecap="round"
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={drawTransition(0.1)}
              />
            </svg>
          </span>{' '}
          (Portal Bisnis + two-layer Midtrans concurrency locks), while looking for my next{' '}
          <span className="relative inline-block px-1 font-semibold text-[#FFFFFF]">
            <svg
              aria-hidden="true"
              viewBox="0 0 130 28"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
            >
              <motion.path
                d="M 0 15 L 130 15"
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity="0.18"
                strokeWidth="22"
                strokeLinecap="round"
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={drawTransition(0.28, 0.55)}
              />
            </svg>
            <span className="relative z-10">backend role</span>
          </span>{' '}
          across Remote, Jakarta, or Japan.
        </p>
      </div>

      {/* Block 2: How I work */}
      <div className="space-y-2.5">
        <p className="text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase">How I work</p>
        <p className="text-base leading-[1.7] text-[#A1A1AA]">
          Committed to{' '}
          <span className="relative inline-block px-1.5 py-0.5 font-semibold text-[#FFFFFF]">
            maintainable code
            <svg
              aria-hidden="true"
              viewBox="0 0 180 34"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            >
              <motion.rect
                x="2"
                y="2"
                width="176"
                height="30"
                rx="6"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.75"
                strokeOpacity="0.8"
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={drawTransition(0.45, 0.7)}
              />
            </svg>
          </span>
          , pragmatic trade-offs,{' '}
          <strong className="font-semibold text-[#FFFFFF]">measurable systems</strong>, and not
          deploying Kubernetes just to serve a contact form — shipping end-to-end without waiting
          three sprints for a handoff.
        </p>
      </div>

      {/* Block 3: Beyond code */}
      <div className="space-y-2.5">
        <p className="text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase">Beyond code</p>
        <p className="text-base leading-[1.7] text-[#A1A1AA]">
          Maintaining a personal{' '}
          <span className="relative inline-block px-2 font-semibold text-[#FFFFFF]">
            second brain
            <svg
              aria-hidden="true"
              viewBox="0 0 130 38"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            >
              <motion.ellipse
                cx="65"
                cy="19"
                rx="61"
                ry="16"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.9"
                strokeOpacity="0.8"
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={drawTransition(0.62, 0.7)}
              />
            </svg>
          </span>
          , iterating on <strong className="font-semibold text-[#FFFFFF]">HypeRadar</strong>,
          sharpening{' '}
          <span className="relative inline-block font-semibold text-[#FFFFFF]">
            LeetCode, system design &amp; English
            <svg
              aria-hidden="true"
              viewBox="0 0 220 18"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -bottom-1.5 left-0 h-3 w-full overflow-visible"
            >
              <motion.path
                d="M 2 10 Q 28 3 54 10 T 106 10 T 158 10 T 218 10"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={drawTransition(0.8, 0.65)}
              />
            </svg>
          </span>{' '}
          — and exploring modern distributed architectures.
        </p>
      </div>
    </div>
  );
}
