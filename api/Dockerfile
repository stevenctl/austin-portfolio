FROM node:latest

ADD bin/ /usr/local/bin
# ADD public/ /usr/local/public
ADD routes/ /usr/local/routes
ADD .eslintrc app.js package.json yarn.lock /usr/local/

# TODO - don't add node_modules/; right now my local is 401'ing dependency installation
ADD node_modules/ /usr/local/node_modules

WORKDIR /usr/local
ENTRYPOINT node ./bin/start