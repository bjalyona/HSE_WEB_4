FROM node:20

# Установка переменной окружения (важно отключить production)
ENV NODE_ENV=development

WORKDIR /app

# Скопировать package.json и package-lock.json (если есть)
COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "dev"]
