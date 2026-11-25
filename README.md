# Riyan Sugiarto — Portfolio v2.0

Personal engineering portfolio for **Riyan Sugiarto**, a Backend Software Engineer (backend-first, end-to-end delivery) based in Jakarta, Indonesia. Built with Gatsby, React, and Styled Components, and documented for the structured revamp (`P0` -> `P1` -> `P2`) using the `#010736` / `#0D1C42` / `#22396F` / `#FCF1D0` Midnight Navy & Cream palette.

> **Revamp Status:** Documentation-first planning phase before executing the clean layout + motion revamp. Never deploy unreviewed revamp work directly to production (`master`); verify every phase on a Vercel preview branch first.

---

## Tech Stack (Detected in Repo)

| Layer                 | Technology                                                                                    | Repo Evidence                               |
| --------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Static Site Generator | **Gatsby `3.4.1`** (`^3.4.1`)                                                                 | `package.json`, installed in `node_modules` |
| UI Library            | **React `17.0.2`** (`^17.0.2`)                                                                | `package.json`                              |
| Styling               | **Styled Components `^5.3.0`** (+ `babel-plugin-styled-components ^1.12.0`)                   | `package.json`                              |
| Animation             | **GSAP `^3.12.5`** (`3.15.1` installed), `react-transition-group ^4.3.0`                      | `package.json`                              |
| Content Pipeline      | `gatsby-source-filesystem ^3.15.0`, `gatsby-transformer-remark ^4.1.0`                        | `gatsby-config.js`, `content/`              |
| Media Optimization    | `gatsby-plugin-image ^1.4.0`, `gatsby-plugin-sharp ^3.4.1`, `gatsby-transformer-sharp ^3.4.0` | `gatsby-config.js`                          |
| i18n                  | `gatsby-plugin-react-i18next ^1.2.3`, `i18next ^26.7.2`, `react-i18next ^17.0.8`              | `locales/` (`en`, `id`, `jp`)               |
| Linting & Formatting  | ESLint `^7.25.0`, Prettier `^2.2.1`, Husky `^6.0.0`, `lint-staged ^10.1.2`                    | `package.json`, `.eslintrc`                 |

---

## Prerequisites

- **Node.js:** `.nvmrc` specifies **`14.16.0`** (local environment runs **`v14.21.3`**).
  - _Important:_ [vercel.json](./vercel.json) passes `NODE_OPTIONS=--openssl-legacy-provider`, which targets Node 17/18/20+ environments; running Node `14.x` with `--openssl-legacy-provider` fails locally, while exact Node version configured in Vercel Project Settings is **`TODO`** (see [docs/DEPLOY.md](./docs/DEPLOY.md)).
- **Package Manager:** `yarn.lock` is committed at the repository root (Vercel defaults to `yarn` when `yarn.lock` is present; `.github/workflows/deploy.yml` uses `npm install --legacy-peer-deps`).
- **Git**

---

## Local Setup & Commands

1. **Install dependencies:**

   ```bash
   yarn install --frozen-lockfile
   # or locally with npm (without touching yarn.lock):
   npm install --legacy-peer-deps
   ```

2. **Start development server:**

   ```bash
   npm run develop
   # runs: gatsby develop -H 0.0.0.0
   ```

   Open `http://localhost:8000` (GraphiQL explorer at `http://localhost:8000/___graphql`).

3. **Clean & production build:**

   ```bash
   npm run clean
   npm run build
   # runs: gatsby clean && gatsby build
   ```

   On Node 18+/20+ (such as Vercel), Webpack 5 / Gatsby 3 legacy OpenSSL hashing requires:

   ```bash
   NODE_OPTIONS=--openssl-legacy-provider npm run build
   ```

4. **Serve production build locally:**

   ```bash
   npm run serve
   ```

---

## Deployment (Vercel Preview & Production)

- **Vercel Config ([vercel.json](./vercel.json)):** Sets `outputDirectory` to `public` and overrides `buildCommand` with `NODE_OPTIONS=--openssl-legacy-provider ... gatsby build`.
- **Local QA & Manual Deploy:** Every revamp phase (`P0`/`P1`/`P2`) is verified locally (`npm run clean && npm run build`, headless Chrome `360px` & `1920px`, mobile Lighthouse), and **deployed manually by the owner** to Vercel preview/production.
- **Production (`master`):** Production Vercel deploys from `master` (current production URL: `https://portfolio-v2-0-tawny-five.vercel.app/`). A legacy GitHub Actions workflow also exists in `.github/workflows/deploy.yml` targeting DigitalOcean on pushes to `master`.
- **Known Deploy Incidents:** Recent Vercel and DigitalOcean build failures (24–25 Nov 2026) and diagnostic steps are documented in [docs/DEPLOY.md](./docs/DEPLOY.md).

---

## Repository Structure

```text
portfolio-v2.0/
├── content/                  # Markdown source files (featured/, projects/, jobs/)
├── docs/                     # Revamp documentation suite (SPEC, CONTENT, ASSETS, DEPLOY, PROMPT)
├── locales/                  # i18n JSON strings (en/, id/, jp/)
├── src/
│   ├── components/           # Shared UI components, icons, and sections/
│   ├── hooks/                # Custom React hooks (scroll, reduced motion, viewport triggers)
│   ├── images/               # Portraits, logos, favicons
│   ├── pages/                # index.js, archive.js, 404.js
│   ├── styles/               # Theme variables, typography, GlobalStyle, mixins, motion tokens
│   └── config.js             # Central contact email, social links, nav links, colors
├── static/                   # Static files (Resume PDF, og.png, slides)
├── .github/workflows/        # DigitalOcean deployment workflow (deploy.yml)
├── .nvmrc                    # Node version pin (14.16.0)
├── gatsby-config.js          # Site metadata, sharp/remark/i18n/sitemap/manifest plugins
├── gatsby-node.js            # GraphQL schema, build-time GitHub contributions fetch, aliases
├── gatsby-browser.js         # Gatsby browser hooks
├── gatsby-ssr.js             # Gatsby SSR hooks
├── package.json              # Scripts & dependencies (Gatsby ^3.4.1, React ^17.0.2)
├── vercel.json               # Vercel build command & outputDirectory ("public")
└── yarn.lock                 # Primary lockfile for reproducible installs
```

---

## Documentation Index

| Document                             | Purpose                                                                                                                                                                    |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [docs/SPEC.md](./docs/SPEC.md)       | Full technical specification: `#010736`/`#FCF1D0` design system, layout per section, motion tokens, performance budget, `P0`/`P1`/`P2` work order, acceptance criteria.    |
| [docs/CONTENT.md](./docs/CONTENT.md) | Single source of truth for verified profile info, `ryansgrt23@gmail.com` email P0 fix, 5 work history entries, 13 production projects, verified metrics, and stack groups. |
| [docs/ASSETS.md](./docs/ASSETS.md)   | Media audit for Hero/About portraits and all 13 production projects, required formats (`WebM`/`MP4`/SVG/`PNG`), and missing-asset checklist.                               |
| [docs/DEPLOY.md](./docs/DEPLOY.md)   | Vercel & DigitalOcean deployment configuration, 24–25 Nov 2026 failure log (strict known vs unknown facts), and pre-push verification checklist.                           |
| [docs/PROMPT.md](./docs/PROMPT.md)   | Vibe-coding prompt guide and execution order for running `P0`, `P1`, and `P2` sequentially with preview checks.                                                            |
