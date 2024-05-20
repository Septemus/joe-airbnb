FROM node

WORKDIR /abb

COPY ./package.json .
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/common/package.json ./packages/common/
COPY ./packages/controllers/package.json ./packages/controllers/


RUN yarn --production

COPY ./packages/server/dist/ ./packages/server/dist/
COPY ./packages/common/dist/ ./packages/common/dist/
COPY ./packages/controllers/dist/ ./packages/controllers/dist/

COPY ./packages/server/.env.prod ./packages/server/
COPY ./ormconfig.json .

WORKDIR ./packages/server

ENV NODE_ENV production

EXPOSE 4000

CMD [ "node","dist/index.js" ]
