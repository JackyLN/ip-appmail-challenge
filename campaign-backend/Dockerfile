FROM node:22-alpine

# Required system packages for Chromium
RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  nodejs \
  yarn \
  bash \
  udev \
  libstdc++ \
  --update

# Puppeteer expects this path to Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Set working dir
WORKDIR /app

# Copy deps
COPY package*.json ./
RUN npm install

# Copy app
COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
