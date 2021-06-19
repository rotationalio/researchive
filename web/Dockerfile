FROM node:16 AS builder

WORKDIR /usr/src/app

# Dependencies
COPY package*.json ./
RUN npm install

# Build app with webpack
COPY . .
RUN npm run build

FROM nginx:stable

COPY --from=builder /usr/src/app/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENV NGINX_ENTRYPOINT_QUIET_LOGS=1
CMD [ "nginx", "-g", "daemon off;" ]