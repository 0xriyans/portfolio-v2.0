import React, { useState, useEffect } from 'react';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { email } from '@config';
import Menu from '@components/menu';

const SECTION_TARGETS = [
  { id: 'hero', label: 'Home', url: '/#hero' },
  { id: 'projects', label: 'Projects', url: '/#projects' },
  { id: 'stack', label: 'Stack', url: '/#stack' },
  { id: 'experience', label: 'Experience', url: '/#experience' },
  { id: 'about', label: 'About', url: '/#about' },
  { id: 'contact', label: 'Contact', url: '/#contact' },
];

const PillWrapper = styled.header`
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  z-index: 50;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  max-width: calc(100vw - 24px);
`;

const PillNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px 6px 14px;
  background: rgba(13, 28, 66, 0.94);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  box-shadow: 0 12px 30px rgba(1, 7, 54, 0.55);
  font-family: var(--font-sans);

  @media (max-width: 820px) {
    padding: 6px 8px;
  }
`;

const NavItems = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;

  @media (max-width: 820px) {
    display: none;
  }

  a {
    position: relative;
    padding: 8px 13px;
    font-size: var(--fz-sm);
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    white-space: nowrap;
    border-radius: var(--radius-pill);

    &.active {
      color: var(--cream);
      background: rgba(34, 57, 111, 0.65);
    }

    &:hover,
    &:focus-visible {
      color: var(--cream);
    }
  }
`;

const CtaButton = styled.a`
  padding: 9px 18px;
  font-size: var(--fz-sm);
  font-family: var(--font-sans);
  font-weight: 600;
  color: var(--on-cream);
  background-color: var(--cream);
  border: 1px solid var(--cream);
  border-radius: var(--radius-pill);
  text-decoration: none;
  white-space: nowrap;

  &:hover,
  &:focus-visible {
    background-color: #f3e4b5;
    border-color: #f3e4b5;
    color: var(--on-cream);
  }
`;

const LangCycle = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding-left: 6px;
  border-left: 1px solid var(--border);

  @media (max-width: 820px) {
    display: none;
  }

  a {
    padding: 5px 7px;
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    border-radius: var(--radius-pill);

    &.current {
      color: var(--cream);
    }

    &:hover,
    &:focus-visible {
      color: var(--cream);
    }
  }
`;

const Nav = ({ isHome }) => {
  const { languages, language, originalPath } = useI18next();
  const [visible, setVisible] = useState(!isHome);
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      return;
    }

    const onScroll = () => {
      const heroEl = document.getElementById('hero');
      const threshold = heroEl ? heroEl.offsetHeight * 0.8 : window.innerHeight * 0.8;
      setVisible(window.scrollY >= threshold);

      const scrollMarker = window.scrollY + window.innerHeight * 0.35;
      let current = SECTION_TARGETS[0].id;
      for (const item of SECTION_TARGETS) {
        const target = document.getElementById(item.id);
        if (target && target.offsetTop <= scrollMarker) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    if (window.scrollY > 0) {
      onScroll();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isHome]);

  return (
    <PillWrapper visible={visible} aria-hidden={!visible}>
      <PillNav aria-label="Primary navigation">
        <NavItems>
          {SECTION_TARGETS.map(item => (
            <Link
              key={item.id}
              to={item.url}
              className={isHome && activeId === item.id ? 'active' : ''}
              onClick={() => setActiveId(item.id)}>
              {item.label}
            </Link>
          ))}
        </NavItems>

        <Menu />

        <CtaButton href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
          Hire Me
        </CtaButton>

        <LangCycle aria-label="Language switcher">
          {languages.map(lng => (
            <Link
              key={lng}
              to={originalPath}
              language={lng}
              className={language === lng ? 'current' : ''}>
              {lng.toUpperCase()}
            </Link>
          ))}
        </LangCycle>
      </PillNav>
    </PillWrapper>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
