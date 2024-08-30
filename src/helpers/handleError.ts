import { toast } from 'react-toastify'
import Sentry from 'helpers/api/sentry'

function checkErrorAndCapture(e: unknown, message?: string) {
  const extra = { message }
  if (e instanceof Error) {
    Sentry.captureException(e, { extra })
  } else {
    Sentry.captureException(new Error(String(e), { cause: e }), {
      extra,
    })
  }
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
