import { atomWithStorage } from 'jotai/utils'
import { writeAtom } from 'helpers/atoms/atomStore'

export const failsBeforeClaim = 1

export const taskFailCounterAtom = atomWithStorage<{
  [taskId: number]: number
}>('taskFailCounter', {}, undefined, { getOnInit: true })

export function increaseFailAmount(taskId: number) {
  writeAtom(taskFailCounterAtom, (prev) => ({
    ...prev,
    [taskId]: prev[taskId] || 0 + 1,
  }))
}

export function clearTaskFails(taskId: number) {
  writeAtom(taskFailCounterAtom, (prev) => {
    delete prev[taskId]
    return prev
  })
}
