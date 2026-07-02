import React, { useState, useEffect, useRef } from 'react';
import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css, keyframes } from 'styled-components';
import { navLinks } from '@config';
import { loaderDelay } from '@utils';
import { useScrollDirection, usePrefersReducedMotion, useOnClickOutside } from '@hooks';
import { Menu } from '@components';
import { IconLogo } from '@components/icons';

const scanlineAnim = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  background-color: transparent;
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  transition: var(--transition);

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    top: 5px;
    left: 1%;
    width: 98%;
    padding: 0 15px;
    position: absolute; /* Stop floating on mobile */
    background-color: transparent !important;
    backdrop-filter: none !important;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${props =>
    props.scrollDirection === 'up' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background-color: rgba(9, 10, 15, 0.85);
        backdrop-filter: blur(10px);
      `};

    ${props =>
    props.scrollDirection === 'down' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
      `};
  }
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  z-index: 12;

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};

    a {
      color: var(--green, #00ff66);
      text-decoration: none;
      font-weight: bold;
      font-size: var(--fz-xl);
      letter-spacing: 0.1em;
      transition: var(--transition);
      text-shadow: 0 0 10px rgba(0, 255, 102, 0.5);

      &:hover,
      &:focus {
        color: var(--white);
        text-shadow: 0 0 15px rgba(0, 255, 102, 0.8);
      }
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 10px;
      position: relative;
      font-size: var(--fz-xs);
      letter-spacing: 0.1em;

      a {
        padding: 10px;
        transition: var(--transition);
        position: relative;
        color: var(--light-slate);
        
        &:hover,
        &:focus {
          color: var(--white);
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
        }
      }
    }
  }

  .resume-button {
    margin-left: 20px;
    padding: 8px 16px;
    font-size: var(--fz-xs);
    font-family: var(--font-mono);
    color: var(--dark-navy, #020c1b);
    background-color: var(--green, #00ff66);
    border: 1px solid var(--green, #00ff66);
    border-radius: 4px;
    font-weight: 600;
    text-transform: uppercase;
    transition: var(--transition);
    text-decoration: none;
    box-shadow: 0 0 10px rgba(0, 255, 102, 0.3);

    &:hover,
    &:focus {
      background-color: transparent;
      color: var(--green, #00ff66);
      box-shadow: 0 0 15px rgba(0, 255, 102, 0.6);
      outline: none;
    }
  }
`;

const StyledLanguageDropdown = styled.div`
  position: relative;

  .dropdown-btn {
    display: flex;
    gap: 5px;
    align-items: center;
    padding: 6px 12px;
    background: transparent;
    border: 1px solid var(--blue);
    border-radius: 2px;
    cursor: pointer;
    transition: var(--transition);

    .lang-text {
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      color: var(--blue);
      font-weight: 600;
      letter-spacing: 0.1em;
      white-space: nowrap;
    }

    &:hover, &:focus {
      background: rgba(0, 255, 102, 0.1);
      box-shadow: 0 0 10px rgba(0, 255, 102, 0.2);
    }
  }

  .dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: 5px;
    background-color: rgba(2, 10, 20, 0.95);
    border: 1px solid var(--blue);
    min-width: 80px;
    box-shadow: 0px 8px 16px 0px rgba(0, 255, 102, 0.2);
    z-index: 100;
    border-radius: 2px;
    overflow: hidden;

    &.show {
      display: block;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 15px;
      text-decoration: none;
      transition: var(--transition);

      .lang-text {
        font-family: var(--font-mono);
        font-size: var(--fz-xs);
        color: var(--blue);
        font-weight: 600;
        letter-spacing: 0.1em;
        white-space: nowrap;
      }

      &:hover,
      &:focus {
        background-color: var(--blue);
        .lang-text {
          color: var(--navy);
        }
      }
    }
  }
`;

const Nav = ({ isHome }) => {
  const [isMounted, setIsMounted] = useState(!isHome);
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { languages, language, originalPath } = useI18next();
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setDropdownOpen(false));

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timeout = isHome ? loaderDelay : 0;
  const fadeClass = isHome ? 'fade' : '';
  const fadeDownClass = isHome ? 'fadedown' : '';

  const Logo = (
    <div className="logo" tabIndex="-1">
      {isHome ? (
        <a href="/" aria-label="home">
          {"< RIYAN />"}
        </a>
      ) : (
        <Link to="/" aria-label="home">
          {"< RIYAN />"}
        </Link>
      )}
    </div>
  );

  const ResumeLink = (
    <a
      className="resume-button"
      href="mailto:ryansgrt23@gmail.com"
      target="_blank"
      rel="noopener noreferrer">
      HIRE_ME [ON]
    </a>
  );


  const flags = {
    id: { src: 'https://flagcdn.com/w80/id.png', label: 'ID' },
    en: { src: 'https://flagcdn.com/w80/gb.png', label: 'EN' },
    jp: { src: 'https://flagcdn.com/w80/jp.png', label: 'JP' },
    ar: { src: 'https://flagcdn.com/w80/sa.png', label: 'AR' },
  };

  const LanguageSwitcher = (
    <StyledLanguageDropdown ref={dropdownRef}>
      <button className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <span className="lang-text">[ {flags[language]?.label || 'EN'} ]</span>
      </button>
      <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
        {languages.map(lng => (
          <Link key={lng} to={originalPath} language={lng} onClick={() => setDropdownOpen(false)}>
            <span className="lang-text">[ {flags[lng]?.label} ]</span>
          </Link>
        ))}
      </div>
    </StyledLanguageDropdown>
  );

  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <StyledNav>
        {prefersReducedMotion ? (
          <>
            {Logo}

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StyledLinks>
                <ol>
                  {navLinks &&
                    navLinks.map(({ url, name }, i) => (
                      <li key={i}>
                        {url.startsWith('http') ? (
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            {t(name)}
                          </a>
                        ) : (
                          <Link to={url}>{t(name)}</Link>
                        )}
                      </li>
                    ))}
                </ol>
                <div>{ResumeLink}</div>

              </StyledLinks>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {LanguageSwitcher}
                <Menu />
              </div>
            </div>
          </>
        ) : (
          <>
            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames={fadeClass} timeout={timeout}>
                  <>{Logo}</>
                </CSSTransition>
              )}
            </TransitionGroup>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <StyledLinks>
                <ol>
                  <TransitionGroup component={null}>
                    {isMounted &&
                      navLinks &&
                      navLinks.map(({ url, name }, i) => (
                        <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
                          <li key={i} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                            {url.startsWith('http') ? (
                              <a href={url} target="_blank" rel="noopener noreferrer">
                                {t(name)}
                              </a>
                            ) : (
                              <Link to={url}>{t(name)}</Link>
                            )}
                          </li>
                        </CSSTransition>
                      ))}
                  </TransitionGroup>
                </ol>

                <TransitionGroup component={null}>
                  {isMounted && (
                    <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                      <div style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}>
                        {ResumeLink}
                      </div>
                    </CSSTransition>
                  )}
                </TransitionGroup>


              </StyledLinks>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TransitionGroup component={null}>
                  {isMounted && (
                    <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                      <div
                        style={{
                          transitionDelay: `${isHome ? (navLinks.length + 2) * 100 : 0}ms`,
                        }}>
                        {LanguageSwitcher}
                      </div>
                    </CSSTransition>
                  )}
                </TransitionGroup>

                <TransitionGroup component={null}>
                  {isMounted && (
                    <CSSTransition classNames={fadeClass} timeout={timeout}>
                      <Menu />
                    </CSSTransition>
                  )}
                </TransitionGroup>
              </div>
            </div>
          </>
        )}
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
