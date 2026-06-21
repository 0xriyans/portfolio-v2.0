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
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--yellow), var(--pink));
  color: var(--navy);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(255, 77, 109, 0.4);
  text-decoration: none;
  font-size: 20px;
  transition: var(--transition);
  cursor: pointer;

  &:hover,
  &:focus {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(255, 77, 109, 0.6);
  }

  &.theme-btn {
    background: var(--light-navy);
    border: 1px solid var(--yellow);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }
`;

const FloatingMobileButton = ({ toggleTheme, themeMode }) => (
  <StyledFloatingContainer>
    <StyledFloatingBtn
      as="button"
      className="theme-btn"
      onClick={toggleTheme}
      aria-label="Toggle Theme">
      {themeMode === 'light' ? (
        <span role="img" aria-label="moon">
          🌙
        </span>
      ) : (
        <span role="img" aria-label="sun">
          ☀️
        </span>
      )}
    </StyledFloatingBtn>

    <StyledFloatingBtn
      href="/Riyan Sugiarto Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download Resume">
      <span role="img" aria-label="document">
        📄
      </span>
    </StyledFloatingBtn>
  </StyledFloatingContainer>
);

FloatingMobileButton.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  themeMode: PropTypes.string.isRequired,
};

export default FloatingMobileButton;
