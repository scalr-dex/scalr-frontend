import handleError from 'helpers/handleError'
import backendKy from 'helpers/api/backendKy'
import UserTask from 'type/UserTask'
import { successConfetti } from 'helpers/shootConfetti'
import TrackerEvents from 'type/TrackerEvents'
import { track } from 'helpers/api/analytics'
import {
  clearTaskFails,
  increaseFailAmount,
} from 'helpers/atoms/taskFailCounter'

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
    increaseFailAmount(id)
    handleError({
      e,
      toastMessage: 'Task not completed. Please try again',
    })
  }
}

export async function claimTask(id: number) {
  try {
    await backendKy().post(`tasks/claim/${id}`)
    clearTaskFails(id)
    void successConfetti()
    track(TrackerEvents.taskClaimed, id)
  } catch (e) {
    handleError({
      e,
      toastMessage: 'Failed to claim points. Please try again',
    })
  }
}
