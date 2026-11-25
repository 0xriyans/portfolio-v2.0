import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useInViewOnce, usePrefersReducedMotion } from '@hooks';
import { MOTION } from '@styles/motionTokens';

const StyledArchitectureSection = styled.section`
  max-width: 1000px;

  .arch-card {
    background: #080d0b;
    border: 1px solid rgba(0, 255, 102, 0.28);
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.75);
  }

  .arch-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 18px;
    background: #0d1512;
    border-bottom: 1px solid rgba(0, 255, 102, 0.2);
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--green);

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }

    .sub {
      color: var(--slate);
      font-size: 11px;
    }
  }

  .desktop-svg {
    display: block;
    width: 100%;

    @media (max-width: 700px) {
      display: none;
    }
  }

  .mobile-svg {
    display: none;
    width: 100%;

    @media (max-width: 700px) {
      display: block;
    }
  }
`;

const DESKTOP_NODES = [
  { x: 20, y: 78, w: 126, h: 68, title: 'Client / Request', sub: 'REST / Webhook' },
  { x: 178, y: 78, w: 124, h: 68, title: 'API Gateway', sub: 'OAuth2 / Rate Limit' },
  { x: 334, y: 78, w: 142, h: 68, title: 'Spring Boot Service', sub: 'Redis NX Lock' },
  { x: 508, y: 78, w: 108, h: 68, title: 'Kafka', sub: 'Manual Offset' },
  { x: 648, y: 78, w: 152, h: 68, title: 'Consumer / Service', sub: 'Quarkus / Async' },
  { x: 832, y: 78, w: 112, h: 68, title: 'PostgreSQL', sub: 'ACID / FOR UPDATE' },
];

const MOBILE_NODES = [
  { x: 24, y: 24, w: 144, h: 62, title: 'Client / Request', sub: 'REST / Webhook' },
  { x: 192, y: 24, w: 144, h: 62, title: 'API Gateway', sub: 'OAuth2 / Routing' },
  { x: 192, y: 126, w: 144, h: 62, title: 'Spring Boot', sub: 'Redis Mutex Lock' },
  { x: 24, y: 126, w: 144, h: 62, title: 'Kafka', sub: 'Manual Offset' },
  { x: 24, y: 228, w: 144, h: 62, title: 'Consumer Service', sub: 'Quarkus Worker' },
  { x: 192, y: 228, w: 144, h: 62, title: 'PostgreSQL', sub: 'ACID Ledger' },
];

const Architecture = () => {
  const sectionRef = useRef(null);
  const inView = useInViewOnce(sectionRef, MOTION.trigger.viewport);
  const prefersReducedMotion = usePrefersReducedMotion();
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion || !inView || hasAnimatedRef.current) {
      return;
    }

    hasAnimatedRef.current = true;
    let cancelled = false;
    let ctx;

    import('gsap').then(({ default: gsap }) => {
      if (cancelled || !sectionRef.current) {
        return;
      }
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: MOTION.easing.gsap } });

        // Total ~1800ms: nodes fade in sequentially, connector lines draw left-to-right, light dot travels
        const lines = gsap.utils.toArray('.arch-line');
        lines.forEach(line => {
          const len = typeof line.getTotalLength === 'function' ? line.getTotalLength() : 60;
          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        });

        tl.fromTo(
          '.arch-node',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.16 },
          0,
        )
          .to(lines, { strokeDashoffset: 0, duration: 0.25, stagger: 0.18 }, 0.18)
          .fromTo(
            '.arch-dot-desktop',
            { attr: { cx: 146 }, opacity: 0 },
            {
              keyframes: [
                { attr: { cx: 146 }, opacity: 1, duration: 0.1 },
                { attr: { cx: 832 }, opacity: 1, duration: 1.45, ease: 'power1.inOut' },
                { attr: { cx: 832 }, opacity: 0, duration: 0.25 },
              ],
            },
            0.1,
          )
          .fromTo(
            '.arch-dot-mobile',
            { attr: { cx: 168, cy: 55 }, opacity: 0 },
            {
              keyframes: [
                { attr: { cx: 168, cy: 55 }, opacity: 1, duration: 0.08 },
                { attr: { cx: 264, cy: 55 }, opacity: 1, duration: 0.26, ease: 'none' },
                { attr: { cx: 264, cy: 157 }, opacity: 1, duration: 0.26, ease: 'none' },
                { attr: { cx: 96, cy: 157 }, opacity: 1, duration: 0.34, ease: 'none' },
                { attr: { cx: 96, cy: 259 }, opacity: 1, duration: 0.26, ease: 'none' },
                { attr: { cx: 192, cy: 259 }, opacity: 1, duration: 0.26, ease: 'none' },
                { attr: { cx: 192, cy: 259 }, opacity: 0, duration: 0.24 },
              ],
            },
            0.1,
          );
      }, sectionRef);
    });

    return () => {
      cancelled = true;
      if (ctx) {
        ctx.revert();
      }
    };
  }, [inView, prefersReducedMotion]);

  return (
    <StyledArchitectureSection id="architecture" ref={sectionRef}>
      <h2 className="numbered-heading">[ 02 // ARCHITECTURE ]</h2>

      <div className="arch-card">
        <div className="arch-header">
          <span>EVENT-DRIVEN BACKEND PIPELINE // PRODUCTION PATTERN</span>
          <span className="sub">ZERO-LOSS STREAMING &amp; ACID CONSISTENCY</span>
        </div>

        {/* Desktop horizontal flow */}
        <svg
          className="desktop-svg"
          viewBox="0 0 964 224"
          role="img"
          aria-label="Architecture flow: Client / Request to API Gateway to Spring Boot Service to Kafka to Consumer / Microservice to PostgreSQL">
          <defs>
            <pattern id="arch-grid-d" width="24" height="24" patternUnits="userSpaceOnUse">
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="rgba(0, 255, 102, 0.07)"
                strokeWidth="1"
              />
            </pattern>
            <marker
              id="arch-arrow-d"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#00ff66" />
            </marker>
          </defs>

          <rect width="964" height="224" fill="#080d0b" />
          <rect width="964" height="224" fill="url(#arch-grid-d)" />

          {[0, 1, 2, 3, 4].map(idx => {
            const from = DESKTOP_NODES[idx];
            const to = DESKTOP_NODES[idx + 1];
            const x1 = from.x + from.w;
            const x2 = to.x - 4;
            const y = from.y + from.h / 2;
            return (
              <path
                key={idx}
                className="arch-line"
                d={`M ${x1} ${y} L ${x2} ${y}`}
                fill="none"
                stroke="#00ff66"
                strokeWidth="2"
                markerEnd="url(#arch-arrow-d)"
              />
            );
          })}

          {!prefersReducedMotion && (
            <circle
              className="arch-dot-desktop"
              cx="146"
              cy="112"
              r="5"
              fill="#b8ff00"
              opacity="0"
            />
          )}

          {DESKTOP_NODES.map((n, idx) => (
            <g key={idx} className="arch-node">
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={n.h}
                rx="4"
                fill="#0d1512"
                stroke="#00ff66"
                strokeWidth="1.5"
              />
              <text
                x={n.x + n.w / 2}
                y={n.y + 30}
                textAnchor="middle"
                fill="#ffffff"
                fontFamily="SF Mono, monospace"
                fontSize="11"
                fontWeight="700">
                {n.title}
              </text>
              <text
                x={n.x + n.w / 2}
                y={n.y + 49}
                textAnchor="middle"
                fill="#9ca3af"
                fontFamily="SF Mono, monospace"
                fontSize="9.5">
                {n.sub}
              </text>
            </g>
          ))}
        </svg>

        {/* Mobile 2-column snake flow */}
        <svg
          className="mobile-svg"
          viewBox="0 0 360 314"
          role="img"
          aria-label="Architecture flow: Client / Request to API Gateway to Spring Boot Service to Kafka to Consumer / Microservice to PostgreSQL">
          <defs>
            <pattern id="arch-grid-m" width="24" height="24" patternUnits="userSpaceOnUse">
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="rgba(0, 255, 102, 0.07)"
                strokeWidth="1"
              />
            </pattern>
            <marker
              id="arch-arrow-m"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#00ff66" />
            </marker>
          </defs>

          <rect width="360" height="314" fill="#080d0b" />
          <rect width="360" height="314" fill="url(#arch-grid-m)" />

          {/* Connectors: 0->1, 1->2, 2->3, 3->4, 4->5 */}
          <path
            className="arch-line"
            d="M 168 55 L 188 55"
            fill="none"
            stroke="#00ff66"
            strokeWidth="2"
            markerEnd="url(#arch-arrow-m)"
          />
          <path
            className="arch-line"
            d="M 264 86 L 264 122"
            fill="none"
            stroke="#00ff66"
            strokeWidth="2"
            markerEnd="url(#arch-arrow-m)"
          />
          <path
            className="arch-line"
            d="M 192 157 L 172 157"
            fill="none"
            stroke="#00ff66"
            strokeWidth="2"
            markerEnd="url(#arch-arrow-m)"
          />
          <path
            className="arch-line"
            d="M 96 188 L 96 224"
            fill="none"
            stroke="#00ff66"
            strokeWidth="2"
            markerEnd="url(#arch-arrow-m)"
          />
          <path
            className="arch-line"
            d="M 168 259 L 188 259"
            fill="none"
            stroke="#00ff66"
            strokeWidth="2"
            markerEnd="url(#arch-arrow-m)"
          />

          {!prefersReducedMotion && (
            <circle
              className="arch-dot-mobile"
              cx="168"
              cy="55"
              r="4.5"
              fill="#b8ff00"
              opacity="0"
            />
          )}

          {MOBILE_NODES.map((n, idx) => (
            <g key={idx} className="arch-node">
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={n.h}
                rx="4"
                fill="#0d1512"
                stroke="#00ff66"
                strokeWidth="1.5"
              />
              <text
                x={n.x + n.w / 2}
                y={n.y + 27}
                textAnchor="middle"
                fill="#ffffff"
                fontFamily="SF Mono, monospace"
                fontSize="11"
                fontWeight="700">
                {n.title}
              </text>
              <text
                x={n.x + n.w / 2}
                y={n.y + 46}
                textAnchor="middle"
                fill="#9ca3af"
                fontFamily="SF Mono, monospace"
                fontSize="9.5">
                {n.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </StyledArchitectureSection>
  );
};

export default Architecture;
