import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const move1 = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30vw, 20vh) scale(1.2); }
  66% { transform: translate(-20vw, 40vh) scale(0.8); }
  100% { transform: translate(0, 0) scale(1); }
`;

const move2 = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-30vw, -20vh) scale(1.2); }
  66% { transform: translate(20vw, -40vh) scale(0.8); }
  100% { transform: translate(0, 0) scale(1); }
`;

const move3 = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(40vw, -30vh) scale(1.5); }
  100% { transform: translate(0, 0) scale(1); }
`;

const BlobsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -3; /* Deepest layer */
  overflow: hidden;
  background-color: #050505; /* Dark sleek base */
`;

const NoiseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10; /* Above blobs */
  opacity: 0.15;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
`;

const Blob = styled.div`
  position: absolute;
  filter: blur(90px);
  opacity: 0.6;
  border-radius: 50%;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

const Blob1 = styled(Blob)`
  top: -10%;
  left: -10%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, rgba(0, 242, 254, 0.8) 0%, rgba(0, 242, 254, 0) 70%);
  animation-name: ${move1};
  animation-duration: 25s;
`;

const Blob2 = styled(Blob)`
  bottom: -10%;
  right: -10%;
  width: 60vw;
  height: 60vw;
  background: radial-gradient(circle, rgba(254, 9, 121, 0.6) 0%, rgba(254, 9, 121, 0) 70%);
  animation-name: ${move2};
  animation-duration: 30s;
`;

const Blob3 = styled(Blob)`
  top: 30%;
  left: 30%;
  width: 45vw;
  height: 45vw;
  background: radial-gradient(circle, rgba(138, 43, 226, 0.5) 0%, rgba(138, 43, 226, 0) 70%);
  animation-name: ${move3};
  animation-duration: 35s;
`;

const MouseMagnet = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 40vw;
  height: 40vw;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 242, 254, 0.3) 0%, rgba(0, 242, 254, 0) 60%);
  filter: blur(100px);
  pointer-events: none;
  z-index: 1;
  transform: translate(-50%, -50%);
  will-change: transform;
`;

const NeonBlobs = () => {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    const magnet = document.getElementById('mouse-magnet');
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
      magnetX += (mouseX - magnetX) * 0.03; // Smooth lazy follow
      magnetY += (mouseY - magnetY) * 0.03;
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
    <BlobsContainer>
      <NoiseOverlay />
      <MouseMagnet id="mouse-magnet" />
      <Blob1 />
      <Blob2 />
      <Blob3 />
    </BlobsContainer>
  );
};

export default NeonBlobs;
