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
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    background-color: var(--bg);
    color: var(--text-secondary);
    font-family: var(--font-sans);
    font-size: var(--fz-lg);
    line-height: 1.55;
  }
`;

export default GlobalStyle;
