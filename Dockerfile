FROM node:20.19.0-alpine AS builder
WORKDIR /app

# Mirror ultra-estable + retries
RUN npm config set registry https://registry.npmmirror.com && \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000

ARG VITE_API_URL
ARG VITE_API_URL_DASH

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_URL_DASH=$VITE_API_URL_DASH
RUN npm run build

# Runner
FROM node:20.19.0-alpine AS runner
WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["node", "build/index.js"]