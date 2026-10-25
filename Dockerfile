# syntax=docker/dockerfile:1.7

# ---------- Build ----------
FROM node:22-alpine AS build
WORKDIR /app

ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    ASTRO_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@10.18.0 --activate

# Dependencias primero para aprovechar la caché de capas
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# ---------- Runtime ----------
FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
