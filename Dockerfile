ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
ENV SENTRY_URL=$SENTRY_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_AMPLITUDE_API_KEY=$VITE_AMPLITUDE_API_KEY
ENV VITE_VITE_ANALYTICS_KEY=$VITE_VITE_ANALYTICS_KEY
ENV VITE_APP_BASE_LINK=$VITE_APP_BASE_LINK
ENV VITE_SENTRY_DSN=$VITE_SENTRY_DSN
ENV VITE_ADSGRAM_BLOCK_ID=$VITE_ADSGRAM_BLOCK_ID

FROM node:20.12-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn install

RUN SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN SENTRY_URL=$SENTRY_URL VITE_BACKEND_URL=$VITE_BACKEND_URL VITE_AMPLITUDE_API_KEY=$VITE_AMPLITUDE_API_KEY VITE_VITE_ANALYTICS_KEY=$VITE_VITE_ANALYTICS_KEY VITE_APP_BASE_LINK=$VITE_APP_BASE_LINK VITE_SENTRY_DSN=$VITE_SENTRY_DSN VITE_ADSGRAM_BLOCK_ID=$VITE_ADSGRAM_BLOCK_ID yarn build

CMD [yarn, prod]
