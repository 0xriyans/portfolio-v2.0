import { css } from 'styled-components';

const button = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--on-cream);
  background-color: var(--cream);
  border: 1px solid var(--cream);
  border-radius: var(--radius-pill);
  font-size: var(--fz-sm);
  font-family: var(--font-sans);
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  padding: 14px 24px;

  &:hover,
  &:focus-visible {
    background-color: #f3e4b5;
    border-color: #f3e4b5;
    color: var(--on-cream);
    transform: translateY(-2px);
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
    color: inherit;
    transition: var(--transition);
    &:hover,
    &:focus-visible {
      color: var(--cream);
    }
  `,

  inlineLink: css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    color: var(--cream);
    font-weight: 500;
    border-bottom: 1px solid rgba(252, 241, 208, 0.35);
    padding-bottom: 2px;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      border-bottom-color: var(--cream);
    }
  `,

  button,

  smallButton: css`
    ${button};
    padding: 10px 18px;
    font-size: var(--fz-xs);
  `,

  bigButton: css`
    ${button};
    padding: 15px 28px;
    font-size: var(--fz-md);
  `,

  editorialCard: css`
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    box-shadow: 0 12px 32px rgba(1, 7, 54, 0.35);
  `,

  glassmorphism: css`
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    box-shadow: 0 12px 32px rgba(1, 7, 54, 0.35);
  `,

  boxShadow: css`
    box-shadow: 0 12px 30px rgba(1, 7, 54, 0.4);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      box-shadow: 0 18px 36px rgba(1, 7, 54, 0.55);
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-md);
    li {
      position: relative;
      padding-left: 20px;
      margin-bottom: 10px;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.62em;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: var(--cream);
        opacity: 0.8;
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
