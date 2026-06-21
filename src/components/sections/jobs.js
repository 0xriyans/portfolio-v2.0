import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion, useTilt } from '@hooks';

const StyledJobsSection = styled.section`
  max-width: 900px;

  .inner {
    ${({ theme }) => theme.mixins.glassmorphism};
    display: flex;
    padding: 0;
    overflow: hidden;
    min-height: 400px;

    @media (max-width: 600px) {
      display: block;
    }
  }
`;

const StyledTabList = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
  width: 250px;
  padding: 30px 20px;
  margin: 0;
  list-style: none;
  background: rgba(255, 255, 255, 0.02);
  border-right: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 600px) {
    flex-direction: row;
    overflow-x: auto;
    width: 100%;
    padding: 15px 20px;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    gap: 12px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px;
  margin-bottom: 10px;
  border-radius: 25px;
  background: ${({ isActive }) =>
    isActive ? 'linear-gradient(135deg, var(--yellow), var(--pink))' : 'rgba(255, 255, 255, 0.05)'};
  color: ${({ isActive }) => (isActive ? '#ffffff' : 'var(--light-slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
  text-align: left;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: ${({ isActive }) => (isActive ? '0 5px 15px -5px var(--yellow)' : 'none')};

  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    width: auto;
    min-width: max-content;
    padding: 0 20px;
    margin-bottom: 0;
  }

  &:hover,
  &:focus {
    background: ${({ isActive }) =>
    isActive
      ? 'linear-gradient(135deg, var(--yellow), var(--pink))'
      : 'rgba(255, 255, 255, 0.1)'};
    color: ${({ isActive }) => (isActive ? '#ffffff' : 'var(--yellow)')};
    transform: ${({ isActive }) => (isActive ? 'none' : 'translateY(-2px)')};
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  padding: 40px;

  @media (max-width: 600px) {
    padding: 30px 20px;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .company {
      color: var(--yellow);
    }
  }

  .range {
    margin-bottom: 25px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const StyledTechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0;
  margin: 30px 0 0 0;
  list-style: none;

  li {
    position: relative;
    padding: 6px 16px;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    line-height: 1.4;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    cursor: default;

    @media (min-width: 768px) {
      font-size: var(--fz-xs);
      backdrop-filter: blur(10px);
    }

    &:hover {
      background: linear-gradient(90deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
      border-color: var(--pink);
      color: var(--white);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(168, 85, 247, 0.2);
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
              title
              company
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
  const { t } = useTranslation();
  const jobsData = data.jobs.edges.filter(({ node }) =>
    node.fileAbsolutePath.includes(`.${language}.md`),
  );

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const tiltRef = useTilt();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  useEffect(() => focusTab(), [tabFocus]);

  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }
      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading">{t('Where I’ve Worked')}</h2>

      <div className="inner" ref={tiltRef}>
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyDown(e)}>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { company } = node.frontmatter;
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  <span>{company}</span>
                </StyledTabButton>
              );
            })}
        </StyledTabList>

        <StyledTabPanels>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { title, url, company, range } = frontmatter;

              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}>
                    <h3>
                      <span>{title}</span>
                      <span className="company">
                        &nbsp;@&nbsp;
                        <a href={url} className="inline-link" target="_blank" rel="noreferrer">
                          {company}
                        </a>
                      </span>
                    </h3>

                    <p className="range">{range}</p>

                    <div dangerouslySetInnerHTML={{ __html: html }} />

                    {frontmatter.tech && (
                      <StyledTechList>
                        {frontmatter.tech.map((tech, idx) => (
                          <li key={idx}>{tech}</li>
                        ))}
                      </StyledTechList>
                    )}
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
