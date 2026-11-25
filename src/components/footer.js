import React from 'react';
import styled from 'styled-components';
import { email } from '@config';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 28px 20px 36px;
  text-align: center;
  border-top: 1px solid var(--border);
`;

const FooterLine = styled.p`
  margin: 0;
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: var(--fz-sm);
  line-height: 1.5;

  a {
    color: var(--cream);
    font-weight: 500;
    transition: opacity 180ms ease;

    &:hover,
    &:focus-visible {
      opacity: 0.8;
    }
  }
`;

const Footer = () => (
  <StyledFooter>
    <FooterLine>
      © {new Date().getFullYear()} Riyan Sugiarto · Jakarta, Indonesia ·{' '}
      <a href={`mailto:${email}`}>{email}</a>
    </FooterLine>
  </StyledFooter>
);

export default Footer;
