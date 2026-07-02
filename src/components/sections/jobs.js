import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { CSSTransition } from 'react-transition-group';
import styled, { keyframes } from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const StyledJobsSection = styled.section`
  max-width: 900px;

  .inner {
    ${({ theme }) => theme.mixins.glassmorphism};
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow: hidden;
    min-height: 400px;
    border-radius: 10px;
  }

  .terminal-header {
    background: rgba(0, 0, 0, 0.4);
    border-bottom: 1px solid rgba(0, 255, 102, 0.3);
    padding: 12px 15px;
    display: flex;
    align-items: center;
    gap: 8px;
    
    .btn {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .btn-red { background: #ff5f56; box-shadow: 0 0 5px #ff5f56; }
    .btn-yellow { background: #ffbd2e; box-shadow: 0 0 5px #ffbd2e; }
    .btn-green { background: #27c93f; box-shadow: 0 0 5px #27c93f; }
    
    .title {
      flex: 1;
      text-align: center;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      letter-spacing: 1px;
      opacity: 0.8;
      margin-right: 48px; /* to offset the buttons and keep title centered */
    }
  }

  .terminal-body {
    display: flex;
    flex: 1;

    @media (max-width: 600px) {
      flex-direction: column;
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
  background: rgba(0, 0, 0, 0.3);
  border-right: 1px solid rgba(0, 255, 102, 0.2);

  @media (max-width: 600px) {
    flex-direction: row;
    overflow-x: auto;
    width: 100%;
    max-width: 100vw;
    padding: 15px 20px;
    border-right: none;
    border-bottom: 1px solid rgba(0, 255, 102, 0.2);
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
  padding: 12px 15px;
  margin-bottom: 5px;
  background: ${({ isActive }) =>
    isActive ? 'rgba(0, 255, 102, 0.1)' : 'transparent'};
  color: ${({ isActive }) => (isActive ? 'var(--blue)' : 'var(--light-slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: none;
  border: 1px solid ${({ isActive }) => (isActive ? 'rgba(0, 255, 102, 0.3)' : 'transparent')};
  border-left: ${({ isActive }) => (isActive ? '3px solid var(--blue)' : '3px solid transparent')};
  text-shadow: ${({ isActive }) => (isActive ? '0 0 8px rgba(0, 255, 102, 0.6)' : 'none')};

  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    width: auto;
    min-width: max-content;
    margin-bottom: 0;
  }

  &:hover,
  &:focus {
    background: rgba(0, 255, 102, 0.15);
    color: var(--blue);
    border-color: rgba(0, 255, 102, 0.3);
    border-left: 3px solid var(--blue);
    text-shadow: 0 0 5px rgba(0, 255, 102, 0.5);
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
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--light-slate);
    
    li {
      margin-bottom: 15px;
      line-height: 1.6;
      &::before {
        content: '~/';
        color: var(--pink);
        font-weight: bold;
      }
    }
  }

  h3 {
    margin-bottom: 15px;
    font-size: var(--fz-xl);
    font-weight: 500;
    line-height: 1.4;
    font-family: var(--font-mono);
    color: var(--white);
    word-break: break-all;

    .prompt {
      color: var(--pink);
      margin-right: 10px;
    }
    
    .cursor {
      display: inline-block;
      width: 10px;
      height: 20px;
      background-color: var(--blue);
      margin-left: 5px;
      vertical-align: middle;
      animation: ${blink} 1s step-end infinite;
      box-shadow: 0 0 8px var(--blue);
    }

    .company {
      color: var(--blue);
    }
  }

  .range {
    margin-bottom: 30px;
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    border-bottom: 1px dashed rgba(0, 255, 102, 0.3);
    padding-bottom: 15px;
    display: inline-block;
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
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig(0, 0.05));
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

      <div className="inner">
        <div className="terminal-header">
          <div className="btn btn-red"></div>
          <div className="btn btn-yellow"></div>
          <div className="btn btn-green"></div>
          <div className="title">root@portfolio:~</div>
        </div>
        
        <div className="terminal-body">
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
                    <span>{`> cd ./${company.replace(/\s+/g, '_')}`}</span>
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
                        <span className="prompt">sys@admin:~$</span>
                        <span>{`cat ${title.replace(/\s+/g, '_')}`}</span>
                        <span className="company">
                          &nbsp;@&nbsp;
                          <a href={url} className="inline-link" target="_blank" rel="noreferrer">
                            {company}
                          </a>
                        </span>
                        <span className="cursor"></span>
                      </h3>

                      <p className="range">[{range}]</p>

                      <div dangerouslySetInnerHTML={{ __html: html }} />
                    </StyledTabPanel>
                  </CSSTransition>
                );
              })}
          </StyledTabPanels>
        </div>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
