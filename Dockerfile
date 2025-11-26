# Usa Node 20 (LTS)
FROM node:20-alpine

# Establece directorio de trabajo
WORKDIR /app

# Copia package files
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone puerto
EXPOSE 5173

# Comando por defecto
CMD ["npm", "run", "dev", "--", "--host"]