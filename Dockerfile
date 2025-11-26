FROM node:24-alpine AS builder
WORKDIR /app

# Argumentos de build para las variables VITE
ARG VITE_API_URL
ARG VITE_API_URL_DASH

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias con más memoria
RUN NODE_OPTIONS="--max-old-space-size=4096" npm ci

# Copiar el resto del código
COPY . .

# Build con variables de entorno y más memoria
RUN NODE_OPTIONS="--max-old-space-size=4096" \
    VITE_API_URL=$VITE_API_URL \
    VITE_API_URL_DASH=$VITE_API_URL_DASH \
    npm run build

# Etapa de producción
FROM node:24-alpine AS runner
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["node", "build/index.js"]