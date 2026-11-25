import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';

const StyledJobsSection = styled.section`
  max-width: 1120px;

  .experience-list {
    margin-top: 38px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
`;

const StyledEntryCard = styled.article`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 26px 28px;
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 20px;
  align-items: start;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 22px 20px;
  }

  .entry-num {
    font-size: clamp(26px, 3vw, 34px);
    font-weight: 600;
    color: var(--cream);
    font-variant-numeric: tabular-nums;
    line-height: 1;
    opacity: 0.9;
  }

  .entry-top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 6px;
  }

  .entry-company {
    margin: 0;
    font-size: clamp(20px, 2.6vw, 24px);
    font-weight: 600;
    color: var(--cream);

    a {
      color: var(--cream);
    }
  }

  .entry-date {
    padding: 4px 12px;
    border-radius: var(--radius-pill);
    background: rgba(34, 57, 111, 0.55);
    border: 1px solid var(--border);
    color: var(--cream);
    font-size: var(--fz-xs);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .entry-role {
    margin: 0 0 14px;
    font-size: var(--fz-md);
    font-weight: 500;
    color: var(--text-muted);
  }

  .verified-metrics-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 0 0 14px;
  }

  .verified-pill {
    font-size: var(--fz-xs);
    color: var(--text-secondary);
    background: rgba(1, 7, 54, 0.55);
    border: 1px solid var(--border);
    border-radius: var(--radius-pill);
    padding: 5px 12px;
    font-variant-numeric: tabular-nums;

    strong {
      color: var(--cream);
    }
  }

  .entry-body {
    font-size: var(--fz-md);
    color: var(--text-secondary);

    ul {
      ${({ theme }) => theme.mixins.fancyList};
      margin: 0;

      li {
        margin-bottom: 8px;
        line-height: 1.6;
        font-size: var(--fz-md);

        &:last-child {
          margin-bottom: 0;
        }
      }
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
      font-size: var(--fz-xs);
      color: var(--cream);
      background: rgba(34, 57, 111, 0.5);
      border: 1px solid var(--border);
      padding: 4px 11px;
      border-radius: var(--radius-pill);
    }
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
  const jobsData = data.jobs.edges.filter(({ node }) =>
    node.fileAbsolutePath.includes(`.${language}.md`),
  );

  const renderVerifiedMetrics = date => {
    if (date === '2025-01-01') {
      return (
        <div className="verified-metrics-strip">
          <span className="verified-pill">
            Redis Lock: <strong>SET lock:pay:&#123;order_id&#125; NX EX 30</strong>
          </span>
          <span className="verified-pill">
            DB Guard: <strong>SELECT ... FOR UPDATE · Idempotent HTTP 200</strong>
          </span>
        </div>
      );
    }

    if (date === '2023-01-01') {
      return (
        <div className="verified-metrics-strip">
          <span className="verified-pill">
            Container Memory: <strong>&gt;1.5 GB &rarr; &lt;300 MB (60%+ reduction)</strong>
          </span>
          <span className="verified-pill">
            Withdrawal: <strong>2 Business Days &rarr; Real-Time</strong>
          </span>
        </div>
      );
    }

    return null;
  };

  return (
    <StyledJobsSection id="experience">
      <span className="section-kicker">Career history</span>
      <h2 className="section-heading">Work Experience</h2>
      <p className="section-intro">
        6+ years building enterprise backend and end-to-end production systems across
        Indonesia&apos;s insurance, credit guarantee, and telecommunications leaders.
      </p>

      <div className="experience-list" role="list" aria-label="Work experience entries">
        {jobsData &&
          jobsData.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { date, title, url, company, tabLabel, range, tech } = frontmatter;
            const num = String(i + 1).padStart(2, '0');

            return (
              <StyledEntryCard key={`${date}-${i}`} role="listitem">
                <div className="entry-num" aria-hidden="true">
                  {num}
                </div>

                <div>
                  <div className="entry-top">
                    <h3 className="entry-company">
                      <a href={url} target="_blank" rel="noreferrer">
                        {tabLabel || company}
                      </a>
                    </h3>
                    <span className="entry-date">{range}</span>
                  </div>

                  <p className="entry-role">{title}</p>

                  {renderVerifiedMetrics(date)}

                  <div className="entry-body" dangerouslySetInnerHTML={{ __html: html }} />

                  {tech && tech.length > 0 && (
                    <ul className="entry-tech">
                      {tech.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </StyledEntryCard>
            );
          })}
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
