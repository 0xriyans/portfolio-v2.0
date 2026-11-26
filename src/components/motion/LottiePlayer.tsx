import { useEffect, useRef, useState } from 'react';

interface LottiePlayerProps {
  /** Imported Lottie JSON object from src/assets/lottie/ (optional). */
  animationData?: object;
  label?: string;
  className?: string;
}

/**
 * Lazy-loaded Lottie accent slot (`lottie-web` dynamically imported on client:visible).
 * Pauses automatically when scrolled off-screen via IntersectionObserver and falls back
 * to a static palette SVG under `prefers-reduced-motion: reduce` or when no JSON asset exists.
 */
export function LottiePlayer({
  animationData,
  label = 'Backend event stream accent',
  className,
}: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!animationData || reducedMotion || !containerRef.current) return;

    const el = containerRef.current;
    let destroyed = false;
    let observer: IntersectionObserver | null = null;
    let instance: { play: () => void; pause: () => void; destroy: () => void } | null = null;

    import('lottie-web')
      .then(mod => {
        if (destroyed || !el) return;
        const lottie = mod.default;
        instance = lottie.loadAnimation({
          container: el,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData,
        });

        observer = new IntersectionObserver(
          entries => {
            const visible = entries.some(entry => entry.isIntersecting);
            if (visible) instance?.play();
            else instance?.pause();
          },
          { threshold: 0.05 },
        );
        observer.observe(el);
      })
      .catch(() => {
        if (!destroyed) setFailed(true);
      });

    return () => {
      destroyed = true;
      observer?.disconnect();
      instance?.destroy();
    };
  }, [animationData, reducedMotion]);

  if (!animationData || reducedMotion || failed) {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full bg-[#121214] px-3 py-1.5 ${className ?? ''}`}
        role="img"
        aria-label={label}
        data-lottie-status={reducedMotion ? 'reduced-motion' : 'placeholder'}
      >
        <svg viewBox="0 0 56 20" className="h-5 w-14 shrink-0" fill="none" aria-hidden="true">
          <rect
            x="1.5"
            y="3"
            width="13"
            height="14"
            rx="3.5"
            fill="#121212"
            stroke="#FFFFFF"
            strokeOpacity="0.22"
          />
          <circle cx="8" cy="10" r="2.2" fill="#FFFFFF" />
          <path d="M17 10H38" stroke="#8E8E93" strokeWidth="1.5" strokeDasharray="2.5 2.5" />
          <path
            d="M35 7L39 10L35 13"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="41.5" y="3" width="13" height="14" rx="3.5" fill="#FFFFFF" />
          <circle cx="48" cy="10" r="2.2" fill="#080808" />
        </svg>
        <span className="text-[11px] font-medium text-[#D4D4D8]">Lottie stream slot</span>
      </div>
    );
  }

  return <div ref={containerRef} className={className} role="img" aria-label={label} />;
}
