import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { useInViewOnce, usePrefersReducedMotion } from '@hooks';
import { MOTION } from '@styles/motionTokens';

const GREEN_SCALE = ['#0b1410', '#004d1f', '#008a38', '#00cc52', '#00ff66'];

const StyledGithubSection = styled.section`
  max-width: 980px;

  .heatmap-card {
    background: #0d1117;
    border: 1px solid rgba(0, 255, 102, 0.25);
    border-radius: 6px;
    padding: 24px;
    position: relative;

    @media (max-width: 600px) {
      padding: 18px 14px;
    }
  }

  .heatmap-top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
    font-family: var(--font-mono);

    .summary {
      color: var(--white);
      font-size: var(--fz-sm);

      strong {
        color: var(--green);
        font-variant-numeric: tabular-nums;
      }
    }

    .profile-link {
      font-size: var(--fz-xs);
      color: var(--green);
      border: 1px solid rgba(0, 255, 102, 0.35);
      padding: 5px 11px;
      border-radius: 3px;
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
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--slate);
  }

  .tooltip-banner {
    color: var(--green);
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
      border-radius: 2px;
      border: 1px solid rgba(0, 255, 102, 0.14);
    }
  }

  .fallback-box {
    padding: 28px 20px;
    text-align: center;
    font-family: var(--font-mono);
    color: var(--light-slate);

    p {
      margin-bottom: 14px;
      font-size: var(--fz-sm);
    }

    a {
      display: inline-block;
      padding: 10px 20px;
      border: 1px solid var(--green);
      color: var(--green);
      font-size: var(--fz-xs);
      border-radius: 3px;
    }
  }
`;

const Cell = styled.button`
  width: 12px;
  height: 12px;
  padding: 0;
  border: 1px solid rgba(0, 255, 102, 0.12);
  border-radius: 2px;
  cursor: pointer;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: scale(${({ visible }) => (visible ? 1 : 0.7)});
  transition: ${({ reduced }) =>
    reduced
      ? 'none'
      : `opacity 220ms ${MOTION.easing.css} var(--cell-delay, 0ms), transform 220ms ${MOTION.easing.css} var(--cell-delay, 0ms), border-color 150ms ease`};

  &:hover,
  &:focus-visible {
    border-color: #ffffff;
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
  const [nearViewport, setNearViewport] = useState(false);

  const cardRef = useRef(null);
  const inView = useInViewOnce(cardRef, MOTION.trigger.viewport);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Defer mounting 368 cell buttons until the section approaches the viewport to keep initial DOM/TTI lean
  useEffect(() => {
    if (prefersReducedMotion || nearViewport) {
      setNearViewport(true);
      return;
    }
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setNearViewport(true);
      return;
    }
    const obs = new IntersectionObserver(
      entries => {
        if (entries[0] && entries[0].isIntersecting) {
          setNearViewport(true);
          obs.disconnect();
        }
      },
      { rootMargin: '700px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [prefersReducedMotion, nearViewport]);

  // If build-time fetch wasn't available, fetch real public data on client; on failure show profile link fallback
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

  // Group into 7-day Sunday-aligned weeks for grid rendering
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

  const visible = prefersReducedMotion || inView;
  const maxWeekIndex = Math.max(weeks.length - 1, 1);

  return (
    <StyledGithubSection id="github">
      <h2 className="numbered-heading">[ 06 // GITHUB_ACTIVITY ]</h2>

      <div className="heatmap-card" ref={cardRef}>
        {fetchFailed || weeks.length === 0 ? (
          <div className="fallback-box">
            <p>Live contribution graph could not be retrieved right now.</p>
            <a href="https://github.com/0xriyans" target="_blank" rel="noreferrer">
              &gt; VIEW GITHUB PROFILE (@0xriyans)
            </a>
          </div>
        ) : (
          <>
            <div className="heatmap-top">
              <div className="summary">
                <strong>{total}</strong> contributions in the last 12 months (<code>@0xriyans</code>
                )
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
                {nearViewport &&
                  weeks.map((week, wIdx) => (
                    <div className="week-col" key={wIdx} role="row">
                      {week.map((day, dIdx) => {
                        if (!day) {
                          return (
                            <span key={`empty-${wIdx}-${dIdx}`} style={{ width: 12, height: 12 }} />
                          );
                        }
                        // Diagonal stagger capped so total entrance stays within 800ms
                        const diagNorm = (wIdx + dIdx) / (maxWeekIndex + 6);
                        const delayMs = Math.round(diagNorm * 580);
                        const tipText = `${day.count} contribution${
                          day.count === 1 ? '' : 's'
                        } on ${day.date}`;
                        return (
                          <Cell
                            key={day.date}
                            type="button"
                            visible={visible}
                            reduced={prefersReducedMotion}
                            style={{
                              backgroundColor: GREEN_SCALE[day.level] || GREEN_SCALE[0],
                              '--cell-delay': prefersReducedMotion ? '0ms' : `${delayMs}ms`,
                            }}
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
                {selectedTip || 'Hover or tap any cell to inspect daily count & date.'}
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
