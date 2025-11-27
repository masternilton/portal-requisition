#!/bin/sh
set -e

echo "Iniciando portal-requisiciones..."

# Si la carpeta build NO existe → es la primera vez o alguien la borró
if [ ! -d "build" ]; then
  echo "No se encontró carpeta build → ejecutando npm install + npm run build (esto puede tardar 3–6 minutos la primera vez)"
  npm install --legacy-peer-deps
  npm run build
else
  echo "Carpeta build encontrada → saltando build (producción lista en < 8 segundos)"
fi

echo "Arrancando servidor Node..."
exec node build/index.js