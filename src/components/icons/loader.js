import React from 'react';

const IconLoader = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <title>Loader Logo</title>

    <defs>
      <linearGradient id="liquid-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#9d4edd" />
        <stop offset="100%" stopColor="#00f2fe" />
      </linearGradient>

      <clipPath id="fill-clip">
        <rect id="liquid-rect" x="0" y="100" width="100" height="0" />
      </clipPath>
    </defs>

    {/* Outline drawn by anime.js */}
    <g>
      <path
        className="logo-outline"
        stroke="var(--yellow)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        d="M 50, 5 L 11, 27 L 11, 72 L 50, 95 L 89, 73 L 89, 28 z"
      />
    </g>

    {/* The filled version masked by the rising rectangle */}
    <g clipPath="url(#fill-clip)">
      <path
        fill="url(#liquid-gradient)"
        d="M 50, 5 L 11, 27 L 11, 72 L 50, 95 L 89, 73 L 89, 28 z"
      />
      <text x="31" y="73" fill="#ffffff" fontSize="60px" fontFamily="var(--font-sans)" fontWeight="700">
        R
      </text>
    </g>
  </svg>
);

export default IconLoader;
