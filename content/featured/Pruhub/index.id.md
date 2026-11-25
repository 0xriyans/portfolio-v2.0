---
date: '2'
title: 'Pruhub Framework Migration & Withdrawals'
company: 'Prudential'
diagram: 'pruhub'
external: ''
showInProjects: true
tech:
  - Quarkus
  - Apache Kafka
  - PostgreSQL
  - Couchbase
  - Kubernetes
  - Docker
---

Migrasi framework backend di Prudential dari Apache Flink ke **Quarkus**, menurunkan memori container dari di atas **1,5 GB menjadi di bawah 300 MB** (**pengurangan 60%+**). Mengubah proses penarikan dana dari **2 hari kerja menjadi real-time** dengan **Apache Kafka** manual offset commit _zero-loss_ dan **PostgreSQL ACID ledger**.
