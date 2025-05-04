FROM node:23.11-alpine3.21 AS builder

WORKDIR /app

COPY package.json tsconfig.json ./
RUN npm install

COPY . .
RUN npm run build

ENV INSTALL_BASE_PATH="/data"
ENV BASE_URL="https://raw.githubusercontent.com/Arffornia/Arffornia_Network/refs/heads/main/"
ENV KIND="server"

CMD ["sh", "-c", "node dist/configUpdater.js \"$INSTALL_BASE_PATH\" \"$BASE_URL\" \"$KIND\""]
