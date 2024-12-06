import 'index.css'
import 'react-toastify/dist/ReactToastify.css'
import App from 'App'
import { initSentry } from 'helpers/api/sentry'
import { initAnalytics } from 'helpers/api/analytics'
import dayjs from 'dayjs'
import objectSupport from 'dayjs/plugin/objectSupport'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import { createRoot } from 'react-dom/client'

dayjs.extend(objectSupport)
dayjs.extend(utc)
dayjs.extend(duration)
initSentry()
initAnalytics()

createRoot(document.getElementById('root') as Element).render(<App />)
