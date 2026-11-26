import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SITE } from '../lib/config';
import { ContactForm } from './ContactForm';
import { ContactTilesRotator } from './ContactTilesRotator';
import { WordRotate } from './ui/word-rotate';

const VIEWPORT = { once: true, amount: 0.12 } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

export function ContactSection() {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: EASE }}
        className="relative w-full"
      >
        {/* Soft Radial Ambient Spotlight Wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-20 -top-8 h-[520px] bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(255,255,255,0.035),transparent_70%)]"
        />

        <div className="relative z-10 pb-8">
          <p className="mb-2 text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase">
            {SITE.status} · {SITE.location}
          </p>
          <h2 className="mb-3 text-3xl font-semibold tracking-tight text-[#FFFFFF] sm:text-4xl">
            Let&apos;s collaborate on{' '}
            <WordRotate
              words={['backend systems', 'Kafka pipelines', 'payment APIs', 'end-to-end products']}
              className="text-[#FFFFFF] underline decoration-white/30 underline-offset-4"
            />
            .
          </h2>
          <p className="mb-6 max-w-2xl text-base leading-relaxed text-[#8E8E93]">
            Reach out anytime to discuss Java / Spring Boot / Quarkus architectures, distributed
            event streams, or freelance engineering scope.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${SITE.email}`}
              className="break-all text-2xl font-semibold tracking-tight text-[#FFFFFF] transition-colors hover:text-[#E4E4E7] sm:text-3xl md:text-4xl"
            >
              {SITE.email}
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-3.5 py-1.5 text-xs font-semibold text-[#D4D4D8] shadow-xs transition-all hover:bg-white/15 hover:text-white active:scale-95"
              title="Copy email to clipboard"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <span className="text-emerald-400">✓</span>
                  <span className="font-semibold text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <svg
                    className="h-3.5 w-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-5">
            <a
              href={SITE.cvUrl}
              download={SITE.cvFileName}
              className="inline-flex items-center rounded-full bg-[#FFFFFF] px-4 py-2 text-xs font-bold text-[#080808] shadow-md transition-all hover:bg-[#E4E4E7]"
            >
              Download Corrected CV (PDF)
            </a>
          </div>
        </div>

        <div className="relative z-10 mt-8 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-start">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.08, ease: EASE }}
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.16, ease: EASE }}
          >
            <p className="mb-3 text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase">
              Profiles &amp; Freelance
            </p>
            <ContactTilesRotator />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
