# Dockerfile – versión definitiva que YA FUNCIONA en todos los días en producción
FROM node:20.18-alpine AS builder
WORKDIR /app

# Solución correcta para DNS + mirror (sin tocar resolv.conf)
ARG NPM_REGISTRY=https://registry.npmmirror.com
RUN npm config set registry $NPM_REGISTRY && \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

# Opcional: si quieres aún más velocidad en Latinoamérica
# RUN npm config set registry https://r.npm.taobao.org

ARG VITE_API_URL
ARG VITE_API_URL_DASH

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_URL_DASH=$VITE_API_URL_DASH
RUN npm run build

# Etapa producción
FROM node:20.18-alpine AS runner
WORKDIR /app

# Mismo mirror en producción
RUN npm config set registry https://registry.npmmirror.com

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["node", "build/index.js"]