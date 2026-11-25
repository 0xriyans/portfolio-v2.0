import React, { useState } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { email, freelance, socialMedia } from '@config';
import { Icon } from '@components/icons';

const StyledContactSection = styled.section`
  max-width: 1120px;
  margin: 0 auto 56px;

  .contact-header {
    max-width: 720px;
    margin-bottom: 36px;
  }

  .contact-heading {
    margin: 0 0 14px;
    font-size: clamp(30px, 4.5vw, 46px);
    font-weight: 600;
    line-height: 1.12;
    letter-spacing: -0.025em;
    color: var(--cream);
  }

  .contact-intro {
    margin: 0;
    font-size: var(--fz-lg);
    color: var(--text-secondary);
    line-height: 1.6;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactCard = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  padding: 24px 26px;
  border-radius: var(--radius-card);
  border: 1px solid ${({ active }) => (active ? 'var(--cream)' : 'var(--border)')};
  background: ${({ active }) => (active ? 'var(--cream)' : 'var(--surface)')};
  color: ${({ active }) => (active ? 'var(--on-cream)' : 'var(--cream)')};
  text-decoration: none;

  &:hover,
  &:focus-visible {
    border-color: var(--cream);
    color: ${({ active }) => (active ? 'var(--on-cream)' : 'var(--cream)')};
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-kicker {
    font-size: var(--fz-xs);
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${({ active }) => (active ? '#22396F' : 'var(--text-muted)')};
  }

  .card-icon {
    width: 18px;
    height: 18px;
    opacity: 0.85;
  }

  .card-title {
    font-size: 22px;
    font-weight: 600;
  }

  .card-sub {
    font-size: var(--fz-sm);
    color: ${({ active }) => (active ? '#0D1C42' : 'var(--text-secondary)')};
    word-break: break-word;
  }
`;

const FreelanceBar = styled.div`
  margin-top: 20px;
  padding: 18px 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 14px;

  .freelance-status {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: var(--fz-sm);
    font-weight: 600;
    color: var(--cream);

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4ade80;
    }
  }

  .freelance-links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    a {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 8px 15px;
      border-radius: var(--radius-pill);
      background: rgba(1, 7, 54, 0.55);
      border: 1px solid var(--border);
      color: var(--text-secondary);
      font-size: var(--fz-xs);
      font-weight: 500;

      svg {
        width: 15px;
        height: 15px;
      }

      &:hover,
      &:focus-visible {
        border-color: var(--cream);
        color: var(--cream);
      }
    }
  }
`;

const ContactFormCard = styled.form`
  margin-top: 24px;
  padding: 28px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);

  @media (max-width: 600px) {
    padding: 22px 18px;
  }

  .form-title {
    margin: 0 0 6px;
    font-size: 20px;
    font-weight: 600;
    color: var(--cream);
  }

  .form-sub {
    margin: 0 0 20px;
    font-size: var(--fz-sm);
    color: var(--text-muted);
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;

    @media (max-width: 640px) {
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
      font-size: var(--fz-xs);
      font-weight: 600;
      color: var(--cream);
    }

    input,
    textarea {
      width: 100%;
      padding: 12px 14px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      color: var(--cream);
      font-family: var(--font-sans);
      font-size: var(--fz-md);

      &::placeholder {
        color: var(--text-muted);
      }

      &:focus {
        border-color: var(--cream);
      }
    }

    textarea {
      min-height: 104px;
      resize: vertical;
    }
  }

  .form-actions {
    margin-top: 18px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 12px;

    .status-note {
      font-size: var(--fz-xs);
      color: var(--text-muted);
    }

    .submit-btn {
      padding: 13px 26px;
      border-radius: var(--radius-pill);
      background: var(--cream);
      color: var(--on-cream);
      font-family: var(--font-sans);
      font-size: var(--fz-sm);
      font-weight: 600;
      border: 1px solid var(--cream);
      cursor: pointer;

      &:hover,
      &:focus-visible {
        background: #f3e4b5;
        border-color: #f3e4b5;
      }
    }
  }
`;

const Contact = () => {
  const { t } = useTranslation();

  const githubUrl =
    socialMedia.find(s => s.name === 'GitHub')?.url || 'https://github.com/0xriyans';
  const linkedinUrl =
    socialMedia.find(s => s.name === 'Linkedin')?.url ||
    'https://www.linkedin.com/in/riyan-sugiarto/';
  const xUrl = socialMedia.find(s => s.name === 'Twitter')?.url || 'https://twitter.com/0xriyans';

  const cards = [
    {
      key: 'email',
      icon: 'Email',
      kicker: 'Direct Mail',
      title: 'Email',
      sub: email,
      href: `mailto:${email}`,
    },
    {
      key: 'linkedin',
      icon: 'Linkedin',
      kicker: 'Network',
      title: 'LinkedIn',
      sub: 'linkedin.com/in/riyan-sugiarto',
      href: linkedinUrl,
    },
    {
      key: 'github',
      icon: 'GitHub',
      kicker: 'Source Code',
      title: 'GitHub',
      sub: 'github.com/0xriyans',
      href: githubUrl,
    },
  ];

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Inquiry${senderName ? ` from ${senderName}` : ''}`,
    );
    const body = encodeURIComponent(
      `Name: ${senderName || '-'}\nEmail: ${senderEmail || '-'}\n\n${message}`,
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setFeedback('Your email client has been opened.');
  };

  return (
    <StyledContactSection id="contact">
      <div className="contact-header">
        <span className="section-kicker">{t('Contact')}</span>
        <h2 className="contact-heading">{t('contact_heading')}</h2>
        <p className="contact-intro">{t('contact_intro')}</p>
      </div>

      <CardsGrid>
        {cards.map((card, idx) => (
          <ContactCard
            key={card.key}
            href={card.href}
            active={selectedIdx === idx}
            target={card.key === 'email' ? undefined : '_blank'}
            rel={card.key === 'email' ? undefined : 'noreferrer'}
            onFocus={() => setSelectedIdx(idx)}>
            <div className="card-top">
              <span className="card-kicker">{card.kicker}</span>
              <span className="card-icon" aria-hidden="true">
                <Icon name={card.icon} />
              </span>
            </div>
            <div>
              <div className="card-title">{card.title}</div>
              <div className="card-sub">{card.sub}</div>
            </div>
          </ContactCard>
        ))}
      </CardsGrid>

      <FreelanceBar>
        <div className="freelance-status">
          <span className="dot" aria-hidden="true" />
          <span>{freelance.status}</span>
        </div>

        <div className="freelance-links" aria-label="Freelance platforms and X profile">
          <a href={freelance.fiverr} target="_blank" rel="noreferrer">
            <Icon name="Fiverr" />
            <span>Fiverr</span>
          </a>
          <a href={freelance.upwork} target="_blank" rel="noreferrer">
            <Icon name="Upwork" />
            <span>Upwork</span>
          </a>
          <a href={xUrl} target="_blank" rel="noreferrer">
            <Icon name="Twitter" />
            <span>X (@0xriyans)</span>
          </a>
        </div>
      </FreelanceBar>

      <ContactFormCard onSubmit={handleSubmit}>
        <h3 className="form-title">Send a message</h3>
        <p className="form-sub">
          Write a brief note below to start an email directly to{' '}
          <a href={`mailto:${email}`}>{email}</a>.
        </p>

        <div className="form-grid">
          <div className="field">
            <label htmlFor="contact-name">Your name</label>
            <input
              id="contact-name"
              type="text"
              placeholder="Riyan / Your name"
              value={senderName}
              onChange={e => setSenderName(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="contact-email">Your email</label>
            <input
              id="contact-email"
              type="email"
              placeholder="you@domain.com"
              value={senderEmail}
              onChange={e => setSenderEmail(e.target.value)}
            />
          </div>

          <div className="field full">
            <label htmlFor="contact-message">Project or inquiry details</label>
            <textarea
              id="contact-message"
              required
              placeholder="Tell me about the backend architecture, API integration, or product scope..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
        </div>

        <div className="form-actions">
          <span className="status-note" aria-live="polite">
            {feedback || `Direct email: ${email}`}
          </span>
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </div>
      </ContactFormCard>
    </StyledContactSection>
  );
};

export default Contact;
