import { writeAtom } from 'helpers/atoms/atomStore'
import dayjs from 'dayjs'
import { atomWithStorage } from 'jotai/utils'

const pendingTasksAtom = atomWithStorage<{ [taskId: number]: number }>(
  'pendingTasks',
  {}
)

export function setTaskPending(taskId: number) {
  writeAtom(pendingTasksAtom, (prev) => ({
    ...prev,
    [taskId]: dayjs().add(60, 'seconds').valueOf(),
  }))
}

export function clearPendingTask(taskId: number) {
  writeAtom(pendingTasksAtom, (prev) => {
    delete prev[taskId]
    return prev
  })
}

export default pendingTasksAtom
