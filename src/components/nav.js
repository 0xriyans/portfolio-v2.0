import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navLinks, email } from '@config';
import { usePrefersReducedMotion } from '@hooks';
import { Menu } from '@components';
import { MOTION } from '@styles/motionTokens';

const SECTION_TARGETS = [
  { id: 'about', label: 'Station', url: '/#about' },
  { id: 'stack', label: 'Stack', url: '/#stack' },
  { id: 'projects', label: 'Projects', url: '/#projects' },
  { id: 'contact', label: 'Terminal', url: '/#contact' },
];

const PillWrapper = styled.header`
  position: fixed;
  top: 16px;
  left: 50%;
  z-index: 50;
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translate3d(-50%, ${({ visible }) => (visible ? '0px' : '-20px')}, 0);
  transition: ${({ reduced }) =>
    reduced
      ? 'none'
      : `opacity ${MOTION.duration.pill}ms ${MOTION.easing.css}, transform ${MOTION.duration.pill}ms ${MOTION.easing.css}`};
  max-width: calc(100vw - 24px);
`;

const PillNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px 6px 14px;
  background: rgba(5, 5, 5, 0.84);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 255, 102, 0.35);
  border-radius: 9999px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.65), 0 0 18px rgba(0, 255, 102, 0.12);
  font-family: var(--font-mono);

  @media (max-width: 768px) {
    padding: 6px 8px;
    gap: 8px;
  }
`;

const NavItems = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 768px) {
    display: none;
  }

  a {
    position: relative;
    padding: 8px 14px 12px;
    font-size: 12px;
    letter-spacing: 0.06em;
    color: var(--light-slate);
    text-decoration: none;
    white-space: nowrap;
    transition: color ${MOTION.duration.micro}ms ${MOTION.easing.css};

    &.active {
      color: var(--green);
    }

    &:hover,
    &:focus-visible {
      color: var(--white);
      text-shadow: none;
    }
  }
`;

const ScrollSpyDot = styled.span`
  position: absolute;
  bottom: 4px;
  left: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--green);
  box-shadow: 0 0 8px var(--green);
  pointer-events: none;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transform: translate3d(${({ x }) => `${x - 2.5}px`}, 0, 0);
  transition: ${({ reduced }) =>
    reduced
      ? 'none'
      : `transform ${MOTION.duration.scrollSpy}ms ${MOTION.easing.css}, opacity ${MOTION.duration.micro}ms ease`};
`;

const HireButton = styled.a`
  padding: 8px 15px;
  font-size: 12px;
  font-family: var(--font-mono);
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #050505;
  background-color: var(--green);
  border: 1px solid var(--green);
  border-radius: 9999px;
  text-decoration: none;
  white-space: nowrap;
  transition: transform ${MOTION.duration.micro}ms ${MOTION.easing.css},
    background-color ${MOTION.duration.micro}ms ease, color ${MOTION.duration.micro}ms ease;

  &:hover,
  &:focus-visible {
    background-color: transparent;
    color: var(--green);
    text-shadow: none;
    transform: translateY(-1px);
  }
`;

const LangCycle = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding-left: 4px;
  border-left: 1px solid rgba(0, 255, 102, 0.2);

  @media (max-width: 768px) {
    display: none;
  }

  a {
    padding: 5px 6px;
    font-size: 10px;
    font-family: var(--font-mono);
    color: var(--slate);
    text-transform: uppercase;
    border-radius: 9999px;
    transition: color ${MOTION.duration.micro}ms ease;

    &.current {
      color: var(--green);
      font-weight: 700;
    }

    &:hover {
      color: var(--white);
      text-shadow: none;
    }
  }
`;

const Nav = ({ isHome }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { languages, language, originalPath } = useI18next();
  const [visible, setVisible] = useState(!isHome);
  const [activeId, setActiveId] = useState('about');
  const [dotX, setDotX] = useState(0);
  const [dotReady, setDotReady] = useState(false);

  const itemsRef = useRef({});
  const navGroupRef = useRef(null);

  const updateDotPosition = useCallback(targetId => {
    const el = itemsRef.current[targetId];
    if (el) {
      setDotX(el.offsetLeft + el.offsetWidth / 2);
      setDotReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      return;
    }

    const checkVisibility = () => {
      const heroEl = document.getElementById('hero');
      const threshold = heroEl ? heroEl.offsetHeight * 0.8 : window.innerHeight * 0.8;
      setVisible(window.scrollY >= threshold);
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [isHome]);

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const targets = SECTION_TARGETS.map(s => document.getElementById(s.id)).filter(Boolean);
    if (targets.length === 0 || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const handleScrollSpy = () => {
      const scrollMarker = window.scrollY + window.innerHeight * 0.35;
      let current = targets[0].id;
      for (const el of targets) {
        if (el.offsetTop <= scrollMarker) {
          current = el.id;
        }
      }
      setActiveId(current);
    };

    handleScrollSpy();
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [isHome]);

  useEffect(() => {
    updateDotPosition(activeId);
    const onResize = () => updateDotPosition(activeId);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeId, visible, updateDotPosition]);

  const items = navLinks && navLinks.length === 4 ? SECTION_TARGETS : SECTION_TARGETS;

  return (
    <PillWrapper visible={visible} reduced={prefersReducedMotion} aria-hidden={!visible}>
      <PillNav aria-label="Primary navigation">
        <NavItems ref={navGroupRef}>
          {items.map(item => (
            <Link
              key={item.id}
              to={item.url}
              className={isHome && activeId === item.id ? 'active' : ''}
              ref={el => {
                itemsRef.current[item.id] = el;
              }}
              tabIndex={visible ? 0 : -1}
              onClick={() => setActiveId(item.id)}>
              {item.label}
            </Link>
          ))}
          {isHome && <ScrollSpyDot x={dotX} active={dotReady} reduced={prefersReducedMotion} />}
        </NavItems>

        <Menu tabIndex={visible ? 0 : -1} />

        <HireButton
          href={`mailto:${email}`}
          tabIndex={visible ? 0 : -1}
          target="_blank"
          rel="noopener noreferrer">
          HIRE_ME [ON]
        </HireButton>

        <LangCycle aria-label="Language switcher">
          {languages.map(lng => (
            <Link
              key={lng}
              to={originalPath}
              language={lng}
              tabIndex={visible ? 0 : -1}
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
