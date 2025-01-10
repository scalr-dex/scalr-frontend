import TaskUi from 'components/Tasks/TaskUi'
import adReward from 'helpers/api/adReward'
import UserAtom from 'helpers/atoms/UserAtom'
import handleError from 'helpers/handleError'
import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { iconNumberToComponent } from 'type/UserTask'
import { useSpotAd } from 'spot-ads-react'

const rewardAmount = 1000

export default function AdBlock() {
  const { showAd } = useSpotAd()

  const [user, setUser] = useAtom(UserAtom)
  const hasAds = !!user?.remainingAds

  const onSuccess = useCallback(async () => {
    if (!user?.telegramId) return

    try {
      await adReward(user.telegramId)
      setUser((prev) =>
        prev ? { ...prev, remainingAds: prev.remainingAds - 1 } : null
      )
      toast.success(`Nice, you got ${rewardAmount} pts 😎`)
    } catch (e) {
      handleError({ e, toastMessage: 'Error on reward, please message us ;(' })
    }
  }, [user?.telegramId, setUser])

  const onClick = useCallback(() => {
    showAd({
      onSuccess,
      onError: () =>
        handleError({
          e: 'Failed to show AD',
          toastMessage: 'AD loading failed ;(',
        }),
    })
  }, [onSuccess, showAd])

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
