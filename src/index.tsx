import 'index.css'
import 'react-toastify/dist/ReactToastify.css'
import { render } from 'preact'
import App from 'App'
import { initSentry } from 'helpers/api/sentry'
import { initAnalytics } from 'helpers/api/analytics'
import dayjs from 'dayjs'
import objectSupport from 'dayjs/plugin/objectSupport'

dayjs.extend(objectSupport)
initSentry()
initAnalytics()

render(<App />, document.getElementById('root') as Element)
