import { useAdsgram } from 'helpers/hooks/useAdsGram'
import { toast } from 'react-toastify'
import env from 'helpers/env'
import SingleTask from 'components/Tasks/SingleTask'
import ButtonTypes from 'type/Button'

export default function () {
  const startAd = useAdsgram({
    blockId: env.VITE_ADSGRAM_BLOCK_ID,
    onReward: () => toast.success("You've been rewarded!"),
    onError: () => toast.error('Shoot! An error while watching the ad?!'),
  })

  return (
    <SingleTask
      icon={<span>👀</span>}
      rewardAmount={750}
      taskText="Watch Ad to get points"
      buttonType={ButtonTypes.secondary}
      onClick={startAd}
    >
      Watch
    </SingleTask>
  )
}
