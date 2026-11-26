import { Suspense, lazy, useEffect, useState } from 'react';

const RiveCanvasInner = lazy(() => import('./RiveCanvasInner'));

interface RiveIllustrationProps {
  /** Bundled URL or path for a `.riv` file stored in `src/assets/rive/` (optional). */
  src?: string;
  stateMachine?: string;
  label?: string;
  className?: string;
}

/**
 * Interactive Rive state-machine slot (`@rive-app/react-canvas` lazy-loaded only when visible + asset present).
 * Falls back cleanly to a keyboard/hover-interactive Light Navy & Cream SVG illustration when no `.riv` file
 * is supplied, when `prefers-reduced-motion: reduce` is active, or on load failure.
 */
export function RiveIllustration({
  src,
  stateMachine,
  label = 'Interactive system architecture illustration',
  className,
}: RiveIllustrationProps) {
  const [active, setActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  if (!src || reducedMotion || loadFailed) {
    return (
      <button
        type="button"
        onClick={() => setActive(v => !v)}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className={`inline-flex items-center gap-3 rounded-xl bg-[#121214] px-3.5 py-2.5 text-left transition-colors hover:bg-[#18181B] ${className ?? ''}`}
        aria-pressed={active}
        aria-label={label}
      >
        <svg viewBox="0 0 48 40" className="h-8 w-10 shrink-0" fill="none" aria-hidden="true">
          <rect x="1.5" y="2" width="45" height="36" rx="10" fill="#121212" />
          <circle cx="14" cy="20" r="4.5" fill={active ? '#FFFFFF' : '#8E8E93'} />
          <path
            d="M19 20H29"
            stroke="#FFFFFF"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeDasharray={active ? 'none' : '3 2'}
          />
          <rect
            x="30"
            y="13"
            width="10"
            height="14"
            rx="3.5"
            fill={active ? '#E4E4E7' : '#FFFFFF'}
          />
        </svg>
        <span className="text-xs font-medium text-[#D4D4D8]">
          {active
            ? 'Kafka Offset -> PostgreSQL ACID Ready'
            : 'Interactive System Flow (hover or tap · Rive slot)'}
        </span>
      </button>
    );
  }

  return (
    <div className={className} role="img" aria-label={label}>
      <Suspense fallback={<div className="h-32 w-full rounded-2xl bg-[#121214]" />}>
        <RiveCanvasInner
          src={src}
          stateMachine={stateMachine}
          onError={() => setLoadFailed(true)}
        />
      </Suspense>
    </div>
  );
}
