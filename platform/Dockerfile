FROM node:10

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY . .

RUN ls -la .
RUN rm -rf node_modules
RUN yarn add node-sass
RUN npm rebuild --update-binary
RUN yarn --pure-lockfile
RUN yarn build


# Running the app
CMD  [ "yarn", "dev" ]
