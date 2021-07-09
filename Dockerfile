FROM node:15

WORKDIR /server
COPY app/api/package.json .

WORKDIR /client
COPY app/client/package.json .

RUN yarn
COPY app/client/ ./
RUN yarn build

WORKDIR /server
RUN yarn
COPY app/api/ ./
RUN yarn build

WORKDIR /server/dist/public
RUN mv /client/build/* .

EXPOSE 3001

WORKDIR /server/dist
ENV NODE_ENV "production"
CMD yarn typeorm migration:run -t false && node src/server.js