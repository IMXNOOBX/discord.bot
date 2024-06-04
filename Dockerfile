# syntax=docker/dockerfile:1

FROM node:20 AS build

COPY . .

RUN npm install

CMD ["npm", "run", "start"]