import React, { useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { useInViewOnce, usePrefersReducedMotion } from '@hooks';
import { MOTION } from '@styles/motionTokens';

const StyledJobsSection = styled.section`
  max-width: 980px;

  .timeline {
    position: relative;
    padding-left: 32px;
    margin-top: 24px;

    @media (max-width: 600px) {
      padding-left: 24px;
    }
  }

  .timeline-rail {
    position: absolute;
    left: 7px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: linear-gradient(to bottom, rgba(0, 255, 102, 0.85), rgba(0, 255, 102, 0.2));
    transform-origin: top center;
    transform: scaleY(${({ active }) => (active ? 1 : 0)});
    transition: ${({ reduced }) => (reduced ? 'none' : `transform 750ms ${MOTION.easing.css}`)};
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
  transition: ${({ reduced, delay }) =>
    reduced
      ? 'none'
      : `opacity ${MOTION.duration.entrance}ms ${MOTION.easing.css} ${delay}ms, transform ${MOTION.duration.entrance}ms ${MOTION.easing.css} ${delay}ms, border-color ${MOTION.duration.micro}ms ease`};

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    border-color: rgba(0, 255, 102, 0.55);
  }

  &::before {
    content: '';
    position: absolute;
    left: -31px;
    top: 28px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ isCurrent }) => (isCurrent ? 'var(--green)' : '#050505')};
    border: 2px solid var(--green);
    box-shadow: ${({ isCurrent }) => (isCurrent ? '0 0 10px rgba(0, 255, 102, 0.8)' : 'none')};

    @media (max-width: 600px) {
      left: -23px;
    }
  }

  .entry-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px 16px;
    margin-bottom: 12px;
    border-bottom: 1px dashed rgba(0, 255, 102, 0.2);
    padding-bottom: 12px;
  }

  .entry-title-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
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

  .entry-range {
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--pink);
    background: rgba(0, 255, 102, 0.08);
    border: 1px solid rgba(0, 255, 102, 0.25);
    padding: 4px 10px;
    border-radius: 3px;
    white-space: nowrap;
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

  return (
    <StyledJobsSection id="jobs" active={active} reduced={prefersReducedMotion}>
      <h2 className="numbered-heading">[ 04 // EXPERIENCE ]</h2>

      <div className="timeline" ref={timelineRef} role="list" aria-label="Work history timeline">
        <div className="timeline-rail" aria-hidden="true" />
        {jobsData &&
          jobsData.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { title, url, company, tabLabel, range, tech } = frontmatter;
            const isCurrent = i === 0;

            return (
              <StyledTimelineEntry
                key={i}
                role="listitem"
                isCurrent={isCurrent}
                visible={active}
                reduced={prefersReducedMotion}
                delay={i * MOTION.stagger.default}>
                <div className="entry-header">
                  <div className="entry-title-group">
                    <h3 className="entry-role">{title}</h3>
                    <div className="entry-company">
                      @{' '}
                      <a href={url} target="_blank" rel="noreferrer">
                        {tabLabel || company}
                      </a>
                    </div>
                  </div>
                  <span className="entry-range">[{range}]</span>
                </div>

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
