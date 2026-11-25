import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';
import { useBootStatus } from '@utils/bootContext';
import { MOTION } from '@styles/motionTokens';

const StyledSideElement = styled.div`
  width: 40px;
  position: fixed;
  bottom: 0;
  left: ${props => (props.orientation === 'left' ? '40px' : 'auto')};
  right: ${props => (props.orientation === 'left' ? 'auto' : '40px')};
  z-index: 10;
  color: var(--light-slate);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translateY(${({ visible }) => (visible ? '0px' : '12px')});
  transition: ${({ immediate }) =>
    immediate
      ? 'none'
      : `opacity 280ms ${MOTION.easing.css} 700ms, transform 280ms ${MOTION.easing.css} 700ms`};

  @media (max-width: 1080px) {
    left: ${props => (props.orientation === 'left' ? '20px' : 'auto')};
    right: ${props => (props.orientation === 'left' ? 'auto' : '20px')};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Side = ({ children, isHome, orientation }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { bootDone } = useBootStatus();
  const visible = prefersReducedMotion || !isHome || bootDone;

  return (
    <StyledSideElement
      orientation={orientation}
      visible={visible}
      immediate={prefersReducedMotion || !isHome}>
      {children}
    </StyledSideElement>
  );
};

Side.propTypes = {
  children: PropTypes.node.isRequired,
  isHome: PropTypes.bool,
  orientation: PropTypes.string,
};

export default Side;
