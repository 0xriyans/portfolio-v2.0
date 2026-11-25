import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { email } from '@config';
import { KEY_CODES } from '@utils';
import { useOnClickOutside } from '@hooks';
import { MOTION } from '@styles/motionTokens';

const MOBILE_ITEMS = [
  { label: 'Station', url: '/#about' },
  { label: 'Architecture', url: '/#architecture' },
  { label: 'Stack', url: '/#stack' },
  { label: 'Experience', url: '/#jobs' },
  { label: 'Projects', url: '/#projects' },
  { label: 'Terminal', url: '/#contact' },
];

const StyledMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const MenuPillButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: transparent;
  border: 1px solid rgba(0, 255, 102, 0.35);
  border-radius: 9999px;
  color: var(--green);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  cursor: pointer;
  position: relative;
  z-index: 60;
  transition: background-color ${MOTION.duration.micro}ms ease;

  &:hover,
  &:focus-visible {
    background: rgba(0, 255, 102, 0.12);
  }
`;

const StyledSidebar = styled.aside`
  display: none;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.flexCenter};
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 70px 20px 40px;
    width: min(78vw, 340px);
    height: 100vh;
    outline: 0;
    background-color: #070b09;
    border-left: 1px solid rgba(0, 255, 102, 0.35);
    box-shadow: -10px 0px 30px rgba(0, 0, 0, 0.85);
    z-index: 55;
    transform: translateX(${props => (props.menuOpen ? 0 : 105)}%);
    visibility: ${props => (props.menuOpen ? 'visible' : 'hidden')};
    transition: transform 250ms ${MOTION.easing.css}, visibility 250ms ease;
  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    text-align: center;
  }

  ol {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;

    li {
      margin: 0 auto 8px;
      font-size: 15px;
    }

    a {
      display: block;
      padding: 10px 16px;
      color: var(--light-slate);
      text-decoration: none;

      &:hover,
      &:focus {
        color: var(--green);
      }
    }
  }

  .drawer-langs {
    display: flex;
    gap: 10px;
    margin-top: 8px;

    a {
      padding: 6px 10px;
      font-size: 12px;
      border: 1px solid rgba(0, 255, 102, 0.25);
      border-radius: 4px;
      color: var(--light-slate);

      &.current {
        border-color: var(--green);
        color: var(--green);
      }
    }
  }

  .drawer-hire {
    margin-top: 10px;
    padding: 12px 24px;
    background: var(--green);
    color: #050505;
    font-weight: 700;
    font-size: 13px;
    border-radius: 9999px;
    text-decoration: none;
  }
`;

const Menu = ({ tabIndex = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { languages, language, originalPath } = useI18next();
  const buttonRef = useRef(null);
  const navRef = useRef(null);
  const wrapperRef = useRef(null);

  useOnClickOutside(wrapperRef, () => setMenuOpen(false));

  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === KEY_CODES.ESCAPE || e.key === KEY_CODES.ESCAPE_IE11) {
        setMenuOpen(false);
      }
    };
    const onResize = e => {
      if (e.currentTarget.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <StyledMenu ref={wrapperRef}>
      <Helmet>
        <body className={menuOpen ? 'blur' : ''} />
      </Helmet>

      <MenuPillButton
        type="button"
        onClick={() => setMenuOpen(prev => !prev)}
        ref={buttonRef}
        tabIndex={tabIndex}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
        {menuOpen ? '[ CLOSE ]' : '[ MENU ]'}
      </MenuPillButton>

      <StyledSidebar menuOpen={menuOpen} aria-hidden={!menuOpen} tabIndex={menuOpen ? 1 : -1}>
        <nav ref={navRef}>
          <ol>
            {MOBILE_ITEMS.map(({ url, label }, i) => (
              <li key={i}>
                <Link to={url} onClick={() => setMenuOpen(false)}>
                  {label}
                </Link>
              </li>
            ))}
          </ol>

          <div className="drawer-langs">
            {languages.map(lng => (
              <Link
                key={lng}
                to={originalPath}
                language={lng}
                className={language === lng ? 'current' : ''}
                onClick={() => setMenuOpen(false)}>
                {lng.toUpperCase()}
              </Link>
            ))}
          </div>

          <a
            className="drawer-hire"
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}>
            HIRE_ME [ON]
          </a>
        </nav>
      </StyledSidebar>
    </StyledMenu>
  );
};

Menu.propTypes = {
  tabIndex: PropTypes.number,
};

export default Menu;
