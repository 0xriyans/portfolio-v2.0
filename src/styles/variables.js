import { css } from 'styled-components';

const variables = css`
  :root {
    /* Midnight Navy & Warm Cream Palette (Option A) */
    --bg: #010736;
    --surface: #0d1c42;
    --surface-elevated: #142758;
    --surface-2: #22396f;
    --border: rgba(34, 57, 111, 0.9);
    --border-soft: rgba(252, 241, 208, 0.14);
    --cream: #fcf1d0;
    --on-cream: #010736;
    --text-primary: #fcf1d0;
    --text-secondary: #d5dceb;
    --text-muted: #98a9cc;

    /* Compatibility tokens mapped cleanly to Option A (no neon/terminal colors) */
    --dark-navy: #010736;
    --navy: #010736;
    --light-navy: #0d1c42;
    --lightest-navy: #22396f;
    --navy-shadow: rgba(1, 7, 54, 0.65);
    --dark-slate: #6f82aa;
    --slate: #98a9cc;
    --light-slate: #d5dceb;
    --lightest-slate: #fcf1d0;
    --white: #fcf1d0;
    --green: #fcf1d0;
    --blue: #9cc2ff;
    --pink: #fcf1d0;
    --yellow: #fcf1d0;
    --yellow-tint: rgba(252, 241, 208, 0.14);

    /* Typography — Clean sans-serif throughout (max 2 font families) */
    --font-heading: 'Calibre', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-sans: 'Calibre', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-mono: 'SF Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 36px;

    --border-radius: 16px;
    --radius-card: 20px;
    --radius-sm: 12px;
    --radius-pill: 9999px;
    --nav-height: 80px;
    --nav-scroll-height: 68px;

    --easing: cubic-bezier(0.22, 1, 0.36, 1);
    --transition: all 180ms cubic-bezier(0.22, 1, 0.36, 1);
    --dur-micro: 180ms;
    --dur-entrance: 600ms;
  }
`;

export default variables;
