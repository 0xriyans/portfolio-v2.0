import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledStatsBanner = styled.section`
  width: 100%;
  margin: 0px 0 60px 0;
  display: flex;
  justify-content: center;
  
  .status-panel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 40px;
    }
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex: 1;
    
    .stat-label {
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      color: var(--pink);
      letter-spacing: 0.1em;
      margin-bottom: 5px;
      text-transform: uppercase;
    }

    .stat-value {
      font-family: var(--font-sans);
      font-size: clamp(40px, 5vw, 64px);
      font-weight: 700;
      color: var(--blue);
      text-shadow: 0 0 15px rgba(0, 255, 102, 0.4);
      line-height: 1;
      display: flex;
      align-items: baseline;
      justify-content: center;
      
      .unit {
        font-size: clamp(16px, 2vw, 22px);
        color: var(--slate);
        font-weight: 500;
        margin-left: 3px;
        text-shadow: none;
      }
    }
  }
`;

const StatBar = ({ label, percentage, unit = "%" }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseFloat(percentage);
    if (start === end) return;

    let totalDuration = 2000;
    let incrementTime = (totalDuration / end) * 2;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(String(start));
      if (start >= end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [percentage]);

  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{count}<span className="unit">{unit}</span></div>
    </div>
  );
};

const Stats = () => {
  return (
    <StyledStatsBanner id="stats-banner">
      <div className="status-panel">
        <StatBar label="TARGET SLA" percentage="99" unit=".9%" />
        <StatBar label="P99 LATENCY" percentage="1" unit=".2s" />
        <StatBar label="SYSTEM SCALE" percentage="450" unit="+" />
      </div>
    </StyledStatsBanner>
  );
};

export default Stats;
