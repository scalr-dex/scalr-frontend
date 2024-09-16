import { useAdsgram } from 'helpers/hooks/useAdsGram'
import Button from 'components/Button'
import { toast } from 'react-toastify'

export default function () {
  const ad = useAdsgram({
    blockId: '3135',
    onReward: () => toast.success("You've been rewarded!"),
    onError: () => toast.error('Shooot! An error while watching the ad?!'),
  })

  return <Button onClick={ad}>Watch Ad to get pts</Button>
}
