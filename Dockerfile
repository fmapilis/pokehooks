FROM node:8.9.0-alpine

RUN apk add --no-cache bash git

WORKDIR     /app

ADD         package.json /app
ADD         yarn.lock /app
RUN         yarn install

ADD         . /app
RUN         yarn run build
CMD         node server.js
