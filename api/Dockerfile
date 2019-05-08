FROM node:10

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
COPY config ./config
COPY .sequelizerc ./.sequelizerc
COPY migrations ./migrations
COPY seeders ./seeders

RUN ls .


RUN yarn global add sequelize-cli
RUN yarn

RUN yarn s db:create 2>&1 > ./build-time.log || echo "build-time-error"
RUN yarn s db:migrate 2>&1 > ./build-time.log || echo "build-time-error"
RUN yarn s:seed 2>&1 > ./build-time.log || echo "build-time-error"

# Running the app
CMD  [ "yarn", "serve:watch" ]
