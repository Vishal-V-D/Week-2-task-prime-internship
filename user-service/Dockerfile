# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Install ts-node-dev globally for dev
RUN npm install -g ts-node-dev typescript

# Expose port
EXPOSE 4000

# Start the app
CMD ["npx", "ts-node-dev", "src/index.ts"]
