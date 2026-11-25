import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import Head from '@components/head';
import Nav from '@components/nav';
import Footer from '@components/footer';
import { theme } from '@styles';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children, location }) => {
  const isHome = ['/', '/id', '/id/', '/jp', '/jp/', '/en', '/en/'].includes(location.pathname);

  useEffect(() => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    allLinks.forEach(link => {
      if (link.host && link.host !== window.location.host) {
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
      }
    });

    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }
  }, [location.hash]);

  return (
    <>
      <Head />

      <div id="root">
        <ThemeProvider theme={theme}>
          <a className="skip-to-content" href="#content">
            Skip to Content
          </a>

          <StyledContent>
            <Nav isHome={isHome} />

            <div id="content">
              {children}
              <Footer />
            </div>
          </StyledContent>
        </ThemeProvider>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
