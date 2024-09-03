# Frontend code for scalr telegram mini app

TODO: create a `theme.ts` file that integrates with tailwind.config.js and can be used inside the app

## Updating .env variables

1. Update [.env.sample](.env.sample)
2. Update [deployflow.yml](.github/workflows/deployflow.yml)
3. Add env variables to environment **variables** [here](https://github.com/scalr-dex/scalr-frontend/settings/environments/3626706489/edit)

## Local launch

1. Install dependencies with `yarn`
2. Check `.env.sample` and create a `.env` file in project root
3. Run the server with `yarn start`
4. You can test in your browser, but you'll need a tg-bot

## Testing inside Telegram with Hot Module Reload

1. After running the server locally via `yarn start`, run `yarn expose-dev`, you'll see a temporary link in your terminal
   - It uses `cloudflared`, which may require installation, run `yarn cloudflared bin install`
2. Setup a bot in a [@BotFather](https://t.me/BotFather), don't use `Scalr` when naming so it won't popup in a telegram search.
   Use the link from `cloudflared`
   - No, you don't need test telegram account, your primary account is better because you can use it on any device (test accounts are not supported by Android)
3. Open the app in you mobile device and check if it works

- **Can I use `ngrok`?** - yes you can, but it will shut down in 3 hours, while you can keep `cloudflared` alive for days
- **Can I host using vite?** - I tried, it didn't work
- [Article](https://docs.ton.org/develop/dapps/telegram-apps/testing-apps) about testing the app on mobile in case something goes off
- [How to debug (use devtools) in telegram mini apps](https://docs.ton.org/develop/dapps/telegram-apps/testing-apps)

## Sentry integration

1. In order for sentry to work you'll need a `.env.sentry-build-plugin` in project root with `SENTRY_AUTH_TOKEN` in it, you can get it [here](https://docs.sentry.io/platforms/javascript/sourcemaps/uploading/vite/) after you login to sentry
2. Sourcemaps and versions are managed by [sentry/vite-plugin](vite.config.ts#L20)

## Backend

1. [Endpoints description](https://twisty-hour-7d6.notion.site/Mini-app-backend-e6a232073f114ed3913c66f4a76512fd)
