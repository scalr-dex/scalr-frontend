import TaskUi from 'components/Tasks/TaskUi'
import UserAtom from 'helpers/atoms/UserAtom'
import useAdsgram from 'helpers/hooks/useAdsgram'
import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { iconNumberToComponent } from 'type/UserTask'

const rewardAmount = 500

export default function () {
  const [user, setUser] = useAtom(UserAtom)
  const onReward = useCallback(() => {
    setUser((prev) =>
      prev ? { ...prev, remainingAds: prev.remainingAds - 1 } : null
    )
  }, [setUser])
  const showAd = useAdsgram({ onReward, rewardAmount })
  const hasAds = !!user?.remainingAds

  return (
    <TaskUi
      icon={iconNumberToComponent(0)}
      taskText="Watch short video"
      rewardAmount={rewardAmount}
      onClick={showAd}
      extraData={`Per each. ${user?.remainingAds} left today.`}
      disabled={!hasAds}
    />
  )
}
