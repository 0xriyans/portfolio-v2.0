import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const StyledTerminal = styled.div`
  font-family: var(--font-mono);
  font-size: var(--fz-md);
  color: var(--light-slate);
  text-align: center;
  max-width: 600px;
  margin: 24px auto 0;
  padding: 12px 20px;
  line-height: 1.6;

  .line {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 4px;

    @media (max-width: 480px) {
      flex-wrap: wrap;
    }
  }

  .prompt {
    color: var(--pink);
    margin-right: 10px;
    font-weight: bold;
  }

  .cursor {
    display: inline-block;
    width: 10px;
    height: 1.1em;
    background-color: var(--green);
    vertical-align: middle;
    margin-left: 6px;
    animation: ${blink} 1s step-end infinite;
  }
`;

const FULL_TEXT = 'Jakarta, Indonesia';

const TerminalTyping = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [text, setText] = useState(FULL_TEXT);

  useEffect(() => {
    if (prefersReducedMotion) {
      setText(FULL_TEXT);
      return;
    }

    let i = 0;
    setText('');
    const typeInterval = setInterval(() => {
      i++;
      setText(FULL_TEXT.substring(0, i));
      if (i >= FULL_TEXT.length) {
        clearInterval(typeInterval);
      }
    }, 35);

    return () => clearInterval(typeInterval);
  }, [prefersReducedMotion]);

  return (
    <StyledTerminal>
      <div className="line">
        <span className="prompt">&gt;</span> sys.location --ping
      </div>
      <div className="line">
        <span className="prompt">&gt;</span>
        <span>{text || FULL_TEXT}</span>
        {!prefersReducedMotion && <span className="cursor" aria-hidden="true" />}
      </div>
    </StyledTerminal>
  );
};

export default TerminalTyping;
