FROM node:20.19.0-alpine

WORKDIR /app

# Solo dependencias de producción (rapidísimo)
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copiamos código fuente (pero sin node_modules ni build)
COPY . .

# Variables de entorno Vite en tiempo de build
ARG VITE_API_URL
ARG VITE_API_URL_DASH
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_URL_DASH=$VITE_API_URL_DASH

# El entrypoint hace la magia
COPY docker/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["app_entry.sh"]

EXPOSE 3000