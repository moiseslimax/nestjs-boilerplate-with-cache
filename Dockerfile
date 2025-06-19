# Stage 1: Build the app
FROM node:23.10-alpine AS builder

WORKDIR /app

# Copy only the necessary files to install dependencies and build
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app (make sure tsconfig.json and src/ exist)
RUN npm run build

# Stage 2: Run the app
FROM node:23.10-alpine

WORKDIR /app

# Only copy the dist/ folder and node_modules from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "dist/main"]
