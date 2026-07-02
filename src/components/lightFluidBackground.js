import React from 'react';
import styled, { keyframes } from 'styled-components';

const moveBlob1 = keyframes`
  0% { transform: translate(0, 0) scale(1) rotate(0deg); }
  33% { transform: translate(3vw, -3vh) scale(1.02) rotate(5deg); }
  66% { transform: translate(-2vw, 2vh) scale(0.98) rotate(-5deg); }
  100% { transform: translate(0, 0) scale(1) rotate(0deg); }
`;

const moveBlob2 = keyframes`
  0% { transform: translate(0, 0) scale(1) rotate(0deg); }
  33% { transform: translate(-3vw, 2vh) scale(0.98) rotate(-5deg); }
  66% { transform: translate(2vw, -2vh) scale(1.02) rotate(5deg); }
  100% { transform: translate(0, 0) scale(1) rotate(0deg); }
`;

const morphAnim = keyframes`
  0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
`;

const morphAnim2 = keyframes`
  0% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  100% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
`;

const floatUp = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-40px); }
  100% { transform: translateY(0); }
`;

const floatDown = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(40px); }
  100% { transform: translateY(0); }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -3;
  overflow: hidden;
  background: var(--navy);
  transition: background 0.4s ease-in-out;
`;

// HD Glossy Blob Base
const Blob3D = styled.div`
  position: absolute;
  opacity: 0.95;
  box-shadow: inset -30px -30px 50px rgba(0, 0, 0, 0.4),
    inset 30px 30px 60px rgba(255, 255, 255, 0.6), inset -10px -10px 20px rgba(0, 0, 0, 0.2),
    inset 10px 10px 20px rgba(255, 255, 255, 0.8), 30px 30px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    display: none;
  }
`;

const Blob1 = styled(Blob3D)`
  top: 10%;
  left: 15%;
  width: 35vw;
  height: 35vw;
  background: linear-gradient(135deg, var(--blob1-start) 0%, var(--blob1-end) 100%);
  animation: ${moveBlob1} 30s ease-in-out infinite, ${morphAnim} 15s ease-in-out infinite;
`;

const Blob2 = styled(Blob3D)`
  bottom: -10%;
  right: 10%;
  width: 30vw;
  height: 30vw;
  background: linear-gradient(135deg, var(--blob2-start) 0%, var(--blob2-end) 100%);
  animation: ${moveBlob2} 35s ease-in-out infinite, ${morphAnim2} 18s ease-in-out infinite;
`;

const Blob3 = styled(Blob3D)`
  top: 25%;
  left: 50%;
  width: 18vw;
  height: 18vw;
  background: linear-gradient(135deg, var(--blob3-start) 0%, var(--blob3-end) 100%);
  animation: ${moveBlob1} 28s ease-in-out infinite reverse, ${morphAnim} 12s ease-in-out infinite;
`;

const Blob4 = styled(Blob3D)`
  bottom: 20%;
  left: 5%;
  width: 25vw;
  height: 25vw;
  background: linear-gradient(135deg, var(--blob4-start) 0%, var(--blob4-end) 100%);
  animation: ${moveBlob2} 32s ease-in-out infinite, ${morphAnim2} 22s ease-in-out infinite reverse;
`;

const Blob5 = styled(Blob3D)`
  top: -5%;
  right: 20%;
  width: 28vw;
  height: 28vw;
  background: linear-gradient(135deg, var(--blob5-start) 0%, var(--blob5-end) 100%);
  animation: ${moveBlob1} 38s ease-in-out infinite, ${morphAnim} 25s ease-in-out infinite;
`;

const Blob6 = styled(Blob3D)`
  bottom: 40%;
  left: 30%;
  width: 15vw;
  height: 15vw;
  background: linear-gradient(135deg, var(--blob6-start) 0%, var(--blob6-end) 100%);
  animation: ${moveBlob2} 25s ease-in-out infinite reverse, ${morphAnim2} 15s ease-in-out infinite;
`;

const NoiseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.04;
  z-index: 1;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");

  @media (max-width: 768px) {
    display: none;
  }
`;

// Minimalist Floating Orbs for Mobile (GPU-Friendly)
const MobileOrb = styled.div`
  display: none;
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.4;

  @media (max-width: 768px) {
    display: block;
  }
`;

const LightOrb1 = styled(MobileOrb)`
  top: 10%;
  left: -20%;
  width: 80vw;
  height: 80vw;
  background: radial-gradient(circle, var(--blob1-start) 0%, transparent 70%);
  animation: ${floatUp} 10s ease-in-out infinite;
`;

const LightOrb2 = styled(MobileOrb)`
  bottom: 5%;
  right: -20%;
  width: 90vw;
  height: 90vw;
  background: radial-gradient(circle, var(--blob2-start) 0%, transparent 70%);
  animation: ${floatDown} 12s ease-in-out infinite;
`;

const LightFluidBackground = () => (
  <BackgroundContainer>
    {/* Heavy 3D Desktop Blobs */}
    <Blob1 />
    <Blob2 />
    <Blob3 />
    <Blob4 />
    <Blob5 />
    <Blob6 />
    <NoiseOverlay />

    {/* Lightweight Mobile Orbs */}
    <LightOrb1 />
    <LightOrb2 />
  </BackgroundContainer>
);

export default LightFluidBackground;
