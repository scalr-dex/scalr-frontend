FROM node:20.12-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn install

RUN yarn build

CMD ["yarn", "prod"]
