FROM node:24-alpine AS builder

WORKDIR /app

# Argumentos de build para las variables VITE (leídos desde docker-compose.yml)
ARG VITE_API_URL
ARG VITE_API_URL_DASH

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código fuente de la aplicación Svelte
COPY . .

# Pasar las variables VITE_ (ARG) directamente al comando 'npm run build'.
# Esto es esencial para que Vite las lea e inyecte en el código JavaScript compilado.
RUN VITE_API_URL=$VITE_API_URL VITE_API_URL_DASH=$VITE_API_URL_DASH npm run build

# Etapa de producción (ligera)
FROM node:24-alpine AS runner

WORKDIR /app

# Copiar package.json para instalar solo dependencias de producción
COPY package*.json ./

# Instalar solo dependencias de producción (omitiendo devDependencies)
RUN npm ci --force

# Copiar la aplicación construida desde la etapa de build
# Asumiendo que SvelteKit/Vite deja el output en un directorio llamado 'build'.
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

# Exponer el puerto (para documentación y redes Docker/Host)
EXPOSE 3000

# Comando para iniciar la aplicación (ejecutando el servidor Node.js)
# Asumiendo que el script de inicio es `build/index.js`
CMD ["node", "build/index.js"]