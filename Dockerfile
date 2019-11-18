FROM node:10-alpine

RUN mkdir app
WORKDIR /app

COPY ./package.json ./
RUN npm install

COPY . /app

ENV DATABASE_URL=postgres://wqopvhiv:j_rXyLzWCFjHV_IsUbgfU6ReWjdXu1Sl@salt.db.elephantsql.com:5432/wqopvhiv
ENV REDIS_URL=redis://h:p86fed41f8ca988508b270f5d3a8744c7d9002d8e638011b3132cf2a0b74e951f@ec2-18-200-151-182.eu-west-1.compute.amazonaws.com:6709
EXPOSE 3000
EXPOSE 19503



CMD [ "npm", "start" ]
