import { shareStory } from '@telegram-apps/sdk-react'
import Button from 'components/Button'
import handleError from 'helpers/handleError'
import { useCallback } from 'preact/hooks'
import ButtonTypes from 'type/Button'
import Share from 'components/icons/Share'

export default function ({
  imageUrl = 'https://github.com/Telegram-Mini-Apps.png',
  isLoading,
}: {
  imageUrl?: string
  isLoading?: boolean
}) {
  const onStoryShare = useCallback(() => {
    try {
      shareStory(imageUrl)
    } catch (e) {
      handleError({ e })
    }
  }, [imageUrl])

  if (!shareStory.isSupported()) return null

  return (
    <Button
      onClick={onStoryShare}
      buttonType={ButtonTypes.neutral}
      className="!rounded-full"
      iconRight={<Share />}
      isLoading={isLoading}
    >
      Add to stories
    </Button>
  )
}
