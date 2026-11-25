import React, { useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { useInViewOnce, usePrefersReducedMotion } from '@hooks';
import { MOTION } from '@styles/motionTokens';
import ProjectMedia from '../ProjectMedia';

const StyledFeaturedSection = styled.section`
  max-width: 1040px;
`;

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 32px;
  align-items: start;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 24px;
  }
`;

const StyledProject = styled.li`
  position: relative;
  background: #0d1117;
  border: 1px solid rgba(0, 255, 102, 0.24);
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translate3d(0, ${({ visible }) => (visible ? '0px' : `${MOTION.rise.projects}px`)}, 0);
  transition: ${({ reduced }) =>
    reduced
      ? 'none'
      : `opacity ${MOTION.duration.entrance}ms ${MOTION.easing.css} var(--card-delay, 0ms), transform ${MOTION.duration.entrance}ms ${MOTION.easing.css} var(--card-delay, 0ms), border-color ${MOTION.duration.micro}ms ease 0ms, box-shadow ${MOTION.duration.micro}ms ease 0ms`};

  @media (min-width: 769px) {
    &:nth-child(even) {
      margin-top: 56px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: var(--green);
      box-shadow: 0 8px 28px rgba(0, 255, 102, 0.16);
      transform: translate3d(0, -4px, 0);
    }
  }

  .project-media {
    width: 100%;
    height: 220px;
    border-bottom: 1px solid rgba(0, 255, 102, 0.2);
    background: #070c0a;
    overflow: hidden;

    @media (max-width: 768px) {
      height: 200px;
    }

    a,
    .media-box {
      display: block;
      width: 100%;
      height: 100%;
    }

    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .project-content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
  }

  .project-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .project-overline {
    margin: 0;
    color: var(--pink);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .project-links {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--light-slate);

    a {
      display: inline-flex;
      padding: 4px;
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  .project-title {
    margin: 0 0 12px;
    color: var(--white);
    font-family: var(--font-mono);
    font-size: 19px;
    line-height: 1.3;

    a {
      color: var(--white);
      &:hover {
        color: var(--green);
      }
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: var(--fz-sm);
    font-family: var(--font-sans);
    line-height: 1.6;
    margin-bottom: 16px;

    strong {
      color: var(--green);
      font-weight: 600;
    }

    code {
      font-size: 11.5px;
      color: var(--green);
      background: rgba(0, 255, 102, 0.08);
      padding: 1px 5px;
      border-radius: 2px;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--green);
      background: rgba(2, 10, 20, 0.85);
      padding: 3px 8px;
      border: 1px solid rgba(0, 255, 102, 0.22);
      border-radius: 2px;
    }
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/featured/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
              company
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
                  gatsbyImageData(width: 700, placeholder: NONE, formats: [AUTO, WEBP, AVIF])
                }
              }
              tech
              github
              external
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

  const featuredProjects = data.featured.edges.filter(
    ({ node }) => node && node.fileAbsolutePath.includes(`.${language}.md`),
  );

  return (
    <StyledFeaturedSection id="projects">
      <h2 className="numbered-heading">[ 05 // PROJECTS ]</h2>

      <StyledProjectsGrid ref={gridRef}>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, company, tech, github } = frontmatter;
            const href = external || github || null;
            const visible = prefersReducedMotion || inView;

            const media = <ProjectMedia frontmatter={frontmatter} compact />;

            return (
              <StyledProject
                key={i}
                visible={visible}
                reduced={prefersReducedMotion}
                style={{
                  '--card-delay': prefersReducedMotion ? '0ms' : `${i * MOTION.stagger.projects}ms`,
                }}>
                <div className="project-media">
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer" aria-label={title}>
                      {media}
                    </a>
                  ) : (
                    <div className="media-box">{media}</div>
                  )}
                </div>

                <div className="project-content">
                  <div>
                    <div className="project-top">
                      <p className="project-overline">{company || t('Featured Project')}</p>
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
                  </div>

                  {tech && tech.length > 0 && (
                    <ul className="project-tech-list">
                      {tech.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </StyledFeaturedSection>
  );
};

export default Featured;
