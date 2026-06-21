import React from 'react';
import styled, { keyframes } from 'styled-components';

// Helper function to generate a random string of box-shadows
const generateStars = (n) => {
  let value = `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
  for (let i = 2; i <= n; i++) {
    value += `, ${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
  }
  return value;
};

const shadowsSmall = generateStars(700);
const shadowsMedium = generateStars(200);
const shadowsBig = generateStars(100);

const animStar = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
`;

const StarfieldWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  overflow: hidden;
  pointer-events: none;
`;

const StarLayer = styled.div`
  background: transparent;

  &:after {
    content: " ";
    position: absolute;
    top: 2000px;
    background: transparent;
  }
`;

const Stars1 = styled(StarLayer)`
  width: 1px;
  height: 1px;
  box-shadow: ${shadowsSmall};
  animation: ${animStar} 150s linear infinite;

  &:after {
    width: 1px;
    height: 1px;
    box-shadow: ${shadowsSmall};
  }
`;

const Stars2 = styled(StarLayer)`
  width: 2px;
  height: 2px;
  box-shadow: ${shadowsMedium};
  animation: ${animStar} 100s linear infinite;

  &:after {
    width: 2px;
    height: 2px;
    box-shadow: ${shadowsMedium};
  }
`;

const Stars3 = styled(StarLayer)`
  width: 3px;
  height: 3px;
  box-shadow: ${shadowsBig};
  animation: ${animStar} 50s linear infinite;

  &:after {
    width: 3px;
    height: 3px;
    box-shadow: ${shadowsBig};
  }
`;

const shootingStarAnim = keyframes`
  0% {
    transform: translateX(0) translateY(0) rotate(-45deg);
    opacity: 1;
  }
  100% {
    transform: translateX(-1500px) translateY(1500px) rotate(-45deg);
    opacity: 0;
  }
`;

const ShootingStar = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 2px;
  background: linear-gradient(-45deg, rgba(255,255,255,0), rgba(255,255,255,1), rgba(255,255,255,0));
  opacity: 0;
  filter: drop-shadow(0 0 6px rgba(255,255,255,1));
  animation: ${shootingStarAnim} 4s ease-in-out infinite;
  
  &:nth-child(4) { top: 10%; left: 80%; animation-delay: 2s; }
  &:nth-child(5) { top: -10%; left: 40%; animation-delay: 7s; width: 250px; }
  &:nth-child(6) { top: 30%; left: 120%; animation-delay: 11s; }
`;

const Starfield = () => (
  <StarfieldWrapper>
    <Stars1 />
    <Stars2 />
    <Stars3 />
    <ShootingStar />
    <ShootingStar />
    <ShootingStar />
  </StarfieldWrapper>
);

export default Starfield;
