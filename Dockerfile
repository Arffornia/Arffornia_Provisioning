FROM node:23.11-alpine3.21 AS builder

WORKDIR /app

COPY package.json tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

ENV installBasePath='/data' \
    baseUrl='https://raw.githubusercontent.com/Arffornia/Arffornia_Network/refs/heads/main/' \
    kind='server'

CMD ["node", "dist/configUpdater.js", "/data", "https://raw.githubusercontent.com/Arffornia/Arffornia_Network/refs/heads/main/", "server"]
