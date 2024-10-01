import { readAtom } from 'helpers/atoms/atomStore'
import UserAtom from 'helpers/atoms/UserAtom'
import env from 'helpers/env'
import ky from 'ky'
import { AvailableAutoclaimOptions } from 'type/Market'

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

export default function (option: AvailableAutoclaimOptions) {
  return botBackend
    .post('payments/invoice', {
      json: { option },
    })
    .json<{ invoiceLink: string }>()
}
