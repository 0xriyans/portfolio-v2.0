import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SOCIAL_LINKS } from '../lib/config';
import { BlurFade } from './ui/blur-fade';
import { NumberTicker } from './ui/number-ticker';

interface HeroBlurBlockProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  offset?: number;
  className?: string;
}

/** Magic UI BlurFade entrance tailored for hero elements (blur 8px -> 0 + fade, no rise). */
export function HeroBlurBlock({
  children,
  delay = 0,
  duration = 0.85,
  offset = 0,
  className,
}: HeroBlurBlockProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <BlurFade
      delay={delay}
      duration={duration}
      offset={offset}
      blur="8px"
      inView={false}
      className={className}
    >
      {children}
    </BlurFade>
  );
}

interface HeroMetricTickerProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function HeroMetricTicker({ value, suffix = '', className }: HeroMetricTickerProps) {
  return (
    <span
      className={`inline-flex items-baseline font-semibold tabular-nums text-[#F8FAFC] ${className ?? ''}`}
    >
      <NumberTicker
        value={value}
        startValue={Math.max(10, Math.floor(value * 0.25))}
        className="text-[#F8FAFC]"
      />
      <span>{suffix}</span>
    </span>
  );
}

export function HeroPrimaryCta({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#FFFFFF] px-6 py-3 text-sm font-bold text-[#080808] shadow-[0_10px_28px_rgba(255,255,255,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E4E4E7]"
    >
      <span>{label}</span>
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </a>
  );
}

function SocialGlyph({ name }: { name: string }) {
  switch (name) {
    case 'GitHub':
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px]"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.287-.6-1.175-1.025-1.412-.35-.188-.85-.65-.013-.663.788-.012 1.35.725 1.538 1.025.9 1.512 2.337 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.563 4.938.363.312.675.912.675 1.85 0 1.337-.012 2.412-.012 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10Z" />
        </svg>
      );
    case 'LinkedIn':
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px]"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5A1.97 1.97 0 1 0 5.25 7.44 1.97 1.97 0 0 0 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.22 16.16 8.22C14.37 8.22 13.48 9.2 13.02 9.93V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.07 11.09C16.41 11.09 17.06 12.11 17.06 13.6V19.5H20.44V13.02Z" />
        </svg>
      );
    case 'X':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
        </svg>
      );
    case 'Fiverr':
      return (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
          <circle cx="17.2" cy="6.2" r="1.4" fill="currentColor" />
          <path
            d="M14.5 9.5H10.5V8.3C10.5 7.4 11.1 6.8 12.1 6.8H13.6V4.5H11.8C9.3 4.5 7.8 6 7.8 8.4V9.5H5.8V11.8H7.8V19.2H10.5V11.8H14.5V19.2H17.2V9.5H14.5Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'Upwork':
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3.5 6.5V12a3.5 3.5 0 0 0 7 0V6.5" />
          <path d="M10.5 11.5a3.5 3.5 0 1 1 7 0c0 1.9-1.4 3.5-3.3 3.5-1.2 0-2.3-.7-3.1-1.9l-2.4 5.4" />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
  }
}

interface MagneticIconProps {
  item: (typeof SOCIAL_LINKS)[number];
  idx: number;
  pointerX: MotionValue<number>;
  isActive: boolean;
  showTooltip: boolean;
  entranceDelay: number;
  reduceMotion: boolean | null;
  onActivate: () => void;
  onLeave: () => void;
}

function MagneticConnectIcon({
  item,
  pointerX,
  isActive,
  showTooltip,
  entranceDelay,
  reduceMotion,
  onActivate,
  onLeave,
}: MagneticIconProps) {
  const itemRef = useRef<HTMLLIElement>(null);

  const distanceX = useTransform(pointerX, val => {
    if (!Number.isFinite(val) || !itemRef.current) return 180;
    const rect = itemRef.current.getBoundingClientRect();
    return val - rect.left - rect.width / 2;
  });

  const rawScale = useTransform(distanceX, [-90, 0, 90], [1, 1.22, 1]);
  const magScale = useSpring(rawScale, { stiffness: 320, damping: 22, mass: 0.35 });

  return (
    <motion.li
      ref={itemRef}
      initial={reduceMotion ? false : { opacity: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              opacity: { duration: 0.45, delay: entranceDelay },
              filter: { duration: 0.45, delay: entranceDelay },
            }
      }
      className="relative"
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.span
            role="tooltip"
            initial={reduceMotion ? false : { opacity: 0, y: 6, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.94 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2.5 hidden -translate-x-1/2 rounded-full bg-[#18181B] px-3 py-1 text-[11px] font-medium whitespace-nowrap text-[#FFFFFF] shadow-md sm:inline-block"
          >
            {item.name} · {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.a
        href={item.url}
        target={item.url.startsWith('mailto:') ? undefined : '_blank'}
        rel={item.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
        aria-label={`${item.name}: ${item.label}`}
        title={`${item.name} — ${item.label}`}
        onMouseEnter={onActivate}
        onMouseLeave={onLeave}
        onFocus={onActivate}
        onBlur={onLeave}
        style={reduceMotion ? undefined : { scale: magScale }}
        whileTap={reduceMotion ? undefined : { scale: 0.92 }}
        className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${
          isActive ? 'text-[#080808]' : 'text-[#8E8E93] hover:text-[#FFFFFF]'
        }`}
      >
        {isActive && (
          <motion.span
            layoutId={reduceMotion ? undefined : 'connect-active-bg'}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            aria-hidden="true"
            className="absolute inset-0 rounded-xl bg-[#FFFFFF]"
          />
        )}
        <span className="relative z-10">
          <SocialGlyph name={item.name} />
        </span>
      </motion.a>
    </motion.li>
  );
}

/**
 * Integrated horizontal 6-icon Connect dock paired cleanly beneath the Hero ID card.
 */
export function HeroConnectRail() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(Infinity);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [cycleIdx, setCycleIdx] = useState<number>(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reduceMotion || hoveredIdx !== null) return;
    const id = setInterval(() => {
      setCycleIdx(prev => (prev + 1) % SOCIAL_LINKS.length);
    }, 2400);
    return () => clearInterval(id);
  }, [reduceMotion, hoveredIdx]);

  const activeIdx = hoveredIdx ?? cycleIdx;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.65, delay: 0.3, ease: 'easeOut' }}
      className="flex flex-col items-center gap-2"
    >
      <ul
        aria-label="Connect links"
        onMouseMove={e => pointerX.set(e.clientX)}
        onMouseLeave={() => pointerX.set(Infinity)}
        className="flex items-center gap-1.5 rounded-2xl bg-[#121214]/90 px-2.5 py-2 shadow-[0_12px_36px_rgba(0,0,0,0.5)] backdrop-blur-md"
      >
        {SOCIAL_LINKS.map((item, idx) => (
          <MagneticConnectIcon
            key={item.name}
            item={item}
            idx={idx}
            pointerX={pointerX}
            isActive={activeIdx === idx}
            showTooltip={hoveredIdx === idx}
            entranceDelay={entered ? 0 : 0.22 + idx * 0.06}
            reduceMotion={reduceMotion}
            onActivate={() => setHoveredIdx(idx)}
            onLeave={() => setHoveredIdx(null)}
          />
        ))}
      </ul>
    </motion.div>
  );
}
