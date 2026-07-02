import { css } from 'styled-components';

const variables = css`
  :root {
    /* Cyberpunk Theme (High Tech, Low Life) */
    --dark-navy: #050505;
    --navy: #050505;
    --light-navy: #0a0a0a;
    --lightest-navy: #141414;
    --navy-shadow: rgba(5, 5, 5, 0.7);
    --dark-slate: #6b7280;
    --slate: #9ca3af;
    --light-slate: #d1d5db;
    --lightest-slate: #f3f4f6;
    --white: #ffffff;
    
    /* Neon Accents */
    --yellow: #fdee00; /* Cyber Yellow */
    --yellow-tint: rgba(253, 238, 0, 0.1);
    --pink: #b8ff00; /* Neon Lime / Secondary Green */
    --blue: #00ff66; /* Matrix Green (Primary) */
    --purple: #bc13fe; /* Neon Purple */
    --green: #00ff66; /* Matrix Green */

    /* Background blob colors (Neon & Gritty) */
    --blob1-start: var(--green);
    --blob1-end: #008033; /* Dark Green */
    --blob2-start: var(--pink); /* Lime */
    --blob2-end: #5c8000; /* Dark Lime */
    --blob3-start: var(--green);
    --blob3-end: #004d1f; /* Darker Green */
    --blob4-start: var(--pink);
    --blob4-end: #7a9900;
    --blob5-start: var(--green);
    --blob5-end: #00993d;
    --blob6-start: #00e65c;
    --blob6-end: #004d1f;

    /* Fonts */
    --font-heading: 'Orbitron', 'M PLUS 1 Code', sans-serif;
    --font-sans: 'Rajdhani', 'JetBrains Mono', 'M PLUS 1 Code', sans-serif;
    --font-mono: 'Share Tech Mono', 'Space Grotesk', 'Fira Code', 'Fira Mono', 'M PLUS 1 Code', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    /* Cyberpunk UI prefers hard angles and chamfers */
    --border-radius: 0px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.23, 1, 0.32, 1);
    --transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
