import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleBar = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

const fadeOutOverlay = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    pointer-events: none;
  }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: #050505;
  z-index: 99;
  cursor: pointer;
  animation: ${fadeOutOverlay} 220ms cubic-bezier(0.22, 1, 0.36, 1) 960ms forwards;

  html.skip-boot & {
    display: none !important;
  }

  .boot-text {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    line-height: 1.6;
    text-align: left;
    width: min(340px, 88vw);

    p {
      margin: 0 0 6px;
      opacity: 0;
      animation: ${fadeSlideIn} 180ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }

    p:nth-child(1) {
      animation-delay: 0ms;
    }
    p:nth-child(2) {
      animation-delay: 120ms;
    }
    p:nth-child(3) {
      animation-delay: 240ms;
    }

    .ok {
      color: var(--green);
      font-weight: 600;
    }

    .highlight {
      color: var(--green);
      margin-top: 6px;
    }

    .cursor {
      display: inline-block;
      width: 9px;
      height: 1em;
      background-color: var(--green);
      vertical-align: text-bottom;
      margin-left: 4px;
      animation: ${blink} 1s step-end infinite;
    }
  }

  .progress-container {
    margin-top: 18px;
    width: min(340px, 88vw);
    height: 3px;
    background: rgba(0, 255, 102, 0.14);
    overflow: hidden;
    position: relative;

    .progress-bar {
      width: 100%;
      height: 100%;
      background: var(--green);
      transform-origin: left center;
      transform: scaleX(0);
      animation: ${scaleBar} 900ms cubic-bezier(0.22, 1, 0.36, 1) 60ms forwards;
    }
  }

  .skip-hint {
    margin-top: 16px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--slate);
    letter-spacing: 0.1em;
    opacity: 0.75;
  }
`;

const Loader = ({ finishLoading }) => {
  const finishedRef = useRef(false);

  const handleFinish = useCallback(() => {
    if (finishedRef.current) {
      return;
    }
    finishedRef.current = true;
    try {
      window.localStorage.setItem('riyan_boot_seen', '1');
      document.documentElement.classList.add('skip-boot');
    } catch (e) {
      // ignore storage errors
    }
    finishLoading();
  }, [finishLoading]);

  useEffect(() => {
    const timer = setTimeout(handleFinish, 1180);

    const onKeyDown = e => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        handleFinish();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [handleFinish]);

  return (
    <StyledLoader
      className="loader"
      role="status"
      aria-label="System boot sequence. Click, tap, or press Enter to skip."
      onClick={handleFinish}>
      <div className="boot-text">
        <p>
          <span className="ok">[OK]</span> RIYAN.SYS // CORE_LOADED
        </p>
        <p>
          <span className="ok">[OK]</span> BACKEND_RUNTIME // JAVA_KAFKA_READY
        </p>
        <p className="highlight">
          &gt; SYS.BOOT_SEQ // READY
          <span className="cursor" aria-hidden="true" />
        </p>
      </div>
      <div className="progress-container">
        <div className="progress-bar" />
      </div>
      <div className="skip-hint">[ CLICK / TAP / PRESS ENTER TO SKIP ]</div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
