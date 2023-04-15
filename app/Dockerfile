FROM node:8.9.1-alpine as step01
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run serve

FROM nginx:1.13.6
WORKDIR /usr/share/nginx/html
COPY --from=step01 /app/src/dist .