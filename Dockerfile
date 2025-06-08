FROM mcr.microsoft.com/playwright:v1.43.1-jammy

WORKDIR /app

COPY . .

RUN npm ci

CMD ["npx", "playwright", "test"]
