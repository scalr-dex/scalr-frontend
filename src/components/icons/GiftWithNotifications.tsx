import UserAtom from 'helpers/atoms/UserAtom'
import { useAtomValue } from 'jotai'
import Gift from 'components/icons/Gift'

export default function () {
  const user = useAtomValue(UserAtom)

  const hasTasks = !!user?.remainingTasks

  return (
    <div className="relative">
      <Gift />
      {hasTasks ? (
        <div className="h-2.5 w-2.5 bg-error rounded-full absolute top-0 -right-0.5" />
      ) : null}
    </div>
  )
}
