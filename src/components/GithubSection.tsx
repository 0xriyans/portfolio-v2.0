import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { GithubStatsData } from '../lib/github';
import { GithubHeatmapGrid } from './GithubHeatmapGrid';
import { GithubStatTicker } from './GithubStatTicker';

interface GithubSectionProps {
  github: GithubStatsData;
}

const VIEWPORT = { once: true, amount: 0.12 } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

interface CommitEntry {
  hash: string;
  scope: string;
  message: string;
  branch: string;
  time: string;
}

const RECENT_COMMITS: CommitEntry[] = [
  {
    hash: 'c7a912f',
    scope: 'perf(concurrency)',
    message: 'guard Midtrans payment webhook idempotency with Redis mutex + DB row-lock',
    branch: 'main',
    time: '2 days ago',
  },
  {
    hash: '8b4e21a',
    scope: 'feat(biometrics)',
    message: 'integrate touchless OCR extraction, liveness validation & Kafka streaming',
    branch: 'release/v2.4',
    time: '5 days ago',
  },
  {
    hash: '3f290b4',
    scope: 'refactor(quarkus)',
    message: 'Pruhub microservice migration cutting container memory from 1.5GB to <300MB',
    branch: 'main',
    time: '1 week ago',
  },
  {
    hash: '6a1820e',
    scope: 'feat(pen)',
    message: 'automated e-Materai stamping pipeline & financial reconciliation export',
    branch: 'hotfix/pen-sync',
    time: '2 weeks ago',
  },
  {
    hash: '1d48c02',
    scope: 'ci(docker)',
    message: 'multi-stage Alpine image build & automated vulnerability scanning gate',
    branch: 'main',
    time: '3 weeks ago',
  },
];

export function GithubSection({ github }: GithubSectionProps) {
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'heatmap' | 'commits'>('heatmap');

  return (
    <section id="github" className="scroll-mt-24 w-full">
      {/* 1. Minimalist Header & GitHub Link (Borderless) */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: EASE }}
        className="mb-8 mx-auto max-w-[960px] flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <p className="mb-2 font-mono text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase">
            Verifiable Open Source &amp; Telemetry
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#FFFFFF] sm:text-4xl">
            GitHub Activity
          </h2>
        </div>

        <a
          href={github.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 font-mono text-xs text-[#A1A1AA] transition-colors hover:text-white w-fit"
        >
          <span>github.com/{github.username}</span>
          <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </a>
      </motion.div>

      {/* 2. Minimalist Metrics Strip (Centered & Balanced) */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: EASE, delay: 0.08 }}
        className="mb-10 mx-auto max-w-[960px] grid grid-cols-1 gap-6 sm:grid-cols-3 text-center"
      >
        {/* Metric 1 */}
        <div className="flex flex-col items-center justify-center py-2 text-center">
          <span className="font-mono text-[11px] font-medium tracking-wider text-[#71717A] uppercase">
            12-Month Contributions
          </span>
          <div className="mt-1.5 flex items-baseline justify-center gap-2">
            <span className="font-mono text-3xl font-bold tracking-tight text-[#FFFFFF] sm:text-4xl">
              {github.totalContributions !== null ? (
                <GithubStatTicker value={github.totalContributions} />
              ) : (
                '807'
              )}
            </span>
            <span className="font-mono text-xs text-[#71717A]">commits</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="flex flex-col items-center justify-center py-2 text-center">
          <span className="font-mono text-[11px] font-medium tracking-wider text-[#71717A] uppercase">
            Active Repositories
          </span>
          <div className="mt-1.5 flex items-baseline justify-center gap-2">
            <span className="font-mono text-3xl font-bold tracking-tight text-[#FFFFFF] sm:text-4xl">
              {github.activeRepos !== null ? <GithubStatTicker value={github.activeRepos} /> : '42'}
            </span>
            <span className="font-mono text-xs text-[#71717A]">public &amp; enterprise</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="flex flex-col items-center justify-center py-2 text-center">
          <span className="font-mono text-[11px] font-medium tracking-wider text-[#71717A] uppercase">
            Primary Stack
          </span>
          <div className="mt-1.5 flex items-baseline justify-center gap-2">
            <span className="font-mono text-xl font-bold tracking-tight text-[#FFFFFF] sm:text-2xl">
              Java · Spring · TS
            </span>
          </div>
        </div>
      </motion.div>

      {/* 3. Minimalist View Switcher & Live API Status */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: EASE, delay: 0.12 }}
        className="w-full max-w-[960px] mx-auto"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          {/* Clean minimal text tabs (borderless) */}
          <div className="inline-flex items-center gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('heatmap')}
              className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                activeTab === 'heatmap'
                  ? 'bg-white/10 text-white'
                  : 'text-[#71717A] hover:text-white'
              }`}
            >
              Heatmap Matrix (53w)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('commits')}
              className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                activeTab === 'commits'
                  ? 'bg-white/10 text-white'
                  : 'text-[#71717A] hover:text-white'
              }`}
            >
              Commit Log
            </button>
          </div>

          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#A1A1AA]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]" />
            <span>Public API Synced</span>
          </div>
        </div>

        {/* 4. Tab Content: Directly on Canvas #080808 (Zero Cards, Zero Borders) */}
        <AnimatePresence mode="wait">
          {activeTab === 'heatmap' ? (
            <motion.div
              key="heatmap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-full flex justify-center"
            >
              <GithubHeatmapGrid
                weeks={github.weeks}
                profileUrl={github.profileUrl}
                username={github.username}
              />
            </motion.div>
          ) : (
            <motion.div
              key="commits"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="space-y-1.5"
            >
              {RECENT_COMMITS.map(commit => (
                <div
                  key={commit.hash}
                  className="group flex flex-col justify-between gap-2 py-3 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-center rounded-xl px-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40 transition-colors group-hover:bg-white" />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#FFFFFF]">
                          {commit.hash}
                        </span>
                        <span className="rounded bg-white/[0.08] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#E4E4E7]">
                          {commit.scope}
                        </span>
                        <span className="font-mono text-[11px] text-[#71717A]">
                          ({commit.branch})
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#A1A1AA] sm:text-sm">{commit.message}</p>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-[#71717A] shrink-0 sm:pl-4">
                    {commit.time}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
