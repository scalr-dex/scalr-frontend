import { bool, cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_BACKEND_URL: str(),
  VITE_AMPLITUDE_API_KEY: str(),
  VITE_APP_BASE_LINK: str(),
  VITE_SENTRY_DSN: str(),
  VITE_ADSGRAM_BLOCK_ID: str(),
  DEV: bool({ default: import.meta.env.DEV }),
})
