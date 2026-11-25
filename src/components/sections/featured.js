import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import ProjectMedia from '../ProjectMedia';

const StyledFeaturedSection = styled.section`
  max-width: 1120px;

  .projects-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 42px;
  }

  .view-all-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 20px;
    border-radius: var(--radius-pill);
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--cream);
    font-size: var(--fz-sm);
    font-weight: 600;

    &:hover,
    &:focus-visible {
      background: var(--cream);
      border-color: var(--cream);
      color: var(--on-cream);
    }
  }
`;

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 32px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 24px;
  }
`;

const StyledProject = styled.li`
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 12px 32px rgba(1, 7, 54, 0.38);

  @media (min-width: 769px) {
    &:nth-child(even) {
      margin-top: 56px;
    }
  }

  .project-media {
    width: 100%;
    height: 230px;
    border-bottom: 1px solid var(--border);
    background: #091538;
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
    padding: 24px 26px;
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
    color: var(--text-muted);
    font-size: var(--fz-xs);
    font-weight: 600;
    letter-spacing: 0.03em;
  }

  .project-links {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--text-secondary);

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
    margin: 0 0 10px;
    color: var(--cream);
    font-size: 22px;
    font-weight: 600;
    line-height: 1.25;

    a {
      color: var(--cream);
    }
  }

  .project-description {
    color: var(--text-secondary);
    font-size: var(--fz-md);
    line-height: 1.6;
    margin-bottom: 18px;

    strong {
      color: var(--cream);
      font-weight: 600;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      font-size: var(--fz-xs);
      color: var(--cream);
      background: rgba(34, 57, 111, 0.55);
      padding: 4px 11px;
      border: 1px solid var(--border);
      border-radius: var(--radius-pill);
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

  const featuredProjects = data.featured.edges.filter(
    ({ node }) => node && node.fileAbsolutePath.includes(`.${language}.md`),
  );

  return (
    <StyledFeaturedSection id="projects">
      <div className="projects-header">
        <div>
          <span className="section-kicker">{t('Selected work')}</span>
          <h2 className="section-heading">{t('Projects')}</h2>
          <p className="section-intro">
            High-concurrency insurance platforms, core financial migrations, AI e-KYC verification,
            and telecommunications microservices.
          </p>
        </div>

        <Link className="view-all-link" to="/archive">
          {t('View all projects')} &rarr;
        </Link>
      </div>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, company, tech, github } = frontmatter;
            const href = external || github || null;
            const media = <ProjectMedia frontmatter={frontmatter} compact />;

            return (
              <StyledProject key={i}>
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
