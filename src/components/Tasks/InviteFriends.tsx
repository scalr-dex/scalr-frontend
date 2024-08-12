import Button from 'components/Button'
import CardWrapper from 'components/CardWrapper'
import { AccentText, Header4 } from 'components/icons/Text'
import ButtonTypes from 'type/Button'

export default function () {
  return (
    <div className="flex flex-col justify-end flex-1">
      <Header4>Invite frens</Header4>
      <CardWrapper className="gap-y-4">
        <AccentText>Receive 5% of their rewards</AccentText>
        <Button buttonType={ButtonTypes.secondary} className="!rounded-full">
          Invite frens
        </Button>
      </CardWrapper>
    </div>
  )
}
