# Media & Visual Asset Inventory (`ASSETS.md`)

Asset tracking for the Astro portfolio on branch `migration/astro`. Images use Astro's built-in `astro:assets` (`<Image />`) pipeline into `.webp` under `dist/_astro/`.

---

## 1. Profile Portraits & Branding Assets

| Asset File                       | Location                                               | Pipeline                            | Status                                          |
| -------------------------------- | ------------------------------------------------------ | ----------------------------------- | ----------------------------------------------- |
| Portrait (`riyans-jas.png`)      | `src/assets/riyans-jas.png`                            | `<Image />` (`astro:assets`)        | Active (Hero 48px + About flush right)          |
| OG Image (`og.png`, `og@2x.png`) | `public/og.png`, `public/og@2x.png`                    | `scripts/generate-assets.js`        | Active (`#FCF1D0` / `#010736` Light Navy/Cream) |
| Favicons                         | `public/favicon.svg`, `public/favicon.png`             | `scripts/generate-assets.js`        | Active (palette-only monogram)                  |
| Fonts (`Calibre`)                | `public/fonts/Calibre-{Regular,Medium,Semibold}.woff2` | `@font-face` (`font-display: swap`) | Active (`Calibre-Semibold.woff2` preloaded)     |
| Resume PDF                       | `public/Riyan Sugiarto Resume.pdf`                     | `scripts/generate-cv.js`            | Active (built from Section 2 facts)             |

---

## 2. Project Media (`13` Production Systems)

| Project                               | Cover Type                           | Source Path                             | Status                              |
| ------------------------------------- | ------------------------------------ | --------------------------------------- | ----------------------------------- |
| Portal Bisnis Askrindo                | Screenshot (`.webp` via `<Image />`) | `src/assets/projects/portal-bisnis.png` | Active                              |
| Fortify Digital Life Insurance        | Screenshot (`.webp` via `<Image />`) | `src/assets/projects/fortify.png`       | Active                              |
| Andromeda Agency Financing            | Screenshot (`.webp` via `<Image />`) | `src/assets/projects/andromeda.png`     | Active                              |
| Pemulihan Ekonomi Nasional (PEN)      | Screenshot (`.webp` via `<Image />`) | `src/assets/projects/pen.png`           | Active                              |
| Pruhub Framework Migration (Featured) | Palette SVG Architecture Diagram     | `src/components/ProjectDiagram.astro`   | Active (open for WebM/MP4 clip)     |
| Agunan Bank Online & e-Materai        | Palette SVG Architecture Diagram     | `src/components/ProjectDiagram.astro`   | Active (open for screenshot/clip)   |
| Surety Bond Online                    | Palette SVG Architecture Diagram     | `src/components/ProjectDiagram.astro`   | Active (open for screenshot/clip)   |
| PruServices AI e-KYC                  | Palette SVG Architecture Diagram     | `src/components/ProjectDiagram.astro`   | Active (open for screenshot/clip)   |
| XL (`5` Microservices Projects)       | Palette SVG Architecture Diagrams    | `src/components/ProjectDiagram.astro`   | Active (open for screenshots/clips) |

---

## 3. Open Motion Media Slots (Optional Future Additions)

- **Lottie JSON (`src/assets/lottie/`):** No `.json` files provided yet; `LottiePlayer.tsx` (`client:visible`) renders a palette SVG fallback slot cleanly without external hotlinks. Target `< 100 KB` per JSON when added.
- **Rive `.riv` (`src/assets/rive/`):** No `.riv` file provided yet; `RiveIllustration.tsx` (`client:visible`) renders an interactive Light Navy/Cream SVG fallback with click/hover state toggle. Target `< 200 KB` when added.
