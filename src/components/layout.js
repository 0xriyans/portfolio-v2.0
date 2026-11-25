import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import Head from '@components/head';
import Loader from '@components/loader';
import Nav from '@components/nav';
import Social from '@components/social';
import Email from '@components/email';
import Footer from '@components/footer';
import MatrixRain from '@components/MatrixRain';
import ScrollProgress from '@components/ScrollProgress';
import { usePrefersReducedMotion } from '@hooks';
import { BootProvider } from '@utils/bootContext';
import { theme } from '@styles';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children, location }) => {
  const isHome = ['/', '/id', '/id/', '/jp', '/jp/', '/en', '/en/'].includes(location.pathname);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showBoot, setShowBoot] = useState(isHome);

  // Immediately bypass boot on returning visits or reduced motion
  useEffect(() => {
    if (!isHome) {
      setShowBoot(false);
      return;
    }
    try {
      const seen = window.localStorage.getItem('riyan_boot_seen') === '1';
      if (seen || prefersReducedMotion) {
        document.documentElement.classList.add('skip-boot');
        setShowBoot(false);
      }
    } catch (e) {
      if (prefersReducedMotion) {
        setShowBoot(false);
      }
    }
  }, [isHome, prefersReducedMotion]);

  // Sets target="_blank" rel="noopener noreferrer" on external links
  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host && link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    if (showBoot) {
      return;
    }

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

    handleExternalLinks();
  }, [showBoot, location.hash]);

  const bootDone = !isHome || !showBoot || prefersReducedMotion;

  return (
    <>
      <Head />

      <div id="root">
        <ThemeProvider theme={theme}>
          <a className="skip-to-content" href="#content">
            Skip to Content
          </a>
          {bootDone && <MatrixRain />}
          <ScrollProgress />

          {showBoot && isHome && <Loader finishLoading={() => setShowBoot(false)} />}

          <BootProvider bootDone={bootDone}>
            <StyledContent>
              <Nav isHome={isHome} />
              <Social isHome={isHome} />
              <Email isHome={isHome} />

              <div id="content">
                {children}
                <Footer />
              </div>
            </StyledContent>
          </BootProvider>
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
