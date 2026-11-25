---
date: '2025-01-01'
title: 'Software Engineer (Full Stack)'
company: 'PT Asuransi Kredit Indonesia (Askrindo)'
tabLabel: 'Askrindo — Current Period'
location: 'Jakarta, Indonesia'
range: '2025 – Present'
url: 'https://askrindo.co.id/'
tech:
  - Java
  - Spring Boot
  - Angular
  - Redis
  - PostgreSQL
  - Midtrans
---

- Architect and develop full-stack B2B and B2C insurance platforms (**Portal Bisnis Askrindo**) using Java Spring Boot and Angular.
- Guard Midtrans payment concurrency in two layers: Redis mutex `SET lock:pay:{order_id} NX EX 30` plus database pessimistic lock `SELECT ... FOR UPDATE`, returning idempotent HTTP `200` for losing webhooks.
- Optimize PostgreSQL and Microsoft SQL Server transactions for high-volume policy issuance and premium collections.
