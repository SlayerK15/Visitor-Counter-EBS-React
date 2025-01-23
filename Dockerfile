# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Runner
FROM nginx:alpine-slim
# Add nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built assets from builder stage
COPY --from=builder /app/build /usr/share/nginx/html
# Expose port 80
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]