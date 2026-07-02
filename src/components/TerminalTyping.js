import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const StyledTerminal = styled.div`
  font-family: var(--font-mono);
  font-size: var(--fz-md);
  color: var(--light-slate);
  text-align: center;
  max-width: 600px;
  margin: 30px auto 0;
  padding: 20px 30px;
  line-height: 1.6;

  .line {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    
    @media (max-width: 480px) {
      flex-wrap: wrap;
    }
  }

  .prompt {
    color: var(--pink);
    margin-right: 10px;
    font-weight: bold;
  }

  .cursor {
    display: inline-block;
    width: 10px;
    height: 1.1em;
    background-color: var(--pink);
    vertical-align: middle;
    margin-left: 4px;
    animation: ${blink} 1s step-end infinite;
    box-shadow: 0 0 8px var(--pink);
  }
`;

const TerminalTyping = () => {
  const [text, setText] = useState('');
  const [showSecondLine, setShowSecondLine] = useState(false);
  const fullText = "Locating signal... found in Jakarta, Indonesia";
  
  useEffect(() => {
    let typeInterval;
    const initialDelay = setTimeout(() => {
      setShowSecondLine(true);
      let i = 0;
      typeInterval = setInterval(() => {
        setText(fullText.substring(0, i + 1));
        i++;
        if (i >= fullText.length) {
          clearInterval(typeInterval);
        }
      }, 70); // typing speed
    }, 2000); // Initial delay to let the page load and hero animate

    return () => {
      clearTimeout(initialDelay);
      if (typeInterval) clearInterval(typeInterval);
    };
  }, []);

  return (
    <StyledTerminal>
      <div className="line">
        <span className="prompt">&gt;</span> sys.location --ping
      </div>
      {showSecondLine && (
        <div className="line">
          <span className="prompt">&gt;</span> 
          <span>{text}</span>
          <span className="cursor" />
        </div>
      )}
    </StyledTerminal>
  );
};

export default TerminalTyping;
