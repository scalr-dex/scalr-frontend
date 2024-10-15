import { readAtom } from 'helpers/atoms/atomStore'
import UserAtom from 'helpers/atoms/UserAtom'
import env from 'helpers/env'
import ky from 'ky'

export default ({
  prefixUrlAppend = '',
  initDataRaw,
}: {
  prefixUrlAppend?: string
  initDataRaw?: string
} = {}) =>
  ky.create({
    prefixUrl: env.VITE_BACKEND_URL + prefixUrlAppend,
    hooks: {
      beforeRequest: [
        (request) => {
          const tma =
            initDataRaw || readAtom(UserAtom)?.launchParams.initDataRaw
          request.headers.set('Authorization', `tma ${tma}`)
        },
      ],
    },
  })
