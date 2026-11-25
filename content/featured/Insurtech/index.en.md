---
date: '1'
title: 'Portal Bisnis Askrindo'
company: 'Askrindo'
cover: './insurtech-cover.png'
external: 'https://insurtech.askrindo.co.id/'
showInProjects: true
tech:
  - Java
  - Spring Boot
  - Angular
  - PostgreSQL
  - Redis
  - Midtrans
---

Full-stack B2B and B2C general insurance platform at Askrindo built with Angular and Java Spring Boot. Midtrans payment concurrency is guarded in two layers: Redis mutex `SET lock:pay:{order_id} NX EX 30` plus database pessimistic lock `SELECT ... FOR UPDATE`, returning idempotent HTTP `200` for losing webhooks.
