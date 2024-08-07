import env from 'helpers/env'
import ky from 'ky'

export default ky.create({
  prefixUrl: env.VITE_BACKEND_URL,
  headers: {
    // Authorization: authorization ? `tma ${authorization}` : undefined,
    Accept: 'application/json',
  },
})
