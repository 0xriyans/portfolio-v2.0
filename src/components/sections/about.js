import React, { useRef } from 'react';
import styled from 'styled-components';
import CountUp from '@components/CountUp';
import { useInViewOnce } from '@hooks';
import { MOTION } from '@styles/motionTokens';

const StyledAboutSection = styled.section`
  max-width: 1120px;

  .inner {
    margin-top: 32px;
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 28px;

    @media (max-width: 820px) {
      grid-template-columns: 1fr;
    }
  }
`;

const AboutCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 32px;

  @media (max-width: 600px) {
    padding: 24px 20px;
  }

  p {
    line-height: 1.72;
    margin-bottom: 18px;
    color: var(--text-secondary);
    font-size: var(--fz-lg);
  }

  strong {
    color: var(--cream);
    font-weight: 600;
  }

  .annot-underline,
  .annot-highlight,
  .annot-circle {
    position: relative;
    display: inline-block;
    color: var(--cream);
    font-weight: 600;
    z-index: 1;
  }

  .annot-underline {
    padding-bottom: 3px;
  }

  .annot-highlight {
    padding: 1px 6px;
  }

  .annot-circle {
    padding: 2px 10px;
  }

  svg.annot-svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: visible;
    z-index: -1;

    path,
    ellipse {
      stroke-dasharray: 420;
      stroke-dashoffset: ${({ $inView }) => ($inView ? 0 : 420)};
      transition: stroke-dashoffset ${MOTION.duration.annotation}ms ${MOTION.easing.css};
    }

    @media (prefers-reduced-motion: reduce) {
      path,
      ellipse {
        stroke-dashoffset: 0;
        transition: none;
      }
    }
  }

  .exploring-note {
    margin-top: 10px;
    padding: 14px 18px;
    background: rgba(1, 7, 54, 0.55);
    border: 1px solid var(--border);
    border-radius: 14px;
    font-size: var(--fz-sm);
    color: var(--text-secondary);

    strong {
      color: var(--cream);
    }
  }
`;

const VerifiedMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  .metric-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    padding: 20px 22px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    .metric-label {
      font-size: var(--fz-xs);
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.03em;
    }

    .metric-value {
      font-size: clamp(20px, 2.2vw, 24px);
      font-weight: 600;
      color: var(--cream);
      font-variant-numeric: tabular-nums;
      line-height: 1.25;
    }

    .metric-desc {
      font-size: var(--fz-sm);
      color: var(--text-secondary);
      line-height: 1.45;
    }
  }
`;

const About = () => {
  const aboutRef = useRef(null);
  const inView = useInViewOnce(aboutRef, MOTION.trigger.viewport);

  return (
    <StyledAboutSection id="about" ref={aboutRef}>
      <span className="section-kicker">Background</span>
      <h2 className="section-heading">About</h2>

      <div className="inner">
        <AboutCard $inView={inView}>
          <p>
            I&apos;m <strong>Riyan Sugiarto</strong>, a{' '}
            <span className="annot-underline">
              Software Engineer
              <svg
                className="annot-svg"
                viewBox="0 0 180 28"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M 2 26 Q 90 23 178 26"
                  fill="none"
                  stroke="#FCF1D0"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            based in Jakarta, Indonesia with{' '}
            <span className="annot-circle">
              6+ years
              <svg
                className="annot-svg"
                viewBox="0 0 120 40"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <ellipse
                  cx="60"
                  cy="20"
                  rx="56"
                  ry="16"
                  fill="none"
                  stroke="#FCF1D0"
                  strokeWidth="2.5"
                />
              </svg>
            </span>{' '}
            of experience building enterprise platforms across insurance, credit guarantees, and
            telecom.
          </p>

          <p>
            I design{' '}
            <span className="annot-highlight">
              backend systems, APIs, and databases
              <svg
                className="annot-svg"
                viewBox="0 0 260 28"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M 0 14 L 260 14"
                  fill="none"
                  stroke="rgba(34, 57, 111, 0.85)"
                  strokeWidth="24"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            with <strong>Java</strong>, <strong>Spring Boot / Spring Cloud</strong>,{' '}
            <strong>Quarkus</strong>, <strong>Apache Kafka</strong>, and <strong>PostgreSQL</strong>
            , and also ship frontend UIs and applied AI workflows end-to-end so features actually
            ship.
          </p>

          <p>
            Strong believer in maintainable code, concurrency safety, and pragmatic trade-offs over
            unnecessary infrastructure complexity.
          </p>

          <div className="exploring-note">
            <strong>Currently exploring:</strong> autonomous AI agent workflows &amp; Web3
            fundamentals (Solidity, Ethereum, Web3.js).
          </div>
        </AboutCard>

        <VerifiedMetricsGrid aria-label="Verified production engineering metrics">
          <div className="metric-card">
            <div className="metric-label">Pruhub · Prudential</div>
            <div className="metric-value">
              &gt;1.5 GB &rarr; &lt;300 MB (
              <CountUp to={60} suffix="%+" active={inView} minCh={3} />)
            </div>
            <div className="metric-desc">
              Container memory reduction migrating Apache Flink pipelines to Quarkus microservices.
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Pruhub · Withdrawals</div>
            <div className="metric-value">2 Days &rarr; Real-Time</div>
            <div className="metric-desc">
              Zero-loss Apache Kafka with manual offset commits and PostgreSQL ACID ledger.
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Portal Bisnis · Askrindo</div>
            <div className="metric-value">Redis + FOR UPDATE Lock</div>
            <div className="metric-desc">
              Midtrans payment concurrency guarded via{' '}
              <code>SET lock:pay:&#123;order_id&#125; NX EX 30</code> + DB pessimistic lock with
              idempotent HTTP <code>200</code>.
            </div>
          </div>
        </VerifiedMetricsGrid>
      </div>
    </StyledAboutSection>
  );
};

export default About;
