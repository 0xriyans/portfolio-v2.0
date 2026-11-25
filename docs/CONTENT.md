# Site Content Source of Truth (`CONTENT.md`)

Single source of truth for all verified personal, career, project, stack, and contact content in English. Any unverified figure, claim, or repo detail is explicitly marked **`TODO`** and must not be published or invented.

---

## 1. Profile & Positioning

| Field                     | Verified Value                                                                                                                                                                                                                                      |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Full Name**             | Riyan Sugiarto                                                                                                                                                                                                                                      |
| **Title / Role**          | Backend Software Engineer (backend-first, end-to-end delivery)                                                                                                                                                                                      |
| **Location**              | Jakarta, Indonesia                                                                                                                                                                                                                                  |
| **Experience**            | `6+ years` (never `8+ years`)                                                                                                                                                                                                                       |
| **Current Employment**    | Software Engineer at PT Asuransi Kredit Indonesia (Askrindo), `2025–present` (never `Deputy VP of Engineering`)                                                                                                                                     |
| **Status**                | `Open for Freelance`                                                                                                                                                                                                                                |
| **Positioning Statement** | I design backend systems, APIs, and databases, and I also build products end-to-end covering system architecture, frontend UIs, and applied AI workflows, so features actually ship. Strong believer in maintainable code and pragmatic trade-offs. |
| **Currently Exploring**   | Autonomous AI agent workflows & Web3 fundamentals (`Solidity`, `Ethereum`, `Web3.js`)                                                                                                                                                               |

---

## 2. Contact & Email Correction (`P0 Fix`)

> **Critical P0 Email Fix:** The live production site currently displays `riyansgrt23@gmail.com` (with an unwanted `i` after `riyan`), which is **WRONG**. Every occurrence across UI text, metadata, `mailto:` links, footer, and contact forms MUST use **`ryansgrt23@gmail.com`** (confirmed already fixed in `src/config.js`, `package.json`, and `locales/*/translation.json` on the revamp branches — verify zero occurrences remain before release).

| Channel                    | Exact Verified Destination                                                                                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Email (CORRECT)**        | `ryansgrt23@gmail.com` (`mailto:ryansgrt23@gmail.com`)                                                                                                                                            |
| **Email (WRONG — Remove)** | ~~`riyansgrt23@gmail.com`~~                                                                                                                                                                       |
| **GitHub**                 | `@0xriyans` — `https://github.com/0xriyans`                                                                                                                                                       |
| **LinkedIn**               | `https://www.linkedin.com/in/riyan-sugiarto/`                                                                                                                                                     |
| **X (Twitter)**            | `@0xriyans` — `https://twitter.com/0xriyans`                                                                                                                                                      |
| **Fiverr**                 | `https://www.fiverr.com/riyansugiarto` (`Open for Freelance`)                                                                                                                                     |
| **Upwork**                 | `https://www.upwork.com/freelancers/~0111240786693d428e` (`Open for Freelance`)                                                                                                                   |
| **Resume PDF**             | `TODO`: Confirm whether [static/Riyan Sugiarto Resume.pdf](../static/Riyan%20Sugiarto%20Resume.pdf) also contains old `8+` / `riyansgrt23` / `Deputy VP` details and needs updating or unlinking. |

---

## 3. Work History (Render in Exact Order — 5 Separate Entries)

> **Duplicate Prevention Rule:** **Askrindo** appears **twice** in Riyan's career. Always render two distinct, separate entries with unmistakable periods (`2025–present` vs `2020–2022`), roles, and focus areas. Never combine or label them identically.

| Order | Period         | Company                                                        | Role & Differentiator                         | Verified Highlights                                                                                                                                                                                                                                                                                                                                 |
| ----- | -------------- | -------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | `2025–present` | **PT Asuransi Kredit Indonesia (Askrindo)** — _Current Period_ | Software Engineer (Full-Stack / Backend Lead) | Architects & builds B2B/B2C general insurance platforms (**Portal Bisnis Askrindo**) with Java Spring Boot and Angular; protects **Midtrans** payment concurrency using two-layer locking (Redis mutex `SET lock:pay:{order_id} NX EX 30` + DB pessimistic lock `SELECT ... FOR UPDATE`, idempotent HTTP `200` for losing webhooks).                |
| **2** | `2024–2025`    | **MSIG Life**                                                  | Full-Stack Software Engineer                  | Delivered digital life onboarding and agency financing platforms (**Fortify Digital Life Insurance**, **Andromeda Agency Financing**) covering backend services, frontends, OCR document extraction, biometric liveness verification, and TTS / STT integrations.                                                                                   |
| **3** | `2023–2024`    | **Prudential**                                                 | Backend Developer                             | Led **Pruhub** Apache Flink-to-Quarkus migration cutting container memory from `>1.5 GB` to `<300 MB` (`60%+` reduction); re-engineered fund withdrawals from `2 business days` to real-time backed by a **PostgreSQL ACID ledger**; built zero-loss **Apache Kafka** streaming with manual offset commit; contributed to **PruServices AI e-KYC**. |
| **4** | `2022–2023`    | **XL Axiata**                                                  | API Developer                                 | Migrated legacy **SOAR / TIBCO** integrations into **Spring Boot / Spring Cloud** microservices across core telco modules (**XL Fulfillment Policy Engine**, **XL Incident Notification**, **XL Info Paket**, **XL Info Quota**, **XL Bulk IMEI Registration**).                                                                                    |
| **5** | `2020–2022`    | **PT Asuransi Kredit Indonesia (Askrindo)** — _First Period_   | Full-Stack Developer (Core & e-Materai)       | First tenure building core credit guarantee and government-backed platforms: **Agunan Bank Online & e-Materai** (Kemenkeu real-time stamp duty integration), **Pemulihan Ekonomi Nasional (PEN)**, and **Surety Bond Online**.                                                                                                                      |

---

## 4. Production Projects (13 Named Systems)

Show the top **4–6** strongest systems in the main staggered Selected Work grid and present all **13** in the full portfolio list / `/archive`.

| #   | Project Name                                 | Company                   | Content Folder                             | Recommended Tier    | Verified Summary                                                                                                                                                                                   |
| --- | -------------------------------------------- | ------------------------- | ------------------------------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Portal Bisnis Askrindo**                   | Askrindo (`2025–present`) | `content/featured/Insurtech/`              | Main Grid           | B2B/B2C insurance platform (`insurtech.askrindo.co.id`); two-layer Midtrans concurrency lock (Redis `SET lock:pay:{order_id} NX EX 30` + `SELECT ... FOR UPDATE`, HTTP `200` idempotent webhooks). |
| 2   | **Pruhub Framework Migration & Withdrawals** | Prudential (`2023–2024`)  | `content/featured/Pruhub/`                 | Main Grid           | Flink-to-Quarkus migration (`>1.5 GB -> <300 MB`), withdrawals from `2 business days -> real-time`, zero-loss Kafka manual offset commit, PostgreSQL ACID ledger.                                  |
| 3   | **Fortify Digital Life Insurance**           | MSIG Life (`2024–2025`)   | `content/featured/Fortify/`                | Main Grid           | Digital life insurance & onboarding (`fortify.msiglife.co.id`) with Java Spring Boot, Kafka, OCR, biometric liveness, and TTS/STT flows.                                                           |
| 4   | **Andromeda Agency Financing**               | MSIG Life (`2024–2025`)   | `content/featured/Andromeda/`              | Main Grid           | Agency financing & compensation platform (`andromeda.msiglife.co.id`) with Java Spring Boot, Spring Cloud, PostgreSQL, and SQL Server.                                                             |
| 5   | **Pemulihan Ekonomi Nasional (PEN)**         | Askrindo (`2020–2022`)    | `content/featured/Penjaminan_KMK_PEN/`     | Main Grid           | Working capital credit guarantee platform (`askrindo.co.id/penjaminan-kmk-pen`) built with Spring Boot, Angular, PostgreSQL, SQL Server, JasperReports.                                            |
| 6   | **PruServices AI e-KYC**                     | Prudential (`2023–2024`)  | `content/featured/PruServices/`            | Main Grid           | Digital customer verification & AI e-KYC pipeline integrating OCR extraction and biometric liveness with Kafka audit streaming.                                                                    |
| 7   | **Agunan Bank Online & e-Materai**           | Askrindo (`2020–2022`)    | `content/projects/AgunanEMaterai/`         | Full List / Archive | Online bank collateral workflow with real-time Ministry of Finance (`Kemenkeu`) electronic stamp duty integration.                                                                                 |
| 8   | **Surety Bond Online**                       | Askrindo (`2020–2022`)    | `content/projects/SuretyBondOnline/`       | Full List / Archive | Digital surety bond issuance, underwriting workflow, and certificate reporting platform.                                                                                                           |
| 9   | **XL Fulfillment Policy Engine**             | XL Axiata (`2022–2023`)   | `content/projects/XlFulfillmentPolicy/`    | Full List / Archive | Core telecom fulfillment rule & policy microservices migrated from legacy SOAR / TIBCO.                                                                                                            |
| 10  | **XL Incident Notification**                 | XL Axiata (`2022–2023`)   | `content/projects/XlIncidentNotification/` | Full List / Archive | Event-driven telco incident alerting service built with Spring Boot, Spring Cloud, and Kafka.                                                                                                      |
| 11  | **XL Info Paket**                            | XL Axiata (`2022–2023`)   | `content/projects/XlInfoPaket/`            | Full List / Archive | High-traffic subscriber package query microservice replacing legacy TIBCO flows.                                                                                                                   |
| 12  | **XL Info Quota**                            | XL Axiata (`2022–2023`)   | `content/projects/XlInfoQuota/`            | Full List / Archive | Subscriber quota & balance aggregation microservice behind low-latency REST endpoints.                                                                                                             |
| 13  | **XL Bulk IMEI Registration**                | XL Axiata (`2022–2023`)   | `content/projects/XlBulkImei/`             | Full List / Archive | Batch partner IMEI validation and Kafka-backed asynchronous registration pipeline.                                                                                                                 |

_(Legacy/personal repo folders currently hidden with `showInProjects: false`: `Orion`, `DevSecOpsBot`, `FoodAllergy`, `Resumai`, `AmazoneClone`, `Mybel`, `Warteg`.)_

---

## 5. Verified Metrics & Content Exclusions

### Verified Metrics Only (Safe for Display & Counter Animation)

1. **Pruhub Memory Footprint:** Container memory reduced from **`> 1.5 GB`** to **`< 300 MB`** (**`60%+` reduction**) via Apache Flink -> Quarkus migration.
2. **Pruhub Withdrawal Speed:** Fund withdrawal settlement reduced from **`2 business days`** to **`real-time`**.
3. **Pruhub Stream Reliability:** **Zero-loss Apache Kafka** event ingestion using **manual offset commit** + **PostgreSQL ACID ledger**.
4. **Portal Bisnis Midtrans Concurrency:** Two-layer guard — Redis mutex **`SET lock:pay:{order_id} NX EX 30`** + PostgreSQL pessimistic lock **`SELECT ... FOR UPDATE`** with **idempotent HTTP `200`** responses for losing webhooks.

### Forbidden / Removed Claims

- **NEVER** show `8+ years` (always **`6+ years`**).
- **NEVER** show `Deputy VP of Engineering` (always **`Software Engineer`** at Askrindo).
- **NEVER** show `100+ projects delivered`.
- **NEVER** show `40+ technologies mastered`.
- **NEVER** show `99.9% uptime`.
- **NEVER** present **Go** as primary stack or **Web3/Solidity** as mastered expertise.
- **`TODO` — Confirm or Exclude:** `"92% faster processing"` — keep **excluded** unless you confirm the exact system and measurable source behind that number.

---

## 6. Technology Stack Groups

- **Core Lead Stack (Featured Fan):** `Java`, `Spring Boot / Spring Cloud`, `Quarkus`, `Apache Kafka`, `PostgreSQL`, `Kubernetes`, `Docker`.

| Group                          | Verified Stack Items                                                                              | Notes                                                                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Languages**                  | `Java`, `Python`, `TypeScript`, `JavaScript`, `SQL`                                               | Core: Java                                                                                                                            |
| **Backend**                    | `Spring Boot`, `Spring Cloud`, `FastAPI`, `Quarkus`, `Node.js`, `Express`                         | Backend-first specialization                                                                                                          |
| **AI & LLM**                   | `Google Gemini`, `Anthropic`, `OpenAI API`, `LangChain`, `Hugging Face`, `Ollama`, `RAG & Agents` | Applied AI workflows                                                                                                                  |
| **Frontend**                   | `React`, `Next.js`, `Tailwind CSS`, `Vite`, `Angular`                                             | End-to-end delivery                                                                                                                   |
| **Data & Messaging**           | `PostgreSQL`, `SQL Server`, `MongoDB`, `Redis`, `Apache Kafka`, `RabbitMQ`                        | `TODO`: Confirm whether to keep repo-listed production stores `Couchbase`, `MySQL`, `Oracle`, and `SQLModel` in this group pill list. |
| **Infra & Tooling**            | `Docker`, `Kubernetes`, `AWS`, `Git`                                                              | `TODO`: Confirm whether to keep `SonarQube`, `JUnit`, `Postman` chips from earlier revamp draft.                                      |
| **Exploring _(strict label)_** | `Solidity`, `Ethereum`, `Web3.js`                                                                 | **Must be clearly labeled as `Exploring`** — never mixed into mastered skills.                                                        |

---

## 7. Content `TODO` List

1. **TODO (CONT-1):** Confirm status of `"92% faster processing"` — supply source metric/context or permanently drop.
2. **TODO (CONT-2):** Confirm whether additional repo items (`Couchbase`, `MySQL`, `Oracle`, `SQLModel`, `SonarQube`, `JUnit`, `Postman`) should stay inside the Data & Messaging / Infra groups alongside your GitHub profile list.
3. **TODO (CONT-3):** Confirm whether external project URLs exist for `Pruhub`, `PruServices`, `AgunanEMaterai`, `SuretyBondOnline`, or any of the 5 `XL Axiata` services (all currently empty because enterprise internal), or keep them link-free.
4. **TODO (CONT-4):** Confirm if `ORION by Sinarmas MSIG Life`, `DevSecOps Bot`, `FoodAllergy`, `Resumai`, and old bootcamp projects should stay hidden (`showInProjects: false`) or be cleaned out.
5. **TODO (CONT-5):** Confirm if [static/Riyan Sugiarto Resume.pdf](../static/Riyan%20Sugiarto%20Resume.pdf) needs updating so it matches `6+ years`, `ryansgrt23@gmail.com`, and `Software Engineer` at Askrindo.
