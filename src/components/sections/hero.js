import React, { useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled, { keyframes } from 'styled-components';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '@hooks';
import { useBootStatus } from '@utils/bootContext';
import { MOTION } from '@styles/motionTokens';
import TerminalTyping from '../TerminalTyping';

const blurToSharp = keyframes`
  from {
    filter: blur(${MOTION.blur.start}px);
  }
  to {
    filter: blur(0px);
  }
`;

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  position: relative;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  padding: 80px 0 50px;
  z-index: 1;

  &::before,
  &::after {
    content: '+';
    position: absolute;
    color: var(--green);
    font-size: 24px;
    font-family: var(--font-mono);
    opacity: 0.4;
  }
  &::before {
    top: 18%;
    left: 5%;
  }
  &::after {
    bottom: 18%;
    right: 5%;
  }

  .hero-stack {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &.hero-play .huge-name {
    animation: ${blurToSharp} 420ms ${MOTION.easing.css} both;
  }

  .sys-label {
    margin: 0 0 20px 4px;
    color: var(--pink);
    font-family: var(--font-mono);
    font-size: clamp(11px, 2vw, var(--fz-md));
    font-weight: 600;
    letter-spacing: 0.16em;

    @media (max-width: 480px) {
      letter-spacing: 0.08em;
      font-size: 11px;
    }

    &::before {
      content: '[ ';
      color: var(--green);
    }
    &::after {
      content: ' ]';
      color: var(--green);
    }
  }

  .huge-name {
    margin: 0;
    font-size: clamp(36px, 7.5vw, 68px);
    font-family: var(--font-mono);
    font-weight: 700;
    line-height: 1.1;
    color: var(--white);
    text-shadow: 0 0 18px rgba(0, 255, 102, 0.25);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .name-line {
    display: block;
  }

  .hero-char {
    display: inline-block;
  }

  h2.role-heading {
    margin: 16px 0 0;
    color: var(--green);
    font-size: clamp(16px, 2.5vw, 22px);
    font-family: var(--font-mono);
    font-weight: 600;
    letter-spacing: 0.06em;
  }

  .hero-summary {
    margin: 16px auto 0;
    max-width: 620px;
    font-size: var(--fz-md);
    line-height: 1.6;
    color: var(--light-slate);
    font-family: var(--font-sans);
  }

  .explore-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 30px;
    color: var(--navy);
    background-color: var(--green);
    border: 1px solid var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    font-weight: 700;
    letter-spacing: 0.1em;
    border-radius: 0;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%);
    padding: 15px 30px;
    box-shadow: 0 0 18px rgba(0, 255, 102, 0.35);
    transition: transform ${MOTION.duration.micro}ms ${MOTION.easing.css},
      background-color ${MOTION.duration.micro}ms ease, color ${MOTION.duration.micro}ms ease;

    &:hover,
    &:focus {
      background-color: transparent;
      color: var(--green);
      transform: translateY(-3px);
    }
  }
`;

const splitChars = text =>
  text.split('').map((ch, idx) => (
    <span key={idx} className="hero-char" aria-hidden="true">
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ));

const Hero = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { bootDone } = useBootStatus();
  const containerRef = useRef(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion || !bootDone || hasPlayedRef.current) {
      return;
    }

    hasPlayedRef.current = true;
    const node = containerRef.current;
    if (node) {
      node.classList.add('hero-play');
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: MOTION.easing.gsap } });

      // Animate transform & opacity in GSAP (< 900ms total); blur runs cleanly via CSS keyframes
      tl.fromTo(
        '.hero-label',
        { opacity: 0.1, y: MOTION.rise.default },
        { opacity: 1, y: 0, duration: 0.36 },
        0,
      )
        .fromTo(
          '.hero-char',
          { opacity: 0.2, y: MOTION.rise.default },
          {
            opacity: 1,
            y: 0,
            duration: 0.32,
            stagger: MOTION.stagger.letter / 1000,
          },
          0.04,
        )
        .fromTo(
          '.hero-role',
          { opacity: 0.2, y: MOTION.rise.default },
          { opacity: 1, y: 0, duration: 0.36 },
          0.14,
        )
        .fromTo(
          '.hero-terminal',
          { opacity: 0.2, y: MOTION.rise.default },
          { opacity: 1, y: 0, duration: 0.3 },
          0.18,
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0.2, y: MOTION.rise.default },
          { opacity: 1, y: 0, duration: 0.34 },
          0.28,
        );
    }, containerRef);

    return () => ctx.revert();
  }, [bootDone, prefersReducedMotion]);

  return (
    <StyledHeroSection id="hero" ref={containerRef}>
      <div className="hero-stack">
        <div className="sys-label hero-label">SYS.BOOT_SEQ // OVERRIDE_ACTIVE</div>
        <h1 className="huge-name" aria-label="RIYAN SUGIARTO">
          <span className="name-line">{splitChars('RIYAN')}</span>
          <span className="name-line">{splitChars('SUGIARTO')}</span>
        </h1>
        <h2 className="role-heading hero-role">Backend Software Engineer</h2>
        <p className="hero-summary">{t('hero_desc')}</p>
        <div className="hero-terminal">
          <TerminalTyping active={bootDone} delayMs={100} />
        </div>
        <Link className="explore-link hero-cta" to="/#architecture">
          [ EXPLORE ARCHITECTURE ]
        </Link>
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
