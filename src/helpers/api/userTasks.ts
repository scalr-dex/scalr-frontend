import handleError from 'helpers/handleError'
import backendKy from 'helpers/api/backendKy'

export default async function () {
  try {
    return await backendKy().get('tasks').json<[]>()
  } catch (e) {
    handleError({ e })
  }
}
