import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { ContributionDay } from '../lib/github';

interface GithubHeatmapGridProps {
  weeks: (ContributionDay | null)[][];
  profileUrl: string;
  username: string;
}

const PALETTE_SCALE = [
  'rgba(255, 255, 255, 0.05)',
  'rgba(255, 255, 255, 0.22)',
  'rgba(255, 255, 255, 0.45)',
  'rgba(255, 255, 255, 0.72)',
  '#FFFFFF',
] as const;

export function GithubHeatmapGrid({ weeks, profileUrl, username }: GithubHeatmapGridProps) {
  const reduceMotion = useReducedMotion();
  const [selectedTip, setSelectedTip] = useState<string>(
    'Hover or tap any cell to view date and contributions.',
  );

  if (!weeks || weeks.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="mb-4 text-sm text-[#8E8E93]">
          Live GitHub contribution data could not be retrieved during build.
        </p>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#080808] hover:bg-[#E4E4E7]"
        >
          View @{username} on GitHub {'\u2197'}
        </a>
      </div>
    );
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <div className="w-full overflow-x-auto pb-2 flex justify-center">
        <div
          className="mx-auto inline-flex shrink-0 gap-[3px]"
          role="grid"
          aria-label={`12-month contribution heatmap for ${username}`}
        >
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-[3px]" role="row">
              {week.map((day, dIdx) => {
                if (!day) {
                  return <span key={`empty-${wIdx}-${dIdx}`} className="h-[12px] w-[12px]" />;
                }
                const label = `${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`;
                const color = PALETTE_SCALE[day.level] ?? PALETTE_SCALE[0];

                return (
                  <button
                    key={day.date}
                    type="button"
                    aria-label={label}
                    title={label}
                    onMouseEnter={() => setSelectedTip(label)}
                    onFocus={() => setSelectedTip(label)}
                    onClick={() => setSelectedTip(label)}
                    style={{ backgroundColor: color }}
                    className="h-[12px] w-[12px] sm:h-[13px] sm:w-[13px] cursor-pointer rounded-[3px] p-0 transition-all duration-150 hover:scale-135 hover:z-10 focus:outline-none focus:ring-1 focus:ring-white"
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex w-full flex-wrap items-center justify-between gap-3 pt-4">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          <p aria-live="polite" className="font-mono text-xs font-medium text-[#D4D4D8]">
            {selectedTip}
          </p>
        </div>

        <div
          className="flex items-center gap-1.5 font-mono text-xs text-[#8E8E93]"
          aria-hidden="true"
        >
          <span>Less</span>
          {PALETTE_SCALE.map(bg => (
            <span key={bg} style={{ backgroundColor: bg }} className="h-3 w-3 rounded-[3px]" />
          ))}
          <span>More</span>
        </div>
      </div>
    </motion.div>
  );
}
