import PinInput from 'components/PinInput'
import { BodyText } from 'components/Text'
import perpDex from 'helpers/api/perpDex'
import ModalBlurBg from 'components/PerpDex/ModalBlurBg'

function FloatingBubbles() {
  return (
    <>
      <div className="animation-delay-700 animate-pulse absolute left-3/4 top-0 -z-0">
        <ModalBlurBg />
      </div>
      <div className="animation-delay-700 animate-pulse absolute right-3/4 top-0 -z-0 ">
        <ModalBlurBg />
      </div>
    </>
  )
}

export default function () {
  return (
    <div className="relative flex flex-col gap-y-2">
      <PinInput
        fontSize="text-3xl"
        boxSize="w-12 h-14.5"
        length={5}
        onFilledCallback={perpDex}
      />
      <BodyText className="z-10 text-center">
        Join the beta with invite code.
        <p>Public access coming soon.</p>
      </BodyText>
      <FloatingBubbles />
    </div>
  )
}
