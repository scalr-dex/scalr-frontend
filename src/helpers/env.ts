import { bool, cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_BACKEND_URL: str(),
  VITE_AMPLITUDE_API_KEY: str(),
  VITE_APP_BASE_LINK: str(),
  DEV: bool({ default: import.meta.env.DEV }),
})
