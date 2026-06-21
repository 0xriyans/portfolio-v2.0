import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled, { keyframes } from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const textLiquidAnim = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;
  position: relative;

  @media (max-width: 480px) {
    padding-top: 0;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--yellow);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 600;
    letter-spacing: 0.1em;
  }

  h2 {
    /* Liquid Font Effect for the Name */
    background: linear-gradient(
      -45deg,
      var(--light-slate), 
      var(--blue), 
      var(--yellow), 
      var(--light-slate)
    );
    background-size: 300% 300%;
    animation: ${textLiquidAnim} 8s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    @media (max-width: 768px) {
      animation: none;
      background-size: 100% 100%;
    }
  }

  h3 {
    margin-top: 10px;
    line-height: 1.1;
    /* Liquid Font Effect for the Subheading */
    background: linear-gradient(
      -45deg,
      var(--yellow), 
      var(--pink), 
      var(--blue), 
      var(--yellow)  
    );
    background-size: 300% 300%;
    animation: ${textLiquidAnim} 8s ease infinite reverse;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    @media (max-width: 768px) {
      animation: none;
      background-size: 100% 100%;
    }
  }

  h2.big-heading, h3.big-heading {
    @media (max-width: 480px) {
      font-size: clamp(32px, 10vw, 40px);
      line-height: 1.1;
    }
  }

  p {
    margin: 30px 0 0;
    max-width: 600px;
    font-size: var(--fz-xl);
    line-height: 1.6;
    color: var(--light-slate); 
    font-weight: 600;

    @media (max-width: 480px) {
      font-size: var(--fz-md);
      margin-top: 20px;
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;

    @media (max-width: 480px) {
      margin-top: 30px;
    }
    background: var(--yellow);
    color: #ffffff;
    border: none;
    border-radius: 30px; 
    box-shadow: 0 10px 30px -10px var(--yellow-tint);
    transition: var(--transition);
    font-weight: 600;
    padding: 1.25rem 2.25rem;

    &:hover,
    &:focus,
    &:active {
      background: var(--pink);
      color: #ffffff;
      box-shadow: 0 15px 40px -10px rgba(255, 77, 109, 0.4);
      transform: translateY(-3px);
    }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { t } = useTranslation();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>{t('Hi, my name is')}</h1>;
  const two = <h2 className="big-heading">Riyan Sugiarto.</h2>;
  const three = <h3 className="big-heading">{t('Building impactful solutions.')}</h3>;
  const four = (
    <>
      <p>
        {t(
          'I\'m a backend software engineer with over 5 years of experience building secure, high-traffic core systems in the telecom and insurance sectors. I specialize in system design and automating complex workflows through smart AI services like document scanning, face verification, and voice features.',
        )}
      </p>
    </>
  );
  const five = (
    <a className="email-link" href="mailto:ryansgrt23@gmail.com" target="_blank" rel="noreferrer">
      {t('Hire me as a freelancer')}
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
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
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
