FROM node:20-slim AS base

# Yarn needs git for git-hosted transitive deps (e.g. libsignal-node from Baileys).
# node:*-slim images do not include git by default.
RUN apt-get update \
  && apt-get install -y --no-install-recommends git ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# .yarnrc sets ignore-engines (required for @img/sharp-* with Yarn Classic v1)
COPY package.json yarn.lock .yarnrc ./
RUN yarn install --frozen-lockfile

# Application source (required at runtime; was missing and broke Railway)
COPY src ./src

EXPOSE 3001

# Production: no --watch (suitable for Railway / Docker hosts)
CMD ["yarn", "run", "start"]
