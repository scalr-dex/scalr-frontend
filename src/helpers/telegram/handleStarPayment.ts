import { openInvoice } from '@telegram-apps/sdk-react'
import { writeAtom } from 'helpers/atoms/atomStore'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'
import handleError from 'helpers/handleError'

export default async function (link: string) {
  try {
    const status = await openInvoice(link, 'url')

    if (status === 'paid') {
      writeAtom(modalsAtom, null)
      setTimeout(() => writeAtom(modalsAtom, AvailableModals.successOrder), 200)
    }
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
