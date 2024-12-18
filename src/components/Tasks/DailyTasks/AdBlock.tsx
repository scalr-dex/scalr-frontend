import TaskUi from 'components/Tasks/TaskUi'
import UserAtom from 'helpers/atoms/UserAtom'
import env from 'helpers/env'
import handleError from 'helpers/handleError'
import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { iconNumberToComponent } from 'type/UserTask'

declare global {
  interface Window {
    showAd: (
      apiKey: string,
      onSuccess: () => void,
      onError: (e: unknown) => void
    ) => void
  }
}

window.showAd = window.showAd || {}

const rewardAmount = 1000

export default function () {
  const [user, setUser] = useAtom(UserAtom)
  const hasAds = !!user?.remainingAds

  const onReward = useCallback(() => {
    setUser((prev) =>
      prev ? { ...prev, remainingAds: prev.remainingAds - 1 } : null
    )
    toast.success(`Nice, you got ${rewardAmount} pts 😎`)
  }, [setUser])

  const onClick = useCallback(() => {
    window.showAd(env.VITE_SPOT_AD_KEY, onReward, (e) =>
      handleError({ e, toastMessage: 'Failed to reward' })
    )
  }, [onReward])

  return (
    <TaskUi
      icon={iconNumberToComponent(0)}
      taskText="Watch short video"
      rewardAmount={rewardAmount}
      extraData={`Per each. ${user?.remainingAds} left today.`}
      onClick={onClick}
      disabled={!hasAds}
    />
  )
}
