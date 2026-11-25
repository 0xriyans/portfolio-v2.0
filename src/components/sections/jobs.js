import React, { useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { useInViewOnce, usePrefersReducedMotion } from '@hooks';
import { MOTION } from '@styles/motionTokens';
import CountUp from '../CountUp';

const StyledJobsSection = styled.section`
  max-width: 980px;

  .timeline {
    position: relative;
    padding-left: 175px;
    margin-top: 28px;

    @media (max-width: 720px) {
      padding-left: 26px;
    }
  }

  .timeline-rail {
    position: absolute;
    left: 152px;
    top: 10px;
    bottom: 10px;
    width: 2px;
    background: linear-gradient(to bottom, rgba(0, 255, 102, 0.85), rgba(0, 255, 102, 0.2));
    transform-origin: top center;
    transform: scaleY(${({ active }) => (active ? 1 : 0)});
    transition: ${({ reduced }) => (reduced ? 'none' : `transform 750ms ${MOTION.easing.css}`)};

    @media (max-width: 720px) {
      left: 7px;
    }
  }
`;

const StyledTimelineEntry = styled.article`
  position: relative;
  margin-bottom: 26px;
  background: #0d1117;
  border: 1px solid rgba(0, 255, 102, 0.22);
  border-radius: 6px;
  padding: 24px 26px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translate3d(
    ${({ visible }) => (visible ? '0px' : `-${MOTION.rise.timeline}px`)},
    0,
    0
  );
  transition: ${({ reduced }) =>
    reduced
      ? 'none'
      : `opacity ${MOTION.duration.entrance}ms ${MOTION.easing.css} var(--job-delay, 0ms), transform ${MOTION.duration.entrance}ms ${MOTION.easing.css} var(--job-delay, 0ms), border-color ${MOTION.duration.micro}ms ease 0ms`};

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    border-color: rgba(0, 255, 102, 0.55);
  }

  /* Timeline dot aligned with left rail */
  &::before {
    content: '';
    position: absolute;
    left: -29px;
    top: 26px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ isCurrent }) => (isCurrent ? 'var(--green)' : '#050505')};
    border: 2px solid var(--green);
    box-shadow: ${({ isCurrent }) => (isCurrent ? '0 0 10px rgba(0, 255, 102, 0.8)' : 'none')};

    @media (max-width: 720px) {
      left: -25px;
      top: 24px;
    }
  }

  .left-date {
    position: absolute;
    left: -176px;
    top: 22px;
    width: 132px;
    text-align: right;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 600;
    color: var(--pink);
    letter-spacing: 0.03em;
    line-height: 1.3;

    @media (max-width: 720px) {
      position: static;
      width: auto;
      text-align: left;
      margin-bottom: 8px;
      display: inline-block;
      background: rgba(0, 255, 102, 0.08);
      border: 1px solid rgba(0, 255, 102, 0.25);
      padding: 3px 9px;
      border-radius: 3px;
    }
  }

  .entry-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 12px;
    border-bottom: 1px dashed rgba(0, 255, 102, 0.2);
    padding-bottom: 12px;
  }

  .entry-role {
    margin: 0;
    font-family: var(--font-mono);
    font-size: var(--fz-lg);
    font-weight: 700;
    color: var(--white);
  }

  .entry-company {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--green);

    a {
      color: var(--green);
    }
  }

  .verified-metrics-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 0 0 14px;
  }

  .verified-pill {
    font-family: var(--font-mono);
    font-size: 11.5px;
    color: var(--lightest-slate);
    background: rgba(0, 255, 102, 0.07);
    border: 1px solid rgba(0, 255, 102, 0.3);
    border-radius: 4px;
    padding: 5px 10px;

    strong {
      color: var(--green);
    }
  }

  .entry-body {
    font-family: var(--font-sans);
    font-size: var(--fz-md);
    color: var(--light-slate);

    ul {
      ${({ theme }) => theme.mixins.fancyList};
      margin: 0;

      li {
        margin-bottom: 10px;
        line-height: 1.55;
        font-size: var(--fz-md);

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    code {
      font-size: 12px;
      color: var(--green);
      background: rgba(0, 255, 102, 0.08);
      padding: 2px 6px;
      border-radius: 2px;
    }
  }

  .entry-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 16px 0 0;

    li {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--green);
      background: rgba(2, 10, 20, 0.8);
      border: 1px solid rgba(0, 255, 102, 0.2);
      padding: 3px 9px;
      border-radius: 2px;
    }
  }

  @media (max-width: 600px) {
    padding: 20px 18px;
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              date
              title
              company
              tabLabel
              location
              range
              url
              tech
            }
            html
          }
        }
      }
    }
  `);

  const { language } = useI18next();
  const timelineRef = useRef(null);
  const inView = useInViewOnce(timelineRef, MOTION.trigger.viewport);
  const prefersReducedMotion = usePrefersReducedMotion();
  const active = prefersReducedMotion || inView;

  const jobsData = data.jobs.edges.filter(({ node }) =>
    node.fileAbsolutePath.includes(`.${language}.md`),
  );

  const renderVerifiedMetrics = date => {
    if (date === '2025-01-01') {
      return (
        <div className="verified-metrics-strip">
          <span className="verified-pill">
            Redis Lock:{' '}
            <strong>
              EX <CountUp to={30} suffix="s" active={active} minCh={3} />
            </strong>
          </span>
          <span className="verified-pill">
            Webhook Idempotency:{' '}
            <strong>
              HTTP <CountUp to={200} active={active} minCh={3} />
            </strong>
          </span>
        </div>
      );
    }

    if (date === '2023-01-01') {
      return (
        <div className="verified-metrics-strip">
          <span className="verified-pill">
            Container Memory:{' '}
            <strong>
              &gt;
              <CountUp to={1.5} decimals={1} active={active} minCh={3} /> GB → &lt;
              <CountUp to={300} active={active} minCh={3} /> MB (
              <CountUp to={60} suffix="%+" active={active} minCh={3} />)
            </strong>
          </span>
          <span className="verified-pill">
            Withdrawal:{' '}
            <strong>
              <CountUp to={2} active={active} minCh={1} /> Business Days → Real-Time
            </strong>
          </span>
        </div>
      );
    }

    return null;
  };

  return (
    <StyledJobsSection id="jobs" active={active} reduced={prefersReducedMotion}>
      <h2 className="numbered-heading">[ 04 // EXPERIENCE ]</h2>

      <div className="timeline" ref={timelineRef} role="list" aria-label="Work history timeline">
        <div className="timeline-rail" aria-hidden="true" />
        {jobsData &&
          jobsData.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { date, title, url, company, tabLabel, range, tech } = frontmatter;
            const isCurrent = i === 0;

            return (
              <StyledTimelineEntry
                key={i}
                role="listitem"
                isCurrent={isCurrent}
                visible={active}
                reduced={prefersReducedMotion}
                style={{
                  '--job-delay': prefersReducedMotion ? '0ms' : `${i * MOTION.stagger.default}ms`,
                }}>
                <div className="left-date">{range}</div>

                <div className="entry-header">
                  <h3 className="entry-role">{title}</h3>
                  <div className="entry-company">
                    @{' '}
                    <a href={url} target="_blank" rel="noreferrer">
                      {tabLabel || company}
                    </a>
                  </div>
                </div>

                {renderVerifiedMetrics(date)}

                <div className="entry-body" dangerouslySetInnerHTML={{ __html: html }} />

                {tech && tech.length > 0 && (
                  <ul className="entry-tech">
                    {tech.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </StyledTimelineEntry>
            );
          })}
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
