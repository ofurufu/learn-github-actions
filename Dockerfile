# ── Stage 1: Install production dependencies ──────────────────────────────
FROM node:22-alpine AS deps

WORKDIR /app

# Copy only manifests first to maximise layer cache
COPY package*.json ./

# Install production deps only (skip devDependencies)
RUN npm ci --omit=dev


# ── Stage 2: Final runtime image ───────────────────────────────────────────
FROM node:22-alpine AS runner

# Security: run as non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy production node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY src/ ./src/
COPY package.json ./

# Switch to non-root user before starting the app
USER appuser

EXPOSE 3000

# Health check so orchestrators (Docker, ECS, k8s) know the app is alive
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "src/index.js"]
