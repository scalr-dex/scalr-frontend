import { shareURL } from '@telegram-apps/sdk-react'
import Button from 'components/Button'
import Close from 'components/icons/Close'
import Copy from 'components/icons/Copy'
import Share from 'components/icons/Share'
import { BodyText, Header3 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import UserAtom from 'helpers/atoms/UserAtom'
import env from 'helpers/env'
import { useAtomValue } from 'jotai'
import { useCallback, useState } from 'preact/hooks'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import CheckMark from 'components/icons/CheckMark'
import Loader from 'components/Loader'
import ScalrCoin from 'components/icons/coins/ScalrCoin'
import DoublePeople from 'components/icons/DoublePeople'
import handleError from 'helpers/handleError'
import { quitLobby } from 'helpers/api/battles'
import StoryShareButton from 'components/StoryShareButton'

function ModalBody() {
  return (
    <>
      <Loader size={64} className="self-center" />
      <Header3 className="text-center">Waiting for opponent</Header3>
      <div className="flex flex-row justify-between items-center">
        <BodyText className="text-white/50">Bet size</BodyText>
        <BodyText className="font-bold">
          100k <ScalrCoin className="inline-block" size={16} />
        </BodyText>
      </div>
      <div className="flex flex-row justify-between items-center">
        <BodyText className="text-white/50">Players online</BodyText>
        <BodyText className="font-bold">
          130068 <DoublePeople className="inline-block" />
        </BodyText>
      </div>
    </>
  )
}

function ModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-row items-center justify-end">
      <Close onClick={onClose} />
    </div>
  )
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  const user = useAtomValue(UserAtom)
  const telegramId = user?.telegramId
  const [copied, setCopied] = useState(false)

  const shareLink = `${env.VITE_APP_BASE_LINK}?startapp=${telegramId}`

  const onCopy = useCallback(async () => {
    await navigator.clipboard.writeText(shareLink)

    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [shareLink])

  const onShare = useCallback(() => {
    try {
      shareURL(shareLink)
    } catch (e) {
      handleError({ e })
    }
  }, [shareLink])

  return (
    <div className="flex flex-col gap-y-4">
      <Button
        onClick={onClose}
        buttonType={ButtonTypes.secondary}
        className="!rounded-full"
      >
        Cancel
      </Button>
      <StoryShareButton isLoading={!telegramId} />
      <div className="flex flex-row gap-x-2">
        <Button
          onClick={onShare}
          buttonType={ButtonTypes.secondary}
          className="!rounded-full"
          iconRight={<Share />}
        >
          Share to friends
        </Button>
        <Button
          onClick={onCopy}
          buttonType={copied ? ButtonTypes.success : ButtonTypes.secondary}
          className="!rounded-full !h-16 !w-16"
        >
          {copied ? <CheckMark /> : <Copy />}
        </Button>
      </div>
    </div>
  )
}

export default function ({
  setShowModal,
  showModal,
  lobbyId,
}: DefaultModalProps & { lobbyId?: string }) {
  const onClose = useCallback(async () => {
    try {
      if (!lobbyId) return
      await quitLobby(lobbyId)
      setShowModal(false)
    } catch (e) {
      handleError({ e, toastMessage: 'Failed to exit 😥 Please try agin' })
    }
  }, [lobbyId, setShowModal])

  return (
    <DefaultModal
      showModal={showModal}
      setShowModal={setShowModal}
      header={() => <ModalHeader onClose={onClose} />}
      body={ModalBody}
      footer={() => <ModalFooter onClose={onClose} />}
    />
  )
}
