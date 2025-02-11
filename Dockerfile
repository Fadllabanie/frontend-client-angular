# Stage 1: Build Angular (client-side only)
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build  # No SSR flags needed now

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/fawrybook-frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]