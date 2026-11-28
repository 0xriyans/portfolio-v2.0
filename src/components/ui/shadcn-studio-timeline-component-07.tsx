'use client';

import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from 'react';
import { type MotionValue, motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Award, Calendar, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export interface ExperienceStep {
  id: string;
  logo?: string;
  company: string;
  role: string;
  period: string;
  status?: { text: string; tone: 'positive' | 'accent' };
  stack: string[];
  achievement: string;
  description: string;
}

export interface TimelineComponent07Props {
  /** Steps shown on the timeline, from top to bottom. */
  data: ExperienceStep[];
  /** Small label shown above the heading. */
  eyebrow?: string;
  heading?: string;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Local UI primitives                                                       */
/* -------------------------------------------------------------------------- */

const Badge = ({ className, ...props }: ComponentProps<'span'>) => (
  <span
    data-slot="badge"
    className={cn(
      'inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs font-medium whitespace-nowrap text-[#D4D4D8]',
      className,
    )}
    {...props}
  />
);

const ICONS = {
  calendar:
    'https://cdn.21st.dev/assets/mirror/5d/5d627b2be605614ee3610dd6ba4384f0d6c693cdfe19873ed6fd6993e3746594.png',
  medal:
    'https://cdn.21st.dev/assets/mirror/fd/fd10840332a419a46c1c4d97fc8c945cf4419bb737a191834dac9bbce21ffdd9.png',
  speaker:
    'https://cdn.21st.dev/assets/mirror/33/33f4db7d0eb7646a2d45cb72bf21a55db8a82965ca3e45fa7e2d83d888c7b607.png',
};

/* -------------------------------------------------------------------------- */
/*  Scroll-animated timeline                                                  */
/* -------------------------------------------------------------------------- */

interface TimelineAnimateEntry {
  index: string;
  content: ReactNode;
}

// How much higher the content sits compared to its index marker, in pixels
const CONTENT_LIFT = 10;
const LINE_GAP = 28;

type Segment = { start: number; end: number };

type TimelineAnimateRowProps = TimelineAnimateEntry & {
  isLast: boolean;
  rowRef: (node: HTMLLIElement | null) => void;
  indexRef: (node: HTMLDivElement | null) => void;
};

const TimelineAnimateRow = ({
  index,
  content,
  isLast,
  rowRef,
  indexRef,
}: TimelineAnimateRowProps) => {
  const localRowRef = useRef<HTMLLIElement>(null);

  const { scrollYProgress } = useScroll({
    target: localRowRef,
    offset: ['start 70%', 'start 45%'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  });
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const y = useTransform(progress, [0, 1], [32, 0]);
  const contentY = useTransform(progress, [0, 1], [32 - CONTENT_LIFT, -CONTENT_LIFT]);

  return (
    <li
      ref={node => {
        localRowRef.current = node;
        rowRef(node);
      }}
      className={cn('relative', !isLast && 'pb-12 sm:pb-16')}
    >
      <motion.div
        ref={indexRef}
        style={{ opacity, y }}
        aria-hidden="true"
        className="absolute left-7 w-fit -translate-x-1/2 px-1 text-center text-lg font-bold tabular-nums text-white/40 sm:left-9 sm:text-xl"
      >
        {index}
      </motion.div>
      <motion.div style={{ opacity, y: contentY }} className="min-w-0 pl-16 sm:pl-20">
        {content}
      </motion.div>
    </li>
  );
};

const TimelineAnimateSegment = ({
  start,
  end,
  revealed,
}: {
  start: number;
  end: number;
  revealed: MotionValue<number>;
}) => {
  const height = useTransform(revealed, value => Math.min(Math.max(value - start, 0), end - start));

  return (
    <div
      aria-hidden="true"
      style={{ top: start, height: end - start }}
      className="absolute left-7 w-0.5 -translate-x-1/2 overflow-hidden bg-transparent sm:left-9"
    >
      <motion.div
        style={{ height }}
        className="absolute inset-x-0 top-0 w-0.5 rounded-full bg-white/25"
      />
    </div>
  );
};

const TimelineAnimate = ({
  data,
  className,
}: {
  data: TimelineAnimateEntry[];
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLOListElement>(null);
  const rowNodes = useRef<Array<HTMLLIElement | null>>([]);
  const indexNodes = useRef<Array<HTMLDivElement | null>>([]);
  const [segments, setSegments] = useState<Segment[]>([]);

  useEffect(() => {
    const contentNode = contentRef.current;

    if (!contentNode) return;

    const measure = () => {
      const containerTop = contentNode.getBoundingClientRect().top;

      const bounds = rowNodes.current
        .map((rowNode, nodeIndex) =>
          rowNode ? { rowNode, indexNode: indexNodes.current[nodeIndex] } : null,
        )
        .filter(
          (entry): entry is { rowNode: HTMLLIElement; indexNode: HTMLDivElement } =>
            !!entry?.indexNode,
        )
        .map(({ rowNode, indexNode }) => {
          const top = rowNode.getBoundingClientRect().top - containerTop;
          const height = indexNode.getBoundingClientRect().height;

          return { top, bottom: top + height };
        });

      if (!bounds.length) return;

      let cursor = 0;
      const nextSegments: Segment[] = [];

      bounds.forEach(bound => {
        nextSegments.push({
          start: cursor,
          end: Math.max(cursor, bound.top - LINE_GAP),
        });
        cursor = bound.bottom + LINE_GAP;
      });

      setSegments(nextSegments);
    };

    measure();

    const observer = new ResizeObserver(measure);

    observer.observe(contentNode);

    return () => observer.disconnect();
  }, [data.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  });

  const totalHeight = segments.at(-1)?.end ?? 0;
  const revealed = useTransform(scrollYProgress, [0, 1], [0, totalHeight]);

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <ol ref={contentRef} className="relative list-none p-0">
        <li aria-hidden="true" className="h-4 sm:h-8" />

        {data.map((item, itemIndex) => (
          <TimelineAnimateRow
            key={item.index}
            {...item}
            isLast={itemIndex === data.length - 1}
            rowRef={node => (rowNodes.current[itemIndex] = node)}
            indexRef={node => (indexNodes.current[itemIndex] = node)}
          />
        ))}

        {segments.map((segment, segmentIndex) => (
          <TimelineAnimateSegment
            key={segmentIndex}
            start={segment.start}
            end={segment.end}
            revealed={revealed}
          />
        ))}
      </ol>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Cardless Clean Editorial Experience Row                                  */
/* -------------------------------------------------------------------------- */

const ExperienceCard = ({
  logo,
  company,
  role,
  period,
  status,
  stack,
  achievement,
  description,
}: Omit<ExperienceStep, 'id'>) => {
  // Generate initials for company avatar if no image logo provided
  const initials = company
    .replace(/^PT\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();

  const [calError, setCalError] = useState(false);
  const [medError, setMedError] = useState(false);
  const [spkError, setSpkError] = useState(false);

  return (
    <div className="space-y-4">
      {/* Role & Company Header */}
      <div className="mb-2 flex gap-3.5 sm:items-center">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] font-bold text-white sm:size-13">
          {logo ? (
            <img
              src={logo}
              alt={`${company} logo`}
              loading="lazy"
              className="size-8 sm:size-9 object-contain"
            />
          ) : (
            <span className="text-xs font-extrabold sm:text-sm">{initials}</span>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-[#A1A1AA]">{company}</p>
          <h3 className="text-lg font-semibold text-[#FFFFFF] sm:text-2xl">{role}</h3>
        </div>
      </div>

      {/* Details: Period, Stack, Key Achievement */}
      <div className="space-y-3 text-sm sm:text-base">
        <p className="flex items-center gap-2.5 text-[#A1A1AA]">
          {!calError ? (
            <img
              src={ICONS.calendar}
              alt=""
              aria-hidden="true"
              className="size-5 sm:size-6 object-contain"
              onError={() => setCalError(true)}
            />
          ) : (
            <Calendar className="size-5 shrink-0 text-[#E4E4E7]" />
          )}
          <span>
            <span className="font-medium text-[#FFFFFF]">{period}</span>
            {status && (
              <span
                className={cn(
                  'ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium',
                  status.tone === 'positive'
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'bg-white/[0.08] text-[#E4E4E7]',
                )}
              >
                {status.text}
              </span>
            )}
          </span>
        </p>

        <div className="flex gap-2.5 sm:items-center">
          {!medError ? (
            <img
              src={ICONS.medal}
              alt=""
              aria-hidden="true"
              className="size-5 sm:size-6 object-contain mt-0.5 sm:mt-0"
              onError={() => setMedError(true)}
            />
          ) : (
            <Award className="size-5 shrink-0 text-[#E4E4E7] mt-0.5 sm:mt-0" />
          )}
          <ul aria-label="Stack" className="flex flex-wrap items-center gap-2">
            {stack.map(tech => (
              <li key={tech}>
                <Badge className="h-5.5 rounded-full bg-white/[0.06] px-2.5 text-xs font-medium text-[#D4D4D8]">
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        <p className="flex items-start gap-2.5 font-medium text-[#FFFFFF]">
          {!spkError ? (
            <img
              src={ICONS.speaker}
              alt=""
              aria-hidden="true"
              className="size-5 sm:size-6 object-contain mt-0.5"
              onError={() => setSpkError(true)}
            />
          ) : (
            <Sparkles className="size-5 shrink-0 text-[#E4E4E7] mt-0.5" />
          )}
          <span className="text-sm sm:text-base font-medium">{achievement}</span>
        </p>
      </div>

      {/* Description */}
      <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-[#8E8E93]">{description}</p>
    </div>
  );
};

export const TimelineComponent07 = ({
  data,
  eyebrow,
  heading,
  className,
}: TimelineComponent07Props) => {
  return (
    <div className={cn('w-full space-y-8', className)}>
      {(eyebrow || heading) && (
        <div className="space-y-1">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="text-3xl font-bold tracking-tight text-[#FFFFFF] sm:text-4xl">
              {heading}
            </h2>
          )}
        </div>
      )}
      <TimelineAnimate
        data={data.map(({ id, ...step }) => ({
          index: id,
          content: <ExperienceCard {...step} />,
        }))}
      />
    </div>
  );
};

export default TimelineComponent07;
