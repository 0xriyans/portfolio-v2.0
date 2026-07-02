import React from 'react';
import styled, { keyframes } from 'styled-components';

const morphAnim1 = keyframes`
  0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
`;

const morphAnim2 = keyframes`
  0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
  50% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
`;

const spinAnim = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const spinAnimReverse = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
`;

const FluidContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -3;
  overflow: hidden;
  background-color: #030305;
`;

const FluidBlob = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 60vw;
  margin-top: -30vw;
  margin-left: -30vw;
  background: linear-gradient(180deg, rgba(0, 242, 254, 0.4) 0%, rgba(138, 43, 226, 0.4) 100%);
  mix-blend-mode: screen;
  filter: blur(50px);
  box-shadow: inset 0 0 50px rgba(255, 255, 255, 0.1);
  animation: ${morphAnim1} 15s ease-in-out infinite, ${spinAnim} 30s linear infinite;
`;

const FluidBlob2 = styled(FluidBlob)`
  width: 50vw;
  height: 50vw;
  margin-top: -25vw;
  margin-left: -25vw;
  background: linear-gradient(180deg, rgba(254, 9, 121, 0.3) 0%, rgba(0, 242, 254, 0.4) 100%);
  animation: ${morphAnim2} 20s ease-in-out infinite, ${spinAnimReverse} 40s linear infinite;
`;

const FluidBlob3 = styled(FluidBlob)`
  width: 70vw;
  height: 70vw;
  margin-top: -35vw;
  margin-left: -35vw;
  background: linear-gradient(180deg, rgba(138, 43, 226, 0.3) 0%, rgba(254, 9, 121, 0.4) 100%);
  animation: ${morphAnim1} 12s ease-in-out infinite, ${spinAnim} 50s linear infinite;
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

const FluidBackground = () => (
  <FluidContainer>
    <FluidBlob />
    <FluidBlob2 />
    <FluidBlob3 />
    <NoiseOverlay />
  </FluidContainer>
);

export default FluidBackground;
