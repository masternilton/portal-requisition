# Etapa de construcción
FROM node:22-alpine AS builder
WORKDIR /app

# Argumentos Vite
ARG VITE_API_URL
ARG VITE_API_URL_DASH

# Copiamos solo lo necesario para aprovechar cache
COPY package*.json ./
RUN npm ci

# Copiamos el código fuente
COPY . .

# Variables de entorno para el build
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_URL_DASH=$VITE_API_URL_DASH

# Build de producción
RUN npm run build

# Etapa de producción (más ligera)
FROM node:22-alpine AS runner
WORKDIR /app

# Solo dependencias de producción
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copiamos el build
COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["node", "build/index.js"]