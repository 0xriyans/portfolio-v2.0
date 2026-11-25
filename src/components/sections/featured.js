import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import ProjectDiagram from '../ProjectDiagram';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
    ${({ theme }) => theme.mixins.glassmorphism};
    padding: 0;
    overflow: hidden;
  }

  &:not(:last-of-type) {
    margin-bottom: 90px;

    @media (max-width: 768px) {
      margin-bottom: 60px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 32px 28px 24px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 24px 20px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      padding: 30px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 24px 20px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--white);
    font-family: var(--font-mono);
    font-size: clamp(20px, 3.2vw, 24px);
    word-break: break-word;

    @media (min-width: 768px) {
      margin: 0 0 18px;
    }

    a {
      color: var(--white);
      &:hover {
        color: var(--green);
      }
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.glassmorphism};
    padding: 55px 25px 25px;
    position: relative;
    z-index: 2;
    color: var(--light-slate);
    font-size: var(--fz-md);
    font-family: var(--font-sans);
    line-height: 1.6;

    &::after {
      content: 'sys_log.sh';
    }

    @media (max-width: 768px) {
      padding: 16px 0;
      background: transparent;
      border: none;
      box-shadow: none;
      &::before,
      &::after {
        display: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--green);
      font-weight: 600;
    }

    code {
      font-size: 12px;
      color: var(--green);
      background: rgba(0, 255, 102, 0.08);
      padding: 1px 5px;
      border-radius: 2px;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    position: relative;
    z-index: 2;
    margin: 22px 0 10px;
    padding: 0;
    list-style: none;

    @media (max-width: 768px) {
      margin: 15px 0 10px;
      justify-content: flex-start;
    }

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      color: var(--green);
      background: rgba(2, 10, 20, 0.85);
      padding: 4px 10px;
      border: 1px solid rgba(0, 255, 102, 0.25);
      border-radius: 2px;
      display: inline-flex;
      align-items: center;

      &::before {
        content: '>>';
        color: var(--pink);
        margin-right: 6px;
        font-weight: 700;
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

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

  .project-image {
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(0, 255, 102, 0.25);
    transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms ease;

    &:hover {
      border-color: var(--green);
      transform: translateY(-4px);
    }

    @media (max-width: 768px) {
      width: 100%;
      min-height: 210px;
    }

    .media-link,
    .media-box {
      width: 100%;
      height: 100%;
      display: block;
    }

    .img {
      width: 100%;
      height: 100%;
      display: block;
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
              diagram
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
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
    <section id="projects">
      <h2 className="numbered-heading">{t('Some Things I’ve Built')}</h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, tech, github, cover, diagram } = frontmatter;
            const image = cover ? getImage(cover) : null;
            const href = external || github || null;

            const media = image ? (
              <GatsbyImage image={image} alt={title} className="img" />
            ) : (
              <ProjectDiagram type={diagram} title={title} />
            );

            return (
              <StyledProject key={i}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">{t('Featured Project')}</p>

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

                    {tech && tech.length > 0 && (
                      <ul className="project-tech-list">
                        {tech.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}

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
                </div>

                <div className="project-image">
                  {href ? (
                    <a className="media-link" href={href} target="_blank" rel="noreferrer">
                      {media}
                    </a>
                  ) : (
                    <div className="media-box">{media}</div>
                  )}
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
