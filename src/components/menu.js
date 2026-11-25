import React, { useState, useEffect, useRef } from 'react';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { email } from '@config';
import { KEY_CODES } from '@utils';
import { useOnClickOutside } from '@hooks';

const MOBILE_ITEMS = [
  { label: 'Home', url: '/#hero' },
  { label: 'Projects', url: '/#projects' },
  { label: 'Stack', url: '/#stack' },
  { label: 'Experience', url: '/#experience' },
  { label: 'About', url: '/#about' },
  { label: 'Contact', url: '/#contact' },
];

const StyledMenu = styled.div`
  display: none;

  @media (max-width: 820px) {
    display: flex;
    align-items: center;
  }
`;

const MenuPillButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(34, 57, 111, 0.55);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  color: var(--cream);
  font-family: var(--font-sans);
  font-size: var(--fz-sm);
  font-weight: 600;
  cursor: pointer;
  position: relative;
  z-index: 60;

  &:hover,
  &:focus-visible {
    background: var(--surface-2);
  }
`;

const StyledSidebar = styled.aside`
  display: none;

  @media (max-width: 820px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 72px 24px 40px;
    width: min(80vw, 340px);
    height: 100vh;
    outline: 0;
    background-color: var(--surface);
    border-left: 1px solid var(--border);
    box-shadow: -12px 0 36px rgba(1, 7, 54, 0.85);
    z-index: 55;
    transform: translateX(${props => (props.$menuOpen ? 0 : 105)}%);
    visibility: ${props => (props.$menuOpen ? 'visible' : 'hidden')};
  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    width: 100%;
    color: var(--cream);
    font-family: var(--font-sans);
    text-align: center;
  }

  ol {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;

    li {
      margin: 0 auto 6px;
      font-size: var(--fz-lg);
      font-weight: 500;
    }

    a {
      display: block;
      padding: 10px 16px;
      color: var(--text-secondary);
      border-radius: 12px;

      &:hover,
      &:focus-visible {
        color: var(--cream);
        background: rgba(34, 57, 111, 0.5);
      }
    }
  }

  .drawer-langs {
    display: flex;
    gap: 8px;
    margin-top: 6px;

    a {
      padding: 6px 12px;
      font-size: var(--fz-xs);
      font-weight: 600;
      border: 1px solid var(--border);
      border-radius: var(--radius-pill);
      color: var(--text-muted);

      &.current {
        border-color: var(--cream);
        color: var(--cream);
      }
    }
  }

  .drawer-cta {
    margin-top: 8px;
    padding: 12px 26px;
    background: var(--cream);
    color: var(--on-cream);
    font-weight: 600;
    font-size: var(--fz-sm);
    border-radius: var(--radius-pill);
  }
`;

const Menu = ({ tabIndex = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { languages, language, originalPath } = useI18next();
  const buttonRef = useRef(null);
  const wrapperRef = useRef(null);

  useOnClickOutside(wrapperRef, () => setMenuOpen(false));

  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === KEY_CODES.ESCAPE || e.key === KEY_CODES.ESCAPE_IE11) {
        setMenuOpen(false);
      }
    };
    const onResize = e => {
      if (e.currentTarget.innerWidth > 820) {
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

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    document.body.classList.toggle('blur', menuOpen);
    return () => document.body.classList.remove('blur');
  }, [menuOpen]);

  return (
    <StyledMenu ref={wrapperRef}>
      <MenuPillButton
        type="button"
        onClick={() => setMenuOpen(prev => !prev)}
        ref={buttonRef}
        tabIndex={tabIndex}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        {menuOpen ? 'Close' : 'Menu'}
      </MenuPillButton>

      <StyledSidebar $menuOpen={menuOpen} aria-hidden={!menuOpen} tabIndex={menuOpen ? 1 : -1}>
        <nav>
          <ol>
            {MOBILE_ITEMS.map(({ url, label }) => (
              <li key={url}>
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
                onClick={() => setMenuOpen(false)}
              >
                {lng.toUpperCase()}
              </Link>
            ))}
          </div>

          <a
            className="drawer-cta"
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Hire Me
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
