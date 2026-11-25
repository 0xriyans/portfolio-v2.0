import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SeoHead from '@components/head';
import Layout from '@components/layout';

const StyledMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const StyledTitle = styled.h1`
  color: var(--cream);
  font-family: var(--font-heading);
  font-size: clamp(72px, 18vw, 150px);
  line-height: 1;
`;
const StyledSubtitle = styled.h2`
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 500;
  color: var(--text-secondary);
`;
const StyledHomeButton = styled(Link)`
  ${({ theme }) => theme.mixins.bigButton};
  margin-top: 32px;
`;

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <StyledTitle>404</StyledTitle>
      <StyledSubtitle>Page Not Found</StyledSubtitle>
      <StyledHomeButton to="/">Back to Home</StyledHomeButton>
    </StyledMainContainer>
  </Layout>
);

NotFoundPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default NotFoundPage;

export const Head = ({ location, pageContext }) => (
  <SeoHead
    title="Page Not Found"
    pathname={location.pathname}
    language={
      (pageContext && (pageContext.language || (pageContext.i18n && pageContext.i18n.language))) ||
      'en'
    }
  />
);

Head.propTypes = {
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object,
};
