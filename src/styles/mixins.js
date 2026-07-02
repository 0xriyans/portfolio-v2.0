import { css } from 'styled-components';

const button = css`
  color: var(--pink);
  background-color: rgba(184, 255, 0, 0.05);
  border: 1px solid var(--pink);
  border-radius: var(--border-radius);
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
  font-size: var(--fz-xs);
  font-family: var(--font-mono);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  padding: 1.25rem 1.75rem;

  &:hover,
  &:focus,
  &:active {
    background-color: rgba(184, 255, 0, 0.15);
    color: var(--pink);
    border-color: var(--pink);
    box-shadow: 0 0 10px var(--pink), inset 0 0 10px var(--pink);
    outline: none;
  }
  &:after {
    display: none !important;
  }
`;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);
    &:hover,
    &:active,
    &:focus {
      color: var(--yellow);
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    position: relative;
    transition: var(--transition);
    color: var(--blue);
    &:hover,
    &:focus,
    &:active {
      color: var(--blue);
      outline: 0;
      text-shadow: 0 0 8px var(--blue);
      &:after {
        width: 100%;
      }
      & > * {
        color: var(--blue) !important;
        transition: var(--transition);
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.37em;
      background-color: var(--blue);
      transition: var(--transition);
      opacity: 0.8;
      box-shadow: 0 0 5px var(--blue);
    }
  `,

  button,

  smallButton: css`
    color: var(--pink);
    background-color: rgba(184, 255, 0, 0.05);
    border: 1px solid var(--pink);
    border-radius: var(--border-radius);
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
    padding: 0.75rem 1rem;
    font-size: var(--fz-xs);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
      background-color: rgba(184, 255, 0, 0.15);
      color: var(--pink);
      border-color: var(--pink);
      box-shadow: 0 0 10px var(--pink), inset 0 0 10px var(--pink);
      outline: none;
    }
    &:after {
      display: none !important;
    }
  `,

  bigButton: css`
    color: var(--pink);
    background-color: rgba(184, 255, 0, 0.05);
    border: 1px solid var(--pink);
    border-radius: var(--border-radius);
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
    padding: 1.25rem 1.75rem;
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
      background-color: rgba(184, 255, 0, 0.15);
      color: var(--pink);
      border-color: var(--pink);
      box-shadow: 0 0 10px var(--pink), inset 0 0 10px var(--pink);
      outline: none;
    }
    &:after {
      display: none !important;
    }
  `,

  glassmorphism: css`
    background: #0d1117;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.7);
    position: relative;
    padding-top: 40px;
    
    &::before {
      content: '';
      position: absolute;
      top: 14px;
      left: 15px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #ff5f56;
      box-shadow: 20px 0 0 #ffbd2e, 40px 0 0 #27c93f;
      z-index: 2;
    }

    &::after {
      content: 'bash';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 40px;
      background: #161b22;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: var(--light-slate);
      font-size: 11px;
      font-family: var(--font-mono);
      line-height: 40px;
      text-align: center;
      letter-spacing: 1px;
      z-index: 1;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  `,

  boxShadow: css`
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
    transition: var(--transition);

    &:hover,
    &:focus {
      box-shadow: 0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.2);
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-lg);
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      &:before {
        content: '>';
        position: absolute;
        left: 0;
        color: var(--pink);
        font-family: var(--font-mono);
        text-shadow: 0 0 5px rgba(184, 255, 0, 0.8);
      }
    }
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
};

export default mixins;
