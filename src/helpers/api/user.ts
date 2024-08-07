import handleError from 'helpers/handleError'
import backendKy from 'helpers/api/backendKy'
import User from 'type/User'

export async function getUser() {
  try {
    return await backendKy.get('user').json<User>()
  } catch (e) {
    handleError({ e })
  }
}

export function postUser() {}
