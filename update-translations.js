const fs = require('fs');

const en = require('./locales/en/translation.json');
const id = require('./locales/id/translation.json');
const jp = require('./locales/jp/translation.json');

const keys = {
  "tech_backend_title": { en: "Backend & Architecture", id: "Arsitektur & Backend", jp: "バックエンドアーキテクチャ" },
  "tech_backend_skills": { en: "Java, Spring Boot, Quarkus, System Design, Microservices", id: "Java, Spring Boot, Quarkus, System Design, Microservices", jp: "Java, Spring Boot, Quarkus, システム設計, マイクロサービス" },
  "tech_frontend_title": { en: "Frontend Experiences", id: "Pengalaman Frontend", jp: "フロントエンド開発" },
  "tech_frontend_skills": { en: "React, Angular, TypeScript, Tailwind CSS, Web Perf", id: "React, Angular, TypeScript, Tailwind CSS, Web Perf", jp: "React, Angular, TypeScript, Tailwind CSS, Web Perf" },
  "tech_data_title": { en: "Data & Messaging", id: "Data & Pesan", jp: "データ通信・メッセージング" },
  "tech_data_skills": { en: "PostgreSQL, MongoDB, Kafka, RabbitMQ, Redis", id: "PostgreSQL, MongoDB, Kafka, RabbitMQ, Redis", jp: "PostgreSQL, MongoDB, Kafka, RabbitMQ, Redis" },
  "tech_cloud_title": { en: "Cloud & DevOps", id: "Cloud & DevOps", jp: "クラウド・DevOps" },
  "tech_cloud_skills": { en: "Kubernetes, AWS, Docker, CI/CD, Nginx, Shell", id: "Kubernetes, AWS, Docker, CI/CD, Nginx, Shell", jp: "Kubernetes, AWS, Docker, CI/CD, Nginx, Shell" },
  "tech_observability_title": { en: "Observability & QA", id: "Observability & QA", jp: "監視・QA" },
  "tech_observability_skills": { en: "ELK Stack, SonarQube, K6, JMeter, TDD", id: "ELK Stack, SonarQube, K6, JMeter, TDD", jp: "ELK Stack, SonarQube, K6, JMeter, TDD" },
  "tech_enterprise_title": { en: "Enterprise Integration", id: "Integrasi Enterprise", jp: "エンタープライズ統合" },
  "tech_enterprise_skills": { en: "AI (OCR/Biometric), IBM BPM, GraphQL, REST APIs", id: "AI (OCR/Biometric), IBM BPM, GraphQL, REST APIs", jp: "AI (OCR/Biometric), IBM BPM, GraphQL, REST APIs" }
};

for (const [key, trans] of Object.entries(keys)) {
  en[key] = trans.en;
  id[key] = trans.id;
  jp[key] = trans.jp;
}

fs.writeFileSync('./locales/en/translation.json', JSON.stringify(en, null, 2));
fs.writeFileSync('./locales/id/translation.json', JSON.stringify(id, null, 2));
fs.writeFileSync('./locales/jp/translation.json', JSON.stringify(jp, null, 2));
console.log("Translations updated!");
