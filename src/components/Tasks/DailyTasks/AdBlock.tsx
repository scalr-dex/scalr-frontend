import TaskUi from 'components/Tasks/TaskUi'
import UserAtom from 'helpers/atoms/UserAtom'
import useAdsgram from 'helpers/hooks/useAdsgram'
import { useAtom } from 'jotai'
import { useCallback } from 'preact/hooks'
import { iconNumberToComponent } from 'type/UserTask'

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
      icon={iconNumberToComponent(0)}
      taskText="Watch short video"
      rewardAmount={10000}
      onClick={showAd}
      extraData={`Per each. ${user?.remainingAds} left today.`}
      disabled={!hasAds}
    />
  )
}
