FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files
COPY . .

# Use the npm script to start
CMD ["npm", "start"]