import React, { useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { useInViewOnce, usePrefersReducedMotion } from '@hooks';
import { MOTION } from '@styles/motionTokens';
import ProjectMedia from '../ProjectMedia';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px !important;
  max-width: 1040px;

  h2 {
    font-size: clamp(20px, 4vw, 24px);
    font-family: var(--font-mono);
    text-align: center;
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    margin-top: 8px;
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 24px;
    position: relative;
    margin-top: 36px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledProject = styled.li`
  position: relative;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translate3d(0, ${({ visible }) => (visible ? '0px' : `${MOTION.rise.projects}px`)}, 0);
  transition: ${({ reduced }) =>
    reduced
      ? 'none'
      : `opacity ${MOTION.duration.entrance}ms ${MOTION.easing.css} var(--card-delay, 0ms), transform ${MOTION.duration.entrance}ms ${MOTION.easing.css} var(--card-delay, 0ms)`};

  .project-inner {
    background: #0d1117;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    height: 100%;
    padding: 20px;
    border-radius: 6px;
    border: 1px solid rgba(0, 255, 102, 0.22);
    transition: transform ${MOTION.duration.micro}ms ${MOTION.easing.css},
      border-color ${MOTION.duration.micro}ms ease, box-shadow ${MOTION.duration.micro}ms ease;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        border-color: var(--green);
        box-shadow: 0 8px 24px rgba(0, 255, 102, 0.14);
        transform: translate3d(0, -4px, 0);
      }
    }
  }

  .project-image {
    width: 100%;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
    border-radius: 4px;

    .img {
      width: 100%;
      height: 185px;
      object-fit: cover;
    }
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 8px;

    .company-badge {
      color: var(--pink);
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .project-links {
      display: flex;
      align-items: center;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 4px 6px;

        svg {
          width: 18px;
          height: 18px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--white);
    font-family: var(--font-mono);
    font-size: 17px;
    word-break: break-word;

    a {
      color: var(--white);
      &:hover {
        color: var(--green);
      }
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: 14.5px;
    font-family: var(--font-sans);
    line-height: 1.55;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 0;
    margin: 16px 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--green);
      background: rgba(2, 10, 20, 0.85);
      padding: 3px 8px;
      border: 1px solid rgba(0, 255, 102, 0.2);
      border-radius: 2px;
    }
  }
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
              company
              tech
              github
              external
              diagram
              videoWebm {
                publicURL
              }
              videoMp4 {
                publicURL
              }
              poster {
                publicURL
              }
              cover {
                childImageSharp {
                  gatsbyImageData(width: 400, placeholder: NONE, formats: [AUTO, WEBP, AVIF])
                }
              }
            }
            html
          }
        }
      }
    }
  `);

  const { language } = useI18next();
  const { t } = useTranslation();
  const gridRef = useRef(null);
  const inView = useInViewOnce(gridRef, MOTION.trigger.viewport);
  const prefersReducedMotion = usePrefersReducedMotion();

  const projects = data.projects.edges.filter(
    ({ node }) => node && node.fileAbsolutePath.includes(`.${language}.md`),
  );

  return (
    <StyledProjectsSection>
      <h2>{t('Other Noteworthy Projects')}</h2>

      <Link className="inline-link archive-link" to="/archive">
        {t('view the archive')}
      </Link>

      <ul className="projects-grid" ref={gridRef}>
        {projects &&
          projects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { github, external, title, company, tech } = frontmatter;
            const href = external || github || null;
            const visible = prefersReducedMotion || inView;

            return (
              <StyledProject
                key={i}
                visible={visible}
                reduced={prefersReducedMotion}
                style={{
                  '--card-delay': prefersReducedMotion ? '0ms' : `${i * MOTION.stagger.projects}ms`,
                }}>
                <div className="project-inner">
                  <header style={{ width: '100%' }}>
                    <div className="project-image">
                      <ProjectMedia frontmatter={frontmatter} compact />
                    </div>

                    <div className="project-top">
                      <span className="company-badge">{company || 'PRODUCTION'}</span>
                      {(github || external) && (
                        <div className="project-links">
                          {github && (
                            <a
                              href={github}
                              aria-label="GitHub Link"
                              target="_blank"
                              rel="noreferrer">
                              <Icon name="GitHub" />
                            </a>
                          )}
                          {external && (
                            <a
                              href={external}
                              aria-label="External Link"
                              target="_blank"
                              rel="noreferrer">
                              <Icon name="External" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    <h3 className="project-title">
                      {href ? (
                        <a href={href} target="_blank" rel="noreferrer">
                          {title}
                        </a>
                      ) : (
                        title
                      )}
                    </h3>

                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  </header>

                  <footer style={{ width: '100%' }}>
                    {tech && tech.length > 0 && (
                      <ul className="project-tech-list">
                        {tech.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </footer>
                </div>
              </StyledProject>
            );
          })}
      </ul>
    </StyledProjectsSection>
  );
};

export default Projects;
