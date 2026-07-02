import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const RainCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  opacity: 0.15;
`;

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン'.split('');
    
    const fontSize = 24;
    let columns = width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(9, 10, 15, 0.15)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00ff66'; // Cyberpunk Cyan
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    let animationFrameId;
    let timeoutId;
    
    const renderLoop = () => {
      timeoutId = setTimeout(() => {
        draw();
        animationFrameId = requestAnimationFrame(renderLoop);
      }, 100);
    };

    renderLoop();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = width / fontSize;
      const oldLength = drops.length;
      for (let x = 0; x < columns; x++) {
        if (x >= oldLength) drops[x] = 1;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <RainCanvas ref={canvasRef} />;
};

export default MatrixRain;
