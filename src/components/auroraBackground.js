import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const auroraAnim = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AuroraContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -3;
  background: linear-gradient(
    -45deg,
    #050b14,
    #0a192f,
    #112240,
    #0d131a,
    #1a0b2e
  );
  background-size: 400% 400%;
  animation: ${auroraAnim} 20s ease infinite;
`;

const AuroraOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(5,5,5,0.8) 100%);
  pointer-events: none;
`;

const MouseMagnet = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 40vw;
  height: 40vw;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(100, 255, 218, 0.15) 0%, rgba(100, 255, 218, 0) 60%);
  filter: blur(80px);
  pointer-events: none;
  z-index: 1;
  transform: translate(-50%, -50%);
  will-change: transform;
`;

const AuroraBackground = () => {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    const magnet = document.getElementById('aurora-magnet');
    if (!magnet) return;
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let magnetX = mouseX;
    let magnetY = mouseY;
    
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    let frameId;
    const animateMagnet = () => {
      magnetX += (mouseX - magnetX) * 0.04;
      magnetY += (mouseY - magnetY) * 0.04;
      if (magnet) {
        magnet.style.transform = `translate(calc(${magnetX}px - 50%), calc(${magnetY}px - 50%))`;
      }
      frameId = requestAnimationFrame(animateMagnet);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    frameId = requestAnimationFrame(animateMagnet);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <AuroraContainer>
      <AuroraOverlay />
      <MouseMagnet id="aurora-magnet" />
    </AuroraContainer>
  );
};

export default AuroraBackground;
