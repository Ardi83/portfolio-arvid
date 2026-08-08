# syntax=docker/dockerfile:1

# ---- build ----------------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app

ENV CI=true

# Yarn 4 is pinned via packageManager + .yarnrc.yml yarnPath, so the release
# has to be present before install.
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases ./.yarn/releases
RUN corepack enable && yarn install --immutable

COPY . .
RUN yarn build

# ---- runtime --------------------------------------------------------------
FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    DATABASE_URL=file:/app/data/local.db

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases ./.yarn/releases
# Runtime needs only express + @libsql/client; skip the build toolchain.
RUN corepack enable && yarn workspaces focus --production && yarn cache clean

COPY --from=build /app/dist ./dist
COPY --from=build /app/dist-server ./dist-server

# The database is bind-mounted here by docker-compose.
RUN mkdir -p /app/data

EXPOSE 3000

# node:alpine ships a `node` user; don't run as root.
RUN chown -R node:node /app
USER node

CMD ["node", "dist-server/server/index.js"]
