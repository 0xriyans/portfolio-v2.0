import { type ReactNode } from 'react';
import { FileDown } from 'lucide-react';
import { SITE } from '../lib/config';
import { HeroIdCard } from './HeroIdCard';
import { HeroBlurBlock, HeroConnectRail, HeroPrimaryCta } from './HeroMotion';
import { KineticHeadlineReel } from './KineticHeadlineReel';

interface HeroSectionProps {
  portraitSrc: string;
}

/** Interactive hover keyword with smooth draw-underline, ambient titanium glow, and optional tech badge */
function HeroHoverKeyword({
  children,
  badge,
  className = '',
}: {
  children: ReactNode;
  badge?: string;
  className?: string;
}) {
  return (
    <span
      className={`group/kw relative inline-block cursor-pointer font-semibold text-[#FFFFFF] transition-colors duration-200 ${className}`}
    >
      <span className="relative z-10 transition-all duration-200 group-hover/kw:text-white group-hover/kw:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
        {children}
      </span>
      {/* Animated expanding titanium underline */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gradient-to-r from-white via-white/80 to-white/40 transition-all duration-300 ease-out group-hover/kw:w-full"
      />
      {/* Subtle ambient hover pill */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-1.5 -inset-y-0.5 rounded-md bg-white/[0.08] opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover/kw:opacity-100"
      />
      {badge && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1C1C1F] px-2 py-0.5 font-mono text-[10px] font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover/kw:-top-8 group-hover/kw:opacity-100"
        >
          {badge}
        </span>
      )}
    </span>
  );
}

/**
 * Redesigned balanced 2-column Hero (`client:load`):
 * - Left: interactive status pill, Kinetic Text Reel H1 (inspired by 21st.dev / jh3yy), playful keyword hover text, crisp CTAs
 * - Right: grounded showcase stage with draggable hanging dual-card ID pass + realistic dual-strap lanyard gantungan + horizontal 6-icon Connect dock beneath
 */
export function HeroSection({ portraitSrc }: HeroSectionProps) {
  return (
    <section id="hero" className="pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_auto]">
        <div className="max-w-[680px]">
          <HeroBlurBlock delay={0} duration={0.65}>
            <div className="group mb-4 inline-flex items-center gap-2 rounded-full bg-[#121214]/90 px-3.5 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1C1C1F] hover:shadow-[0_4px_20px_rgba(255,255,255,0.12)]">
              <span
                className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981] transition-transform duration-200 group-hover:scale-125"
                aria-hidden="true"
              />
              <span className="text-xs font-semibold text-[#FFFFFF]">{SITE.status}</span>
              <span className="text-xs text-[#71717A]" aria-hidden="true">
                ·
              </span>
              <span className="text-xs font-medium text-[#A1A1AA]">{SITE.location}</span>
            </div>
          </HeroBlurBlock>

          {/* Kinetic Headline Reel (Inspired by 21st.dev jh3yy "You Can Scroll") */}
          <h1 className="mb-4">
            <span className="sr-only">
              I design &amp; build backend systems, resilient APIs, scalable databases, and products
              end-to-end.
            </span>
            <KineticHeadlineReel />
          </h1>

          <HeroBlurBlock delay={0.3} duration={0.65}>
            <div className="mb-8 space-y-3.5 text-base leading-[1.7] text-[#A1A1AA] sm:text-[17px]">
              <p>
                Full-Stack Software Engineer based in Indonesia ({SITE.experience}) who spends half
                the time designing{' '}
                <HeroHoverKeyword badge="⚡ High Concurrency">
                  backend systems, APIs, and databases
                </HeroHoverKeyword>
                , and the other half negotiating with{' '}
                <HeroHoverKeyword badge="📐 display: flex; align-items: center;">
                  CSS to center a div
                </HeroHoverKeyword>
                .
              </p>
              <p>
                I build products end-to-end — system architecture, frontend UIs, and applied AI
                workflows — with{' '}
                <HeroHoverKeyword badge="🛡️ Clean Architecture">maintainable code</HeroHoverKeyword>
                , pragmatic trade-offs, and{' '}
                <HeroHoverKeyword badge="💡 Pragmatic Engineering">
                  not deploying Kubernetes just to serve a contact form
                </HeroHoverKeyword>
                .
              </p>
            </div>
          </HeroBlurBlock>

          <HeroBlurBlock delay={0.5} duration={0.6}>
            <div className="flex flex-wrap items-center gap-3.5">
              <HeroPrimaryCta href="#projects" label="Explore Selected Work" />
              <a
                href={SITE.cvUrl}
                download={SITE.cvFileName}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-white/[0.08] px-6 py-3 text-sm font-semibold text-[#FFFFFF] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15"
              >
                <FileDown className="h-4 w-4 text-[#FFFFFF]" aria-hidden="true" />
                <span>Download CV (PDF)</span>
              </a>
            </div>
          </HeroBlurBlock>
        </div>

        {/* Grounded showcase stage for the hanging ID pass + Connect dock */}
        <aside
          aria-label="Identity badge and social links"
          className="relative flex flex-col items-center justify-center gap-6 py-4 lg:min-w-[340px] lg:py-6 overflow-visible"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_38%,transparent_74%)]"
          />

          <HeroIdCard portraitSrc={portraitSrc} />
          <HeroConnectRail />
        </aside>
      </div>
    </section>
  );
}
