import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useI18next } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import Layout from '@components/layout';
import { Icon } from '@components/icons';

const StyledHeader = styled.header`
  margin-top: 40px;

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
    font-size: var(--fz-sm);
    font-weight: 500;
    color: var(--text-muted);

    &:hover {
      color: var(--cream);
    }
  }
`;

const StyledTableContainer = styled.div`
  margin: 48px 0 80px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;

  table {
    width: 100%;
    border-collapse: collapse;

    .hide-on-mobile {
      @media (max-width: 768px) {
        display: none;
      }
    }

    thead th {
      padding: 16px 20px;
      text-align: left;
      font-size: var(--fz-xs);
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--text-muted);
      border-bottom: 1px solid var(--border);
    }

    tbody tr {
      border-bottom: 1px solid rgba(34, 57, 111, 0.45);

      &:last-child {
        border-bottom: 0;
      }

      &:hover,
      &:focus-within {
        background-color: rgba(34, 57, 111, 0.3);
      }
    }

    td {
      padding: 16px 20px;
      text-align: left;
      vertical-align: top;

      @media (max-width: 768px) {
        padding: 14px 14px;
      }

      svg {
        width: 18px;
        height: 18px;
      }

      &.year {
        color: var(--text-muted);
        font-size: var(--fz-sm);
        white-space: nowrap;
      }

      &.title {
        color: var(--cream);
        font-size: var(--fz-md);
        font-weight: 600;
        line-height: 1.35;
      }

      &.company {
        font-size: var(--fz-sm);
        color: var(--text-secondary);
        white-space: nowrap;
      }

      &.tech {
        font-size: var(--fz-xs);
        color: var(--text-muted);
        line-height: 1.5;

        .separator {
          margin: 0 6px;
        }
      }

      &.links {
        min-width: 76px;

        div {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-secondary);

          a {
            display: inline-flex;
            padding: 4px;
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
      <Helmet title="All Production Systems" />

      <main>
        <StyledHeader>
          <Link className="back-link" to="/#projects">
            &larr; Back to home
          </Link>
          <h1 className="big-heading">All Projects</h1>
          <p className="subtitle">
            13 named production systems delivered across Askrindo, MSIG Life, Prudential, and XL
            Axiata.
          </p>
        </StyledHeader>

        <StyledTableContainer>
          <table>
            <thead>
              <tr>
                <th>Period</th>
                <th>Project</th>
                <th className="hide-on-mobile">Company</th>
                <th className="hide-on-mobile">Stack</th>
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
                      <td className="year">
                        {/^\d{4}/.test(date || '') ? new Date(date).getFullYear() : 'Production'}
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
