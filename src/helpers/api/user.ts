import handleError from 'helpers/handleError'
import backendKy from 'helpers/api/backendKy'
import { ServerUser } from 'type/User'

export async function getUser() {
  try {
    return await backendKy().get('user').json<ServerUser>()
  } catch (e) {
    handleError({ e })
  }
}

export function postUser() {}
