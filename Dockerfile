# Etapa de construcción
FROM node:24-alpine AS builder

WORKDIR /app

# Argumentos de build para las variables VITE
ARG VITE_API_URL
ARG VITE_API_URL_DASH

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código
COPY . .

# Establecer las variables de entorno para el build
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_URL_DASH=$VITE_API_URL_DASH

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:24-alpine AS runner

WORKDIR /app

# Copiar package.json para instalar solo dependencias de producción
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --omit=dev

# Copiar la aplicación construida desde la etapa de build
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]