import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';
import { IconLoader } from '@components/icons';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, var(--light-navy) 0%, var(--navy) 100%);
  z-index: 99;

  .logo-wrapper {
    width: 100px;
    opacity: 1;
    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      user-select: none;
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
        targets: '.logo-outline',
        delay: 300,
        duration: 1000,
        easing: 'easeInOutQuart',
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: '#liquid-rect',
        y: [100, 0],
        height: [0, 100],
        duration: 1200,
        easing: 'easeInOutCubic',
      })
      .add({
        targets: '#logo',
        scale: [1, 1.05, 1],
        duration: 500,
        easing: 'easeOutBack',
      }, '-=400')
      .add({
        targets: '.loader',
        delay: 300,
        duration: 400,
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
      <div className="logo-wrapper">
        <IconLoader />
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
