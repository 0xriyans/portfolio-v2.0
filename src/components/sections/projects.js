import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import ProjectMedia from '../ProjectMedia';

const StyledProjectsSection = styled.section`
  padding-top: 24px !important;
  max-width: 1120px;

  .sub-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 32px;

    h2 {
      margin: 0;
      font-size: clamp(24px, 3.2vw, 30px);
      color: var(--cream);
    }

    p {
      margin: 6px 0 0;
      font-size: var(--fz-md);
      color: var(--text-muted);
    }

    .archive-link {
      color: var(--cream);
      font-size: var(--fz-sm);
      font-weight: 600;
      border-bottom: 1px solid rgba(252, 241, 208, 0.35);
      padding-bottom: 2px;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledProject = styled.li`
  position: relative;

  .project-inner {
    background: var(--surface);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 22px;
    border-radius: var(--radius-card);
    border: 1px solid var(--border);
  }

  .project-image {
    width: 100%;
    margin-bottom: 16px;
    overflow: hidden;
    border-radius: 14px;
    border: 1px solid var(--border);

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
      color: var(--text-muted);
      font-size: var(--fz-xs);
      font-weight: 600;
    }

    .project-links {
      display: flex;
      align-items: center;
      color: var(--text-secondary);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 4px 6px;

        svg {
          width: 17px;
          height: 17px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 8px;
    color: var(--cream);
    font-size: 19px;
    font-weight: 600;
    word-break: break-word;

    a {
      color: var(--cream);
    }
  }

  .project-description {
    color: var(--text-secondary);
    font-size: var(--fz-sm);
    line-height: 1.6;
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 0;
    margin: 16px 0 0;
    list-style: none;

    li {
      font-size: var(--fz-xs);
      color: var(--cream);
      background: rgba(34, 57, 111, 0.55);
      padding: 3px 10px;
      border: 1px solid var(--border);
      border-radius: var(--radius-pill);
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
        sort: { frontmatter: { date: DESC } }
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

  const projects = data.projects.edges.filter(
    ({ node }) => node && node.fileAbsolutePath.includes(`.${language}.md`),
  );

  return (
    <StyledProjectsSection>
      <div className="sub-header">
        <div>
          <h2>{t('Other Production Systems')}</h2>
          <p>13 named production systems in total across enterprise platforms.</p>
        </div>

        <Link className="archive-link" to="/archive">
          {t('View all projects')} &rarr;
        </Link>
      </div>

      <ul className="projects-grid">
        {projects &&
          projects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { github, external, title, company, tech } = frontmatter;
            const href = external || github || null;

            return (
              <StyledProject key={i}>
                <div className="project-inner">
                  <header style={{ width: '100%' }}>
                    <div className="project-image">
                      <ProjectMedia frontmatter={frontmatter} compact />
                    </div>

                    <div className="project-top">
                      <span className="company-badge">{company || 'Production'}</span>
                      {(github || external) && (
                        <div className="project-links">
                          {github && (
                            <a
                              href={github}
                              aria-label="GitHub Link"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Icon name="GitHub" />
                            </a>
                          )}
                          {external && (
                            <a
                              href={external}
                              aria-label="External Link"
                              target="_blank"
                              rel="noreferrer"
                            >
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
