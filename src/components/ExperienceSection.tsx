import { motion, useReducedMotion } from 'motion/react';
import { SITE } from '../lib/config';
import { ExperienceTimeline } from './ExperienceTimeline';

const VIEWPORT = { once: true, amount: 0.15 } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

export function ExperienceSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="scroll-mt-24 w-full">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        {/* Left Column: Sticky Career Overview Sidebar */}
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: EASE }}
          >
            <p className="mb-2 text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase">
              // Career History &amp; Growth
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#FFFFFF] sm:text-4xl lg:text-5xl">
              Work Experience
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-[#8E8E93] sm:text-base">
              6+ years engineering mission-critical backend platforms, dual-layer payment locks,
              zero-loss Kafka streaming pipelines, and high-throughput microservices across
              Indonesia&apos;s leading institutions.
            </p>

            {/* Career Metrics Block */}
            <div className="mb-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#121214]/80 p-4 shadow-sm">
                <span className="block font-mono text-2xl font-bold tabular-nums text-[#FFFFFF] sm:text-3xl">
                  6+
                </span>
                <span className="text-xs font-medium text-[#A1A1AA]">Years Experience</span>
              </div>
              <div className="rounded-2xl bg-[#121214]/80 p-4 shadow-sm">
                <span className="block font-mono text-2xl font-bold tabular-nums text-[#FFFFFF] sm:text-3xl">
                  5
                </span>
                <span className="text-xs font-medium text-[#A1A1AA]">Enterprise Roles</span>
              </div>
              <div className="rounded-2xl bg-[#121214]/80 p-4 shadow-sm">
                <span className="block font-mono text-2xl font-bold tabular-nums text-[#FFFFFF] sm:text-3xl">
                  4
                </span>
                <span className="text-xs font-medium text-[#A1A1AA]">Core Sectors</span>
              </div>
              <div className="rounded-2xl bg-[#121214]/80 p-4 shadow-sm">
                <span className="block font-mono text-2xl font-bold tabular-nums text-[#FFFFFF] sm:text-3xl">
                  100%
                </span>
                <span className="text-xs font-medium text-[#A1A1AA]">Production Reliability</span>
              </div>
            </div>

            {/* Quick Industry Footprint Tags */}
            <div className="mb-8 space-y-2.5">
              <p className="text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase">
                Industry Footprint
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'State Credit Guarantee',
                  'Insurtech Platforms',
                  'Multinational Life',
                  'Telecommunications',
                ].map(tag => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-[#D4D4D8]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions: Download Resume & LinkedIn */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={SITE.cvUrl}
                download={SITE.cvFileName}
                className="inline-flex items-center gap-2 rounded-full bg-[#FFFFFF] px-5 py-2.5 text-xs font-bold text-[#080808] shadow-md transition-all hover:bg-[#E4E4E7]"
              >
                <span>Download Resume (PDF)</span>
                <span>&rarr;</span>
              </a>
              <a
                href="https://www.linkedin.com/in/riyan-sugiarto/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-4 py-2.5 text-xs font-semibold text-[#D4D4D8] transition-colors hover:bg-white/15 hover:text-white"
              >
                <span>LinkedIn</span>
                <span>&#8599;</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Expansive Animated Timeline Stream */}
        <div className="lg:col-span-7">
          <ExperienceTimeline />
        </div>
      </div>
    </section>
  );
}
