# ===== BUILD STAGE =====
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma.config.ts ./prisma.config.ts
RUN npm ci

COPY . .
RUN npm run build
RUN npx prisma generate


# ===== PRODUCTION STAGE =====
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
COPY prisma.config.ts ./prisma.config.ts

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN npx prisma generate

EXPOSE 3010

CMD sh -c "npx prisma migrate deploy && node dist/src/main.js"