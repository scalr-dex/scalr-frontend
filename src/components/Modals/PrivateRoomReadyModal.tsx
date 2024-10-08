import { BodyText, Header3 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import Star from 'components/icons/Star'
import { useCallback, useEffect, useRef } from 'preact/hooks'
import Timer from 'components/Main/Timer'
import PinCode from 'components/PinCode'
import StoryShareButton from 'components/StoryShareButton'
import Button from 'components/Button'
import { quitLobby } from 'helpers/api/battles'
import Share from 'components/icons/Share'
import { shareURL } from '@telegram-apps/sdk-react'
import handleError from 'helpers/handleError'
import ButtonSmall from 'components/ButtonSmall'
import Diamond from 'components/icons/Diamond'
import { useAtomValue } from 'jotai'
import { battlePrivateLobbyAtom } from 'helpers/atoms/battleGameAtom'
import env from 'helpers/env'

function ModalBody() {
  const roomData = useAtomValue(battlePrivateLobbyAtom)
  const ref = useRef<HTMLInputElement[]>([])

  useEffect(() => {
    if (!roomData?.code || !ref.current.length) return
    console.log(roomData?.code)
    console.log(ref.current)

    ref.current.forEach(
      (inputEl, index) => (inputEl.value = roomData.code[index])
    )
  }, [roomData?.code])

  // TODO: make deep-links into tma
  const shareLink = `${env.VITE_APP_BASE_LINK}?startapp=code-${roomData?.code}`

  const onShare = useCallback(() => {
    try {
      shareURL(shareLink, "Hey, let's battle, I made a private game 😈")
    } catch (e) {
      handleError({ e })
    }
  }, [shareLink])

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center gap-y-4">
        <Timer endTime={roomData?.lobbyEndTime} />

        <Star />

        <ButtonSmall
          className="px-6 py-3 w-fit"
          buttonType={ButtonTypes.neutral}
          iconRight={<Diamond />}
        >
          {roomData?.betAmount}
        </ButtonSmall>

        <Header3 className="text-center">Join a Private Room</Header3>
        <BodyText className="text-white/50 font-semibold text-center">
          To invite someone to play, share link or code
        </BodyText>
        <PinCode disabled ref={ref} />
      </div>

      <Button
        onClick={onShare}
        buttonType={ButtonTypes.secondary}
        rounded="rounded-full"
        iconRight={<Share />}
      >
        Share to friends
      </Button>
      <StoryShareButton />
      <Button
        buttonType={ButtonTypes.neutral}
        onClick={quitLobby}
        rounded="rounded-full"
      >
        Cancel battle
      </Button>
    </>
  )
}

export default function (props: DefaultModalProps) {
  return <DefaultModal {...props} body={ModalBody} />
}
