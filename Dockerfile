FROM node:18-alpine

# 1. First install Chromium and its dependencies
# Alpine uses different package names than Debian-based images
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# 2. Set Puppeteer environment variables
# Prevents Puppeteer from downloading Chromium (we use system Chromium)
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# Points Puppeteer to the Alpine-installed Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# 3. Keep your existing WORKDIR (/app is fine)
# Changing from /usr/src/app to /app is acceptable - it's just a working directory
WORKDIR /app

# 4. Your existing caching optimization is good
COPY package*.json ./
RUN npm install

# 5. Copy remaining files
COPY . .

# 6. Your existing CMD is correct
CMD ["npm", "start"]