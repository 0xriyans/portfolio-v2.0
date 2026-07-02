import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledFloatingContainer = styled.div`
  display: none; // Hidden on desktop

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 15px;
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 99;
  }
`;

const StyledFloatingBtn = styled.a`
  width: 45px;
  height: 45px;
  border: 1px solid var(--blue);
  background: rgba(0, 255, 102, 0.1);
  color: var(--blue);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 255, 102, 0.2);
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  font-weight: 600;
  transition: var(--transition);
  cursor: pointer;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
  
  &:hover,
  &:focus {
    transform: translateY(-3px);
    background: rgba(0, 255, 102, 0.2);
    color: var(--white);
    box-shadow: 0 0 15px rgba(0, 255, 102, 0.5);
  }
`;

const FloatingMobileButton = () => (
  <StyledFloatingContainer>
    <StyledFloatingBtn
      href="/Riyan Sugiarto Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download Resume">
      CV
    </StyledFloatingBtn>
  </StyledFloatingContainer>
);

FloatingMobileButton.propTypes = {};

export default FloatingMobileButton;
