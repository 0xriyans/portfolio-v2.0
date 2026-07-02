import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled, { keyframes } from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

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
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 80px;
    }

    @media (max-width: 480px) {
      margin-bottom: 80px;
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
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
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
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--blue);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(20px, 4vw, 24px);
    word-break: break-word;

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
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
  }

  .project-description {
    ${({ theme }) => theme.mixins.glassmorphism};
    padding: 60px 25px 25px;
    position: relative;
    z-index: 2;
    color: var(--light-slate);
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    transition: var(--transition);

    p {
      font-family: var(--font-mono);
    }

    &::after {
      content: 'sys_log.sh';
    }

    &:hover {
      border-color: rgba(0, 255, 102, 0.5);
      border-top-color: var(--pink);
      background: rgba(2, 10, 20, 1);
      box-shadow: 0 5px 20px rgba(0, 255, 102, 0.1);
      
      &::before {
        color: var(--pink);
      }
    }

    @media (max-width: 768px) {
      padding: 20px 0;
      background: transparent;
      border: none;
      &::before, &::after {
        display: none;
      }
      &:hover {
        box-shadow: none;
        background: transparent;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--blue); /* Highlight bold text with matrix green */
      font-weight: 600;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    @media (max-width: 768px) {
      margin: 15px 0 10px;
      justify-content: flex-start;
    }

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      color: var(--blue); 
      background: rgba(2, 10, 20, 0.8);
      padding: 4px 10px;
      border: 1px solid rgba(0, 255, 102, 0.2);
      border-radius: 2px;
      transition: var(--transition);
      display: inline-flex;
      align-items: center;

      &::before {
        content: '>>';
        color: var(--pink);
        margin-right: 6px;
        font-weight: 700;
      }

      &:hover {
        color: var(--navy);
        background: var(--blue);
        border-color: var(--blue);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 255, 102, 0.4);
        
        &::before {
          color: var(--navy);
        }
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

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      width: 100%;
      height: 250px;
      opacity: 1;
      box-shadow: none;

      a {
        border-radius: 0;
      }
    }

    a {
      width: 100%;
      height: 100%;
      border-radius: 0;
      clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
      vertical-align: middle;
      overflow: hidden;
      display: block;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 20%;
        background: linear-gradient(to bottom, rgba(184, 255, 0, 0) 0%, rgba(184, 255, 0, 0.4) 50%, rgba(184, 255, 0, 0) 100%);
        opacity: 0;
        pointer-events: none;
        z-index: 2;
      }

      &:hover,
      &:focus {
        outline: 0;
        box-shadow: 0 0 30px rgba(184, 255, 0, 0.5);

        &::after {
          opacity: 1;
          animation: scanlineSweep 2s linear infinite;
        }

        .img {
          transform: scale(1.05);
          filter: none;
        }
      }
    }

    .img {
      border-radius: 0;
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      filter: none;

      @media (max-width: 768px) {
        object-fit: cover;
        width: 100%;
        height: 100%;
        filter: none;
      }
    }
  }
`;

const scanlineSweep = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(500%); }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
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
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        {t('Some Things I’ve Built')}
      </h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, tech, github, cover, cta } = frontmatter;
            const image = getImage(cover);

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">{t('SYS.MODULE // FEATURED')}</p>

                    <h3 className="project-title">
                      <a href={external}>{`> RUN: ${title}.exe`}</a>
                    </h3>

                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />

                    {tech.length && (
                      <ul className="project-tech-list">
                        {tech.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-links">
                      {cta && (
                        <a href={cta} aria-label="Course Link" className="cta">
                          {t('Learn More')}
                        </a>
                      )}
                      {github && (
                        <a href={github} aria-label="GitHub Link">
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {external && !cta && (
                        <a href={external} aria-label="External Link" className="external">
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="project-image">
                  <a href={external ? external : github ? github : '#'}>
                    <GatsbyImage image={image} alt={title} className="img" />
                  </a>
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
