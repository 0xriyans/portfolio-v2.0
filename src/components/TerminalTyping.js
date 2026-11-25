import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const StyledTerminal = styled.div`
  font-family: var(--font-mono);
  font-size: clamp(12px, 3.6vw, var(--fz-md));
  color: var(--light-slate);
  text-align: center;
  max-width: 600px;
  margin: 22px auto 0;
  padding: 10px 12px;
  line-height: 1.6;
  min-height: 76px;

  .line {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 26px;
    white-space: nowrap;
    margin-bottom: 4px;
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

const TerminalTyping = ({ active = true, delayMs = 100 }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showLoc, setShowLoc] = useState(true);
  const cmdSpanRef = useRef(null);

  useEffect(() => {
    const span = cmdSpanRef.current;
    if (prefersReducedMotion) {
      if (span) {
        span.textContent = CMD_TEXT;
      }
      setShowLoc(true);
      return;
    }

    if (!active || !span) {
      return;
    }

    let typeInterval;
    // Update DOM textContent directly per tick so hero typing creates 0 React re-renders
    span.textContent = '\u00A0';
    setShowLoc(false);

    const startTimeout = setTimeout(() => {
      let i = 0;
      typeInterval = setInterval(() => {
        i++;
        if (cmdSpanRef.current) {
          cmdSpanRef.current.textContent = CMD_TEXT.substring(0, i);
        }
        if (i >= CMD_TEXT.length) {
          clearInterval(typeInterval);
          setShowLoc(true);
        }
      }, 30);
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
        <span className="prompt">&gt;</span>
        <span ref={cmdSpanRef}>{CMD_TEXT}</span>
        {!prefersReducedMotion && !showLoc && <span className="cursor" aria-hidden="true" />}
      </div>
      <div className="line">
        <span className="prompt">&gt;</span>
        <span>{showLoc ? LOC_TEXT : '\u00A0'}</span>
        {!prefersReducedMotion && showLoc && <span className="cursor" aria-hidden="true" />}
      </div>
    </StyledTerminal>
  );
};

TerminalTyping.propTypes = {
  active: PropTypes.bool,
  delayMs: PropTypes.number,
};

export default TerminalTyping;
