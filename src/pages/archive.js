import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useI18next } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import Layout from '@components/layout';
import { Icon } from '@components/icons';

const StyledTableContainer = styled.div`
  margin: 80px -20px;

  @media (max-width: 768px) {
    margin: 50px -10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    .hide-on-mobile {
      @media (max-width: 768px) {
        display: none;
      }
    }

    tbody tr {
      &:hover,
      &:focus {
        background-color: rgba(0, 255, 102, 0.06);
      }
    }

    th,
    td {
      padding: 12px 10px;
      text-align: left;

      &:first-child {
        padding-left: 20px;

        @media (max-width: 768px) {
          padding-left: 10px;
        }
      }
      &:last-child {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    tr {
      cursor: default;
    }

    td {
      &.year {
        padding-right: 20px;
        white-space: nowrap;

        @media (max-width: 768px) {
          padding-right: 10px;
          font-size: var(--fz-sm);
        }
      }

      &.title {
        padding-top: 15px;
        padding-right: 20px;
        color: var(--lightest-slate);
        font-family: var(--font-mono);
        font-size: var(--fz-lg);
        font-weight: 600;
        line-height: 1.25;
      }

      &.company {
        font-size: var(--fz-md);
        color: var(--green);
        white-space: nowrap;
      }

      &.tech {
        font-size: var(--fz-xxs);
        font-family: var(--font-mono);
        line-height: 1.5;
        .separator {
          margin: 0 5px;
        }
        span {
          display: inline-block;
        }
      }

      &.links {
        min-width: 100px;

        div {
          display: flex;
          align-items: center;

          a {
            ${({ theme }) => theme.mixins.flexCenter};
            flex-shrink: 0;
          }

          a + a {
            margin-left: 10px;
          }
        }
      }
    }
  }
`;

const ArchivePage = ({ location, data }) => {
  const { language } = useI18next();
  const projects = data.allMarkdownRemark.edges.filter(
    ({ node }) => node && node.fileAbsolutePath.includes(`.${language}.md`),
  );

  return (
    <Layout location={location}>
      <Helmet title="Production Systems" />

      <main>
        <header>
          <h1 className="big-heading">Production Systems</h1>
          <p className="subtitle">
            13 named production systems delivered across Askrindo, MSIG Life, Prudential, and XL
            Axiata
          </p>
        </header>

        <StyledTableContainer>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Title</th>
                <th className="hide-on-mobile">Made at</th>
                <th className="hide-on-mobile">Built with</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 &&
                projects.map(({ node }, i) => {
                  const {
                    date,
                    github,
                    external,
                    ios,
                    android,
                    title,
                    tech,
                    company,
                  } = node.frontmatter;
                  return (
                    <tr key={i}>
                      <td className="overline year">
                        {/^\d{4}/.test(date || '') ? new Date(date).getFullYear() : 'Core'}
                      </td>

                      <td className="title">{title}</td>

                      <td className="company hide-on-mobile">
                        {company ? <span>{company}</span> : <span>—</span>}
                      </td>

                      <td className="tech hide-on-mobile">
                        {tech &&
                          tech.length > 0 &&
                          tech.map((item, idx) => (
                            <span key={idx}>
                              {item}
                              {idx !== tech.length - 1 && (
                                <span className="separator">&middot;</span>
                              )}
                            </span>
                          ))}
                      </td>

                      <td className="links">
                        <div>
                          {external && (
                            <a
                              href={external}
                              aria-label="External Link"
                              target="_blank"
                              rel="noreferrer">
                              <Icon name="External" />
                            </a>
                          )}
                          {github && (
                            <a
                              href={github}
                              aria-label="GitHub Link"
                              target="_blank"
                              rel="noreferrer">
                              <Icon name="GitHub" />
                            </a>
                          )}
                          {ios && (
                            <a
                              href={ios}
                              aria-label="Apple App Store Link"
                              target="_blank"
                              rel="noreferrer">
                              <Icon name="AppStore" />
                            </a>
                          )}
                          {android && (
                            <a
                              href={android}
                              aria-label="Google Play Store Link"
                              target="_blank"
                              rel="noreferrer">
                              <Icon name="PlayStore" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </StyledTableContainer>
      </main>
    </Layout>
  );
};

ArchivePage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ArchivePage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/projects|featured/" }
        frontmatter: { showInProjects: { ne: false } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fileAbsolutePath
          frontmatter {
            date
            title
            tech
            github
            external
            company
          }
          html
        }
      }
    }
  }
`;
