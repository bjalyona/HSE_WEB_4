FROM node:20

# Установка переменной окружения (важно отключить production)
ENV NODE_ENV=development

WORKDIR /app

# Скопировать package.json и package-lock.json (если есть)
COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

COPY docker-entrypoint.sh /usr/local/bin/
COPY wait-for-it.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/docker-entrypoint.sh /usr/local/bin/wait-for-it.sh

ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 4000

CMD ["npm", "run", "dev"]
