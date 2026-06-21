import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate1 = keyframes`
  0% { transform: translate(-50%, -50%) rotateX(60deg) rotateY(0deg) rotateZ(0deg); }
  100% { transform: translate(-50%, -50%) rotateX(60deg) rotateY(360deg) rotateZ(360deg); }
`;

const rotate2 = keyframes`
  0% { transform: translate(-50%, -50%) rotateX(40deg) rotateY(120deg) rotateZ(0deg); }
  100% { transform: translate(-50%, -50%) rotateX(40deg) rotateY(480deg) rotateZ(360deg); }
`;

const rotate3 = keyframes`
  0% { transform: translate(-50%, -50%) rotateX(80deg) rotateY(-60deg) rotateZ(0deg); }
  100% { transform: translate(-50%, -50%) rotateX(80deg) rotateY(300deg) rotateZ(-360deg); }
`;

const RingsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -3;
  overflow: hidden;
  background-color: #050505;
  perspective: 1000px;
`;

const Ring = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 
    inset 0 0 60px rgba(255, 255, 255, 0.02),
    0 0 30px rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transform-style: preserve-3d;
`;

const Ring1 = styled(Ring)`
  width: 80vw;
  height: 80vw;
  animation: ${rotate1} 60s linear infinite;
  border-color: rgba(100, 255, 218, 0.15); /* Subtle cyan tint */
`;

const Ring2 = styled(Ring)`
  width: 110vw;
  height: 110vw;
  animation: ${rotate2} 80s linear infinite;
  border-color: rgba(254, 9, 121, 0.1); /* Subtle pink tint */
`;

const Ring3 = styled(Ring)`
  width: 60vw;
  height: 60vw;
  animation: ${rotate3} 50s linear infinite;
  border-color: rgba(138, 43, 226, 0.1); /* Subtle purple tint */
`;

const NoiseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  opacity: 0.15;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
`;

const GlassRings = () => (
  <RingsContainer>
    <NoiseOverlay />
    <Ring1 />
    <Ring2 />
    <Ring3 />
  </RingsContainer>
);

export default GlassRings;
