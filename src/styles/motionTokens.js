/**
 * Single Source of Truth for Motion Tokens (Section 3).
 * All durations are in milliseconds unless noted with a unit suffix.
 */
export const MOTION = {
  duration: {
    micro: 180,
    pill: 250,
    scrollSpy: 200,
    entrance: 600,
    hero: 1000,
    counter: 1400,
    fan: 700,
    heatmap: 800,
    annotation: 750,
    diagram: 1800,
    boot: 1180,
    rotatorStep: 250,
    rotatorInterval: 3800,
  },
  stagger: {
    default: 100,
    projects: 120,
    letter: 32,
    fan: 60,
    boot: 120,
  },
  easing: {
    css: 'cubic-bezier(0.22, 1, 0.36, 1)',
    gsap: 'power3.out',
  },
  rise: {
    default: 14,
    projects: 16,
    timeline: 12,
    hover: 4,
    fanHover: 10,
  },
  blur: {
    start: 10,
  },
  trigger: {
    viewport: 0.2,
  },
  marquee: {
    speedPrimary: '36s',
    speedSecondary: '42s',
  },
};

export default MOTION;
