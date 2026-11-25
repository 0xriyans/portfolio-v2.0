import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';

const flowDash = keyframes`
  from {
    stroke-dashoffset: 24;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const DiagramFrame = styled.div`
  width: 100%;
  height: 100%;
  min-height: ${({ compact }) => (compact ? '190px' : '240px')};
  background: #070c0a;
  border: 1px solid rgba(0, 255, 102, 0.28);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .flow-line {
    stroke-dasharray: 6 6;
    ${({ animateFlow }) =>
    animateFlow
      ? css`
            animation: ${flowDash} 1.6s linear infinite;
          `
      : css`
            stroke-dasharray: none;
          `}
  }

  @media (max-width: 768px) {
    min-height: ${({ compact }) => (compact ? '180px' : '200px')};
  }
`;

const DIAGRAMS = {
  pruhub: {
    header: 'ARCH // PRUHUB MIGRATION & REAL-TIME WITHDRAWALS',
    badge: '>1.5 GB -> <300 MB (60%+) | 2 DAYS -> REAL-TIME',
    nodes: [
      { x: 24, y: 115, w: 120, h: 66, title: 'Policy Request', sub: 'Quarkus REST' },
      { x: 174, y: 115, w: 130, h: 66, title: 'Apache Kafka', sub: 'Manual Offset' },
      { x: 334, y: 115, w: 130, h: 66, title: 'Quarkus Worker', sub: 'Zero-Loss ETL' },
      { x: 494, y: 115, w: 122, h: 66, title: 'PostgreSQL', sub: 'ACID Ledger' },
    ],
    footer: 'LEGACY: Apache Flink -> REPLACED BY: Quarkus + Couchbase + IBM BPM',
  },
  pruservices: {
    header: 'ARCH // PRUSERVICES AI E-KYC PIPELINE',
    badge: 'OCR + BIOMETRIC LIVENESS',
    nodes: [
      { x: 24, y: 115, w: 120, h: 66, title: 'Customer App', sub: 'ID + Selfie' },
      { x: 174, y: 115, w: 130, h: 66, title: 'Spring Gateway', sub: 'OAuth2 / JWT' },
      { x: 334, y: 115, w: 130, h: 66, title: 'AI e-KYC Engine', sub: 'OCR + Liveness' },
      { x: 494, y: 115, w: 122, h: 66, title: 'Policy Service', sub: 'Kafka + DB' },
    ],
    footer: 'PIPELINE: Identity Extraction -> Liveness Check -> Audit Persist',
  },
  ematerai: {
    header: 'ARCH // AGUNAN BANK ONLINE & E-MATERAI',
    badge: 'KEMENKEU REAL-TIME STAMPING',
    nodes: [
      { x: 24, y: 115, w: 120, h: 66, title: 'Bank Portal', sub: 'Angular UI' },
      { x: 174, y: 115, w: 130, h: 66, title: 'Spring Boot', sub: 'Collateral API' },
      { x: 334, y: 115, w: 130, h: 66, title: 'Kemenkeu API', sub: 'e-Materai Sign' },
      { x: 494, y: 115, w: 122, h: 66, title: 'PostgreSQL', sub: 'JasperReports' },
    ],
    footer: 'FLOW: Collateral Submission -> Stamp Serial Lock -> Signed PDF',
  },
  surety: {
    header: 'ARCH // SURETY BOND ONLINE',
    badge: 'DIGITAL GUARANTEE ISSUANCE',
    nodes: [
      { x: 24, y: 115, w: 120, h: 66, title: 'Principal / Bank', sub: 'Web Client' },
      { x: 174, y: 115, w: 130, h: 66, title: 'Spring Boot', sub: 'Underwriting' },
      { x: 334, y: 115, w: 130, h: 66, title: 'Risk & Rules', sub: 'Validation' },
      { x: 494, y: 115, w: 122, h: 66, title: 'Core Ledger', sub: 'SQL Server / PG' },
    ],
    footer: 'FLOW: Bond Application -> Approval Workflow -> Certificate Issue',
  },
  'xl-policy': {
    header: 'ARCH // XL FULFILLMENT POLICY ENGINE',
    badge: 'SOAR / TIBCO -> SPRING BOOT',
    nodes: [
      { x: 24, y: 115, w: 120, h: 66, title: 'Order Trigger', sub: 'API Gateway' },
      { x: 174, y: 115, w: 130, h: 66, title: 'Policy Engine', sub: 'Spring Boot' },
      { x: 334, y: 115, w: 130, h: 66, title: 'Rule Store', sub: 'Oracle / MySQL' },
      { x: 494, y: 115, w: 122, h: 66, title: 'Fulfillment', sub: 'Event Broker' },
    ],
    footer: 'MIGRATION: Legacy TIBCO Rules -> Decentralized Microservices',
  },
  'xl-incident': {
    header: 'ARCH // XL INCIDENT NOTIFICATION',
    badge: 'REAL-TIME NETWORK ALERTS',
    nodes: [
      { x: 24, y: 115, w: 120, h: 66, title: 'NOC Monitor', sub: 'Alert Event' },
      { x: 174, y: 115, w: 130, h: 66, title: 'Kafka Stream', sub: 'Async Fan-out' },
      { x: 334, y: 115, w: 130, h: 66, title: 'Notify Service', sub: 'Spring Cloud' },
      { x: 494, y: 115, w: 122, h: 66, title: 'Dispatch Log', sub: 'PostgreSQL' },
    ],
    footer: 'FLOW: Incident Ingest -> Deduplicate & Route -> Channel Dispatch',
  },
  'xl-paket': {
    header: 'ARCH // XL INFO PAKET',
    badge: 'SUBSCRIBER PACKAGE QUERY',
    nodes: [
      { x: 24, y: 115, w: 120, h: 66, title: 'Subscriber', sub: 'Mobile / USSD' },
      { x: 174, y: 115, w: 130, h: 66, title: 'Spring API', sub: 'Package Query' },
      { x: 334, y: 115, w: 130, h: 66, title: 'Catalog Cache', sub: 'Low-Latency' },
      { x: 494, y: 115, w: 122, h: 66, title: 'Telco Core', sub: 'Oracle DB' },
    ],
    footer: 'FLOW: MSISDN Lookup -> Active Offer Resolution -> Response',
  },
  'xl-quota': {
    header: 'ARCH // XL INFO QUOTA',
    badge: 'BALANCE & USAGE AGGREGATOR',
    nodes: [
      { x: 24, y: 115, w: 120, h: 66, title: 'Client Req', sub: 'API Gateway' },
      { x: 174, y: 115, w: 130, h: 66, title: 'Quota Service', sub: 'Spring Boot' },
      { x: 334, y: 115, w: 130, h: 66, title: 'Usage Store', sub: 'MySQL / Cache' },
      { x: 494, y: 115, w: 122, h: 66, title: 'OCS / Billing', sub: 'Quota Sync' },
    ],
    footer: 'FLOW: Subscriber Check -> Bucket Aggregation -> Normalized JSON',
  },
  'xl-imei': {
    header: 'ARCH // XL BULK IMEI REGISTRATION',
    badge: 'BATCH INGESTION PIPELINE',
    nodes: [
      { x: 24, y: 115, w: 120, h: 66, title: 'Partner Batch', sub: 'IMEI Payload' },
      { x: 174, y: 115, w: 130, h: 66, title: 'Ingest API', sub: 'Spring Boot' },
      { x: 334, y: 115, w: 130, h: 66, title: 'Kafka Queue', sub: 'Worker Pool' },
      { x: 494, y: 115, w: 122, h: 66, title: 'Registry DB', sub: 'Audit & Status' },
    ],
    footer: 'FLOW: Bulk Upload -> Schema Validate -> Async IMEI Registration',
  },
};

const ProjectDiagram = ({ type, title, compact = false }) => {
  const frameRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setInView(false);
      return;
    }
    const el = frameRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]) {
          setInView(entries[0].isIntersecting);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const animateFlow = inView && !prefersReducedMotion;

  const cfg = DIAGRAMS[type] || {
    header: `ARCH // ${(title || 'PRODUCTION SYSTEM').toUpperCase()}`,
    badge: 'PRODUCTION ARCHITECTURE',
    nodes: [
      { x: 24, y: 115, w: 120, h: 66, title: 'Client', sub: 'API Request' },
      { x: 174, y: 115, w: 130, h: 66, title: 'Spring Boot', sub: 'Microservice' },
      { x: 334, y: 115, w: 130, h: 66, title: 'Apache Kafka', sub: 'Event Bus' },
      { x: 494, y: 115, w: 122, h: 66, title: 'PostgreSQL', sub: 'Persistence' },
    ],
    footer: 'SYSTEM TOPOLOGY // HIGH-AVAILABILITY BACKEND',
  };

  return (
    <DiagramFrame
      ref={frameRef}
      compact={compact}
      animateFlow={animateFlow}
      role="img"
      aria-label={`${title} architecture diagram`}>
      <svg viewBox="0 0 640 300" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern
            id={`grid-${type || 'default'}`}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse">
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="rgba(0, 255, 102, 0.08)"
              strokeWidth="1"
            />
          </pattern>
          <marker
            id={`arrow-${type || 'default'}`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#00ff66" />
          </marker>
        </defs>

        <rect width="640" height="300" fill="#070c0a" />
        <rect width="640" height="300" fill={`url(#grid-${type || 'default'})`} />

        {/* Top Bar */}
        <rect x="0" y="0" width="640" height="36" fill="#0d1512" />
        <line x1="0" y1="36" x2="640" y2="36" stroke="rgba(0, 255, 102, 0.25)" strokeWidth="1" />
        <text
          x="18"
          y="22"
          fill="#00ff66"
          fontFamily="SF Mono, monospace"
          fontSize="11"
          fontWeight="700">
          {cfg.header}
        </text>

        {/* Badge */}
        <rect
          x="18"
          y="54"
          width="604"
          height="28"
          rx="3"
          fill="rgba(0, 255, 102, 0.07)"
          stroke="rgba(0, 255, 102, 0.35)"
          strokeWidth="1"
        />
        <text
          x="320"
          y="72"
          textAnchor="middle"
          fill="#b8ff00"
          fontFamily="SF Mono, monospace"
          fontSize="11"
          fontWeight="600">
          {cfg.badge}
        </text>

        {/* Connector Lines */}
        {[0, 1, 2].map(idx => {
          const from = cfg.nodes[idx];
          const to = cfg.nodes[idx + 1];
          const x1 = from.x + from.w;
          const x2 = to.x - 4;
          const y = from.y + from.h / 2;
          return (
            <line
              key={idx}
              className="flow-line"
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              stroke="#00ff66"
              strokeWidth="2"
              markerEnd={`url(#arrow-${type || 'default'})`}
            />
          );
        })}

        {/* Architecture Nodes */}
        {cfg.nodes.map((node, idx) => (
          <g key={idx}>
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height={node.h}
              rx="4"
              fill="#0d1512"
              stroke="#00ff66"
              strokeWidth="1.5"
            />
            <text
              x={node.x + node.w / 2}
              y={node.y + 28}
              textAnchor="middle"
              fill="#ffffff"
              fontFamily="SF Mono, monospace"
              fontSize="12"
              fontWeight="700">
              {node.title}
            </text>
            <text
              x={node.x + node.w / 2}
              y={node.y + 47}
              textAnchor="middle"
              fill="#9ca3af"
              fontFamily="SF Mono, monospace"
              fontSize="10">
              {node.sub}
            </text>
          </g>
        ))}

        {/* Footer */}
        <rect x="0" y="256" width="640" height="44" fill="#0d1512" />
        <line x1="0" y1="256" x2="640" y2="256" stroke="rgba(0, 255, 102, 0.2)" strokeWidth="1" />
        <text
          x="320"
          y="282"
          textAnchor="middle"
          fill="#d1d5db"
          fontFamily="SF Mono, monospace"
          fontSize="10.5">
          {cfg.footer}
        </text>
      </svg>
    </DiagramFrame>
  );
};

ProjectDiagram.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  compact: PropTypes.bool,
};

export default ProjectDiagram;
