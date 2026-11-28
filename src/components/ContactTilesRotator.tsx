import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { SOCIAL_LINKS } from '../lib/config';

const PROFILE_TILES = SOCIAL_LINKS.filter(item => item.name !== 'Email');

/**
 * Stacked social tile deck on the right side of the Contact card.
 * Top featured card cycles every 3.8s with Motion AnimatePresence crossfade + slide,
 * pausing automatically on hover, focus, or `prefers-reduced-motion: reduce`.
 */
export function ContactTilesRotator() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion || PROFILE_TILES.length <= 1) return;
    const id = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % PROFILE_TILES.length);
    }, 3800);
    return () => clearInterval(id);
  }, [paused, reduceMotion]);

  const featured = PROFILE_TILES[activeIdx] ?? PROFILE_TILES[0];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="space-y-4"
    >
      {/* Featured rotating top tile */}
      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl bg-white/[0.04] p-5 text-[#FFFFFF] shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
          <div className="relative z-10 mb-3 flex items-center justify-between text-[11px] font-semibold tracking-wider text-[#A1A1AA] uppercase">
            <span>Featured Profile</span>
            <span>{paused || reduceMotion ? 'Paused' : 'Cycling'}</span>
          </div>

          <AnimatePresence initial={false} mode="wait">
            <motion.a
              key={featured.name}
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="group relative z-10 block"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xl font-semibold text-[#FFFFFF]">{featured.name}</p>
                  <p className="mt-0.5 text-sm text-[#8E8E93]">{featured.label}</p>
                </div>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFFFFF] text-sm font-bold text-[#080808] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  {'\u2197'}
                </span>
              </div>
            </motion.a>
          </AnimatePresence>
        </div>
      </div>

      {/* Compact interactive tile stack below for instant direct access */}
      <div className="grid gap-2">
        {PROFILE_TILES.map((item, idx) => {
          const isCurrent = idx === activeIdx;
          return (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveIdx(idx)}
              onFocus={() => setActiveIdx(idx)}
              className={`group flex items-center justify-between rounded-xl px-4 py-2.5 transition-all duration-200 hover:bg-[#18181B] hover:text-[#FFFFFF] ${
                isCurrent ? 'bg-white/10 text-[#FFFFFF]' : 'bg-white/[0.04] text-[#D4D4D8]'
              }`}
            >
              <span className="text-sm font-semibold group-hover:text-[#FFFFFF]">{item.name}</span>
              <span className="text-xs font-medium text-[#8E8E93] group-hover:text-white">
                {item.label} {'\u2197'}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
