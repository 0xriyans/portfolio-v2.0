# Revamp Index & Reference Map (`PROMPT.md`)

Reference index for the portfolio rebuild on `migration/astro` (**Astro + Tailwind CSS v4 + Magic UI + Motion + Lottie + Rive**).

---

## Documentation Links

- **Architecture, Palette & Motion:** [docs/SPEC.md](./SPEC.md)
- **Verified Content Source of Truth:** [docs/CONTENT.md](./CONTENT.md)
- **Media, `astro:assets`, Lottie & Rive Slots:** [docs/ASSETS.md](./ASSETS.md)
- **Local Verification Commands:** [docs/DEPLOY.md](./DEPLOY.md)

---

## Core Constraints

1. **Palette:** `#FCF1D0` page canvas, `#FFFFFF` cards, `#010736` headings/primary text & primary CTA button, `#22396F` secondary/accent text, `#0D1C42` dark footer with `#FCF1D0` text, `10% #010736` hairline borders.
2. **Verified Content:** Only use the verified facts in [docs/CONTENT.md](./CONTENT.md) (`6+ years`, `Software Engineer` at Askrindo `2025–present`, `ryansgrt23@gmail.com`, 5 separate career entries, 13 production projects, verified metrics only).
3. **Open Configuration:** `PUBLIC_CONTACT_ENDPOINT` (`CONTACT_ENDPOINT`) defaults to `''` with `mailto:ryansgrt23@gmail.com` fallback; analytics remains disabled with no GA4 ID.
4. **Local-Only:** Stop at a green local `npm run build` / `npm run preview` check (`http://localhost:4321/`).
