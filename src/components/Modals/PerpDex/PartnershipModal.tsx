import Button from 'components/Button'
import { BodyText, Header2 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import { useUtils } from '@telegram-apps/sdk-react'
import ImageAnimatedOnLoad from 'components/ImageAnimatedOnLoad'

function ModalBody() {
  return (
    <>
      <ImageAnimatedOnLoad
        src="img/scalr-wavy.png"
        className="mx-4 h-44 rounded-lg"
      />
      <Header2 className="text-center px-4">Interested in partnership?</Header2>
      <BodyText className="text-center text-balance px-4">
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
