import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styled, { keyframes } from 'styled-components';
import { useInViewOnce, usePrefersReducedMotion } from '@hooks';
import { MOTION } from '@styles/motionTokens';

const CORE_CARDS = [
  {
    name: 'Java',
    note: 'Primary backend language (6+ yrs)',
    badge: 'Core',
    glyph: 'JVM',
    angle: -18,
    offsetX: -288,
    offsetY: 26,
  },
  {
    name: 'Spring Boot',
    note: 'Microservices, REST & Spring Cloud',
    badge: 'API',
    glyph: 'SB',
    angle: -12,
    offsetX: -192,
    offsetY: 11,
  },
  {
    name: 'Apache Kafka',
    note: 'Zero-loss manual offset streaming',
    badge: 'Stream',
    glyph: 'KFK',
    angle: -6,
    offsetX: -96,
    offsetY: 3,
  },
  {
    name: 'PostgreSQL',
    note: 'ACID ledger & SELECT FOR UPDATE',
    badge: 'ACID',
    glyph: 'PG',
    angle: 0,
    offsetX: 0,
    offsetY: 0,
  },
  {
    name: 'Quarkus',
    note: 'Flink migration (<300 MB RAM)',
    badge: 'Cloud',
    glyph: 'QKS',
    angle: 6,
    offsetX: 96,
    offsetY: 3,
  },
  {
    name: 'Kubernetes',
    note: 'Production container orchestration',
    badge: 'K8s',
    glyph: 'K8S',
    angle: 12,
    offsetX: 192,
    offsetY: 11,
  },
  {
    name: 'Docker',
    note: 'Lean container builds & tooling',
    badge: 'Runtime',
    glyph: 'DKR',
    angle: 18,
    offsetX: 288,
    offsetY: 26,
  },
];

const STACK_GROUPS = [
  {
    label: 'Languages',
    items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    label: 'Backend',
    items: ['Spring Boot', 'Spring Cloud', 'FastAPI', 'Quarkus', 'Node.js', 'Express'],
  },
  {
    label: 'AI & LLM',
    items: [
      'Google Gemini',
      'Anthropic',
      'OpenAI API',
      'LangChain',
      'Hugging Face',
      'Ollama',
      'RAG & Agents',
    ],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'Angular'],
  },
  {
    label: 'Data & Messaging',
    items: [
      'PostgreSQL',
      'SQL Server',
      'MongoDB',
      'Redis',
      'SQLModel',
      'Apache Kafka',
      'RabbitMQ',
      'Couchbase',
      'MySQL',
      'Oracle',
    ],
  },
  {
    label: 'Infra & Tooling',
    items: ['Docker', 'Kubernetes', 'AWS', 'SonarQube', 'JUnit', 'Git', 'Postman'],
  },
];

const EXPLORING_ITEMS = ['Solidity', 'Ethereum', 'Web3.js'];

const MARQUEE_ROW_1 = [
  'Python',
  'TypeScript',
  'JavaScript',
  'SQL',
  'Spring Cloud',
  'FastAPI',
  'Node.js',
  'Express',
  'Google Gemini',
  'Anthropic',
  'OpenAI API',
  'LangChain',
  'Hugging Face',
  'Ollama',
  'RAG & Agents',
];

const MARQUEE_ROW_2 = [
  'React',
  'Next.js',
  'Tailwind CSS',
  'Vite',
  'Angular',
  'SQL Server',
  'MongoDB',
  'Redis',
  'SQLModel',
  'RabbitMQ',
  'Couchbase',
  'MySQL',
  'Oracle',
  'AWS',
  'SonarQube',
  'JUnit',
  'Git',
  'Postman',
];

const marqueeLeft = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
`;

const marqueeRight = keyframes`
  0% {
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

const StyledStackSection = styled.section`
  max-width: 1120px;

  .fan-stage {
    position: relative;
    height: 290px;
    margin: 40px auto 52px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 860px) {
      height: auto;
      justify-content: flex-start;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      gap: 14px;
      padding: 8px 4px 16px;
      margin: 28px 0 36px;
    }
  }

  .groups-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .marquee-wrap {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 28px;
    overflow: hidden;
    mask-image: linear-gradient(90deg, transparent, #010736 6%, #010736 94%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, #010736 6%, #010736 94%, transparent);
  }

  .marquee-track {
    display: flex;
    width: max-content;
    gap: 10px;
    will-change: transform;

    &.row-1 {
      animation: ${marqueeLeft} ${MOTION.marquee.speedPrimary} linear infinite;
    }

    &.row-2 {
      animation: ${marqueeRight} ${MOTION.marquee.speedSecondary} linear infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      flex-wrap: wrap;
      width: 100%;
    }
  }

  .marquee-wrap:hover .marquee-track {
    animation-play-state: paused;
  }

  .marquee-chip {
    padding: 7px 15px;
    font-size: var(--fz-xs);
    font-weight: 500;
    color: var(--cream);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-pill);
    white-space: nowrap;
  }

  .group-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    padding: 20px 22px;

    h3 {
      margin: 0 0 12px;
      font-size: var(--fz-md);
      font-weight: 600;
      color: var(--cream);
    }

    .chip-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .chip {
      padding: 6px 13px;
      font-size: var(--fz-xs);
      font-weight: 500;
      color: var(--text-secondary);
      background: rgba(1, 7, 54, 0.55);
      border: 1px solid var(--border);
      border-radius: var(--radius-pill);
    }
  }

  .exploring-box {
    background: var(--surface);
    border: 1px dashed rgba(252, 241, 208, 0.35);
    border-radius: var(--radius-card);
    padding: 20px 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    .exploring-meta {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .exploring-tag {
        display: inline-flex;
        align-self: flex-start;
        padding: 4px 12px;
        border-radius: var(--radius-pill);
        background: rgba(252, 241, 208, 0.14);
        color: var(--cream);
        font-size: var(--fz-xs);
        font-weight: 600;
        letter-spacing: 0.02em;
      }

      p {
        margin: 0;
        font-size: var(--fz-sm);
        color: var(--text-muted);
      }
    }

    .exploring-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .chip {
        padding: 6px 14px;
        border-radius: var(--radius-pill);
        background: rgba(34, 57, 111, 0.45);
        border: 1px solid var(--border);
        color: var(--cream);
        font-size: var(--fz-xs);
        font-weight: 500;
      }
    }
  }
`;

const FanCard = styled.div`
  position: absolute;
  width: 162px;
  height: 214px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 14px 28px rgba(1, 7, 54, 0.45);
  z-index: ${({ $index }) => 4 - Math.abs($index - 3) + 1};
  transform: ${({ $offsetX, $offsetY, $angle }) =>
    `translate3d(${$offsetX}px, ${$offsetY}px, 0) rotate(${$angle}deg)`};
  transition:
    box-shadow ${MOTION.duration.micro}ms ${MOTION.easing.css},
    border-color ${MOTION.duration.micro}ms ${MOTION.easing.css};

  .card-tooltip {
    position: absolute;
    left: 50%;
    bottom: calc(100% + 10px);
    transform: translateX(-50%) translateY(4px);
    padding: 6px 10px;
    border-radius: 10px;
    background: var(--bg);
    border: 1px solid var(--border);
    color: var(--cream);
    font-size: 11px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition:
      opacity ${MOTION.duration.micro}ms ${MOTION.easing.css},
      transform ${MOTION.duration.micro}ms ${MOTION.easing.css};
    z-index: 20;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      z-index: 15;
      border-color: rgba(252, 241, 208, 0.55);
      box-shadow: 0 22px 38px rgba(1, 7, 54, 0.65);

      .card-tooltip {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  }

  .card-badge {
    align-self: flex-end;
    padding: 3px 9px;
    border-radius: var(--radius-pill);
    background: rgba(34, 57, 111, 0.7);
    color: var(--cream);
    font-size: 11px;
    font-weight: 600;
  }

  .card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;

    span {
      padding: 8px 14px;
      border-radius: 12px;
      background: rgba(252, 241, 208, 0.12);
      border: 1px solid rgba(252, 241, 208, 0.28);
      color: var(--cream);
      font-size: var(--fz-md);
      font-weight: 600;
      letter-spacing: 0.04em;
    }
  }

  .card-name {
    font-size: var(--fz-md);
    font-weight: 600;
    color: var(--cream);
    text-align: center;
  }

  .card-note {
    font-size: 12px;
    color: var(--text-muted);
    text-align: center;
    line-height: 1.35;
  }

  @media (max-width: 860px) {
    position: relative;
    flex: 0 0 162px;
    height: 204px;
    transform: none;
    scroll-snap-align: start;
    z-index: 1;
  }
`;

const Stack = () => {
  const fanRef = useRef(null);
  const fanInView = useInViewOnce(fanRef, MOTION.trigger.viewport);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!fanInView || prefersReducedMotion) {
      return undefined;
    }
    if (typeof window !== 'undefined' && window.innerWidth <= 860) {
      return undefined;
    }

    const stage = fanRef.current;
    if (!stage) {
      return undefined;
    }
    const cards = Array.from(stage.querySelectorAll('[data-fan-card]'));
    if (!cards.length) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { x: 0, y: 0, rotation: 0 },
        {
          x: i => CORE_CARDS[i].offsetX,
          y: i => CORE_CARDS[i].offsetY,
          rotation: i => CORE_CARDS[i].angle,
          duration: MOTION.duration.fan / 1000,
          stagger: MOTION.stagger.fan / 1000,
          ease: MOTION.easing.gsap,
        },
      );
    }, stage);

    return () => ctx.revert();
  }, [fanInView, prefersReducedMotion]);

  return (
    <StyledStackSection id="stack">
      <span className="section-kicker">Core capabilities</span>
      <h2 className="section-heading">Technology Stack</h2>
      <p className="section-intro">
        Core backend specialization in Java, Spring Boot / Spring Cloud, Quarkus, Apache Kafka,
        PostgreSQL, Kubernetes, and Docker — paired with end-to-end delivery across frontend, data,
        and applied AI workflows.
      </p>

      <div className="fan-stage" ref={fanRef} aria-label="Core backend stack cards">
        {CORE_CARDS.map((card, i) => (
          <FanCard
            key={card.name}
            data-fan-card
            $index={i}
            $offsetX={card.offsetX}
            $offsetY={card.offsetY}
            $angle={card.angle}
            onMouseEnter={e => {
              if (
                !prefersReducedMotion &&
                typeof window !== 'undefined' &&
                window.innerWidth > 860
              ) {
                gsap.to(e.currentTarget, {
                  y: card.offsetY - MOTION.rise.fanHover,
                  duration: MOTION.duration.micro / 1000,
                  ease: MOTION.easing.gsap,
                });
              }
            }}
            onMouseLeave={e => {
              if (
                !prefersReducedMotion &&
                typeof window !== 'undefined' &&
                window.innerWidth > 860
              ) {
                gsap.to(e.currentTarget, {
                  y: card.offsetY,
                  duration: MOTION.duration.micro / 1000,
                  ease: MOTION.easing.gsap,
                });
              }
            }}
          >
            <span className="card-tooltip">
              {card.name} — {card.note}
            </span>
            <span className="card-badge">{card.badge}</span>
            <div className="card-icon" aria-hidden="true">
              <span>{card.glyph}</span>
            </div>
            <div>
              <div className="card-name">{card.name}</div>
              <div className="card-note">{card.note}</div>
            </div>
          </FanCard>
        ))}
      </div>

      <div className="marquee-wrap" aria-label="Profile technologies marquee">
        <div className="marquee-track row-1">
          {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((item, idx) => (
            <span className="marquee-chip" key={`r1-${idx}-${item}`}>
              {item}
            </span>
          ))}
        </div>
        <div className="marquee-track row-2">
          {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((item, idx) => (
            <span className="marquee-chip" key={`r2-${idx}-${item}`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="groups-grid" aria-label="Full stack capabilities by category">
        {STACK_GROUPS.map(group => (
          <div className="group-card" key={group.label}>
            <h3>{group.label}</h3>
            <div className="chip-list">
              {group.items.map(item => (
                <span className="chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="exploring-box" aria-label="Currently exploring technologies">
        <div className="exploring-meta">
          <span className="exploring-tag">Exploring (not production mastered)</span>
          <p>Currently exploring: autonomous AI agent workflows &amp; Web3 fundamentals.</p>
        </div>
        <div className="exploring-chips">
          {EXPLORING_ITEMS.map(item => (
            <span className="chip" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </StyledStackSection>
  );
};

export default Stack;
