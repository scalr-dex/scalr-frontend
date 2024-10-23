import Button from 'components/Button'
import { BodyText, Header2 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import { useUtils } from '@telegram-apps/sdk-react'

function ModalBody() {
  return (
    <>
      <img src="img/scalr-wavy.png" className="mx-4 rounded-lg" />
      <Header2 className="text-center">Interested in partnership?</Header2>
      <BodyText className="text-center">
        Send your links with a short note about yourself, and receive a special
        offer from us 🌞
      </BodyText>
    </>
  )
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  const utils = useUtils()

  return (
    <div className="flex flex-col gap-y-4">
      <Button
        buttonType={ButtonTypes.secondary}
        className="!rounded-full"
        onClick={() => utils.openTelegramLink('https://t.me/c333line')}
      >
        Send the info
      </Button>
      <Button
        buttonType={ButtonTypes.neutral}
        className="!rounded-full"
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  )
}

export default function (props: DefaultModalProps) {
  return (
    <DefaultModal
      {...props}
      body={ModalBody}
      footer={(onClose) => <ModalFooter onClose={onClose} />}
    />
  )
}
