---
date: '2025-01-01'
title: 'Software Engineer (Full Stack)'
company: 'PT Asuransi Kredit Indonesia (Askrindo)'
tabLabel: 'Askrindo — 現在の在籍期間'
location: 'Jakarta, Indonesia'
range: '2025 – 現在'
url: 'https://askrindo.co.id/'
tech:
  - Java
  - Spring Boot
  - Angular
  - Redis
  - PostgreSQL
  - Midtrans
---

- Java Spring Boot と Angular を用い、B2B および B2C 向け保険プラットフォーム（**Portal Bisnis Askrindo**）のフルスタック設計・開発を担当。
- Midtrans 決済の同時実行制御を Redis ミューテックス `SET lock:pay:{order_id} NX EX 30` と DB 悲観ロック `SELECT ... FOR UPDATE` の二層で保護し、競合 Webhook には冪等な HTTP `200` を返却。
- PostgreSQL および Microsoft SQL Server のトランザクション最適化を実施。
