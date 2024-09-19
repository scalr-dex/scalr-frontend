import { toast } from 'react-toastify'
import Sentry from 'helpers/api/sentry'

function checkErrorAndCapture(e: unknown, message?: string) {
  const extra = { message }

  Sentry.setExtra('full-error', e)
  Sentry.captureException(e, { extra })
}

export default function ({
  e,
  toastMessage,
  sentryCapture = true,
}: {
  e: unknown
  toastMessage?: string
  sentryCapture?: boolean
}) {
  console.error(e)
  if (toastMessage) toast.error(toastMessage)
  if (sentryCapture) checkErrorAndCapture(e, toastMessage)
}
