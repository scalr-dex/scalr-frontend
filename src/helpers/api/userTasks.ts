import handleError from 'helpers/handleError'
import backendKy from 'helpers/api/backendKy'
import UserTask from 'type/UserTask'

export async function getTasks() {
  try {
    return await backendKy().get('tasks').json<UserTask[]>()
  } catch (e) {
    handleError({ e })
  }
}

export async function markTaskDone(id: number) {
  try {
    return await backendKy().post(`tasks/${id}`)
  } catch (e) {
    handleError({ e })
  }
}

export async function claimTask(id: number) {
  try {
    return await backendKy().post(`tasks/claim/${id}`)
  } catch (e) {
    handleError({ e })
  }
}
