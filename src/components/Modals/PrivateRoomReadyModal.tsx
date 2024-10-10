import { BodyText, Header3 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import Star from 'components/icons/Star'
import { useCallback } from 'preact/hooks'
import Timer from 'components/Main/Timer'
import StoryShareButton from 'components/StoryShareButton'
import Button from 'components/Button'
import { quitLobby } from 'helpers/api/battles'
import Share from 'components/icons/Share'
import { shareURL } from '@telegram-apps/sdk-react'
import handleError from 'helpers/handleError'
import ButtonSmall from 'components/ButtonSmall'
import { useAtomValue } from 'jotai'
import { battlePrivateLobbyAtom } from 'helpers/atoms/battleGameAtom'
import env from 'helpers/env'
import ScalrCoin from 'components/icons/coins/ScalrCoin'

function ModalBody() {
  const roomData = useAtomValue(battlePrivateLobbyAtom)

  const onShare = useCallback(() => {
    try {
      if (!roomData?.code) return

      const shareLink = `${env.VITE_APP_BASE_LINK}?startapp=code-${roomData.code}`
      shareURL(
        shareLink,
        `\nHey, let's battle, I made a private game 😈\nUse this code to join 👉 ${roomData.code} 👈`
      )
    } catch (e) {
      handleError({ e })
    }
  }, [roomData?.code])

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center gap-y-4">
        {roomData ? <Timer endTime={roomData.lobbyEndTime} /> : null}

        <Star />

        <ButtonSmall
          className="px-6 py-3 w-fit"
          buttonType={ButtonTypes.neutral}
          iconRight={<ScalrCoin size={20} />}
        >
          {roomData?.betAmount}
        </ButtonSmall>

        <Header3 className="text-center">Join a Private Room</Header3>
        <BodyText className="text-white/50 font-semibold text-center">
          To invite someone to play, share link or code
        </BodyText>
        <div className="flex flex-row gap-x-1">
          {roomData?.code.split('').map((val) => (
            <div className="flex items-center justify-center uppercase bg-tertiary rounded-lg w-8 h-10">
              <Header3>{val}</Header3>
            </div>
          ))}
        </div>
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
