# Dockerfile – funciona en tu VPS actual sin cambiar nada más
FROM node:20.19.0-slim AS builder
WORKDIR /app

ARG VITE_API_URL
ARG VITE_API_URL_DASH

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_URL_DASH=$VITE_API_URL_DASH
RUN npm run build

# Etapa final
FROM node:20.19.0-slim
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["node", "build/index.js"]