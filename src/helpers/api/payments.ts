import { readAtom } from 'helpers/atoms/atomStore'
import UserAtom from 'helpers/atoms/UserAtom'
import env from 'helpers/env'
import ky from 'ky'

const botBackend = ky.create({
  prefixUrl: env.VITE_BOT_API,
  hooks: {
    beforeRequest: [
      (request) => {
        const tma = readAtom(UserAtom)?.launchParams.initDataRaw
        request.headers.set('Authorization', `tma ${tma}`)
      },
    ],
  },
})

export default function (amount: number) {
  return botBackend
    .post('payments/invoice', {
      json: { amount },
    })
    .json<{ invoiceLink: string }>()
}
