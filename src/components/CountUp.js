import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MOTION } from '@styles/motionTokens';
import { usePrefersReducedMotion } from '@hooks';

const TabularSpan = styled.span`
  display: inline-block;
  font-variant-numeric: tabular-nums;
  min-width: ${({ minCh }) => (minCh ? `${minCh}ch` : 'auto')};
`;

const CountUp = ({
  from = 0,
  to,
  decimals = 0,
  duration = MOTION.duration.counter,
  active = true,
  prefix = '',
  suffix = '',
  minCh,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(prefersReducedMotion ? to : from);

  useEffect(() => {
    if (prefersReducedMotion) {
      setValue(to);
      return;
    }
    if (!active) {
      return;
    }

    let rafId;
    let startTime = null;

    const tick = timestamp => {
      if (!startTime) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Matches cubic-bezier(0.22, 1, 0.36, 1) ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      setValue(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setValue(to);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, from, to, duration, prefersReducedMotion]);

  const formatted = Number(value).toFixed(decimals);

  return (
    <TabularSpan minCh={minCh}>
      {prefix}
      {formatted}
      {suffix}
    </TabularSpan>
  );
};

CountUp.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number.isRequired,
  decimals: PropTypes.number,
  duration: PropTypes.number,
  active: PropTypes.bool,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  minCh: PropTypes.number,
};

export default CountUp;
