import React, { useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import gsap from 'gsap';
import styled from 'styled-components';
import { email, freelance, socialMedia } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';
import { MOTION } from '@styles/motionTokens';

const StyledHeroSection = styled.section`
  min-height: 88vh;
  display: flex;
  align-items: center;
  padding: 96px 0 72px;

  @media (max-width: 860px) {
    min-height: auto;
    padding: 64px 0 56px;
  }

  .hero-grid {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(240px, 320px);
    gap: 56px;
    align-items: center;

    @media (max-width: 860px) {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  .hero-copy {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .top-badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    margin-bottom: 22px;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 14px;
    border-radius: var(--radius-pill);
    background: var(--color-accent);
    border: 1px solid var(--color-accent);
    color: var(--cream);
    font-size: var(--fz-xs);
    font-weight: 600;

    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--cream);
    }

    &:hover,
    &:focus-visible {
      background: var(--cream);
      color: var(--on-cream);
    }
  }

  .role-pill {
    padding: 7px 14px;
    border-radius: var(--radius-pill);
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-secondary);
    font-size: var(--fz-xs);
    font-weight: 500;
  }

  .hero-name {
    margin: 0 0 12px;
    font-size: var(--fz-xl);
    font-weight: 600;
    color: var(--text-muted);
    letter-spacing: -0.01em;
  }

  .hero-headline {
    margin: 0 0 22px;
    font-size: clamp(36px, 5.2vw, 58px);
    font-weight: 600;
    line-height: 1.08;
    letter-spacing: -0.03em;
    color: var(--cream);
  }

  .hero-summary {
    margin: 0 0 28px;
    max-width: 640px;
    font-size: var(--fz-lg);
    line-height: 1.6;
    color: var(--text-secondary);
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px;
    margin-bottom: 28px;
  }

  .cta-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 15px 28px;
    border-radius: var(--radius-pill);
    background-color: var(--cream);
    color: var(--on-cream);
    font-size: var(--fz-md);
    font-weight: 600;
    border: 1px solid var(--cream);

    &:hover,
    &:focus-visible {
      background-color: #f3e4b5;
      border-color: #f3e4b5;
      color: var(--on-cream);
      transform: translateY(-2px);
    }
  }

  .cta-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 15px 24px;
    border-radius: var(--radius-pill);
    background-color: var(--surface);
    color: var(--cream);
    font-size: var(--fz-md);
    font-weight: 500;
    border: 1px solid var(--border);

    &:hover,
    &:focus-visible {
      border-color: var(--cream);
      transform: translateY(-2px);
    }
  }

  .social-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 8px 13px;
      border-radius: var(--radius-pill);
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text-secondary);
      font-size: var(--fz-xs);
      font-weight: 500;

      svg {
        width: 15px;
        height: 15px;
        flex-shrink: 0;
      }

      &:hover,
      &:focus-visible {
        border-color: var(--cream);
        color: var(--cream);
      }
    }
  }

  .hero-portrait-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 12px;
    box-shadow: 0 20px 44px rgba(1, 7, 54, 0.55);

    @media (max-width: 860px) {
      max-width: 176px;
      border-radius: 20px;
      padding: 8px;
      order: -1;
    }

    .portrait-frame {
      border-radius: 16px;
      overflow: hidden;
      aspect-ratio: 4 / 5;
      background: var(--surface-2);

      @media (max-width: 860px) {
        aspect-ratio: 1 / 1;
        border-radius: 14px;
      }
    }

    .portrait-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 15%;
    }

    .portrait-caption {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 6px 4px;
      font-size: var(--fz-xs);
      color: var(--text-muted);

      strong {
        color: var(--cream);
        font-weight: 600;
      }
    }
  }
`;

const Hero = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const portraitRef = useRef(null);
  const nameRef = useRef(null);
  const headlineRef = useRef(null);
  const roleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const targets = [
      portraitRef.current,
      nameRef.current,
      headlineRef.current,
      roleRef.current,
      ctaRef.current,
    ].filter(Boolean);

    if (!targets.length || prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: MOTION.rise.default,
        filter: `blur(${MOTION.blur.start}px)`,
        duration: 0.56,
        stagger: MOTION.stagger.default / 1000,
        ease: MOTION.easing.gsap,
        clearProps: 'transform,opacity,filter',
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <StyledHeroSection id="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="top-badges">
            <a
              className="status-pill"
              href={`mailto:${email}`}
              aria-label={`${freelance.status} via ${email}`}
            >
              <span className="dot" aria-hidden="true" />
              {freelance.status}
            </a>
            <span className="role-pill" ref={roleRef}>
              Software Engineer — Jakarta, Indonesia
            </span>
          </div>

          <p className="hero-name" ref={nameRef}>
            Riyan Sugiarto
          </p>

          <h1 className="hero-headline" ref={headlineRef}>
            {t('hero_headline')}
          </h1>

          <p className="hero-summary">{t('hero_desc')}</p>

          <div className="hero-actions" ref={ctaRef}>
            <Link className="cta-primary" to="/#projects">
              Explore Selected Work
            </Link>
            <Link className="cta-secondary" to="/#contact">
              Get in Touch
            </Link>
            <a
              className="cta-secondary"
              href="/Riyan%20Sugiarto%20Resume.pdf"
              download="Riyan Sugiarto Resume.pdf"
            >
              Download CV
            </a>
          </div>

          <ul className="social-row" aria-label="Social and freelance links">
            {socialMedia.map(item => {
              const isMail = item.url.startsWith('mailto:');
              return (
                <li key={item.name}>
                  {isMail ? (
                    <a href={item.url} aria-label={item.label || item.name}>
                      <Icon name={item.name} />
                      <span>{item.label || item.name}</span>
                    </a>
                  ) : (
                    <a
                      href={item.url}
                      aria-label={item.label || item.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name={item.name} />
                      <span>
                        {item.label || (item.name === 'Linkedin' ? 'LinkedIn' : item.name)}
                      </span>
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="hero-portrait-card" ref={portraitRef} aria-label="Profile portrait">
          <div className="portrait-frame">
            <StaticImage
              className="portrait-img"
              src="../../images/riyans-jas.png"
              width={420}
              quality={85}
              placeholder="NONE"
              loading="eager"
              formats={['AUTO', 'WEBP', 'AVIF']}
              imgStyle={{ objectFit: 'cover', objectPosition: 'center 10%' }}
              alt="Riyan Sugiarto portrait"
            />
          </div>
          <div className="portrait-caption">
            <strong>6+ Years Experience</strong>
            <span>Askrindo · 2025–Present</span>
          </div>
        </aside>
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
