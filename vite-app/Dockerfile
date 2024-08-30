# Build the App
FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

ARG VITE_APP_ENV
ENV VITE_APP_ENV=${VITE_APP_ENV}

RUN npm install --legacy-peer-deps
RUN npm run build

# Host the App
FROM nginx:latest

ARG CONTAINER_PORT
ENV CONTAINER_PORT=${CONTAINER_PORT}

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
WORKDIR /etc/nginx
COPY --from=builder ./app/nginx.conf ./nginx.conf.template

RUN sed "s/\$CONTAINER_PORT/${CONTAINER_PORT}/g" ./nginx.conf.template > ./nginx.conf

EXPOSE ${CONTAINER_PORT}
ENTRYPOINT ["nginx", "-g", "daemon off;"]
