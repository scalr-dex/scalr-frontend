import UserTask from 'type/UserTask'

export const specialTasks = [7]

export default function (a: UserTask, b: UserTask) {
  if (specialTasks.includes(a.TaskID) && a.Status !== 'Claimed') return -1
  return a.Status < b.Status ? 1 : -1
}
