FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files
COPY . .

# Explicitly set the command (without JSON array syntax)
CMD node server.js