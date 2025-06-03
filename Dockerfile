# Official Playwright image with all dependencies and browsers
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Install dependencies
RUN npm ci

# Run Playwright install (just in case)
RUN npx playwright install --with-deps

# Default command (can be overrided in docker run)
CMD ["npx", "playwright", "test"]
