<div align="center">
  <img width="120" height="120" src="assets/logo.svg" />

  <h1>Space Object 🪐</h1>

  <p align="center">
    <a href="https://spaceobject.xyz/"><img alt="Website" src="https://img.shields.io/badge/website-spaceobject.xyz-1a1a1a" /></a>
    <a href="https://docs.spaceobject.xyz/"><img alt="Docs" src="https://img.shields.io/badge/docs-read%20the%20docs-blue" /></a>
    <a href="https://x.com/spaceobject_xyz"><img alt="X" src="https://img.shields.io/twitter/follow/spaceobject_xyz" /></a>
  </p>
</div>

The frontend interface for Space Object — a cross-chain intent swap UI built with React, TanStack Router, and Tailwind CSS, deployed on Cloudflare.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Routing | TanStack Router (file-based) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Build | Vite |
| Linting / Formatting | Biome |
| Deployment | Cloudflare Workers (via Wrangler) |

## Supported chains

- **Mainnet** — Solana, Ethereum, Base
- **Testnet** — Solana Devnet, Ethereum Sepolia

## Getting started

**Prerequisites:** [Bun](https://bun.sh) ≥ 1.0

Install dependencies:

```sh
bun install
```

Start the dev server:

```sh
bun dev
```

## Available scripts

| Script | Description |
|---|---|
| `bun dev` | Start local dev server |
| `bun build` | Type-check and build for production |
| `bun run lint` | Lint and auto-fix with Biome |
| `bun run format` | Format all files with Biome |
| `bun run typecheck` | Run TypeScript type checking |
| `bun run preview` | Build and preview locally |
| `bun run deploy` | Build and deploy to Cloudflare |

## Deployment

The app is deployed as a Cloudflare Worker (static assets with SPA routing). Make sure you are authenticated with Wrangler before deploying:

```sh
bun run deploy
```

> [!NOTE]
> The `compatibility_date` in `wrangler.jsonc` should be kept up to date with the current date when making configuration changes.
