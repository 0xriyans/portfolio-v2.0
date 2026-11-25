import React, { useState, useEffect, useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const GREEN_SCALE = ['#132554', '#0e4429', '#006d32', '#26a641', '#39d353'];

const StyledGithubSection = styled.section`
  max-width: 1120px;

  .heatmap-card {
    margin-top: 32px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    padding: 26px;

    @media (max-width: 600px) {
      padding: 20px 16px;
    }
  }

  .heatmap-top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;

    .summary {
      color: var(--text-secondary);
      font-size: var(--fz-md);

      strong {
        color: var(--cream);
        font-variant-numeric: tabular-nums;
      }
    }

    .profile-link {
      font-size: var(--fz-xs);
      font-weight: 600;
      color: var(--cream);
      border: 1px solid var(--border);
      background: rgba(34, 57, 111, 0.55);
      padding: 6px 14px;
      border-radius: var(--radius-pill);
    }
  }

  .grid-scroll {
    overflow-x: auto;
    padding-bottom: 8px;
    -webkit-overflow-scrolling: touch;
  }

  .weeks-grid {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 12px;
    gap: 4px;
    min-width: max-content;
    min-height: 108px;
  }

  .week-col {
    display: grid;
    grid-template-rows: repeat(7, 12px);
    gap: 4px;
  }

  .heatmap-footer {
    margin-top: 14px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    font-size: var(--fz-xs);
    color: var(--text-muted);
  }

  .tooltip-banner {
    color: var(--cream);
    min-height: 18px;
    font-variant-numeric: tabular-nums;
  }

  .legend {
    display: flex;
    align-items: center;
    gap: 5px;

    .swatch {
      width: 11px;
      height: 11px;
      border-radius: 3px;
      border: 1px solid rgba(252, 241, 208, 0.12);
    }
  }

  .fallback-box {
    padding: 28px 20px;
    text-align: center;
    color: var(--text-secondary);

    p {
      margin-bottom: 16px;
      font-size: var(--fz-md);
    }

    a {
      display: inline-block;
      padding: 10px 22px;
      background: var(--cream);
      color: var(--on-cream);
      font-size: var(--fz-xs);
      font-weight: 600;
      border-radius: var(--radius-pill);
    }
  }
`;

const Cell = styled.button`
  width: 12px;
  height: 12px;
  padding: 0;
  border: 1px solid rgba(252, 241, 208, 0.08);
  border-radius: 3px;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: var(--cream);
    outline: none;
  }
`;

const GithubHeatmap = () => {
  const staticData = useStaticQuery(graphql`
    query {
      githubActivity {
        total
        contributions {
          date
          count
          level
        }
      }
    }
  `);

  const initialNode = staticData && staticData.githubActivity;
  const [contributions, setContributions] = useState(
    initialNode && initialNode.contributions ? initialNode.contributions : [],
  );
  const [total, setTotal] = useState(initialNode && initialNode.total ? initialNode.total : 0);
  const [selectedTip, setSelectedTip] = useState(null);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    if (contributions.length > 0) {
      return;
    }
    let cancelled = false;
    fetch('https://github-contributions-api.jogruber.de/v4/0xriyans?y=last')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to load contributions');
        }
        return res.json();
      })
      .then(json => {
        if (cancelled) {
          return;
        }
        if (json && Array.isArray(json.contributions) && json.contributions.length > 0) {
          setContributions(json.contributions);
          setTotal((json.total && json.total.lastYear) || 0);
        } else {
          setFetchFailed(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFetchFailed(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [contributions.length]);

  const weeks = useMemo(() => {
    if (!contributions || contributions.length === 0) {
      return [];
    }
    const grouped = [];
    let currentWeek = [];
    const firstDay = new Date(`${contributions[0].date}T00:00:00Z`).getUTCDay();
    for (let pad = 0; pad < firstDay; pad++) {
      currentWeek.push(null);
    }
    for (const day of contributions) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        grouped.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      grouped.push(currentWeek);
    }
    return grouped;
  }, [contributions]);

  return (
    <StyledGithubSection id="github">
      <span className="section-kicker">Open source &amp; activity</span>
      <h2 className="section-heading">GitHub Contributions</h2>

      <div className="heatmap-card">
        {fetchFailed || weeks.length === 0 ? (
          <div className="fallback-box">
            <p>Live contribution graph could not be retrieved right now.</p>
            <a href="https://github.com/0xriyans" target="_blank" rel="noreferrer">
              View GitHub Profile (@0xriyans)
            </a>
          </div>
        ) : (
          <>
            <div className="heatmap-top">
              <div className="summary">
                <strong>{total}</strong> contributions in the last 12 months on{' '}
                <code>@0xriyans</code>
              </div>
              <a
                className="profile-link"
                href="https://github.com/0xriyans"
                target="_blank"
                rel="noreferrer">
                github.com/0xriyans
              </a>
            </div>

            <div className="grid-scroll">
              <div
                className="weeks-grid"
                role="grid"
                aria-label="0xriyans 12-month GitHub contributions">
                {weeks.map((week, wIdx) => (
                  <div className="week-col" key={wIdx} role="row">
                    {week.map((day, dIdx) => {
                      if (!day) {
                        return (
                          <span key={`empty-${wIdx}-${dIdx}`} style={{ width: 12, height: 12 }} />
                        );
                      }
                      const tipText = `${day.count} contribution${day.count === 1 ? '' : 's'} on ${
                        day.date
                      }`;
                      return (
                        <Cell
                          key={day.date}
                          type="button"
                          style={{ backgroundColor: GREEN_SCALE[day.level] || GREEN_SCALE[0] }}
                          aria-label={tipText}
                          title={tipText}
                          onMouseEnter={() => setSelectedTip(tipText)}
                          onFocus={() => setSelectedTip(tipText)}
                          onClick={() => setSelectedTip(tipText)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="heatmap-footer">
              <div className="tooltip-banner" aria-live="polite">
                {selectedTip || 'Hover or tap any square to inspect contribution count & date.'}
              </div>
              <div className="legend" aria-hidden="true">
                <span>Less</span>
                {GREEN_SCALE.map(color => (
                  <span key={color} className="swatch" style={{ backgroundColor: color }} />
                ))}
                <span>More</span>
              </div>
            </div>
          </>
        )}
      </div>
    </StyledGithubSection>
  );
};

export default GithubHeatmap;
