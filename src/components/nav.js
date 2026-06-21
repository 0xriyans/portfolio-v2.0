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

const liquidBlobAnim = keyframes`
  0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
`;

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  @media (max-width: 768px) {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: var(--transition);

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${props =>
    props.scrollDirection === 'up' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background-color: rgba(255, 255, 255, 0.1);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      `};

    ${props =>
    props.scrollDirection === 'down' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};
  }
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  counter-reset: item 0;
  z-index: 12;

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};

    a {
      color: var(--navy);
      width: 48px;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, var(--yellow), var(--pink));
      animation: ${liquidBlobAnim} 4s ease-in-out infinite;
      transition: var(--transition);
      box-shadow: 0 4px 10px rgba(255, 77, 109, 0.3);

      &:hover,
      &:focus {
        background: linear-gradient(135deg, var(--pink), var(--yellow));
        transform: scale(1.1);
        box-shadow: 0 6px 15px rgba(255, 77, 109, 0.5);
      }

      svg {
        fill: none;
        width: 60%;
        height: 60%;
        user-select: none;
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
      margin: 0 5px;
      position: relative;
      counter-increment: item 1;
      font-size: var(--fz-md);

      a {
        padding: 10px;

        &:before {
          content: '0' counter(item) '.';
          margin-right: 5px;
          color: var(--yellow);
          font-size: var(--fz-xxs);
          text-align: right;
        }
      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    font-size: var(--fz-sm);
  }
  .theme-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    font-size: var(--fz-xl);
    padding: 0.5rem 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--yellow);

    &:hover,
    &:focus {
      background: var(--yellow-tint);
    }
  }
`;

const StyledLanguageDropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 10px;

  .dropdown-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 1px solid var(--yellow);
    padding: 0.5rem 0.75rem;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);

    &:hover,
    &:focus {
      background: var(--yellow-tint);
    }

    img {
      width: 24px;
      height: 16px;
      object-fit: cover;
      border-radius: 2px;
    }
  }

  .dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: 5px;
    background-color: var(--light-navy);
    min-width: 100px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
    z-index: 100;
    border-radius: var(--border-radius);
    overflow: hidden;

    &.show {
      display: block;
    }

    a {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--lightest-slate);
      padding: 10px 15px;
      text-decoration: none;
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      transition: var(--transition);

      img {
        width: 20px;
        height: 14px;
        object-fit: cover;
        border-radius: 2px;
      }

      &:hover,
      &:focus {
        background-color: var(--navy);
        color: var(--yellow);
      }
    }
  }
`;

const Nav = ({ isHome, toggleTheme, themeMode }) => {
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
          <IconLogo />
        </a>
      ) : (
        <Link to="/" aria-label="home">
          <IconLogo />
        </Link>
      )}
    </div>
  );

  const ResumeLink = (
    <a
      className="resume-button"
      href="/Riyan Sugiarto - Resume 2025.pdf"
      target="_blank"
      rel="noopener noreferrer">
      {t('Resume')}
    </a>
  );

  const ThemeToggle = (
    <button className="theme-button" onClick={toggleTheme} aria-label="Toggle Theme">
      {themeMode === 'light' ? '🌙' : '☀️'}
    </button>
  );

  const flags = {
    id: { src: 'https://flagcdn.com/w80/id.png', label: 'ID' },
    en: { src: 'https://flagcdn.com/w80/us.png', label: 'EN' },
    jp: { src: 'https://flagcdn.com/w80/jp.png', label: 'JP' },
    ar: { src: 'https://flagcdn.com/w80/sa.png', label: 'AR' },
  };

  const LanguageSwitcher = (
    <StyledLanguageDropdown ref={dropdownRef}>
      <button className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img src={flags[language]?.src || flags.en.src} alt={language} />
        <span style={{ fontSize: '10px', color: 'var(--light-slate)' }}>▼</span>
      </button>
      <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
        {languages.map(lng => (
          <Link key={lng} to={originalPath} language={lng} onClick={() => setDropdownOpen(false)}>
            <img src={flags[lng]?.src} alt={lng} />
            <span>{flags[lng]?.label}</span>
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
              <div style={{ marginLeft: '10px' }}>{ThemeToggle}</div>
              {LanguageSwitcher}
            </StyledLinks>

            <Menu toggleTheme={toggleTheme} themeMode={themeMode} />
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

              <TransitionGroup component={null}>
                {isMounted && (
                  <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                    <div
                      style={{
                        transitionDelay: `${isHome ? (navLinks.length + 1) * 100 : 0}ms`,
                        marginLeft: '10px',
                      }}>
                      {ThemeToggle}
                    </div>
                  </CSSTransition>
                )}
              </TransitionGroup>

              <TransitionGroup component={null}>
                {isMounted && (
                  <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                    <div
                      style={{ transitionDelay: `${isHome ? (navLinks.length + 2) * 100 : 0}ms` }}>
                      {LanguageSwitcher}
                    </div>
                  </CSSTransition>
                )}
              </TransitionGroup>
            </StyledLinks>

            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames={fadeClass} timeout={timeout}>
                  <Menu toggleTheme={toggleTheme} themeMode={themeMode} />
                </CSSTransition>
              )}
            </TransitionGroup>
          </>
        )}
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
  toggleTheme: PropTypes.func,
  themeMode: PropTypes.string,
};

export default Nav;
