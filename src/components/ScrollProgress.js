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
  background-color: var(--pink);
  width: ${props => props.scroll}%;
  transition: width 0.1s ease-out;
  box-shadow: 0 0 10px var(--pink);
  border-radius: 0 2px 2px 0;
`;

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (windowHeight === 0) {
      setScrollProgress(0);
      return;
    }
    
    const scroll = totalScroll / windowHeight;
    setScrollProgress(scroll * 100);
  };

  useEffect(() => {
    // Forcefully remove Gatsby's annoying QOD indicator permanently
    const removeQod = () => {
      const qod = document.getElementById('query-on-demand-indicator-element');
      if (qod) {
        qod.style.display = 'none';
        qod.remove();
      }
    };
    removeQod();
    const observer = new MutationObserver(removeQod);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
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
