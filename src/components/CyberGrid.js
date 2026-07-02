import React from 'react';
import styled, { keyframes } from 'styled-components';

const gridMove = keyframes`
  0% { transform: rotateX(75deg) translateY(0); }
  100% { transform: rotateX(75deg) translateY(100px); }
`;

const CyberGridContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -5;
  background-color: #050505;
  overflow: hidden;
  perspective: 1000px;
`;

const HorizonFade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #050505 35%, transparent 60%, #050505 100%);
  z-index: 2;
  pointer-events: none;
`;



const CyberGridPlane = styled.div`
  position: absolute;
  bottom: -60%;
  left: -50%;
  width: 200%;
  height: 160%;
  transform-origin: top center;
  transform: rotateX(75deg) translateY(0);
  background-image: 
    linear-gradient(rgba(0, 255, 102, 0.3) 2px, transparent 2px),
    linear-gradient(90deg, rgba(0, 255, 102, 0.3) 2px, transparent 2px);
  background-size: 100px 100px;
  animation: ${gridMove} 3s linear infinite;
  will-change: transform;
  z-index: 0;
`;

const CyberGrid = () => {
  return (
    <CyberGridContainer>
      <HorizonFade />
      <CyberGridPlane />
    </CyberGridContainer>
  );
};

export default CyberGrid;
