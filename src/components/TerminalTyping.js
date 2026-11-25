import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
  margin: 22px auto 0;
  padding: 10px 20px;
  line-height: 1.6;
  min-height: 68px;

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

const CMD_TEXT = 'sys.location --ping';
const LOC_TEXT = 'Jakarta, Indonesia';

const TerminalTyping = ({ active = true, delayMs = 240 }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [cmdTyped, setCmdTyped] = useState(CMD_TEXT);
  const [locTyped, setLocTyped] = useState(LOC_TEXT);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCmdTyped(CMD_TEXT);
      setLocTyped(LOC_TEXT);
      return;
    }

    if (!active) {
      return;
    }

    let typeInterval;
    // Type Jakarta, Indonesia character-by-character at 35ms/char (inside 1000ms hero budget)
    setCmdTyped(CMD_TEXT);
    setLocTyped('');

    const startTimeout = setTimeout(() => {
      let i = 0;
      typeInterval = setInterval(() => {
        i++;
        setLocTyped(LOC_TEXT.substring(0, i));
        if (i >= LOC_TEXT.length) {
          clearInterval(typeInterval);
        }
      }, 35);
    }, delayMs);

    return () => {
      clearTimeout(startTimeout);
      if (typeInterval) {
        clearInterval(typeInterval);
      }
    };
  }, [active, delayMs, prefersReducedMotion]);

  return (
    <StyledTerminal>
      <div className="line">
        <span className="prompt">&gt;</span> {cmdTyped}
      </div>
      <div className="line">
        <span className="prompt">&gt;</span>
        <span>{locTyped || '\u00A0'}</span>
        {!prefersReducedMotion && <span className="cursor" aria-hidden="true" />}
      </div>
    </StyledTerminal>
  );
};

TerminalTyping.propTypes = {
  active: PropTypes.bool,
  delayMs: PropTypes.number,
};

export default TerminalTyping;
