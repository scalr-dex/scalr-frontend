import Button from 'components/Button'
import CardWrapper from 'components/CardWrapper'
import { AccentText, Header4 } from 'components/icons/Text'
import { useCallback } from 'preact/hooks'
import ButtonTypes from 'type/Button'
import { useUtils } from '@telegram-apps/sdk-react'

export default function () {
  const utils = useUtils()

  const onClick = useCallback(() => {
    utils.shareURL('t.me/dex_game_test_bot/Dexxx', 'Check out Scalr DEX app!')
  }, [utils])

  return (
    <div className="flex flex-col justify-end flex-1">
      <Header4>Invite frens</Header4>
      <CardWrapper className="gap-y-4">
        <AccentText>Receive 5% of their rewards</AccentText>
        <Button
          buttonType={ButtonTypes.secondary}
          className="!rounded-full"
          onClick={onClick}
        >
          Invite frens
        </Button>
      </CardWrapper>
    </div>
  )
}
