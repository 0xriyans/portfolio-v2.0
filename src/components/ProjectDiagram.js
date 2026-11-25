import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DiagramFrame = styled.div`
  width: 100%;
  height: 100%;
  min-height: ${({ compact }) => (compact ? '200px' : '240px')};
  background-color: #091538;
  background-image: linear-gradient(rgba(34, 57, 111, 0.32) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 57, 111, 0.32) 1px, transparent 1px);
  background-size: 24px 24px;
  border-radius: 14px;
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

  @media (max-width: 768px) {
    min-height: ${({ compact }) => (compact ? '180px' : '200px')};
  }
`;

const DIAGRAMS = {
  pruhub: {
    header: 'PRUHUB MIGRATION & REAL-TIME WITHDRAWALS',
    badge: '>1.5 GB -> <300 MB (60%+)  |  2 DAYS -> REAL-TIME',
    nodes: [
      { x: 24, y: 112, w: 120, h: 66, title: 'Policy Request', sub: 'Quarkus REST' },
      { x: 174, y: 112, w: 130, h: 66, title: 'Apache Kafka', sub: 'Manual Offset' },
      { x: 334, y: 112, w: 130, h: 66, title: 'Quarkus Worker', sub: 'Zero-Loss ETL' },
      { x: 494, y: 112, w: 122, h: 66, title: 'PostgreSQL', sub: 'ACID Ledger' },
    ],
    footer: 'Apache Flink migrated to Quarkus + Couchbase + IBM BPM',
  },
  pruservices: {
    header: 'PRUSERVICES AI E-KYC PIPELINE',
    badge: 'OCR + BIOMETRIC LIVENESS',
    nodes: [
      { x: 24, y: 112, w: 120, h: 66, title: 'Customer App', sub: 'ID + Selfie' },
      { x: 174, y: 112, w: 130, h: 66, title: 'Spring Gateway', sub: 'OAuth2 / JWT' },
      { x: 334, y: 112, w: 130, h: 66, title: 'AI e-KYC Engine', sub: 'OCR + Liveness' },
      { x: 494, y: 112, w: 122, h: 66, title: 'Policy Service', sub: 'Kafka + DB' },
    ],
    footer: 'Identity Extraction -> Liveness Check -> Audit Persist',
  },
  ematerai: {
    header: 'AGUNAN BANK ONLINE & E-MATERAI',
    badge: 'KEMENKEU REAL-TIME STAMPING',
    nodes: [
      { x: 24, y: 112, w: 120, h: 66, title: 'Bank Portal', sub: 'Angular UI' },
      { x: 174, y: 112, w: 130, h: 66, title: 'Spring Boot', sub: 'Collateral API' },
      { x: 334, y: 112, w: 130, h: 66, title: 'Kemenkeu API', sub: 'e-Materai Sign' },
      { x: 494, y: 112, w: 122, h: 66, title: 'PostgreSQL', sub: 'JasperReports' },
    ],
    footer: 'Collateral Submission -> Stamp Serial Lock -> Signed PDF',
  },
  surety: {
    header: 'SURETY BOND ONLINE',
    badge: 'DIGITAL GUARANTEE ISSUANCE',
    nodes: [
      { x: 24, y: 112, w: 120, h: 66, title: 'Principal / Bank', sub: 'Web Client' },
      { x: 174, y: 112, w: 130, h: 66, title: 'Spring Boot', sub: 'Underwriting' },
      { x: 334, y: 112, w: 130, h: 66, title: 'Risk & Rules', sub: 'Validation' },
      { x: 494, y: 112, w: 122, h: 66, title: 'Core Ledger', sub: 'SQL Server / PG' },
    ],
    footer: 'Bond Application -> Approval Workflow -> Certificate Issue',
  },
  'xl-policy': {
    header: 'XL FULFILLMENT POLICY ENGINE',
    badge: 'SOAR / TIBCO -> SPRING BOOT',
    nodes: [
      { x: 24, y: 112, w: 120, h: 66, title: 'Order Trigger', sub: 'API Gateway' },
      { x: 174, y: 112, w: 130, h: 66, title: 'Policy Engine', sub: 'Spring Boot' },
      { x: 334, y: 112, w: 130, h: 66, title: 'Rule Store', sub: 'Oracle / MySQL' },
      { x: 494, y: 112, w: 122, h: 66, title: 'Fulfillment', sub: 'Event Broker' },
    ],
    footer: 'Legacy TIBCO Rules -> Decentralized Microservices',
  },
  'xl-incident': {
    header: 'XL INCIDENT NOTIFICATION',
    badge: 'REAL-TIME NETWORK ALERTS',
    nodes: [
      { x: 24, y: 112, w: 120, h: 66, title: 'NOC Monitor', sub: 'Alert Event' },
      { x: 174, y: 112, w: 130, h: 66, title: 'Kafka Stream', sub: 'Async Fan-out' },
      { x: 334, y: 112, w: 130, h: 66, title: 'Notify Service', sub: 'Spring Cloud' },
      { x: 494, y: 112, w: 122, h: 66, title: 'Dispatch Log', sub: 'PostgreSQL' },
    ],
    footer: 'Incident Ingest -> Deduplicate & Route -> Channel Dispatch',
  },
  'xl-paket': {
    header: 'XL INFO PAKET',
    badge: 'SUBSCRIBER PACKAGE QUERY',
    nodes: [
      { x: 24, y: 112, w: 120, h: 66, title: 'Subscriber', sub: 'Mobile / USSD' },
      { x: 174, y: 112, w: 130, h: 66, title: 'Spring API', sub: 'Package Query' },
      { x: 334, y: 112, w: 130, h: 66, title: 'Catalog Cache', sub: 'Low-Latency' },
      { x: 494, y: 112, w: 122, h: 66, title: 'Telco Core', sub: 'Oracle DB' },
    ],
    footer: 'MSISDN Lookup -> Active Offer Resolution -> Response',
  },
  'xl-quota': {
    header: 'XL INFO QUOTA',
    badge: 'BALANCE & USAGE AGGREGATOR',
    nodes: [
      { x: 24, y: 112, w: 120, h: 66, title: 'Client Req', sub: 'API Gateway' },
      { x: 174, y: 112, w: 130, h: 66, title: 'Quota Service', sub: 'Spring Boot' },
      { x: 334, y: 112, w: 130, h: 66, title: 'Usage Store', sub: 'MySQL / Cache' },
      { x: 494, y: 112, w: 122, h: 66, title: 'OCS / Billing', sub: 'Quota Sync' },
    ],
    footer: 'Subscriber Check -> Bucket Aggregation -> Normalized JSON',
  },
  'xl-imei': {
    header: 'XL BULK IMEI REGISTRATION',
    badge: 'BATCH INGESTION PIPELINE',
    nodes: [
      { x: 24, y: 112, w: 120, h: 66, title: 'Partner Batch', sub: 'IMEI Payload' },
      { x: 174, y: 112, w: 130, h: 66, title: 'Ingest API', sub: 'Spring Boot' },
      { x: 334, y: 112, w: 130, h: 66, title: 'Kafka Queue', sub: 'Worker Pool' },
      { x: 494, y: 112, w: 122, h: 66, title: 'Registry DB', sub: 'Audit & Status' },
    ],
    footer: 'Bulk Upload -> Schema Validate -> Async IMEI Registration',
  },
};

const ProjectDiagram = ({ type, title, compact = false }) => {
  const cfg = DIAGRAMS[type] || {
    header: `${(title || 'Production System').toUpperCase()}`,
    badge: 'PRODUCTION ARCHITECTURE',
    nodes: [
      { x: 24, y: 112, w: 120, h: 66, title: 'Client', sub: 'API Request' },
      { x: 174, y: 112, w: 130, h: 66, title: 'Spring Boot', sub: 'Microservice' },
      { x: 334, y: 112, w: 130, h: 66, title: 'Apache Kafka', sub: 'Event Bus' },
      { x: 494, y: 112, w: 122, h: 66, title: 'PostgreSQL', sub: 'Persistence' },
    ],
    footer: 'High-Availability Production Architecture',
  };

  return (
    <DiagramFrame compact={compact} role="img" aria-label={`${title} architecture diagram`}>
      <svg viewBox="0 0 640 290" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker
            id={`arrow-${type || 'default'}`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#FCF1D0" />
          </marker>
        </defs>

        <rect x="0" y="0" width="640" height="38" fill="#0D1C42" />
        <line x1="0" y1="38" x2="640" y2="38" stroke="#22396F" strokeWidth="1" />
        <text
          x="20"
          y="23"
          fill="#FCF1D0"
          fontFamily="Calibre, Inter, sans-serif"
          fontSize="12"
          fontWeight="600"
          letterSpacing="0.03em">
          {cfg.header}
        </text>

        <rect
          x="20"
          y="54"
          width="600"
          height="28"
          rx="14"
          fill="#0D1C42"
          stroke="#22396F"
          strokeWidth="1"
        />
        <text
          x="320"
          y="72"
          textAnchor="middle"
          fill="#FCF1D0"
          fontFamily="Calibre, Inter, sans-serif"
          fontSize="11.5"
          fontWeight="600">
          {cfg.badge}
        </text>

        {[0, 1, 2].map(idx => {
          const from = cfg.nodes[idx];
          const to = cfg.nodes[idx + 1];
          const x1 = from.x + from.w;
          const x2 = to.x - 4;
          const y = from.y + from.h / 2;
          return (
            <line
              key={idx}
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              stroke="#FCF1D0"
              strokeWidth="1.75"
              strokeOpacity="0.85"
              markerEnd={`url(#arrow-${type || 'default'})`}
            />
          );
        })}

        {cfg.nodes.map((node, idx) => (
          <g key={idx}>
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height={node.h}
              rx="10"
              fill="#0D1C42"
              stroke="#22396F"
              strokeWidth="1.5"
            />
            <text
              x={node.x + node.w / 2}
              y={node.y + 28}
              textAnchor="middle"
              fill="#FCF1D0"
              fontFamily="Calibre, Inter, sans-serif"
              fontSize="12.5"
              fontWeight="600">
              {node.title}
            </text>
            <text
              x={node.x + node.w / 2}
              y={node.y + 47}
              textAnchor="middle"
              fill="#98A9CC"
              fontFamily="Calibre, Inter, sans-serif"
              fontSize="11">
              {node.sub}
            </text>
          </g>
        ))}

        <rect x="0" y="246" width="640" height="44" fill="#0D1C42" />
        <line x1="0" y1="246" x2="640" y2="246" stroke="#22396F" strokeWidth="1" />
        <text
          x="320"
          y="272"
          textAnchor="middle"
          fill="#D5DCEB"
          fontFamily="Calibre, Inter, sans-serif"
          fontSize="11.5">
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
