import React, { useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaJava, FaDocker } from 'react-icons/fa';
import { SiSpringboot, SiApachekafka, SiPostgresql, SiKubernetes } from 'react-icons/si';
import { useInViewOnce, usePrefersReducedMotion } from '@hooks';
import { MOTION } from '@styles/motionTokens';

const marqueeLeft = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
`;

const marqueeRight = keyframes`
  from { transform: translate3d(-50%, 0, 0); }
  to { transform: translate3d(0, 0, 0); }
`;

const CORE_CARDS = [
  {
    name: 'Java',
    angle: -18,
    offsetX: -270,
    offsetY: 28,
    note: 'Primary backend language (6+ yrs)',
    badge: 'CORE',
    icon: <FaJava />,
  },
  {
    name: 'Spring Boot',
    angle: -12,
    offsetX: -180,
    offsetY: 12,
    note: 'Microservices, REST & Spring Cloud',
    badge: 'API',
    icon: <SiSpringboot />,
  },
  {
    name: 'Apache Kafka',
    angle: -6,
    offsetX: -90,
    offsetY: 3,
    note: 'Zero-loss manual offset streaming',
    badge: 'STREAM',
    icon: <SiApachekafka />,
  },
  {
    name: 'PostgreSQL',
    angle: 0,
    offsetX: 0,
    offsetY: 0,
    note: 'ACID ledger & SELECT FOR UPDATE',
    badge: 'ACID',
    icon: <SiPostgresql />,
  },
  {
    name: 'Quarkus',
    angle: 6,
    offsetX: 90,
    offsetY: 3,
    note: 'Pruhub Flink migration (<300 MB)',
    badge: 'CLOUD',
    icon: <span style={{ fontWeight: 800, fontSize: 18 }}>Q</span>,
  },
  {
    name: 'Kubernetes',
    angle: 12,
    offsetX: 180,
    offsetY: 12,
    note: 'Production container orchestration',
    badge: 'K8S',
    icon: <SiKubernetes />,
  },
  {
    name: 'Docker',
    angle: 18,
    offsetX: 270,
    offsetY: 28,
    note: 'Lean microservice container builds',
    badge: 'RUNTIME',
    icon: <FaDocker />,
  },
];

const ROW_ONE = [
  'Spring Cloud',
  'Angular',
  'Couchbase',
  'MySQL',
  'MongoDB',
  'Microsoft SQL Server',
  'Oracle',
  'Redis',
];

const ROW_TWO = [
  'TypeScript',
  'Python',
  'FastAPI',
  'RabbitMQ',
  'AWS',
  'SonarQube',
  'JUnit',
  'Git',
  'Postman',
  'React',
  'Next.js',
];

const StyledStackSection = styled.section`
  max-width: 1040px;

  .fan-stage {
    position: relative;
    height: 300px;
    margin: 30px auto 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      height: auto;
      display: flex;
      justify-content: flex-start;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      gap: 14px;
      padding: 12px 4px 18px;
      margin: 20px 0 36px;
    }
  }
`;

const FanCard = styled.div`
  position: absolute;
  width: 158px;
  height: 214px;
  background: #0d1117;
  border: 1px solid rgba(0, 255, 102, 0.32);
  border-radius: 8px;
  padding: 18px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.7);
  transform-origin: center bottom;
  cursor: default;
  z-index: ${({ index }) => 4 - Math.abs(index - 3) + 1};
  transform: ${({ open, offsetX, offsetY, angle }) =>
    open
      ? `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${angle}deg)`
      : 'translate3d(0, 12px, 0) rotate(0deg)'};
  transition: ${({ reduced, delay }) =>
    reduced
      ? 'none'
      : `transform ${MOTION.duration.fan}ms ${MOTION.easing.css} ${delay}ms, border-color ${MOTION.duration.micro}ms ease, box-shadow ${MOTION.duration.micro}ms ease`};

  @media (hover: hover) and (pointer: fine) {
    &:hover,
    &:focus-within {
      z-index: 20;
      border-color: var(--green);
      box-shadow: 0 18px 34px rgba(0, 255, 102, 0.24);
      transform: ${({ offsetX, offsetY, angle }) =>
    `translate3d(${offsetX}px, ${offsetY - MOTION.rise.fanHover}px, 0) rotate(${angle}deg)`};
      transition-delay: 0ms;

      .fan-tooltip {
        opacity: 1;
        transform: translate3d(-50%, 0, 0);
      }
    }
  }

  .card-badge {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--pink);
    letter-spacing: 0.1em;
    align-self: flex-end;
  }

  .card-icon {
    font-size: 32px;
    color: var(--green);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
  }

  .card-name {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 700;
    color: var(--white);
    text-align: center;
  }

  .mobile-note {
    display: none;
    font-family: var(--font-sans);
    font-size: 12px;
    color: var(--slate);
    text-align: center;
    line-height: 1.35;
  }

  .fan-tooltip {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translate3d(-50%, 6px, 0);
    width: 196px;
    padding: 8px 10px;
    background: #050505;
    border: 1px solid var(--green);
    border-radius: 4px;
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1.4;
    color: var(--lightest-slate);
    text-align: center;
    pointer-events: none;
    opacity: 0;
    transition: opacity ${MOTION.duration.micro}ms ease,
      transform ${MOTION.duration.micro}ms ${MOTION.easing.css};
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.7);

    strong {
      color: var(--green);
      display: block;
      margin-bottom: 2px;
    }
  }

  @media (max-width: 768px) {
    position: relative;
    flex: 0 0 156px;
    height: 190px;
    transform: none !important;
    scroll-snap-align: start;
    z-index: 1;

    .fan-tooltip {
      display: none;
    }

    .mobile-note {
      display: block;
    }
  }
`;

const MarqueeBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  padding: 6px 0;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);

  ${({ reduced }) =>
    reduced &&
    css`
      mask-image: none;
      -webkit-mask-image: none;
      overflow: visible;
    `}

  &:hover .marquee-track {
    animation-play-state: paused;
  }
`;

const MarqueeRow = styled.div`
  display: flex;
  width: max-content;

  .marquee-track {
    display: flex;
    gap: 12px;
    padding-right: 12px;
    animation: ${({ reverse, speed }) =>
    css`
        ${reverse ? marqueeRight : marqueeLeft} ${speed} linear infinite
      `};
  }

  ${({ reduced }) =>
    reduced &&
    css`
      width: 100%;
      .marquee-track {
        flex-wrap: wrap;
        animation: none;
      }
      .marquee-clone {
        display: none;
      }
    `}

  .chip {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--light-slate);
    background: #0d1117;
    border: 1px solid rgba(0, 255, 102, 0.22);
    padding: 7px 14px;
    border-radius: 9999px;
    white-space: nowrap;

    &::before {
      content: '>';
      color: var(--green);
      margin-right: 6px;
      font-weight: 700;
    }
  }
`;

const Stack = () => {
  const fanRef = useRef(null);
  const inView = useInViewOnce(fanRef, MOTION.trigger.viewport);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIdx, setActiveIdx] = useState(null);
  const isOpen = prefersReducedMotion || inView;

  return (
    <StyledStackSection id="stack">
      <h2 className="numbered-heading">[ 03 // STACK ]</h2>

      <div className="fan-stage" ref={fanRef} aria-label="Core backend stack cards">
        {CORE_CARDS.map((card, i) => (
          <FanCard
            key={card.name}
            index={i}
            open={isOpen}
            reduced={prefersReducedMotion}
            delay={i * MOTION.stagger.fan}
            offsetX={card.offsetX}
            offsetY={card.offsetY}
            angle={card.angle}
            tabIndex={0}
            aria-label={`${card.name}: ${card.note}`}
            onClick={() => setActiveIdx(activeIdx === i ? null : i)}>
            <div className="fan-tooltip" role="tooltip">
              <strong>{card.name}</strong>
              {card.note}
            </div>
            <span className="card-badge">{card.badge}</span>
            <div className="card-icon" aria-hidden="true">
              {card.icon}
            </div>
            <div className="card-name">{card.name}</div>
            <div className="mobile-note">{card.note}</div>
          </FanCard>
        ))}
      </div>

      <MarqueeBlock reduced={prefersReducedMotion} aria-label="Additional tools and databases">
        <MarqueeRow speed={MOTION.marquee.speedPrimary} reduced={prefersReducedMotion}>
          <div className="marquee-track">
            {ROW_ONE.map(tool => (
              <span className="chip" key={`r1a-${tool}`}>
                {tool}
              </span>
            ))}
          </div>
          <div className="marquee-track marquee-clone" aria-hidden="true">
            {ROW_ONE.map(tool => (
              <span className="chip" key={`r1b-${tool}`}>
                {tool}
              </span>
            ))}
          </div>
        </MarqueeRow>

        <MarqueeRow reverse speed={MOTION.marquee.speedSecondary} reduced={prefersReducedMotion}>
          <div className="marquee-track">
            {ROW_TWO.map(tool => (
              <span className="chip" key={`r2a-${tool}`}>
                {tool}
              </span>
            ))}
          </div>
          <div className="marquee-track marquee-clone" aria-hidden="true">
            {ROW_TWO.map(tool => (
              <span className="chip" key={`r2b-${tool}`}>
                {tool}
              </span>
            ))}
          </div>
        </MarqueeRow>
      </MarqueeBlock>
    </StyledStackSection>
  );
};

export default Stack;
