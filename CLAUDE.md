# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-file Cloudflare Worker (`src/index.js`) that returns the caller's public IP. Plain text by default; JSON when called with `?format=json`. The IP is read from the `CF-Connecting-IP` header (set by Cloudflare's edge), falling back to `X-Forwarded-For`, then `0.0.0.0`. Both responses set `Access-Control-Allow-Origin: *`.

The public contract is documented in `openapi.yaml` (server: `https://api.ipfinder.de`). Keep the spec in sync when changing routing, query params, headers, or response shapes.

## Commands

- `npm run dev` — local Wrangler dev server at `http://localhost:8787/`
- `npm run lint` — ESLint (flat config, `eslint.config.js`)
- `npm run cloudflarelogin` — `wrangler login` (one-time, for manual deploys)
- `npm run deploy` — `wrangler deploy` to Cloudflare

No test runner is wired up — `@cloudflare/vitest-pool-workers` is installed as a devDependency but no `vitest` config or test script exists yet.

The package is ESM (`"type": "module"`), required for the flat ESLint config.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which runs `npm ci` and then `cloudflare/wrangler-action@v3`. The workflow needs two repo secrets: `CLOUDFLARE_API_TOKEN` (Edit Cloudflare Workers template) and `CLOUDFLARE_ACCOUNT_ID`. Manual deploys via `npm run deploy` still work and bypass CI.

`README.md` references the workflow as `ci-cd.yml`, but the actual file is `deploy.yml` — reconcile when convenient.

Worker config lives in `wrangler.jsonc` — `name`, `main` entrypoint, `compatibility_date`, and observability (invocation logs on, traces off).
