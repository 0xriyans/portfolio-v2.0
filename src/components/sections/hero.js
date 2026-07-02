import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled, { keyframes } from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const blinkCaret = keyframes`
  from, to { opacity: 1; }
  50% { opacity: 0; }
`;

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  padding: 100px 0 50px; // Added padding top to prevent overlap with navbar and bottom for safety
  position: relative;
  z-index: 1;

  &::before, &::after {
    content: '+';
    position: absolute;
    color: var(--blue);
    font-size: 24px;
    font-family: var(--font-mono);
    opacity: 0.5;
  }
  &::before { top: 20%; left: 5%; }
  &::after { bottom: 20%; right: 5%; }

  .sys-label {
    margin: 0 0 20px 4px;
    color: var(--pink);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 2vw, var(--fz-md));
    font-weight: 600;
    letter-spacing: 0.2em;
    animation: ${blinkCaret} 2s steps(2, start) infinite;

    &::before {
      content: '[ ';
      color: var(--blue);
    }
    &::after {
      content: ' ]';
      color: var(--blue);
    }
  }

  .huge-name {
    margin: 0;
    font-size: clamp(40px, 8vw, 70px); // Reduced max size from 80px to 70px
    font-family: var(--font-heading);
    font-weight: 900;
    line-height: 1.1; // Better line height for the stroke
    color: transparent;
    -webkit-text-stroke: 2px var(--blue);
    text-shadow: 0 0 20px rgba(0, 255, 102, 0.2);
    text-transform: uppercase;
    position: relative;
    letter-spacing: 0.02em;
    animation: textGlitch 4s infinite alternate;

    &:hover {
      color: var(--blue);
      text-shadow: 0 0 30px rgba(0, 255, 102, 0.8);
      -webkit-text-stroke: 0;
      animation: none;
      transition: all 0.2s ease;
    }
    
    @media (max-width: 768px) {
      -webkit-text-stroke: 1px var(--blue);
    }
  }

  @keyframes textGlitch {
    0%, 6%, 100% {
      transform: translate(0);
      text-shadow: 0 0 20px rgba(0, 255, 102, 0.2);
    }
    2% {
      transform: translate(-4px, 2px);
      text-shadow: 3px 0 var(--pink), -3px 0 var(--blue);
    }
    4% {
      transform: translate(4px, -2px);
      text-shadow: -3px 0 var(--pink), 3px 0 var(--blue);
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--white);
    font-size: clamp(14px, 2.5vw, 20px); // Slightly smaller subtitle
    font-family: var(--font-mono);
    font-weight: 600;
    text-shadow: 0 0 10px rgba(0, 255, 102, 0.5);
    letter-spacing: 0.05em;

    span {
      color: var(--pink);
      text-shadow: 0 0 10px rgba(184, 255, 0, 0.5);
    }
  }

  p {
    margin: 30px auto 0;
    max-width: 600px;
    font-size: var(--fz-md);
    line-height: 1.6;
    color: var(--light-slate); 
    font-family: var(--font-mono);
    position: relative;
    padding: 20px 30px;
    background: transparent;
    backdrop-filter: none;
    border: none;
    box-shadow: none;

    @media (max-width: 480px) {
      font-size: var(--fz-md);
      padding: 15px 20px;
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 40px; // Reduced margin from 50px
    color: var(--navy);
    background-color: var(--blue);
    border: none;
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 800;
    letter-spacing: 0.1em;
    border-radius: 0;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%);
    position: relative;
    overflow: hidden;
    padding: 15px 30px;
    box-shadow: 0 0 20px rgba(0, 255, 102, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.5);
    transition: var(--transition);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
      transition: all 0.4s ease;
    }
    
    &:hover,
    &:focus {
      background-color: var(--pink);
      color: var(--white);
      box-shadow: 0 0 30px rgba(184, 255, 0, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.6);
      transform: translateY(-3px);

      &::before {
        left: 100%;
      }
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useTranslation();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <div className="sys-label">SYS.BOOT_SEQ // OVERRIDE_ACTIVE</div>;
  const two = <h1 className="huge-name">RIYAN<br/>SUGIARTO</h1>;
  const three = (
    <h3 className="medium-heading">
      {t('SOFTWARE ENGINEER')}
    </h3>
  );
  const four = (
    <p>
      {t('hero_desc')}
    </p>
  );
  const five = (
    <a className="email-link" href="mailto:ryansgrt23@gmail.com" target="_blank" rel="noreferrer">
      [ EXPLORE ARCHITECTURE ]
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      <div 
        style={{ 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {prefersReducedMotion ? (
          <>
            {items.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              items.map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${i + 1}00ms`, transform: 'translateZ(30px)' }}>{item}</div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
