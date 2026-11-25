import React, { useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled, { keyframes, css } from 'styled-components';
import { useInViewOnce, usePrefersReducedMotion } from '@hooks';
import { MOTION } from '@styles/motionTokens';
import CountUp from '../CountUp';

const drawStroke = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const StyledAboutSection = styled.section`
  max-width: 980px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 40px;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      gap: 28px;
    }
  }
`;

const StyledText = styled.div`
  ${({ theme }) => theme.mixins.glassmorphism};
  padding: 55px 30px 30px;
  font-family: var(--font-sans);

  @media (max-width: 768px) {
    padding: 50px 20px 24px;
  }

  &::after {
    content: 'cat whoami.txt';
  }

  p {
    line-height: 1.7;
    margin-bottom: 18px;
    color: var(--light-slate);
    font-size: var(--fz-md);
  }

  strong {
    color: var(--green);
    font-weight: 600;
  }

  .annot-wrap {
    position: relative;
    display: inline-block;
    padding: 0 3px;
    color: var(--white);
    font-weight: 600;
    z-index: 1;
  }

  .annot-brackets {
    position: relative;
    display: inline-block;
    padding: 2px 10px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: 0.92em;
  }

  svg.annot-svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: visible;
  }

  .annot-stroke {
    stroke-dasharray: 420;
    stroke-dashoffset: ${({ active, reduced }) => (active || reduced ? 0 : 420)};
    ${({ active, reduced }) =>
    active &&
      !reduced &&
      css`
        animation: ${drawStroke} ${MOTION.duration.annotation}ms ${MOTION.easing.css} forwards;
      `}
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 70%;
    max-width: 280px;
    order: -1;
  }

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    background: #0d1117;
    border-radius: 8px;
    border: 1px solid rgba(0, 255, 102, 0.25);
    box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.7);
    padding-top: 40px;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 14px;
      left: 15px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #ff5f56;
      box-shadow: 20px 0 0 #ffbd2e, 40px 0 0 #27c93f;
      z-index: 2;
    }

    &::after {
      content: 'riyan_sugiarto.png';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 40px;
      background: #161b22;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: var(--light-slate);
      font-size: 11px;
      font-family: var(--font-mono);
      line-height: 40px;
      text-align: center;
      letter-spacing: 1px;
      z-index: 1;
    }

    .img {
      position: relative;
      display: block;
      width: 100%;
    }
  }
`;

const StyledVerifiedMetrics = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 10px 0 0;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }

  .metric-card {
    background: #0d1117;
    border: 1px solid rgba(0, 255, 102, 0.25);
    border-radius: 6px;
    padding: 20px 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .metric-label {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--pink);
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .metric-value {
      font-family: var(--font-mono);
      font-size: clamp(19px, 2.2vw, 22px);
      font-weight: 700;
      color: var(--green);
      font-variant-numeric: tabular-nums;
      line-height: 1.25;
    }

    .metric-desc {
      font-family: var(--font-sans);
      font-size: var(--fz-xs);
      color: var(--slate);
      line-height: 1.45;
    }

    code {
      font-size: 11px;
      color: var(--green);
      background: rgba(0, 255, 102, 0.08);
      padding: 1px 4px;
    }
  }
`;

const About = () => {
  const { t } = useTranslation();
  const textRef = useRef(null);
  const metricsRef = useRef(null);
  const textInView = useInViewOnce(textRef, MOTION.trigger.viewport);
  const metricsInView = useInViewOnce(metricsRef, MOTION.trigger.viewport);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <StyledAboutSection id="about">
      <h2 className="numbered-heading">{t('About Me')}</h2>

      <div className="inner">
        <StyledText ref={textRef} active={textInView} reduced={prefersReducedMotion}>
          <div className="text">
            <p>
              Hello! I&apos;m <strong>Riyan Sugiarto</strong>, a{' '}
              <span className="annot-wrap">
                Backend Software Engineer
                <svg
                  className="annot-svg"
                  viewBox="0 0 220 26"
                  preserveAspectRatio="none"
                  aria-hidden="true">
                  <path
                    className="annot-stroke"
                    d="M 2 24 L 218 24"
                    fill="none"
                    stroke="#00ff66"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              based in Jakarta, Indonesia with <strong>6+ years</strong> of experience building
              enterprise systems across insurance, banking guarantees, and telecom.
            </p>

            <p>
              My core stack centers on{' '}
              <span className="annot-wrap">
                Java, Spring Boot &amp; Kafka
                <svg
                  className="annot-svg"
                  viewBox="0 0 220 26"
                  preserveAspectRatio="none"
                  aria-hidden="true">
                  <path
                    className="annot-stroke"
                    d="M 0 13 L 220 13"
                    fill="none"
                    stroke="rgba(0, 255, 102, 0.16)"
                    strokeWidth="24"
                  />
                </svg>
              </span>{' '}
              alongside <strong>Quarkus</strong>, <strong>PostgreSQL</strong>, and full-stack
              delivery with <strong>Angular</strong> at Askrindo and <strong>MSIG Life</strong>. I
              optimize for{' '}
              <span className="annot-brackets">
                Zero-Loss &amp; ACID
                <svg
                  className="annot-svg"
                  viewBox="0 0 180 28"
                  preserveAspectRatio="none"
                  aria-hidden="true">
                  <path
                    className="annot-stroke"
                    d="M 10 2 L 2 2 L 2 26 L 10 26 M 170 2 L 178 2 L 178 26 L 170 26"
                    fill="none"
                    stroke="#00ff66"
                    strokeWidth="2"
                  />
                </svg>
              </span>{' '}
              consistency in production.
            </p>
          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/riyans-jas.png"
              width={500}
              quality={90}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Riyan Sugiarto"
            />
          </div>
        </StyledPic>

        <StyledVerifiedMetrics ref={metricsRef} aria-label="Verified engineering metrics">
          <div className="metric-card">
            <div className="metric-label">EXPERIENCE</div>
            <div className="metric-value">6+ Years</div>
            <div className="metric-desc">
              Backend &amp; Full-Stack engineering across insurance, credit guarantees, and telecom.
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">PRUHUB // MEMORY</div>
            <div className="metric-value">
              <CountUp to={60} suffix="%+ Drop" active={metricsInView} minCh={8} />
            </div>
            <div className="metric-desc">
              Container memory from &gt;
              <CountUp to={1.5} decimals={1} active={metricsInView} minCh={3} /> GB to &lt;
              <CountUp to={300} active={metricsInView} minCh={3} /> MB in Flink-to-Quarkus
              migration.
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">PRUHUB // WITHDRAWAL</div>
            <div className="metric-value">
              <CountUp to={2} suffix=" Days → Real-Time" active={metricsInView} minCh={14} />
            </div>
            <div className="metric-desc">
              Zero-loss Apache Kafka with manual offset commit &amp; PostgreSQL ACID ledger.
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">ASKRINDO // MIDTRANS</div>
            <div className="metric-value">
              EX <CountUp to={30} suffix="s Lock" active={metricsInView} minCh={7} />
            </div>
            <div className="metric-desc">
              Redis <code>SET lock:pay:&#123;order_id&#125; NX EX 30</code> + DB{' '}
              <code>SELECT ... FOR UPDATE</code>, idempotent HTTP{' '}
              <CountUp to={200} active={metricsInView} minCh={3} />.
            </div>
          </div>
        </StyledVerifiedMetrics>
      </div>
    </StyledAboutSection>
  );
};

export default About;
