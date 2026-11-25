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

Askrindo の B2B・B2C 損害保険プラットフォームを Angular と Java Spring Boot でフルスタック構築。Midtrans 決済の同時実行制御は Redis ミューテックス `SET lock:pay:{order_id} NX EX 30` と DB 悲観ロック `SELECT ... FOR UPDATE` の二層で保護し、競合 Webhook には冪等な HTTP `200` を返却。
