import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Layout from '@components/layout';
import Hero from '@components/sections/hero';
import LazySection from '@components/LazySection';

const LazyAbout = React.lazy(() => import('@components/sections/about'));
const LazyArchitecture = React.lazy(() => import('@components/sections/architecture'));
const LazyStack = React.lazy(() => import('@components/sections/stack'));
const LazyJobs = React.lazy(() => import('@components/sections/jobs'));
const LazyFeatured = React.lazy(() => import('@components/sections/featured'));
const LazyProjects = React.lazy(() => import('@components/sections/projects'));
const LazyGithubHeatmap = React.lazy(() => import('@components/sections/githubHeatmap'));
const LazyContact = React.lazy(() => import('@components/sections/contact'));

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <LazySection
        id="about"
        rootMargin="20px 0px"
        maxWidth={980}
        minHeight={680}
        heading="[ 01 // WHOAMI ]">
        <LazyAbout />
      </LazySection>
      <LazySection
        id="architecture"
        maxWidth={1000}
        minHeight={420}
        heading="[ 02 // ARCHITECTURE ]">
        <LazyArchitecture />
      </LazySection>
      <LazySection id="stack" maxWidth={1040} minHeight={520} heading="[ 03 // STACK ]">
        <LazyStack />
      </LazySection>
      <LazySection id="jobs" maxWidth={980} minHeight={680} heading="[ 04 // EXPERIENCE ]">
        <LazyJobs />
      </LazySection>
      <LazySection id="projects" maxWidth={1040} minHeight={820} heading="[ 05 // PROJECTS ]">
        <LazyFeatured />
      </LazySection>
      <LazySection maxWidth={1040} minHeight={720}>
        <LazyProjects />
      </LazySection>
      <LazySection id="github" maxWidth={980} minHeight={360} heading="[ 06 // GITHUB_ACTIVITY ]">
        <LazyGithubHeatmap />
      </LazySection>
      <LazySection id="contact" maxWidth={880} minHeight={560} heading="[ 07 // TERMINAL ]">
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
