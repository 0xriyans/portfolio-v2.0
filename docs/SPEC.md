# Portfolio Architecture Specification (`SPEC.md`)

Current specification for **Riyan Sugiarto's** portfolio on branch `migration/astro` built with **Astro + Tailwind CSS v4 + Magic UI + Motion + Lottie + Rive**.

---

## 1. Visual Direction & Palette

- **Layout Direction:** Single centered column (~`1040px` max width), generous section spacing, backend-specialist structure (`Hero -> Selected Work -> Technology Stack -> Work Experience -> GitHub Activity -> About -> Contact -> Footer`), grounded in the visual rhythm of `rasmadibnu.com` while adapted for backend architecture focus. Never copies external copy, photos, logos, or data.
- **Colour Palette (Light Navy / Cream):**
  - `--color-bg`: `#FCF1D0` (main canvas)
  - `--color-surface`: `#FFFFFF` (cards, surfaces)
  - `--color-text`: `#010736` (headings, primary text, primary CTA background)
  - `--color-secondary`: `#22396F` (secondary text, accents, active nav dot)
  - `--color-border`: `rgba(1, 7, 54, 0.1)` (thin subtle borders)
  - Footer: `#0D1C42` background with `#FCF1D0` text

---

## 2. Section & Motion Breakdown

1. **Hero (`#hero`):** Left-aligned 48px round portrait + name, 3-line H1, role summary, 2 CTA pills (`Explore Selected Work`, `Download CV (PDF)`), diagonal `Connect` social rail on the right, trust bar (`Askrindo · Prudential · MSIG · XL`), and 3 verified hero metrics (`60%+ memory reduction`, `Withdrawal 2 hari -> real-time`, `Zero-loss Kafka`). Magic UI `BlurFade` entrance (`10px -> 0`, `<= 1000ms`), `ShimmerButton`, and `NumberTicker`.
2. **Floating Pill Nav (`FloatingNav.tsx`):** Appears past hero scroll; `#FFFFFF` surface with `10% #010736` border and **Motion** `layoutId` scroll-spy dot (`#22396F`).
3. **Selected Work (`#projects`):** Full-width featured `Pruhub Framework Migration & Withdrawals` (Flink → Quarkus story, diagram, verified metrics + `NumberTicker`) followed by a staggered 2-column grid of the other 12 production projects (`MotionReveal` `120ms` stagger at `20%` viewport visibility).
4. **Technology Stack (`#stack`):** 7-card **Motion** fan (`-14°` to `+14°`, straightens & lifts on hover with `#010736` tooltip; horizontal swipe on mobile), two opposite-direction **Magic UI `Marquee`** rows (`pauseOnHover`), grouped stack cards, and separate `Exploring` row (`Solidity`, `Ethereum`, `Web3.js`).
5. **Work Experience (`#experience`):** Vertical left timeline (`Motion` `scaleY` line + dot/entry fade-in) with 5 distinct entries (`Askrindo 2025–present` and `Askrindo 2020–2022` separated).
6. **GitHub Activity (`#github`):** 3 build-time stat cards (`0xriyans` 12-month contributions, top language, active repos via `NumberTicker`) above the navy/cream contribution heatmap with hover/tap tooltip.
7. **About (`#about`):** Single `#FFFFFF` 60/40 card with right-flush `<Image />` portrait, **Motion** scroll-drawn SVG strokes, `RiveIllustration` (`@rive-app/react-canvas`, `client:visible`), and `LottiePlayer` (`lottie-web`, `client:visible`).
8. **Contact (`#contact`):** Wide `#FFFFFF` card with prominent `mailto:ryansgrt23@gmail.com`, `WordRotate` headline, validated `ContactForm` on the left, and layered cycling `ContactTilesRotator` deck (`AnimatePresence`, `3.8s`, pause on hover/focus) on the right.
9. **Footer:** `#0D1C42` background, `#FCF1D0` text, credit line (`Astro, Tailwind CSS, Magic UI, Motion, Lottie & Rive`), Back to top.

---

## 3. Performance & Reduced Motion

- Static `.astro` sections emit zero JS by default; interactive React islands (`@astrojs/react`) code-split per section (`client:load` only on Hero & Nav, `client:visible` for below-the-fold islands).
- `LottiePlayer` dynamically imports `lottie-web` only when an animation JSON exists and pauses off-screen via `IntersectionObserver`.
- `RiveIllustration` lazily loads `@rive-app/react-canvas` only when a `.riv` file exists and pauses off-screen via `IntersectionObserver`.
- All libraries respect `prefers-reduced-motion: reduce`, rendering static states/fallbacks cleanly.
