FROM node:carbon-stretch-slim AS build

LABEL maintainer="danieldarosati@gmail.com"

COPY ./ /usr/src/app

WORKDIR /usr/src/app

RUN npm install

FROM build

EXPOSE $API_PORT

ENTRYPOINT ["node", "app.js"]