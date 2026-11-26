'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, type MotionProps } from 'motion/react';

import { cn } from '@/lib/utils';

interface WordRotateProps {
  words: string[];
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
  as?: 'span' | 'div';
}

export function WordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: -14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 14 },
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  className,
  as = 'span',
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches || words.length <= 1) return;

    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  const Wrapper = as === 'div' ? 'div' : 'span';

  return (
    <Wrapper className="inline-flex overflow-hidden align-baseline">
      <AnimatePresence mode="wait">
        <motion.span key={words[index]} className={cn('inline-block', className)} {...motionProps}>
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </Wrapper>
  );
}
