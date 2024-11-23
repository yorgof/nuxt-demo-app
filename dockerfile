FROM node:23 AS build

WORKDIR /build

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:23-alpine

WORKDIR /app

COPY --from=build /build/.output ./

EXPOSE 3000

CMD ["node", "server/index.mjs"]