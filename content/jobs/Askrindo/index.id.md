---
date: '2025-01-01'
title: 'Software Engineer (Full Stack)'
company: 'PT Asuransi Kredit Indonesia (Askrindo)'
tabLabel: 'Askrindo — Periode Sekarang'
location: 'Jakarta, Indonesia'
range: '2025 – Sekarang'
url: 'https://askrindo.co.id/'
tech:
  - Java
  - Spring Boot
  - Angular
  - Redis
  - PostgreSQL
  - Midtrans
---

- Merancang dan membangun platform asuransi B2B dan B2C secara full-stack (**Portal Bisnis Askrindo**) menggunakan Java Spring Boot dan Angular.
- Mengamankan konkurensi pembayaran Midtrans dalam dua lapis: Redis mutex `SET lock:pay:{order_id} NX EX 30` ditambah database pessimistic lock `SELECT ... FOR UPDATE`, dengan respons idempotent HTTP `200` untuk webhook yang kalah.
- Mengoptimalkan transaksi PostgreSQL dan Microsoft SQL Server untuk penerbitan polis dan penagihan premi.
