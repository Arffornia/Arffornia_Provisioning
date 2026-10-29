# ---- build: compile TypeScript with dev dependencies ----
FROM node:22.23.4-alpine3.23 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---- runtime: production dependencies + compiled output only ----
FROM node:22.23.4-alpine3.23 AS runtime

ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist

ENV INSTALL_BASE_PATH="/data"
ENV BASE_URL="https://raw.githubusercontent.com/Arffornia/Arffornia_Provisioning/refs/heads/main/"
ENV KIND="server"
ENV MODS_DIR_NAME="mods"

# Built-in non-root user of the node image (uid 1000). In Kubernetes the pod securityContext
# (runAsUser/fsGroup) still decides the effective uid and /data permissions.
USER node

CMD ["node", "dist/configUpdater.js"]
