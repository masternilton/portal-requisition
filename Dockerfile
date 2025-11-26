# Esto es lo que más gente está usando en producción 2025 sin fallos
FROM node:20.18-alpine AS builder   
WORKDIR /app

# Forzamos la versión de npm que menos falla en Docker
RUN npm install -g npm@10.8.2

ARG VITE_API_URL
ARG VITE_API_URL_DASH

COPY package*.json ./
RUN npm install     

COPY . .
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_URL_DASH=$VITE_API_URL_DASH

RUN npm run build

# Producción
FROM node:20.18-alpine AS runner
WORKDIR /app
RUN npm install -g npm@10.8.2
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["node", "build/index.js"]