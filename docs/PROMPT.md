# Revamp Prompt & Execution Index (`PROMPT.md`)

Index for running the AI-assisted portfolio revamp in disciplined, preview-verified phases without mixing up visual direction, content truth, or unconfirmed metrics.

---

## 1. Where Everything Lives

- **Master Layout & Motion Reference (Structure & Behaviour Only):** `https://rasmadibnu.com/`
- **Current Production Site:** `https://portfolio-v2-0-tawny-five.vercel.app/`
- **Architecture & Motion Spec:** [docs/SPEC.md](./SPEC.md)
- **Single Content Source of Truth:** [docs/CONTENT.md](./CONTENT.md)
- **Media & Asset Checklist:** [docs/ASSETS.md](./ASSETS.md)
- **Build & Deploy Runbook:** [docs/DEPLOY.md](./DEPLOY.md)

> **Non-Negotiable Constraints Across Every Phase:**
>
> - **Final Palette:** `#010736` (background), `#0D1C42` (surface), `#22396F` (border/secondary), `#FCF1D0` (cream primary text & primary CTA/highlight). Do **not** revert to a white/light background and do **not** keep dark-terminal neon `#00FF66`, Matrix rain, boot sequences, `[ 01 // ... ]` brackets, or `RIYAN.SYS`.
> - **Verified Content Only:** `6+ years`, `Software Engineer` at Askrindo `2025–present`, `ryansgrt23@gmail.com`, 13 named production projects, 5 separate work entries (with 2 distinct Askrindo periods), and ONLY the metrics verified in [docs/CONTENT.md](./CONTENT.md).
> - **Local QA First, Manual Deploy Only:** Verify every phase (`P0` -> `P1` -> `P2`) thoroughly on local build + headless Chrome (`360px` & `1920px`) + Lighthouse mobile before handing off for user local review. Do **not** trigger automated Vercel deploys; the user tests locally and deploys manually.

---

## 2. Phased Execution Runbook

### Pre-Flight (Before Writing Revamp Code)

1. Answer all open `TODO` questions in [docs/CONTENT.md](./CONTENT.md), [docs/ASSETS.md](./ASSETS.md), and [docs/DEPLOY.md](./DEPLOY.md) (notably exact Node version in Vercel UI, log inspection of `dpl_B6z4c8ihaEm1ivLLCfGiFfcAcNMA`, portrait selection, and `"92% faster processing"` status).
2. Confirm clean starting branch (e.g., branch fresh from green baseline or resolve the Vercel build failure first on a dedicated preview test before stacking UI changes).

---

### Phase P0 — Layout, Palette, Content & Readable Media _(No New Motion)_

**Goal:** Replace layout structure, section order, theme tokens, all copy/email fixes, and static project/experience media cleanly — with **no** added scroll/entrance/GSAP motion yet.

Checklist:

- Apply `#010736` / `#0D1C42` / `#22396F` / `#FCF1D0` CSS variables and clean sans typography (`max 2` fonts, preload hero font only).
- Reorder sections cleanly: `Hero -> Projects -> Technology Stack -> Work Experience -> GitHub Activity -> About -> Contact -> Footer`.
- Remove preloader, Matrix rain, typing cursors, vertical social/email rails, terminal forms, and `[ 01 // ... ]` headers.
- Fix email to `ryansgrt23@gmail.com` everywhere, remove banned claims (`Deputy VP`, `8+ years`, `100+`, `99.9%`, `40+`), split Askrindo (`2025–present` vs `2020–2022`), list 13 named projects with staggered 2-column grid + full list/archive, organize Stack into all 7 groups + `Exploring` row (`Solidity`, `Ethereum`, `Web3.js`), render real `0xriyans` GitHub heatmap + fallback link.
- Clean build (`npm run clean && npm run build`), verify `360px` & `1920px` in headless Chrome -> **STOP for user local review**.

---

### Phase P1 — Core Motion (`Hero`, `Pill Nav`, `Projects`, `Experience`, `Counters`)

**Goal:** Layer primary editorial motion using tokens in [docs/SPEC.md](./SPEC.md) (`500–700ms` entrances, `80–120ms` stagger, `cubic-bezier(0.22, 1, 0.36, 1)`, `12–16px` rise, `20%` `IntersectionObserver` trigger, `transform`/`opacity` only, `once`).

Checklist:

- **Hero:** Direct load (no preloader) -> staggered blur-to-sharp (`10px -> 0` + `14px` rise, total `<= 1000ms`) across portrait -> name -> headline -> role/location -> CTA + social links.
- **Floating Pill Nav:** Appears past ~80% hero height (`250ms` slide-down + fade), `#0D1C42` pill + `#FCF1D0` CTA, animated `200ms` scroll-spy dot tracking active section; mobile shows Menu + CTA only.
- **Projects & Experience:** Once-only staggered entrance on viewport entry (`120ms` stagger on project cards, `80–120ms` on numbered experience cards).
- **Verified Counters:** `1200–1600ms` count-up with `tabular-nums` strictly on verified metrics in [docs/CONTENT.md](./CONTENT.md).
- Test `prefers-reduced-motion`, test `360px` & `1920px`, verify clean local build -> **STOP for user local review**.

---

### Phase P2 — Signature Interactive Sections & Mobile/Perf Polish

**Goal:** Add interactive stack fan + marquee, GitHub reveal, About SVG drawings, contact card rotator, and hit final Lighthouse budgets.

Checklist:

- **Stack:** 7-card fan opens on viewport entry (`-18` to `+18` deg, `700ms`, `60ms` stagger, GSAP allowed here + desktop hover lift `10px` & tooltip; horizontal scroll row on mobile) + opposite-direction dual marquee (`30–45s`, pauses on hover/`reduced-motion`) + distinct `Exploring` row.
- **GitHub Heatmap:** Fast diagonal reveal (`<= 800ms` total) + interactive date/count tooltips + fallback profile link.
- **About SVG Annotations:** Hand-drawn underline, highlight, and oval circle draw once (`600–900ms`) on viewport entry.
- **Contact Card Rotator:** Cycles every `3.5–4s`, highlighting active card (`#FCF1D0` cream / `#010736` text, `200–300ms` transition), pauses on hover/focus, clickable dots.
- **Final QA Gate:** `prefers-reduced-motion` parity, `360px` & `1920px` zero overflow, Lighthouse mobile `Performance >= 85`, `LCP < 2.5s`, `CLS < 0.1`, runtime JS `< 150 KB` gzip, ready for user local verification and manual deploy.
