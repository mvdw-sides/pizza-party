FROM node:10

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./

RUN ls -la .
RUN rm -rf node_modules
RUN yarn add node-sass
RUN npm rebuild --update-binary
RUN yarn --pure-lockfile


# Running the app
CMD  [ "yarn", "dev" ]
