# GitHub Actions Demo — Lesson 4: Real CI Pipeline

A production-quality Node.js/Express app wired up to a full GitHub Actions CI/CD pipeline.

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 22 (LTS) | Runtime |
| Express | 4.21 | HTTP server |
| Jest | 29.7 | Testing + coverage |
| ESLint | 9.27 | Linting (flat config) |
| Supertest | 7.1 | HTTP integration tests |

---

## Quick Start

```bash
# 1. Clone and install
git clone https://github.com/YOUR_USERNAME/github-actions-demo.git
cd github-actions-demo
npm install

# 2. Lint
npm run lint

# 3. Test (with coverage)
npm test

# 4. Build
npm run build

# 5. Start the server locally
npm start
# → http://localhost:3000
```

---

## API Endpoints

| Method | Path | Response |
|--------|------|----------|
| GET | `/` | `{ status: "ok", message: "Hello from CI!" }` |
| GET | `/health` | `{ healthy: true, uptime: <seconds> }` |
| GET | `/version` | `{ version: "1.0.0" }` |

---

## Workflows

### `ci.yml` — runs on every push / PR to `main`

```
push / PR
  ├── 🔍 lint          (ESLint 9 flat config)
  ├── 🧪 test ×2       (matrix: Node 20 + Node 22)
  │     └── uploads coverage artifact
  ├── 🔨 build         (needs: lint + test)
  │     └── uploads dist/ artifact
  └── 🔐 security      (npm audit + npm outdated)
```

### `docker.yml` — runs on push to `main` or a published Release

Builds a multi-platform image (`linux/amd64` + `linux/arm64`) and pushes to Docker Hub with layer caching via GitHub Actions cache.

---

## Secrets to configure in GitHub

Go to **Settings → Secrets and variables → Actions** and add:

| Secret | Description |
|--------|-------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token (not your password) |

---

## What changed from the tutorial version

| Item | Tutorial | This version |
|------|----------|--------------|
| ESLint config | `.eslintrc` (removed in ESLint 9) | `eslint.config.mjs` (flat config) |
| `eslint` | `^8.0.0` | `^9.27.0` |
| `supertest` | `^6.0.0` | `^7.1.0` |
| `express` | `^4.18.0` | `^4.21.2` |
| Node version | 20 | 22 (current LTS) |
| Matrix builds | None | Node 20 + 22 |
| Docker action | `build-push-action@v5` | `build-push-action@v6` |
| Dockerfile | Single-stage | Multi-stage + non-root user + HEALTHCHECK |
| Concurrency | None | `cancel-in-progress: true` |
