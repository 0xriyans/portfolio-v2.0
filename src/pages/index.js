import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Layout from '@components/layout';
import Hero from '@components/sections/hero';
import LazySection from '@components/LazySection';

const LazyFeatured = React.lazy(() => import('@components/sections/featured'));
const LazyProjects = React.lazy(() => import('@components/sections/projects'));
const LazyStack = React.lazy(() => import('@components/sections/stack'));
const LazyJobs = React.lazy(() => import('@components/sections/jobs'));
const LazyGithubHeatmap = React.lazy(() => import('@components/sections/githubHeatmap'));
const LazyAbout = React.lazy(() => import('@components/sections/about'));
const LazyContact = React.lazy(() => import('@components/sections/contact'));

const StyledMainContainer = styled.main`
  padding: 0 32px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <LazySection
        id="projects"
        rootMargin="40px 0px"
        maxWidth={1120}
        minHeight={720}
        heading="Projects">
        <LazyFeatured />
      </LazySection>
      <LazySection maxWidth={1120} minHeight={520}>
        <LazyProjects />
      </LazySection>
      <LazySection id="stack" maxWidth={1120} minHeight={560} heading="Technology Stack">
        <LazyStack />
      </LazySection>
      <LazySection id="experience" maxWidth={1120} minHeight={640} heading="Work Experience">
        <LazyJobs />
      </LazySection>
      <LazySection id="github" maxWidth={1120} minHeight={340} heading="GitHub Contributions">
        <LazyGithubHeatmap />
      </LazySection>
      <LazySection id="about" maxWidth={1120} minHeight={480} heading="About">
        <LazyAbout />
      </LazySection>
      <LazySection id="contact" maxWidth={1120} minHeight={520} heading="Contact">
        <LazyContact />
      </LazySection>
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
