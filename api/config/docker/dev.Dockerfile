FROM node:10

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
COPY config ./config
COPY .sequelizerc ./.sequelizerc
COPY migrations ./migrations
COPY seeders ./seeders
COPY features ./features

RUN ls .


RUN yarn global add sequelize-cli
RUN yarn

# Running the app
CMD  [ "yarn", "serve:watch" ]
