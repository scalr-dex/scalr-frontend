import { useAdsgram } from 'helpers/hooks/useAdsGram'
import { toast } from 'react-toastify'
import env from 'helpers/env'
import SingleTask from 'components/Tasks/SingleTask'

export default function () {
  const ad = useAdsgram({
    blockId: env.VITE_ADSGRAM_BLOCK_ID,
    onReward: () => toast.success("You've been rewarded!"),
    onError: () => toast.error('Shoot! An error while watching the ad?!'),
  })

  return (
    <SingleTask
      icon={<span>AD</span>}
      rewardAmount={750}
      taskText="Watch Ad to get points"
      onClick={ad}
    >
      Watch
    </SingleTask>
  )
}
