import { TimelineComponent07, type ExperienceStep } from './ui/shadcn-studio-timeline-component-07';

export const RIYAN_EXPERIENCE_STEPS: ExperienceStep[] = [
  {
    id: '01',
    company: 'PT Asuransi Kredit Indonesia (Askrindo)',
    role: 'Software Engineer',
    period: '2025 – Present',
    status: { text: 'Present', tone: 'positive' },
    stack: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'SQL Server', 'Redis', 'Midtrans'],
    achievement:
      'Guarded Midtrans webhook concurrency in two layers (Redis mutex + DB pessimistic lock)',
    description:
      'End-to-end architecture and H2H integration for Portal Bisnis Askrindo & AOS Jatim across 6 general insurance lines. Delivered multi-facility premium calculation and idempotent payment reconciliation.',
  },
  {
    id: '02',
    company: 'PT MSIG Life Indonesia',
    role: 'Full-Stack Software Engineer',
    period: '2024 – 2025',
    stack: [
      'Java',
      'Spring Cloud',
      'Apache Kafka',
      'Spring Batch',
      'OCR & Biometrics',
      'PostgreSQL',
    ],
    achievement:
      'Integrated touchless OCR extraction, biometric Liveness Detection, and TTS/STT pipelines',
    description:
      'Distributed Spring Cloud microservices powering public policy submission (Fortify) and internal Agency Financing compensation/risk calculations (Andromeda) backed by Kafka event streaming.',
  },
  {
    id: '03',
    company: 'Prudential',
    role: 'Backend Developer',
    period: '2023 – 2024',
    stack: ['Quarkus', 'Apache Kafka', 'PostgreSQL', 'Couchbase', 'IBM BPM / BRMS', 'Kubernetes'],
    achievement:
      'Cut container memory by 60%+ (>1.5 GB → <300 MB) and withdrawal SLA from 2 days to real-time',
    description:
      'Led Pruhub framework migration from Apache Flink to container-native Quarkus microservices with zero-loss Kafka manual offset commits, automated decision rules, and a PostgreSQL ACID ledger.',
  },
  {
    id: '04',
    company: 'PT XL Axiata',
    role: 'API Developer',
    period: '2022 – 2023',
    stack: ['Java', 'Spring Boot', 'Spring Cloud', 'Solace', 'RabbitMQ', 'Oracle', 'K6'],
    achievement:
      'Migrated legacy TIBCO / SOAR monolith workflows to decentralized Spring Boot microservices',
    description:
      'Delivered XL Fulfillment Policy Engine, live stream caching for Info Paket & Info Quota, outage incident SMS alerts, and DB-partitioned bulk IMEI registration verified with K6 load testing.',
  },
  {
    id: '05',
    company: 'PT Asuransi Kredit Indonesia (Askrindo)',
    role: 'Full-Stack Developer',
    period: '2020 – 2022',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'SQL Server', 'JasperReports', 'Nginx'],
    achievement:
      'Synchronized Ministry of Finance relief for PEN & automated point-of-sale e-Materai stamping',
    description:
      'Engineered backend modules for Pemulihan Ekonomi Nasional (PEN), Agunan Bank Online collateral issuance up to Rp 10B, and automated JasperReports reconciliation pipelines.',
  },
];

export function ExperienceTimeline() {
  return <TimelineComponent07 data={RIYAN_EXPERIENCE_STEPS} eyebrow="" heading="" />;
}
