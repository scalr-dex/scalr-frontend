import { useAdsgram } from 'helpers/hooks/useAdsGram'
import Button from 'components/Button'
import { toast } from 'react-toastify'
import env from 'helpers/env'

export default function () {
  const ad = useAdsgram({
    blockId: env.VITE_ADSGRAM_BLOCK_ID,
    onReward: () => toast.success("You've been rewarded!"),
    onError: () => toast.error('Shoot! An error while watching the ad?!'),
  })

  return <Button onClick={ad}>Watch Ad to get pts</Button>
}
