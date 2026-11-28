import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import {
  siAngular,
  siAnthropic,
  siApachekafka,
  siCouchbase,
  siDocker,
  siExpress,
  siFastapi,
  siGit,
  siGooglegemini,
  siHuggingface,
  siJavascript,
  siJunit5,
  siKubernetes,
  siLangchain,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOllama,
  siOpenjdk,
  siPostgresql,
  siPostman,
  siPython,
  siQuarkus,
  siRabbitmq,
  siReact,
  siRedis,
  siSonarqubeserver,
  siSpring,
  siSpringboot,
  siTailwindcss,
  siTypescript,
  siVite,
} from 'simple-icons';
import { CORE_STACK_CARDS } from '../lib/config';
import { Marquee } from './ui/marquee';

const FAN_ANGLES = [-14, -9.3, -4.6, 0, 4.6, 9.3, 14] as const;
const FAN_ARC_Y = [14, 6, 2, 0, 2, 6, 14] as const;

// Comprehensive Simple Icons Path Mapping
const ICON_PATHS: Record<string, string> = {
  Java: siOpenjdk.path,
  Python: siPython.path,
  TypeScript: siTypescript.path,
  JavaScript: siJavascript.path,
  SQL: siPostgresql.path,
  'Spring Boot': siSpringboot.path,
  'Spring Cloud': siSpring.path,
  FastAPI: siFastapi.path,
  Quarkus: siQuarkus.path,
  'Node.js': siNodedotjs.path,
  Express: siExpress.path,
  'Google Gemini': siGooglegemini.path,
  Anthropic: siAnthropic.path,
  LangChain: siLangchain.path,
  'Hugging Face': siHuggingface.path,
  Ollama: siOllama.path,
  React: siReact.path,
  'Next.js': siNextdotjs.path,
  'Tailwind CSS': siTailwindcss.path,
  Vite: siVite.path,
  Angular: siAngular.path,
  PostgreSQL: siPostgresql.path,
  MongoDB: siMongodb.path,
  Redis: siRedis.path,
  'Apache Kafka': siApachekafka.path,
  RabbitMQ: siRabbitmq.path,
  Couchbase: siCouchbase.path,
  MySQL: siMysql.path,
  Docker: siDocker.path,
  Kubernetes: siKubernetes.path,
  SonarQube: siSonarqubeserver.path,
  JUnit: siJunit5.path,
  Git: siGit.path,
  Postman: siPostman.path,
};

function TechBrandLogo({ name }: { name: string }) {
  const path = ICON_PATHS[name];

  if (path) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
        <path d={path} />
      </svg>
    );
  }

  // Bespoke SVG icons for items not in simple-icons
  if (name === 'OpenAI API') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
        <path d="M22.28 9.61a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6.06 6.06 0 0 0 4.98 4.2a5.98 5.98 0 0 0-3.99 4.38 6.05 6.05 0 0 0 1.25 7.07 5.98 5.98 0 0 0 .52 4.9 6.05 6.05 0 0 0 6.51 2.9 6.06 6.06 0 0 0 10.27-2.4 5.98 5.98 0 0 0 3.99-4.38 6.05 6.05 0 0 0-1.25-7.06zM12 14.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
      </svg>
    );
  }

  if (name === 'AWS') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
      </svg>
    );
  }

  if (name === 'SQL Server') {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    );
  }

  if (name === 'RAG & Agents') {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    );
  }

  // Fallback database / server glyph
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 7h10M7 12h10M7 17h10" />
    </svg>
  );
}

const STACK_FACE_SUB: Record<string, string> = {
  Java: 'JVM Backend',
  'Spring Boot': 'Microservices',
  'Apache Kafka': 'Event Stream',
  PostgreSQL: 'ACID Ledger',
  Quarkus: '<300 MB RAM',
  Kubernetes: 'Orchestration',
  Docker: 'Containers',
};

export interface MarqueeItemData {
  name: string;
  category: string;
}

// Enhanced Marquee items with explicit category tags
const MARQUEE_ENHANCED_ROW_1: MarqueeItemData[] = [
  { name: 'Java', category: 'LANG' },
  { name: 'Spring Boot', category: 'BACKEND' },
  { name: 'Apache Kafka', category: 'STREAM' },
  { name: 'PostgreSQL', category: 'DATABASE' },
  { name: 'Google Gemini', category: 'AI & LLM' },
  { name: 'Docker', category: 'INFRA' },
  { name: 'FastAPI', category: 'BACKEND' },
  { name: 'React', category: 'FRONTEND' },
  { name: 'TypeScript', category: 'LANG' },
  { name: 'Redis', category: 'CACHE' },
  { name: 'Anthropic', category: 'AI & LLM' },
  { name: 'Kubernetes', category: 'INFRA' },
  { name: 'Quarkus', category: 'BACKEND' },
  { name: 'Python', category: 'LANG' },
  { name: 'LangChain', category: 'AI & LLM' },
  { name: 'Next.js', category: 'FRONTEND' },
];

const MARQUEE_ENHANCED_ROW_2: MarqueeItemData[] = [
  { name: 'Spring Cloud', category: 'BACKEND' },
  { name: 'OpenAI API', category: 'AI & LLM' },
  { name: 'SQL Server', category: 'DATABASE' },
  { name: 'Tailwind CSS', category: 'FRONTEND' },
  { name: 'Hugging Face', category: 'AI & LLM' },
  { name: 'AWS', category: 'CLOUD' },
  { name: 'Node.js', category: 'BACKEND' },
  { name: 'RabbitMQ', category: 'STREAM' },
  { name: 'Ollama', category: 'AI & LLM' },
  { name: 'MongoDB', category: 'DATABASE' },
  { name: 'Angular', category: 'FRONTEND' },
  { name: 'SonarQube', category: 'TESTING' },
  { name: 'Couchbase', category: 'DATABASE' },
  { name: 'Git', category: 'DEVOPS' },
  { name: 'Express', category: 'BACKEND' },
  { name: 'Postman', category: 'API' },
  { name: 'RAG & Agents', category: 'AI & LLM' },
  { name: 'Vite', category: 'FRONTEND' },
];

const FAN_VIEWPORT = { once: true, amount: 0.15 } as const;

export function StackInteractive() {
  const fanRef = useRef<HTMLDivElement>(null);
  const inView = useInView(fanRef, FAN_VIEWPORT);
  const reduceMotion = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [tappedIdx, setTappedIdx] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setEntered(true), 1000);
    return () => clearTimeout(t);
  }, [inView]);

  const fanned = reduceMotion || inView;

  return (
    <div ref={fanRef}>
      {/* Mobile (<md): horizontal swipe row, 0° rotation, no overlap, tap toggles tooltip */}
      <div
        className="mb-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pt-14 pb-6 md:hidden"
        aria-label="Core backend technology cards"
      >
        {CORE_STACK_CARDS.map((card, idx) => {
          const isTapped = tappedIdx === idx;

          return (
            <div key={card.name} className="relative h-[200px] w-[180px] shrink-0 snap-start">
              {isTapped && (
                <div
                  role="tooltip"
                  style={{
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '12px',
                    zIndex: 20,
                  }}
                  className="pointer-events-none absolute rounded-full bg-[#18181B] px-3 py-1.5 text-[11px] font-medium whitespace-nowrap text-[#FFFFFF] shadow-xl"
                >
                  {card.name} — {card.note}
                </div>
              )}

              <button
                type="button"
                onClick={() => setTappedIdx(prev => (prev === idx ? null : idx))}
                aria-label={`${card.name}: ${card.note}`}
                className="flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-[#121214] p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
              >
                <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#080808] text-xs font-bold tracking-wider text-white">
                  <TechBrandLogo name={card.name} />
                </div>

                <div className="w-full overflow-hidden bg-transparent pt-2 text-center">
                  <div className="truncate text-sm font-semibold text-[#FFFFFF]">{card.name}</div>
                  <p className="mt-1 truncate text-[11px] leading-snug text-[#8E8E93]">
                    {STACK_FACE_SUB[card.name] ?? card.note}
                  </p>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Desktop (md+): 7 cards in one flex row overlapping ~42px via negative margin */}
      <div className="relative mb-14 hidden justify-center pt-16 pb-10 md:flex">
        <div className="flex items-end justify-center">
          {CORE_STACK_CARDS.map((card, idx) => {
            const angle = FAN_ANGLES[idx] ?? 0;
            const arcY = FAN_ARC_Y[idx] ?? 0;
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={card.name}
                tabIndex={0}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onFocus={() => setHoveredIdx(idx)}
                onBlur={() => setHoveredIdx(null)}
                initial={reduceMotion ? false : { opacity: 0, rotate: 0, y: 24 }}
                animate={
                  isHovered
                    ? { opacity: 1, rotate: 0, y: -12 }
                    : fanned
                      ? { opacity: 1, rotate: angle, y: arcY }
                      : { opacity: 0, rotate: 0, y: 24 }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : entered
                      ? { type: 'spring', stiffness: 360, damping: 26 }
                      : { duration: 0.7, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }
                }
                style={{
                  transformOrigin: 'bottom center',
                  zIndex: isHovered ? 10 : 1,
                }}
                className={`relative h-[200px] w-[180px] shrink-0 cursor-pointer focus:outline-none ${
                  idx > 0 ? '-ml-[42px]' : ''
                }`}
              >
                {isHovered && (
                  <div
                    role="tooltip"
                    style={{
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginBottom: '12px',
                      zIndex: 20,
                    }}
                    className="pointer-events-none absolute rounded-full bg-[#18181B] px-3 py-1.5 text-[11px] font-medium whitespace-nowrap text-[#FFFFFF] shadow-2xl"
                  >
                    {card.name} — {card.note}
                  </div>
                )}

                <div className="flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-[#121214] px-4 py-4 shadow-[0_12px_28px_rgba(0,0,0,0.5)] transition-all hover:bg-[#18181B]">
                  <span className="self-center rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10px] font-semibold text-[#E4E4E7]">
                    {card.badge}
                  </span>

                  <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#080808] text-xs font-bold tracking-wider text-white">
                    <TechBrandLogo name={card.name} />
                  </div>

                  <div className="w-full overflow-hidden bg-transparent pt-1 text-center">
                    <div className="truncate text-sm font-semibold text-[#FFFFFF]">{card.name}</div>
                    <p className="mt-0.5 truncate text-[11px] leading-snug text-[#8E8E93]">
                      {STACK_FACE_SUB[card.name] ?? card.note}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Enhanced 2-Row Opposite-Direction Marquee with Category Badges & Logos */}
      <div className="relative mb-6 space-y-3.5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#080808_8%,#080808_92%,transparent)]">
        <Marquee pauseOnHover className="py-1 [--duration:38s] [--gap:0.75rem]">
          {MARQUEE_ENHANCED_ROW_1.map(item => (
            <div
              key={item.name}
              className="group inline-flex items-center gap-2 rounded-full bg-[#141416] px-3 py-1.5 text-xs font-medium text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-200 hover:bg-[#1C1C1F] hover:scale-[1.03]"
            >
              <span className="rounded-full bg-white/[0.06] px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-[#A1A1AA] group-hover:text-white transition-colors">
                {item.category}
              </span>
              <span className="flex h-4 w-4 shrink-0 items-center justify-center text-white/80 group-hover:text-white transition-colors">
                <TechBrandLogo name={item.name} />
              </span>
              <span className="font-semibold tracking-tight text-[#FFFFFF] whitespace-nowrap">
                {item.name}
              </span>
            </div>
          ))}
        </Marquee>

        <Marquee pauseOnHover reverse className="py-1 [--duration:42s] [--gap:0.75rem]">
          {MARQUEE_ENHANCED_ROW_2.map(item => (
            <div
              key={item.name}
              className="group inline-flex items-center gap-2 rounded-full bg-[#141416] px-3 py-1.5 text-xs font-medium text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-200 hover:bg-[#1C1C1F] hover:scale-[1.03]"
            >
              <span className="rounded-full bg-white/[0.06] px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-[#A1A1AA] group-hover:text-white transition-colors">
                {item.category}
              </span>
              <span className="flex h-4 w-4 shrink-0 items-center justify-center text-white/80 group-hover:text-white transition-colors">
                <TechBrandLogo name={item.name} />
              </span>
              <span className="font-semibold tracking-tight text-[#FFFFFF] whitespace-nowrap">
                {item.name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
