import { atomWithStorage } from 'jotai/utils'
import { writeAtom } from 'helpers/atoms/atomStore'

export const failsBeforeClaim = 1

const taskFailCounterAtom = atomWithStorage<{ [taskId: number]: number }>(
  'taskFailCounter',
  {}
)

export function increaseFailAmount(taskId: number) {
  writeAtom(taskFailCounterAtom, (prev) => ({
    ...prev,
    [taskId]: prev[taskId] + 1,
  }))
}

export function clearTaskFails(taskId: number) {
  writeAtom(taskFailCounterAtom, (prev) => {
    delete prev[taskId]
    return prev
  })
}

export default taskFailCounterAtom
