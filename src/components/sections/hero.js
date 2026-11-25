import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import TerminalTyping from '../TerminalTyping';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  position: relative;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  padding: 100px 0 50px;
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
    top: 20%;
    left: 5%;
  }
  &::after {
    bottom: 20%;
    right: 5%;
  }

  .sys-label {
    margin: 0 0 20px 4px;
    color: var(--pink);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 2vw, var(--fz-md));
    font-weight: 600;
    letter-spacing: 0.2em;

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
    font-size: clamp(38px, 7.5vw, 68px);
    font-family: var(--font-mono);
    font-weight: 700;
    line-height: 1.1;
    color: var(--white);
    text-shadow: 0 0 18px rgba(0, 255, 102, 0.25);
    text-transform: uppercase;
    letter-spacing: 0.04em;
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
    margin-top: 34px;
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
    transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1), background-color 180ms ease,
      color 180ms ease;

    &:hover,
    &:focus {
      background-color: transparent;
      color: var(--green);
      transform: translateY(-3px);
    }
  }
`;

const Hero = () => {
  const { t } = useTranslation();

  return (
    <StyledHeroSection id="hero">
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <div className="sys-label">SYS.BOOT_SEQ // OVERRIDE_ACTIVE</div>
        <h1 className="huge-name">
          RIYAN
          <br />
          SUGIARTO
        </h1>
        <h2 className="role-heading">Backend Software Engineer</h2>
        <p className="hero-summary">{t('hero_desc')}</p>
        <TerminalTyping />
        <Link className="explore-link" to="/#projects">
          [ EXPLORE ARCHITECTURE ]
        </Link>
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
