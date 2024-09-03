import handleError from 'helpers/handleError'
import backendKy from 'helpers/api/backendKy'
import { ServerUser } from 'type/User'

export default async function getUser() {
  try {
    return await backendKy().get('user').json<ServerUser>()
  } catch (e) {
    handleError({ e })
  }
}

export async function setTonAddress(address: string) {
  try {
    await backendKy().post('wallet', { json: { address } })
  } catch (e) {
    handleError({ e })
  }
}
