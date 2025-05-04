# Étape 1 : Build Angular
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production

# Étape 2 : Serveur Nginx
FROM nginx:alpine
# Copie des fichiers buildés (vérifiez le chemin dans angular.json)
COPY --from=build /app/dist/book-frontend/browser /usr/share/nginx/html
# Copie de la configuration Nginx (chemin corrigé)
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# Exposition du port (bonne pratique)
EXPOSE 80
