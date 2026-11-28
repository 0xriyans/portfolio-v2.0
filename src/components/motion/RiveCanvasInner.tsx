import { useEffect, useRef } from 'react';
import { useRive } from '@rive-app/react-canvas';

interface RiveCanvasInnerProps {
  src: string;
  stateMachine?: string;
  onError: () => void;
}

export default function RiveCanvasInner({
  src,
  stateMachine = 'State Machine 1',
  onError,
}: RiveCanvasInnerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const { rive, RiveComponent } = useRive({
    src,
    stateMachines: stateMachine,
    autoplay: true,
    onLoadError: onError,
  });

  useEffect(() => {
    const el = hostRef.current;
    if (!el || !rive) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.some(entry => entry.isIntersecting);
        if (visible) rive.play();
        else rive.pause();
      },
      { threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rive]);

  return (
    <div ref={hostRef} className="h-32 w-full">
      <RiveComponent className="h-full w-full rounded-2xl bg-[#121214]" />
    </div>
  );
}
