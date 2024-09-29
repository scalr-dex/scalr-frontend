import Button from 'components/Button'
import { Header3, BodyText } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import { navigate } from 'wouter-preact/use-hash-location'
import WatchFilled from 'components/icons/WatchFilled'
import useAdsgram from 'helpers/hooks/useAdsgram'

function ModalBody() {
  return (
    <>
      <img src="img/utya-sad.png" className="w-36 mx-auto" />
      <Header3>Oh no, you lost everything...</Header3>
      <BodyText>
        Get points by <span className="italic">completing tasks</span> and{' '}
        <span className="italic">inviting friends</span>
      </BodyText>
      <BodyText className="text-controls-tertiary-focus">
        Claimed amounts count toward the $SCR airdrop distribution 👀
      </BodyText>
    </>
  )
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  const showAd = useAdsgram({ onReward: onClose })

  return (
    <div className="flex flex-col gap-y-4">
      <Button
        buttonType={ButtonTypes.secondary}
        className="!rounded-full"
        onClick={showAd}
        haptic={false}
        iconRight={<WatchFilled />}
      >
        Watch short video
      </Button>
      <Button
        buttonType={ButtonTypes.neutral}
        className="!rounded-full"
        onClick={() => {
          onClose()
          navigate('/tasks')
        }}
        haptic={false}
      >
        See tasks
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
