import Button from 'components/Button'
import { Header3 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'

function ModalBody() {
  return (
    <>
      <img src="img/utya-burn.png" className="w-36 mx-auto" />
      <Header3>Create or Join private room</Header3>
      <p>Rewards in private room will be more countable in airdrop</p>
      <p className="text-white/50">
        Claimed amounts count toward the $SCR airdrop distribution 👀
      </p>
    </>
  )
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col gap-y-4">
      <Button
        buttonType={ButtonTypes.secondary}
        className="!rounded-full"
        onClick={onClose}
        haptic={false}
      >
        Create room
      </Button>
      <Button
        buttonType={ButtonTypes.neutral}
        className="!rounded-full"
        onClick={onClose}
        haptic={false}
      >
        Create room
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
