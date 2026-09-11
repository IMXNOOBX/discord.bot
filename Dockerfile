# syntax=docker/dockerfile:1

FROM node:24.11.0 AS build

COPY . .

RUN npm install

CMD ["npm", "run", "start"]
