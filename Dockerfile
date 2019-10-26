FROM node:10-alpine

RUN mkdir app
WORKDIR /app

COPY ./package.json ./
RUN npm install

COPY . /app

EXPOSE 3000

CMD [ "npm", "start" ]
