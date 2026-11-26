import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Generates static/Riyan Sugiarto Resume.pdf directly from verified Section 2 content.
 * Pure Node PDF 1.4 generator (no external PDF binary dependencies).
 */
const SECTIONS = [
  {
    heading: 'RIYAN SUGIARTO',
    style: 'title',
    lines: [
      'Software Engineer (backend-first, end-to-end) | Jakarta, Indonesia | 6+ Years Experience',
      'Email: ryansgrt23@gmail.com | Status: Open for Freelance',
      'GitHub: github.com/0xriyans | LinkedIn: linkedin.com/in/riyan-sugiarto | X: @0xriyans',
      'Fiverr: fiverr.com/riyansugiarto | Upwork: upwork.com/freelancers/~0111240786693d428e',
    ],
  },
  {
    heading: 'SUMMARY',
    style: 'section',
    lines: [
      'Software Engineer based in Indonesia (6+ years) designing backend systems, APIs, and',
      'databases end-to-end — covering system architecture, frontend UIs, and applied AI workflows.',
      'Strong believer in maintainable code, pragmatic trade-offs, and pragmatic system design.',
    ],
  },
  {
    heading: 'VERIFIED ENGINEERING IMPACT',
    style: 'section',
    lines: [
      '- Pruhub (Prudential): Reduced container memory from >1.5 GB to <300 MB (60%+ reduction)',
      '  in the Apache Flink to Quarkus microservices migration.',
      '- Pruhub (Prudential): Cut fund withdrawal turnaround from 2 business days to real-time',
      '  with zero-loss Apache Kafka manual offset commits and PostgreSQL ACID ledger.',
      '- Portal Bisnis Askrindo: Guarded Midtrans payment concurrency in two layers — Redis mutex',
      '  (SET lock:pay:{order_id} NX EX 30) + PostgreSQL SELECT ... FOR UPDATE, HTTP 200 idempotent.',
    ],
  },
  {
    heading: 'WORK EXPERIENCE',
    style: 'section',
    lines: [
      '1. 2025 - Present | PT Asuransi Kredit Indonesia (Askrindo) — Software Engineer (Current)',
      '   Portal Bisnis Askrindo, two-layer Midtrans payment locking, core underwriting & claims APIs.',
      '2. 2024 - 2025 | MSIG Life — Full-Stack Software Engineer',
      '   Digital onboarding, OCR integration, biometric liveness detection, TTS / STT workflows.',
      '3. 2023 - 2024 | Prudential — Backend Developer',
      '   Pruhub Flink-to-Quarkus migration, zero-loss Kafka manual offset pipelines, ACID ledger.',
      '4. 2022 - 2023 | XL Axiata — API Developer',
      '   Legacy SOAR / TIBCO migration to Spring Boot & Spring Cloud microservices.',
      '5. 2020 - 2022 | PT Asuransi Kredit Indonesia (Askrindo) — Full-Stack Developer (First Period)',
      '   Core insurance systems, Agunan Bank Online & e-Materai, PEN, and Surety Bond Online.',
    ],
  },
  {
    heading: 'PRODUCTION PROJECTS (13 NAMED SYSTEMS)',
    style: 'section',
    lines: [
      '- Portal Bisnis Askrindo, Agunan Bank Online & e-Materai, Pemulihan Ekonomi Nasional (PEN),',
      '  Surety Bond Online, Fortify Digital Life Insurance, Andromeda Agency Financing,',
      '  PruServices AI e-KYC, Pruhub Framework Migration & Withdrawals,',
      '  XL Fulfillment Policy Engine, XL Incident Notification, XL Info Paket,',
      '  XL Info Quota, XL Bulk IMEI Registration.',
    ],
  },
  {
    heading: 'TECHNOLOGY STACK',
    style: 'section',
    lines: [
      'Core: Java, Spring Boot / Spring Cloud, Quarkus, Apache Kafka, PostgreSQL, Kubernetes, Docker',
      'Languages: Java, Python, TypeScript, JavaScript, SQL',
      'Backend: Spring Boot, Spring Cloud, FastAPI, Quarkus, Node.js, Express',
      'AI & LLM: Google Gemini, Anthropic, OpenAI API, LangChain, Hugging Face, Ollama, RAG & Agents',
      'Frontend: React, Next.js, Tailwind CSS, Vite, Angular',
      'Data & Messaging: PostgreSQL, SQL Server, MongoDB, Redis, SQLModel, Apache Kafka, RabbitMQ,',
      '  Couchbase, MySQL, Oracle',
      'Infra & Tooling: Docker, Kubernetes, AWS, SonarQube, JUnit, Git, Postman',
      'Exploring (not production mastered): Solidity, Ethereum, Web3.js (autonomous AI agents & Web3)',
    ],
  },
];

function escapePdfText(str) {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function buildPdfStream() {
  const ops = [];
  let y = 760;

  for (const sec of SECTIONS) {
    if (sec.style === 'title') {
      ops.push('BT', '/F2 18 Tf', `48 ${y} Td`, `(${escapePdfText(sec.heading)}) Tj`, 'ET');
      y -= 20;
    } else {
      y -= 6;
      ops.push('BT', '/F2 10.5 Tf', `48 ${y} Td`, `(${escapePdfText(sec.heading)}) Tj`, 'ET');
      y -= 5;
      ops.push(`0.7 w 48 ${y} m 564 ${y} l S`);
      y -= 13;
    }

    for (const line of sec.lines) {
      ops.push('BT', '/F1 9.2 Tf', `48 ${y} Td`, `(${escapePdfText(line)}) Tj`, 'ET');
      y -= 12.2;
    }
    y -= 4;
  }

  return ops.join('\n');
}

function buildPdfBuffer(contentStream) {
  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
    `6 0 obj\n<< /Length ${Buffer.byteLength(contentStream, 'utf8')} >>\nstream\n${contentStream}\nendstream\nendobj\n`,
  ];

  let body = '%PDF-1.4\n';
  const offsets = [0];
  for (const obj of objects) {
    offsets.push(Buffer.byteLength(body, 'utf8'));
    body += obj;
  }
  const xrefStart = Buffer.byteLength(body, 'utf8');
  body += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    body += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;
  return Buffer.from(body, 'utf8');
}

const outPath = path.join(__dirname, '..', 'public', 'Riyan Sugiarto Resume.pdf');
fs.writeFileSync(outPath, buildPdfBuffer(buildPdfStream()));
console.log('Generated CV:', outPath);
