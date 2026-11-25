import { createGlobalStyle } from 'styled-components';
import fonts from './fonts';
import variables from './variables';

const GlobalStyle = createGlobalStyle`
  ${fonts};
  ${variables};

  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
    overflow-x: hidden;

    @media (max-width: 768px) {
      scroll-behavior: auto;
    }
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: var(--cream);
    color: var(--on-cream);
  }

  :focus {
    outline: 2px solid var(--cream);
    outline-offset: 3px;
  }

  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0px;
  }

  :focus-visible {
    outline: 2px solid var(--cream);
    outline-offset: 3px;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--bg);
    color: var(--text-secondary);
    font-family: var(--font-sans);
    font-size: var(--fz-lg);
    line-height: 1.55;

    @media (max-width: 480px) {
      font-size: var(--fz-md);
    }

    &.blur #content > * {
      filter: blur(4px) brightness(0.75);
      transition: var(--transition);
      pointer-events: none;
      user-select: none;
    }
  }

  #root {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }

  main {
    margin: 0 auto;
    width: 100%;
    max-width: 1180px;
    min-height: 100vh;
    padding: 96px 32px;

    @media (max-width: 768px) {
      padding: 72px 20px;
    }

    &.fillHeight {
      padding: 0 32px;

      @media (max-width: 768px) {
        padding: 0 20px;
      }
    }
  }

  section {
    margin: 0 auto;
    padding: 88px 0;
    max-width: 1120px;

    @media (max-width: 768px) {
      padding: 64px 0;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 12px 0;
    font-weight: 600;
    font-family: var(--font-heading);
    color: var(--text-primary);
    line-height: 1.12;
    letter-spacing: -0.02em;
  }

  .section-kicker {
    display: block;
    margin: 0 0 8px;
    font-family: var(--font-sans);
    font-size: var(--fz-sm);
    font-weight: 500;
    letter-spacing: 0.04em;
    color: var(--text-muted);
  }

  .section-heading {
    margin: 0 0 14px;
    font-size: clamp(30px, 4.5vw, 44px);
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.025em;
    line-height: 1.1;
  }

  .section-intro {
    margin: 0;
    max-width: 640px;
    font-size: var(--fz-lg);
    color: var(--text-secondary);
    line-height: 1.55;
  }

  .big-heading {
    margin: 0;
    font-size: clamp(36px, 6vw, 60px);
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.03em;
  }

  img,
  svg,
  .gatsby-image-wrapper {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    vertical-align: middle;

    &.feather {
      fill: none;
    }
  }

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--cream);
    }
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
  }

  input,
  textarea {
    outline: 0;
  }

  p {
    margin: 0 0 16px 0;

    &:last-child,
    &:last-of-type {
      margin: 0;
    }
  }

  code {
    font-family: var(--font-mono);
    font-size: 0.88em;
    background-color: rgba(34, 57, 111, 0.55);
    color: var(--cream);
    border-radius: 6px;
    padding: 0.15em 0.45em;
  }

  .skip-to-content {
    color: var(--on-cream);
    background-color: var(--cream);
    border-radius: var(--radius-pill);
    font-size: var(--fz-xs);
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
    padding: 0.9rem 1.4rem;
    position: absolute;
    top: auto;
    left: -999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    z-index: -99;

    &:focus,
    &:active {
      top: 16px;
      left: 16px;
      width: auto;
      height: auto;
      overflow: auto;
      z-index: 99;
    }
  }

  .subtitle {
    color: var(--text-muted);
    margin: 12px 0 0;
    font-size: var(--fz-lg);
    font-weight: 400;
    line-height: 1.5;
  }

  .gatsby-image-outer-wrapper {
    height: 100%;
  }

  #query-on-demand-indicator-element,
  gatsby-qod,
  #gatsby-qod {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyle;
