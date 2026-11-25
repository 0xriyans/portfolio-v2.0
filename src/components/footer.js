import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  min-height: 64px;
  padding: 20px 15px 30px;
  text-align: center;
  border-top: 1px solid rgba(0, 255, 102, 0.12);
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 260px;
    margin: 0 auto 12px;
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 8px;
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`;

const FooterLine = styled.p`
  margin: 0;
  color: var(--slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  letter-spacing: 0.06em;

  a {
    color: var(--green);
    transition: color 180ms ease;

    &:hover,
    &:focus-visible {
      color: var(--white);
      text-shadow: none;
    }
  }
`;

const Footer = () => (
  <StyledFooter>
    <StyledSocialLinks>
      <ul>
        {socialMedia &&
          socialMedia.map(({ name, url }, i) => (
            <li key={i}>
              <a href={url} aria-label={name} target="_blank" rel="noreferrer">
                <Icon name={name} />
              </a>
            </li>
          ))}
      </ul>
    </StyledSocialLinks>

    <FooterLine>
      RIYAN.SYS // BUILT BY{' '}
      <a href="https://github.com/0xriyans" target="_blank" rel="noreferrer">
        RIYAN SUGIARTO
      </a>{' '}
      · JAKARTA, INDONESIA
    </FooterLine>
  </StyledFooter>
);

export default Footer;
