import { openInvoice } from '@telegram-apps/sdk-react'
import { writeAtom } from 'helpers/atoms/atomStore'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'
import handleError from 'helpers/handleError'

function defaultOnSuccess() {
  writeAtom(modalsAtom, null)
  setTimeout(() => writeAtom(modalsAtom, AvailableModals.successOrder), 200)
}

export default async function ({
  link,
  onSuccess = defaultOnSuccess,
}: {
  link: string
  onSuccess?: () => void
}) {
  try {
    const status = await openInvoice(link, 'url')

    if (status === 'paid') onSuccess()
    if (status === 'failed') throw Error('Stars payment failed')
    return status
  } catch (e) {
    handleError({
      e,
      toastMessage:
        'type' in e && e.type === 'ERR_ALREADY_CALLED'
          ? 'Please wait before making a new transaction'
          : 'Failed to process your transaction',
    })
  }
}
