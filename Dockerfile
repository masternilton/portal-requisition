# Dockerfile – funciona aunque tu VPS pierda internet 10 veces
FROM node:20.19.0-alpine AS builder
WORKDIR /app

# 1. Usamos el registry oficial pero con retries brutales
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retries 10 && \
    npm config set fetch-retry-mintimeout 30000 && \
    npm config set fetch-retry-maxtimeout 300000 && \
    npm config set prefer-offline true

ARG VITE_API_URL
ARG VITE_API_URL_DASH

# 2. Instalamos dependencias (esta capa se cachea para siempre)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# 3. COPIAMOS TODO EL CÓDIGO ANTES del build → así npm/yarn/pnpm nunca vuelve a internet
COPY . .

# 4. Forzamos modo 100 % offline para el build
ENV npm_config_offline=true
ENV npm_config_cache=/tmp/.npm
RUN npm run build

# ——————————————————————
FROM node:20.19.0-alpine AS runner
WORKDIR /app

RUN npm config set registry https://registry.npmjs.org/

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["node", "build/index.js"]