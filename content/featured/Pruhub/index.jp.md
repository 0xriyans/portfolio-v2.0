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

Prudential にて Apache Flink から**Quarkus**への移行を実施し、コンテナメモリ使用量を**1.5 GB 超から 300 MB 未満**（**60%以上削減**）へ圧縮。手動オフセットコミットによるゼロロス**Apache Kafka**と**PostgreSQL ACID 台帳**により、資金引き出し処理を**2 営業日からリアルタイム**へ刷新。
