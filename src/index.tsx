import 'index.css'
import 'react-toastify/dist/ReactToastify.css'
import { render } from 'preact'
import App from 'App'
import { initSentry } from 'helpers/api/sentry'

initSentry()

render(<App />, document.getElementById('root') as Element)
