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

Platform asuransi umum B2B dan B2C secara full-stack di Askrindo menggunakan Angular dan Java Spring Boot. Konkurensi pembayaran Midtrans diamankan dua lapis: Redis mutex `SET lock:pay:{order_id} NX EX 30` serta database pessimistic lock `SELECT ... FOR UPDATE`, dengan respons idempotent HTTP `200` untuk webhook yang kalah.
