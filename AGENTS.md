# AGENTS.md

## Cursor Cloud specific instructions

This is a static Next.js (App Router) landing page for the "Caffed" protein bar brand. It exports to static HTML via `output: "export"` in `next.config.mjs`.

### Services

| Service | Command | Port |
|---|---|---|
| Dev server | `npm run dev` | 3000 |

### Key commands

See `README.md` for full details. Summary:

- **Dev server**: `npm run dev` → http://localhost:3000
- **Build (static export)**: `npm run build` → generates `out/` directory
- **Lint**: No dedicated lint script is configured; rely on the Next.js build for compile-time checks.

### Notes

- There is no backend, database, or API. All data is hardcoded in `app/page.js`.
- External images load from `images.unsplash.com`; the site renders fine without network access but images will be missing.
- The project uses Tailwind CSS v4 with `@tailwindcss/postcss` (not the older `tailwindcss` PostCSS plugin). The config is loaded via `@config "../tailwind.config.js"` in `app/globals.css`.
- Node.js 22 is used in CI (`.github/workflows/deploy.yml`). Any Node ≥ 18 works.
- The `package-lock.json` is committed; use `npm install` (not `pnpm` or `yarn`).
