FROM node:8.3

ENV CONTAINER_PATH /usr/tilas/server

RUN mkdir -p $CONTAINER_PATH

COPY . $CONTAINER_PATH
WORKDIR $CONTAINER_PATH

RUN npm install

RUN npm i -g nodemon

EXPOSE 7001
EXPOSE 9229

ENTRYPOINT npm run start:watch
