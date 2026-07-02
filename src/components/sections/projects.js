import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { keyframes } from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0 !important;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        background-color: #161b22;
        border-color: rgba(255, 255, 255, 0.3);
        box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.8);
        transform: translateY(-5px);
      }
      .project-image::after {
        opacity: 1;
        animation: scanlineSweep 2s linear infinite;
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.glassmorphism};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 60px 1.75rem 2rem;
    transition: var(--transition);

    &::after {
      content: 'module.exe';
    }
  }

  .project-image {
    width: 100%;
    margin-bottom: 25px;
    position: relative;
    overflow: hidden;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%);
    ${({ theme }) => theme.mixins.boxShadow};

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 20%;
      background: linear-gradient(to bottom, rgba(0, 255, 102, 0) 0%, rgba(0, 255, 102, 0.4) 50%, rgba(0, 255, 102, 0) 100%);
      opacity: 0;
      pointer-events: none;
      z-index: 2;
    }

    .img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      transition: var(--transition);
      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--pink);
      font-family: var(--font-mono);
      font-size: 28px;
      font-weight: 600;
      line-height: 1;
    }

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
    word-break: break-word;

    @media (max-width: 480px) {
      font-size: var(--fz-xl);
    }

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;
    flex-grow: 1;
    align-items: flex-end;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      color: var(--light-slate);
      background: rgba(0, 255, 102, 0.05);
      padding: 6px 10px;
      border: 1px solid rgba(0, 255, 102, 0.2);
      border-left: 3px solid var(--blue);
      border-radius: 0;
      transition: var(--transition);
      display: inline-block;

      &::before {
        content: '>';
        margin-right: 5px;
        color: var(--blue);
        opacity: 0.5;
        transition: var(--transition);
      }

      &:hover {
        color: var(--white);
        border-color: var(--pink);
        border-left-color: var(--pink);
        background: rgba(184, 255, 0, 0.15);
        transform: translateX(5px);
        box-shadow: 0 0 15px rgba(184, 255, 0, 0.5);
        
        &::before {
          opacity: 1;
          color: var(--pink);
        }
      }
    }
  }
`;

const scanlineSweep = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(500%); }
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
              tech
              github
              external
              cover {
                childImageSharp {
                  gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
            }
            html
          }
        }
      }
    }
  `);

  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const { language } = useI18next();
  const { t } = useTranslation();

  const GRID_LIMIT = 6;
  const projects = data.projects.edges.filter(
    ({ node }) => node && node.fileAbsolutePath.includes(`.${language}.md`),
  );
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  const projectInner = node => {
    const { frontmatter, html } = node;
    const { github, external, title, tech, cover } = frontmatter;
    const image = cover ? getImage(cover) : null;

    return (
      <div className="project-inner">
        <header>
          {image && (
            <div className="project-image">
              <a
                href={external ? external : github ? github : '#'}
                target="_blank"
                rel="noreferrer">
                <GatsbyImage image={image} alt={title} className="img" />
              </a>
            </div>
          )}

          <div
            className="project-top"
            style={image ? { marginBottom: '20px', justifyContent: 'flex-end' } : {}}>
            {!image && (
              <div className="folder">
                &gt;_
              </div>
            )}
            <div className="project-links">
              {github && (
                <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                  <Icon name="GitHub" />
                </a>
              )}
              {external && (
                <a
                  href={external}
                  aria-label="External Link"
                  className="external"
                  target="_blank"
                  rel="noreferrer">
                  <Icon name="External" />
                </a>
              )}
            </div>
          </div>

          <h3 className="project-title">
            <a href={external} target="_blank" rel="noreferrer">
              {`> RUN: ${title}.exe`}
            </a>
          </h3>

          <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
        </header>

        <footer>
          {tech && (
            <ul className="project-tech-list">
              {tech.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    );
  };

  return (
    <StyledProjectsSection>
      <h2 ref={revealTitle}>{t('Other Noteworthy Projects')}</h2>

      <Link className="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
        {t('view the archive')}
      </Link>

      <ul className="projects-grid">
        {prefersReducedMotion ? (
          <>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <StyledProject key={i}>{projectInner(node)}</StyledProject>
              ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}>
                  <StyledProject
                    key={i}
                    ref={el => (revealProjects.current[i] = el)}
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                    }}>
                    {projectInner(node)}
                  </StyledProject>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </ul>

      <button className="more-button" onClick={() => setShowMore(!showMore)}>
        {t('Show')} {showMore ? t('Less') : t('More')}
      </button>
    </StyledProjectsSection>
  );
};

export default Projects;
