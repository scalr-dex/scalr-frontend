import UserTask from 'type/UserTask'

export const specialTasks = [7, 18]

export default function (a: UserTask, b: UserTask) {
  const aIsSpecial = specialTasks.includes(a.TaskID)
  const bIsSpecial = specialTasks.includes(b.TaskID)

  // Place 'Claimed' tasks at the end
  if (a.Status === 'Claimed' && b.Status !== 'Claimed') return 1
  if (a.Status !== 'Claimed' && b.Status === 'Claimed') return -1

  // Place special tasks higher
  if (aIsSpecial && !bIsSpecial) return -1
  if (!aIsSpecial && bIsSpecial) return 1

  return 0
}
