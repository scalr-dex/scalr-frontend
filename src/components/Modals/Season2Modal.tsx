import Button from 'components/Button'
import { BodyText } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import ImageAnimatedOnLoad from 'components/ImageAnimatedOnLoad'
import IconWithTexts from 'components/IconWithTexts'
import Bookmark from 'components/icons/Bookmark'
import MedalStar from 'components/icons/MedalStar'
import BillList from 'components/icons/BillList'
import Box from 'components/icons/Box'
import ScrollFadeOverlay from 'components/ScrollFadeOverlay'

const bodyInfo = [
  {
    icon: <Bookmark />,
    topText: 'Saved Progress',
    bottomText:
      'Your achievements are saved and will count toward the final airdrop. Don’t worry.',
  },
  {
    icon: <MedalStar />,
    topText: 'New Points System',
    bottomText:
      'Fresh start, zero losses. Predict the price direction without limits!',
  },
  {
    icon: <BillList />,
    topText: 'Daily Challenges',
    bottomText: 'Take on daily tasks and stack rewards like a pro.',
  },
  {
    icon: <Box />,
    topText: 'Perp DEX Beta Access is Open',
    bottomText:
      'Get an access code from the community or earn one as a top user!',
  },
]

function ModalBody() {
  return (
    <>
      <ImageAnimatedOnLoad src="img/season2.png" forModal />
      <BodyText className="px-4 text-center text-white/50">
        <p>We’re back with some exciting updates!</p>
        <p>Here’s what’s new:</p>
      </BodyText>
      <div className="flex flex-col gap-y-5">{bodyInfo.map(IconWithTexts)}</div>
      <ScrollFadeOverlay />
    </>
  )
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  return (
    <Button
      className="!rounded-full"
      onClick={onClose}
      buttonType={ButtonTypes.alt}
    >
      🔥🔥 Understood. Let’s go!
    </Button>
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
