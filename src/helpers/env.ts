import { bool, cleanEnv, num, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_BACKEND_URL: str(),
  VITE_AMPLITUDE_API_KEY: str(),
  VITE_APP_BASE_LINK: str(),
  VITE_SENTRY_DSN: str(),
  VITE_ANALYTICS_KEY: str({ default: 'G-EMH5CHPBXL' }),
  VITE_ADSGRAM_BLOCK_ID: num({ default: 3152 }),
  DEV: bool({ default: import.meta.env.DEV }),
})
