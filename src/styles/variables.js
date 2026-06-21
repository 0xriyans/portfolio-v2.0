import { css } from 'styled-components';

const variables = css`
  :root,
  :root[data-theme='light'] {
    /* Light Theme (Peach/Pink) */
    --dark-navy: #ffeaf1;
    --navy: #fff0f5;
    --light-navy: #ffffff;
    --lightest-navy: #ffffff;
    --navy-shadow: rgba(255, 77, 109, 0.2);
    --dark-slate: #8892b0;
    --slate: #4f5a7a;
    --light-slate: #1a1f36;
    --lightest-slate: #0a0e17;
    --white: #1a1f36;
    --yellow: #9d4edd;
    --yellow-tint: rgba(157, 78, 221, 0.2);
    --pink: #ff4d6d;
    --blue: #00f2fe;

    /* Background blob colors (Bright & Glossy) */
    --blob1-start: #d8b4fe;
    --blob1-end: #9333ea;
    --blob2-start: #67e8f9;
    --blob2-end: #0284c7;
    --blob3-start: #fbcfe8;
    --blob3-end: #f43f5e;
    --blob4-start: #fef08a;
    --blob4-end: #f97316;
    --blob5-start: #6ee7b7;
    --blob5-end: #059669;
    --blob6-start: #c4b5fd;
    --blob6-end: #4f46e5;
  }

  :root[data-theme='dark'] {
    /* Dark Theme (Deep Space Black) */
    --dark-navy: #020c1b;
    --navy: #050b14;
    --light-navy: #112240;
    --lightest-navy: #233554;
    --navy-shadow: rgba(2, 12, 27, 0.7);
    --dark-slate: #495670;
    --slate: #8892b0;
    --light-slate: #a8b2d1;
    --lightest-slate: #ccd6f6;
    --white: #e6f1ff;
    --yellow: #9d4edd; /* Cyberpunk Purple */
    --yellow-tint: rgba(157, 78, 221, 0.1);
    --pink: #ff4d6d;
    --blue: #00f2fe;

    /* Dark mode background blob colors (Deep & Neon) */
    --blob1-start: #581c87;
    --blob1-end: #3b0764;
    --blob2-start: #0369a1;
    --blob2-end: #082f49;
    --blob3-start: #be123c;
    --blob3-end: #881337;
    --blob4-start: #c2410c;
    --blob4-end: #7c2d12;
    --blob5-start: #047857;
    --blob5-end: #064e3b;
    --blob6-start: #4338ca;
    --blob6-end: #312e81;
  }

  :root {
    --font-sans: 'Outfit', 'Plus Jakarta Sans', -apple-system, system-ui, sans-serif;
    --font-mono: 'Space Grotesk', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
