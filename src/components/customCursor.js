import React, { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    
    // Feature detection for touch devices (don't show custom cursor on mobile)
    if (window.matchMedia("(pointer: coarse)").matches) {
      if(dot) dot.style.display = 'none';
      if(ring) ring.style.display = 'none';
      return;
    }

    let mouseX = 0; let mouseY = 0;
    let ringX = 0; let ringY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
      }
    };

    let animationFrameId;
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ring) {
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }
      animationFrameId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    animationFrameId = requestAnimationFrame(animateRing);

    // Add hover effect for links and buttons
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button');
      if (target) {
        ring.style.width = '60px';
        ring.style.height = '60px';
        ring.style.backgroundColor = 'rgba(255, 181, 107, 0.1)';
        dot.style.transform = 'translate(-50%, -50%) scale(0)';
      }
    };
    
    const handleMouseOut = () => {
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.backgroundColor = 'transparent';
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div 
        id="cursor-dot" 
        style={{ 
          position: 'fixed', 
          width: '8px', 
          height: '8px', 
          backgroundColor: 'var(--yellow)', 
          borderRadius: '50%', 
          pointerEvents: 'none', 
          zIndex: 9999, 
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.2s ease-out'
        }} 
      />
      <div 
        id="cursor-ring" 
        style={{ 
          position: 'fixed', 
          width: '40px', 
          height: '40px', 
          border: '2px solid var(--yellow)', 
          borderRadius: '50%', 
          pointerEvents: 'none', 
          zIndex: 9998, 
          transform: 'translate(-50%, -50%)', 
          transition: 'width 0.2s, height 0.2s, background-color 0.2s',
          mixBlendMode: 'difference'
        }} 
      />
    </>
  );
};

export default CustomCursor;
