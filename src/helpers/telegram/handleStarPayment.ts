import { openInvoice } from '@telegram-apps/sdk-react'
import handleError from 'helpers/handleError'
import { successConfetti } from 'helpers/shootConfetti'

export default async function (link: string) {
  try {
    const status = await openInvoice(link, 'url')
    if (status === 'paid') await successConfetti()
    if (status === 'failed') throw Error('Stars payment failed')
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
