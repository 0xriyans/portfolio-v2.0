# Deployment & Troubleshooting Guide (`DEPLOY.md`)

> **Policy:** Keep `master` untouched during revamp work (`P0` -> `P1` -> `P2`). All phase verification runs locally (`npm run clean && npm run build`, headless Chrome `360px`/`1920px`, and Lighthouse mobile); **the user handles local visual checks and all manual Vercel deployments**.

---

## 1. Deployment Configuration Detected in Repo

| Setting                                        | Value Observed in Repo                                                                                                                                                                                                                                                               | Location                       |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| **Repository URL**                             | `https://github.com/0xriyans/portfolio-v2.0`                                                                                                                                                                                                                                         | `package.json`                 |
| **Production Branch**                          | `master` (currently at `0dcd160` on remote)                                                                                                                                                                                                                                          | `git branch`                   |
| **Vercel Config (`master` / `revamp/motion`)** | `buildCommand: "NODE_OPTIONS=--openssl-legacy-provider gatsby build"`, `outputDirectory: "public"`                                                                                                                                                                                   | `vercel.json`                  |
| **Node Pin File**                              | `14.16.0`                                                                                                                                                                                                                                                                            | `.nvmrc`                       |
| **Local Node Observed**                        | `v14.21.3` (`npm` locally; `yarn` CLI not installed locally)                                                                                                                                                                                                                         | Local runtime check            |
| **Vercel Project Settings Node**               | **`UNKNOWN (Not in repo)`** — `.nvmrc` says `14.16.0`, yet `0dcd160..e4a006f` succeeded with `NODE_OPTIONS=--openssl-legacy-provider` (a flag Node 14 rejects), strongly suggesting Vercel Project Settings overrides `.nvmrc` with Node 18+ or 20+. **Verify in Vercel Dashboard.** | **`TODO`**                     |
| **Lockfile / Install**                         | `yarn.lock` committed at root (`package-lock.json` absent). Vercel runs `yarn install` automatically when `yarn.lock` exists.                                                                                                                                                        | Repo root                      |
| **Legacy DigitalOcean CI**                     | GitHub Actions workflow triggered on push to `master` running `npm install --legacy-peer-deps && npm run clean && npm run build` via SSH.                                                                                                                                            | `.github/workflows/deploy.yml` |

---

## 2. Recorded Deployment Failure Log (24–25 Nov 2026)

Per accuracy rules, **verified repo/API observations** are strictly separated from **unknown causes** and **unproven hypotheses**:

| Date / Target                                                 | Commit / Ref                                                               | Status Observed                                             | Verified Facts in Repo / API                                                                                                                                                                                                                                                                                                                                 | Unknowns & Hypotheses (Not Proven Root Cause)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **24 Nov 2026** — Vercel Production (`yarn install`)          | `bfa6457` (followed by `2fa538e` & `0dcd160`)                              | **`failure`** (`dpl_EyoJ5Jn5LmBkge6ZfSg5xjir...`)           | Commit `2fa538e` (`fix(deps): remove invalid dual sha integrity hashes in yarn.lock`) edited 800 lines in `yarn.lock`, and `0dcd160` added `vercel.json` with `NODE_OPTIONS=--openssl-legacy-provider`. `0dcd160` then passed on Vercel (`state: success`).                                                                                                  | Full Vercel stderr log for `bfa6457` is not in the repo. Hypothesis only: dual SHA integrity hashes in `yarn.lock` caused `yarn install` failure, and OpenSSL 3 on Vercel Node required `--openssl-legacy-provider` for Gatsby 3 / Webpack 5 MD4 hashing.                                                                                                                                                                                                                                                                                                 |
| **24 Nov 2026** — DigitalOcean GitHub Actions (2x failures)   | `2fa538e` (run `#45344159713`), `0dcd160` (run `#45344783759`) on `master` | **`failure`** (2 consecutive `Deploy to DigitalOcean` runs) | GitHub Actions workflow `.github/workflows/deploy.yml` connects via SSH to `/var/www/portfolio-v2.0`, runs `rm -rf node_modules package-lock.json`, `npm install --legacy-peer-deps`, `npm run clean`, `npm run build`. Earlier July 2026 runs (`bfa6457`, `7bfc2cfd`, `23e39f2f`) succeeded.                                                                | Full GitHub Actions job logs were not fetched here (**unknown** exact step/error). Hypotheses only: SSH target state/timeout, `npm install` conflict after lockfile/dependency drift, or Node OpenSSL mismatch on the VPS (`deploy.yml` does not pass `NODE_OPTIONS=--openssl-legacy-provider`).                                                                                                                                                                                                                                                          |
| **25 Nov 2026 ~13:39 WIB** — Vercel Preview (`revamp/motion`) | `f700746` (`perf(motion): fix fonts, video media, terminal typing...`)     | **`failure`** (`dpl_B6z4c8ihaEm1ivLLCfGiFfcAcNMA`)          | GitHub status reports `Deployment has failed — run this Vercel CLI command: npx vercel inspect dpl_B6z4c8ihaEm1ivLLCfGiFfcAcNMA --logs`. Prior preview commits `2be8e57`, `de0088d`, and `e4a006f` all succeeded on Vercel (`state: success`). Later branch commit `dce912e` (`revamp/editorial`, `dpl_5rMZCfvFtJTs2mNV8HAC5SgrC4GU`) also failed on Vercel. | **Root cause is UNKNOWN** — cannot be proven from the email notification or repo files alone without full Vercel build logs. Hypotheses only: (1) Node 18+/20+ + `--openssl-legacy-provider` incompatibility inside Gatsby `3.4.1` build plugins (`css-minimizer-webpack-plugin` / `cssnano` / `svgo` / `postcss` triggered by external `base.css`, SSR/Webpack changes, or `i18next$` resolution), (2) Yarn hoisting vs local `npm` `node_modules` differences, or (3) stale `.cache` across `gatsby-config.js` / `gatsby-node.js` changes on `f700746`. |

---

## 3. Diagnostic Checks Required Before Next Push

Before pushing any revamp commit (`P0`, `P1`, or `P2`), run these checks in order:

1. **Fetch Exact Full Vercel Logs for Failing Deployment (`f700746` / `dce912e`):**

   ```bash
   npx vercel inspect dpl_B6z4c8ihaEm1ivLLCfGiFfcAcNMA --logs
   ```

   Record the exact failing line (`yarn install`, `bootstrap`, `Building JavaScript and CSS bundles`, `Building HTML renderer`, `Static HTML`, or `onPostBuild`).

2. **Verify Exact Node Version in Vercel Project Settings:**
   - Check Vercel Dashboard -> **Project Settings -> General -> Node.js Version**.
   - Reconcile `.nvmrc` (`14.16.0`), local dev Node, DigitalOcean VPS Node, and Vercel UI Node so all environments behave consistently (`TODO`: confirm which Node version Vercel and DigitalOcean actually run).

3. **Verify Lockfile Consistency (`yarn.lock`):**
   - If dependencies change or `yarn` resolves differently than `npm`, test with actual `yarn install --frozen-lockfile` under the **same Node version** used on Vercel (`NODE_OPTIONS=--openssl-legacy-provider` if Node 18/20+, omitted on Node 14/16).

4. **Verify DigitalOcean Workflow (`.github/workflows/deploy.yml`) Scope:**
   - Decide whether `.github/workflows/deploy.yml` (on `master` push) is still needed once Vercel handles production, or inspect GitHub Actions runs `#45344159713` / `#45344783759` before merging anything to `master`.

5. **Clean Local Build & Static Verification:**
   ```bash
   npx eslint src gatsby-*.js
   npm run clean && npm run build
   ```
   Ensure zero Sharp `pngquant` errors (such as mis-extensioned PNGs), zero missing case-sensitive imports on Linux (`git ls-files`), and preview branch Vercel status `"state": "success"` before requesting review.
