import { motion, useReducedMotion } from 'motion/react';
import { TextScrollReveal } from './ui/text-scroll-reveal';

const VIEWPORT = { once: true, amount: 0.15 } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

export function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="scroll-mt-24">
      {/* Section Header */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: EASE }}
        className="mb-6 max-w-2xl"
      >
        <p className="mb-2 text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase">
          Right Now · Product Focus
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-[#FFFFFF] sm:text-4xl">
          Currently Building
        </h2>
      </motion.div>

      {/* Direct Canvas Layout with Ambient Spotlight */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.08, ease: EASE }}
        className="relative w-full"
      >
        {/* Soft Radial Ambient Spotlight Wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-20 -top-12 h-[560px] bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(255,255,255,0.04),transparent_70%)]"
        />

        {/* Dynamic Scroll-Driven Word Reveal - Product-Focused Narrative */}
        <div className="relative z-10 py-4 sm:py-8">
          <TextScrollReveal
            preset="blur-reveal"
            theme="dark"
            label="PRODUCT & SCALABILITY FOCUS"
            text="Architecting mission-critical digital products and resilient transaction engines. Eliminating payment anomalies and double-settlement risks, turning multi-day batch workflows into instant real-time experiences, and delivering zero-downtime platforms built to scale seamlessly with millions of users."
            dimOpacity={0.16}
          />
        </div>
      </motion.div>
    </section>
  );
}
