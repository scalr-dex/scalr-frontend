import 'index.css'
import 'bottom-sheet.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-spring-bottom-sheet/dist/style.css'
import { render } from 'preact'
import App from 'App'
import { initSentry } from 'helpers/api/sentry'
import { initAnalytics } from 'helpers/api/analytics'

initSentry()
initAnalytics()

render(<App />, document.getElementById('root') as Element)
