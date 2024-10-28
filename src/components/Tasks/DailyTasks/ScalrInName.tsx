import TaskUi from 'components/Tasks/TaskUi'
import { getDailyNickname } from 'helpers/api/dailyReward'
import UserAtom from 'helpers/atoms/UserAtom'
import handleError from 'helpers/handleError'
import { successConfetti } from 'helpers/shootConfetti'
import { useAtomValue } from 'jotai'
import { useCallback, useState } from 'preact/hooks'
import { iconNumberToComponent } from 'type/UserTask'

const keyword = '🌀SCALR'

export default function () {
  const [loading, setLoading] = useState(false)
  const user = useAtomValue(UserAtom)
  const [disabled, setDisabled] = useState(!user?.nicknameClaimAvailable)

  const onClick = useCallback(async () => {
    if (!user) return
    try {
      setLoading(true)

      if (
        !user.firstName.includes(keyword) &&
        !user.lastName?.includes(keyword)
      ) {
        const e = `You don't have ${keyword} in your name`
        handleError({ e, toastMessage: e })
        return
      }

      await getDailyNickname()
      await successConfetti()
      setDisabled(true)
    } catch (e) {
      handleError({
        e,
        toastMessage: 'Failed to claim your reward 😥 Please try again',
      })
    } finally {
      setLoading(false)
    }
  }, [user])

  return (
    <>
      <TaskUi
        icon={iconNumberToComponent(-2)}
        taskText={`${keyword} in name`}
        rewardAmount={500}
        disabled={disabled}
        onClick={onClick}
        loading={loading}
      />
    </>
  )
}
