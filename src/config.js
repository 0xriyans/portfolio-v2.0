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
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Work',
      url: '/#projects',
    },
    {
      name: 'Contact',
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
    distance: '50px',
    duration: 800,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: false,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
