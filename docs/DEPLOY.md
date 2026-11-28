# Local Build & Verification Runbook (`DEPLOY.md`)

> **Policy (`migration/astro`):** Local development and verification only — **do not run deploy commands, do not push to remote branches, and do not merge/open PRs**.

---

## 1. Environment & Toolchain

- **Node.js:** `>=22.23.4` (`24` pinned in `.nvmrc` and `package.json#engines`; `v24.22.3` installed locally at `D:\tools\nodejs-24`).
- **Package Manager:** `npm` (`package-lock.json`).
- **Deployment Platform:** **Vercel** (Automatic Git integration via repository connect).
- **Build & Preview Config:** [astro.config.mjs](../astro.config.mjs) (`output: 'static'`), [vercel.json](../vercel.json) (`buildCommand: "npm run build"`, `outputDirectory: "dist"`).
- **Decommissioned CI/CD:** Legacy `.github/workflows/deploy.yml` (DigitalOcean SSH) has been removed.
- **Previous Stack Archive:** Earlier Gatsby configuration is preserved untouched on git branch `backup/gatsby-v5`.

---

## 2. Local Commands

If a shell defaults to Node 14 globally, prepend Node 24 first:

```powershell
$env:Path = "D:\tools\nodejs-24;" + $env:Path
```

Run checks locally:

```bash
npm run lint     # ESLint across project JS/MJS scripts
npm run build    # Builds static output + optimized .webp assets into dist/
npm run preview  # Serves dist/ locally at http://localhost:4321/
npm run dev      # Starts Astro dev server at http://localhost:4321/
```
