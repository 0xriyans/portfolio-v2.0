module.exports = {
  email: 'ryansgrt23@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/0xriyans',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/0xriyans',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/0xriyans',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/riyan-sugiarto/',
    },
    {
      name: 'Codepen',
      url: 'https://codepen.io/0xriyans',
    },
    {
      name: 'Medium',
      url: 'https://medium.com/@0xriyans',
    },
  ],

  navLinks: [
    {
      name: 'STATION',
      url: '/#about',
    },
    {
      name: 'STACK',
      url: '/#jobs',
    },
    {
      name: 'PROJECTS',
      url: '/#projects',
    },
    {
      name: 'TERMINAL',
      url: '/#contact',
    },
  ],

  colors: {
    yellow: '#F1D00A',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 800,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 0.95,
    easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
    mobile: false, // Completely disable on mobile for 100% reliability
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
