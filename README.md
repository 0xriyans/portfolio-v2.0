# Riyan Sugiarto — Portfolio v2.0

Personal engineering portfolio for **Riyan Sugiarto**, a Software Engineer (backend-first, end-to-end) based in Jakarta, Indonesia.

> **Architecture Status (`migration/astro`):** Migrated off Gatsby to **Astro + Tailwind CSS v4 + Magic UI + Motion + Lottie + Rive** using the Light Navy / Cream palette (`#FCF1D0` canvas, `#FFFFFF` cards, `#010736` ink, `#22396F` secondary, `#0D1C42` dark footer). The previous Gatsby setup is archived on branch `backup/gatsby-v5`.

---

## Stack

| Layer                         | Technology                                                                          | Package / Path                                                                   |
| ----------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Framework                     | **Astro** (`^7.4.13`, static-first)                                                 | `package.json`, `astro.config.mjs`                                               |
| Styling                       | **Tailwind CSS v4** (`@tailwindcss/vite`)                                           | `src/styles/global.css`                                                          |
| Interactive Islands           | **React** (`^19.3.1` via `@astrojs/react`)                                          | `src/components/*.tsx`                                                           |
| UI Motion Components          | **Magic UI** (`BlurFade`, `Marquee`, `NumberTicker`, `ShimmerButton`, `WordRotate`) | `src/components/ui/`                                                             |
| Gesture & Scroll Motion       | **Motion** (`motion ^14.14.0`, `motion/react`)                                      | `src/components/StackInteractive.tsx`, `AboutAnnotations.tsx`, `FloatingNav.tsx` |
| Vector Accent Slot            | **Lottie** (`lottie-web ^5.13.0`, lazy `client:visible`)                            | `src/assets/lottie/`, `src/components/motion/LottiePlayer.tsx`                   |
| Interactive Illustration Slot | **Rive** (`@rive-app/react-canvas ^4.41.0`, lazy `client:visible`)                  | `src/assets/rive/`, `src/components/motion/RiveIllustration.tsx`                 |
| Image Optimization            | **`astro:assets` (`<Image />`)**                                                    | `src/assets/`                                                                    |

---

## Local Setup & Verification Commands

Requires **Node.js `>=22.23.4`** (`v24.22.3` verified locally).

```bash
# Install dependencies
npm install

# Run local dev server
npm run dev

# Build static production site into dist/
npm run build

# Preview production build locally
npm run preview
```

---

## Repository Structure

```text
portfolio-v2.0/
├── src/
│   ├── assets/               # Optimized images, lottie/ JSON slot, rive/ .riv slot
│   ├── components/           # Static .astro sections + interactive .tsx islands
│   │   ├── motion/           # MotionWrapper, LottiePlayer, RiveIllustration
│   │   └── ui/               # Magic UI components
│   ├── layouts/              # Base SEO/OpenGraph HTML layout
│   ├── lib/                  # Verified site config & build-time GitHub data fetcher
│   ├── pages/                # index.astro
│   └── styles/               # Tailwind v4 @theme palette + font-face rules
├── public/                   # Fonts, Resume PDF, favicons, OG image, robots.txt
├── scripts/                  # Local asset/CV generation scripts
├── astro.config.mjs          # Astro + React + Sitemap + Tailwind v4 Vite plugin
└── package.json
```
