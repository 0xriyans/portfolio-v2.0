import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { srConfig, email, socialMedia } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 800px;
  margin: 0 auto 100px;
  text-align: left;
  
  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }
`;

const TerminalWindow = styled.div`
  background: #0d1117;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.7);
  font-family: var(--font-mono);
  font-size: var(--fz-sm);

  .terminal-header {
    background: #161b22;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

    .window-controls {
      display: flex;
      gap: 8px;

      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      .red { background: #ff5f56; }
      .yellow { background: #ffbd2e; }
      .green { background: #27c93f; }
    }

    .window-title {
      flex: 1;
      text-align: center;
      color: var(--light-slate);
      font-size: var(--fz-xs);
      letter-spacing: 1px;
    }
  }

  .terminal-body {
    padding: 20px;
    color: var(--light-slate);
    line-height: 1.6;

    .output-line {
      margin-bottom: 8px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .prompt {
      color: var(--green, #00ff66);
    }
    
    .text-green {
      color: var(--green, #00ff66);
    }
    
    .text-dim {
      color: var(--slate);
    }

    a {
      color: var(--green, #00ff66);
      text-decoration: underline;
      text-decoration-color: rgba(0, 255, 102, 0.3);
      text-underline-offset: 3px;
      transition: var(--transition);
      
      &:hover {
        color: var(--green, #00ff66);
        text-decoration-color: var(--green, #00ff66);
        text-shadow: 0 0 5px rgba(0, 255, 102, 0.5);
      }
    }

    .mt-4 {
      margin-top: 25px;
    }

    .input-wrapper {
      margin-top: 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid rgba(255, 255, 255, 0.05);
      background: rgba(0, 0, 0, 0.3);
      padding: 10px 15px;
      border-radius: 4px;

      .input-text {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--white);
        
        .cursor {
          display: inline-block;
          width: 8px;
          height: 15px;
          background: var(--green, #00ff66);
          animation: blink 1s step-end infinite;
        }
      }

      .execute-btn {
        border: 1px solid var(--green, #00ff66);
        color: var(--green, #00ff66);
        background: transparent;
        padding: 8px 20px;
        font-family: var(--font-mono);
        font-size: var(--fz-xs);
        border-radius: 2px;
        text-decoration: none;
        transition: var(--transition);
        
        &:hover {
          background: rgba(0, 255, 102, 0.1);
          color: var(--green, #00ff66);
          box-shadow: 0 0 10px rgba(0, 255, 102, 0.3);
        }
      }
    }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { t } = useTranslation();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig(200, 0.05));
  }, []);

  const getGithub = () => socialMedia.find(s => s.name === 'GitHub')?.url || 'https://github.com/0xriyans';
  const getLinkedin = () => socialMedia.find(s => s.name === 'Linkedin')?.url || 'https://linkedin.com/in/riyan-sugiarto';

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <TerminalWindow>
        <div className="terminal-header">
          <div className="window-controls">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="window-title">root - BASH - 80x24</div>
        </div>
        <div className="terminal-body">
          <div className="output-line">
            <span className="prompt">root@system:~$</span> ls -la networks/social
          </div>
          <div className="output-line text-dim">
            drwxr-xr-x 2 root admin 4096 Mar 04 12:00 .
          </div>
          <div className="output-line">
            <span className="text-dim">-rw-r--r-- 1 root admin 84</span>{' '}
            <a href={getGithub()} target="_blank" rel="noreferrer">
              github.com/0xriyans
            </a>
          </div>
          <div className="output-line">
            <span className="text-dim">-rw-r--r-- 1 root admin 42</span>{' '}
            <a href={getLinkedin()} target="_blank" rel="noreferrer">
              linkedin.com/in/riyan-sugiarto
            </a>
          </div>
          <div className="output-line">
            <span className="text-dim">-rw-r--r-- 1 root admin 64</span>{' '}
            <a href={`mailto:${email}`}>
              mailto:{email}
            </a>
          </div>

          <div className="output-line mt-4">
            <span className="prompt">root@system:~$</span> ./send_message.sh
          </div>
          <div className="output-line">
            <span className="text-green">{'>'}</span> {t('Initialize secure transmission protocol')}
          </div>
          <div className="output-line text-dim">
            [OK] {t('Payload encrypted and ready.')}
          </div>

          <div className="input-wrapper">
            <div className="input-text">
              <span className="text-green">_</span> {t('start_transmission')} <span className="cursor"></span>
            </div>
            <a href={`mailto:${email}`} className="execute-btn">
              EXECUTE
            </a>
          </div>
        </div>
      </TerminalWindow>
    </StyledContactSection>
  );
};

export default Contact;
