# Caffed

A premium coffee landing page built with Next.js and Tailwind CSS.

## Local development

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

## Build static site

This project uses `output: "export"` in Next.js and generates a static site into the `out/` folder.

```bash
npm run build
```

## Deploy with GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

To publish:

1. Push your code to the `main` branch.
2. In GitHub, go to **Settings -> Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. The workflow will build and deploy automatically.

If your repo is `https://github.com/<username>/<repo>`, the site URL will be:

`https://<username>.github.io/<repo>/`

## Retrying Shopify CLI commands (same repo)

If you run Shopify CLI commands and want simple retries **without re-cloning** (same working directory), use:

```bash
# Retries npx shopify <args...> up to 3 times (default)
npm run shopify:retry -- theme push
```

Configuration (optional):

```bash
# 5 retries, exponential backoff starting at 2s (default) with multiplier 2 (default)
RETRY_RETRIES=5 RETRY_BACKOFF_MS=2000 RETRY_BACKOFF_MULTIPLIER=2 npm run shopify:retry -- theme push
```
