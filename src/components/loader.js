import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled, { keyframes } from 'styled-components';
import { IconLoader } from '@components/icons';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #050505;
  background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.05) 2px, rgba(0, 240, 255, 0.05) 4px);
  z-index: 99;

  .boot-text {
    margin-top: 20px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    line-height: 1.5;
    text-align: left;
    width: 300px;
    
    p {
      margin: 0;
      opacity: 0; /* Animated by anime.js */
    }

    .highlight {
      color: var(--pink);
      text-shadow: 0 0 8px rgba(184, 255, 0, 0.8);
      margin-top: 10px;
    }
    
    .cursor {
      display: inline-block;
      animation: ${blink} 1s step-end infinite;
    }
  }

  .progress-container {
    margin-top: 20px;
    width: 250px;
    height: 4px;
    background: rgba(0, 255, 102, 0.1);
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 10px rgba(0, 255, 102, 0.2);

    .progress-bar {
      height: 100%;
      width: 0%;
      background: var(--blue);
      box-shadow: 0 0 10px var(--blue);
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: '.boot-text p',
        delay: anime.stagger(150),
        duration: 300,
        opacity: [0, 1],
        translateX: [-10, 0],
        easing: 'easeOutExpo',
      })
      .add({
        targets: '.progress-bar',
        width: ['0%', '100%'],
        duration: 500,
        easing: 'easeInOutExpo',
      }, '+=100')
      .add({
        targets: '.loader',
        delay: 150,
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />
      <div className="boot-text">
        <p>{`> INITIALIZING_NEURAL_LINK... OK`}</p>
        <p>{`> BYPASSING_MAINFRAME_SECURITY... OK`}</p>
        <p className="highlight">{`> SYS.BOOT_SEQ // INITIATED `}<span className="cursor">_</span></p>
      </div>
      <div className="progress-container">
        <div className="progress-bar"></div>
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
