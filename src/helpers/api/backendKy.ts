import { readAtom } from 'helpers/atoms/atomStore'
import UserAtom from 'helpers/atoms/UserAtom'
import env from 'helpers/env'
import ky from 'ky'

export default (launchParams?: string) =>
  ky.create({
    prefixUrl: env.VITE_BACKEND_URL,
    hooks: {
      beforeRequest: [
        (request) => {
          const tma =
            launchParams || readAtom(UserAtom)?.launchParams.initDataRaw
          request.headers.set('Authorization', `tma ${tma}`)
        },
      ],
    },
  })
