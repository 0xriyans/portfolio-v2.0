# Portfolio Revamp Specification (`SPEC.md`)

This document defines the architecture, design tokens, section structure, motion specifications, performance limits, and acceptance criteria for revamping Riyan Sugiarto's portfolio on top of the existing **Gatsby 3.4.1 + React 17 + Styled Components** codebase.

---

## 1. Strategic & Visual Direction

- **Layout & Motion Reference:** `https://rasmadibnu.com/` — adopt **only** its single centered column structure, section order, whitespace rhythm, rounded card proportions, floating pill navigation behavior, and motion choreography. **Never** copy any text, photo, project name, logo, screen recording, or GitHub data from the reference.
- **Colour Palette (Final — Overrides Reference Light Theme & Retires Dark Terminal Theme):**

| Token                        | Hex                                                       | Role                          | Usage Rules                                                                                                  |
| ---------------------------- | --------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `--bg`                       | `#010736`                                                 | Primary background            | Page background canvas (darkest midnight navy).                                                              |
| `--surface`                  | `#0D1C42`                                                 | Elevated surface              | Cards, section containers, stacked fan cards, GitHub card, floating pill backdrop.                           |
| `--border` / `--surface-2`   | `#22396F`                                                 | Borders & secondary elements  | Hairline card borders, secondary pills, badges, hover fills, dividers.                                       |
| `--cream` / `--text-primary` | `#FCF1D0`                                                 | Primary text & primary accent | Headings, primary copy emphasis, primary CTA fill (`#010736` text on `#FCF1D0`), active rotator card fill.   |
| `--text-secondary`           | `TODO` (proposed `#D5DCEB` / `rgba(252, 241, 208, 0.78)`) | Muted body text               | Paragraph body and subtitles derived cleanly to ensure >= 4.5:1 WCAG AA contrast on `#010736` and `#0D1C42`. |

- **Explicit Exclusions (Retired Identity):**
  - Remove **all** dark-terminal / cyberpunk elements: `#050505` black canvas, `#00FF66` neon green, Matrix rain canvas, boot preloader sequence, `RIYAN.SYS` labels, monospace bracketed headings (`[ 01 // ... ]`), blinking block cursors, vertical left/right social & email rails, and bash-style terminal forms.
  - Keep **no** white/off-white `#FFFFFF` / `#F7F7F4` background theme from the reference site; use the `#010736` / `#0D1C42` / `#22396F` / `#FCF1D0` palette consistently.
  - **No** custom cursor, heavy parallax, scroll-jacking, horizontal-scroll hijacking, preloader, full-video hero background, or 3D libraries (no Three.js).

- **Typography & Geometry:**
  - Clean sans-serif typography throughout (`Calibre` local webfont, max 2 font families total; drop monospace headings and neon text shadows).
  - Centered container (`max-width: 1100–1200px`), generous vertical spacing, card corners rounded `16–24px`, subtle hairline `#22396F` borders, soft elevation shadow without glow effects.

---

## 2. Section Order & Layout Specs

Exact top-to-bottom order on `/`:

`Hero` -> `Projects` -> `Technology Stack` -> `Work Experience` -> `GitHub Activity` -> `About` -> `Contact` -> `Footer`

| #   | Section (`id`)                      | Layout & Functional Spec                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0   | **Floating Pill Nav**               | Hidden on initial hero load (no static top bar). Appears once scrolled past ~80% of Hero height, centered top, `#0D1C42` translucent pill with `#22396F` hairline border and `backdrop-filter: blur(12px)`. Items: `Home / Projects / Stack / Experience / About / Contact` + `#FCF1D0` cream CTA (`Hire Me`). Scroll-spy indicator dot (`200ms` transition) under active item. Mobile: collapses cleanly to Menu trigger + CTA only.                                                                                                                                                                                                                                                                          |
| 1   | **Hero (`#hero`)**                  | Loads directly (`0ms` visible, no boot/preloader). Displays portrait photo (`TODO`: confirm final photo asset), name (`Riyan Sugiarto`), `Open for Freelance` badge (`mailto:ryansgrt23@gmail.com`), role/location (`Backend Software Engineer — Jakarta, Indonesia`), large bold positioning headline, concise backend-first end-to-end summary, compact 6-link social row (`GitHub`, `LinkedIn`, `X`, `Fiverr`, `Upwork`, `Email`), and primary CTA scrolling to Projects.                                                                                                                                                                                                                                   |
| 2   | **Projects (`#projects`)**          | Kicker `Selected work`, large `Projects` heading, short intro, and `View all projects` link (`/archive`). Two-column staggered grid (right column offset `48–64px` on desktop; single column on mobile). Shows top 4–6 production systems in the main grid and full **13 production systems** list accessible via grid/list + `/archive`. Every cover uses a muted looping WebM/MP4 (`6–12s`), animated SVG architecture diagram in `#010736`/`#0D1C42`/`#22396F`/`#FCF1D0`, or crisp screenshot — zero dark/empty placeholders. Desktop hover rises `4px`; mobile pauses autoplay under `saveData` or offscreen.                                                                                              |
| 3   | **Technology Stack (`#stack`)**     | `Technology Stack` heading + short intro leading with Core Stack (`Java`, `Spring Boot / Spring Cloud`, `Quarkus`, `Apache Kafka`, `PostgreSQL`, `Kubernetes`, `Docker`). **Fan:** 7 large `#0D1C42` cards fanning out (`-18`, `-12`, `-6`, `0`, `6`, `12`, `18` deg, `700ms`, `60ms` stagger; horizontal swipe row on mobile; hover rises `10px` + note tooltip). **Marquee:** Two-row opposite-direction infinite marquee (`30–45s`, pauses on hover & `prefers-reduced-motion`) organized by Languages, Backend, AI & LLM, Frontend, Data & Messaging, Infra & Tooling. **Exploring row:** Clearly isolated & labeled as _Exploring_ (`Solidity`, `Ethereum`, `Web3.js`) — never mixed with core expertise. |
| 4   | **Work Experience (`#experience`)** | Clean numbered list (`1..5` / `01..05`) on `#0D1C42` cards — no vertical timeline rail, no terminal borders. Uses exact 5 entries in order (two distinct Askrindo entries). Verified metrics use tabular numbers (`tabular-nums`) and animate via counter in `P1`.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 5   | **GitHub Activity (`#github`)**     | `#0D1C42` card showing last 12 months real contributions for `0xriyans` (standard GitHub green scale on navy-slate base cells). Fetched at build time via `gatsby-node.js` with client fetch fallback; if fetch fails, renders a clean GitHub profile link fallback (never fake/sample data). Fast diagonal stagger (`<= 800ms` total) + interactive hover/tap tooltip (`count` + `date`).                                                                                                                                                                                                                                                                                                                     |
| 6   | **About (`#about`)**                | Clean editorial narrative highlighting 6+ years experience, backend-first end-to-end delivery, and current AI agent & Web3 exploration, paired with verified metric highlights. Reference-style hand-drawn SVG annotations (underline, translucent highlight, oval circle — colors tuned for `#010736`/`#0D1C42` contrast) draw once on viewport entry (`600–900ms`).                                                                                                                                                                                                                                                                                                                                          |
| 7   | **Contact (`#contact`)**            | Friendly engineering/freelance heading + 3-card rotator (`Email`, `LinkedIn`, `GitHub`) cycling every `3.5–4s` with active card highlighted in `#FCF1D0` cream bg / `#010736` text, pausing on hover/focus with clickable indicator dots. Direct link row below with `Open for Freelance` badge + `Fiverr`, `Upwork`, `X`. Clean accessible inquiry form opening `mailto:ryansgrt23@gmail.com`.                                                                                                                                                                                                                                                                                                                |
| 8   | **Footer**                          | Single centered line (`© Year Riyan Sugiarto · Jakarta, Indonesia · ryansgrt23@gmail.com`), no animation except link hover.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

---

## 3. Motion Tokens (`src/styles/motionTokens.js`)

| Token               | Target Value                     | Notes                                                |
| ------------------- | -------------------------------- | ---------------------------------------------------- |
| `duration.micro`    | `150–200ms`                      | Hover lifts, tooltips, active nav dot cross-fade     |
| `duration.entrance` | `500–700ms`                      | Scroll-triggered fade / blur / rise                  |
| `duration.hero`     | `<= 1000ms`                      | Full Hero entrance sequence                          |
| `stagger.default`   | `80–120ms`                       | Cards, experience rows                               |
| `stagger.hero`      | `80–120ms`                       | Photo -> Name -> Headline -> Role -> CTA             |
| `easing.default`    | `cubic-bezier(0.22, 1, 0.36, 1)` | Primary UI easing curve                              |
| `rise.distance`     | `12–16px`                        | Upward `translate3d` entrance travel                 |
| `blur.start`        | `8–12px` (`10px` default)        | Hero blur-to-sharp starting filter                   |
| `trigger.viewport`  | `0.20` (`20%` intersection)      | `IntersectionObserver` threshold, `once` per element |
| `counter.duration`  | `1200–1600ms`                    | Verified metrics count-up with `tabular-nums`        |
| `marquee.speed`     | `30–45s`                         | CSS keyframe linear infinite loop                    |
| `rotator.interval`  | `3500–4000ms`                    | Active contact card cycle (`200–300ms` transition)   |

### Motion Rules

1. Animate **only `transform` and `opacity`** (plus `filter: blur()` for Hero sharp-in and SVG `stroke-dashoffset` for About drawings). Never animate `width`, `height`, `top`, or `left`.
2. Every entrance runs **once** and stays still. Only the stack marquee and contact card rotator run continuously (both pause on hover/focus).
3. **`prefers-reduced-motion: reduce`:** Disable blur/translate shifts, show final opacity immediately, stop marquee and contact auto-rotation, disable video autoplay, render final counter numbers statically.
4. **Mobile first:** Touch devices never rely on `:hover` to expose required information.
5. Use CSS transitions/keyframes for ~80% of motion; use **GSAP ONLY** for the Hero sequence and Stack card fan (and never load GSAP for simple fades).

---

## 4. Performance Budget (Hard Limits)

- **Hero Readability:** Readable within `<= 1.0s` (no preloader/boot screen).
- **Lighthouse Mobile Targets:** `Performance >= 85`, `LCP < 2.5s`, `CLS < 0.1`.
- **JavaScript Budget:** Total motion + page runtime JS target **`< 150 KB` gzip**; zero 3D libraries.
- **Project Videos:** WebM preferred + MP4 fallback, `6–12s` muted loop, max width `960px`, target `< 1.5 MB` each, required static `poster` image.
- **Images:** WebP / AVIF via `gatsby-plugin-image` / `sharp`, lazy-loaded below the fold, rendered `<= 2x` display dimensions.
- **Fonts:** Max 2 font families (`Calibre` sans + optional mono fallback if needed for code snippets); preload **only** the hero font (`Calibre` Semibold/Regular).
- **Layout Stability:** Counters enforce `font-variant-numeric: tabular-nums` and reserved width (`min-width` in `ch`) to keep `CLS` near zero.

---

## 5. Work Order (`P0` -> `P1` -> `P2`)

| Phase  | Scope                                                                                                                                                                                                                                                                                   | Gate Before Proceeding                                                                                                  |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **P0** | Complete layout & `#010736 / #0D1C42 / #22396F / #FCF1D0` palette overhaul, remove dark-terminal UI/neon/Matrix/boot, fix email & content audit ([docs/CONTENT.md](./CONTENT.md)), implement 13 projects readable media, split two Askrindo entries. **Zero new motion.**               | Clean `npm run clean && npm run build`, Chrome QA at `360px` & `1920px`, and local user review (user deploys manually). |
| **P1** | Hero blur-to-sharp entrance (`<= 1s`), floating pill nav slide-down + `200ms` scroll-spy dot, staggered project grid entrance, numbered experience list entrance, verified-metric `tabular-nums` counters.                                                                              | Local production build + Chrome motion/viewport QA + user review.                                                       |
| **P2** | Stack 7-card fan + dual opposite marquee + Exploring row, GitHub heatmap diagonal reveal & tooltips, About hand-drawn SVG annotations (`600–900ms`), Contact auto-rotator (`3.5–4s`) + pause states, mobile & `prefers-reduced-motion` polish, final mobile Lighthouse audit (`>= 85`). | Full local Chrome + Lighthouse QA pass before user triggers manual preview/production deploy.                           |

---

## 6. Acceptance Criteria Checklist

- [ ] Theme uses `#010736` background, `#0D1C42` surface, `#22396F` borders/secondary, `#FCF1D0` cream primary text/accents — zero `#00FF66` neon green, zero Matrix rain, zero boot screen, zero terminal chrome, and zero white/light theme remnants.
- [ ] Section order matches `Hero -> Projects -> Technology Stack -> Work Experience -> GitHub Activity -> About -> Contact -> Footer`.
- [ ] Hero opens directly (`<= 1s` readable, no preloader); portrait, name, headline, role, social row, and CTA display cleanly.
- [ ] Floating pill nav appears after Hero, active scroll-spy dot tracks section, mobile collapses cleanly to Menu + CTA.
- [ ] All 13 named production projects are represented with readable media (video, `#0D1C42`/`#FCF1D0` SVG diagram, or crisp screenshot); no empty dark covers.
- [ ] Stack fan renders 7 core cards, marquee shows full GitHub groups and pauses on hover/`reduced-motion`, and `Solidity / Ethereum / Web3.js` appear strictly under **Exploring**.
- [ ] Work Experience lists 5 separate entries in order (`Askrindo 2025–present`, `MSIG Life`, `Prudential`, `XL Axiata`, `Askrindo 2020–2022`) with clear distinction between the two Askrindo periods.
- [ ] GitHub heatmap renders real `0xriyans` 12-month data with hover/tap tooltips and falls back cleanly to profile link if API fails.
- [ ] Email is `ryansgrt23@gmail.com` everywhere (including `mailto:` links); `riyansgrt23@gmail.com` exists nowhere; exact GitHub/LinkedIn/X/Fiverr/Upwork links verified.
- [ ] Verified metrics only (`6+ years`, `>1.5 GB -> <300 MB`, `2 business days -> real-time`, zero-loss Kafka manual offset, Redis `SET lock:pay:{order_id} NX EX 30` + `SELECT ... FOR UPDATE`); zero unverified claims (`Deputy VP`, `8+ years`, `100+ projects`, `99.9% uptime`, `92% faster processing` unless explicitly confirmed).
- [ ] Mobile Lighthouse: `Performance >= 85`, `LCP < 2.5s`, `CLS < 0.1`, runtime JS `< 150 KB` gzip.
- [ ] Verified at `360px` and `1920px`: zero horizontal overflow, no clipped/hidden text, touch-friendly controls.
- [ ] Zero code, copy, photos, logos, recordings, or GitHub data copied from `rasmadibnu.com`.

---

## Open Decisions (`TODO`)

- **TODO (SPEC-1):** Confirm Hero visual composition — two-column split (`copy left + rounded portrait card right`, current preference) vs stacked centered layout matching `rasmadibnu.com` top hero proportions.
- **TODO (SPEC-2):** Confirm whether to retain existing `/id` and `/jp` routes (`gatsby-plugin-react-i18next`) during the revamp or standardize on English (`en`) only to cut locale maintenance and reduce bundle overhead.
- **TODO (SPEC-3):** Confirm secondary muted text shade on `#010736` (`#D5DCEB` / muted cream `rgba(252, 241, 208, 0.78)`) and GitHub heatmap cell scale preference (classic green squares on `#0D1C42` vs cream-tinted `#22396F`/`#FCF1D0` opacity scale).
