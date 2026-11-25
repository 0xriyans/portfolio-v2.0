import React from 'react';
import PropTypes from 'prop-types';
import {
  IconAppStore,
  IconBookmark,
  IconCodepen,
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconInstagram,
  IconLinkedin,
  IconLoader,
  IconLogo,
  IconPlayStore,
  IconStar,
  IconMedium,
} from '@components/icons';

const Icon = ({ name }) => {
  switch (name) {
    case 'AppStore':
      return <IconAppStore />;
    case 'Bookmark':
      return <IconBookmark />;
    case 'Codepen':
      return <IconCodepen />;
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'Fork':
      return <IconFork />;
    case 'GitHub':
      return <IconGitHub />;
    case 'Instagram':
      return <IconInstagram />;
    case 'Linkedin':
      return <IconLinkedin />;
    case 'Loader':
      return <IconLoader />;
    case 'Logo':
      return <IconLogo />;
    case 'PlayStore':
      return <IconPlayStore />;
    case 'Star':
      return <IconStar />;
    case 'Medium':
      return <IconMedium />;
    case 'Twitter':
    case 'X':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true">
          <path d="M4 4l16 16M20 4L4 20" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'Email':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'Fiverr':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 16V10a2 2 0 0 1 2-2H14M9 12h4.5" strokeLinecap="round" />
        </svg>
      );
    case 'Upwork':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true">
          <path
            d="M5 7v5a3.5 3.5 0 0 0 7 0V7m0 5c1.2 1.8 2.6 2.7 4 2.7a3 3 0 1 0 0-6 3 3 0 0 0-3 3v7.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return <IconExternal />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
