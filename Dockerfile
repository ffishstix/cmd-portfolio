# Basisimage
FROM nginx:alpine

# Arbeitsverzeichnis festlegen
WORKDIR /usr/share/nginx/html

# Alle Dateien in das Arbeitsverzeichnis kopieren
COPY . .

# Exponiere Port 80 für Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
