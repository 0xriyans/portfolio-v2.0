import { useEffect, useRef } from 'react';

const useTilt = () => {
  const tiltRef = useRef(null);

  useEffect(() => {
    const node = tiltRef.current;
    if (!node) return;

    // We only want tilt on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e) => {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation. Adjust divisor for stronger/weaker effect
      const rotateX = ((y - centerY) / centerY) * -4; // Max 4 deg
      const rotateY = ((x - centerX) / centerX) * 4;

      node.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      node.style.transition = 'transform 0.1s ease-out';
    };

    const handleMouseLeave = () => {
      node.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      node.style.transition = 'transform 0.5s ease-out';
    };

    node.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return tiltRef;
};

export default useTilt;
