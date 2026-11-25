import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledProgressContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: transparent;
  z-index: 9999;
  pointer-events: none;
`;

const StyledProgressBar = styled.div`
  height: 100%;
  width: 100%;
  background-color: var(--pink);
  transform-origin: left center;
  transform: scaleX(${props => props.scroll / 100});
  transition: transform 0.1s ease-out;
  box-shadow: 0 0 10px var(--pink);
`;

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (windowHeight === 0) {
      setScrollProgress(0);
      return;
    }

    const scroll = totalScroll / windowHeight;
    setScrollProgress(scroll * 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <StyledProgressContainer>
      <StyledProgressBar scroll={scrollProgress} />
    </StyledProgressContainer>
  );
};

export default ScrollProgress;
