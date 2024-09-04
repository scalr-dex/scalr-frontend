import handleError from 'helpers/handleError'
import backendKy from 'helpers/api/backendKy'
import UserTask from 'type/UserTask'
import { successConfetti } from 'helpers/shootConfetti'
import { track } from '@amplitude/analytics-browser'
import TrackerEvents from 'type/TrackerEvernts'

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
    await backendKy().post(`tasks/claim/${id}`)
    void successConfetti()
    track(TrackerEvents.taskClaimed, { taskId: id })
  } catch (e) {
    handleError({
      e,
      toastMessage: 'Failed to claim rewards 😿 Please try again later 🥺',
    })
  }
}
