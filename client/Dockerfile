FROM node:8.3

ENV CONTAINER_PATH /usr/tilas/client

RUN mkdir -p $CONTAINER_PATH

COPY . $CONTAINER_PATH
WORKDIR $CONTAINER_PATH

RUN npm install

EXPOSE 80

ENTRYPOINT npm start
