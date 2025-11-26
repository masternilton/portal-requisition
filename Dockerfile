# Dockerfile final – funciona siempre (2025)
FROM node:20.18-alpine AS builder
WORKDIR /app

# 1. DNS fiables (por si acaso)
RUN echo "nameserver 8.8.8.8" > /etc/resolv.conf && \
    echo "nameserver 1.1.1.1" >> /etc/resolv.conf

# 2. Mirror chino ultra-rápido y 99.999 % uptime (o Cloudflare)
RUN npm config set registry https://registry.npmmirror.com/

# 3. Opcional: más velocidad y menos timeouts
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

ARG VITE_API_URL
ARG VITE_API_URL_DASH

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_URL_DASH=$VITE_API_URL_DASH
RUN npm run build

# Producción
FROM node:20.18-alpine AS runner
WORKDIR /app

RUN echo "nameserver 8.8.8.8" > /etc/resolv.conf && \
    npm config set registry https://registry.npmmirror.com/

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["node", "build/index.js"]