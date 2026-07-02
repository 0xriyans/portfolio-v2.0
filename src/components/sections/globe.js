import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import styled from 'styled-components';

const GlobeWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  z-index: -1;
  opacity: 0.8;
  pointer-events: none;
  
  @media (max-width: 768px) {
    width: 400px;
    height: 400px;
  }
`;

const Globe = () => {
  const canvasRef = useRef();

  useEffect(() => {
    let phi = 0;
    
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 1, // Fallback to 1 to avoid huge textures
      width: 600, // Reduced from 1600
      height: 600, // Reduced from 1600
      phi: 0,
      theta: 0.1,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 12000, // Lower samples for better compatibility
      mapBrightness: 6,
      baseColor: [0, 0.95, 1], // Pure cyan
      markerColor: [1, 0.16, 0.44], // Pink
      glowColor: [0, 0.5, 0.8], 
      markers: [
        { location: [-6.2088, 106.8456], size: 0.1 } // Jakarta
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      }
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <GlobeWrapper>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', contain: 'layout paint size' }}
      />
    </GlobeWrapper>
  );
};

export default Globe;
