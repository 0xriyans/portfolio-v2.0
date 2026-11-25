import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import ProjectDiagram from '../ProjectDiagram';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0 !important;
  max-width: 1000px;

  h2 {
    font-size: clamp(20px, 4vw, 26px);
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
    margin-top: 40px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;

  .project-inner {
    ${({ theme }) => theme.mixins.glassmorphism};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    height: 100%;
    padding: 55px 1.5rem 1.75rem;
    border: 1px solid rgba(0, 255, 102, 0.22);
    transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms ease;

    &::after {
      content: 'module.sys';
    }

    &:hover {
      border-color: var(--green);
      transform: translateY(-4px);
    }
  }

  .project-image {
    width: 100%;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
    border-radius: 4px;

    .img {
      width: 100%;
      height: 190px;
      object-fit: cover;
    }
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 12px;

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
    font-size: 18px;
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
    font-size: 15px;
    font-family: var(--font-sans);
    line-height: 1.55;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    p {
      font-family: var(--font-sans);
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0;
    margin: 18px 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--green);
      background: rgba(2, 10, 20, 0.8);
      padding: 4px 9px;
      border: 1px solid rgba(0, 255, 102, 0.2);
      border-radius: 2px;
      display: inline-flex;
      align-items: center;

      &::before {
        content: '>>';
        color: var(--pink);
        margin-right: 5px;
        font-weight: 700;
      }
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

  const { language } = useI18next();
  const { t } = useTranslation();

  const projects = data.projects.edges.filter(
    ({ node }) => node && node.fileAbsolutePath.includes(`.${language}.md`),
  );

  return (
    <StyledProjectsSection>
      <h2>{t('Other Noteworthy Projects')}</h2>

      <Link className="inline-link archive-link" to="/archive">
        {t('view the archive')}
      </Link>

      <ul className="projects-grid">
        {projects &&
          projects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { github, external, title, company, tech, cover, diagram } = frontmatter;
            const image = cover ? getImage(cover) : null;
            const href = external || github || null;

            return (
              <StyledProject key={i}>
                <div className="project-inner">
                  <header style={{ width: '100%' }}>
                    <div className="project-image">
                      {image ? (
                        <GatsbyImage image={image} alt={title} className="img" />
                      ) : (
                        <ProjectDiagram type={diagram} title={title} compact />
                      )}
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
                              className="external"
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
