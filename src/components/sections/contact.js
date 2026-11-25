import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled, { keyframes } from 'styled-components';
import { email, socialMedia } from '@config';
import { useInViewOnce, usePrefersReducedMotion } from '@hooks';
import { MOTION } from '@styles/motionTokens';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const StyledContactSection = styled.section`
  max-width: 880px;
  margin: 0 auto 80px;
  text-align: left;

  @media (max-width: 768px) {
    margin: 0 auto 40px;
  }
`;

const RotatorContainer = styled.div`
  margin-bottom: 28px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const ContactCard = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding: 18px 20px;
  border-radius: 6px;
  border: 1px solid ${({ active }) => (active ? 'var(--green)' : 'rgba(0, 255, 102, 0.25)')};
  background: ${({ active }) => (active ? 'var(--green)' : '#0d1117')};
  color: ${({ active }) => (active ? '#050505' : 'var(--lightest-slate)')};
  font-family: var(--font-mono);
  text-decoration: none;
  opacity: ${({ active }) => (active ? 1 : 0.86)};
  transform: translate3d(0, ${({ active }) => (active ? '-3px' : '0px')}, 0);
  transition: ${({ reduced }) =>
    reduced
      ? 'none'
      : `background-color ${MOTION.duration.rotatorStep}ms ${MOTION.easing.css}, color ${MOTION.duration.rotatorStep}ms ${MOTION.easing.css}, transform ${MOTION.duration.rotatorStep}ms ${MOTION.easing.css}, opacity ${MOTION.duration.rotatorStep}ms ease, border-color ${MOTION.duration.rotatorStep}ms ease`};

  &:hover,
  &:focus-visible {
    border-color: var(--green);
    color: ${({ active }) => (active ? '#050505' : 'var(--green)')};
    text-shadow: none;
  }

  .card-kicker {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ active }) => (active ? '#050505' : 'var(--pink)')};
    font-weight: 700;
  }

  .card-title {
    font-size: 16px;
    font-weight: 700;
  }

  .card-sub {
    font-size: 12px;
    color: ${({ active }) => (active ? '#07140d' : 'var(--slate)')};
    word-break: break-all;
  }
`;

const DotsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 14px;

  button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    padding: 0;
    border: 1px solid var(--green);
    background: transparent;
    transition: transform ${MOTION.duration.micro}ms ease,
      background-color ${MOTION.duration.micro}ms ease;

    &.active {
      background: var(--green);
      transform: scale(1.2);
    }
  }
`;

const TerminalWindow = styled.div`
  background: #0d1117;
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 102, 0.25);
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
      .red {
        background: #ff5f56;
      }
      .yellow {
        background: #ffbd2e;
      }
      .green {
        background: #27c93f;
      }
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
    padding: 22px;
    color: var(--light-slate);
    line-height: 1.6;

    .output-line {
      margin-bottom: 10px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }

    .prompt {
      color: var(--green);
    }

    .cursor {
      display: inline-block;
      width: 8px;
      height: 15px;
      background: var(--green);
      animation: ${blink} 1s step-end infinite;
    }

    .form-grid {
      margin-top: 16px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;

      &.full {
        grid-column: 1 / -1;
      }

      label {
        font-size: 11px;
        color: var(--pink);
        letter-spacing: 0.08em;
      }

      input,
      textarea {
        width: 100%;
        padding: 10px 12px;
        background: #050806;
        border: 1px solid rgba(0, 255, 102, 0.25);
        border-radius: 4px;
        color: var(--white);
        font-family: var(--font-mono);
        font-size: 13px;

        &:focus {
          border-color: var(--green);
        }
      }

      textarea {
        min-height: 86px;
        resize: vertical;
      }
    }

    .form-actions {
      margin-top: 16px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;

      .status-note {
        font-size: 12px;
        color: var(--slate);
      }

      .execute-btn {
        border: 1px solid var(--green);
        color: #050505;
        background: var(--green);
        padding: 10px 22px;
        font-family: var(--font-mono);
        font-size: var(--fz-xs);
        font-weight: 700;
        border-radius: 3px;
        cursor: pointer;
        transition: background-color ${MOTION.duration.micro}ms ease,
          color ${MOTION.duration.micro}ms ease;

        &:hover,
        &:focus-visible {
          background: transparent;
          color: var(--green);
        }
      }
    }
  }
`;

const PROMPT_CMD = './send_message.sh --secure';

const Contact = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const inView = useInViewOnce(sectionRef, MOTION.trigger.viewport);
  const prefersReducedMotion = usePrefersReducedMotion();

  const githubUrl =
    socialMedia.find(s => s.name === 'GitHub')?.url || 'https://github.com/0xriyans';
  const linkedinUrl =
    socialMedia.find(s => s.name === 'Linkedin')?.url ||
    'https://www.linkedin.com/in/riyan-sugiarto/';

  const cards = [
    {
      key: 'email',
      kicker: 'DIRECT MAIL',
      title: 'Email',
      sub: email,
      href: `mailto:${email}`,
    },
    {
      key: 'linkedin',
      kicker: 'NETWORK',
      title: 'LinkedIn',
      sub: 'linkedin.com/in/riyan-sugiarto',
      href: linkedinUrl,
    },
    {
      key: 'github',
      kicker: 'SOURCE CODE',
      title: 'GitHub',
      sub: 'github.com/0xriyans',
      href: githubUrl,
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [typedCmd, setTypedCmd] = useState(prefersReducedMotion ? PROMPT_CMD : '');
  const hasTypedRef = useRef(false);

  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  // Auto-rotate every 3.8s, pause on hover/focus or reduced motion
  useEffect(() => {
    if (prefersReducedMotion || paused) {
      return;
    }
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % cards.length);
    }, MOTION.duration.rotatorInterval);

    return () => clearInterval(timer);
  }, [paused, prefersReducedMotion, cards.length]);

  // Type terminal prompt the first time section enters viewport
  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedCmd(PROMPT_CMD);
      return;
    }
    if (!inView || hasTypedRef.current) {
      return;
    }
    hasTypedRef.current = true;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedCmd(PROMPT_CMD.substring(0, i));
      if (i >= PROMPT_CMD.length) {
        clearInterval(interval);
      }
    }, 36);
    return () => clearInterval(interval);
  }, [inView, prefersReducedMotion]);

  const handleSubmit = e => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Inquiry${senderName ? ` from ${senderName}` : ''}`,
    );
    const body = encodeURIComponent(
      `Name: ${senderName || '-'}\nEmail: ${senderEmail || '-'}\n\n${message}`,
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setFeedback('[OK] Mail client opened for transmission.');
  };

  return (
    <StyledContactSection id="contact" ref={sectionRef}>
      <h2 className="numbered-heading">[ 07 // TERMINAL ]</h2>

      <RotatorContainer
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}>
        <CardsGrid>
          {cards.map((card, idx) => (
            <ContactCard
              key={card.key}
              href={card.href}
              active={activeIdx === idx}
              reduced={prefersReducedMotion}
              target={card.key === 'email' ? undefined : '_blank'}
              rel={card.key === 'email' ? undefined : 'noreferrer'}
              onMouseEnter={() => setActiveIdx(idx)}
              onFocus={() => setActiveIdx(idx)}>
              <span className="card-kicker">{card.kicker}</span>
              <span className="card-title">{card.title}</span>
              <span className="card-sub">{card.sub}</span>
            </ContactCard>
          ))}
        </CardsGrid>

        <DotsRow role="tablist" aria-label="Select contact channel">
          {cards.map((card, idx) => (
            <button
              key={card.key}
              type="button"
              role="tab"
              aria-selected={activeIdx === idx}
              aria-label={`Highlight ${card.title}`}
              className={activeIdx === idx ? 'active' : ''}
              onClick={() => setActiveIdx(idx)}
            />
          ))}
        </DotsRow>
      </RotatorContainer>

      <TerminalWindow>
        <div className="terminal-header">
          <div className="window-controls">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="window-title">riyan@jakarta — BASH</div>
        </div>

        <form className="terminal-body" onSubmit={handleSubmit}>
          <div className="output-line">
            <span className="prompt">riyan@sys:~$</span>
            <span>{typedCmd || PROMPT_CMD}</span>
            {!prefersReducedMotion && <span className="cursor" aria-hidden="true" />}
          </div>

          <div className="output-line" style={{ color: 'var(--slate)', fontSize: '12px' }}>
            &gt; {t('Initialize secure transmission protocol')} · {email}
          </div>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="contact-name">SENDER_NAME</label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your name"
                value={senderName}
                onChange={e => setSenderName(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="contact-email">RETURN_ADDRESS</label>
              <input
                id="contact-email"
                type="email"
                placeholder="you@domain.com"
                value={senderEmail}
                onChange={e => setSenderEmail(e.target.value)}
              />
            </div>

            <div className="field full">
              <label htmlFor="contact-message">PAYLOAD_MESSAGE</label>
              <textarea
                id="contact-message"
                required
                placeholder="Tell me about your backend architecture, microservices, or project..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>
          </div>

          <div className="form-actions">
            <span className="status-note" aria-live="polite">
              {feedback || '[READY] Direct encrypted mailto dispatch.'}
            </span>
            <button type="submit" className="execute-btn">
              EXECUTE_SEND
            </button>
          </div>
        </form>
      </TerminalWindow>
    </StyledContactSection>
  );
};

export default Contact;
