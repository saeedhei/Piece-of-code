# Stage 1: Install Vue3 dependencies and build the production bundle
FROM node:18-alpine3.17 AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Copy production bundle to smaller image and Serve the built application
FROM nginx:stable-alpine AS runtime
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
