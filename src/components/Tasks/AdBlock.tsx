import TaskUi from 'components/Tasks/TaskUi'
import UserAtom from 'helpers/atoms/UserAtom'
import useAdsgram from 'helpers/hooks/useAdsgram'
import { useAtom } from 'jotai'
import { useCallback } from 'preact/hooks'
import ButtonTypes from 'type/Button'
import { iconNumberToIcon } from 'type/UserTask'

export default function () {
  const [user, setUser] = useAtom(UserAtom)
  const onReward = useCallback(() => {
    setUser((prev) =>
      prev ? { ...prev, remainingAds: prev.remainingAds - 1 } : null
    )
  }, [setUser])
  const showAd = useAdsgram({ onReward })
  const hasAds = !!user?.remainingAds

  return (
    <TaskUi
      iconLeft={iconNumberToIcon[0]}
      taskText={`Watch short video (${user?.remainingAds} left)`}
      rewardAmount={hasAds ? 10000 : <span>Come back tomorrow</span>}
      buttonType={ButtonTypes.accent}
      onClick={showAd}
      disabled={!hasAds}
      allowDisabledClick={false}
    >
      Watch
    </TaskUi>
  )
}
