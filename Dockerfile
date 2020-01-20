FROM node:10
WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/
RUN yarn

COPY src /app/src/
COPY static /app/static/
RUN yarn build --production

ENTRYPOINT yarn start --production --port 80