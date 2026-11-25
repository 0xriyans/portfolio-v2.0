/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const https = require('https');
const path = require('path');

// Mencegah peringatan MaxListenersExceededWarning saat gatsby-plugin-manifest membuat puluhan favicon
require('events').EventEmitter.defaultMaxListeners = 20;

const fetchJson = (url, timeoutMs = 6000) =>
  new Promise(resolve => {
    const req = https.get(url, { headers: { 'User-Agent': 'gatsby-build' } }, res => {
      if (res.statusCode !== 200) {
        res.resume();
        resolve(null);
        return;
      }
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    });
    req.setTimeout(timeoutMs, () => {
      req.destroy();
      resolve(null);
    });
    req.on('error', () => resolve(null));
  });

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type MarkdownRemarkFrontmatter {
      title: String
      date: String
      company: String
      tabLabel: String
      location: String
      range: String
      url: String
      tech: [String]
      github: String
      external: String
      cta: String
      ios: String
      android: String
      diagram: String
      showInProjects: Boolean
      cover: File @fileByRelativePath
    }

    type GithubContributionDay {
      date: String!
      count: Int!
      level: Int!
    }

    type GithubActivity implements Node {
      total: Int!
      contributions: [GithubContributionDay!]!
    }
  `);
};

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  const payload = await fetchJson(
    'https://github-contributions-api.jogruber.de/v4/0xriyans?y=last',
  );
  const contributions =
    payload && Array.isArray(payload.contributions) ? payload.contributions : [];
  const total =
    payload && payload.total && typeof payload.total.lastYear === 'number'
      ? payload.total.lastYear
      : 0;

  createNode({
    id: createNodeId('github-activity-0xriyans'),
    total,
    contributions,
    internal: {
      type: 'GithubActivity',
      contentDigest: createContentDigest({ total, len: contributions.length }),
    },
  });
};

exports.createPages = async () => {
  // Blog (pensieve) and tag pages have been removed to keep the portfolio clean.
};

// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /miniraf/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};
