FROM node:latest

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install

RUN npm run build

CMD [ "nginx", "-g", "daemon off;" ]
