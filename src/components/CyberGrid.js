import React from 'react';
import styled, { keyframes } from 'styled-components';

const gridMove = keyframes`
  0% { transform: rotateX(75deg) translateY(0); }
  100% { transform: rotateX(75deg) translateY(50px); }
`;

const CyberGridContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  overflow: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
  background-color: transparent;
`;

const HorizonFade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, var(--navy) 20%, transparent 60%, var(--navy) 100%);
  z-index: 2;
  pointer-events: none;
`;

const CyberSun = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: linear-gradient(to bottom, #ff007f 0%, #ffbb00 100%);
  border-radius: 50%;
  box-shadow: 0 0 60px rgba(255, 0, 127, 0.5), 0 0 120px rgba(255, 187, 0, 0.3);
  z-index: 1;
  opacity: 0.85;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(10, 25, 47, 0.5) 3px, rgba(10, 25, 47, 0.5) 6px);
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const CyberGridPlane = styled.div`
  position: absolute;
  top: 50%;
  left: -50%;
  width: 200%;
  height: 150vh;
  transform-origin: top center;
  transform: rotateX(75deg);
  background-image: 
    linear-gradient(rgba(0, 255, 102, 0.6) 2px, transparent 2px),
    linear-gradient(90deg, rgba(0, 255, 102, 0.6) 2px, transparent 2px);
  background-size: 50px 50px;
  animation: ${gridMove} 1s linear infinite;
  z-index: 3;
  
  mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 100%);
`;

const CyberGrid = () => {
  return (
    <CyberGridContainer>
      <HorizonFade />
      <CyberSun />
      <CyberGridPlane />
    </CyberGridContainer>
  );
};

export default CyberGrid;
